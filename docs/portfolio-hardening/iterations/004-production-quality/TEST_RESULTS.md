# Executed results

- Existing Assistant deterministic/provider tests: passed after retrieval-first and factual-bypass changes.
- validate-api-hardening.js: passed, including invalid quota URL, mocked timeout and repeated deterministic handling; no paid calls.
- npm run verify: passed after dependency updates (lint warning in legacy CV generator only; production build, existing Assistant/Recruiter/refresh, 11 additional roles/API, Explore assertions, SEO).
- npm audit: 6 high affected packages before, 0 known vulnerabilities after compatible dependency updates. Full summaries committed.
- verify-contact-browser.js against local production assets: passed 1440/390/320px, invalid email, intercepted provider failure, retained input/direct email, retry/success/reset, focus/scroll restoration and unknown-page/refresh 404. No live email sent.
- Assistant browser suite exposed stale expectations already contradicted by original source; corrected to accepted labels. Final full suite is still required.
- Raw SEO delivery previously passed 87 HTTP routes. Header-specific and integrated browser checks follow the final build.

Remote Actions status and hosted CSP/contact compatibility are not inferred from local success. Production GET smoke is read-only; old production robots/sitemap may return SPA HTML and must be distinguished from task-branch fixes. No production Assistant POST or contact submission performed.

Remote rerun 40524627313 passed installation/static suites and reached browser tests. Ubuntu blocked downloaded Chrome's user namespaces (No usable sandbox). Added an exact-executable AppArmor allowance only on the ephemeral Ubuntu 24.04 runner, retaining Chrome's browser sandbox. No global host-policy disable and no no-sandbox flag. This follows the scoped approach in [Chromium's namespace guidance](https://raw.githubusercontent.com/chromium/chromium/main/docs/security/apparmor-userns-restrictions.md). Browser preflight now fails once if setup is broken, rather than repeating the same launch failure in every suite.

Local verification also exposed concurrent-build interference: rebuilding dist removed 404.html while a preview was reading it. Browser orchestration now snapshots built output into its temporary evidence directory before starting preview; middleware uses the configured output directory and has a safe missing-404 fallback. Browser runs are independent of active workspace builds.

Run 40528759821 verified application revision 9fa2f62 through all source checks and 15/16 browser suites. The remaining failure was the tile suite's explicit hover-capability assertion: Linux headless Chromium reported a non-hover primary device. CI now runs that one test headfully on an Xvfb virtual desktop; every hover/resting-state assertion remains. Other tests remain headless. The runner image already supplies Xvfb, and Chrome process isolation remains enabled. No application code changed for this platform correction.
