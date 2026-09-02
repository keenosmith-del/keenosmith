import './About.css';

function About() {
    return (
        <section className="about" id="about">
            <div className="about-intro">

                <h2>
                    Engineering, AI, Cloud & Product.
                </h2>

                <p className="about-intro-description">
                    My development has expanded from full-stack software
                    engineering and web development into AI application
                    development, agentic workflows, AWS, cloud and DevOps,
                    while continuing to develop a strong interest in product
                    thinking and user experience.
                </p>

                <div className="about-actions">
                    <a
                        className="about-button about-button-primary"
                        href="#"
                    >
                        AWS Skill Builder
                    </a>

                    <a
                        className="about-button about-button-secondary"
                        href="#"
                    >
                        Credly
                    </a>
                </div>
            </div>

            <div className="about-grid">
                <article className="about-tile about-tile-large">
                    <span>Full-stack software engineering</span>
                </article>

                <article className="about-tile about-tile-medium">
                    <span>AWS · Cloud &amp; DevOps</span>
                </article>

                <article className="about-tile about-tile-small">
                    <strong>30+</strong>
                    <span>AWS badges</span>
                </article>

                <article className="about-tile about-tile-medium-2">
                    <span>AI application development &amp; agentic AI</span>
                </article>

                <article className="about-tile about-tile-small-2">
                    <strong>4+</strong>
                    <span>AWS microcredentials</span>
                </article>

                <article className="about-tile about-tile-small">
                    <strong>100+</strong>
                    <span>GitHub repositories</span>
                </article>

                <article className="about-tile about-tile-medium">
                    <span>Product &amp; UX</span>
                </article>

                <article className="about-tile about-tile-medium-2">
                    <span>Generative AI &amp; continued learning</span>
                </article>
            </div>
        </section>
    );
}

export default About;