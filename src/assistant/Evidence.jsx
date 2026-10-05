import { useState } from 'react';
import { Link } from 'react-router-dom';
export function Evidence({ response, onNavigate }) {
 const [expanded,setExpanded]=useState(false);
 const list=response.projects||[], credentials=response.credentials||[];
 return <div className="assistant-evidence">
 {response.indicators?.map(i=><div className="assistant-indicator" key={i.skill}><strong>{i.skill}</strong><span>{i.label}</span><div className="assistant-bar" aria-hidden="true"><i style={{width:`${i.band*25}%`}} /></div><small>{i.detail}</small></div>)}
 {response.indicators?.length>0&&<small>Bars describe available evidence, not a personal ability rating.</small>}
 {(expanded?list:list.slice(0,3)).map(p=><article className="assistant-card" key={p.id}><strong>{p.title}</strong><small>{p.status}</small><p>{p.description}</p><div className="assistant-tags">{p.technologies.slice(0,3).map(t=><span key={t}>{t}</span>)}</div><Link to={p.path} onClick={onNavigate}>View project</Link>{p.repository&&<a href={p.repository} target="_blank" rel="noreferrer">Repository</a>}</article>)}
 {(expanded?credentials:credentials.slice(0,3)).map(c=><article className="assistant-card" key={c.id}><strong>{c.name}</strong><small>{c.issuer} · {c.date} · {c.category}</small><p>{c.description}</p><Link to={c.path} onClick={onNavigate}>View credential record</Link>{c.verification&&<a href={c.verification} target="_blank" rel="noreferrer">Issuer profile</a>}</article>)}
 {!expanded&&(list.length>3||credentials.length>3)&&<button onClick={()=>setExpanded(true)}>Show all {list.length+credentials.length} results</button>}
 </div>;
}
export function Suggestions({items,onSubmit,disabled}) {return <div className="assistant-suggestions">{items.map(s=><button key={s} disabled={disabled} onClick={()=>onSubmit(s)}>{s}</button>)}</div>;}
