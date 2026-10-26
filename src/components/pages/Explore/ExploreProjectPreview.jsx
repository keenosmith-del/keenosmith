import { rebuildingProjects } from "../../../data/rebuildingProjects.js";
import { canonicalProjects } from "../../../assistant/knowledge.js";
import githubIcon from "../../../assets/svgs/header/github.svg";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { curatedProjects } from "./utils/exploreIndex.js";
import "./Explore.css";
import { selectedProjects } from "../../../data/selectedProjects.js";
import { fullStackProject } from "../../../data/fullStackProject.js";
import { kailorProject } from "../../../data/kailorProject.js";
import { aiProjects } from "../../../data/aiProjects.js";
import { cloudProjects } from "../../../data/cloudProjects.js";
import ProjectPlaceholder from "../ProjectPlaceholder/ProjectPlaceholder.jsx";

export default function ExploreProjectPreview({ projectId: mappedId }) {
  const { projectId: routeId } = useParams();
  const projectId = mappedId || routeId;
  const placeholderProject = [
    ...rebuildingProjects.map((project) => ({
      ...project,
      repositoryUrl: canonicalProjects.find((record) => record.id === project.id)?.repositoryUrl,
    })),
    ...cloudProjects,
    ...aiProjects,
    kailorProject,
    fullStackProject,
    ...selectedProjects,
  ].find((item) => item.id === projectId);
  if (placeholderProject)
    return <ProjectPlaceholder project={placeholderProject} />;
  const project = curatedProjects.find((p) => p.id === projectId) || canonicalProjects.find(p => p.id === projectId);
  return (
    <main className="explore-page explore-preview">
      <Link className="explore-back" to="/explore">
        <ArrowLeft size={12} aria-hidden="true" />
        Back to Explore
      </Link>
      <section className="explore-width">
        <span className="explore-eyebrow">
          {project ? "Portfolio page coming soon" : "Project not found"}
        </span>
        <h1>{project?.title || "Return to Explore"}</h1>
        <p>
          {project?.description ||
            "Browse the project archive to find a project."}
        </p>
        {project && (
          <div className="explore-tags">
            {project.technologies.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        )}
        {project?.repositoryUrl && (
          <a
            className="hero-button hero-button-primary project-repository-button"
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={githubIcon} alt="" aria-hidden="true" />GitHub
          </a>
        )}
      </section>
    </main>
  );
}
