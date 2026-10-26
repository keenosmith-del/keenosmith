# Company portfolio iteration

Completed against the latest local `main`, refreshed from origin on 26 October 2026.
Baseline: `6f83e86`. The checkout was clean and matched origin before editing.

## Positioning and implementation

kailor insider is the independent publishing venture founded in 2024. Its research,
editorial work and examination of practical technology helped shape kailor,
established in 2025 as a founder-led technology consultancy and engineering company.
kailor covers technology consultancy, software engineering, AI and automation, and
cloud infrastructure. The consultancy application is one part of that business.
The ventures retain independent systems and distinct operating responsibilities.

The existing homepage heading, mascot, tile interaction, rounded controls and
cream/charcoal visual language remain. The feature tile background is exactly
`#f6e6da`; its pills are Software engineering, AI & automation and Cloud.
The current case study contains seven narrative sections, the shared project
navigation, scroll treatments and accessible technology modal.

Follow-up edits from the owner: the case-study header displays **February 2022**
(`datetime="2022-02"`). This display date does not change the founder-supplied venture
origins in the narrative. The requested wording change replaces “curiosity” with
“thinking”. Key company names, disciplines, technical decisions and availability
limits receive restrained bold emphasis in the updated website copy.

## Actual homepage copy

Heading: **intelligence, put to work.**

kailor insider began as an independent publishing platform I founded to explore developments and ideas in technology. That work grew into kailor, a technology consultancy bringing together software engineering, AI and automation, cloud infrastructure and practical business advisory. I approach the work by understanding what people and businesses need, then designing and delivering solutions that make sense for their context. Today, kailor insider continues as a dedicated place for publishing, discovery and conversation, while kailor turns the same thinking into engineered systems and practical outcomes.

Tile title: **Technology consultancy & engineering**

kailor brings together technology consulting, full-stack software engineering, AI and automation, and cloud infrastructure. My work spans discovery, assessment, solution design, implementation and ongoing improvement. The aim is to recommend and deliver technology that genuinely fits the problem, whether that means improving an existing process, integrating established tools or engineering something new.

## Launch, destinations and compatibility

- Fixed app target: **6 November 2026, 00:00 Africa/Johannesburg**, encoded as
  `2026-11-06T00:00:00+02:00` (5 November, 22:00 UTC).
- Exactly ten South African calendar days after 27 October; never rolling.
- Shared visible label: **Until app launch**. Accessible timers name that milestone.
  Seconds remain live; the duration is clamped at zero.
- **Visit kailor**: enabled primary anchor to `https://kailor.co.za`, with a new tab
  and `rel="noopener noreferrer"`, on the homepage and case study.
- **Visit kailor insider**: native disabled secondary button; no production URL.
- Canonical case study: `/companies/kailor`; anchors `#kailor` and `#kailor-insider`.
- Historical `/companies/kai`, `/companies/kailor-insider`,
  `/explore/projects/kai` and `/explore/projects/kailor-insider` redirect to the
  canonical publishing section. `/projects/company-websites` redirects to the
  case study; `/projects/kailor-ai` and `/explore/projects/kailor-ai` redirect to
  the platform section. Duplicate preview routes were removed.
- Source destinations: `https://github.com/keenosmith-del/kailor` and
  `https://github.com/keenosmith-del/kailor-insider`. Repositories may require
  authorised GitHub access; this is explained on the page.
- Current download: `/documents/kailor-insider-engineering-brief.pdf`.
  The previous PDF is preserved byte-for-byte under `docs/company/archive/`, outside
  public downloads. Vercel configuration redirects its former public URL to the
  current brief; that platform redirect needs deployment to take effect.

## Source verification and limitations

Both latest available local company checkouts were accessible; no company source
was modified. Reviewed revisions:

- kailor: `3d6d4598c67d58248c18bc8bbdbada45a58e713a`.
- kailor insider: `f5f3c2f3b83e7fb6ff7ac0e8f02ebce5c5f7a735`.

