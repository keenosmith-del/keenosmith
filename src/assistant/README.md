> Shared evidence refresh, 18 October 2026: see [current audit and behaviour report](../../docs/evidence/REFRESH_REPORT.md) and [maintenance process](../../docs/evidence/REFRESH_PROCESS.md). The current CV-derived profile, 6+ overall baseline, separate Python duration and instructed education assessment status supersede older candidate summaries below.

# Ask my Assistant V1

Runs locally: interpret → retrieve and rank → compose → structured UI. `answer(question, context)` is the provider boundary for future semantic retrieval or response generation. No network inference or keys.

Sources: shared featuredProjects, projectConcepts, skillGroups and credentials; curated implementation facts from project detail pages; CV education, experience and architecture descriptions. CV architecture records have unverified completion. Microsoft detail-page implemented/planned scope overrides broader CV wording. Certification images are records, not independent issuer verification. Issuer-profile links are labelled accordingly. Exam plans, commented-out records and aggregate badge counters are excluded. Update cvProjects when CV architecture descriptions change.

Evidence bands are deterministic ordinal categories: 0 no direct/listed/learning support; 1 listed skill or supporting credential; 2 one implemented project; 3 two or three; 4 four or more. Explicit project technology usage counts once per project. Planned and unverified architecture work never count. Bars show evidence availability, not ability or hiring match percentages. Details expose supporting counts.

Inputs are bounded to 16,000 characters. Aliases, technology entities, limited one-edit tolerance, domain intents and previous entities guide ranking. Direct project match (100) outranks exact stack evidence (12 per skill), description evidence (3); implemented evidence gets a small priority (5). Follow-up requests for other projects exclude the prior first three when alternatives exist. Role analysis reports recognised requirements and parser limits. This is lexical retrieval and factual composition, not generative AI.

Verification: `node scripts/validate-assistant.js`; with dev server running, `node scripts/verify-assistant-browser.js`. Existing scripts: `npm run build`, `npm run lint`.

## V2 presentation

The engine, knowledge and ordinal evidence bands are unchanged. MessageText renders existing paragraph labels as sections and exposes education records through the CV. Evidence cards retain complete descriptions with an optional details disclosure. Long result lists can expand and collapse. Only the latest message offers follow-ups.

TypedResponse owns its presentation timer and chunked updates; completed messages/cards are memoised. Responses complete in roughly 1.5 seconds, with immediate completion available. Timers survive panel hiding (which preserves the conversation) and are cleared on unmount. Reduced-motion replies skip typing. New exchanges anchor at the user message; typing and completion preserve manual scrolling. The latest-message control explicitly scrolls to the end. Composer autosizes to 132px, then scrolls internally. Closing makes the panel inert immediately and finishes its brief visual transition before hiding. Mobile visualViewport metrics preserve composer access; browser tests simulate the keyboard metrics, rather than claiming a physical-device keyboard test.

## Knowledge expansion (October 2026)

The maintenance guide is [ASSISTANT_README.md](./ASSISTANT_README.md), with exact CSS selectors and tweak instructions. [EVIDENCE_AUDIT.md](./EVIDENCE_AUDIT.md) records the source audit. Existing records and engine behavior are retained; source-supported built status is now independent of portfolio publication. Evidence bands use implemented technologies and canonical project counts; broad categories no longer truncate to five skills. `answer().debug` exposes query expansion, scores and provenance.

## User-message scrolling — 14 October 2026

Each submission anchors to the latest user message, scrolling only as far as real conversation content permits. No response min-height or artificial spacer is added. Short conversations sit against the composer; longer answers grow below the user message. A ResizeObserver follows content and viewport size changes while that anchor remains active. Wheel, touch, keyboard and manual history scrolling release the anchor, so typing/completion do not take over reading. Close/reopen preserves that reading position. Only the internal conversation scroller moves; the main page does not.

Latest message appears only when the conversation actually overflows and more than 24 pixels of content remain below the viewport. It is recalculated during typing, completion, resize and evidence disclosure. Clicking it explicitly scrolls to the bottom. Fast replies show the activity indicator for at least 750 ms before transitioning to typing; slower provider responses do not receive another fixed delay. Clear cancels both the request and this presentation timer.

Run `node scripts/verify-assistant-scroll-browser.js` with Vite running for desktop/mobile greeting spacing, user anchoring, thinking timing, overflow controls, manual scrolling, reopening and reduced-motion checks. Real mobile touch and software-keyboard behavior still needs manual verification.

