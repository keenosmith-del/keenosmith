import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { selectedProjects } from "../../../data/selectedProjects.js";
import { projectArtwork } from "../../../data/projectArtwork.js";
import useScrollFade from "../../../hooks/useScrollFade.js";
import "../Cloud/Cloud.css";
import "./SelectedProjects.css";

function ProjectRow({ projects }) {
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const active = hovered ?? focused ?? projects[1].id;
  return (
    <div
      className={`cloud-projects${hovered || focused ? " has-interaction" : ""}`}
      data-scroll-fade
      onMouseLeave={() => setHovered(null)}
    >
      {projects.map((project) => {
        const artwork = projectArtwork[project.id];
        return (
          <Link
            key={project.id}
            to={project.route}
            data-project-id={project.id}
            className={`cloud-tile${active === project.id ? " is-expanded" : ""}`}
            style={{
              "--cloud-tile-bg": artwork.background,
              "--cloud-tile-ink": artwork.ink,
            }}
            onMouseEnter={() => setHovered(project.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setFocused(project.id)}
            onBlur={() => setFocused(null)}
          >
            <div className="projects-pills">
              {project.skills.map((skill) => (
                <span key={skill} className="cloud-platform">
                  {skill}
                </span>
              ))}
            </div>
            <div className="cloud-artwork">
              <img
                src={artwork.image} srcSet={artwork.srcSet} sizes="(max-width: 700px) 90vw, (max-width: 1100px) 60vw, 50vw"
                alt={`${project.title} cover artwork`}
                loading="lazy"
              />
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
  );
}

export default function SelectedProjects() {
  const sectionRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  useScrollFade(sectionRef);
  return (
    <section
      className="projects"
      id="projects"
      ref={sectionRef}
      aria-labelledby="projects-heading"
    >
      <div className="projects-inner">
        <div className="projects-intro">
          <div>
            <h2 id="projects-heading" data-scroll-fade>
              selected projects.
            </h2>
            <p data-scroll-fade>
              A selection of independent engineering work across intelligent
              applications, enterprise workflows and connected systems.
            </p>
          </div>
          <Link
            className="hero-button hero-button-secondary"
            to="/explore?tab=projects"
            data-scroll-fade
          >
            All projects
            <ArrowRight size={13} aria-hidden="true" />
          </Link>
        </div>
        <ProjectRow projects={selectedProjects.slice(0, 3)} />
        <div
          className={`projects-more${expanded ? " is-expanded" : ""}`}
          id="projects-more"
          inert={!expanded}
          aria-hidden={!expanded}
        >
          <div className="projects-more-inner">
            <ProjectRow projects={selectedProjects.slice(3)} />
          </div>
        </div>
        <div className="projects-controls" data-scroll-fade>
          <button
            className="hero-button hero-button-secondary"
            type="button"
            aria-expanded={expanded}
            aria-controls="projects-more"
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded ? "Show less" : "Show more"}
            {expanded ? (
              <ChevronUp size={15} aria-hidden="true" />
            ) : (
              <ChevronDown size={15} aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="projects-contact" data-scroll-fade>
          <h3>Have a project in mind?</h3>
          <button
            type="button"
            className="hero-button hero-button-primary"
            aria-haspopup="dialog"
            onClick={() =>
              window.dispatchEvent(new Event("portfolio:open-contact"))
            }
          >
            Let's chat
          </button>
        </div>
      </div>
    </section>
  );
}
