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
                    <span>(01)</span>
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
                        <span>(06)</span>
                        <span>Application experience</span>
                    </div>

                    <h2>
                        Designed around
                        the music experience.
                    </h2>

                    <p>
                        The interface brings discovery, playback and application
                        interaction together into a focused music environment, keeping
                        the experience visual while the underlying API architecture
                        handles the data and services behind it.
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
                        <span>(07)</span>
                        <span>Interactive media</span>
                    </div>

                    <h2>
                        Connecting data
                        to interaction.
                    </h2>

                    <p>
                        Music data becomes part of a continuous application experience,
                        connecting external services with frontend state, playback
                        controls and the user's interaction with the application.
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
                        <span>(08)</span>
                        <span>Application interaction</span>
                    </div>

                    <h2>
                        Turning a music API
                        into a real application.
                    </h2>

                    <p>
                        The project goes beyond retrieving music data by connecting API
                        responses with application state and interactive frontend
                        behaviour. Search results, selected tracks and playback controls
                        work together as part of one continuous interface.
                    </p>

                    <div className="music-project-pill-list">

                        <span>React state</span>
                        <span>Interactive UI</span>
                        <span>API data</span>
                        <span>Playback controls</span>
                        <span>Event handling</span>

                    </div>

                </div>

            </section>


            {/* Full technical stack */}

            <section className="music-project-stack">

                <div className="music-project-section-label">
                    <span>(10)</span>
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

            {/* Video four */}

            <section className="music-project-video music-project-video-reverse">

                <div className="music-project-video-copy">

                    <div className="music-project-section-label">
                        <span>(09)</span>
                        <span>Full-stack integration</span>
                    </div>

                    <h2>
                        Connecting frontend,
                        backend and external services.
                    </h2>

                    <p>
                        The final experience brings the different layers of the project
                        together: React on the frontend, Node and Express on the backend,
                        MongoDB for application data and external music services providing
                        the core music information.
                    </p>

                    <div className="music-project-pill-list">

                        <span>React</span>
                        <span>Node.js</span>
                        <span>Express</span>
                        <span>MongoDB</span>
                        <span>External APIs</span>

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

                    <span>(11)</span>

                    <p>
                        A full-stack exploration of APIs, application state,
                        external services and interactive media.
                    </p>

                    <div className="music-project-closing-actions">

                        <a
                            className="music-project-closing-button"
                            href="/"
                        >
                            Back to Portfolio
                        </a>

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