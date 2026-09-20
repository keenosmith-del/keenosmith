import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import './About.css';

import awsLogo from '../../../assets/svgs/about/aws.svg';
import microsoftLogo from '../../../assets/svgs/about/microsoft-icon.svg';

import awsSkillBuilderImage from '../../../assets/images/about/aws_skill_builder.png';
import pytorchImage from '../../../assets/images/about/pytorch.png';

import foundersLogo from '../../../assets/images/about/founderz.png';
import microsoftBadge1 from '../../../assets/images/about/microsoft-badge.png';
import foundryBadge from '../../../assets/images/about/foundry.png';
import ollamaCover from '../../../assets/images/about/ollama-cover.png';
import liblabsPostman from '../../../assets/images/about/liblabs.png';
import azureLogo from '../../../assets/images/about/azure.png';

import copilotCover from '../../../assets/images/about/copilot-cover.jpg';


import googleCloudLogo from '../../../assets/images/about/google.png';
import huggingFace from '../../../assets/images/about/hugging-face.png';
import kubernetesImage from '../../../assets/images/about/kubernetes.png';
import dockerImage from '../../../assets/images/about/docker.png';
import googleBadge from '../../../assets/images/about/googleLogo.png';
import adkBadge from '../../../assets/images/about/adk.png';
import gdpBadge from '../../../assets/images/about/gdp.png';

