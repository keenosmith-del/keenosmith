> Hardening update 27 October 2026: completed BSc CS is a candidate declaration, not a universal qualification pass. Exact discipline/level and explicit award requests are checked separately. See [hardening decisions](../../../../docs/portfolio-hardening/iterations/001-evidence-integrity/DECISIONS.md). This supersedes broad completion claims in the historical audit below.

> Candidate facts refreshed on 18 October 2026: the shared CV-derived profile uses 6+ overall relevant years, a separate more-than-three-year Python record, and completed degree requirement assessment under candidate instruction. Credit-count and incomplete-degree presentation are superseded. See the [shared audit](../../../../docs/evidence/REFRESH_REPORT.md) and [maintenance process](../../../../docs/evidence/REFRESH_PROCESS.md).

# Recruiter View

Route: `/recruiter-view`. This iteration keeps the existing standalone page, local deterministic execution, React state, shared portfolio catalogue and credential records. It adds no dependencies, paid services, runtime repository fetching, persistent assessment storage or external AI calls. Unrelated portfolio pages and Assistant behavior are unchanged.

## Implementation map

- `utils/requirementVocabulary.js`: bounded aliases, longest-span product matching, explicit versions and responsibility patterns. Shared skill names supply vocabulary, not automatic requirements.
- `utils/requirementModel.js`: source clauses, section inheritance, local importance, accepted alternatives, individual conjunction obligations, duration scope, qualification routes, deduplication, ambiguity and retained review criteria. Replaces the previous `requirementImportance.js` helper.
- `utils/candidateEvidence.js`: a capability-scoped reconciliation layer over the shared canonical projects, credentials and current CV JSON. New inspected facts and reconciled historical claims live here; it does not change the Assistant's older audit.
- `utils/recruiterScoring.js`: evidence decisions, separate verification/logistics, ranking, diagnostics, model/evidence fingerprint and freshness checks.
- `components/RecruiterAssessment.jsx`: concise interpretation, core gaps, separate qualification/logistical checks, expandable wording, alternatives, capability-specific sources and calculation details.
- `scripts/fixtures/recruiter/roles.js`: **representative excerpts**, created from the supplied summaries of nine roles. Complete original adverts were not available. No claim is made that these fixtures reproduce their full wording.
- [October audit and validation](ASSESSMENT_AUDIT.md): inspected sources, findings, limitations and verification results.

## Root causes addressed

The previous engine flattened all entity matches into independent technology rows, losing alternative/conjunction semantics. Broad category rows overlapped tools. Any mention of certification manufactured “Required certification”; degree wording was not grouped with accepted experience routes. Tenure was always zero, without considering the actual requested context or documented independent engineering. A source file anywhere in a project gave every associated capability an inspection bonus. Additional project count and training bonuses could obscure specificity. Broad category expansion and short names produced contextual false positives. Responsibilities and unknown material criteria had no systematic representation. Stale catalogue statuses and missing current CV/EventOps records limited retrieval.

## Requirement semantics

Each row retains source phrases, section, importance, evidence needed, terms, group logic, status, records and limitations. Technology versions remain distinct. `Docker and Kubernetes` creates two obligations; `Fastify/Express/NestJS` creates one accepted-alternative row. Comma lists ending in “or” and optional “or similar” IaC routes are grouped. Tool-specific IaC and its parent do not enter the denominator twice. A required generic cloud capability remains scored when Azure is merely preferred. Examples following “such as” are conditional rather than mandatory tools.

Required/minimum/must-have/Required DNA headings inherit importance. Desired/advantageous/preferred/nice-to-have sections inherit preference. Inline modifiers refine individual technology mentions. Conditional wording and conflicting required/preferred or React-or-Next versus React-and-Next wording remain visible. Repeated mentions retain distinct source phrases but do not multiply the denominator. Conflicting alternative/conjunction wording uses the mean of the conflicting group's members as a conservative diagnostic, explicitly marked for review; standalone overlapping members carry no second weight.

Responsibilities include delivery lifecycle, architecture, debugging, review/quality, integration, databases, testing, deployment, operations, legacy work, scale, leadership, consulting, collaboration, business translation, security and AI/platform-specific work. Unrecognised clauses and residual named terms are retained for review. This is a conservative heuristic, not a guarantee of complete semantic extraction.

CV/cover-letter instructions and application sections are excluded from capability scoring. Logistics retain original wording in a separate section. Role title/company labels are metadata, not invented requirements.

## Evidence and qualification decisions

Source/configuration inspection is scoped to an explicit fact and capability. Earlier repository audit claims are labelled documented implementation, with the earlier date and a statement that remote source was not re-inspected. Project count is not evidence depth. A record carries capability, product/platform, project, implementation status, fact, source, provenance, context/dates, limitations, revision and review/inspection date.

