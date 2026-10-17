import ProjectNavigation from "../shared/ProjectNavigation.jsx";
import useProjectPage from "../shared/useProjectPage.js";
import ProjectModal from "../shared/ProjectModal.jsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Layers3 } from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./TelecomBilling.css";

const repository =
  "https://github.com/keenosmith-del/telecomms-billing-management";
const technicalBrief = "/documents/telecom-billing-technical-brief.pdf";

const featured = [
  "Angular 22",
  "Java 21",
  "Spring Boot 4",
  "Apache Kafka",
  "PostgreSQL",
  "Redis",
];
const stack = [
  {
    heading: "Frontend",
    skills: [
      "Angular 22",
      "TypeScript",
      "Angular Material",
      "Angular Router",
      "Reactive Forms",
      "HttpClient",
      "nginx",
    ],
  },
  {
    heading: "Backend & authentication",
    skills: [
      "Java 21",
      "Spring Boot 4.1",
      "Spring Web",
      "Spring Security",
      "Spring Validation",
      "JWT",
      "BCrypt",
      "Role-based access",
      "Spring Actuator",
    ],
  },
  {
    heading: "Billing & domain persistence",
    note: "PostgreSQL is authoritative; currency calculations use BigDecimal, not floating point.",
    skills: [
      "PostgreSQL 17",
      "Flyway",
      "Spring Data JPA",
      "JDBC",
      "BigDecimal",
      "Serializable domain checks",
      "Optimistic locking",
      "Immutable ledger",
      "UTC calendar rules",
    ],
  },
  {
    heading: "Streaming & reliability",
    skills: [
      "Apache Kafka 3.9",
      "Spring Kafka",
      "Transactional outbox",
      "Batch metering",
      "Delivery receipts",
      "Event ID deduplication",
      "Kafka DLT",
      "Lag monitoring",
      "Reconciliation",
    ],
  },
  {
    heading: "Caching & infrastructure",
    note: "Local Compose uses one Kafka broker; this is not a highly available cluster.",
    skills: [
      "Redis 7",
      "Versioned cache keys",
      "Database fallback",
      "Docker Compose",
      "Maven",
      "GitHub Actions configuration",
      "nginx reverse proxy",
    ],
  },
  {
    heading: "Documented, not connected",
    note: "These are production migration requirements or simulated workflows, not live external integrations.",
    skills: [
      "OIDC migration plan",
      "TLS production requirement",
      "Simulated payment recording",
      "Fictional telecom operator",
    ],
  },
];

const stages = [
  {
    label: "Subscribe",
    text: "Activate a plan and persist its effective-dated commercial terms.",
  },
  {
    label: "Meter",
    text: "Publish durable usage deliveries; commit unique business events once.",
  },
  {
    label: "Rate",
    text: "Apply UTC period segments, pooled allowance and BigDecimal charges.",
  },
  {
    label: "Settle",
    text: "Finalise an immutable invoice and record an idempotent payment.",
  },
];

const protections = [
  {
    heading: "Two identities, two safeguards",
    text: "A producer delivery receipt prevents replaying a physical Kafka delivery; a unique usage event ID prevents duplicate business consumption.",
  },
  {
    heading: "Invoice waits for metering",
    text: "Finalisation refuses to run while accepted usage lacks a durable processing or failure receipt. A finalised period then rejects new ingestion.",
  },
  {
    heading: "History survives plan edits",
    text: "Price and allowance are snapshotted into effective-dated service segments. Catalogue edits cannot silently reprice an existing segment.",
  },
  {
    heading: "The ledger is the balance",
    text: "Invoice lines remain immutable. Payments and signed adjustments are append-only records, and the current due is calculated from the ledger.",
  },
];

function TechStackModal({ onClose }) {
  return <ProjectModal onClose={onClose} groups={stack} />;
}

