import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Layers3 } from "lucide-react";
import ProjectNavigation from "../shared/ProjectNavigation.jsx";
import ProjectModal from "../shared/ProjectModal.jsx";
import useProjectPage from "../shared/useProjectPage.js";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./EventOpsStreamlit.css";

const repository = "https://github.com/keenosmith-del/eventops-intelligence-streamlit";
const revision = "084bd04336f2a92672c6b4285527ed0591582ec3";
const executiveSummary = "/documents/eventops-streamlit-executive-summary.pdf";
const source = path => `${repository}/blob/${revision}/${path}`;

const technologyGroups = [
  { heading: "Interface", skills: ["Streamlit", "Python", "Pandas", "Native forms and tables", "CSV downloads"] },
  { heading: "Retrieval and AI", note: "Actual local embeddings. Historical Iteration 002 Gemini calls are separate from Iteration 003, where generation stayed disabled.", skills: ["FastEmbed", "NumPy", "BAAI/bge-small-en-v1.5", "384-dimensional embeddings", "Semantic RAG", "Gemini", "Structured responses", "Evidence citation validation"] },
  { heading: "Workflow and processing", skills: ["n8n", "Webhooks", "FastAPI", "Pydantic", "HTTPX", "HTTP APIs", "Deterministic parsing", "CSV", "iCalendar", "Source checkpoints", "Idempotency"] },
  { heading: "Data and persistence", note: "SQLite supports local development. PostgreSQL 17 and archive restoration were exercised in isolated release preparation; hosted storage remains unprovisioned.", skills: ["SQLAlchemy", "SQLite", "PostgreSQL", "Additive schema migrations", "Compare-and-swap revisions", "Stored workflow evidence"] },
  { heading: "Testing and operations", note: "Protected container topology and local rehearsal are verified in source records. No public deployment or new release-browser acceptance is claimed.", skills: ["Pytest", "Streamlit AppTest", "Ruff", "Docker", "Docker Compose", "GitHub Actions", "Caddy", "Deployment preflight", "Backup and restore"] },
];

const workflowStages = [
  ["Reserve and replay", "An authenticated webhook binds request ID, owner, event, scenario and limits. A repeated request returns its saved running or final state instead of processing sources again."],
  ["Configure and read sources", "Backend-owned configuration selects independent Calendar, Email and Web reads. Operators cannot supply arbitrary network targets."],
  ["Extract and checkpoint", "Each source has separate read/parsing outcomes. Python extracts bounded fields; n8n persists source checkpoints with the actual execution identity."],
  ["Aggregate and normalize", "The graph aggregates observations, normalizes fields and invokes duplicate/conflict handling without discarding raw evidence or provenance."],
  ["Verify and branch", "Deterministic Python checks compare claims with event and directory records. The graph branches on discrepancies and preserves the review queue."],
  ["Persist and respond", "Guarded finalization stores the classified records and source outcomes. A stage or finalization failure leaves explicit uncertainty rather than fabricated completion."],
];

const tools = [
  ["reference_lookup", "Search the permitted authoritative reference snapshot with bounded inputs."],
  ["inspect_findings", "Read the selected run’s persisted deterministic findings and conflicts."],
  ["inspect_evidence", "Inspect raw source evidence already included in that permitted run."],
];

function EvidenceLink({ path, children }) {
  return <a className="eventops-streamlit-evidence-link" href={source(path)} target="_blank" rel="noopener noreferrer">{children}</a>;
}

function Section({ id, label, title, className, children }) {
  return (
    <section id={id} className={`eventops-streamlit-section ${className || ""}`} aria-labelledby={`${id}-title`}>
      <div className="eventops-streamlit-section-label">{label}</div>
      <div className="eventops-streamlit-section-copy"><h2 id={`${id}-title`}>{title}</h2>{children}</div>
    </section>
  );
}

