import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { build } from 'esbuild';
await build({ stdin: { contents: `export * from './src/assistant/knowledge.js'; export { answer } from './src/assistant/engine.js'; export { conversationalAnswer } from './src/assistant/conversation.js'; export { skillIndex, curatedProjects, matchesQuery } from './src/components/pages/Explore/utils/exploreIndex.js'; export { candidateEvidence, evidenceFingerprint, candidateProfile } from './src/components/pages/RecruiterView/utils/candidateEvidence.js'; export { assessRole } from './src/components/pages/RecruiterView/utils/recruiterScoring.js'; export { reviewedProjects, newProjectIds } from './src/data/projectEvidence.js'; export { aiProjectTarget, qualifyingAIProjects, aiProjectCounterLabel } from './src/data/aiInventory.js';`, resolveDir: process.cwd() }, bundle: true, platform: 'node', format: 'esm', outfile: '/tmp/portfolio-complete-refresh.mjs', loader: { '.png': 'empty' } });
const m = await import('/tmp/portfolio-complete-refresh.mjs');
for (const fn of [m.answer, m.conversationalAnswer]) {
  for (const [query, id] of [
    ['What have I built with CrewAI?', 'crewai-revenueops'],
    ['Explain the architecture of RevenueOps', 'crewai-revenueops'],
    ['What is Microsoft AssessFlow?', 'ms-assessflow'],
    ['Show the Streamlit EventOps companion', 'eventops-streamlit'],
    ['What have I built with FastEmbed?', 'eventops-streamlit'],
    ['How have I used FastAPI and Postgres?', 'ms-assessflow'],
  ]) assert(fn(query).projects.some(p => p.id === id), query);
  assert.match(fn('What are the CrewAI RevenueOps accuracy limitations?').text, /0\/4|1\/7/);
  assert.match(fn('Is Microsoft AssessFlow deployed in Azure?').text, /not a live Azure|await.*live|not.*deployment/s);
  const compare = fn('How does Low-Code Streamlit EventOps differ from EventOps Intelligence?');
  assert(compare.projects.some(p => p.id === 'eventops-streamlit'));
  assert(compare.projects.some(p => p.id === 'eventops-intelligence'));
  assert.match(compare.text, /distinct companion|Distinct companion|FastEmbed/i);
  const next = fn('Was it deployed?', fn('Tell me about Microsoft AssessFlow').context);
  assert(next.projects.some(p => p.id === 'ms-assessflow'));
  assert.match(next.text, /not a live Azure|await.*live|not.*deployment/s);
  assert.match(fn('How many years of CrewAI experience?').text, /specific duration is not recorded/);
}
assert.equal(new Set(m.canonicalProjects.map(p => p.id)).size, m.canonicalProjects.length);
assert.equal(m.curatedProjects.length, 22);
assert.equal(m.aiProjectTarget, 15);
assert(m.qualifyingAIProjects.length >= m.aiProjectTarget);
assert.equal(new Set(m.qualifyingAIProjects.map(p => p.repository)).size, m.qualifyingAIProjects.length);
assert.equal(m.aiProjectCounterLabel, '15+ AI projects');
assert(!m.qualifyingAIProjects.some(p => p.id === 'banking-risk' || p.id === 'n8n'));
assert.equal(new Set(m.skillIndex.map(s => s.id)).size, m.skillIndex.length);
for (const skill of ['CrewAI','FastEmbed','Streamlit','SQLAlchemy','Alembic','Pydantic','Bicep','OIDC','Concurrency control','Human approval']) {
  const entry = m.skillIndex.find(s => s.name === skill);
  assert(entry && entry.projects.length, skill);
  assert(entry.projects.every(p => p.implementedTechnologies.includes(skill)), skill);
}
for (const [query, canonical] of [['Postgres','PostgreSQL'],['Express','Express.js'],['Gemini','Google Gemini'],['Azure Foundry','Microsoft Foundry'],['Continuous Integration / Continuous Delivery','CI/CD']]) {
  assert(m.skillIndex.filter(s => m.matchesQuery(s, query)).some(s => s.name === canonical), query);
}
for (const project of m.reviewedProjects) {
  assert.match(project.sourceCommit, /^[0-9a-f]{40}$/);
  assert(project.repository && project.sources.length && project.capabilities.length, project.id);
  for (const c of project.capabilities) assert(c.sources.length && c.revision === project.sourceCommit, `${project.id}:${c.skill}`);
  assert(!project.configuredTechnologies.some(s => project.implementedTechnologies.includes(s)), project.id);
}
for (const [title, description, expected] of [
  ['AI Engineer', 'Required: CrewAI, FastAPI, Pydantic, SQLAlchemy, PostgreSQL, agent tools and human approval.', ['CrewAI','FastAPI','SQLAlchemy']],
  ['Full-Stack Engineer', 'Required: React, FastAPI, PostgreSQL, JWT, RBAC, Playwright and GitHub Actions.', ['React','JWT','Playwright']],
  ['Cloud Engineer', 'Required: Bicep, OIDC, Docker and CI/CD release engineering.', ['Bicep','OIDC','Docker']],
]) {
  const result = m.assessRole({ title, description });
  for (const name of expected) assert(result.rows.some(r => r.name.includes(name) && r.score >= 60), `${title}:${name}`);
}
const cloud = m.assessRole({ title: 'Azure Engineer', description: 'Required: production Azure OpenAI deployment and live Microsoft Entra ID tenant integration.' });
for (const row of cloud.rows.filter(r => /Azure OpenAI|Entra/.test(r.name))) assert(row.score <= 30 && /not verified|unverified/.test(row.detail), row.name);
const unknown = m.assessRole({ title: 'Data Engineer', description: 'Required: production Snowflake, Databricks and Hadoop.' });
for (const row of unknown.rows) assert(row.score < 60, row.name);
assert.equal(m.candidateProfile.overallExperience.years, 6);
const receipt = JSON.parse(fs.readFileSync('docs/evidence/project-refresh-2026-10-26.json'));
for (const cv of receipt.protectedCVs) assert.equal(createHash('sha256').update(fs.readFileSync(cv.path)).digest('hex'), cv.sha256, cv.path);
assert(m.evidenceFingerprint().includes('2026-10-26'));
console.log('Complete refresh regression passed: 3 projects, aliases, limitations, comparison/follow-up, exact skills, provenance, 3 roles, live-cloud restraint, unrelated gaps, tenure and protected CV hashes.');
