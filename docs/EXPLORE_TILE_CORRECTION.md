# Explore tile correction — 26 October 2026

The previous refresh used broad category labels and the first three technology entries for gallery pills. It also omitted the new projects from the visibility lists, and the narrow-screen image rule placed artwork in a separate block at the top. Previous checks did not catch these normal resting-state failures.

- All 22 gallery projects now have individually selected top and lower pills, checked against their implemented technology evidence. Every project's complete top selection and lower selection is distinct.
- CrewAI uses the same presentation as Chaos Engineering & Disaster Recovery: title and top pill at rest on desktop, with description, lower pills and arrow on hover or keyboard focus. Narrow and touch layouts show the full content, matching the reference tile. Streamlit and AssessFlow show their title, description and pills initially, revealing their arrow on hover or focus. Touch layouts keep controls and pills available.
- Artwork uses the full tile area, preserves its proportions and aligns to the bottom at all screen widths. Original artwork files and tile colors are unchanged.

Validation: production build, lint (existing CV generator warning only), Explore index assertions, shared-evidence and portfolio-refresh regressions passed. `node scripts/verify-project-tile-presentation.js` checks all 22 tiles at widths 1440, 1024, 768, 390 and 320 with actual hover-capable resting states, caption/control bounds and bottom-aligned artwork. It also checks keyboard focus and touch behavior for the three new tiles. Captured desktop and narrow-screen examples were visually inspected. The script writes screenshots and results to `/tmp/portfolio-tile-correction`.
