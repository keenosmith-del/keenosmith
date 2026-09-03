import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <section className="footer-outro">

                <div className="footer-outro-actions">
                    <a
                        href="https://www.linkedin.com/in/keenotreysmith/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-outro-button"
                    >
                        <span>LinkedIn</span>

                    </a>

                    <a
                        href="/cv"
                        className="footer-outro-button"
                    >
                        <span>View CV</span>
                    </a>
                </div>

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
        </footer>
    );
}

export default Footer;