For kailor, reviewed README, backend manifest, Prisma schema, architecture,
project-workspace and solution-canvas iteration records, and public website
production-cutover documentation. The local canvas supports multiple selected
solutions and persisted consultancy intake with a founder inbox. Intake is not a
contract; commercial commissioning, billing and delivery tracking remain developing
workflows. The live static public website excludes private application services.

For kailor insider, reviewed README, package manifest, current architecture,
production-readiness and staging reports, plus article, authentication, media and
database services. The current implementation uses React Router SSR and TypeScript
inside an independent Cloudflare Worker with PostgreSQL and private media adapters.
It is owner-only with registration closed, not an open public publication service.
Article writes use version checks and transactions; nested transactions use savepoints.
The reviewed latest staging report documents password authentication CPU failures
and SSR/autosave runtime limits. Production readiness is not claimed. Hosted OAuth,
SMTP and AI operation are not independently verified by this iteration.

Company application test suites were **not** rerun. Old test counts and Express-based
publishing architecture were removed from current portfolio evidence. Repository
verification reports support scoped local implementation, not newly executed company
checks, live audience scale or client outcomes. Founding history is owner-supplied;
CV employment records and dates were preserved unchanged.

## Assistant and Recruiter View

Current structured project evidence describes the broader businesses and their
platforms. kailor insider has a current ID and source URL; legacy input is understood
without returning its retired display name. Explicit company answers share grounded
records across the local engine and conversational Assistant and stay authoritative
without optional model inference. Server instructions retain lowercase names and
availability distinctions. Unrelated skill, employment, qualification, tenure and
assessment boundaries remain intact. The generated server catalogue is rebuilt by
existing development/build commands and remains ignored by Git.

## Naming and document audit

Searched the entire tracked source tree, server, scripts, metadata, README, public
assets and documentation for retired names, casing, source URL, date and descriptions.
Extracted text from every public PDF: no retired company names, obsolete launch date
or old knowledge-hub description was found. The new four-page PDF was rendered and
all pages visually inspected; the changed first page was rendered again after the
wording follow-up.

No current visible retired brand remains in the reviewed company surfaces. Remaining
matches are intentional: PascalCase technical component paths/identifiers, legacy
route/redirect definitions and retired-name input recognition. Historical evidence
snapshots in `docs/evidence/` and the archived original brief retain their original
labels and are not used to generate current public company claims. Current public
copy, page title, buttons, source links, download and Assistant answers use lowercase
kailor and kailor insider.

## Materially changed files

- `.gitattributes` — treat PDF assets as binary documents.
- `README.md` — current lowercase company identity.
- `src/App.jsx` — current case-study imports and compatibility redirects.
- `src/components/sections/Kailor/Kailor.jsx` — homepage copy, services, background and CTAs.
- `src/components/sections/Kailor/Kailor.css` — scoped editorial emphasis.
- `src/components/pages/projects/KailorVentures/KailorVentures.jsx` — rewritten case study,
  renamed from the former combined component; header date, anchors, title and source links.
- `src/components/pages/projects/KailorVentures/KailorVentures.css` — retained styles,
  current internal names, narrative typography and emphasis.
- `src/components/pages/Company/Company.jsx` — legacy component compatibility redirect.
- `src/components/pages/ProjectPreview/ProjectPreview.jsx` — current fallback descriptions.
- `src/components/shared/LaunchCountdown.jsx` — app-launch labels.
- `src/components/shared/CompanyEmphasis.jsx` — scoped important-word emphasis.
- `src/data/companyLaunch.js` — fixed South African app launch target.
- `src/data/companyVentures.js` — current seven-part narrative and technology groups.
- `src/data/auditedProjects.js` — current company/platform evidence and boundaries.
- `src/assistant/companyAnswer.js` — grounded company identity, history and availability.
- `src/assistant/knowledge.js` — current descriptions and per-record evidence dates.
- `src/assistant/specificAnswer.js` — authoritative company answers and lowercase name.
- `src/assistant/conversation.js` — lowercase company identity.
- `server/assistant.js` — current company instructions and naming.
- `src/components/pages/RecruiterView/README.md` — lowercase display name only.
- `src/components/pages/RecruiterView/ASSESSMENT_AUDIT.md` — lowercase display name only.
- `scripts/verify-assistant-browser.js` — current footer assertion.
- `scripts/verify-company-iteration.js` — company, countdown and responsive regression.
- `scripts/generate-company-brief.py` — reproducible PDF generation from case-study content.
- `public/documents/kailor-insider-engineering-brief.pdf` — current engineering download.
- `docs/company/archive/kailor-kai-engineering-brief.pdf` — preserved original, moved out of public.
- `vercel.json` — legacy PDF URL redirect.
- `docs/company/IMPLEMENTATION.md` — this implementation/evidence report.

