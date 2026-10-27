import puppeteer from 'puppeteer';
import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createHash } from 'node:crypto';
const output=process.env.PORTFOLIO_QA_OUTPUT||await fs.mkdtemp(path.join(os.tmpdir(),'portfolio-ci-'));
await fs.mkdir(output,{recursive:true});
const base=process.env.PORTFOLIO_TEST_URL||'http://127.0.0.1:4181';
const url=new URL(base);if(!['127.0.0.1','localhost'].includes(url.hostname))throw Error('Controlled browser verification requires loopback URL');
const manifest=path.join(output,'protected.json');
const protectedHashes=JSON.parse(await fs.readFile('docs/portfolio-hardening/evidence/protected-design.json','utf8'));
for(const [file,expected]of Object.entries(protectedHashes))if(createHash('sha256').update(await fs.readFile(file)).digest('hex')!==expected)throw Error(`Protected visual reference changed: ${file}`);
await fs.writeFile(manifest,JSON.stringify(protectedHashes));
const snapshot=path.join(output,'site');
await fs.cp('dist',snapshot,{recursive:true});
const env={...process.env,PORTFOLIO_PREVIEW_DIR:snapshot,PORTFOLIO_TEST_URL:base,PORTFOLIO_PROTECTED_MANIFEST:manifest,PORTFOLIO_STYLE_OUTPUT:path.join(output,'styles'),ASSISTANT_LLM_API_KEY:'',ASSISTANT_LLM_BASE_URL:'',ASSISTANT_LLM_MODEL:''};
const server=spawn('npm',['run','preview','--','--host',url.hostname,'--port',url.port,'--strictPort'],{env,stdio:['ignore','pipe','pipe'],detached:process.platform!=='win32'});
const serverLog=await fs.open(path.join(output,'preview.log'),'w');server.stdout.on('data',chunk=>serverLog.write(chunk));server.stderr.on('data',chunk=>serverLog.write(chunk));
let exited=false;server.on('exit',()=>{exited=true});
const results=[];
try{
 let ready=false;
 for(let attempt=0;attempt<60;attempt++){
  if(exited)throw Error(`Preview exited; inspect ${output}/preview.log`);
  try{const response=await fetch(base);if(response.ok){ready=true;break}}catch{}
  await new Promise(resolve=>setTimeout(resolve,250));
 }
 if(!ready)throw Error('Preview did not become ready');
 const preflight=await puppeteer.launch({headless:true});await preflight.close();
 for(const script of ['verify-seo','verify-contact-browser','verify-recruiter-browser','verify-cv-browser','verify-assistant-browser','verify-project-navigation','verify-project-pages','verify-project-style-consistency','verify-crewai-case-study','verify-assessflow-case-study','verify-streamlit-case-study','verify-portfolio-refresh-browser','verify-project-tile-presentation','verify-accessibility-browser','verify-links-browser','verify-launch-browser']){
  const code=await new Promise((resolve,reject)=>{const child=spawn(process.execPath,[`scripts/${script}.js`],{env,stdio:['ignore','pipe','pipe']});let text='';child.stdout.on('data',chunk=>{text+=chunk;process.stdout.write(chunk)});child.stderr.on('data',chunk=>{text+=chunk;process.stderr.write(chunk)});child.on('error',reject);child.on('exit',async code=>{await fs.writeFile(path.join(output,script+'.log'),text);resolve(code)})});
  results.push({script,code});await fs.writeFile(path.join(output,'results.json'),JSON.stringify(results,null,2));
 }
 if(results.some(r=>r.code!==0))throw Error(`Browser suites failed: ${results.filter(r=>r.code!==0).map(r=>r.script).join(', ')}. Logs: ${output}`);
 console.log(`All ${results.length} browser/raw-response suites passed. Logs: ${output}`);
}finally{
 if(!exited){try{if(process.platform==='win32')server.kill();else process.kill(-server.pid,'SIGTERM')}catch{}}
 await serverLog.close();
}
