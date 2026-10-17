import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Layers3,
  Activity,
  ShieldCheck,
  GitBranch,
} from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./SREChaosEngineering.css";

const repository = "https://github.com/keenosmith-del/sre-chaos-engineering";
const technicalBrief = "/documents/sre-chaos-engineering-technical-brief.pdf";

const featuredTechnologies = [
  "Go",
  "Toxiproxy",
  "k6",
  "OpenTelemetry",
  "Prometheus",
  "PostgreSQL",
];

const technologyGroups = [
  {
    heading: "Experience",
    skills: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "REST",
      "Server-Sent Events",
    ],
  },
  {
    heading: "Service engineering",
    skills: [
      "Go",
      "Standard-library HTTP",
      "pgx",
      "go-redis",
      "amqp091-go",
      "Idempotency",
      "Saga compensation",
      "Transactional outbox",
    ],
  },
  {
    heading: "Data and messaging",
    skills: [
      "PostgreSQL",
      "Schema ownership",
      "Redis",
      "RabbitMQ",
      "Durable messages",
      "Dead-letter queues",
    ],
  },
  {
    heading: "Faults and performance",
    skills: [
      "Toxiproxy",
      "k6",
      "Circuit breakers",
      "Bounded retries",
      "Exponential backoff",
      "Dependency timeouts",
      "Recovery verification",
    ],
  },
  {
    heading: "Telemetry",
    skills: [
      "OpenTelemetry",
      "OTLP Collector",
      "Prometheus",
      "Grafana",
      "Jaeger",
      "Trace propagation",
      "PromQL",
    ],
  },
  {
    heading: "Local operations and recovery",
    skills: [
      "Docker Compose",
      "Python",
      "pg_dump",
      "pg_restore",
      "SHA-256",
      "GitHub Actions",
    ],
  },
  {
    heading: "Secondary deployment path",
    note: "kind manifests and scripts are implemented, but the Kubernetes runtime was not executed in the recorded checkpoint.",
    skills: [
      "Kubernetes",
      "kind",
      "kubectl",
      "PVC",
      "Liveness / readiness probes",
    ],
  },
];

const faults = [
  {
    id: "inventory",
    name: "Inventory unavailable",
    slug: "inventory_unavailable",
    mechanism: "Disable the inventory HTTP proxy while services remain up.",
    expectation:
      "Retries, reduced completion and 5xx during the fault; successful order reconciliation afterward.",
    observation:
      "The final inventory report recorded an error fraction of 0.000 → 0.667 → 0.000 across baseline, failure and recovery. The completed verification found zero business invariant violations.",
  },
  {
    id: "payment",
    name: "Payment latency",
    slug: "payment_latency",
    mechanism: "Apply bounded downstream latency through a Toxiproxy toxic.",
    expectation:
      "Higher tail latency, ambiguous outcomes and reconciliation or circuit-breaker activity.",
    observation:
      "Recorded as COMPLETED with cleanup and zero business invariant violations in the earlier validation suite; not rerun at the October 3 checkpoint.",
  },
  {
    id: "redis",
    name: "Redis outage",
    slug: "redis_outage",
    mechanism: "Disable the Redis dependency proxy.",
    expectation:
      "Cache fallback while inventory APIs continue serving the workload.",
    observation:
      "Recorded as COMPLETED with cleanup and zero business invariant violations in the earlier validation suite; not rerun at the October 3 checkpoint.",
  },
  {
    id: "rabbit",
    name: "RabbitMQ interruption",
    slug: "rabbitmq_interruption",
    mechanism: "Disable the AMQP proxy without deleting durable events.",
    expectation:
      "Outbox backlog rises, delivery pauses, then confirms and consumption resume.",
    observation:
      "Recorded as COMPLETED with cleanup and zero business invariant violations in the earlier validation suite; not rerun at the October 3 checkpoint.",
  },
  {
    id: "worker",
    name: "Worker restart",
    slug: "worker_restart",
    mechanism: "Stop and restart the allowlisted worker container.",
    expectation:
      "Durable messages accumulate, then an idempotent consumer drains the backlog.",
    observation:
      "Recorded as COMPLETED with cleanup and zero business invariant violations. A focused rerun measured queue depth 0 → 12 → 0.",
  },
  {
    id: "postgres",
    name: "PostgreSQL interruption",
    slug: "postgres_interruption",
    mechanism: "Disable only the application PostgreSQL network proxy.",
    expectation:
      "Failed SQL operations and readiness loss while the control database connection remains available.",
    observation:
      "Recorded as COMPLETED with cleanup and zero business invariant violations; this was a network fault, not database corruption or process loss.",
  },
];

