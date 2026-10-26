import { projectOrigin } from "../../projects/shared/projectOrigin.js";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projectArtwork } from "../../../../data/projectArtwork.js";
import { skillIndex } from "../utils/exploreIndex.js";

export function ProjectLink({ project, children, className, ...props }) {
  const location = useLocation();
  return (
    <Link className={className} to={project.route} state={{ projectOrigin: projectOrigin(location) }} {...props}>
      {children}
    </Link>
  );
}
export function ProjectTile({ project }) {
  const artwork = projectArtwork[project.id];
  const cover = artwork?.image;
  return (
    <ProjectLink
      project={project}
      aria-label={`View ${project.title}`}
      data-explore-id={project.id}
      style={
        artwork
          ? {
              "--tile-bg": artwork.background,
              "--tile-ink": artwork.ink,
              "--tile-secondary": artwork.ink,
            }
          : undefined
      }
      className={`explore-project explore-tone-${project.tone} ${cover ? "explore-project-with-cover" : ""} ${project.visibility === "details" ? "explore-project-always-visible" : "explore-project-title-visible"} ${project.visibility === "title-pills" ? "explore-project-pills-on-hover" : ""}`}
    >
      {cover && (
        <img
          className="explore-project-cover"
          src={cover}
          alt=""
          loading="lazy"
        />
      )}
      <div className="explore-project-reveal">
        <span className="explore-domain">{project.topSkills.join(" · ")}</span>
        <div className="explore-project-text">
          <h2>{project.title}</h2>
          {project.visibility !== "title-pills" && <p className="explore-description">{project.summary}</p>}
        </div>
        <div className="explore-tags">
          {project.tileSkills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>
      <span className="explore-project-arrow" aria-hidden="true">
        <ArrowRight size={18} strokeWidth={1.7} />
      </span>
    </ProjectLink>
  );
}
export function ProjectGallery({ projects }) {
  return Array.from({ length: Math.ceil(projects.length / 3) }, (_, row) => (
    <div className="explore-project-row" key={row}>
      {projects.slice(row * 3, row * 3 + 3).map((project) => (
        <ProjectTile key={project.id} project={project} />
      ))}
    </div>
  ));
}
export function EvidenceBar({ assessment }) {
  return (
    <div className="explore-evidence">
      <div
        className="explore-bar"
        role="meter"
        aria-label="Demonstrated evidence band"
        aria-valuemin={0}
        aria-valuemax={4}
        aria-valuenow={assessment.band}
        aria-valuetext={assessment.label}
      >
        <span style={{ width: `${assessment.band * 25}%` }} />
      </div>
      <small>{assessment.label}</small>
    </div>
  );
}
// Catalogue positions, rather than filtered positions, keep the palette stable.
// One accent in six leaves approximately 83% of the full cluster neutral.
const skillPillTones = new Map(
  skillIndex.map((skill, index) => [
    skill.id,
    index % 6 === [1, 3, 0, 2, 4][Math.floor(index / 6) % 5]
      ? ["blue", "sage", "peach", "blush", "butter"][Math.floor(index / 6) % 5]
      : index % 3 === 0
        ? "surface"
        : "neutral",
  ]),
);

export function SkillTile({ skill, onSelect }) {
  return (
    <button
      type="button"
      data-explore-id={skill.id}
      className={`explore-skill-pill explore-skill-pill-${skillPillTones.get(skill.id) || "neutral"}`}
      onClick={() => onSelect(skill.id)}
      aria-haspopup="dialog"
    >
      {skill.name}
    </button>
  );
}
export function TileGallery({ items, onSelect }) {
  return items.map((skill) => (
    <SkillTile key={skill.id} skill={skill} onSelect={onSelect} />
  ));
}
