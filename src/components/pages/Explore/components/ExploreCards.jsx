import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categoryName } from '../utils/exploreIndex.js';
import { composeProjects } from '../utils/explorePresentation.js';

export function ProjectLink({ project, children, className, ...props }) {
 return <Link className={className} to={project.route} {...props}>{children}</Link>;
}
export function ProjectTile({ project, area, shape }) {
 return <article data-explore-id={project.id} style={{ gridArea: area }} className={`explore-project explore-shape-${shape} explore-tone-${project.tone}`}>
  <span className="explore-domain">{project.domain}</span>
  <div className="explore-project-text">
   <h2><ProjectLink project={project}>{project.title}</ProjectLink></h2>
   <p className="explore-description">{project.summary}</p>
  </div>
  <div className="explore-tile-bottom"><div className="explore-tags">{project.technologies.slice(0, 3).map(skill => <span key={skill}>{skill}</span>)}</div><small>Built{project.date || project.year ? ` · ${project.date || project.year}` : ''}{!project.hasDetailPage && ' · Portfolio page coming soon'}</small></div>
  <ProjectLink project={project} className="explore-project-arrow" aria-label={`View ${project.title}`}><ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" /></ProjectLink>
 </article>;
}
export function ProjectMosaic({ projects }) {
 return composeProjects(projects).map(group => <div className={`explore-puzzle explore-puzzle-${group.items.length}`} key={group.key} style={{ '--puzzle-areas': group.areas, '--puzzle-rows': group.rows, '--puzzle-columns': group.columns }}>{group.items.map(({ project, area, shape }) => <ProjectTile key={project.id} project={project} area={area} shape={shape} />)}</div>);
}
export function EvidenceBar({ assessment }) {
 return <div className="explore-evidence"><div className="explore-bar" role="meter" aria-label="Demonstrated evidence band" aria-valuemin={0} aria-valuemax={4} aria-valuenow={assessment.band} aria-valuetext={assessment.label}><span style={{ width: `${assessment.band * 25}%` }} /></div><small>{assessment.label}</small></div>;
}
export function SkillTile({ skill, onSelect }) {
 const { tone, major, compact } = skill.presentation;
 return <button data-explore-id={skill.id} className={`explore-skill explore-tone-${tone} ${major ? 'explore-skill-major' : ''} ${compact ? 'explore-skill-compact' : ''}`} onClick={() => onSelect(skill.id)} aria-haspopup="dialog">
  <span className="explore-eyebrow">{categoryName(skill.categories[0] || 'Capability')}</span>
  <h2>{skill.name}</h2>
  <EvidenceBar assessment={skill.assessment} />
  <span className="explore-skill-bottom"><span>{skill.projects.length} projects{skill.ecosystems.length > 0 && ` · ${skill.ecosystems.map(categoryName).join(' / ')}`}</span></span>
  <span className="explore-tile-arrow" aria-hidden="true"><ArrowRight size={18} strokeWidth={1.7} /></span>
 </button>;
}
export function CredentialCard({ credential: c, badgeMode = false }) {
 const type = badgeMode ? 'Badges' : c.type;
 return <article data-explore-id={c.id} tabIndex={0} className={`explore-credential explore-tone-${c.tone} explore-credential-${type.toLowerCase().replace(/\s/g, '-')}`}>
  <div className="explore-credential-head"><span>{c.issuer}</span><small>{badgeMode ? 'Badge' : c.type}</small></div>
  <h2>{c.name}</h2>
  <div className="explore-credential-meta"><small>{c.date}</small><small>{c.status}</small></div>
  <div className="explore-credential-reveal"><p>{c.description}</p><div className="explore-tags">{c.technologies.slice(0, 2).map(skill => <span key={skill}>{skill}</span>)}</div>{c.verification && <a className="explore-text-link" href={c.verification} target="_blank" rel="noopener noreferrer">Issuer profile</a>}</div>
  {c.verification && <a className="explore-tile-arrow" href={c.verification} target="_blank" rel="noopener noreferrer" aria-label={`View ${c.name} issuer profile`}><ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" /></a>}
 </article>;
}

// Decorative pauses remain outside the indexed records and keyboard order.
export function TileGallery({ items, type, onSelect, badgeMode }) {
 const interval = type === 'skills' ? 12 : 8;
 const limit = type === 'skills' ? 3 : 2;
 return items.map((item, index) => <Fragment key={item.id}>
  {type === 'skills' ? <SkillTile skill={item} onSelect={onSelect} /> : <CredentialCard credential={item} badgeMode={badgeMode} />}
  {items.length >= interval && (index + 1) % interval === 0 && index < interval * limit && <div aria-hidden="true" className={`explore-blank explore-${type === 'skills' ? 'skill' : 'credential'} explore-tone-${type === 'skills' ? 'surface' : 'charcoal'}`} />}
 </Fragment>);
}
