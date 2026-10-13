import { useRef } from "react";
import useScrollFade from "../../../hooks/useScrollFade.js";
import linkedinIcon from "../../../assets/svgs/header/linkedin.svg";
import githubIcon from "../../../assets/svgs/header/github.svg";
import "./Footer.css";

function Footer() {
  const footerRef = useRef(null);
  useScrollFade(footerRef);
  return (
    <footer className="footer" ref={footerRef}>
      <section className="footer-outro" data-scroll-fade>
        <div className="footer-outro-actions">
          <a
            href="https://www.linkedin.com/in/keenotreysmith/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button hero-button-secondary"
          >
            <img src={linkedinIcon} alt="" width={15} height={15} />
            <span>LinkedIn</span>
          </a>

          <a
            href="https://github.com/keenosmith-del"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-button hero-button-primary"
          >
            <img src={githubIcon} alt="" width={16} height={16} />
            <span>GitHub</span>
          </a>
        </div>

        <p className="footer-outro-copy">
          This portfolio reflects an ongoing progression through software
          engineering, web development, artificial intelligence, cloud
          technologies and product development. The work shown here combines
          practical application, experimentation and continued technical
          development across full-stack architecture, modern frontend and
          backend systems, APIs, databases, deployment, AI-enabled software and
          cloud infrastructure. Each project, course, certification and
          technical challenge contributes to a broader understanding of how
          these technologies connect, how systems can be designed more
          effectively and how software can continue to evolve alongside the
          tools used to build it.
        </p>

        <div className="footer-outro-meta">
          <span>Designed and built by Keeno Smith Mar 2025 ©</span>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
