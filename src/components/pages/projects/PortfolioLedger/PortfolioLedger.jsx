import ProjectNavigation from "../shared/ProjectNavigation.jsx";
import useProjectPage from "../shared/useProjectPage.js";
import ProjectModal from "../shared/ProjectModal.jsx";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Layers3 } from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./PortfolioLedger.css";

const repository = "https://github.com/keenosmith-del/portfolio-ledger";
const groups = [
  { heading: "Frontend", skills: ["React 19", "TypeScript", "Vite", "Lucide React", "Fetch API"] },
  { heading: "Backend", skills: ["Python 3.12", "FastAPI", "Pydantic v2", "Uvicorn", "REST APIs", "python-multipart"] },
  { heading: "Persistence and domain", skills: ["PostgreSQL 16", "SQLAlchemy 2", "psycopg 3", "Alembic", "Decimal", "NUMERIC(18,2)", "Advisory locks", "SKIP LOCKED", "Idempotency", "Append-only evidence"] },
  { heading: "Ingestion and reliability", skills: ["Provider adapters", "Source registry", "Checksums", "Row quarantine", "FOR UPDATE SKIP LOCKED", "Leased jobs", "Bounded retries", "Crash recovery"] },
  { heading: "Security", skills: ["Argon2id", "Opaque cookie sessions", "CSRF protection", "Portfolio grants", "Role-based access", "Database runtime grants", "Rate limiting", "Safe CSV exports"] },
  { heading: "Hosting and operations", skills: ["Railway", "Neon PostgreSQL", "Nginx", "Docker", "Docker Compose", "Verified database TLS", "Readiness checks", "Backup and restore"] },
  { heading: "Testing and delivery", skills: ["GitHub Actions", "pytest", "pytest-cov", "HTTPX", "Ruff", "mypy", "Playwright", "axe-core", "Prettier", "pip-audit", "npm audit"] },
];
const evidencePaths = {
  "Project summary": "docs/domain-rules.md",
  "Ingestion engineering": "backend/app/services/ingestion.py",
  "Financial model": "docs/architecture.md",
  "Reconciliation and billing": "backend/app/services/finance.py",
  "Access and deployment": "docs/iterations/007-railway-neon-deployment.md",
  "Verification": "docs/validation.md",
};
const evidenceLabels = {
  "Project summary": "Domain rules and provider mapping",
  "Ingestion engineering": "Import processing and recovery implementation",
  "Financial model": "Schema, transactions and financial boundaries",
  "Reconciliation and billing": "Reconciliation and preview implementation",
  "Access and deployment": "Dated hosted release and operational limits",
  "Verification": "Validation history and measured observations",
};
function EvidenceLink({ path, children }) {
  return <a className="pl-evidence-link" href={`${repository}/blob/main/${path}`} target="_blank" rel="noopener noreferrer">{children}</a>;
}
function Architecture() {
  return (
<section className="pl-architecture">
        <div className="pl-architecture-inner"><p className="pl-eyebrow">System architecture</p><h2>A shared database. Separate request and import processes.</h2>
          <p className="pl-intro-copy">The React 19 / TypeScript / Vite workspace calls a Python 3.12 FastAPI application with Pydantic v2 request validation. Synchronous SQLAlchemy 2 and psycopg 3 persist operational facts in PostgreSQL 16; Alembic owns schema evolution. The API and durable import worker run independently.</p>
          <div className="pl-system" role="img" aria-label="React workspace calls FastAPI. FastAPI and a separate import worker both read and write PostgreSQL. The API creates receipts; the worker claims and atomically publishes imports.">
            <div className="pl-system-node"><strong>React workspace</strong><span>Same-origin session + CSRF</span></div><span className="pl-system-arrow" aria-hidden="true">↔</span><div className="pl-system-node"><strong>FastAPI</strong><span>Receipts, access, finance queries</span></div><span className="pl-system-arrow" aria-hidden="true">↔</span><div className="pl-system-node pl-system-database"><strong>PostgreSQL</strong><span>Evidence, jobs, ledger, snapshots</span></div>
            <div className="pl-system-worker"><span aria-hidden="true">↕</span><div className="pl-system-node"><strong>Durable import worker</strong><span>Claim → normalize → publish</span></div></div>
          </div>
          <p className="pl-architecture-note">CSV and JSON uploads enter through the API. The worker reads persisted artifacts rather than depending on an in-memory request task. Reconciliation and previews read completed, cutoff-scoped financial evidence.</p>
          <EvidenceLink path="docs/architecture.md">Architecture and relational model</EvidenceLink>
        </div>
      </section>
  );
}
const sections = [
  { label: "Project summary", title: "Different landlord feeds. One traceable financial record.", intro: "Property operations become difficult to verify when lease terms, charges, receipts and corrections arrive in incompatible formats. I built PortfolioLedger to retain the original evidence, normalize those differences and make each financial outcome reproducible.", cards: [
    ["Two provider formats", "AtlasPM CSV snapshots and MeridianRent JSON events are fictional inputs with deliberately different field names and revision rules. Adapters translate both into a shared lease and financial model; they are not connections to real property-management providers."],
    ["An operational workspace", "Six connected views cover overview, integrations, leases and ledger, reconciliation, billing previews and audit. Source inspection ties displayed records back to import receipts and sanitized provider rows."],
  ] },
  { label: "Ingestion engineering", title: "Accept valid records. Keep rejected rows inspectable.", intro: "Uploads create durable receipts and bounded, sanitized artifacts before a separate PostgreSQL-backed worker processes them. Container-level schema failures reject the upload; row-level validation failures are quarantined while valid records are retained.", cards: [
    ["Replay without duplicate effects", "Stable source identity, content hashes and revision checks distinguish a genuine correction from a duplicate. Reusing an idempotency key with changed content returns a conflict. Enabled source registry entries prevent callers inventing a second namespace for the same upstream account."],
    ["Recovery across worker restarts", "Workers claim jobs with FOR UPDATE SKIP LOCKED, processing leases and bounded retries. An attempt publishes its accepted rows and quarantine outcomes atomically. A failed transaction rolls back, allowing a later attempt to recover without partial financial effects."],
  ] },
  { label: "Financial model", title: "Corrections add history instead of rewriting it.", intro: "Python Decimal and PostgreSQL NUMERIC(18,2) calculate ZAR amounts with explicit rounding. Charges increase receivables; receipts and credits reduce them. JavaScript formats amounts for display and does not calculate business results.", cards: [
    ["Reversal and replacement", "A higher source revision appends a reversal of the prior posting and a replacement with its own amount and effective date. Database triggers protect posted evidence from updates and deletion; lineage links the correction to its source."],
    ["Scoped relational integrity", "Composite foreign keys enforce portfolio ownership across sources, jobs, leases and financial records. Portfolio finance locks serialize imports and snapshot calculations. Alembic evolves the schema through additive migrations."],
  ] },
  { label: "Reconciliation and billing", title: "A result belongs to a month, a cutoff and a rule version.", intro: "Reconciliation compares rent expected from leases active at month start with net source charges and reversals. Persisted exceptions retain expected and actual values, source identifiers and the publication cutoff used to reach the result. Partial receipts leave a positive receivable; an unpaid balance is not automatically a source discrepancy.", cards: [
    ["Review does not post money", "An analyst can review an exception and record a rationale. That decision is audited, but it cannot manufacture a ledger correction. Financial changes must arrive as explicit source revisions or adjustment events."],
    ["Immutable fee previews", "Administration-fee previews preserve the pricing version, eligible and excluded leases, line totals and cutoff. Repeating identical coordinates returns the stored preview. The synthetic v1 rule charges ZAR 85 per lease active on the first calendar date, with inclusive end dates and no proration; safe CSV exports expose the calculation."],
  ] },
  { label: "Access and deployment", title: "A public reviewer can inspect evidence without changing it.", intro: "The repository records a deployed Railway web service, private FastAPI service and separate worker backed by Neon PostgreSQL. Nginx keeps browser traffic on one origin; the API and worker use separate non-owner database roles and verified-client TLS.", cards: [
    ["Session and portfolio boundaries", "Argon2id protects passwords. Random opaque sessions are stored hashed and delivered in HttpOnly, SameSite cookies. CSRF tokens, origin checks, explicit portfolio grants and database-backed rate windows protect authenticated operations."],
    ["Synthetic read-only demonstration", "Password-free reviewer access is restricted to seeded synthetic portfolios. Hosted public mode blocks business writes, including upload, replay, reconciliation, review changes and new previews. Existing evidence, previews, CSV and audit remain inspectable."],
    ["Explicit release operations", "Migrations, synthetic seeding and runtime grants run as a separate release operation. Readiness checks inspect migration heads and runtime privileges. Repository evidence records restart persistence, worker recovery and an isolated Neon restore drill."],
    ["Operational limits", "The deployment uses trial/free resources and records a six-hour Neon history window. Availability is probed every 15 minutes; email-inbox alert delivery was not inspected. No real customer usage, payment execution, invoice issuance or insurance decisions are claimed. This is an independent demonstration of property-finance engineering."],
  ] },
  { label: "Verification", title: "Import, replay and compare the stored result.", intro: "The repository includes PostgreSQL migration and invariant tests, API tests, real browser journeys, accessibility checks and CI dependency audits. These are recorded project results; this portfolio update does not rerun the separate application's test suite.", cards: [
    ["10,000-event acceptance", "Hosted CI evidence records 10,000 financial events imported in 87.758 seconds and replayed in 55.098 seconds. Replay retained exactly 10,000 ledger entries and an unchanged ZAR 18,750,000 total. This is a controlled synthetic test, not a production throughput claim."],
    ["Hosted release evidence", "The November 11 release record reports all three Railway services successful, passing code CI, 46 PostgreSQL tests at the final local checkpoint, two final hosted browser checks, five denied public writes and exact restart persistence. These counts describe separate verification checkpoints. Historical local and hosted measurements remain separately documented."],
  ] },
];

