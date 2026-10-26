import { candidateFacts } from '../../../../data/candidateProfile.js';
import {
  canonicalProjects,
  credentials,
  skillRegistry,
} from "../../../../assistant/knowledge.js";
import commonCV from "../../CV/data/common.json";
import fullStackCV from "../../CV/data/full-stack.json";
import { eventOps } from "../../../../data/eventOps.js";
import { technologyMentions } from "./requirementVocabulary.js";

export const EVIDENCE_REVISION = candidateFacts.revision;
const inspectedOn = "2026-10-18";
const limitations =
  "Implementation evidence; live deployment and operating scale are recorded separately where available.";
const currentRoutes = {
  microsoft: "/projects/microsoft-devops",
  "vertex-ai-retail": "/projects/gcp-retail",
};
const projects = canonicalProjects
  .filter((p) => p.id !== "claude")
  .map((p) => ({
    ...p,
    path: currentRoutes[p.id] || p.path,
    status: p.status?.includes("Source inspected")
      ? "Built · Prior implementation documented"
      : p.status,
  }));
projects.push({
  id: "portfolio",
  title: "Portfolio and Recruiter View",
  path: "/",
  status: "Built · Portfolio application",
  demonstrated: true,
  implementedTechnologies: [],
  evidence: [],
  portfolioPublicationStatus: "published",
});
export const candidateProjects = projects;
const records = [];
function record(
  projectId,
  capabilities,
  fact,
  source,
  provenance = "documented implementation",
  extra = {},
) {
  for (const capability of capabilities)
    records.push({
      id: `${projectId}:${capability}:${source}`,
      capability,
      platform: capability,
      projectId,
      status: "built",
      fact,
      source,
      provenance,
      context: "Independent portfolio engineering",
      dates: null,
      limitations,
      revision: EVIDENCE_REVISION,
      reviewedOn: inspectedOn,
      ...extra,
    });
}
// Existing source audit is retained as historical documentation, not re-inspection.
// A source file listed at project level proves only the claims scoped to it below.
for (const p of canonicalProjects.filter(
  (p) => p.demonstrated && p.id !== "claude",
)) {
  for (const capability of p.implementedTechnologies)
    record(
      p.id,
      [capability],
      `${capability} is documented in the implemented scope of ${p.title}.`,
      "src/assistant/knowledge.js + src/assistant/repositoryEvidence.js",
      "documented implementation",
      {
        limitations: `${p.description || limitations} Repository source and documented scope reconciled on 2026-10-18; live services were not executed.`,
        revision: EVIDENCE_REVISION,
      },
    );
}
const eventRepo =
  "https://github.com/keenosmith-del/eventops-intelligence-v.01/blob/0decc5ed0867fc25c7bc2b93625a9f7da6e9f1c1/";
const opsRepo =
  "https://github.com/keenosmith-del/enterprise-ai-customer-operations/blob/fff773c93cda452a2d3da968f5e3c1835884fb4d/";
const source = (id, caps, fact, path, extra = {}) =>
  record(
    id,
    caps,
    fact,
    (id === eventOps.id ? eventRepo : opsRepo) + path,
    "inspected source/configuration",
    { inspectedOn, ...extra },
  );
