# Portfolio engineering hardening

Programme requested 27 October 2026. Work proceeds in order: baseline audit, evidence integrity, performance, crawler delivery, production reliability, consolidation and final verification. Production merge requires owner approval.

- [Baseline](BASELINE.md) and [machine inventory](evidence/baseline.json)
- [Design contract](DESIGN_CONTRACT.md)
- [Decisions](DECISION_LOG.md) and [changes](CHANGELOG.md)
- [Verification matrix](TEST_MATRIX.md)
- [Release readiness](RELEASE_READINESS.md)
- [001 Evidence integrity](iterations/001-evidence-integrity/PLAN.md)
- [002 Performance](iterations/002-performance/PLAN.md)
- [003 Search discoverability](iterations/003-seo-discoverability/PLAN.md)
- [004 Production quality](iterations/004-production-quality/PLAN.md)
- [005 Consolidation and QA](iterations/005-consolidation-qa/PLAN.md)

Evidence vocabulary: “inspected” means source read; “executed” means run during this task; “historical” is an existing report; “browser observed” means locally observed; “production verified” requires a live read-only check; “pending” is not a pass. Build success alone does not establish readiness. Large screenshots and diagnostics remain outside Git under /tmp/portfolio-hardening.
