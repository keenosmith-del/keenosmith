# Implementation

Status: local implementation checked; remote CI and hosted policy verification pending task-branch push.

Inspected scripts directory/package commands, api/assistant export, server assistant/LLM modules, Assistant conversation/engine, EmailJS sendForm/contact modal and Vercel config. Existing tests cover much of the provider boundary; they are retained.

Added Portfolio verification GitHub Actions workflow: read-only repository permissions, pinned official checkout/setup-node commits (v7 tags resolved via GitHub API), Node 24, npm ci including dev tooling, matching Chromium install, existing lint/build/Assistant/Recruiter/refresh suites plus evidence/API/Explore/SEO checks. Browser orchestration owns a strict-port local production preview, clears model configuration, runs existing rendering/navigation/style/CV/Assistant/Recruiter/case-study/refresh/tile suites and new mocked contact/unknown-route checks. No deployment step, paid API or external-account credentials. Timeout/concurrency controls limit waste. Reference source/style hashes originate from the baseline, not from whatever code happens to be under test.

Contact sendForm now has a visible live error with direct email and retry, retains inputs on failure, prevents concurrent submissions through a ref, announces invalid fields/loading, traps modal focus, locks document scrolling and restores the trigger. Success/reset behavior retained. No provider/account settings changed. Domain allowlist/CAPTCHA/account abuse settings cannot be established from this repository; owner must verify EmailJS dashboard. The existing EmailJS public key is a browser identifier, not a private account key.

Assistant changes: invalid quota URL fails safely; factual career/education/credential/specific evidence answers stay deterministic; optional analytical context uses retrieved projects/credentials/topic skills. A mocked equivalent request shrank from 93,301 to 38,026 bytes (evidence/assistant-context.json). Returned project IDs must come from retrieval. Unsupported award/scale prose is rejected. This is a bounded guard, not a claim of perfect semantic validation for all generated prose. Mode-only response header improves diagnosis without logging prompts or job descriptions. Existing body/history/provider bounds and timeout remain.

Added API adversarial tests (stream/malformed input, content type/origin, excessive body/history, invalid quota config, mocked timeout, repeated fallback, unsafe output). No live provider called.

Added understated cream/charcoal NotFound with existing pill classes and portfolio/Explore recovery. Direct unknown navigation/refresh return local 404 with noindex.

Security response headers: CSP allows same-origin resources, local media, data/blob images and EmailJS connect only; existing React inline styles remain permitted. No external script, object or frame embedding; restrictive permissions and referrer/type/frame headers. Vite preview mirrors these headers for verification. Reported policy compatibility is limited to executed browser scope.

Dependency audit initially reported 6 high-severity affected packages (Vite development tooling and Puppeteer/transitives). Compatible updates resolved all current advisories: Vite 8.3.5 and Puppeteer 25.16.0 with updated lockfile/transitives. Puppeteer moved to devDependencies. Post-update npm audit: 0 vulnerabilities across locked graph. Matching Chrome 156 installed for local browser tests. This is task-date audit evidence, not a permanent security guarantee.

Legacy Assistant browser assertions were stale relative to unchanged baseline UI (title, attribution, removed icon, role section). Updated those expectations to current accepted presentation; source still exercises behavior. URL now respects PORTFOLIO_TEST_URL and mascot assertion supports production hashed/WebP assets.
