import assert from 'node:assert/strict';
import {build}from'esbuild';
await build({stdin:{contents:`export {curatedProjects} from './src/components/pages/Explore/utils/exploreIndex.js';export {publicRouteInventory,publishedProjectRoutes,routeMetadata} from './src/data/siteRoutes.js';export {reviewedProjects} from './src/data/projectEvidence.js';`,resolveDir:process.cwd()},bundle:true,platform:'node',format:'esm',outfile:'/tmp/portfolio-catalogue-routes.mjs',loader:{'.png':'empty','.webp':'empty'}});
const {curatedProjects,publicRouteInventory,publishedProjectRoutes,routeMetadata,reviewedProjects}=await import('/tmp/portfolio-catalogue-routes.mjs');
const destinations=new Set();
for(const project of curatedProjects){const facts=reviewedProjects.find(p=>p.id===project.canonicalId);assert(facts);assert.equal(project.route,facts.path);assert(!destinations.has(project.route));destinations.add(project.route);assert(publicRouteInventory.some(r=>r.path===project.route));assert(publishedProjectRoutes.some(r=>r.path===project.route&&r.repository===facts.repository));assert.equal(routeMetadata(`/explore/projects/${project.id}`).canonical,project.route);}
assert.equal(destinations.size,22);assert(!curatedProjects.some(p=>['kailor-ai','kailor-insider','eventops-intelligence-v2'].includes(p.canonicalId)));
console.log('Catalogue routes: 22 Explore projects resolve to one unique accepted case-study route/repository; legacy canonicals and excluded business/version records passed.');
