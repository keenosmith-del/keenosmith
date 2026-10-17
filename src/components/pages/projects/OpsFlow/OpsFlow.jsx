import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUp, Layers3 } from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./OpsFlow.css";

const repository =
  "https://github.com/keenosmith-del/n8n-workflow-integration-opsflow";
const technicalBrief = "/documents/n8n-opsflow-technical-brief.pdf";

const featuredTechnologies = [
  "n8n",
  "NestJS",
  "PostgreSQL",
  "RabbitMQ",
  "Redis / BullMQ",
  "OpenTelemetry",
];

const technologyGroups = [
  {
    heading: "Frontend",
    skills: ["React", "TypeScript", "Vite", "Fetch API"],
  },
  {
    heading: "Application API",
    skills: [
      "Node.js",
      "NestJS",
      "REST APIs",
      "Swagger / OpenAPI",
      "DTO validation",
      "JWT",
      "Role-based access",
    ],
  },
  {
    heading: "Orchestration & integrations",
    note: "Two checked-in, versioned workflows published to the local n8n runtime.",
    skills: [
      "n8n",
      "HTTP webhooks",
      "HTTP Request nodes",
      "JSON Schema",
      "OAuth2 client credentials",
      "AES-256-GCM",
    ],
  },
  {
    heading: "Events & delivery",
    skills: [
      "RabbitMQ",
      "Redis",
      "BullMQ",
      "Transactional outbox",
      "Inbox deduplication",
      "Retry backoff",
      "Deadline reconciliation",
    ],
  },
  {
    heading: "Persistence & transactions",
    skills: [
      "PostgreSQL",
      "Prisma",
      "Serializable transactions",
      "Database constraints",
      "Append-only workflow versions",
      "Audit triggers",
    ],
  },
  {
    heading: "Operations & infrastructure",
    note: "OpenTofu defines Docker resources only; no remote cloud environment was deployed.",
    skills: [
      "Docker Compose",
      "nginx",
      "OpenTelemetry",
      "OTLP collector",
      "Jaeger",
      "Pino",
      "OpenTofu",
    ],
  },
];

