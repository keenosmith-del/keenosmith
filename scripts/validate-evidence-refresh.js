import assert from 'node:assert/strict';
import { build } from 'esbuild';
await build({ stdin: { contents: `export { answer } from './src/assistant/engine.js';
export { conversationalAnswer, respond } from './src/assistant/conversation.js';
export * from './src/assistant/knowledge.js';
export { skillIndex, projectIndex } from './src/components/pages/Explore/utils/exploreIndex.js';
export { candidateProfile, candidateProjects, candidateEvidence, evidenceFingerprint } from './src/components/pages/RecruiterView/utils/candidateEvidence.js';
export { assessRole } from './src/components/pages/RecruiterView/utils/recruiterScoring.js';`, resolveDir: process.cwd() }, bundle: true, platform: 'node', format: 'esm', outfile: '/tmp/portfolio-refresh-tests.mjs', loader: { '.png': 'empty' } });
const m = await import('/tmp/portfolio-refresh-tests.mjs');
for (const answer of [m.answer, m.conversationalAnswer]) {
  const crew = answer('Does Keeno have experience with CrewAI?');
  assert.match(crew.text, /No implemented CrewAI/);
  assert.match(crew.text, /idea/);
  assert(!crew.projects.length);
  assert(!/Firstdaes|biography|employed engineering/.test(crew.text));
  const gemini = answer('Does he use Gemini?');
  assert(gemini.projects.some(p => p.id === 'eventops-intelligence'));
  assert(gemini.projects.some(p => p.id === 'vertex-ai-retail'));
  assert.equal(gemini.interpretation.entities.filter(x => /gemini/i.test(x)).length, 1);
  const lambda = answer('Does Keeno use Lambda?');
  assert.match(lambda.text, /candidate-declared experience/);
  assert.match(lambda.text, /implementation source remains unresolved/i);
  assert(lambda.projects.some(p => p.id === 'cv-2'));
  assert(!/training-only|implemented Lambda/.test(lambda.text));
  assert.match(answer('How much experience does he have?').text, /6\+ years/);
  assert.match(answer('How long has he used Python?').text, /more than three years/);
  assert.match(answer('How many years of Terraform experience?').text, /specific duration is not recorded/);
  const edu = answer('What are his qualifications?');
  for (const name of ['HyperionDev','Stellenbosch','WeThinkCode_','AWS','Founderz']) assert(edu.text.includes(name));
  assert(edu.credentials.some(c => /Full-Stack/.test(c.name)));
  assert(!/324|360|not awarded|not confirmed/.test(edu.text));
  const unknown = answer('Does he use AutoGen?');
  assert.match(unknown.text, /No matching AutoGen/);
  assert(!unknown.projects.length);
  const azure = answer('What about Azure?', gemini.context);
  assert(azure.projects.some(p => p.id === 'microsoft'));
  assert(!azure.projects.some(p => p.id === 'vertex-ai-retail'));
  const follow = answer('Did he use it in production?', gemini.context);
  assert(follow.projects.every(p => gemini.context.projectIds.includes(p.id)));
  assert(/deployment|generation|production/.test(follow.text));
  const other = answer('Which other projects?', answer('Does he use Python?').context);
  assert(other.projects.some(p => p.id === 'manufacturing-qc'));
  const planned = answer('Was that built or planned?', answer('Tell me about AI-Powered Cloud Architect & FinOps Optimization Platform').context);
  assert(planned.projects.every(p => !p.demonstrated));
  assert.match(planned.text, /planned|progress/);
  const claude = answer('Does he use Anthropic?');
  assert(claude.projects.some(p => p.id === 'claude' && p.demonstrated && p.showcaseVisible === false));
}
for (const name of ['TensorFlow','Rust','ONNX Runtime','LangGraph','Google Gemini','RabbitMQ','Lambda','Context engineering']) {
  const skill = m.skillIndex.find(s => s.name === name);
  assert(skill, `Explore missing ${name}`);
  assert(m.skills.includes(name));
  assert(m.skillGroups.some(g => g.skills.includes(name)), `Skills navigation missing ${name}`);
  assert(m.candidateEvidence.some(e => e.capability === name), `Recruiter View missing ${name}`);
  assert(skill.categories.length || skill.ecosystems.length, `Uncategorised ${name}`);
}
assert.equal(m.skillIndex.filter(s => s.name === 'Google Gemini').length, 1);
assert.equal(new Set(m.skillIndex.map(s => s.id)).size, m.skillIndex.length);
for (const p of m.canonicalProjects.filter(p => p.demonstrated)) {
  assert(m.candidateProjects.some(r => r.id === p.id), `Recruiter missing ${p.id}`);
  for (const name of p.implementedTechnologies) assert(m.skillRegistry.some(s => s.name === name), `Orphan ${name}`);
  assert(p.path && (p.path.startsWith('/projects/') || p.path.startsWith('/explore/projects/') || p.path === '/cv'));
  assert(!p.planned);
}
assert.equal(m.candidateProfile.overallExperience.years, m.candidateFacts.overallExperience.years);
assert(m.candidateProfile.education.assessmentComplete);
for (const years of [3, 8]) {
  const r = m.assessRole({ title: 'Engineer', description: `Requirements: Minimum ${years} years software engineering experience in full-stack applications.` });
  assert.equal(r.qualifications.find(q => q.type === 'experience').verified, years <= 6);
  assert.match(r.qualifications.find(q => q.type === 'experience').detail, /6\+ years/);
}
const edu = m.assessRole({ title: 'Engineer', description: 'Requirements: Degree in Computer Science.' });
assert(edu.qualifications.find(q => q.type === 'education').verified);
assert.notEqual(m.evidenceFingerprint(), m.evidenceFingerprint(m.candidateEvidence, {...m.candidateProfile, overallExperience: {years: 7}}));
const local = await m.respond('Does Keeno have experience with CrewAI?', {}, [], { fetcher: () => { throw Error('Specific answers must stay authoritative locally'); } });
assert(local.local && /No implemented CrewAI/.test(local.text));
console.log('Shared evidence refresh: exact tools, duration, education, planned/hidden status, follow-ups, project eligibility, categories, duplicates and fingerprint checks passed.');