const phases = [
  {
    label: "Baseline",
    errors: "0.000",
    latency: "0.048s",
    throughput: "2.000",
    bar: 0,
    explanation: "Normal orders, prior to the inventory fault.",
  },
  {
    label: "Fault",
    errors: "0.667",
    latency: "0.275s",
    throughput: "1.999",
    bar: 66.7,
    explanation: "HTTP errors and increased p95 latency during injection.",
  },
  {
    label: "Recovery",
    errors: "0.000",
    latency: "0.040s",
    throughput: "2.000",
    bar: 0,
    explanation: "Traffic and completion recovered after cleanup.",
  },
];

function TechStackModal({ onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const prior = document.activeElement;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = priorOverflow;
      prior?.focus?.();
    };
  }, [onClose]);
  return (
    <div
      className="sre-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="sre-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Project technology stack"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          className="sre-modal-close"
          aria-label="Close technology stack"
          type="button"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="sre-modal-groups">
          {technologyGroups.map((group) => (
            <div className="sre-modal-group" key={group.heading}>
              <span className="sre-modal-category">{group.heading}</span>
              {group.note && <p className="sre-modal-note">{group.note}</p>}
              <div className="sre-modal-pills">
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

export default function SREChaosEngineering() {
  const [selectedFault, setSelectedFault] = useState("inventory");
  const [stackOpen, setStackOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef(null);
  const closeStack = useCallback(() => setStackOpen(false), []);
  const activeFault =
    faults.find((fault) => fault.id === selectedFault) || faults[0];

  useEffect(() => {
    const check = () => setShowTop(window.scrollY > 300);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
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
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main className="sre-project">
      <Link className="sre-back" to="/">
        <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" /> Back to
        portfolio
      </Link>
      <article>
        <header className="sre-hero">
          <div className="sre-hero-inner">
            <div className="sre-hero-topline">
              <div className="sre-pill-list" aria-label="Core technologies">
                {featuredTechnologies.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <time dateTime="2026-10">Built July 2026</time>
            </div>
            <h1>Distributed Systems Reliability, <span>Chaos Engineering &amp; Disaster Recovery Platform</span></h1>
            <div className="sre-hero-bottom">
              <div>
                <p className="sre-hero-description">
                  I built a distributed commerce workload and reliability
                  control plane to find out what really happens when
                  dependencies become slow, unavailable or inconsistent. Six Go
                  services process durable transactions while controlled faults,
                  real telemetry and an isolated restore drill test the
                  boundaries of recovery.
                </p>
                <p className="sre-hero-note">
                  A verified local SRE engineering project — not a production
                  availability claim.
                </p>
              </div>
              <div className="sre-hero-cta">
                <div className="sre-hero-actions">
                  <a
                    className="sre-button sre-button-dark"
                    href={repository}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={githubSvg}
                      className="sre-github-icon"
                      alt=""
                      aria-hidden="true"
                    />{" "}
                    Source
                  </a>
                  <button
                    className="sre-button sre-button-disabled"
                    disabled
                    type="button"
                  >
                    Visit platform
                  </button>
                </div>
                <p className="sre-platform-note">
                  Runs locally with Docker Compose. No public deployment is
                  documented. For a walkthrough,{" "}
                  <a href="mailto:keenosmith@kailor.co.za">get in touch</a>.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="sre-section" id="sre-summary">
          <div className="sre-section-label">Project summary</div>
          <div className="sre-section-content">
            <h2>Reliable systems are measured after something breaks.</h2>
            <div className="sre-columns">
              <p>
                An HTTP 200 or a healthy container cannot prove that an order
                has been fulfilled. Inventory reservations, payment outcomes,
                outbox publication and the worker's final delivery record must
                remain consistent even when a dependency disappears halfway
                through a transaction.
              </p>
              <p>
                I built the project around that difference: a durable ordering
                saga to preserve business truth, a bounded fault-experiment
                engine, and checks that refuse to declare recovery while
                payments, stock or deliveries disagree.
              </p>
            </div>
            <div className="sre-summary-action">
              <a
                className="sre-button sre-button-cream"
                href={technicalBrief}
                target="_blank"
                rel="noopener noreferrer"
              >
                Technical brief{" "}
                <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section
          className="sre-phase-section"
          aria-labelledby="sre-phase-title"
        >
          <div className="sre-phase-inner">
            <p className="sre-section-kicker">
              A recorded inventory experiment
            </p>
            <h2 id="sre-phase-title">
              A failure curve.
              <br />
              Not a screenshot.
            </h2>
            <p className="sre-phase-intro">
              The final verification compared real Prometheus windows with k6
              traffic at approximately two order submissions per second.
              Recovery was accepted only after durable consistency checks
              completed.
            </p>
            <div className="sre-phase-cards">
              {phases.map((phase, index) => (
                <div
                  key={phase.label}
                  className={`sre-phase-card ${index === 1 ? "is-fault" : ""}`}
                >
                  <span className="sre-phase-num">
                    0{index + 1} / {phase.label}
                  </span>
                  <div className="sre-phase-metric">
                    <strong>{phase.errors}</strong>
                    <small>HTTP 5xx fraction</small>
                  </div>
                  <div className="sre-phase-track">
                    <span style={{ width: `${Math.max(1.5, phase.bar)}%` }} />
                  </div>
                  <div className="sre-phase-stats">
                    <span>p95&nbsp; {phase.latency}</span>
                    <span>{phase.throughput} req/s</span>
                  </div>
                  <p>{phase.explanation}</p>
                </div>
              ))}
            </div>
            <p className="sre-phase-caption">
              Recorded report: <code>09bf1dbb…24145e</code> · An infrastructure
              error is different from an expected payment decline. Error values
              are observed window measurements, not promised SLOs.
            </p>
          </div>
        </section>

        <section className="sre-section" id="sre-architecture">
          <div className="sre-section-label">Distributed architecture</div>
          <div className="sre-section-content">
            <h2>Make the business state outlive its dependencies.</h2>
            <p className="sre-section-intro">
              The application spans six Go executables: gateway, ordering,
              inventory, payments, worker and control. Each owns a
              responsibility, with a shared PostgreSQL instance partitioned by
              service schemas and guarded by database roles.
            </p>
            <div className="sre-saga">
              <div className="sre-saga-main">
                <span className="sre-mini-kicker">The transaction path</span>
                <div className="sre-saga-steps">
                  {[
                    "Request + key",
                    "Inventory reserve",
                    "Payment result",
                    "Outbox event",
                    "Worker projection",
                  ].map((name, i) => (
                    <div key={name}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <strong>{name}</strong>
                      {i < 4 && (
                        <ArrowRight
                          size={14}
                          strokeWidth={1.4}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <p>
                  An identical idempotency key returns the same logical order; a
                  conflicting payload is rejected. A declined payment triggers
                  inventory compensation. Persisted incomplete operations are
                  reconciled after faults or restart.
                </p>
              </div>
              <aside className="sre-saga-aside">
                <GitBranch size={20} strokeWidth={1.3} aria-hidden="true" />
                <span>Consistency boundary</span>
                <strong>Database truth first.</strong>
                <p>
                  Outbox rows commit with business changes. RabbitMQ confirms
                  publication; manual acknowledgements and an idempotent
                  consumer protect replayed deliveries. Dead letters remain
                  inspectable.
                </p>
              </aside>
            </div>
            <div className="sre-columns sre-architecture-notes">
              <div>
                <h3>Bounded dependency calls</h3>
                <p>
                  Per-service concurrency is limited to 16. Calls have an 800 ms
                  default attempt timeout, at most three attempts and short
                  backoff. Circuit breakers open after three failed logical
                  dependency calls, then allow a half-open probe.
                </p>
              </div>
              <div>
                <h3>Failure-aware boundaries</h3>
                <p>
                  Normal 4xx application responses do not trip circuits. Redis
                  is a best-effort cache with inventory fallback, while durable
                  PostgreSQL and RabbitMQ state retain work until reconciliation
                  or operator action.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="sre-section sre-fault-section" id="sre-faults">
          <div className="sre-section-label">Chaos experiments</div>
          <div className="sre-section-content">
            <h2>Six ways to break it. One way to prove it recovered.</h2>
            <p className="sre-section-intro">
              Every preset is allowlisted. The runner injects genuine network
              faults or a scoped worker restart, records
              baseline/failure/recovery phases, cleans up and verifies
              transactions. Select an experiment to see its mechanism and the
              repository's recorded evidence.
            </p>
            <div className="sre-fault-layout">
              <div
                className="sre-fault-selector"
                role="group"
                aria-label="Choose a fault experiment"
              >
                {faults.map((fault, i) => (
                  <button
                    type="button"
                    key={fault.id}
                    aria-pressed={selectedFault === fault.id}
                    className={`sre-fault-option ${selectedFault === fault.id ? "is-selected" : ""}`}
                    onClick={() => setSelectedFault(fault.id)}
                  >
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {fault.name}
                    <ArrowRight
                      size={15}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
              <div className="sre-fault-detail" aria-live="polite">
                <span className="sre-mini-kicker">{activeFault.slug}</span>
                <h3>{activeFault.name}</h3>
                <div>
                  <strong>Injection</strong>
                  <p>{activeFault.mechanism}</p>
                </div>
                <div>
                  <strong>What to verify</strong>
                  <p>{activeFault.expectation}</p>
                </div>
                <div>
                  <strong>Recorded outcome</strong>
                  <p>{activeFault.observation}</p>
                </div>
              </div>
            </div>
            <p className="sre-fault-disclaimer">
              The older suite recorded all six presets as completed. The October
              3 checkpoint reran the inventory case; the other five were not
              rerun at that checkpoint.
            </p>
          </div>
        </section>

        <section className="sre-section" id="sre-observability">
          <div className="sre-section-label">Observability</div>
          <div className="sre-section-content">
            <h2>A trace answers where. A metric answers how often.</h2>
            <div className="sre-insight-grid">
              <article>
                <Activity size={22} strokeWidth={1.3} aria-hidden="true" />
                <h3>Prometheus & Grafana</h3>
                <p>
                  Native Go counters, histograms and gauges record order
                  throughput, failure fraction, p50/p95/p99, dependency retries,
                  circuit transitions, outbox age and RabbitMQ depth. Dashboards
                  read scraped data, not generated examples.
                </p>
              </article>
              <article>
                <GitBranch size={22} strokeWidth={1.3} aria-hidden="true" />
                <h3>OpenTelemetry & Jaeger</h3>
                <p>
                  OTLP spans connect gateway, ordering, inventory, payments and
                  worker through trace headers carried by RabbitMQ. The
                  checkpoint retrieved ten spans across all five
                  transaction-processing services for a real order.
                </p>
              </article>
              <article>
                <ShieldCheck size={22} strokeWidth={1.3} aria-hidden="true" />
                <h3>Evidence with uncertainty</h3>
                <p>
                  Experiment reports persist PromQL and availability metadata.
                  Sparse samples are explicitly unavailable; missing
                  measurements never become invented zeros. Completion checks
                  business invariants separately from infrastructure readiness.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="sre-recovery-section" id="sre-recovery">
          <div className="sre-recovery-inner">
            <div className="sre-recovery-header">
              <span className="sre-section-kicker">Disaster recovery</span>
              <h2>
                A backup is only useful
                <br />
                if it restores.
              </h2>
              <p>
                Recovery exports a consistent PostgreSQL snapshot, records a
                SHA-256 checksum and business watermark, restores into a
                different database, then checks the recovered state. The
                commerce database is never replaced during the drill.
              </p>
            </div>
            <div className="sre-recovery-measures">
              <div>
                <small>Measured restore RTO</small>
                <strong>
                  1.318<span>s</span>
                </strong>
                <p>Isolated PostgreSQL restoration and verification</p>
              </div>
              <div>
                <small>Order-watermark RPO</small>
                <strong>
                  0.000<span>s</span>
                </strong>
                <p>At the recorded local checkpoint</p>
              </div>
              <div>
                <small>Restored order records</small>
                <strong>534</strong>
                <p>Snapshot counts and consistency verified</p>
              </div>
            </div>
            <p className="sre-recovery-limit">
              These are scoped local drill measurements—not a production outage
              RTO/RPO promise. The backup excludes RabbitMQ, Redis and tracing
              state; coordinated recovery across these systems was not tested.
            </p>
          </div>
        </section>

        <section className="sre-section sre-tech-section" id="sre-technology">
          <div className="sre-section-label">Technology & engineering</div>
          <div className="sre-section-content">
            <h2>Different tools. Clear responsibilities.</h2>
            <div className="sre-tech-grid">
              <div>
                <h3>Application & data</h3>
                <p>
                  Go HTTP services and React manage transactions and operations.
                  PostgreSQL enforces schema ownership and durable order
                  transitions; Redis and RabbitMQ serve distinct caching and
                  messaging roles.
                </p>
                <div className="sre-tag-row">
                  {[
                    "Go",
                    "React",
                    "TypeScript",
                    "PostgreSQL",
                    "Redis",
                    "RabbitMQ",
                  ].map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3>Faults & verification</h3>
                <p>
                  Toxiproxy and k6 create controlled dependency failures under
                  measured traffic. Resilience clients, outbox recovery and
                  business-invariant checks decide whether the system is
                  actually consistent.
                </p>
                <div className="sre-tag-row">
                  {[
                    "Toxiproxy",
                    "k6",
                    "Circuit breakers",
                    "Python",
                    "Docker Compose",
                  ].map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3>Telemetry</h3>
                <p>
                  Distributed traces link the saga and worker; Prometheus
                  windows quantify actual baseline, disruption and recovery.
                  Grafana and Jaeger support investigation.
                </p>
                <div className="sre-tag-row">
                  {["OpenTelemetry", "Prometheus", "Grafana", "Jaeger"].map(
                    (x) => (
                      <span key={x}>{x}</span>
                    ),
                  )}
                </div>
              </div>
              <div>
                <h3>Deployment boundaries</h3>
                <p>
                  Docker Compose is the verified operational environment. A
                  secondary Kubernetes/kind configuration and manual fault
                  scripts exist, but the kind runtime was not validated.
                </p>
                <div className="sre-tag-row">
                  {[
                    "Kubernetes manifests",
                    "kind (unverified)",
                    "GitHub Actions workflow",
                  ].map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </div>
            </div>
            <button
              className="sre-button sre-tech-trigger"
              type="button"
              onClick={() => setStackOpen(true)}
            >
              <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />
              Tech stack
            </button>
          </div>
        </section>

        <section className="sre-section sre-verification">
          <div className="sre-section-label">Engineering verification</div>
          <div className="sre-section-content">
            <h2>Results, then boundaries.</h2>
            <div className="sre-columns">
              <div>
                <h3>Verified locally</h3>
                <p>
                  Go and frontend builds, Compose health, four identical
                  concurrent orders resolving to one ID, mismatched-payload
                  rejection, confirmed and declined orders, an inventory fault
                  under real traffic, ten linked tracing spans,
                  business-invariant checks and the isolated restore drill.
                </p>
              </div>
              <div>
                <h3>Not established</h3>
                <p>
                  Production SLOs, multi-node failover, Kubernetes kind
                  execution, coordinated RabbitMQ/PostgreSQL restoration,
                  nonempty dead-letter recovery, live cloud deployment or
                  internet-facing security. The changed CI integration workflow
                  was not yet executed on GitHub at the documented checkpoint.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="sre-closing">
          <div>
            <p className="sre-section-kicker">What this project demonstrates</p>
            <h2>
              Engineering for the moment
              <br />
              everything stops working.
            </h2>
            <p>
              Fault injection is only the beginning. The important work is
              preserving transaction meaning, observing what changed and
              producing evidence that recovery really finished.
            </p>
          </div>
        </section>
      </article>
      <footer ref={footerRef} className="sre-footer">
        <Link to="/" className="sre-footer-link">
          <ArrowLeft size={14} strokeWidth={1.7} aria-hidden="true" /> Back to
          portfolio
        </Link>
        <button type="button" className="sre-footer-link" onClick={toTop}>
          <ArrowUp size={14} strokeWidth={1.7} aria-hidden="true" /> Back to top
        </button>
      </footer>
      {showTop && !footerVisible && (
        <button
          type="button"
          className="sre-floating-top"
          onClick={toTop}
          aria-label="Back to top"
        >
          <ArrowUp size={17} strokeWidth={1.6} />
        </button>
      )}
      {stackOpen && <TechStackModal onClose={closeStack} />}
    </main>
  );
}
