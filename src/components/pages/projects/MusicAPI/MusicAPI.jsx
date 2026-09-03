import {
    ArrowLeft,
    ArrowRight,
    ExternalLink,
} from 'lucide-react';

import './MusicAPI.css';

function MusicAPI() {
    return (
        <main className="music-project">

            {/* Back to portfolio */}

            <a
                className="music-project-back"
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

            <section className="music-project-hero">

                <div className="music-project-hero-inner">

                    <div className="music-project-meta">
                        <span>Full-Stack Development</span>
                        <span>API Integration</span>
                    </div>

                    <h1>
                        Music API
                        <br />
                        Web App
                    </h1>

                    <div className="music-project-hero-bottom">

                        <p>
                            A full-stack music application built around
                            API-driven discovery, playback, queue management
                            and an interactive music experience.
                        </p>

                        <div className="music-project-actions">

                            <a
                                className="music-project-button music-project-button-primary"
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
                                className="music-project-button music-project-button-secondary"
                                href="#"
                            >
                                GitHub

                                
                            </a>

                        </div>

                    </div>

                </div>

            </section>


            {/* Three-image showcase */}

            <section className="music-project-gallery">

                <div className="music-project-gallery-header">
                    <span>(01)</span>
                    <span>Application interface</span>
                </div>

                <div className="music-project-gallery-grid">

                    <div className="music-project-image">
                        <div className="music-project-placeholder">
                            <span>Project image</span>
                        </div>
                    </div>

                    <div className="music-project-image">
                        <div className="music-project-placeholder">
                            <span>Project image</span>
                        </div>
                    </div>

                    <div className="music-project-image">
                        <div className="music-project-placeholder">
                            <span>Project image</span>
                        </div>
                    </div>

                </div>

            </section>


            {/* Overview */}

            <section className="music-project-overview">

                <div className="music-project-section-label">
                    <span>(02)</span>
                    <span>Project overview</span>
                </div>

                <div className="music-project-overview-content">

                    <h2>
                        An application built around
                        external data and interaction.
                    </h2>

                    <div className="music-project-overview-text">

                        <p>
                            The Music API Web App explores how external music
                            services can become the foundation for a complete
                            interactive application.
                        </p>

                        <p>
                            Rather than treating an API as a simple data
                            source, the project connects discovery, search,
                            playback and queue management into a cohesive
                            frontend and backend experience.
                        </p>

                    </div>

                </div>

            </section>


            {/* Video one */}

            <section className="music-project-video">

                <div className="music-project-video-media">

                    <div className="music-project-video-placeholder">
                        <span>Video</span>
                    </div>

                </div>

                <div className="music-project-video-copy">

                    <div className="music-project-section-label">
                        <span>(03)</span>
                        <span>Music discovery</span>
                    </div>

                    <h2>
                        Searching, discovering
                        and exploring music.
                    </h2>

                    <p>
                        The application uses API-driven data to create a
                        responsive discovery experience, allowing users to
                        search for music and interact with results through
                        the application interface.
                    </p>

                    <div className="music-project-pill-list">

                        <span>API requests</span>
                        <span>Search</span>
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
                        <span>(04)</span>
                        <span>API ecosystem</span>
                    </div>

                    <h2>
                        Working across the
                        API development lifecycle.
                    </h2>

                </div>

                <div className="music-project-api-content">

                    <p>
                        The project demonstrates practical API consumption
                        from development through to application integration,
                        including external services, request testing,
                        structured responses and frontend consumption.
                    </p>

                    <div className="music-project-api-pills">

                        <span>Spotify API</span>
                        <span>REST APIs</span>
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
                        <span>(05)</span>
                        <span>Playback &amp; queue management</span>
                    </div>

                    <h2>
                        Turning API data into
                        an interactive experience.
                    </h2>

                    <p>
                        Music data becomes actionable through playback,
                        queue management and application state, connecting
                        individual API responses to a continuous user
                        experience.
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
                        <span>Video</span>
                    </div>

                </div>

            </section>


            {/* Full technical stack */}

            <section className="music-project-stack">

                <div className="music-project-section-label">
                    <span>(06)</span>
                    <span>Technology &amp; skills</span>
                </div>

                <div className="music-project-stack-content">

                    <h2>
                        A broad stack supporting
                        the application end to end.
                    </h2>

                    <div className="music-project-stack-groups">

                        <div className="music-project-stack-group">

                            <span className="music-project-stack-group-title">
                                Frontend
                            </span>

                            <div className="music-project-stack-pills">
                                <span>React</span>
                                <span>Vite</span>
                                <span>JavaScript</span>
                                <span>HTML</span>
                                <span>CSS</span>
                                <span>React Router</span>
                                <span>Lucide React</span>
                                <span>Responsive UI</span>
                                <span>Component architecture</span>
                                <span>State management</span>
                            </div>

                        </div>


                        <div className="music-project-stack-group">

                            <span className="music-project-stack-group-title">
                                Backend
                            </span>

                            <div className="music-project-stack-pills">
                                <span>Node.js</span>
                                <span>Express</span>
                                <span>REST APIs</span>
                                <span>API routes</span>
                                <span>Middleware</span>
                                <span>Server architecture</span>
                                <span>Error handling</span>
                            </div>

                        </div>


                        <div className="music-project-stack-group">

                            <span className="music-project-stack-group-title">
                                APIs &amp; Integration
                            </span>

                            <div className="music-project-stack-pills">
                                <span>Spotify API</span>
                                <span>Postman</span>
                                <span>REST</span>
                                <span>HTTP</span>
                                <span>JSON</span>
                                <span>Authentication</span>
                                <span>API testing</span>
                                <span>External services</span>
                                <span>Data transformation</span>
                                <span>Async operations</span>
                            </div>

                        </div>


                        <div className="music-project-stack-group">

                            <span className="music-project-stack-group-title">
                                Data &amp; application logic
                            </span>

                            <div className="music-project-stack-pills">
                                <span>MongoDB</span>
                                <span>Mongoose</span>
                                <span>Data modelling</span>
                                <span>Application state</span>
                                <span>Queue management</span>
                                <span>Data persistence</span>
                            </div>

                        </div>


                        <div className="music-project-stack-group">

                            <span className="music-project-stack-group-title">
                                Engineering
                            </span>

                            <div className="music-project-stack-pills">
                                <span>Full-stack development</span>
                                <span>API architecture</span>
                                <span>Frontend architecture</span>
                                <span>Backend architecture</span>
                                <span>Debugging</span>
                                <span>Git</span>
                                <span>GitHub</span>
                                <span>Deployment</span>
                                <span>Responsive development</span>
                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* Closing */}

            <section className="music-project-closing">

                <div className="music-project-closing-inner">

                    <span>(07)</span>

                    <p>
                        A full-stack exploration of APIs, application state,
                        external services and interactive media.
                    </p>

                    <a
                        className="music-project-closing-button"
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

export default MusicAPI;