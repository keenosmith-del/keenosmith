# Decisions

D201: Prefer lossless WebP for identity artwork, transparent avatars and credential text. Full-resolution decoded equality is stronger than a subjective compression-quality claim. Retain originals.

D202: Preserve the project stylesheet cascade while splitting markup. Avoid a broad CSS refactor; lazy CSS could override shared controls because the original shared stylesheet was last.

D203: Diagnostic cold-route measurement: Chromium 152, 390×844, cold cache, 150ms latency, 200kB/s download, 4× CPU throttle; one sample per route, local preview, not field metrics. Lighthouse separately uses its default mobile simulation and reports actual values without invented scores. Concurrent audit processes add noise. Repeat a sample that has no h1/resources; do not count an interrupted navigation.

D204: Baseline lighthouse runs against /tmp/portfolio-hardening/baseline-dist on port 4180. Active dist/preview is mutable; no final comparison may silently use it as the original baseline. Initial style test interrupted by Vite HMR is invalidated and rerun against production preview.
