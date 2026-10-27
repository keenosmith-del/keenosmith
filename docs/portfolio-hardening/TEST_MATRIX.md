# Verification matrix

Set `PORTFOLIO_TEST_URL` explicitly. Default local dev URL 127.0.0.1:5173. Existing assistant browser script currently hardcodes that URL; fix in production-quality iteration. Baseline logs: /tmp/portfolio-hardening/baseline. Final logs: /tmp/portfolio-hardening/final.

| Group | Commands | Purpose |
| --- | --- | --- |
| Install | npm ci | Locked dependencies |
| Static/build | npm run lint; npm run build | Syntax/lint and production output |
| Assistant | npm run test:assistant | Deterministic retrieval, grounding, mocked provider boundaries |
| Recruiter | npm run test:recruiter | Extraction, provenance, weighted arithmetic, separate review |
| Shared facts | npm run test:refresh | Candidate/project facts and CV digests |
| Explore | src/components/pages/Explore/tests/exploreIndex.test.js | Catalogue destinations and search/filter evidence |
| Project/browser | scripts/verify-project-pages.js, verify-project-navigation.js, verify-project-style-consistency.js | Rendering, origin restoration, modal and reference control styles |
| Case studies | verify-crewai-case-study.js, verify-assessflow-case-study.js, verify-streamlit-case-study.js | Hero actions, summaries, modals and deployment restraint |
| CV | verify-cv-browser.js | Complete accepted text, three selections, source hashes and downloaded bytes |
| Recruiter/browser | verify-recruiter-browser.js | Interaction, assessment, layout |
| Assistant/browser | verify-assistant-browser.js | Conversation, evidence cards, keyboard and scrolling |
| Refresh/browser | verify-portfolio-refresh-browser.js | All skill panels and new project integration |

Tests executed on the baseline are separate from historical reports. Browser success is local observation, not proof of live production API configuration or complete accessibility. Performance diagnostics are not field Core Web Vitals. Additional task-specific checks will be recorded with actual outcomes.
