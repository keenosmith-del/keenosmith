import { interpret } from './interpret.js';
import { retrieve, evidence } from './retrieve.js';
import { education, experience } from './knowledge.js';
export function answer(question, context={}) {
 const q=interpret(question,context), found=retrieve(q,context);
 let cards=found.projects, creds=[], indicators=[], text='';
 const names=found.terms;
 if(q.intent==='unknown') {cards=[];text="I don't have reliable portfolio evidence to answer that question. I can help with Keeno's engineering skills, projects, education, credentials or a role description.";}
 if(q.intent==='education') {cards=[];text=education.join('\n\n');}
 if(q.intent==='experience') {cards=[];text=experience.join('\n\n');}
 if(q.intent==='credentials') {
  cards=[];creds=found.credentials;
  if(/driv|licen[sc]/.test(q.text)) creds=[];
  const vendor=/microsoft|aws|amazon|google|n8n/.exec(q.text)?.[0];
  if(vendor)creds=creds.filter(c=>`${c.issuer} ${c.group}`.toLowerCase().includes(vendor==='amazon'?'aws':vendor));
  text=creds.length?`The portfolio lists ${creds.length} relevant credentials. These include Applied Skills, training programmes and technical learning credentials; they are not all vendor professional certifications.\n\n${[...new Set(creds.map(c=>c.group))].join(' · ')}.\n\nCertificate records are available on the credentials page. Linked issuer profiles are supporting profiles, not individual credential verification. Exam bookings and future certifications are not counted as earned.`:'No matching earned credential is documented in the indexed catalogue. I cannot infer certification from a listed skill or planned exam.';
 }
 if(q.intent==='skills'||q.intent==='projects') {
  indicators=names.slice(0,5).map(evidence);
  const direct=cards.filter(p=>p.demonstrated);
  text=names.length?`For ${names.join(', ')}, ${direct.length?`the strongest evidence is ${direct.length} implemented portfolio project${direct.length===1?'':'s'}.`:'the available evidence is learning, listed skills or planned scope; implemented usage is not confirmed.'}`:'Keeno’s portfolio covers full-stack applications, API integration, AI retrieval and cloud engineering. Here are the documented projects, with their implementation status.';
  text+='\n\n'+cards.slice(0,3).map(p=>`${p.title}: ${p.description} (${p.status}.)`).join('\n\n');
  if(!cards.length)text+='\n\nNo project matches this enquiry in the indexed sources.';
  if(q.comparison)text+='\n\nCompare the individual evidence bands below; they reflect documented implementation rather than a claim that one technology is objectively his strongest.';
  if(names.includes('React'))text+='\n\nThe CV also documents full-stack training at HyperionDev in January–June 2026. Project-based engineering is listed from 2022; that does not establish a React-specific start date.';
 }
 if(q.intent==='role') {
  indicators=names.slice(0,8).map(evidence);creds=found.credentials.slice(0,4);
  const strong=indicators.filter(i=>i.band>=2),partial=indicators.filter(i=>i.band<2);
  const unsupported = ['Rust','Swift','Ruby','PHP','SAP','Salesforce'].filter(t=>q.text.includes(t.toLowerCase()));
  text=`This is an evidence-based assessment, not a hiring guarantee.\n\nRecognised requirements: ${names.join(', ')||'No specific technology requirements recognised; paste the role responsibilities and required stack.'}.\n\nDemonstrated strengths: ${strong.map(i=>`${i.skill} (${i.detail})`).join(' ' )||'No direct implementation evidence identified for the recognised requirements.'}\n\nLimited or uncertain evidence: ${partial.map(i=>i.skill).join(', ')||'The recognised technical requirements have project support, but seniority, production scale and professional tenure still require discussion.'}. ${unsupported.length?`Not verified in the portfolio: ${unsupported.join(', ')}. `:''}Planned project stacks are not proof of delivered capability.\n\n${cards.filter(p=>p.demonstrated).slice(0,3).map(p=>`${p.title}: ${p.description}`).join('\n\n')}\n\nThe local parser recognises portfolio technologies and engineering domains. Unrecognised requirements, years-of-experience thresholds, management expectations and nontechnical criteria are not fully evaluated. ${q.long?'Please review requirements not named above individually.':''}`;
 }
 const prompts=q.intent==='credentials'?['What is his education?','Show cloud projects']:names.length?[`Show ${names[0]} projects`, 'What backend technologies does he use?', 'What certifications does Keeno have?']:['Does Keeno know React?','Has Keeno built AI-powered applications?','Would Keeno fit a Full-Stack AI Engineer role?'];
 return {text,projects:cards,credentials:creds,indicators,suggestions:prompts,context:{entities:q.entities.length?q.entities:names,projectIds:cards.slice(0,3).map(p=>p.id),intent:q.intent,roles:q.intent==='role'?[question.slice(0,300)]:context.roles||[]},interpretation:q};
}