## Conversational reasoning layer

`conversation.js` wraps the existing interpreter, retrieval, evidence bands and engine with brief answers, small local social handlers and bounded topic memory. `AssistantPanel` retains typing, scroll anchoring, close/reopen history and navigation. Original starter questions remain in the existing follow-up area (under Original questions after a reply); contextual chips supplement them. The new-chat icon appears beside Close only after a user message, cancels pending inference/typing and resets history and topic memory.

`/api/assistant` uses native fetch through `server/llm.js` for an OpenAI-compatible chat-completions provider. The model sees six recent turns (1,500 characters each), the current message (16,000 characters maximum), compact verified project/credential records and deterministic retrieval results. It interprets intent and synthesises short answers; it never supplies card content or URLs. Returned project IDs, credential IDs and skill names must exist in the catalogue, otherwise the whole answer falls back. Cards retain all deterministic results behind disclosure, displaying two initially. The model is instructed to distinguish implementation, learning, plans and unverified deployment, and to separate demonstrated/transferable/missing role evidence. Prose grounding relies on these instructions; ID validation cannot prove every generated sentence, so review provider output during rollout.

The generated `server/catalogue.generated.js` is built from existing sources with images excluded; no second knowledge dataset needs manual maintenance. `npm run dev`, `npm run build` and `npm run test:assistant` regenerate it. Do not invoke Vite directly after a clean checkout without first running `node scripts/build-assistant-server.js`.

### Local configuration

Copy `.env.example` to `.env.local`, set `ASSISTANT_LLM_API_KEY`, `ASSISTANT_LLM_BASE_URL` (the provider API base, including its version path) and `ASSISTANT_LLM_MODEL`, then run `npm run dev`. The existing Vite server serves the API through a small middleware; restart after changing env values. All three values are required to enable inference. The provider must accept `chat/completions`, JSON-object responses and `max_tokens`; incompatible or unconfigured providers use deterministic answers. HTTPS is required, except a localhost provider in development. Never prefix secrets with `VITE_`.

Run `npm run test:assistant`, `npm run lint`, and `npm run build`. With Vite running, `PORTFOLIO_TEST_URL=http://127.0.0.1:5173 node scripts/verify-assistant-intelligence-browser.js` verifies the UI and API integration. `scripts/verify-assistant-scroll-browser.js` verifies response-start anchoring. Inference tests use a mock provider; actual response quality and connectivity need a configured provider.

### Vercel and production protection

Use the existing Vite build (`npm run build`) and `dist` output. `api/assistant.js` is a lightweight Node serverless function; the API rewrite is excluded from the SPA catch-all. Set the three LLM variables in Vercel's server environment and redeploy. API keys and the provider module are never imported into the React bundle. The function allows POST JSON only, same-origin browser requests, 48 KB request bodies, validated bounded history and no caching. Provider timeout is 10 seconds; the client gives the full request 14 seconds. Clear/unmount cancels the client request; an already-started server inference may still consume provider tokens.

Production paid inference additionally requires `ASSISTANT_RATE_LIMIT_URL` and `ASSISTANT_RATE_LIMIT_TOKEN` for an Upstash-compatible Redis REST endpoint. Atomic shared minute counters default to 8 requests per client IP and 60 globally; optional `ASSISTANT_RATE_LIMIT_PER_MINUTE` and `ASSISTANT_RATE_LIMIT_GLOBAL_PER_MINUTE` adjust those quotas. Missing configuration, quota exhaustion or limiter failure disables inference and returns the deterministic response. No in-memory production-wide guarantee is claimed. Vercel's platform `x-real-ip` identifies clients; local forwarded headers are ignored. NAT users share an IP quota. Fixed minute windows permit bursts at boundaries. Enable Vercel firewall/bot rules and provider spending limits for stronger distributed-abuse/cost controls; an Origin check alone does not authenticate callers. Local development can use inference without Redis. No conversation storage or user accounts are added.

Model output is limited to 450 tokens and 24 KB transport; invalid JSON, unverified evidence IDs, links/HTML, percentage claims or answers above the prose limit trigger fallback. Prompt instructions treat user/history/catalogue content as data and forbid overrides, invented claims and external actions. This reduces injection risk without claiming language-model prompts can guarantee factual accuracy. No current-market data source is available; material market claims must state that limitation.

Follow-up suggestions sit directly beneath replies; empty evidence sections render nothing. Social replies are shared by the deterministic engine and conversational wrapper.
