# Baseline audit

Started 27 October 2026 (Africa/Johannesburg). Source `79a314553f897135c17095dea1f84df7c8d142ef`; clean main checkout. Original engineering branch retains the verified history; the current neutral working branch is `portfolio-hardening`, based on handover `81e5a548de1422c7449d68dc35cbbdde26025c18`. No other repositories modified.

React 19, React Router 7, Vite 8; EmailJS browser contact, Puppeteer 25; oxlint. Vercel serves a Vite SPA and `api/assistant.js`, which imports the server-only deterministic/optional inference handler. No GitHub Actions workflow existed. `vercel.json` rewrote all non-API paths to index.html; no security headers. Raw HTML title was only Keeno Smith; no description, canonical, social metadata, sitemap or robots source.

Read-only GitHub inspection: baseline combined status success with Vercel check, deployment environment Production at the baseline SHA. main is unprotected. No local Vercel project/settings export establishes the configured production-branch setting; main-to-production relationship is observed, not assumed. Task-branch preview integration remains to be verified after push.

Executed: npm ci (116 packages), lint (exit 0, unused fs import in legacy CV generator), build (exit 0), test:assistant (exit 0), test:recruiter (9 roles, exit 0), test:refresh (exit 0). Logs: /tmp/portfolio-hardening/baseline. These are task-executed results, separate from historical reports under docs/.

Build: 984.69 kB JavaScript / 266.79 kB gzip, 420.34 kB CSS / 55.82 kB gzip. Vite warns about >500 kB chunks. Machine inventory includes emitted assets, image source formats/sizes and documents. Large PNG examples: enterprise-ai-mlops 2,483,887 B; Claude 2,449,499 B; manufacturing 2,420,922 B; AssessFlow 2,351,440 B; mascot 2,293,777 B. Originals retained.

Candidate facts revision 2026-10-18.2; project evidence 2026-10-26.1. Recruiter contextual model 2.1.0 used a universal education completion shortcut and any experience to satisfy qualification alternatives. Source audit identifies these as incorrect semantic shortcuts. Current education explicitly lists BSc Computer Science 2017–2022 but no award/conferral statement. Preserve accepted completion instruction and wording; an explicit award requirement needs review.

CV data README says existing three 2026 PDFs are authoritative, with source hashes and browser text reconciliation. Do not regenerate them with the legacy generator. New AI selected-project substitutions require owner editorial review; no automatic substitution.

Route inventory, browser findings, visual references and transfer measurements are supplemented by evidence JSON and iteration reports as execution completes. No production form submission or paid provider request is authorized by this audit.

## Completed baseline evidence

Captured 70 original screenshots across 1440/1024/768/390/320px with no horizontal overflow. After excluding the Vite-restart-contaminated initial run, git-archived baseline checks passed for CV, Recruiter, Streamlit, all 260 skill panels and exact project styles. Original Assistant browser checks failed stale title/footer expectations; that failure is historical task evidence, not a production outage claim.

Original registry: 44 retrieval projects, 25 reviewed implementation records, 22 gallery entries, 16 AI-flagged records before policy exclusions. Current accepted CVs comprise three original three-page PDFs and four JSON records. PDF inventory is 31 files (28 documents and three CVs); root CVs remained byte-identical throughout the task.

The matched preview baseline (Chrome 152, 390×844, 150ms latency, 200kB/s down, 4× CPU) measured cold homepage encoded resources 13,275,399 B, image bodies 11,956,082 B, LCP 36,236ms and CLS 0; repeat LCP 1,312ms. Matching-server Lighthouse measured Performance 46, Accessibility 96, simulated LCP 14,062.7ms, TBT 1,208ms and CLS 0. Earlier baseline Lighthouse on a plain static server is retained outside Git but is not the primary comparison because compression differed.
