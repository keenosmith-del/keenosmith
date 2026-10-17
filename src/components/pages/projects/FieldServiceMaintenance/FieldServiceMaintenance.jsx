import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUp, Layers3 } from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./FieldServiceMaintenance.css";

const repository = "https://github.com/keenosmith-del/field-service-and-asset-maintenance";
const technicalBrief = "/documents/field-service-maintenance-technical-brief.pdf";

const featuredTechnologies = [
  "Angular",
  "ASP.NET Core 10",
  ".NET MAUI",
  "SQLite",
  "PostgreSQL",
  "Docker",
];

const technologyGroups = [
  {
    heading: "Supervisor dashboard",
    skills: ["Angular", "TypeScript", "Angular Router", "Reactive forms", "HTTP APIs", "CSV export"],
  },
  {
    heading: "Technician application",
    note: "Android MAUI APK compiled; complete native GUI/device acceptance was deferred.",
    skills: [".NET MAUI", "C#", "XAML", "MVVM", "Android", "SQLite", "SecureStorage", "Photo picker", "Native share"],
  },
  {
    heading: "API and business rules",
    skills: ["ASP.NET Core 10", "C#", "REST", "JWT", "Role-based access", "EF Core", "Optimistic concurrency", "Serializable transactions"],
  },
  {
    heading: "Offline synchronization",
    skills: ["SQLite-net", "Durable outbox", "Immutable retry payloads", "Idempotent operation IDs", "Exact receipts", "Exponential backoff", "Explicit conflict resolution"],
  },
  {
    heading: "Data and infrastructure",
    skills: ["PostgreSQL", "EF Core migrations", "Docker", "Docker Compose", "Nginx-ready Angular bundle", "GitHub Actions configuration"],
  },
  {
    heading: "Verification",
    note: "Native Android interface behaviour and Apple targets remain outside the recorded completed tests.",
    skills: ["13 C# tests", "Live HTTP/PostgreSQL checks", "Real SQLite sync-engine tests", "Angular browser checks", "Android APK build"],
  },
];

const steps = [
  { number: "01", title: "Schedule", detail: "A supervisor creates an asset, maintenance schedule and required checklist." },
  { number: "02", title: "Dispatch", detail: "A work order is assigned to a technician with a versioned job snapshot." },
  { number: "03", title: "Inspect", detail: "The technician records checklist answers, notes, faults, parts and photos in SQLite." },
  { number: "04", title: "Synchronize", detail: "The outbox sends photos and frozen mutations, retaining anything not acknowledged." },
  { number: "05", title: "Review", detail: "A supervisor checks the submitted record, completes the job and updates asset history." },
];

