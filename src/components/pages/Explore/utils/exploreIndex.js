import { canonicalProjects, skillRegistry, credentials, education } from '../../../../assistant/knowledge.js';
import { contains } from '../../../../assistant/interpret.js';
import { taxonomy, expandQuery } from '../../../../assistant/taxonomy.js';
import { evidence, implementedSkillProjects } from '../../../../assistant/retrieve.js';
import { projectTone, skillPresentation, credentialTone } from './explorePresentation.js';
import { projectConcepts } from '../../../../data/projectConcepts.js';

export const normalize = value => String(value || '').toLowerCase().replace(/[^a-z0-9+#]+/g, ' ').trim();
export const categoryName = id => taxonomy.find(t => t.id === id)?.label || id;
const labelText = item => [...(item.categories || []), ...(item.ecosystems || [])].map(categoryName).join(' ');
const indexed = item => ({ ...item, searchText: normalize([item.name, item.title, item.description, item.domain, item.issuer, item.group, item.type, item.status, item.date, ...(item.technologies || []), ...(item.aliases || []), labelText(item), ...(item.evidence || []).map(e => `${e.description || ''} ${e.source} ${(e.technologies || []).join(' ')}`)].join(' ')) });
const detailRoutes = ['/projects/ai-assistant', '/projects/productivity-platform', '/projects/music-api', '/projects/enterprise-workspace', '/projects/microsoft', '/projects/aws', '/projects/gcp'];
export const projectIndex = [...canonicalProjects].sort((a, b) => Number(b.demonstrated) - Number(a.demonstrated)).map((p, i) => {
 const concept = projectConcepts.find(c => c.id === p.id || p.aliases.includes(c.id));
 const detailRoute = detailRoutes.find(route => p.routes.includes(route));
 const route = detailRoute || p.routes.find(r => r.startsWith('/projects/')) || `/explore/projects/${p.id}`;
 return indexed({ ...p, summary: p.description.replace(/^Planned /i, '').replace(/^Placeholder for /i, ''), domain: concept?.domain || p.categories.slice(0, 2).map(categoryName).join(' / ') || 'Software Engineering', route, hasDetailPage: !!detailRoute, tone: projectTone(i) });
});
export const skillIndex = skillRegistry.map((s, i) => {
 const usedIds = new Set(implementedSkillProjects(s.name).map(p => p.canonicalId));
 const projects = projectIndex.filter(p => usedIds.has(p.id));
 const assessment = evidence(s.name);
 return indexed({ ...s, assessment, projects, presentation: skillPresentation({ assessment, projects }, i), technologies: [s.name], aliases: taxonomy.filter(t => t.skills.includes(s.name)).flatMap(t => t.aliases) });
});
function credentialType(c) {
 if (c.id === 'microsoft-defender-xdr') return 'Applied Skills';
 if (/hyperion-stellenbosch/.test(c.id)) return /Full-Stack/.test(c.name) ? 'Bootcamps' : 'Training';
 if (/wethinkcode|ai-ml|agent-architect|cybersecurity/.test(c.id) || /Programme/.test(c.category) || c.credentialTypes.includes('Lab / training')) return 'Training';
 if (/certified|certification/i.test(c.name)) return 'Certifications';
 return 'Courses';
}
const credentialRecords = [
 ...credentials.map(c => indexed({ ...c, categories: [...new Set([...c.categories, ...(credentialType(c) === 'Bootcamps' ? ['frontend', 'backend', 'databases'] : [])])], type: credentialType(c), technologies: skillRegistry.filter(s => contains(`${c.name} ${c.description}`, s.name)).map(s => s.name) })),
 // Programme certificates already represent these two shared education entries.
 ...education.slice(2).map((description, i) => indexed({ id: `education-${i}`, name: description.split(' — ')[0], issuer: description.split(' — ')[1]?.split(',')[0], description, type: 'Education', status: i === 0 ? 'Coursework completed · Awarded degree not confirmed' : 'Listed education', date: i === 0 ? '2017–2022' : '2010–2015', categories: ['languages'], technologies: ['Computer Science', 'Software Engineering'] }))
];
export const credentialIndex = credentialRecords.map((c, i) => ({ ...c, tone: credentialTone(c, i) }));
export function createQueryMatcher(query) {
 const text = normalize(query);
 const words = text.split(' ');
 const expansion = expandQuery(text, skillRegistry.map(s => s.name));
 const vendors = expansion.groups.filter(g => ['google', 'microsoft', 'aws'].includes(g));
 return item => {
  if (!text) return true;
  if (vendors.length && !vendors.some(v => item.ecosystems?.includes(v) || normalize(`${item.issuer || ''} ${item.group || ''} ${item.name || ''}`).includes(v))) return false;
  if (words.every(t => item.searchText.includes(t))) return true;
  return expansion.terms.some(t => item.technologies?.includes(t)) || expansion.groups.some(g => item.categories?.includes(g));
 };
}
export const matchesQuery = (item, query) => createQueryMatcher(query)(item);
export const relatedCredentials = skill => credentialIndex.filter(c => c.technologies?.includes(skill.name));
export const relatedSkills = skill => skillIndex.filter(s => s.id !== skill.id && s.categories.some(c => skill.categories.includes(c))).sort((a, b) => b.projects.filter(p => skill.projects.some(x => x.id === p.id)).length - a.projects.filter(p => skill.projects.some(x => x.id === p.id)).length).slice(0, 12);
