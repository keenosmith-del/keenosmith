import puppeteer from 'puppeteer';
import assert from 'node:assert/strict';
const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:5175';
const browser = await puppeteer.launch({headless: true});
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.setViewport({width: 1440, height: 1000});
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion', value:'reduce'}]);
  await page.goto(base, {waitUntil: 'networkidle0'});
  await page.click('.portfolio-skills-helper');
  await page.waitForSelector('#assistant-input');
  async function send(text) {
    const count = await page.$$('.assistant-message.user');
    await page.$eval('#assistant-input', (e, value) => {
      Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(e, value);
      e.dispatchEvent(new Event('input', {bubbles:true}));
    }, text);
    await page.focus('#assistant-input'); await page.keyboard.press('Enter');
    await page.waitForFunction(n => document.querySelectorAll('.assistant-message.user').length === n + 1 && !document.querySelector('.assistant-pending'), {}, count.length);
    return page.$$eval('.assistant-prose', es => es.at(-1).textContent);
  }
  assert.match(await send('Does Keeno have experience with CrewAI?'), /implemented CrewAI/);
  assert(await page.$eval('.portfolio-chat-header img', e => e.naturalWidth > 0));
  await page.screenshot({path:'/tmp/refresh-assistant-crewai-desktop.png'});
  assert.match(await send('Does he use Gemini?'), /implemented Google Gemini/);
  await page.screenshot({path:'/tmp/refresh-assistant-gemini-desktop.png'});
  const source = await page.$('.assistant-card-details summary');
  assert(source); await source.click();
  assert(await page.$eval('.assistant-card-details summary svg', e => getComputedStyle(e).fill === 'none'));
  await page.screenshot({path:'/tmp/refresh-assistant-expanded-desktop.png'});
  await page.goto(`${base}/explore?tab=skills&search=ONNX`, {waitUntil:'networkidle0'});
  await page.screenshot({path:'/tmp/refresh-explore-skills-desktop.png',fullPage:true});
  // Use the real detail route/query; the shared catalogue supplies this skill.
  await page.goto(`${base}/explore?tab=skills&skill=onnx-runtime`, {waitUntil:'networkidle0'});
  await page.waitForSelector('dialog[open]');
  assert.match(await page.$eval('dialog', e => e.textContent), /Manufacturing Quality Control/);
  await page.screenshot({path:'/tmp/refresh-explore-detail-desktop.png'});
  await page.setViewport({width:390,height:844});
  await page.screenshot({path:'/tmp/refresh-explore-detail-mobile.png'});
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.goto(`${base}/recruiter-view`,{waitUntil:'networkidle0'});
  assert(await page.$eval('.recruiter-hero', e => e.getBoundingClientRect().top < 100));
  await page.screenshot({path:'/tmp/refresh-recruiter-mobile.png',fullPage:true});
  await page.goto(base,{waitUntil:'networkidle0'});
  await page.click('.portfolio-skills-helper');
  assert.match(await send('How long has he used Python?'), /more than three years/);
  await page.screenshot({path:'/tmp/refresh-assistant-mobile.png'});
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  assert.deepEqual(errors,[]);
  console.log('Browser refresh: Assistant exact tools/duration, expanded source chevron, mascot, Explore skill mapping/dialog, desktop/mobile layout and Recruiter positioning passed.');
} finally { await browser.close(); }
