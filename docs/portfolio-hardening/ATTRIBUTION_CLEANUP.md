# Documentation, attribution and branch cleanup

Date: 27 October 2026 (Africa/Johannesburg). Starting handover: `81e5a548de1422c7449d68dc35cbbdde26025c18`. Neutral working branch: `portfolio-hardening`, created directly from that handover. All existing implementation/documentation commits are retained. The original engineering branch remains available; deletion requires owner approval. No history rewrite, force-push, main merge or deliberate production deployment is part of this cleanup.

## Initial audit and corrections

The initial case-insensitive audit covered all 500 tracked files, including all documentation, source comments, workflows, configuration, tests and generated metadata. There were 297 UTF-8 text files. Raw-byte inspection across all tracked files found the same four matching files; no tracked filename or directory matched. Four development-assistant name references were removed. Three were branch/configuration references and one was an external evidence-path segment; no authorship or implementation credits were found. The table records exact original locations at the starting handover without reintroducing the removed text.

| File | Original line | References removed | Context and correction |
| --- | ---: | ---: | --- |
| `.github/workflows/portfolio-verification.yml` | 5 | 1 | Replace the obsolete tool-prefixed push pattern with the exact neutral branch. |
| `docs/portfolio-hardening/BASELINE.md` | 3 | 1 | Describe the retained original engineering history and current neutral branch, preserving baseline/date/handover revisions. |
| `docs/portfolio-hardening/RELEASE_READINESS.md` | 3 | 1 | Use the current neutral working branch; preserve every iteration result, SHA, limitation and owner gate. |
| `docs/evidence/lambda-search.json` | 140 | 1 | Explicitly redact the development-tool-specific directory segment in a recorded external path. Add a redaction explanation; retain its repository revision, blob SHA and size. The bracketed path is an explicitly redacted record, not a claim that the external repository was renamed. |

Legitimate OpenAI API/model and Anthropic SDK/Claude project references remain. Broader authorship-phrase searches were inspected: matches describing implemented provider integrations are technical evidence, not development attribution. No career facts, project content or implementation technology was removed.

## Workflow and scope

Pull requests remain enabled without a branch filter. Pushes verify `main` and `portfolio-hardening`; the obsolete tool-prefixed pattern is removed. Existing read-only permissions, pinned actions, Node/browser setup, scoped namespace allowance, virtual desktop, source verification and all 17 browser suites are unchanged. The existing documentation-only push exclusion is retained; pull requests always run. A final report-only commit may therefore follow the verified correction without repeating unchanged runtime tests.

Only the four audited files and neutral cleanup records are changed. All five iteration directories, earlier CI evidence, source evidence, measurements, decisions and outstanding production gates remain available. Repository runtime sources, styles, assets, CV JSON/PDFs, dependency manifests, API/security controls and project content must be byte-identical to the starting handover; the final audit records this check. Git metadata and historical commit messages are deliberately preserved.

## Verification

- `npm run verify`: passed locally, including lint, build, Assistant, Recruiter, refresh, hardening/API, Explore, catalogue-route and static SEO checks. Lint: zero warnings. Generated static output: 87 shells, 27 canonical sitemap entries.
- `npm run test:browser`: all 17 existing controlled local production-build browser/raw-response suites passed; individual exit codes are preserved in the compact audit evidence. Includes contact, video fallback, Recruiter, CV downloads, Assistant, project navigation/pages/styles, three case studies, catalogue refresh, tile interactions, accessibility, links and launch behavior.
- Neutral-branch GitHub verification: [run 40573182715](https://github.com/keenosmith-del/keenosmith/actions/runs/40573182715) passed source checks and all 17 browser/raw-response suites on correction `2a08749f357fbd5b196494902aa937ed12244e4e`. The original 17-suite workflow is unchanged apart from its push branch selector. The subsequent evidence-only commit is covered by the existing documentation push exclusion; its runtime/workflow tree is identical to the green correction.
- Final case-insensitive content/path audit: zero name references in current tracked contents, filenames or directory names. The initial four references are removed; new cleanup records do not reintroduce them. Hash comparison found exactly four changed existing files (listed above), with all other 496 original tracked files byte-identical, including 428 implementation files. All 20 records across the five iteration directories remain byte-identical. No visual or functional changes were introduced.

Temporary logs are outside Git at `/tmp/portfolio-neutral-cleanup`. Compact permanent evidence is under `evidence/attribution-cleanup-audit.json` and `evidence/attribution-cleanup-ci.json`; earlier CI history remains intact. These two records and this cleanup report are the only three added files. The four corrected files are listed with original line numbers above.

## Release status

This cleanup does not resolve or erase existing production gates: authenticated Vercel-preview route/header checks, the public AI-project count decision, EmailJS account restrictions/live-delivery approval, optional CV project proposals, external-link review and main required-check protection. The documented transient animation contrast and performance/browser-coverage limitations remain. Production release still requires owner review. Removal of the original engineering branch is not authorised.

## Repository and release checks

Git ancestry confirms the neutral branch contains handover `81e5a548de1422c7449d68dc35cbbdde26025c18` and every prior hardening commit. The original branch still points to that handover. Read-only GitHub inspection confirms main and the latest recorded Production deployment remain at `79a314553f897135c17095dea1f84df7c8d142ef`. No deployment command, production mutation, real contact delivery or paid inference was performed. The final handover commit only closes these neutral evidence records; it does not alter the verified implementation or workflow.

A fresh production build also matches the prior verified hardening build byte-for-byte: all 261 generated files are identical, including route HTML, SEO output, scripts, styles and assets.
