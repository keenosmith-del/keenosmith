import { canonicalProjects, skillRegistry, credentials, education } from '../../../../assistant/knowledge.js';
import { contains } from '../../../../assistant/interpret.js';
import { taxonomy, expandQuery } from '../../../../assistant/taxonomy.js';
import { evidence, implementedSkillProjects } from '../../../../assistant/retrieve.js';
import { featuredProjects } from '../../../../data/featuredProjects.js';
import { projectConcepts } from '../../../../data/projectConcepts.js';
import enterprise from '../../../../assets/projects/enterprise/1.png';
import microsoft from '../../../../assets/projects/microsoft/microsoft.png';
import ollama from '../../../../assets/images/about/ollama-cover.png';
import claude from '../../../../assets/images/about/claude.png';
import huggingFace from '../../../../assets/images/about/hugging-face.png';
import gcp from '../../../../assets/images/custom-projects/google-cloud.png';
import aws from '../../../../assets/images/custom-projects/aws.png';

export const normalize = value => String(value || '').toLowerCase().replace(/[^a-z0-9+#]+/g, ' ').trim();
export const categoryName = id => taxonomy.find(t => t.id === id)?.label || id;
const labelText = item => [...(item.categories || []), ...(item.ecosystems || [])].map(categoryName).join(' ');
const indexed = item => ({ ...item, searchText: normalize([item.name, item.title, item.description, item.domain, item.issuer, item.group, item.type, item.status, item.date, ...(item.technologies || []), ...(item.aliases || []), labelText(item), ...(item.evidence || []).map(e => `${e.description || ''} ${e.source} ${(e.technologies || []).join(' ')}`)].join(' ')) });
export const projectIndex = [...canonicalProjects].sort((a, b) => Number(b.demonstrated) - Number(a.demonstrated) || Number(!!featuredProjects.find(f => f.id === b.id)?.image) - Number(!!featuredProjects.find(f => f.id === a.id)?.image)).map((p, i) => {
 const concept = projectConcepts.find(c => c.id === p.id || p.aliases.includes(c.id));
 const image = featuredProjects.find(f => f.id === p.id)?.image || ({ 'enterprise-workspace': enterprise, microsoft, ollama, claude, 'hugging-face': huggingFace, 'vertex-ai-retail': gcp, 'banking-risk': aws })[p.id];
 // Unpublished work opens source evidence rather than a placeholder portfolio page.
 const route = p.portfolioPublicationStatus === 'not-yet-published' ? null : p.routes.find(r => r.startsWith('/projects/'));
 return indexed({ ...p, domain: concept?.domain || p.categories.slice(0, 2).map(categoryName).join(' / ') || 'Software Engineering', image, route, layout: ['feature', 'standard', 'portrait', 'wide', 'standard', 'landscape'][i % 6] });
});
export const skillIndex = skillRegistry.map(s => {
 const usedIds = new Set(implementedSkillProjects(s.name).map(p => p.canonicalId));
 return indexed({ ...s, assessment: evidence(s.name), projects: projectIndex.filter(p => usedIds.has(p.id)), technologies: [s.name], aliases: taxonomy.filter(t => t.skills.includes(s.name)).flatMap(t => t.aliases) });
});
function credentialType(c) {
 if (c.id === 'microsoft-defender-xdr') return 'Applied Skills';
 if (/hyperion-stellenbosch/.test(c.id)) return /Full-Stack/.test(c.name) ? 'Bootcamps' : 'Training';
 if (/wethinkcode|ai-ml|agent-architect|cybersecurity/.test(c.id) || /Programme/.test(c.category) || c.credentialTypes.includes('Lab / training')) return 'Training';
 if (/certified|certification/i.test(c.name)) return 'Certifications';
 return 'Courses';
}
export const credentialIndex = [
 ...credentials.map(c => indexed({ ...c, categories: [...new Set([...c.categories, ...(credentialType(c) === 'Bootcamps' ? ['frontend', 'backend', 'databases'] : [])])], type: credentialType(c), technologies: skillRegistry.filter(s => contains(`${c.name} ${c.description}`, s.name)).map(s => s.name) })),
 // Programme certificates already represent these two shared education entries.
 ...education.slice(2).map((description, i) => indexed({ id: `education-${i}`, name: description.split(' — ')[0], issuer: description.split(' — ')[1]?.split(',')[0], description, type: 'Education', status: i === 0 ? 'Coursework completed · Awarded degree not confirmed' : 'Listed education', date: i === 0 ? '2017–2022' : '2010–2015', categories: ['languages'], technologies: ['Computer Science', 'Software Engineering'] }))
];
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
