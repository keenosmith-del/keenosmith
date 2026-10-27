import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Layers3 } from "lucide-react";
import ProjectNavigation from "../shared/ProjectNavigation.jsx";
import ProjectModal from "../shared/ProjectModal.jsx";
import useProjectPage from "../shared/useProjectPage.js";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./CrewAIRevenueOps.css";

const repository = "https://github.com/keenosmith-del/crewai-revenueops";
const revision = "f7270742ec3c81dcd7532ebf222f2280f4e8e8b7";
const summary = "/documents/crewai-revenueops-executive-summary.pdf";
const source = (path) => `${repository}/blob/${revision}/${path}`;

const technologyGroups = [
  { heading: "Frontend", skills: ["React", "JavaScript", "Vite", "React Router", "CSS", "Native Fetch"] },
  { heading: "Backend", skills: ["Python", "FastAPI", "Pydantic", "SQLAlchemy", "Alembic", "REST APIs"] },
  { heading: "Financial data", skills: ["PostgreSQL", "Decimal accounting", "Transactional locking", "Idempotency", "Financial reconciliation"] },
  { heading: "AI and orchestration", note: "Local llama3.2:3b was evaluated through Ollama. Its investigation reliability remains limited.", skills: ["CrewAI", "Specialist agents", "Typed Flows", "BaseTool", "Structured outputs", "Evidence citations", "Ollama"] },
  { heading: "Security and reliability", skills: ["Authentication", "RBAC", "Organisation scoping", "Audit logging", "Job leases", "Fencing", "Checkpoints"] },
  { heading: "Testing and delivery", note: "Hosted CI verified in repository records. Staging automation is prepared; deployment has not been performed.", skills: ["Pytest", "Vitest", "Playwright", "Docker", "Docker Compose", "GitHub Actions", "CI/CD"] },
];

const journey = [
  { title: "Validated import", text: "Preview a CSV mapping, reject invalid rows and confirm the whole file atomically. Source identifiers and file fingerprints protect against reimport effects.", detail: "Invoices · Payments · Provenance" },
  { title: "Deterministic reconciliation", text: "Compare references, customer, currency and exact available amounts. Partial receipts, overpayments and explicit combined references become conservative proposals.", detail: "Decimal amounts · Explicit rules" },
  { title: "Exact proposal or exception", text: "An exact match can go straight to human review. Ambiguity, suspected duplicates, reversals and disputes remain explicit cases rather than forced matches.", detail: "Exact matches bypass inference" },
  { title: "Scoped evidence investigation", text: "When requested, a conditional CrewAI Flow reads only the case’s allowed evidence. Typed findings and exact citations must survive application validation.", detail: "Read-only tools · No posting authority" },
  { title: "Human review", text: "An authenticated reviewer can approve, reject or request information. Even deterministic proposals require a person’s decision; agent agreement is not approval.", detail: "Current records · Auditable decision" },
  { title: "Validated, atomic allocation", text: "Lock the records, recheck balances and disputes, then write allocations, review, audit and idempotency result together. Invalid approvals write no allocation.", detail: "One transaction · Immutable history" },
];

const specialists = [
  { title: "Reconciliation investigator", text: "Interprets ambiguous remittance references and identifies evidence for potential matches. It proposes an interpretation; it does not calculate authoritative balances.", context: "Ordinary ambiguous cases" },
  { title: "Billing and dispute analyst", text: "Examines contradictory records, open disputes and competing interpretations. The dispute path adds this specialist before quality review.", context: "Conflicts, duplicates and reversals" },
  { title: "Collections coordinator", text: "Prepares conservative follow-up recommendations and internal drafts for eligible overdue records. No tool can send a message.", context: "Separate collections path" },
  { title: "Quality reviewer", text: "Receives preceding task outputs as explicit context, challenges unsupported findings and checks whether the cited evidence supports the recommendation.", context: "Independent task in each crew" },
];

