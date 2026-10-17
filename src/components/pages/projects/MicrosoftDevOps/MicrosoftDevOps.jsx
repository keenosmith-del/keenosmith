import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUp, Layers3 } from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./MicrosoftDevOps.css";

const repositoryUrl =
  "https://github.com/keenosmith-del/microsoft-ai-powered-software-engineering-devops";
const technicalBrief = "/documents/microsoft-devops-technical-brief.pdf";

const heroTechnologies = [
  "Azure AI Foundry",
  "React",
  "FastAPI",
  "MongoDB",
  "GitHub",
  "Azure Monitor",
];

// The groups deliberately separate local implementation from optional external services.
const technologyGroups = [
  {
    heading: "Frontend",
    skills: ["React 19", "TypeScript", "Vite", "Fetch API", "Lucide React"],
  },
  {
    heading: "Backend",
    skills: ["Node.js", "Express 5", "REST APIs", "Python", "FastAPI", "Pydantic"],
  },
  {
    heading: "Database",
    skills: ["MongoDB", "Mongoose", "Durable investigation runs", "Workflow audit history"],
  },
  {
    heading: "AI engineering",
    note: "Foundry inference requires a separately configured Azure project and model deployment.",
    skills: ["Azure AI Foundry", "Azure OpenAI", "Three specialist agents", "Evidence-grounded prompts", "Tool telemetry"],
  },
  {
    heading: "Cloud and external integrations",
    note: "Azure and GitHub evidence adapters are read-oriented and require configured credentials and scopes.",
    skills: ["Azure Resource Manager", "Azure Monitor", "Application Insights", "Log Analytics", "GitHub REST API", "GitHub webhooks", "Azure Identity"],
  },
  {
    heading: "Knowledge and retrieval",
    note: "Local Ollama embeddings are optional; lexical retrieval remains available without them.",
    skills: ["Markdown ingestion", "MongoDB knowledge index", "Ollama embeddings", "Cosine ranking", "Lexical fallback"],
  },
  {
    heading: "Delivery and verification",
    skills: ["Docker", "Docker Compose", "GitHub Actions", "Node test runner", "Python unittest", "Playwright", "Oxlint"],
  },
  {
    heading: "Not implemented as live services",
    note: "These must not be represented as deployed platform capabilities.",
    skills: ["Production Azure hosting", "Entra SSO", "Azure AI Search", "Autonomous cloud remediation"],
  },
];

const specialists = [
  {
    name: "Software Engineering",
    description:
      "Frames the problem, implementation considerations, risks and validation requirements before the wider investigation.",
    detail: "Structured technical assessment",
  },
  {
    name: "Incident Investigation",
    description:
      "Reviews repository metadata, relevant commits and diffs alongside available Azure resource evidence. Potential causes remain hypotheses until supported.",
    detail: "Source-linked investigation",
  },
  {
    name: "Engineering Action",
    description:
      "Turns the investigation into one bounded proposed action, identifying affected files, evidence, checks and outstanding uncertainty.",
    detail: "Reviewable remediation proposal",
  },
];

const workflowStages = [
  { label: "Detect", detail: "GitHub failure or Azure alert, or an engineer-created incident" },
  { label: "Investigate", detail: "Leased agent run with persisted stage events and evidence" },
  { label: "Review", detail: "Accept or reject findings against the current run" },
  { label: "Plan", detail: "Record, edit and approve a linked remediation proposal" },
  { label: "Verify", detail: "Record the change and assess actual observations" },
  { label: "Resolve", detail: "Explicit resolution, report history and possible reopening" },
];

const technicalChoices = [
  {
    name: "Durable execution",
    description:
      "MongoDB stores investigations, stage events and lease ownership. Workers can recover expired work without treating a browser refresh as a failed investigation.",
  },
  {
    name: "Controlled transitions",
    description:
      "A canonical incident workflow validates each transition. Version checks, idempotency keys and approval linkage prevent duplicate or stale actions from silently changing state.",
  },
  {
    name: "Evidence provenance",
    description:
      "Signals, commit information, logs, source references and tool activity stay attached to the relevant incident and investigation run. A nearby commit is not automatically a root cause.",
  },
  {
    name: "Recovery verification",
    description:
      "Azure Monitor comparisons use explicit baseline and current windows when configured. Measured outcomes remain separate from the human decision to resolve an incident.",
  },
];

