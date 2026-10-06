# Explore V1

Explore is a standalone page with Projects (default), Skills and Credentials tabs. Its hero, fixed frosted back control, neutral palette, type scale, page width and footer follow Recruiter View and the existing project pages. It renders only the active content mode.

## Files

Created inside this folder:
- `Explore.css`: scoped presentation, responsive layouts and reduced-motion rules.
- `components/ExploreCards.jsx`: project, skill and credential presentation and project destinations.
- `components/SkillDetailPanel.jsx`: native modal dialog with evidence and related discovery.
- `utils/exploreIndex.js`: derived indexes, taxonomy query expansion and relationships.
- `tests/exploreIndex.test.js`: focused data, search, evidence and publication assertions.
- `README.md`: implementation and validation notes.

Updated `Explore.jsx`. Minimal shared changes:
- `src/App.jsx`: redirects `/certifications` to `/explore?tab=credentials`; existing `/explore` route now renders this implementation.
- `src/components/navigation/PageScroll.jsx`: query-only navigation preserves page scroll.
- `src/components/pages/RecruiterView/RecruiterView.jsx`: enables its existing Explore link.
- `src/assistant/retrieve.js`: exports implemented skill projects and prevents broad terms from establishing evidence for a more specific tool (React cannot establish React Router usage). Evidence retains the existing ordinal bands.
- `src/assistant/knowledge.js`: gives C++ and C# distinct stable IDs, avoiding duplicate React keys and ambiguous deep links.

The legacy Credentials component and its source data remain available; routing now gives credentials one visual home.

## Data and functionality

Current index: **37 canonical projects** (16 with built evidence), **228 skills**, **25 credential/education records** (23 shared credentials and two nonduplicate formal-education entries). Badges remain attached to their credential; the badge filter changes their visual treatment rather than inflating counts.

Shared sources: Assistant knowledge, canonical projects, taxonomy, evidence bands, credential groups, education, featured project imagery and project concepts. No parallel portfolio facts dataset was created.

Search matches names, descriptions, technology, domains, evidence, issuers, categories, status and taxonomy aliases. Ecosystem searches expand into provider capabilities while preserving provider scope. Projects offer category, technology, cloud ecosystem and build-status filters. Skills offer taxonomy categories. Credential filters derive from available records, with a separate badge mode. Unsupported categories are hidden rather than presented as empty controls.

Project layouts have stable feature, wide, standard, portrait and landscape variants. Existing art is reused; missing art receives title/domain/technology compositions. Built unpublished work opens its repository evidence instead of a placeholder page. Published work uses React Router links. Source build/publication status remains visible.

Skill details show shared evidence bands, direct built projects, skill-specific credentials, category-related education/training (labelled as context), ecosystems and clickable related skills. A native dialog provides focus containment, initial close-button focus, Escape dismissal and focus restoration. Body scrolling is locked while open.

Credential variants include large editorial education cards, wider bootcamp cards, technical applied-skills cards, programme/training cards, compact courses and badge cards. Certificate and badge assets can be opened. Available external links are labelled **Issuer profile**, never represented as credential-specific verification.

Desktop uses six project columns with mixed spans, four skill columns and three credential columns. Tablet simplifies projects to two columns. Mobile has a one-column project/credential feed, two compact skill columns and a viewport-sized dialog. Images load lazily. Indexes and query expansion are precomputed/memoized. Result reflow uses a restrained position animation and observes reduced motion; there is no large stagger sequence.

## URL state

`tab`, `q`, `category`, `technology`, `ecosystem`, `status` and `skill` are query parameters. Search typing replaces the current history entry; tab/filter/skill selection creates history entries. Browser back/forward restores selection.

Examples:
- `/explore`
- `/explore?tab=projects&q=azure`
- `/explore?tab=skills&skill=react`
- `/explore?tab=credentials&q=microsoft`
- `/explore?tab=credentials&category=Education`

## Validation performed

- Production build passed. Vite reports a bundle-size warning for a chunk above 500 kB.
- Focused lint for changed implementation files passed; full-app lint also exited successfully with existing unused-variable warnings outside Explore.
- `git diff --check` passed.
- `node src/components/pages/Explore/tests/exploreIndex.test.js` passed: unique IDs, Azure/banking/Kubernetes/AI-agent discovery, Google capability expansion with Microsoft exclusion, React evidence and related skills, related credentials, specific-tool evidence protection, consistent evidence/project counts, Microsoft records, education and unpublished destinations.
- Browser: Projects default, Azure search (5 results), AI category (16 results), built-status filter (16 results), React search (React and React Router), direct React URL, related TypeScript traversal, Escape, initial focus, Tab within dialog, focus restoration and back-history reopening.
- Browser: Microsoft credential search (4 records), Education filter (2 editorial cards), Badges filter (14 credential records), credential URL redirect and actual navigation to the AI project page.
- Browser layouts inspected at desktop 1440 px and 1180 px, tablet 768 px, mobile 390 px and narrow 320 px. DOM width checks showed no horizontal overflow. Project images, mobile skill columns, credential stacking and dialog width were inspected.
- Existing homepage, AI project and Recruiter View smoke checks passed. Recruiter View's Explore destination was verified.
- Reduced-motion rules and the reflow guard were checked in implementation. OS/browser reduced-motion preference switching was **not** emulated.
- Duplicate skill-ID and badge-image keys encountered during development were corrected. Subsequent rendering added no new console errors in the inspected session.

## Source limitations

Project dates are absent from the registry, so Explore does not invent years. Many projects lack artwork and use designed typographic covers. Repository-described work without confirmed completion stays labelled as unverified; source inspection does not establish live deployment. Existing programme/course certificates are not relabelled as professional exam certifications. No in-progress credential record is currently supplied. University coursework is shown with the shared 2017–2022 dates and the explicit note that an awarded degree is not confirmed; the brief's illustrative credit total was not used.
