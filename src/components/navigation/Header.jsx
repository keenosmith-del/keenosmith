import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { ChevronDown, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

import './Header.css';
import { skillGroups } from '../../data/skillGroups.js';
import { projectConcepts } from '../../data/projectConcepts.js';

import avatar from '../../assets/images/avatar/avatar.png';
import githubIcon from '../../assets/svgs/header/github.svg';
import linkedinIcon from '../../assets/svgs/header/linkedin.svg';
import homeIcon from '../../assets/svgs/header/home.svg';


const projectGroups = [
    ...projectConcepts,
    {
        title: 'Authenticated MERN Productivity Platform',

        description:
            'A full-stack web application implementing authenticated resource management, REST APIs, interconnected data modelling and persistent client-server state.',

        path: '/projects/productivity-platform',

    },
    {
        title: 'Retrieval-Augmented AI Model',
        description:
            'Full-stack SaaS platform implementing LLM inference, semantic embeddings, vector retrieval, knowledge engineering and configurable AI context workflows.',
        path: '/projects/ai-assistant',
    },
    {
        title: 'API-Driven Full-Stack Web Application',
        description:
            'React, Node.js, Express and MongoDB application implementing REST APIs, external service integration, data persistence and browser-based playback.',
        path: '/projects/music-api',
    },
    {
        title: 'Enterprise SQL Database',
        description:
            'A full-stack database platform centred on PostgreSQL, SQL, relational modelling and Runtime Schema Management, with Prisma ORM, Runtime DDL, relational constraints, dynamic records and SQL query execution.',
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
                url: 'https://gitlab.com/keenosmith-del',
            },
            {
                name: 'Bitbucket',
                url: '#',
                disabled: true,
            },
        ],
    },
    {
        title: 'Engineering',
        links: [
            {
                name: 'Codewars',
                url: 'https://www.codewars.com/users/keenosmith-del',
            },
            {
                name: 'LeetCode',
                url: 'https://leetcode.com/u/keenosmith/',
            },
            {
                name: 'HackerRank',
                url: '#',
                disabled: true,
            },
            {
                name: 'Docker Hub',
                url: '#',
                disabled: true,
            },
            {
                name: 'Stack Overflow',
                url: 'https://stackoverflow.com/users/32030841/keenosmith',
            },
        ],
    },
    {
        title: 'AI & machine learning',
        links: [
            {
                name: 'Hugging Face',
                url: 'https://huggingface.co/keenosmith',
            },
            {
                name: 'Kaggle',
                url: 'https://www.kaggle.com/keenotreysmith',
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
                url: 'https://skillsprofile.skillbuilder.aws/user/keenosmith',
            },
            {
                name: 'Microsoft Learn',
                url: 'https://learn.microsoft.com/en-us/users/keenosmith/',
            },
            {
                name: 'Credly',
                url: 'https://www.credly.com/users/keeno-smith',
            },
            {
                name: 'Google Skills',
                url: 'https://www.skills.google/public_profiles/105079cb-27bf-46a4-9c48-9ce8fc594527',
            },
        ],
    },
    {
        title: 'Development ecosystem',
        links: [
            {
                name: 'npm',
                url: 'https://www.npmjs.com/~keenosmith',
            },
            {
                name: 'PyPI',
                url: 'https://pypi.org/user/keenosmith/',
            },
        ],
    },
    {
        title: 'Writing & community',
        links: [
            {
                name: 'Dev.to',
                url: 'https://dev.to/keenosmithdel',
            },
            {
                name: 'Medium',
                url: 'https://medium.com/@business.keenosmith',
            },
            {
                name: 'Product Hunt',
                url: '#',
                disabled: true,
            },
        ],
    },
];

/*
const cloudGroups = [
    {
        title: 'Microsoft',
        description:
            'Enterprise AI, Agentic Systems & Azure Engineering',
        path: '/projects/microsoft',
    },
    {
        title: 'AWS',
        description:
            'Cloud Infrastructure, Automation & Intelligent Operations',
        path: '/projects/aws',
    },
    {
        title: 'Google Cloud',
        description:
            'Data Intelligence, AI Systems & Distributed Engineering',
        path: '/projects/gcp',
    },
];
*/

