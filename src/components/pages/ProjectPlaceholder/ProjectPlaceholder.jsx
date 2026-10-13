import githubIcon from "../../../assets/svgs/header/github.svg";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { projectArtwork } from "../../../data/projectArtwork.js";
import "./ProjectPlaceholder.css";

export default function ProjectPlaceholder({ project }) {
  const artwork = projectArtwork[project.id];
  return (
    <main className="project-placeholder">
      <Link className="project-placeholder-back portfolio-back-link" to="/">
        <ArrowLeft size={14} strokeWidth={1.7} aria-hidden="true" />
        Back to Portfolio
      </Link>
      <div className="project-placeholder-content">
        <div>
          <h1>{project.name}</h1>
          <p>Project page coming soon.</p>
          {(project.repositoryUrl || project.summaryUrl) && (
            <div className="project-placeholder-resources">
              {project.repositoryUrl && (
                <a
                  className="hero-button hero-button-primary project-repository-button"
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={githubIcon} alt="" aria-hidden="true" />
                  GitHub
                </a>
              )}
              {project.summaryUrl && (
                <a
                  href={project.summaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Technical Executive Summary
                </a>
              )}
            </div>
          )}
        </div>
        <div
          className="project-placeholder-visual"
          style={
            project.showCoverBackground
              ? { background: artwork.background }
              : undefined
          }
        >
          <img src={artwork.image} alt={`${project.name} project artwork`} />
        </div>
      </div>
    </main>
  );
}
