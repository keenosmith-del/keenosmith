# Release readiness and engineering handover

Status: source work is review-ready on `portfolio-hardening`; production approval is withheld pending the owner gates below. Four iterations are complete within their stated verification scope. Iteration 003 is partial only at the hosted-preview verification gate. No merge to main or deliberate production deployment occurred.

Baseline: `79a314553f897135c17095dea1f84df7c8d142ef`. Final application and integrated verification: `b72b16a941c2c35515b3ff0918980aedf099f1bd`. Subsequent handover commit changes documentation/evidence only. Its hash is available in Git and the chat handover; it cannot be embedded in its own content. Main remains at the baseline revision. No source application repository was modified.

## Iteration outcomes

| Iteration / status | Change, reason and principal files | Verification and actual outcome | Visual impact / limits / commits |
| --- | --- | --- | --- |
| 001 Evidence integrity — complete | `qualificationEvidence.js`, `candidateProfile.js`, Recruiter scoring/parser, Assistant facts/provider validation, `projectCountPolicy.js`, constructed role fixtures. Replace broad qualification/experience passes with contextual support; recognise accepted delivery leadership without inventing mentoring or duration. | Original nine roles plus eleven additional roles/adversarial cases; fixed weights/contributions, upper-bound tenure and overlap checks passed. Final model `contextual-2.2.3`. CV browser/download/hash checks and 198 PDF text checks passed. | Existing score UI preserved; evidence outcomes/caveats corrected. Public 15+ AI claim still requires owner review against 13 conservative families. Accepted CV JSON/PDFs unchanged. `2917d9a`, `fe56a1a`, `9fa2f62`. |
| 002 Performance — complete | Lazy standalone route JSX, original static route CSS cascade, 69 full-size lossless WebPs, responsive project derivatives, small avatar/mascot/favicon, `optimize-images.py`; FullStack failure-only same-footage poster. Reduce unnecessary initial bytes without redesign. | Build, pixel-equivalence checks, cold/repeat diagnostics, pinned-browser Lighthouse, responsive/style checks and normal/missing/blocked/reduced-motion media tests passed. Final measurements below. Healthy playback makes no poster request. | Same original page composition/typography/backgrounds; scoped small-display derivatives and existing-footage fallback. Total JS and CSS grew slightly; high throttled LCP remains. `89113a5`, `8420569`, `b72b16a`. |
| 003 SEO/discoverability — partial | `siteRoutes.js`, `build-route-html.js`, `RouteMetadata.jsx`, public social/robots/sitemap support and `vercel.json`. Give direct requests distinct canonical metadata and correct unknown-path handling. | All 87 local raw responses exactly match generated HTML; 27 unique canonical sitemap URLs, MIME, JSON-LD shape and unknown 404/noindex passed. SPA deep links/navigation passed. | No normal rendered layout change. Static heads/noscript summaries, not full React SSR. Vercel preview returns login HTML anonymously and in available browser session; hosted route/header verification remains blocked by authentication. `4fac91b`, `f5be020`, `19c5fb1`. |
| 004 Production quality — complete within local/CI scope | Pinned read-only Actions workflow; frozen preview runner; Header contact failure/retry/in-flight/focus feedback; API bounds/retrieval/factual bypass; security headers/dependency updates/NotFound. Address observed failure paths and make release checks repeatable. | `npm run verify` plus all 17 browser/raw HTTP suites passed in final GitHub run. Contact was intercepted; no mail sent. Loading/duplicate-submit diagnostic passed. Mocked quota/provider failures passed. Audit: 6 high affected packages to 0 known vulnerabilities. | Existing normal flows retained; explicit error/loading/404 feedback appears only when relevant. Hosted policy and EmailJS account settings unverified; semantic model grounding is not guaranteed. `f5be020`, `b572cc9`, `88afd9b`, `b72b16a`. |
| 005 Consolidation/QA — complete within documented scope | One concrete route map, shared structured data, 22 catalogue invariants, inert closed panels, scoped `accessibility.css`, post-target launch caveat, README and permanent engineering records. Reduce drift and address measured accessibility failures. | 70 responsive captures, 45 layout cases/905 elements (0.5px tolerance), 17 axe states, all local links/documents, PDF reconciliation and supplemental Assistant/project/company scripts passed. Protected reference-page hashes unchanged. | Geometry, captured heading styles and backgrounds match baseline. Muted text contrast and state feedback intentionally change. Transient Cloud-heading fade contrast, untested Safari/physical devices/full assistive-tech audit remain limits. `19c5fb1`, `8420569`, `fe56a1a`, `88afd9b`. |

