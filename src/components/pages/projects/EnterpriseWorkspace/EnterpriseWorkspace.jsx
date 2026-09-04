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
                            A full-stack SQL workspace built around PostgreSQL,
                            Prisma and relational data. The application brings
                            database structure, schema design, table management,
                            querying, CRUD operations and data exploration together
                            inside one complete visual environment.
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
                        <span>(00)</span>
                        <span>Application overview</span>
                    </div>

                    <div className="enterprise-project-intro-copy">

                        <h2>
                            A visual workspace
                            for working with data.
                        </h2>

                        <p>
                            Enterprise Workspace transforms the normally hidden
                            structure of a relational database into an interface
                            that can be explored, understood and manipulated.
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
                            aria-label="Enterprise Workspace application overview"
                        />

                    </div>

                </div>

            </section>



            {/* Initial application showcase */}

            <section className="enterprise-project-images">

                <div className="enterprise-project-image">
                    <img
                        src={enterpriseImage1}
                        alt="Enterprise Workspace application interface"
                    />
                </div>

                <div className="enterprise-project-image">
                    <img
                        src={enterpriseImage2}
                        alt="Enterprise Workspace database workspace"
                    />
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
                        Enterprise Workspace is built around the idea that a
                        database should be something developers can understand,
                        explore and actively work with rather than simply connect
                        to in the background.
                    </p>

                    <p>
                        PostgreSQL provides the relational data layer while Prisma
                        connects the database to the application architecture.
                        Schemas, tables, fields, keys, relationships, queries and
                        records all become part of one coherent workspace.
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



            {/* Application walkthrough */}

            <section className="enterprise-project-feature enterprise-project-feature-light">

                <div className="enterprise-project-feature-inner">

                    <div className="enterprise-project-feature-copy">

                        <div className="enterprise-project-section-label">
                            <span>(02)</span>
                            <span>Application walkthrough</span>
                        </div>

                        <h2>
                            A complete workspace
                            for relational data.
                        </h2>

                        <p>
                            Enterprise Workspace brings database structure,
                            table management, querying and visual exploration
                            together inside one application. Instead of treating
                            each database operation as a separate workflow, the
                            interface provides a connected environment for
                            understanding the database, working with its tables
                            and manipulating its data.
                        </p>

                        <div className="enterprise-project-video-pills">
                            <span>Database workspace</span>
                            <span>SQL</span>
                            <span>CRUD</span>
                            <span>Schema management</span>
                            <span>Table management</span>
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
                            aria-label="Enterprise Workspace application walkthrough"
                        />

                    </div>

                </div>

            </section>



            {/* Database workspace showcase */}

            <section className="enterprise-project-images enterprise-project-images-secondary">

                <div className="enterprise-project-image">
                    <img
                        src={enterpriseImage3}
                        alt="Enterprise Workspace schema and database interface"
                    />
                </div>

                <div className="enterprise-project-image">
                    <img
                        src={enterpriseImage4}
                        alt="Enterprise Workspace relational database workspace"
                    />
                </div>

            </section>



            {/* Technology */}

            <section className="enterprise-project-stack">

                <div className="enterprise-project-stack-inner">

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

                </div>

            </section>



            {/* SQL capabilities */}

            <section className="enterprise-project-capabilities">

                <div className="enterprise-project-capabilities-inner">

                    <div className="enterprise-project-capabilities-header">

                        <div className="enterprise-project-section-label">
                            <span>(04)</span>
                            <span>SQL capabilities</span>
                        </div>

                        <h2>
                            More than a database
                            viewer.
                        </h2>

                    </div>

                    <div className="enterprise-project-capabilities-intro">

                        <p>
                            Enterprise Workspace was designed around the practical
                            lifecycle of working with relational data. From
                            understanding how tables connect to creating schemas,
                            manipulating records and constructing queries, the
                            application brings the major workflows of a SQL
                            environment into one visual workspace.
                        </p>

                        <p>
                            The result is an application where database structure is
                            visible, understandable and actionable. Users can move
                            between schemas, tables, relationships, records,
                            statistics and queries without losing the wider context
                            of the database they are working with.
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
                            <span>(05)</span>
                            <span>Schema &amp; relationships</span>
                        </div>

                        <h2>
                            See the database
                            as a system.
                        </h2>

                        <p>
                            The workspace makes relational structure visible,
                            allowing tables, schemas, keys and their relationships
                            to be explored as part of one connected database rather
                            than isolated records. This provides a visual way to
                            understand how the data model fits together.
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
                            <span>(06)</span>
                            <span>Query workflow</span>
                        </div>

                        <h2>
                            Query data without
                            losing the visual context.
                        </h2>

                        <p>
                            A visual query workflow sits alongside SQL functionality,
                            making it easier to construct, understand and work with
                            database queries while keeping the underlying relational
                            structure in view. The accompanying SQL cheatsheet also
                            provides quick access to commonly used syntax and
                            operations.
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
                            aria-label="Enterprise Workspace query workflow demonstration"
                        />

                    </div>

                </div>

            </section>



            {/* Data manipulation */}

            <section className="enterprise-project-feature enterprise-project-feature-light enterprise-project-feature-last">

                <div className="enterprise-project-feature-inner">

                    <div className="enterprise-project-feature-copy">

                        <div className="enterprise-project-section-label">
                            <span>(07)</span>
                            <span>Data manipulation</span>
                        </div>

                        <h2>
                            From schema design
                            to working data.
                        </h2>

                        <p>
                            The application supports the complete CRUD lifecycle,
                            allowing users to create, read, update and delete records
                            while working directly with the tables that contain them.
                            This connects schema design and database structure with
                            the practical work of manipulating persistent data.
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
                            aria-label="Enterprise Workspace data manipulation demonstration"
                        />

                    </div>

                </div>

            </section>



            {/* Workspace showcase */}

            <section className="enterprise-project-images enterprise-project-images-final">

                <div className="enterprise-project-image">
                    <img
                        src={enterpriseImage5}
                        alt="Enterprise Workspace database statistics"
                    />
                </div>

                <div className="enterprise-project-image">
                    <img
                        src={enterpriseImage6}
                        alt="Enterprise Workspace schema and table management"
                    />
                </div>

            </section>



            {/* Closing */}

            <section className="enterprise-project-closing">

                <div className="enterprise-project-closing-inner">

                    <span>(08)</span>

                    <p>
                        A complete SQL workspace for understanding,
                        designing, querying and working with relational data.
                    </p>

                    <div className="enterprise-project-closing-actions">

                        <a
                            className="enterprise-project-closing-button"
                            href="/"
                        >
                            Back to Portfolio
                        </a>

                        <button
                            className="enterprise-project-closing-top"
                            type="button"
                            onClick={scrollToTop}
                            aria-label="Back to top"
                        >
                            <ArrowUp
                                size={16}
                                strokeWidth={1.7}
                                aria-hidden="true"
                            />
                        </button>

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