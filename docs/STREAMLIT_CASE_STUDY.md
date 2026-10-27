# Low-Code Streamlit EventOps case study — 27 October 2026

## Source and reference review

Remote main verified with `git ls-remote`: `084bd04336f2a92672c6b4285527ed0591582ec3`. The clean local application checkout is at `a1dab9d8942a5fad27e71fb828bd5da274f5a382`; GitHub's commit comparison reports one merge commit ahead and **no changed files**. The local source therefore matches the reviewed main tree. No application-repository mutation is needed or authorised.

Read README, architecture/design/comparison/compliance docs, Iteration 002 acceptance/tests and Iteration 003 readiness/tests/security/deployment architecture/runbook. Inspected app.py, semantic index/query planner/evaluation, deterministic pipeline, SQLAlchemy persistence and lifecycle, agent contracts/tool validation, actual workflow JSON, deployment definitions/scripts and quality CI. Verified 31 verification nodes, 11 agent nodes and three read-only tools in source.

Repository-recorded results: 147 regressions on macOS and disposable Linux ARM64; 19×384 FastEmbed vectors, 30/30 behavioral cases, 25 ranked cases, Recall@5/MRR 1.0; actual main n8n scenario produces eight records (3 verified, 2 review, 2 rejected, 1 incomplete), with two duplicate inputs merged. Verified outputs include two event observations and one participant. Successful Python/container CI at release implementation `4f926f46d3d19421354e67b7f70a0b798ce99840`: https://github.com/keenosmith-del/eventops-intelligence-streamlit/actions/runs/39552175515.

Boundaries retained: controlled synthetic Calendar/Web HTTP versus actual read-only Mailtrap; holiday observations are not registrations. Iteration 002 includes actual Gemini tools and an invalid shortened citation rejection before a focused accepted run. Gemini stayed disabled in Iteration 003 pending billing/free-tier confirmation. Release real-browser acceptance was blocked by ERR_BLOCKED_BY_CLIENT; AppTest is not a replacement browser pass. No public hosting, provisioned provider infrastructure, hosted database acceptance, durable queue or automatic distributed recovery is claimed.

Re-inspected actual AWS/Microsoft JSX/CSS and shared navigation/modal/page utilities, original EventOps, corrected CrewAI/AssessFlow, App/Explore/evidence/artwork. Use the exact reference common controls and editorial geometry, with a distinct knowledge/orchestration/verification composition inside technical sections. Keep the original EventOps untouched.

## Supplied executive summary

`public/documents/eventops-streamlit-executive-summary.pdf` is present. SHA-256: `5136863ffa695d9124a45670f3e6ed2bd4f5ea3f5d1487d9db73d5b5d0269e19`. Link the supplied document unchanged from the overview.

## Implementation and verification

To be completed after executing the portfolio checks and visual comparison. Protected existing source/PDF hashes are recorded in `/tmp/streamlit-case-study-qa/protected-files.json`; authorised source integration paths are excluded.
