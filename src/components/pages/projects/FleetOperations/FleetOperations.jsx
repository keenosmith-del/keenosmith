import ProjectNavigation from "../shared/ProjectNavigation.jsx";
import useProjectPage from "../shared/useProjectPage.js";
import ProjectModal from "../shared/ProjectModal.jsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUp, Layers3 } from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./FleetOperations.css";

const repository =
  "https://github.com/keenosmith-del/real-time-logistics-and-fleet-ops";
const technicalBrief = "/documents/fleet-operations-technical-brief.pdf";

const heroTechnologies = [
  "React / TypeScript",
  "Go",
  "Redpanda",
  "TimescaleDB",
  "Redis",
  "WebSockets",
];

const technologyGroups = [
  {
    heading: "Dispatcher frontend",
    skills: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "MapLibre GL",
      "REST",
      "WebSockets",
      "Fetch API",
    ],
  },
  {
    heading: "Backend and simulation",
    skills: [
      "Go 1.24",
      "Go HTTP",
      "gorilla/websocket",
      "Concurrent journey simulator",
      "Transactional dispatch",
      "Context cancellation",
    ],
  },
  {
    heading: "Streaming",
    note: "One Redpanda broker in the local demonstration; two independently committed consumer groups.",
    skills: [
      "Redpanda",
      "Kafka protocol",
      "fleet.telemetry.v1",
      "history-v1",
      "live-v1",
      "Dead-letter topic",
      "At-least-once delivery",
      "Idempotent effects",
    ],
  },
  {
    heading: "Data and cache",
    skills: [
      "PostgreSQL",
      "TimescaleDB hypertable",
      "pgx",
      "Redis",
      "Processed-event ledger",
      "Transactional assignment history",
      "Chronological replay",
    ],
  },
  {
    heading: "Observability and deployment",
    note: "Compose was validated. Kubernetes manifests were structurally checked but not deployed to a cluster.",
    skills: [
      "Docker Compose",
      "Nginx",
      "Prometheus",
      "Grafana",
      "Consumer lag metrics",
      "Kubernetes manifests",
    ],
  },
];

const journey = [
  {
    heading: "Plan",
    description: "Create deliveries, choose a depot and order route stops.",
  },
  {
    heading: "Assign",
    description: "Allocate an available driver and vehicle, then dispatch.",
  },
  {
    heading: "Observe",
    description: "Receive vehicle positions and inspect operational alerts.",
  },
  {
    heading: "Intervene",
    description: "Acknowledge an exception and reassign unfinished work.",
  },
  {
    heading: "Review",
    description: "Inspect delivery outcomes and replay stored GPS history.",
  },
];

const scenarios = [
  {
    id: "deviation",
    name: "Route deviation",
    condition:
      "A vehicle moves beyond the configured distance from its planned route.",
    mechanism:
      "The history consumer measures the distance to every route segment rather than only comparing the current point to a destination.",
    action:
      "The dispatcher can acknowledge the alert, inspect the journey and choose a recovery action.",
  },
  {
    id: "delay",
    name: "Late delivery",
    condition:
      "A delivery remains outstanding beyond its deadline and configured grace period.",
    mechanism:
      "The system compares the GPS event time with the stored delivery deadline. The alert is retained in the event history.",
    action:
      "The dispatcher can intervene, reassign the affected delivery and record the reason.",
  },
  {
    id: "stop",
    name: "Prolonged stop",
    condition:
      "A vehicle remains stationary for the configured real elapsed time.",
    mechanism:
      "Detection records the beginning of the stationary interval; simulation speed does not substitute for elapsed time.",
    action:
      "The dispatcher can inspect the stop and acknowledge or resolve the alert with notes.",
  },
  {
    id: "breakdown",
    name: "Vehicle breakdown",
    condition:
      "A breakdown scenario marks a vehicle unavailable and disrupts its active route.",
    mechanism:
      "The current journey is paused and a critical alert is recorded, without losing the original assignment history.",
    action:
      "A replacement driver and vehicle can be assigned to a recovery route for outstanding deliveries.",
  },
];

