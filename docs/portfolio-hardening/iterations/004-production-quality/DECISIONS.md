# Decisions

D401: CI verifies, never deploys. Observed baseline main is unprotected; recommend required Portfolio verification check plus owner PR approval before production merge. Enabling protection/settings requires separate owner review. A Vercel success is distinct from tests, preview delivery, production deployment and production smoke.

D402: Contact errors remain inline within existing form typography. No new boxed feedback system, account-key replacement or uncontrolled test email. Public EmailJS integration is retained; dashboard restrictions are owner-verification scope.

D403: Allow inline styles in CSP for existing dynamic artwork/animations, permit only EmailJS external connection, keep scripts same-origin. Prefer scoped tested compatibility over a scanner-only policy. No third-party script integration was added.

D404: Factual Assistant answers use curated deterministic content even with optional inference enabled. General synthesis retains bounded inference, retrieved context and output validation; full semantic grounding cannot be guaranteed by syntax/ID validation alone. No content logs are collected.

D405: Update compatible vulnerable packages and lockfile, preserve application framework and existing scripts. Browser tooling belongs in devDependencies. Re-run final matrix on the patched integrated revision.

D406: Branch pushes may trigger existing Vercel previews. Do not merge main or deliberately deploy production. Earlier branch SHA 2917d9a has a successful Vercel check; actual environment/URL still needs inspection.
