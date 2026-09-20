import './CV.css';

import { ArrowLeft, Download, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

function CV() {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <main className="cv">

            <div className="cv-page-controls">

                <button
                    type="button"
                    className="cv-page-control cv-back"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft size={15} strokeWidth={1.8} />
                    <span>Back to Portfolio</span>
                </button>

                <a
                    href="/Keeno-Smith-CV.pdf"
                    download="Keeno-Smith-CV.pdf"
                    className="cv-page-control cv-download"
                >
                    <span>Download CV</span>
                    <Download size={15} strokeWidth={1.8} />
                </a>

            </div>

            <div className="cv-page">

                <section className="cv-intro">

                    <div className="cv-intro-divider" />

                    <div className="cv-intro-links">

                        <a
                            href="https://github.com/keenosmith-del"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            github.com/keenosmith-del
                        </a>

                        <a
                            href="https://linkedin.com/in/keenotreysmith"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            linkedin.com/in/keenotreysmith
                        </a>

                        <a
                            href="https://keenosmith.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            keenosmith.vercel.app/
                        </a>

                    </div>

                    <div className="cv-intro-contact">

                        <a href="mailto:business.keenosmith@icloud.com">
                            business.keenosmith@icloud.com
                        </a>

                        <a href="tel:+27824158441">
                            +27 82 415 8441
                        </a>

                    </div>

                    <div className="cv-intro-content">

                        <h1>Keeno Smith</h1>

                        <p className="cv-title">
                            Full-Stack Software Engineer
                            <br />
                            & AI Engineer
                        </p>

                        <p className="cv-positioning">
                            AI Application Development · Generative & Agentic AI ·
                            Cloud Engineering · DevOps & Automation
                        </p>

                    </div>

                    <div className="cv-bio">
                        <p>
                            Full-Stack Software Engineer & Web Developer specialising in the design, development, integration, and deployment of end-to-end software systems across frontend applications, backend services, REST APIs,
                            databases, authentication, system integration, and application infrastructure.
                            My experience combines formal software engineering and computer science education with extensive hands-on product development, independent engineering, and technical delivery across the full software lifecycle.
                        </p>

                        <p>
                            My engineering work increasingly centres on AI application development, including LLM integration, Retrieval-Augmented Generation (RAG), semantic search, embedding pipelines, prompt and context engineering, agentic architectures, tool calling, and AI-driven workflows.
                            I build the surrounding application and data infrastructure required to make AI systems useful in practice, including document processing, retrieval pipelines, structured outputs, API integrations, evaluation, state management, and controlled execution.
                        </p>

                        <p>
                            I work across AWS, Microsoft Azure, and Google Cloud, developing cloud-native and distributed systems using serverless and containerised workloads, event-driven architectures, CI/CD pipelines,
                            infrastructure services, security controls, observability, and production-oriented deployment patterns. Alongside cloud engineering, I develop event-driven workflow and integration systems with n8n,
                            combining APIs, webhooks, asynchronous processing, orchestration, reliability controls, monitoring, and custom application interfaces to connect and automate business and technical processes.
                        </p>
                    </div>

                    <div className="cv-headshot">
                        <img
                            src="/cv/avatar-cv.png"
                            alt="Keeno Smith"
                        />
                    </div>

                    <div className="cv-signature">
                        <img
                            src="/cv/signature.png"
                            alt="Keeno Smith signature"
                        />
                    </div>

                </section>


                {/* education */}
                <section className="cv-section cv-education">

                    <div className="cv-section-heading">
                        <span>01</span>
                        <h2>Education</h2>
                    </div>

                    <div className="cv-section-content cv-education-content">

                        <div className="cv-education-item">
                            <div className="cv-education-marker">
                                <span></span>
                            </div>

                            <div className="cv-education-details">
                                <h3>Generative AI</h3>
                                <div className="cv-education-meta">
                                    <span>June 2026 - August 2026</span>
                                    <span>Stellenbosch University</span>
                                </div>
                                <p>
                                    Generative AI training focused on modern AI concepts,
                                    generative models, AI application development, and
                                    practical applications of emerging AI technologies.
                                </p>
                            </div>
                        </div>

                        <div className="cv-education-item">
                            <div className="cv-education-marker">
                                <span></span>
                            </div>

                            <div className="cv-education-details">
                                <h3>Full-Stack Software Engineering & Web Development</h3>
                                <div className="cv-education-meta">
                                    <span>Jan 2026 - June 2026</span>
                                    <span>HyperionDev</span>
                                </div>
                                <p>
                                    Full-stack software engineering and web development
                                    training covering frontend, backend, databases,
                                    APIs, software architecture, and application deployment.
                                </p>
                            </div>
                        </div>

                        <div className="cv-education-item">
                            <div className="cv-education-marker">
                                <span></span>
                            </div>

                            <div className="cv-education-details">
                                <h3>BSc Computer Science</h3>
                                <div className="cv-education-meta">
                                    <span>2017 - 2022 (Coursework Completed)</span>
                                    <span>University of South Africa</span>
                                </div>
                                <p>
                                    Computer Science degree studies covering core
                                    programming, software development, computer science,
                                    and related technical disciplines.
                                </p>
                            </div>
                        </div>

                        <div className="cv-education-item">
                            <div className="cv-education-marker">
                                <span></span>
                            </div>

                            <div className="cv-education-details">
                                <h3>National Senior Certificate</h3>
                                <div className="cv-education-meta">
                                    <span>2010 - 2015</span>
                                    <span>Greenside High School</span>
                                </div>

                            </div>
                        </div>

                    </div>

                </section>

                {/* certs */}
                <section className="cv-section cv-certifications">

                    <div className="cv-section-heading">
                        <span>02</span>
                        <h2>Certifications</h2>
                    </div>

                    <div className="cv-certification-links">

                        <a
                            href="https://skillsprofile.skillbuilder.aws/user/keenosmith"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            AWS Skill Builder: skillsprofile.skillbuilder.aws/user/keenosmith
                        </a>

                        <a
                            href="https://learn.microsoft.com/en-us/users/keenosmith/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Microsoft Learn: learn.microsoft.com/en-us/users/keenosmith/
                        </a>

                        <a
                            href="https://www.credly.com/users/keeno-smith"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Credly: credly.com/users/keeno-smith
                        </a>

                    </div>

                    <div className="cv-section-content cv-certifications-content">

                        {/*
                        after AI-500
                        <div className="cv-certification-item">
                            <div className="cv-certification-marker">
                                <span></span>
                            </div>

                            <div className="cv-certification-details">
                                <h3>Microsoft Certified: Multi-Agent AI Solutions Expert</h3>

                                <div className="cv-certification-meta">
                                    <span>Nov 2026</span>
                                    <span>Microsoft</span>
                                </div>

                                <p>
                                    Multi-agent AI solution architecture and engineering covering agent and tool design,
                                    workflow orchestration, context and memory management, multi-agent RAG, MCP, LangGraph,
                                    evaluation and observability, Zero Trust security, guardrails, CI/CD, infrastructure-as-code,
                                    and production deployment strategies.
                                </p>
                            </div>
                        </div>

                        after AI-103
                        <div className="cv-certification-item">
                            <div className="cv-certification-marker">
                                <span></span>
                            </div>

                            <div className="cv-certification-details">
                                <h3>Microsoft Certified: Azure AI Apps and Agents Developer Associate</h3>

                                <div className="cv-certification-meta">
                                    <span>Oct 2026</span>
                                    <span>Microsoft</span>
                                </div>

                                <p>
                                    Azure AI application and agent engineering across Microsoft Foundry, generative AI,
                                    agentic workflows, RAG and retrieval pipelines, tool and function integration,
                                    conversation memory, multi-agent orchestration, AI application evaluation, monitoring, and CI/CD deployment.
                                </p>
                            </div>
                        </div>
                        */}

                        <div className="cv-certification-item">
                            <div className="cv-certification-marker">
                                <span></span>
                            </div>

                            <div className="cv-certification-details">
                                <h3>Manage Kubernetes in Google Cloud</h3>

                                <div className="cv-certification-meta">
                                    <span>Sep 2026</span>
                                    <span>Google Cloud</span>
                                </div>

                                <p>
                                    Intermediate hands-on training in Google Kubernetes Engine (GKE) covering Kubernetes deployments
                                    with kubectl, cluster and application management, monitoring and debugging,
                                    Prometheus, containerised application deployment, Artifact Registry, Kubernetes
                                    manifests, and continuous delivery through practical labs and challenge assessment.
                                </p>
                            </div>
                        </div>

                        <div className="cv-certification-item">
                            <div className="cv-certification-marker">
                                <span></span>
                            </div>

                            <div className="cv-certification-details">
                                <h3>n8n Workflow Automation & AI</h3>

                                <div className="cv-certification-meta">
                                    <span>Sep 2026</span>
                                    <span>n8n</span>
                                </div>

                                <p>
                                    Applied n8n workflow engineering across API integrations, 
                                    HTTP requests, OAuth2 and API authentication, secure webhooks, 
                                    pagination, data transformation, conditional and parallel execution, 
                                    sub-workflows, custom JavaScript/Python, workflow state, and error handling. 
                                    Extended into AI-powered workflows using AI Agents, tools and memory, with 
                                    practical implementation of testing, debugging, modular workflow design, versioning, monitoring, 
                                    recovery, and production-readiness patterns.
                                </p>
                            </div>
                        </div>

                        <div className="cv-certification-item">
                            <div className="cv-certification-marker">
                                <span></span>
                            </div>

                            <div className="cv-certification-details">
                                <h3>Microsoft Applied Skills: Microsoft Defender XDR</h3>

                                <div className="cv-certification-meta">
                                    <span>August 2026</span>
                                    <span>Microsoft</span>
                                </div>

                                <p>
                                    Demonstrating practical security operations skills with Microsoft
                                    Defender XDR, including incident management, endpoint investigation,
                                    threat detection and Advanced Hunting with KQL.
                                </p>
                            </div>
                        </div>

                        <div className="cv-certification-item">
                            <div className="cv-certification-marker cv-certification-marker--grouped">
                                <span></span>
                                <span></span>
                            </div>

                            <div className="cv-certification-details">
                                <h3>Microsoft Agent Architect</h3>
                                <h3>Cyber Security & Threat Defense</h3>

                                <div className="cv-certification-meta">
                                    <span>July 2026</span>
                                    <span>Microsoft × Founderz</span>
                                </div>

                                <p>
                                    Architect-level training focused on designing scalable
                                    AI agent solutions using Microsoft Foundry, including
                                    agent architecture, project-based implementation, security labs, simulations, prototyping, and production-oriented
                                    approaches to enterprise AI.
                                </p>
                            </div>
                        </div>


                        <div className="cv-certification-item">
                            <div className="cv-certification-marker cv-certification-marker--grouped">
                                <span></span>
                                <span></span>
                            </div>

                            <div className="cv-certification-details">

                                <h3>AWS AI / ML Scholars Programme AI Practitioner</h3>
                                <h3>AWS AI Programmer Nanodegree</h3>

                                <div className="cv-certification-meta">
                                    <span>May 2026</span>
                                    <span>AWS × Udacity</span>
                                </div>

                                <p>
                                    Project-based AI/ML development covering Python,
                                    NumPy, Pandas, neural networks, PyTorch,
                                    transformer architectures, generative AI,
                                    prompt engineering, and AWS AI/ML services.
                                </p>
                            </div>
                        </div>


                        <div className="cv-certification-item">
                            <div className="cv-certification-marker cv-certification-marker--grouped">
                                <span></span>
                                <span></span>
                            </div>

                            <div className="cv-certification-details">
                                <h3>Generative AI for Software Engineers</h3>
                                <h3>AI Course for Developers</h3>

                                <div className="cv-certification-meta">
                                    <span>Dec 2025</span>
                                    <span>WeThinkCode_</span>
                                </div>

                                <p>
                                    Applied generative AI development covering LLM
                                    integration, prompt engineering, AI-assisted
                                    software development, agentic workflows, API
                                    integration, and incorporating
                                    generative AI capabilities into software applications.
                                </p>
                            </div>
                        </div>

                    </div>

                </section>

                {/* exp */}
                <section className="cv-section cv-experience">
                    <div className="cv-section-heading">
                        <span>03</span>
                        <h2>Experience</h2>
                    </div>

                    <div className="cv-section-content cv-experience-content">

                        <div className="cv-experience-item cv-experience-projects">
                            <div className="cv-experience-marker">
                                <span></span>
                            </div>

                            <div className="cv-experience-details">
                                <h3>Software Engineering &amp; Application Development</h3>

                                <div className="cv-experience-meta">
                                    <span>2022-Present | Project-Based</span>
                                    <span>Independent Development</span>
                                </div>

                                <p>
                                    Independently delivered full-stack software systems from requirements
                                    analysis and solution design through architecture, implementation,
                                    integration, testing, deployment, and ongoing maintenance.
                                    Held direct ownership of technical decisions across the software
                                    lifecycle, with responsibility spanning frontend and backend engineering,
                                    API and database architecture, authentication, system integration, AI-enabled functionality, production delivery, and continuous improvement.
                                </p>

                                <div className="cv-project-entry">

                                    <h4>Full-Stack Software Engineer</h4>

                                    <div className="cv-project-role">
                                        Authenticated MERN Workspace Application
                                    </div>

                                    <p>
                                        Designed and developed an end-to-end productivity platform using
                                        React, Node.js / Express, and MongoDB, with JWT authentication,
                                        interconnected resources, account lifecycle management, and
                                        cloud deployment. The project covers application architecture,
                                        secure API design, data modelling, state management, and
                                        production delivery across the frontend and backend.
                                    </p>

                                    <div className="cv-project-subsection">
                                        <h5>Core Responsibilities</h5>
                                        <ul>
                                            <li>
                                                Defined functional requirements and translated them into
                                                frontend, backend, API, authentication, and data-layer designs.
                                            </li>
                                            <li>
                                                Designed architecture across React, Express REST services,
                                                authentication middleware, Mongoose models, and MongoDB persistence.
                                            </li>
                                            <li>
                                                Engineered JWT-based authentication and authorisation using Bearer tokens,
                                                protected routes, bcrypt password hashing, credential verification, and authenticated client-server communication.
                                            </li>
                                            <li>
                                                Implemented client-side state management, asynchronous resource
                                                orchestration, validation, error handling, and client-server state reconciliation.
                                            </li>
                                        </ul>
                                    </div>
                                </div>


                                <div className="cv-project-entry">

                                    <h4>Software Development Engineer</h4>

                                    <div className="cv-project-role">
                                        API-Driven Application Development
                                    </div>

                                    <p>
                                        Designed and developed a full-stack
                                        system integrating a React frontend, Node.js / Express REST services,
                                        MongoDB persistence, and multiple external data providers.
                                        Owned implementation across data integration, asynchronous workflows, persistent state, search, external services, and browser-based functionality.
                                    </p>

                                    <div className="cv-project-subsection">
                                        <h5>Core Responsibilities</h5>
                                        <ul>
                                            <li>
                                                Translated functional requirements into frontend
                                                architecture, backend services, API contracts, data models, and integration workflows.
                                            </li>
                                            <li>
                                                Designed MongoDB persistence using Mongoose for user libraries, resources, and persistent state.
                                            </li>
                                            <li>
                                                Implemented client-side state management, asynchronous resource
                                                orchestration, validation, error handling, and client-server state reconciliation.
                                            </li>
                                            <li>
                                                Maintained source control, dependency management, linting,
                                                testing, troubleshooting, and iterative improvements using Git and GitHub.
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="cv-project-entry">

                                    <h4>Full-Stack Software Engineer / AI Engineer</h4>

                                    <div className="cv-project-role">
                                        Knowledge Engineering & Generative AI Application
                                    </div>

                                    <p>
                                        Designed and engineered a full-stack AI-enabled application integrating a
                                        React frontend, Node.js / Express backend, MongoDB persistence, document processing,
                                        semantic retrieval, local embedding infrastructure, conversational context, and
                                        streamed LLM inference. Held direct ownership of the surrounding application architecture
                                        and AI data pipeline rather than limiting the implementation to model API integration.
                                    </p>

                                    <div className="cv-project-subsection">

                                        <h5>Core Responsibilities</h5>

                                        <ul>

                                            <li>
                                                Implemented local semantic embedding infrastructure using
                                                Hugging Face Transformers, ONNX, and all-MiniLM-L6-v2,
                                                including lazy model loading, mean pooling, and embedding generation for knowledge
                                                chunks and search queries.
                                            </li>

                                            <li>
                                                Developed document processing for TXT, Markdown, PDF, and
                                                DOCX content using Multer, PDF Parse, and Mammoth, including
                                                multipart uploads, content extraction, validation,
                                                normalisation, chunking, and persistence.
                                            </li>

                                            <li>
                                                Integrated server-side LLM inference through the Groq SDK
                                                and implemented streamed responses using asynchronous
                                                provider streams and Server-Sent Events, with incremental
                                                client-side parsing, completion handling, error processing,
                                                and request cancellation.
                                            </li>

                                            <li>
                                                Designed and maintained MongoDB/Mongoose models and REST
                                                API workflows for conversations, messages, memories,
                                                knowledge documents, embedded vectors, semantic search,
                                                document ingestion, and streamed AI inference.
                                            </li>
                                        </ul>

                                    </div>
                                </div>

                                <div className="cv-project-entry">

                                    <h4>Full-Stack Software Engineer / Database Application Engineer</h4>

                                    <div className="cv-project-role">
                                        Enterprise Database Management
                                    </div>

                                    <p>
                                        Designed and engineered a full-stack database management system centred on
                                        PostgreSQL, SQL, relational modelling, Prisma ORM, and runtime schema management.
                                        Owned technical architecture across the browser interface, REST services, database layer, schema management, SQL execution, and metadata synchronisation.
                                    </p>

                                    <div className="cv-project-subsection">

                                        <h5>Core Responsibilities</h5>

                                        <ul>
                                            <li>
                                                Designed the PostgreSQL architecture and relational models,
                                                including primary and foreign keys, unique constraints,
                                                nullability, defaults, identity columns, and relationship
                                                integrity.
                                            </li>

                                            <li>
                                                Developed Express REST services supporting relational CRUD,
                                                dynamic record operations, schema management, relationship operations,
                                                database health monitoring, and SQL execution.
                                            </li>

                                            <li>
                                                Developed a dedicated SQL builder and validation layer for
                                                DDL generation, including identifier quoting and escaping,
                                                data-type allowlisting, type normalisation, and constraint
                                                validation.
                                            </li>

                                            <li>
                                                Engineered runtime schema operations supporting table creation
                                                and modification of columns, constraints, and relationships through PostgreSQL DDL.
                                            </li>

                                            <li>
                                                SQL execution
                                                through <code>POST /api/query</code>, with PostgreSQL-aware
                                                integrity validation, conflict handling, state verification,
                                                and repeatable database seeding.
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="cv-experience-item">
                            <div className="cv-experience-marker">
                                <span></span>
                            </div>

                            <div className="cv-experience-details">
                                <h3>Technical & Digital Operations Lead | Co-Founder</h3>

                                <div className="cv-experience-meta">
                                    <span>Jan 2020 – June 2026</span>
                                    <span>Firstdaes Entertainment</span>
                                </div>

                                <p>
                                    Co-founded and operated an events and entertainment business with
                                    responsibility spanning digital product and customer experience,
                                    technical and digital operations, business systems, workflow design,
                                    project delivery, brand strategy, marketing technology, and operational
                                    optimisation.
                                </p>

                                <div className="cv-project-subsection">

                                    <h5>Responsibilities</h5>

                                    <ul>
                                        <li>
                                            Led the development and ongoing optimisation of the company's digital ecosystem,
                                            spanning web presence, digital platforms, business tools, analytics, content systems, and
                                            technology-enabled workflows.
                                        </li>

                                        <li>
                                            Translated business objectives and operational requirements into digital solutions,
                                            structured workflows, and practical technology implementations.
                                        </li>

                                        <li>
                                            Applied systems thinking to analyse operational processes, identify inefficiencies, and design
                                            improved workflows and technology-enabled ways of working.
                                        </li>

                                        <li>
                                            Researched, evaluated, configured, and integrated digital tools and third-party services to
                                            support business operations, communications, marketing, analytics, and process efficiency
                                        </li>

                                        <li>
                                            Managed digital initiatives end-to-end, from requirements definition and solution planning through
                                            implementation, testing, troubleshooting, iteration, and optimisation.
                                        </li>

                                        <li>
                                            Leveraged data, performance metrics, analytics, and operational feedback to
                                            evaluate digital initiatives and drive continuous improvement.
                                        </li>

                                        <li>
                                            Worked across web technologies, digital platforms, data and analytics tools, automation, content systems, and
                                            integrated services to maintain and evolve the company's digital infrastructure
                                        </li>

                                        <li>
                                            Owned technical and operational problem-solving across the company's digital environment, independently researching
                                            solutions, resolving issues, and implementing improvements
                                        </li>

                                        <li>
                                            Managed multiple concurrent digital and operational projects, coordinating
                                            dependencies, external providers, resources, timelines, and delivery requirements
                                        </li>

                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div className="cv-experience-item">
                            <div className="cv-experience-marker">
                                <span></span>
                            </div>

                            <div className="cv-experience-details">
                                <h3>Contract Specialist | Technical Content & Documentation</h3>

                                <div className="cv-experience-meta">
                                    <span>Feb 2021 – Sep 2025</span>
                                    <span>3Play Media</span>
                                </div>

                                <p>
                                    Worked extensively with technically complex documentation, training material, and technology-focused
                                    content across enterprise software, cloud computing, networking, cybersecurity, software development,
                                    and emerging technologies. Responsible for transforming and quality-assuring technical material while
                                    maintaining terminology accuracy, contextual integrity, structural consistency, and technical clarity
                                    across complex subject matter.
                                </p>

                                <div className="cv-project-subsection">

                                    <h5>Responsibilities</h5>

                                    <ul>
                                        <li>
                                            Reviewed, transcribed, edited, and proofread technical documentation and training content
                                            covering software development, cloud infrastructure, networking, cybersecurity, enterprise technology,
                                            and emerging technologies.
                                        </li>

                                        <li>
                                            Worked extensively with technical terminology, product specifications, software concepts, infrastructure terminology,
                                            security concepts, and technology-specific language across diverse subject areas.
                                        </li>

                                        <li>
                                            Analysed source material for inconsistencies, ambiguity, terminology conflicts, structural issues, and technical
                                            inaccuracies before producing final content.
                                        </li>

                                        <li>
                                            Maintained strict quality and consistency standards across technical documentation, including terminology,
                                            formatting, structure, instructional clarity, and contextual accuracy.
                                        </li>

                                        <li>
                                            Adapted to different technical domains and technology ecosystems, requiring rapid acquisition
                                            of domain-specific knowledge and the ability to work effectively with unfamiliar technologies.
                                        </li>

                                        <li>
                                            Worked with technical content associated with major enterprise technology organisations and platforms,
                                            including <strong>Cisco</strong>, <strong>Oracle</strong>, <strong>Palo Alto Networks</strong>, <strong>Unreal Engine</strong>,
                                            <strong>Deloitte</strong>, <strong>ThousandEyes</strong>, <strong>Salesforce</strong>, <strong>NVIDIA</strong>, <strong>CBTNuggets</strong>, and <strong>Apple</strong>.
                                        </li>

                                        <li>
                                            Operated independently across contract-based assignments, managing quality, accuracy, deadlines, and
                                            deliverables while working with highly specialised technical material.
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* cloud / devops */}
                <section className="cv-section cv-cloud">

                    <div className="cv-section-heading">
                        <span>04</span>
                        <h2>Cloud, DevOps &amp; <br /> Platform Engineering</h2>
                    </div>

                    <div className="cv-section-content cv-cloud-content">

                        <div className="cv-cloud-item">
                            <div className="cv-cloud-marker">
                                <span></span>
                            </div>

                            <div className="cv-cloud-details">
                                <h3>AWS</h3>

                                <p>
                                    Cloud development and applied AI/ML across AWS services including EC2, S3, Lambda, IAM, VPC, RDS, ECR, ECS, EKS,
                                    Kubernetes, SageMaker, and Bedrock. Experience developed through hands-on labs, simulated cloud environments, and
                                    project-based learning with AWS Skill Builder.
                                </p>

                                <div className="cv-cloud-links">
                                    <a
                                        href="https://skillsprofile.skillbuilder.aws/user/keenosmith"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        AWS Skill Builder: skillsprofile.skillbuilder.aws/user/keenosmith
                                    </a>
                                </div>
                            </div>
                        </div>


                        <div className="cv-cloud-item">
                            <div className="cv-cloud-marker">
                                <span></span>
                            </div>

                            <div className="cv-cloud-details">
                                <h3>Microsoft</h3>

                                <p>
                                    Cloud and AI development across Azure services including App Service, Functions, Storage,
                                    Azure SQL, Cosmos DB, AKS, Azure Container Registry, Entra ID, Azure Monitor, Microsoft Foundry,
                                    Azure AI services, and Microsoft Defender XDR. Experience developed through hands-on labs,
                                    simulated enterprise environments, and project-based learning with Microsoft Learn..
                                </p>

                                <div className="cv-cloud-links">
                                    <a
                                        href="https://learn.microsoft.com/en-us/users/keenosmith/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Microsoft Learn: learn.microsoft.com/en-us/users/keenosmith/
                                    </a>
                                </div>
                            </div>
                        </div>


                        <div className="cv-cloud-item">
                            <div className="cv-cloud-marker">
                                <span></span>
                            </div>

                            <div className="cv-cloud-details">
                                <h3>Google Cloud</h3>

                                <p>
                                    Cloud and AI/ML development across Compute Engine, Cloud Storage, Cloud Run, GKE, Kubernetes, Cloud Functions,
                                    Cloud SQL, Firestore, BigQuery, Vertex AI, Gemini, Artifact Registry, Cloud Build, and Google Cloud IAM.
                                    Experience developed through hands-on labs, simulated cloud environments, developer projects, and structured practical
                                    learning with Google Skills and Google Developers Program.
                                </p>

                                <div className="cv-cloud-links">
                                    <a
                                        href="https://www.skills.google/public_profiles/105079cb-27bf-46a4-9c48-9ce8fc594527"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Google Skills: skills.google/public_profiles/105079cb-27bf-46a4-9c48-9ce8fc594527
                                    </a>

                                    <a
                                        href="https://g.dev/keenosmith"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Google Developer Program: g.dev/keenosmith
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>

                </section>


                {/* projects */}
                <section className="cv-section cv-projects">
                    <div className="cv-section-heading">
                        <span>05</span>
                        <h2>Projects</h2>
                    </div>

                    <div className="cv-project-links">

                        <a
                            href="https://keenosmith.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Portfolio: keenosmith.vercel.app/
                        </a>

                        <a
                            href="https://github.com/keenosmith-del"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub: github.com/keenosmith-del
                        </a>

                    </div>

                    {/* skills */}
                    <div className="cv-project-skills">

                        <div className="cv-project-skills-group">
                            <h4>Software Engineering</h4>
                            <span>Full-Stack Development</span>
                            <span>Frontend Development</span>
                            <span>Backend Development</span>
                            <span>API Development</span>
                            <span>Application Architecture</span>
                            <span>Component Architecture</span>
                            <span>State Management</span>
                        </div>

                        <div className="cv-project-skills-group">
                            <h4>AI &amp; Agentic Systems</h4>
                            <span>AI Application Development</span>
                            <span>Generative AI</span>
                            <span>Agentic AI</span>
                            <span>Multi-Agent Systems</span>
                            <span>LLM Integration</span>
                            <span>RAG &amp; Knowledge Retrieval</span>
                            <span>Tool Calling</span>
                            <span>AI Evaluation</span>
                        </div>

                        <div className="cv-project-skills-group">
                            <h4>Data &amp; Knowledge Engineering</h4>
                            <span>MongoDB &amp; Mongoose</span>
                            <span>PostgreSQL &amp; SQL</span>
                            <span>Prisma ORM</span>
                            <span>Database Design</span>
                            <span>Data Modelling</span>
                            <span>Semantic Embeddings</span>
                            <span>Vector Retrieval</span>
                        </div>

                        <div className="cv-project-skills-group">
                            <h4>Cloud, DevOps &amp; Delivery</h4>
                            <span>Cloud Deployment</span>
                            <span>CI/CD</span>
                            <span>Git &amp; GitHub</span>
                            <span>Docker</span>
                            <span>Kubernetes</span>
                            <span>Authentication &amp; Authorization</span>
                            <span>Observability</span>
                            <span>Testing &amp; Evaluation</span>
                        </div>

                    </div>

                    <div className="cv-section-content cv-projects-content">

                        {/* microsoft */}
                        <div className="cv-project-group">

                            <div className="cv-project-group-heading">
                                <div className="cv-project-marker">
                                    <span></span>
                                </div>

                                <div className="cv-project-details">
                                    <h3>Multi-Agent AI Systems - Microsoft Foundry / Azure</h3>

                                    <div className="cv-project-meta">
                                        <span>Agentic AI · Multi-Agent Architecture</span>
                                        <span>OpenAI Models · RAG · Tool Calling · OpenAPI · MCP · Python · Azure RBAC · OpenTelemetry</span>
                                    </div>

                                    <p>
                                        Multi-agent cloud engineering systems developed with Microsoft Foundry and Azure, using specialised agents,
                                        tool-augmented reasoning, RAG, MCP, OpenAPI integrations, structured engineering outputs,
                                        infrastructure APIs, asynchronous workflows, policy controls, observability,
                                        evaluation and human-in-the-loop execution. The architectures apply agentic AI to software
                                        engineering and cloud architecture while maintaining deterministic controls,
                                        bounded permissions and auditable decision workflows.
                                    </p>
                                </div>
                            </div>


                            {/* software engineering & devops */}
                            <div className="cv-project-subitem">

                                <div className="cv-project-submarker">
                                    <span></span>
                                </div>

                                <div className="cv-project-details">
                                    <h4>AI-Powered Software Engineering &amp; DevOps Operations Platform</h4>

                                    <p>
                                        Multi-agent software engineering and DevOps platform separating repository analysis,
                                        source-code inspection, application diagnostics and operational investigation into
                                        specialised engineering agents. Integrates GitHub repositories, source code, pull requests,
                                        documentation, application logs, monitoring telemetry, deployment history and engineering
                                        knowledge to analyse software behaviour, investigate failures, correlate evidence
                                        and generate structured remediation plans.

                                        Agent tool calling, RAG, API integrations and controlled workflow orchestration
                                        allow AI agents to operate against real software-development and operational
                                        systems rather than functioning as a standalone coding assistant.
                                    </p>

                                    <div className="cv-project-direct-links">
                                        <a
                                            href="https://github.com/keenosmith-del/microsoft-devops-incident-intelligence"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            GitHub: github.com/keenosmith-del/microsoft-devops-incident-intelligence
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* finops */}
                            <div className="cv-project-subitem">

                                <div className="cv-project-submarker">
                                    <span></span>
                                </div>

                                <div className="cv-project-details">
                                    <h4>AI-Powered Cloud Architect & FinOps Optimization Platform</h4>

                                    <p>
                                        Multi-agent Azure cloud architecture platform that evaluates infrastructure across cost,
                                        performance, reliability, security, governance, operational excellence and sustainability.
                                        A Discovery Agent constructs a resource and dependency model using Azure Resource Manager and
                                        Resource Graph, while specialised Cost, Reliability, Security and Performance agents
                                        independently evaluate the environment before an Architect Agent reconciles competing
                                        architectural constraints. Produces structured optimisation findings, projected cost and
                                        savings models, architectural impact assessments and controlled remediation plans, with
                                        policy validation and human approval separating probabilistic AI recommendations
                                        from infrastructure execution.
                                    </p>

                                    <div className="cv-project-direct-links">
                                        <a
                                            href="https://github.com/keenosmith-del/microsoft-ai-cloud-architect-finops-optimization"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            GitHub: github.com/keenosmith-del/microsoft-ai-cloud-architect-finops-optimization
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* aws cloud */}
                        <div className="cv-project-group">

                            <div className="cv-project-group-heading">
                                <div className="cv-project-marker">
                                    <span></span>
                                </div>

                                <div className="cv-project-details">
                                    <h3>Cloud Security, DevOps & Agentic AI - AWS</h3>

                                    <div className="cv-project-meta">
                                        <span>Cloud Security · Agentic AI · Event-Driven Architecture · DevOps</span>
                                        <span>SRE · Lambda · DynamoDB · CloudWatch · CodeDeploy · IAM · KMS · Docker · EventBridge · BedRock · CloudTrail · S3 · SQS · Fargate · EC3 </span>
                                    </div>

                                    <p>
                                        AWS-native cloud engineering platforms combining event-driven architecture, serverless services,
                                        containerised delivery, security automation, agentic AI, workflow orchestration,
                                        observability, and controlled automated recovery. The projects demonstrate how AWS-native
                                        infrastructure and deterministic engineering controls can be combined with Bedrock and
                                        AgentCore to build secure, stateful and production-oriented systems across cloud security
                                        operations and software delivery reliability.
                                    </p>
                                </div>
                            </div>


                            {/* autonomous cloud sec */}
                            <div className="cv-project-subitem">

                                <div className="cv-project-submarker">
                                    <span></span>
                                </div>

                                <div className="cv-project-details">
                                    <h4>Autonomous Cloud Security Incident Response Platform</h4>

                                    <p>
                                        Event-driven multi-agent security operations architecture for cloud threat detection,
                                        investigation, triage and controlled remediation. Uses CloudTrail and EventBridge to
                                        detect and route security events into SQS and Lambda before Step Functions coordinates
                                        structured incident workflows, parallel investigation, Bedrock/AgentCore tool calling,
                                        risk assessment, human approval, remediation and verification. Combines least-privilege IAM,
                                        deterministic security controls, bounded agent permissions, retries, dead-letter queues,
                                        idempotency, structured incident state, immutable evidence preservation, audit logging and
                                        CloudWatch observability.
                                    </p>

                                    <div className="cv-project-direct-links">
                                        <a
                                            href="https://github.com/keenosmith-del/aws-cloud-security-incident-response"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            GitHub: github.com/keenosmith-del/aws-cloud-security-incident-response
                                        </a>
                                    </div>
                                </div>
                            </div>


                            {/* it service desk */}
                            <div className="cv-project-subitem">

                                <div className="cv-project-submarker">
                                    <span></span>
                                </div>

                                <div className="cv-project-details">
                                    <h4>Docker Distributed Developer Deployment Platform</h4>

                                    <p>
                                        Docker-first AWS DevOps and SRE platform automating the software delivery lifecycle while continuously evaluating deployed application health
                                        and initiating controlled recovery workflows. Uses GitHub, CodePipeline, CodeBuild, Docker, ECR and ECS/Fargate
                                        to build, validate, publish and deploy immutable container artefacts, with CloudWatch
                                        telemetry feeding EventBridge and Step Functions for deployment-health evaluation and
                                        Bedrock/AgentCore-assisted root-cause analysis. Combines deterministic reliability guardrails with bounded AI reasoning
                                        to support promotion, hold and rollback decisions, alongside retries, dead-letter queues, idempotent operations,
                                        observability and controlled automated recovery.
                                    </p>

                                    <div className="cv-project-direct-links">
                                        <a
                                            href="https://github.com/keenosmith-del/aws-distributed-developer-deployment"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            GitHub: github.com/keenosmith-del/aws-distributed-developer-deployment
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* GCP */}
                        <div className="cv-project-group">

                            <div className="cv-project-group-heading">
                                <div className="cv-project-marker">
                                    <span></span>
                                </div>

                                <div className="cv-project-details">
                                    <h3>Google Cloud</h3>

                                    <div className="cv-project-meta">
                                        <span>Cloud-Native Engineering · DevSecOps · Software Supply-Chain Security</span>
                                        <span>Multi-Agent Systems · Gemini · Vertex AI · Firestone · Cloud KMS · BigQuery · Cloud Run · Dataplex · Artifact Registry · Google ADK</span>
                                    </div>

                                    <p>
                                        Google Cloud-native engineering platforms combining containerised application development,
                                        event-driven architecture, specialised AI agents, software supply-chain
                                        analysis, enterprise data governance, security controls, and scalable
                                        serverless workloads. The projects use Google ADK and Gemini alongside
                                        deterministic cloud-native services to build evidence-driven security and
                                        governance workflows across software repositories, application dependencies, enterprise data estates,
                                        and cloud infrastructure.
                                    </p>
                                </div>
                            </div>


                            {/* supply chain risk */}
                            <div className="cv-project-subitem">

                                <div className="cv-project-submarker">
                                    <span></span>
                                </div>

                                <div className="cv-project-details">
                                    <h4>AI Supply-Chain Risk & Dependency Platform </h4>

                                    <p>
                                        Software supply-chain security and DevSecOps platform that constructs a machine-readable representation of application
                                        dependencies before combining deterministic security analysis with ADK-based multi-agent
                                        reasoning. Analyses direct and transitive dependencies, package metadata,
                                        vulnerabilities, licences, container configuration, build pipelines and application architecture, then correlates
                                        findings into structured security assessments and prioritised remediation recommendations. Uses Cloud Build,
                                        Artifact Registry and Cloud Run to establish a containerised software delivery path, with Pub/Sub and Cloud
                                        Run Jobs supporting asynchronous repository and security analysis workloads.
                                    </p>

                                    <div className="cv-project-direct-links">
                                        <a
                                            href="https://github.com/keenosmith-del/gcp-supply-chain-risk"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            GitHub: github.com/keenosmith-del/gcp-supply-chain-risk
                                        </a>
                                    </div>
                                </div>
                            </div>


                            {/* governance */}
                            <div className="cv-project-subitem">

                                <div className="cv-project-submarker">
                                    <span></span>
                                </div>

                                <div className="cv-project-details">
                                    <h4>Autonomous Data Governance & Compliance Platform</h4>

                                    <p>
                                        Enterprise data governance control plane designed to continuously discover,
                                        classify and assess heterogeneous data assets across Cloud Storage,
                                        BigQuery and Firestore. Combines metadata management, Sensitive Data
                                        Protection, access analysis, policy evaluation, risk and confidence
                                        scoring, and evidence-based AI reasoning to produce structured governance
                                        findings and route approved actions through controlled remediation
                                        workflows. Uses specialised ADK agents for discovery, classification,
                                        policy and governance analysis while maintaining deterministic controls
                                        for sensitive-data detection, policy enforcement, IAM evaluation, auditability and human approval.
                                    </p>

                                    <div className="cv-project-direct-links">
                                        <a
                                            href="https://github.com/keenosmith-del/gcp-data-governance-compliance"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            GitHub: github.com/keenosmith-del/gcp-data-governance-compliance
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Claude */}
                        <div className="cv-project-group">

                            <div className="cv-project-group-heading">
                                <div className="cv-project-marker">
                                    <span></span>
                                </div>

                                <div className="cv-project-details">
                                    <h3>Claude-Powered AI Engineering - Anthropic</h3>

                                    <div className="cv-project-meta">
                                        <span>LLM Application Engineering · Context Engineering · Semantic Analysis · Anthropic API</span>
                                        <span>JSON · AST Parsing · Knowledge Graphs · AI Evaluation · PostgreSQL · Node.js · RAG · OpenAPI</span>
                                    </div>

                                    <p>
                                        Claude-powered engineering platforms combining long-context reasoning, structured
                                        generation, retrieval, semantic analysis, static code analysis,
                                        architecture modelling, and decision workflows. The projects use Claude
                                        for evidence-grounded reasoning over complex technical and regulatory
                                        information, with deterministic processing, structured data pipelines,
                                        evaluation, human review, and locally containerised application infrastructure
                                        surrounding the model layer.
                                    </p>
                                </div>
                            </div>


                            {/* software engineering & devops */}
                            <div className="cv-project-subitem">

                                <div className="cv-project-submarker">
                                    <span></span>
                                </div>

                                <div className="cv-project-details">
                                    <h4>Claude-Powered Regulatory Change Impact & Control Mapping Platform</h4>

                                    <p>
                                        Regulatory analysis platform that processes evolving regulatory documents, identifies material
                                        changes between versions, extracts obligations, and maps those changes to organisational controls,
                                        policies, and operational processes. Combines document ingestion, semantic comparison, local embeddings,
                                        vector retrieval, structured Claude outputs, evidence grounding, impact assessment, control mapping,
                                        human review, and remediation planning through a custom React and Python/Node.js application.
                                    </p>

                                    <div className="cv-project-direct-links">
                                        <a
                                            href="https://github.com/keenosmith-del/claude-reg-change-impact"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            GitHub: github.com/keenosmith-del/claude-reg-change-impact
                                        </a>
                                    </div>
                                </div>
                            </div>


                            {/* arch analysis */}
                            <div className="cv-project-subitem">

                                <div className="cv-project-submarker">
                                    <span></span>
                                </div>

                                <div className="cv-project-details">
                                    <h4>Claude-Powered Architecture Analysis & Decision Engineering Platform</h4>

                                    <p>
                                        Software architecture analysis platform that reconstructs system structure from
                                        source repositories and infrastructure definitions before using Claude to reason over
                                        architecture boundaries, dependencies, coupling, scalability, reliability, and design trade-offs.
                                        Combines AST parsing, dependency extraction, architecture graph construction, static analysis,
                                        repository and infrastructure inspection, structured architectural assessment, technology comparison,
                                        decision modelling, and automated Architecture Decision Record generation.
                                    </p>

                                    <div className="cv-project-direct-links">
                                        <a
                                            href="https://github.com/keenosmith-del/claude-architecture-analysis"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            GitHub: github.com/keenosmith-del/claude-architecture-analysis
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* n8n */}
                        <div className="cv-project-group">

                            <div className="cv-project-group-heading">
                                <div className="cv-project-marker">
                                    <span></span>
                                </div>

                                <div className="cv-project-details">
                                    <h3>Workflow Orchestration & Automation - n8n</h3>

                                    <div className="cv-project-meta">
                                        <span>Event-Driven Architecture · API Integration · Webhooks · TypeScript · Redis</span>
                                        <span>Docker · OpenTelemetry · GitHub · Express · Prometheus · Grafana </span>
                                    </div>

                                    <p>
                                        Workflow orchestration and integration platforms developed with n8n as the
                                        event-driven automation layer, combining webhooks, API orchestration,
                                        asynchronous processing, state management, reliability patterns,
                                        observability, containerised infrastructure, and custom local applications.
                                        The projects demonstrate enterprise workflow design, heterogeneous system
                                        integration, API operations, fault handling, automated remediation, and
                                        production-oriented engineering beyond conventional no-code automation.
                                    </p>
                                </div>
                            </div>


                            {/* opsflow */}
                            <div className="cv-project-subitem">

                                <div className="cv-project-submarker">
                                    <span></span>
                                </div>

                                <div className="cv-project-details">
                                    <h4>OpsFlow Event-Driven Business Orchestration Platform</h4>

                                    <p>
                                        Enterprise workflow orchestration platform coordinating complex business processes across
                                        heterogeneous systems through event-driven workflows and API integrations.
                                        Uses n8n for webhook-driven orchestration, conditional routing, sub-workflows, asynchronous
                                        execution, retries, compensation patterns, human approval, and error handling, with a custom React
                                        and Node.js operations console providing process visibility, execution tracking, approvals, audit trails, and integration health.
                                    </p>

                                    <div className="cv-project-direct-links">
                                        <a
                                            href="https://github.com/keenosmith-del/n8n-opsflow-business-orch"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            GitHub: github.com/keenosmith-del/n8n-opsflow-business-orch
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* webhooks */}
                            <div className="cv-project-subitem">

                                <div className="cv-project-submarker">
                                    <span></span>
                                </div>

                                <div className="cv-project-details">
                                    <h4>Webhooks API Orchestrations & Integration Reliability Engine</h4>

                                    <p>
                                        API operations platform for continuously validating, monitoring, and operating external
                                        integrations through webhook-driven workflows and automated reliability controls. Combines synthetic
                                        API transactions, OpenAPI and JSON Schema contract validation, API gateway integration, latency and error
                                        analysis, retry and backoff strategies, fault injection, integration state management, automated remediation, and operational
                                        observability through a custom React and Node.js console.
                                    </p>

                                    <div className="cv-project-direct-links">
                                        <a
                                            href="https://github.com/keenosmith-del/n8n-webhooks-api-orch"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            GitHub: github.com/keenosmith-del/n8n-webhooks-api-orch
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>


                        {/* full-stack software projects */}
                        <div className="cv-project-group">

                            <div className="cv-project-group-heading">
                                <div className="cv-project-marker">
                                    <span></span>
                                </div>

                                <div className="cv-project-details">
                                    <h3>Full-Stack Software Projects</h3>

                                    <div className="cv-project-meta">
                                        <span>Full-Stack Engineering · Application Architecture</span>
                                        <span>React · Vite · Node.js · Express · MongoDB · PostgreSQL · Prisma</span>
                                    </div>

                                    <p>
                                        A portfolio of end-to-end full-stack systems demonstrating frontend
                                        architecture, backend service development, REST API design, database
                                        architecture, authentication and authorization, state management,
                                        asynchronous application flows, component architecture, and
                                        integration between client applications, backend services, databases,
                                        and external APIs.
                                    </p>

                                    <p>
                                        Projects span document and relational data models, JWT-based
                                        authentication, protected API workflows, Mongoose and Prisma data
                                        access, PostgreSQL schema and SQL operations, third-party API
                                        integration, external service integration, AI and LLM integration,
                                        retrieval workflows, validation, error handling, and application
                                        lifecycle management across independently structured frontend and
                                        backend systems.
                                    </p>

                                    <div className="cv-project-direct-links">

                                        <a
                                            href="https://keenosmith.vercel.app"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Portfolio: keenosmith.vercel.app
                                        </a>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </section>

                {/* all skills */}
                <section className="cv-section cv-skills">
                    <div className="cv-section-heading">
                        <span>06</span>
                        <h2>Skills</h2>
                    </div>

                    <div className="cv-skills-links">

                        <a
                            href="https://github.com/keenosmith-del"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub: github.com/keenosmith-del
                        </a>

                        <br />

                        <a
                            href="https://www.keenosmith.vercel.app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Portfolio: keenosmith.vercel.app
                        </a>

                        <br />

                        <a
                            href="https://www.codewars.com/users/keenosmith-del"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Codewars: codewars.com/users/keenosmith-del
                        </a>

                        <a
                            href="https://leetcode.com/u/keenosmith/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LeetCode: leetcode.com/u/keenosmith/
                        </a>

                        <a
                            href="https://www.freecodecamp.org/keenosmith"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            freeCodeCamp: freecodecamp.org/keenosmith
                        </a>

                        <br />

                        <a
                            href="https://learn.microsoft.com/en-us/users/keenosmith/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Microsoft Learn: learn.microsoft.com/en-us/users/keenosmith/
                        </a>

                        <a
                            href="https://skillsprofile.skillbuilder.aws/user/keenosmith"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            AWS Skill Builder: skillsprofile.skillbuilder.aws/user/keenosmith
                        </a>

                        <a
                            href="https://g.dev/keenosmith"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google Developer Program: g.dev/keenosmith
                        </a>

                        <br />

                        <a
                            href="https://www.codewars.com/users/keenosmith-del"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Credly: codewars.com/users/keenosmith-del
                        </a>

                    </div>

                    <div className="cv-section-content cv-skills-content">

                        <div className="cv-skill-group">
                            <h3>Languages</h3>
                            <p>JavaScript · Python · Java · SQL · HTML · CSS</p>
                        </div>

                        <div className="cv-skill-group">
                            <h3>Frontend & Backend Engineering</h3>
                            <p>
                                React · Vite · Node.js · Express.js · REST APIs · API Design · Authentication & Authorisation · OpenAPI
                            </p>
                        </div>

                        <div className="cv-skill-group">
                            <h3>AI Application Development</h3>
                            <p>
                                Generative AI · LLM Integration · RAG · Embeddings · Vector Search · Prompt & Context Engineering · Agentic AI · Multi-Agent Systems · Tool Calling
                            </p>
                        </div>

                        <div className="cv-skill-group">
                            <h3>Cloud & AI Platforms</h3>
                            <p>
                                Microsoft Azure · Microsoft Foundry · Azure OpenAI · AWS · Amazon Bedrock · Bedrock AgentCore · Amazon SageMaker AI · Google Cloud · Vertex AI · Serverless · Containers · Event-Driven Architecture
                            </p>
                        </div>

                        <div className="cv-skill-group">
                            <h3>DevOps, Automation & SRE</h3>
                            <p>
                                Docker · Git · GitHub · GitHub Actions · CI/CD · n8n · Workflow Orchestration · Infrastructure & Deployment Automation · Observability · Incident Response
                            </p>
                        </div>


                        <div className="cv-skill-group">
                            <h3>Data & Security</h3>
                            <p>
                                MongoDB · PostgreSQL · Mongoose · Prisma · Database Design · IAM · RBAC · Least Privilege · Cloud Security · Security Automation
                            </p>
                        </div>

                    </div>
                </section>

            </div>

            {showScrollTop && (
                <button
                    className="cv-scroll-top"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Back to top"
                >
                    <ArrowUp size={15} strokeWidth={1.8} />
                </button>
            )}

        </main>
    );
}

export default CV;