function Header() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const [isSkillsOpen, setIsSkillsOpen] = useState(false);
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);
    const [isLinksOpen, setIsLinksOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCompactNavigation, setIsCompactNavigation] = useState(() => window.matchMedia('(max-width: 1100px)').matches);

    useEffect(() => {
        const media = window.matchMedia('(max-width: 1100px)');
        const update = () => {
            setIsCompactNavigation(media.matches);
            if (!media.matches) setIsMobileMenuOpen(false);
        };
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);

    const navigationRef = useRef(null);

    const formRef = useRef(null);

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const subjectRef = useRef(null);
    const messageRef = useRef(null);

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

    const [invalidFields, setInvalidFields] = useState({});
    const [sending, setSending] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [toastExiting, setToastExiting] = useState(false);

    const isFormComplete =
        formData.name.trim() !== '' &&
        formData.email.trim() !== '' &&
        formData.subject.trim() !== '' &&
        formData.message.trim() !== '';

    const isEmailValid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());

    const handleChatOpen = () => {
        closeAllDropdowns();
        setIsMobileMenuOpen(false);
        setIsChatOpen(true);
    };

    const handleChatClose = () => {
        setIsChatOpen(false);
        setInvalidFields({});
        setShowSuccess(false);
        setToastExiting(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));

        if (invalidFields[name]) {
            setInvalidFields((currentFields) => ({
                ...currentFields,
                [name]: false,
            }));
        }

        if (showSuccess) {
            setShowSuccess(false);
            setToastExiting(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (sending) {
            return;
        }

        const name = formData.name.trim();
        const email = formData.email.trim();
        const subject = formData.subject.trim();
        const message = formData.message.trim();

        const nextInvalidFields = {
            name: !name,
            email: !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
            subject: !subject,
        };

        setInvalidFields(nextInvalidFields);

        if (nextInvalidFields.name) {
            nameRef.current?.focus();
            return;
        }

        if (nextInvalidFields.email) {
            emailRef.current?.focus();
            return;
        }

        if (nextInvalidFields.subject) {
            subjectRef.current?.focus();
            return;
        }

        if (!message) {
            return;
        }

        setSending(true);

        try {
            await emailjs.sendForm(
                'service_hbhtr4l',
                'template_xtmmpnl',
                formRef.current,
                {
                    publicKey: 'Wy06Fl_fod1rRHsv4',
                }
            );

            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
            });

            setInvalidFields({});
            setShowSuccess(true);
            setToastExiting(false);

            setTimeout(() => {
                setToastExiting(true);
            }, 3200);

            setTimeout(() => {
                setShowSuccess(false);
                setToastExiting(false);
            }, 3500);

        } catch (error) {
            console.error('EMAILJS FAILED');
            console.error(error);
        } finally {
            setSending(false);
        }
    };

    useEffect(() => {
        if (!isProjectsOpen && !isSkillsOpen && !(isCompactNavigation && isMobileMenuOpen)) return;
        const previousBodyOverflow = document.body.style.overflow;
        const previousHtmlOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        const nav = navigationRef.current;
        const trigger = nav.querySelector(isProjectsOpen ? '.navigation-projects-trigger' : isSkillsOpen ? '.navigation-skills-trigger' : '.navigation-menu-toggle');
        const panel = nav.querySelector(isProjectsOpen ? '#navigation-projects-panel' : isSkillsOpen ? '#navigation-skills-panel' : '.navigation-links');
        const blocked = [
            ...document.querySelectorAll('#root > main, #root > .portfolio-actions-anchor'),
        ];
        const previousInert = blocked.map(el => el.inert);
        blocked.forEach(el => { el.inert = true; });
        panel.querySelector('a')?.focus({ preventScroll: true });
        const trapFocus = (event) => {
            if (event.key !== 'Tab') return;
            const controls = [...nav.querySelectorAll('a[href], button:not(:disabled)')].filter(el => !el.closest('[aria-hidden="true"]') && el.getClientRects().length > 0);
            const index = controls.indexOf(document.activeElement);
            if (event.shiftKey && index <= 0) {
                event.preventDefault(); controls.at(-1).focus();
            } else if (!event.shiftKey && (index === controls.length - 1 || index < 0)) {
                event.preventDefault(); trigger.focus();
            }
        };
        document.addEventListener('keydown', trapFocus);
        return () => {
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
            blocked.forEach((el, i) => { el.inert = previousInert[i]; });
            document.removeEventListener('keydown', trapFocus);
            if (trigger.isConnected) trigger.focus({ preventScroll: true });
        };
    }, [isProjectsOpen, isSkillsOpen, isMobileMenuOpen, isCompactNavigation]);

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
        if (!isSkillsOpen && !isProjectsOpen && !isLinksOpen && !isMobileMenuOpen) {
            return undefined;
        }

        const handleOutsideClick = (event) => {
            if (
                navigationRef.current &&
                !navigationRef.current.contains(event.target)
            ) {
                closeAllDropdowns();
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isSkillsOpen, isProjectsOpen, isLinksOpen, isMobileMenuOpen]);

    useEffect(() => {
        if (!isSkillsOpen && !isProjectsOpen && !isLinksOpen && !isMobileMenuOpen) {
            return undefined;
        }

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                closeAllDropdowns();
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isSkillsOpen, isProjectsOpen, isLinksOpen, isMobileMenuOpen]);

    useEffect(() => {
        if (!Object.values(invalidFields).some(Boolean)) {
            return undefined;
        }

        const timeout = setTimeout(() => {
            setInvalidFields({});
        }, 1800);

        return () => {
            clearTimeout(timeout);
        };
    }, [invalidFields]);

    return (
        <>
            {(isProjectsOpen || isSkillsOpen || (isCompactNavigation && isMobileMenuOpen)) && <div className="navigation-projects-backdrop" aria-hidden="true" onClick={() => { closeAllDropdowns(); setIsMobileMenuOpen(false); }} />}
            <header className="site-header">
                <nav
                    className={`navigation-pill ${isMobileMenuOpen ? 'is-mobile-menu-open' : ''} ${isSkillsOpen
                        ? 'is-skills-open'
                        : isProjectsOpen
                            ? 'is-projects-open'
                            : isLinksOpen
                                ? 'is-links-open'
                                : ''
                        }`}
                    aria-label="Main navigation"
                    ref={navigationRef}
                    onClick={(event) => {
                        if (event.target.closest('a')) {
                            closeAllDropdowns();
                            setIsMobileMenuOpen(false);
                        }
                    }}
                >
                    <button className="navigation-menu-toggle" type="button"
                        aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={isMobileMenuOpen} aria-controls="navigation-headings"
                        onClick={() => { closeAllDropdowns(); setIsMobileMenuOpen(current => !current); }}>
                        <span>{isMobileMenuOpen ? 'Close' : 'Menu'}</span>
                        <ChevronDown size={13} strokeWidth={1.7} aria-hidden="true" />
                    </button>

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

                        <div className="navigation-links" id="navigation-headings">
                            <a
                                href="#top"
                                onClick={closeAllDropdowns}
                            >
                                Home
                            </a>

                            <a
                                href="#skills"
                                onClick={closeAllDropdowns}
                            >
                                About
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

                            {/* SEARCH — COMING SOON */}
                            <div
                                className="navigation-cloud-trigger navigation-coming-soon"
                                aria-label="Search — Coming soon"
                            >
                                <span>Explore</span>
                                <span className="navigation-coming-soon-tooltip" aria-hidden="true">
                                    In progress
                                </span>
                            </div>

                            {/* CREDENTIALS — COMING SOON */}
                            <div
                                className="navigation-cloud-trigger navigation-coming-soon"
                                aria-label="Credentials — Coming soon"
                            >
                                <span>Credentials</span>
                                <span className="navigation-coming-soon-tooltip" aria-hidden="true">
                                    In Progress
                                </span>
                            </div>

                            {/* RECRUITER VIEW — COMING SOON */}
                            <div
                                className="navigation-cloud-trigger navigation-coming-soon"
                                aria-label="Credentials — Coming soon"
                            >
                                <span>Recruiter View</span>
                                <span className="navigation-coming-soon-tooltip" aria-hidden="true">
                                    In Progress
                                </span>
                            </div>

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
                        inert={!isSkillsOpen}
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
                        <div className="navigation-project-actions">
                            <Link to="/explore" className="navigation-project-action navigation-project-action-primary" onClick={closeAllDropdowns}>
                                Search Skills <ArrowRight size={14} aria-hidden="true" />
                            </Link>
                        </div>
                    </div>

                    {/* drop down projects */}
                    <div
                        className={`navigation-projects-panel ${isProjectsOpen ? 'is-open' : ''
                            }`}
                        id="navigation-projects-panel"
                        aria-hidden={!isProjectsOpen}
                        inert={!isProjectsOpen}
                    >
                        <div className="navigation-projects-grid">
                            {projectGroups.map((project) => (
                                <div
                                    className="navigation-project-card"
                                    key={project.title}
                                >
                                    {project.domain && <span className="navigation-project-domain">{project.domain} · Planned</span>}
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>

                                    <Link
                                        to={project.path}
                                        className="navigation-project-link"
                                        onClick={closeAllDropdowns}
                                    >
                                        <span>View project</span>

                                        <ArrowRight
                                            size={14}
                                            strokeWidth={1.8}
                                            aria-hidden="true"
                                        />
                                    </Link>
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
                                <span>Go to GitHub</span>

                            </a>

                            <a
                                href="#projects"
                                className="navigation-project-action navigation-project-action-primary"
                                onClick={closeAllDropdowns}
                            >
                                <span>View Projects</span>

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
                                                href={link.disabled ? undefined : link.url}
                                                target={
                                                    !link.disabled && link.url.startsWith('http')
                                                        ? '_blank'
                                                        : undefined
                                                }
                                                rel={
                                                    !link.disabled && link.url.startsWith('http')
                                                        ? 'noopener noreferrer'
                                                        : undefined
                                                }
                                                className={link.disabled ? 'is-disabled' : ''}
                                                aria-disabled={link.disabled || undefined}
                                                onClick={
                                                    link.disabled
                                                        ? (event) => event.preventDefault()
                                                        : closeAllDropdowns
                                                }
                                            >
                                                <span>{link.name}</span>

                                                {!link.disabled && (
                                                    <ArrowRight
                                                        size={13}
                                                        strokeWidth={1.8}
                                                        aria-hidden="true"
                                                    />
                                                )}
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

                        <a
                            className="navigation-cv"
                            href="/cv"
                        >
                            View CV
                        </a>
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
                            <p>
                                Have a project, idea, or opportunity in mind?
                            </p>
                        </div>

                        <form
                            ref={formRef}
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
                                        ref={nameRef}
                                        id="chat-name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        autoComplete="name"
                                        className={invalidFields.name ? 'is-invalid' : ''}
                                        required
                                    />
                                </div>

                                <div className="chat-form-field">
                                    <label htmlFor="chat-email">
                                        Email
                                    </label>

                                    <input
                                        ref={emailRef}
                                        id="chat-email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        autoComplete="email"
                                        className={invalidFields.email ? 'is-invalid' : ''}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="chat-form-field">
                                <label htmlFor="chat-subject">
                                    Subject
                                </label>

                                <input
                                    ref={subjectRef}
                                    id="chat-subject"
                                    name="subject"
                                    type="text"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className={invalidFields.subject ? 'is-invalid' : ''}
                                    required
                                />
                            </div>

                            <div className="chat-form-field">
                                <label htmlFor="chat-message">
                                    Message
                                </label>

                                <textarea
                                    ref={messageRef}
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
                                    disabled={!formData.message.trim() || sending}
                                >
                                    {sending ? 'Sending...' : 'Send'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* toast */}
            {showSuccess && (
                <div
                    className={`chat-form-success ${toastExiting ? 'is-exiting' : ''}`}
                    role="status"
                    aria-live="polite"
                >
                    <div className="chat-form-success-icon">
                        <Check
                            size={17}
                            strokeWidth={2.2}
                            aria-hidden="true"
                        />
                    </div>

                    <span className="chat-form-success-text">
                        Message sent successfully.
                    </span>
                </div>
            )}
        </>
    );
}

export default Header;