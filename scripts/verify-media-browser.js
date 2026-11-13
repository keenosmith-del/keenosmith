import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import puppeteer from 'puppeteer';
const base=process.env.PORTFOLIO_TEST_URL||'http://127.0.0.1:4181';
const browser=await puppeteer.launch({headless:true});
try {
  const geometry=[];
  for(const scenario of ['normal','failed','blocked','reduced']) {
    const page=await browser.newPage();await page.setViewport({width:390,height:844});
    await page.setCacheEnabled(false);
    if(scenario==='failed') {
      await page.setRequestInterception(true);
      page.on('request',request=>request.url().endsWith('.mp4')?request.abort('failed'):request.continue());
    }
    if(scenario==='blocked') await page.evaluateOnNewDocument(()=>{HTMLMediaElement.prototype.play=()=>Promise.reject(new DOMException('Playback blocked for test','NotAllowedError'));});
    if(scenario==='reduced') await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
    await page.goto(base,{waitUntil:'networkidle0'});
    await page.$eval('.full-stack-video',e=>e.scrollIntoView({behavior:'instant',block:'center'}));
    if(['failed','blocked'].includes(scenario)) {
      await page.waitForFunction(()=>getComputedStyle(document.querySelector('.full-stack-video')).backgroundImage.includes('full-stack-engineering-poster'));
      await page.waitForFunction(()=>getComputedStyle(document.querySelector('.full-stack-video video')).opacity==='0');
      const decoded=await page.$eval('.full-stack-video',async e=>{const image=new Image();image.src=getComputedStyle(e).backgroundImage.slice(5,-2);await image.decode();return image.naturalWidth>0&&image.naturalHeight>0});
      assert(decoded,'Fallback image must actually decode');
      await fs.mkdir('/tmp/portfolio-hardening/final',{recursive:true});
      await (await page.$('.full-stack-video')).screenshot({path:`/tmp/portfolio-hardening/final/media-${scenario}.png`});
    } else {
      await page.waitForFunction(()=>document.querySelector('.full-stack-video video').classList.contains('is-ready'));
      assert.equal(await page.$eval('.full-stack-video',e=>getComputedStyle(e).backgroundImage),'none','Healthy playback must not fetch/display fallback');
      if(scenario==='reduced') {await page.waitForFunction(()=>document.querySelector('.full-stack-video video').currentTime>0);assert(await page.$eval('video',e=>e.paused));}
    }
    geometry.push(await page.$eval('.full-stack-video',e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})));
    await page.close();
  }
  for(const shape of geometry)assert.deepEqual(shape,geometry[0],'Failure must preserve tile geometry');
  console.log('Media: normal playback, intercepted missing video, blocked autoplay and reduced motion passed; fallback decodes, healthy path unchanged and tile geometry identical.');
} finally {await browser.close();}
