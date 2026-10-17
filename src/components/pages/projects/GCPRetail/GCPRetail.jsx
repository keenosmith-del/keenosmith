import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUp, Layers3 } from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./GCPRetail.css";

const repositoryUrl =
  "https://github.com/keenosmith-del/gcp-ai-retail-and-supply-chain";
const technicalBrief = "/documents/gcp-retail-technical-brief.pdf";

const heroTechnologies = [
  "Google Cloud",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "scikit-learn",
  "OR-Tools",
];

const technologyGroups = [
  {
    heading: "Frontend",
    skills: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "Recharts",
      "Fetch API",
    ],
  },
  {
    heading: "Backend",
    skills: [
      "Python 3.11+",
      "FastAPI",
      "Pydantic",
      "SQLAlchemy",
      "Alembic",
      "REST APIs",
    ],
  },
  {
    heading: "Data",
    skills: [
      "PostgreSQL 17",
      "DuckDB",
      "SQL",
      "Transactional outbox",
      "Relational migrations",
      "Immutable audit",
    ],
  },
  {
    heading: "Forecasting and optimisation",
    skills: [
      "scikit-learn",
      "Ridge regression",
      "NumPy",
      "OR-Tools CP-SAT",
      "Time-series backtesting",
      "Demand uncertainty",
    ],
  },
  {
    heading: "Google Cloud integration",
    note: "SDK adapters and contracts are present; no live cloud calls were verified.",
    skills: [
      "Vertex AI endpoint",
      "Vertex Gemini",
      "BigQuery",
      "Pub/Sub",
      "Cloud Storage",
      "Google Cloud SDKs",
    ],
  },
  {
    heading: "Cloud infrastructure",
    note: "Infrastructure defined, not provisioned or deployed.",
    skills: [
      "Cloud Run",
      "Cloud SQL",
      "Terraform",
      "Cloud Build",
      "Secret Manager",
      "Artifact Registry",
      "IAM",
      "Cloud Monitoring",
    ],
  },
  {
    heading: "Security and validation",
    skills: [
      "JWT",
      "Argon2",
      "Role-based access",
      "Docker Compose",
      "GitHub Actions",
      "pytest",
      "Playwright",
      "Ruff",
    ],
  },
  {
    heading: "Not deployed",
    note: "Documented extension paths, not live product features.",
    skills: [
      "Cloud Scheduler automation",
      "Vertex experiments",
      "BigQuery ML experiment",
      "External supplier orders",
      "Multi-tenant SSO",
    ],
  },
];

const pipeline = [
  {
    title: "Demand",
    detail: "Per-product, per-store forecasts for 7, 14 and 30 days",
  },
  {
    title: "Exposure",
    detail: "Stockout and overstock risk against lead times and safety stock",
  },
  {
    title: "Allocation",
    detail: "Constrained transfers and supplier purchase batches",
  },
  {
    title: "Approval",
    detail: "Role-controlled decision review before execution",
  },
  {
    title: "Execution",
    detail: "Simulated inventory movement with transactional audit",
  },
  {
    title: "Outcome",
    detail: "Forecast and recommendation evaluation once data matures",
  },
];

const planningDecisions = [
  {
    title: "Rebalance before buying",
    text: "The solver examines available surplus at other locations before committing to supplier purchases. It weighs cross-region transport, activation costs, holding-cost release and unmet-demand penalties in one integer objective.",
  },
  {
    title: "Protect future availability",
    text: "Source safety stock, destination capacity, supplier lead times, minimum order quantities and procurement holds are enforced as constraints. A cheap transfer is not useful if it creates another stockout.",
  },
  {
    title: "Model early shortfalls",
    text: "Daily inventory simulation retains shortages that occur before an incoming shipment arrives. A purchase covering the end-of-horizon total cannot retroactively prevent an earlier missed sale.",
  },
  {
    title: "Keep economics explicit",
    text: "Avoided procurement, transfer cost and markdown estimates use documented ZAR modelling assumptions. They are planning estimates, not booked savings or established causal business outcomes.",
  },
];

