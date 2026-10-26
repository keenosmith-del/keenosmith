import ProjectNavigation from "../shared/ProjectNavigation.jsx";
import useProjectPage from "../shared/useProjectPage.js";
import ProjectModal from "../shared/ProjectModal.jsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Globe2, Layers3 } from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import LaunchCountdown from "../../../shared/LaunchCountdown.jsx";
import { companyLaunchLabel } from "../../../../data/companyLaunch.js";
import { companyStory, companyStackGroups } from "../../../../data/companyVentures.js";
import "./KailorVentures.css";

const repositories = {
  kailor: "https://github.com/keenosmith-del/kailor",
  insider: "https://github.com/keenosmith-del/kailor-insider",
};
const websites = { kailor: "https://kailor.co.za", insider: "" };
const pdfUrl = "/documents/kailor-insider-engineering-brief.pdf";

function SourceButton({ href, label }) {
  return (
    <a
      className="kk-button kk-button-source"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={githubSvg} alt="" aria-hidden="true" />
      {label}
    </a>
  );
}

function WebsiteButton({ href, label }) {
  if (!href) {
    return (
      <button
        className="kk-button kk-button-unavailable"
        type="button"
        disabled
        title="Public application access is not yet available"
      >
        <Globe2 size={14} strokeWidth={1.7} aria-hidden="true" />
        {label}
      </button>
    );
  }
  return (
    <a
      className="kk-button kk-button-website"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Globe2 size={14} strokeWidth={1.7} aria-hidden="true" />
      {label}
    </a>
  );
}

function StackModal({ onClose }) {
  return <ProjectModal onClose={onClose} groups={companyStackGroups} />;
}

export default function KailorVentures() {
  const pageRef = useProjectPage();
  const [showStack, setShowStack] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef(null);
  const closeStack = useCallback(() => setShowStack(false), []);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "kailor and kailor insider | Keeno Smith";
    const anchor = window.location.hash.slice(1);
    const frame = requestAnimationFrame(() => {
      if (anchor) document.getElementById(anchor)?.scrollIntoView();
    });
    return () => { cancelAnimationFrame(frame); document.title = previousTitle; };
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!footerRef.current || typeof IntersectionObserver === "undefined")
      return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={pageRef} className="project-case-study kk-project">
      <ProjectNavigation className="kk-back" />

      <article>
        <header className="kk-hero">
          <div className="kk-hero-inner">
            <div className="kk-hero-meta">
              <div className="kk-pills" aria-label="Company disciplines">
                <span>Consultancy</span><span>Software engineering</span><span>AI &amp; automation</span><span>Cloud</span><span>Publishing</span>
              </div>
              <time dateTime="2026-10">October 2026</time>
            </div>
            <div className="kk-hero-grid">
              <div className="kk-hero-copy">
                <h1>From publishing <span>to practical engineering.</span></h1>
                <p className="kk-hero-description">
                  I founded kailor insider in 2024 to research, publish and connect ideas in technology.
                  That work helped shape kailor, the technology consultancy and engineering company
                  I established in 2025. Today, I operate two distinct ventures and build the complete
                  systems that support their work.
                </p>
                <div className="kk-hero-actions">
                  <a className="kk-button kk-button-main" href="#kailor">Explore kailor</a>
                  <a className="kk-button kk-button-light" href="#kailor-insider">Explore kailor insider</a>
                </div>
              </div>
            </div>
            <div className="kk-launch">
              <LaunchCountdown variant="editorial" />
              <div className="kk-launch-copy">
                <span className="kk-eyebrow">App launch target</span>
                <p>{companyLaunchLabel}, South African time. The kailor company website is live;
                  this target is for the upcoming application, not the website.</p>
              </div>
            </div>
          </div>
        </header>
        {companyStory.map(section => (
          <section key={section.id} id={section.id} className="kk-editorial-section" aria-labelledby={`kk-${section.id}-title`}>
            <div className="kk-side-label">{section.label}</div>
            <div className="kk-section-content">
              <h2 id={`kk-${section.id}-title`}>{section.title}</h2>
              {section.paragraphs.map(paragraph => <p className="kk-narrative" key={paragraph}>{paragraph}</p>)}
              {section.id === 'kailor' && <div className="kk-product-links">
                <SourceButton href={repositories.kailor} label="kailor source" />
                <WebsiteButton href={websites.kailor} label="Visit kailor" />
              </div>}
              {section.id === 'kailor-insider' && <>
                <div className="kk-product-links">
                  <SourceButton href={repositories.insider} label="kailor insider source" />
                  <WebsiteButton href={websites.insider} label="Visit kailor insider" />
                </div>
                <p className="kk-link-note">Public application access is not yet available. Source repositories require authorised GitHub access.</p>
              </>}
              {section.id === 'engineering' && <div className="kk-product-links">
                <button className="kk-button kk-tech-trigger" type="button" onClick={() => setShowStack(true)}>
                  <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />Tech stack
                </button>
                <a className="kk-button kk-button-light" href={pdfUrl} target="_blank" rel="noopener noreferrer">Download engineering brief</a>
              </div>}
            </div>
          </section>
        ))}
        <section className="kk-closing">
          <div>
            <h2>Ideas worth sharing. Systems worth building.</h2>
            <p>I continue to publish, question and engineer across both ventures,
              keeping their purposes clear and their implementation grounded in real needs.</p>
          </div>
        </section>
      </article>

      <footer className="kk-footer" ref={footerRef}>
        <Link className="kk-footer-back" to="/">
          Back to portfolio
        </Link>
        <button
          className="kk-footer-top"
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </footer>

      {showTop && !footerVisible && (
        <button
          type="button"
          className="kk-floating-top"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={17} strokeWidth={1.7} aria-hidden="true" />
        </button>
      )}
      {showStack && <StackModal onClose={closeStack} />}
    </main>
  );
}
