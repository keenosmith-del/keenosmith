# Executed verification

- npm run test:recruiter: passed, 9 original roles and mutations.
- node scripts/validate-hardening-evidence.js: passed, 11 additional roles, credential adversaries, exclusions, reproducibility, count policy and leadership checks.
- npm run test:assistant: passed, deterministic and mocked provider checks.
- npm run test:refresh: passed, shared facts and protected CV hashes.
- npm run lint: passed, existing legacy CV fs-import warning only.
- npm run build: passed; baseline-sized bundle warning remains for iteration 002.
- PORTFOLIO_TEST_URL=http://127.0.0.1:5173 node scripts/verify-recruiter-browser.js: passed across 320–1440px, keyboard/interactions and reduced motion.

Baseline browser issue: original sequential run overlapped Vite restarts and later model revision edits. Those results are not claimed as clean baseline. Re-running remaining baseline checks from git-archived 79a3145 under /tmp/portfolio-hardening/baseline-source, isolated port 5175. Initial style run used stale unrelated /tmp protected manifest; actual geometry/style assertions passed before stale hash failed. Final runs use a baseline-captured explicit manifest protecting both reference page sources/styles.

No public form delivery, live provider call, qualification issuer validation or source-application test execution performed. Automated tests do not establish full accessibility. Full screenshot and CV/download reconciliation remain pending integrated verification. Logs outside Git under /tmp/portfolio-hardening.

Isolated baseline rerun: CV, Recruiter, Streamlit, all 260 skill panels/portfolio refresh, and project style suites passed. Assistant still fails the stale expected title, independently reproduced on original source. Accepted CV/PDF reconciliation is therefore browser verified, not inferred from hashes alone.

Final tenure review: the 6+ declaration is a lower bound, so it cannot prove a requested maximum or a closed experience range. Corrected that remaining interpretation and added maximum-eight/range-three-to-eight adversarial checks. Minimum-year support and all arithmetic weights are unchanged.

## Final closure — 27 October 2026

Status: complete within the documented verification scope. Verified application/source revision `b72b16a941c2c35515b3ff0918980aedf099f1bd`. Final GitHub run 40535005760 passed source checks and all 17 browser/raw HTTP suites. Earlier pending statements above describe checkpoints, not outstanding local work. The full final outcomes, exact measurements, source/file manifest, commits and remaining owner gates are recorded in [Release readiness](../../RELEASE_READINESS.md) and [Test matrix](../../TEST_MATRIX.md).

All 70 final responsive captures had no horizontal overflow; 45 geometry cases covering 905 elements had no differences at 0.5px tolerance. Accepted CV/PDF/reference-page hashes remain unchanged; 198 PDF text checks passed. No production merge/deployment, real mail or paid inference occurred. Hosted preview remains login-protected.