export default function TelecomBilling() {
  const pageRef = useProjectPage();
  const [showStack, setShowStack] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [replayed, setReplayed] = useState(false);
  const footerRef = useRef(null);
  const closeStack = useCallback(() => setShowStack(false), []);
  useEffect(() => {
    const scroll = () => setShowTop(window.scrollY > 300);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
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
    <main ref={pageRef} className="project-case-study telecom-project">
      <ProjectNavigation className="telecom-back" />
      <article>
        <header className="telecom-hero">
          <div className="telecom-hero-inner">
            <div className="telecom-hero-topline">
              <div
                className="telecom-pill-list"
                aria-label="Featured technologies"
              >
                {featured.map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
              <time dateTime="2026-05" >May 2026</time>
            </div>
            <h1>Telecommunications <span>Billing &amp; Subscription Management</span></h1>
            <div className="telecom-hero-bottom">
              <p className="telecom-hero-description">
                A telecommunications subscription and billing platform built
                around a deceptively difficult promise: handle changing plans
                and duplicated usage streams without charging a customer twice.
              </p>
              <div className="telecom-hero-actions">
                <a
                  className="telecom-button telecom-button-dark"
                  href={repository}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="telecom-github-icon"
                    src={githubSvg}
                    alt=""
                    aria-hidden="true"
                  />
                  Source
                </a>
                <button
                  className="telecom-button telecom-button-disabled"
                  type="button"
                  disabled
                >
                  Visit platform
                </button>
              </div>
              <p className="telecom-hero-note">
                Maintaining this many live deployments would be a project of its
                own. The source is available, or you can{" "}
                <a href="mailto:keenosmith@kailor.co.za">contact me</a> for a
                walkthrough.
              </p>
            </div>
          </div>
        </header>

        <section className="telecom-section" aria-labelledby="telecom-overview">
          <div className="telecom-section-label">Project overview</div>
          <div className="telecom-section-body">
            <h2 id="telecom-overview">
              Telecom billing is a consistency problem disguised as a pricing
              problem.
            </h2>
            <div className="telecom-text-columns">
              <p>
                A plan is not just its current price. Its history determines how
                a changing subscription is billed, which data allowance applies,
                and whether a usage event is valid for a specific date.
              </p>
              <p>
                I built an Angular customer and administration experience over a
                Java/Spring application. PostgreSQL preserves billing truth;
                Kafka transports metered events; Redis accelerates reads without
                becoming a dependency for correctness.
              </p>
            </div>
            <div className="telecom-summary-action">
              <a
                className="telecom-button telecom-button-soft"
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
          className="telecom-proof"
          aria-labelledby="telecom-proof-title"
        >
          <div className="telecom-proof-inner">
            <div className="telecom-proof-intro">
              <div className="telecom-proof-intro-copy">
                <p className="telecom-eyebrow">
                  Executed Kafka workload · May 2026
                </p>
                <h2 id="telecom-proof-title">
                  50,000 deliveries.
                  <br />
                  45,000 distinct events.
                </h2>
                <p>
                  The local integration run deliberately duplicated one in ten
                  messages. The same 50,000 deliveries were then replayed. The
                  unique consumption and invoice did not change.
                </p>
              </div>
              <div
                className="telecom-proof-tabs"
                role="group"
                aria-label="Compare original and replayed deliveries"
              >
                <button
                  type="button"
                  className={!replayed ? "is-active" : ""}
                  onClick={() => setReplayed(false)}
                  aria-pressed={!replayed}
                >
                  Initial run
                </button>
                <button
                  type="button"
                  className={replayed ? "is-active" : ""}
                  onClick={() => setReplayed(true)}
                  aria-pressed={replayed}
                >
                  After full replay
                </button>
              </div>
            </div>
            <div className="telecom-proof-statline" aria-live="polite">
              <div>
                <span>Kafka deliveries</span>
                <strong>50,000</strong>
              </div>
              <div>
                <span>Unique events processed</span>
                <strong>45,000</strong>
              </div>
              <div>
                <span>Duplicate deliveries</span>
                <strong>5,000</strong>
              </div>
              <div>
                <span>Extra consumption on replay</span>
                <strong>0 MB</strong>
              </div>
            </div>
            <div
              className="telecom-stream"
              aria-label="45,000 unique events and 5,000 duplicates from 50,000 deliveries"
            >
              <div className="telecom-stream-bar">
                <span className="telecom-stream-unique" />
                <span className="telecom-stream-duplicate" />
              </div>
              <div className="telecom-stream-labels">
                <span>
                  <i className="telecom-key-unique" /> 90% committed once
                </span>
                <span>
                  <i className="telecom-key-duplicate" /> 10% ignored as
                  duplicates
                </span>
              </div>
            </div>
            <p className="telecom-proof-footnote">
              {replayed
                ? "After replay: 45,000 MB remains the authoritative consumption; the finalised invoice is unchanged."
                : "Original run: 45,000 distinct 1 MB usage events produced 45,000 MB consumption."}{" "}
              These are recorded local test results, not a live demonstration
              running in this page.
            </p>
          </div>
        </section>

        <section
          className="telecom-section"
          aria-labelledby="telecom-journey-title"
        >
          <div className="telecom-section-label">System journey</div>
          <div className="telecom-section-body">
            <h2 id="telecom-journey-title">
              One subscription, four accountable stages.
            </h2>
            <div className="telecom-stage-list">
              {stages.map((stage) => (
                <div className="telecom-stage" key={stage.title || stage.label}>

                  <h3>{stage.label}</h3>
                  <p>{stage.text}</p>
                </div>
              ))}
            </div>
            <p className="telecom-section-tail">
              The application uses a transactional outbox and at-least-once
              Kafka delivery. Its uniqueness constraints and receipts produce
              effectively-once business outcomes, rather than claiming
              exactly-once processing across Kafka and PostgreSQL.
            </p>
          </div>
        </section>

        <section
          className="telecom-invoice"
          aria-labelledby="telecom-invoice-title"
        >
          <div className="telecom-invoice-inner">
            <div className="telecom-invoice-heading">
              <p className="telecom-eyebrow">
                Deterministic May 2026 scenario
              </p>
              <h2 id="telecom-invoice-title">
                Plan changes.
                <br />
                No mystery maths.
              </h2>
              <p>
                Starter 5 GB from 1–2 May; Everyday 20 GB from 3 May.
                The monthly allowance is prorated by segment, while actual usage
                remains pooled for the entire UTC month.
              </p>
            </div>
            <div
              className="telecom-receipt"
              aria-label="Verified October 2026 billing calculation"
            >
              <div className="telecom-receipt-header">
                <span>Invoice preview</span>
                <span>Oct 2026 · ZAR</span>
              </div>
              <div className="telecom-receipt-keyline">
                <span>Monthly pooled usage</span>
                <strong>45,000 MB</strong>
              </div>
              <div className="telecom-receipt-keyline">
                <span>Prorated allowance</span>
                <strong>19,488 MB</strong>
              </div>
              <div className="telecom-receipt-separator" />
              <div className="telecom-receipt-line">
                <span>Recurring plan segments</span>
                <span>R239.33</span>
              </div>
              <div className="telecom-receipt-line">
                <span>Overage above allowance</span>
                <span>R373.71</span>
              </div>
              <div className="telecom-receipt-total">
                <span>Finalised invoice</span>
                <strong>R613.04</strong>
              </div>
              <div className="telecom-receipt-paid">
                <span>After simulated payment</span>
                <strong>R0.00 due</strong>
              </div>
              <p>
                Verified against the real PostgreSQL ledger and independently
                calculated with Python Decimal. No real payment gateway was
                used.
              </p>
            </div>
          </div>
        </section>

        <section
          className="telecom-section"
          aria-labelledby="telecom-engineering-title"
        >
          <div className="telecom-section-label">Engineering decisions</div>
          <div className="telecom-section-body">
            <h2 id="telecom-engineering-title">
              Correctness is designed into the boundaries.
            </h2>
            <div className="telecom-engineering-grid">
              {protections.map((v) => (
                <div className="telecom-engineering-item" key={v.heading}>
                  <h3>{v.heading}</h3>
                  <p>{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="telecom-architecture"
          aria-labelledby="telecom-architecture-title"
        >
          <div className="telecom-architecture-inner">
            <p className="telecom-eyebrow">System architecture</p>
            <h2 id="telecom-architecture-title">
              Clear ownership.
              <br />
              Observable hand-offs.
            </h2>
            <div
              className="telecom-architecture-flow"
              aria-label="Angular portal to Spring Boot APIs, PostgreSQL outbox, Kafka consumers and durable metering; Redis is an optional read cache"
            >
              <div>
                <strong>Angular 22</strong>
                <span>Customer + admin portal</span>
              </div>
              <b aria-hidden="true">→</b>
              <div>
                <strong>Spring Boot 4</strong>
                <span>Rules + JWT security</span>
              </div>
              <b aria-hidden="true">→</b>
              <div>
                <strong>PostgreSQL</strong>
                <span>Ledger + durable outbox</span>
              </div>
              <b aria-hidden="true">→</b>
              <div>
                <strong>Kafka</strong>
                <span>Delivery / retry / DLT</span>
              </div>
              <b aria-hidden="true">→</b>
              <div>
                <strong>Metering</strong>
                <span>Transactional receipt + totals</span>
              </div>
            </div>
            <p className="telecom-architecture-note">
              Redis provides versioned catalogue and entitlement caches with
              bounded timeouts and database fallback. Finalised billing remains
              transactional and authoritative in PostgreSQL.
            </p>
          </div>
        </section>

        <section
          className="telecom-section"
          aria-labelledby="telecom-verification-title"
        >
          <div className="telecom-section-label">Verification</div>
          <div className="telecom-section-body">
            <h2 id="telecom-verification-title">
              Proven under retries, downtime and calendar changes.
            </h2>
            <div className="telecom-verification-grid">
              <div>
                <strong>50,000</strong>
                <span>
                  Kafka deliveries; full replay without duplicated charges
                </span>
              </div>
              <div>
                <strong>~1,475/s</strong>
                <span>
                  Unique-event throughput on a local run, not a capacity claim
                </span>
              </div>
              <div>
                <strong>6 tests</strong>
                <span>
                  Final Java Maven verification: unit, timezone and PostgreSQL
                  acceptance
                </span>
              </div>
              <div>
                <strong>0 lag</strong>
                <span>Broker lag after independent consumer recovery</span>
              </div>
            </div>
            <p className="telecom-section-tail">
              Additional checks covered Redis fallback, scheduled downgrade
              after simulated downtime, invoice/payment concurrency,
              cross-account isolation, dead-letter processing and
              reconciliation. Production OIDC, TLS, real network metering and
              payment integration remain outside the local demonstration.
            </p>
          </div>
        </section>

        <section
          className="telecom-section telecom-technology"
          aria-labelledby="telecom-technology-title"
        >
          <div className="telecom-section-label">Technology</div>
          <div className="telecom-section-body">
            <h2 id="telecom-technology-title">
              Built with an event-driven Java stack.
            </h2>
            <div className="telecom-technology-grid">
              <div>
                <h3>Customer experience</h3>
                <p>
                  Responsive customer and admin interfaces for plans, usage,
                  invoices, ledgers and reconciliation.
                </p>
                <div className="telecom-tag-list">
                  {["Angular", "TypeScript", "Angular Material"].map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3>Application and billing</h3>
                <p>
                  Domain lifecycle, UTC-effective segments, immutable financial
                  records and authenticated role boundaries.
                </p>
                <div className="telecom-tag-list">
                  {["Java 21", "Spring Boot", "BigDecimal", "PostgreSQL"].map(
                    (x) => (
                      <span key={x}>{x}</span>
                    ),
                  )}
                </div>
              </div>
              <div>
                <h3>Delivery and metering</h3>
                <p>
                  Durable publication, batch consumption, replay-safe receipts
                  and bounded poison-message handling.
                </p>
                <div className="telecom-tag-list">
                  {["Kafka", "Transactional outbox", "DLT", "Flyway"].map(
                    (x) => (
                      <span key={x}>{x}</span>
                    ),
                  )}
                </div>
              </div>
              <div>
                <h3>Operations</h3>
                <p>
                  Versioned cache invalidation, database fallback, container
                  orchestration and repeatable local acceptance.
                </p>
                <div className="telecom-tag-list">
                  {[
                    "Redis",
                    "Docker Compose",
                    "Spring Actuator",
                    "GitHub Actions",
                  ].map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </div>
            </div>
            <button
              className="telecom-button telecom-button-dark telecom-tech-trigger"
              type="button"
              onClick={() => setShowStack(true)}
            >
              <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" /> Tech
              stack
            </button>
          </div>
        </section>

        <section className="telecom-closing">
          <div>
            <p className="telecom-eyebrow">Engineering in practice</p>
            <h2>
              Scale the events.
              <br />
              Keep the numbers honest.
            </h2>
            <p>
              The implementation, rules and verification record are available in
              source. The public portfolio describes the actual local system,
              with a technical brief for a closer look.
            </p>
          </div>
        </section>
      </article>
      <footer className="telecom-footer" ref={footerRef}>
        <Link className="telecom-footer-back" to="/">
          Back to portfolio
        </Link>
        <button
          className="telecom-footer-top" aria-label="Back to top"
          type="button"
          onClick={scrollTop}
        >
          <ArrowUp size={15} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </footer>
      <button
        type="button"
        className={`telecom-floating-top ${showTop && !footerVisible ? "is-visible" : ""}`}
        onClick={scrollTop}
        aria-label="Back to top"
        tabIndex={showTop && !footerVisible ? 0 : -1}
      >
        <ArrowUp size={17} strokeWidth={1.7} aria-hidden="true" />
      </button>
      {showStack && <TechStackModal onClose={closeStack} />}
    </main>
  );
}
