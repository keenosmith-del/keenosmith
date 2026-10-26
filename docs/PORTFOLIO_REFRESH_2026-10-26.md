# Portfolio engineering evidence refresh — 26 October 2026

Baseline: `8bdabc9` on main, refreshed from origin. Three supplied PNG assets were
already present as untracked user files; they are retained and used unchanged.

## Audit stage

The machine-readable [audit receipt](evidence/project-refresh-2026-10-26.json)
enumerates every canonical baseline record plus the three new projects, with source
commit SHAs, inspected file paths, content digests, local/remote distinctions and
availability. Current public GitHub HEADs, READMEs, recursive source trees and selected
implementation/manifests/architecture/workflow files were read through the connected
GitHub service. Local company and new-project checkouts were inspected read-only.
This is a fresh source review; historical October 18 snapshots remain archived.

Six accessible repositories contain early-development documentation rather than a
runtime implementation. Six other repository references were unavailable through the
connector and have no local checkout. Their prior candidate-declared/project-scope
records remain qualified. Both private company repositories were inspected locally.
The Streamlit local checkout has a different revision from the connector's remote
HEAD; both are recorded, without asserting ancestry or publishing local company code.

The three new projects are distinct implementations: CrewAI RevenueOps Intelligence,
Low-Code Streamlit EventOps, and Microsoft AssessFlow. Actual agent code, financial
controls, workflow transitions, policy/provider adapters and retrieval modules were
inspected in addition to manifests and repository verification reports.

Important boundaries: CrewAI's documented real local model accuracy and schema
failures must remain visible; deterministic ledger controls are separate. Streamlit
is a companion implementation, not additional employment tenure or a publicly hosted
service. AssessFlow's hosted CI is documented, while Azure adapters and prepared
OIDC/Bicep staging release automation do not establish a live Azure deployment.
Microsoft DevOps has a newer Python agent runtime, durable investigations, explicit
review and guarded draft PRs; previous planned-only summaries need correction.

## Implementation and validation

Stage receipts, catalogue/skill changes, AI inventory, CV reconciliation, tests and
remaining limitations are appended as each stage completes. Detailed custom pages
for the three new projects are explicitly reserved for a future iteration; this
iteration uses the existing generic preview infrastructure.

### Stage 2 — Explore catalogue

Added the three source-reviewed records and supplied PNGs without modification.
Exact artwork backgrounds are #353336 (RevenueOps), #9b9692 (Streamlit), and #b0814b
(AssessFlow). All three use existing generic previews with technology lists, repository
links and implementation/deployment boundaries. Tiles are single links with no nested
interactive element. Generic previews share project-origin back navigation.
The 22-card catalogue test checks exact count, uniqueness and the new preview routes.
`npm run lint`, `npm run build` and the Explore index test pass at this stage.

### Stage 3 — Shared facts and skills

`src/data/projectEvidence.js` and `reviewedProjectFacts.json` now own 25 current
source-reviewed implementations. The former active audit modules are compatibility
exports; the original source audit is archived. Concept/rebuild files preserve only
presentation selections and consume current facts. One company-websites alias is
consolidated into the existing consultancy record, reducing canonical records from
45 to 44 without deleting historical evidence.

Explore has 22 unique displayed implementations: the existing 19 and the requested
three. The existing working custom pages are correctly labelled as available. Removed
unconditional frontend/backend categories and stale LLMOps/MLOps descriptions.
Explicit alias normalization covers Express, Google Gemini, Microsoft Foundry,
PostgreSQL, CI/CD, Bicep, Compose and duplicate capitalization. Public skill IDs are
unique; capability counts use exact canonical technology matches and canonical
projects, not substring tags or aliases. Prepared Kubernetes configuration is
searchable and shown separately in Skills, without direct runtime evidence credit.
Current provider adapters retain explicit limitations; configured cloud services are
separate from implemented skills. Skill panel/bar meaning remains unchanged.

The Explore index regression, lint and build pass at this stage. The remaining lint
warning is the pre-existing unused import in the legacy CV generator; it is not used.

### Stage 4 — Assistant and Recruiter View

The Assistant recognizes current project/common skill aliases, retrieves all refreshed
records, gives concrete architecture comparisons and retains project context for
follow-ups. CrewAI now resolves to implemented RevenueOps evidence, while the earlier
FinOps concept remains separate planned scope. Named-project and model-limit answers
include recorded boundaries. Prepared Kubernetes configuration can be discussed as
supporting evidence without becoming demonstrated runtime experience. Certification
and role questions remain separate from project aliases. The server's generated
catalogue now includes engineering, provenance and deployment limits, not just tags.

