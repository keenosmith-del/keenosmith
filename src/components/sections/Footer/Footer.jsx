import './Footer.css';
import signature from '../../../assets/images/signature/signature.png';

function Footer() {
    return (
        <footer className="footer">
            <section className="footer-outro">
                <p className="footer-outro-copy">
                    This portfolio reflects an ongoing progression through
                    software engineering, web development, artificial
                    intelligence, cloud technologies and product development.
                    The work shown here combines practical application,
                    experimentation and continued technical development across
                    full-stack architecture, modern frontend and backend
                    systems, APIs, databases, deployment, AI-enabled software,
                    cloud infrastructure and DevOps. Each project, course,
                    certification and technical challenge contributes to a
                    broader understanding of how these technologies connect,
                    how systems can be designed more effectively and how
                    software can continue to evolve alongside the tools used
                    to build it.
                </p>

                <div className="footer-outro-meta">
                    <span>
                        Designed and built by Keeno Smith
                    </span>
                </div>
            </section>

            <div className="footer-banner">
                <div className="footer-inner">
                    <div className="footer-directory">
                        <div className="footer-link-group">
                            <h3>Code</h3>

                            <a
                                href="https://github.com/keenosmith-del"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>

                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitLab
                            </a>

                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Bitbucket
                            </a>
                        </div>

                        <div className="footer-link-group">
                            <h3>Engineering</h3>

                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Codewars
                            </a>

                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                HackerRank
                            </a>

                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Docker Hub
                            </a>
                        </div>

                        <div className="footer-link-group">
                            <h3>AI / ML</h3>

                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Hugging Face
                            </a>

                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Kaggle
                            </a>
                        </div>

                        <div className="footer-link-group">
                            <h3>Professional</h3>

                            <a
                                href="https://www.linkedin.com/in/keenotreysmith/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>

                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                AWS Skill Builder
                            </a>

                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Credly
                            </a>

                            <a
                                href="/Keeno-Smith-CV.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                CV
                            </a>
                        </div>

                        <div className="footer-link-group">
                            <h3>Explore</h3>

                            <a href="#projects">Projects</a>
                            <a href="#skills">Skills</a>
                            <a href="#about">About</a>
                            <a href="#contact">Let’s chat</a>
                        </div>
                    </div>

                    <div className="footer-lower">
                        <div className="footer-signature">
                            <img
                                src={signature}
                                alt="Keeno Smith signature"
                            />
                        </div>

                        <div className="footer-bottom">
                            <div className="footer-meta">
                                <span>© 2026 Keeno Smith</span>
                                <span>South Africa</span>
                            </div>

                            <div className="footer-focus">
                                <span>Full-Stack Software Engineering</span>
                                <span>AI Application Development</span>
                                <span>Cloud &amp; DevOps</span>
                                <span>Product &amp; UX</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;