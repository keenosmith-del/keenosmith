# Ask my Assistant V1

Runs locally: interpret → retrieve and rank → compose → structured UI. `answer(question, context)` is the provider boundary for future semantic retrieval or response generation. No network inference or keys.

Sources: shared featuredProjects, projectConcepts, skillGroups and credentials; curated implementation facts from project detail pages; CV education, experience and architecture descriptions. CV architecture records have unverified completion. Microsoft detail-page implemented/planned scope overrides broader CV wording. Certification images are records, not independent issuer verification. Issuer-profile links are labelled accordingly. Exam plans, commented-out records and aggregate badge counters are excluded. Update cvProjects when CV architecture descriptions change.

Evidence bands are deterministic ordinal categories: 0 no direct/listed/learning support; 1 listed skill or supporting credential; 2 one implemented project; 3 two or three; 4 four or more. Explicit project technology usage counts once per project. Planned and unverified architecture work never count. Bars show evidence availability, not ability or hiring match percentages. Details expose supporting counts.

Inputs are bounded to 16,000 characters. Aliases, technology entities, limited one-edit tolerance, domain intents and previous entities guide ranking. Direct project match (100) outranks exact stack evidence (12 per skill), description evidence (3); implemented evidence gets a small priority (5). Follow-up requests for other projects exclude the prior first three when alternatives exist. Role analysis reports recognised requirements and parser limits. This is lexical retrieval and factual composition, not generative AI.

Verification: `node scripts/validate-assistant.js`; with dev server running, `node scripts/verify-assistant-browser.js`. Existing scripts: `npm run build`, `npm run lint`.
