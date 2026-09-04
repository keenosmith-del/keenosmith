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
                        <span>github.com/keenosmith-del</span>
                        <span>linkedin.com/in/keenosmith</span>
                        <span>keenosmith.vercel.app/</span>
                    </div>

                    <div className="cv-intro-contact">
                        <span>business.keenosmith@icloud.com</span>
                        <span>+27 82 415 8441</span>
                    </div>

                    <div className="cv-intro-content">

                        <h1>Keeno Smith</h1>

                        <p className="cv-title">
                            Full-Stack Software Engineer
                            <br />
                            & Web Developer
                        </p>

                        <p className="cv-positioning">
                            AI Application Development · Agentic AI ·
                            Cloud & DevOps · Product & UX
                        </p>

                    </div>

                    <div className="cv-bio">
                        <p>
                            Full-Stack Software Engineer & Web Developer with
                            a strong foundation in JavaScript, React, Node.js,
                            backend development, database engineering, and
                            modern web application architecture. Experienced
                            in designing and building end-to-end software
                            across frontend, backend, APIs, databases, and
                            deployment, with an expanding specialization in
                            AI application development, including LLM
                            integration, Retrieval-Augmented Generation (RAG),
                            prompt engineering, agentic AI, and AI-driven
                            workflows.
                        </p>

                        <p>
                            My background combines formal software engineering
                            and computer science education with hands-on
                            product development, web design, and entrepreneurial
                            experience, complemented by growing expertise in
                            cloud infrastructure, DevOps, and CI/CD. This
                            enables me to approach software development from
                            both an engineering and product perspective, with
                            a focus on building scalable applications and
                            effective user experiences.
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
                                <h3>Generative AI Mini Bootcamp</h3>
                                <div className="cv-education-meta">
                                    <span>2026</span>
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
                                <h3>Full-Stack Software Engineering & Web Development Bootcamp</h3>
                                <div className="cv-education-meta">
                                    <span>2026</span>
                                    <span>Hyperion Development</span>
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
                                    <span>2017</span>
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
                                    <span>2015</span>
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
                            href="https://www.credly.com/users/keeno-smith"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Credly: credly.com/users/keeno-smith
                        </a>

                    </div>

                    <div className="cv-section-content cv-certifications-content">

                        <div className="cv-certification-item">
                            <div className="cv-certification-marker">
                                <span></span>
                            </div>

                            <div className="cv-certification-details">
                                <h3>Agent Architect</h3>

                                <div className="cv-certification-meta">
                                    <span>2026</span>
                                    <span>Microsoft × Founderz</span>
                                </div>

                                <p>
                                    Architect-level training focused on designing scalable
                                    AI agent solutions using Microsoft Foundry, including
                                    agent architecture, prototyping, and production-oriented
                                    approaches to enterprise AI.
                                </p>
                            </div>
                        </div>


                        <div className="cv-certification-item">
                            <div className="cv-certification-marker">
                                <span></span>
                            </div>

                            <div className="cv-certification-details">

                                <h3>AWS AI / ML Scholars Programme AI Practitioner</h3>
                                <h3>AWS AI Programmer Nanodegree</h3>

                                <div className="cv-certification-meta">
                                    <span>2026</span>
                                    <span>AWS × Udacity</span>
                                </div>

                                <p>
                                    Project-based AI and machine learning programme covering generative AI,
                                    AWS AI services, responsible AI, prompt engineering, and practical AI
                                    application development, with advanced training in Python, PyTorch,
                                    neural networks, and transformer architectures.
                                </p>
                            </div>
                        </div>


                        <div className="cv-certification-item">
                            <div className="cv-certification-marker">
                                <span></span>
                            </div>

                            <div className="cv-certification-details">
                                <h3>Generative AI for Software Engineers</h3>

                                <div className="cv-certification-meta">
                                    <span>2025</span>
                                    <span>WeThinkCode_</span>
                                </div>

                                <p>
                                    Applied generative AI training for software engineers,
                                    covering the practical use of AI technologies and
                                    development workflows.
                                </p>
                            </div>
                        </div>


                        <div className="cv-certification-item">
                            <div className="cv-certification-marker">
                                <span></span>
                            </div>

                            <div className="cv-certification-details">
                                <h3>Full-Stack Open</h3>

                                <div className="cv-certification-meta">
                                    <span>2026</span>
                                    <span>University of Helsinki</span>
                                </div>

                                <p>
                                    Full-stack web development programme covering modern
                                    JavaScript, React, Node.js, REST APIs, databases,
                                    application architecture, testing, and deployment.
                                </p>
                            </div>
                        </div>


                        <div className="cv-certification-item">
                            <div className="cv-certification-marker">
                                <span></span>
                            </div>

                            <div className="cv-certification-details">
                                <h3>IBM Enterprise Design Thinking Practitioner</h3>
                                <h3>IBM Agentic AI</h3>

                                <div className="cv-certification-meta">
                                    <span>2026</span>
                                    <span>Umuzi · African Coding Network (ACN) · ITExperience</span>
                                </div>

                                <p>
                                    Professional development spanning enterprise design thinking, agentic AI,
                                    and technology-focused digital skills, combining IBM's design thinking
                                    methodology with practical exploration of AI agents and Umuzi's
                                    ITExperience programme.
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

                        <div className="cv-experience-item">
                            <div className="cv-experience-marker">
                                <span></span>
                            </div>

                            <div className="cv-experience-details">
                                <h3>Co-Founder &amp; Brand Strategist</h3>

                                <div className="cv-experience-meta">
                                    <span>2023–2026</span>
                                    <span>Firstdaes Entertainment</span>
                                </div>

                                <p>
                                    Co-founded and helped lead an events business, overseeing brand
                                    strategy, market positioning, audience development, and promotional
                                    operations. Managed end-to-end marketing initiatives and campaigns,
                                    translating business objectives into customer-facing strategies and
                                    coordinating projects from initial concept through execution.
                                    Contributed to commercial planning, operational decision-making,
                                    and the development of the company&apos;s broader brand and growth
                                    strategy.
                                </p>
                            </div>
                        </div>

                        <div className="cv-experience-item">
                            <div className="cv-experience-marker">
                                <span></span>
                            </div>

                            <div className="cv-experience-details">
                                <h3>Technical Contract Specialist</h3>

                                <div className="cv-experience-meta">
                                    <span>2021–2024</span>
                                    <span>3Play Media</span>
                                </div>

                                <p>
                                    Reviewed, transcribed, proofread, and edited technical documentation,
                                    training materials, and technology-focused content across enterprise
                                    software, cloud computing, networking, cybersecurity, software
                                    development, and emerging technologies. Worked with technically
                                    complex material requiring accuracy, terminology consistency,
                                    contextual understanding, and close attention to technical detail.
                                    Content covered technologies and subject matter associated with
                                    Cisco, Oracle, Palo Alto Networks, Unreal Engine, Deloitte,
                                    ThousandEyes, Salesforce, NVIDIA, and Apple.
                                </p>
                            </div>
                        </div>

                        <div className="cv-experience-item cv-experience-projects">
                            <div className="cv-experience-marker">
                                <span></span>
                            </div>

                            <div className="cv-experience-details">
                                <h3>Independent Software Engineering &amp; Web Development</h3>

                                <div className="cv-experience-meta">
                                    <span>Project-Based</span>
                                    <span>Freelance &amp; Independent Development</span>
                                </div>

                                <p>
                                    Much of my software engineering and web development experience has
                                    been developed through freelance, independent, academic, and
                                    portfolio-driven projects. This work spans full-stack application
                                    development, frontend and backend engineering, REST APIs, database
                                    design, authentication, deployment, AI application development,
                                    and modern web architecture. Projects have provided hands-on
                                    experience taking applications from initial requirements and
                                    interface design through implementation, integration, testing,
                                    and deployment.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* projects */}
                <section className="cv-section cv-projects">
                    <div className="cv-section-heading">
                        <span>04</span>
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
                            <span>CRUD &amp; Data Management</span>
                        </div>

                        <div className="cv-project-skills-group">
                            <h4>AI &amp; Application Development</h4>
                            <span>AI Application Development</span>
                            <span>LLM Integration</span>
                            <span>Prompt Engineering</span>
                            <span>Retrieval-Augmented Generation</span>
                            <span>Agentic AI</span>
                            <span>AI-Driven Workflows</span>
                        </div>

                        <div className="cv-project-skills-group">
                            <h4>Databases &amp; Data</h4>
                            <span>MongoDB</span>
                            <span>Mongoose</span>
                            <span>PostgreSQL</span>
                            <span>Prisma ORM</span>
                            <span>Database Design</span>
                            <span>Relational Data Modelling</span>
                        </div>

                        <div className="cv-project-skills-group">
                            <h4>Development &amp; Delivery</h4>
                            <span>Authentication &amp; Authorization</span>
                            <span>REST APIs</span>
                            <span>Third-Party API Integration</span>
                            <span>Testing &amp; Debugging</span>
                            <span>Deployment</span>
                            <span>Git &amp; Version Control</span>
                            <span>Responsive Web Development</span>
                        </div>

                    </div>

                    <div className="cv-section-content cv-projects-content">

                        <div className="cv-project-item">
                            <div className="cv-project-marker">
                                <span></span>
                            </div>

                            <div className="cv-project-details">
                                <h3>Full-Stack Productivity Platform</h3>

                                <div className="cv-project-meta">
                                    <span>Full-Stack Web Application</span>
                                    <span>React · Node.js · Express · MongoDB · Mongoose</span>
                                </div>

                                <p>
                                    A full-stack productivity platform bringing tasks, projects,
                                    goals, reminders, notes, folders, calendar functionality, and
                                    user accounts into one cohesive application. Demonstrates
                                    full-stack architecture, REST API development, database design,
                                    authentication, protected routes, state management, CRUD
                                    operations, responsive interface design, and application
                                    deployment. Built with React, Vite, Node.js, Express, MongoDB,
                                    Mongoose, JWT authentication, and modern frontend tooling.
                                </p>

                                <div className="cv-project-direct-links">
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        GitHub Repo: github.com/keenosmith-del/personal-productivity-desktop
                                    </a>

                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        Live URL: personal-productivity-desktop.vercel.app/
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="cv-project-item">
                            <div className="cv-project-marker">
                                <span></span>
                            </div>

                            <div className="cv-project-details">
                                <h3>AI Assistant Web Application</h3>

                                <div className="cv-project-meta">
                                    <span>AI Application Development</span>
                                    <span>React · Node.js · Express · LLM APIs · RAG</span>
                                </div>

                                <p>
                                    An AI assistant exploring modern LLM integration, prompt
                                    engineering, Retrieval-Augmented Generation (RAG), and AI-driven
                                    application architecture. Demonstrates AI application
                                    development, API integration, conversational interfaces,
                                    context retrieval, prompt design, asynchronous data flows, and
                                    full-stack integration. Built with React, Node.js, Express,
                                    LLM APIs, and supporting AI development technologies.
                                </p>

                                <div className="cv-project-direct-links">
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        GitHub Repo: github.com/keenosmith-del/ai-entity
                                    </a>

                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        Live URL: ai-entity-psi.vercel.app/
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="cv-project-item">
                            <div className="cv-project-marker">
                                <span></span>
                            </div>

                            <div className="cv-project-details">
                                <h3>Music API Web Application</h3>

                                <div className="cv-project-meta">
                                    <span>API &amp; Backend</span>
                                    <span>React · Vite · Node.js · Express · MongoDB · Mongoose</span>
                                </div>

                                <p>
                                    A full-stack music application combining music discovery,
                                    playback, queue management, and API-driven backend architecture.
                                    Demonstrates REST API development, backend architecture,
                                    database integration, asynchronous data handling, frontend
                                    state management, third-party API integration, and interactive
                                    application design. Built with React, Vite, Node.js, Express,
                                    MongoDB, and Mongoose.
                                </p>

                                <div className="cv-project-direct-links">
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        GitHub Repo: github.com/keenosmith-del/music-api
                                    </a>

                                    {/*
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        Live URL: project-placeholder.com
                                    </a>
                                    */}
                                </div>
                            </div>
                        </div>

                        <div className="cv-project-item">
                            <div className="cv-project-marker">
                                <span></span>
                            </div>

                            <div className="cv-project-details">
                                <h3>Enterprise Workspace</h3>

                                <div className="cv-project-meta">
                                    <span>SQL</span>
                                    <span>React · Vite · Node.js · Express · PostgreSQL · Prisma</span>
                                </div>

                                <p>
                                    A structured enterprise workspace designed around modern
                                    frontend architecture, relational data management, and
                                    maintainable full-stack application design. Demonstrates
                                    enterprise application architecture, relational database
                                    modelling, ORM integration, REST API development, component
                                    architecture, data management, and scalable application
                                    structure. Built with React, Vite, Node.js, Express,
                                    PostgreSQL, and Prisma ORM.
                                </p>

                                <div className="cv-project-direct-links">
                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        GitHub Repo: github.com/keenosmith-del/enterprise-workspace
                                    </a>

                                    <a href="#" target="_blank" rel="noopener noreferrer">
                                        Live URL: enterprise-workspace-liard.vercel.app/
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* all skills */}
                <section className="cv-section cv-skills">
                    <div className="cv-section-heading">
                        <span>05</span>
                        <h2>Skills</h2>
                    </div>

                    <div className="cv-skills-links">

                        <a href="#" target="_blank" rel="noopener noreferrer">
                            GitHub: github.com/keenosmith-del
                        </a>

                        <a href="#" target="_blank" rel="noopener noreferrer">
                            Codewars: codewars.com/users/keenosmith-del
                        </a>

                        <a href="#" target="_blank" rel="noopener noreferrer">
                            LeetCode: leetcode.com/u/keenosmith/
                        </a>

                        <a href="#" target="_blank" rel="noopener noreferrer">
                            freeCodeCamp: freecodecamp.org/keenosmith
                        </a>

                    </div>

                    <div className="cv-section-content cv-skills-content">

                        <div className="cv-skill-group">
                            <h3>Languages</h3>
                            <p>JavaScript · Python · SQL · HTML · CSS</p>
                        </div>

                        <div className="cv-skill-group">
                            <h3>Frontend</h3>
                            <p>
                                React · Vite · React Router · Responsive Web Development ·
                                UI Architecture · Component Architecture
                            </p>
                        </div>

                        <div className="cv-skill-group">
                            <h3>Backend</h3>
                            <p>
                                Node.js · Express · REST APIs · Authentication · JWT ·
                                Backend Architecture
                            </p>
                        </div>

                        <div className="cv-skill-group">
                            <h3>Databases</h3>
                            <p>
                                MongoDB · Mongoose · PostgreSQL · Prisma · Database Design ·
                                Relational Data Modelling
                            </p>
                        </div>

                        <div className="cv-skill-group">
                            <h3>AI / Machine Learning</h3>
                            <p>
                                LLM Integration · RAG · Prompt Engineering · Agentic AI ·
                                PyTorch · Neural Networks · Transformers
                            </p>
                        </div>

                        <div className="cv-skill-group">
                            <h3>Cloud / DevOps</h3>
                            <p>
                                AWS · Git · GitHub · CI/CD · Docker · Kubernetes ·
                                Application Deployment
                            </p>
                        </div>

                        <div className="cv-skill-group">
                            <h3>Engineering</h3>
                            <p>
                                Full-Stack Development · Software Architecture · API Design ·
                                State Management · Testing &amp; Debugging · Version Control
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