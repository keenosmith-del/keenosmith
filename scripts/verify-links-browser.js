import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import puppeteer from 'puppeteer';
import { build } from 'esbuild';
const base=process.env.PORTFOLIO_TEST_URL||'http://127.0.0.1:4181';
await build({entryPoints:['src/data/siteRoutes.js'],bundle:true,platform:'node',format:'esm',outfile:'/tmp/portfolio-link-routes.mjs',loader:{'.png':'empty','.webp':'empty'}});
const {canonicalPublicRoutes}=await import('/tmp/portfolio-link-routes.mjs');
const browser=await puppeteer.launch({headless:true});const links=new Set(),failures=[],errors=[];
try{
 const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
 for(const route of [...canonicalPublicRoutes.map(r=>r.path),'/explore?tab=credentials','/cv?type=ai','/cv?type=cloud']){
  await page.goto(base+route,{waitUntil:'networkidle0'});await page.waitForSelector('h1');
  const found=await page.$$eval('a[href]',elements=>elements.map(e=>({href:e.getAttribute('href'),blank:e.target==='_blank',rel:e.rel})));
  for(const link of found){links.add(link.href);if(link.blank&&!link.rel.includes('noopener'))failures.push({route,reason:'unsafe external target',href:link.href})}
 }
 const local=[...links].filter(href=>href.startsWith('/')&&!href.startsWith('//'));
 const responses=[];
 for(const href of local){const r=await fetch(base+href,{signal:AbortSignal.timeout(15000)});responses.push({href,status:r.status,type:r.headers.get('content-type')});if(r.status!==200)failures.push({href,status:r.status});if(href.split(/[?#]/)[0].endsWith('.pdf')){const bytes=Buffer.from(await r.arrayBuffer());if(!r.headers.get('content-type')?.includes('application/pdf')||bytes.subarray(0,5).toString()!=='%PDF-')failures.push({href,reason:'invalid PDF delivery'})}}
 const documents=(await fs.readdir('public/documents')).filter(p=>p.endsWith('.pdf'));for(const document of documents){const r=await fetch(base+'/documents/'+document);assert.equal(r.status,200);assert(r.headers.get('content-type')?.includes('application/pdf'))}
 const report={routes:canonicalPublicRoutes.length,links:[...links],responses,documents:documents.length,failures,errors,externalUnverified:[...links].filter(h=>/^https?:/.test(h))};
 await fs.mkdir('/tmp/portfolio-hardening/final',{recursive:true});await fs.writeFile('/tmp/portfolio-hardening/final/links.json',JSON.stringify(report,null,2));console.log({routes:report.routes,links:links.size,local:local.length,documents:documents.length,failures,errors});assert.deepEqual(failures,[]);assert.deepEqual(errors,[]);
}finally{await browser.close()}
