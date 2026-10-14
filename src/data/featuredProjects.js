import { rebuildingProjects } from "./rebuildingProjects.js";
import { projectConcepts } from "./projectConcepts.js";
import { projectArtwork } from "./projectArtwork.js";

// Follow Explore's concept catalogue first, then its implemented-project sequence.
const projectOrder = new Map(
  [
    ...projectConcepts.map((project) => project.id),
    "productivity-platform",
    "ai-assistant",
    "enterprise-workspace",
    "music-api",
    "intelligence-manufacturing-llmops",
    "enterprise-ai-mlops",
  ].map((id, index) => [id, index]),
);

export const featuredProjects = [
  ...rebuildingProjects.map((project) => ({ ...project, skill: project.domain })),
  ...[
    [
      "microsoft-devops",
      "Microsoft Azure AI",
      "Azure AI Engineering",
      null,
      null,
    ],
    [
      "ollama",
      "Ollama BI",
      "Local AI Engineering",
      "var(--surface)",
      "centered",
    ],
    [
      "claude",
      "Claude-Operated AI Procurement",
      "LLM Application Engineering",
      "#eb7e5d",
      "centered",
    ],
    [
      "hugging-face",
      "Hugging Face AI Insurance Claims",
      "AI Model Engineering",
      null,
      "centered",
    ],
    [
      "banking-risk",
      "AWS Intelligent Banking & Payment Risk",
      "AWS Cloud Engineering",
      null,
      null,
    ],
    [
      "vertex-ai-retail",
      "Google Cloud Intelligent Retail & Supply Chain",
      "Google Cloud Engineering",
      "var(--surface)",
      "centered",
    ],
    [
      "distributed-reliability",
      "Chaos Engineering & Disaster Recovery",
      "SRE & Reliability Engineering",
      "var(--charcoal)",
      "centered",
    ],
    [
      "deepseek",
      "HR Workforce Planning",
      "AI & Talent Intelligence",
      "var(--surface)",
      "centered",
    ],
    [
      "telecom-billing",
      "Telecommunications Billing & Subscriptions",
      "Enterprise Billing Systems",
      "#ed899d",
      "centered",
    ],
    [
      "fleet-operations",
      "Real-Time Logistics",
      "Real-Time Streaming & Logistics",
      null,
      null,
    ],
    [
      "field-service",
      "Field Service & Asset Maintenance",
      "Mobile & Field Operations",
      null,
      null,
    ],
    ["n8n", "n8n OpsFlow", "Workflow & Integration Engineering", null, null],
  ].map(([id, title, skill, background, imageMode]) => ({
    id,
    title,
    skill,
    background,
    imageMode,
    image: null,
    description: projectConcepts.find((project) => project.id === id)
      .description,
  })),
]
  .map((project) => ({
    ...project,
    ...projectArtwork[project.id],
    imageMode: "centered",
  }))
  .sort(
    (a, b) =>
      (projectOrder.get(a.id) ?? Infinity) -
      (projectOrder.get(b.id) ?? Infinity),
  );