const cloudCapabilities = [
  {
    title: "BigQuery and DuckDB",
    description:
      "DuckDB serves local analytical projections separate from operational PostgreSQL. A BigQuery adapter provides the cloud warehouse boundary for fact/dimension loads and queries.",
  },
  {
    title: "Pub/Sub and the outbox",
    description:
      "Stock-changing transactions commit events alongside operational state. A durable local dispatcher handles retries; the Pub/Sub publisher requires external consumers to deduplicate at-least-once delivery.",
  },
  {
    title: "Vertex AI and Gemini",
    description:
      "The local forecast model is scikit-learn Ridge. A separate Vertex endpoint contract permits cloud prediction, while Gemini can explain supplied quantitative evidence without controlling allocations or inventory writes.",
  },
  {
    title: "Cloud Run and Cloud SQL",
    description:
      "Terraform describes API/web services, a migration job, operational PostgreSQL, IAM and secrets. Those definitions have not been applied to a live Google Cloud project.",
  },
];

const lifecycle = [
  {
    label: "Generated",
    detail: "Model outputs and optimisation evidence persisted",
  },
  {
    label: "Under review",
    detail: "Operator assesses the plan, assumptions and supply exposure",
  },
  {
    label: "Approved / rejected",
    detail: "Role checks determine whether the proposal can progress",
  },
  {
    label: "Executed",
    detail: "Inventory is revalidated, updated in simulation and audited",
  },
  {
    label: "Measured",
    detail: "Outcome recorded after the observation window has elapsed",
  },
];