Recruiter capability records consume the same project/capability model, with source
revision, links, implementation/adapter status and explicit deployment limits. Specific
new tools require specific evidence. Live Azure/tenant/cloud requirements receive
only transferable support when deployment evidence is absent. Existing weights,
qualification logic, compensation interpretation and six-year baseline are retained.
Evidence/model revision identifiers invalidate earlier saved assessments.

Added `scripts/validate-portfolio-refresh.js` to `npm run test:refresh`. It verifies
new project retrieval, aliases, limitations, comparisons, follow-ups, exact skill
relationships, source revisions, representative AI/full-stack/cloud roles, unsupported
tools, production-cloud restraint, unchanged tenure and all protected CV digests.
Existing assertions for the retired negative CrewAI record and obsolete publication
badges are replaced with positive source-specific checks, retaining absent-tool and
planned/deployed safeguards.

### Stage 5 — Homepage, current CVs and Timeline

The AI counter uses one target (15) and its derived accessible label. The existing 1600ms animation, intersection trigger and reduced-motion completion remain. It is a lower bound backed by 16 distinct source-reviewed repositories:

- **ai-assistant** — Retrieval-Augmented AI Model; https://github.com/keenosmith-del/ai-entity/commit/50ceaf675c9250bc1b49b70fe65679cfbb584f71.
- **microsoft** — Microsoft Azure DevOps Engineering Operations; https://github.com/keenosmith-del/microsoft-ai-powered-software-engineering-devops/commit/0b75c8a7b57ab0ce3210fb084f5a3b051a27f67d. Provider adapters do not establish live inference or deployment.
- **vertex-ai-retail** — Google Cloud Intelligent Retail & Supply Chain; https://github.com/keenosmith-del/gcp-ai-retail-and-supply-chain/commit/a6e1c2afb893e9c082dcb4ff70ee4f41de4eeac9. Provider adapters do not establish live inference or deployment.
- **ollama** — Ollama Private Business Intelligence; https://github.com/keenosmith-del/ollama-private-business-intelligence/commit/189b77db1d3468093de5fab3ccc4a7dc837fda04.
- **claude** — Claude-Operated AI Procurement; https://github.com/keenosmith-del/claude-powered-legal-procurement-intelligence/commit/7ad4b67288cd1bfe6e23029475067dcffd466ccf.
- **hugging-face** — Hugging Face AI Insurance Claims; https://github.com/keenosmith-del/hugging-face-ai-insurance-claims/commit/0ea4cc3e4f0502f99f937b9129c9d16e33923b76.
- **deepseek** — AI Workforce Planning & Talent Intelligence; https://github.com/keenosmith-del/deepseek-ai-workforce-planning/commit/4a2f03b6a4b5d911ba858adb2bcae731d3d7f463.
- **eventops-intelligence** — EventOps Intelligence; https://github.com/keenosmith-del/eventops-intelligence-v.01/commit/0decc5ed0867fc25c7bc2b93625a9f7da6e9f1c1.
- **eventops-intelligence-v2** — EventOps Intelligence v2; https://github.com/keenosmith-del/eventops-intelligence-v.02/commit/24f1a02070705e7adfa6798a5b1f229a51f4680d.
- **customer-operations** — Enterprise AI Customer Operations; https://github.com/keenosmith-del/enterprise-ai-customer-operations/commit/fff773c93cda452a2d3da968f5e3c1835884fb4d. Provider adapters do not establish live inference or deployment.
- **manufacturing-qc** — Intelligent Manufacturing Quality Control; https://github.com/keenosmith-del/intelligent-manufacturing-qc/commit/3ff1fcc76a7e9af14077b82b8acde229c0e52e01.
- **kailor-ai** — kailor Consulting and Engineering Platform; https://github.com/keenosmith-del/kailor/commit/3d6d4598c67d58248c18bc8bbdbada45a58e713a.
- **kailor-insider** — kailor insider Publication and Social Reading Platform; https://github.com/keenosmith-del/kailor-insider/commit/f5f3c2f3b83e7fb6ff7ac0e8f02ebce5c5f7a735. Independent publication AI jobs/local inference, not open public access.
- **crewai-revenueops** — CrewAI RevenueOps Intelligence; https://github.com/keenosmith-del/crewai-revenueops/commit/f7270742ec3c81dcd7532ebf222f2280f4e8e8b7.
- **eventops-streamlit** — Low-Code Streamlit EventOps; https://github.com/keenosmith-del/eventops-intelligence-streamlit/commit/084bd04336f2a92672c6b4285527ed0591582ec3.
- **ms-assessflow** — Microsoft AssessFlow; https://github.com/keenosmith-del/ms-assessflow/commit/1ba858faee6841a2bb61b2132844b44614524055. Provider adapters do not establish live inference or deployment.