const controls = [
  { title: "Currency precision", text: "Decimal calculations enforce two places for ZAR, USD, EUR and GBP, zero for JPY and three for KWD. Unsupported precision and currencies are rejected; no FX conversion or implicit rounding is attempted." },
  { title: "Derived financial balances", text: "Invoice outstanding and payment available amounts are derived from original amounts minus immutable allocations. I avoid a second mutable balance that could disagree with history." },
  { title: "Organisation and customer scope", text: "Organisation-scoped access and reviewer permissions apply before a financial decision. A proposed invoice must belong to the verified customer and use the payment’s currency." },
  { title: "Locking and current-state validation", text: "Locks and fresh validation prevent a stale recommendation from exceeding an invoice balance, consuming an already allocated receipt or bypassing an open dispute. Suspected duplicates and reversals are blocked." },
  { title: "Idempotent review requests", text: "An idempotency key binds to the review payload. The allocation, human review, audit and stored response commit together; a changed request cannot reuse the same key." },
  { title: "Rejected decisions and allocation history", text: "A rejected recommendation can record the reviewer’s decision and case status, but writes no allocation. Neither a model failure nor a convincing explanation can grant posting authority." },
];

function EvidenceLink({ path, children }) {
  return <a className="revenueops-evidence-link" href={source(path)} target="_blank" rel="noopener noreferrer">{children}</a>;
}

function Section({ id, label, title, className, children }) {
  return (
    <section id={id} className={`revenueops-section ${className || ""}`} aria-labelledby={`${id}-title`}>
      <div className="revenueops-section-label">{label}</div>
      <div className="revenueops-section-copy">
        <h2 id={`${id}-title`}>{title}</h2>
        {children}
      </div>
    </section>
  );
}