const deliveryStates = [
  {
    name: "Pending",
    label: "Saved on the device",
    detail: "An inspection and its outgoing operations are stored in per-user SQLite files. Closing the app does not remove them; Pending does not mean the server accepted the work.",
    meta: "Device owns the unsent changes",
  },
  {
    name: "Syncing",
    label: "A frozen request is being sent",
    detail: "Before the first network request, the app stores the complete payload and operation ID. A timeout or restart retries the identical request rather than constructing a new transaction.",
    meta: "Same operation ID and payload on retry",
  },
  {
    name: "Conflict",
    label: "The server version changed",
    detail: "Reassignment, closure, stale versions or definite rejection preserve the local draft. The technician must compare both versions and explicitly adopt the server or rebase the retained local work.",
    meta: "No automatic field merge",
  },
  {
    name: "Synced",
    label: "All required acknowledgments arrived",
    detail: "Photo uploads and mutation receipts have been stored. A synchronized submission is still Submitted on the server until a supervisor completes the review.",
    meta: "Delivery confirmation is not supervisor approval",
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
      className="fsm-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="fsm-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Field service technology stack"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          className="fsm-modal-close"
          type="button"
          aria-label="Close tech stack"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="fsm-modal-groups">
          {technologyGroups.map((group) => (
            <div className="fsm-modal-group" key={group.heading}>
              <span className="fsm-modal-category">{group.heading}</span>
              {group.note && <p className="fsm-modal-note">{group.note}</p>}
              <div className="fsm-modal-pills">
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FieldServiceMaintenance() {
  const [showStack, setShowStack] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [selectedState, setSelectedState] = useState(0);
  const footerRef = useRef(null);
  const closeStack = useCallback(() => setShowStack(false), []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const target = footerRef.current;
    if (!target || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const currentState = deliveryStates[selectedState];

  return (
    <main className="fsm-project">
      <Link className="fsm-back" to="/">
        <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />
        <span>Back to portfolio</span>
      </Link>

      <article>
        <header className="fsm-hero">
          <div className="fsm-hero-inner">
            <div className="fsm-hero-topline">
              <div className="fsm-pill-list" aria-label="Core technologies">
                {featuredTechnologies.map((technology) => <span key={technology}>{technology}</span>)}
              </div>
              <time dateTime="2026">Built 2026</time>
            </div>
            <h1>
              Field Service <span>&amp; Asset Maintenance Management</span>
            </h1>
            <div className="fsm-hero-bottom">
              <div>
                <p className="fsm-hero-description">
                  I built a maintenance system with an Angular supervisor dashboard,
                  an ASP.NET Core API and a .NET MAUI technician app. Technicians
                  can record inspections and photographs without a connection.
                  SQLite retains that work until it can be synchronized, and
                  supervisors review completed submissions against asset history.
                </p>
                <p className="fsm-hero-note">
                  Verified locally using the API, PostgreSQL and the actual SQLite
                  synchronization engine. Native Android GUI acceptance remains separate.
                </p>
              </div>
              <div className="fsm-hero-controls">
                <div className="fsm-hero-actions">
                  <a className="fsm-button fsm-button-dark" href={repository} target="_blank" rel="noopener noreferrer">
                    <img src={githubSvg} alt="" aria-hidden="true" className="fsm-github-icon" />
                    Source
                  </a>
                  <button className="fsm-button fsm-button-disabled" type="button" disabled>
                    Visit platform
                  </button>
                </div>
                <p className="fsm-hero-disclaimer">
                  Keeping every project publicly hosted would be a project in itself.
                  The source is available, or you can{" "}
                  <a href="mailto:keenosmith@kailor.co.za">contact me</a> for a walkthrough.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="fsm-section" aria-labelledby="fsm-summary-title">
          <span className="fsm-section-label">Project summary</span>
          <div className="fsm-section-body">
            <h2 id="fsm-summary-title">One maintenance record across two applications.</h2>
            <div className="fsm-columns">
              <p>
                Supervisors work with sites, assets, preventive schedules, technician
                assignments, inspection review, faults, inventory and reports. The
                dashboard is connected to an authenticated API; those records are
                stored in PostgreSQL rather than browser-only state.
              </p>
              <p>
                Technicians have a separate native workflow. An inspection can
                include checklist responses, notes, faults, used parts and photographs.
                Local work survives process restart and keeps a visible delivery state
                until the server acknowledges it.
              </p>
            </div>
            <div className="fsm-summary-action">
              <a className="fsm-button fsm-button-light" href={technicalBrief} target="_blank" rel="noopener noreferrer">
                Technical brief
              </a>
            </div>
          </div>
        </section>

        <section className="fsm-flow" aria-labelledby="fsm-flow-title">
          <div className="fsm-flow-inner">
            <span className="fsm-eyebrow">Maintenance workflow</span>
            <h2 id="fsm-flow-title">From a scheduled inspection to asset history.</h2>
            <div className="fsm-flow-grid">
              {steps.map((step) => (
                <div className="fsm-flow-step" key={step.number}>
                  <span className="fsm-flow-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="fsm-section" aria-labelledby="fsm-offline-title">
          <span className="fsm-section-label">Offline work</span>
          <div className="fsm-section-body">
            <h2 id="fsm-offline-title">The device keeps its own record until delivery succeeds.</h2>
            <p className="fsm-lead">
              The technician app stores drafts, operation IDs, photograph bytes,
              acknowledgments and previous snapshots in per-user SQLite files.
              Delivery state is separate from the work order's server status.
            </p>
            <div className="fsm-state-explorer">
              <div className="fsm-state-options" role="group" aria-label="Explore synchronization states">
                {deliveryStates.map((state, index) => (
                  <button
                    key={state.name}
                    className={`fsm-state-option ${selectedState === index ? "fsm-state-option-active" : ""}`}
                    type="button"
                    aria-pressed={selectedState === index}
                    onClick={() => setSelectedState(index)}
                  >
                    {state.name}
                  </button>
                ))}
              </div>
              <div className="fsm-state-detail" aria-live="polite">
                <span className="fsm-state-caption">{currentState.meta}</span>
                <h3>{currentState.label}</h3>
                <p>{currentState.detail}</p>
              </div>
            </div>
            <p className="fsm-small-note">This is an explanation of the implemented states, not a connection to a live technician device.</p>
          </div>
        </section>

        <section className="fsm-section" aria-labelledby="fsm-reliability-title">
          <span className="fsm-section-label">Synchronization</span>
          <div className="fsm-section-body">
            <h2 id="fsm-reliability-title">Retrying the request cannot repeat the maintenance work.</h2>
            <div className="fsm-feature-grid">
              <div>
                <h3>Frozen operations</h3>
                <p>
                  A request gets its operation ID and payload before transmission.
                  After a timeout or restart, the device retries those same bytes,
                  including when the server committed but its response was lost.
                </p>
              </div>
              <div>
                <h3>One transaction</h3>
                <p>
                  A serializable PostgreSQL transaction saves the inspection,
                  stock deductions, faults, audit event and exact response receipt.
                  Replaying that receipt does not deduct stock a second time.
                </p>
              </div>
              <div>
                <h3>Photographs first</h3>
                <p>
                  Each image has a stable identifier. Its bytes must be uploaded
                  and acknowledged before an inspection can reference it.
                  Server photos are also cached locally for offline review.
                </p>
              </div>
              <div>
                <h3>Explicit conflicts</h3>
                <p>
                  A changed assignment or stale version does not silently replace
                  the technician's draft. The technician compares local and server
                  copies, then deliberately adopts or rebases the work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="fsm-review" aria-labelledby="fsm-review-title">
          <div className="fsm-review-inner">
            <span className="fsm-eyebrow">Supervisor review</span>
            <h2 id="fsm-review-title">Submission and completion are different steps.</h2>
            <div className="fsm-review-columns">
              <p>
                A synchronized inspection becomes <strong>Submitted</strong>, not
                Completed. The supervisor opens the stored checklist, faults,
                photos, part consumption and timestamps, then records review notes
                and completes the work order.
              </p>
              <p>
                Completed inspections appear in the asset history and reports.
                Reported faults can be linked to corrective work orders.
                Preventive schedule generation is a deliberate supervisor action;
                no background scheduler is claimed.
              </p>
            </div>
          </div>
        </section>

        <section className="fsm-section" aria-labelledby="fsm-verification-title">
          <span className="fsm-section-label">Verification</span>
          <div className="fsm-section-body">
            <h2 id="fsm-verification-title">Local testing and platform boundaries.</h2>
            <div className="fsm-results">
              <div><strong>13</strong><span>Passing C# tests</span></div>
              <div><strong>1</strong><span>Live SQLite/API/PostgreSQL journey</span></div>
              <div><strong>0</strong><span>Android APK compiler warnings or errors</span></div>
            </div>
            <div className="fsm-columns fsm-verification-copy">
              <p>
                The October 3 verification covers role restrictions, photo upload
                and replay, version conflicts, disconnected edits, lost server
                acknowledgments, stock deductions exactly once, supervisor review,
                reports and audit records. The Angular dashboard also passed
                focused browser checks.
              </p>
              <p>
                The Android Debug APK compiled and was exported, but the complete
                native GUI flow was not executed on an emulator or device. iOS and
                Mac Catalyst builds were not verified. The application is a local
                demonstration, not a production mobile deployment.
              </p>
            </div>
          </div>
        </section>

        <section className="fsm-technology" aria-labelledby="fsm-tech-title">
          <div className="fsm-technology-inner">
            <span className="fsm-eyebrow">Technology</span>
            <h2 id="fsm-tech-title">The implementation.</h2>
            <div className="fsm-technology-grid">
              <div>
                <h3>Supervisor and API</h3>
                <p>Angular, ASP.NET Core 10, EF Core and PostgreSQL handle assets, work orders, roles, transactions and reporting.</p>
              </div>
              <div>
                <h3>Technician and offline storage</h3>
                <p>.NET MAUI, XAML, SQLite and a durable outbox preserve field inspections, photographs and retries across disconnections.</p>
              </div>
            </div>
            <button className="fsm-button fsm-tech-trigger" type="button" onClick={() => setShowStack(true)}>
              <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />
              Tech stack
            </button>
          </div>
        </section>
      </article>

      <footer ref={footerRef} className="fsm-footer">
        <Link className="fsm-footer-back" to="/">Back to portfolio</Link>
        <button type="button" className="fsm-footer-top" onClick={scrollToTop} aria-label="Back to top">
          <ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </footer>

      {showTop && !footerVisible && (
        <button className="fsm-floating-top" type="button" aria-label="Back to top" onClick={scrollToTop}>
          <ArrowUp size={17} strokeWidth={1.7} aria-hidden="true" />
        </button>
      )}
      {showStack && <TechStackModal onClose={closeStack} />}
    </main>
  );
}
