# Microsoft AssessFlow case study

## Source review — 27 October 2026

Reviewed the clean application checkout at `/Users/keenosmith/Programming/Projects/ms-assesflow` (historical spelling). Local and remote main both resolve to `1ba858faee6841a2bb61b2132844b44614524055`; remote confirmed with `git ls-remote`. The application repository is read-only for this task.

Reviewed README, HANDOVER, portfolio engineering, system/data/workflow architecture, requirements, Microsoft setup, ADR 003, test results, Iteration 008 and staging workflow documentation. Checked assessment and Microsoft provider implementations, workflow/policy services, employee tools and Copilot assets, Entra/MSAL identity code, frontend routes/manifests, Bicep and CI/manual deployment workflows.

Verified source-recorded outcomes: 65 PostgreSQL-enabled backend passes, 33 release-safety passes, six frontend tests, three Playwright workflows, 13/13 offline assessment scenarios without live inference. All four hosted jobs passed for release-engineering commit `e1bea3ea845737635ea73d83faaa99f8fa2cee8c`: https://github.com/keenosmith-del/ms-assessflow/actions/runs/40310628897. These application checks are repository records, not newly run application tests during this portfolio task.

Microsoft boundary: implemented Foundry Responses, Language redaction, keyword Search, Entra JWT/MSAL, delegated Graph `/me` and signed workflow adapters; source-controlled Copilot instructions/topics/conversations/restricted connector. No live tenant inference/sign-in, published Copilot agent, actual tenant flow, Azure provisioning or staging execution is established. CI and Bicep compilation do not establish deployment. Current policy/model calls inside DB transactions constrain throughput; exact citations do not prove semantic groundedness.

Inspected portfolio references CrewAIRevenueOps, MicrosoftDevOps, EventOpsIntelligence, ClaudeProcurement and shared navigation/modal/scroll behavior. Preserve typography, cream canvas, muted labels and pill controls. AssessFlow receives an original open editorial composition: asymmetric title/supporting narrative, unboxed request lifecycle, aligned trust boundaries, policy evidence pipeline and typographic integration/verification lists. No dark panels or filled content cards. Per the subsequent user correction, only Source repository and disabled Visit platform appear in the hero. About project and Tech used are paired in the reading guide; Executive summary is in the about section, and Tech stack opens the shared modal from the technology section. No section groups more than two CTA buttons; the supplied document will be linked unchanged.

## Supplied PDF

`public/documents/ms-assessflow-executive-summary.pdf` is present, 77,519 bytes. SHA-256: `ea1dc03abf40d9be8ac5a265eb07c4187b71a66bd1e94544a8b4a162151364fa`.

## Delivery and validation

Created `MicrosoftAssessFlow/MicrosoftAssessFlow.jsx` and `MicrosoftAssessFlow.css`. The composition uses an asymmetric masthead, an open reading guide, unboxed lifecycle stages and clarification branches, aligned trust boundaries, an eight-step policy assessment, an editorial Microsoft integration list, permission contrasts and typographic verification/release progressions. All content stays on the cream canvas; only small pills and functional controls use fills. Hero type is regular weight, without a marker dot. Styling is locally prefixed `assessflow-`; shared CSS and other project-page files are unchanged.

### Action placement — final user instruction

The later user correction supersedes the attachment's six-hero-action instruction. There are **only two CTA buttons in the header**, and at most two grouped in any section:

| Action | Placement | Behavior |
|---|---|---|
| Source repository | Header | External repository link |
| Visit platform | Header | Disabled button; no invented URL |
| About project | Reading guide | Scrolls to `#about-project` and transfers focus |
| Tech used | Reading guide | Scrolls to `#tech-used` and transfers focus |
| Executive summary | About project | Normal link to the supplied PDF |
| Tech stack | Technology section | Opens the existing shared `ProjectModal` |

The understated platform note includes `mailto:keenosmith@kailor.co.za`. Anchors preserve a 78px scroll margin and use instant movement for reduced-motion preferences. Modal behavior is inherited from `ProjectModal`; navigation and scroll fading use `ProjectNavigation` and `useProjectPage`.

### Integration

