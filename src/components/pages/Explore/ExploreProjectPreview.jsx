import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projectIndex } from './utils/exploreIndex.js';
import './Explore.css';

export default function ExploreProjectPreview() {
 const { projectId } = useParams();
 const project = projectIndex.find(p => p.id === projectId);
 return <main className="explore-page explore-preview">
  <Link className="explore-back" to="/explore"><ArrowLeft size={12} aria-hidden="true" />Back to Explore</Link>
  <section className="explore-width"><span className="explore-eyebrow">{project ? 'Built · Portfolio page coming soon' : 'Project not found'}</span><h1>{project?.title || 'Return to Explore'}</h1><p>{project?.description || 'Browse the project archive to find a project.'}</p>{project && <div className="explore-tags">{project.technologies.map(skill => <span key={skill}>{skill}</span>)}</div>}{project?.repositoryUrl && <a className="explore-text-link" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">View repository <ArrowRight size={14} aria-hidden="true" /></a>}</section>
 </main>;
}
