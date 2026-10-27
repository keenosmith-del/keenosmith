import { reviewedProjects } from './projectEvidence.js';
import { canonicalProjects } from '../assistant/knowledge.js';

export const siteOrigin = 'https://keenosmith.vercel.app';
const basePages = [
  { path: '/', title: 'Keeno Smith — Software, AI and Cloud Engineer', description: 'Engineering portfolio of Keeno Smith: full-stack applications, AI systems and cloud engineering, with project case studies, professional experience and role-specific CVs.' },
  { path: '/explore', title: 'Explore engineering work — Keeno Smith', description: 'Explore Keeno Smith’s engineering projects, implementation evidence, skills and learning credentials. Source evidence and deployment status are recorded separately.' },
  { path: '/recruiter-view', title: 'Recruiter View — Keeno Smith', description: 'Compare role requirements with curated technical and professional evidence. Evidence alignment is separate from qualification, experience and logistical verification.' },
  { path: '/cv', title: 'AI, Cloud and Full-Stack CVs — Keeno Smith', description: 'Read and download Keeno Smith’s accepted AI Engineer, Cloud Engineer and Full-Stack Software Engineer CVs, including professional experience and selected projects.' },
  { path: '/companies/kailor', title: 'kailor and kailor insider — Keeno Smith', description: 'Technical case study of kailor consulting and the separate kailor insider publication. Public company website, application implementation and release status are distinguished.' },
];
export const publishedProjectRoutes = reviewedProjects.filter(p => p.caseStudyAvailable && p.path.startsWith('/projects/')).map(p => ({
  id: p.id, displayId: p.displayId, path: p.path, title: `${p.title} — Keeno Smith`,
  description: p.description, repository: p.repository, deployment: p.deployment,
}));
export const canonicalPublicRoutes = [...basePages, ...publishedProjectRoutes];
const routes = new Map(canonicalPublicRoutes.map(p => [p.path, { ...p, canonical: p.path, indexable: true }]));
function alias(path, canonical, detail = {}) {
  if (!routes.has(path)) routes.set(path, { ...routes.get(canonical), ...detail, path, canonical, indexable: false });
}
for (const p of canonicalProjects) {
  const reviewed = reviewedProjects.find(r => r.id === p.id);
  const canonical = reviewed?.path || p.path;
  if (!routes.has(canonical)) routes.set(canonical, { path: canonical, canonical, title: `${p.title} — Keeno Smith`, description: p.description, repository: p.repositoryUrl, indexable: false });
  for (const path of p.routes || []) if (/^\/(?:projects|explore\/projects)\//.test(path)) alias(path, canonical);
  alias(`/explore/projects/${p.id}`, canonical);
  if (reviewed) alias(`/explore/projects/${reviewed.displayId}`, canonical);
}
for (const id of ['rabbitmq','kinesis','opentofu','duckdb','go-dotnet','openai','jwt-redpanda']) {
  const path=`/projects/${id}`;
  if (!routes.has(path)) routes.set(path,{path,canonical:path,title:`Project archive — Keeno Smith`,description:'Historical project scope in Keeno Smith’s engineering portfolio. Implementation and deployment are not established by a planned project listing.',indexable:false});
}
for (const path of ['/companies/kai','/companies/kailor-insider','/projects/company-websites','/projects/kailor-ai','/explore/projects/kai','/explore/projects/kailor-insider','/explore/projects/kailor-ai']) {
  routes.delete(path); alias(path,'/companies/kailor');
}
alias('/certifications','/explore');
export const publicRouteInventory = [...routes.values()];
const notFound={path:'/404',canonical:null,indexable:false,title:'Page not found — Keeno Smith',description:'This portfolio page could not be found. Return to the portfolio or Explore.'};
export const routeMetadata = pathname => routes.get(pathname.replace(/\/$/,'')||'/') || notFound;
export const notFoundMetadata = notFound;
