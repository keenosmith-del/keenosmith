# Low-Code Streamlit EventOps case study — 27 October 2026

## Source and reference review

Remote main verified with `git ls-remote`: `084bd04336f2a92672c6b4285527ed0591582ec3`. The clean local application checkout is at `a1dab9d8942a5fad27e71fb828bd5da274f5a382`; GitHub's commit comparison reports one merge commit ahead and **no changed files**. The local source therefore matches the reviewed main tree. No application-repository mutation is needed or authorised.

Read README, architecture/design/comparison/compliance docs, Iteration 002 acceptance/tests and Iteration 003 readiness/tests/security/deployment architecture/runbook. Inspected app.py, semantic index/query planner/evaluation, deterministic pipeline, SQLAlchemy persistence and lifecycle, agent contracts/tool validation, actual workflow JSON, deployment definitions/scripts and quality CI. Verified 31 verification nodes, 11 agent nodes and three read-only tools in source.

Repository-recorded results: 147 regressions on macOS and disposable Linux ARM64; 19×384 FastEmbed vectors, 30/30 behavioral cases, 25 ranked cases, Recall@5/MRR 1.0; actual main n8n scenario produces eight records (3 verified, 2 review, 2 rejected, 1 incomplete), with two duplicate inputs merged. Verified outputs include two event observations and one participant. Successful Python/container CI at release implementation `4f926f46d3d19421354e67b7f70a0b798ce99840`: https://github.com/keenosmith-del/eventops-intelligence-streamlit/actions/runs/39552175515.

Boundaries retained: controlled synthetic Calendar/Web HTTP versus actual read-only Mailtrap; holiday observations are not registrations. Iteration 002 includes actual Gemini tools and an invalid shortened citation rejection before a focused accepted run. Gemini stayed disabled in Iteration 003 pending billing/free-tier confirmation. Release real-browser acceptance was blocked by ERR_BLOCKED_BY_CLIENT; AppTest is not a replacement browser pass. No public hosting, provisioned provider infrastructure, hosted database acceptance, durable queue or automatic distributed recovery is claimed.

Re-inspected actual AWS/Microsoft JSX/CSS and shared navigation/modal/page utilities, original EventOps, corrected CrewAI/AssessFlow, App/Explore/evidence/artwork. Use the exact reference common controls and editorial geometry, with a distinct knowledge/orchestration/verification composition inside technical sections. Keep the original EventOps untouched.

## Supplied executive summary

`public/documents/eventops-streamlit-executive-summary.pdf` is present. SHA-256: `5136863ffa695d9124a45670f3e6ed2bd4f5ea3f5d1487d9db73d5b5d0269e19`. Link the supplied document unchanged from the overview.

## Implementation and verification

Created `src/components/pages/projects/EventOpsStreamlit/EventOpsStreamlit.jsx` and `EventOpsStreamlit.css`. The page covers native interface ownership, the two-lane architecture, semantic index/query planning and separate evaluation, real n8n source orchestration, deterministic verification, bounded Gemini tools and observed citation rejection, replay/CAS/checkpoint uncertainty, workspace review/exports, release checks, deployment boundaries and comparison with the original application. Technology is grouped from actual source, with the shared stack modal below the groups.

Canonical route `/projects/eventops-streamlit` and compatibility route `/explore/projects/eventops-streamlit` render the same page. The existing canonical record is marked published; its single Explore tile retains title, artwork, `#9b9692` background, repository and filter/back origin behavior. The original EventOps route and all other project implementations remain unchanged.

Exactly two hero actions: functional GitHub **Source** and disabled **Visit platform**. The unchanged PDF opens from **Executive summary** in the overview. The exact deployment note links to `mailto:keenosmith@kailor.co.za`. No section has more than two CTA buttons. Existing shared navigation, modal and page effects are reused. Back button, normal/hover controls, 40px centered adjacent footer pair with 7px gap, and 38px floating ArrowUp match Microsoft DevOps computed styles; AWS is independently captured as the second visual authority. Floating visibility begins after 300px, hides at the footer, and reduced-motion scrolling is immediate.

### Executed checks

| Check | Actual result |
| --- | --- |
| `npm run lint` | Passed; existing unused `fs` import warning in CV generator |
| `npm run build` | Passed; existing bundle size advisory |
| `npm run test:assistant` | Passed all validation, expansion and intelligence checks |
| `npm run test:recruiter` | Passed nine representative roles and evidence regressions |
| `npm run test:refresh` | Passed shared evidence and full refresh regressions |
| `verify-project-pages.js` | 46 page/viewport checks, no failures or browser errors |
| `verify-project-navigation.js` | All 22 Explore entry/return paths, retained filters, direct/refresh fallback and reduced motion passed |
| `verify-portfolio-refresh-browser.js` | Three tiles at four widths, all 260 skill panels, search/back, counter animation/reduced motion, Kailor follow-ups; no errors |
| `verify-project-style-consistency.js` | Five pages at 1440/768/390px, exact Microsoft control/hero/section/modal computed styles, normal/hover states, footer centering, floating behavior and reduced motion passed |
| `verify-streamlit-case-study.js` | 1440/1024/768/390/320px: header and section actions, scenario/source boundaries, open canvas, section bounds, modal focus trap/Escape/close/backdrop/focus restoration/inertness/scroll lock, PDF, legacy route, Explore origin, skill link, direct refresh and top controls passed |
| Source references | All 13 pinned source paths exist in the equivalent reviewed source tree |
| Protected files | All 255 prior source/document hashes unchanged |
| PDF | HTTP 200, PDF content type and signature; served/local/original SHA-256 identical |
| `git diff --check` | Passed |

Actual visual inspection included desktop and mobile Streamlit heroes, architecture, semantic retrieval and n8n sections; five-page desktop/tablet hero comparison boards; desktop modal comparison; mobile control and footer comparison. Typography, whitespace, small pills, cream canvas and action placement follow the references; custom technical content stays open with no filled panels, screenshots or decorative dashboards. Captures and computed-style results are available at `/tmp/streamlit-case-study-qa/style/comparison.html`; focused captures/results at `/tmp/eventops-streamlit-case-study-qa`. Protected hashes are at `/tmp/streamlit-case-study-qa/protected-files.json` (authorised App/evidence/test integration excluded).

### Changed files and commits

- New page: `src/components/pages/projects/EventOpsStreamlit/EventOpsStreamlit.jsx`, `EventOpsStreamlit.css`.
- Route/record integration: `src/App.jsx`, `src/data/projectEvidence.js`.
- Supplied document: `public/documents/eventops-streamlit-executive-summary.pdf` (unchanged bytes).
- Regression integration: `src/components/pages/Explore/tests/exploreIndex.test.js`, `scripts/validate-portfolio-refresh.js`, `scripts/verify-portfolio-refresh-browser.js`, `scripts/verify-project-pages.js`, `scripts/verify-project-style-consistency.js`.
- New focused browser suite: `scripts/verify-streamlit-case-study.js`.
- Engineering report: this file.

Meaningful stages committed and pushed to `origin/main`: `df813ab` source/reference audit, `80c4511` case-study implementation, `8b4cbfd` route/document integration, `160b981` responsive and interaction verification. This final report is saved in the following documentation commit. No force push or deployment was performed.

### Remaining boundaries

Portfolio verification establishes this page and its integration. The source application was reviewed rather than modified or re-tested in this task. Its historical and current acceptance results remain separately labeled. Public infrastructure, hosted database, real release-browser acceptance and newly enabled Gemini acceptance remain pending; no live platform URL, SLA, generalized RAG accuracy, enterprise tenancy or automatic distributed recovery is claimed.
