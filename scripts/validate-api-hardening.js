import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import handler,{allowInference,processMessage,validateModel} from '../server/assistant.js';
import { complete } from '../server/llm.js';
const env={NODE_ENV:'development',ASSISTANT_LLM_API_KEY:'test-only-secret',ASSISTANT_LLM_BASE_URL:'https://provider.example/v1',ASSISTANT_LLM_MODEL:'test-model'};
const ask={message:'Compare his JavaScript and cloud architecture'};
const invalid=['not JSON',JSON.stringify({text:'Holds a PhD',intent:'skills',projectIds:[],credentialIds:[],entities:[],suggestions:[]})];
for(const content of invalid){const r=await processMessage(ask,{env,fetcher:async()=>new Response(JSON.stringify({choices:[{message:{content}}]}))});assert.equal(r.mode,'deterministic');assert(!JSON.stringify(r).includes('test-only-secret'))}
for(const question of ['What education does he have?','What leadership experience is recorded?','Is his degree awarded?','What is his seniority?','Does he have experience with CrewAI?','Which certifications are completed?']){
 let calls=0;await processMessage({message:question},{env,fetcher:async()=>{calls++;throw Error('Should stay grounded')}});assert.equal(calls,0,question);
}
assert.equal(await allowInference('test',{NODE_ENV:'production',ASSISTANT_RATE_LIMIT_URL:'invalid',ASSISTANT_RATE_LIMIT_TOKEN:'x'}),false);
assert.equal(await allowInference('test',{NODE_ENV:'production',ASSISTANT_RATE_LIMIT_URL:'http://quota.example',ASSISTANT_RATE_LIMIT_TOKEN:'x'}),false);
assert.equal(await allowInference('test',{NODE_ENV:'production'}),false);
await assert.rejects(complete([],env,async(_,options)=>{assert(options.signal);throw new DOMException('Timed out','TimeoutError')}));
async function request({method='POST',headers={},body,stream}={}){
 const req=stream?Readable.from(stream):{};Object.assign(req,{method,headers:{host:'portfolio.example','content-type':'application/json',...headers},body,socket:{remoteAddress:'127.0.0.1'}});
 const res={code:200,headers:{},setHeader(k,v){this.headers[k]=v},status(c){this.code=c;return this},json(b){this.body=b;return this}};await handler(req,res);return res;
}
assert.equal((await request({method:'OPTIONS'})).code,405);
assert.equal((await request({headers:{'content-type':'text/plain'},body:{message:'Hi'}})).code,415);
for(const origin of ['null','https://evil.example','%%%'])assert.equal((await request({headers:{origin},body:{message:'Hi'}})).code,403);
assert.equal((await request({stream:[Buffer.from('{invalid')]})).code,400);
assert.equal((await request({stream:[Buffer.from('x'.repeat(48001))]})).code,413);
assert.equal((await request({body:{message:'Hi',history:Array(7).fill({role:'user',text:'Hi'})}})).code,400);
assert.equal((await request({body:{message:'Hi',history:[{role:'assistant',text:'x'.repeat(1501)}]}})).code,400);
for(let i=0;i<12;i++){const res=await request({body:{message:'Hello'}});assert.equal(res.code,200);assert.equal(res.headers['X-Assistant-Mode'],'deterministic');assert.equal(res.headers['Cache-Control'],'no-store')}
const fallback=(await processMessage(ask,{env:{}})).response;
assert.throws(()=>validateModel(JSON.stringify({text:'Keeno graduated with a PhD.',intent:'skills',projectIds:[],credentialIds:[],entities:[],suggestions:[]}),fallback));
console.log('API hardening: malformed/oversized streams, content type, origins, bounded history, repeated deterministic requests, invalid quota config, mocked timeout, unsupported prose and factual inference bypass passed. No provider contacted.');
