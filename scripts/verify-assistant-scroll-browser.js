import puppeteer from 'puppeteer';
import assert from 'node:assert/strict';
const browser = await puppeteer.launch({headless:true});
try {
  const page = await browser.newPage();
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  const jd="We are specifically looking for developers with strong hands-on experience in AI-assisted development and prompt engineering, using tools such as Claude, GitHub Copilot and ChatGPT to develop solutions from detailed requirements.\n\nIn addition, developers must have solid backend development experience in:\n\n- C# / .NET Core / .NET 8+ and microservices architecture.\n- REST API development and third-party system integrations.\n- Message queues, preferably RabbitMQ or Azure Service Bus.\n- Event-driven architecture, including asynchronous processing, retries, error handling and message reliability.\n- PostgreSQL database development.\n";
  const send=async text=>{
    await page.$eval('#assistant-input',(el,value)=>{
      Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(el,value);
      el.dispatchEvent(new Event('input',{bubbles:true}));
    },text);
    await page.focus('#assistant-input'); await page.keyboard.press('Enter');
  };
  for (const width of [1440,390]) {
    await page.setViewport({width,height:900});
    await page.goto(process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:5173',{waitUntil:'networkidle0'});
    await page.evaluate(()=>window.scrollTo({top:650,behavior:'instant'}));
    await page.click('.portfolio-skills-helper');
    await page.waitForFunction(()=>document.activeElement.id==='assistant-input');
    const pageY=await page.evaluate(()=>scrollY);
    await send(`Job requirements: ${jd}`);
    await page.waitForSelector('[data-response-started="true"]');
    await new Promise(r=>setTimeout(r,60));
    const anchored=await page.$eval('.portfolio-chat-body',el=>{
      const response=[...el.querySelectorAll('[data-message-id]')].at(-1);
      return {top:response.getBoundingClientRect().top-el.getBoundingClientRect().top,scroll:el.scrollTop};
    });
    assert(Math.abs(anchored.top-16)<5,JSON.stringify({width,anchored}));
    assert(anchored.scroll>0);
    // Manual history scrolling during typing is not overridden by subsequent ticks or completion.
    await page.$eval('.portfolio-chat-body',el=>{el.scrollTop=0;});
    await new Promise(r=>setTimeout(r,160));
    assert.equal(await page.$eval('.portfolio-chat-body',el=>el.scrollTop),0);
    await page.waitForFunction(()=>!document.querySelector('.assistant-pending'));
    assert.equal(await page.$eval('.portfolio-chat-body',el=>el.scrollTop),0);
    assert.equal(await page.evaluate(()=>scrollY),pageY);
    await page.click('.portfolio-chat-header button');
    await page.waitForFunction(()=>document.querySelector('.portfolio-chat-panel').hidden);
    await page.click('.portfolio-skills-helper');
    assert.equal(await page.$eval('.portfolio-chat-body',el=>el.scrollTop),0);
    // A fresh answer re-anchors, including immediate reduced-motion completion.
    await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
    await send('Does Keeno know React?');
    await page.waitForFunction(()=>document.querySelectorAll('[data-message-id]').length===5&&!document.querySelector('.assistant-pending'));
    const top=await page.$eval('.portfolio-chat-body',el=>[...el.querySelectorAll('[data-message-id]')].at(-1).getBoundingClientRect().top-el.getBoundingClientRect().top);
    assert(Math.abs(top-16)<5,JSON.stringify({width,top}));
    assert.equal(await page.evaluate(()=>scrollY),pageY);
    await page.screenshot({path:`/tmp/assistant-response-start-${width}.png`});
    await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'no-preference'}]);
    await send(`Job requirements: ${jd}`);
    await page.click('.portfolio-chat-header button');
    await page.waitForFunction(()=>document.querySelector('.portfolio-chat-panel').hidden);
    await new Promise(r=>setTimeout(r,300));
    await page.click('.portfolio-skills-helper');
    await page.waitForFunction(()=>{
      const el=document.querySelector('.portfolio-chat-body');
      const response=[...el.querySelectorAll('[data-message-id]')].at(-1);
      return response?.querySelector('[data-response-started="true"]') || !document.querySelector('.assistant-pending');
    });
    await new Promise(r=>setTimeout(r,50));
    const reopenedTop=await page.$eval('.portfolio-chat-body',el=>[...el.querySelectorAll('[data-message-id]')].at(-1).getBoundingClientRect().top-el.getBoundingClientRect().top);
    assert(Math.abs(reopenedTop-16)<5,JSON.stringify({width,reopenedTop}));
    await page.waitForFunction(()=>!document.querySelector('.assistant-pending'));
    assert.equal(await page.evaluate(()=>scrollY),pageY);
  }
  assert.deepEqual(errors,[]);
  console.log('Assistant response-start checks passed: desktop/mobile, first typing content, manual history scrolling through completion, reopen preservation, close/reopen while typing, fresh reduced-motion reply and unchanged portfolio scroll.');
} finally {await browser.close();}
