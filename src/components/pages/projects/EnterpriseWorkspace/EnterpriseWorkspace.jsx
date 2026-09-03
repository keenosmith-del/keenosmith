import {
    ArrowLeft,
    ArrowRight,
    ExternalLink,
} from 'lucide-react';

import './EnterpriseWorkspace.css';

function EnterpriseWorkspace() {
    return (
        <main className="enterprise-project">

            {/* Back to portfolio */}

            <a
                className="enterprise-project-back"
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

            <section className="enterprise-project-hero">

                <div className="enterprise-project-hero-inner">

                    <div className="enterprise-project-meta">
                        <span>Enterprise Application</span>
                        <span>SQL &amp; Data Architecture</span>
                    </div>

                    <h1>
                        Enterprise
                        <br />
                        Workspace
                    </h1>

                    <div className="enterprise-project-hero-bottom">

                        <p>
                            A SQL-focused enterprise workspace exploring
                            relational data modelling, structured backend
                            architecture and full-stack application
                            development with PostgreSQL and Prisma.
                        </p>

                        <div className="enterprise-project-actions">

                            <a
                                className="enterprise-project-button enterprise-project-button-primary"
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
                                className="enterprise-project-button enterprise-project-button-secondary"
                                href="#"
                            >
                                GitHub

                            </a>

                        </div>

                    </div>

                </div>

            </section>


            {/* Two-image showcase */}

            <section className="enterprise-project-images">

                <div className="enterprise-project-image enterprise-project-image-large">
                    <div className="enterprise-project-placeholder">
                        <span>Project image</span>
                    </div>
                </div>

                <div className="enterprise-project-image enterprise-project-image-small">
                    <div className="enterprise-project-placeholder">
                        <span>Project image</span>
                    </div>
                </div>

            </section>


            {/* SQL focus */}

            <section className="enterprise-project-sql">

                <div className="enterprise-project-sql-intro">

                    <div className="enterprise-project-section-label">
                        <span>(01)</span>
                        <span>SQL &amp; relational architecture</span>
                    </div>

                    <h2>
                        The database is
                        central to the system.
                    </h2>

                </div>

                <div className="enterprise-project-sql-content">

                    <p>
                        This project focuses specifically on relational
                        application architecture, using PostgreSQL as the
                        primary data layer and Prisma as the ORM.
                    </p>

                    <p>
                        The emphasis is on structured schemas, relationships,
                        queries and the way persistent data informs the
                        architecture of the application above it.
                    </p>

                    <div className="enterprise-project-sql-pills">

                        <span>PostgreSQL</span>
                        <span>SQL</span>
                        <span>Prisma</span>
                        <span>Relational data</span>
                        <span>Data modelling</span>
                        <span>Database queries</span>
                        <span>ORM</span>

                    </div>

                </div>

            </section>


            {/* Video */}

            <section className="enterprise-project-video">

                <div className="enterprise-project-video-copy">

                    <div className="enterprise-project-section-label">
                        <span>(02)</span>
                        <span>Application architecture</span>
                    </div>

                    <h2>
                        Connecting the database
                        to the application layer.
                    </h2>

                    <p>
                        The project demonstrates how a relational database,
                        backend services and frontend interfaces work
                        together as a complete application rather than
                        existing as independent technical layers.
                    </p>

                    <div className="enterprise-project-video-pills">

                        <span>React</span>
                        <span>Vite</span>
                        <span>Node.js</span>
                        <span>Express</span>
                        <span>PostgreSQL</span>
                        <span>Prisma</span>

                    </div>

                </div>

                <div className="enterprise-project-video-media">

                    <div className="enterprise-project-video-placeholder">
                        <span>Video</span>
                    </div>

                </div>

            </section>


            {/* Technical stack */}

            <section className="enterprise-project-stack">

                <div className="enterprise-project-section-label">
                    <span>(03)</span>
                    <span>Technology</span>
                </div>

                <div className="enterprise-project-stack-content">

                    <h2>
                        A focused full-stack
                        enterprise stack.
                    </h2>

                    <div className="enterprise-project-stack-list">

                        <div>
                            <span>Frontend</span>

                            <p>
                                React · Vite · JavaScript · HTML · CSS ·
                                React Router · Responsive development
                            </p>
                        </div>

                        <div>
                            <span>Backend</span>

                            <p>
                                Node.js · Express · REST APIs · Server-side
                                application architecture
                            </p>
                        </div>

                        <div>
                            <span>Database</span>

                            <p>
                                PostgreSQL · SQL · Prisma ORM · Relational
                                data modelling · Queries · Relationships
                            </p>
                        </div>

                        <div>
                            <span>Engineering</span>

                            <p>
                                Full-stack architecture · API integration ·
                                Data-driven application design · Git · GitHub
                            </p>
                        </div>

                    </div>

                </div>

            </section>


            {/* Closing */}

            <section className="enterprise-project-closing">

                <div className="enterprise-project-closing-inner">

                    <span>(04)</span>

                    <p>
                        A focused exploration of SQL, relational data and
                        enterprise-oriented full-stack architecture.
                    </p>

                    <a
                        className="enterprise-project-closing-button"
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

export default EnterpriseWorkspace;