import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import './About.css';







import { projectArtwork } from '../../../data/projectArtwork.js';
import duckDB from '../../../assets/images/about/duckDB.png';
import gcpBear from '../../../assets/images/about/gcpBear.png';
import gcpPerson from '../../../assets/images/about/gcpPerson.png';



function About() {
    const aboutRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const counters = aboutRef.current?.querySelectorAll(
            '[data-target]'
        );

        if (!counters?.length) return;

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        if (prefersReducedMotion) {
            counters.forEach((counter) => {
                counter.textContent = `${counter.dataset.target}+`;
            });

            return;
        }

        const animateCounter = (counter) => {
            const target = Number(counter.dataset.target);
            const duration = 1200;
            const startTime = performance.now();

            const update = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const easedProgress =
                    1 - Math.pow(1 - progress, 3);

                const currentValue = Math.floor(
                    easedProgress * target
                );

                counter.textContent = `${currentValue}+`;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = `${target}+`;
                }
            };

            requestAnimationFrame(update);
        };

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    animateCounter(entry.target);
                    observerInstance.unobserve(entry.target);
                });
            },
            {
                threshold: 0.5,
            }
        );

        counters.forEach((counter) => {
            observer.observe(counter);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="about" ref={aboutRef}>
            {/* =========================================================
               GOOGLE CLOUD PLATFORM SECTION
               ========================================================= */}

            <section className="gcp" id="gcp">

                <div className="gcp-intro">

                    <h2>
                        Google Cloud,
                        <br />
                        AI &amp; Kubernetes.
                    </h2>

                    <p className="gcp-intro-description">
                        Building practical capability across Google Cloud,
                        cloud-native infrastructure, AI development, Kubernetes
                        and the wider Google developer ecosystem through hands-on
                        learning and applied projects.
                    </p>

                    <div className="about-actions">

                        <a
                            className="about-button about-button-primary"
                            target="_blank"
                            rel="noreferrer"
                            href="https://www.skills.google/public_profiles/105079cb-27bf-46a4-9c48-9ce8fc594527"
                        >
                            Google Profile
                        </a>

                    </div>

                </div>


                <div className="gcp-grid">

                    {/* =====================================================
            ROW 1 — INFO
        ===================================================== */}

                    <article className="gcp-tile gcp-tile-info">

                        <div className="gcp-tile-content">

                            <div className="gcp-person-visual">
                                <img
                                    src={gcpPerson}
                                    alt="Google Cloud Character"
                                />
                            </div>

                            <div className="gcp-tile-pills">
                                <span>Cloud</span>
                                <span>AI</span>
                                <span>DevSecOps</span>
                            </div>

                            <h3>
                                Google Cloud
                                <br />
                                Engineering
                            </h3>

                            <p>
                                Developing practical understanding of Google
                                Cloud services, cloud architecture and AI
                                application development through hands-on
                                projects and continuous technical practice.
                            </p>

                        </div>

                        <button className="gcp-arrow" type="button"
                            aria-label="View Google Cloud Vertex AI Intelligent Retail and Supply Chain project"
                            onClick={() => navigate('/projects/vertex-ai-retail')}>
                            <ArrowRight size={14} strokeWidth={1.7} aria-hidden="true" />
                        </button>

                    </article>


                    {/* =====================================================
            COUNTER
        ===================================================== */}

                    <article className="gcp-tile gcp-tile-counter">

                        <div className="gcp-counter-content">

                            <strong data-target="35">
                                0+
                            </strong>

                            <span>
                                GCP Credentials
                            </span>

                        </div>

                    </article>


                    {/* =====================================================
            GOOGLE CLOUD
        ===================================================== */}

                    <article className="gcp-tile gcp-tile-cloud">

                        <div className="gcp-cloud-overlay" />

                        <div className="gcp-tile-content">

                            <h3>
                                Google
                                <br />
                                Cloud
                            </h3>

                            <p>
                                Cloud-native projects across Google Cloud,
                                AI, Kubernetes, data and modern developer
                                infrastructure.
                            </p>

                            <button
                                className="gcp-arrow"
                                type="button"
                                aria-label="View Google Cloud projects"
                                onClick={() => navigate('/projects/gcp')}
                            >
                                <ArrowRight size={14} strokeWidth={1.7} />
                            </button>

                        </div>

                    </article>

                    {/* =====================================================
            KUBERNETES
        ===================================================== */}

                    <article className="gcp-tile gcp-tile-kubernetes">

                        <div className="gcp-kubernetes-visual">
                            <img
                                src={duckDB}
                                alt="DuckDB"
                            />
                        </div>

                        <div className="gcp-kubernetes-overlay" />

                        <div className="gcp-tile-content">

                        </div>

                        <button className="gcp-arrow" type="button"
                            aria-label="View DuckDB project"
                            onClick={() => navigate('/projects/duckdb')}>
                            <ArrowRight size={14} strokeWidth={1.7} aria-hidden="true" />
                        </button>

                    </article>



                    {/* =====================================================
    ROW 2 — GOOGLE DEVELOPER PROGRAM
===================================================== */}

                    <article className="gcp-tile gcp-tile-developer">

                        <div className="gcp-tile-content">

                            <span className="gcp-tile-label">
                                Google
                            </span>

                            <h3>
                                Google Developer
                                <br />
                                Program
                            </h3>

                            <p>
                                Accessing developer learning resources, technical tools,
                                communities and events while building and showcasing
                                practical skills across the Google ecosystem.
                            </p>

                            <a
                                className="gcp-arrow"
                                href="https://g.dev/keenosmith"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="View Google Developer profile"
                            >
                                <ArrowRight size={14} strokeWidth={1.7} />
                            </a>

                        </div>

                    </article>


                    {/* =====================================================
            HUGGING FACE
        ===================================================== */}

                    <article className="gcp-tile gcp-tile-huggingface" style={{ background: projectArtwork['hugging-face'].background }}>

                        <div className="gcp-huggingface-image">
                            <img
                                src={projectArtwork['hugging-face'].image}
                                alt="Hugging Face"
                            />
                        </div>

                        <div className="gcp-huggingface-overlay" />

                        <div className="gcp-huggingface-content">

                            <span className="gcp-tile-label">
                                AI / ML
                            </span>

                            <h3>
                                Hugging Face
                            </h3>

                        </div>

                        <button
                            className="gcp-arrow"
                            type="button"
                            aria-label="View Hugging Face project"
                            onClick={() => navigate('/projects/hugging-face')}
                        >
                            <ArrowRight size={14} strokeWidth={1.7} />
                        </button>

                    </article>


                    {/* =====================================================
            SKILLS
        ===================================================== */}

                    <article className="gcp-tile gcp-tile-skills">

                        <div className="gcp-docker-visual">
                            <img
                                src={gcpBear}
                                alt="Polar Bear"
                            />
                        </div>

                        <div className="gcp-docker-overlay" />

                        <div className="gcp-tile-content">

                        </div>

                    </article>

                </div>

            </section>



        </div>
    );
}

export default About;