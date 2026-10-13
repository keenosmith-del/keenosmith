import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
    ...cloudProjects,
    ...aiProjects,
    kailorProject,
    fullStackProject,
    ...selectedProjects,
  ].find((item) => item.id === projectId);
  if (placeholderProject)
    return <ProjectPlaceholder project={placeholderProject} />;
  const project = curatedProjects.find((p) => p.id === projectId);
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
            className="explore-text-link"
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View repository <ArrowRight size={14} aria-hidden="true" />
          </a>
        )}
      </section>
    </main>
  );
}
