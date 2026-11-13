import fs from 'node:fs/promises';
const inventory=JSON.parse(await fs.readFile('/tmp/portfolio-hardening/final/links.json','utf8'));
const links=[...new Set(inventory.externalUnverified)];
const results=[];
for(let start=0;start<links.length;start+=4){
 results.push(...await Promise.all(links.slice(start,start+4).map(async href=>{
  try{let response=await fetch(href,{method:'HEAD',signal:AbortSignal.timeout(12000)});if([400,405].includes(response.status))response=await fetch(href,{signal:AbortSignal.timeout(12000)});return {href,status:response.status,finalUrl:response.url,classification:response.status===404?'potentially broken; confirm visibility':response.status>=400?'restricted/error; manual review':'HTTP reachable; destination content not independently endorsed'}}catch(e){return {href,error:e.name,classification:'unverified network response'}}
 })));
}
await fs.writeFile('/tmp/portfolio-hardening/final/external-links.json',JSON.stringify(results,null,2));
console.log({checked:results.length,reachable:results.filter(r=>r.status<400).length,review:results.filter(r=>!r.status||r.status>=400)});
