# Executed results

Production build passed after splitting and after image/srcSet delivery changes. Lint, existing Assistant, Recruiter and shared refresh tests passed with only the pre-existing legacy CV unused import warning. Lossless conversion accepted 69 images only after exact decoded-RGBA comparisons.

Saved baseline cold diagnostic: homepage 13,275,399 encoded resource bytes, LCP 36,052ms, CLS 0. Explore 8,886,658 bytes; Recruiter 3,455,899; AssessFlow 320,025. Conditions recorded in evidence/performance-baseline.json. Very slow hero image delivery remains a real baseline issue under this intentionally constrained connection.

Post-change stable diagnostic after responsive variants: homepage 5,521,020 bytes, LCP 17,952ms, CLS 0; Explore 2,020,104 bytes/LCP 2,552ms; Recruiter 1,942,300 bytes/LCP 2,384ms; AssessFlow 200,265 bytes/LCP 2,340ms. Treat as one diagnostic sample, not a statistical guarantee. Repeated final integrated measurement is still required.

Baseline Lighthouse mobile: Performance 47, Accessibility 96, LCP 49,953.7ms, CLS 0, TBT 359ms. An intermediate post-change run (before final srcSet) measured Performance 50, Accessibility 96, LCP 24,938.4ms, CLS 0, TBT 904ms. TBT worsened in that run; no claim of responsiveness improvement. Final integrated measurement and repeat-load diagnostics are pending.

Project-style run on development source was interrupted by HMR (DOM context invalid); no pass claimed. Stable production style run started with explicit protected reference manifest. Results will be finalized in integrated verification. No visual redesign or source-image deletion.

Stable production style rerun: PASS, five pages × three widths, exact reference computed control/hero/section/modal styles, normal/hover states, centered footers, floating control hiding, reduced motion and four protected source/style hashes. Responsive variants were included in this build. Integrated full-portfolio screenshot comparison is still reserved for iteration 005.

Final media verification passed all four scenarios: normal video, intercepted resource failure, blocked autoplay and reduced motion. The poster actually decoded, the healthy path had no fallback background, reduced motion stayed paused on a readable frame, and tile geometry matched in all cases. This closes the unavailable-media fallback gap without changing healthy playback.
