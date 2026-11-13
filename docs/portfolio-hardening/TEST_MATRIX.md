# Verification matrix

Application and integrated verification source: `b72b16a941c2c35515b3ff0918980aedf099f1bd`. Final GitHub run 40535005760 passed source verification and all 17 browser/raw HTTP suites. Final report commits change documentation only.

## Reproduce

```sh
npm ci --include=dev
npx puppeteer browsers install chrome
npm run verify
npm run test:browser
```

The browser runner owns a strict loopback preview (default port 4181), clears model configuration and snapshots production output under its temporary evidence directory. Choose an unused loopback URL with PORTFOLIO_TEST_URL. Do not point this controlled mutation/mocking suite at production. Linux CI supplies Xvfb for the hover-specific tile test and an exact-browser AppArmor namespace allowance; no browser isolation disable is used.

## Source/build suites

| Command | Purpose | Task outcome |
| --- | --- | --- |
| npm ci / npm ci --include=dev | Baseline/final locked installation | Passed locally and in GitHub |
| npm run lint | Syntax, unused imports, hooks | Baseline passed with one existing warning; final passed with zero warnings |
| npm run build | Assistant catalogue, production Vite output, static route shells | Passed; 87 shells and 27 sitemap entries |
| npm run test:assistant | Existing engine, retrieval/expansion, conversation and mocked provider/quota tests | Passed |
| npm run test:recruiter | Nine original representative roles, mutations, scopes and contribution arithmetic | Passed |
| npm run test:refresh | Shared candidate/project facts, exclusions and accepted CV hashes | Passed |
| npm run test:hardening | Eleven additional constructed roles, qualification adversaries, tenure bounds, leadership overlap, API failures | Passed |
| npm run test:explore | Search/filter/catalogue/evidence semantics | Passed |
| node scripts/validate-catalogue-routes.js | Each of 22 Explore entries has one accepted route/repository | Passed |
| npm run test:seo | Static heads, canonical uniqueness, structured-data shape and sitemap | Passed |
| npm audit --json | Locked dependency graph advisories | Six high affected packages before; zero known vulnerabilities after updates |

## Controlled production-preview browser suites

Run through npm run test:browser; every script accepts PORTFOLIO_TEST_URL.

| Script | Unique coverage |
| --- | --- |
| verify-seo.js | 87 exact raw HTML responses; robots/sitemap/social MIME; unknown 404/noindex |
| verify-contact-browser.js | Invalid email, intercepted failure/retry/success, retained input, direct email, three widths, modal focus/scroll restoration and unknown refresh |
| verify-media-browser.js | Existing-footage poster decodes under missing video/blocked autoplay, healthy playback and reduced-motion/geometry checks |
| verify-recruiter-browser.js | Analysis/cancel/reassessment, model revision, bars, source/credential links, 320–1440px and reduced motion |
| verify-cv-browser.js | Complete accepted HTML text, three selections/queries/history, PDF hash/download bytes and 1440/390/320px |
| verify-assistant-browser.js | Conversation, pending/rapid input, cards, scroll ownership, long role text, keyboard simulation, five widths and navigation |
| verify-project-navigation.js | All 22 Explore entry/return paths and retained filters, direct/refresh fallback |
| verify-project-pages.js | 46 rendered route/viewport cases, hero fit, modal semantics/focus, footer and motion |
| verify-project-style-consistency.js | Five reference/new pages at three widths, normal/hover computed styles, centered footer/floating behavior and four baseline source/style hashes |
| verify-crewai-case-study.js | CrewAI source/disabled platform, evaluation caveats, supplied PDF, modal/sections/aliases/filters and five widths |
| verify-assessflow-case-study.js | AssessFlow source/disabled platform, Microsoft deployment restraint, supplied PDF and five-width controls/navigation |
| verify-streamlit-case-study.js | Streamlit distinct implementation, Gemini/release caveats, supplied PDF and five-width controls/navigation |
| verify-portfolio-refresh-browser.js | All 260 skill panels, categories/search, three new projects, AI counter and reduced motion |
| verify-project-tile-presentation.js | All 22 tile resting/hover/focus compositions at five widths and touch; requires genuine hover-capable desktop CSS |
| verify-accessibility-browser.js | Axe: nine initial routes plus Links, contact, Assistant and five technology modals (17 states) |
| verify-links-browser.js | 27 canonical pages; 148 hrefs, 57 local paths and 28 document PDFs; no page errors |
| verify-launch-browser.js | Post-target availability caveat and no countdown-enabled public link |

The complete local frozen run passed 14/16 before correcting the tile loader and two pill-text contrast failures. Both corrected local suites passed. GitHub then passed 15/16, with only Linux headless hover capability failing before virtual-desktop configuration. A subsequently verified same-footage failure poster adds a seventeenth media suite. Final GitHub outcome is recorded in RELEASE_READINESS.md and evidence/ci.json; earlier failures are retained in iteration reports rather than relabelled as passes.

## Supplemental task-executed checks

| Command/script | Actual result |
| --- | --- |
| verify-assistant-intelligence-browser.js | Passed after waiting for intentional lazy route mounting; includes Clear/cancellation, original suggestions and every catalogue destination |
| verify-assistant-scroll-browser.js | Passed |
| verify-project-reset-browser.js | Passed |
| verify-evidence-refresh-browser.js | Passed |
| verify-company-iteration.js | Passed after updating the qualified launch-target wording; five viewports, seven aliases, modal/anchors/PDF and company identity |
| node docs/portfolio-hardening/evidence/verify-contact-inflight.mjs | Passed: loading label/disabled/aria-busy, second in-flight submit blocked, failure releases retry; one intercepted request, no mail |
| Read-only CV reconciliation using pypdf | 66 text checks per version / 198 total passed, including selected project references; all three SHA-256 hashes match |
| PDF rendering with pdftoppm | All nine original pages rendered outside Git; three representative pages visually inspected; no source modification |
| verify-hardening-visual.js release-final | 70 captures at 1440/1024/768/390/320; no horizontal overflow; all captured heading typography/colors and body backgrounds match baseline |
| compare-layout.mjs | Source-to-source geometry comparison; actual results in final-comparison.json / layout summary |
| measure-hardening-performance.js release-final | Four routes, cold/repeat loads, LCP/CLS, JS heap and synthetic focus timing; actual numbers in final-comparison.json |
| Lighthouse | Matching Chrome 152 / preview implementation baseline and final reports; 46→62 Performance (final sequential controlled pair), 96→96 Accessibility; individual metrics/limits retained |
| verify-external-links.js | 82 read-only HTTP checks, 73 reachable; restrictions/network/Kaggle review and two confirmed private company repositories recorded |
| production-smoke.js | GET-only existing production pages/PDFs/crawler endpoints; old production still serves SPA HTML at robots/sitemap; no mail/Assistant submission |

Regeneration/audit utilities (generate-cv-pdf, company brief generation, source audit/export, kinetic typography) are not ordinary pass/fail suites. The legacy CV generator must not overwrite accepted downloads. Source application suites were not run or modified.

## Scope limits

Automated checks do not prove complete accessibility or semantic model grounding. The Cloud heading can fail a mobile Lighthouse contrast snapshot while partly faded; settled/reduced-motion rendering and the required animation are distinct. Performance samples are local diagnostics, not field INP or production Core Web Vitals. External HTTP restrictions are not automatically broken links. Preview login protection blocks anonymous hosted-route verification. No real contact delivery or paid inference occurred.

Logs/screenshots: /tmp/portfolio-hardening. Large artifacts remain outside Git. Permanent compact evidence and executable diagnostics are under evidence/.
