import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Layers3,
  FileText,
  Calculator,
  ShieldCheck,
  Scale,
  GitBranch,
} from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./ClaudeProcurement.css";

const repository =
  "https://github.com/keenosmith-del/claude-powered-legal-procurement-intelligence";
const technicalBrief = "/documents/claude-procurement-technical-brief.pdf";

const heroTechnologies = [
  "Claude API",
  "TypeScript",
  "React",
  "Express",
  "PostgreSQL",
  "Structured outputs",
];

const technologyGroups = [
  {
    heading: "Frontend",
    skills: [
      "React 19",
      "TypeScript",
      "Vite 7",
      "React Router",
      "Tailwind CSS 4",
      "Fetch API",
    ],
  },
  {
    heading: "Backend and persistence",
    skills: [
      "Node.js",
      "Express 5",
      "TypeScript",
      "PostgreSQL",
      "SQL transactions",
      "JSONB",
      "Zod",
      "REST APIs",
    ],
  },
  {
    heading: "Claude integration",
    note: "Implemented with the official SDK; live Claude acceptance remains unverified without provider credentials.",
    skills: [
      "Anthropic TypeScript SDK",
      "Claude Sonnet 4.6 (default configuration)",
      "JSON Schema structured outputs",
      "Zod output validation",
      "Tool use",
      "Eight-round bound",
      "Event-scoped evidence tools",
    ],
  },
  {
    heading: "Contract processing",
    skills: [
      "PDF Parse",
      "Mammoth DOCX",
      "UTF-8 TXT",
      "Evidence excerpts",
      "Term provenance",
      "Conflict detection",
      "Local file storage",
    ],
  },
  {
    heading: "Financial decision logic",
    skills: [
      "Deterministic TypeScript",
      "Compounding",
      "Weighted criteria",
      "What-if recalculation",
      "ZAR projections",
      "Revision locking",
      "Human decision gate",
    ],
  },
  {
    heading: "Quality and runtime",
    skills: [
      "Vitest",
      "Supertest",
      "Docker Compose",
      "PostgreSQL migrations",
      "Request IDs",
      "Audit events",
      "Helmet",
      "Origin checks",
    ],
  },
];

const phases = [
  {
    number: "01",
    title: "Collect",
    description:
      "Create a procurement event, define requirements and add supplier documents.",
  },
  {
    number: "02",
    title: "Verify",
    description:
      "Extract terms, inspect original excerpts and keep unknown or conflicting clauses visible.",
  },
  {
    number: "03",
    title: "Compare",
    description:
      "Compute projected costs, weighted evaluations and deviations using fixed TypeScript rules.",
  },
  {
    number: "04",
    title: "Decide",
    description:
      "Review proposed risks and negotiation positions, model changes and record a human decision.",
  },
];

const supplierProfiles = [
  {
    name: "Supplier A",
    position: "Middle-ground offer",
    details:
      "A balanced initial price and stronger liability than B, alongside restricted support and qualified cancellation terms.",
    features: [
      "Mid-range opening cost",
      "Qualified exit terms",
      "Support limitations",
    ],
  },
  {
    name: "Supplier B",
    position: "Lowest initial price",
    details:
      "More favourable payment and availability terms, offset by 8% annual escalation, a shorter liability cap and early-exit exposure.",
    features: [
      "8% escalation",
      "60-day payment terms",
      "Six-month liability cap",
    ],
  },
  {
    name: "Supplier C",
    position: "Higher protection",
    details:
      "Strong uptime, warranty and liability coverage at a premium price, with its own budget and cancellation trade-offs.",
    features: [
      "Strong contractual protection",
      "Premium opening cost",
      "Longer exit notice",
    ],
  },
];

