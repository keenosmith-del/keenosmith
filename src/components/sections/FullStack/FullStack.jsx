import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fullStackProject as project } from '../../../data/fullStackProject.js';
import { projectArtwork } from '../../../data/projectArtwork.js';
import useScrollFade from '../../../hooks/useScrollFade.js';
import videoSource from '../../../assets/images/full-stack-section/full-stack-engineering-automation.mp4';
import linkedinIcon from '../../../assets/svgs/header/linkedin.svg';
import '../Cloud/Cloud.css';
import './FullStack.css';

export default function FullStack() {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const [hovered, setHovered] = useState(null);
    const [focused, setFocused] = useState(null);
    const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const [videoReady, setVideoReady] = useState(false);
    const [videoFailed, setVideoFailed] = useState(false);
    const active = hovered ?? focused ?? 'n8n';
    const artwork = projectArtwork[project.id];
    useScrollFade(sectionRef);

    useEffect(() => {
        const video = videoRef.current;
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        let visible = false;
        const updatePlayback = () => {
            if (visible && !preference.matches && !document.hidden) {
                // Autoplay can be denied; the decoded frame remains a quiet fallback.
                video.play().catch(() => {});
            } else video.pause();
        };
        const updatePreference = () => {
            setReducedMotion(preference.matches);
            updatePlayback();
        };
        const showStaticFrame = () => {
            // A readable frame from the supplied footage, rather than its opening fade.
            if (preference.matches && video.currentTime === 0) video.currentTime = Math.min(1, video.duration / 2);
            updatePlayback();
        };
        const guardPlayback = () => {
            if (!visible || preference.matches || document.hidden) video.pause();
        };
        const observer = new IntersectionObserver(entries => {
            visible = entries[0].isIntersecting;
            updatePlayback();
        });
        observer.observe(video);
        preference.addEventListener('change', updatePreference);
        document.addEventListener('visibilitychange', updatePlayback);
        video.addEventListener('loadedmetadata', showStaticFrame);
        video.addEventListener('play', guardPlayback);
        return () => {
            observer.disconnect();
            preference.removeEventListener('change', updatePreference);
            document.removeEventListener('visibilitychange', updatePlayback);
            video.removeEventListener('loadedmetadata', showStaticFrame);
            video.removeEventListener('play', guardPlayback);
            video.pause();
        };
    }, []);

    return <section ref={sectionRef} className="full-stack" id="full-stack" aria-labelledby="full-stack-heading">
        <div className="full-stack-inner">
            <div className="full-stack-intro">
                <h2 id="full-stack-heading" data-scroll-fade>full-stack engineering.</h2>
                <p data-scroll-fade>Beyond the AI and cloud projects above, I work across full-stack software engineering with Python, JavaScript and TypeScript. Building interfaces, APIs, backend services and data-driven applications. My work also includes AI engineering and model evaluation, workflow automation and system integrations, with experience in Go, Java/Spring Boot and C#/.NET.</p>
            </div>
            <div className={`cloud-projects full-stack-media${hovered || focused ? ' has-interaction' : ''}`} data-scroll-fade onMouseLeave={() => setHovered(null)}>
                <Link to={project.route} className={`cloud-tile${active === 'n8n' ? ' is-expanded' : ''}`}
                    data-project-id={project.id} style={{ '--cloud-tile-bg': artwork.background, '--cloud-tile-ink': artwork.ink }}
                    onMouseEnter={() => setHovered('n8n')} onMouseLeave={() => setHovered(null)}
                    onFocus={() => setFocused('n8n')} onBlur={() => setFocused(null)}>
                    <div className="full-stack-project-pills">{project.skills.map(skill => <span key={skill} className="cloud-platform">{skill}</span>)}</div>
                    <div className="cloud-artwork"><img src={artwork.image} alt="Illustrated cover for the n8n workflow and integration project" loading="lazy" /></div>
                    <div className="cloud-overlay" aria-hidden="true" />
                    <div className="cloud-tile-caption">
                        <h3>{project.title}</h3>
                        <div className="cloud-tile-details"><p>{project.description}</p></div>
                    </div>
                    <span className="cloud-arrow" aria-hidden="true"><ArrowRight size={18} strokeWidth={1.7} /></span>
                </Link>
                <div className={`cloud-tile full-stack-video${active === 'video' ? ' is-expanded' : ''}`} role="img"
                    aria-label={videoFailed ? 'Engineering video unavailable' : 'A visual presentation of full-stack engineering and automation'}
                    onMouseEnter={() => setHovered('video')} onMouseLeave={() => setHovered(null)}>
                    <video ref={videoRef} src={videoSource} autoPlay={!reducedMotion} muted loop playsInline preload="metadata"
                        aria-hidden="true" className={videoReady && !videoFailed ? 'is-ready' : ''}
                        onLoadedData={() => setVideoReady(true)} onError={() => setVideoFailed(true)} />
                    <div className="full-stack-video-overlay" aria-hidden="true" />
                </div>
            </div>
            <div className="full-stack-actions" data-scroll-fade>
                <a className="hero-button hero-button-secondary" href="https://www.linkedin.com/in/keenotreysmith/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinIcon} alt="" width={15} height={15} />LinkedIn
                </a>
                <Link className="hero-button hero-button-secondary" to="/explore?tab=credentials">Credentials</Link>
            </div>
        </div>
    </section>;
}
