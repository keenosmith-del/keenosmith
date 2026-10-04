import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import './About.css';

import awsLogo from '../../../assets/svgs/about/aws-2.png';
import microsoftLogo from '../../../assets/svgs/about/microsoft-icon.svg';

import awsSkillBuilderImage from '../../../assets/images/about/aws_skill_builder.png';
import pytorchImage from '../../../assets/images/about/pytorch.png';
import jwtRedpandaImage from '../../../assets/images/about/jwt-redpanda.png';
import openTofu from '../../../assets/images/about/openTofu.png';
import kinesisImage from '../../../assets/images/about/kinesis.png';
import kafkaRabbitmq from '../../../assets/images/about/kafka-rabbitmq.png';

import foundersLogo from '../../../assets/images/about/founderz.png';
import microsoftBadge1 from '../../../assets/images/about/microsoft-badge.png';
import foundryBadge from '../../../assets/images/about/foundry.png';
import bearVisual from '../../../assets/images/about/bearVisual.png';
import liblabsPostman from '../../../assets/images/about/liblabs.png';
import azureLogo from '../../../assets/images/about/azure.png';
import openAIImage from '../../../assets/images/about/openai.svg';

import copilotCover from '../../../assets/images/about/copilot-cover.png';


import googleCloudLogo from '../../../assets/images/about/google.png';
import huggingFace from '../../../assets/images/about/hugging-face.png';
import kubernetesImage from '../../../assets/images/about/kubernetes.png';
import dockerImage from '../../../assets/images/about/docker.png';
import bananaImage from '../../../assets/images/about/nano-banana.png';
import duckDB from '../../../assets/images/about/duckDB.png';
import duckDBImage from '../../../assets/images/about/duckDBMascot.png';

import googleBadge from '../../../assets/images/about/googleLogo.png';
import adkBadge from '../../../assets/images/about/adk.png';
import gdpBadge from '../../../assets/images/about/gdp.png';

