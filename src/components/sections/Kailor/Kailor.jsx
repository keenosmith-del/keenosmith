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
                "--cloud-tile-bg": "#78b8be",
                "--cloud-tile-ink": "var(--charcoal)",
              }}
            >
              <div className="kailor-project-pills">
                {["React", "Node.js", "PostgreSQL"].map(technology => <span className="cloud-platform" key={technology}>{technology}</span>)}
              </div>
              <div className="cloud-artwork">
                <img src={kailorMascot} alt="kailor mascot" loading="lazy" />
              </div>
              <div className="cloud-overlay" aria-hidden="true" />
              <div className="cloud-tile-caption">
                <h3>AI Consultancy &amp; Software Solutions</h3>
                <div className="cloud-tile-details">
                  <p>
                    My technology consultancy helps businesses identify useful AI opportunities, improve workflows and plan tailored software. The consulting workspace supports discovery, evidence review, recommendations and reports, connecting business needs to practical technology decisions.
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
                kailor is my technology consultancy, helping businesses identify
                opportunities for AI, improve existing processes, and turn
                practical ideas into tailored software solutions. Alongside it,
                kai is an AI knowledge hub designed to make emerging
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
                  <Globe size={14} strokeWidth={1.7} aria-hidden="true" />
                  Visit kailor
                </button>
                <button
                  type="button"
                  className="hero-button hero-button-secondary"
                  disabled
                >
                  <Globe size={14} strokeWidth={1.7} aria-hidden="true" />
                  Visit kai
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
