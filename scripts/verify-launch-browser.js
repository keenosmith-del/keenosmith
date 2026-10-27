import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
const base=process.env.PORTFOLIO_TEST_URL||'http://127.0.0.1:4181';
const browser=await puppeteer.launch({headless:true});
try{
 const page=await browser.newPage();
 await page.evaluateOnNewDocument(()=>{
  const NativeDate=Date;const fixed=NativeDate.parse('2026-11-07T00:00:00+02:00');
  window.Date=class extends NativeDate{constructor(...args){super(...(args.length?args:[fixed]))}static now(){return fixed}};
 });
 for(const route of ['/','/companies/kailor']){
  await page.goto(base+route,{waitUntil:'networkidle0'});
  assert((await page.$eval('.company-launch-countdown',e=>e.textContent)).includes('availability to be confirmed'));
  assert((await page.$eval('.company-launch-countdown',e=>e.getAttribute('aria-label'))).includes('public availability is not confirmed'));
  const buttons=await page.$$eval('button',elements=>elements.filter(e=>/Visit platform|coming soon/i.test(e.textContent)).map(e=>({disabled:e.disabled,href:e.getAttribute('href')})));
  assert(buttons.every(b=>b.disabled&&!b.href));
 }
 console.log('Post-target launch state: explicit availability caveat; no countdown-enabled destination on homepage/company page.');
}finally{await browser.close()}
