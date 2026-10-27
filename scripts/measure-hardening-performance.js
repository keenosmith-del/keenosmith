import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';

const phase=process.argv[2]||'final';
const base=process.env.PORTFOLIO_TEST_URL||'http://127.0.0.1:4181';
const routes=(process.env.PORTFOLIO_PERF_ROUTES||'/,/explore,/recruiter-view,/projects/ms-assessflow').split(',');
const browser=await puppeteer.launch({headless:true});
const results=[];
try {
 for(const route of routes) {
  const page=await browser.newPage();
  await page.setViewport({width:390,height:844});
  const cdp=await page.createCDPSession();
  await cdp.send('Network.enable');
  await cdp.send('Network.clearBrowserCache');
  await cdp.send('Network.setCacheDisabled',{cacheDisabled:false});
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:90000});
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
  await page.evaluateOnNewDocument(()=>{
   window.__metrics={cls:0,lcp:null};
   new PerformanceObserver(list=>{for(const e of list.getEntries())window.__metrics.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});
   new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__metrics.cls+=e.value}).observe({type:'layout-shift',buffered:true});
  });
  for(const load of ['cold','repeat']) {
   if(load==='cold') await page.goto(base+route,{waitUntil:'networkidle0',timeout:180000});
   else await page.reload({waitUntil:'networkidle0',timeout:180000});
   await page.waitForSelector('h1');
   const metrics=await page.evaluate(()=>({...window.__metrics,resources:performance.getEntriesByType('resource').map(e=>({name:new URL(e.name).pathname,bytes:e.encodedBodySize,transfer:e.transferSize,type:e.initiatorType})),navigation:performance.getEntriesByType('navigation').map(e=>({domContentLoaded:e.domContentLoadedEventEnd,load:e.loadEventEnd,transfer:e.transferSize})),paints:performance.getEntriesByType('paint').map(e=>({name:e.name,startTime:e.startTime}))}));
   const runtime=await page.metrics();
   let focusLatency=null;
   if(route==='/') {
    focusLatency=await page.evaluate(async()=>{
     const start=performance.now();document.querySelector('.portfolio-skills-helper').click();
     while(document.activeElement?.id!=='assistant-input'&&performance.now()-start<3000)await new Promise(resolve=>requestAnimationFrame(resolve));
     return performance.now()-start;
    });
   }
   results.push({route,load,...metrics,jsHeapUsedBytes:runtime.JSHeapUsedSize,syntheticAssistantFocusLatencyMs:focusLatency});
  }
  await page.close();
 }
 const report={browser:await browser.version(),conditions:'390x844, Chromium, cache cleared before cold and retained for repeat, 150ms RTT, 200kB/s down, CPU 4x. One diagnostic sample per route/load, not Lighthouse, field INP or statistical proof. Focus latency is a synthetic click-to-focus diagnostic.',results};
 await fs.mkdir(`/tmp/portfolio-hardening/${phase}`,{recursive:true});
 await fs.writeFile(`/tmp/portfolio-hardening/${phase}/performance.json`,JSON.stringify(report,null,2));
 console.log(results.map(r=>({route:r.route,load:r.load,lcp:r.lcp,cls:r.cls,encodedBytes:r.resources.reduce((n,e)=>n+e.bytes,0),transferBytes:r.resources.reduce((n,e)=>n+e.transfer,0),focusMs:r.syntheticAssistantFocusLatencyMs})));
}finally{await browser.close()}
