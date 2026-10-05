import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    ArrowRight,
    ExternalLink,
    ArrowUp,
} from 'lucide-react';

import './MusicAPI.css';

import { useEffect, useState } from 'react';

// first three images
import musicImage1 from '../../../../assets/projects/music/2.png'
import musicImage2 from '../../../../assets/projects/music/3.png'
import musicImage3 from '../../../../assets/projects/music/4.png'

// first video
import musicVideo1 from '../../../../assets/projects/music/videos/preview_music_1.mp4'

// second video
import musicVideo2 from '../../../../assets/projects/music/videos/preview_music_2.mp4'

// first wide image
import musicImage4 from '../../../../assets/projects/music/5.png'

// second wide image
import musicImage5 from '../../../../assets/projects/music/6.png'

// third video
import musicVideo3 from '../../../../assets/projects/music/videos/preview_music_3.mp4'

// fourth video
import musicVideo4 from '../../../../assets/projects/music/videos/preview_music_4.mp4'

function MusicAPI() {
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
        <main className="music-project">

            {/* Back to portfolio */}

            <Link
                className="music-project-back"
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

            <section className="music-project-hero">

                <div className="music-project-hero-inner">

                    <div className="music-project-meta">
                        {/* add more skills chips here */}
                        <span>Full-Stack Development</span>
                        <span>REST API Integration</span>
                        <span>React Application Arhitecture</span>
                        <span>Node.js / Express</span>
                        <span>MongoDB / Mongoose</span>
                        <span>External API Integration</span>
                    </div>

                    {/* Change title - more technical */}
                    <h1>
                        Music
                        <br />
                        API-Driven
                        <br />
                        Web Application
                    </h1>

                    <div className="music-project-hero-bottom">

                        {/* change description - more technical */}
                        <p>
                            A full-stack web application implementing a
                            React-based frontend, Node.js/Express REST API,
                            MongoDB persistence, and external music and podcast API
                            integrations. The system includes API-driven data retrieval,
                            normalized provider data, client-side state management,
                            persistent user library operations,
                            and browser-based audio playback with queue orchestration.
                        </p>

                        <div className="music-project-actions">

                            <a
                                className="music-project-button music-project-button-primary"
                                href="#"
                            >
                                Go to Site

                            </a>

                            <a
                                className="music-project-button music-project-button-secondary"
                                target='_blank'
                                href="https://github.com/keenosmith-del/music-api"
                            >
                                GitHub Repo


                            </a>

                        </div>

                    </div>

                </div>

            </section>


            {/* Three-image showcase */}

            <section className="music-project-gallery">

                <div className="music-project-gallery-header">
                    <span></span>
                    <span>Application interface</span>
                </div>

                <div className="music-project-gallery-grid">

                    <div className="music-project-image">
                        <img
                            src={musicImage1}
                            alt="Music API application interface"
                        />
                    </div>

                    <div className="music-project-image">
                        <img
                            src={musicImage2}
                            alt="Music API music discovery interface"
                        />
                    </div>

                    <div className="music-project-image">
                        <img
                            src={musicImage3}
                            alt="Music API application experience"
                        />
                    </div>

                </div>

            </section>

            {/* Technical Executive Summary */}

            <div className="music-project-executive-summary">
                <a
                    className="music-project-executive-summary-button"
                    href="/documents/supporting-doc-project-2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Technical Executive Summary
                </a>
            </div>

            {/* Overview */}

            <section className="music-project-overview">

                <div className="music-project-section-label">
                    <span></span>
                    <span>Project overview</span>
                </div>

                <div className="music-project-overview-content">

                    <h2>
                        External APIs as an application layer.
                    </h2>

                    <div className="music-project-overview-text">

                        <p>
                            The implementation separates external provider integrations
                            from application logic through dedicated service and
                            provider layers. External responses are normalized into
                            consistent application data
                            structures before being returned to the frontend.
                        </p>

                        <p>
                            The system combines API integration, client-side state
                            management, MongoDB persistence, user library operations,
                            search, and browser audio
                            playback into a single application architecture.
                        </p>

                    </div>

                </div>

            </section>


            {/* Video one */}

            <section className="music-project-video">

                <div className="music-project-video-media">

                    <div className="music-project-video-placeholder">
                        <video
                            src={musicVideo1}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                        />
                    </div>

                </div>

                <div className="music-project-video-copy">

                    <div className="music-project-section-label">
                        <span></span>
                        {/* change */}
                        <span>Data Processing</span>
                    </div>

                    {/* change */}
                    <h2>
                        Asynchronous search and result processing.
                    </h2>

                    {/* change */}
                    <p>
                        The application implements asynchronous search across
                        multiple data types, with the frontend coordinating
                        requests through dedicated service functions and
                        processing structured JSON responses into application state.
                    </p>

                    <div className="music-project-pill-list">

                        <span>API requests</span>
                        <span>External data</span>
                        <span>Async operations</span>
                        <span>JSON</span>

                    </div>

                </div>

            </section>


            {/* API architecture information */}

            <section className="music-project-api">

                <div className="music-project-api-heading">

                    <div className="music-project-section-label">
                        <span></span>
                        {/* change */}
                        <span>REST API ecosystem</span>
                    </div>

                    {/* change */}
                    <h2>
                        Designing the request and response lifecycle.
                    </h2>

                </div>

                <div className="music-project-api-content">

                    {/* keep */}
                    <p>
                        Search requests are debounced to reduce unnecessary
                        network calls while users enter queries. Returned results
                        are separated into their respective data structures and rendered according to the available result set, with
                        explicit handling for loading, empty, and error states.
                    </p>

                    <div className="music-project-api-pills">

                        <span>Spotify API</span>
                        <span>Postman</span>
                        <span>HTTP</span>
                        <span>JSON</span>
                        <span>API endpoints</span>
                        <span>Authentication</span>
                        <span>Request handling</span>
                        <span>Response handling</span>
                        <span>Async / Await</span>
                        <span>Fetch</span>
                        <span>API testing</span>

                    </div>

                </div>

            </section>


            {/* Video two */}

            <section className="music-project-video music-project-video-reverse">

                <div className="music-project-video-copy">

                    <div className="music-project-section-label">
                        <span></span>
                        <span>Playback &amp; queue management</span>
                    </div>

                    <h2>
                        Coordinating playback state and queue operations.
                    </h2>

                    <p>
                        The backend separates HTTP routing, controller
                        responsibilities, application logic, provider
                        integrations, and database access. This establishes a
                        clear request pipeline while keeping external service-specific
                        implementation outside the API controller layer.
                    </p>

                    <div className="music-project-pill-list">

                        <span>Playback</span>
                        <span>Queue management</span>
                        <span>Application state</span>
                        <span>Event handling</span>
                        <span>Dynamic UI</span>

                    </div>

                </div>

                <div className="music-project-video-media">

                    <div className="music-project-video-placeholder">
                        <video
                            src={musicVideo2}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                        />
                    </div>

                </div>

            </section>

            {/* Wide image showcase */}

            <section className="music-project-wide-showcase">

                <div className="music-project-wide-header">

                    <div className="music-project-section-label">
                        <span></span>
                        <span>Data Processing</span>
                    </div>

                    <h2>
                        Processing and normalizing external API data.
                    </h2>

                    <p>
                        The backend performs the underlying provider queries
                        and applies result filtering and normalization before
                        returning the response to the client.
                    </p>

                </div>

                <div className="music-project-wide-image">

                    <img
                        src={musicImage4}
                        alt="Music API application interface"
                    />

                </div>

            </section>



            {/* Second wide image */}

            <section className="music-project-wide-showcase music-project-wide-showcase-secondary">

                <div className="music-project-wide-image">

                    <img
                        src={musicImage5}
                        alt="Music API music application interface"
                    />

                </div>

                <div className="music-project-wide-header">

                    <div className="music-project-section-label">
                        <span></span>
                        <span>Client Application Architecture</span>
                    </div>

                    <h2>
                        Coordinating shared state across the application.
                    </h2>

                    <p>
                        The React application centralizes shared
                        application state through Context and a common layout layer,
                        coordinating user state, theme state, playback state,
                        queue operations and
                        API responses across routed application areas.
                    </p>

                </div>

            </section>

            {/* Video three */}

            <section className="music-project-video">

                <div className="music-project-video-media">

                    <video
                        src={musicVideo3}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                    />

                </div>

                <div className="music-project-video-copy">

                    <div className="music-project-section-label">
                        <span></span>
                        <span>UI Engineering</span>
                    </div>

                    <h2>
                        Styling and browser interaction
                    </h2>

                    <p>
                        The frontend uses reusable React components, shared
                        theme tokens, responsive layout patterns, and browser
                        event handling to implement consistent interface behaviour across the application without relying on a component
                        framework or utility CSS system.
                    </p>

                    <div className="music-project-pill-list">

                        <span>React state</span>
                        <span>Interactive UI</span>
                        <span>Event handling</span>

                    </div>

                </div>

            </section>


            {/* Full technical stack */}

            <section className="music-project-stack">

                <div className="music-project-section-label">
                    <span></span>
                    <span>Technology Stack</span>
                </div>

                <div className="music-project-stack-content">

                    <h2>
                        Technologies and implementation
                        across the application stack.
                    </h2>

                    <div className="music-project-stack-groups">

                        <div className="music-project-stack-group">

                            <span className="music-project-stack-group-title">
                                Frontend
                            </span>

                            <div className="music-project-stack-pills">
                                <span>React 19</span>
                                <span>JavaScript</span>
                                <span>Vite</span>
                                <span>React Router</span>
                                <span>React Context</span>
                                <span>Framer Motion</span>
                                <span>Lucide React</span>
                                <span>HTML</span>
                                <span>CSS</span>
                                <span>Fetch API</span>
                            </div>

                        </div>

                        <div className="music-project-stack-group">

                            <span className="music-project-stack-group-title">
                                Backend
                            </span>

                            <div className="music-project-stack-pills">
                                <span>Node.js</span>
                                <span>Express 5</span>
                                <span>REST API</span>
                                <span>Express Router</span>
                                <span>Controllers</span>
                                <span>Application Services</span>
                                <span>Provider Services</span>
                                <span>Axios</span>
                                <span>JSON</span>
                            </div>

                        </div>

                        <div className="music-project-stack-group">

                            <span className="music-project-stack-group-title">
                                Database
                            </span>

                            <div className="music-project-stack-pills">
                                <span>MongoDB</span>
                                <span>Mongoose</span>
                                <span>Schema Modelling</span>
                                <span>ObjectId References</span>
                                <span>Document Relationships</span>
                                <span>Population</span>
                                <span>CRUD Operations</span>
                                <span>Data Persistence</span>
                            </div>

                        </div>

                        <div className="music-project-stack-group">

                            <span className="music-project-stack-group-title">
                                External Services
                            </span>

                            <div className="music-project-stack-pills">
                                <span>Deezer API</span>
                                <span>iTunes Search API</span>
                                <span>Podcast RSS</span>
                                <span>rss-parser</span>
                                <span>API Response Normalization</span>
                                <span>Async Operations</span>
                            </div>

                        </div>

                        <div className="music-project-stack-group">

                            <span className="music-project-stack-group-title">
                                Development
                            </span>

                            <div className="music-project-stack-pills">
                                <span>npm</span>
                                <span>Git</span>
                                <span>GitHub</span>
                                <span>Vite</span>
                                <span>Nodemon</span>
                                <span>Oxlint</span>
                                <span>Environment Variables</span>
                                <span>ES Modules</span>
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* Video four */}

            <section className="music-project-video music-project-video-reverse">


                <div className="music-project-video-copy">

                    <div className="music-project-section-label">
                        <span></span>
                        <span>Data Persistence</span>
                    </div>

                    <h2>
                        Persisting user data
                        with MongoDB.
                    </h2>

                    <p>
                        MongoDB stores application entities including users, tracks and
                        playlists. Mongoose schemas define references between these
                        entities, while user library, favourite and pinned-track
                        operations update persisted relationships and return populated
                        records to the client.
                    </p>

                    <div className="music-project-pill-list">

                        <span>MongoDB</span>
                        <span>Mongoose</span>
                        <span>Schema modelling</span>
                        <span>ObjectId references</span>
                        <span>CRUD operations</span>
                        <span>Population</span>

                    </div>

                </div>

                <div className="music-project-video-media">

                    <video
                        src={musicVideo4}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                    />

                </div>

            </section>



            {/* Closing */}

            <section className="music-project-closing">

                <div className="music-project-closing-inner">

                    <span></span>

                    <p>
                        A full-stack exploration of APIs, application state,
                        external services and interactive media.
                    </p>

                    <div className="music-project-closing-actions">

                        <Link
                            className="music-project-closing-button"
                            to="/"
                        >
                            Back to Portfolio
                        </Link>

                        <button
                            className="music-project-closing-top"
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
                    className="music-project-top"
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

export default MusicAPI;