import { projects, credentials, skillGroups } from './knowledge.js';
import { contains } from './interpret.js';
export function relatedSkills(q) {return [...new Set([...q.entities,...q.domains.flatMap(d=>skillGroups.find(g=>g.title===d)?.skills.slice(0,5)||[])])];}
export function retrieve(q,context={}) {
 const terms=relatedSkills(q);
 const ranked=projects.map(p=>({p,score:(q.projectIds.includes(p.id)?100:0)+terms.reduce((n,s)=>n+(p.technologies.some(t=>contains(t,s)||contains(s,t))?12:contains(p.description,s)?3:0),0)+(p.demonstrated?5:0)})).filter(({score})=>terms.length||q.projectIds.length?score>5:true).sort((a,b)=>b.score-a.score);
 let selected=ranked.map(x=>x.p);
 if(q.more&&context.projectIds?.length){const others=selected.filter(p=>!context.projectIds.includes(p.id));if(others.length)selected=others;}
 const creds=credentials.filter(c=>!terms.length || terms.some(t=>contains(`${c.name} ${c.description} ${c.issuer}`,t)));
 return {projects:selected,credentials:creds,terms};
}
// Ordinal evidence, not a personal rating: direct implemented usage is required
// for higher bands. Planned work never increases the band. Education supports
// a limited band only. No keyword-frequency or arbitrary percentage scoring.
export function evidence(skill) {
 const used=projects.filter(p=>p.demonstrated&&p.technologies.some(t=>contains(t,skill)||contains(skill,t)));
 const learning=credentials.filter(c=>contains(`${c.name} ${c.description}`,skill));
 const listed=skillGroups.some(g=>g.skills.includes(skill));
 const band=used.length>=4?4:used.length>=2?3:used.length===1?2:learning.length||listed?1:0;
 return {skill,band,label:['Not enough evidence to assess','Learning or limited evidence','Some demonstrated evidence','Substantial demonstrated evidence','Extensive demonstrated evidence'][band],detail:`${used.length} implemented project${used.length===1?'':'s'}; ${learning.length} supporting learning credential${learning.length===1?'':'s'}. Planned projects excluded.`};
}
