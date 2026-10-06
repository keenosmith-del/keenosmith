import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { categoryName, relatedCredentials, relatedSkills, credentialIndex } from '../utils/exploreIndex.js';
import { EvidenceBar, ProjectLink } from './ExploreCards.jsx';

export default function SkillDetailPanel({ skill, onClose, onSelect, onCredentials }) {
 const dialog = useRef(null);
 useEffect(() => {
  const previous = document.activeElement;
  const element = dialog.current;
  const overflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  element.showModal();
  return () => { element.close(); document.body.style.overflow = overflow; previous?.focus(); };
 }, []);
 useEffect(() => { dialog.current.scrollTop = 0; dialog.current.querySelector('button')?.focus(); }, [skill.id]);
 const learning = relatedCredentials(skill);
 const education = credentialIndex.filter(c => ['Education', 'Bootcamps', 'Training'].includes(c.type) && c.categories?.some(id => skill.categories.includes(id)));
 return <dialog ref={dialog} className="explore-detail" aria-labelledby="explore-skill-title" onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === dialog.current) { const rect = e.target.getBoundingClientRect(); if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) onClose(); } }}>
  <button className="explore-close" aria-label="Close skill details" onClick={onClose}><X size={18} /></button><span className="explore-eyebrow">Skill evidence</span><h2 id="explore-skill-title">{skill.name}</h2><p>{skill.categories.map(categoryName).join(' · ')}</p>{!!skill.ecosystems.length && <p>{skill.ecosystems.map(categoryName).join(' · ')}</p>}<EvidenceBar assessment={skill.assessment} /><p>{skill.assessment.detail}</p>
  <h3>Project evidence</h3>{skill.projects.length ? <div className="explore-detail-list">{skill.projects.map(p => <ProjectLink key={p.id} project={p}><strong>{p.title}</strong><small>{p.status}</small></ProjectLink>)}</div> : <p>No direct built-project evidence is recorded for this skill.</p>}
  <h3>Related credentials</h3>{learning.length ? learning.map(c => <button className="explore-detail-row" key={c.id} onClick={() => onCredentials(c.name)}>{c.name}<small>{c.issuer} · {c.date}</small></button>) : <p>No skill-specific credential recorded.</p>}
  {!!education.length && <><h3>Related education & training</h3><p className="explore-note">Category context; this does not establish direct usage of {skill.name}.</p>{education.map(c => <button className="explore-detail-row" key={c.id} onClick={() => onCredentials(c.name)}>{c.name}</button>)}</>}
  <h3>Related skills & supporting capabilities</h3><div className="explore-pills">{relatedSkills(skill).map(s => <button key={s.id} onClick={() => onSelect(s.id)}>{s.name}</button>)}</div>
 </dialog>;
}