import githubLogo from '../../../assets/svgs/about/github.svg';
import githubImage from '../../../assets/images/about/github.png';
import qwenTop from '../../../assets/images/about/myCompanyImage-1.png';
import qwenBottom from '../../../assets/images/about/myCompanyImage-2.png';

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
                    Putting my cloud and AI
                    <br />
                    work into practice.
                </h2>

                <p className="about-intro-description">
                    Full-stack development,
                    machine learning, real-time processing and AWS infrastructure.
                    This section shows that work alongside the tools I use and
                    the hands-on learning I continue through CloudQuest,
                    Skill Builder and my AWS credentials.
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
                            <span>Amazon Bedrock</span>
                            <span>SageMaker</span>
                            <span>S3</span>
                            <span>DynamoDB</span>
                            <span>IAM</span>
                        </div>
                    </div>

                    <div className="about-tile-one-content">
                        <h3>
                            Getting hands-on
                            <br />
                            with AI.
                        </h3>

                        <p>
                            I’m interested in how models become part of an
                            application. My work takes me from Python and PyTorch
                            to Bedrock and SageMaker, then into data and
                            permissions in S3, DynamoDB and IAM.
                        </p>
                    </div>

                </article>


                {/* Tile 2: credentials counter */}
                <article className="about-tile about-tile-medium about-tile-two about-aws-credentials">
                    <div className="about-tile-two-logo">
                        <img src={awsLogo} alt="AWS" />
                    </div>
                    <div className="about-aws-counter">
                        <strong data-target="16">0+</strong>
                        <span>AWS Credentials</span>
                    </div>
                </article>


                {/* Tile 3 — OpenTofu visual tile */}
                <article className="about-tile about-tile-small about-tile-three">

                    <img
                        src={openTofu}
                        alt="OpenTofu"
                        className="about-tile-three-image"
                    />

                    <div className="about-tile-three-overlay" />

                    <button className="about-aws-project-link" type="button"
                        aria-label="View OpenTofu infrastructure project"
                        onClick={() => navigate('/projects/opentofu')}>
                        <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
                    </button>

                </article>



                {/* Tile 4: AWS banking project */}
                <article className="about-tile about-tile-medium-2 about-tile-four about-aws-project">
                    <div className="about-tile-four-header">
                        <div className="about-tile-four-pills">
                            <span>Lambda</span>
                            <span>API Gateway</span>
                            <span>EventBridge</span>
                            <span>CloudWatch</span>
                            <span>Kinesis</span>
                        </div>
                    </div>
                    <div className="about-tile-four-content">
                        <h3>Cloud &amp; Infrastructure</h3>
                        <p>For my banking platform, I follow payment data through
                            risk decisions and service responses, then trace
                            what happened with CloudWatch. That work connects
                            ML, Lambda and API Gateway.</p>
                    </div>
                    <button className="about-aws-project-link" type="button"
                        aria-label="View AWS Intelligent Banking and Payment Risk Platform"
                        onClick={() => navigate('/projects/aws')}>
                        <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
                    </button>
                </article>


                {/* Tile 5: event-driven systems */}
                <article className="about-tile about-tile-small-2 about-tile-five about-aws-messaging">
                    <img src={kafkaRabbitmq} alt="Kafka and RabbitMQ" className="about-aws-messaging-image" />
                    <div className="about-aws-messaging-overlay" />

                    <div className="about-aws-messaging-content">
                        <h3>Kafka + RabbitMQ</h3>
                        <p>As my applications involve more services, I use
                            Kafka and RabbitMQ to coordinate events and
                            background work.</p>
                    </div>
                    <button className="about-tile-five-link" type="button"
                        aria-label="View RabbitMQ event-driven project"
                        onClick={() => navigate('/projects/rabbitmq')}>
                        <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
                    </button>
                </article>


                {/* Tile 6 — Kinesis */}
                <article className="about-tile about-tile-small about-tile-six about-kinesis">
                    <img src={kinesisImage} alt="Amazon Kinesis" className="about-kinesis-image" />
                    <div className="about-kinesis-overlay" />
                    <div className="about-kinesis-chips">
                        <span>Amazon Kinesis</span>
                        <span>Real-time streaming</span>
                        <span>Event processing</span>
                    </div>
                    <div className="about-tile-six-content">
                        <h3>Kinesis</h3>
                        <p>I use Amazon Kinesis to stream payment data through
                            my banking platform, connecting real-time events
                            with processing and risk decisions.</p>
                    </div>
                    <button className="about-tile-six-link" type="button"
                        aria-label="View Kinesis streaming project"
                        onClick={() => navigate('/projects/kinesis')}>
                        <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
                    </button>
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
                                src={duckDBImage}
                                alt="DuckDB"
                            />
                        </div>

                        <div className="gcp-docker-overlay" />

                        <div className="gcp-tile-content">

                        </div>

                    </article>

                </div>

            </section>


            {/* =========================================================
   MICROSOFT SECTION
   ========================================================= */}

            <section className="about-microsoft" id="microsoft">

                <div className="about-microsoft-intro">

                    <h2>
                        Backend systems, AI &amp; observability.
                    </h2>

                    <p>
                        Building services with Go, C#, .NET, .NET MAUI and Spring Boot,
                        connecting AI with OpenAI and Ollama, and working with Redis,
                        OpenTelemetry and Toxiproxy to explore caching, observability
                        and resilient distributed systems.
                    </p>

                    <div className="about-actions">

                        {/*
                        <a
                            className="about-button about-button-primary"
                            href="/certifications"
                        >
                            Credentials
                        </a>
                        */}

                        <a
                            className="about-button about-button-primary"
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
                                <span>Go</span>
                                <span>.NET</span>
                                <span>C#</span>
                                <span>.NET MAUI</span>
                                <span>Spring Boot</span>
                                <span>Redis</span>
                                <span>OpenTelemetry</span>
                                <span>Toxiproxy</span>
                            </div>

                        </div>

                        <div className="microsoft-tile-badge">
                            {/*
                            <img
                                src={microsoftLogo}
                                alt="Microsoft"
                            />
                            */}
                        </div>

                        <div className="microsoft-tile-content">

                            <h3>
                                Go &amp; .NET Services
                            </h3>

                            <p>
                                Building backend services with Go and .NET, using Redis
                                for caching, OpenTelemetry for tracing and Toxiproxy
                                to explore how services respond to network failures.
                            </p>

                        </div>

                        <button className="microsoft-tile-arrow" type="button"
                            aria-label="View Go and .NET project"
                            onClick={() => navigate('/projects/go-dotnet')}>
                            <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
                        </button>

                    </article>


                    {/* =====================================================
   TILE 2 — POSTMAN / LIBLAB
===================================================== */}

                    <article className="microsoft-tile microsoft-tile-postman">

                        <img
                            src={openAIImage}
                            alt="OpenAI"
                            className="microsoft-postman-image"
                        />

                        <div className="microsoft-postman-overlay" />

                        <div className="microsoft-postman-content">

                            <h3>
                                OpenAI
                            </h3>

                        </div>

                        <button
                            className="microsoft-tile-arrow"
                            type="button"
                            aria-label="View OpenAI project"
                            onClick={() => navigate('/projects/openai')}
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
                        <img src={microsoftBadge1} alt="Microsoft" className="microsoft-counter-badge" />

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

                    <article className="microsoft-tile microsoft-tile-credential microsoft-tile-jwt-redpanda">
                        <img src={jwtRedpandaImage} alt="JWT and Redpanda" className="microsoft-jwt-redpanda-image" />
                        <div className="microsoft-jwt-redpanda-overlay" />
                        <div className="microsoft-credential-pills">
                            <span>JWT</span>
                            <span>Redpanda</span>
                            <span>Event streaming</span>
                        </div>
                        <div className="microsoft-tile-content">
                            <h3>JWT + RedPanda</h3>
                            <p>Securing service access with JWT authentication and
                                connecting distributed applications through Redpanda
                                event streams.</p>
                        </div>
                        <button className="microsoft-tile-arrow" type="button"
                            aria-label="View JWT and Redpanda project"
                            onClick={() => navigate('/projects/jwt-redpanda')}>
                            <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
                        </button>

                    </article>


                    {/* =====================================================
           TILE 6 — DEEPSEEK
        ===================================================== */}

                    <article className="microsoft-tile microsoft-tile-deepseek">

                        <img
                            src={bearVisual}
                            alt=""
                            className="microsoft-deepseek-image"
                        />

                        <div className="microsoft-deepseek-overlay" />

                        <div className="microsoft-deepseek-content">

                            <h3>
                                Another Project Title
                            </h3>

                        </div>

                        <button
                            className="microsoft-tile-arrow"
                            type="button"
                            aria-label="View Ollama Private Personal and Business Intelligence project"
                            onClick={() => navigate('/projects/ollama')}
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
            TILE 1 — FULL-STACK ENGINEERING
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

                    {/* this tile needs image qwenTop resting flush on bottom right of container */}

                    <article className="about-tile about-three-ai">

                        <div className="about-three-label">
                            <span>Qwen AI</span>
                        </div>

                        <div className="about-three-content">
                            {/* content moved UP so image does not overlap*/}
                            <h3>
                                Qwen 3.8
                            </h3>

                            <p>
                                Some placeholder content until I figure out exactly what needs to go into this tile to tell a narrative story with portfolio
                            </p>
                        </div>

                        <img
                            src={qwenTop}
                            alt=""
                            className="about-three-qwen-top"
                        />

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

                    {/* this tile needs image qwenBottom resting flush on top right of container */}

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

                        <img
                            src={qwenBottom}
                            alt=""
                            className="about-three-qwen-bottom"
                        />

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

                    {/*
                    <a
                        className="about-button about-button-secondary"
                        href="/certifications"
                    >
                        Credentials
                    </a>
                    */}

                </div>

            </section>

        </section>
    );
}

export default About;