import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Globe } from "lucide-react";
import kailorMascot from "../../../assets/images/kailor/kailor-unamused.png";
import useScrollFade from "../../../hooks/useScrollFade.js";
import LaunchCountdown from "../../shared/LaunchCountdown.jsx";
import "../Cloud/Cloud.css";
import "./Kailor.css";

export default function Kailor() {
  const sectionRef = useRef(null);
  useScrollFade(sectionRef);

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
              to="/companies/kailor"
              className="cloud-tile"
              data-company-id="kailor"
              style={{
                "--cloud-tile-bg": "#f6e6da",
                "--cloud-tile-ink": "var(--charcoal)",
              }}
            >
              <div className="kailor-project-pills">
                {["Software engineering", "AI & automation", "Cloud"].map(technology => <span className="cloud-platform" key={technology}>{technology}</span>)}
              </div>
              <div className="cloud-artwork">
                <img src={kailorMascot} alt="kailor mascot" loading="lazy" />
              </div>
              <div className="cloud-overlay" aria-hidden="true" />
              <div className="cloud-tile-caption">
                <h3>Technology consultancy &amp; engineering</h3>
                <div className="cloud-tile-details">
                  <p>
                    kailor brings together technology consulting, full-stack software engineering, AI and automation, and cloud infrastructure. My work spans discovery, assessment, solution design, implementation and ongoing improvement. The aim is to recommend and deliver technology that genuinely fits the problem, whether that means improving an existing process, integrating established tools or engineering something new.
                  </p>
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
                kailor insider began as an independent publishing platform I founded to explore developments and ideas in technology. That work grew into kailor, a technology consultancy bringing together software engineering, AI and automation, cloud infrastructure and practical business advisory. I approach the work by understanding what people and businesses need, then designing and delivering solutions that make sense for their context. Today, kailor insider continues as a dedicated place for publishing, discovery and conversation, while kailor turns the same curiosity into engineered systems and practical outcomes.
              </p>
            </div>
            <div className="kailor-launch" data-scroll-fade>
              <LaunchCountdown variant="editorial" />
              <div
                className="kailor-actions"
                aria-label="Company websites and application availability"
              >
                <a
                  href="https://kailor.co.za"
                  className="hero-button hero-button-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe size={14} strokeWidth={1.7} aria-hidden="true" />
                  Visit kailor
                </a>
                <button
                  type="button"
                  className="hero-button hero-button-secondary"
                  title="Public application access is not yet available"
                  disabled
                >
                  <Globe size={14} strokeWidth={1.7} aria-hidden="true" />
                  Visit kailor insider
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className="kailor-metadata" data-scroll-fade>
          I apply the same hybrid intelligence approach behind kailor to this
          portfolio's Assistant and Recruiter View, combining structured
          evidence with contextual analysis.
        </p>
      </div>
    </section>
  );
}
