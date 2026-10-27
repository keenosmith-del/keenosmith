import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import puppeteer from 'puppeteer';

const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:5173';
const routes = ['crewai-revenueops','banking-risk','microsoft-devops','gcp-retail','eventops-intelligence','ollama','n8n','claude','distributed-reliability','deepseek','telecom-billing','field-service','fleet-operations','hugging-face','productivity-platform','music-api','enterprise-workspace','ai-assistant','intelligence-manufacturing-llmops','enterprise-ai-mlops'].map(id=>`/projects/${id}`).concat('/companies/kailor');
const failures = []; const errors = []; const results = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const browser = await puppeteer.launch({headless:true});
const output = '/tmp/portfolio-audit';
await fs.mkdir(output,{recursive:true});
try {
  const page = await browser.newPage();
  page.on('pageerror', e=>errors.push(e.message));
  page.on('console', message=>{ if(message.type()==='error' && /unique.*key/i.test(message.text())) errors.push(message.text()); });
  for (const viewport of [{width:1440,height:900},{width:390,height:844}]) {
    await page.setViewport(viewport);
    for (const route of routes) {
      await page.goto(base+route,{waitUntil:'networkidle0'});
      await page.waitForSelector('.project-hero');
      await page.waitForFunction(()=>Number(document.querySelector('.project-hero-content').style.getPropertyValue('--scroll-load-opacity'))>=1);
      const id=route.split('/').at(-1);
      const facts = await page.evaluate(()=>{
        const hero=document.querySelector('.project-hero');
        const content=hero.firstElementChild.getBoundingClientRect();
        const main=document.querySelector('.project-case-study');
        const closing=main.querySelector('article > section:last-child');
        const footer=main.querySelector(':scope > footer');
        const numericLabels=[...main.querySelectorAll('article span')].filter(e=>/^0[1-9]\s*(?:\/)?$/.test(e.textContent.trim()));
        return {
          title:main.querySelector('h1')?.textContent,
          overflow:document.documentElement.scrollWidth>innerWidth,
          heroBottom:content.bottom,
          heroHeight:hero.getBoundingClientRect().height,
          hasDate:/^\w+ \d{4}$/.test(hero.querySelector('time')?.textContent || ''),
          conclusion:!!closing?.querySelector('h2') && !!closing?.querySelector('p') && !closing.querySelector('button'),
          footerText:footer?.textContent.trim().replace(/\s+/g,' '),
          footerTop:footer?.querySelector('button')?.textContent.trim(),
          numericLabels:numericLabels.map(e=>e.textContent),
          underlines:[...main.querySelectorAll('a, button')].filter(e=>getComputedStyle(e).textDecorationLine.includes('underline')).map(e=>e.textContent.trim()),
          documentIcons:[...main.querySelectorAll('a')].filter(e=>/brief|summary/i.test(e.textContent)&&e.querySelector('svg')).map(e=>e.textContent.trim()),
          fadeTargets:main.querySelectorAll('[data-scroll-fade]').length,
        };
      });
      check(!!facts.title,`${id}: missing title`);
      check(!facts.overflow,`${id} ${viewport.width}: horizontal overflow`);
      check(facts.heroBottom<=viewport.height+1,`${id} ${viewport.width}: hero content ends at ${Math.round(facts.heroBottom)}`);
      check(facts.heroHeight<=viewport.height+1,`${id} ${viewport.width}: hero height ${Math.round(facts.heroHeight)}`);
      check(facts.hasDate,`${id}: missing month/year`);
      check(facts.conclusion,`${id}: missing closing headline/description`);
      check(facts.footerText==='Back to portfolio',`${id}: footer text '${facts.footerText}'`);
      check(facts.footerTop==='',`${id}: top control has visible text`);
      check(facts.numericLabels.length===0,`${id}: decorative numbers ${facts.numericLabels}`);
      check(facts.underlines.length===0,`${id}: underlines ${facts.underlines}`);
      check(facts.documentIcons.length===0,`${id}: document button icons`);
      check(facts.fadeTargets>=4,`${id}: no scroll fading`);
      await page.screenshot({path:`${output}/${id}-${viewport.width}-hero.png`});
      const trigger=await page.evaluateHandle(()=>[...document.querySelectorAll('button')].find(e=>/tech(?:nology)?\s*stack/i.test(e.textContent)));
      if (!(await trigger.jsonValue())) { check(false,`${id}: no tech stack trigger`); continue; }
      await trigger.asElement().evaluate(e=>e.scrollIntoView({behavior:'instant',block:'center'}));
      await trigger.asElement().click();
      await page.waitForSelector('[role="dialog"]');
      const modal=await page.evaluate(()=>{
        const dialog=document.querySelector('[role="dialog"]');const close=dialog.querySelector('button'); const rect=dialog.getBoundingClientRect();
        return {focused:dialog.contains(document.activeElement),locked:document.body.style.overflow==='hidden',label:!!dialog.getAttribute('aria-label')||!!document.getElementById(dialog.getAttribute('aria-labelledby')),groups:dialog.querySelectorAll('.project-modal-group').length,pills:dialog.querySelectorAll('.project-modal-pills span').length,fits:rect.top>=0&&rect.bottom<=innerHeight,closeSize:close.getBoundingClientRect().width};
      });
      check(modal.focused&&modal.locked&&modal.label&&modal.fits&&modal.closeSize===40,`${id} ${viewport.width}: modal accessibility/geometry ${JSON.stringify(modal)}`);
      check(modal.groups>=4&&modal.pills>=15,`${id}: incomplete tech modal ${JSON.stringify(modal)}`);
      await page.keyboard.press('Tab');
      check(await page.$eval('.project-modal-close',e=>e===document.activeElement),`${id}: tab escaped dialog`);
      await page.waitForFunction(()=>Number(getComputedStyle(document.querySelector('[role="dialog"]')).opacity)>.99);
      await page.screenshot({path:`${output}/${id}-${viewport.width}-modal.png`});
      await page.keyboard.press('Escape');
      check(await page.$('[role="dialog"]')===null,`${id}: Escape failed`);
      check(await trigger.asElement().evaluate(e=>e===document.activeElement),`${id}: focus not restored`);
      await page.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';window.scrollTo({top:document.body.scrollHeight,behavior:'instant'});});
      await page.waitForFunction(()=>Number(getComputedStyle(document.querySelector('article > section:last-child')).opacity)>.95);
      await page.screenshot({path:`${output}/${id}-${viewport.width}-closing.png`});
      results.push({route,width:viewport.width,...facts,modal});
    }
  }
  await fs.writeFile(`${output}/results.json`,JSON.stringify({results,failures,errors},null,2));
  console.log(JSON.stringify({pages:results.length,failures,errors},null,2));
  assert.deepEqual(failures,[]); assert.deepEqual(errors,[]);
} finally { await browser.close(); }