See each iteration's PLAN, IMPLEMENTATION, TEST_RESULTS and DECISIONS. [Changed-file manifest](evidence/changed-files.json) enumerates every baseline-to-verified-source file and report-only additions. [Commit history](evidence/commit-history.txt) contains full hashes. Accepted CV downloads and AWSBankingRisk/MicrosoftDevOps reference JSX/CSS were not changed.

## Measured comparison

Build byte counts use the same file-size and Python gzip routine for both snapshots. Decimal MB is used. All route CSS intentionally remains in its original cascade to preserve appearance; route JavaScript is split.

| Metric | Original | Final |
| --- | ---: | ---: |
| Initial JS, raw | 984,696 B | 484,861 B (50.8% smaller) |
| Initial JS, gzip | 264,464 B | 144,824 B |
| Initial CSS, raw / gzip | 420,341 / 55,716 B | 422,133 / 56,192 B |
| All emitted JS | 984,696 B | 1,007,854 B (2.4% larger) |
| Entire build | 72,229,360 B | 49,226,319 B |
| 69 full-size artwork derivatives | 62,514,400 B originals | 32,303,804 B lossless derivatives (originals retained in source) |
| Home cold encoded resources | 13,275,399 B | 3,038,717 B (77.1% smaller) |
| Home cold images, including favicon | 11,956,082 B | 1,838,417 B (84.6% smaller) |
| Home cold / repeat LCP diagnostic | 36,108 / 1,356 ms | 14,136 / 1,060 ms |
| Home cold heap diagnostic | 5,432,392 B | 4,627,944 B |
| Home cold / repeat synthetic focus latency | 47.6 / 17.2 ms | 43.4 / 24.5 ms |
| Final controlled mobile Lighthouse Performance | 46 | 62 |
| Lighthouse LCP / TBT | 54,239 / 1,144 ms | 14,710 / 484 ms |
| Lighthouse Accessibility / CLS | 96 / 0 | 96 / 0 |

Primary timing comparison is one final sequential controlled pair, same Chrome 152, production-preview implementation, 390×844, 150ms RTT, 200kB/s down and 4× CPU for the custom diagnostic. Lighthouse uses its own mobile simulation. These are different measurement methods; do not compare their LCP values to one another. Final four-route cold/repeat LCP: Explore 2676/1472ms; Recruiter 2468/1184ms; AssessFlow 2440/1200ms, all sampled CLS 0.

These are local samples, not statistical estimates, field INP or production Core Web Vitals. Repeat focus latency worsened. An earlier matching-preview Lighthouse pair measured baseline 14,063ms LCP and final 14,712ms; that historical pair remains in the evidence. Do not claim uniform speed/responsiveness improvement or a performance guarantee. Home repeat resource transfer remains about 1.00MB, chiefly the original video. The new 60,044 B poster is requested only on video load/playback failure.

[Final compact comparison](evidence/final-comparison.json) records exact metrics, conditions, earlier sample and geometry. [Network waterfall](evidence/network-waterfall.json) records final controlled Lighthouse resource requests. Large reports/screenshots remain at `/tmp/portfolio-hardening`, especially `baseline-controlled`, `release-controlled`, `release-final` and `final`; temporary artifacts are not permanent storage.

## Recruiter, Assistant and CV integrity

A BSc declaration can support degree level/discipline; award/conferral/accreditation assertions require review. Only the accepted completed professional code AI-103 satisfies that certification rule; AI-500 remains in progress. Practical routes require sufficient relevant scope/duration. Overall 6+ is a lower bound and does not prove closed/maximum ranges, mentoring, staff management or six years of leadership. Generic delivery leadership is excluded from scoring when the same clause creates the more specific technical/mentoring row. Weights remain 80/65/40/30/25/15/0; qualification, tenure and logistics do not add skill-alignment credit.

