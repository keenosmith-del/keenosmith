// Current presentation while these project pages are being rebuilt.
// New projects have no claimed implementation or repository yet.
export const rebuildingProjects = [
  [
    "productivity-platform",
    "Authenticated MERN Platform",
    ["React", "Node.js", "Express.js", "MongoDB"],
  ],
  ["music-api", "Music API", ["React", "Node.js", "REST APIs"]],
  [
    "enterprise-workspace",
    "Enterprise Workspace CRUD Tables",
    ["React", "Node.js", "PostgreSQL"],
  ],
  [
    "ai-assistant",
    "Retrieval Augmented AI Model",
    ["RAG", "LLM Integration", "Embeddings"],
  ],
  [
    "intelligence-manufacturing-llmops",
    "Intelligence Manufacturing LLMOps",
    ["LLMOps"],
  ],
  ["enterprise-ai-mlops", "Enterprise AI MLOps", ["MLOps"]],
].map(([id, title, technologies], index) => ({
  id,
  title,
  name: title,
  route: `/projects/${id}`,
  path: `/projects/${id}`,
  description:
    index < 4
      ? "Project being rebuilt. Updated engineering details coming soon."
      : "Planned project. Engineering details coming soon.",
  technologies,
  skills: technologies,
  domain: index < 3 ? "Full-Stack Engineering" : "AI Engineering",
  categories: index < 3 ? ["backend", "frontend"] : ["ai", "backend"],
  ecosystems: [],
  planned: index >= 4,
  showCoverBackground: true,
}));
