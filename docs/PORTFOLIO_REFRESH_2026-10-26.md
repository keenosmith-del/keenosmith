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