- Canonical route `/projects/ms-assessflow` renders the custom page.
- Legacy `/explore/projects/ms-assessflow` renders the same page.
- Existing project evidence record now supplies the canonical route and published case-study status to Explore, assistant and skill panels. No duplicate record or tile.
- Explore-origin search/category return, direct-entry and reload fallback are verified.
- The original `ms-assessflow.png` and tile background `#b0814b` remain unchanged.
- The supplied PDF is served as `application/pdf` and its `%PDF-` signature and unchanged SHA-256 were checked over HTTP. No PDF regeneration or substitution.

### Executed portfolio checks

| Check | Actual result |
|---|---|
| `npm run lint` | Passed; existing unused `fs` warning in CV generator remains |
| `npm run build` | Passed; existing large-chunk advisory remains |
| `npm run test:assistant` | Passed, including intelligence/provider/context checks |
| `npm run test:recruiter` | Passed nine-role and evidence/provenance regressions |
| `npm run test:refresh` | Passed shared evidence and complete refresh checks, including protected CV hashes |
| `node --test src/components/pages/Explore/tests/exploreIndex.test.js` | Passed; 44 canonical projects, 22 gallery entries, 260 skills |
| `PORTFOLIO_TEST_URL=http://127.0.0.1:4178 node scripts/verify-project-navigation.js` | Passed all 22 Explore entry/return paths, filter retention and direct/refresh fallback |
| `PORTFOLIO_TEST_URL=http://127.0.0.1:4178 node scripts/verify-project-pages.js` | Passed all 44 desktop/mobile page combinations; no failures or browser errors |
| `node scripts/verify-assessflow-case-study.js` | Passed at 1440×900, 1024×900, 768×1000, 390×844 and 320×700 |

The focused browser regression checks: exact two-button header and six distributed actions; no more than two CTA buttons in any section; canonical/legacy routes; repository/email links; disabled platform; both anchor targets, offset and focus; supplied PDF hash; six-group modal, keyboard trap, Escape/close/backdrop, focus restoration, inert background and scroll restoration; every section's content bounds; consistent header button geometry; no horizontal overflow or large filled content containers; expected evaluation figures and explicit Microsoft/deployment limits; filtered Explore return, original tile color/image, canonical Bicep skill-panel link; direct/reload fallback; footer/floating top controls and reduced motion.

Captures and machine-readable results: `/tmp/assessflow-case-study-qa/` and `/tmp/portfolio-audit/`. Desktop/mobile hero, lifecycle and architecture captures were visually inspected. No app screenshots or videos were added to the page.

### Changed files

- `src/components/pages/projects/MicrosoftAssessFlow/MicrosoftAssessFlow.jsx` — original complete case study and shared interactions.
- `src/components/pages/projects/MicrosoftAssessFlow/MicrosoftAssessFlow.css` — open scoped responsive composition.
- `src/App.jsx` — canonical/legacy routes.
- `src/data/projectEvidence.js` — canonical AssessFlow path and case-study publication status.
- `public/documents/ms-assessflow-executive-summary.pdf` — supplied document, unchanged.
- `src/components/pages/Explore/tests/exploreIndex.test.js` — canonical route expectation.
- `scripts/validate-portfolio-refresh.js` — publication and route assertions.
- `scripts/verify-portfolio-refresh-browser.js` — completed AssessFlow page expectations.
- `scripts/verify-assessflow-case-study.js` — focused browser regression.
- `scripts/verify-project-pages.js` — include AssessFlow in the standard case-study suite.
- `docs/ASSESSFLOW_CASE_STUDY.md` — source/design review and delivery record.

### Verified stage commits

| Stage | Commit |
|---|---|
| Source evidence and open design review | `147254d` |
| Original page and distributed actions | `558967e` |
| Routes, Explore and supplied PDF | `83e47b7` |
| Responsive canvas and interaction verification | `790584a` |

Each stage was pushed normally to `origin/main`. Final regression integration and documentation follow this record. No force push, deployment, application-repository edits, unrelated page changes or CV rewrites. No requested asset is unavailable and no implementation blocker remains. Live Microsoft activation, native Copilot publication and staging deployment remain explicitly unperformed external work; they are not claimed as portfolio delivery outcomes.
