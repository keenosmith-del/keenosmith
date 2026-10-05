import puppeteer from 'puppeteer';
import assert from 'node:assert/strict';
const browser = await puppeteer.launch({ headless:true });
const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:5173';
try {
 const page = await browser.newPage(); const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setViewport({width:1440,height:1000});await page.goto(base,{waitUntil:'networkidle0'});
 await page.click('a[href="/recruiter-view"]');await page.waitForSelector('.recruiter-input');
 assert.equal(await page.$eval('h1',e=>e.textContent),'Recruiter View');
 const assess = async description => {
  await page.$eval('#recruiter-description',(e,v)=>{const setter=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set;setter.call(e,v);e.dispatchEvent(new Event('input',{bubbles:true}));},description);
  await page.click('.recruiter-actions button[type="submit"]');await page.waitForSelector('.recruiter-result');
 };
 await page.screenshot({path:'/tmp/recruiter-desktop-empty.png'});
 await assess('Requirements: React, Node.js, REST APIs, SQL and cloud engineering. Build full-stack applications.');
 assert((await page.$eval('.recruiter-result',e=>e.textContent)).includes('React'));
 assert(await page.$eval('.recruiter-workspace',e=>getComputedStyle(e).gridTemplateColumns.split(' ').length===2));
 await page.screenshot({path:'/tmp/recruiter-desktop-result.png',fullPage:true});
 await page.click('.recruiter-view-switch button:nth-child(2)');assert(await page.$('.recruiter-requirement'));
 await page.click('.recruiter-requirement details summary'); const link=await page.$('.recruiter-requirement a[href^="/projects/"]');assert(link);await link.click();await page.waitForFunction(()=>!location.pathname.includes('recruiter-view'));await page.goBack();await page.waitForSelector('.recruiter-input');
 await assess('Google Cloud role requires GCP, Vertex AI, BigQuery, Cloud Run and Pub/Sub for data systems.');
 assert((await page.$eval('.recruiter-result',e=>e.textContent)).includes('Portfolio page coming soon'));
 for (const width of [900,390,320]) {
  await page.setViewport({width,height:900});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow at ${width}`);
  assert(await page.$eval('.recruiter-workspace',e=>getComputedStyle(e).gridTemplateColumns.split(' ').length===1));
  await page.screenshot({path:`/tmp/recruiter-${width}-result.png`,fullPage:true});
 }
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 assert(await page.$eval('.recruiter-workspace',e=>getComputedStyle(e).animationName==='none'));
 await assess('We require Salesforce and SAP implementation for enterprise business systems.');
 assert.equal(await page.$eval('.recruiter-score>strong',e=>e.textContent),'0%');
 assert(!(await page.$eval('.recruiter-result',e=>e.textContent)).includes('Vertex AI'));
 await page.click('.recruiter-reset');assert(!(await page.$('.recruiter-result')));assert.equal(await page.$eval('#recruiter-description',e=>e.value),'');
 await page.click('.recruiter-actions button[type="submit"]');await page.waitForFunction(()=>document.querySelector('.recruiter-error').textContent.includes('fuller'));
 await page.setViewport({width:1440,height:1000});await page.goto(base,{waitUntil:'networkidle0'});
 await page.click('.portfolio-skills-helper');await page.waitForSelector('#assistant-input');
 await page.type('#assistant-input','Would Keeno fit a role requiring React, Node.js and REST APIs?');await page.keyboard.press('Enter');
 await page.waitForSelector('.assistant-card-actions a[href="/recruiter-view"]');await page.click('.assistant-card-actions a[href="/recruiter-view"]');await page.waitForSelector('#recruiter-description');
 assert((await page.$eval('#recruiter-description',e=>e.value)).includes('React'));
 assert.deepEqual(errors,[]);
 console.log('Browser: header route, project navigation, detailed view, desktop/tablet/mobile (320–1440px), reduced motion, reassessment, clear, validation and Assistant handoff passed.');
} finally {await browser.close();}
