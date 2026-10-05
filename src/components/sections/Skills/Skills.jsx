import './Skills.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowRight } from 'lucide-react';

import claudeImage from '../../../assets/images/about/claude.png';
import ollamaImage from '../../../assets/images/about/ollama.png';
import n8nImage from '../../../assets/images/about/n8n.png';


const skillGroups = [
    {
        title: 'Frontend & UI',
        skills: [
            'React',
            'JavaScript',
            'HTML',
            'CSS',
            'Vite',
            'React Router',
            'Tailwind CSS',
            'Bootstrap',
            'Figma',
            'Responsive Design',
            'Component Architecture',
            'Web Animation',
        ],
    },
    {
        title: 'Backend & APIs',
        skills: [
            'Node.js',
            'Express.js',
            'Fastify',
            'FastAPI',
            'REST APIs',
            'GraphQL',
            'Postman',
            'Axios',
            'API Integration',
            'Asynchronous Programming',
            'Middleware',
            'Server-side Architecture',
        ],
    },
    {
        title: 'Databases & Data',
        skills: [
            'MongoDB',
            'Mongoose',
            'PostgreSQL',
            'MySQL',
            'Prisma',
            'Redis',
            'Elasticsearch',
            'Neo4j',
            'Data Modelling',
            'Query Design',
            'Vector Search',
        ],
    },
    {
        title: 'AI & Machine Learning',
        skills: [
            'OpenAI',
            'Anthropic',
            'Google Gemini',
            'Hugging Face',
            'LangChain',
            'PyTorch',
            'TensorFlow',
            'RAG',
            'Embeddings',
            'NLP',
            'Prompt Engineering',
            'LLM Integration',
            'Agentic AI',
            'AI Evaluation',
        ],
    },
    {
        title: 'Microsoft & Azure',
        skills: [
            'Microsoft Foundry',
            'Foundry Agent Service',
            'Microsoft Agent Framework',
            'Azure OpenAI',
            'Foundry Models',
            'Azure AI Search',
            'Azure Functions',
            'Azure Container Apps',
            'Azure Logic Apps',
            'Azure Service Bus',
            'Azure Storage',
            'Azure Key Vault',
            'Microsoft Entra ID',
            'Azure Monitor',
            'Application Insights',
            'Azure DevOps',
            'Azure API Management',
        ],
    },
    {
        title: 'Google Cloud & AI',
        skills: [
            'Google Cloud',
            'Google Gemini',
            'Vertex AI',
            'Google AI APIs',
            'Firebase',
            'Cloud Functions',
            'Cloud Storage',
            'Google Cloud APIs',
        ],
    },
    {
        title: 'Cloud, DevOps & Infrastructure',
        skills: [
            'AWS',
            'Docker',
            'Kubernetes',
            'GitHub Actions',
            'CI/CD',
            'Terraform',
            'Cloudflare',
            'Nginx',
            'Render',
            'Vercel',
            'Containerisation',
            'Deployment Automation',
            'Infrastructure as Code',
        ],
    },
    {
        title: 'Security & Authentication',
        skills: [
            'JWT',
            'Authentication',
            'Authorization',
            'RBAC',
            'bcrypt',
            'Protected Routes',
            'API Security',
            'Microsoft Entra ID',
            'Managed Identity',
            'Secrets Management',
            'OAuth',
            'Security Architecture',
        ],
    },
    {
        title: 'Architecture & Engineering',
        skills: [
            'Software Architecture',
            'System Design',
            'RESTful Architecture',
            'Microservices',
            'Event-driven Architecture',
            'Serverless Architecture',
            'Distributed Systems',
            'Asynchronous Workflows',
            'Message Queues',
            'API Design',
            'Integration Patterns',
            'Error Handling',
            'Observability',
        ],
    },
    {
        title: 'Languages & Core Engineering',
        skills: [
            'JavaScript',
            'Python',
            'C++',
            'SQL',
            'Object-oriented Programming',
            'Data Structures',
            'Algorithms',
            'Async Programming',
            'Git',
            'GitHub',
            'JSON',
        ],
    },
];

// Add a destination to each entry when its frontend project page is ready.
const frontendDesigns = [
    { title: 'Frontend Design One', description: 'Interface layouts and visual design.', href: null },
    { title: 'Frontend Design Two', description: 'Responsive pages and component design.', href: null },
    { title: 'Frontend Design Three', description: 'Interaction flows and frontend development.', href: null },
];

