import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    ArrowRight,
    ExternalLink,
    ArrowUp,
} from 'lucide-react';

import { useEffect, useState } from 'react';

import './ProductivityPlatform.css';

import productivityVideo1 from '../../../../assets/projects/productivity/videos/preview_productivity_1.mp4';
import productivityImage2 from '../../../../assets/projects/productivity/4.png';

import productivityVideo2 from '../../../../assets/projects/productivity/videos/preview_productivity_2.mp4';
import productivityVideo3 from '../../../../assets/projects/productivity/videos/preview_productivity_3.mp4';

import productivityVideo4 from '../../../../assets/projects/productivity/videos/preview_productivity_4.mp4';

import productivityImage3 from '../../../../assets/projects/productivity/5.png';
import productivityImage4 from '../../../../assets/projects/productivity/7.png';

function ProductivityPlatform() {
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
        <main className="productivity-project">

            {/* Back to portfolio */}

            <Link
                className="productivity-project-back"
                to="/"
            >
                <ArrowLeft
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden="true"
                />

                <span>Back to Portfolio</span>
            </Link>


            {/* Hero */}

            <section className="productivity-project-hero">

                <div className="productivity-project-hero-inner">

                    <div className="productivity-project-meta">

                        <span>Full-Stack Engineering</span>
                        <span>MERN Architecture</span>
                        <span>REST API Development</span>
                        <span>Authentication & Security</span>
                        <span>MongoDB & Mongoose</span>
                        <span>Cloud Deployment</span>
                    </div>

                    <h1>
                        Authenticated MERN
                        Productivity
                        <br />
                        Platform
                    </h1>

                    <div className="productivity-project-hero-bottom">

                        <p>
                            A full-stack software engineering project built around a React SPA, Node.js/Express REST API and MongoDB/Mongoose persistence, implementing authenticated resource access, JWT-based security, interconnected domain modelling, client/server state coordination, account lifecycle management and cloud deployment.
                        </p>

                        <div className="productivity-project-actions">

                            <a
                                className="productivity-project-button productivity-project-button-primary"
                                target='_blank'
                                href="https://personal-productivity-desktop.vercel.app/"
                            >
                                Go to Site

                            </a>

                            <a
                                className="productivity-project-button productivity-project-button-secondary"
                                target='_blank'
                                href="https://github.com/keenosmith-del/personal-productivity-desktop"
                            >
                                GitHub Repo

                            </a>

                        </div>

                    </div>

                </div>

            </section>


            {/* Two-image showcase */}

            <section className="productivity-project-gallery">

                <div className="productivity-project-gallery-header">
                    <span></span>
                    <span>Application interface</span>
                </div>

                <div className="productivity-project-gallery-grid">

                    <div className="productivity-project-image">
                        <video
                            src={productivityVideo1}
                            autoPlay
                            muted
                            loop
                            playsInline
                            aria-label="Productivity Platform application preview"
                        />
                    </div>

                    <div className="productivity-project-image">
                        <img
                            src={productivityImage2}
                            alt="Productivity Platform application interface"
                        />
                    </div>

                </div>

            </section>


            {/* Overview */}

            <section className="productivity-project-overview">

                <div className="productivity-project-overview-number">

                </div>

                <div className="productivity-project-overview-content">

                    <p className="productivity-project-overview-lead">
                        Overview.
                    </p>

                    <div className="productivity-project-overview-columns">

                        <p>
                            The platform was engineered as a layered full-stack system in which a React client,
                            REST service layer, authenticated Node.js/Express backend and MongoDB/Mongoose
                            persistence operate as a coordinated application architecture.
                            The implementation establishes clear boundaries between presentation,
                            application state, API communication, server-side resource operations and persistent
                            data.
                        </p>

                        <p>
                            The project demonstrates particular depth in authenticated multi-user
                            architecture, user-scoped resource access, interconnected document modelling,
                            JWT-based authentication, bcrypt credential security and client/server state
                            reconciliation. It also incorporates concurrent multi-resource operations,
                            account and workspace lifecycle management, multipart file processing,
                            environment-aware configuration and cloud deployment, providing evidence of
                            engineering capability across the complete application stack.
                        </p>

                    </div>

                </div>

            </section>


            {/* Video showcase one */}

            <section className="productivity-project-video-section">

                <div className="productivity-project-video-heading">

                    <div>
                        <span></span>
                        <span>Data orchestration & state synchronisation</span>
                    </div>

                    <h2>
                        Coordinating persistent application state.
                    </h2>

                    <p>
                        The application coordinates multiple persistent resources
                        through asynchronous service operations and centralized client-side state,
                        with concurrent data retrieval, server-backed mutations and local state
                        reconciliation maintaining consistency between the interface and the backend.
                        This includes Promise.all-based orchestration for multi-resource operations, API response handling
                        and deliberate separation between transient client state and persistent server state.
                    </p>

                </div>

                <div className="productivity-project-video">

                    <video
                        src={productivityVideo2}
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-label="Productivity Platform application demonstration"
                    />

                </div>

            </section>


            {/* Video showcase two */}

            <section className="productivity-project-video-section productivity-project-video-section-secondary">

                <div className="productivity-project-video">

                    <video
                        src={productivityVideo3}
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-label="Productivity Platform application demonstration"
                    />

                </div>

                <div className="productivity-project-video-heading">

                    <div>
                        <span></span>
                        <span>Backend &amp; data architecture</span>
                    </div>

                    <h2>
                        Persistent data,
                        authentication and APIs.
                    </h2>

                    <p>
                        The Node.js and Express backend exposes authenticated REST resources,
                        while MongoDB and Mongoose provide schema-driven persistence across the
                        application's domain model. User ownership, ObjectId references and cross-entity
                        relationships establish a connected data architecture rather than isolated
                        collections.
                    </p>

                </div>

            </section>


            {/* Engineering */}

            <section className="productivity-project-engineering">

                <div className="productivity-project-engineering-header">

                    <div>
                        <span></span>
                        <span>Engineering Capability</span>
                    </div>

                    <h2>
                        Engineering depth across
                        the complete application stack.
                    </h2>

                </div>

                <div className="productivity-project-engineering-grid">

                    <div className="productivity-project-engineering-card">
                        <span></span>

                        <h3>Application Architecture</h3>

                        <p>
                            Layered React application architecture separating routing,
                            authentication state, reusable presentation components and
                            service-layer communication from backend persistence.
                        </p>
                    </div>

                    <div className="productivity-project-engineering-card">
                        <span></span>

                        <h3>API &amp; Resource Engineering</h3>

                        <p>
                            Node.js and Express REST resources supporting authenticated
                            operations, structured HTTP communication, request processing
                            and server-side resource lifecycle management.
                        </p>
                    </div>

                    <div className="productivity-project-engineering-card">
                        <span></span>

                        <h3>Data Architecture</h3>

                        <p>
                            MongoDB and Mongoose document modelling with user ownership,
                            ObjectId relationships and interconnected domain resources
                            persisted through a structured application data layer.
                        </p>
                    </div>

                    <div className="productivity-project-engineering-card">
                        <span></span>

                        <h3>Security Engineering</h3>

                        <p>
                            JWT authentication, Bearer-token authorization, bcrypt
                            credential protection and authenticated user boundaries across
                            client and server operations.
                        </p>
                    </div>

                    <div className="productivity-project-engineering-card">
                        <span></span>

                        <h3>State &amp; Orchestration</h3>

                        <p>
                            Asynchronous resource coordination, derived client state and
                            server-response reconciliation maintain consistency across
                            concurrent application workflows.
                        </p>
                    </div>

                    <div className="productivity-project-engineering-card">
                        <span></span>

                        <h3>Cloud &amp; Delivery</h3>

                        <p>
                            Environment-aware configuration, Vite production builds,
                            Git-based development and cloud deployment supporting
                            separation between application code and runtime infrastructure.
                        </p>
                    </div>

                </div>


            </section>


            <div className="productivity-project-support">
                <a
                    className="productivity-project-button productivity-project-button-primary"
                    href="/documents/supporting-doc-project-1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Technical Executive Summary
                </a>
            </div>


            {/* Product experience */}

            <section className="productivity-project-media-feature">

                <div className="productivity-project-media-feature-copy">

                    <span></span>

                    <div>

                        <h2>
                            Multi-layer application design and implementation.
                        </h2>

                        <p>
                            The project required implementation across frontend application state,
                            API communication, server-side request handling, database persistence and
                            authentication. It demonstrates experience working across application boundaries,
                            defining data relationships, enforcing user access at the API layer and
                            maintaining state between persistent resources and the client
                        </p>

                    </div>

                </div>

                <div className="productivity-project-media-feature-video">

                    <video
                        src={productivityVideo4}
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-label="Productivity Platform application demonstration"
                    />

                </div>

            </section>


            {/* Technology stack */}

            <section className="productivity-project-stack">


                <div className="productivity-project-stack-label">
                    <span>(06)</span>
                    <span>Technical Implementation</span>
                </div>

                <div className="productivity-project-stack-content">

                    <h2>
                        Full-stack implementation
                        across application boundaries.
                    </h2>

                    <div className="productivity-project-stack-list">

                        <div>
                            <span>Client</span>

                            <p>
                                Component-based React application with routed application
                                modules, centralized authentication state, reusable
                                interfaces and client-side data processing.
                            </p>
                        </div>

                        <div>
                            <span>Service Layer</span>

                            <p>
                                Dedicated API service modules separating HTTP communication
                                from presentation logic, with authenticated requests,
                                structured payloads and environment-dependent endpoints.
                            </p>
                        </div>

                        <div>
                            <span>Server</span>

                            <p>
                                Node.js / Express resource APIs with middleware-based
                                authentication, asynchronous operations, HTTP method
                                handling and account lifecycle endpoints.
                            </p>
                        </div>

                        <div>
                            <span>Persistence</span>

                            <p>
                                Mongoose-backed MongoDB persistence using schema-defined
                                resources, ObjectId relationships and user ownership
                                boundaries across the application data model.
                            </p>
                        </div>

                        <div>
                            <span>Security</span>

                            <p>
                                JWT-based authentication, Bearer-token authorization,
                                bcrypt credential hashing and verification, protected
                                resource access and sensitive-operation reauthentication.
                            </p>
                        </div>

                        <div>
                            <span>Delivery</span>

                            <p>
                                Vite production builds, environment configuration,
                                Git-based source control and cloud deployment across
                                separately configured application environments.
                            </p>
                        </div>

                    </div>

                </div>


            </section>



            {/* Closing */}

            <section className="productivity-project-closing">

                <div className="productivity-project-closing-inner">

                    <span></span>

                    <p>
                        A substantial full-stack implementation demonstrating practical
                        capability across application architecture, API development, persistent data modelling,
                        authentication, security, state management and cloud delivery.
                    </p>

                    <div className="productivity-project-closing-actions">

                        <Link
                            className="productivity-project-closing-button"
                            to="/"
                        >
                            Back to Portfolio
                        </Link>

                        <button
                            className="productivity-project-closing-top"
                            type="button"
                            onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth',
                                });
                            }}
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

            {showBackToTop && (
                <button
                    className="productivity-project-top"
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

export default ProductivityPlatform;