import githubLogo from '../../../assets/svgs/about/github.svg';
import githubImage from '../../../assets/images/about/github.png';

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
                        className="about-button about-button-primary"
                        target="_blank"
                        rel="noreferrer"
                        href="https://skillsprofile.skillbuilder.aws/user/keenosmith"
                    >
                        AWS Profile
                    </a>

                    <a
                        className="about-button about-button-secondary"
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.credly.com/users/keeno-smith"
                    >
                        Skills Wallet
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


                {/* Tile 3 — PyTorch */}
                <article className="about-tile about-tile-small about-tile-three">

                    <img
                        src={pytorchImage}
                        alt="PyTorch"
                        className="about-tile-three-image"
                    />

                    <div className="about-tile-three-overlay" />

                    <div className="about-tile-three-content">

                        <strong>
                            PyTorch
                        </strong>

                    </div>

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
                        <strong data-target="16">
                            0+
                        </strong>

                        <span>
                            AWS Credentials
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
               GOOGLE CLOUD PLATFORM SECTION
               ========================================================= */}

            <section className="gcp" id="gcp">

                <div className="gcp-intro">

                    <img
                        src={googleCloudLogo} alt="Google Cloud"
                        className="gcp-intro-logo"
                    />

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

                        <img
                            className="gcp-info-badge"
                            src={adkBadge}
                            alt=""
                        />

                        <div className="gcp-tile-content">

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

                    </article>


                    {/* =====================================================
            COUNTER
        ===================================================== */}

                    <article className="gcp-tile gcp-tile-counter">

                        <img
                            className="gcp-counter-badge"
                            src={googleBadge}
                            alt=""
                        />

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

                        {/*
                        <div className="gcp-kubernetes-visual">
                            <img
                                src={kubernetesImage}
                                alt=""
                            />
                        </div>
                        */}

                        <div className="gcp-kubernetes-overlay" />

                        <span className="gcp-kubernetes-label">
                            Kubernetes orchestration, GKE deployments
                            and cloud-native workloads on Google Cloud.
                        </span>

                    </article>



                    {/* =====================================================
    ROW 2 — GOOGLE DEVELOPER PROGRAM
===================================================== */}

                    <article className="gcp-tile gcp-tile-developer">

                        <img
                            className="gcp-developer-badge"
                            src={gdpBadge}
                            alt=""
                        />

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

                    <article className="gcp-tile gcp-tile-huggingface">

                        <div className="gcp-huggingface-image">
                            <img
                                src={huggingFace}
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
                            disabled
                            aria-label="Hugging Face projects unavailable"
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
                                src={dockerImage}
                                alt=""
                            />
                        </div>

                        <div className="gcp-docker-overlay" />

                        <div className="gcp-tile-content">

                            <p>
                                Containerising cloud-native applications and development
                                environments for consistent deployment across the stack.
                            </p>

                        </div>

                    </article>

                </div>

            </section>


            {/* =========================================================
   MICROSOFT SECTION
   ========================================================= */}

            <section className="about-microsoft" id="microsoft">

                <div className="about-microsoft-intro">


                    <img
                        src={azureLogo}
                        alt="Microsoft Azure"
                        className="about-microsoft-logo"
                    />


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

                    <div className="about-actions">

                        <a
                            className="about-button about-button-primary"
                            target="_blank"
                            rel="noreferrer"
                            href="https://learn.microsoft.com/en-us/users/keenosmith/"
                        >
                            Credentials
                        </a>

                        <a
                            className="about-button about-button-secondary"
                            target="_blank"
                            rel="noreferrer"
                            href="https://learn.microsoft.com/en-us/users/keenosmith/"
                        >
                            Microsoft Profile
                        </a>

                    </div>

                </div>


                <div className="about-microsoft-grid">

                    {/* =====================================================
           TILE 1 — MICROSOFT SECURITY & AI
        ===================================================== */}

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

                    </article>


                    {/* =====================================================
   TILE 2 — POSTMAN / LIBLAB
===================================================== */}

                    <article className="microsoft-tile microsoft-tile-postman">

                        <img
                            src={liblabsPostman}
                            alt="Postman LibLab"
                            className="microsoft-postman-image"
                        />

                        <div className="microsoft-postman-overlay" />

                        <div className="microsoft-postman-content">

                            <h3>
                                Postman liblabs
                            </h3>

                        </div>

                        <button
                            className="microsoft-tile-arrow microsoft-tile-arrow-disabled"
                            type="button"
                            aria-label="Postman LibLab"
                            disabled
                        >
                            <ArrowRight
                                size={18}
                                strokeWidth={1.7}
                                aria-hidden="true"
                            />
                        </button>

                    </article>


                    {/* =====================================================
           TILE 3 — MICROSOFT LEARN COUNTER
        ===================================================== */}

                    <article className="microsoft-tile microsoft-tile-counter">

                        <div className="microsoft-counter-content">

                            <strong data-target="25">
                                0+
                            </strong>

                            <span>
                                Microsoft Credentials
                            </span>

                        </div>

                    </article>


                    {/* =====================================================
           TILE 4 — AZURE AI / FOUNDRY
        ===================================================== */}

                    <article className="microsoft-tile microsoft-tile-foundry">

                        <img
                            src={foundryBadge}
                            alt=""
                            className="microsoft-foundry-badge"
                        />

                        <div className="microsoft-foundry-overlay" />

                        <div className="microsoft-foundry-content">

                            <strong>
                                Microsoft Azure AI / Foundry
                            </strong>

                            <span>
                                Building AI applications and multi-agent systems with
                                Azure AI Foundry, model orchestration, tool calling,
                                agent workflows, evaluation, and cloud-native AI engineering.
                            </span>

                        </div>

                        <button
                            className="microsoft-tile-arrow"
                            type="button"
                            onClick={() => navigate('/projects/microsoft')}
                            aria-label="View Microsoft projects"
                        >
                            <ArrowRight
                                size={18}
                                strokeWidth={1.7}
                                aria-hidden="true"
                            />
                        </button>


                    </article>


                    {/* =====================================================
           TILE 5 — AGENT ARCHITECT
        ===================================================== */}

                    <article className="microsoft-tile microsoft-tile-credential">

                        <div className="microsoft-credential-pills">

                            <span>Azure AI</span>
                            <span>Foundry</span>
                            <span>Agentic AI</span>

                        </div>

                        <div className="microsoft-credential-badge">

                            <img
                                src={microsoftBadge1}
                                alt="Microsoft"
                            />

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


                    {/* =====================================================
           TILE 6 — DEEPSEEK
        ===================================================== */}

                    <article className="microsoft-tile microsoft-tile-deepseek">

                        <img
                            src={ollamaCover}
                            alt=""
                            className="microsoft-deepseek-image"
                        />

                        <div className="microsoft-deepseek-overlay" />

                        <div className="microsoft-deepseek-content">

                            <h3>
                                Ollama
                            </h3>

                        </div>

                        <button
                            className="microsoft-tile-arrow microsoft-tile-arrow-disabled"
                            type="button"
                            aria-label="Ollama"
                            disabled
                        >
                            <ArrowRight
                                size={18}
                                strokeWidth={1.7}
                                aria-hidden="true"
                            />
                        </button>

                    </article>

                </div>

            </section>

            {/* =========================================================
    SECTION 3 — ENGINEERING, AI & PRODUCT
    ========================================================= */}

            <section className="about about-section-three" id="engineering">

                <div className="about-intro">

                    <img
                        src={githubLogo}
                        alt="GitHub"
                        className="about-intro-logo"
                    />

                    <h2>
                        Engineering <br /> CI/CD
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
            TILE 2 — GENERATIVE AI
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

                        <div className="about-three-counter">
                            <strong data-target="120">
                                0+
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

                </div>

                <div className="about-linkedin-action">

                    <a
                        className="about-button about-button-primary"
                        href="https://www.linkedin.com/in/keenotreysmith/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        LinkedIn
                    </a>

                </div>

            </section>

        </section>
    );
}

export default About;