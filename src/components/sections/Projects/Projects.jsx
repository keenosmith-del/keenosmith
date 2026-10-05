import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectConcepts } from '../../../data/projectConcepts.js';
import {
    ArrowRight,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';

import './Projects.css';

// row 1 imports
import aiAssistantCover from '../../../assets/projects/ai/1.png';
import productivityCover from '../../../assets/projects/productivity/1.png'
import musicCover from '../../../assets/projects/music/1.png';

const projects = [
    {
        id: 'ai-assistant',
        title: 'Retrieval-Augmented AI Model',
        skill: 'RAG',
        description:
            'A full-stack SaaS platform implementing LLM inference, semantic embeddings, vector similarity retrieval, document processing and configurable context workflows.',
        image: aiAssistantCover,
    },
    {
        id: 'productivity-platform',

        title: 'Authenticated MERN Platform',

        skill: 'Full-Stack Architecture',

        description:
            'A full-stack web application implementing authenticated resource management, REST APIs, interconnected data modelling and persistent client-server state.',

        image: productivityCover,


    },

    {
        id: 'music-api',
        title: 'Music API-Driven Web App',
        skill: 'API & Full-Stack Engineering',
        description:
            'Full-stack React, Node.js, Express and MongoDB application implementing REST APIs, external service integration, data persistence and browser-based audio playback.',
        image: musicCover,
    },
    ...[
        ['microsoft-devops', 'Microsoft Azure AI', 'Azure AI Engineering', null, null],
        ['ollama', 'Ollama BI', 'Local AI Engineering', 'var(--surface)', 'centered'],
        ['claude', 'Claude-Operated AI Procurement', 'LLM Application Engineering', '#eb7e5d', 'centered'],
        ['hugging-face', 'Hugging Face AI Insurance Claims', 'AI Model Engineering', '#f4c13e', 'centered'],
        ['banking-risk', 'AWS Intelligent Banking & Payment Risk', 'AWS Cloud Engineering', null, null],
        ['vertex-ai-retail', 'Google Cloud Intelligent Retail & Supply Chain', 'Google Cloud Engineering', 'var(--surface)', 'centered'],
        ['distributed-reliability', 'Chaos Engineering & Disaster Recovery', 'SRE & Reliability Engineering', 'var(--charcoal)', 'centered'],
        ['deepseek', 'HR Workforce Planning', 'AI & Talent Intelligence', 'var(--surface)', 'centered'],
        ['telecom-billing', 'Telecommunications Billing & Subscriptions', 'Enterprise Billing Systems', '#ed899d', 'centered'],
        ['fleet-operations', 'Real-Time Logistics', 'Real-Time Streaming & Logistics', null, null],
        ['field-service', 'Field Service & Asset Maintenance', 'Mobile & Field Operations', null, null],
        ['n8n', 'n8n OpsFlow', 'Workflow & Integration Engineering', null, null],
    ].map(([id, title, skill, background, imageMode]) => ({
        id, title, skill, background, imageMode, image: null,
        description: projectConcepts.find(project => project.id === id).description,
    })),
];

function Projects() {
    const [activeProject, setActiveProject] = useState(
        'productivity-platform'
    );

    const [showAllProjects, setShowAllProjects] = useState(() => {
        try { return sessionStorage.getItem('portfolio.projectsExpanded') === 'true'; }
        catch { return false; }
    });

    return (
        <section className="projects" id="projects">
            <div className="projects-intro">
                <a
                    className="projects-button"
                    href="https://github.com/keenosmith-del"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    All Projects

                </a>

                <h2>Selected projects</h2>

                <p>
                    A selection of full-stack applications spanning modern web
                    development, APIs, databases, AI integration and
                    product-focused software architecture.
                </p>
            </div>

            <div className="projects-featured">

                {Array.from(
                    {
                        length: showAllProjects
                            ? Math.ceil(projects.length / 3)
                            : Math.min(2, Math.ceil(projects.length / 3)),
                    },
                    (_, rowIndex) => (
                        <div className="project-row" key={rowIndex}>

                            {projects
                                .slice(rowIndex * 3, rowIndex * 3 + 3)
                                .map((project) => {
                                    const isActive = activeProject === project.id;

                                    return (
                                        <article
                                            key={project.id}
                                            className={`project-tile ${isActive ? 'is-active' : ''
                                                } ${project.imageMode === 'centered'
                                                    ? 'project-tile-centered'
                                                    : ''
                                                }`}
                                            style={{
                                                background:
                                                    project.background || 'transparent',
                                            }}
                                            onMouseEnter={() => setActiveProject(project.id)}
                                        >
                                            <div className="project-image">

                                                {project.image ? (
                                                    <img
                                                        src={project.image}
                                                        alt={`${project.title} project`}
                                                        className={
                                                            project.imageMode === 'centered'
                                                                ? 'project-image-centered'
                                                                : ''
                                                        }
                                                    />
                                                ) : null}

                                            </div>

                                            <div className="project-overlay" />

                                            <div className="project-badge">
                                                {project.skill}
                                            </div>

                                            <div className="project-content">

                                                <h3>
                                                    {project.title}
                                                </h3>

                                                <p>
                                                    {project.description}
                                                </p>

                                            </div>

                                            <Link
                                                className="project-arrow"
                                                to={`/projects/${project.id}`}
                                                aria-label={`View ${project.title}`}
                                            >
                                                <ArrowRight
                                                    size={18}
                                                    strokeWidth={1.7}
                                                    aria-hidden="true"
                                                />
                                            </Link>

                                        </article>
                                    );
                                })}

                        </div>
                    )
                )}

            </div>

            {projects.length > 6 && (
                <button
                    type="button"
                    className="projects-expand"
                    onClick={() =>
                        setShowAllProjects((current) => {
                            const expanded = !current;
                            try { sessionStorage.setItem('portfolio.projectsExpanded', String(expanded)); }
                            catch { /* Expansion still works without browser storage. */ }
                            return expanded;
                        })
                    }
                    aria-expanded={showAllProjects}
                >
                    <span>
                        {showAllProjects ? 'Show Less' : 'Show More'}
                    </span>

                    {showAllProjects ? (
                        <ChevronUp
                            size={15}
                            strokeWidth={1.7}
                            aria-hidden="true"
                        />
                    ) : (
                        <ChevronDown
                            size={15}
                            strokeWidth={1.7}
                            aria-hidden="true"
                        />
                    )}
                </button>
            )}

        </section>
    );
}

export default Projects;