Banking’s deterministic risk heuristic and the deterministic OpsFlow procurement application are excluded from this AI count. The three EventOps implementations use different repositories and architectures; shared business-domain knowledge is not extra professional tenure.

The read-only CV reconciliation receipt is `docs/evidence/cv-reconciliation-2026-10-26.json`. All three current PDF hashes and structured headlines, skills, role responsibilities/dates, education and credentials match. PDFs and structured CV files remain unchanged. Current CV skill evidence now derives from those variants, replacing stale references to line numbers in the former CV component. Historical CV project scopes remain labelled historical and cannot prove delivery. Current CV project descriptions are supporting provenance for matching reviewed implementations.

The ongoing Timeline chapter reflects independent agent, governance, full-stack, transaction and release engineering; existing career dates, qualifications and chapter structure remain. Current source implementations are ranked ahead of historical/unverified scope for broad Assistant questions; explicit project requests retain priority. Suggested future CV edit: consider adding the new three projects and measured release-engineering evidence, with separate authorisation; no CV edit was made here.

## Final consistency and verification

The final catalogue has **22 tiles**, **44 canonical records** (25 source-reviewed
implementations and 19 explicitly qualified historical/planned records), and **260
unique public skills**. All public skills have a discipline/vendor classification;
duplicate Testing taxonomy entries were consolidated. The Full-Stack filter requires
both frontend and backend evidence: the Streamlit companion does not acquire React
frontend evidence merely because it has an API. AssessFlow appears in AI, Full-Stack,
Cloud and Infrastructure according to its actual implementation/adapters/templates.

The current capability receipt, `docs/evidence/current-portfolio-capabilities.json`,
contains each implemented project's name, canonical ID, URL, source SHA, categories,
capabilities, adapter/configuration boundaries, source paths and deployment limits.
`node scripts/export-project-evidence.js` regenerates it from the authoritative model
and compares skill labels to baseline 8bdabc9 using read-only Git access. Historical
source availability and documentation-only HEADs are also carried into the runtime
catalogue as supporting provenance; they do not change implementation status.

### Skills added, normalized and qualified

Newly surfaced canonical labels (implementation or explicit current-CV listing,
with their individual evidence bands retained):

Alembic, Audit logging, Azure Language, Background workers, Bicep, Caddy, Cloudflare Workers, Concurrency control, CrewAI, Database transactions, Disaster Recovery, EF Core, FastEmbed, Human approval, Idempotency, JPA, Least privilege, Logging, Mammoth, MapLibre GL, Microsoft Graph, OIDC, OR-Tools, PDF Parse, Playwright, Pydantic, Retries, Rollback procedures, State Management, State machines, Streamlit, TLS, TOTP, Tenant isolation, Tiptap, Vitest, Workflow automation, kind, scikit-learn.

Normalized existing aliases: Asynchronous Programming → Async Programming; Foundry → Microsoft Foundry; AI orchestration → Agentic AI; Tool use → Tool calling; REST → REST APIs; OAuth2 → OAuth.

Additional search aliases include Express/Express.js, Gemini/Google Gemini, Azure Foundry/Microsoft Foundry, Postgres/PostgreSQL, the expanded CI/CD name, Compose/Docker Compose and Azure Bicep/Bicep. Composite or unsupported historical tags no longer become independent public skills: Bedrock AgentCore, Cloud KMS, Cloud Logging, Cloud Monitoring, Compute Engine, Dataplex, Go / .NET, Google Kubernetes Engine, Hugging Face Hub, JWT/OIDC, Mistral, OAuth2/JWT, Object storage, PostgreSQL / SQL Server, RabbitMQ / NATS, Secret Manager, Secrets Manager, gRPC. Their historical provenance remains in Git and archived evidence. LLMOps, document processing, JSON Schema and Llama were retained after checking actual current workflow/model code and records. This is neither a claim that every listed skill is implemented nor a proficiency rating.

### Visual and interaction checks