const verification = [
  {
    value: "100",
    title: "simulated vehicles",
    detail: "Positions streamed through Redpanda and WebSocket",
  },
  {
    value: "2,200",
    title: "processed events",
    detail: "Durable events recorded at the September checkpoint",
  },
  {
    value: "2",
    title: "delivery completions",
    detail: "One intervention, one simulated arrival",
  },
];

function TechStackModal({ onClose }) {
  return <ProjectModal onClose={onClose} groups={technologyGroups} />;
}

export default function FleetOperations() {
  const pageRef = useProjectPage();
  const [showStack, setShowStack] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [scenario, setScenario] = useState("deviation");
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
      { threshold: 0.12 },
    );
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const selectedScenario =
    scenarios.find((item) => item.id === scenario) || scenarios[0];

  return (
    <main ref={pageRef} className="project-case-study fleet-project">
      <ProjectNavigation className="fleet-back" />

      <article>
        <header className="fleet-hero">
          <div className="fleet-hero-inner">
            <div className="fleet-hero-topline">
              <div className="fleet-pill-list" aria-label="Main technologies">
                {heroTechnologies.map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
              <time dateTime="2026-09" >September 2026</time>
            </div>
            <h1>
              Real-Time Logistics{" "}
              <span>&amp; Fleet Operations Intelligence</span>
            </h1>
            <div className="fleet-hero-bottom">
              <div className="fleet-hero-copy">
                <p className="fleet-hero-description">
                  I built a dispatcher application for a fictional South African
                  logistics operator. It covers delivery planning, vehicle
                  assignment, simulated GPS tracking, exception handling and
                  journey replay. The frontend receives live updates over
                  WebSockets while the backend stores an independent, queryable
                  location history.
                </p>
                <p className="fleet-hero-note">
                  A verified local Docker Compose implementation using fictional
                  routes and destinations.
                </p>
              </div>
              <div className="fleet-hero-controls">
                <div className="fleet-hero-actions">
                  <a
                    className="fleet-button fleet-button-source"
                    href={repository}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={githubSvg} alt="" aria-hidden="true" /> Source
                  </a>
                  <button
                    className="fleet-button fleet-button-disabled"
                    type="button"
                    disabled
                  >
                    Visit platform
                  </button>
                </div>
                <p className="fleet-deployment-note">
                  I haven't kept this one publicly hosted. The code is
                  available, or{" "}
                  <a href="mailto:keenosmith@kailor.co.za">contact me</a> for a
                  walkthrough.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section
          className="fleet-section"
          aria-labelledby="fleet-overview-title"
        >
          <div className="fleet-section-label">Project summary</div>
          <div className="fleet-section-copy">
            <h2 id="fleet-overview-title">
              A dispatcher interface connected to operational records.
            </h2>
            <div className="fleet-two-columns">
              <p>
                The application lets dispatchers create deliveries, plan route
                stops, assign vehicles and drivers, and record completion or a
                recovery decision. The operations screens use actual REST
                responses, with persisted assignments and alert history rather
                than frontend-only state.
              </p>
              <p>
                A Go service runs the APIs and simulated journeys. GPS events
                move through Redpanda into separate history and live consumers.
                TimescaleDB stores chronological telemetry; Redis holds the
                current-position projection displayed on the map.
              </p>
            </div>
            <a
              className="fleet-button fleet-button-soft fleet-brief-link"
              href={technicalBrief}
              target="_blank"
              rel="noopener noreferrer"
            >
              Technical brief
            </a>
          </div>
        </section>

        <section
          className="fleet-workflow"
          aria-labelledby="fleet-workflow-title"
        >
          <div className="fleet-workflow-inner">
            <div className="fleet-workflow-heading">
              <span className="fleet-eyebrow">Application workflow</span>
              <h2 id="fleet-workflow-title">
                From delivery creation to recorded outcome.
              </h2>
              <p>
                The sequence below follows the implemented dispatcher journey. A
                completed delivery and its intervention history remain available
                afterward.
              </p>
            </div>
            <div className="fleet-workflow-steps">
              {journey.map((step) => (
                <div className="fleet-workflow-step" key={step.heading}>
                  <h3>{step.heading}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="fleet-section"
          aria-labelledby="fleet-architecture-title"
        >
          <div className="fleet-section-label">System architecture</div>
          <div className="fleet-section-copy">
            <h2 id="fleet-architecture-title">
              One Go backend. Two uses for each GPS event.
            </h2>
            <p className="fleet-lead">
              The application separates durable telemetry from the latest
              position shown in the browser. The two consumer groups can recover
              independently after interruptions.
            </p>
            <div
              className="fleet-stream-diagram"
              aria-label="GPS event processing architecture"
            >
              <div className="fleet-stream-origin">
                <span className="fleet-diagram-caption">Source</span>
                <strong>Journey simulator</strong>
                <small>Go · checkpointed progress</small>
              </div>
              <div className="fleet-diagram-connector" aria-hidden="true">
                <ArrowRight size={18} strokeWidth={1.5} />
              </div>
              <div className="fleet-stream-origin fleet-stream-broker">
                <span className="fleet-diagram-caption">Event stream</span>
                <strong>Redpanda</strong>
                <small>fleet.telemetry.v1</small>
              </div>
              <div className="fleet-stream-branches">
                <div className="fleet-stream-branch">
                  <span className="fleet-diagram-caption">history-v1</span>
                  <strong>PostgreSQL / TimescaleDB</strong>
                  <small>Deduplicated telemetry, alerts and replay</small>
                </div>
                <div className="fleet-stream-branch">
                  <span className="fleet-diagram-caption">live-v1</span>
                  <strong>Redis → WebSockets</strong>
                  <small>Newest position and dispatcher updates</small>
                </div>
              </div>
            </div>
            <p className="fleet-diagram-footnote">
              Events are delivered at least once. Event IDs, monotonic
              timestamps and committed effects prevent duplicate processing and
              stale map rewinds.
            </p>
          </div>
        </section>

        <section
          className="fleet-section"
          aria-labelledby="fleet-exceptions-title"
        >
          <div className="fleet-section-label">Exceptions and recovery</div>
          <div className="fleet-section-copy">
            <h2 id="fleet-exceptions-title">
              Four exception types, each with a recorded response.
            </h2>
            <p className="fleet-lead">
              These controls explain implemented detectors; they do not start
              simulations from the portfolio.
            </p>
            <div
              className="fleet-scenario-options"
              role="group"
              aria-label="Explore exception handling"
            >
              {scenarios.map((item) => (
                <button
                  className={`fleet-scenario-option${scenario === item.id ? " is-active" : ""}`}
                  type="button"
                  key={item.id}
                  aria-pressed={scenario === item.id}
                  onClick={() => setScenario(item.id)}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <div className="fleet-scenario-detail" aria-live="polite">
              <div className="fleet-scenario-header">
                <span className="fleet-eyebrow">Selected exception</span>
                <h3>{selectedScenario.name}</h3>
              </div>
              <div className="fleet-scenario-grid">
                <div>
                  <span>Detection</span>
                  <p>{selectedScenario.condition}</p>
                </div>
                <div>
                  <span>Implementation</span>
                  <p>{selectedScenario.mechanism}</p>
                </div>
                <div>
                  <span>Operator action</span>
                  <p>{selectedScenario.action}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="fleet-evidence"
          aria-labelledby="fleet-evidence-title"
        >
          <div className="fleet-evidence-inner">
            <span className="fleet-eyebrow">
              Local verification · September 2026
            </span>
            <h2 id="fleet-evidence-title">
              What the recorded tests established.
            </h2>
            <div className="fleet-evidence-grid">
              {verification.map((item) => (
                <div className="fleet-evidence-item" key={item.title}>
                  <strong>{item.value}</strong>
                  <span>{item.title}</span>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
            <p className="fleet-evidence-note">
              Additional checks covered resource conflicts, all four alert
              detectors, restart recovery, dead-letter handling, real journey
              replay, Prometheus scraping and Grafana provisioning.
            </p>
          </div>
        </section>

        <section
          className="fleet-section"
          aria-labelledby="fleet-decisions-title"
        >
          <div className="fleet-section-label">Engineering decisions</div>
          <div className="fleet-section-copy">
            <h2 id="fleet-decisions-title">
              What the implementation prioritises.
            </h2>
            <div className="fleet-decision-list">
              <div>
                <h3>Persist the history</h3>
                <p>
                  Telemetry, delivery outcomes and assignments belong in
                  PostgreSQL/TimescaleDB. Redis is a replaceable projection
                  rather than the financial or operational source of truth.
                </p>
              </div>
              <div>
                <h3>Keep ordering predictable</h3>
                <p>
                  Telemetry is partitioned by vehicle. Consumers commit after
                  their effects, while event identities and timestamp checks
                  handle retries or delayed GPS readings.
                </p>
              </div>
              <div>
                <h3>Record intervention</h3>
                <p>
                  Replacing a broken vehicle is a transaction: old assignments
                  close, a recovery route is created, and its reason is
                  preserved. Completed deliveries remain attached to the
                  original route.
                </p>
              </div>
              <div>
                <h3>Use a bounded local topology</h3>
                <p>
                  A single backend owns simulation and WebSocket fanout. Routing
                  uses deterministic fictional street-leg geometry, not a
                  road-network optimisation service.
                </p>
              </div>
            </div>
            <p className="fleet-limitations">
              The Docker Compose workflow was executed locally. Kubernetes
              manifests were structurally checked, but no cluster deployment was
              run. Authentication, TLS, multi-replica ownership and production
              capacity tests remain outside this demonstration.
            </p>
          </div>
        </section>

        <section
          className="fleet-section fleet-technology"
          aria-labelledby="fleet-tech-title"
        >
          <div className="fleet-section-label">Technology</div>
          <div className="fleet-section-copy">
            <h2 id="fleet-tech-title">Technology stack</h2>
            <div className="fleet-tech-groups">
              <div>
                <h3>Application</h3>
                <p>
                  React, TypeScript, Vite and MapLibre provide the dispatcher
                  views. Go handles REST operations, simulated journeys and
                  WebSocket connections.
                </p>
              </div>
              <div>
                <h3>Streaming and state</h3>
                <p>
                  Redpanda connects the simulator to historical and live
                  consumers. PostgreSQL/TimescaleDB persists history, and Redis
                  serves current positions.
                </p>
              </div>
              <div>
                <h3>Operations</h3>
                <p>
                  Docker Compose runs the verified local stack. Prometheus and
                  Grafana provide pipeline metrics; a separate Kubernetes
                  deployment definition is included.
                </p>
              </div>
            </div>
            <button
              className="fleet-button fleet-tech-trigger"
              type="button"
              onClick={() => setShowStack(true)}
            >
              <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" /> Tech
              stack
            </button>
          </div>
        </section>
        <section className="project-closing" aria-labelledby="project-closing-title">
          <h2 id="project-closing-title">From vehicle events to an operational fleet view.</h2>
          <p>I connected simulated vehicle telemetry to a streaming pipeline, persistent trip records and a live operations interface. The project brings together event ingestion, exception handling and delivery history, with replayable local evidence rather than claims of a deployed commercial fleet.</p>
        </section>
      </article>

      <footer ref={footerRef} className="fleet-footer">
        <Link className="fleet-footer-back" to="/">
          Back to portfolio
        </Link>
        <button
          type="button"
          className="fleet-footer-top"
          onClick={scrollTop}
          aria-label="Back to top"
        >
          <ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </footer>

      {showTop && !footerVisible && (
        <button
          type="button"
          className="fleet-floating-top"
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
