# Explore — tile refinement

Explore remains one standalone route with Projects, Skills and Credentials tabs. All 37 canonical projects, 228 skills and 25 credential/education records remain indexed. Shared evidence records and ordinal proficiency calculations are unchanged by this refinement.

## Presentation

- Projects are typography-only colour tiles. Everything sits inside each tile, with no cover art or text beneath. Explicit seven-item puzzle templates alternate orientation. Every filtered tail (one through six records) has a complete rectangular template; no empty cells or arbitrary content-driven project heights. Controlled feature, wide, tall and standard compositions determine title placement and scale. Titles and descriptions clamp. Desktop rows are 300px; tall tiles span two rows. Tablet uses composed two-column groups. Mobile uses one column with 320px tiles.
- Palette values come directly from global.css and featuredProjects.js: `var(--charcoal)`, `var(--surface)`, `var(--surface-muted)`, yellow `#f4c13e`, orange `#eb7e5d`, pink `#ed899d`. Project tones are stable by canonical item order, with charcoal anchors and alternating light/warm neighbours. Filtering preserves assigned colours.
- Skills use an orderly capability wall, mostly charcoal with some surface tiles and monochrome evidence bars. Three blank surface tiles provide visual pauses without adding indexed records or keyboard stops. Four strongest capabilities (existing band 4 and at least eight supporting projects) receive wider tiles; no proficiency score is invented. Other tiles use compact category, evidence, ecosystem and count information. Detail traversal, focus handling and deep links remain intact.
- Credentials use aligned, mostly uniform widths, mostly surface with occasional charcoal tiles. Two blank charcoal tiles provide visual pauses without adding indexed records or keyboard stops. Education has stronger typography and a two-column layout when filtered on its own. Default desktop cards show issuer, title, type, year and status. Description, relevance and valid issuer-profile actions reveal on hover or keyboard focus. Mobile/touch reveals them directly. No certificate, badge, education or issuer images are rendered.
- The search field follows the Assistant composer's neutral surface and subtle single-pixel focus treatment. Categories remain compact pills. The skill close control uses the Assistant's 15px X, transparent 44px tap target and subtle colour/scale interaction. Project arrows reproduce Projects.jsx's icon, stroke, 27px circular surface, placement and entrance/hover transitions (28px on mobile). Skills and credential actions use the same entrance/hover motion with surface arrows on charcoal tiles and charcoal arrows on surface tiles.
- The hero is smaller. Explore has no footer. No-result states use only the existing floating mascot head, centred above concise copy with no card, border or surface.
- Tab entrance, position reflow and hovers are restrained and respect reduced motion.

## Routing

The existing Header Explore item is now a Link to `/explore`, with the in-progress state removed. No new navigation item or Header CSS was added. The existing Search Skills dropdown action now deep-links to the Skills tab.

Published projects retain their real routes. Existing project preview routes are used for unpublished work. Records without any dedicated project route use `/explore/projects/:projectId`, which applies the same standalone preview convention and offers the actual source repository where supplied. Project presentation and preview labels say Built / Portfolio page coming soon as requested; underlying evidence verification/build classifications are retained for Assistant and Recruiter View.

`tab`, `q`, `category`, `technology`, `ecosystem`, `skill` and legacy `status` query state continue to work. Quiet advanced controls show technology and cloud ecosystem; search/filter algorithms were preserved. Browser history restores selected skills and filters.

## Changed files

Updated:
- `Explore.jsx`
- `Explore.css`
- `components/ExploreCards.jsx`
- `components/SkillDetailPanel.jsx`
- `utils/exploreIndex.js` (presentation metadata and project destinations)
- `tests/exploreIndex.test.js`
- `README.md`
- `src/components/navigation/Header.jsx`
- `src/components/sections/Skills/SkillsProjectPreview.jsx` (built preview labels and shared project descriptions)
- `src/App.jsx` (fallback preview route)

Added:
- `utils/explorePresentation.js` (deterministic colour/shape composition)
- `ExploreProjectPreview.jsx` (safe fallback project preview)

No artwork was created, added or generated. Credential images stay in their existing shared data for future use, but Explore does not render them. Education retains the existing dates and evidence notes; the brief's sample credit total was not introduced as a verified fact.

## Validation

Run `node src/components/pages/Explore/tests/exploreIndex.test.js` for existing query/evidence assertions plus complete rectangular puzzle coverage for every result count from 1 to 37 and valid destination coverage. Production build and focused lint are required after the visual changes. Browser checks cover the Header link, current mode, source record counts, Azure/Google/Microsoft queries, skill URL/traversal/Escape, hover/focus credential reveal, education, mascot empty state, real and fallback navigation, and responsive grid/overflow checks. Reduced-motion CSS and the existing animation guard remain in place; preference switching is not emulated by the browser tooling.

Completed verification: production build, index/composition tests and diff whitespace checks pass. Focused lint reports only the two existing unused Header variables. Browser checks pass at desktop, 768px tablet, 390px mobile and 320px narrow mobile; no horizontal overflow was observed. Azure returns five projects, Google returns 24 skills and Microsoft returns four credential records. The production build retains Vite's existing large-chunk warning.
