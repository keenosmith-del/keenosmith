// Compare original source and final production output on the same browser.
import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
const browser=await puppeteer.launch({headless:true});
const selectors='h1,h2,.navigation-pill,.hero-avatar,.hero-copy,.cloud-projects,.cloud-tile,.cloud-artwork img,.explore-hero,.explore-tabs,.explore-project-row,.explore-project h2,.cv-page,.cv-page-controls,.recruiter-hero,.recruiter-input,.recruiter-output,.project-hero,.project-hero p,.project-hero a,.project-hero button';
const routes=['/','/explore','/recruiter-view','/cv','/projects/banking-risk','/projects/microsoft-devops','/projects/crewai-revenueops','/projects/ms-assessflow','/projects/eventops-streamlit'];
const results=[];
try {
 const page=await browser.newPage();
 for(const width of [1440,1024,768,390,320]) {
  await page.setViewport({width,height:900});
  for(const route of routes) {
   const captures=[];
   for(const base of [process.env.PORTFOLIO_BASELINE_URL||'http://127.0.0.1:5175',process.env.PORTFOLIO_TEST_URL||'http://127.0.0.1:4188']) {
    await page.goto(base+route,{waitUntil:'networkidle0'});await page.waitForSelector('h1');
    await new Promise(resolve=>setTimeout(resolve,1000));
    captures.push(await page.$$eval(selectors,elements=>elements.map(e=>{const r=e.getBoundingClientRect();return {tag:e.tagName,text:/H[12]/.test(e.tagName)?e.textContent:null,x:r.x,y:r.y+scrollY,width:r.width,height:r.height}})));
   }
   const [before,after]=captures;
   const differences=[];
   if(before.length!==after.length)differences.push({reason:'element count',before:before.length,after:after.length});
   for(let i=0;i<Math.min(before.length,after.length);i++) {
    const delta={};for(const key of ['x','y','width','height'])if(Math.abs(before[i][key]-after[i][key])>.5)delta[key]={before:before[i][key],after:after[i][key]};
    if(before[i].tag!==after[i].tag||before[i].text!==after[i].text)delta.identity={before:before[i].text,after:after[i].text};
    if(Object.keys(delta).length)differences.push({index:i,tag:before[i].tag,text:before[i].text,delta});
   }
   results.push({route,width,elements:before.length,differences});
  }
 }
 await fs.writeFile('/tmp/portfolio-hardening/final/layout-comparison.json',JSON.stringify(results,null,2));
 console.log({cases:results.length,elements:results.reduce((n,r)=>n+r.elements,0),casesWithDifferences:results.filter(r=>r.differences.length)});
}finally{await browser.close()}
