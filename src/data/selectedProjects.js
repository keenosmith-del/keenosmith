import { canonicalProjects } from "../assistant/knowledge.js";

// Project-specific showcase copy; routes and identities come from the shared catalogue.
export const selectedProjects = [
  [
    "claude",
    "Claude-operated AI Procurement",
    ["Claude", "Structured outputs"],
    "A procurement and contract review application that extracts document evidence, compares supplier terms and calculates projected costs. Claude supports structured analysis and negotiation suggestions, while source excerpts, fixed calculations and recorded human decisions keep recommendations reviewable.",
  ],
  [
    "distributed-reliability",
    "Chaos Engineering & Disaster Recovery",
    ["Go", "OpenTelemetry", "Toxiproxy"],
    "A distributed transaction system for testing how services behave during network faults and outages. Go services, PostgreSQL, Redis and RabbitMQ are exercised with Toxiproxy and k6, with telemetry and recovery reports used to check transaction consistency and restoration.",
  ],
  [
    "deepseek",
    "HR Workforce Planning",
    ["C# / .NET", "Ollama", "pgvector"],
    "A workforce planning and recruitment application with private document processing, local DeepSeek inference and pgvector retrieval. Recruiters review extracted skills and experience against vacancy requirements, retaining source evidence and corrections while keeping hiring decisions under human control.",
  ],
  [
    "telecom-billing",
    "Telecommunications Billing & Subscriptions",
    ["Java", "Spring Boot", "Kafka"],
    "A telecommunications system that connects customer subscriptions, effective-dated plans, usage events and invoice calculations. Spring Boot processes Kafka events against PostgreSQL records, preserving the information needed to inspect charges and reproduce billing outcomes.",
  ],
  [
    "field-service",
    "Field Service & Asset Management",
    ["C#", ".NET MAUI", "SQLite"],
    "A maintenance system with an Angular supervisor dashboard and a .NET MAUI technician app. Technicians record inspections and photos offline in SQLite; an ASP.NET Core API synchronizes submissions, handles retries and conflicts, and retains supervisor reviews and asset history.",
  ],
  [
    "fleet-operations",
    "Real-time Logistics",
    ["Go", "Redpanda", "WebSockets"],
    "A fleet operations platform with delivery planning, vehicle assignment, live positions and exception handling. Go services process simulated telemetry through Redpanda, retain trip history in PostgreSQL and TimescaleDB, and send WebSocket updates to a React dispatcher map.",
  ],
].map(([id, title, skills, description]) => {
  const record = canonicalProjects.find((project) => project.id === id);
  return {
    id,
    title,
    skills,
    description,
    name: record.title,
    route: record.routes.find((route) => route.startsWith("/projects/")),
    repositoryUrl: record.repositoryUrl,
    showCoverBackground: true,
  };
});
