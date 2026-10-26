import { companyAnswer } from "./companyAnswer.js";
import { candidateFacts, education, credentials, exactToolRecords, professionalSkillRecords, skillRegistry } from './knowledge.js';
import { implementedSkillProjects, evidence } from './retrieve.js';

// Specific enquiries never fall through to a biography or a different skill.
export function specificAnswer(q, found) {
  const company = companyAnswer(q);
  if (company) return company;
  const names = q.entities;
  const selected = q.projectIds.length ? found.projects.filter(p => q.projectIds.includes(p.id)) : found.projects;
  if (q.duration) {
    const tool = names.find(s => candidateFacts.technologyDuration[s]);
    return { text: names.length
      ? tool ? `Keeno records ${candidateFacts.technologyDuration[tool].label} of ${tool} experience. This is separate from his ${candidateFacts.overallExperience.label} of overall relevant experience.` : `A ${names.join(' / ')}-specific duration is not recorded. Keeno has ${candidateFacts.overallExperience.label} of overall relevant experience; that does not establish the same duration with each technology.`
      : `${candidateFacts.identity.join(', ')} with ${candidateFacts.overallExperience.label} of overall relevant experience across independent engineering, founder work, consulting, professional roles and hands-on delivery. His work includes AI training and evaluation at Turing / OpenTrain AI, kailor consulting and application development, and digital platforms and operations at Firstdaes. Overlapping roles are not summed.`, projects: [], credentials: [], indicators: [] };
  }
  if (q.intent === 'education') {
    return { text: `${education.join(' ')} His full-stack certification and Generative AI learning are supported by the credential records, including WeThinkCode_, AWS × Udacity, and Microsoft × Founderz. The degree requirement is treated as complete for Recruiter View assessment.`, projects: [], credentials, indicators: [] };
  }
  if (q.unmatchedTool || names.some(n => exactToolRecords[n])) {
    const name = q.unmatchedTool || names.find(n => exactToolRecords[n]);
    const record = exactToolRecords[name];
    return { text: record?.description || `No matching ${name} usage record was found. I can't infer that tool from related skills.`, projects: record?.projectIds ? found.projects.filter(p => record.projectIds.includes(p.id)).sort((a,b) => record.projectIds.indexOf(a.id)-record.projectIds.indexOf(b.id)) : [], credentials: [], indicators: [] };
  }
  if ((q.followupDetail || q.projectIds.length) && selected.length && !['credentials', 'role'].includes(q.intent)) {
    const cards = selected.slice(0, 2);
    const text = q.followupDetail === 'production'
      ? cards.map(p => `${p.title}: ${p.deployment || 'Implementation is documented; a live production deployment or customer usage is not established by the current record.'}`).join(' ')
      : q.followupDetail === 'status'
        ? cards.map(p => `${p.title} is ${p.buildStatus === 'built' ? 'built' : p.planned ? 'planned' : 'in progress'}. ${p.deployment || ''}`).join(' ')
        : cards.map(p => `${p.title}: ${p.description}${/architect|differ|compar|workflow|how/.test(q.text) && p.engineering && p.engineering !== p.description ? ` ${p.engineering}` : ''}${p.sourceCommit ? ` ${p.deployment || ''}` : ''}`).join('\n\n');
    return { text, projects: cards, credentials: [], indicators: [] };
  }
  if (!['skills', 'projects'].includes(q.intent) || !names.length || q.expansion.groups.length) return null;
  const scoped = names.map(name => {
    const used = implementedSkillProjects(name);
    const configured = found.projects.filter(p => p.configuredTechnologies?.includes(name));
    const professional = professionalSkillRecords.filter(r => r.skills.includes(name));
    const learning = found.credentials.filter(c => skillRegistry.find(s => s.name === name)?.evidence.some(e => e.type === 'training' && e.source === c.id));
    const planned = found.projects.filter(p => p.plannedTechnologies?.includes(name) || !p.demonstrated && p.technologies.includes(name));
    const declared = exactToolRecords[name];
    const listed = skillRegistry.find(s => s.name === name)?.evidence.some(e => ['portfolio-skill', 'cv-listing'].includes(e.type));
    return { name, used, professional, learning, planned, declared, listed, configured };
  });
  const text = scoped.map(({name, used, professional, learning, planned, listed, configured}) => {
    if (used.length) return `Yes—Keeno has implemented ${name}.`;
    if (professional.length) return `Yes—${name} is documented in his professional work at ${[...new Set(professional.map(r => r.role.employer))].join(' and ')}.`;
    if (configured.length) return `${name} has prepared configuration in ${configured.map(p => p.title).join(", ")}; runtime deployment and operation are not verified.`;
    if (learning.length) return `${name} is supported by training or coursework (${learning.slice(0, 2).map(c => c.name).join('; ')}); implemented usage is not recorded.`;
    if (planned.length) return `${name} appears in planned project scope; completed implementation is not recorded.`;
    if (listed) return `${name} is listed as familiarity; a specific implementation is not recorded.`;
    return `No matching ${name} usage record was found.`;
  }).join(' ');
  const cards = selected.filter(p => scoped.some(s => s.used.some(u => u.canonicalId === p.canonicalId) || s.configured.some(u => u.canonicalId === p.canonicalId)));
  const examples = cards.slice(0, 2).map(p => `${p.title}: ${p.description.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim() || p.description}${p.id === 'crewai-revenueops' ? ` ${p.deployment}` : ''}`).join('\n\n');
  return { text: [text, examples].filter(Boolean).join('\n\n'), projects: cards.length ? cards : selected.filter(p => !p.demonstrated || scoped.some(s => s.planned.some(x => x.id === p.id))), credentials: scoped.flatMap(s => s.learning), indicators: names.map(evidence) };
}
