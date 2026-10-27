# CrewAI and AssessFlow consistency correction — 27 October 2026

## Authority and audit

Read the complete AWSBankingRisk and MicrosoftDevOps JSX/CSS as the read-only styling authorities, then inspected both target pages, shared page/navigation/modal utilities, App routes and Explore cards/presentation. Both custom pages are already tracked on main; working tree started clean.

The targets departed from the references in hero hierarchy/proportions, section widths/typography, summary/technology action placement and surfaces, back-control treatment, distributed footer layout and floating-control geometry. CrewAI additionally used many filled surfaces, including dark architecture and financial-control panels. AssessFlow had an extra reading-guide/CTA section and asymmetric masthead. Both used several slogan-like headings rather than concise technical descriptions.

Rebuild the two page compositions with the existing shared hero sizing and the references' section-label/copy structure, 960px editorial sections, exact Microsoft control declarations, centered 40px footer pair and translucent 38px floating control. Retain local technical composition and verified facts. Replace old target CSS rather than appending corrections. Preserve the earlier explicit request for regular-weight “Intelligence” and no marker dot.

Do not edit reference pages, other source files, application repositories or PDFs. A manifest of 254 protected source/document hashes is stored at `/tmp/project-style-correction/protected-files.json`. Reference screenshots at desktop/tablet/mobile are captured before target changes under `/tmp/project-style-correction/before/`.

## Verification record

## Rebuild

Both JSX compositions now use the reference sequence: fixed back pill; technology/date topline; shared-sized title; concise description and status; Source plus disabled Visit platform; deployment notice; labelled overview and summary; technical sections; Technology and stack trigger; technical closing; centered footer pair.

Both CSS files were replaced with consolidated, scoped reference-based rules. The common control, hero, section, pill, footer and hover declarations follow MicrosoftDevOps; shared ProjectPage.css still supplies the established responsive hero sizing and modal. No corrective override block was appended to the old design. CrewAI's architecture, reconciliation, routing, recovery, evaluation, release and stack containers now sit directly on the cream canvas. AssessFlow's asymmetric masthead and extra reading-guide actions were removed. Both summary controls sit at the end of their overview; stack triggers sit below the Technology groups.

Common behavior and verified geometry:

- Header has exactly **Source** and disabled **Visit platform**, with the correct repositories, GitHub icon and no fabricated platform URL.
- Both deployment notices use the requested wording and working contact email, with the reference width, margins and typography.
- Fixed back controls use the reference translucent surface, shadow, blur, hover, dimensions and mobile 14px offsets. Existing Explore origin logic is unchanged.
- Footer controls are adjacent and centered: 40px link/button height, 40px arrow width, 7px gap, neutral surface and reference hover.
- Floating ArrowUp is 38px, right/bottom 22px, translucent with 14px blur and reference shadow/hover. It appears after 300px and is removed when the observed footer enters view. Reduced-motion top scrolling is instant.
- Shared ProjectModal, keyboard containment, close/backdrop, focus restoration and scroll lock remain intact.

CrewAI retains its own reconciliation stages, four-role composition, lease/checkpoint recovery and model comparison table. AssessFlow retains request states, policy assessment, Microsoft adapter boundaries, authorization and release preparation. Technical headings replace the prior slogan-style headings; repeated overview/closing claims were reduced. CrewAI retains 13/13 deterministic regressions; fixed 0/4 versus 1/4; holdouts 1/7 versus 4/7; 24/24 reads; 9/11 typed failures; no improved 3B investigation accuracy. AssessFlow retains 65 backend, 33 release, six frontend, three browser, 13/13 offline and four hosted job results. Both still distinguish repository-recorded application checks from tests run by the portfolio and retain unexecuted deployment limits.

## Executed checks

| Command | Actual result |
|---|---|
| `npm run lint` | Passed; existing unused `fs` warning in CV generator |
| `npm run build` | Passed; existing large-chunk advisory |
| `npm run test:assistant` | Passed |
| `npm run test:recruiter` | Passed |
| `npm run test:refresh` | Passed, including protected CV checks |
| `PORTFOLIO_TEST_URL=http://127.0.0.1:4178 node scripts/verify-project-navigation.js` | All 22 Explore entry/return paths passed |
| `PORTFOLIO_TEST_URL=http://127.0.0.1:4178 node scripts/verify-project-pages.js` | 44 page/viewport checks passed; zero failures/errors |
| `node scripts/verify-crewai-case-study.js` | Passed all five widths, routes, content/evaluation, supplied PDF hash, modal/focus/scroll, Explore and reduced motion |
| `node scripts/verify-assessflow-case-study.js` | Passed all five widths, corrected action placement, content, supplied PDF hash, modal/focus/scroll, Explore and reduced motion |
| `node scripts/verify-project-style-consistency.js` | Four rendered pages at 1440, 768 and 390px; zero differences against MicrosoftDevOps in compared common-control/hero/section/modal styles, normal and hover states; footer geometry, floating behavior and reduced motion passed; 254 protected hashes unchanged |

Focused tests were updated for the new requested layout rather than removing meaningful verification: Source label and contact note are asserted, Intelligence remains regular, executive summaries must be in overview actions, and stack triggers must be in Technology. AssessFlow now asserts four page CTAs and the absence of the superseded reading-guide section. The new cross-page test additionally compares actual computed style properties, hover states and footer geometry; it rejects filled technical containers on both targets.

## Visual comparison

AWS Banking Risk and Microsoft DevOps were rendered as read-only authorities beside CrewAI and AssessFlow. Captures include hero, overview, technology, modal, back/CTA/summary/stack/floating controls and footer at desktop, tablet and mobile. Side-by-side hero, overview, control, footer and modal boards were visually reviewed, including settled opening/scroll-fade states. Common visual language matches; technical sections retain distinct structures and facts.

- Complete side-by-side report: `/tmp/project-style-correction/after/comparison.html`.
- Boards: `comparison-{hero,summary,technology,modal,footer,controls}-{1440,768,390}.png` in that folder.
- Machine-readable compared properties: `/tmp/project-style-correction/after/results.json`.
- Focused full-page/section captures: `/tmp/crewai-case-study-qa/`, `/tmp/assessflow-case-study-qa/`.
- Existing suite captures/results: `/tmp/portfolio-audit/`.

The protected-file manifest confirms unchanged AWS/Microsoft reference pages, shared/global/source files outside the two targets, App/Explore integrations and supplied PDFs. No application repository, CV or unrelated page was edited; no deployment occurred. Canonical and legacy routes and existing source/PDF links are preserved. No outstanding correction blocker remains.

## Changed files and stages

1. `src/components/pages/projects/CrewAIRevenueOps/CrewAIRevenueOps.jsx`
2. `src/components/pages/projects/CrewAIRevenueOps/CrewAIRevenueOps.css`
3. `src/components/pages/projects/MicrosoftAssessFlow/MicrosoftAssessFlow.jsx`
4. `src/components/pages/projects/MicrosoftAssessFlow/MicrosoftAssessFlow.css`
5. `scripts/verify-crewai-case-study.js`
6. `scripts/verify-assessflow-case-study.js`
7. `scripts/verify-project-style-consistency.js`
8. `docs/PROJECT_STYLE_CORRECTION.md`

Verified stage commits pushed normally to `origin/main`: `80573b8` (authority audit), `c85b7fd` (both rebuilt pages), `4da0bda` (focused and exact-reference regressions). Final verification/report commit follows this record. No force-push or history replacement.
