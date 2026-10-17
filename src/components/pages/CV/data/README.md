# Role-specific CV content

The original PDFs in `public/` are authoritative and are downloaded unchanged:

- `ai.json` → `Keeno_Smith_AI_Engineering_CV.pdf`
- `cloud.json` → `Keeno_Smith_Cloud_Engineering_CV.pdf`
- `full-stack.json` → `Keeno_Smith_Full_Stack_Engineering_CV.pdf`

Each role file retains its source headline, emphasis, summary, project order, project wording and repository URLs. `common.json` contains the contact information, technical skills, four experience entries (including confidential client work), education and credentials whose wording is shared by all three sources. `versions.js` assembles the complete document for each role; if a future source changes a shared section for only one role, override that section in its role JSON.

Line wrapping and PDF page-number footers are omitted in HTML. “Experience Continued” is a pagination heading; its content continues inside the Experience section. Preserve the source's statements and dates, including the certification marked “In progress”. Do not substitute project-page copy for CV wording.

The AI PDF's embedded text encoding corrupts several letter combinations during extraction (for example, “ti” and “ft”). Its browser transcription was checked against all three rendered PDF pages. Use visual review when updating it, and use the embedded PDF link annotations to verify repository URLs.

`sourceSha256` records which original file was reviewed. Update the relevant data and hash together when replacing a PDF. Do not run the legacy `cv:pdf` generation script to produce these downloads.

## Browser regression check

With the portfolio running locally, run:

```sh
PORTFOLIO_TEST_URL=http://127.0.0.1:5173 node scripts/verify-cv-browser.js
```

This checks the entire rendered document for each version, source-PDF hashes and actual downloaded bytes, all three layouts, query preservation and defaults, browser history, native keyboard selection, contact/repository link targets and selectable text. Screenshots and downloaded test files are written to a temporary directory.
