import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
const base=process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:5173';
const browser=await puppeteer.launch({headless:true});
try {
  const page=await browser.newPage();
  await page.setViewport({width:1440,height:900});
  const explore='/explore?tab=projects';
  await page.goto(base+explore,{waitUntil:'networkidle0'});
  const links=await page.$$eval('.explore-project a',els=>els.map(e=>e.getAttribute('href')));
  assert.equal(links.length,19);
  for(const route of links) {
    const selector=`.explore-project a[href="${route}"]`;
    await page.$eval(selector,e=>e.scrollIntoView({behavior:'instant',block:'center'}));
    await page.click(selector);
    await page.waitForSelector('[data-project-back]');
    assert.equal(await page.$eval('[data-project-back]',e=>e.textContent.trim()),'Back',route);
    assert.equal(await page.$eval('[data-project-back]',e=>e.getAttribute('href')),explore,route);
    assert.equal(await page.$eval('main > footer a',e=>e.getAttribute('href')),'/');
    await page.click('[data-project-back]');
    await page.waitForSelector('.explore-project');
    assert.equal(new URL(page.url()).pathname+new URL(page.url()).search,explore);
  }
  await page.goto(base+'/explore?tab=projects&q=music',{waitUntil:'networkidle0'});
  await page.click('.explore-project a'); await page.waitForSelector('[data-project-back]');
  await page.click('[data-project-back]');await page.waitForSelector('.explore-project');
  assert.equal(new URL(page.url()).search,'?tab=projects&q=music');
  assert.equal(await page.$$eval('.explore-project',els=>els.length),1);
  await page.click('.explore-project a');await page.waitForSelector('[data-project-back]');
  await page.reload({waitUntil:'networkidle0'});
  assert.equal(await page.$eval('[data-project-back]',e=>e.textContent.trim()),'Back to portfolio');
  assert.equal(await page.$eval('[data-project-back]',e=>e.getAttribute('href')),'/');
  await page.goto(base+'/projects/music-api',{waitUntil:'networkidle0'});
  assert.equal(await page.$eval('[data-project-back]',e=>e.textContent.trim()),'Back to portfolio');
  // Reduced motion keeps the content readable without scroll animations.
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  await page.goto(base+'/projects/field-service',{waitUntil:'networkidle0'});
  assert.equal(await page.$eval('.project-hero-content',e=>getComputedStyle(e).opacity),'1');
  console.log('PASS: all 19 Explore entry/return paths, filter retention, direct/refresh fallback, portfolio footer and reduced-motion visibility.');
} finally {await browser.close();}
