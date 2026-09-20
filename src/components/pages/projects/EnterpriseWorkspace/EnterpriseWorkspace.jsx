import {
    ArrowLeft,
    ArrowUp,
} from 'lucide-react';

import { useEffect, useState } from 'react';

import './EnterpriseWorkspace.css';

// Introductory video
import enterpriseVideo6 from '../../../../assets/projects/enterprise/videos/preview_enterprise_6.mp4';

// First two images
import enterpriseImage1 from '../../../../assets/projects/enterprise/2.png';
import enterpriseImage2 from '../../../../assets/projects/enterprise/3.png';

// First video
import enterpriseVideo1 from '../../../../assets/projects/enterprise/videos/preview_enterprise_1.mp4';

// Second two images
import enterpriseImage3 from '../../../../assets/projects/enterprise/4.png';
import enterpriseImage4 from '../../../../assets/projects/enterprise/5.png';

// Second video
import enterpriseVideo2 from '../../../../assets/projects/enterprise/videos/preview_enterprise_2.mp4';

// Third video
import enterpriseVideo3 from '../../../../assets/projects/enterprise/videos/preview_enterprise_3.mp4';

// Fourth video
import enterpriseVideo4 from '../../../../assets/projects/enterprise/videos/preview_enterprise_4.mp4';

// Last two images
import enterpriseImage5 from '../../../../assets/projects/enterprise/6.png';
import enterpriseImage6 from '../../../../assets/projects/enterprise/7.png';


