import { newProjects } from "./projectEvidence.js";
// Development-time review, 18 October 2026. No repository requests at runtime.
// Only scoped implemented technologies belong here; visibility is independent.
export const auditedProjects = [
  ...newProjects,
  {
    id: 'eventops-intelligence-v2', title: 'EventOps Intelligence v2',
    repository: 'https://github.com/keenosmith-del/eventops-intelligence-v.02', path: '/explore/projects/eventops-intelligence-v2',
    description: 'Keeno implemented Gemini embedding, generation, structured extraction and function-calling adapters, a resumable LangGraph attendee-verification workflow, persistent conversations and evidence-grounded retrieval. The local fixture mode is explicitly synthetic; live integration and public deployment remain to be demonstrated for this version.',
    technologies: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'RAG', 'Embeddings', 'Google Gemini', 'LangGraph', 'Tool calling', 'Context engineering', 'Testing', 'Docker'],
    sources: ['backend/app/ai.py', 'backend/app/agent.py', 'backend/app/rag.py', 'backend/pyproject.toml', 'README.md'],
    deployment: 'Implemented local fixture mode; live Gemini and Google integrations and public deployment are not demonstrated for v2. This is separate from v1 verification.',
  },
  {
    id: 'eventops-intelligence', title: 'EventOps Intelligence',
    repository: 'https://github.com/keenosmith-del/eventops-intelligence-v.01',
    path: '/projects/eventops-intelligence',
    description: 'Keeno implemented an event-operations knowledge assistant with FastAPI, PostgreSQL/pgvector retrieval, persistent conversation context, bounded LangGraph verification, and optional grounded Gemini generation with validated citations. Live Gemini verification is documented; generation is disabled by default.',
    technologies: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'RAG', 'Embeddings', 'Vector Search', 'Google Gemini', 'LangGraph', 'Tool calling', 'Context engineering', 'Testing', 'Docker'],
    sources: ['backend/app/rag/generation.py', 'backend/app/rag/retrieval.py', 'backend/app/agents/README.md', 'backend/requirements.txt', 'backend/app/rag/README.md'],
    deployment: 'Public assessment deployment documented; live Gemini generation verified in the project record, not re-run during this refresh.',
  },
  {
    id: 'customer-operations', title: 'Enterprise AI Customer Operations',
    repository: 'https://github.com/keenosmith-del/enterprise-ai-customer-operations', path: '/projects/enterprise-ai-mlops',
    description: 'Keeno implemented case triage and human review, versioned prompts and evaluations, and a separate RabbitMQ worker with a transactional outbox, bounded retries, dead-letter recovery and idempotent completion. The default provider is a labelled deterministic demo; an OpenAI-compatible provider and stub-tested Azure Service Bus adapter are implemented.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express.js', 'REST APIs', 'PostgreSQL', 'Prisma', 'RabbitMQ', 'Azure Service Bus', 'Docker', 'GitHub Actions', 'Prompt Engineering', 'AI Evaluation', 'LLM Integration', 'Event-driven Architecture', 'Distributed Systems', 'Testing', 'Zod'],
    sources: ['backend/src/worker.ts', 'backend/src/app.ts', 'backend/package.json', 'README.md'],
    deployment: 'Local application; no live Azure Service Bus deployment or customer usage established.',
  },
  {
    id: 'manufacturing-qc', title: 'Intelligent Manufacturing Quality Control',
    repository: 'https://github.com/keenosmith-del/intelligent-manufacturing-qc', path: '/projects/intelligence-manufacturing-llmops',
    description: 'Keeno implemented TensorFlow CNN training and evaluation, ONNX export and parity checks, Rust/Axum online inference, Firestore persistence, human review, a model registry with quality gates and rollback, and monitoring snapshots. React provides the inspection and MLOps workspace. Verification uses procedural synthetic images; industrial accuracy is not claimed.',
    technologies: ['React', 'TypeScript', 'Python', 'Rust', 'Axum', 'TensorFlow', 'ONNX', 'ONNX Runtime', 'Firestore', 'Cloud Storage', 'Google Cloud', 'Cloud Run', 'Docker', 'GitHub Actions', 'CI/CD', 'MLOps', 'Computer vision', 'AI Evaluation', 'Observability', 'Testing'],
    sources: ['backend/src/inference.rs', 'backend/src/registry.rs', 'backend/Cargo.toml', 'ml/src/qc/train.py', 'ml/requirements.txt', 'README.md'],
    deployment: 'Local/emulator workflows verified in project records; optional Cloud Run workflow is implemented but GCP deployment has not been performed.',
  },
  {
    id: 'kailor-ai', title: 'kailor Consulting and Engineering Platform',
    repository: 'https://github.com/keenosmith-del/kailor', path: '/explore/projects/kailor-ai',
    description: 'Established in 2025, kailor is Keeno’s founder-led technology consultancy spanning technology advisory, software engineering, AI and automation, and cloud infrastructure. Its application is one part of the business. Keeno implemented a business discovery and assessment workspace with persistent plans, contextual conversations, structured recommendations, guarded provider output, explicit confirmation of proposed facts, authentication and PDF reports. Express, Prisma and PostgreSQL support the React/TypeScript interface.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'REST APIs', 'LLM Integration', 'Context engineering', 'Authentication', 'Zod', 'Testing'],
    sources: ['backend/src/ai.ts', 'backend/src/assessment.ts', 'backend/src/app.ts', 'backend/package.json', 'docs/iterations/018-solution-canvas-rebuild.md'],
    inspectedOn: '2026-10-26',
    deployment: 'Company website kailor.co.za is live; its static Pages build excludes the private app runtime. Local project workspaces, multi-solution selection, consultancy intake and a founder inbox are implemented. Commercial commissioning, billing and delivery tracking remain developing workflows. No client outcomes or public application deployment are established by this portfolio review.',
  },
  {
    id: 'kailor-insider', title: 'kailor insider Publication and Social Reading Platform',
    repository: 'https://github.com/keenosmith-del/kailor-insider', path: '/explore/projects/kailor-insider',
    description: 'Keeno founded and operated kailor insider in 2024 as an independent technology and AI publishing initiative. Its research and practical technology analysis helped shape kailor in 2025. The publication now covers technology, software engineering, applied innovation and technology in business. The current owner-only application uses React Router SSR in an independent Cloudflare Worker with TypeScript, PostgreSQL and Tiptap. Rich editorial lifecycle, revisions, search, recommendations, profiles, social reading, messages, moderation, private media, TOTP and recipient grants are implemented; registration is closed. Its authentication, database and deployment lifecycle remain independent of kailor.',
    technologies: ['React', 'TypeScript', 'PostgreSQL', 'SQL', 'Authentication', 'OAuth', 'API Security', 'Testing'],
    sources: ['backend/src/services/articles.ts', 'backend/src/services/auth.ts', 'backend/src/services/media.ts', 'backend/src/db/database.ts', 'package.json', 'docs/ARCHITECTURE.md', 'docs/STAGING_DEPLOYMENT_REPORT.md'],
    inspectedOn: '2026-10-26',
    deployment: 'Locally implemented, with isolated staging that revealed password-sign-in CPU failures and SSR/autosave runtime limits. Not production-ready; public access remains unavailable. Hosted OAuth, SMTP and AI are not verified here. Development actors and simulations are not audience scale.',
  },
];
export const auditOverrides = {
  microsoft: { path: '/projects/microsoft-devops', plannedTechnologies: ['Foundry Agent Service', 'Azure AI Search'], deployment: 'Custom Foundry/Azure OpenAI client and local specialist-agent workflows implemented. Managed Foundry Agent Service and automated external remediation are not established by the active runtime.' },
  'vertex-ai-retail': { path: '/projects/gcp-retail' },
  claude: { showcaseVisible: false, deployment: 'Local Anthropic SDK and tool workflow implemented; live Claude execution blocked by missing credentials in VERIFICATION.md.' },
};
export const exactToolRecords = {
  Lambda: { aliases: ['aws lambda'], status: 'candidate-declared experience', projectIds: ['cv-2'], description: 'Keeno records Lambda experience in AWS event processing and incident-response workflows. The cloud-security architecture describes Lambda consumers and remediation with EventBridge, SQS and Step Functions. The implementation source remains unresolved; this is candidate-declared experience, not a source-inspected Lambda implementation or a production claim.' },
  CrewAI: { aliases: ['crew ai'], status: 'no matching record', description: 'No implemented CrewAI dependency, import or workflow was found in the reviewed projects. The discussed CrewAI FinOps project is an idea, not completed experience. LangGraph and custom multi-agent orchestration are related experience, not evidence of CrewAI use.' },
};
