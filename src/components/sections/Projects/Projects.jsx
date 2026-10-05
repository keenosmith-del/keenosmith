import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    ChevronDown,
    ChevronUp,
} from 'lucide-react';

import './Projects.css';

import { featuredProjects as projects } from '../../../data/featuredProjects.js';

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