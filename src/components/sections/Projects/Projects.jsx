import { useState } from 'react';
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

// row 2 imports 
// import microsoftAzure from '../../../assets/images/custom-projects/microsoft-azure.png';
import ollamaImage from '../../../assets/images/custom-projects/ollama.png';
import claudeImage from '../../../assets/images/custom-projects/claude.png';
import microsoftCover from '../../../assets/projects/microsoft/microsoft.png';

// row 3 imports
import huggingFace from '../../../assets/images/custom-projects/hugging-face.png';
import duckDBImage from '../../../assets/images/custom-projects/duckDB.png';
//import enterpriseCover from '../../../assets/images/custom-projects/1.png';

// row 4 imports
import liblabImage from '../../../assets/images/custom-projects/liblab-api.png';
import octoImage from '../../../assets/images/custom-projects/octokit.png';
import openAIImage from '../../../assets/images/custom-projects/openAI.png';

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
    {
        id: 'azure-ai',
        title: 'Microsoft Azure AI Project',
        skill: 'Azure AI Engineering',
        description:
            'Placeholder description for a Microsoft Azure AI project integrating cloud-based AI services, application architecture and intelligent workloads.',
        image: microsoftCover,
    },

    {
        id: 'ollama-agent',
        title: 'Ollama AI Agent',
        skill: 'Local AI Engineering',
        description:
            'Placeholder description for a local AI agent application using Ollama, model inference and application-level agent orchestration.',
        image: ollamaImage,
        background: 'var(--surface)',
        imageMode: 'centered',
    },

    {
        id: 'claude-engineering',
        title: 'Claude AI Engineering',
        skill: 'LLM Application Engineering',
        description:
            'Placeholder description for an AI engineering project using Claude, structured context, application logic and LLM-driven workflows.',
        image: claudeImage,
        background: '#eb7e5d',
        imageMode: 'centered',
    },

    {
        id: 'hugging-face',
        title: 'Hugging Face AI Project',
        skill: 'AI Model Engineering',
        description:
            'Placeholder description for an AI project integrating Hugging Face models, inference workflows and application-level AI engineering.',
        image: huggingFace,
        background: '#f4c13e',
        imageMode: 'centered',
    },

    {
        id: 'aws-project',
        title: 'AWS AI Project',
        skill: 'AWS Cloud Engineering',
        description:
            'Placeholder description for an AWS project integrating cloud services, AI workloads and scalable application infrastructure.',
        image: null,
    },

    {
        id: 'google-cloud',
        title: 'Google Cloud AI Project',
        skill: 'Google Cloud Engineering',
        description:
            'Placeholder description for a Google Cloud project integrating cloud infrastructure, AI services and application-level engineering.',
        image: null,
        background: 'var(--surface)',
        imageMode: 'centered',
    },
    
    {
        id: 'n8n',
        title: 'Jop-Specific Project',
        skill: 'Workflow Orchestration',
        description:
            'Placeholder description for an event-driven automation project integrating workflows, APIs, webhooks and service orchestration.',
        image: null,
        background: 'var(--charcoal)',
        imageMode: 'centered',
    },

    {
        id: 'liblab-postman',
        title: 'Job-Specific Project',
        skill: 'API Development',
        description:
            'Placeholder description for an API engineering project combining SDK generation, API documentation, testing and developer tooling.',
        image: null,
        background: 'var(--surface)',
        imageMode: 'centered',
    },

    {
        id: 'typesafe-ai',
        title: 'Job-Specific Project',
        skill: 'AI Engineering',
        description:
            'Placeholder description for an AI engineering project exploring model evaluation, structured outputs and reliable AI-assisted development workflows.',
        image: null,
        background: '#ed899d',
        imageMode: 'centered',
    },
    
];

function Projects() {
    const [activeProject, setActiveProject] = useState(
        'productivity-platform'
    );

    const [showAllProjects, setShowAllProjects] = useState(false);

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
                                            onMouseEnter={() =>
                                                setActiveProject(project.id)
                                            }
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

                                            <a
                                                className="project-arrow"
                                                href={`/projects/${project.id}`}
                                                aria-label={`View ${project.title}`}
                                            >
                                                <ArrowRight
                                                    size={18}
                                                    strokeWidth={1.7}
                                                    aria-hidden="true"
                                                />
                                            </a>

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
                        setShowAllProjects((current) => !current)
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