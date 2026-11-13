import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
import AxePuppeteer from '@axe-core/puppeteer';
import fs from 'node:fs/promises';

const phase=process.argv[2]||'final';
const base=process.env.PORTFOLIO_TEST_URL||'http://127.0.0.1:4181';
const browser=await puppeteer.launch({headless:true});
const results=[];
try {
  const page=await browser.newPage();
  await page.setViewport({width:1440,height:900});
  async function scan(route,state='initial',selector) {
    let checker=new AxePuppeteer(page);
    if(selector) checker=checker.include(selector);
    const result=await checker.analyze();
    results.push({route,state,violations:result.violations.map(({id,impact,description,nodes})=>({id,impact,description,nodes:nodes.map(({html,target,failureSummary})=>({html,target,failureSummary}))})),incomplete:result.incomplete.map(r=>r.id)});
  }
  for(const route of ['/','/explore','/recruiter-view','/cv','/projects/banking-risk','/projects/microsoft-devops','/projects/crewai-revenueops','/projects/ms-assessflow','/projects/eventops-streamlit']) {
    await page.goto(base+route,{waitUntil:'networkidle0'});
    await new Promise(resolve=>setTimeout(resolve,800));
    await scan(route);
    if(route.startsWith('/projects/')) {
      const trigger=await page.evaluateHandle(()=>[...document.querySelectorAll('button')].find(e=>/tech(?:nology)?\s*stack/i.test(e.textContent)));
      await trigger.asElement().evaluate(e=>e.scrollIntoView({behavior:'instant',block:'center'}));
      await trigger.asElement().click();
      await page.waitForSelector('[role="dialog"]');
      await page.waitForFunction(()=>getComputedStyle(document.querySelector('[role="dialog"]')).opacity==='1');
      await scan(route,'technology modal','[role="dialog"]');
      await page.keyboard.press('Escape');
    }
    if(route==='/') {
      await page.click('.navigation-links-trigger');
      await new Promise(resolve=>setTimeout(resolve,500));
      await scan(route,'links menu','.navigation-links-panel');
      await page.keyboard.press('Escape');
      await page.click('.navigation-chat');
      await new Promise(resolve=>setTimeout(resolve,500));
      await scan(route,'contact dialog','[role="dialog"]');
      await page.keyboard.press('Escape');
      await page.click('.portfolio-skills-helper');
      await page.waitForFunction(()=>document.activeElement.id==='assistant-input');
      await new Promise(resolve=>setTimeout(resolve,800));
      await scan(route,'assistant dialog','[role="dialog"]');
      await page.keyboard.press('Escape');
    }
  }
  await fs.mkdir(`/tmp/portfolio-hardening/${phase}`,{recursive:true});
  await fs.writeFile(`/tmp/portfolio-hardening/${phase}/accessibility.json`,JSON.stringify(results,null,2));
  console.log(results.map(r=>({route:r.route,state:r.state,violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.length}))})));
  assert(!results.some(r=>r.violations.length),'Automated accessibility violations remain; inspect report');
} finally { await browser.close(); }