All three supplied images are present, unchanged and imported through the central
artwork registry. Exact backgrounds remain #353336, #9b9692 and #b0814b. Dark foregrounds
on the lighter Streamlit and AssessFlow surfaces improve contrast. Existing hover,
focus, artwork sizing and grid treatment are reused. Generic preview padding and footer
flow were corrected at narrow widths; no complete case-study pages or reserved empty
folders were created. The original homepage featured-project selections remain.

### Executed tests

| Command/check | Result |
| --- | --- |
| `npm run lint` | Pass; only the pre-existing unused `fs` import warning in the legacy CV PDF generator |
| `npm run build` | Pass; existing large-chunk advisory remains |
| `npm run test:assistant` | Pass: targeted journeys, 20 broad queries, exact tools/vendor intersections, context, provider/bounds/quota safeguards |
| `npm run test:recruiter` | Pass: 9 representative roles plus specificity, qualifications, duration, scoring, evidence mutations and fingerprints |
| `npm run test:refresh` | Pass: existing evidence regression plus the new comprehensive refresh regression |
| `node src/components/pages/Explore/tests/exploreIndex.test.js` | Pass: 22 unique catalogue tiles, canonical records, exact skill relationships, filters and grid integrity |
| `scripts/reconcile-current-cvs.py` using the available Python/pypdf runtime | Pass: 3 authoritative PDFs match structured content and hashes; no CV files modified |
| `node scripts/verify-portfolio-refresh-browser.js` | Pass: 320/390/768/1440px; all 3 new tiles/artwork/colours; previews, keyboard links, back/filter retention, AI/Full-Stack/Cloud/Infrastructure filters, all 260 skill panels and evidence bars, 15+ animation/reduced motion, Timeline and approved company follow-ups |
| `node scripts/verify-project-navigation.js` | Pass: all 22 entry/return paths, retained filters, direct/refresh fallback and reduced motion |
| `node scripts/verify-project-reset-browser.js` | Pass: 6 existing covers/colours/routes, retained custom pages, 22 tiles, 26 credential tiles and responsive layouts |
| `node scripts/verify-assistant-intelligence-browser.js` | Pass: suggestions, follow-ups, clear/cancel/fallback, close/reopen, 5 widths, every catalogue destination, Explore and Recruiter View |
| `npm run test:recruiter:browser` | Pass: standalone controls, assessments, navigation, canonical credentials redirect, current model revision, desktop/tablet/mobile, reassessment and Assistant handoff |
| `node scripts/verify-company-iteration.js` | Pass: previous company copy/date/branding, fixed launch countdown, CTAs, routes, PDF and responsive behaviour |
| `git diff --check` | Pass |

Browser commands used `PORTFOLIO_TEST_URL=http://127.0.0.1:4178` against the local
production preview. QA screenshots and machine-readable results are under
`/tmp/portfolio-full-refresh-qa/`; they are not production assets. All 260 panels were
opened, checked against their displayed name/evidence band and closed successfully.
No page errors or layout overflow were observed in the successful refresh run.

Existing browser assertions were updated where they encoded superseded facts:
19-card counts, old artwork colours/names, obsolete placeholder badges, the retired
negative CrewAI answer, the old scoring revision and the pre-redirect credentials URL.
Assertions now check current facts and actual destinations rather than being removed.

### Remaining source and verification boundaries

Repository-linked records whose current remote source was unavailable and had no
local checkout:

- `cv-3` — https://github.com/keenosmith-del/aws-distributed-developer-deployment; prior qualified evidence retained.
- `cv-4` — https://github.com/keenosmith-del/gcp-supply-chain-risk; prior qualified evidence retained.
- `cv-6` — https://github.com/keenosmith-del/claude-reg-change-impact; prior qualified evidence retained.
- `cv-7` — https://github.com/keenosmith-del/claude-architecture-analysis; prior qualified evidence retained.
- `cv-8` — https://github.com/keenosmith-del/n8n-opsflow-business-orch; prior qualified evidence retained.
- `cv-9` — https://github.com/keenosmith-del/n8n-webhooks-api-orch; prior qualified evidence retained.

Six other reachable repositories are documentation-only early-development scopes;
they do not supply implementation evidence. Private kailor sources were inspected
locally, while access to public GitHub source links may require authorisation. The
Streamlit local/remote revision distinction is recorded rather than silently merged.
Other similarly named local iterations were not added as extra catalogue entries or
counted as independent AI projects.

