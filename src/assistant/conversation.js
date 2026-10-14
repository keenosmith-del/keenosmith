import { answer } from './engine.js';
import { education, experience } from './knowledge.js';
import { evidence } from './retrieve.js';

export { starterQuestions } from './social.js';
import { socialAnswer, normalizeSocial } from './social.js';
export const boundHistory = (history = []) => history
  .filter((m) => ['user', 'assistant'].includes(m.role) && typeof m.text === 'string')
  .slice(-6).map(({ role, text }) => ({ role, text: text.slice(0, 1500) }));

// Small social exchanges stay local; reasoning and ambiguous requests go to the server.
export function conversationalAnswer(question, context = {}) {
  const q = question.trim().slice(0, 16000);
  const social = normalizeSocial(q);
  const local = socialAnswer(q, context);
  if (local) return local;

  const analytical = /market|business|industry|enterprise|banking/.test(social) && !/job description|requirements/.test(social);
  const result = answer(analytical && !context.entities?.length ? `${q} cloud AI full stack` : q, context);
  const { interpretation } = result;
  const names = result.context.entities;
  const direct = result.projects.filter((p) => p.demonstrated && (!names.length || p.implementedTechnologies.some((t) => names.includes(t))));
  const strong = result.indicators.filter((i) => i.band >= 2).map((i) => i.skill);
  const limited = result.indicators.filter((i) => i.band < 2).map((i) => i.skill);
  if (interpretation.intent === 'experience') {
    result.text = `${experience[0].split('. ')[0]}. He also led technical and digital operations at Firstdaes Entertainment (2020–2026) and worked on technical content and documentation at 3Play Media (2021–2025). The engineering experience is project-based; the portfolio does not establish equivalent employed engineering tenure.`;
  } else if (interpretation.intent === 'education') {
    result.text = `${education.slice(0, 2).join(' ')} He also studied Computer Science at UNISA (2017–2022). An awarded degree is not confirmed in the portfolio.`;
  } else if (interpretation.intent === 'credentials') {
    result.text = result.credentials.length ? `The portfolio lists ${result.credentials.length} relevant credentials, including Applied Skills, training and technical learning records; these are not all professional certifications. The credential cards link to the records; issuer profiles do not independently verify each credential.` : 'No matching earned credential is documented. A listed skill or planned exam does not establish certification.';
  } else if (['skills', 'projects'].includes(interpretation.intent)) {
    const focus = interpretation.entities.length <= 3 && interpretation.entities.some((s) => evidence(s).band < 2) && strong.length ? strong.join(' and ') : interpretation.expansion.groups.length ? interpretation.expansion.groups.join(', ') : interpretation.entities.slice(0, 3).join(' and ') || 'full-stack, AI and cloud engineering';
    const support = names.map(evidence).filter((i) => i.band >= 2).map((i) => i.skill);
    result.text = direct.length ? `Keeno has documented implementation evidence for ${focus}${support.length && !interpretation.entities.length ? `, including ${support.slice(0, 4).join(', ')}` : ''}. ${direct.slice(0, 2).map((p) => p.title).join(' and ')} provide supporting examples; the cards distinguish implemented work from planned scope.` : `For ${focus}, the portfolio provides listed, learning or planned evidence, but direct implementation is not confirmed. The records below show the documented scope.`;
    if (interpretation.entities.some((s) => evidence(s).band < 2) && direct.length) result.text += interpretation.entities.length > 3 ? ' Some listed services lack direct implementation evidence; check the documented scope.' : ` Direct implementation is not confirmed for ${interpretation.entities.filter((s) => evidence(s).band < 2).join(', ')}.`;
    if (interpretation.comparison) result.text += ' The evidence bands compare documented usage, rather than measuring proficiency.';
  } else if (interpretation.intent === 'role') {
    const unsupported = ['Rust', 'Swift', 'Ruby', 'PHP', 'SAP', 'Salesforce'].filter((s) => interpretation.text.includes(s.toLowerCase()));
    result.text = `Demonstrated alignment: ${strong.join(', ') || 'No specific implemented requirements identified'}. Partial or transferable alignment: ${limited.join(', ') || 'Project-based engineering; seniority and production scale need discussion'}. Lacking direct evidence: ${unsupported.join(', ') || 'Requirements outside the recognised portfolio stack remain unassessed'}. Use Recruiter View for a detailed requirement-by-requirement review.`;
    if (/can i paste|paste a job|job description/.test(social) && q.length < 80) {
      result.text = 'Yes—paste the job description here for a brief evidence-based assessment. Recruiter View supports a more detailed review of demonstrated, transferable and unsupported requirements.';
      result.projects = []; result.credentials = []; result.indicators = [];
    } else if (!names.length) {
      result.projects = []; result.credentials = [];
    }
  }
  if (analytical) {
    result.text = 'His documented full-stack, AI integration, cloud and workflow engineering are relevant to enterprise applications and automation. Supporting projects demonstrate applied systems, with implementation and planned scope identified separately. I have no live market evidence to establish current hiring demand or employment outcomes.';
  }
  if (/develop further|improve|gaps|missing experience/.test(social)) {
    result.text = 'The portfolio does not establish employed engineering tenure, production scale or team leadership in an engineering organisation. Those areas need further evidence; any additional gaps depend on the target role. Paste its requirements for a specific assessment in Recruiter View.';
    result.projects = [];
  }
  if (/^which ones/.test(social) && context.groups?.includes('cloud'))
    result.text = 'His portfolio documents work across AWS, Microsoft Azure and Google Cloud. The supporting projects separate implemented features from planned services and unverified live deployment.';
  result.suggestions = interpretation.intent === 'role'
    ? ['What experience would he need to develop further?', 'Show relevant projects']
    : names.length ? [`Show ${names[0]} projects`, `Compare ${names[0]} with cloud engineering`]
    : result.suggestions;
  result.suggestions = result.suggestions.filter((s) => !context.lastSuggestions?.includes(s)).slice(0, 2);
  result.context.previousSuggestions = context.lastSuggestions || [];
  result.context.lastSuggestions = result.suggestions;
  // Keep every retrieved record available via progressive disclosure, without an oversized first reply.
  result.indicators = result.indicators.slice(0, interpretation.intent === 'role' ? 5 : 3);
  // Direct single-skill checks already have a reliable evidence-band answer.
  result.local = !analytical && interpretation.intent === 'skills' && interpretation.entities.length === 1 && /^(does|has)\b.*\b(know|use|work with)\b/.test(social) && !interpretation.comparison;
  result.compact = true;
  return result;
}

export async function respond(question, context, history, { signal, fetcher = fetch } = {}) {
  const fallback = conversationalAnswer(question, context);
  if (fallback.local) return fallback;
  try {
    const response = await fetcher('/api/assistant', { method: 'POST', signal: signal || AbortSignal.timeout(14000),
      headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: question.slice(0, 16000), history: boundHistory(history) }) });
    if (!response.ok) return fallback;
    const data = await response.json();
    if (data.mode === 'deterministic' || !data.response || typeof data.response.text !== 'string') return fallback;
    // Server returns complete validated catalogue records, never model-created cards.
    return data.response;
  } catch { return fallback; }
}