source(
  eventOps.id,
  ["Google Gemini", "LLM Integration", "Prompt engineering", "JSON"],
  "Bounded Gemini HTTP generation uses a system instruction, evidence-only prompt, JSON response schema and citation validation; disabled by default.",
  "backend/app/rag/generation.py",
  {
    platform: "Gemini gemini-3.5-flash-lite",
    limitations:
      "Source inspected locally; live provider execution was not repeated. Generation is optional and bounded.",
  },
);
source(
  eventOps.id,
  [
    "LangGraph",
    "Agent orchestration",
    "Workflow orchestration",
    "Tool calling",
  ],
  "LangGraph StateGraph executes bounded calendar/email/web reads, normalization, verification and durable step recording.",
  "backend/app/agents/workflow.py",
  {
    limitations:
      "Deterministic graph orchestration, not autonomous model-selected tools; n8n runtime handoff remains unverified.",
  },
);
source(
  eventOps.id,
  ["pgvector", "Vector Search", "PostgreSQL"],
  "Persistent 384-dimensional pgvector search validates queries and uses PostgreSQL connections.",
  "backend/app/rag/postgres_retrieval.py",
  {
    limitations:
      "Retrieval implementation; production vector database administration and scale are not established.",
  },
);
source(
  eventOps.id,
  ["Context engineering"],
  "Conversation context resolves prior event references and rejects ambiguous context.",
  "backend/app/rag/context.py",
);
source(
  eventOps.id,
  ["FastAPI", "REST APIs", "API design", "Python"],
  "Typed FastAPI conversation endpoints validate requests and persist conversations.",
  "backend/app/api/conversations.py",
);
source(
  eventOps.id,
  ["Testing", "AI evaluation and safety", "Data transformation and validation"],
  "Verification regression cases cover authoritative references, inactive participants, conflicts and deduplication.",
  "backend/tests/test_agent_pipeline.py",
  {
    limitations:
      "Bounded workflow correctness tests, not comprehensive agent safety certification.",
  },
);
source(
  eventOps.id,
  ["GitHub Actions", "CI/CD", "Git", "GitHub", "Testing"],
  "Push/PR workflow checks out source, runs PostgreSQL-backed Python tests, frontend unit/browser tests and build checks.",
  " .github/workflows/ci.yml".trim(),
  {
    limitations:
      "CI and delivery checks verified in configuration. Successful current runs were not queried.",
  },
);
source(
  eventOps.id,
  ["Deployment"],
  "Render blueprint configures separate backend/frontend services, readiness checks, TLS database mode and checksPass deployment trigger.",
  "render.yaml",
  {
    limitations:
      "Deployment configuration inspected. Public assessment deployment is documented in the acceptance report; current uptime was not checked.",
  },
);
record(
  eventOps.id,
  [
    "React",
    "RAG",
    "Embeddings",
    "Containers",
    "Docker",
    "Architecture and technical decisions",
    "Documentation",
    "Monitoring and observability",
    "End-to-end delivery",
  ],
  "Connected application, tests, deployment acceptance and post-submission iteration are documented for this same EventOps lifecycle.",
  eventRepo + "README.md",
  "documented implementation",
  {
    status: "maintained",
    limitations:
      "Public assessment demonstration and subsequent maintenance; no large-scale operational usage claimed.",
  },
);
source(
  "customer-operations",
  ["GitHub Actions", "CI/CD", "Git", "GitHub", "Testing"],
  "CI provisions PostgreSQL and RabbitMQ then runs typecheck, lint, tests, integration tests and build.",
  ".github/workflows/ci.yml",
);
source(
  "customer-operations",
  ["Async programming", "Monitoring and observability"],
  "Worker consumes deliveries, persists heartbeats, recovers jobs and publishes outbox events with bounded retries and graceful shutdown.",
  "backend/src/worker.ts",
);
source(
  "customer-operations",
  ["Express.js", "REST APIs", "JSON", "Security"],
  "Express API uses Helmet, CORS, bounded JSON, correlation IDs and request logging.",
  "backend/src/app.ts",
);
record(
  "customer-operations",
  [
    "Containers",
    "Docker",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Prisma",
    "RabbitMQ",
    "Prompt engineering",
    "AI evaluation and safety",
    "Architecture and technical decisions",
    "Documentation",
  ],
  "README documents local Docker Compose application, versioned prompts and evaluations on 36 labelled synthetic requests.",
  opsRepo + "README.md",
  "documented implementation",
  {
    limitations:
      "Local portfolio project; demo provider is the default. Azure Service Bus is contract-tested with stubs; no live Azure deployment or customer usage established.",
  },
);
record(
  "portfolio",
  ["HTML", "CSS", "JavaScript", "React"],
  "React markup and responsive scoped CSS implement the Recruiter View.",
  "src/components/pages/RecruiterView/RecruiterView.jsx + RecruiterView.css",
  "inspected source/configuration",
  { inspectedOn },
);
record(
  "portfolio",
  ["Testing", "Documentation"],
  "Local regression scripts and Recruiter View documentation accompany the assessment.",
  "scripts/validate-recruiter.js",
  "inspected source/configuration",
  { inspectedOn },
);
// CV descriptions add scoped documentation, never a generic source-code inspection flag.
for (const p of fullStackCV.projects) {
  const project = projects.find((x) => x.repository === p.repository);
  if (!project) continue;
  const caps = technologyMentions(p.technologies).map((m) => m.name);
  if (/asynchronous/.test(p.description)) caps.push("Async programming");
  if (
    /relational data models|data modelling|interconnected MongoDB models/.test(
      p.description,
    )
  )
    caps.push("Database design and optimisation");
  if (/API contracts/.test(p.description))
    caps.push("API design", "Architecture and technical decisions");
  if (
    /workflow orchestration|n8n handles integration orchestration/.test(
      p.description,
    )
  )
    caps.push("Workflow orchestration");
  record(
    project.id,
    [...new Set(caps)],
    p.description,
    "src/components/pages/CV/data/full-stack.json",
  );
}
record(
  "vertex-ai-retail",
  ["Cloud"],
  "Google Cloud provider adapters and Terraform definitions are documented; live cloud deployment is unverified.",
  "src/assistant/repositoryEvidence.js",
  "documented implementation",
  {
    limitations:
      "Generic cloud application/infrastructure implementation, not landing zones or platform operations.",
  },
);
const cvSource = "src/components/pages/CV/data/common.json";
for (const [caps, index] of [
  [
    [
      "Code review and quality",
      "AI evaluation and safety",
      "Fine-tuning data preparation",
      "Documentation",
    ],
    0,
  ],
  [
    [
      "Process discovery",
      "Customer advisory and consulting",
      "Stakeholder communication",
      "Architecture and technical decisions",
    ],
    1,
  ],
  [
    ["Debugging and troubleshooting", "Third-party integration", "Maintenance"],
    2,
  ],
])
  record(
    null,
    caps,
    `${commonCV.experience[index].title} at ${commonCV.experience[index].employer}: ${commonCV.experience[index].bullets.join(" ")}`,
    cvSource,
    "candidate declaration",
    {
      context: commonCV.experience[index].title,
      dates: commonCV.experience[index].dates,
      status: "candidate-declared",
      limitations:
        "CV-declared professional scope; not independently employer-verified.",
    },
  );
