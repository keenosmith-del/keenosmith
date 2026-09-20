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

function Skills() {
    const aboutRef = useRef(null);
    const navigate = useNavigate();

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
                        Building across full-stack software engineering, AI
                        application development, cloud platforms, automation
                        and product-focused interface design.
                    </p>

                </div>


                <div className="skills-grid">

                    {/* =====================================================
                    ROW 1
                ===================================================== */}

                    {/* =====================================================
    ROW 1 — FULL-STACK SOFTWARE ENGINEERING
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
                                Full-Stack
                                <br />
                                Software Engineering
                            </h3>

                            <p>
                                Building end-to-end web applications with React, JavaScript, Node.js,
                                Express, REST APIs, MongoDB, PostgreSQL, Mongoose, Prisma, JWT
                                authentication, responsive UI, Git, CI/CD, and cloud deployment.
                            </p>

                        </div>

                        <div className="skills-tile-actions">

                            <a
                                type="button"
                                className="skills-button skills-button-secondary"
                                onClick={handleSkillsOpen}
                            >
                                All Skills
                            </a>

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

                            <h3>
                                Claude
                            </h3>

                            <p>
                                LLM application engineering, context
                                engineering and AI-powered development.
                            </p>

                        </div>

                        <button
                            className="skills-arrow skills-arrow-light"
                            type="button"
                            disabled
                            aria-label="Claude projects unavailable"
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
                                Microsoft
                            </span>

                            <h3>
                                Azure
                                <br />
                                Foundry
                            </h3>

                            <p>
                                Agentic AI, multi-agent architecture and
                                intelligent application development.
                            </p>

                        </div>

                        <button
                            className="skills-arrow skills-arrow-light"
                            type="button"
                            aria-label="View Microsoft Foundry projects"
                            onClick={(event) => {
                                event.stopPropagation();
                                navigate('/projects/microsoft');
                            }}
                        >
                            <ArrowRight
                                size={16}
                                strokeWidth={1.7}
                                aria-hidden="true"
                            />
                        </button>

                    </article>


                    {/* =====================================================
                    ROW 2
                ===================================================== */}

                    <article className="skills-tile skills-tile-n8n">

                        <div className="skills-n8n-image">
                            <img
                                src={n8nImage}
                                alt="n8n"
                            />
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
                                Workflow orchestration, API integration,
                                automation and event-driven systems.
                            </p>

                            <button
                                className="skills-arrow skills-arrow-light"
                                type="button"
                                disabled
                                aria-label="n8n projects unavailable"
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
                                Product interfaces, interaction design
                                and visual systems.
                            </p>

                            <button
                                className="skills-arrow skills-arrow-light"
                                type="button"
                                disabled
                                aria-label="UX/UI projects unavailable"
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
                                Ollama
                            </h3>

                            <p>
                                Local LLM development, experimentation
                                and AI application workflows.
                            </p>

                        </div>

                        <button
                            className="skills-arrow skills-arrow-light"
                            type="button"
                            disabled
                            aria-label="Ollama projects unavailable"
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