EventOps connects implementation, tests, documented public assessment deployment and subsequent maintenance within one project. This supports a bounded lifecycle claim, not enterprise production ownership or scale. Vector retrieval does not establish vector-database operations. Automated tests do not establish TDD. Fine-tuning receives transferable support from declared SFT data preparation, not an implementation claim. Generic C#/.NET cannot establish .NET 8 backend experience. Azure OpenAI/OpenAI transfer and IAM platform differences remain explicit. Missing, conflicting and explicitly confirmed gap records have different statuses.

The current CV's Turing/OpenTrain AI, kailor founder/consulting, Firstdaes and 3Play contexts remain distinct. The older 2022 independent engineering timeline is retained as a year-only candidate declaration. For a minimum general engineering threshold, the latest possible start (31 December 2022) is used; for upper bounds the earliest date is considered. Overlapping roles are not added. General engineering dates cannot establish a technology-specific, cloud-platform, paid-employment or production duration. More than three years of Python is a candidate declaration, not paid or production tenure. Upper bounds are level constraints and never capability bonuses.

UNISA is recorded as studies, **324/360 credits by candidate declaration**. Current CV JSON says BSc studies (2017–2022), without an awarded degree or credit count. An explicitly awarded degree remains unresolved. An explicitly permitted practical-experience route can have candidate-declared support. Named certifications stay named and keep their optional/required context; courses, labs, badges, programmes, certification preparation and professional certifications are not interchangeable. No issuer verification was performed.

## Calculation

One headline: **core technical and delivery evidence alignment**. It is not overall role suitability.

| Evidence basis | Points |
| --- | ---: |
| Capability-specific inspected source/configuration | 80 |
| Documented implementation | 65 |
| Current CV-declared professional responsibility | 40 |
| Explicit transferable support | 30 |
| Training only | 25 |
| Listed capability | 15 |
| Missing, conflicting or confirmed gap | 0 |

Within an accepted alternative group, the best supported accepted route is selected; unused alternatives incur no penalty. Technology and delivery rows have equal base weight. Essential rows weigh 1.5 and standard rows 1. Preferred and conditional rows are assessed and shown but have zero headline weight. This deliberately prevents strong preferences masking unresolved core criteria. No repeated-mention, extra-project or training bonus is applied.

Qualifications/tenure, logistics, review-only rows and overlapping parents have zero headline weight and appear separately. The result is `round(sum(score × weight) / sum(weight))`; an empty denominator displays no percentage. Per-row contributions, numerator, denominator and all exclusion reasons are exposed in diagnostics. Category summaries aggregate the very same core technology rows and add no new weight.

Evidence labels are primary. The coverage text states the count of scored core rows with project records. There is no high/moderate completeness label, numerical extraction-completeness estimate, proficiency estimate or hiring probability. Review criteria and qualification verification must be read alongside the technical percentage.

## Freshness and presentation

`MODEL_REVISION`, `EVIDENCE_REVISION`, a deterministic fingerprint of full evidence/profile/project data, and the assessment date identify results. `assessmentKey` includes input, model, evidence/profile fingerprint and date. `isAssessmentCurrent` rejects changed evidence/profile/model/date; the page refuses to display a stale in-memory result. There is no persistent assessment cache to migrate. Any future cache must use this key and validation function. Changes to extraction/scoring rules require bumping `MODEL_REVISION`.

Overview ordering considers core importance and support, and project ranking uses each project's own relevant record provenance. Only three projects are shown in the overview; full requirement records remain expandable. Categories and training are disclosures. Qualifications, gaps and review criteria remain visible above details. Original cream/charcoal styles, responsive layout, reduced motion, processing cancellation, keyboard controls and project/CV links are retained. Title and company have an explicit separator and separate display line.

## Validation

- `npm run test:recruiter`
- `npm run test:recruiter:browser` with Vite running; optional `PORTFOLIO_TEST_URL`
- `npm run lint`
- `npm run build`
- Existing `npm run test:assistant` and independent expansion/intelligence scripts.

Regressions assert semantics and provenance rather than favourable score constants: nine representative roles, alternatives, conjunctions, examples, optional gaps, scoped tenure, qualification routes, false positives, product specificity, unsupported production/scale/leadership, duplicate denominator protection, unknown criteria, evidence upgrades/downgrades, confirmed versus missing gaps, stale model/evidence/profile detection, determinism and exact score reconciliation.

Browser checks cover strong and weak representative roles, original wording/details/source access, desktop/tablet/mobile (320–1440px), no horizontal overflow, reduced motion, reassessment, reset/cancellation, input validation, navigation and Assistant handoff. Screenshots use `/tmp/recruiter-*.png`. These are automated viewport checks, not physical-device tests.

## Remaining limits

Natural-language negation, arbitrary nested qualification logic, implicit organisational requirements and unusual formatting can still require manual interpretation. Residual-name detection can over-report review needs. Most older projects have not been freshly checked at remote HEAD; no runtime crawler is introduced. Source presence/configuration does not establish successful execution, ongoing uptime, employment verification or scale. Current Claude source establishes a local integration, while live model execution remains unverified; its planned concept/showcase exclusion does not override inspected implementation. Full original adverts and independent issuer/employer verification remain unavailable.
