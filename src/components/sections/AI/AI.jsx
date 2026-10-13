import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { aiProjects } from "../../../data/aiProjects.js";
import { projectArtwork } from "../../../data/projectArtwork.js";
import useScrollFade from "../../../hooks/useScrollFade.js";
import "../Cloud/Cloud.css";
import "./AI.css";

export default function AI() {
  const sectionRef = useRef(null);
  const counterRef = useRef(null);
  const numeralRef = useRef(null);
  const plusRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const active = hovered ?? focused ?? "eventops-intelligence";
  useScrollFade(sectionRef);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const numeral = numeralRef.current;
    const plus = plusRef.current;
    let disposed = false;
    let frame = null;
    let observer;
    let started = false;
    const finish = () => {
      if (disposed) return;
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
      started = true;
      numeral.textContent = "9";
      plus.style.opacity = "1";
      observer?.disconnect();
    };
    const start = () => {
      if (started || disposed) return;
      started = true;
      observer?.disconnect();
      const startedAt = performance.now();
      let previous = 0;
      const tick = (timestamp) => {
        if (disposed) return;
        const progress = Math.min(1, (timestamp - startedAt) / 1600);
        const value = Math.floor(progress * 9);
        if (value !== previous) {
          numeral.textContent = String(value);
          previous = value;
        }
        if (progress < 1) frame = window.requestAnimationFrame(tick);
        else finish();
      };
      frame = window.requestAnimationFrame(tick);
    };
    const handlePreference = () => {
      if (reducedMotion.matches) finish();
    };
    if (reducedMotion.matches) finish();
    else {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) start();
        },
        { threshold: 0.25 },
      );
      observer.observe(counterRef.current);
    }
    reducedMotion.addEventListener("change", handlePreference);
    return () => {
      disposed = true;
      if (frame !== null) window.cancelAnimationFrame(frame);
      observer?.disconnect();
      reducedMotion.removeEventListener("change", handlePreference);
    };
  }, []);

  return (
    <section
      className="ai"
      id="ai"
      ref={sectionRef}
      aria-labelledby="ai-heading"
    >
      <div className="ai-inner">
        <div className="ai-intro">
          <div className="ai-summary" data-scroll-fade>
            <div
              ref={counterRef}
              className="ai-counter"
              role="group"
              aria-label="9+ AI projects"
            >
              <strong aria-hidden="true">
                <span ref={numeralRef}>0</span>
                <span ref={plusRef} className="ai-counter-plus">
                  +
                </span>
              </strong>
              <span aria-hidden="true">AI projects</span>
            </div>
            <p>
              I design and engineer intelligent applications across OpenAI,
              Claude, Ollama and Hugging Face, combining retrieval-augmented
              generation, embeddings, agent orchestration, document intelligence
              and automation to build practical systems for real-world
              operations.
            </p>
          </div>
          <div className="ai-heading" data-scroll-fade>
            <h2 id="ai-heading">ai engineering.</h2>
            <Link className="ai-explore" to="/explore?tab=projects&category=ai">
              Explore AI Projects
              <ArrowRight size={15} strokeWidth={1.7} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div
          className={`cloud-projects ai-projects${hovered || focused ? " has-interaction" : ""}`}
          data-scroll-fade
          onMouseLeave={() => setHovered(null)}
        >
          {aiProjects.map((project) => {
            const artwork = projectArtwork[project.id];
            return (
              <Link
                key={project.id}
                to={project.route}
                className={`cloud-tile${active === project.id ? " is-expanded" : ""}`}
                data-project-id={project.id}
                aria-label={`View ${project.title}`}
                style={{
                  "--cloud-tile-bg": artwork.background,
                  "--cloud-tile-ink": artwork.ink,
                }}
                onMouseEnter={() => setHovered(project.id)}
                onFocus={() => setFocused(project.id)}
                onBlur={() => setFocused(null)}
              >
                <div
                  className="ai-project-pills"
                  aria-label="Project technologies"
                >
                  {project.skills.map((skill) => (
                    <span key={skill} className="cloud-platform">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="cloud-artwork">
                  <img src={artwork.image} alt="" loading="lazy" />
                </div>
                <div className="cloud-overlay" aria-hidden="true" />
                <div className="cloud-tile-caption">
                  <h3>{project.title}</h3>
                  <div className="cloud-tile-details">
                    <p>{project.description}</p>
                  </div>
                </div>
                <span className="cloud-arrow" aria-hidden="true">
                  <ArrowRight size={18} strokeWidth={1.7} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
