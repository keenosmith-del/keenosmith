import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { build } from 'esbuild';
const dir=await fs.mkdtemp(path.join(os.tmpdir(),'portfolio-seo-'));
try {
 await build({entryPoints:['src/data/siteRoutes.js'],bundle:true,platform:'node',format:'esm',outfile:dir+'/routes.mjs',loader:{'.png':'empty','.webp':'empty'}});
 const {canonicalPublicRoutes,publicRouteInventory,siteOrigin}=await import(dir+'/routes.mjs');
 const sitemap=await fs.readFile('dist/sitemap.xml','utf8');const locs=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
 assert.equal(locs.length,new Set(locs).size);assert.equal(locs.length,canonicalPublicRoutes.length);assert(locs.every(url=>!url.includes('/explore/projects/')));
 const root=await fs.readFile('dist/index.html','utf8');assert(root.includes('rel="canonical"'));assert.equal((root.match(/<title>/g)||[]).length,1);
 const base=process.env.PORTFOLIO_TEST_URL;
 let responses=0;
 for(const route of publicRouteInventory){
  const file=route.path==='/'?'dist/index.html':`dist${route.path}.html`;
  const html=await fs.readFile(file,'utf8');
  assert(html.includes(`href="${siteOrigin+route.canonical}"`),route.path);
  assert(html.includes('name="description"'));assert(html.includes('property="og:image"'));assert(html.includes('name="twitter:card"'));assert(html.includes('<noscript><main>'));
  const data=JSON.parse(html.match(/<script id="route-structured-data" type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  assert.equal(data['@context'],'https://schema.org');assert(data['@graph'].every(node=>node['@type']));
  assert(!JSON.stringify(data).match(/aggregateRating|reviewRating|award|alumniOf/));
  if(base){const response=await fetch(base+route.path);assert.equal(response.status,200,route.path);assert((response.headers.get('content-type')||'').includes('text/html'));const raw=await response.text();assert.equal(raw,html,`Raw deep link ${route.path}`);responses++;}
 }
 if(base){for(const [route,mime] of [['/robots.txt','text/plain'],['/sitemap.xml','xml'],['/social-preview.png','image/png']]){const r=await fetch(base+route);assert.equal(r.status,200);assert(r.headers.get('content-type').includes(mime));}const r=await fetch(base+'/does-not-exist-hardening');assert.equal(r.status,404);assert((await r.text()).includes('noindex'));}
 const config=JSON.parse(await fs.readFile('vercel.json','utf8'));assert(config.cleanUrls);assert(!config.rewrites.some(r=>r.destination==='/index.html'));
 console.log(`SEO: ${publicRouteInventory.length} static shells, ${locs.length} unique canonical sitemap entries, structured-data shapes and ${responses} raw HTTP responses passed.`);
}finally{await fs.rm(dir,{recursive:true,force:true})}
