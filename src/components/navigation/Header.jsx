import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

import './Header.css';

import avatar from '../../assets/images/avatar/avatar.png';
import githubIcon from '../../assets/svgs/header/github.svg';
import linkedinIcon from '../../assets/svgs/header/linkedin.svg';
import homeIcon from '../../assets/svgs/header/home.svg';

const skillGroups = [
    {
        title: 'Frontend',
        skills: [
            'React',
            'JavaScript',
            'HTML',
            'CSS',
            'Vite',
            'React Router',
            'Tailwind CSS',
            'Figma',
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
        ],
    },
    {
        title: 'Databases & data',
        skills: [
            'MongoDB',
            'Mongoose',
            'PostgreSQL',
            'MySQL',
            'Prisma',
            'Redis',
            'Elasticsearch',
            'Neo4j',
        ],
    },
    {
        title: 'AI & machine learning',
        skills: [
            'OpenAI',
            'Anthropic',
            'Google Gemini',
            'Hugging Face',
            'LangChain',
            'PyTorch',
            'TensorFlow',
            'RAG',
            'Agentic AI',
        ],
    },
    {
        title: 'Cloud, DevOps & infrastructure',
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
        ],
    },
    {
        title: 'Languages & engineering',
        skills: [
            'Python',
            'C++',
            'JavaScript',
            'JWT',
            'Authentication',
            'Software architecture',
            'Responsive web development',
        ],
    },
];

const projectGroups = [
    {
        title: 'Productivity Platform',
        description:
            'A full-stack productivity platform combining tasks, projects, goals, reminders, notes and calendar management.',
        path: '/projects/productivity-platform',
    },
    {
        title: 'AI Assistant',
        description:
            'An AI-powered assistant exploring LLM integration, prompt engineering, RAG and intelligent application workflows.',
        path: '/projects/ai-assistant',
    },
    {
        title: 'Music API Web App',
        description:
            'A full-stack music application built around discovery, playback, queue management and API-driven experiences.',
        path: '/projects/music-api',
    },
    {
        title: 'Enterprise Workspace',
        description:
            'A SQL-focused enterprise workspace built with modern frontend architecture, APIs, PostgreSQL and Prisma.',
        path: '/projects/enterprise-workspace',
    },
];

const linkGroups = [
    {
        title: 'Code & repositories',
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/keenosmith-del',
            },
            {
                name: 'GitLab',
                url: '#',
            },
            {
                name: 'Bitbucket',
                url: '#',
            },
        ],
    },
    {
        title: 'Engineering',
        links: [
            {
                name: 'Codewars',
                url: '#',
            },
            {
                name: 'HackerRank',
                url: '#',
            },
            {
                name: 'Docker Hub',
                url: '#',
            },
            {
                name: 'Stack Overflow',
                url: '#',
            },
        ],
    },
    {
        title: 'AI & machine learning',
        links: [
            {
                name: 'Hugging Face',
                url: '#',
            },
            {
                name: 'Kaggle',
                url: '#',
            },
        ],
    },
    {
        title: 'Professional',
        links: [
            {
                name: 'LinkedIn',
                url: 'https://www.linkedin.com/in/keenotreysmith/',
            },
            {
                name: 'AWS Skill Builder',
                url: '#',
            },
            {
                name: 'Credly',
                url: '#',
            },
        ],
    },
    {
        title: 'Development ecosystem',
        links: [
            {
                name: 'npm',
                url: '#',
            },
            {
                name: 'PyPI',
                url: '#',
            },
        ],
    },
    {
        title: 'Writing & community',
        links: [
            {
                name: 'Dev.to',
                url: '#',
            },
            {
                name: 'Medium',
                url: '#',
            },
            {
                name: 'Product Hunt',
                url: '#',
            },
        ],
    },
];

