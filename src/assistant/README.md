# Ask my Assistant V1

Runs locally: interpret → retrieve and rank → compose → structured UI. `answer(question, context)` is the provider boundary for future semantic retrieval or response generation. No network inference or keys.

Sources: shared featuredProjects, projectConcepts, skillGroups and credentials; curated implementation facts from project detail pages; CV education, experience and architecture descriptions. CV architecture records have unverified completion. Microsoft detail-page implemented/planned scope overrides broader CV wording. Certification images are records, not independent issuer verification. Issuer-profile links are labelled accordingly. Exam plans, commented-out records and aggregate badge counters are excluded. Update cvProjects when CV architecture descriptions change.

Evidence bands are deterministic ordinal categories: 0 no direct/listed/learning support; 1 listed skill or supporting credential; 2 one implemented project; 3 two or three; 4 four or more. Explicit project technology usage counts once per project. Planned and unverified architecture work never count. Bars show evidence availability, not ability or hiring match percentages. Details expose supporting counts.

Inputs are bounded to 16,000 characters. Aliases, technology entities, limited one-edit tolerance, domain intents and previous entities guide ranking. Direct project match (100) outranks exact stack evidence (12 per skill), description evidence (3); implemented evidence gets a small priority (5). Follow-up requests for other projects exclude the prior first three when alternatives exist. Role analysis reports recognised requirements and parser limits. This is lexical retrieval and factual composition, not generative AI.

Verification: `node scripts/validate-assistant.js`; with dev server running, `node scripts/verify-assistant-browser.js`. Existing scripts: `npm run build`, `npm run lint`.

## V2 presentation

The engine, knowledge and ordinal evidence bands are unchanged. MessageText renders existing paragraph labels as sections and exposes education records through the CV. Evidence cards retain complete descriptions with an optional details disclosure. Long result lists can expand and collapse. Only the latest message offers follow-ups.

TypedResponse owns its presentation timer and chunked updates; completed messages/cards are memoised. Responses complete in roughly 1.5 seconds, with immediate completion available. Timers survive panel hiding (which preserves the conversation) and are cleared on unmount. Reduced-motion replies skip typing. New replies anchor once at their beginning; typing and completion preserve manual scrolling. The latest-message control explicitly scrolls to the end. Composer autosizes to 132px, then scrolls internally. Closing makes the panel inert immediately and finishes its brief visual transition before hiding. Mobile visualViewport metrics preserve composer access; browser tests simulate the keyboard metrics, rather than claiming a physical-device keyboard test.

## Knowledge expansion (October 2026)

The maintenance guide is [ASSISTANT_README.md](./ASSISTANT_README.md), with exact CSS selectors and tweak instructions. [EVIDENCE_AUDIT.md](./EVIDENCE_AUDIT.md) records the source audit. Existing records and engine behavior are retained; source-supported built status is now independent of portfolio publication. Evidence bands use implemented technologies and canonical project counts; broad categories no longer truncate to five skills. `answer().debug` exposes query expansion, scores and provenance.

## Response-start scrolling — 14 October 2026

`AssistantPanel` reserves a stable `a-*` identity on submission and keeps the same identity from typing to the completed message. `TypedResponse` calls `onStart` once after nonempty text renders. The panel measures the current internal viewport (after composer resizing), reserves enough response height to place that first fragment at the top, and writes only the conversation container's `scrollTop`. A recorded anchored ID prevents typing ticks, completion or reopening from taking over manual scrolling. Reduced-motion and immediate fallback completion use the same completed-message anchor path. The header/composer are outside this scroller; padding keeps the first line visible.

Bottom scrolling remains for submission/loading and the explicitly clicked Latest message control. Automatic typing-progress/bottom-follow effects were removed. CSS `overflow-anchor: none` prevents native browser anchoring from following growing content. No main-page `scrollIntoView` is used. History/session state, response generation, activity indicators, suggestions and navigation remain in the existing components.

Run `node scripts/verify-assistant-scroll-browser.js` with Vite running for the desktop/mobile viewport regression. Real mobile touch and software-keyboard behavior still needs manual verification.
