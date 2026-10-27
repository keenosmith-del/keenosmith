# Executed results

- Catalogue routes: passed, 22 unique accepted Explore destinations with canonical identity/repository agreement.
- Full static `npm run verify`: passed after adapting the route-declaration assertion to the consolidated mapping; existing tests retained. Latest final run log: /tmp/portfolio-hardening/final/verify.log.
- Assistant browser: passed all existing five-viewport, keyboard, long prompt, evidence, scrolling and navigation cases. Obsolete heading expectation was replaced by assertions for current alignment/gap text and Rust exclusion.
- Expanded automated accessibility: passed 17 route/dialog states after scoped semantic/contrast corrections. Full JSON outside Git; no claim of complete accessibility.
- Local link/document audit: passed 27 pages, 148 hrefs, 57 local paths and 28 document PDFs; no page errors. External HTTP review: 73/82 reachable; nine need manual review (access restrictions, one network error, Kaggle and two company repository 404s). A public GitHub 404 can indicate private visibility, not necessarily absent source.
- Contact mocked recovery/unknown-route checks passed in integrated final matrix so far.
- Full controlled production-browser suite, 70-shot responsive comparison, final Lighthouse/transfer/repeat-load results, post-target browser check, CI rerun and release report are in progress. This checkpoint is superseded by the final closure below.

Actual visible changes are limited to scoped text contrast and error/post-target feedback. CV body/PDFs, artwork compositions and reference-page source/style hashes are unchanged. No production merge/deployment or live message/provider test performed.

Final comparison caught a real CSS-cascade regression on Explore/Recruiter headings after lazy loading (route CSS arrived after the existing interface overrides). Corrected by keeping all established page CSS in its original static order, while keeping route JavaScript split. This preserves baseline typography rather than accepting the larger standalone headings. Initial final screenshots are superseded; repeat the matrix after correction.

Remote CI rerun 40524222006 passed browser installation and all source/evidence suites, then exposed a workflow sequencing defect: globally exported PORTFOLIO_TEST_URL caused file-only SEO validation to contact a not-yet-started server. Removed that global setting; the browser runner owns its URL/startup. No application outage was involved.

Final Lighthouse mobile still flags transient contrast on the partially faded Cloud heading; its settled large-text color passes, and the requested scroll fade is deliberately preserved. It also found a genuine compact-menu text contrast issue; scoped menu text was darkened. Do not equate the 17 desktop axe-state passes with universal/mobile accessibility certification. Final Lighthouse and responsive results retain this limitation.

Frozen integrated run passed 14/16 suites. The remaining failures were an omitted WebP loader in the existing compact tile-test bundler and two Explore-tab contrast failures after restoring the original pill backgrounds. Added the loader (also to the evidence exporter) and darkened only inactive-tab text to #626268. The complete 17-state axe rerun now passes. Tile presentation rerun is recorded separately; no suite was removed.

Authenticated read-only GitHub metadata confirms kailor and kailor-insider repositories are private. Their anonymous 404s reflect visibility and do not establish missing source. Production main remains 79a314553f897135c17095dea1f84df7c8d142ef. Protected Vercel preview also redirects the in-app browser to login; no existing browser session resolved access, and no credentials or protection settings were changed.

Supplemental existing scripts: Assistant scroll, project reset and evidence-refresh browser suites passed. Assistant-intelligence initially checked DOMContentLoaded before lazy route mounting; changed its checks to wait for the actual route element. Company iteration initially expected unqualified app-launch wording; updated to the deliberately qualified launch-target label. Both corrected supplemental suites passed, including Clear/cancellation, every catalogue destination, five widths, seven company compatibility routes and grounded identities.

Read-only PDF reconciliation executed 66 checks per version (198 total), including project titles/technologies/descriptions/repository URLs. All match their accepted JSON and SHA-256. All nine original PDF pages were rendered outside Git; AI page 1, Cloud page 2 and Full-Stack page 3 were visually inspected. No PDF/CV source changed.

## Final closure — 27 October 2026

Status: complete within the documented verification scope. Verified application/source revision `b72b16a941c2c35515b3ff0918980aedf099f1bd`. Final GitHub run 40535005760 passed source checks and all 17 browser/raw HTTP suites. Earlier pending statements above describe checkpoints, not outstanding local work. The full final outcomes, exact measurements, source/file manifest, commits and remaining owner gates are recorded in [Release readiness](../../RELEASE_READINESS.md) and [Test matrix](../../TEST_MATRIX.md).

All 70 final responsive captures had no horizontal overflow; 45 geometry cases covering 905 elements had no differences at 0.5px tolerance. Accepted CV/PDF/reference-page hashes remain unchanged; 198 PDF text checks passed. No production merge/deployment, real mail or paid inference occurred. Hosted preview remains login-protected.
