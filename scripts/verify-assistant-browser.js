import puppeteer from 'puppeteer';
import assert from 'node:assert/strict';
const browser=await puppeteer.launch({headless:true});
try {
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173',{waitUntil:'domcontentloaded'});
 await page.click('.portfolio-skills-helper');
 assert(await page.$eval('#portfolio-chat-title',e=>e.textContent)==="Keeno's Assistant");
 await page.type('#assistant-input','Does Keeno know React?');await page.keyboard.press('Enter');
 await page.waitForSelector('.assistant-activity');
 await page.waitForSelector('.assistant-card');
 assert(await page.$eval('.portfolio-chat-footer',e=>e.textContent)==='Powered by Hybrid Intelligence · KAILOR');
 await page.keyboard.press('Escape');assert(await page.$eval('.portfolio-chat-panel',e=>e.hidden));
 await page.click('.portfolio-skills-helper');assert((await page.$$('.assistant-message')).length===3);
 await page.type('#assistant-input','Which other projects?');await page.keyboard.press('Enter');await page.waitForFunction(()=>document.querySelectorAll('.assistant-message').length===5&&!document.querySelector('.assistant-complete'));
 await page.setViewport({width:390,height:700});
 assert(await page.$eval('.portfolio-chat-panel',e=>e.getBoundingClientRect().right<=window.innerWidth));
 await page.screenshot({path:'/tmp/portfolio-assistant-mobile.png'});
 await page.click('.assistant-card a');await page.waitForFunction(()=>location.pathname.startsWith('/projects/'));
 assert(!errors.length,errors.join('\n'));
 await page.goto('http://127.0.0.1:5173');await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await page.click('.portfolio-skills-helper');await page.type('#assistant-input','Does he know React?');await page.keyboard.press('Enter');await page.waitForSelector('.assistant-card');assert(!await page.$('.assistant-complete'));
 console.log('Browser checks passed: activity, responses, history, Escape, mobile bounds, project navigation, reduced motion; no page errors.');
} finally {await browser.close();}
