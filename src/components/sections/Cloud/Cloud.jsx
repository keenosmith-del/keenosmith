import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cloudProjects, cloudProfiles } from '../../../data/cloudProjects.js';
import { projectArtwork } from '../../../data/projectArtwork.js';
import useScrollFade from '../../../hooks/useScrollFade.js';
import './Cloud.css';

export default function Cloud() {
    const sectionRef = useRef(null);
    const [hovered, setHovered] = useState(null);
    const [focused, setFocused] = useState(null);
    const active = hovered ?? focused ?? 'microsoft-devops';
    useScrollFade(sectionRef);

    return <section ref={sectionRef} className="cloud" id="cloud" aria-labelledby="cloud-heading">
        <div className="cloud-inner">
            <div className="cloud-intro">
                <h2 id="cloud-heading" data-scroll-fade>cloud engineering.</h2>
                <p data-scroll-fade>I build cloud applications and connected systems across Microsoft Azure, AWS and Google Cloud, combining application services, AI capabilities and infrastructure into working software.</p>
            </div>
            <div className={`cloud-projects${hovered || focused ? ' has-interaction' : ''}`} data-scroll-fade onMouseLeave={() => setHovered(null)}>
                {cloudProjects.map(project => {
                    const artwork = projectArtwork[project.id];
                    return <Link key={project.id} to={project.route}
                        className={`cloud-tile${active === project.id ? ' is-expanded' : ''}`}
                        data-project-id={project.id}
                        style={{ '--cloud-tile-bg': artwork.background, '--cloud-tile-ink': artwork.ink }}
                        onMouseEnter={() => setHovered(project.id)}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => setFocused(project.id)} onBlur={() => setFocused(null)}>
                        <span className="cloud-platform">{project.skill}</span>
                        <div className="cloud-artwork"><img src={artwork.image} alt="" loading="lazy" /></div>
                        <div className="cloud-overlay" aria-hidden="true" />
                        <div className="cloud-tile-caption">
                            <h3>{project.title}</h3>
                            <div className="cloud-tile-details"><p>{project.description}</p></div>
                        </div>
                        <span className="cloud-arrow" aria-hidden="true"><ArrowRight size={18} strokeWidth={1.7} /></span>
                    </Link>;
                })}
            </div>
            <div className="cloud-profiles" data-scroll-fade aria-label="Cloud platform profiles">
                {cloudProfiles.map((profile, index) => profile.url
                    ? <a key={profile.label} className={`cloud-profile${index === 0 ? ' is-primary' : ''}`} href={profile.url} target="_blank" rel="noopener noreferrer">{profile.label}</a>
                    : <span key={profile.label} className="cloud-profile is-inactive" aria-disabled="true">{profile.label}</span>)}
            </div>
        </div>
    </section>;
}