export default function CrewAIRevenueOps() {
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
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!footerRef.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });

  return (
    <main ref={pageRef} className="project-case-study revenueops-project">
      <ProjectNavigation className="revenueops-back" />
      <article>
        <header className="revenueops-hero">
          <div className="revenueops-hero-inner">
            <div className="revenueops-hero-topline">
              <div className="revenueops-pill-list" aria-label="Core technologies">
                {["CrewAI", "Python", "FastAPI", "PostgreSQL", "React"].map(item => <span key={item}>{item}</span>)}
              </div>
              <time dateTime="2026-10">October 2026</time>
            </div>
            <h1>CrewAI RevenueOps<span className="revenueops-title-regular">Intelligence</span></h1>
            <div className="revenueops-hero-bottom">
              <div>
                <p className="revenueops-hero-description">I built a financial operations application with deterministic invoice and payment reconciliation, persistent review workflows and CrewAI-assisted exception investigation. FastAPI services own exact amounts and allocation rules; scoped agents interpret evidence, and authenticated reviewers authorise financial actions.</p>
                <p className="revenueops-hero-note">Locally implemented and verified with synthetic records. Public production deployment has not occurred.</p>
              </div>
              <div className="revenueops-hero-controls">
                <div className="revenueops-hero-actions revenueops-actions">
                  <a className="revenueops-button revenueops-button-dark" href={repository} target="_blank" rel="noopener noreferrer">
                    <img className="revenueops-github-icon" src={githubSvg} alt="" aria-hidden="true" />Source
                  </a>
                  <button className="revenueops-button revenueops-button-disabled" type="button" disabled>Visit platform</button>
                </div>
                <p className="revenueops-platform-note">Maintaining this many live deployments would be a project of its own. The source is available, or you can <a href="mailto:keenosmith@kailor.co.za">contact me</a> for a walkthrough.</p>
              </div>
            </div>
          </div>
        </header>

        <Section id="revenueops-problem" className="revenueops-problem" label="Project summary" title="Deterministic reconciliation with reviewed exception investigation.">
          <div className="revenueops-two-columns">
            <p>Partial receipts, combined invoices, ambiguous references, duplicates and disputes require more than amount matching. I implemented conservative reconciliation proposals and retained the evidence needed to review each case.</p>
            <p>PostgreSQL and Decimal application services own financial state. CrewAI can investigate unclear remittance information, but cannot calculate authoritative balances or post an allocation. Even an exact deterministic proposal requires human approval.</p>
          </div>
          <div className="revenueops-summary-action"><a className="revenueops-button revenueops-button-soft" href={summary} target="_blank" rel="noopener noreferrer">Executive summary</a></div>
        </Section>

        <Section id="revenueops-architecture" className="revenueops-architecture" label="System architecture" title="Application services, durable records and a separate agent runtime.">
          <p className="revenueops-section-intro">The operational console calls typed APIs. Financial writes remain in application services; a leased worker executes optional investigations without holding a database transaction open during inference.</p>
          <div className="revenueops-architecture-grid">
            <div><h3>React console</h3><p>Imports, customers, invoices, payments, reconciliation, investigations, reviews, reports, internal collections drafts and audit inspection use persisted records.</p></div>
            <div><h3>FastAPI services</h3><p>Authentication, organisation scoping, import validation, reconciliation and reviewer permissions are enforced independently of the browser.</p></div>
            <div><h3>PostgreSQL</h3><p>Financial records, immutable allocations, reviews, audit history, execution evidence, job leases and Flow checkpoints share one durable store.</p></div>
            <div><h3>Worker and CrewAI</h3><p>The worker claims a lease, snapshots allowed evidence and invokes a typed Flow. Validated findings return for human review; workers never post ledger allocations.</p></div>
          </div>
          <EvidenceLink path="docs/architecture/system.md">Architecture, sequence and data model</EvidenceLink>
        </Section>

        <Section id="revenueops-journey" className="revenueops-journey" label="Reconciliation workflow" title="Validated imports, proposals and allocation review.">
          <ol className="revenueops-journey-grid">
            {journey.map(stage => <li key={stage.title}><h3>{stage.title}</h3><p>{stage.text}</p></li>)}
          </ol>
          <p className="revenueops-section-intro">Exact matches can bypass inference. An exception can enter a requested, scoped investigation; both paths end at the same authenticated approval boundary. Suspected duplicates and reversals remain blocked rather than becoming automatic positive receipts.</p>
          <EvidenceLink path="backend/app/flows/reconciliation.py">Conditional Flow and deterministic bypass</EvidenceLink>
        </Section>

        <Section id="revenueops-controls" className="revenueops-controls" label="Financial reconciliation" title="Decimal amounts and transactional allocation controls.">
          <div className="revenueops-balance" aria-label="Derived balance invariants">
            <div><h3>Invoice outstanding</h3><p>Original amount − immutable allocations</p></div>
            <div><h3>Payment available</h3><p>Receipt amount − immutable allocations</p></div>
          </div>
          <div className="revenueops-control-grid">{controls.map(control => <div key={control.title}><h3>{control.title}</h3><p>{control.text}</p></div>)}</div>
          <EvidenceLink path="backend/app/services/workflows.py">Approval locking and allocation validation</EvidenceLink>
        </Section>

        <section className="revenueops-agents" aria-labelledby="revenueops-agents-title">
          <div className="revenueops-agents-inner">
            <p className="revenueops-eyebrow">Agent orchestration</p>
            <h2 id="revenueops-agents-title">Conditional crews and typed investigation Flows.</h2>
            <p className="revenueops-agents-intro">I composed four YAML-defined roles into bounded sequential crews. Earlier task outputs become explicit context for the next specialist; delegation outside the controlled composition is disabled.</p>
            <div className="revenueops-specialists">{specialists.map(role => <div key={role.title}><span>{role.context}</span><h3>{role.title}</h3><p>{role.text}</p></div>)}</div>
            <div className="revenueops-routing">
              <div><h3>Conditional execution</h3><ul><li>Exact match → deterministic human review.</li><li>Ambiguity → investigator → quality reviewer.</li><li>Conflict or dispute → investigator → analyst → quality reviewer.</li><li>Collections → coordinator → quality reviewer → internal draft.</li></ul></div>
              <div><h3>Output and tool contracts</h3><p>Typed CrewAI Flows, Pydantic findings and callable guardrails validate case identity, invoice allowlists and exact field/value citations. One scoped read-only <code>BaseTool</code> exposes permitted case evidence; no SQL, shell, arbitrary network or financial write tool is provided.</p></div>
            </div>
            <p className="revenueops-agents-footnote">Local Ollama inference uses CrewAI’s native OpenAI-compatible provider. Each agent is bounded to four iterations, one agent retry and a 180-second budget, with one guardrail retry. Application financial validation remains authoritative.</p>
            <EvidenceLink path="docs/agents/engineering.md">Crew composition, guardrails and provider boundaries</EvidenceLink>
          </div>
        </section>

        <Section id="revenueops-durability" className="revenueops-durability" label="Persistence and recovery" title="Leased jobs, ownership fencing and execution checkpoints.">
          <ol className="revenueops-recovery">
            <li><h3>Claim and fence</h3><p>PostgreSQL <code>FOR UPDATE SKIP LOCKED</code> claims jobs. A lease token and running-state checks reject writes from expired worker ownership.</p></li>
            <li><h3>Bound inference</h3><p>A 90-second lease is renewed every 10 seconds. A child process bounds runtime at 480 seconds; expired work has a three-attempt ceiling. Short sessions persist outcomes.</p></li>
            <li><h3>Resume saved results</h3><p>A validated result checkpoint avoids repeating completed inference. Interrupted work can repeat read-only calls; explicit failures are retained and workers never replay allocation actions.</p></li>
          </ol>
          <p className="revenueops-section-intro">Saved-result resume and stale-owner fencing are tested. Process supervision and provider edge cases need broader coverage; these checks do not establish high availability or scale certification.</p>
          <EvidenceLink path="backend/app/workers/runner.py">Leased execution and checkpoint writes</EvidenceLink>
        </Section>

        <Section id="revenueops-evaluation" className="revenueops-evaluation" label="Model evaluation" title="Deterministic regressions and local-model investigation results.">
          <div className="revenueops-regression"><h3>Deterministic financial regression: 13/13</h3><p>All labelled classifications and expected proposals passed in a small constructed synthetic set. This is regression evidence, not representative field accuracy.</p></div>
          <div className="revenueops-comparison">
            <table><caption>Iteration 010 exact decisions</caption><thead><tr><th scope="col">Evaluation set</th><th scope="col">CrewAI</th><th scope="col">Deterministic baseline</th></tr></thead><tbody><tr><th scope="row">Fixed cases</th><td>0/4</td><td>1/4</td></tr><tr><th scope="row">Sealed holdouts</th><td>1/7</td><td>4/7</td></tr></tbody></table>
            <p>Local <code>llama3.2:3b</code> via Ollama. One attempt per case, with failures retained. The sole exact holdout success was safe abstention on a foreign-currency case.</p>
          </div>
          <dl className="revenueops-evaluation-observations"><div><dt>Read-tool execution</dt><dd><strong>24/24</strong><p>Successful reads across all eleven model cases.</p></dd></div><div><dt>Typed-output failures</dt><dd><strong>9/11</strong><p>Nine cases failed structured validation; failures are not valid abstentions.</p></dd></div><div><dt>Agent ledger allocations</dt><dd><strong>0</strong><p>No agent allocation was written.</p></dd></div></dl>
          <div className="revenueops-evaluation-finding"><h3>Observed model limitations</h3><p>Clarified identifiers and a scoped snapshot improved tool reads, but all four fixed cases failed typed output before the first task completed. Fixed-case completion regressed from two of four to zero of four. Only one of six supported allocation pairs was recovered across both sets.</p><p>The local 3B model did not demonstrate improved investigation accuracy. Faster failure is not successful throughput, and incomplete historical usage prevents a token-efficiency comparison. Earlier failures remain part of the published evidence.</p></div>
          <EvidenceLink path="docs/testing/iteration-010/results.md">Full evaluation results and limitations</EvidenceLink>
        </Section>

        <Section id="revenueops-delivery" className="revenueops-delivery" label="CI/CD and verification" title="Full-stack application checks and prepared release gates.">
          <p className="revenueops-section-intro">React, typed FastAPI contracts, SQLAlchemy and Alembic implement the operational application around the agent layer. CSV imports, authenticated RBAC, organisation separation, reports and audit histories use real persisted workflows.</p>
          <div className="revenueops-release-receipt"><h3>Repository-recorded Iteration 010 verification</h3><dl><div><dt>Backend and release tests</dt><dd>100 passed</dd></div><div><dt>Frontend component tests</dt><dd>5 passed</dd></div><div><dt>Hosted browser workflows</dt><dd>5 passed</dd></div><div><dt>Required hosted CI jobs</dt><dd>5 passed</dd></div></dl><p>These outcomes are application-repository records, not application tests newly run by this portfolio.</p><a className="revenueops-evidence-link" href="https://github.com/keenosmith-del/crewai-revenueops/actions/runs/40372045437" target="_blank" rel="noopener noreferrer">Recorded Stage 3 CI</a></div>
          <div className="revenueops-release-details">
            <div><h3>Continuous integration</h3><p>Docker and Compose package the application. GitHub Actions checks PostgreSQL behavior, migrations, API contracts, frontend/build/browser workflows, dependencies, secrets and container builds. Mock inference contracts are separate from live evaluation.</p></div>
            <div><h3>Deployment boundary</h3><p>Manual staging automation checks successful source-commit CI, independent review, immutable images, revision labels, drift and recovery manifests. Staging and production deployment have not been performed. Four reviewed, expiring Chroma server advisories remain in an unused transitive path.</p></div>
          </div>
          <EvidenceLink path=".github/workflows/deploy-staging.yml">Prepared staging workflow</EvidenceLink>
        </Section>

        <Section id="revenueops-technology" className="revenueops-technology" label="Technology" title="Application, financial data and agent implementation.">
          <p className="revenueops-section-intro">The selected tools separate operational UI, typed services, exact financial state, bounded interpretation and repeatable verification.</p>
          <div className="revenueops-technology-grid">{technologyGroups.map(group => <div key={group.heading}><h3>{group.heading}</h3>{group.note && <p>{group.note}</p>}<div className="revenueops-tech-tags">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div></div>)}</div>
          <button className="revenueops-button revenueops-button-dark revenueops-tech-trigger" type="button" onClick={() => setShowStack(true)}><Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />Tech stack</button>
          <p className="revenueops-section-intro">CSV-only workflows; no banking integration, live payments, FX engine or external message sender is implemented.</p>
          <EvidenceLink path="docs/portfolio/handover.md">Implementation scope and remaining work</EvidenceLink>
        </Section>

        <section className="revenueops-closing"><div><p className="revenueops-eyebrow">Architecture and implementation</p><h2>Deterministic financial state and bounded CrewAI investigation.</h2><p>The application separates reconciliation, evidence interpretation, human review and allocation into explicit responsibilities. PostgreSQL and transactional services retain financial authority; persisted worker execution supports recoverable investigation. The local evaluation documents weak model performance, while staging automation remains prepared and unexecuted.</p></div></section>
      </article>
      <footer ref={footerRef} className="revenueops-footer"><Link className="revenueops-footer-back" to="/">Back to portfolio</Link><button className="revenueops-footer-top" type="button" aria-label="Back to top" onClick={scrollToTop}><ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" /></button></footer>
      {showTop && !footerVisible && <button className="revenueops-floating-top" type="button" aria-label="Back to top" onClick={scrollToTop}><ArrowUp size={17} strokeWidth={1.7} aria-hidden="true" /></button>}
      {showStack && <ProjectModal onClose={closeStack} groups={technologyGroups} />}
    </main>
  );
}
