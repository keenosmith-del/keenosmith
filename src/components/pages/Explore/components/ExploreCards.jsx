import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import elephantCover from '../../../../assets/explore-projects/elephant.png';
import azureCover from '../../../../assets/explore-projects/goofy-guy.png';
import awsCover from '../../../../assets/explore-projects/whimsical-guy.png';
import googleCover from '../../../../assets/explore-projects/furry-monkey.png';
import ollamaCover from '../../../../assets/explore-projects/aloof-blonde.png';
import claudeCover from '../../../../assets/explore-projects/pink-monkey.png';
import n8nCover from '../../../../assets/explore-projects/curly-haired-guy.png';
import workforceCover from '../../../../assets/explore-projects/grumpy-old-man.png';
import reliabilityCover from '../../../../assets/explore-projects/smyle.png';
import telecomCover from '../../../../assets/explore-projects/elderly-traveller.png';
import fieldServiceCover from '../../../../assets/explore-projects/duck.png';
import fleetCover from '../../../../assets/explore-projects/boy.png';

import mernCover from '../../../../assets/explore-projects/furry-green.png';
import ragCover from '../../../../assets/explore-projects/elderly-man-sage.png';
import workspaceCover from '../../../../assets/explore-projects/cozy-sheep.png';
import musicCover from '../../../../assets/explore-projects/pink-monster.png';
import visualOneCover from '../../../../assets/explore-projects/pink-sweater.png';
import visualTwoCover from '../../../../assets/explore-projects/red-stoic-man.png';

const projectCovers = { 'hugging-face': elephantCover, 'microsoft-devops': azureCover, 'banking-risk': awsCover, 'vertex-ai-retail': googleCover, ollama: ollamaCover, claude: claudeCover, n8n: n8nCover, deepseek: workforceCover, 'distributed-reliability': reliabilityCover, 'telecom-billing': telecomCover, 'field-service': fieldServiceCover, 'fleet-operations': fleetCover, 'productivity-platform': mernCover, 'ai-assistant': ragCover, 'enterprise-workspace': workspaceCover, 'music-api': musicCover, 'ux-ui-visual-1': visualOneCover, 'ux-ui-visual-2': visualTwoCover };
import { categoryName } from '../utils/exploreIndex.js';

export function ProjectLink({ project, children, className, ...props }) {
 return <Link className={className} to={project.route} {...props}>{children}</Link>;
}
// Pin the original catalogue selections, even when filters change their positions.
const alwaysVisibleProjects = new Set(['claude', 'field-service', 'enterprise-workspace', 'ux-ui-visual-1']);

const titleVisibleProjects = new Set(['microsoft-devops', 'vertex-ai-retail', 'hugging-face', 'deepseek']);

export function ProjectTile({ project }) {
 const cover = projectCovers[project.id];
 return <article data-explore-id={project.id} className={`explore-project explore-tone-${project.tone} ${cover ? 'explore-project-with-cover' : ''} ${alwaysVisibleProjects.has(project.id) ? 'explore-project-always-visible' : ''} ${titleVisibleProjects.has(project.id) ? 'explore-project-title-visible' : ''}`}>
  {cover && <img className="explore-project-cover" src={cover} alt="" loading="lazy" />}
  <div className="explore-project-reveal">
   <span className="explore-domain">{project.domain}</span>
   <div className="explore-project-text"><h2>{project.title}</h2><p className="explore-description">{project.summary}</p></div>
   <div className="explore-tags">{project.technologies.slice(0, 3).map(skill => <span key={skill}>{skill}</span>)}</div>
  </div>
  <ProjectLink project={project} className="explore-project-arrow" aria-label={`View ${project.title}`}><ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" /></ProjectLink>
 </article>;
}
export function ProjectGallery({ projects }) {
 return Array.from({ length: Math.ceil(projects.length / 3) }, (_, row) =>
  <div className="explore-project-row" key={row}>{projects.slice(row * 3, row * 3 + 3).map(project => <ProjectTile key={project.id} project={project} />)}</div>);
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
