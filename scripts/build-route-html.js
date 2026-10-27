import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { build } from 'esbuild';
const directory=await fs.mkdtemp(path.join(os.tmpdir(),'portfolio-routes-'));
try {
  const output=path.join(directory,'routes.mjs');
  await build({entryPoints:['src/data/siteRoutes.js'],bundle:true,platform:'node',format:'esm',outfile:output,loader:{'.png':'empty','.webp':'empty'}});
  const {publicRouteInventory,canonicalPublicRoutes,siteOrigin,notFoundMetadata}=await import(output);
  const template=await fs.readFile('dist/index.html','utf8');
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const html=page=>{
    const url=page.canonical?siteOrigin+page.canonical:null;
    const structured={ '@context':'https://schema.org','@graph':[
      {'@type':'Person','@id':siteOrigin+'/#person',name:'Keeno Smith',url:siteOrigin,jobTitle:['Full-Stack Software Engineer','AI Engineer','Cloud Engineer'],sameAs:['https://github.com/keenosmith-del','https://www.linkedin.com/in/keenotreysmith/']},
      {'@type':'WebSite','@id':siteOrigin+'/#website',url:siteOrigin,name:'Keeno Smith — Engineering Portfolio',author:{'@id':siteOrigin+'/#person'}},
      ...(url?[{'@type':page.repository?'CreativeWork':'WebPage',name:page.title,description:page.description,url,author:{'@id':siteOrigin+'/#person'},...(page.repository?{isBasedOn:page.repository}: {})}]:[]),
    ]};
    const tags=`<title>${escape(page.title)}</title>\n<meta name="description" content="${escape(page.description)}">\n<meta name="robots" content="${page.indexable?'index, follow':'noindex, follow'}">\n${url?`<link rel="canonical" href="${escape(url)}">`:''}\n${Object.entries({'og:title':page.title,'og:description':page.description,'og:url':url||siteOrigin,'og:type':'website','og:image':siteOrigin+'/social-preview.png','og:image:alt':'Keeno Smith — Software, AI and Cloud Engineer'}).map(([key,value])=>`<meta property="${key}" content="${escape(value)}">`).join('\n')}\n${Object.entries({'twitter:card':'summary_large_image','twitter:title':page.title,'twitter:description':page.description,'twitter:image':siteOrigin+'/social-preview.png'}).map(([key,value])=>`<meta name="${key}" content="${escape(value)}">`).join('\n')}\n<script id="route-structured-data" type="application/ld+json">${JSON.stringify(structured).replace(/</g,'\\u003c')}</script>`;
    // This is a static metadata/summary shell, not a snapshot of animated DOM.
    // React still creates its normal tree; no hydration mismatch or frozen animation.
    const fallback=`<noscript><main><h1>${escape(page.title)}</h1><p>${escape(page.description)}</p>${page.deployment?`<p>${escape(page.deployment)}</p>`:''}${page.repository?`<p><a href="${escape(page.repository)}">Source repository</a></p>`:''}<nav><a href="/">Back to portfolio</a> <a href="/explore">Explore</a> <a href="/cv">View CV</a></nav></main></noscript>`;
    return template.replace(/<title>.*?<\/title>/s,tags).replace('<div id="root"></div>',`<div id="root"></div>${fallback}`);
  };
  for(const page of publicRouteInventory){
    if(!/^\/(?:[a-z0-9-]+\/?)*$/.test(page.path))throw Error('Invalid public path');
    const target=page.path==='/'?'dist/index.html':`dist${page.path}.html`;
    await fs.mkdir(path.dirname(target),{recursive:true});await fs.writeFile(target,html(page));
  }
  await fs.writeFile('dist/404.html',html(notFoundMetadata));
  const urls=canonicalPublicRoutes.map(page=>siteOrigin+page.path);
  if(new Set(urls).size!==urls.length)throw Error('Duplicate sitemap canonical');
  await fs.writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url=>`<url><loc>${escape(url)}</loc></url>`).join('')}</urlset>\n`);
  await fs.writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${siteOrigin}/sitemap.xml\n`);
  console.log(`Generated ${publicRouteInventory.length} static route shells, ${urls.length} canonical sitemap routes, robots and 404. No private/API routes rendered.`);
}finally{await fs.rm(directory,{recursive:true,force:true})}
