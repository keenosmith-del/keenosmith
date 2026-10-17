import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUp, Layers3 } from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./EventOpsIntelligence.css";

const sourceRepository =
  "https://github.com/keenosmith-del/eventops-intelligence-v.01";
const platformUrl = "https://eventops-intelligence.onrender.com";
const technicalBrief = "/documents/EventOps-Executive-Technical-Brief.pdf";

const heroTechnologies = [
  "LangGraph", "FastAPI", "PostgreSQL", "pgvector", "React", "Gemini",
];

const technologyGroups = [
  {
    heading: "Frontend",
    skills: ["React 19", "JavaScript", "Vite", "React Router", "React Flow", "Fetch API", "Lucide"],
  },
  {
    heading: "Backend",
    skills: ["Python 3.12", "FastAPI", "Pydantic", "Uvicorn", "HTTPX", "REST APIs"],
  },
  {
    heading: "Data and retrieval",
    skills: ["PostgreSQL", "pgvector", "FastEmbed", "384-dimensional vectors", "Semantic search", "Structured CSV / JSON"],
  },
  {
    heading: "Agent orchestration",
    skills: ["LangGraph", "Deterministic verification", "Provenance tracking", "Deduplication", "Execution replay", "CSV export"],
  },
  {
    heading: "External integrations",
    note: "Calendar, Mailtrap and web reads were exercised in the recorded production assessment.",
    skills: ["iCalendar", "Mailtrap Sandbox", "HTTPS reference API", "Gemini API"],
  },
  {
    heading: "Deployment and quality",
    skills: ["Render", "Neon Postgres", "Docker Compose", "GitHub Actions", "Pytest", "Vitest", "Playwright"],
  },
  {
    heading: "Optional integration",
    note: "n8n service endpoints and workflow definition are prepared; live handoff was not configured.",
    skills: ["n8n"],
  },
];

const workflowStages = [
  "Calendar / Email / Web",
  "Extraction",
  "Normalization",
  "Deduplication",
  "Verification",
  "Discrepancies",
  "Persistence",
];

