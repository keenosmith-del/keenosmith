# 004-production-quality

Status: planned.

## Objective and inspected problem

Repeatable verification and visible recovery.

## Scope and method

Inspect all existing scripts, server handler, LLM boundary, contact form and Vercel config. Add non-deploying CI running existing tests and browser preview. Add contact failure feedback and API regression cases. Add understated unknown route. Review headers and account-level deployment/abuse protections; document inaccessible settings.

## Acceptance

Use the user-requested acceptance gates. No completion claim without executed relevant tests, browser observation, factual documentation and traceable commit. Dependencies: complete preceding iteration before implementation. Baseline screenshot/browser evidence is captured before code changes.

## Boundaries

No redesign, CV career edits, application-repository changes, paid calls, production merge or deliberate production deployment.
