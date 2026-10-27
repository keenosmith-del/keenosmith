# Production release smoke

Before approval: inspect complete task-branch diff, Actions results for exact proposed SHA, Vercel preview, generated route HTML, screenshot comparisons, evidence decisions and known limits. Confirm accepted public AI-count wording and EmailJS account protections. Main was unprotected at audit; configure required checks/review separately.

After an explicitly approved production merge:

1. Run `node scripts/production-smoke.js` with PORTFOLIO_PRODUCTION_URL set to the approved public origin. This performs GET only.
2. Inspect homepage/deep links, JS/CSS/media, all CV and executive-summary PDF headers/signatures, raw titles/canonicals/social metadata, robots/sitemap and unknown-route 404.
3. Browser: desktop/mobile navigation, Explore filters/tiles, Recruiter repeatable calculation, all CV versions/downloads, Assistant deterministic fallback, project modal/floating-footer behavior, console/CSP errors and contact dialog validation.
4. A real form delivery or configured live LLM call is a separate explicit test action; do not infer delivery from mocked success. Do not call paid providers during ordinary smoke verification.
5. Record deployment URL/SHA and results. Successful build, tests, preview deployment, production deployment and production smoke are separate events.

Rollback: revert the approved merge using a new commit and the established Vercel Git deployment path, or restore the last accepted Vercel production deployment through an owner-approved action. Never force-push or rewrite history. Static filenames are content-hashed; check stale open tabs after deployment. No source application repository, DNS or billable resource changes are part of this programme.