## Verification

Results and commit records are appended after final checks below.

Executed successfully:

| Check | Result |
| --- | --- |
| `npm run lint` | Pass; one pre-existing unused `fs` import warning in the CV PDF generator |
| `npm run build` | Pass; existing bundle-size warning remains |
| `npm run test:assistant` | Pass: 12 targeted journeys, 20 broad queries, intelligence/provider/bounds/quota checks |
| `npm run test:recruiter` | Pass: 9 representative roles and scoring/provenance regressions |
| `npm run test:refresh` | Pass: shared exact-tool, duration, education, follow-up, status and fingerprint checks |
| `PORTFOLIO_TEST_URL=http://127.0.0.1:5174 npm run test:recruiter:browser` | Pass: standalone navigation, controls and responsive journeys |
| `PORTFOLIO_TEST_URL=http://127.0.0.1:5174 node scripts/verify-assistant-intelligence-browser.js` | Pass: suggestions, context, clear/cancel, fallback, close/reopen, 5 widths, every catalogue route, Explore and Recruiter View |
| `PORTFOLIO_TEST_URL=http://127.0.0.1:4174 node scripts/verify-company-iteration.js` | Pass: company identities, authoritative fallback, 320/390/768/1024/1440px, content/background/CTAs, keyboard focus, caption bounds, modal, anchors, 7 compatibility routes, PDF HTTP 200, date boundary and zero timer |
| Document file and Vercel redirect configuration checks | Pass; actual hosted redirect not claimed before deployment |
| `git diff --check` | Pass |

The existing Assistant browser script had a stale expectation for “documented”
while the baseline scoped React answer already said “implemented”. The assertion
now checks implemented React evidence and an evidence section; no runtime answer
was changed to satisfy obsolete wording. The script then passed in full.

During review, the company browser harness was corrected to establish keyboard
modality, wait for native anchor scrolling, and wait for scroll fades and lazy
images before screenshots. Final responsive checks use the stable production
preview rather than a development page that reloads during edits. No unresolved
company-route, overflow or runtime error was recorded in the passing run.

The mobile tile overlay is scoped to this feature tile, so the longer copy retains
contrast over the mascot. The exact base colour remains `#f6e6da`. Screenshots and
machine-readable browser results are in `/tmp/portfolio-company-qa/`; this temporary
QA output is not included in the production site. The four-page brief was inspected
as rendered page images and its text shares the case-study narrative source.

Additional changed validation file:
`scripts/verify-assistant-intelligence-browser.js` — checks current scoped evidence
rather than the obsolete answer wording described above.

## Staged commits and pushes

Each completed stage was committed on the existing `main` and pushed successfully
without force-pushing:

1. `ffdd546` — homepage positioning, service copy and exact tile background.
2. `4cfd671` — substantive case study, source-reviewed narrative, regenerated PDF
   and preserved historical brief.
3. `91f50a0` — fixed app target, enabled company website, disabled publication CTA,
   current internal component names and compatibility routes.
4. `6f73bce` — current company evidence, grounded Assistant answers and shared
   Recruiter View consistency, after existing regression suites passed.
5. Final verification stage — this report, owner follow-ups, emphasis, mobile
   readability, duplicate-route correction, document redirect and company regression.
   Its commit SHA and push result are reported in the completion message.

No force-push, unrelated employment/CV rewrite, company-repository mutation, new
production destination for kailor insider, or claim of newly verified hosted company
application operation is part of this iteration. Git pushes are verified separately
from the hosting provider's eventual deployment; this task does not establish that
an automatic hosting deployment has completed.
