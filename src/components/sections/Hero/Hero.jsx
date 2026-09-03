import './Hero.css';

import avatar from '../../../assets/images/avatar/avatar.png';

function Hero() {
    return (
        <section className="hero" id="top">
            <div className="hero-content">

                <div className="hero-visual">
                    <div className="hero-avatar">
                        <img
                            src={avatar}
                            alt="Keeno Smith"
                        />
                    </div>

                    <div className="hero-actions">
                        <a
                            className="hero-button hero-button-primary"
                            href="/cv"
                        >
                            View CV
                        </a>

                        <a
                            className="hero-button hero-button-secondary"
                            href="#projects"
                        >
                            View My Work
                        </a>
                    </div>
                </div>

                <div className="hero-copy">

                    <div className="hero-heading-group">
                        <h1>Keeno Smith</h1>

                        <p className="hero-title">
                            Full-Stack Software Engineer &amp; Web Developer
                        </p>

                        <p className="hero-subtitle">
                            AI Application Development · Agentic AI · Cloud &amp; DevOps · Product &amp; UX
                        </p>
                    </div>

                    <div className="hero-description">
                        <p>
                            I build modern, end-to-end digital products across software engineering, web development and AI,
                            combining technical engineering with product thinking and thoughtful user experience.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default Hero;