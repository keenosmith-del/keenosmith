# Ask my Assistant maintenance guide

This assistant runs locally with no inference API, keys, external LLM or vector database. Preserve existing records when adding evidence. Production does not contact GitHub.

## Architecture and sources

- `AssistantPanel.jsx`: conversation state, 16,000-character input bound, context, submit lifecycle, viewport-independent typing state and autosizing textarea (132px cap).
- `TypedResponse.jsx`: chunked typing timer, immediate completion, reduced-motion handling. `MessageText.jsx`: paragraphs, section labels, education and role lists.
- `engine.js`: `answer(question, context)` composes skills, projects, roles, credentials, education and experience. The result includes cards, ordinal indicators, follow-ups, retained context, interpretation and debug output.
- `interpret.js`: normalisation, aliases, single-edit tolerance for long technology tokens, intent detection, requirements parsing and contextual follow-ups.
- `taxonomy.js`: 16 reusable ecosystem/category relationships. Vendor + AI enquiries intersect those groups. Shared IAM terminology alone does not establish a vendor ecosystem.
- `knowledge.js`: canonical registry and backwards-compatible project records. `registry.projects` merges duplicate routes/provenance; old IDs remain available. Separate `buildStatus`, `portfolioPublicationStatus` and `verificationStatus`. `implementedTechnologies` controls evidence bands; planned stack claims never count as implementation.
- `repositoryEvidence.js`: curated static source/configuration audit with commit links and inspection date. These are source verification claims, not assertions that an external cloud deployment or native app was run.
- `supplementalEvidence.js`: supporting CV skill listings and early-development repository records.
- `retrieve.js`: expansion, lexical ranking, vendor filtering, canonical deduplication, contextual exclusion and credentials. Explicit project matches outrank stack matches. Existing demonstrated projects receive a priority; evidence bands are memoised. Counts deduplicate canonical projects.
- Shared sources: `src/data/featuredProjects.js`, `projectConcepts.js`, `cvProjects.js`, `skillGroups.js`, `credentials.js`; project detail pages in `src/components/pages/projects`; CV in `src/components/pages/CV/CV.jsx`. Credential types distinguish Applied Skills, courses, labs, programmes, bootcamps and attached badges. No documented licence or in-progress credential is inferred from plans. Commented future exam records remain excluded.

The registry retains previous descriptions/status/stacks in `evidence` while using stronger inspected scope for current answers. `projects` has 40 backwards-compatible records representing 37 distinct projects; 228 skills and 23 credentials are indexed. Eleven distinct built projects have unpublished detail pages. Counts are checked by the expansion script.

## Exact styling locations

All classes below are in **`src/components/navigation/PortfolioActions.css`** unless another file is named.

| Element | Selector / setting |
| --- | --- |
| Floating position | `.portfolio-actions-anchor`: `right`, `bottom`, `gap`, safe-area insets |
| Panel width | `.portfolio-chat-panel`: `width: min(420px, calc(100vw - 40px))` |
| Panel height | `.portfolio-chat-panel`: `height` ceiling 600px, `max-height` |
| Header clearance | `--assistant-header-bottom`, measured by `ResizeObserver` in `PortfolioActions.jsx` from `.site-header` in `Header.jsx`; CSS subtracts its bottom plus 88px for actions, bottom inset and spacing |
| Chat header spacing | `.portfolio-chat-header`: `padding`, `gap` |
| Header mascot | `.portfolio-chat-header > img`: `width`, `height` |
| Reply mascot | `.assistant-avatar`: `width`, `height`; welcome override `.assistant-welcome .assistant-avatar` |
| Close button | `.portfolio-chat-header button`: transparent background, 44px target |
| Close hover | `.portfolio-chat-header button:hover`: transparent background, colour, `scale(1.06)` |
| Keyboard focus | `.portfolio-actions button:focus-visible, .portfolio-chat-panel :focus-visible`: outline; composer uses `.assistant-composer:focus-within` |
| Conversation scrolling | `.assistant-conversation-shell`, `.portfolio-chat-body`: flex/min-height, `overflow-y`, padding, wrapping |
| Messages | `.assistant-message`, `.assistant-message-content`, `.assistant-prose p`, `.assistant-text-section` |
| Assistant messages | `.assistant-sender`, `.assistant-avatar`, `.assistant-welcome` |
| User bubble | `.assistant-message.user .assistant-message-content`: padding, background, radius, width |
| Project cards | `.assistant-card`, `.assistant-card-category`, `.assistant-card-status`, `.assistant-tags`, `.assistant-card-actions`, `.assistant-card-details` |
| Credential cards | `.assistant-card.assistant-credential` uses shared card styling; `.assistant-card-issuer` |
| Proficiency/evidence indicators | `.assistant-indicator`, `.assistant-indicator-heading`, `.assistant-bar`, `.assistant-bar i`, `.assistant-evidence-note` (bands, not ability percentages) |
| Suggestions | `.assistant-followups`, `.assistant-starters`, `.assistant-suggestions button` |
| Activity dots | `.assistant-activity i`, `assistant-pulse` keyframes |
| Typing animation | `TypedResponse.jsx` timer/chunk settings; `.assistant-pending`, `.assistant-complete`; message entrance `assistant-message-in` |
| Composer spacing | `.assistant-composer-area`, `.assistant-composer`: padding, gap, radius |
| Input height | `.assistant-composer textarea`: padding, line-height, 132px max-height; `AssistantPanel.jsx` layout effect must use same cap |
| Send button | `.assistant-composer button`: 32px desktop, radius 12px; `<ArrowRight size={16}>` in `AssistantPanel.jsx` |
| Footer / attribution | `.portfolio-chat-footer`: flex alignment, padding, font size; exact text in `AssistantPanel.jsx` |
| Lightning icon | `.assistant-footer-zap`; lucide `<Zap size={10}>` in `AssistantPanel.jsx` |
| Secondary metadata | `.assistant-footer-secondary`: 8px, muted grey, centred; exact text in `AssistantPanel.jsx` |
| Mobile | `@media (max-width: 700px)`: width, dynamic viewport height, keyboard offset, safe area, 16px input text; compact 36px send visual with 44px target |
| Small phones | `@media (max-width: 359px)`: mascot, padding, gaps, cards, follow-ups |
| Tablets | `@media (min-width: 701px) and (max-width: 1100px)`: panel width; desktop measured-header height formula applies |
| Reduced motion | `@media (prefers-reduced-motion: reduce)`: disable animations/transitions; `TypedResponse.jsx` completes immediately |