function TechStackModal({ close }) {
  const closeButton = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") close();
      if (event.key === "Tab") {
        event.preventDefault();
        closeButton.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [close]);

  return (
    <div
      className="eventops-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        className="eventops-modal"
        role="dialog"
        aria-modal="true"
        aria-label="EventOps technology stack"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButton}
          type="button"
          className="eventops-modal-close"
          onClick={close}
          aria-label="Close technology stack"
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="eventops-modal-groups">
          {technologyGroups.map((group) => (
            <div className="eventops-modal-group" key={group.heading}>
              <span className="eventops-modal-category">{group.heading}</span>
              {group.note && <p className="eventops-modal-note">{group.note}</p>}
              <div className="eventops-modal-pills">
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EventOpsIntelligence() {
  const [showTop, setShowTop] = useState(false);
  const [showStack, setShowStack] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef(null);
  const closeStack = useCallback(() => setShowStack(false), []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main className="eventops-project">
      <Link className="eventops-back" to="/">
        <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />
        <span>Back to portfolio</span>
      </Link>

      <article>
        <header className="eventops-hero">
          <div className="eventops-hero-inner">
            <div className="eventops-hero-topline">
              <div className="eventops-pill-list" aria-label="Core technologies">
                {heroTechnologies.map((technology) => <span key={technology}>{technology}</span>)}
              </div>
              <time dateTime="2026-10">Built October 2026</time>
            </div>
            <h1>EventOps <span>Intelligence.</span></h1>
            <div className="eventops-hero-bottom">
              <p className="eventops-hero-description">
                A full-stack event operations workspace where cited knowledge retrieval
                and automated source verification work alongside each other.
                I designed it to answer policy questions from indexed records,
                investigate conflicting registrations and preserve the evidence
                behind every result—not just display an AI response.
              </p>
              <p className="eventops-hero-note">
                Deployed assessment application · Synthetic event and participant data
              </p>
              <div className="eventops-hero-actions">
                <a className="eventops-button eventops-button-dark" href={sourceRepository} target="_blank" rel="noopener noreferrer">
                  <img src={githubSvg} className="eventops-github-icon" alt="" aria-hidden="true" />
                  Source
                </a>
                <a className="eventops-button eventops-button-light" href={platformUrl} target="_blank" rel="noopener noreferrer">
                  Visit platform
                </a>
              </div>
              <p className="eventops-platform-note">
                The live assessment workspace uses a reviewer demo session; some
                external capabilities are intentionally rate-limited or disabled.
                The source is available, or you can <a href="mailto:keenosmith@kailor.co.za">contact me</a> for a walkthrough.
              </p>
            </div>
          </div>
        </header>

        <section className="eventops-section eventops-overview">
          <div className="eventops-section-label">Project summary</div>
          <div className="eventops-section-copy">
            <h2>Event operations have two problems: finding the rule and checking the claim.</h2>
            <div className="eventops-two-columns">
              <p>
                Event teams need quick answers about eligibility, check-in,
                registrations and policies. Those answers should come from the
                actual event documentation, with references that a person can inspect.
                EventOps turns structured source records into searchable knowledge
                rather than making an LLM the source of truth.
              </p>
              <p>
                The second problem starts when a calendar event, registration email
                or public reference record says something different. A bounded
                LangGraph workflow extracts those observations, checks them against
                the directory and event records, and records verified outcomes or
                exceptions for review. The original evidence remains visible.
              </p>
            </div>
            <div className="eventops-brief-action">
              <a
                className="eventops-button eventops-button-brief"
                href={technicalBrief}
                target="_blank"
                rel="noopener noreferrer"
              >
                Technical brief
              </a>
            </div>
          </div>
        </section>

        <section className="eventops-section eventops-knowledge">
          <div className="eventops-section-label">Knowledge engineering</div>
          <div className="eventops-section-copy">
            <h2>Retrieval starts with the records that run the event.</h2>
            <p className="eventops-intro-copy">
              I built the knowledge layer around three deliberately small, auditable
              datasets. CSV and JSON ingestion creates individual source records
              with stable document IDs, event relationships and provenance.
              FastEmbed produces local 384-dimensional vectors, with semantic
              retrieval persisted through PostgreSQL and pgvector.
            </p>
            <div className="eventops-source-strip" aria-label="Indexed assessment data">
              <div><strong>3</strong><span>Event records</span><small>events.csv</small></div>
              <div><strong>9</strong><span>Policy records</span><small>policies.csv</small></div>
              <div><strong>7</strong><span>Directory records</span><small>directory.json</small></div>
            </div>
            <div className="eventops-detail-grid">
              <div>
                <h3>Queries with context</h3>
                <p>
                  A deterministic query planner identifies event IDs, record types and
                  relevant policy categories before vector search. Follow-up questions
                  can inherit a clearly established event ID from conversation history;
                  ambiguous references are rejected rather than guessed.
                </p>
              </div>
              <div>
                <h3>Grounded generation, by choice</h3>
                <p>
                  Retrieved evidence remains available without a model call.
                  Optional Gemini generation receives a bounded set of source excerpts
                  and must return valid citation IDs. When it is disabled, unavailable
                  or under-supported, the interface keeps the evidence and reports that state.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="eventops-flow" aria-label="Verification workflow">
          <div className="eventops-flow-inner">
            <div className="eventops-flow-heading">
              <div className="eventops-section-label">Verification workflow</div>
              <h2>From incoming evidence to a record someone can defend.</h2>
              <p>
                One explicit trigger runs a predictable series of bounded, read-only
                tools and deterministic checks. Each stage records its status,
                timing, inputs and outcomes to PostgreSQL; the interface follows
                the real execution rather than animating a fabricated progress bar.
              </p>
            </div>
            <div className="eventops-workflow-stages">
              {workflowStages.map((stage, index) => (
                <div className="eventops-stage" key={stage}>
                  <span className="eventops-stage-name">{stage}</span>
                  {index < workflowStages.length - 1 && <span className="eventops-stage-connector" aria-hidden="true">→</span>}
                </div>
              ))}
            </div>
            <div className="eventops-flow-foot">
              <p>LangGraph manages the ordered stage transitions; it does not let a model freely choose tools or execute external changes.</p>
              <p>Saved runs can be inspected, replayed from timestamps, revisited in history and exported to CSV without re-executing tools.</p>
            </div>
          </div>
        </section>

        <section className="eventops-section eventops-integrations">
          <div className="eventops-section-label">Source integrations</div>
          <div className="eventops-section-copy">
            <h2>Real feeds, separate trust levels.</h2>
            <p className="eventops-intro-copy">
              External sources are observations, not authority. The tool layer uses
              public HTTPS reads with size, timeout and URL restrictions, and it
              records where a claim came from before the verification layer makes
              any determination about it.
            </p>
            <div className="eventops-three-columns">
              <div>
                <h3>Calendar</h3>
                <p>Reads a public iCalendar feed, extracts event entries and retains source identifiers and references for comparison.</p>
              </div>
              <div>
                <h3>Email sandbox</h3>
                <p>Reads controlled Mailtrap messages. Production verification exercised matching, duplicate, inactive and conflicting registrations with retained message evidence.</p>
              </div>
              <div>
                <h3>Web reference</h3>
                <p>Reads a bounded HTTPS reference API. Observations can corroborate a source or remain flagged when they do not match the fictional event catalogue.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="eventops-section eventops-decisions">
          <div className="eventops-section-label">Data integrity</div>
          <div className="eventops-section-copy">
            <h2>A conflict stays a conflict until the reference data supports it.</h2>
            <div className="eventops-two-columns">
              <p>
                <strong>Source authority is explicit.</strong> Event specifications
                live in <code>events.csv</code>, policies in <code>policies.csv</code>,
                and identity, registration and account status in <code>directory.json</code>.
                Calendar invitations and email messages can supply evidence but cannot
                independently establish eligibility.
              </p>
              <p>
                <strong>Verification is deterministic.</strong> Inputs are normalized
                and deduplicated before checking the actual references. Missing event
                IDs are not invented, inactive participants are not promoted to verified,
                and conflicting names or identifiers are surfaced with field-level
                evidence instead of being silently corrected.
              </p>
            </div>
            <div className="eventops-detail-grid eventops-outcome-grid">
              <div>
                <h3>Verified</h3>
                <p>Evidence agrees with the authoritative event, directory and policy records.</p>
              </div>
              <div>
                <h3>Review required</h3>
                <p>A missing reference, contradictory identity or ineligible participant remains an auditable exception.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="eventops-section eventops-shipping">
          <div className="eventops-section-label">Platform engineering</div>
          <div className="eventops-section-copy">
            <h2>Deployed with an evidence trail, not just a demo screen.</h2>
            <p className="eventops-intro-copy">
              The assessment application was deployed on Render with a separate
              frontend and FastAPI service backed by Neon PostgreSQL/pgvector.
              Server-side migrations and indexing preserve the structured dataset;
              reviewer demo sessions isolate conversations and verification runs.
            </p>
            <div className="eventops-detail-grid">
              <div>
                <h3>Inspectable execution</h3>
                <p>Runs, step outputs, original source references, normalized records, duplicate groups, exceptions and CSV exports are persisted. Replay reconstructs historical progress without calling providers again.</p>
              </div>
              <div>
                <h3>Bounded public access</h3>
                <p>Exact-origin CORS, per-session ownership, token budgets and tool input limits restrict the reviewer surface. Demo access is not enterprise authentication, and the tools remain read-only.</p>
              </div>
              <div>
                <h3>Test coverage</h3>
                <p>Recorded release checks include 217 passing backend tests, 16 frontend unit passes, browser workflow regression coverage, and a successful frontend build. Production acceptance separately exercised real third-party reads and persistence.</p>
              </div>
              <div>
                <h3>Operational boundaries</h3>
                <p>Gemini was enabled for a bounded production demonstration and disabled afterward. n8n endpoints are prepared but unconfigured; FastAPI background tasks are not a crash-resumable durable worker queue.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="eventops-section eventops-technology">
          <div className="eventops-section-label">Technology</div>
          <div className="eventops-section-copy">
            <h2>One application, distinct retrieval and verification engines.</h2>
            <p className="eventops-intro-copy">
              The React workspace manages conversations, source inspection and
              execution history. FastAPI exposes the retrieval, persistence and agent
              APIs; PostgreSQL/pgvector supports both knowledge search and run history.
              LangGraph connects the external reads to deterministic verification,
              while Gemini is an optional explanation layer rather than the arbiter of eligibility.
            </p>
            <div className="eventops-technology-grid">
              <div>
                <h3>Frontend</h3>
                <p>Single-page reviewer workspace with evidence inspection, agent graph and historical execution views.</p>
                <div className="eventops-tech-tags"><span>React</span><span>Vite</span><span>React Router</span><span>React Flow</span></div>
              </div>
              <div>
                <h3>Backend</h3>
                <p>Typed HTTP contracts, source integration, verification rules and session-scoped persistence.</p>
                <div className="eventops-tech-tags"><span>Python</span><span>FastAPI</span><span>Pydantic</span><span>HTTPX</span></div>
              </div>
              <div>
                <h3>Data and AI</h3>
                <p>Persistent structured records, local embeddings, filtered semantic retrieval and citation-controlled generation.</p>
                <div className="eventops-tech-tags"><span>PostgreSQL</span><span>pgvector</span><span>FastEmbed</span><span>Gemini</span></div>
              </div>
              <div>
                <h3>Orchestration and deployment</h3>
                <p>Ordered verification stages, stored execution details, tested deployment and browser-level regressions.</p>
                <div className="eventops-tech-tags"><span>LangGraph</span><span>Render</span><span>Neon</span><span>Playwright</span></div>
              </div>
            </div>
            <button className="eventops-button eventops-button-dark eventops-tech-trigger" type="button" onClick={() => setShowStack(true)}>
              <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />
              Tech stack
            </button>
          </div>
        </section>

        <section className="eventops-closing">
          <div>
            <p className="eventops-eyebrow">Technical scope</p>
            <h2>Evidence retrieval, external verification and accountable outcomes.</h2>
            <p>
              EventOps Intelligence combines a source-cited knowledge assistant with
              an independently governed verification pipeline. The deployed assessment
              demonstrates persisted event knowledge, real provider reads, deterministic
              record checking and auditable exports—while keeping generated language,
              source observations and verified business facts separate.
            </p>
          </div>
        </section>
      </article>

      <footer ref={footerRef} className="eventops-footer">
        <Link className="eventops-footer-back" to="/">Back to portfolio</Link>
        <button className="eventops-footer-top" type="button" aria-label="Back to top" onClick={scrollToTop}>
          <ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </footer>
      {showTop && !footerVisible && (
        <button className="eventops-floating-top" type="button" aria-label="Back to top" onClick={scrollToTop}>
          <ArrowUp size={17} strokeWidth={1.7} aria-hidden="true" />
        </button>
      )}
      {showStack && <TechStackModal close={closeStack} />}
    </main>
  );
}
