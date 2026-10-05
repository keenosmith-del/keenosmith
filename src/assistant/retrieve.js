import { projects, credentials, skillGroups, skillRegistry, canonicalProjects } from './knowledge.js';
import { contains } from './interpret.js';
export function relatedSkills(q) {
 if(q.intent==='role')return [...new Set([...q.entities,...q.domains.flatMap(d=>skillGroups.find(g=>g.title===d)?.skills.slice(0,5)||[])])];
 const vendorAI=q.expansion?.groups.includes('ai')&&q.expansion.groups.some(g=>['google','microsoft','aws'].includes(g));
 if(vendorAI||q.expansion?.groups.some(g=>['google','microsoft','aws'].includes(g)))return q.expansion.terms;
 return [...new Set([...q.entities,...q.expansion?.terms||[],...q.domains.flatMap(d=>skillGroups.find(g=>g.title===d)?.skills||[])])];
}
const canonicalIndex=new Map(canonicalProjects.map(p=>[p.id,p]));
export function retrieve(q,context={}) {
 const terms=relatedSkills(q);
 const vendors=q.expansion?.groups.filter(g=>['google','microsoft','aws'].includes(g))||[];
 const ranked=projects.filter(p=>!vendors.length||q.projectIds.includes(p.id)||vendors.some(v=>p.ecosystems.includes(v))).map(p=>({p,score:(q.projectIds.includes(p.id)?100:0)+terms.reduce((n,s)=>n+(p.technologies.some(t=>contains(t,s)||contains(s,t))?12:contains(p.description,s)?3:0),0)+(p.demonstrated?20:0)+(p.id===p.canonicalId?2:0)})).filter(({score,p})=>terms.length||q.projectIds.length?score>(p.demonstrated?22:2):true).sort((a,b)=>b.score-a.score);
 const seen=new Set();
 let selected=ranked.map(x=>canonicalIndex.get(x.p.canonicalId)||x.p).filter(p=>{if(seen.has(p.canonicalId))return false;seen.add(p.canonicalId);return true;});
 if(q.more&&context.projectIds?.length){const others=selected.filter(p=>!context.projectIds.includes(p.id));if(others.length)selected=others;}
 const creds=credentials.filter(c=>!terms.length || q.expansion?.groups.some(g=>['google','microsoft','aws'].includes(g)&&contains(`${c.issuer} ${c.group}`,g)||(g==='aws'&&contains(`${c.issuer} ${c.group}`,'Amazon Web Services'))) || terms.some(t=>contains(`${c.name} ${c.description} ${c.issuer}`,t)));
 return {projects:selected,credentials:creds,terms,debug:{expandedGroups:q.expansion?.groups||[],terms,ranked:ranked.map(({p,score})=>({id:p.id,score,evidence:p.evidence})),used:selected.map(p=>p.id)}};
}
// Ordinal evidence, not a personal rating: direct implemented usage is required
// for higher bands. Planned work never increases the band. Education supports
// a limited band only. No keyword-frequency or arbitrary percentage scoring.
const evidenceIndex = new Map();
export function evidence(skill) {
 if(evidenceIndex.has(skill))return evidenceIndex.get(skill);
 const used=[...new Map(projects.filter(p=>p.demonstrated&&p.implementedTechnologies.some(t=>contains(t,skill)||contains(skill,t))).map(p=>[p.canonicalId,p])).values()];
 const learning=credentials.filter(c=>contains(`${c.name} ${c.description}`,skill));
 const listed=skillRegistry.some(s=>s.name===skill&&s.evidence.some(e=>['portfolio-skill','cv-listing'].includes(e.type)));
 const band=used.length>=4?4:used.length>=2?3:used.length===1?2:learning.length||listed?1:0;
 const result={skill,band,label:['Not enough evidence to assess','Learning or limited evidence','Some demonstrated evidence','Substantial demonstrated evidence','Extensive demonstrated evidence'][band],detail:`${used.length} implemented project${used.length===1?'':'s'}; ${learning.length} supporting learning credential${learning.length===1?'':'s'}. Planned projects excluded. Source/configuration support does not confirm live deployment.`};
 evidenceIndex.set(skill,result);
 return result;
}
