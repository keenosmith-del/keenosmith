import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

import './About.css';

import awsLogo from '../../../assets/svgs/about/aws.svg';
import githubLogo from '../../../assets/svgs/about/github-icon.svg';
import githubCopilotLogo from '../../../assets/svgs/about/github-copilot.svg';
import gitlabLogo from '../../../assets/svgs/about/gitlab-icon.svg';
import ibmLogo from '../../../assets/svgs/about/ibm.svg';
import microsoftLogo from '../../../assets/svgs/about/microsoft-icon.svg';
import udacityLogo from '../../../assets/svgs/about/udacity.svg';

function About() {
    const aboutRef = useRef(null);

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
        <section className="about" id="about" ref={aboutRef}>
            <div className="about-intro">

                <h2>
                    Engineering, AI, Cloud & Product.
                </h2>

                <p className="about-intro-description">
                    My development has expanded from full-stack software
                    engineering and web development into AI application
                    development, agentic workflows, AWS, cloud and DevOps,
                    while continuing to develop a strong interest in product
                    thinking and user experience.
                </p>

                <div className="about-actions">
                    <a
                        className="about-button about-button-primary"
                        target="_blank"
                        rel="noreferrer"
                        href="https://skillsprofile.skillbuilder.aws/user/keenosmith"
                    >
                        AWS Skill Builder
                    </a>

                    <a
                        className="about-button about-button-secondary"
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.credly.com/users/keeno-smith"
                    >
                        Credly
                    </a>
                </div>
            </div>

            <div className="about-grid">

                {/* Tile 1 — Full-Stack Software Engineering */}
                <article className="about-tile about-tile-large about-tile-one">

                    <div className="about-tile-one-top">
                        <div className="about-tile-one-pills">
                            <span>Hyperion Development</span>
                            <span>UNISA</span>
                            <span>Helsinki Full-Stack Open</span>
                        </div>
                    </div>

                    <div className="about-tile-one-content">
                        <h3>
                            Full-Stack Software Engineering
                        </h3>

                        <p>
                            My engineering foundation spans full-stack
                            application development, modern web architecture,
                            APIs, databases and responsive web development,
                            supported by formal education and practical
                            software engineering experience.
                        </p>
                    </div>

                </article>


                {/* Tile 2 — AWS AI */}
                <article className="about-tile about-tile-medium about-tile-two">

                    <div className="about-tile-two-content">
                        <h3>
                            AWS AI Practitioner
                            <br />
                            AI Programmer
                        </h3>

                        <p>
                            Building on my software engineering foundation
                            with applied AI, machine learning and practical
                            AI-enabled application development.
                        </p>
                    </div>

                </article>


                {/* Tile 3 — AWS Badges */}
                <article className="about-tile about-tile-small about-tile-three">

                    <div className="about-tile-three-logo">
                        <img
                            src={awsLogo}
                            alt="AWS"
                        />
                    </div>

                    <div className="about-tile-three-content">
                        <strong data-target="30">
                            30+
                        </strong>

                        <span>
                            AWS Badges
                        </span>
                    </div>

                    <a
                        className="about-tile-three-link"
                        target="_blank"
                        rel="noreferrer"
                        href="https://skillsprofile.skillbuilder.aws/user/keenosmith"
                        aria-label="View AWS Skill Builder profile"
                    >
                        <ArrowRight size={18} strokeWidth={1.7} />
                    </a>

                </article>


                {/* Tile 4 — Generative AI & Agentic AI */}
                <article className="about-tile about-tile-medium-2 about-tile-four">

                    <div className="about-tile-four-header">

                        <div className="about-tile-four-pills">
                            <span>
                                Stellenbosch University
                            </span>

                            <span>
                                WeThinkCode_
                            </span>
                        </div>

                    </div>

                    <div className="about-tile-four-content">
                        <h3>
                            Generative AI &amp; Agentic AI
                        </h3>

                        <p>
                            Exploring LLM integration, retrieval-augmented
                            generation, prompt engineering and agentic
                            workflows within practical software systems.
                        </p>
                    </div>

                </article>


                {/* Tile 5 — AWS Microcredentials */}
                <article className="about-tile about-tile-small-2 about-tile-five">

                    <div className="about-tile-five-logo">
                        <img
                            src={awsLogo}
                            alt="AWS"
                        />
                    </div>

                    <div className="about-tile-five-content">
                        <strong data-target="4">
                            4+
                        </strong>

                        <span>
                            AWS Microcredentials
                        </span>
                    </div>

                    <a
                        className="about-tile-five-link"
                        target="_blank"
                        rel="noreferrer"
                        href="https://skillsprofile.skillbuilder.aws/user/keenosmith"
                        aria-label="View AWS Skill Builder profile"
                    >
                        <ArrowRight size={18} strokeWidth={1.7} />
                    </a>

                </article>


                {/* Tile 6 — GitHub Repositories */}
                <article className="about-tile about-tile-small about-tile-six">

                    <div className="about-tile-six-logos">
                        <img
                            src={gitlabLogo}
                            alt="GitLab"
                        />

                        <img
                            src={githubCopilotLogo}
                            alt="GitHub Copilot"
                        />

                        <img
                            src={githubLogo}
                            alt="GitHub"
                        />
                    </div>

                    <div className="about-tile-six-content">
                        <strong data-target="100">
                            100+
                        </strong>

                        <span>
                            GitHub Repos
                        </span>
                    </div>

                    <a
                        className="about-tile-six-link"
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/keenosmith-del"
                        aria-label="View GitHub repositories"
                    >
                        <ArrowRight size={18} strokeWidth={1.7} />
                    </a>

                </article>


                {/* Tile 7 — Product & UX */}
                <article className="about-tile about-tile-medium about-tile-seven">

                    <div className="about-tile-seven-logo">
                        <img
                            src={ibmLogo}
                            alt="IBM"
                        />
                    </div>

                    <div className="about-tile-seven-content">
                        <h3>
                            Product &amp; UX
                        </h3>

                        <span>
                            IBM Enterprise Design Thinking Practitioner
                        </span>
                    </div>

                    <a
                        className="about-tile-seven-link"
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.credly.com/users/keeno-smith"
                        aria-label="View Credly profile"
                    >
                        <ArrowRight size={18} strokeWidth={1.7} />
                    </a>

                </article>


                {/* Tile 8 — Agent Architect */}
                <article className="about-tile about-tile-medium-2 about-tile-eight">

                    <div className="about-tile-eight-header">

                        <span className="about-tile-eight-pill">
                            Founderz
                        </span>

                        <img
                            className="about-tile-eight-logo"
                            src={microsoftLogo}
                            alt="Microsoft"
                        />

                    </div>

                    <div className="about-tile-eight-content">
                        <h3>
                            Agent Architect
                        </h3>

                        <p>
                            Exploring the architecture and development of AI
                            agents, including agentic workflows, orchestration
                            and practical AI application design.
                        </p>
                    </div>

                </article>

            </div>
        </section>
    );
}

export default About;