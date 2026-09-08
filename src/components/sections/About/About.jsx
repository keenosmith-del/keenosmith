import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

import './About.css';

import awsLogo from '../../../assets/svgs/about/aws.svg';
import githubLogo from '../../../assets/svgs/about/github-icon.svg';
import githubCopilotLogo from '../../../assets/svgs/about/github-copilot.svg';
import gitlabLogo from '../../../assets/svgs/about/gitlab-icon.svg';
import githubActionsLogo from '../../../assets/svgs/about/gitactions.svg';
import microsoftLogo from '../../../assets/svgs/about/microsoft-icon.svg';
import udacityLogo from '../../../assets/svgs/about/udacity.svg';

import awsSkillBuilderImage from '../../../assets/images/about/aws_skill_builder.jpg';
import awsCloudQuestImage from '../../../assets/images/about/cloud_quest.png';

import foundersLogo from '../../../assets/images/about/founderz.png';
import microsoftLearn from '../../../assets/images/about/microsoft-learn.png';
import microsoftBadge1 from '../../../assets/images/about/microsoft-badge.png';

import copilotCover from '../../../assets/images/about/copilot-cover.jpg';

import ibmLogo from '../../../assets/svgs/about/ibm.svg';
import mckinseyBadge from '../../../assets/images/about/mckinsey-badge.png';

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
                    AWS Cloud, AI &amp; DevOps.
                </h2>

                <p className="about-intro-description">
                    Building deeper capability across AWS cloud, AI and machine
                    learning, cloud infrastructure and DevOps through hands-on
                    learning, applied projects, challenges and continuous practice
                    across the AWS ecosystem.
                </p>

                <div className="about-actions">
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
                            <span>AWS</span>
                            <span>Udacity</span>
                            <span>AI / ML Scholars Programme</span>
                        </div>
                    </div>

                    <div className="about-tile-one-content">
                        <h3>
                            AWS AI Practitioner
                        </h3>

                        <p>
                            Applied understanding of artificial intelligence,
                            machine learning and generative AI within the AWS
                            ecosystem, developed through the AWS AI / ML
                            Scholars Programme.
                        </p>
                    </div>

                </article>


                {/* Tile 2 — AWS AI */}
                <article className="about-tile about-tile-medium about-tile-two">
                    <div className="about-tile-two-top">

                        <div className="about-tile-two-pills">
                            <span>Python</span>
                            <span>PyTorch</span>
                            <span>Transformers</span>
                            <span>NumPy</span>
                            <span>Matplotlib</span>
                        </div>

                    </div>

                    <div className="about-tile-two-content">
                        <h3>
                            AWS AI Programmer
                        </h3>

                        <p>
                            Practical AI programming capability across Python,
                            machine learning and AI application development.
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
                                Architecture
                            </span>
                            <span>
                                Automation
                            </span>
                            <span>
                                Deployment
                            </span>
                        </div>

                    </div>

                    <div className="about-tile-four-content">
                        <h3>
                            Cloud &amp; Infrastructure
                            <br />
                            DevOps &amp; Practice
                        </h3>

                        <p>
                            Building practical understanding of AWS cloud
                            services, architecture and infrastructure.
                            <br />
                            Continuing hands-on development through challenges,
                            labs and practical cloud workflows.
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


                {/* Tile 6 — CloudQuest */}
                <article className="about-tile about-tile-small about-tile-six">

                    <div className="about-tile-six-logos">
                        <img
                            src={awsCloudQuestImage}
                            alt="CloudQuest"
                        />
                    </div>

                    <div className="about-tile-six-content">

                        <h3>
                            CloudQuest
                        </h3>

                        <p>
                            An ongoing AWS cloud learning journey focused on building
                            practical knowledge through interactive challenges and
                            hands-on exploration.
                        </p>

                    </div>

                    <a
                        className="about-tile-six-link"
                        target="_blank"
                        rel="noreferrer"
                        href="https://skillsprofile.skillbuilder.aws/user/keenosmith/cloudquest"
                        aria-label="Cloud Quest"
                    >
                        <ArrowRight size={18} strokeWidth={1.7} />
                    </a>

                </article>


                {/* Tile 7 — AWS Skill Builder */}
                <article className="about-tile about-tile-medium-2 about-tile-eight">

                    <div className="about-tile-eight-image">
                        <img
                            src={awsSkillBuilderImage}
                            alt="AWS Skill Builder profile"
                        />
                    </div>

                    <div className="about-tile-eight-overlay" />

                    <a
                        className="about-tile-eight-link"
                        target="_blank"
                        rel="noreferrer"
                        href="https://skillsprofile.skillbuilder.aws/user/keenosmith"
                        aria-label="View AWS Skill Builder profile"
                    >
                        <ArrowRight size={18} strokeWidth={1.7} />
                    </a>

                </article>

            </div>

            {/* =========================================================
               MICROSOFT SECTION
               ========================================================= */}

            <section className="about-microsoft" id="microsoft">

                <div className="about-microsoft-intro">

                    <span className="about-microsoft-eyebrow">
                        Microsoft Ecosystem
                    </span>

                    <h2>
                        Microsoft, AI &amp; Cybersecurity.
                    </h2>

                    <p>
                        Building deeper expertise across the Microsoft
                        ecosystem, with a growing focus on AI, cybersecurity,
                        cloud security and intelligent security operations.
                    </p>

                </div>


                <div className="about-microsoft-grid">
                    {/* Microsoft Tile 1 — Microsoft Security & AI */}

                    <article className="microsoft-tile microsoft-tile-learn">

                        <div className="microsoft-tile-top">

                            <div className="microsoft-tile-pills">
                                <span>Azure</span>
                                <span>Microsoft Entra ID</span>
                                <span>Microsoft Defender XDR</span>
                                <span>Microsoft Sentinel</span>
                                <span>Azure AI</span>
                                <span>Copilot</span>
                            </div>

                        </div>

                        <div className="microsoft-tile-badge">
                            <img
                                src={microsoftLogo}
                                alt="Microsoft"
                            />
                        </div>

                        <div className="microsoft-tile-content">

                            <h3>
                                Microsoft Security &amp; AI
                            </h3>

                            <p>
                                Developing practical capability across Microsoft cloud,
                                artificial intelligence and cybersecurity through hands-on
                                learning, applied labs and security-focused training.
                            </p>

                        </div>

                        <a
                            className="microsoft-tile-arrow"
                            target='_blank'
                            href="https://learn.microsoft.com/en-us/users/keenosmith/"
                            aria-label="Explore Microsoft security and AI"
                        >
                            <ArrowRight
                                size={18}
                                strokeWidth={1.7}
                                aria-hidden="true"
                            />
                        </a>

                    </article>


                    {/* Microsoft Learn Badges */}
                    <article className="microsoft-tile microsoft-tile-counter">

                        <div className="microsoft-counter-content">

                            <strong data-target="25">
                                0+
                            </strong>

                            <span>
                                Microsoft Learn Badges
                            </span>

                        </div>

                    </article>


                    {/* Microsoft Learn Trophies */}
                    <article className="microsoft-tile microsoft-tile-counter">

                        <div className="microsoft-counter-content">

                            <strong data-target="6">
                                0+
                            </strong>

                            <span>
                                Microsoft Learn Trophies
                            </span>

                        </div>

                    </article>


                    {/* Agent Architect */}
                    <article className="microsoft-tile microsoft-tile-credential">

                        <div className="microsoft-credential-pills">

                            <span>Azure AI</span>
                            <span>AI Agents</span>
                            <span>Agentic AI</span>

                        </div>

                        <div className="microsoft-credential-badge">

                            <img
                                src={foundersLogo}
                                alt="Founderz"
                            />

                        </div>

                        <div className="microsoft-tile-content">

                            <h3>
                                Agent Architect
                            </h3>

                            <p>
                                AI agent architecture, agentic workflows,
                                orchestration and practical AI application
                                design.
                            </p>

                        </div>

                    </article>


                    {/* Defender XDR */}
                    <article className="microsoft-tile microsoft-tile-credential">

                        <div className="microsoft-credential-badge">
                            <img
                                src={microsoftBadge1}
                                alt="Microsoft Applied Skills"
                            />
                        </div>

                        <div className="microsoft-tile-content">

                            <h3>
                                Defender XDR
                            </h3>

                            <p>
                                Threat detection, incident response and endpoint investigation
                                using Microsoft Defender XDR, Defender for Endpoint and KQL.
                            </p>

                        </div>

                    </article>


                    {/* Cyber Genius */}
                    <article className="microsoft-tile microsoft-tile-credential">

                        <div className="microsoft-credential-pills">

                            <span>Cybersecurity</span>
                            <span>Threat Detection</span>
                            <span>Security Operations</span>

                        </div>

                        <div className="microsoft-credential-badge">

                            <img
                                src={foundersLogo}
                                alt="Founderz"
                            />

                        </div>

                        <div className="microsoft-tile-content">

                            <h3>
                                Cyber Genius - Inside the Breach
                            </h3>

                            <p>
                                Practical cybersecurity training focused on threat detection,
                                incident response, security operations and understanding modern
                                cyberattacks.
                            </p>

                        </div>

                    </article>


                    {/* Future Microsoft credentials */}
                    <article className="microsoft-tile microsoft-tile-credential microsoft-tile-placeholder">

                        <div className="microsoft-placeholder-image">
                            <img
                                src={microsoftLearn}
                                alt="Microsoft Learn"
                            />
                        </div>

                        <div className="microsoft-placeholder-overlay" />

                        <div className="microsoft-tile-content">
                        </div>

                        <a
                            className="microsoft-tile-arrow microsoft-tile-arrow-light"
                            target="_blank"
                            rel="noreferrer"
                            href="https://learn.microsoft.com/en-us/users/keenosmith/"
                            aria-label="Explore Microsoft security and AI"
                        >
                            <ArrowRight
                                size={18}
                                strokeWidth={1.7}
                                aria-hidden="true"
                            />
                        </a>

                    </article>

                </div>

            </section>

            {/* =========================================================
    SECTION 3 — ENGINEERING, AI & PRODUCT
    ========================================================= */}

            <section className="about about-section-three" id="engineering">

                <div className="about-intro">

                    <h2>
                        Engineering, CI/CD <br /> Product & UX.
                    </h2>

                    <p className="about-intro-description">
                        Full-stack development, modern engineering workflows, AI-assisted
                        development and the tools used to build, version, automate and
                        continuously improve production-ready applications.
                    </p>

                </div>


                <div className="about-grid about-grid-three">

                    {/* =================================================
            TILE 1 — FULL-STACK ENGINEERING THIS TILE GETS SLIGHTLY NARROWER IN WIDTH!!!!!!!! FUCK MAN 
            ================================================= */}

                    <article className="about-tile about-three-engineering">

                        <div className="about-three-label">
                            <span>HyperionDev</span>
                            <span>Helsinki Full-Stack Open</span>
                            <span>UNISA</span>

                        </div>

                        <div className="about-three-content">

                            <h3>
                                Full-Stack Software
                                <br />
                                Engineering
                            </h3>

                            <p>
                                Full-stack software engineering supported by a computer science foundation,
                                with practical experience building frontend interfaces,
                                backend services, database-driven applications,
                                authentication systems and integrated full-stack solutions.
                            </p>

                        </div>

                    </article>

                    {/* =================================================
    TILE 4 — GITHUB COPILOT
    VISUAL COVER THE FUCKING TILE GOES HERE!! SO THIS BECOMES TILE 2
    ================================================= */}

                    <article className="about-tile about-three-copilot">

                        <div className="about-three-copilot-image">
                            <img
                                src={copilotCover}
                                alt="GitHub Copilot"
                            />
                        </div>

                        <div className="about-three-copilot-overlay" />

                    </article>


                    {/* =================================================
            TILE 2 — GENERATIVE AI THIS TILE STAYS WHERE IT IS BUT IS TILE 3
            ================================================= */}

                    <article className="about-tile about-three-ai">

                        <div className="about-three-label">
                            <span>Stellenbosch University</span>
                        </div>

                        <div className="about-three-content">
                            <h3>
                                Generative AI
                            </h3>

                            <p>
                                Exploring large language models, natural language processing,
                                retrieval-augmented generation and prompt engineering for
                                practical generative AI application development.
                            </p>
                        </div>

                    </article>


                    {/* =================================================
            TILE 3 — GITHUB COUNTER
            ================================================= */}

                    <article className="about-tile about-three-github">

                        <div className="about-three-github-logo">

                            <img
                                src={githubLogo}
                                alt="GitHub"
                            />

                            <img
                                src={gitlabLogo}
                                alt="GitLab"
                            />

                            <img
                                src={githubCopilotLogo}
                                alt="GitHub Copilot"
                            />

                            <img
                                src={githubActionsLogo}
                                alt="GitHub Actions"
                            />

                        </div>

                        <div className="about-three-counter">
                            <strong data-target="100">
                                100+
                            </strong>

                            <span>
                                GitHub Repositories
                            </span>
                        </div>

                        <a
                            className="about-three-arrow"
                            target="_blank"
                            rel="noreferrer"
                            href="https://github.com/keenosmith-del"
                            aria-label="View GitHub repositories"
                        >
                            <ArrowRight
                                size={18}
                                strokeWidth={1.7}
                            />
                        </a>

                    </article>


                    {/* =================================================
            TILE 4 — WETHINKCODE
            ================================================= */}

                    <article className="about-tile about-three-wethinkcode">

                        <div className="about-three-label">
                            <span>WeThinkCode_</span>
                        </div>

                        <div className="about-three-content">
                            <h3>
                                AI Course for Developers
                                <br />
                                GenAI for Software Developers
                            </h3>

                            <p>
                                Applying AI-assisted development, modern programming
                                practices and intelligent tooling to software
                                engineering workflows.
                            </p>
                        </div>

                    </article>


                    {/* =================================================
    TILE 5 — MCKINSEY
    ================================================= */}

                    <article className="about-tile about-three-mckinsey">

                        <div className="about-three-badge">
                            <img
                                src={mckinseyBadge}
                                alt="McKinsey Academy"
                            />
                        </div>

                        <div className="about-three-content">

                            <h3>
                                McKinsey Academy Forward
                            </h3>

                            <p>
                                Developing professional capabilities across problem-solving,
                                collaboration, communication and personal effectiveness.
                            </p>

                        </div>

                    </article>


                    {/* =================================================
    TILE 6 — IBM
    ================================================= */}

                    <article className="about-tile about-three-unisa">

                        <div className="about-three-label">

                            <span>ITExperience</span>
                            <span>Umuzi</span>
                            <span>ACN</span>

                        </div>

                        <div className="about-three-badge">
                            <img
                                src={ibmLogo}
                                alt="IBM"
                            />
                        </div>

                        <div className="about-three-content">

                            <h3>
                                Product &amp; UX
                            </h3>

                            <p>
                                Building foundations in product thinking, user
                                experience and human-centred digital
                                solutions.
                            </p>

                        </div>

                    </article>

                </div>

                <div className="about-linkedin-action">

                    <a
                        className="about-button about-button-primary"
                        href="https://www.linkedin.com/in/keenosmith/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        LinkedIn
                        <ArrowRight
                            size={15}
                            strokeWidth={1.7}
                        />
                    </a>

                </div>

            </section>

        </section>
    );
}

export default About;