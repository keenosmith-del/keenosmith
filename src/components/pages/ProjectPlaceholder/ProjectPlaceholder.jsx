import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { projectArtwork } from '../../../data/projectArtwork.js';
import './ProjectPlaceholder.css';

export default function ProjectPlaceholder({ project }) {
    const artwork = projectArtwork[project.id];
    return <main className="project-placeholder">
        <Link className="project-placeholder-back" to="/"><ArrowLeft size={14} strokeWidth={1.7} aria-hidden="true" />Back to Portfolio</Link>
        <div className="project-placeholder-content">
            <div>
                <h1>{project.name}</h1>
                <p>Project page coming soon.</p>
            </div>
            <img src={artwork.image} alt="" />
        </div>
    </main>;
}
