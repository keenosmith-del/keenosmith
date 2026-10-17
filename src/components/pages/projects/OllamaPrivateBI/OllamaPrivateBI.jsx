import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUp, Layers3 } from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./OllamaPrivateBI.css";

const sourceRepository =
  "https://github.com/keenosmith-del/ollama-private-business-intelligence";
const technicalBrief = "/documents/ollama-private-bi-technical-brief.pdf";

const technologies = [
  "Ollama",
  "Qwen 2.5",
  "nomic-embed-text",
  "PostgreSQL",
  "pgvector",
  "FastAPI",
];

const technologyGroups = [
  {
    heading: "Local AI and retrieval",
    note: "Real local model inference was exercised during the completion audit.",
    skills: [
      "Ollama",
      "Qwen 2.5 (1.5B)",
      "nomic-embed-text",
      "768-dimensional embeddings",
      "Retrieval-augmented analysis",
      "Evidence-ID validation",
    ],
  },
  {
    heading: "Frontend",
    skills: ["React 18", "TypeScript", "Vite", "React Router", "Fetch API", "Lucide React"],
  },
  {
    heading: "Application API and identity",
    skills: [
      "Node.js",
      "Express 4",
      "TypeScript",
      "Zod",
      "JWT",
      "HttpOnly refresh cookies",
      "bcrypt",
      "Helmet",
      "Rate limiting",
    ],
  },
  {
    heading: "AI runtime and document processing",
    skills: ["Python", "FastAPI", "Pydantic", "psycopg", "PDF", "DOCX", "XLSX", "CSV", "TXT"],
  },
  {
    heading: "Data and persistence",
    skills: [
      "PostgreSQL",
      "pgvector",
      "pgcrypto",
      "Parameterized SQL",
      "SQL migrations",
      "Document ACLs",
      "Transactional imports",
    ],
  },
  {
    heading: "Local infrastructure and validation",
    note: "Containerised local demonstration; no verified public deployment or air-gapped certification.",
    skills: ["Docker", "Docker Compose", "Playwright", "Node test runner", "pytest", "Ruff", "GitHub Actions"],
  },
];

