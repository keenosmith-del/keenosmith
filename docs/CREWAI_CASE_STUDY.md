# CrewAI RevenueOps case study

## Source review — 27 October 2026

Read-only review of `/Users/keenosmith/Programming/Projects/crewai-revenueops` at `f7270742ec3c81dcd7532ebf222f2280f4e8e8b7`; `git ls-remote origin refs/heads/main` confirmed the same remote revision. The application repository was not modified or tested as part of this portfolio work.

Reviewed README; portfolio engineering/handover; system architecture; architecture decisions; financial controls; agent engineering; testing results and Iteration 010 results/stage records. Implementation checked in accounting/money, ledger/workflow services, investigation crew, typed reconciliation Flow, scoped evidence tool, leased worker, React routes/package manifest, and verification/staging workflows.

Source links use that immutable revision under [the repository](https://github.com/keenosmith-del/crewai-revenueops/tree/f7270742ec3c81dcd7532ebf222f2280f4e8e8b7). [Recorded Stage 3 CI](https://github.com/keenosmith-del/crewai-revenueops/actions/runs/40372045437) belongs to `c525294dd7661c6e79c0ffada064e34b1d3755d6`, preceding the receipt commit. These are source-recorded results, not application tests newly run by the portfolio:

- Deterministic constructed regression: 13/13 classifications and exact proposals.
- Iteration 010 fixed cases: CrewAI 0/4 exact; deterministic baseline 1/4.
- Sealed holdouts: CrewAI 1/7 exact; baseline 4/7.
- 24/24 successful reads; nine of eleven cases fail typed output; zero agent ledger allocations.
- 100 backend/release tests, five frontend components, five hosted browser workflows, all five required hosted jobs passed.
- Staging automation prepared; no registry publishing, staging/production deployment or infrastructure provisioning executed. Four scoped, expiring transitive Chroma server advisories remain documented.

Portfolio patterns inspected: EventOpsIntelligence, MicrosoftDevOps, SREChaosEngineering, OllamaPrivateBI, shared navigation/modal/page hook/styles, App routes, project artwork and Explore index/cards/previews. Retain cream/charcoal palette, pill controls, restrained type, shared modal/focus semantics, origin-aware navigation and scroll fading. Create a distinct composition around financial authority: branching payment journey, responsibility map, specialist reading panel, financial invariant cards, durable execution rail and a plain comparison table retaining negative model findings.

## Supplied summary

`public/documents/crewai-revenueops-executive-summary.pdf` exists (122,407 bytes at review). SHA-256: `a7e876b5f28a2da1754b3d2c460d250cfeed12e80336eb0b4a0f6b7b54f8bd45`. Use this supplied file without regenerating or substituting it.

## Implementation and verification

Implemented a custom light editorial page with a distinct authority key, six-stage payment journey and inference bypass, central PostgreSQL responsibility map, specialist crew composition, charcoal financial controls, leased execution/recovery narrative, exact model/baseline comparison, release evidence, grouped stack modal and reflective conclusion. Uses the existing navigation, modal and scroll-fade hook. Page styles use the `revenueops-` prefix; shared styles and unrelated project pages were not edited.

Canonical route: `/projects/crewai-revenueops`. The legacy `/explore/projects/crewai-revenueops` renders the same completed page. The shared evidence record now marks only CrewAI's case study as published and supplies the canonical route to Explore, skill panels and assistant consumers. It remains one project and one tile. Existing tile artwork, hover presentation and `#353336` color are unchanged.

Final user refinement: the hero contains only Source repository and disabled Visit platform. Executive summary appears in the project-summary section. Browser assertions limit each section to at most two action buttons. The supplied PDF is served with `application/pdf`, `%PDF-` signature and its unchanged SHA-256.

### Executed portfolio checks

- `npm run lint`: passed with the pre-existing unused `fs` import warning in `scripts/generate-cv-pdf.js`.
- `npm run build`: passed; existing large-chunk advisory remains.
- `npm run test:assistant`: passed.
- `npm run test:recruiter`: passed.
- `npm run test:refresh`: passed, including protected CV hashes.
- `node --test src/components/pages/Explore/tests/exploreIndex.test.js`: passed; 44 canonical projects, 22 gallery projects, 260 skills.
- `PORTFOLIO_TEST_URL=http://127.0.0.1:4178 node scripts/verify-project-navigation.js`: passed all 22 Explore entry/return paths, filters, direct/refresh fallback and reduced-motion checks.
- `PORTFOLIO_TEST_URL=http://127.0.0.1:4178 node scripts/verify-project-pages.js`: passed 42 page/viewport combinations, no failures or browser errors. This now includes CrewAI. The initial run exposed a stale test that required every hero date to be in 2026; the assertion now accepts a valid month/year, retaining kailor's user-requested February 2022. No company page change was made.
- `node scripts/verify-crewai-case-study.js`: passed at 1440×1000, 1024×900, 768×1000, 390×844 and 320×700. Checks hero fit, every section's content bounds, canonical and legacy routes, exact evaluation values, deployment disclosure, source/PDF links, supplied PDF hash, modal focus/trap/Escape/close/backdrop/body-lock restoration, Explore search/category retention, skill-panel link, refresh fallback, footer/top controls, reduced motion and two-action section limit. No browser errors.

Browser captures and machine-readable results: `/tmp/crewai-case-study-qa/` and `/tmp/portfolio-audit/`. Desktop and mobile captures were inspected, including the hero, journey, architecture, specialist roles, controls and evaluation. Initial PDF test navigation encountered Chrome's embedded viewer HTML; the final test reads and hashes the actual HTTP PDF response instead. This was a test-harness correction; the supplied document was present throughout.

### Changed files

- `src/components/pages/projects/CrewAIRevenueOps/CrewAIRevenueOps.jsx` — complete custom page and shared interactions.
- `src/components/pages/projects/CrewAIRevenueOps/CrewAIRevenueOps.css` — scoped responsive composition and reduced-motion support.
- `src/App.jsx` — canonical and compatible legacy routes.
- `src/data/projectEvidence.js` — canonical path and published case-study status.
- `public/documents/crewai-revenueops-executive-summary.pdf` — supplied document, unchanged.
- `src/components/pages/Explore/tests/exploreIndex.test.js` — canonical route expectation.
- `scripts/validate-portfolio-refresh.js` — publication and route assertions.
- `scripts/verify-portfolio-refresh-browser.js` — completed CrewAI page expectations alongside the other two previews.
- `scripts/verify-crewai-case-study.js` — dedicated browser regression.
- `scripts/verify-project-pages.js` — include CrewAI and accept the existing valid company date.
- `docs/CREWAI_CASE_STUDY.md` — evidence review, design, verification and delivery record.

### Verified stage commits

| Stage | Commit |
|---|---|
| Source evidence and design review | `4f606c9` |
| Complete custom page composition | `fff7776` |
| Routes, Explore and supplied PDF | `72f6d51` |
| Responsive refinement and interaction checks | `1494eeb` |

Each stage was pushed normally to `origin/main`. Final verification/documentation and the two-button refinement are committed after this record. No force push, deployment, application-repository changes or CV rewrites were performed. No required asset is missing; there are no remaining implementation blockers. Application deployment and stronger-model evaluation remain explicitly unperformed source-project work, not portfolio delivery claims.
