import assert from 'node:assert/strict';
import { build } from 'esbuild';
await build({entryPoints:['src/assistant/knowledge.js','src/assistant/engine.js'],bundle:true,platform:'node',format:'esm',outdir:'/tmp/assistant-expansion',loader:{'.png':'dataurl'}});
const {answer}=await import('/tmp/assistant-expansion/engine.js');
const {projects,skills,credentials,registry}=await import('/tmp/assistant-expansion/knowledge.js');
const cases=[
 ['Does Keeno have any Google skills?','google','vertex-ai-retail','BigQuery'],
 ['What Google Cloud technologies has Keeno used?','google','vertex-ai-retail','Vertex AI'],
 ['What Microsoft skills does Keeno have?','microsoft','microsoft','Microsoft Foundry'],
 ['What AWS technologies has Keeno used?','aws','banking-risk','Bedrock'],
 ['What AI skills does Keeno have?','ai','ai-assistant','RAG'],
 ['What backend technologies does Keeno know?','backend','n8n','NestJS'],
 ['What frontend technologies does Keeno know?','frontend','telecom-billing','Angular'],
 ['What databases has Keeno used?','databases','fleet-operations','TimescaleDB'],
 ['Does Keeno know DevOps?','devops','distributed-reliability','Kubernetes'],
 ['What cloud experience does Keeno have?','cloud','vertex-ai-retail','Google Cloud'],
 ['What cybersecurity experience does Keeno have?','security','productivity-platform','JWT'],
 ['What UX/UI skills does Keeno have?','frontend','ai-assistant','React'],
 ['What programming languages does Keeno use?','languages','telecom-billing','Java'],
 ['Has Keeno built agentic AI systems?','ai','microsoft','Agentic AI'],
 ['Does Keeno have infrastructure-as-code experience?','infrastructure','n8n','OpenTofu'],
 ['Has Keeno used Kubernetes?','', 'distributed-reliability','Kubernetes'],
 ['Has Keeno built full-stack systems?','backend','deepseek','ASP.NET Core'],
 ['What Google AI tools has Keeno used?','google','vertex-ai-retail','Vertex AI'],
 ['What Microsoft AI tools has Keeno used?','microsoft','microsoft','Microsoft Foundry'],
];
for(const [question,group,project,skill] of cases){
 const a=answer(question);
 assert(['projects','skills'].includes(a.interpretation.intent),question);
 if(group)assert(a.debug.expandedGroups.includes(group),question);
 assert(a.projects.some(p=>p.id===project),`${question}: ${project}`);
 assert(a.debug.terms.includes(skill),`${question}: ${skill}`);
 assert.equal(new Set(a.projects.map(p=>p.canonicalId)).size,a.projects.length);
}
assert.equal(answer('What AWS certifications does Keeno have?').credentials.length,11);
assert(answer('What certifications does Keeno have?').credentials.length===credentials.length);
assert(!answer('What Google Cloud technologies has Keeno used?').debug.terms.includes('Bedrock'));
assert(!answer('What Google AI tools has Keeno used?').projects.some(p=>p.id==='claude'));
assert(!answer('What Microsoft AI tools has Keeno used?').debug.terms.includes('Anthropic'));
assert(answer('What Microsoft AI tools has Keeno used?').projects.every(p=>p.ecosystems.includes('microsoft')));
for(const group of registry.skills)assert(group.evidence.length>0,group.name);
const retail=projects.find(p=>p.id==='vertex-ai-retail');
assert.equal(retail.buildStatus,'built');assert.equal(retail.portfolioPublicationStatus,'not-yet-published');
assert(retail.evidence.some(e=>e.type==='existing-assistant'&&e.status.includes('Planned')));
assert(retail.evidence.some(e=>e.type==='source-code'));
assert(answer('Does Keeno have any Google skills?').text.includes('live cloud deployment is not verified'));
assert(!projects.find(p=>p.id==='cv-5').demonstrated);
assert.equal(registry.skills.length,skills.length);
for(const p of projects){const old=p.evidence.find(e=>e.type==='existing-assistant');assert(old);for(const skill of old.technologies)assert(p.technologies.includes(skill),`${p.id}: lost ${skill}`);}
assert(registry.projects.find(p=>p.id==='microsoft').routes.includes('/projects/microsoft-devops'));
const canonical=registry.projects;
console.log(JSON.stringify({records:projects.length,projects:canonical.length,skills:skills.length,credentials:credentials.length,builtUnpublished:canonical.filter(p=>p.buildStatus==='built'&&p.portfolioPublicationStatus==='not-yet-published').length},null,2));
console.log('20 broad queries, vendor intersections, provenance, status and deduplication passed.');