const stages = [
  {
    number: "01",
    name: "Request",
    note: "An employee submits a justified purchase with a maximum amount.",
  },
  {
    number: "02",
    name: "Collect",
    note: "n8n requests finance clearance and supplier quotations.",
  },
  {
    number: "03",
    name: "Approve",
    note: "PostgreSQL holds the reservation and waits for an assigned manager.",
  },
  {
    number: "04",
    name: "Finalise",
    note: "An approved request produces one order and moves funds to spend.",
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
      className="opsflow-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="opsflow-modal"
        role="dialog"
        aria-modal="true"
        aria-label="OpsFlow technology stack"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="opsflow-modal-close"
          aria-label="Close tech stack"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="opsflow-modal-groups">
          {technologyGroups.map(({ heading, note, skills }) => (
            <div className="opsflow-modal-group" key={heading}>
              <span className="opsflow-modal-category">{heading}</span>
              {note && <p className="opsflow-modal-note">{note}</p>}
              <div className="opsflow-modal-pills">
                {skills.map((skill) => (
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

export default function OpsFlow() {
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
    <main className="opsflow-project">
      <Link className="opsflow-back" to="/">
        <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />
        <span>Back to portfolio</span>
      </Link>

      <article>
        <header className="opsflow-hero">
          <div className="opsflow-hero-inner">
            <div className="opsflow-hero-topline">
              <div className="opsflow-pill-list" aria-label="Core technologies">
                {featuredTechnologies.map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
              <time dateTime="2026-10">Built May 2026</time>
            </div>
            <h1>n8n Enterprise Workflow <span>&amp; Integration OpsFlow Platform</span></h1>
            <div className="opsflow-hero-bottom">
              <p className="opsflow-hero-description">
                OpsFlow is an enterprise procurement and integration platform I
                built to coordinate requests, budgets, supplier quotations,
                manager approvals and purchase orders. n8n handles the external
                workflow steps; a transactional application keeps every
                financial decision, retry and audit event accountable.
              </p>
              <div className="opsflow-hero-actions">
                <a
                  className="opsflow-button opsflow-button-dark"
                  href={repository}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={githubSvg}
                    className="opsflow-github-icon"
                    alt=""
                    aria-hidden="true"
                  />
                  Source
                </a>
                <button
                  className="opsflow-button opsflow-button-disabled"
                  type="button"
                  disabled
                >
                  Visit platform
                </button>
              </div>
              <p className="opsflow-hero-note">
                Verified in a local Docker environment with finance and supplier
                simulators. Public hosting has not been configured. For a
                walkthrough,{" "}
                <a href="mailto:keenosmith@kailor.co.za">get in touch</a>.
              </p>
            </div>
          </div>
        </header>

        <section className="opsflow-section" id="opsflow-summary">
          <div className="opsflow-section-label">Project summary</div>
          <div className="opsflow-section-copy">
            <h2>
              Automating a process is easy. Preserving its decisions is harder.
            </h2>
            <div className="opsflow-two-columns">
              <p>
                Procurement crosses several boundaries: a request belongs to an
                employee; suppliers and finance services contribute evidence; a
                manager authorises the purchase; and an order must not exist
                until the right conditions are met. Treating all of that as one
                long-running workflow makes failure recovery fragile.
              </p>
              <p>
                I designed OpsFlow so automation carries information between
                steps without becoming the financial source of truth. PostgreSQL
                owns requests, reservations, approvals and orders. n8n performs
                bounded integrations and returns results through authenticated,
                idempotent callbacks.
              </p>
            </div>
            <div className="opsflow-summary-action">
              <a
                className="opsflow-button opsflow-button-soft"
                href={technicalBrief}
                target="_blank"
                rel="noopener noreferrer"
              >
                Technical brief
              </a>
            </div>
          </div>
        </section>

        <section
          className="opsflow-journey"
          aria-labelledby="opsflow-journey-title"
        >
          <div className="opsflow-journey-inner">
            <span className="opsflow-eyebrow">
              A complete procurement cycle
            </span>
            <h2 id="opsflow-journey-title">
              From intent to an authorised order.
            </h2>
            <p className="opsflow-journey-intro">
              Four visible checkpoints, one durable business record. Finance and
              supplier integrations can be retried; a manager’s approval cannot
              be silently invented.
            </p>
            <div className="opsflow-stage-grid">
              {stages.map((stage) => (
                <div className="opsflow-stage" key={stage.number}>
                  <h3>{stage.name}</h3>
                  <p>{stage.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="opsflow-section opsflow-orchestration">
          <div className="opsflow-section-label">n8n orchestration</div>
          <div className="opsflow-section-copy">
            <h2>Two workflows. One accountable execution.</h2>
            <p className="opsflow-section-intro">
              I chose a deliberate boundary between gathering procurement
              evidence and carrying out an approved purchase. Both n8n templates
              are checked into the repository, versioned and published during
              local startup.
            </p>
            <div className="opsflow-phase-stack">
              <div className="opsflow-phase">
                <div className="opsflow-phase-id">Collection</div>
                <div>
                  <h3>Get the facts before asking for a decision.</h3>
                  <p>
                    The <strong>procurement-collect-v1</strong> webhook obtains
                    scoped finance and supplier credentials, calls their HTTP
                    endpoints and returns structured results. The NestJS
                    callback validates supplier quotes, selects the cheapest
                    eligible quote and reserves departmental funds atomically
                    before assigning an approval.
                  </p>
                  <div
                    className="opsflow-inline-flow"
                    aria-label="Collection workflow steps"
                  >
                    <span>Webhook</span>
                    <ArrowRight size={13} aria-hidden="true" />
                    <span>Finance</span>
                    <ArrowRight size={13} aria-hidden="true" />
                    <span>Suppliers</span>
                    <ArrowRight size={13} aria-hidden="true" />
                    <span>Callback</span>
                  </div>
                </div>
              </div>
              <div className="opsflow-wait-state">
                <span>
                  Human approval lives in PostgreSQL, not a paused n8n
                  execution.
                </span>
              </div>
              <div className="opsflow-phase">
                <div className="opsflow-phase-id">Finalisation </div>
                <div>
                  <h3>Only an authorised purchase becomes an order.</h3>
                  <p>
                    The <strong>procurement-finalize-v1</strong> webhook is
                    triggered after the assigned manager approves. Its
                    authenticated call finalises the order through NestJS, where
                    uniqueness constraints and serializable transactions move
                    the reserved amount into spent funds once, without duplicate
                    purchases.
                  </p>
                  <div
                    className="opsflow-inline-flow"
                    aria-label="Finalisation workflow steps"
                  >
                    <span>Approval</span>
                    <ArrowRight size={13} aria-hidden="true" />
                    <span>Webhook</span>
                    <ArrowRight size={13} aria-hidden="true" />
                    <span>Order</span>
                    <ArrowRight size={13} aria-hidden="true" />
                    <span>Audit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="opsflow-section opsflow-messaging">
          <div className="opsflow-section-label">Reliable delivery</div>
          <div className="opsflow-section-copy">
            <h2>Messages can be repeated. Purchases cannot.</h2>
            <div className="opsflow-engineering-grid">
              <div>
                <h3>Transactional outbox</h3>
                <p>
                  A request and its outgoing event commit together. A publisher
                  uses PostgreSQL row locks and RabbitMQ publisher confirms, so
                  a crash may repeat a message but cannot silently lose a
                  committed request.
                </p>
              </div>
              <div>
                <h3>RabbitMQ to BullMQ</h3>
                <p>
                  RabbitMQ handles durable domain-event delivery. Inbox receipts
                  and stable job IDs prevent repeated dispatch; Redis-backed
                  BullMQ owns five delivery attempts with exponential backoff
                  and webhook timeouts.
                </p>
              </div>
              <div>
                <h3>Callback idempotency</h3>
                <p>
                  Unique execution, attempt and phase receipts reject duplicate
                  callbacks. Earlier attempts cannot mutate current requests,
                  and late messages cannot reopen completed, rejected or expired
                  work.
                </p>
              </div>
              <div>
                <h3>Deadline recovery</h3>
                <p>
                  PostgreSQL stores authoritative deadlines. A reconciler
                  rebuilds delayed jobs after Redis interruptions, releases
                  expired reservations and records exceptions for administrative
                  recovery.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="opsflow-section opsflow-business">
          <div className="opsflow-section-label">Business integrity</div>
          <div className="opsflow-section-copy">
            <h2>
              Budget reservations must survive the happy path; and every other
              path.
            </h2>
            <div className="opsflow-outcomes">
              <div>
                <span>Approved</span>
                <p>
                  One purchase order is created and a reserved amount moves to
                  spend.
                </p>
              </div>
              <div>
                <span>Rejected</span>
                <p>
                  The manager's decision closes the request and releases its
                  reservation.
                </p>
              </div>
              <div>
                <span>Insufficient budget</span>
                <p>
                  The request stops without creating an approval, reservation or
                  order.
                </p>
              </div>
              <div>
                <span>Failed or timed out</span>
                <p>
                  An exception is recorded; a controlled retry starts another
                  attempt without duplicating history.
                </p>
              </div>
            </div>
            <p className="opsflow-section-intro">
              Admins can publish immutable approval-rule versions, edit
              integration settings and recover exceptions. Executions retain
              their starting workflow definition; a rules update does not
              rewrite decisions already in progress.
            </p>
          </div>
        </section>

        <section className="opsflow-section opsflow-security">
          <div className="opsflow-section-label">
            Security and observability
          </div>
          <div className="opsflow-section-copy">
            <h2>
              Operational visibility without exposing integration secrets.
            </h2>
            <div className="opsflow-engineering-grid">
              <div>
                <h3>Role-bound action</h3>
                <p>
                  Employees own their request visibility; assigned managers
                  alone decide approvals; admins operate integrations, rules and
                  recovery. NestJS validates all protected mutations.
                </p>
              </div>
              <div>
                <h3>Private credentials</h3>
                <p>
                  Integration secrets use AES-256-GCM at rest. A server-side
                  adapter provides API-key or local OAuth2 client-credentials
                  headers without returning the secret to the browser.
                </p>
              </div>
              <div>
                <h3>Traceable work</h3>
                <p>
                  OpenTelemetry instruments the API and emits traces through an
                  OTLP collector to Jaeger. Correlation IDs, workflow versions,
                  attempts and sanitized error details remain with each
                  execution.
                </p>
              </div>
              <div>
                <h3>Local deployment boundary</h3>
                <p>
                  Docker Compose runs the application and supporting services.
                  OpenTofu defines optional Docker network and volume
                  resources—not a provisioned cloud platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="opsflow-proof"
          aria-labelledby="opsflow-proof-heading"
        >
          <div className="opsflow-proof-inner">
            <span className="opsflow-eyebrow">
              Executed validation / 3 October 2026
            </span>
            <h2 id="opsflow-proof-heading">
              The recovery path was tested, not assumed.
            </h2>
            <div className="opsflow-proof-grid">
              <div>
                <strong>02</strong>
                <span>Versioned n8n workflow templates</span>
              </div>
              <div>
                <strong>04</strong>
                <span>End-to-end business scenarios</span>
              </div>
              <div>
                <strong>09</strong>
                <span>Local Compose services started</span>
              </div>
              <div>
                <strong>21</strong>
                <span>API paths in generated OpenAPI</span>
              </div>
            </div>
            <p>
              The repository records live local webhooks, RabbitMQ publication
              and inbox receipts, manager approvals, a completed purchase order,
              recovery after simulated supplier failure, and an actual timeout.
              Separate invariant checks passed callback deduplication,
              stale-phase rejection, budget balancing and audit-history
              protection.
            </p>
          </div>
        </section>

        <section className="opsflow-section opsflow-technology">
          <div className="opsflow-section-label">Technology</div>
          <div className="opsflow-section-copy">
            <h2>Purposeful separation between orchestration and authority.</h2>
            <p className="opsflow-section-intro">
              React provides the operations workspace; NestJS and Prisma enforce
              business rules; PostgreSQL owns durable state; n8n coordinates
              HTTP integration steps; RabbitMQ, Redis and BullMQ handle
              delivery; and OpenTelemetry exposes execution behaviour.
            </p>
            <div className="opsflow-technology-grid">
              <div>
                <h3>Workflow execution</h3>
                <p>
                  Two checked-in n8n templates for collection and finalisation.
                  Webhooks accept events, but only authenticated callbacks
                  change business state.
                </p>
                <div className="opsflow-tech-tags">
                  <span>n8n</span>
                  <span>HTTP</span>
                  <span>OAuth2</span>
                </div>
              </div>
              <div>
                <h3>Application and data</h3>
                <p>
                  A NestJS REST gateway, role checks and serializable PostgreSQL
                  transactions protect budget and procurement invariants.
                </p>
                <div className="opsflow-tech-tags">
                  <span>NestJS</span>
                  <span>PostgreSQL</span>
                  <span>Prisma</span>
                </div>
              </div>
              <div>
                <h3>Delivery infrastructure</h3>
                <p>
                  RabbitMQ domain events, a transactional outbox and a
                  Redis/BullMQ worker decouple a committed request from retries
                  and timeouts.
                </p>
                <div className="opsflow-tech-tags">
                  <span>RabbitMQ</span>
                  <span>Redis</span>
                  <span>BullMQ</span>
                </div>
              </div>
              <div>
                <h3>Operations and observability</h3>
                <p>
                  Docker Compose hosts the local stack; OpenTelemetry, Pino and
                  Jaeger connect correlation IDs with service traces.
                </p>
                <div className="opsflow-tech-tags">
                  <span>Docker</span>
                  <span>OpenTelemetry</span>
                  <span>Jaeger</span>
                </div>
              </div>
            </div>
            <button
              className="opsflow-button opsflow-button-dark opsflow-tech-trigger"
              type="button"
              onClick={() => setShowStack(true)}
            >
              <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />
              Tech stack
            </button>
          </div>
        </section>

        <section className="opsflow-closing">
          <div>
            <span className="opsflow-eyebrow">Engineering perspective</span>
            <h2>
              A reliable automation system knows when to stop and wait for a
              person.
            </h2>
            <p>
              OpsFlow demonstrates how I approach enterprise integration: make
              business state durable, let automation work at the edges, preserve
              a human decision point, and design failure handling before calling
              a workflow complete.
            </p>
          </div>
        </section>
      </article>

      <footer ref={footerRef} className="opsflow-footer">
        <Link to="/" className="opsflow-footer-back">

          Back to portfolio
        </Link>
        <button
          type="button"
          className="opsflow-footer-top"
          onClick={scrollTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={15} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </footer>

      {showTop && !footerVisible && (
        <button
          className="opsflow-floating-top"
          type="button"
          onClick={scrollTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={15} strokeWidth={1.7} aria-hidden="true" />
        </button>
      )}
      {showStack && <TechStackModal onClose={closeStack} />}
    </main>
  );
}