## Manual tweaks

**Make the panel shorter:** edit `.portfolio-chat-panel` in `PortfolioActions.css`, change the 600px ceiling in `height`. Change the mobile ceiling in the 700px media query too. Keep the measured-header subtraction and conversation `min-height: 0`; do not make the entire panel scroll.

**Change header spacing:** edit `.portfolio-chat-header` padding/gap. The main navigation height is measured automatically. The desktop 88px allowance is 20px bottom inset + 40px floating controls + 12px gap + 16px clearance. Update that allowance if those controls or gaps change.

**Make the input thinner:** edit `.assistant-composer` padding and `.assistant-composer textarea` vertical padding/line-height. For multiline maximum change 132 in both CSS and `AssistantPanel.jsx`. Retain the mobile 16px font to avoid iOS zoom.

**Resize the mascot:** edit `.portfolio-chat-header > img`, `.assistant-avatar`, or `.assistant-welcome .assistant-avatar`, depending on which image. Check the 359px override.

**Resize the send control:** edit `.assistant-composer button` width/height/radius and its mobile override. Preserve the pseudo-element expanding the mobile hit target to 44px.

**Change mobile panel height:** edit `.portfolio-chat-panel` inside `@media (max-width: 700px)`. `--assistant-viewport-height` and `--assistant-keyboard-offset` are managed by `PortfolioActions.jsx` from `visualViewport` resize/scroll events. Preserve those calculations and safe-area spacing.

**Adjust footer spacing:** edit `.portfolio-chat-footer` top padding and `.assistant-footer-secondary` bottom padding. Keep the two exact attribution strings in `AssistantPanel.jsx`.

## Debugging and adding evidence

Call `answer('Does Keeno have any Google skills?')` and inspect `.debug`: intent, expanded groups, terms, all ranked scores/provenance and selected project IDs. `.interpretation` retains normalised text, entities, domains and intent. Debug output is not rendered to visitors. The engine imports credential images, so Node validation bundles it with esbuild and `.png: dataurl`.

When adding a source, inspect the actual implementation, record a commit/path and date, merge technologies, retain old provenance, and qualify adapter/configuration support versus live deployment. Keep unimplemented scope out of `implementedTechnologies`. Do not infer proficiency from README keyword frequency or a repository title. If a previously unavailable repository becomes accessible, inspect it before changing status.

Keep visible portfolio copy independent: changing assistant build status does not publish a detail page. Built records with unpublished pages label their links **View portfolio placeholder**.

## Validation

- `node scripts/validate-assistant.js`: existing behaviour, aliases, typo handling, follow-ups, roles and navigation.
- `node scripts/validate-assistant-expansion.js`: 20 broad questions, vendor/AI intersections, canonical deduplication, provenance, accurate statuses and index counts.
- `npm run dev -- --host 127.0.0.1`, then `node scripts/verify-assistant-browser.js`: typing, cards, focus, history, multiline input, attribution, responsive layouts, simulated keyboard, reduced motion, back-to-top and routing.
- `npm run build`; `npm run lint`.

Browser checks use 320×640, 390×844, 768×1024, 1366×768 and 1920×1080. Keyboard metrics are simulated; physical keyboards/native MAUI devices and live cloud accounts have not been tested. See `EVIDENCE_AUDIT.md` for the source inventory and limitations.
