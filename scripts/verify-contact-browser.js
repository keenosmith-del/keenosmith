import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
const base=process.env.PORTFOLIO_TEST_URL||'http://127.0.0.1:4181';
const browser=await puppeteer.launch({headless:true});
try{
 const page=await browser.newPage();let calls=0,success=false;
 await page.setRequestInterception(true);page.on('request',req=>{
  if(req.url().startsWith('https://api.emailjs.com/')){calls++;return req.respond({status:success?200:500,contentType:'text/plain',headers:{'access-control-allow-origin':'*'},body:success?'OK':'mocked delivery failure'})}
  return req.continue();
 });
 for(const width of [1440,390,320]){
  await page.setViewport({width,height:900});await page.goto(base,{waitUntil:'networkidle0'});
  if(width<1000)await page.click('.navigation-menu-toggle');
  await page.click('.navigation-chat');await page.waitForFunction(()=>document.activeElement.id==='chat-name');
  assert.equal(await page.evaluate(()=>document.body.style.overflow),'hidden');
  for(const [field,value] of [['name','QA only'],['email','invalid'],['subject','Mocked delivery'],['message','This request is intercepted locally.']])await page.type('#chat-'+field,value);
  await page.click('.chat-button-send');assert.equal(await page.$eval('#chat-email',e=>e.getAttribute('aria-invalid')),'true');assert.equal(calls,0);
  await page.$eval('#chat-email',e=>e.select());await page.type('#chat-email','qa@example.invalid');
  await page.click('.chat-button-send');await page.waitForSelector('.chat-form-error');assert.equal(calls,1);
  assert.equal(await page.$eval('#chat-message',e=>e.value),'This request is intercepted locally.');
  assert.equal(await page.$eval('.chat-form-error a',e=>e.href),'mailto:keenosmith@kailor.co.za');
  assert(!await page.$eval('.chat-button-send',e=>e.disabled));
  success=true;await page.click('.chat-button-send');await page.waitForSelector('.chat-form-success');assert.equal(calls,2);
  assert.equal(await page.$eval('#chat-message',e=>e.value),'');
  await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('.chat-modal'));assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
  assert(await page.$eval(width<1000?'.navigation-menu-toggle':'.navigation-chat',e=>e===document.activeElement));calls=0;success=false;
 }
 const response=await page.goto(base+'/unknown-hardening-page',{waitUntil:'networkidle0'});assert.equal(response.status(),404);assert.equal(await page.$eval('h1',e=>e.textContent),'Page not found.');await page.reload({waitUntil:'networkidle0'});assert(await page.$('a[href="/"]'));
 console.log('Contact: invalid email, mocked failure/retry/success, retained input, direct email, focus/scroll restoration at 1440/390/320; unknown route and refresh passed. No live message sent.');
}finally{await browser.close()}
