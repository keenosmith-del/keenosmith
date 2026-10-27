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
  { title: "Amounts have a currency", text: "Decimal calculations enforce two places for ZAR, USD, EUR and GBP, zero for JPY and three for KWD. Unsupported precision and currencies are rejected; no FX conversion or implicit rounding is attempted." },
  { title: "History determines the balance", text: "Invoice outstanding and payment available amounts are derived from original amounts minus immutable allocations. I avoid a second mutable balance that could disagree with history." },
  { title: "Scope precedes interpretation", text: "Organisation-scoped access and reviewer permissions apply before a financial decision. A proposed invoice must belong to the verified customer and use the payment’s currency." },
  { title: "Approval uses the present", text: "Locks and fresh validation prevent a stale recommendation from exceeding an invoice balance, consuming an already allocated receipt or bypassing an open dispute. Suspected duplicates and reversals are blocked." },
  { title: "Repeating a request is not a second payment", text: "An idempotency key binds to the review payload. The allocation, human review, audit and stored response commit together; a changed request cannot reuse the same key." },
  { title: "Rejection leaves the ledger alone", text: "A rejected recommendation can record the reviewer’s decision and case status, but writes no allocation. Neither a model failure nor a convincing explanation can grant posting authority." },
];

function EvidenceLink({ path, children }) {
  return <a className="revenueops-evidence-link" href={source(path)} target="_blank" rel="noopener noreferrer">{children}</a>;
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
              <div className="revenueops-pills" aria-label="Core technologies">
                {["CrewAI", "Python", "FastAPI", "PostgreSQL", "React"].map(item => <span key={item}>{item}</span>)}
              </div>
              <time dateTime="2026-10">October 2026</time>
            </div>
            <h1><span>CrewAI RevenueOps</span>Intelligence<span className="revenueops-title-stop" aria-hidden="true">.</span></h1>
            <div className="revenueops-hero-bottom">
              <div>
                <p className="revenueops-hero-description">I engineered RevenueOps Intelligence to separate <strong>financial accuracy</strong> from model interpretation. Deterministic reconciliation, persistent evidence and human-controlled approvals form the core system. CrewAI investigates exceptions within defined boundaries, without authority to change financial records.</p>
                <p className="revenueops-hero-note">Full-stack application locally implemented and verified. Public production deployment has not occurred. All business records are synthetic.</p>
              </div>
              <div className="revenueops-authority-note">
                <span>Who owns the outcome?</span>
                <dl><div><dt>Financial state</dt><dd>Deterministic software</dd></div><div><dt>Interpretation</dt><dd>Scoped CrewAI crews</dd></div><div><dt>Financial decision</dt><dd>Human reviewer</dd></div></dl>
              </div>
            </div>
            <div className="revenueops-actions">
              <a className="revenueops-button revenueops-button-dark" href={repository} target="_blank" rel="noopener noreferrer"><img src={githubSvg} alt="" aria-hidden="true" />Source repository</a>
              <a className="revenueops-button revenueops-button-light" href={summary} target="_blank" rel="noopener noreferrer">Executive summary</a>
              <button className="revenueops-button" type="button" disabled>Visit platform</button>
            </div>
          </div>
        </header>

        <section className="revenueops-section revenueops-problem" aria-labelledby="revenueops-problem-title">
          <div>
            <p className="revenueops-eyebrow">The engineering problem</p>
            <h2 id="revenueops-problem-title">Financial operations need more than a plausible answer.</h2>
            <a className="revenueops-button revenueops-button-light" href={summary} target="_blank" rel="noopener noreferrer">Executive summary</a>
          </div>
          <div className="revenueops-problem-copy">
            <p>A payment reference rarely tells the whole story. One receipt may cover several invoices; another settles only part of a balance. A duplicate, reversal or unresolved dispute can make an apparently reasonable match unsafe.</p>
            <p>I wanted model-assisted investigation without making generated language the source of financial truth. A model can interpret a remittance note and present relevant evidence. It should not decide what money remains, override a dispute or change a ledger.</p>
            <p>My response was an explicit separation: <strong>deterministic software owns exact state</strong>, PostgreSQL retains durable records, CrewAI assists with interpretation and a human authorises every allocation. The boundary is enforced by the application, not entrusted to a prompt.</p>
          </div>
        </section>

        <section className="revenueops-section revenueops-journey" aria-labelledby="revenueops-journey-title">
          <div className="revenueops-section-heading">
            <p className="revenueops-eyebrow">The reconciliation journey</p>
            <h2 id="revenueops-journey-title">From an incoming payment to an accountable decision.</h2>
            <p>Most of the work belongs to ordinary software. Model inference is a conditional investigation step, not a toll every payment must pass through.</p>
          </div>
          <ol className="revenueops-journey-grid">
            {journey.map((stage, index) => <li key={stage.title}>
              <div className="revenueops-stage-heading"><h3>{stage.title}</h3>{index < journey.length - 1 && <span aria-hidden="true">→</span>}</div>
              <p>{stage.text}</p><span className="revenueops-stage-detail">{stage.detail}</span>
            </li>)}
          </ol>
          <aside className="revenueops-bypass"><strong>Two paths, one approval boundary.</strong><span>Exact proposal → Human review. Exception → Requested investigation → Validated findings → Human review. Neither path posts automatically.</span></aside>
          <EvidenceLink path="backend/app/flows/reconciliation.py">Inspect the conditional Flow</EvidenceLink>
        </section>

        <section className="revenueops-section revenueops-architecture" aria-labelledby="revenueops-architecture-title">
          <div className="revenueops-section-heading">
            <p className="revenueops-eyebrow">Architecture and responsibility</p>
            <h2 id="revenueops-architecture-title">One application.<br />Different responsibilities.</h2>
          </div>
          <div className="revenueops-system" aria-label="Application architecture and authority boundaries">
            <div className="revenueops-system-lane">
              <div className="revenueops-system-card"><span>Operate</span><h3>React operational console</h3><p>Imports, customers, invoices, payments, reconciliation, investigations, reviews, collections drafts, reports and audit inspection.</p></div>
              <span className="revenueops-system-connector" aria-hidden="true">↓</span>
              <div className="revenueops-system-card"><span>Validate</span><h3>FastAPI application services</h3><p>Typed contracts, authentication, organisation scoping, business rules and financial validation. The browser never supplies authoritative balances.</p></div>
            </div>
            <div className="revenueops-system-truth"><span>Persist</span><h3>PostgreSQL</h3><p>The source of truth for financial records and immutable allocations.</p><ul><li>Audit history and reviews</li><li>Durable execution evidence</li><li>Jobs, leases and checkpoints</li></ul><small>One durable store. No competing agent ledger.</small></div>
            <div className="revenueops-system-lane">
              <div className="revenueops-system-card"><span>Execute</span><h3>Leased worker</h3><p>Claims jobs, bounds execution and persists outcomes. Database transactions are released before model inference begins.</p></div>
              <span className="revenueops-system-connector" aria-hidden="true">↓</span>
              <div className="revenueops-system-card"><span>Interpret</span><h3>CrewAI</h3><p>Conditional sequential crews, typed Flows and scoped read-only tools return cited findings. They cannot allocate a payment.</p></div>
            </div>
            <div className="revenueops-system-approval"><div><span>Approve</span><h3>Human approval boundary</h3></div><p>An authenticated review request locks and revalidates the current records before the application atomically records an immutable allocation. A recommendation is never a committed action.</p></div>
          </div>
          <EvidenceLink path="docs/architecture/system.md">Architecture, sequence and data model</EvidenceLink>
        </section>

        <section className="revenueops-section revenueops-agents" aria-labelledby="revenueops-agents-title">
          <div className="revenueops-agent-heading">
            <p className="revenueops-eyebrow">Agent engineering</p>
            <h2 id="revenueops-agents-title">Four specialists.<br />No authority over the ledger.</h2>
            <p>I composed bounded, sequential crews with explicit task context. These are controlled roles, not unrestricted autonomous delegation.</p>
            <div className="revenueops-agent-limits"><span>4 iterations per agent</span><span>180s agent budget</span><span>1 guardrail retry</span></div>
          </div>
          <div className="revenueops-specialists">{specialists.map(role => <div key={role.title}><span>{role.context}</span><h3>{role.title}</h3><p>{role.text}</p></div>)}</div>
          <div className="revenueops-routing">
            <div><h3>Only the roles a case needs</h3><ul><li><strong>Exact match:</strong> bypass inference and retain human review.</li><li><strong>Ambiguous payment:</strong> investigator → quality reviewer.</li><li><strong>Conflict or dispute:</strong> investigator → analyst → quality reviewer.</li><li><strong>Collections:</strong> coordinator → quality reviewer → internal draft.</li></ul></div>
            <div><h3>A contract around every finding</h3><p>YAML defines roles and tasks; typed CrewAI Flows choose the path. Pydantic outputs and callable guardrails check case identity, allowlisted invoice IDs and exact field/value citations. The scoped <code>BaseTool</code> reads an organisation-bounded evidence snapshot; no SQL, shell, arbitrary network or write tool is exposed.</p><p>Local Ollama inference uses CrewAI’s native OpenAI-compatible provider. Application financial validation remains authoritative after the crew returns.</p></div>
          </div>
          <EvidenceLink path="docs/agents/engineering.md">Crew composition, guardrails and provider boundaries</EvidenceLink>
        </section>

        <section className="revenueops-controls" aria-labelledby="revenueops-controls-title">
          <div className="revenueops-controls-inner">
            <div className="revenueops-controls-heading"><p className="revenueops-eyebrow">Financial controls</p><h2 id="revenueops-controls-title">Financial truth stays<br />outside the model.</h2><p>The strongest boundary is an operation the agent cannot perform. I kept financial calculations, validation and allocation in deterministic application services.</p></div>
            <div className="revenueops-balance" aria-label="Derived balance invariants"><div><span>Invoice outstanding</span><p>Original amount <span>−</span> Allocations</p></div><div><span>Payment available</span><p>Receipt amount <span>−</span> Allocations</p></div></div>
            <div className="revenueops-control-grid">{controls.map(control => <div key={control.title}><h3>{control.title}</h3><p>{control.text}</p></div>)}</div>
            <EvidenceLink path="backend/app/services/workflows.py">Inspect approval locking and allocation validation</EvidenceLink>
          </div>
        </section>

        <section className="revenueops-section revenueops-durability" aria-labelledby="revenueops-durability-title">
          <div className="revenueops-section-heading"><p className="revenueops-eyebrow">Durability and failure recovery</p><h2 id="revenueops-durability-title">A failed model call should not corrupt the workflow.</h2><p>An investigation is recoverable read-only work. An allocation is a separate, committed financial action. I designed persistence around that distinction.</p></div>
          <ol className="revenueops-recovery">
            <li><span>Claim</span><h3>Own the lease, not the database transaction.</h3><p>PostgreSQL <code>FOR UPDATE SKIP LOCKED</code> claims avoid competing workers taking the same available job. A lease token fences expired ownership; writes check the current token and running state.</p></li>
            <li><span>Run</span><h3>Release the transaction before inference.</h3><p>Short sessions persist task, tool and Flow evidence. A 90-second lease is renewed every 10 seconds; a child process bounds total runtime at 480 seconds. Expired jobs have a three-attempt ceiling.</p></li>
            <li><span>Resume</span><h3>Keep the result that already completed.</h3><p>Checkpointed validated results resume without another provider request. Incomplete work may repeat read-only inference; failed calls remain explicit failures. Workers never post ledger allocations.</p></li>
          </ol>
          <div className="revenueops-recovery-note"><strong>Persistence is not a promise of perfect recovery.</strong><p>Saved-result resume and stale-owner fencing are tested. Worker process supervision and provider edge cases still need broader coverage. I do not treat those tests as high-availability or scale certification.</p></div>
          <EvidenceLink path="backend/app/workers/runner.py">Inspect leased execution and checkpoint writes</EvidenceLink>
        </section>

        <section className="revenueops-section revenueops-evaluation" aria-labelledby="revenueops-evaluation-title">
          <div className="revenueops-section-heading"><p className="revenueops-eyebrow">Evaluation · Iteration 010</p><h2 id="revenueops-evaluation-title">What the tests proved.<br />What the model did not.</h2><p>I kept deterministic regression evidence separate from actual local-model investigation. Failed outputs stay in the denominator; the results do not show CrewAI outperforming the baseline.</p></div>
          <div className="revenueops-evaluation-grid">
            <div className="revenueops-regression"><span>Deterministic financial regression</span><strong>13/13</strong><h3>Classifications and expected proposals passed.</h3><p>A small, labelled, constructed synthetic set. This checks expected financial behavior; it is not representative field accuracy.</p></div>
            <div className="revenueops-comparison"><table><caption>Exact decisions on ambiguous-payment evaluations</caption><thead><tr><th scope="col">Evaluation set</th><th scope="col">CrewAI</th><th scope="col">Deterministic baseline</th></tr></thead><tbody><tr><th scope="row">Fixed cases<span>Original four cases, retained unchanged</span></th><td>0/4</td><td>1/4</td></tr><tr><th scope="row">Sealed holdouts<span>Seven separate constructed cases</span></th><td>1/7</td><td>4/7</td></tr></tbody></table><p>Local <code>llama3.2:3b</code> via Ollama. One attempt per case; no selected retries or baseline substitution. The sole exact holdout success was safe abstention on a foreign-currency case.</p></div>
          </div>
          <dl className="revenueops-evaluation-observations"><div><dt>Read-tool execution</dt><dd><strong>24/24</strong><p>Successful reads across all eleven Iteration 010 model cases.</p></dd></div><div><dt>Typed-output failures</dt><dd><strong>9/11</strong><p>Nine cases failed structured output validation; a failed output is not a valid abstention.</p></dd></div><div><dt>Agent ledger allocations</dt><dd><strong>0</strong><p>No ledger allocation was written by the agent. Financial authority remained outside the crew.</p></dd></div></dl>
          <div className="revenueops-evaluation-finding"><h3>Better retrieval did not establish reliable interpretation.</h3><p>Earlier tool lookup failures led me to clarify record IDs, provide one scoped snapshot read and expose source provenance. Reads then succeeded, but every fixed case failed typed output before the first task completed. Fixed-case completion regressed from two of four to zero of four.</p><p>Only one of six supported allocation pairs was recovered across both sets. The current 3B configuration is <strong>not demonstrated to be reliable</strong> for harder reconciliation. Faster failure is not successful throughput; incomplete historical usage also prevents a token-efficiency claim. Earlier failures remain evidence, not results to hide.</p></div>
          <EvidenceLink path="docs/testing/iteration-010/results.md">Read the full results and limitations</EvidenceLink>
        </section>

        <section className="revenueops-section revenueops-delivery" aria-labelledby="revenueops-delivery-title">
          <div className="revenueops-delivery-heading"><p className="revenueops-eyebrow">Full-stack implementation</p><h2 id="revenueops-delivery-title">A complete application,<br />not an agent demonstration.</h2><p>I built the operational software around the crew: a connected React console, typed FastAPI services, PostgreSQL domain records and Alembic migrations. CSV previews and transactional imports preserve provenance; authentication, RBAC and organisation separation govern reviews.</p><p>Reports, audit history, customer timelines and internal collections drafts use the same persisted workflows. Responsive navigation, accessible form controls and loading, empty and error states support ordinary operational use.</p></div>
          <div className="revenueops-release-receipt"><span>Repository-recorded verification</span><h3>Iteration 010</h3><dl><div><dt>Backend and release tests</dt><dd>100 passed</dd></div><div><dt>Frontend component tests</dt><dd>5 passed</dd></div><div><dt>Hosted browser workflows</dt><dd>5 passed</dd></div><div><dt>Required hosted CI jobs</dt><dd>5 passed</dd></div></dl><p>These are outcomes recorded in the application repository, not tests newly executed by this portfolio page.</p><a className="revenueops-evidence-link" href="https://github.com/keenosmith-del/crewai-revenueops/actions/runs/40372045437" target="_blank" rel="noopener noreferrer">Recorded successful Stage 3 CI</a></div>
          <div className="revenueops-release-details">
            <div><h3>Build and verify</h3><p>Docker and Compose package the API, worker, web console and database. GitHub Actions checks backend and release behavior, migrations, API contracts, frontend tests/build, browser workflows, dependencies, secrets and container builds. Contract tests label mocked inference separately from live evaluation.</p></div>
            <div><h3>Prepare a controlled release</h3><p>The manual staging workflow checks an exact successful CI commit, independent approval and protected-environment expectations. Immutable image references and revision labels, deployment drift checks, recovery manifests and a reviewed prior image pair govern promotion and rollback.</p></div>
            <div><h3>Keep the limits visible</h3><p><strong>Staging and production deployment have not been performed.</strong> No registry publish or provisioning occurred. Four reviewed, expiring Chroma server advisories remain in an unused transitive dependency path; passing CI is not a zero-risk or production-readiness claim.</p></div>
          </div>
          <EvidenceLink path=".github/workflows/deploy-staging.yml">Inspect the prepared staging workflow</EvidenceLink>
        </section>

        <section className="revenueops-section revenueops-technology" aria-labelledby="revenueops-technology-title">
          <div className="revenueops-technology-heading"><div><p className="revenueops-eyebrow">Implementation stack</p><h2 id="revenueops-technology-title">Tools chosen for their responsibility.</h2></div><button className="revenueops-button revenueops-button-dark revenueops-tech-trigger" type="button" onClick={() => setShowStack(true)}><Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />Tech stack</button></div>
          <div className="revenueops-technology-grid">{technologyGroups.map(group => <div key={group.heading}><h3>{group.heading}</h3><div className="revenueops-pills">{group.skills.slice(0, 4).map(skill => <span key={skill}>{skill}</span>)}</div></div>)}</div>
          <p className="revenueops-scope-note">CSV-only financial workflows. No bank integration, live payments, FX engine, external message sender or public platform is claimed. The stack lists direct implementation choices, not CrewAI’s transitive dependencies.</p>
          <EvidenceLink path="docs/portfolio/handover.md">Reviewed implementation and remaining work</EvidenceLink>
        </section>

        <section className="revenueops-closing">
          <p className="revenueops-eyebrow">Engineering judgment</p>
          <h2>The ledger must be right,<br />even when the model is wrong.</h2>
          <p>This project changed what I wanted to prove. A crew that can read evidence is not necessarily a crew that can interpret it reliably. I built conventional software, persistent state and measured evaluation around a bounded model capability, with human authority at the point where money changes state. The useful result is an architecture that preserves financial controls while making the model’s limitations inspectable.</p>
        </section>
      </article>
      <footer ref={footerRef} className="revenueops-footer"><Link className="revenueops-footer-back" to="/">Back to portfolio</Link><button className="revenueops-footer-top" type="button" aria-label="Back to top" onClick={scrollToTop}><ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" /></button></footer>
      {showTop && !footerVisible && <button className="revenueops-floating-top" type="button" aria-label="Back to top" onClick={scrollToTop}><ArrowUp size={17} strokeWidth={1.7} aria-hidden="true" /></button>}
      {showStack && <ProjectModal onClose={closeStack} groups={technologyGroups} />}
    </main>
  );
}
