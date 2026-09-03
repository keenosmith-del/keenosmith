import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

import './Projects.css';

import aiAssistantCover from '../../../assets/projects/ai/1.png';

const projects = [
    {
        id: 'ai-assistant',
        title: 'AI Model',
        skill: 'Generative AI',
        description:
            'A Generative AI application exploring LLM integration, prompt engineering, Retrieval-Augmented Generation and the architecture of intelligent, context-aware software systems.',
        image: aiAssistantCover,
    },
    {
        id: 'productivity-platform',
        title: 'Productivity Platform',
        skill: 'Full-stack architecture',
        description:
            'A full-stack productivity platform bringing tasks, projects, goals, reminders, notes and calendar functionality into one cohesive application.',
    },
    {
        id: 'music-api',
        title: 'Music API Web App',
        skill: 'API & backend development',
        description:
            'A full-stack music application combining discovery, playback, queue management and API-driven backend architecture.',
    },
];

function Projects() {
    const [activeProject, setActiveProject] = useState(
        'productivity-platform'
    );

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

                    <ArrowRight
                        size={16}
                        strokeWidth={1.7}
                        aria-hidden="true"
                    />

                </a>

                <h2>Selected projects</h2>

                <p>
                    A selection of full-stack applications spanning modern web
                    development, APIs, databases, AI integration and
                    product-focused software architecture.
                </p>
            </div>

            <div className="projects-featured">
                {projects.map((project) => {
                    const isActive = activeProject === project.id;

                    return (
                        <article
                            key={project.id}
                            className={`project-tile ${isActive ? 'is-active' : ''
                                }`}
                            onMouseEnter={() =>
                                setActiveProject(project.id)
                            }
                        >
                            <div className="project-image">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={`${project.title} project`}
                                    />
                                ) : (
                                    <div className="project-image-placeholder">
                                        <span>Project image</span>
                                    </div>
                                )}
                            </div>

                            <div className="project-overlay" />

                            <div className="project-badge">
                                {project.skill}
                            </div>

                            <div className="project-content">
                                <h3>{project.title}</h3>

                                <p>{project.description}</p>
                            </div>

                            <a
                                className="project-arrow"
                                href={`/projects/${project.id}`}
                                aria-label={`View ${project.title}`}
                            >
                                <ArrowRight
                                    size={20}
                                    strokeWidth={1.7}
                                    aria-hidden="true"
                                />
                            </a>
                        </article>
                    );
                })}
            </div>

            <article className="project-tile project-tile-wide is-active">
                <div className="project-image">
                    <div className="project-image-placeholder">
                        <span>Project image</span>
                    </div>
                </div>

                <div className="project-overlay" />

                <div className="project-badge">
                    Enterprise application architecture
                </div>

                <div className="project-content">
                    <h3>Enterprise Workspace</h3>

                    <p>
                        A structured enterprise workspace built with modern
                        frontend architecture, a Node.js backend and
                        PostgreSQL data management through Prisma.
                    </p>
                </div>

                <a
                    className="project-arrow"
                    href="/projects/enterprise-workspace"
                    aria-label="View Enterprise Workspace"
                >
                    <ArrowRight
                        size={20}
                        strokeWidth={1.7}
                        aria-hidden="true"
                    />
                </a>
            </article>
        </section>
    );
}

export default Projects;