function TechStackModal({ onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        // The close control is the only interactive element in this dialog.
        event.preventDefault();
        closeRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="mdo-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="mdo-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Project technology stack"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          className="mdo-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close tech stack"
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="mdo-modal-groups">
          {technologyGroups.map((group) => (
            <div className="mdo-modal-group" key={group.heading}>
              <span className="mdo-modal-category">{group.heading}</span>
              {group.note && <p className="mdo-modal-note">{group.note}</p>}
              <div className="mdo-modal-pills">
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

export default function MicrosoftDevOps() {
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
    <main className="mdo-project">
      <Link className="mdo-back" to="/">
        <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />
        <span>Back to portfolio</span>
      </Link>

      <article>
        <header className="mdo-hero">
          <div className="mdo-hero-inner">
            <div className="mdo-hero-topline">
              <div className="mdo-pill-list" aria-label="Principal technologies">
                {heroTechnologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
              <time dateTime="2026-10">Built March 2026</time>
            </div>
            <h1>Microsoft Azure <span>DevOps Software Engineering Platform</span></h1>
            <div className="mdo-hero-bottom">
              <div>
                <p className="mdo-hero-description">
                  I built a software engineering and DevOps operations platform
                  that brings GitHub delivery signals, Azure evidence and
                  specialist AI agents into the same incident workflow. It moves
                  an investigation from initial detection through reviewed
                  remediation and recovery verification, while preserving the
                  evidence and decisions behind each change.
                </p>
                <p className="mdo-hero-note">
                  Full-stack implementation verified locally. Production Azure
                  deployment and live Foundry inference are not claimed.
                </p>
              </div>
              <div className="mdo-hero-controls">
                <div className="mdo-hero-actions">
                  <a
                    className="mdo-button mdo-button-dark"
                    href={repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={githubSvg} className="mdo-github-icon" alt="" aria-hidden="true" />
                    Source
                  </a>
                  <button className="mdo-button mdo-button-disabled" type="button" disabled>
                    Visit platform
                  </button>
                </div>
                <p className="mdo-platform-note">
                  This is not hosted as a public service. The repository includes
                  the implementation and verification records, or you can{" "}
                  <a href="mailto:keenosmith@kailor.co.za">contact me</a> for a walkthrough.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="mdo-section mdo-overview" id="mdo-overview">
          <div className="mdo-section-label">Project overview</div>
          <div className="mdo-section-copy">
            <h2>One place for signals, evidence and engineering decisions.</h2>
            <div className="mdo-two-columns">
              <p>
                A failed deployment rarely explains itself. The relevant facts
                can sit across workflow logs, commits, pull requests, cloud
                resources and operational telemetry. I built the platform to
                organise that evidence around an incident rather than another
                disconnected dashboard.
              </p>
              <p>
                The application connects investigation to accountable action:
                findings can be accepted or rejected, remediation proposals
                reviewed, changes recorded and recovery checked. Previous runs
                and decisions remain available even after an incident is closed
                and later reopened.
              </p>
            </div>
            <div className="mdo-summary-action">
              <a
                href={technicalBrief}
                target="_blank"
                rel="noopener noreferrer"
                className="mdo-button mdo-button-soft"
              >
                Technical brief
              </a>
            </div>
          </div>
        </section>

        <section className="mdo-section mdo-workflow">
          <div className="mdo-section-label">Incident lifecycle</div>
          <div className="mdo-section-copy">
            <h2>From delivery failure to a documented recovery.</h2>
            <p className="mdo-section-intro">
              Incidents follow a canonical persisted workflow, not a loose
              collection of AI responses. Each stage has its own evidence,
              permissions and conditions for progression.
            </p>
            <div className="mdo-workflow-grid">
              {workflowStages.map((stage) => (
                <div className="mdo-workflow-stage" key={stage.label}>
                  <h3>{stage.label}</h3>
                  <p>{stage.detail}</p>
                </div>
              ))}
            </div>
            <p className="mdo-afterword">
              Rejected findings can return to investigation. Failed verification
              returns to remediation; inconclusive results do not become a
              successful resolution. Reopening preserves historical decisions.
            </p>
          </div>
        </section>

        <section className="mdo-agents-section">
          <div className="mdo-agents-inner">
            <p className="mdo-eyebrow">Agent architecture</p>
            <h2>Three specialists. Different responsibilities.</h2>
            <p className="mdo-agents-intro">
              I separated engineering analysis, incident investigation and
              recommended action into sequential stages. The Python runtime
              uses Azure AI Foundry through an authenticated client when
              configured, while the application records actual stage progress
              and outcomes rather than simulating agent activity.
            </p>
            <div className="mdo-agent-grid">
              {specialists.map((specialist) => (
                <div className="mdo-agent" key={specialist.name}>
                  <span className="mdo-agent-detail">{specialist.detail}</span>
                  <h3>{specialist.name}</h3>
                  <p>{specialist.description}</p>
                </div>
              ))}
            </div>
            <p className="mdo-agents-footnote">
              Provider availability and model quality are reported separately;
              a configured endpoint or authenticated identity is not proof of
              successful model inference.
            </p>
          </div>
        </section>

        <section className="mdo-section mdo-durability">
          <div className="mdo-section-label">Platform engineering</div>
          <div className="mdo-section-copy">
            <h2>The incident record is more important than the browser session.</h2>
            <p className="mdo-section-intro">
              The Express API owns the operational workflow, MongoDB retains its
              history and the Python/FastAPI runtime performs specialist analysis.
              Investigations run through a leased worker so the workflow can
              survive refreshes, interrupted requests and retries.
            </p>
            <div className="mdo-decision-grid">
              {technicalChoices.map((item) => (
                <div key={item.name}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mdo-section mdo-azure">
          <div className="mdo-section-label">Azure and GitHub</div>
          <div className="mdo-section-copy">
            <h2>Cloud evidence should be observed, not assumed.</h2>
            <div className="mdo-two-columns mdo-cloud-copy">
              <p>
                GitHub adapters retrieve repository context, workflow status,
                relevant commits and bounded log excerpts. Signed webhooks can
                ingest delivery failures with provenance and deduplication, then
                associate them with a durable incident investigation.
              </p>
              <p>
                Azure integrations support resource inventory, scoped Monitor
                metrics and configured Application Insights or Log Analytics
                queries. Unavailable providers, missing permissions and absent
                measurements remain visible rather than being translated into
                invented healthy status.
              </p>
            </div>
            <div className="mdo-evidence-grid">
              <div>
                <h3>Source control and delivery</h3>
                <p>
                  GitHub branches, commit diffs, workflow jobs, deployments and
                  pull requests provide the engineering context around a signal.
                  A recent commit is evidence to investigate, not automatic
                  proof of causation.
                </p>
              </div>
              <div>
                <h3>Azure operations</h3>
                <p>
                  Resource-scoped collection uses Azure Identity and explicit
                  allowlists. Measurement comparisons require compatible units,
                  time windows and complete observations before presenting a
                  meaningful result.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mdo-section mdo-governance">
          <div className="mdo-section-label">Change governance</div>
          <div className="mdo-section-copy">
            <h2>Investigation is automated. Production authority is not.</h2>
            <p className="mdo-section-intro">
              The platform supports human review, separately approved proposals,
              explicit change records and verification. An AI recommendation
              cannot itself authorize a cloud mutation or resolve an incident.
              This matters in businesses where auditability and change control
              are as important as engineering speed.
            </p>
            <div className="mdo-governance-points">
              <div>
                <h3>Separate review and approval</h3>
                <p>
                  A proposal must be linked to accepted findings from the current
                  investigation. Backend rules check permissions, versions and
                  approver decisions before progressing the lifecycle.
                </p>
              </div>
              <div>
                <h3>Constrained GitHub changes</h3>
                <p>
                  Optional draft pull requests are disabled by default. When
                  explicitly configured, the system requires a reviewed file
                  diff, policy-scoped paths and direct operator confirmation.
                  There is no automatic merge, deployment or Azure remediation.
                </p>
              </div>
              <div>
                <h3>Session and evidence controls</h3>
                <p>
                  HttpOnly cookie sessions, CSRF protection, role checks, bounded
                  tool inputs and redacted evidence protect the operational
                  surface. Microsoft Entra SSO is not an implemented feature.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mdo-section mdo-knowledge">
          <div className="mdo-section-label">Engineering knowledge</div>
          <div className="mdo-section-copy">
            <h2>Resolved incidents become searchable engineering context.</h2>
            <p className="mdo-section-intro">
              Technical notes and approved incident reports can be ingested as
              retained knowledge with source attribution. Retrieval supports
              real locally configured Ollama embeddings and cosine ranking, or
              a clearly labelled lexical fallback when semantic indexing is
              unavailable.
            </p>
            <p className="mdo-section-intro">
              I kept retrieval status explicit because an engineer needs to know
              whether an answer came from a compatible document index or a
              simpler text search. Agent context does not give retrieved material
              permission to override application controls.
            </p>
          </div>
        </section>

        <section className="mdo-section mdo-technology">
          <div className="mdo-section-label">Technology</div>
          <div className="mdo-section-copy">
            <h2>A full-stack system with a separate agent runtime.</h2>
            <p className="mdo-section-intro">
              React and TypeScript handle the operator interface; Express owns
              sessions, incidents and the durable workflow; and FastAPI isolates
              the Python agent runtime. MongoDB holds the operational record,
              while GitHub and Azure are connected through bounded provider
              integrations rather than given unrestricted access.
            </p>
            <div className="mdo-technology-grid">
              <div>
                <h3>Frontend</h3>
                <p>Operational navigation, incident workspaces and persistent history.</p>
                <div className="mdo-tech-tags">
                  <span>React</span><span>TypeScript</span><span>Vite</span><span>Fetch API</span>
                </div>
              </div>
              <div>
                <h3>Backend and agents</h3>
                <p>API workflows, leased execution and specialist model calls.</p>
                <div className="mdo-tech-tags">
                  <span>Node.js</span><span>Express</span><span>Python</span><span>FastAPI</span><span>Foundry</span>
                </div>
              </div>
              <div>
                <h3>Data and retrieval</h3>
                <p>Incident records, audit history, reports and indexed context.</p>
                <div className="mdo-tech-tags">
                  <span>MongoDB</span><span>Mongoose</span><span>Ollama</span><span>Lexical search</span>
                </div>
              </div>
              <div>
                <h3>Cloud and delivery</h3>
                <p>Scoped operational evidence and repeatable local verification.</p>
                <div className="mdo-tech-tags">
                  <span>Azure Monitor</span><span>GitHub API</span><span>Docker</span><span>Playwright</span>
                </div>
              </div>
            </div>
            <button
              className="mdo-button mdo-button-dark mdo-tech-trigger"
              type="button"
              onClick={() => setShowStack(true)}
            >
              <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />
              Tech stack
            </button>
          </div>
        </section>

        <section className="mdo-closing">
          <div>
            <p className="mdo-eyebrow">Architecture and delivery</p>
            <h2>Evidence, change control and recovery in one operational record.</h2>
            <p>
              The implementation connects source-control and cloud signals to a
              durable investigation lifecycle, Azure AI Foundry agent contracts,
              accountable human approvals and retained verification history.
              Its end-to-end local workflow is tested; external inference,
              production hosting and live remediation remain separately
              configured or unverified boundaries.
            </p>
          </div>
        </section>
      </article>

      <footer ref={footerRef} className="mdo-footer">
        <Link className="mdo-footer-back" to="/">Back to portfolio</Link>
        <button
          className="mdo-footer-top"
          type="button"
          aria-label="Back to top"
          onClick={scrollToTop}
        >
          <ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </footer>

      {showTop && !footerVisible && (
        <button
          className="mdo-floating-top"
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