const techSections = [
  {
    title: "Frontend",
    description:
      "A typed operations interface for inventory coverage, forecasts, supply risks, scenarios, decisions and analytical reporting.",
    tags: ["React", "TypeScript", "Vite", "Recharts"],
  },
  {
    title: "Backend and security",
    description:
      "FastAPI routes expose planning services behind JWT authentication, role checks and schema validation; SQLAlchemy owns transactional domain operations.",
    tags: ["Python", "FastAPI", "Pydantic", "SQLAlchemy", "Alembic"],
  },
  {
    title: "Planning and machine learning",
    description:
      "Ridge time-series forecasts feed inventory rules and OR-Tools CP-SAT for multi-location allocation and procurement recommendations.",
    tags: ["scikit-learn", "NumPy", "OR-Tools", "Forecast evaluation"],
  },
  {
    title: "Data and cloud",
    description:
      "PostgreSQL is the operational source of truth, DuckDB holds analytical projections, and Google Cloud providers remain independently selectable integrations.",
    tags: [
      "PostgreSQL",
      "DuckDB",
      "BigQuery",
      "Vertex AI",
      "Pub/Sub",
      "Terraform",
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
    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="gcp-retail-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="gcp-retail-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Project technology stack"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          className="gcp-retail-modal-close"
          type="button"
          aria-label="Close technology stack"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="gcp-retail-modal-groups">
          {technologyGroups.map((group) => (
            <div className="gcp-retail-modal-group" key={group.heading}>
              <span className="gcp-retail-modal-category">{group.heading}</span>
              {group.note && (
                <p className="gcp-retail-modal-note">{group.note}</p>
              )}
              <div className="gcp-retail-modal-pills">
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

export default function GCPRetail() {
  const [showTop, setShowTop] = useState(false);
  const [showStack, setShowStack] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef(null);
  const closeStack = useCallback(() => setShowStack(false), []);

  useEffect(() => {
    const update = () => setShowTop(window.scrollY > 300);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
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
    <main className="gcp-retail-project">
      <Link className="gcp-retail-back" to="/">
        <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />
        <span>Back to portfolio</span>
      </Link>
      <article>
        <header className="gcp-retail-hero">
          <div className="gcp-retail-hero-inner">
            <div className="gcp-retail-hero-topline">
              <div
                className="gcp-retail-pill-list"
                aria-label="Principal technologies"
              >
                {heroTechnologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <time dateTime="2026">Built April 2026</time>
            </div>
            <h1>
              Retail intelligence. <span>Supply chain decisions.</span>
            </h1>
            <div className="gcp-retail-hero-bottom">
              <div>
                <p className="gcp-retail-hero-description">
                  I built a retail planning platform that predicts demand,
                  detects inventory exposure and recommends where stock should
                  move next. The system connects quantitative forecasting with
                  transfer and procurement constraints, so teams can review a
                  commercially meaningful decision rather than an isolated
                  prediction.
                </p>
                <p className="gcp-retail-hero-note">
                  End-to-end local operational simulation. Google Cloud
                  infrastructure and SDK integrations are prepared, not
                  deployed.
                </p>
              </div>
              <div className="gcp-retail-hero-controls">
                <div className="gcp-retail-hero-actions">
                  <a
                    className="gcp-retail-button gcp-retail-button-dark"
                    href={repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={githubSvg}
                      alt=""
                      className="gcp-retail-github-icon"
                      aria-hidden="true"
                    />
                    Source
                  </a>
                  <button
                    className="gcp-retail-button gcp-retail-button-disabled"
                    type="button"
                    disabled
                  >
                    Visit platform
                  </button>
                </div>
                <p className="gcp-retail-platform-note">
                  This project is not hosted publicly. The source, tests and
                  deployment specifications are available, or you can{" "}
                  <a href="mailto:keenosmith@kailor.co.za">contact me</a> for a
                  walkthrough.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="gcp-retail-section" id="gcp-retail-overview">
          <div className="gcp-retail-section-label">Project overview</div>
          <div className="gcp-retail-section-copy">
            <h2>
              Inventory planning is a decision problem, not a forecast chart.
            </h2>
            <div className="gcp-retail-two-columns">
              <p>
                Demand forecasting gives a retailer an estimate of what
                customers may need. It does not explain whether a store can meet
                demand, which distribution centre has spare stock, or whether a
                supplier order would arrive early enough to help.
              </p>
              <p>
                The application links sales history, available inventory,
                deliveries, replenishment lead times and capacity to a decision
                pipeline. Each recommendation includes quantitative evidence and
                must pass review before it changes the local simulation.
              </p>
            </div>
            <div className="gcp-retail-summary-action">
              <a
                className="gcp-retail-button gcp-retail-button-soft"
                href={technicalBrief}
                target="_blank"
                rel="noopener noreferrer"
              >
                Technical brief
              </a>
            </div>
          </div>
        </section>

        <section className="gcp-retail-process">
          <div className="gcp-retail-process-inner">
            <p className="gcp-retail-eyebrow">Decision pipeline</p>
            <h2>From daily demand to an executable stock plan.</h2>
            <p className="gcp-retail-process-intro">
              Forecasting, risk assessment and allocation run together, but
              retain separate responsibilities. Planning outputs are persisted
              before an operator reviews or executes them.
            </p>
            <div className="gcp-retail-process-grid">
              {pipeline.map((item) => (
                <div className="gcp-retail-process-step" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="gcp-retail-section gcp-retail-forecasting">
          <div className="gcp-retail-section-label">Demand intelligence</div>
          <div className="gcp-retail-section-copy">
            <h2>Forecast accuracy has to be measured, not assumed.</h2>
            <p className="gcp-retail-section-intro">
              The local model trains an autoregressive, calendar-aware Ridge
              regression separately for each product and store. It uses sales
              lags, rolling demand, weekly and yearly cycles, trend and
              promotion state to forecast 7-, 14- and 30-day horizons.
            </p>
            <div className="gcp-retail-data-grid">
              <div>
                <h3>Chronological evaluation</h3>
                <p>
                  Calibration and held-out test windows are kept in time order.
                  MAE, RMSE, WAPE, bias and interval coverage are recorded, with
                  nonzero-only MAPE to avoid undefined division.
                </p>
              </div>
              <div>
                <h3>Transparent uncertainty</h3>
                <p>
                  Empirical daily 90% intervals and a documented stockout
                  approximation quantify exposure. Those intervals are not
                  guarantees, and a recommendation confidence score is not a
                  calibrated business-success probability.
                </p>
              </div>
              <div>
                <h3>Observed outcomes</h3>
                <p>
                  Forecasts for closed days attach actual sales; complete
                  elapsed horizons are evaluated separately from historical
                  backtests. This distinguishes forecast fit from subsequent
                  operational performance.
                </p>
              </div>
              <div>
                <h3>Scenario analysis</h3>
                <p>
                  Demand and promotion assumptions run through the same risk and
                  allocation engines against copied inventory. A scenario does
                  not silently modify live simulation stock or claim a causal
                  forecast retraining.
                </p>
              </div>
            </div>
            <p className="gcp-retail-evidence-note">
              Recorded example: the repository's verification report documents
              7-, 14- and 30-day held-out WAPE of 12.27%, 11.36% and 14.24%
              respectively for one rice/Johannesburg series—not platform-wide
              accuracy.
            </p>
          </div>
        </section>

        <section className="gcp-retail-section gcp-retail-optimisation">
          <div className="gcp-retail-section-label">
            Allocation and economics
          </div>
          <div className="gcp-retail-section-copy">
            <h2>Moving stock can make more sense than buying more.</h2>
            <p className="gcp-retail-section-intro">
              I used OR-Tools CP-SAT to evaluate integer transfers and supplier
              purchase batches together. The optimisation accounts for inventory
              coverage, location capacity, minimum quantities, lead-time
              eligibility and commercial penalties before creating
              recommendations.
            </p>
            <div className="gcp-retail-decision-grid">
              {planningDecisions.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
            <div className="gcp-retail-result">
              <span>
                Recorded local simulation · Johannesburg rice allocation
              </span>
              <div className="gcp-retail-result-grid">
                <div>
                  <strong>208</strong>
                  <small>units allocated across three origins</small>
                </div>
                <div>
                  <strong>R610.60</strong>
                  <small>estimated transfer cost</small>
                </div>
                <div>
                  <strong>OPTIMAL</strong>
                  <small>recorded CP-SAT solver status</small>
                </div>
              </div>
              <p>
                The verification report also estimates R13,312 of avoided
                procurement for this scenario. These figures describe the
                modelled plan, not real purchases, shipments or realised
                savings.
              </p>
            </div>
          </div>
        </section>

        <section className="gcp-retail-section gcp-retail-lifecycle">
          <div className="gcp-retail-section-label">Operational controls</div>
          <div className="gcp-retail-section-copy">
            <h2>Recommendations need ownership before execution.</h2>
            <p className="gcp-retail-section-intro">
              A planning recommendation is not an order to a supplier. An
              analyst can inspect findings and run scenarios, while operations
              or admin roles approve and execute changes in the simulation.
              Inventory is rechecked at execution, and superseded proposals
              remain auditable.
            </p>
            <div className="gcp-retail-lifecycle-list">
              {lifecycle.map((stage) => (
                <div key={stage.label}>
                  <h3>{stage.label}</h3>
                  <p>{stage.detail}</p>
                </div>
              ))}
            </div>
            <p className="gcp-retail-evidence-note">
              Sales, inventory movements and event records commit through
              PostgreSQL transactions. Approval and execution are separate
              operations; duplicate execution is rejected. Orders remain pending
              until a simulated receipt is recorded.
            </p>
          </div>
        </section>

        <section className="gcp-retail-section gcp-retail-data">
          <div className="gcp-retail-section-label">Data architecture</div>
          <div className="gcp-retail-section-copy">
            <h2>One database for operational truth. Another for analysis.</h2>
            <div className="gcp-retail-two-columns">
              <p>
                PostgreSQL stores products, locations, stock positions, sales,
                forecasts, recommendations, execution records and
                append-oriented audit history. A transactional outbox records
                events alongside state changes, then a durable worker refreshes
                analytical projections and queues replanning.
              </p>
              <p>
                DuckDB provides a separate local warehouse for analytical facts
                and dimensions. It is not a repackaged operational query.
                Provider boundaries support BigQuery for cloud warehouse loads
                and queries, with clear handling when a configured cloud service
                is unavailable.
              </p>
            </div>
            <div className="gcp-retail-metrics">
              <div>
                <strong>18</strong>
                <span>seed products</span>
              </div>
              <div>
                <strong>4</strong>
                <span>retail stores</span>
              </div>
              <div>
                <strong>2</strong>
                <span>distribution centres</span>
              </div>
              <div>
                <strong>39,456</strong>
                <span>daily seed sales observations</span>
              </div>
            </div>
            <p className="gcp-retail-evidence-note">
              These are deterministic development fixtures for a simulated South
              African network, not live retailer transactions.
            </p>
          </div>
        </section>

        <section className="gcp-retail-section gcp-retail-cloud">
          <div className="gcp-retail-section-label">Google Cloud</div>
          <div className="gcp-retail-section-copy">
            <h2>Portable planning logic with explicit cloud boundaries.</h2>
            <p className="gcp-retail-section-intro">
              The application runs locally without Google Cloud. Provider
              interfaces allow individual data, event, inference, explanation
              and storage responsibilities to be configured independently,
              rather than mixing cloud calls into the planning domain.
            </p>
            <div className="gcp-retail-data-grid">
              {cloudCapabilities.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
            <p className="gcp-retail-evidence-note">
              Terraform also defines Cloud Build/Artifact Registry dependencies,
              Secret Manager, IAM and logging/monitoring resources. None were
              provisioned or exercised in a real GCP project in the documented
              verification.
            </p>
          </div>
        </section>

        <section className="gcp-retail-section gcp-retail-technology">
          <div className="gcp-retail-section-label">Technology</div>
          <div className="gcp-retail-section-copy">
            <h2>Forecasting, operations and optimisation in one system.</h2>
            <p className="gcp-retail-section-intro">
              The implementation deliberately uses a modular FastAPI application
              instead of microservices. Relational transactions protect
              operational decisions; a separate analytical store serves
              reporting; machine learning and the constraint solver own the
              numbers, while Gemini is reserved for evidence explanation.
            </p>
            <div className="gcp-retail-tech-grid">
              {techSections.map((group) => (
                <div className="gcp-retail-tech-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <div className="gcp-retail-tech-tags">
                    {group.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="gcp-retail-button gcp-retail-button-dark gcp-retail-tech-trigger"
              onClick={() => setShowStack(true)}
            >
              <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" /> Tech
              stack
            </button>
          </div>
        </section>

        <section className="gcp-retail-closing">
          <div>
            <p className="gcp-retail-eyebrow">System scope</p>
            <h2>
              Forecasts, constrained decisions and auditable inventory
              execution.
            </h2>
            <p>
              The platform integrates demand forecasting, exposure assessment,
              multi-location optimisation, governed recommendation review,
              simulated stock movements and outcome evaluation. Its local
              workflow is tested against persistent data; Google Cloud adapters
              and infrastructure definitions establish deployment boundaries
              without implying a completed cloud rollout.
            </p>
          </div>
        </section>
      </article>

      <footer ref={footerRef} className="gcp-retail-footer">
        <Link className="gcp-retail-footer-back" to="/">
          Back to portfolio
        </Link>
        <button
          className="gcp-retail-footer-top"
          type="button"
          aria-label="Back to top"
          onClick={scrollToTop}
        >
          <ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </footer>
      {showTop && !footerVisible && (
        <button
          className="gcp-retail-floating-top"
          type="button"
          aria-label="Back to top"
          onClick={scrollToTop}
        >
          <ArrowUp size={17} strokeWidth={1.7} aria-hidden="true" />
        </button>
      )}
      {showStack && <TechStackModal onClose={closeStack} />}
    </main>
  );
}
