import { canonicalProjects } from "../assistant/knowledge.js";
import { eventOps } from "./eventOps.js";

export const aiProjects = [
  {
    ...eventOps,
    name: eventOps.title,
    route: "/projects/eventops-intelligence",
    description:
      "Grounded event operations answers with structured RAG, cited evidence and bounded LangGraph verification workflows.",
    skills: ["Gemini", "LangGraph", "RAG", "pgvector"],
    showCoverBackground: true,
  },
  {
    id: "ollama",
    name: "Ollama Private Business Intelligence",
    title: "Ollama Private Business Intelligence",
    route: canonicalProjects
      .find((project) => project.id === "ollama")
      .routes.find((route) => route.startsWith("/projects/")),
    description:
      "Private business intelligence with local Ollama inference, document embeddings and pgvector retrieval.",
    skills: ["Ollama", "RAG", "Embeddings", "pgvector"],
    showCoverBackground: true,
  },
];
