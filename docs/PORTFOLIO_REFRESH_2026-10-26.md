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
