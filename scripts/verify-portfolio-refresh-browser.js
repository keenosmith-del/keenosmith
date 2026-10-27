import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { build } from 'esbuild';
import puppeteer from 'puppeteer';
const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:4178';
const output = '/tmp/portfolio-full-refresh-qa';
await fs.mkdir(output, { recursive: true });
await build({ stdin: { contents: `export { skillIndex } from './src/components/pages/Explore/utils/exploreIndex.js';`, resolveDir: process.cwd() }, bundle: true, platform: 'node', format: 'esm', outfile: `${output}/expected.mjs`, loader: { '.png': 'empty' } });
const { skillIndex } = await import(`${output}/expected.mjs`);
const projects = [
  ['crewai-revenueops', 'CrewAI RevenueOps Intelligence', '#353336', 'crewai-revenueops'],
  ['eventops-streamlit', 'Low-Code Streamlit EventOps', '#9b9692', 'eventops-low-code-streamlit'],
  ['ms-assessflow', 'Microsoft AssessFlow', '#b0814b', 'ms-assessflow'],
];
const rgb = hex => `rgb(${[1,3,5].map(i => parseInt(hex.slice(i,i+2),16)).join(', ')})`;
const browser = await puppeteer.launch({ headless: true });
const errors = [];
const results = [];
try {
  const page = await browser.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewport({ width, height: 1000 });
    await page.goto(`${base}/explore?tab=projects`, { waitUntil:'networkidle0' });
    assert.equal(await page.$$eval('.explore-project', tiles => tiles.length), 22);
    assert.equal(await page.$$eval('.explore-project a, .explore-project button', controls => controls.length), 0);
    assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth));
    for (const [id, title, color, artwork] of projects) {
      const selector = `[data-explore-id="${id}"]`;
      assert.equal(await page.$$eval(selector, els => els.length), 1);
      assert.equal(await page.$eval(`${selector} h2`, e => e.textContent), title);
      assert.equal(await page.$eval(selector, e => getComputedStyle(e).backgroundColor), rgb(color));
      assert.equal(await page.$eval(selector, e => e.getAttribute('href')), id === 'eventops-streamlit' ? `/explore/projects/${id}` : `/projects/${id}`);
      await page.$eval(selector, e => e.scrollIntoView({behavior:'instant',block:'center'}));
      await page.waitForFunction(sel => document.querySelector(`${sel} img`).naturalWidth > 0, {}, selector);
      assert((await page.$eval(`${selector} img`, e => e.src)).includes(artwork));
      await page.hover(selector);
      await (await page.$(selector)).screenshot({ path: `${output}/${id}-${width}.png` });
      await page.focus(selector);
      await page.keyboard.press('Enter');
      const completed = id !== 'eventops-streamlit';
      const pageSelector = id === 'ms-assessflow' ? '.assessflow-project' : '.revenueops-project';
      await page.waitForSelector(completed ? `${pageSelector} h1` : '.explore-preview h1');
      if (completed) assert.match(await page.$eval('h1', e => e.textContent), id === 'ms-assessflow' ? /Microsoft.*AssessFlow/ : /CrewAI RevenueOps.*Intelligence/);
      else {
        assert.equal(await page.$eval('h1', e => e.textContent), title);
        assert.match(await page.$eval('.explore-eyebrow', e => e.textContent), /Built.*coming soon/);
      }
      const repository = id === 'eventops-streamlit' ? 'eventops-intelligence-streamlit' : id;
      assert.equal(await page.$eval(completed ? `${pageSelector} header a[href^="https://github.com"]` : '.project-repository-button', e => e.href), `https://github.com/keenosmith-del/${repository}`);
      assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${id} preview overflow ${width}`);
      if (!completed) {
        assert(await page.$eval('.explore-preview > section', e => e.getBoundingClientRect().top >= 96), `${id} preview header overlaps navigation`);
        assert(await page.evaluate(() => document.querySelector('.explore-preview > footer').getBoundingClientRect().top > document.querySelector('.explore-preview > section').getBoundingClientRect().bottom), `${id} preview footer must follow content`);
      }
      await page.screenshot({path:`${output}/${id}-preview-${width}.png`});
      await page.click('[data-project-back]');
      await page.waitForSelector('.explore-project');
      assert.equal(new URL(page.url()).search, '?tab=projects');
    }
    for (const [skill, id] of [['CrewAI','crewai'],['FastEmbed','fastembed'],['SQLAlchemy','sqlalchemy'],['OIDC','oidc']]) {
      await page.goto(`${base}/explore?tab=skills&q=${skill}`, {waitUntil:'networkidle0'});
      await page.click(`[data-explore-id="${id}"]`);
      await page.waitForSelector('dialog[open]');
      assert.equal(await page.$eval('#explore-skill-title',e=>e.textContent), skill);
      assert(!await page.$eval('dialog',e=>e.scrollWidth>e.clientWidth));
      if (skill === 'CrewAI') assert(await page.$('dialog a[href="/projects/crewai-revenueops"]'));
      await page.screenshot({path:`${output}/skill-${id}-${width}.png`});
      await page.keyboard.press('Escape');
      await page.waitForSelector('dialog[open]',{hidden:true});
    }
    results.push({width, projects:3, skillPanels:4, overflow:false});
  }
  await page.setViewport({width:1440,height:1000});
  await page.goto(`${base}/explore?tab=skills`,{waitUntil:'networkidle0'});
  assert.equal(await page.$$eval('.explore-skill-pill',els=>els.length),skillIndex.length);
  for (const skill of skillIndex) {
    await page.click(`.explore-skill-pill[data-explore-id="${skill.id}"]`);
    await page.waitForSelector('dialog[open]');
    assert.equal(await page.$eval('#explore-skill-title',e=>e.textContent),skill.name);
    assert.equal(await page.$eval('dialog [role="meter"]',e=>Number(e.getAttribute('aria-valuenow'))),skill.assessment.band);
    await page.keyboard.press('Escape');
    await page.waitForSelector('dialog[open]',{hidden:true});
  }
  for (const [query, id] of [['CrewAI','crewai-revenueops'],['FastEmbed','eventops-streamlit'],['AssessFlow','ms-assessflow']]) {
    await page.goto(`${base}/explore?tab=projects&q=${query}`,{waitUntil:'networkidle0'});
    assert(await page.$(`[data-explore-id="${id}"]`));
    assert.equal(await page.$$eval(`[data-explore-id="${id}"]`,els=>els.length),1);
    await page.click(`[data-explore-id="${id}"]`);
    await page.waitForSelector(id === 'crewai-revenueops' ? '.revenueops-project' : id === 'ms-assessflow' ? '.assessflow-project' : '.explore-preview');
    await page.click('[data-project-back]');
    await page.waitForSelector('.explore-project');
    assert.equal(new URL(page.url()).search,`?tab=projects&q=${query}`);
  }
  await page.goto(`${base}/explore?tab=projects&category=ai`,{waitUntil:'networkidle0'});
  for(const [id] of projects) assert(await page.$(`[data-explore-id="${id}"]`));
  await page.goto(`${base}/explore?tab=projects&category=backend`,{waitUntil:'networkidle0'});
  assert(await page.$('[data-explore-id="crewai-revenueops"]'));
  assert(await page.$('[data-explore-id="ms-assessflow"]'));
  assert(!await page.$('[data-explore-id="eventops-streamlit"]'));
  await page.goto(`${base}/explore?tab=projects&category=cloud`,{waitUntil:'networkidle0'});
  assert(await page.$('[data-explore-id="ms-assessflow"]'));
  await page.goto(`${base}/explore?tab=projects&category=infrastructure`,{waitUntil:'networkidle0'});
  assert(await page.$('[data-explore-id="ms-assessflow"]'));
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'no-preference'}]);
  await page.goto(base,{waitUntil:'networkidle0'});
  assert.equal(await page.$eval('.ai-counter',e=>e.getAttribute('aria-label')),'15+ AI projects');
  assert.equal(await page.$eval('.ai-counter strong span',e=>e.textContent),'0');
  await page.$eval('.ai-counter',e=>e.scrollIntoView({behavior:'instant',block:'center'}));
  await page.waitForFunction(()=>document.querySelector('.ai-counter strong span').textContent==='15',{timeout:4000});
  assert.equal(await page.$$eval('.ai-projects .cloud-tile',els=>els.length),2);
  await page.screenshot({path:`${output}/ai-counter-1440.png`});
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  await page.reload({waitUntil:'networkidle0'});
  assert.equal(await page.$eval('.ai-counter strong span',e=>e.textContent),'15');
  assert.match(await page.$eval('#timeline',e=>e.textContent),/CrewAI financial investigations/);
  await page.goto(`${base}/companies/kailor`,{waitUntil:'networkidle0'});
  assert.equal(await page.$eval('.kk-hero-meta time',e=>e.textContent),'February 2022');
  assert(!/curiosity/.test(await page.$eval('main',e=>e.textContent)));
  assert.deepEqual(errors,[]);
  const receipt={viewports:results,allSkillPanels:skillIndex.length,searchAndBack:'passed',counterAnimationAndReducedMotion:'passed',companyFollowups:'passed',errors};
  await fs.writeFile(`${output}/results.json`,JSON.stringify(receipt,null,2));
  console.log(JSON.stringify(receipt));
} finally {await browser.close();}
