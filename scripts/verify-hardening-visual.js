import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
const phase=process.argv[2]||'baseline'; const out=`/tmp/portfolio-hardening/${phase}`;await fs.mkdir(out,{recursive:true});
const browser=await puppeteer.launch({headless:true});const results=[];
try {const page=await browser.newPage();
for(const width of [1440,1024,768,390,320]) {
 await page.setViewport({width,height:900});
 for(const [id,route,selector] of [['hero','/','.hero'],['cloud','/','#cloud'],['ai','/','#ai'],['full-stack','/','#full-stack'],['selected','/','#projects'],['explore','/explore','main'],['recruiter','/recruiter-view','main'],['cv','/cv','main'],['assistant','/','.portfolio-skills-helper'],...['banking-risk','microsoft-devops','crewai-revenueops','ms-assessflow','eventops-streamlit'].map(id=>[id,`/projects/${id}`,'.project-hero'])]) {
 await page.goto(`${process.env.PORTFOLIO_TEST_URL||'http://127.0.0.1:5173'}${route}`,{waitUntil:'networkidle0'});
 if(id==='assistant')await page.click(selector);else if(await page.$(selector))await page.$eval(selector,e=>e.scrollIntoView({behavior:'instant',block:'start'}));
 await new Promise(r=>setTimeout(r,900));
 const geometry=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,title:document.title,headings:[...document.querySelectorAll('h1,h2')].map(e=>({text:e.textContent,font:getComputedStyle(e).font,fontSize:getComputedStyle(e).fontSize,color:getComputedStyle(e).color})),background:getComputedStyle(document.body).backgroundColor}));
 await page.screenshot({path:`${out}/${id}-${width}.png`});results.push({id,width,...geometry});
 }
}
await fs.writeFile(`${out}/visual.json`,JSON.stringify(results,null,2));console.log(`${phase}: ${results.length} screenshots; overflow: ${JSON.stringify(results.filter(r=>r.overflow).map(r=>[r.id,r.width]))}`);
}finally{await browser.close()}
