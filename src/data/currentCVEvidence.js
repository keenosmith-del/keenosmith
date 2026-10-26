import aiCV from '../components/pages/CV/data/ai.json' with { type: 'json' };
import fullStackCV from '../components/pages/CV/data/full-stack.json' with { type: 'json' };
import cloudCV from '../components/pages/CV/data/cloud.json' with { type: 'json' };
import { taxonomy } from '../assistant/taxonomy.js';
import { aliasesForSkill, normalizeSkills } from './skillNames.js';

const variants = [aiCV, fullStackCV, cloudCV];
const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const names = normalizeSkills([...taxonomy.flatMap(group => group.skills), 'Nginx', 'kind', 'JPA', 'State Management', 'Logging', 'Disaster Recovery', 'Least privilege', 'TLS', 'Retries']);
// These are explicit current CV skill listings, not implementation or tenure proof.
export const currentCVSkillEvidence = variants.map(variant => {
  const text = variant.skills.map(group => group.text).join(' ');
  return {
    source: `src/components/pages/CV/data/${variant.key}.json`,
    pdfSha256: variant.sourceSha256,
    type: 'cv-listing',
    technologies: names.filter(name => [name, ...aliasesForSkill(name)].some(alias => new RegExp(`(?<![a-z0-9])${escape(alias)}(?![a-z0-9])`, 'i').test(text))),
  };
});
export const currentCVProjectEvidence = variants.flatMap(variant => variant.projects.map(project => ({ ...project, technologySummary: project.technologies, technologies: [], source: `src/components/pages/CV/data/${variant.key}.json`, type: 'current-cv-description', strength: 'supporting' })));
