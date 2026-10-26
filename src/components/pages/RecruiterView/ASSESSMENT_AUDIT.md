# Recruiter assessment audit — 18 October 2026

## Sources actually inspected

This iteration read the existing Recruiter View scoring, importance, presentation and regression scripts; shared `knowledge.js`, `repositoryEvidence.js`, `supplementalEvidence.js`, taxonomy and prior `EVIDENCE_AUDIT.md`; current project listings/concepts/routes, EventOps data, Claude project page, CV JSON (`common.json`, `full-stack.json`, AI/cloud variants) and credential registry classifications. The prior 5 October repository audit is historical evidence, not a fresh inspection.

Two sibling working copies were available locally and read without mutation:

| Project | Local checkout revision | Files read for new scoped records |
| --- | --- | --- |
| EventOps Intelligence v.01 | `0decc5ed0867fc25c7bc2b93625a9f7da6e9f1c1` | `README.md`, `.github/workflows/ci.yml`, `render.yaml`, `backend/app/rag/generation.py`, `backend/app/rag/context.py`, `backend/app/rag/postgres_retrieval.py`, `backend/app/agents/workflow.py`, `backend/app/api/conversations.py`, `backend/tests/test_agent_pipeline.py` |
| Enterprise AI Customer Operations | `fff773c93cda452a2d3da968f5e3c1835884fb4d` | `README.md`, `.github/workflows/ci.yml`, `backend/src/worker.ts`, `backend/src/app.ts` |

Both checkouts were clean when checked. Curated records link to those pinned GitHub revisions. A connected GitHub check additionally inspected current default-branch Claude `README.md` (blob `e67a3958fef9d21546c2beeee4d23dfd9101a37c`), `backend/src/ai.ts` (blob `888520c426be0103466ebee9e8f57a71c990bd45`), `backend/package.json` (blob `e409b5fa8941e01b75d4d037331b19deef121317`) and `VERIFICATION.md` (blob `8656cc9599a21b8c1eeb44cb6a35078896b69eae`). Its repository is public and unarchived. The verification report is dated 2 October 2026; it is documentation of earlier execution, not a fresh test run.

This iteration did not execute these sibling applications or repeat live Gemini, Mailtrap, cloud deployment or provider tests. Project PDF brief contents were not newly extracted; findings above derive from the listed local source and documentation, not a claim of PDF inspection. No external employer or credential issuer was contacted.

## Evidence reconciliation

- **Gemini/EventOps:** previously absent from Recruiter View's canonical evidence despite current portfolio data. Added scoped source records for bounded Gemini generation, prompt/schema/citation handling, FastAPI, JSON, LangGraph orchestration, tool calls, context resolution, pgvector retrieval, verification tests, source-control CI and deployment configuration. The Gemini model name is the source snapshot's configured name, not a claim about current provider availability. Documented assessment deployment and maintenance remain distinct from observed commercial usage.
- **Anthropic/Claude:** the earlier audit asserts a built integration, the detailed page remains, the concept is planned and `App.jsx` excludes it from current project listings. These disagree. The connected GitHub check resolves implementation status: current `ai.ts` contains the official SDK integration, bounded tool loop, structured-output validation and explicit missing-key/error handling. Recruiter View credits that inspected local implementation and adds a current source record, rather than inheriting the old audit. `VERIFICATION.md` explicitly blocks unconditional lifecycle sign-off because live Anthropic execution lacks credentials. No live inference, deployment or production claim is added. Removal from the showcase is not evidence of removal from source. Shared Assistant history is intentionally unchanged.
- **Git/GitHub/Actions/CI/CD:** capability-specific workflow records from both inspected checkouts replace a listed-only assessment. Workflow configuration proves source-control/check configuration, not team collaboration, authorship proficiency, green current runs or enterprise release ownership.
- **HTML/CSS:** inspected portfolio JSX and scoped CSS support implementation; no separate proficiency claim.
- **API/async/design/orchestration:** FastAPI endpoints and worker code supply scoped source evidence. Current CV project descriptions add documented API contracts, relational data modelling and workflow orchestration. Architecture and lifecycle documentation are distinguished from operating systems at scale.
- **Docker/REST/testing/LLM integration:** additional current project and CV records improve retrieval. Extra projects do not add score bonuses. Local containerisation does not establish public deployment. Tests remain distinct from TDD, agent-safety certification and production operation.
- **Professional context:** current CV records AI training/evaluation at Turing/OpenTrain AI, kailor founder/consulting work, Firstdaes operational ownership and 3Play documentation. These support only the stated responsibilities, with candidate-declaration provenance. They are not converted into years of paid software employment.
- **Python:** more than three years is explicitly candidate-declared, separate from general engineering dates. No technology-specific start date, paid duration or production duration was invented.
- **Education/credentials:** current CV wording is BSc studies, not awarded degree. The supplied 324/360 credits are attributed to the candidate instruction because the CV JSON omits the credit count. Registry courses/labs/programmes/Applied Skills and preparation retain their classifications; no generic required certification is manufactured.

## Model and UX decisions

See [README](README.md) for the complete calculation and file map. The headline concerns core technical/delivery evidence only. Verification, logistics, ambiguous wording and manually assessed criteria are displayed separately. Responsibility weight now equals technology base weight. Alternatives and overlapping parents are consolidated before weighting. Preferred/conditional rows never inflate the headline or become essential gaps. Score labels describe support, not measured proficiency.

Sources are capability-specific; no source inspection bonus is inherited from a generic project flag. Product/version and transferable support remain visible. Unknown material clauses and residual named criteria are retained for review. The overview ranks evidence by importance and per-project supporting quality, limits project repetition and keeps detailed source wording, limitations and calculation diagnostics expandable.

Evidence/profile/project contents and the model/date form an invalidation key. No cached old result can be silently reused by the current page. No dependency or external runtime service was added.

## Validation results

The final iteration was checked with the commands documented in the README.

- Recruiter regression: passed all nine representative role fixtures and semantic/evidence mutation/reconciliation checks.
- Browser verification: passed desktop/tablet/mobile, reduced motion, controls, evidence/details navigation, strong/weak role cases and Assistant handoff.
- Production build: passed (existing bundle-size warning). Lint: passed with three existing unused-import warnings in `App.jsx`, `RecruiterMetadata.jsx` and `generate-cv-pdf.js`.
- Assistant expansion and intelligence: passed. The full Assistant suite encounters an existing `Missing route: /projects/microsoft` assertion in `scripts/validate-assistant.js:75`; the unchanged shared catalogue points at `/projects/microsoft` while the existing app route is `/projects/microsoft-devops`. Recruiter View normalises its own project link without changing unrelated navigation or shared Assistant behavior.

No TypeScript/typecheck script is configured in this JavaScript repository. Lint and production compilation are the configured static checks. Browser screenshots are temporary review artifacts under `/tmp`; they are not committed deliverables.

## Remaining limitations

The nine complete employer adverts were unavailable, so the fixtures explicitly identify themselves as representative excerpts. Deterministic extraction cannot guarantee complete interpretation of arbitrary prose, negation or deeply nested logic; the output makes no numerical completeness claim. Live Claude execution, most older remote repository HEADs, independently verified employment/credentials, measured scale, leadership, migrations and enterprise production outcomes remain open where the records do not establish them. No favourable outcome or target percentage is encoded.
