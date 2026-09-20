import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

import './Projects.css';

import aiAssistantCover from '../../../assets/projects/ai/1.png';
import productivityCover from '../../../assets/projects/productivity/1.png'
import musicCover from '../../../assets/projects/music/1.png'
// import enterpriseCover from '../../../assets/projects/enterprise/1.png'

import awsProjects from '../../../assets/images/about/awsProjects.jpg';
import microsoftProjects from '../../../assets/images/about/microsoftProjects.jpg';

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

                </a>

                <h2>Selected projects</h2>

                <p>
                    A selection of full-stack applications spanning modern web
                    development, APIs, databases, AI integration and
                    product-focused software architecture.
                </p>
            </div>

            <div className="projects-featured">

                {/* =====================================================
                   TOP ROW — FEATURED PROJECTS
                   ===================================================== */}

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



            {/* =========================================================
               SECOND PROJECT ROW
               ========================================================= */}

            {/*
            <div className="projects-secondary">


                <article className="project-tile project-secondary-tile project-secondary-image">

                    <div className="project-secondary-visual">

                        <img
                            src={microsoftProjects}
                            alt="Microsoft AI"
                        />

                    </div>

                    <a
                        className="project-arrow"
                        href="/projects/microsoft"
                        aria-label="View Microsoft AI project"
                    >
                        <ArrowRight
                            size={18}
                            strokeWidth={1.7}
                            aria-hidden="true"
                        />
                    </a>

                </article>

                <article className="project-tile project-secondary-tile project-secondary-image">

                    <div className="project-secondary-visual">

                        <img
                            src={awsProjects}
                            alt="AWS AI"
                        />

                    </div>

                    <a
                        className="project-arrow"
                        href="/projects/aws"
                        aria-label="View AWS AI project"
                    >
                        <ArrowRight
                            size={18}
                            strokeWidth={1.7}
                            aria-hidden="true"
                        />
                    </a>

                </article>

                <article className="project-tile project-secondary-tile project-tile-enterprise is-active">

                    <div className="project-enterprise-badges">

                        <span className="project-badge">
                            PostgreSQL
                        </span>

                        <span className="project-badge">
                            Prisma ORM
                        </span>

                        <span className="project-badge">
                            Runtime DDL
                        </span>

                    </div>

                    <div className="project-content">

                        <h3>
                            Enterprise SQL Database
                        </h3>

                        <p>
                            A full-stack enterprise workspace built around
                            structured application architecture, relational
                            data modelling and scalable backend services.
                            The project combines React, Node.js, PostgreSQL
                            and Prisma to explore robust data-driven
                            application design.
                        </p>

                    </div>

                    <a
                        className="project-arrow"
                        href="/projects/enterprise-workspace"
                        aria-label="View Enterprise Workspace"
                    >
                        <ArrowRight
                            size={18}
                            strokeWidth={1.7}
                            aria-hidden="true"
                        />
                    </a>

                </article>

            </div>
            */}


        </section>
    );
}

export default Projects;