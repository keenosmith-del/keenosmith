import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { build } from 'esbuild';
import puppeteer from 'puppeteer';
const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:4178';
const output = '/tmp/portfolio-tile-correction';
await fs.mkdir(output,{recursive:true});
await build({stdin:{contents:`export { curatedProjects } from './src/components/pages/Explore/utils/exploreIndex.js';`,resolveDir:process.cwd()},bundle:true,platform:'node',format:'esm',outfile:`${output}/expected.mjs`,loader:{'.png':'empty'}});
const {curatedProjects}=await import(`${output}/expected.mjs`);
assert.equal(curatedProjects.length,22);
const topSets=new Set(), lowerSets=new Set();
for(const project of curatedProjects){
  assert(project.topSkills?.length && project.tileSkills?.length,project.id);
  assert(['details','title-details'].includes(project.visibility),project.id);
  for(const skill of [...project.topSkills,...project.tileSkills]) assert(project.implementedTechnologies.includes(skill),`${project.id}: unsupported display pill ${skill}`);
  assert.equal(new Set([...project.topSkills,...project.tileSkills]).size,project.topSkills.length+project.tileSkills.length,project.id);
  topSets.add(project.topSkills.join('|')); lowerSets.add(project.tileSkills.join('|'));
  assert.notDeepEqual(project.tileSkills,['React','TypeScript','Vite']);
}
assert.equal(topSets.size,22,'Top pills must be deliberately project-specific');
assert.equal(lowerSets.size,22,'Each technology-pill selection must be project-specific');
const browser=await puppeteer.launch({headless:true});
const errors=[], results=[];
try{
  const page=await browser.newPage();page.on('pageerror',error=>errors.push(error.message));
  // Test the actual resting states, not a gallery forced visible by reduced motion.
  for(const width of [1440,1024,768,390,320]){
    await page.setViewport({width,height:1000});
    await page.goto(`${base}/explore?tab=projects`,{waitUntil:'networkidle0'});
    const fine=await page.evaluate(()=>matchMedia('(hover:hover) and (pointer:fine)').matches);
    assert(fine,'Desktop regression must exercise real hover-capable CSS');
    await page.mouse.move(0,0);
    for(const project of curatedProjects){
      const selector=`[data-explore-id="${project.id}"]`;
      await page.$eval(selector,e=>e.scrollIntoView({behavior:'instant',block:'center'}));
      await page.mouse.move(0,0);
      await page.waitForFunction(sel=>document.querySelector(`${sel} img`).naturalWidth>0,{},selector);
      await page.waitForFunction(sel=>Number(getComputedStyle(document.querySelector(`${sel} .explore-project-arrow`)).opacity)<.05,{},selector);
      const rest=await page.$eval(selector,e=>{
        const box=e.getBoundingClientRect(),image=e.querySelector('img').getBoundingClientRect();
        const visible=node=>!!node&&getComputedStyle(node).display!=='none'&&getComputedStyle(node).visibility!=='hidden'&&Number(getComputedStyle(node).opacity)>.95&&node.getBoundingClientRect().height>0;
        return {reveal:Number(getComputedStyle(e.querySelector('.explore-project-reveal')).opacity),title:visible(e.querySelector('h2')),top:visible(e.querySelector('.explore-domain')),description:visible(e.querySelector('.explore-description')),pills:visible(e.querySelector('.explore-tags')),arrow:Number(getComputedStyle(e.querySelector('.explore-project-arrow')).opacity),imageBottom:Math.abs(image.bottom-box.bottom),fit:getComputedStyle(e.querySelector('img')).objectFit,position:getComputedStyle(e.querySelector('img')).objectPosition};
      });
      assert(rest.reveal>.95&&rest.title&&rest.top,`${project.id} missing initial title/top at ${width}`);
      assert(rest.imageBottom<1&&rest.fit==='contain'&&rest.position==='50% 100%',`${project.id} artwork is not contained at the bottom at ${width}`);
      assert.equal(await page.$eval(`${selector} .explore-domain`,e=>e.textContent),project.topSkills.join(' · '));
      assert.deepEqual(await page.$$eval(`${selector} .explore-tags span`,els=>els.map(e=>e.textContent)),project.tileSkills);
      if(project.id==='crewai-revenueops')assert.equal(rest.description || rest.pills,width<=1100,`CrewAI resting state must match Chaos at ${width}`);
      if(['eventops-streamlit','ms-assessflow'].includes(project.id))assert(rest.description&&rest.pills,`${project.id} must show details initially at ${width}`);
      await page.hover(selector);
      await page.waitForFunction(sel=>Number(getComputedStyle(document.querySelector(`${sel} .explore-project-arrow`)).opacity)>.95,{},selector);
      if(project.id==='crewai-revenueops') {
        assert(await page.$eval(`${selector} .explore-description`,e=>getComputedStyle(e).display!=='none'&&e.textContent.trim().length>0),'CrewAI must reveal its description on hover');
        const classes=await page.$$eval('[data-explore-id="crewai-revenueops"], [data-explore-id="distributed-reliability"]',els=>els.map(e=>[...e.classList].filter(c=>!c.startsWith('explore-tone-')).sort().join(' ')));
        assert.equal(classes[0],classes[1],'CrewAI must use the same presentation classes as Chaos');
      }
      const content=await page.$eval(selector,e=>{
        const box=e.getBoundingClientRect();
        return [...e.querySelectorAll('.explore-domain,h2,.explore-description,.explore-tags,.explore-project-arrow')].filter(node=>getComputedStyle(node).display!=='none').map(node=>{const r=node.getBoundingClientRect();return {name:node.className||node.tagName,left:r.left-box.left,right:box.right-r.right,top:r.top-box.top,bottom:box.bottom-r.bottom};});
      });
      for(const bounds of content)assert(bounds.left>=-1&&bounds.right>=-1&&bounds.top>=-1&&bounds.bottom>=-1,`${project.id} clipped ${bounds.name} at ${width}: ${JSON.stringify(bounds)}`);
      if(width===1440||width===320)await (await page.$(selector)).screenshot({path:`${output}/${project.id}-${width}-hover.png`});
      if(['crewai-revenueops','eventops-streamlit','ms-assessflow'].includes(project.id)){
        await page.mouse.move(0,0);
        await page.waitForFunction(sel=>Number(getComputedStyle(document.querySelector(`${sel} .explore-project-arrow`)).opacity)<.05,{},selector);
        await (await page.$(selector)).screenshot({path:`${output}/${project.id}-${width}-rest.png`});
        await page.keyboard.press('Tab');await page.focus(selector);
        await page.waitForFunction(sel=>Number(getComputedStyle(document.querySelector(`${sel} .explore-project-arrow`)).opacity)>.95,{},selector);
        assert(await page.$eval(`${selector} .explore-tags`,e=>getComputedStyle(e).display!=='none'));
        await page.$eval(selector,e=>e.blur());
      }
    }
    assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),`Page overflow ${width}`);
    results.push({width,tiles:22,artwork:'contained at bottom',restHoverFocus:'passed'});
  }
  await page.setViewport({width:390,height:844,isMobile:true,hasTouch:true});
  await page.goto(`${base}/explore?tab=projects`,{waitUntil:'networkidle0'});
  assert(await page.evaluate(()=>matchMedia('(hover:none)').matches));
  for(const id of ['crewai-revenueops','eventops-streamlit','ms-assessflow']){
    await page.$eval(`[data-explore-id="${id}"]`,e=>e.scrollIntoView({behavior:'instant',block:'center'}));
    assert(await page.$eval(`[data-explore-id="${id}"] .explore-tags`,e=>getComputedStyle(e).display!=='none'));
    await (await page.$(`[data-explore-id="${id}"]`)).screenshot({path:`${output}/${id}-touch.png`});
  }
  assert.deepEqual(errors,[]);
  await fs.writeFile(`${output}/results.json`,JSON.stringify({results,topPillSelections:topSets.size,technologySelections:lowerSets.size,touch:'passed',errors},null,2));
  console.log('PASS: 22 source-backed unique top/technology pill selections; all tiles at 5 sizes; actual resting/hover/focus states, touch, artwork bottom alignment and caption/control bounds.');
}finally{await browser.close();}
