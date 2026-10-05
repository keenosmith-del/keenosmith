# Recruiter View V1

Route: `/recruiter-view`. All page presentation and scoring live here. Navigation wiring is in App/Header and a role-only Assistant CTA. The CTA preserves the full submitted question in router state.

## Shared evidence

Scoring imports `canonicalProjects`, `credentials`, `education`, `experience` and `skillRegistry` from `src/assistant/knowledge.js`; `interpret`, `normalize`, `contains`, `retrieve`, `evidence` and `taxonomy` are shared with the Assistant. No parallel knowledge registry or static project/credential list exists. Manual additions flow through the same registry. Canonical IDs deduplicate projects. Only demonstrated implemented technologies establish direct matches; planned stacks do not score as implementation. Build and portfolio publication status stay separate.

## Parsing and scoring

Recognises the shared technology vocabulary/aliases, plus LLM, vector search, Node.js, REST API and agent wording; 16 shared taxonomy categories; degree/education, numeric years-of-experience and certification context. A small unsupported-tool vocabulary allows common missing technologies such as Salesforce/SAP to be displayed rather than silently ignored. Expanded ecosystem terms retrieve evidence, but are not manufactured into explicit job requirements. Broad domains are separate, capped requirements.

Technology weight: 2. Domain/context weight: 1. Direct built implementation: 65. Each additional canonical implementation adds 5 (maximum 15). Direct inspected source/configuration evidence adds 10; supporting credentials add 5 when implementation exists. Otherwise training alone scores 25, listed capability 15, related domain 10, no evidence 0. Domain scores cap at 75. Education context scores 20 because coursework/training does not establish an awarded degree; unverified professional tenure/certification requirements score 0. Overall = rounded weighted mean. Strong ≥80, good ≥65, partial ≥40, limited >0, missing =0. Matched count uses ≥40. Counts group strong/good and partial/limited explicitly.

Direct implementation depth is represented by built implemented scope and source provenance, rather than inferred complexity or employment duration. Source/configuration evidence does not confirm production deployment. Scores are evidence coverage, not proficiency, hiring likelihood or a personal rating.

## UX and limitations

Responsive siblings on desktop, stacked at 1000px and below. Neutral surfaces, established hero typography, existing mascot and scoped CSS. Accessible labels, meaningful status announcements, visible focus, keyboard toggle buttons and reduced motion. Processing yields one event-loop turn for browser painting, without fake delays. Clear/unmount cancel pending work; a generation guard prevents stale results. Role starters populate editable inputs. Future unified Explore CTA is disabled: the existing skills-only Explore route is not that planned experience.

Input is bounded to 16,000 characters. Unknown technologies outside the recognised vocabulary, negation, mandatory/preferred distinctions, seniority, leadership, nontechnical criteria and production scale require manual review. Not every sentence is a scored requirement. Credentials retain their registry classifications and listed certificate status; external issuer verification is not implied. A generic certification request remains unresolved rather than equating courses/badges with certification.

## Validation

- `node scripts/validate-recruiter.js`
- `node scripts/verify-recruiter-browser.js` (running Vite; optional PORTFOLIO_TEST_URL)
- Existing Assistant validation and expansion scripts, production build and lint.

Browser script checks header and project navigation, Assistant handoff, overview/details, role reassessment, reset/errors, 1440/900/390/320px layouts and reduced motion. Screenshots are written to `/tmp/recruiter-*.png`. These are browser viewport checks, not physical device keyboard tests.