export default function EventOpsStreamlit() {
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
    <main ref={pageRef} className="project-case-study eventops-streamlit-project">
      <ProjectNavigation className="eventops-streamlit-back" />
      <article>
        <header className="eventops-streamlit-hero">
          <div className="eventops-streamlit-hero-inner">
            <div className="eventops-streamlit-hero-topline">
              <div className="eventops-streamlit-pill-list" aria-label="Core technologies">{["Streamlit", "Python", "n8n", "FastEmbed", "Gemini", "PostgreSQL"].map(item => <span key={item}>{item}</span>)}</div>
              <time dateTime="2026-10">October 2026</time>
            </div>
            <h1>Low-Code Streamlit<span>EventOps</span></h1>
            <div className="eventops-streamlit-hero-bottom">
              <div>
                <p className="eventops-streamlit-hero-description">I built an independent Streamlit implementation of EventOps Intelligence to compare Python-native interface delivery and n8n orchestration with a custom full-stack application. FastEmbed retrieval and bounded Gemini investigation support the workflow, while testable Python rules retain event verification authority and persistent evidence.</p>
                <p className="eventops-streamlit-hero-note">Locally implemented and verified. Public deployment has not been performed; Gemini was disabled during the latest release rehearsal.</p>
              </div>
              <div className="eventops-streamlit-hero-controls">
                <div className="eventops-streamlit-hero-actions">
                  <a className="eventops-streamlit-button eventops-streamlit-button-dark" href={repository} target="_blank" rel="noopener noreferrer"><img className="eventops-streamlit-github-icon" src={githubSvg} alt="" aria-hidden="true" />Source</a>
                  <button className="eventops-streamlit-button eventops-streamlit-button-disabled" type="button" disabled>Visit platform</button>
                </div>
                <p className="eventops-streamlit-platform-note">Maintaining this many live deployments would be a project of its own. The source is available, or you can <a href="mailto:keenosmith@kailor.co.za">contact me</a> for a walkthrough.</p>
              </div>
            </div>
          </div>
        </header>

        <Section id="streamlit-overview" className="eventops-streamlit-overview" label="Project overview" title="Low-code delivery with independently tested rules.">
          <div className="eventops-streamlit-two-columns"><p>I wanted to compare a native Python internal tool with the original React/FastAPI application. Streamlit reduces bespoke frontend code; n8n makes source connections, branching and workflow execution inspectable. This companion runs independently of the original system.</p><p>I kept parsing and verification in reusable Python stages, with provenance, persisted history and review controls. Low-code changes how interfaces and workflows are assembled; it does not remove responsibility for correctness, security, recovery or deployment.</p></div>
          <div className="eventops-streamlit-summary-action"><a className="eventops-streamlit-button eventops-streamlit-button-soft" href={executiveSummary} target="_blank" rel="noopener noreferrer">Executive summary</a></div>
        </Section>

        <Section id="streamlit-architecture" className="eventops-streamlit-architecture" label="System architecture" title="A Python interface connected to independently executed workflows.">
          <figure className="eventops-streamlit-architecture-map">
            <div className="eventops-streamlit-architecture-lanes">
              <div><span>Interaction</span><h3>Streamlit application</h3><p>Questions, scenario selection, run initiation, source/result inspection, reviewer annotations, history and CSV downloads use native Python forms and tables.</p><p>The interface starts work and displays persisted evidence; it does not fabricate workflow stages or verification outcomes.</p></div>
              <div><span>Knowledge and interpretation</span><h3>FastEmbed, NumPy and Gemini</h3><p>A local semantic index ranks structured knowledge. Optional Gemini RAG explains retrieved context; a separate n8n Gemini agent can investigate one permitted run.</p><p>Generation and agent execution are explicitly gated and remain separate from deterministic verification.</p></div>
            </div>
            <p className="eventops-streamlit-data-path">Streamlit → private n8n webhook → Python stage APIs → persisted evidence</p>
            <div className="eventops-streamlit-runtime-boundaries"><div><h3>n8n orchestration</h3><p>Actual source reads, execution stages, branching and checkpoints run in the published graph, with independent container/runtime state.</p></div><div><h3>Python processing</h3><p>Protected FastAPI/Pydantic endpoints expose extraction, normalization, duplicate handling and authoritative reference checks.</p></div><div><h3>SQLAlchemy persistence</h3><p>Owner-scoped snapshots, revisions, workflow state, reviews and investigation claims support SQLite development and isolated PostgreSQL operation.</p></div></div>
            <figcaption>Container boundaries separate the interface, processor, n8n, external runner, controlled source and gateway. A visual workflow does not replace the Python rules.</figcaption>
          </figure>
          <EvidenceLink path="docs/ARCHITECTURE.md">Architecture and authority boundaries</EvidenceLink>
        </Section>

        <Section id="streamlit-retrieval" className="eventops-streamlit-retrieval" label="Semantic retrieval" title="A fingerprinted index of structured event knowledge.">
          <p className="eventops-streamlit-section-intro">The base corpus contains 19 complete records from the event catalogue, operational policies and participant directory. I kept structured rows intact so identity, scope and provenance stay together. A separate vector database was unnecessary for this small bounded corpus.</p>
          <div className="eventops-streamlit-detail-grid">
            <div><h3>Index construction</h3><p>FastEmbed uses <code>BAAI/bge-small-en-v1.5</code> to produce 384-dimensional vectors. NumPy stores the matrix with a record/model fingerprint; incompatible or corrupt snapshots rebuild. Unique temporary files and atomic replacement prevent partial index writes.</p></div>
            <div><h3>Query-context handling</h3><p>The deterministic planner resolves explicit event IDs and titles before inherited context. Follow-ups can retain one established event; ambiguous references request clarification. Cross-document queries and global policies retain their appropriate scope.</p></div>
            <div><h3>Ranking and filtering</h3><p>Cosine similarity ranks eligible records after event, record-kind and policy-category filters. Retrieval depth is bounded and inspectable. Similarity is not answer confidence or a verification verdict.</p></div>
            <div><h3>Generated answers</h3><p>When enabled, Gemini receives retrieved context and returns structured text with record IDs. Citation membership and conservative unsupported-claim checks are separate from retrieval correctness; neither establishes complete semantic entailment.</p></div>
          </div>
          <dl className="eventops-streamlit-retrieval-results"><div><dt>Curated behavioral cases</dt><dd>30/30</dd></div><div><dt>Ranked-source cases</dt><dd>25</dd></div><div><dt>Recall@5</dt><dd>1.0</dd></div><div><dt>MRR</dt><dd>1.0</dd></div></dl>
          <p className="eventops-streamlit-section-intro">These versioned results describe the controlled 19-record corpus, not general-purpose RAG accuracy. Retrieval ranking, valid citations and factual generated claims remain separate evaluation concerns.</p>
          <EvidenceLink path="eventops/rag.py">Semantic index and query planner</EvidenceLink>
          <EvidenceLink path="docs/iterations/002/TEST_RESULTS.md">Recorded retrieval evaluation</EvidenceLink>
        </Section>

        <Section id="streamlit-orchestration" className="eventops-streamlit-orchestration" label="n8n orchestration" title="Source execution in n8n, verification rules in Python.">
          <p className="eventops-streamlit-section-intro">The source-controlled verification graph contains 31 nodes. These six groupings describe its actual execution responsibilities; there is no Python endpoint secretly running the whole graph behind a decorative automation diagram.</p>
          <ol className="eventops-streamlit-workflow-stages">{workflowStages.map(([name, detail]) => <li key={name}><h3>{name}</h3><p>{detail}</p></li>)}</ol>
          <div className="eventops-streamlit-source-boundaries"><div><h3>Calendar and Web</h3><p>Event-specific scenarios fetch independent, controlled synthetic HTTP services. They are real transport integrations, not live external event-management systems or proof of real registrations.</p></div><div><h3>Email and public references</h3><p>Mailtrap sandbox messages are actually retrieved read-only; no email is sent. Office Holidays and Nager.Date provide separate reference observations, never event-registration authority.</p></div></div>
          <ul className="eventops-streamlit-source-states" aria-label="Distinct source outcomes">{["Completed", "Completed empty", "Failed", "Unavailable", "Timed out", "Partially processed"].map(status => <li key={status}>{status}</li>)}</ul>
          <p className="eventops-streamlit-section-intro">One failed source is not an empty successful collection. Source-specific outcomes remain separate from record classifications, and final workflow status reflects all source outcomes. Actual workflow IDs, execution IDs and checkpoints are retained.</p>
          <EvidenceLink path="n8n/verification.json">31-node verification workflow</EvidenceLink>
        </Section>

        <Section id="streamlit-verification" className="eventops-streamlit-verification" label="Deterministic verification" title="Source claims compared with authoritative event and directory records.">
          <div className="eventops-streamlit-two-columns"><div><h3>Observed evidence</h3><p>Incoming source records retain raw excerpts, normalized fields, source identifiers and provenance. Duplicate inputs merge without erasing conflicts, supporting fields or the original claims.</p></div><div><h3>Authoritative checks</h3><p>Python validates event identity, participant identity, active status, event registration, name, date and venue. Missing fields, conflicting claims and duplicate evidence contribute explicit checks and classifications.</p></div></div>
          <dl className="eventops-streamlit-classifications"><div><dt>Verified</dt><dd>Required reference checks passed; an event observation can verify without representing a participant.</dd></div><div><dt>Review required</dt><dd>Conflicting or mismatched evidence needs inspection.</dd></div><div><dt>Rejected</dt><dd>Invalid identities or disqualifying reference checks prevent acceptance.</dd></div><div><dt>Incomplete</dt><dd>Essential identifying information is missing.</dd></div></dl>
          <p className="eventops-streamlit-section-intro">Neither a model explanation nor a review annotation can promote an unverified participant or override the deterministic source classification.</p>
          <EvidenceLink path="eventops/pipeline.py">Parsing, normalization, deduplication and verification</EvidenceLink>
        </Section>

        <Section id="streamlit-agent" className="eventops-streamlit-agent" label="Gemini investigation" title="An evidence-bound agent with three read-only tools.">
          <p className="eventops-streamlit-section-intro">The genuine 11-node n8n AI Agent graph connects Gemini Chat Model to three scoped tools. It interprets a user’s investigation intent within one permitted run; inputs, output size, model iterations and workflow runtime are bounded.</p>
          <div className="eventops-streamlit-tool-list">{tools.map(([name, description]) => <div key={name}><h3><code>{name}</code></h3><p>{description}</p></div>)}</div>
          <div className="eventops-streamlit-detail-grid"><div><h3>Validation and reuse</h3><p>Structured findings, conflicts and proposed review actions must cite records observed in actual tool responses. Observations must match the permitted snapshot. Atomic investigation claims use owner, run, intent and evidence hash; changed evidence invalidates reuse.</p></div><div><h3>Capability limits</h3><p>The agent has five model iterations and a 120-second workflow deadline. It cannot write authoritative results, run SQL, change registrations, send mail, bypass source restrictions or perform unrestricted network requests.</p></div></div>
          <div className="eventops-streamlit-model-evidence"><h3>Historical Iteration 002 model evidence</h3><p>Genuine Gemini calls and tool execution were recorded. Execution 24 returned an invalid shortened citation and was rejected by application validation. A later focused execution 25 produced an acceptable result. The rejection remains evidence of a model limitation, not a hidden success.</p><h3>Iteration 003: Gemini disabled</h3><p>No new generation or agent-model acceptance was executed during the release rehearsal because the owner’s free-tier/billing status had not been confirmed. Historical model execution is not a new release-model or hosted acceptance pass.</p></div>
          <EvidenceLink path="n8n/gemini-agent.json">11-node agent and tool graph</EvidenceLink>
          <EvidenceLink path="eventops/service.py">Observed-tool citation validation</EvidenceLink>
        </Section>

        <Section id="streamlit-persistence" className="eventops-streamlit-persistence" label="Workflow state and recovery" title="Atomic reservation, revision checks and explicit uncertain execution.">
          <div className="eventops-streamlit-detail-grid"><div><h3>Owner-scoped request replay</h3><p>Request IDs bind owner and operation inputs. Concurrent identical requests reserve one run and replay its in-progress or final state rather than independently reprocessing the source workflow.</p></div><div><h3>Checkpoint reconciliation</h3><p>Actual n8n execution identifiers, timestamps and source outcomes are persisted. An uncertain webhook response or stale checkpoint can require intervention; missing state does not prove nondelivery and staleness does not invent completion.</p></div><div><h3>Revision-controlled writes</h3><p>Compare-and-swap updates prevent stale writers losing newer evidence. Additive migrations retain prior snapshots, and guarded finalization prevents a replay overwriting completed authoritative results.</p></div><div><h3>Storage boundaries</h3><p>SQLite supports local development with WAL and bounded lock waits. An isolated PostgreSQL 17 topology and archive restoration were tested. Externally hosted PostgreSQL has not been provisioned or accepted.</p></div></div>
          <p className="eventops-streamlit-section-intro">The application does not implement a durable queue or fully automatic distributed recovery. A deliberate n8n interruption after source checkpoints preserved uncertainty; replay did not repeat the completed source work.</p>
          <EvidenceLink path="eventops/lifecycle.py">Read-only lifecycle reconciliation</EvidenceLink>
          <EvidenceLink path="eventops/store.py">Reservations, revisions and review persistence</EvidenceLink>
        </Section>

        <Section id="streamlit-interface" className="eventops-streamlit-interface" label="Review and exports" title="Inspectable source evidence and persistent review annotations.">
          <div className="eventops-streamlit-two-columns"><p>The Streamlit interface supports knowledge questions, scenario/run controls, source outcomes, searchable results, filters, raw and normalized evidence, discrepancies and duplicates. Review reasons, notes, proposed actions and history remain available after execution.</p><p>Pandas and native tables/forms/downloads provide this internal-tool surface with less frontend application code. CSV exports of all and verified records are checked against stored results. Annotations append review history without changing authoritative classifications.</p></div>
          <p className="eventops-streamlit-section-intro">Saved private workspace capabilities support recovery. The optional password gate and capability boundaries are not commercial employee identity or tenant authorization; this is not represented as an enterprise multi-tenant product.</p>
          <EvidenceLink path="app.py">Native Streamlit interface and recovery controls</EvidenceLink>
        </Section>

        <Section id="streamlit-results" className="eventops-streamlit-results" label="Recorded verification" title="Local release checks and separately identified model evidence.">
          <p className="eventops-streamlit-section-intro">The following results come from the reviewed application repository. They are not application tests newly executed by this portfolio page.</p>
          <dl className="eventops-streamlit-release-results"><div><dt>Iteration 003 regression</dt><dd>147 passed<span>macOS and disposable Linux ARM64</span></dd></div><div><dt>Release CI</dt><dd>2 jobs passed<span>Python checks and container validation</span></dd></div></dl>
          <table className="eventops-streamlit-scenario-results"><caption>Main synthetic n8n scenario: eight merged records</caption><thead><tr><th scope="col">Verified</th><th scope="col">Review required</th><th scope="col">Rejected</th><th scope="col">Incomplete</th></tr></thead><tbody><tr><td>3</td><td>2</td><td>2</td><td>1</td></tr></tbody></table>
          <p className="eventops-streamlit-section-intro">Two duplicate inputs were merged. The three verified outputs were two event observations and one participant, not three confirmed participants. The source records retain actual workflow publication/execution, persisted reviewer action, interruption/reconciliation, container restart preservation and restoration of a PostgreSQL archive into an empty isolated database.</p>
          <div className="eventops-streamlit-browser-boundary"><h3>Application release-browser acceptance remains pending</h3><p>The Iteration 003 browser tool refused localhost with <code>ERR_BLOCKED_BY_CLIENT</code>. Native Streamlit AppTest and other checks passed, but do not establish a real-browser release pass. No new Gemini generation occurred in this release rehearsal. Portfolio-page browser checks do not clear either application gate.</p></div>
          <EvidenceLink path="docs/iterations/003/TEST_RESULTS.md">Recorded release outcomes and failures</EvidenceLink>
          <a className="eventops-streamlit-evidence-link" href="https://github.com/keenosmith-del/eventops-intelligence-streamlit/actions/runs/39552175515" target="_blank" rel="noopener noreferrer">Successful release CI</a>
        </Section>

        <Section id="streamlit-deployment" className="eventops-streamlit-deployment" label="Deployment engineering" title="Protected service topology and local rehearsal, without public deployment.">
          <div className="eventops-streamlit-detail-grid"><div><h3>Runtime and ingress</h3><p>Standalone Docker Compose separates Streamlit, the processor, n8n, external runner, controlled source and Caddy gateway. Non-root processes, read-only roots, constrained writable mounts and dedicated networks keep backend/editor services private.</p></div><div><h3>Operational release controls</h3><p>Source-controlled publication binds encrypted n8n credentials and workflow revisions. Health/readiness checks, bounded sanitized logs, migration checks, release preflight, backup/restore and recovery/rollback runbooks support the local rehearsal.</p></div></div>
          <p className="eventops-streamlit-section-intro">The project has a strict zero-cost operating objective. Its conditional proposal names an Oracle Always Free ARM host, a separate Neon Free PostgreSQL project and optional Tailscale ingress. None is provisioned or accepted as hosted infrastructure; account eligibility, capacity and future availability are not guaranteed.</p>
          <p className="eventops-streamlit-section-intro">No public hosted application has been deployed. Public TLS/ingress, hosted storage, real release-browser acceptance and authorised model-enabled deployment remain pending. Local container/configuration checks are not a production load, uptime or availability SLA.</p>
          <EvidenceLink path="docs/iterations/003/DEPLOYMENT_ARCHITECTURE.md">Prepared topology and trust boundaries</EvidenceLink>
          <EvidenceLink path="docs/iterations/003/RELEASE_READINESS.md">Release readiness and unresolved acceptance gates</EvidenceLink>
        </Section>

        <Section id="streamlit-comparison" className="eventops-streamlit-comparison" label="Implementation trade-offs" title="A separate companion to the React and LangGraph application.">
          <div className="eventops-streamlit-two-columns"><div><h3>Original EventOps Intelligence</h3><p>React, FastAPI, LangGraph and PostgreSQL/pgvector provide a custom application UI and code-owned workflow. This gives stronger control over bespoke interactions and application architecture, with more frontend engineering ownership.</p></div><div><h3>Streamlit and n8n companion</h3><p>Native Streamlit, n8n-owned workflows, focused Python stages, FastEmbed/NumPy and SQLAlchemy support rapid internal-tool delivery and visible execution. Complex graph maintenance, capability access and recovery still require explicit engineering.</p></div></div>
          <p className="eventops-streamlit-section-intro">Neither architecture is categorically superior. Both require tested rules, provenance, bounded integrations, persistent state and deployment acceptance. This companion does not reuse or modify the original application’s infrastructure.</p>
          <Link className="eventops-streamlit-evidence-link" to="/projects/eventops-intelligence">Original EventOps case study</Link>
          <a className="eventops-streamlit-evidence-link" href="https://github.com/keenosmith-del/eventops-intelligence-v.01" target="_blank" rel="noopener noreferrer">Original source repository</a>
        </Section>

        <Section id="streamlit-technology" className="eventops-streamlit-technology" label="Technology" title="A Python-first interface, retrieval and workflow stack.">
          <div className="eventops-streamlit-technology-grid">{technologyGroups.map(group => <div key={group.heading}><h3>{group.heading}</h3>{group.note && <p>{group.note}</p>}<div className="eventops-streamlit-tech-tags">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div></div>)}</div>
          <button className="eventops-streamlit-button eventops-streamlit-button-dark eventops-streamlit-tech-trigger" type="button" onClick={() => setShowStack(true)}><Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />Tech stack</button>
        </Section>

        <section className="eventops-streamlit-closing"><div><p className="eventops-streamlit-eyebrow">Architecture and implementation</p><h2>Low-code orchestration with verification retained in code.</h2><p>The companion combines a Python-native interface and genuine n8n execution with semantic retrieval, source provenance, deterministic business rules, bounded model interpretation and persistent operational records. Faster interface/workflow iteration changes engineering ownership; it does not remove the reliability, access-control or public acceptance work recorded in the repository.</p></div></section>
      </article>
      <footer ref={footerRef} className="eventops-streamlit-footer"><Link className="eventops-streamlit-footer-back" to="/">Back to portfolio</Link><button className="eventops-streamlit-footer-top" type="button" aria-label="Back to top" onClick={scrollToTop}><ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" /></button></footer>
      {showTop && !footerVisible && <button className="eventops-streamlit-floating-top" type="button" aria-label="Back to top" onClick={scrollToTop}><ArrowUp size={17} strokeWidth={1.7} aria-hidden="true" /></button>}
      {showStack && <ProjectModal groups={technologyGroups} onClose={closeStack} />}
    </main>
  );
}
