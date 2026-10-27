# Decisions

D301: Reuse authoritative reviewed project identity/routes for canonical project metadata; archive aliases stay available but are not sitemap duplicates.

D302: Static route heads + noscript semantic summaries, rather than a framework migration, SSR/hydration rewrite or animation snapshot. Full-body prerendering is explicitly not claimed.

D303: Vercel cleanUrls plus emitted files replaces the SPA catch-all. Existing API function and compatibility PDF redirect remain independent. Preview mirrors this delivery model, but Vercel-hosted branch checks remain necessary.

D304: Person/profile JSON-LD uses accepted professional identity and verified profile links only. CreativeWork describes portfolio case-study work without unsupported awards, ratings or public software deployments.

D305: Unknown pages are noindex and have no misleading homepage canonical. SPA metadata updates are compatible with direct raw HTML delivery.
