import existingProjectFacts from './reviewedProjectFacts.json' with { type: 'json' };
import { normalizeSkills } from './skillNames.js';
import { relationships } from '../assistant/taxonomy.js';
// Authoritative source-reviewed engineering facts. Presentation and career facts
// live separately; repository services are never contacted during rendering.
export const evidenceRevision = '2026-10-26.1';
export const newProjectIds = ['crewai-revenueops', 'eventops-streamlit', 'ms-assessflow'];
const newProjectDefinitions = [
  {
    id: 'crewai-revenueops', title: 'CrewAI RevenueOps Intelligence',
    aliases: ['revenueops', 'revenue ops', 'crew ai revenueops'],
    repository: 'https://github.com/keenosmith-del/crewai-revenueops',
    sourceCommit: 'f7270742ec3c81dcd7532ebf222f2280f4e8e8b7',
    path: '/projects/crewai-revenueops', domain: 'AI / Financial Operations',
    caseStudyAvailable: true,
    description: 'A multi-agent financial operations platform combining CrewAI investigations, deterministic payment reconciliation, persistent workflows and human-controlled financial decisions.',
    engineering: 'Four specialist roles collaborate through task context, scoped read-only tools, conditional typed CrewAI Flows and validated Pydantic findings. Exact Decimal reconciliation, transactional imports, idempotent approvals and PostgreSQL concurrency controls retain ledger authority outside the agent layer. A durable worker checkpoints investigations; React provides persistent review and reporting workflows.',
    technologies: ['CrewAI', 'Python', 'FastAPI', 'React', 'Vite', 'React Router', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'Pydantic', 'Structured outputs', 'Tool calling', 'Multi-agent orchestration', 'Agentic AI', 'AI Evaluation', 'Local inference', 'Ollama', 'Database transactions', 'Concurrency control', 'Idempotency', 'State machines', 'Background workers', 'JWT', 'RBAC', 'Tenant isolation', 'Human approval', 'Audit logging', 'Docker', 'Docker Compose', 'GitHub Actions', 'CI/CD', 'Playwright', 'Testing', 'Observability', 'Llama', 'JSON Schema'],
    categories: ['ai', 'frontend', 'backend', 'databases', 'security', 'devops', 'architecture'],
    sources: ['backend/app/agents/crews/investigation.py', 'backend/app/flows/reconciliation.py', 'backend/app/agents/tools/evidence.py', 'backend/app/reconciliation/engine.py', 'backend/app/security/auth.py', 'backend/requirements.txt', '.github/workflows/verify.yml', 'docs/portfolio/engineering.md'],
    deployment: 'Source-verified local application; repository reports successful hosted CI. Staging release automation is prepared, with no deployment or provisioning executed. The documented local llama3.2:3b benchmark remains 0/4 exact; sealed holdouts are 1/7 versus a 4/7 baseline, with frequent typed-output failures. No improved investigation accuracy, autonomous financial authority or production readiness is claimed.',
    aiImplemented: true,
  },
  {
    id: 'eventops-streamlit', title: 'Low-Code Streamlit EventOps',
    aliases: ['streamlit eventops', 'low code eventops', 'eventops intelligence streamlit', 'eventops companion'],
    repository: 'https://github.com/keenosmith-del/eventops-intelligence-streamlit',
    sourceCommit: '084bd04336f2a92672c6b4285527ed0591582ec3',
    localSourceCommit: 'a1dab9d8942a5fad27e71fb828bd5da274f5a382',
    path: '/explore/projects/eventops-streamlit', domain: 'AI / Event Operations / Automation',
    description: 'A Streamlit and n8n event operations companion integrating Gemini, evidence-grounded retrieval, source verification and reviewable AI-assisted workflows.',
    engineering: 'FastEmbed creates genuine semantic vectors; event-aware retrieval and validated citations ground Gemini responses. n8n orchestrates protected webhooks and source-specific checkpoints. A bounded Gemini investigation agent uses read-only tools, while deterministic normalization, replay protection and authoritative source verification govern persisted workflows. SQLAlchemy supports SQLite development persistence and isolated PostgreSQL verification.',
    technologies: ['Streamlit', 'Python', 'n8n', 'FastAPI', 'Google Gemini', 'FastEmbed', 'RAG', 'Embeddings', 'Vector Search', 'Tool calling', 'Structured outputs', 'AI Evaluation', 'Workflow automation', 'Webhooks', 'API Integration', 'Pydantic', 'SQLAlchemy', 'PostgreSQL', 'SQLite', 'Idempotency', 'Database transactions', 'Human approval', 'API Security', 'Docker', 'Docker Compose', 'Caddy', 'GitHub Actions', 'Testing'],
    categories: ['ai', 'backend', 'databases', 'security', 'devops'],
    sources: ['eventops/rag.py', 'eventops/service.py', 'eventops/gemini.py', 'eventops/pipeline.py', 'eventops/store.py', 'eventops/operations.py', 'requirements.txt', 'docs/ARCHITECTURE.md', 'docs/COMPLETION_REPORT.md', 'docs/iterations/003/RELEASE_READINESS.md'],
    deployment: 'Distinct companion to the React/FastAPI/LangGraph EventOps implementation. Local semantic retrieval, n8n integration and bounded Gemini evidence are documented. Protected container/Caddy release topology and recovery are prepared and locally rehearsed; public hosting and managed infrastructure are not deployed. Current release rehearsal keeps Gemini disabled. Controlled synthetic source fixtures are distinguished from real read-only provider access.',
    aiImplemented: true,
  },
  {
    id: 'ms-assessflow', title: 'Microsoft AssessFlow',
    aliases: ['assessflow', 'assess flow', 'microsoft assessflow', 'ms assessflow', 'access governance'],
    repository: 'https://github.com/keenosmith-del/ms-assessflow',
    sourceCommit: '1ba858faee6841a2bb61b2132844b44614524055',
    path: '/projects/ms-assessflow', domain: 'Microsoft / Access Governance / Enterprise AI',
    caseStudyAvailable: true,
    description: 'An enterprise access-governance platform combining Microsoft AI integration architecture, policy-grounded assessments, approval workflows and secure full-stack engineering.',
    engineering: 'React and FastAPI implement a persistent request-to-assessment-to-approval workflow with explicit ownership, JWT validation, RBAC, replay/expiry checks and audit history. Policy citations and deterministic eligibility checks constrain typed AI assessments. Microsoft provider adapters and integration contracts remain distinct from offline simulations. Release engineering gates exact-SHA CI, independent approvals, OIDC, immutable images and reviewed rollback.',
    technologies: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Vite', 'React Router', 'Pydantic', 'JSON Schema', 'SQLAlchemy', 'Alembic', 'REST APIs', 'Authentication', 'JWT', 'RBAC', 'Authorization', 'Human approval', 'Audit logging', 'API Security', 'Database transactions', 'Concurrency control', 'Idempotency', 'State machines', 'Structured outputs', 'AI Evaluation', 'Tool calling', 'Microsoft Foundry', 'Azure OpenAI', 'Azure AI Search', 'Azure Language', 'Microsoft Graph', 'Microsoft Entra ID', 'GitHub Actions', 'CI/CD', 'Docker', 'Docker Compose', 'Playwright', 'Bicep', 'OIDC', 'Deployment Automation', 'Rollback procedures', 'Testing'],
    categories: ['ai', 'frontend', 'backend', 'databases', 'security', 'cloud', 'devops', 'infrastructure', 'architecture'],
    sources: ['backend/app/agents/assessment.py', 'backend/app/integrations/microsoft/providers.py', 'backend/app/services/workflow.py', 'backend/app/security/auth.py', 'backend/pyproject.toml', 'frontend/package.json', '.github/workflows/verify.yml', '.github/workflows/deploy-staging.yml', 'docs/portfolio/engineering.md'],
    adapterTechnologies: ['Microsoft Foundry', 'Azure OpenAI', 'Azure AI Search', 'Azure Language', 'Microsoft Graph', 'Microsoft Entra ID'],
    configuredTechnologies: ['Azure Container Apps'],
    deployment: 'Local application and real PostgreSQL/browser verification are recorded; successful hosted GitHub Actions CI is documented. Azure provider adapters, Bicep infrastructure and protected OIDC staging release automation are implemented/prepared, not a live Azure tenant deployment. Microsoft sign-in, Foundry inference, Language, Search, Graph and Copilot integration await authorised activation and live verification.',
    aiImplemented: true,
  },
];

