import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { build } from 'esbuild';
import { hardeningRoles } from './fixtures/recruiter/hardeningRoles.js';
import { roles } from './fixtures/recruiter/roles.js';
import { evaluateQualification } from '../src/components/pages/RecruiterView/utils/qualificationEvidence.js';
import { candidateFacts } from '../src/data/candidateProfile.js';
import { countedAIProjects, projectCountPolicy } from '../src/data/projectCountPolicy.js';
await build({entryPoints:['src/components/pages/RecruiterView/utils/recruiterScoring.js'],bundle:true,platform:'node',format:'esm',outfile:'/tmp/portfolio-hardening-scoring.mjs',loader:{'.png':'dataurl','.webp':'dataurl'}});
const {assessRole}=await import('/tmp/portfolio-hardening-scoring.mjs');
const results=hardeningRoles.map(role=>assessRole(role,{asOf:'2026-10-27'}));
for(let i=0;i<results.length;i++){
 const r=results[i];assert.deepEqual(r,assessRole(hardeningRoles[i],{asOf:'2026-10-27'}));
 assert.equal(r.score,r.diagnostics.denominator?Math.round(r.diagnostics.numerator/r.diagnostics.denominator):null);
 assert(r.rows.filter(row=>['Preferred','Conditional'].includes(row.importance)).every(row=>row.weight===0));
 assert(r.qualifications.every(row=>row.score===null&&row.weight===0));
}
const education=r=>r.qualifications.find(row=>['education','qualification','certification'].includes(row.type));
assert(!education(results[0]).verified,'Award is not established by completion instruction');
assert(education(results[1]).verified,'Explicit scoped practical route is supported');
assert(education(results[2]).verified,'Completed bachelor CS matches candidate declaration');
assert(results[4].rows.some(row=>row.type==='certification'&&row.importance==='Preferred'&&!row.verified),'In-progress AI-500 is not completed');
assert(results[4].rows.filter(row=>row.type==='technology').every(row=>row.score<=30),'Live cloud is not established by provider adapters');
assert(!education(results[5]).verified,'Cloud coursework is not an AWS professional credential');
assert(results[6].qualifications.some(row=>row.type==='experience'&&!row.verified),'Overall baseline does not meet eight years');
assert(results[6].rows.some(row=>row.name==='Leadership and delivery responsibility'&&row.score===40),'Professional leadership must receive declared support');
assert(!education(results[7]).verified,'BSc does not establish masters');
assert(!education(results[8]).verified,'Overall years do not prove commercial Python tenure');
assert(results[9].logistics.every(row=>!row.verified),'Authorization is separate');
assert(results[9].qualifications.some(row=>row.duration?.bound==='maximum'&&!row.verified),'Upper bound must be checked');
assert(results[10].rows.find(row=>row.name==='Technical leadership and mentoring').score===30,'Delivery leadership is partial support for a combined mentoring request');
const profile={education:candidateFacts.education,overallExperience:candidateFacts.overallExperience};
for(const text of ['Awarded BSc Computer Science required','Completed bachelor degree in medicine required','A master degree in Computer Science required','An AWS professional certification required','A degree or practical experience','A degree or 8 years software engineering experience','A degree or practical experience in clinical systems','AI-500 certification required']) {
 const type=/certification/.test(text)?'certification':/ or /.test(text)?'qualification':'education';
 assert(!evaluateQualification({sourcePhrase:text,type,practicalRoute:/ or /.test(text)},profile).verified,text);
}
assert.equal(countedAIProjects.length,13,'Policy change requires explicit count review');
assert.equal(new Set(countedAIProjects.map(p=>projectCountPolicy.implementationFamilies[p.id]||p.id)).size,13);
assert(!countedAIProjects.some(p=>projectCountPolicy.excludedIds.includes(p.id)));
assert(countedAIProjects.length>=projectCountPolicy.publicLowerBound||projectCountPolicy.claimStatus==='owner-review-required');
for (const description of ['Requirements: Up to 8 years software engineering experience with React applications.', 'Requirements: 3 to 8 years software engineering experience with React applications.']) assert(assessRole({description}).qualifications.filter(row=>row.type==='experience').every(row=>!row.verified),'Lower-bound years cannot prove an upper bound');
const comparison=[...roles,...hardeningRoles].map(role=>{const r=assessRole(role,{asOf:'2026-10-27'});return {title:role.title,id:role.id,score:r.score,qualifications:r.qualifications.map(q=>({name:q.name,status:q.status,verified:q.verified})),leadership:r.rows.filter(q=>/leadership/i.test(q.name)).map(q=>({name:q.name,score:q.score}))}});
await fs.mkdir('/tmp/portfolio-hardening',{recursive:true});await fs.writeFile('/tmp/portfolio-hardening/role-comparison-final.json',JSON.stringify(comparison,null,2));
console.log('Hardening evidence: 11 constructed roles, qualification adversaries, reproducibility, contribution exclusions, context, leadership and conservative 13-family count passed.');
