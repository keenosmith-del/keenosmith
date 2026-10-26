# Role-specific CV content

The updated 2026 PDFs in `public/` are authoritative and downloaded unchanged:

- `ai.json` → `Keeno-Smith-CV-ATS-AI-Engineer-2026.pdf`
- `cloud.json` → `Keeno-Smith-CV-ATS-Cloud-Engineer-2026.pdf`
- `full-stack.json` → `Keeno-Smith-CV-ATS-Full-Stack-Engineer-2026.pdf`

Each role file retains its source headline, emphasis, summary, technical skills, five experience entries, project order, project wording and repository URLs. Skills and experience are role-specific. `common.json` contains shared contact information, education and credentials, plus an AI-role skills and experience baseline used by the assistant and recruiter features. Each CV overrides that baseline with its own exact source wording. `versions.js` assembles each complete document.

Line wrapping, bullet markers and PDF page-number footers are omitted in HTML. “Experience Continued” is a pagination heading; its content continues inside Experience. Preserve the source's statements, dates and credential status. Do not substitute project-page copy for CV wording.

`sourceSha256` records which original file was reviewed. Update the relevant data and hash together when replacing a PDF, and compare the complete HTML content with the source PDF text. Do not run the legacy `cv:pdf` generation script to produce these downloads.

Employment and learning dates in `src/data/timelineChapters.js` follow these CVs. The existing school chapter retains previously supplied background; independent projects have no implied delivery dates.

## Browser regression check

With the portfolio running locally, run:

```sh
PORTFOLIO_TEST_URL=http://127.0.0.1:5173 node scripts/verify-cv-browser.js
```

This checks the entire rendered document for each version, source-PDF hashes and actual downloaded bytes, all three layouts, query preservation and defaults, browser history, native keyboard selection, repository link targets and selectable text. Screenshots and downloaded test files are written to a temporary directory.