Assistant specific factual career queries use deterministic accepted records. Optional provider output uses bounded retrieved context and rejects selected unsupported claims; this is not a proof against every hallucination. No paid inference was executed. All three accepted CV JSON/PDFs, employment dates and professional wording remain unchanged. Browser text, exact download bytes, original hashes and 66 text checks per PDF passed. Nine PDF pages rendered, three representative pages visually inspected. AI CV project substitutions are proposals only in iteration 001 DECISIONS.

## CI and reproducibility

[Portfolio verification run 40535005760](https://github.com/keenosmith-del/keenosmith/actions/runs/40535005760) completed successfully on `b72b16a` on 27 October 2026. Source/static verification and all 17 browser/raw HTTP suites passed. [Machine evidence](evidence/ci.json) includes head SHA, job/step conclusions and timestamps. Earlier 16-suite success: run 40530896098. Earlier failures were genuine and were fixed: privileged browser installation, HTTP/server sequencing, Ubuntu browser namespaces, concurrent build output and Linux hover capability. No failed test was removed to obtain green status.

Reproduce with `npm ci --include=dev`, `npx puppeteer browsers install chrome`, `npm run verify`, then `npm run test:browser`. Linux workflow provides scoped Chrome namespace permission and Xvfb for genuine desktop hover. [Test matrix](TEST_MATRIX.md) lists every suite and supplemental check. Final source lint has zero warnings. Report-only pushes skip this workflow; pull requests always run it. No production deployment command is part of the workflow.

Security findings: self script/media policy, bounded allowed connections, clickjacking/referrer/MIME/permissions headers, deterministic failure handling, bounded API input/history/context and no sensitive-prompt logging. No credentials added; zero known locked dependency advisories at audit time is not a security certification. Live EmailJS domain/abuse configuration and hosted header behavior still require owner inspection.

## Owner gates and remaining risks

1. Review signed-in Vercel preview raw HTML, canonical paths, headers, assets, unknown 404 and direct refresh using the production smoke checklist. Available preview access showed Vercel Login; do not infer hosted delivery from local success. Existing production remains the baseline and still returns SPA HTML at robots/sitemap.
2. Decide public 15+ AI wording versus the documented conservative 13 implementation families. Company applications are excluded; EventOps versions count as one family. Do not silently inflate or change this professional claim.
3. Check EmailJS account allowed domains/abuse controls and separately authorise any real delivery test. No live mail or provider request was used for verification.
4. Review optional AI CV role-specific project proposals; accepted selection remains unchanged. Any chosen substitution must update JSON and PDF together and repeat reconciliation.
5. Review Kaggle profile URL (404) and six restricted/network external links. Two company GitHub links return anonymous 404 because the repositories are authenticated-private, not missing. No visibility changes or private content publication occurred.
6. Main is currently unprotected. Require the actual `verify` job and owner review before merge; configure protection separately. No branch policy was changed in this task.

High simulated home LCP remains a performance risk. Preserve/assess the intentional Cloud fade against transient contrast findings before claiming broader accessibility conformance. Automated Chromium/axe tests do not establish complete assistive-tech, Safari, physical-device or all possible input coverage. Hosted indexing, rich results, live email and semantic model behavior are not certified.

## Rollback and deployment status

All implementation is on the task branch; main and production remain unchanged. Review with `git diff 79a314553f897135c17095dea1f84df7c8d142ef..b72b16a941c2c35515b3ff0918980aedf099f1bd`. To abandon before merge, retain/archive the branch and leave main at baseline. If later released, revert the reviewed implementation commits through a new reviewed change or redeploy the known baseline Vercel deployment, then repeat the smoke checklist; do not reset shared history or force-push. Original assets/CVs remain available. This task has not performed that future release or rollback.

## Neutral documentation and branch correction

The engineering history through handover `81e5a548de1422c7449d68dc35cbbdde26025c18` is retained on `portfolio-hardening`. [Cleanup audit](ATTRIBUTION_CLEANUP.md) records the four corrected name references, original file/line locations, unchanged implementation scope and replacement-branch verification. The original branch remains until owner-approved removal; no main merge or production deployment is part of the correction. Earlier application verification and production limitations above remain valid.