function Skills() {
    const navigate = useNavigate();
    const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
    const designTriggerRef = useRef(null);
    const designCloseRef = useRef(null);
    const designDialogRef = useRef(null);
    const [selectedDesign, setSelectedDesign] = useState(null);

    useEffect(() => {
        if (!isDesignModalOpen) return;
        const trigger = designTriggerRef.current;
        const openedWithKeyboard = trigger?.matches(':focus-visible');
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        designCloseRef.current?.focus();
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setIsDesignModalOpen(false);
            if (event.key === 'Tab') {
                const controls = [...designDialogRef.current.querySelectorAll('button, a[href]')];
                const first = controls[0];
                const last = controls[controls.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
            if (openedWithKeyboard) trigger?.focus();
            else trigger?.blur();
        };
    }, [isDesignModalOpen]);

    const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);

    const handleSkillsOpen = () => {
        setIsSkillsModalOpen(true);
    };

    const handleSkillsClose = () => {
        setIsSkillsModalOpen(false);
    };

    return (
        <>
            <section className="skills" id="skills">

                <div className="skills-intro">

                    <h2>
                        Engineering across
                        <br />
                        software, AI &amp; cloud.
                    </h2>

                    <p className="skills-intro-description">
                        I’ve built full-stack applications, AI procurement and contract
                        tools, private intelligence platforms and workflow integrations.
                        This section brings those projects together with the cloud
                        ecosystems I work in and my UX/UI design work.
                    </p>

                </div>


                <div className="skills-grid">

                    {/* =====================================================
                    ROW 1
                ===================================================== */}

                    {/* =====================================================
    ROW 1 - FULL-STACK SOFTWARE ENGINEERING
===================================================== */}

                    <article className="skills-tile skills-tile-fullstack">

                        <div className="skills-tile-top">

                            <div className="skills-tile-pills">
                                <span>React</span>
                                <span>JavaScript</span>
                                <span>Node.js</span>
                                <span>Express</span>
                                <span>MongoDB</span>
                                <span>PostgreSQL</span>
                            </div>

                        </div>

                        <div className="skills-tile-content">

                            <h3>
                                I build full-stack
                                <br />
                                applications.
                            </h3>

                            <p>
                                I work on the frontend, backend, APIs and databases,
                                along with authentication, integrations and deployment.
                                Some projects also include AI models and automated workflows.
                            </p>

                        </div>

                        <div className="skills-tile-actions">

                            <button
                                type="button"
                                className="skills-button skills-button-secondary"
                                onClick={handleSkillsOpen}
                            >
                                All Skills
                            </button>

                            <a
                                href="#projects"
                                className="skills-button skills-button-primary"
                            >
                                View Projects
                            </a>

                        </div>

                    </article>


                    <article className="skills-tile skills-tile-claude">

                        <div className="skills-tile-claude-image">
                            <img
                                src={claudeImage}
                                alt="Claude"
                            />
                        </div>

                        <div className="skills-tile-claude-overlay" />

                        <div className="skills-tile-content">

                            <span className="skills-tile-label">
                                Anthropic
                            </span>

                            

                            <p>
                                My AI Procurement &amp; Contract Intelligence Platform:
                                bringing Claude into the work of understanding
                                contracts and procurement documents.
                            </p>

                        </div>

                        <button
                            className="skills-arrow skills-arrow-light"
                            type="button"
                            aria-label="View Claude AI Procurement and Contract Intelligence project"
                            onClick={() => navigate('/projects/claude')}
                        >
                            <ArrowRight
                                size={16}
                                strokeWidth={1.7}
                                aria-hidden="true"
                            />
                        </button>

                    </article>



                    <article className="skills-tile skills-tile-microsoft">
                        <div className="skills-tile-content">

                            <span className="skills-tile-label">
                                Cloud ecosystems
                            </span>

                            <h3>
                                AWS, GCP
                                <br />
                                &amp; Microsoft
                            </h3>

                            <p>
                                I work across AWS, Google Cloud and Microsoft,
                                using their services for application hosting,
                                data, integrations and AI development.
                            </p>

                        </div>

                    </article>


                    {/* =====================================================
                    ROW 2
                ===================================================== */}

                    <article className="skills-tile skills-tile-n8n">

                        <div className="skills-n8n-image">
                            {/*
                            <img
                                src={n8nImage}
                                alt="n8n"
                            />
                            */}
                        </div>

                        <div className="skills-n8n-overlay" />

                        <div className="skills-tile-content">

                            <span className="skills-tile-label">
                                Automation
                            </span>

                            <h3>
                                n8n
                            </h3>

                            <p>
                                My Enterprise Workflow &amp; Integration OpsFlow Platform:
                                connecting business systems and turning repeatable
                                work into coordinated workflows.
                            </p>

                            <button
                                className="skills-arrow skills-arrow-light"
                                type="button"
                                aria-label="View n8n Enterprise Workflow and Integration OpsFlow project"
                                onClick={() => navigate('/projects/n8n')}
                            >
                                <ArrowRight
                                    size={16}
                                    strokeWidth={1.7}
                                    aria-hidden="true"
                                />
                            </button>

                        </div>

                    </article>


                    <article className="skills-tile skills-tile-ux">
                        <div className="skills-tile-content">

                            <span className="skills-tile-label">
                                Design
                            </span>

                            <h3>
                                UX / UI
                            </h3>

                            <p>
                                I design interfaces, page layouts and interaction
                                flows.
                            </p>

                            <button
                                className="skills-arrow skills-arrow-light"
                                type="button"
                                ref={designTriggerRef}
                                aria-label="Explore UX/UI designs"
                                aria-haspopup="dialog"
                                aria-expanded={isDesignModalOpen}
                                onClick={() => { setSelectedDesign(null); setIsDesignModalOpen(true); }}
                            >
                                <ArrowRight
                                    size={16}
                                    strokeWidth={1.7}
                                    aria-hidden="true"
                                />
                            </button>

                        </div>
                    </article>


                    <article className="skills-tile skills-tile-ollama">

                        <div className="skills-ollama-image">
                            <img
                                src={ollamaImage}
                                alt="Ollama"
                            />
                        </div>

                        <div className="skills-ollama-overlay" />

                        <div className="skills-tile-content">

                            <span className="skills-tile-label">
                                Local AI
                            </span>

                            
                            <h3>
                                
                            </h3>

                            <p>
                                
                            </p>

                        </div>

                        <button
                            className="skills-arrow skills-arrow-light"
                            type="button"
                            aria-label="View Ollama Private Personal and Business Intelligence project"
                            onClick={() => navigate('/projects/ollama')}
                        >
                            <ArrowRight
                                size={16}
                                strokeWidth={1.7}
                                aria-hidden="true"
                            />
                        </button>

                    </article>

                </div>

            </section>

            {isDesignModalOpen && (
                <div className="skills-modal-overlay" onMouseDown={() => setIsDesignModalOpen(false)}>
                    <div ref={designDialogRef} className="skills-modal skills-design-modal" role="dialog"
                        aria-modal="true" aria-labelledby="skills-design-title"
                        onMouseDown={(event) => event.stopPropagation()}>
                        <button ref={designCloseRef} className="skills-modal-close" type="button"
                            aria-label="Close UX/UI designs" onClick={() => setIsDesignModalOpen(false)}>
                            <span aria-hidden="true">×</span>
                        </button>
                        <div className="skills-modal-header">
                            <h2 id="skills-design-title">UX/UI designs</h2>
                            <p>Three frontend design projects covering layouts, components and interactions.</p>
                        </div>
                        <div className="skills-design-list">
                            {frontendDesigns.map((project) => (
                                <article className="skills-design-item" key={project.title}>
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    {project.href ? (
                                        <a className="skills-design-link" href={project.href}>
                                            View design <ArrowRight size={13} aria-hidden="true" />
                                        </a>
                                    ) : (
                                        <button className="skills-design-link" type="button"
                                            aria-label={`View ${project.title}`}
                                            onClick={() => setSelectedDesign(project.title)}>
                                            View design <ArrowRight size={13} aria-hidden="true" />
                                        </button>
                                    )}
                                </article>
                            ))}
                        </div>
                        <p className="skills-design-status" role="status">
                            {selectedDesign ? `${selectedDesign} will be available once its project page is connected.` : ''}
                        </p>
                    </div>
                </div>
            )}

            {isSkillsModalOpen && (
                <div
                    className="skills-modal-overlay"
                    onMouseDown={handleSkillsClose}
                >
                    <div
                        className="skills-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="skills-modal-title"
                        onMouseDown={(event) => event.stopPropagation()}
                    >

                        <button
                            className="skills-modal-close"
                            type="button"
                            onClick={handleSkillsClose}
                            aria-label="Close skills"
                        >
                            <span aria-hidden="true">×</span>
                        </button>

                        <div className="skills-modal-header">
                            <h2 id="skills-modal-title">
                                Technical Skills
                            </h2>

                            <p>
                                Technologies, frameworks, platforms, and engineering
                                practices across my development work.
                            </p>
                        </div>

                        <div className="skills-modal-grid">
                            {skillGroups.map((group) => (
                                <div
                                    className="skills-modal-group"
                                    key={group.title}
                                >
                                    <h3>{group.title}</h3>

                                    <div className="skills-modal-list">
                                        {group.skills.map((skill) => (
                                            <span key={skill}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            )}

        </>
    );
}

export default Skills;
