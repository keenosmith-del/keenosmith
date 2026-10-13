import githubIcon from "../../../assets/svgs/header/github.svg";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import "./ProjectPreview.css";
import { projectConcepts } from "../../../data/projectConcepts.js";
import { canonicalProjects } from "../../../assistant/knowledge.js";

const fallbackProjects = {
  "company-websites": {
    title: "Kailor & Kai: Website Engineering",
    description:
      "Building the company websites for AI business assessment and an AI insights and research hub.",
    planned: true,
  },
  "kailor-ai": {
    title: "Kailor: AI Business Assessment",
    description:
      "Exploring how AI can assess business needs and identify practical opportunities.",
    planned: true,
  },
  "go-dotnet": {
    title: "Go & .NET: Backend Services",
    description:
      "A placeholder for a project using Go and .NET to build backend services.",
    section: "full-stack",
  },
  openai: {
    title: "OpenAI: AI Application Development",
    description:
      "A placeholder for a project integrating OpenAI models into an application.",
    section: "full-stack",
  },
  "jwt-redpanda": {
    title: "JWT + RedPanda: Secure Event-driven Services",
    description:
      "A placeholder for a project using JWT authentication and Redpanda event streaming.",
    section: "full-stack",
  },
  "vertex-ai-retail": {
    title: "Google Cloud / Vertex AI - Intelligent Retail & Supply Chain",
    description:
      "Planned project exploring intelligent retail and supply chain workflows with Google Cloud and Vertex AI.",
    section: "gcp",
    planned: true,
  },
  duckdb: {
    title: "DuckDB: Data Analytics",
    description:
      "A placeholder for a project using DuckDB for data querying and analytics.",
    section: "gcp",
  },
  rabbitmq: {
    title: "RabbitMQ: Event-driven Applications",
    description:
      "A project using RabbitMQ to coordinate events and background work.",
    section: "about",
  },
  kinesis: {
    title: "Kinesis: Real-time Payment Streaming",
    description:
      "A banking platform project using Amazon Kinesis for streaming payment events.",
    section: "about",
  },
  opentofu: {
    title: "OpenTofu: Infrastructure as Code",
    description:
      "A project using OpenTofu to provision and manage infrastructure.",
    section: "about",
  },
  ollama: {
    title: "Ollama: Private Personal/Business Intelligence Platform",
    description: "Local AI for personal and business information.",
  },
};

export default function ProjectPreview({ project }) {
  const { title, description, domain, technologies, repositoryUrl } =
    canonicalProjects.find(
      (item) => item.id === project || item.aliases.includes(project),
    ) ??
    projectConcepts.find((item) => item.id === project) ??
    fallbackProjects[project];
  return (
    <main className="project-preview">
      <span>Built · Portfolio page coming soon</span>
      <h1>{title}</h1>
      {domain && <span>{domain}</span>}
      <p>
        {description
          .replace(/^Planned /i, "")
          .replace(/^Placeholder for /i, "")}{" "}
        The full project page is being prepared.
      </p>
      {technologies && (
        <div className="project-preview-technologies">
          {technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      )}
      {repositoryUrl && (
        <a className="hero-button hero-button-primary project-repository-button"
          href={repositoryUrl} target="_blank" rel="noopener noreferrer">
          <img src={githubIcon} alt="" aria-hidden="true" />GitHub
        </a>
      )}
      <Link className="project-preview-button portfolio-back-link" to="/">
        <ArrowLeft size={14} strokeWidth={1.7} aria-hidden="true" />
        Back to Portfolio
      </Link>
    </main>
  );
}