const pathSteps = [
  { label: "01", name: "Classify", text: "Choose fixed business metrics, document retrieval or a hybrid response." },
  { label: "02", name: "Calculate", text: "Run organisation-scoped SQL for periods, revenue, recorded cost and profit." },
  { label: "03", name: "Retrieve", text: "Search permission-filtered pgvector chunks from indexed local files." },
  { label: "04", name: "Constrain", text: "Let local Qwen select evidence identifiers, never invent new financial totals." },
  { label: "05", name: "Present", text: "Return exact metrics, cited excerpts, limitations and a saved analysis record." },
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
      className="ollama-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        className="ollama-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Project technology stack"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="ollama-modal-close"
          ref={closeButton}
          type="button"
          onClick={close}
          aria-label="Close tech stack"
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="ollama-modal-groups">
          {technologyGroups.map((group) => (
            <div className="ollama-modal-group" key={group.heading}>
              <span className="ollama-modal-category">{group.heading}</span>
              {group.note && <p className="ollama-modal-note">{group.note}</p>}
              <div className="ollama-modal-pills">
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OllamaPrivateBI() {
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
    <main className="ollama-project">
      <Link className="ollama-back" to="/">
        <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />
        Back to portfolio
      </Link>

      <article>
        <header className="ollama-hero">
          <div className="ollama-hero-inner">
            <div className="ollama-hero-topline">
              <div className="ollama-pills" aria-label="Core technology">
                {technologies.map((name) => <span key={name}>{name}</span>)}
              </div>
              <time dateTime="2026">Built 2026</time>
            </div>

            <h1>Private intelligence.<span>Business evidence.</span></h1>

            <div className="ollama-hero-bottom">
              <div className="ollama-hero-copy">
                <p>
                  I built a local business intelligence workspace that brings financial records,
                  internal documents and a self-hosted language model into one governed analysis
                  workflow. Revenue and profitability come from SQL. Ollama helps connect questions
                  to relevant evidence without sending business material to a hosted LLM.
                </p>
                <span>Local-first engineering · Fictional demonstration data · No public deployment</span>
              </div>
              <div className="ollama-hero-controls">
                <div className="ollama-hero-actions">
                  <a className="ollama-button ollama-button-dark" href={sourceRepository} target="_blank" rel="noopener noreferrer">
                    <img src={githubSvg} className="ollama-github-icon" alt="" aria-hidden="true" />
                    Source
                  </a>
                  <button className="ollama-button ollama-button-disabled" disabled type="button">Visit platform</button>
                </div>
                <p className="ollama-platform-note">
                  This application was verified locally rather than deployed publicly.
                  View the source, or <a href="mailto:keenosmith@kailor.co.za">contact me</a> for a walkthrough.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="ollama-section" id="ollama-overview">
          <div className="ollama-section-label">The brief</div>
          <div className="ollama-section-copy">
            <h2>The question isn't just what AI can answer. It's what it can prove.</h2>
            <div className="ollama-two-col">
              <p>
                A finance team needs a reliable quarter-on-quarter comparison.
                An operations lead wants the relevant supplier delay report.
                Both may ask the same question, but neither should receive an
                invented figure or an unsupported explanation.
              </p>
              <p>
                The application takes those responsibilities apart: relational calculations
                establish measurable facts, semantic retrieval finds source documents, and
                a constrained local model selects relevant evidence. The response keeps
                the source and its limitations visible.
              </p>
            </div>
            <div className="ollama-summary-action">
              <a className="ollama-button ollama-button-soft" href={technicalBrief} target="_blank" rel="noopener noreferrer">Technical brief</a>
            </div>
          </div>
        </section>

        <section className="ollama-question-section" aria-labelledby="ollama-question-title">
          <div className="ollama-question-inner">
            <p className="ollama-small-label">A representative business question</p>
            <h2 id="ollama-question-title">“Why did Q2 revenue decline?”</h2>
            <div className="ollama-question-details">
              <div className="ollama-datum">
                <span>Recorded Q1 revenue</span>
                <strong>R200,000</strong>
              </div>
              <div className="ollama-datum">
                <span>Recorded Q2 revenue</span>
                <strong>R120,000</strong>
              </div>
              <div className="ollama-datum">
                <span>Quarterly change</span>
                <strong>−40.00%</strong>
              </div>
            </div>
            <p className="ollama-question-explanation">
              These values come from a synthetic 2027 audit dataset and were checked against PostgreSQL.
              Management notes mention supplier delays and disrupted order processing, but the system
              presents them as document statements—not proven causes or quantified losses.
            </p>
          </div>
        </section>

        <section className="ollama-section ollama-reasoning">
          <div className="ollama-section-label">Analysis pipeline</div>
          <div className="ollama-section-copy">
            <h2>A question crosses five deliberate boundaries.</h2>
            <p className="ollama-section-intro">
              A single question can require database arithmetic and retrieved narrative context.
              I kept the handoff explicit so the model's role cannot expand into calculating,
              changing or inventing business records.
            </p>
            <div className="ollama-steps">
              {pathSteps.map((step) => (
                <div className="ollama-step" key={step.label}>
                  <span>{step.label}</span>
                  <div>
                    <h3>{step.name}</h3>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ollama-section ollama-architecture">
          <div className="ollama-section-label">System architecture</div>
          <div className="ollama-section-copy">
            <h2>One local deployment. Separate application and inference responsibilities.</h2>
            <p className="ollama-section-intro">
              Node/Express owns client access and permission checks; Python/FastAPI handles
              extraction, embeddings, retrieval and question analysis. Both use an
              organisation-scoped PostgreSQL database, while Ollama supplies the local model runtime.
            </p>
            <div className="ollama-architecture-grid">
              <div>
                <span className="ollama-architecture-index">Application boundary</span>
                <h3>React and Express</h3>
                <p>
                  A typed React workspace exposes an overview, AI Analyst, document library,
                  CSV imports, analytics and administration. Express validates requests,
                  enforces roles and manages access/refresh sessions.
                </p>
              </div>
              <div>
                <span className="ollama-architecture-index">Data and inference</span>
                <h3>FastAPI and Ollama</h3>
                <p>
                  FastAPI processes PDF, DOCX, XLSX, CSV and TXT content, stores 768-dimensional
                  embeddings produced by nomic-embed-text, retrieves pgvector evidence and
                  constrains Qwen 2.5 to selecting eligible source identifiers.
                </p>
              </div>
              <div>
                <span className="ollama-architecture-index">Source of record</span>
                <h3>PostgreSQL</h3>
                <p>
                  Fixed parameterized SQL calculates revenue, expenses, customer-attributed
                  gross profit and trends. Transactions protect imports and indexed chunks,
                  while migrations, document grants and analysis history remain persistent.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="ollama-section ollama-permissions">
          <div className="ollama-section-label">Private by design</div>
          <div className="ollama-section-copy">
            <h2>Document access is part of retrieval, not an afterthought.</h2>
            <div className="ollama-permission-grid">
              <div>
                <h3>Organisation isolation</h3>
                <p>
                  Analytics and vector retrieval are scoped to the authenticated organisation.
                  The private AI runtime accepts a shared internal token from the application
                  gateway and has no host-published port in the default Compose setup.
                </p>
              </div>
              <div>
                <h3>Source-level permissions</h3>
                <p>
                  Restricted documents can be granted to specific users or roles.
                  The same access rules govern library metadata, vector hits and saved results;
                  revoking access also blocks future reads of stored source excerpts.
                </p>
              </div>
              <div>
                <h3>Authentication and sessions</h3>
                <p>
                  JWT access tokens live in browser memory, with rotating HttpOnly refresh cookies.
                  Bootstrap closes after the first admin; disabling an account or replaying a
                  revoked refresh session invalidates subsequent access.
                </p>
              </div>
              <div>
                <h3>Availability without a model</h3>
                <p>
                  Model readiness is checked and failures are made visible. Deterministic business
                  queries remain separate from generation. Upload errors retain status and bytes
                  for inspection or manual retry rather than silently vanishing.
                </p>
              </div>
            </div>
            <p className="ollama-caveat">
              The default local Compose workflow keeps application inference and business material
              in locally hosted services. Setup still downloads images and models; the project is
              not certified air-gapped or production-hardened.
            </p>
          </div>
        </section>

        <section className="ollama-section ollama-engineering">
          <div className="ollama-section-label">Implementation and testing</div>
          <div className="ollama-section-copy">
            <h2>The controls were tested against real models and real database state.</h2>
            <p className="ollama-section-intro">
              During the October 2026 completion audit, the local environment ran the Ollama models,
              PostgreSQL migrations and an authenticated browser. Tests were not limited to mocked
              assistant responses.
            </p>
            <div className="ollama-engineering-grid">
              <div><strong>82</strong><span>synthetic integration assertions</span><p>Business calculations, five document formats, imports, access restrictions, indexing, history and concurrency.</p></div>
              <div><strong>11</strong><span>real-inference business questions</span><p>Grounded analysis of revenue, customer profit, expenses, policies and operational context.</p></div>
              <div><strong>13</strong><span>Python unit tests passed</span><p>Complemented by Node tests, production builds and real model-failure recovery checks.</p></div>
              <div><strong>2</strong><span>Chromium end-to-end journeys</span><p>Login, import, retrieval, real analysis, saved history, document permissions and administration.</p></div>
            </div>
          </div>
        </section>

        <section className="ollama-section ollama-technology">
          <div className="ollama-section-label">Technology</div>
          <div className="ollama-section-copy">
            <h2>Local inference, conventional application engineering.</h2>
            <p className="ollama-section-intro">
              Ollama and pgvector are central to the private document workflow, but the product also
              depends on a conventional full-stack foundation: a typed client, controlled API,
              relational integrity and an isolated processing service.
            </p>
            <div className="ollama-tech-grid">
              <div><h3>Frontend and user experience</h3><p>React presents operational metrics, analyst history, document ingestion, semantic search and user access controls.</p><div className="ollama-tech-tags"><span>React</span><span>TypeScript</span><span>Vite</span><span>Fetch</span></div></div>
              <div><h3>Local AI and retrieval</h3><p>Qwen 2.5 selects eligible retrieved evidence. nomic-embed-text encodes document chunks into pgvector's 768-dimensional index.</p><div className="ollama-tech-tags"><span>Ollama</span><span>Qwen 2.5</span><span>nomic-embed-text</span><span>pgvector</span></div></div>
              <div><h3>API and processing</h3><p>Express enforces identity, access and validation; FastAPI isolates extraction, inference and retrieval services.</p><div className="ollama-tech-tags"><span>Node.js</span><span>Express</span><span>FastAPI</span><span>Python</span><span>Zod</span></div></div>
              <div><h3>Persistence and infrastructure</h3><p>PostgreSQL stores financial records, document chunks, ACLs and audit history; Docker Compose runs the local service boundaries.</p><div className="ollama-tech-tags"><span>PostgreSQL</span><span>SQL</span><span>Docker Compose</span><span>Playwright</span></div></div>
            </div>
            <button
              className="ollama-button ollama-button-dark ollama-tech-trigger"
              type="button"
              onClick={() => setShowStack(true)}
            >
              <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />
              Tech stack
            </button>
          </div>
        </section>

        <section className="ollama-closing">
          <div>
            <p className="ollama-small-label">Engineering outcome</p>
            <h2>Financial truth in SQL. Business context in documents. Inference stays local.</h2>
            <p>
              The working application unifies recorded business metrics and permission-filtered
              internal evidence without giving a language model control over financial calculations.
              Its local demonstration covers ingestion, retrieval, analysis, identity, audit and
              recovery paths. External production deployment and independent security hardening remain separate work.
            </p>
          </div>
        </section>
      </article>

      <footer className="ollama-footer" ref={footerRef}>
        <Link to="/" className="ollama-footer-back">Back to portfolio</Link>
        <button className="ollama-footer-top" type="button" aria-label="Back to top" onClick={scrollToTop}>
          <ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </footer>

      {showTop && !footerVisible && (
        <button className="ollama-floating-top" type="button" aria-label="Back to top" onClick={scrollToTop}>
          <ArrowUp size={17} strokeWidth={1.7} aria-hidden="true" />
        </button>
      )}

      {showStack && <TechStackModal close={closeStack} />}
    </main>
  );
}
