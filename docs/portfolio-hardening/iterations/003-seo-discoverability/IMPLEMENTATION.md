# Implementation

Status: local raw-response verification passed; hosted branch verification pending push/deployment availability.

Inspected index.html, BrowserRouter routes, canonical/legacy project routes, projectEvidence, Assistant catalogue paths, Vite config and Vercel SPA catch-all. The old raw HTML delivered the same title/empty root for every path.

Added siteRoutes.js as public identity/metadata mapping: 27 canonical indexable pages (home, Explore, Recruiter View, CV, company case study and 22 engineering case studies); 87 total static route shells retain archive/compatibility destinations without duplicating sitemap entries. Company identities remain separate. Archive and alias shells have noindex/follow and point at the accepted canonical. CV query variants canonicalize to /cv.

Build postprocessing emits route-specific titles, descriptions, canonical URLs, Open Graph/Twitter metadata, a restrained 1200×630 social preview, robots, sitemap and conservative JSON-LD (Person/WebSite/WebPage or CreativeWork). No ratings, awards, clients or deployment metrics. Project descriptions and deployment caveats come from existing evidence. Public portfolio access does not imply public application deployment.

This is deterministic static metadata and no-JavaScript semantic-summary delivery, **not full React server rendering or a frozen DOM snapshot**. Crawlers receive the correct head plus source/description/deployment summary in noscript. JavaScript clients mount their normal UI with unchanged animation lifecycle; no hydration is introduced. Complete case-study bodies still require JavaScript. This limitation is explicit; search indexing is never guaranteed.

Evaluated prerendering: headless DOM snapshots would capture animation state/time-sensitive content; full SSR would require broader router/state/hydration changes. Neither is justified for this controlled programme. Static route shells provide crawler-visible metadata and meaningful fallback with less implementation risk. A future full SSR decision remains separate.

Vercel cleanUrls serves emitted path.html at the original extensionless URL. Removed broad index rewrite so unknown assets/pages are no longer deliberately converted to homepage HTML. Existing API function rewrite and PDF compatibility redirect retained. Emitted 404.html supports a proper unknown-route response. Local preview now mirrors clean HTML route resolution and exposes the existing Assistant handler, allowing deterministic CI against production assets. No deployment settings, domain or DNS changed.

Sources consulted: [Vercel static configuration](https://vercel.com/docs/project-configuration/vercel-json), [custom 404 guidance](https://vercel.com/kb/guide/custom-404-page), [Vite static assets](https://vite.dev/guide/assets). These describe platform capability; actual hosted behavior still needs branch verification.

Files: new siteRoutes, RouteMetadata, build-route-html, verify-seo and social-preview.png; modified App, package build command, vite.config and vercel.json. No visual styles or CV content changed.
