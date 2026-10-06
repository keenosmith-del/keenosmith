import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categoryName } from '../utils/exploreIndex.js';

export function ProjectLink({ project, children, className }) {
 if (project.route) return <Link className={className} to={project.route}>{children}</Link>;
 if (project.repositoryUrl) return <a className={className} href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">{children}</a>;
 return <div className={className}>{children}</div>;
}
export function ProjectTile({ project }) {
 return <article data-explore-id={project.id} className={`explore-project explore-${project.layout}`}>
  <ProjectLink project={project} className="explore-art">
   {project.image ? <img src={project.image} alt={`${project.title} project visual`} loading="lazy" /> : <div className="explore-type-art"><small>{project.domain}</small><strong>{project.title}</strong><span>{project.technologies.slice(0, 3).join(' / ')}</span></div>}
   <div className="explore-overlay"><span>{project.title}</span>{(project.route || project.repositoryUrl) && <ArrowRight size={22} aria-hidden="true" />}</div>
  </ProjectLink>
  <div className="explore-project-copy"><h2><ProjectLink project={project}>{project.title}</ProjectLink></h2><p className="explore-tech">{project.technologies.slice(0, 4).join(' · ')}</p><small className="explore-eyebrow">{project.domain}</small><p className="explore-description">{project.description}</p><small>{project.status}{project.date || project.year ? ` · ${project.date || project.year}` : ''}</small></div>
 </article>;
}
export function EvidenceBar({ assessment }) {
 return <div className="explore-evidence"><div className="explore-bar" role="meter" aria-label="Demonstrated evidence band" aria-valuemin={0} aria-valuemax={4} aria-valuenow={assessment.band} aria-valuetext={assessment.label}><span style={{ width: `${assessment.band * 25}%` }} /></div><small>{assessment.label}</small></div>;
}
export function SkillTile({ skill, onSelect }) {
 return <button data-explore-id={skill.id} className="explore-skill" onClick={() => onSelect(skill.id)} aria-haspopup="dialog"><span className="explore-eyebrow">{categoryName(skill.categories[0] || 'Capability')}</span><h2>{skill.name}</h2><EvidenceBar assessment={skill.assessment} /><span className="explore-skill-bottom">{skill.projects.length} built projects <ArrowRight size={14} aria-hidden="true" /></span></button>;
}
export function CredentialCard({ credential: c, badgeMode = false }) {
 return <article data-explore-id={c.id} className={`explore-credential explore-credential-${(badgeMode ? 'Badges' : c.type).toLowerCase().replace(/\s/g, '-')}`}><div className="explore-credential-head"><span className="explore-eyebrow">{c.issuer}</span><small>{badgeMode ? 'Badge' : c.type}</small></div>{c.image && !badgeMode && <a href={c.image} target="_blank" rel="noopener noreferrer" aria-label={`Open ${c.name} certificate image`}><img src={c.image} alt={`${c.name} certificate`} loading="lazy" /></a>}<h2>{c.name}</h2><p>{c.description}</p><small>{c.status} {c.date && `· ${c.date}`}</small>{!!c.badges?.length && <div className="explore-badges">{[...new Set(c.badges)].map((image, i) => <a key={image} href={image} target="_blank" rel="noopener noreferrer" aria-label={`Open ${c.name} badge ${i + 1}`}><img src={image} alt={`${c.name} badge`} loading="lazy" /></a>)}</div>}{c.verification && <a className="explore-text-link" href={c.verification} target="_blank" rel="noopener noreferrer">Issuer profile <ArrowRight size={13} aria-hidden="true" /></a>}</article>;
}
