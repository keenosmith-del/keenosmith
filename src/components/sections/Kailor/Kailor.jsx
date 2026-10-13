import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { kailorProject as project } from "../../../data/kailorProject.js";
import { projectArtwork } from "../../../data/projectArtwork.js";
import useScrollFade from "../../../hooks/useScrollFade.js";
import LaunchCountdown from "../../shared/LaunchCountdown.jsx";
import "../Cloud/Cloud.css";
import "./Kailor.css";

export default function Kailor() {
  const sectionRef = useRef(null);
  useScrollFade(sectionRef);
  const artwork = projectArtwork[project.id];

  return (
    <section
      ref={sectionRef}
      className="kailor"
      id="kailor"
      aria-labelledby="kailor-heading"
    >
      <div className="kailor-inner">
        <div className="kailor-main">
          <div className="kailor-feature" data-scroll-fade>
            <Link
              to={project.route}
              className="cloud-tile"
              data-project-id={project.id}
              style={{
                "--cloud-tile-bg": artwork.background,
                "--cloud-tile-ink": artwork.ink,
              }}
            >
              <div className="kailor-project-pills">
                {project.skills.map((skill) => (
                  <span className="cloud-platform" key={skill}>
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
          </div>
          <div className="kailor-company">
            <div className="kailor-intro" data-scroll-fade>
              <h2 id="kailor-heading">intelligence, put to work.</h2>
              <p>
                Kailor is my technology consultancy, helping businesses identify
                opportunities for AI, improve existing processes, and turn
                practical ideas into tailored software solutions. Alongside it,
                Kai is an AI knowledge hub designed to make emerging
                technologies, tools, and applications easier to understand and
                explore. Together, they connect business insight, AI education,
                and real-world engineering.
              </p>
            </div>
            <div className="kailor-launch" data-scroll-fade>
              <LaunchCountdown variant="editorial" />
              <div
                className="kailor-actions"
                aria-label="Company websites coming soon"
              >
                <button
                  type="button"
                  className="hero-button hero-button-primary"
                  disabled
                >
                  Visit Kailor
                </button>
                <button
                  type="button"
                  className="hero-button hero-button-secondary"
                  disabled
                >
                  Visit Kai
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className="kailor-metadata" data-scroll-fade>
          I apply the same hybrid intelligence approach behind Kailor to this
          portfolio's Assistant and Recruiter View, combining structured
          evidence with contextual analysis.
        </p>
      </div>
    </section>
  );
}