No company/project test suite, live model evaluation, Azure tenant integration or
cloud deployment was executed by this portfolio refresh. Repository-recorded checks
are identified as such. CrewAI's poor real local model results are explicit; deterministic
financial controls do not prove autonomous finance reliability. AssessFlow's provider
adapters, hosted CI records and release preparation do not prove live Azure operation.
Streamlit's prepared infrastructure is not public deployment. The portfolio remains
source-controlled/offline at runtime and contains no live GitHub crawler or frontend
GitHub credential. No manual production deployment was requested or dispatched.

The next iteration may implement the three custom case studies in the requested
CrewAIRevenueOps, EventOpsStreamlit and MicrosoftAssessFlow folders. This iteration
intentionally uses only working generic previews.

### Staged commits and pushes

Every completed stage was committed and pushed on main without force-pushing:

- `e6ac8b4` — current repository audit, source revisions and boundaries.
- `c73d91b` — new Explore records, supplied artwork and accessible previews.
- `b08745f` — shared project facts, exact evidence and normalized skills.
- `4b94a3a` — Assistant and Recruiter View integration and regressions.
- `5f8143c` — AI lower bound, current-CV reconciliation and Timeline.
- Final verification commit — this report, generated capability receipt, taxonomy,
  preview/contrast refinements, updated browser regressions and source-status consistency;
  its SHA and successful push are included in the completion message.

Current documentation in Explore and both Assistant maintenance guides was updated
alongside the data. Case-study availability is explicit: 21 reviewed implementations
link to existing custom/combined pages, while the three new projects and EventOps v2
retain generic previews. Source verification and public case-study publication remain
separate statuses.

### Materially changed files

- `docs/PORTFOLIO_REFRESH_2026-10-26.md`
- `docs/evidence/archive/repositoryEvidence-2026-10-18.js.txt`
- `docs/evidence/current-portfolio-capabilities.json`
- `docs/evidence/cv-reconciliation-2026-10-26.json`
- `docs/evidence/project-refresh-2026-10-26.json`
- `package.json`
- `scripts/export-project-evidence.js`
- `scripts/reconcile-current-cvs.py`
- `scripts/record-project-source-audit.py`
- `scripts/validate-assistant-expansion.js`
- `scripts/validate-evidence-refresh.js`
- `scripts/validate-portfolio-refresh.js`
- `scripts/verify-evidence-refresh-browser.js`
- `scripts/verify-portfolio-refresh-browser.js`
- `scripts/verify-project-navigation.js`
- `scripts/verify-project-reset-browser.js`
- `scripts/verify-recruiter-browser.js`
- `server/assistant.js`
- `src/assets/images/custom-projects/crewai-revenueops.png`
- `src/assets/images/custom-projects/eventops-low-code-streamlit.png`
- `src/assets/images/custom-projects/ms-assessflow.png`
- `src/assistant/ASSISTANT_README.md`
- `src/assistant/README.md`
- `src/assistant/conversation.js`
- `src/assistant/engine.js`
- `src/assistant/interpret.js`
- `src/assistant/knowledge.js`
- `src/assistant/repositoryEvidence.js`
- `src/assistant/retrieve.js`
- `src/assistant/specificAnswer.js`
- `src/assistant/supplementalEvidence.js`
- `src/assistant/taxonomy.js`
- `src/components/pages/Explore/Explore.css`
- `src/components/pages/Explore/ExploreProjectPreview.jsx`
- `src/components/pages/Explore/README.md`
- `src/components/pages/Explore/components/ExploreCards.jsx`
- `src/components/pages/Explore/components/SkillDetailPanel.jsx`
- `src/components/pages/Explore/tests/exploreIndex.test.js`
- `src/components/pages/Explore/utils/exploreIndex.js`
- `src/components/pages/Explore/utils/exploreProjectDetails.js`
- `src/components/pages/RecruiterView/utils/candidateEvidence.js`
- `src/components/pages/RecruiterView/utils/recruiterScoring.js`
- `src/components/pages/RecruiterView/utils/requirementVocabulary.js`
- `src/components/sections/AI/AI.jsx`
- `src/data/aiInventory.js`
- `src/data/auditedProjects.js`
- `src/data/currentCVEvidence.js`
- `src/data/cvProjects.js`
- `src/data/eventOps.js`
- `src/data/historicalProjectSources.json`
- `src/data/projectArtwork.js`
- `src/data/projectConcepts.js`
- `src/data/projectEvidence.js`
- `src/data/rebuildingProjects.js`
- `src/data/reviewedProjectFacts.json`
- `src/data/skillGroups.js`
- `src/data/skillNames.js`
- `src/data/timelineChapters.js`