export default function PortfolioLedger() {
  const pageRef = useProjectPage();
  const footerRef = useRef(null);
  const [showStack, setShowStack] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const closeStack = useCallback(() => setShowStack(false), []);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: 0.15 });
    if (footerRef.current) observer.observe(footerRef.current);
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return <main ref={pageRef} className="project-case-study portfolioledger-project">
    <ProjectNavigation className="pl-back" />
    <article>
      <header className="pl-hero"><div className="pl-hero-inner">
        <div className="pl-hero-topline"><div className="pl-pill-list" aria-label="Core technologies">{["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "React", "TypeScript"].map(t => <span key={t}>{t}</span>)}</div><time dateTime="2026-11">November 2026</time></div>
        <h1>Portfolio<span>Ledger</span></h1>
        <div className="pl-hero-bottom">
          <p className="pl-hero-description">I built a property-finance operations platform that brings incompatible landlord feeds into an append-only rental ledger, keeps corrections and source evidence intact, reconciles discrepancies and produces reproducible monthly administration-fee previews.</p>
          <p className="pl-hero-note">Independent engineering project · Synthetic data · Deployed read-only demonstration</p>
          <div className="pl-hero-actions"><a className="pl-button pl-button-dark" href={repository} target="_blank" rel="noopener noreferrer"><img src={githubSvg} className="pl-github-icon" alt="" aria-hidden="true" />Source</a><a className="pl-button pl-button-light" href="https://web-production-6a3f45e7.up.railway.app/" target="_blank" rel="noopener noreferrer">Visit platform</a></div>
          <p className="pl-platform-note">Choose “Explore read-only demo” on sign-in. November 2026 contains the anchored review scenarios.</p>
        </div>
      </div></header>
      {sections.map(section => <Fragment key={section.label}><section className={`pl-section pl-section-${section.label.toLowerCase().split(" ")[0]}`} key={section.label}>
        <div className="pl-section-label">{section.label}</div>
        <div className="pl-section-copy">
          <h2>{section.title}</h2><p className="pl-intro-copy">{section.intro}</p>
          {section.label === "Project summary" && <div className="pl-summary-action"><a className="pl-button pl-button-brief" href="/documents/portfolio-ledger-technical-brief.pdf" target="_blank" rel="noopener noreferrer">Technical brief</a></div>}
          {section.label === "Ingestion engineering" && <ol className="pl-pipeline" aria-label="Import processing sequence">{["Configured source", "Upload receipt", "Leased worker", "Validate rows", "Atomic publication"].map(stage => <li key={stage}>{stage}</li>)}</ol>}
          {section.label === "Financial model" && <dl className="pl-invariants"><div><dt>Calculation</dt><dd>Decimal / NUMERIC(18,2)</dd></div><div><dt>Correction</dt><dd>Original + reversal + replacement</dd></div><div><dt>Review</dt><dd>Audit transition; no posting</dd></div></dl>}
          {section.label === "Verification" && <>
            <dl className="pl-metrics"><div><dt>Financial events tested</dt><dd>10,000</dd></div><div><dt>Postings after replay</dt><dd>10,000</dd></div><div><dt>Synthetic total retained</dt><dd>ZAR 18,750,000.00</dd></div></dl>
            <table className="pl-observations"><caption>One isolated Linux hosted-CI acceptance run</caption><thead><tr><th scope="col">Observation</th><th scope="col">Initial import</th><th scope="col">Replay</th></tr></thead><tbody><tr><th scope="row">Accepted records</th><td>10,002</td><td>0</td></tr><tr><th scope="row">Duplicate records</th><td>0</td><td>10,002</td></tr><tr><th scope="row">Quarantined rows</th><td>2</td><td>2</td></tr><tr><th scope="row">Elapsed time</th><td>87.758s</td><td>55.098s</td></tr></tbody></table>
            <p className="pl-evidence-note">The fixture contains 10,000 financial events, two lease rows and two intentionally invalid rows. These are controlled observations, not a production SLO or evidence of a speed improvement.</p>
          </>}
          <div className={section.label === "Project summary" ? "pl-two-columns" : "pl-detail-grid"}>{section.cards.map(([title, copy]) => <div key={title}><h3>{title}</h3><p>{copy}</p></div>)}</div>
          <EvidenceLink path={evidencePaths[section.label]}>{evidenceLabels[section.label]}</EvidenceLink>
          {section.label === "Verification" && <div className="pl-evidence-list"><EvidenceLink path="docs/evidence/acceptance-hosted.json">Acceptance receipt</EvidenceLink><EvidenceLink path="docs/evidence/railway-release-verification.json">Hosted release receipt</EvidenceLink><a className="pl-evidence-link" href={`${repository}/actions/runs/43078985342`} target="_blank" rel="noopener noreferrer">Recorded release CI</a></div>}
          {section.label === "Access and deployment" && <div className="pl-evidence-list"><EvidenceLink path="docs/security.md">Security boundaries</EvidenceLink><EvidenceLink path="docs/deployment.md">Release configuration</EvidenceLink></div>}
        </div>
      </section>{section.label === "Project summary" && <Architecture />}</Fragment>)}
      <section className="pl-section"><div className="pl-section-label">Technology</div><div className="pl-section-copy"><h2>A modular backend with a separate durable worker.</h2><p className="pl-intro-copy">React and TypeScript handle the workspace. FastAPI owns typed HTTP contracts and access checks; synchronous SQLAlchemy and psycopg connect domain services to PostgreSQL. Financial rules, provider adapters and job execution have explicit boundaries. Railway hosts the services, with Neon retaining the shared operational state.</p><div className="pl-technology-grid">{groups.slice(0, 4).map(g => <div key={g.heading}><h3>{g.heading}</h3><div className="pl-tech-tags">{g.skills.slice(0, 5).map(s => <span key={s}>{s}</span>)}</div></div>)}</div><button className="pl-button pl-button-dark pl-tech-trigger" type="button" onClick={() => setShowStack(true)}><Layers3 size={15} aria-hidden="true" />Tech stack</button></div></section>
      <section className="pl-closing"><div><p className="pl-eyebrow">Engineering scope</p><h2>Financial operations with an inspectable history.</h2><p>PortfolioLedger brings source normalization, durable ingestion, append-only financial records and repeatable calculations into one full-stack application. Every correction retains its lineage, every review records its actor and every preview preserves the inputs that produced it.</p></div></section>
    </article>
    <footer ref={footerRef} className="pl-footer"><Link className="pl-footer-back" to="/">Back to portfolio</Link><button className="pl-footer-top" type="button" aria-label="Back to top" onClick={scrollToTop}><ArrowUp size={16} aria-hidden="true" /></button></footer>
    {showTop && !footerVisible && <button className="pl-floating-top" type="button" aria-label="Back to top" onClick={scrollToTop}><ArrowUp size={17} aria-hidden="true" /></button>}
    {showStack && <ProjectModal onClose={closeStack} groups={groups} />}
  </main>;
}