function TechStackModal({ onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [onClose]);
  return (
    <div
      className="claude-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="claude-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Project technology stack"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          className="claude-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close technology stack"
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="claude-modal-groups">
          {technologyGroups.map((group) => (
            <div className="claude-modal-group" key={group.heading}>
              <span className="claude-modal-category">{group.heading}</span>
              {group.note && <p className="claude-modal-note">{group.note}</p>}
              <div className="claude-modal-pills">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ className = "", title, label, children, id }) {
  return (
    <section id={id} className={`claude-section ${className}`}>
      <div className="claude-section-label">{label}</div>
      <div className="claude-section-copy">
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </section>
  );
}

export default function ClaudeProcurement() {
  const [showStack, setShowStack] = useState(false);
  const [showTop, setShowTop] = useState(false);
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
    if (!footerRef.current || typeof IntersectionObserver === "undefined")
      return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main className="claude-project">
      <Link className="claude-back" to="/">
        <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />
        <span>Back to portfolio</span>
      </Link>

      <article>
        <header className="claude-hero">
          <div className="claude-hero-inner">
            <div className="claude-hero-topline">
              <div className="claude-pill-list" aria-label="Core technologies">
                {heroTechnologies.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <time dateTime="2026">Built June 2026</time>
            </div>
            <h1>
              Commercial clarity. <span>Before the signature.</span>
            </h1>
            <div className="claude-hero-bottom">
              <div>
                <p className="claude-hero-description">
                  I built a contract and procurement intelligence workspace to
                  compare supplier proposals beyond the opening price. It
                  connects verified clause evidence, deterministic financial
                  projections and structured Claude analysis, so a reviewer can
                  see what a contract costs, what remains uncertain and what
                  deserves negotiation before a decision.
                </p>
                <p className="claude-hero-secondary">
                  A local-first procurement engineering project. Not legal
                  advice, and not a publicly hosted service.
                </p>
              </div>
              <div className="claude-hero-controls">
                <div className="claude-hero-actions">
                  <a
                    className="claude-button claude-button-dark"
                    href={repository}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={githubSvg} alt="" aria-hidden="true" /> Source
                  </a>
                  <button
                    className="claude-button claude-button-disabled"
                    disabled
                    type="button"
                  >
                    Visit platform
                  </button>
                </div>
                <p className="claude-hero-note">
                  The application runs locally. The source is public, or{" "}
                  <a href="mailto:keenosmith@kailor.co.za">contact me</a> for a
                  walkthrough.
                </p>
              </div>
            </div>
          </div>
        </header>

        <Section
          label="Project summary"
          title="The cheapest supplier isn't always the strongest contract."
          id="claude-overview"
        >
          <div className="claude-two-columns">
            <p>
              A procurement decision might appear straightforward until
              escalation, auto-renewal, cancellation penalties and liability
              caps change the long-term picture. Traditional price tables
              flatten those differences. I wanted a reviewer to see financial
              outcomes alongside the exact contractual language that creates
              them.
            </p>
            <p>
              The application keeps those responsibilities separate: uploaded
              documents provide traceable evidence, TypeScript calculates the
              comparison, Claude is designed to interpret qualitative
              trade-offs, and a human reviewer retains the final choice. Missing
              evidence never quietly becomes a favourable score.
            </p>
          </div>
          <div className="claude-summary-action">
            <a
              className="claude-button claude-button-soft"
              href={technicalBrief}
              target="_blank"
              rel="noopener noreferrer"
            >
              Technical brief{" "}
              <ArrowRight size={14} strokeWidth={1.7} aria-hidden="true" />
            </a>
          </div>
        </Section>

        <section
          className="claude-process"
          aria-labelledby="claude-process-title"
        >
          <div className="claude-process-inner">
            <p className="claude-eyebrow">How the workspace operates</p>
            <h2 id="claude-process-title">
              A decision workflow built around evidence.
            </h2>
            <div className="claude-process-grid">
              {phases.map((stage) => (
                <div className="claude-process-step" key={stage.number}>
                  <h3>{stage.title}</h3>
                  <p>{stage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Section
          label="Contract evaluation"
          title="Three proposals. Three different kinds of exposure."
          className="claude-suppliers"
        >
          <p className="claude-section-lead">
            The seeded demonstration deliberately avoids a predetermined winner.
            Each supplier trades cost against a different set of protections.
            The cards below summarise the sample source documents, not an
            AI-generated recommendation.
          </p>
          <div className="claude-supplier-grid">
            {supplierProfiles.map((supplier, index) => (
              <div className="claude-supplier-card" key={supplier.name}>
                <div className="claude-supplier-top">
                  <span>{supplier.name}</span>

                </div>
                <h3>{supplier.position}</h3>
                <p>{supplier.details}</p>
                <div className="claude-supplier-features">
                  {supplier.features.map((feature) => (
                    <span key={feature}>{feature}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="claude-footnote">
            Example terms are read from the repository's six supplier
            contract/SLA fixtures. Projected totals and weighted results are
            calculated from recorded terms; recommendations require a genuine
            Claude analysis run.
          </p>
        </Section>

        <Section
          label="System architecture"
          title="Let the software calculate. Let Claude interpret."
          className="claude-architecture"
        >
          <div className="claude-architecture-grid">
            <div className="claude-architecture-card">
              <div className="claude-architecture-icon">
                <Calculator size={20} strokeWidth={1.5} />
              </div>
              <span className="claude-card-index">Deterministic engine</span>
              <h3>Financial figures stay outside the model.</h3>
              <p>
                Compounded yearly cost, one-time fees, weighted criteria and
                requirement deviations are computed by TypeScript. Missing
                comparable prices, escalation or setup fees return incomplete
                results rather than guessed totals. Claude cannot replace a
                computed score.
              </p>
              <div className="claude-mini-pills">
                <span>ZAR projections</span>
                <span>Six criteria</span>
                <span>Null-aware scoring</span>
              </div>
            </div>
            <div className="claude-architecture-card">
              <div className="claude-architecture-icon">
                <GitBranch size={20} strokeWidth={1.5} />
              </div>
              <span className="claude-card-index">
                Model-assisted reasoning
              </span>
              <h3>Bounded analysis with real tools.</h3>
              <p>
                The official Anthropic SDK configures structured outputs
                validated by Zod. Four event-scoped tools retrieve requirements,
                supplier profiles, original clause evidence and hypothetical
                cost projections. Invalid source references and cross-supplier
                claims are rejected.
              </p>
              <div className="claude-mini-pills">
                <span>Claude Sonnet configuration</span>
                <span>JSON Schema</span>
                <span>Tool use</span>
              </div>
            </div>
          </div>
          <div className="claude-architecture-bar">
            <span>React workspace</span>
            <ArrowRight size={15} strokeWidth={1.4} aria-hidden="true" />
            <span>Express API</span>
            <ArrowRight size={15} strokeWidth={1.4} aria-hidden="true" />
            <span>Procurement services</span>
            <ArrowRight size={15} strokeWidth={1.4} aria-hidden="true" />
            <span>PostgreSQL + local files</span>
          </div>
        </Section>

        <section
          className="claude-insight"
          aria-labelledby="claude-insight-title"
        >
          <div className="claude-insight-inner">
            <div className="claude-insight-top">
              <span>Scenario laboratory</span>
              <span>Supplier B · 5-year horizon</span>
            </div>
            <h2 id="claude-insight-title">
              What changes when escalation changes?
            </h2>
            <p>
              Supplier B starts with an evidenced 8% annual escalation.
              Recalculating a hypothetical 5% rate—without rewriting the
              contract—shows the financial significance of a possible
              negotiation.
            </p>
            <div className="claude-impact">
              <div>
                <span className="claude-impact-label">Current clause</span>
                <strong>
                  8<span>%</span>
                </strong>
              </div>
              <div className="claude-impact-arrow">
                <ArrowRight size={25} strokeWidth={1.3} aria-hidden="true" />
              </div>
              <div>
                <span className="claude-impact-label">Proposed scenario</span>
                <strong>
                  5<span>%</span>
                </strong>
              </div>
              <div className="claude-impact-result">
                <span>Five-year projected difference</span>
                <strong>R716,036.39</strong>
              </div>
            </div>
            <p className="claude-insight-disclaimer">
              Verified scenario arithmetic from the sample fixture. A proposed
              rate is not a supplier commitment, accepted offer or legal
              amendment.
            </p>
          </div>
        </section>

        <Section
          label="Evidence and governance"
          title="A recommendation must survive a source check."
          className="claude-evidence"
        >
          <div className="claude-evidence-grid">
            <div className="claude-evidence-item">
              <FileText size={21} strokeWidth={1.45} aria-hidden="true" />
              <h3>Contract clauses have identities.</h3>
              <p>
                PDF, DOCX and UTF-8 text uploads are broken into bounded source
                chunks. Extracted terms retain document, chunk, location and
                verbatim excerpt. Contradictory values are surfaced as unknown
                rather than silently chosen.
              </p>
            </div>
            <div className="claude-evidence-item">
              <Scale size={21} strokeWidth={1.45} aria-hidden="true" />
              <h3>Negotiation is a proposal, not an action.</h3>
              <p>
                The planned model output contains risks, mitigations, targets,
                fallbacks and a sequenced playbook. It neither emails suppliers
                nor signs agreements. Source-linked interpretations still
                require a legal and commercial reviewer.
              </p>
            </div>
            <div className="claude-evidence-item">
              <ShieldCheck size={21} strokeWidth={1.45} aria-hidden="true" />
              <h3>Decisions have an accountable owner.</h3>
              <p>
                Input changes increment the event revision. Stored analyses
                become stale, and acceptance of an outdated analysis is
                rejected. Human decisions, audit entries and prior source
                evidence remain persisted.
              </p>
            </div>
          </div>
        </Section>

        <Section
          label="Verification and boundaries"
          title="Built and tested locally. Live Claude remains an explicit checkpoint."
          className="claude-verification"
        >
          <div className="claude-verification-grid">
            <div>
              <span className="claude-proof-number">20</span>
              <span className="claude-proof-label">
                tests passed with the PostgreSQL test configuration
              </span>
            </div>
            <div>
              <span className="claude-proof-number">3</span>
              <span className="claude-proof-label">
                supported text-bearing upload types: PDF, DOCX and TXT
              </span>
            </div>
            <div>
              <span className="claude-proof-number">1</span>
              <span className="claude-proof-label">
                human review boundary for any commercial decision
              </span>
            </div>
          </div>
          <div className="claude-two-columns claude-verification-copy">
            <p>
              Executed local verification covered schema migrations, seed
              stability, upload/source traceability, document formats,
              three-supplier comparisons, scenario recalculation, human defer
              decisions and audit persistence after restarting the API.
            </p>
            <p>
              The central Anthropic lifecycle was not live-tested at the
              recorded checkpoint because no API key was configured. Missing
              credentials return HTTP 503 instead of a fabricated AI result.
              There is no multi-user authentication, public deployment,
              production legal assurance or OCR pipeline.
            </p>
          </div>
        </Section>

        <Section
          label="Technology stack"
          title="A compact stack with deliberate boundaries."
          className="claude-technology"
        >
          <p className="claude-section-lead">
            The application is a React and Express modular monolith. It uses
            PostgreSQL for durable decisions and the official Anthropic SDK for
            bounded, structured reasoning. No Python service, separate vector
            database, Redis, RAG index or cloud deployment is part of the
            inspected implementation.
          </p>
          <div className="claude-tech-grid">
            <div>
              <h3>Interface</h3>
              <p>
                A typed workspace for suppliers, documents, comparison, risk,
                negotiation, what-if exploration and decisions.
              </p>
              <div className="claude-tag-list">
                <span>React</span>
                <span>TypeScript</span>
                <span>Vite</span>
                <span>Tailwind CSS</span>
              </div>
            </div>
            <div>
              <h3>Application and data</h3>
              <p>
                Event-scoped routes, strict validation, source versioning,
                persistence and auditable human decisions.
              </p>
              <div className="claude-tag-list">
                <span>Node.js</span>
                <span>Express</span>
                <span>PostgreSQL</span>
                <span>Zod</span>
              </div>
            </div>
            <div>
              <h3>Document intelligence</h3>
              <p>
                Evidence-preserving parsing, chunk excerpts, conflict handling
                and structured term extraction contracts.
              </p>
              <div className="claude-tag-list">
                <span>PDF Parse</span>
                <span>Mammoth</span>
                <span>Anthropic SDK</span>
                <span>JSON Schema</span>
              </div>
            </div>
            <div>
              <h3>Decision engineering</h3>
              <p>
                Controlled cost formulas, weighted evaluation, proposed changes
                and tests of transactional boundaries.
              </p>
              <div className="claude-tag-list">
                <span>Deterministic TypeScript</span>
                <span>Vitest</span>
                <span>Supertest</span>
                <span>Docker Compose</span>
              </div>
            </div>
          </div>
          <button
            className="claude-button claude-button-dark claude-tech-trigger"
            type="button"
            onClick={() => setShowStack(true)}
          >
            <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" /> Tech
            stack
          </button>
        </Section>

        <section className="claude-closing">
          <div>
            <p className="claude-eyebrow">Engineering principle</p>
            <h2>
              Evidence first. Calculation second.{" "}
              <span>Human judgement always.</span>
            </h2>
            <p>
              Strong decision-support software makes the uncertainty visible,
              keeps the original source within reach and separates a suggestion
              from the authority to act.
            </p>
          </div>
        </section>
      </article>

      <footer className="claude-footer" ref={footerRef}>
        <Link className="claude-footer-back" to="/">
          Back to portfolio
        </Link>
        <button className="claude-footer-top" type="button" onClick={scrollTop}>
          <ArrowUp size={15} strokeWidth={1.7} /> Back to top
        </button>
      </footer>
      {showTop && !footerVisible && (
        <button
          type="button"
          className="claude-float-top"
          onClick={scrollTop}
          aria-label="Back to top"
        >
          <ArrowUp size={17} strokeWidth={1.7} aria-hidden="true" />
        </button>
      )}
      {showStack && <TechStackModal onClose={closeStack} />}
    </main>
  );
}
