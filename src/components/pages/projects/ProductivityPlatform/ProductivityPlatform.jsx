import {
    ArrowLeft,
    ArrowRight,
    ExternalLink,
} from 'lucide-react';

import './ProductivityPlatform.css';

function ProductivityPlatform() {
    return (
        <main className="productivity-project">

            {/* Back to portfolio */}

            <a
                className="productivity-project-back"
                href="/"
            >
                <ArrowLeft
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden="true"
                />

                <span>Back to Portfolio</span>
            </a>


            {/* Hero */}

            <section className="productivity-project-hero">

                <div className="productivity-project-hero-inner">

                    <div className="productivity-project-meta">
                        <span>Full-Stack Engineering</span>
                        <span>Productivity Platform</span>
                    </div>

                    <h1>
                        Productivity
                        <br />
                        Platform
                    </h1>

                    <div className="productivity-project-hero-bottom">

                        <p>
                            A fully integrated productivity platform bringing
                            tasks, projects, goals, reminders, notes, folders
                            and calendar functionality together through a
                            unified full-stack application.
                        </p>

                        <div className="productivity-project-actions">

                            <a
                                className="productivity-project-button productivity-project-button-primary"
                                href="#"
                            >
                                View Project

                                <ExternalLink
                                    size={15}
                                    strokeWidth={1.7}
                                    aria-hidden="true"
                                />
                            </a>

                            <a
                                className="productivity-project-button productivity-project-button-secondary"
                                href="#"
                            >
                                GitHub

                            </a>

                        </div>

                    </div>

                </div>

            </section>


            {/* Three-image showcase */}

            <section className="productivity-project-gallery">

                <div className="productivity-project-gallery-header">
                    <span>(01)</span>
                    <span>Application interface</span>
                </div>

                <div className="productivity-project-gallery-grid">

                    <div className="productivity-project-image">
                        <div className="productivity-project-placeholder">
                            <span>Project image</span>
                        </div>
                    </div>

                    <div className="productivity-project-image">
                        <div className="productivity-project-placeholder">
                            <span>Project image</span>
                        </div>
                    </div>

                    <div className="productivity-project-image">
                        <div className="productivity-project-placeholder">
                            <span>Project image</span>
                        </div>
                    </div>

                </div>

            </section>


            {/* Overview */}

            <section className="productivity-project-overview">

                <div className="productivity-project-overview-number">
                    (02)
                </div>

                <div className="productivity-project-overview-content">

                    <p className="productivity-project-overview-lead">
                        One application. Multiple interconnected systems.
                    </p>

                    <div className="productivity-project-overview-columns">

                        <p>
                            The Productivity Platform was built as a complete
                            software system rather than a collection of
                            isolated features. Tasks, projects, goals,
                            reminders, notes and calendar functionality all
                            operate within the same authenticated environment.
                        </p>

                        <p>
                            The project required consideration across the
                            entire stack, from interface design and state
                            management through REST APIs, authentication,
                            database modelling, validation and deployment.
                        </p>

                    </div>

                </div>

            </section>


            {/* Video showcase one */}

            <section className="productivity-project-video-section">

                <div className="productivity-project-video-heading">

                    <div>
                        <span>(03)</span>
                        <span>Frontend architecture</span>
                    </div>

                    <h2>
                        A single interface for
                        an interconnected workspace.
                    </h2>

                    <p>
                        The frontend brings multiple productivity workflows
                        into a consistent application experience, with
                        reusable components, protected routes, responsive
                        layouts and state-driven interactions.
                    </p>

                </div>

                <div className="productivity-project-video">

                    <div className="productivity-project-video-placeholder">
                        <span>Video</span>
                    </div>

                </div>

            </section>


            {/* Video showcase two */}

            <section className="productivity-project-video-section productivity-project-video-section-secondary">

                <div className="productivity-project-video">

                    <div className="productivity-project-video-placeholder">
                        <span>Video</span>
                    </div>

                </div>

                <div className="productivity-project-video-heading">

                    <div>
                        <span>(04)</span>
                        <span>Backend &amp; data architecture</span>
                    </div>

                    <h2>
                        Persistent data,
                        authentication and APIs.
                    </h2>

                    <p>
                        A Node.js and Express backend provides the application
                        API, with MongoDB and Mongoose handling persistent
                        application data. JWT authentication and protected
                        routes connect the user's session to their workspace.
                    </p>

                </div>

            </section>


            {/* Engineering */}

            <section className="productivity-project-engineering">

                <div className="productivity-project-engineering-header">

                    <div>
                        <span>(05)</span>
                        <span>Engineering</span>
                    </div>

                    <h2>
                        Built across the
                        full application stack.
                    </h2>

                </div>

                <div className="productivity-project-engineering-grid">

                    <div className="productivity-project-engineering-card">
                        <span>01</span>

                        <h3>Frontend</h3>

                        <p>
                            React, Vite, React Router, responsive UI,
                            component architecture and application state.
                        </p>
                    </div>

                    <div className="productivity-project-engineering-card">
                        <span>02</span>

                        <h3>Backend</h3>

                        <p>
                            Node.js, Express, REST APIs, middleware,
                            validation and protected server routes.
                        </p>
                    </div>

                    <div className="productivity-project-engineering-card">
                        <span>03</span>

                        <h3>Database</h3>

                        <p>
                            MongoDB, MongoDB Atlas and Mongoose schemas
                            supporting interconnected application data.
                        </p>
                    </div>

                    <div className="productivity-project-engineering-card">
                        <span>04</span>

                        <h3>Authentication</h3>

                        <p>
                            JWT-based authentication, password hashing,
                            protected routes and user-specific data.
                        </p>
                    </div>

                    <div className="productivity-project-engineering-card">
                        <span>05</span>

                        <h3>Deployment</h3>

                        <p>
                            GitHub-based development with production
                            deployment across modern cloud platforms.
                        </p>
                    </div>

                    <div className="productivity-project-engineering-card">
                        <span>06</span>

                        <h3>Product &amp; UX</h3>

                        <p>
                            Information architecture, interaction design,
                            responsive behaviour and cohesive product
                            experience.
                        </p>
                    </div>

                </div>

            </section>


            {/* Technology stack */}

            <section className="productivity-project-stack">

                <div className="productivity-project-stack-label">
                    <span>(06)</span>
                    <span>Technology</span>
                </div>

                <div className="productivity-project-stack-content">

                    <h2>
                        The stack behind the platform.
                    </h2>

                    <div className="productivity-project-stack-list">

                        <div>
                            <span>Frontend</span>

                            <p>
                                React · Vite · React Router · JavaScript ·
                                HTML · CSS · Bootstrap · Lucide React
                            </p>
                        </div>

                        <div>
                            <span>Backend</span>

                            <p>
                                Node.js · Express · REST APIs · JWT ·
                                bcrypt
                            </p>
                        </div>

                        <div>
                            <span>Data</span>

                            <p>
                                MongoDB · MongoDB Atlas · Mongoose
                            </p>
                        </div>

                        <div>
                            <span>Development</span>

                            <p>
                                Git · GitHub · GitHub Actions · npm
                            </p>
                        </div>

                        <div>
                            <span>Deployment</span>

                            <p>
                                Vercel · Render
                            </p>
                        </div>

                        <div>
                            <span>Engineering</span>

                            <p>
                                Full-stack architecture · Authentication ·
                                API design · Responsive development
                            </p>
                        </div>

                    </div>

                </div>

            </section>


            {/* Closing */}

            <section className="productivity-project-closing">

                <div className="productivity-project-closing-inner">

                    <span>(07)</span>

                    <p>
                        A full-stack product built to bring an entire
                        productivity workflow into one connected system.
                    </p>

                    <a
                        className="productivity-project-closing-button"
                        href="/"
                    >
                        Back to Portfolio

                        <ArrowRight
                            size={16}
                            strokeWidth={1.7}
                            aria-hidden="true"
                        />
                    </a>

                </div>

            </section>

        </main>
    );
}

export default ProductivityPlatform;