const displayIds = { microsoft: 'microsoft-devops', 'manufacturing-qc': 'intelligence-manufacturing-llmops', 'customer-operations': 'enterprise-ai-mlops' };
export const galleryProjectIds = [
  ...newProjectIds, 'microsoft', 'banking-risk', 'vertex-ai-retail', 'ollama', 'claude', 'hugging-face',
  'distributed-reliability', 'n8n', 'deepseek', 'telecom-billing', 'field-service', 'fleet-operations',
  'productivity-platform', 'music-api', 'enterprise-workspace', 'ai-assistant', 'manufacturing-qc', 'customer-operations', 'eventops-intelligence',
];
function review(project) {
  const configuredTechnologies = normalizeSkills(project.configuredTechnologies || []);
  const technologies = normalizeSkills(project.technologies).filter(s => !configuredTechnologies.includes(s));
  const capabilities = technologies.map(skill => ({
    skill,
    status: project.adapterTechnologies?.includes(skill) ? 'adapter' : 'implemented',
    // A capability is scoped to an inspected implementation plus its contracts,
    // manifests and verification record, never proved by a free-floating tag.
    sources: project.sources,
    revision: project.sourceCommit,
    limitations: project.deployment,
  }));
  return {
    ...project, technologies, implementedTechnologies: technologies, configuredTechnologies, capabilities,
    displayId: displayIds[project.id] || project.id,
    inspectedOn: '2026-10-26',
    verificationScope: 'Source implementation reviewed; test outcomes are repository records, not company suites executed by this portfolio.',
    aliases: [...new Set([...(project.aliases || []), ...(displayIds[project.id] ? [displayIds[project.id]] : [])])],
    ...relationships(technologies),
    ...(project.categories ? { categories: project.categories } : {}),
    caseStudyAvailable: project.caseStudyAvailable ?? ((galleryProjectIds.includes(project.id) && !newProjectIds.includes(project.id)) || ['kailor-ai', 'kailor-insider'].includes(project.id)),
    showInExplore: galleryProjectIds.includes(project.id),
    showcaseVisible: true,
    deploymentStatus: project.id === 'eventops-intelligence' ? 'documented assessment deployment; not reverified live' : 'local implementation; public deployment not established',
    deploymentVerified: false,
    evidence: project.sources.map(path => ({
      type: /\.(json|toml|ya?ml|txt)$/.test(path) ? 'configuration' : /\.md$/.test(path) ? 'documentation' : 'source-code',
      source: `${project.repository}/blob/${project.sourceCommit}/${path}`,
      strength: /\.md$/.test(path) ? 'supporting' : 'direct',
      revision: project.sourceCommit, inspectedOn: '2026-10-26',
    })),
  };
}
export const newProjects = newProjectDefinitions.map(review);
export const reviewedProjects = [...existingProjectFacts.map(review), ...newProjects];
export const projectEvidenceById = new Map(reviewedProjects.map(project => [project.id, project]));
