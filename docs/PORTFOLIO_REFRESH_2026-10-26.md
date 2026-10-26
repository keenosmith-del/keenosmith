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