record(
  null,
  ["Python duration"],
  "Candidate confirms more than three years of Python experience; paid or production Python duration is not asserted.",
  "Candidate instruction, 2026-10-18",
  "candidate declaration",
  {
    context: "Technology-specific duration",
    status: "candidate-declared",
    duration: { years: 3, strict: true },
    limitations:
      "No dated Python-specific timeline; do not infer employment or production tenure.",
  },
);
// Current remote source resolves the showcase/concept conflict. The live lifecycle remains unverified.
const claudeProject = canonicalProjects.find((p) => p.id === "claude");
projects.push({
  ...claudeProject,
  status: "Built · Local implementation; live Claude unverified",
  path: "/projects/claude",
  demonstrated: true,
});
record(
  "claude",
  [
    "Anthropic",
    "LLM Integration",
    "Tool calling",
    "Async programming",
    "JSON",
    "TypeScript",
  ],
  "Current Anthropic SDK transport implements bounded Messages/tool rounds, schema-validated JSON, token/timing traces and explicit credential/error handling.",
  "https://github.com/keenosmith-del/claude-powered-legal-procurement-intelligence/blob/main/backend/src/ai.ts",
  "inspected source/configuration",
  {
    inspectedOn,
    revision: "blob 888520c426be0103466ebee9e8f57a71c990bd45",
    limitations:
      "Built local integration, not verified live Claude execution. VERIFICATION.md records missing API credentials; no deployment infrastructure or production use. Hidden from current showcase but source remains present.",
  },
);
record(
  "claude",
  [
    "React",
    "Express.js",
    "PostgreSQL",
    "Docker",
    "Document processing",
    "Testing",
  ],
  "Current repository README documents the local React/Express/PostgreSQL workspace, Docker database, document processing and tests.",
  "https://github.com/keenosmith-del/claude-powered-legal-procurement-intelligence/blob/main/README.md",
  "documented implementation",
  {
    revision: "blob e67a3958fef9d21546c2beeee4d23dfd9101a37c",
    limitations:
      "Verification report (blob 8656cc9599a21b8c1eeb44cb6a35078896b69eae) documents local checks but blocked live Anthropic execution. Those historical checks were not rerun.",
  },
);
record(null, ['Lambda'], 'Candidate-declared Lambda experience in AWS event processing and incident-response workflows. Implementation source unresolved after repository search.', 'Candidate instruction, 2026-10-18; cloud-security architecture records', 'candidate declaration', { status: 'candidate-declared', limitations: 'No inspected handler, deployment or production claim.' });
export const candidateEvidence = records;
export const candidateProfile = {
  education: candidateFacts.education,
  overallExperience: candidateFacts.overallExperience,
  technologyDuration: candidateFacts.technologyDuration,
  identity: candidateFacts.identity,
  experience: [{ context: 'Independent engineering, founder work, consulting and professional delivery', startYear: 2020, years: candidateFacts.overallExperience.years, scope: ['software', 'engineering', 'full stack', 'frontend', 'backend', 'apis', 'databases', 'ai integration'], source: candidateFacts.overallExperience.source, limitations: 'Overall baseline; technology-specific durations and leadership scope are recorded separately.' }],
  logistics: {
    location: commonCV.location,
    country: "South Africa",
    overlap: null,
    source: "src/components/pages/CV/data/common.json",
  },
  cvExperience: commonCV.experience,
  credentials,
  listed: [
    ...new Set([
      ...skillRegistry.map((s) => s.name),
      ...commonCV.skills.flatMap((s) =>
        technologyMentions(s.text).map((m) => m.name),
      ),
    ]),
  ],
};
// Fingerprint includes full evidence, profile, credentials and projects. No runtime crawling/cache.
export function evidenceFingerprint(
  evidence = candidateEvidence,
  profile = candidateProfile,
) {
  const text = JSON.stringify({
    revision: EVIDENCE_REVISION,
    evidence,
    profile,
    projects: candidateProjects,
  });
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++)
    hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
  return `${EVIDENCE_REVISION}-${(hash >>> 0).toString(16)}`;
}