function EnterpriseWorkspace() {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

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
                        <span>PostgreSQL</span>
                        <span>SQL</span>
                        <span>Prisma ORM</span>
                        <span>Runtime DDL</span>
                        <span>Relational Modelling</span>
                        <span>Schema Management</span>
                        <span>REST APIs</span>
                    </div>

                    {/* TECHNICAL TITLE */}
                    <h1>
                        Enterprise
                        <br />
                        Workspace
                    </h1>

                    <div className="enterprise-project-hero-bottom">

                        {/* TECHNICAL DESCRIPTION */}
                        <p>
                            A full-stack database management platform built with PostgreSQL,
                            SQL and Prisma, supporting relational data management, Runtime Schema Management,
                            database constraints,
                            dynamic records and SQL query execution through a browser-based workspace.
                        </p>

                        <div className="enterprise-project-actions">

                            <a
                                className="enterprise-project-button enterprise-project-button-primary"
                                target="_blank"
                                rel="noreferrer"
                                href="https://enterprise-workspace-liard.vercel.app/"
                            >
                                Go to Site
                            </a>

                            <a
                                className="enterprise-project-button enterprise-project-button-secondary"
                                href="https://github.com/keenosmith-del/enterprise-workspace"
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub Repo
                            </a>

                        </div>

                    </div>

                </div>

            </section>

            {/* Introductory application overview */}

            <section className="enterprise-project-intro">

                <div className="enterprise-project-intro-inner">

                    <div className="enterprise-project-section-label">
                        <span></span>
                        <span>Database architecture</span>
                    </div>

                    <div className="enterprise-project-intro-copy">

                        <h2>
                            PostgreSQL database
                            management and runtime schema operations.
                        </h2>

                        <p>
                            The platform combines PostgreSQL, SQL and Prisma to manage
                            relational data and database structures through application
                            workflows. The backend operates across both application-data
                            and database-definition levels, supporting Runtime DDL,
                            relational constraints, dynamic records, and SQL query
                            execution.
                        </p>

                    </div>

                    <div className="enterprise-project-intro-video">

                        <video
                            src={enterpriseVideo6}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-label="Enterprise Workspace database management overview"
                        />

                    </div>

                </div>

            </section>

            {/* SQL focus */}
            <section className="enterprise-project-sql">

                <div className="enterprise-project-sql-intro">

                    <div className="enterprise-project-section-label">
                        <span></span>
                        <span>Runtime schema management</span>
                    </div>

                    <h2>
                        Database structures
                        can evolve at runtime.
                    </h2>

                </div>

                <div className="enterprise-project-sql-content">

                    <p>
                        Table and column definitions are represented as application-level
                        schema models and validated before changes are applied to the
                        underlying database structure.
                    </p>

                    <p>
                        The schema engine generates and executes DDL for table creation,
                        column changes, constraints, defaults, relationships and data-type
                        changes, with transactional operations maintaining consistency
                        between physical structures and workspace metadata.
                    </p>

                    <div className="enterprise-project-sql-pills">
                        <span>Runtime DDL</span>
                        <span>Schema Evolution</span>
                        <span>Constraint Engineering</span>
                        <span>Foreign Keys</span>
                        <span>Primary Keys</span>
                        <span>Data Types</span>
                        <span>Metadata Synchronisation</span>
                    </div>

                </div>

            </section>


            {/* Application walkthrough */}


            <section className="enterprise-project-feature enterprise-project-feature-light">

                <div className="enterprise-project-feature-inner">

                    <div className="enterprise-project-feature-copy">

                        <div className="enterprise-project-section-label">
                            <span></span>
                            <span>Data management</span>
                        </div>

                        <h2>
                            Dynamic record management.
                        </h2>

                        <p>
                            Record operations are generated from each table's column definitions, supporting create, read, update and delete workflows with type-specific inputs. Data can be searched, filtered by column conditions, sorted, selected, edited and deleted directly within the workspace.
                        </p>

                        <div className="enterprise-project-video-pills">
                            <span>Dynamic Records</span>
                            <span>CRUD Operations</span>
                            <span>Data Filtering</span>
                            <span>Data Sorting</span>
                            <span>Schema-Driven Forms</span>
                        </div>

                    </div>

                    <div className="enterprise-project-feature-video">

                        <video
                            src={enterpriseVideo1}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-label="Enterprise Workspace data management"
                        />

                    </div>

                </div>

            </section>


            {/* Technology */}

            <section className="enterprise-project-stack">

                <div className="enterprise-project-stack-inner">

                    <div className="enterprise-project-section-label">
                        <span></span>
                        <span>Application engineering</span>
                    </div>

                    <div className="enterprise-project-stack-content">

                        <h2>
                            Application architecture
                            around the data layer.
                        </h2>

                        <div className="enterprise-project-stack-list">

                            <div>
                                <span>API Architecture</span>

                                <p>
                                    Express Routers · Controllers · REST endpoints ·
                                    Resource services · Centralised API client ·
                                    Environment-based API configuration
                                </p>
                            </div>

                            <div>
                                <span>Application State</span>

                                <p>
                                    Centralised resource state · Concurrent data loading ·
                                    Failure-tolerant asynchronous operations · State
                                    reconciliation · Persistent workspace navigation
                                </p>
                            </div>

                            <div>
                                <span>Database Interface</span>

                                <p>
                                    Table workspace · Query interface · Query Builder ·
                                    Query History · Relationships · Schema editor ·
                                    Dynamic record forms
                                </p>
                            </div>

                            <div>
                                <span>Workspace Interaction</span>

                                <p>
                                    <code>@dnd-kit</code> · <code>react-rnd</code> ·
                                    Drag-and-drop · Sortable tables · Resizable elements ·
                                    Row selection · Expanded table views
                                </p>
                            </div>

                            <div>
                                <span>Session Management</span>

                                <p>
                                    <code>sessionStorage</code> · Inactivity detection ·
                                    Session expiry warning · Countdown handling ·
                                    Automatic logout · Activity event tracking
                                </p>
                            </div>

                            <div>
                                <span>Development</span>

                                <p>
                                    React 19 · Vite · JavaScript ES Modules · Oxlint ·
                                    Production builds · Environment configuration ·
                                    Git-based development
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <div className="enterprise-project-supporting-document">
                <a
                    className="enterprise-project-button enterprise-project-button-primary"
                    href="/documents/supporting-doc-project-4.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Technical Executive Summary
                </a>
            </div>


            {/* SQL capabilities */}

            <section className="enterprise-project-capabilities">

                <div className="enterprise-project-capabilities-inner">

                    <div className="enterprise-project-capabilities-header">

                        <div className="enterprise-project-section-label">
                            <span></span>
                            <span>SQL capabilities</span>
                        </div>

                        <h2>
                            Relational database operations.
                        </h2>

                    </div>

                    <div className="enterprise-project-capabilities-intro">

                        <p>
                            The platform implements database workflows across table definition, schema modification, relational constraints, record management, querying, and database metadata. These operations are exposed through dedicated workspace modules and API endpoints.
                        </p>

                        <p>
                            Database structures can be defined and modified at runtime, while the resulting tables and records can be queried, filtered, sorted, edited, and inspected through the same application.
                        </p>

                    </div>

                    <div className="enterprise-project-capabilities-grid">

                        <div>
                            <span>01</span>

                            <h3>Schema builder</h3>

                            <p>
                                Build and understand database structures visually,
                                including tables, fields, keys and relationships.
                            </p>
                        </div>

                        <div>
                            <span>02</span>

                            <h3>Relationships</h3>

                            <p>
                                Explore the relationships between SQL tables and
                                understand how relational data connects throughout
                                the database.
                            </p>
                        </div>

                        <div>
                            <span>03</span>

                            <h3>Schema history</h3>

                            <p>
                                Track changes to database structure and maintain
                                visibility over how the schema has evolved.
                            </p>
                        </div>

                        <div>
                            <span>04</span>

                            <h3>CRUD operations</h3>

                            <p>
                                Create, read, update and delete records directly
                                through the workspace interface.
                            </p>
                        </div>

                        <div>
                            <span>05</span>

                            <h3>Visual query builder</h3>

                            <p>
                                Construct database queries through a visual workflow
                                while keeping the underlying SQL logic understandable.
                            </p>
                        </div>

                        <div>
                            <span>06</span>

                            <h3>SQL cheatsheet</h3>

                            <p>
                                Reference common SQL operations and syntax while
                                working directly inside the database environment.
                            </p>
                        </div>

                        <div>
                            <span>07</span>

                            <h3>Workspace statistics</h3>

                            <p>
                                Surface useful database and table-level statistics
                                to provide a clearer picture of the workspace.
                            </p>
                        </div>

                        <div>
                            <span>08</span>

                            <h3>Table manipulation</h3>

                            <p>
                                Work directly with tables and their underlying data,
                                moving between structure and records within the same
                                environment.
                            </p>
                        </div>

                        <div>
                            <span>09</span>

                            <h3>Database structure</h3>

                            <p>
                                Navigate the wider database and schema structure while
                                maintaining visibility of how its individual parts
                                fit together.
                            </p>
                        </div>

                    </div>

                </div>

            </section>



            {/* Schema builder */}

            <section className="enterprise-project-feature enterprise-project-feature-dark">

                <div className="enterprise-project-feature-inner">

                    <div className="enterprise-project-feature-copy">

                        <div className="enterprise-project-section-label">
                            <span></span>
                            <span>Schema &amp; relationships</span>
                        </div>

                        <h2>
                            Foreign key relationships
                            and dependencies.
                        </h2>

                        <p>
                            The platform maps relationships between database entities,
                            exposing primary keys, foreign keys and referenced columns
                            within the workspace. Relationship data can be inspected
                            alongside table definitions and records, making dependencies
                            between related entities easier to trace and manage.
                        </p>

                    </div>

                    <div className="enterprise-project-feature-video">

                        <video
                            src={enterpriseVideo2}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-label="Enterprise Workspace schema and relationship demonstration"
                        />

                    </div>

                </div>

            </section>



            {/* Query builder */}

            <section className="enterprise-project-feature enterprise-project-feature-dark enterprise-project-feature-dark-secondary">

                <div className="enterprise-project-feature-inner enterprise-project-feature-reverse">

                    <div className="enterprise-project-feature-copy">

                        <div className="enterprise-project-section-label">
                            <span></span>
                            <span>Workspace interaction</span>
                        </div>

                        <h2>
                            Drag, position and
                            manage workspace tables.
                        </h2>

                        <p>
                            The workspace uses draggable and sortable table components to
                            organise database objects within the application. Tables can
                            be activated, repositioned, expanded and removed, while
                            dedicated edit and delete modes control destructive or
                            structural actions within the workspace.
                        </p>

                    </div>

                    <div className="enterprise-project-feature-video">

                        <video
                            src={enterpriseVideo3}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-label="Enterprise Workspace interaction demonstration"
                        />

                    </div>

                </div>

            </section>



            {/* Data manipulation */}

            <section className="enterprise-project-feature enterprise-project-feature-light enterprise-project-feature-last">

                <div className="enterprise-project-feature-inner">

                    <div className="enterprise-project-feature-copy">

                        <div className="enterprise-project-section-label">
                            <span></span>
                            <span>Database health</span>
                        </div>

                        <h2>
                            Monitor database
                            connectivity.
                        </h2>

                        <p>
                            The backend exposes a health endpoint that verifies PostgreSQL
                            connectivity through a live database query. Application startup
                            is also dependent on successful database initialisation,
                            providing an explicit runtime check for database availability
                            rather than treating connectivity as an assumed dependency.
                        </p>

                    </div>

                    <div className="enterprise-project-feature-video">

                        <video
                            src={enterpriseVideo4}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-label="Enterprise Workspace database health demonstration"
                        />

                    </div>

                </div>

            </section>

            {/* Closing */}

            <section className="enterprise-project-feature enterprise-project-feature-light enterprise-project-feature-last">

                <div className="enterprise-project-feature-inner">

                    <div className="enterprise-project-feature-copy">

                        <div className="enterprise-project-section-label">
                            <span></span>
                            <span>Session management</span>
                        </div>

                        <h2>
                            Inactivity detection
                            and session expiry.
                        </h2>

                        <p>
                            The application tracks user activity across mouse, keyboard,
                            scroll and touch events and maintains an inactivity timer for
                            the active workspace session. A warning state is displayed
                            before expiry, followed by an automatic logout when the
                            inactivity threshold is reached.
                        </p>

                    </div>

                    <div className="enterprise-project-feature-video">

                        <video
                            src={enterpriseVideo4}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            aria-label="Enterprise Workspace session management demonstration"
                        />

                    </div>

                </div>

            </section>

            {/* Floating back to top */}

            {showBackToTop && (
                <button
                    className="enterprise-project-top"
                    type="button"
                    onClick={scrollToTop}
                    aria-label="Back to top"
                >
                    <ArrowUp
                        size={17}
                        strokeWidth={1.7}
                        aria-hidden="true"
                    />
                </button>
            )}

        </main>
    );
}

export default EnterpriseWorkspace;