function Header() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const [isSkillsOpen, setIsSkillsOpen] = useState(false);
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);
    const [isLinksOpen, setIsLinksOpen] = useState(false);

    const navigationRef = useRef(null);

    const closeAllDropdowns = () => {
        setIsSkillsOpen(false);
        setIsProjectsOpen(false);
        setIsLinksOpen(false);
    };

    const openDropdown = (dropdown) => {
        setIsSkillsOpen(dropdown === 'skills');
        setIsProjectsOpen(dropdown === 'projects');
        setIsLinksOpen(dropdown === 'links');
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const isFormValid =
        formData.name.trim() !== '' &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) &&
        formData.subject.trim() !== '' &&
        formData.message.trim() !== '';

    const handleChatOpen = () => {
        closeAllDropdowns();
        setIsChatOpen(true);
    };

    const handleChatClose = () => {
        setIsChatOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isFormValid) {
            return;
        }

        // Submission logic will be added later.
    };

    useEffect(() => {
        if (!isChatOpen) {
            return undefined;
        }

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                handleChatClose();
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isChatOpen]);

    useEffect(() => {
        if (!isSkillsOpen && !isProjectsOpen && !isLinksOpen) {
            return undefined;
        }

        const handleOutsideClick = (event) => {
            if (
                navigationRef.current &&
                !navigationRef.current.contains(event.target)
            ) {
                closeAllDropdowns();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isSkillsOpen, isProjectsOpen, isLinksOpen]);

    useEffect(() => {
        if (!isSkillsOpen && !isProjectsOpen && !isLinksOpen) {
            return undefined;
        }

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                closeAllDropdowns();
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isSkillsOpen, isProjectsOpen, isLinksOpen]);

    return (
        <>
            <header className="site-header">
                <nav
                    className={`navigation-pill ${isSkillsOpen
                        ? 'is-skills-open'
                        : isProjectsOpen
                            ? 'is-projects-open'
                            : isLinksOpen
                                ? 'is-links-open'
                                : ''
                        }`}
                    aria-label="Main navigation"
                    ref={navigationRef}
                >

                    <div className="navigation-left">
                        <a
                            className="navigation-avatar"
                            href="#top"
                            aria-label="Return to top"
                            onClick={closeAllDropdowns}
                        >
                            <img
                                src={avatar}
                                alt="Keeno Smith"
                            />
                        </a>

                        <div className="navigation-links">
                            <a
                                href="#top"
                                onClick={closeAllDropdowns}
                            >
                                Home
                            </a>

                            <button
                                className={`navigation-skills-trigger ${isSkillsOpen ? 'is-active' : ''
                                    }`}
                                type="button"
                                onClick={() => {
                                    if (isSkillsOpen) {
                                        closeAllDropdowns();
                                    } else {
                                        openDropdown('skills');
                                    }
                                }}
                                aria-expanded={isSkillsOpen}
                                aria-controls="navigation-skills-panel"
                            >
                                <span>Skills</span>

                                <ChevronDown
                                    size={14}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />
                            </button>

                            <a
                                href="#about"
                                onClick={closeAllDropdowns}
                            >
                                About
                            </a>

                            <button
                                className={`navigation-projects-trigger ${isProjectsOpen ? 'is-active' : ''
                                    }`}
                                type="button"
                                onClick={() => {
                                    if (isProjectsOpen) {
                                        closeAllDropdowns();
                                    } else {
                                        openDropdown('projects');
                                    }
                                }}
                                aria-expanded={isProjectsOpen}
                                aria-controls="navigation-projects-panel"
                            >
                                <span>Projects</span>

                                <ChevronDown
                                    size={14}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />
                            </button>

                            <button
                                className={`navigation-links-trigger ${isLinksOpen ? 'is-active' : ''
                                    }`}
                                type="button"
                                onClick={() => {
                                    if (isLinksOpen) {
                                        closeAllDropdowns();
                                    } else {
                                        openDropdown('links');
                                    }
                                }}
                                aria-expanded={isLinksOpen}
                                aria-controls="navigation-links-panel"
                            >
                                <span>Links</span>

                                <ChevronDown
                                    size={14}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>

                    {/* drop down skills */}
                    <div
                        className={`navigation-skills-panel ${isSkillsOpen ? 'is-open' : ''
                            }`}
                        id="navigation-skills-panel"
                        aria-hidden={!isSkillsOpen}
                    >
                        <div className="navigation-skills-grid">
                            {skillGroups.map((group) => (
                                <div
                                    className="navigation-skill-group"
                                    key={group.title}
                                >
                                    <h3>{group.title}</h3>

                                    <div className="navigation-skill-list">
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

                    {/* drop down projects */}
                    <div
                        className={`navigation-projects-panel ${isProjectsOpen ? 'is-open' : ''
                            }`}
                        id="navigation-projects-panel"
                        aria-hidden={!isProjectsOpen}
                    >
                        <div className="navigation-projects-grid">
                            {projectGroups.map((project) => (
                                <div
                                    className="navigation-project-card"
                                    key={project.title}
                                >
                                    <h3>{project.title}</h3>

                                    <p>{project.description}</p>

                                    <a
                                        href={project.path}
                                        className="navigation-project-link"
                                    >
                                        <span>View project</span>

                                        <ArrowRight
                                            size={14}
                                            strokeWidth={1.8}
                                            aria-hidden="true"
                                        />
                                    </a>
                                </div>
                            ))}
                        </div>

                        <div className="navigation-project-actions">
                            <a
                                href="https://github.com/keenosmith-del"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="navigation-project-action navigation-project-action-secondary"
                                onClick={closeAllDropdowns}
                            >
                                <span>All Projects on GitHub</span>

                                <ArrowRight
                                    size={15}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />
                            </a>

                            <a
                                href="#projects"
                                className="navigation-project-action navigation-project-action-primary"
                                onClick={closeAllDropdowns}
                            >
                                <span>View Projects</span>

                                <ArrowRight
                                    size={15}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />
                            </a>
                        </div>
                    </div>

                    {/* drop down links */}
                    <div
                        className={`navigation-links-panel ${isLinksOpen ? 'is-open' : ''
                            }`}
                        id="navigation-links-panel"
                        aria-hidden={!isLinksOpen}
                    >
                        <div className="navigation-links-grid">
                            {linkGroups.map((group) => (
                                <div
                                    className="navigation-link-group"
                                    key={group.title}
                                >
                                    <h3>{group.title}</h3>

                                    <div className="navigation-link-list">
                                        {group.links.map((link) => (
                                            <a
                                                key={link.name}
                                                href={link.url}
                                                target={
                                                    link.url.startsWith('http')
                                                        ? '_blank'
                                                        : undefined
                                                }
                                                rel={
                                                    link.url.startsWith('http')
                                                        ? 'noopener noreferrer'
                                                        : undefined
                                                }
                                                onClick={closeAllDropdowns}
                                            >
                                                <span>{link.name}</span>

                                                <ArrowRight
                                                    size={13}
                                                    strokeWidth={1.8}
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <a
                        className="navigation-home"
                        href="#top"
                        aria-label="Home"
                        onClick={closeAllDropdowns}
                    >
                        <img
                            src={homeIcon}
                            alt=""
                        />
                    </a>

                    <div className="navigation-right">
                        <div className="navigation-socials">
                            <a
                                href="https://github.com/keenosmith-del"
                                aria-label="GitHub"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={githubIcon}
                                    alt=""
                                />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/keenotreysmith/"
                                aria-label="LinkedIn"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={linkedinIcon}
                                    alt=""
                                />
                            </a>
                        </div>

                        <button
                            className="navigation-chat"
                            type="button"
                            onClick={handleChatOpen}
                        >
                            Let's chat
                        </button>
                    </div>

                </nav>
            </header>

            {isChatOpen && (
                <div
                    className="chat-modal-overlay"
                    onMouseDown={handleChatClose}
                >
                    <div
                        className="chat-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="chat-modal-title"
                        onMouseDown={(event) => event.stopPropagation()}
                    >
                        <button
                            className="chat-modal-close"
                            type="button"
                            onClick={handleChatClose}
                            aria-label="Close contact form"
                        >
                            <span aria-hidden="true">×</span>
                        </button>

                        <div className="chat-modal-header">
                            <p className="chat-modal-eyebrow">
                                Get in touch
                            </p>

                            <h2 id="chat-modal-title">
                                Let's chat
                            </h2>

                            <p>
                                Have a project, idea, or opportunity in mind?
                            </p>
                        </div>

                        <form
                            className="chat-form"
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <div className="chat-form-row">
                                <div className="chat-form-field">
                                    <label htmlFor="chat-name">
                                        Name
                                    </label>

                                    <input
                                        id="chat-name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        autoComplete="name"
                                        required
                                    />
                                </div>

                                <div className="chat-form-field">
                                    <label htmlFor="chat-email">
                                        Email
                                    </label>

                                    <input
                                        id="chat-email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        autoComplete="email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="chat-form-field">
                                <label htmlFor="chat-subject">
                                    Subject
                                </label>

                                <input
                                    id="chat-subject"
                                    name="subject"
                                    type="text"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="chat-form-field">
                                <label htmlFor="chat-message">
                                    Message
                                </label>

                                <textarea
                                    id="chat-message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="6"
                                    required
                                />
                            </div>

                            <div className="chat-form-actions">
                                <button
                                    className="chat-button chat-button-cancel"
                                    type="button"
                                    onClick={handleChatClose}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="chat-button chat-button-send"
                                    type="submit"
                                    disabled={!isFormValid}
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;