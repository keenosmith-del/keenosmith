# Keeno Smith engineering portfolio

React/Vite portfolio containing public project case studies, a searchable evidence catalogue, a deterministic Recruiter View, a bounded portfolio Assistant, three accepted CV versions and an EmailJS contact form. This repository contains the portfolio application and its verification tooling; it does not contain or deploy the separate source applications described by its case studies.

## Architecture

- `src/App.jsx`: React Router routes. Standalone pages load with React lazy/Suspense; homepage sections retain their existing design and animation lifecycle. Concrete project routes are declared once; placeholders cannot shadow them.
- `src/components/pages/projects/`: distinct case-study layouts. `shared/` contains existing navigation, modals, scroll and editorial styles. AWSBankingRisk/MicrosoftDevOps are protected visual references.
- `src/data/projectEvidence.js` and `reviewedProjectFacts.json`: source-reviewed facts, canonical/display identities, repository revisions, capabilities, configuration, deployment caveats and gallery eligibility. Historical retrieval records and company ventures are intentionally separate.
- `src/data/siteRoutes.js`: public canonical/alias metadata, sitemap coverage and conservative structured data. `scripts/build-route-html.js` emits static route heads and no-JavaScript summaries. This is not full React SSR; full interactive page bodies require JavaScript.
- `src/components/pages/Explore/`: catalogue search, filters, project artwork, skill evidence and credentials. Its curated gallery has 22 case-study destinations, independent of the larger retrieval archive.
- `src/components/pages/RecruiterView/`: local requirement extraction, exact/alternative technology matching, scoped evidence, weighted evidence alignment and separate qualification/experience/logistical checks. Percentages describe recognised evidence alignment, not hiring probability or proficiency. Missing evidence is not inability.
- `src/assistant/`: curated knowledge, retrieval, deterministic responses, bounded conversation and UI. `server/catalogue.generated.js` is generated before development/build and ignored by Git. `api/assistant.js` exports the server boundary for Vercel. Optional analytical inference requires server-only configuration and a shared production quota; factual career/credential answers remain curated.
- `src/components/pages/CV/data/`: accepted common and role-specific JSON; existing downloaded PDFs retain recorded SHA-256 hashes. `versions.js` assembles the three documents. The legacy `cv:pdf` command must not overwrite these accepted downloads; follow that directory's reconciliation README.
- `src/data/projectCountPolicy.js`: conservative implementation-family counting and an explicit owner-review flag for the existing public AI counter. Do not count company applications or historical versions as extra projects without reviewing the policy.

## Local setup

Use Node 24 and npm with the committed lockfile:

```sh
npm ci
npx puppeteer browsers install chrome
npm run dev -- --host 127.0.0.1
```

The matching Chromium download is needed for browser verification, not for visitors. Browser tooling is a development dependency. A normal development session needs no LLM or cloud credentials. The default Assistant is deterministic and browser fallback remains available if its API fails.

Build and preview:

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4181 --strictPort
```

Preview serves the generated extensionless HTML routes and existing Assistant API. Unknown paths/assets return 404; private application projects are not part of this output.

## Environment

Copy `.env.example` only when optional server inference is needed. `.env*` is ignored except the example. Never prefix server values with `VITE_`, commit credentials or log full visitor submissions.

| Setting | Purpose |
| --- | --- |
| `ASSISTANT_LLM_API_KEY` | Optional server provider credential |
| `ASSISTANT_LLM_BASE_URL` | HTTPS OpenAI-compatible provider base |
| `ASSISTANT_LLM_MODEL` | Explicit provider model |
| `ASSISTANT_RATE_LIMIT_URL`, `ASSISTANT_RATE_LIMIT_TOKEN` | Shared atomic production quota service, using an already configured service only |
| `ASSISTANT_RATE_LIMIT_PER_MINUTE`, `ASSISTANT_RATE_LIMIT_GLOBAL_PER_MINUTE` | Bounded per-IP/global inference limits |

Production inference fails closed to deterministic answers when quota configuration is missing/unavailable. This repository does not provision quota infrastructure or require a paid API for ordinary tests. EmailJS currently uses its existing public browser identifier; domain restrictions and account abuse protection must be checked in the owner's provider dashboard.

## Verification

```sh
npm run verify
npm run test:browser
```

`verify` runs lint, production build, existing Assistant/Recruiter/evidence-refresh suites, expanded qualification/API regressions, Explore assertions, catalogue destinations and static SEO validation. `test:browser` owns a local preview on port 4181 and runs the existing browser suites plus intercepted contact-failure/retry and raw HTTP/404 checks. Use an unused loopback URL through `PORTFOLIO_TEST_URL` when needed. Do not run another preview on that port simultaneously. All ordinary CI tests clear inference configuration and avoid live contact delivery.

Additional scripts:

| Script | Scope |
| --- | --- |
| `test:assistant` | Grounding, retrieval, conversation, mocked provider/quota safety |
| `test:recruiter` | Requirement semantics, provenance and arithmetic |
| `test:refresh` | Shared candidate/project facts and accepted CV hashes |
| `test:hardening` | Qualification adversaries, 11 constructed roles and API failures |
| `test:explore` | Catalogue, search, filters and evidence bands |
| `test:seo` | Generated heads, canonicals, sitemap and structured-data shape |
| `scripts/verify-hardening-visual.js final` | Five-width screenshot/overflow matrix, output outside Git |
| `scripts/measure-hardening-performance.js final` | Controlled local cold-route diagnostics; not field metrics |
| `scripts/production-smoke.js` | Read-only HTTP checks of the configured public origin |

Existing project/modal/navigation/style/CV/Assistant/Recruiter browser scripts remain under `scripts/`. The complete purposes and executed results are in the [hardening verification matrix](docs/portfolio-hardening/TEST_MATRIX.md). Large screenshots/downloads/logs are temporary artifacts, not production assets or committed proof of universal accessibility.

## Assets and deployment

Original artwork stays in source. Lossless WebP delivery assets and responsive variants are regenerated with `python3 scripts/optimize-images.py` using Pillow; full-size derivatives assert decoded RGBA equality. The small header/Assistant derivatives are resized for their actual displayed dimensions. Do not replace existing artwork or modify reference-page styles to mask regressions.

Vercel builds the static frontend and separate Assistant function. `cleanUrls` maps generated HTML files to existing routes; `404.html` handles unknown paths. Existing PDF compatibility redirects remain. CSP permits local scripts/media, existing inline styles and EmailJS connections. Verify actual preview responses before release.

GitHub Actions `Portfolio verification` builds/tests with no deployment step. Vercel's Git integration can independently create previews from branch pushes. A passing build, passing tests, preview success, production deployment and production smoke are separate release facts. Main was unprotected at the audit; require the verification check and owner review before a production merge. Do not merge or deploy production as a side effect of documentation/maintenance work.

See [portfolio hardening](docs/portfolio-hardening/README.md), [release readiness](docs/portfolio-hardening/RELEASE_READINESS.md), [Assistant architecture](src/assistant/README.md), [Recruiter architecture](src/components/pages/RecruiterView/README.md), [CV reconciliation](src/components/pages/CV/data/README.md) and [production smoke checklist](docs/portfolio-hardening/PRODUCTION_SMOKE_CHECKLIST.md). Source-inspected implementation, historical reports, candidate declarations, local test passes and verified public hosting are distinct evidence levels.
