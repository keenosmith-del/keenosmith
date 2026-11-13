// Reproducible read-only local UI diagnostic. Every EmailJS request is intercepted.
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
const browser=await puppeteer.launch({headless:true});
try {
  const page=await browser.newPage();
  let observed, pending, calls=0;
  const seen=new Promise(resolve=>{observed=resolve});
  await page.setRequestInterception(true);
  page.on('request',request=>{
    if(request.url().startsWith('https://api.emailjs.com/')){calls++;pending=request;observed();}
    else request.continue();
  });
  await page.setViewport({width:1440,height:900});
  await page.goto(process.env.PORTFOLIO_TEST_URL||'http://127.0.0.1:4181',{waitUntil:'networkidle0'});
  await page.click('.navigation-chat');
  for(const [field,value]of [['name','Local QA'],['email','qa@example.invalid'],['subject','Intercepted duplicate test'],['message','This never reaches EmailJS.']])await page.type('#chat-'+field,value);
  await page.click('.chat-button-send');await seen;
  assert.equal(await page.$eval('.chat-form',e=>e.getAttribute('aria-busy')),'true');
  assert(await page.$eval('.chat-button-send',e=>e.disabled&&e.textContent==='Sending...'));
  await page.$eval('.chat-form',form=>form.requestSubmit());
  await new Promise(resolve=>setTimeout(resolve,100));
  assert.equal(calls,1,'In-flight guard must reject a second form-submit event');
  await pending.respond({status:500,contentType:'text/plain',headers:{'access-control-allow-origin':'*'},body:'mocked delivery failure'});
  await page.waitForSelector('.chat-form-error');
  assert.equal(await page.$eval('.chat-form',e=>e.getAttribute('aria-busy')),'false');
  assert(!await page.$eval('.chat-button-send',e=>e.disabled));
  console.log('PASS: loading label/disabled state/aria-busy, duplicate in-flight form submission blocked, failure releases retry. One intercepted request; no email sent.');
} finally {await browser.close();}
