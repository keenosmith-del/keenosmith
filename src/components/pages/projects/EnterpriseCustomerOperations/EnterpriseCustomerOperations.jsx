import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUp, Layers3 } from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./EnterpriseCustomerOperations.css";

const repositoryUrl = "https://github.com/keenosmith-del/enterprise-ai-customer-operations";
const briefUrl = "/documents/enterprise-ai-customer-operations-technical-brief.pdf";

const heroTechnologies = ["React", "TypeScript", "Express", "PostgreSQL", "RabbitMQ", "LLMOps"];
const technologyGroups = [
  { heading: "Frontend", skills: ["React", "TypeScript", "Vite", "React Router", "Tailwind CSS", "Fetch API", "Lucide"] },
  { heading: "Backend and contracts", skills: ["Node.js", "Express 5", "TypeScript", "Zod", "REST APIs", "Helmet", "Rate limiting"] },
  { heading: "Database and processing", skills: ["PostgreSQL", "Prisma", "Transactional outbox", "Row leases", "RabbitMQ", "Publisher confirms", "Dead-letter queues"] },
  { heading: "AI and evaluation", skills: ["OpenAI-compatible Fetch adapter", "Deterministic demo provider", "Versioned prompts", "Schema validation", "Precision / recall / F1", "Human review"], note: "Live external model inference was not verified; the locally tested provider is deterministic and simulated." },
  { heading: "Deployment and verification", skills: ["Docker Compose", "Vitest", "GitHub Actions workflow", "Azure Service Bus SDK"], note: "Compose and RabbitMQ were tested locally. Azure connectivity and hosted GitHub Actions execution were not verified." },
];

const flow = [
  { label: "Case intake", heading: "Persist the request", body: "Creating a case stores its record, processing job, timeline event and outbox event together in PostgreSQL." },
  { label: "Background work", heading: "Process asynchronously", body: "An independent Node worker publishes confirmed events through RabbitMQ, claims jobs and records model recommendations." },
  { label: "Human review", heading: "Record the decision", body: "An operator can edit classifications and response drafts, approve a recommendation and resolve a case with an audit trail." },
];

const architecture = [
  { label: "Operator interface", heading: "React and REST", body: "The workspace exposes cases, prompt versions, evaluation runs and operational health. It reads persisted records from the API." },
  { label: "Durable coordination", heading: "PostgreSQL and RabbitMQ", body: "The API commits case and outbox state atomically. A separate worker confirms publication and acknowledges messages after durable completion." },
  { label: "AI processing", heading: "Versioned policies", body: "Classification and response-drafting prompts are captured per job. Provider outputs are validated and routed through business safety rules." },
];

const practices = [
  { heading: "At-least-once delivery", body: "Publisher confirms and manual acknowledgements retain messages across failures. Database leases, unique results and transaction boundaries prevent duplicate committed outcomes, not repeated provider calls." },
  { heading: "Review remains separate", body: "AI recommendations are drafts. Security, immediate safety and widespread outages require Critical human review; the application never sends generated responses to customers." },
  { heading: "Prompt versions are traceable", body: "Published and evaluated prompt versions are immutable. Evaluations and case jobs reference exact classification and response versions." },
  { heading: "Failure recovery is visible", body: "The Operations area shows attempts, heartbeats and dead-lettered work. Replaying a failed job creates a separately recorded successor rather than hiding the original failure." },
];

const techSummary = [
  { heading: "Frontend and API", body: "React supplies the operator pages, while the TypeScript Express API validates inputs, enforces local operator restrictions and exposes case, prompt and evaluation records.", tags: ["React", "TypeScript", "Express", "Zod", "Fetch"] },
  { heading: "Persistence and messaging", body: "Prisma and PostgreSQL store cases, recommendations, audits and job state. The independent worker uses RabbitMQ and the transactional outbox for asynchronous processing.", tags: ["PostgreSQL", "Prisma", "RabbitMQ", "Outbox", "Worker"] },
  { heading: "Prompt engineering and evaluation", body: "Two versioned prompt types support classification and response drafting. A labelled synthetic dataset exercises scoring and activation gates, with demo results clearly separated from real-model quality.", tags: ["Versioned prompts", "Schema checks", "Evaluation", "Human review"] },
  { heading: "Local operations", body: "Docker Compose runs the API, worker, frontend, database and broker. An Azure Service Bus adapter and GitHub Actions workflow are present but were not exercised in hosted environments.", tags: ["Docker Compose", "Vitest", "Azure adapter", "CI workflow"] },
];

function TechStackModal({ close }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const previousFocus = document.activeElement;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKeyDown(event) {
      if (event.key === "Escape") close();
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = priorOverflow;
      previousFocus?.focus?.();
    };
  }, [close]);
  return (
    <div className="eco-modal-overlay" onMouseDown={(event) => {
      if (event.currentTarget === event.target) close();
    }}>
      <div className="eco-modal" role="dialog" aria-modal="true" aria-label="Project technology stack" onMouseDown={(event) => event.stopPropagation()}>
        <button ref={closeRef} className="eco-modal-close" type="button" aria-label="Close tech stack" onClick={close}><span aria-hidden="true">×</span></button>
        <div className="eco-modal-groups">
          {technologyGroups.map(({ heading, note, skills }) => (
            <section className="eco-modal-group" key={heading}>
              <h2>{heading}</h2>
              {note && <p>{note}</p>}
              <div className="eco-modal-pills">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EnterpriseCustomerOperations() {
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
    if (!footerRef.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main className="eco-project">
      <Link className="eco-back" to="/"><ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" /><span>Back to portfolio</span></Link>
      <article>
        <header className="eco-hero">
          <div className="eco-hero-inner">
            <div className="eco-hero-topline">
              <div className="eco-pills" aria-label="Technologies used">{heroTechnologies.map((name) => <span key={name}>{name}</span>)}</div>
              <span className="eco-hero-context">Local engineering project</span>
            </div>
            <h1>Enterprise AI <span>Customer Operations</span></h1>
            <div className="eco-hero-bottom">
              <div>
                <p className="eco-hero-description">I built a customer case-management application with asynchronous AI recommendations, prompt versioning, evaluations and human review. The system separates intake and operator decisions from a background worker, retaining the records needed to inspect how each recommendation was produced.</p>
                <p className="eco-hero-note">Locally verified with a deterministic demo provider. External model and Azure integrations are configured but not live-tested.</p>
              </div>
              <div className="eco-hero-controls">
                <div className="eco-actions">
                  <a className="eco-button eco-source" href={repositoryUrl} target="_blank" rel="noopener noreferrer"><img src={githubSvg} alt="" aria-hidden="true" />Source</a>
                  <button className="eco-button eco-disabled" type="button" disabled>Visit platform</button>
                </div>
                <p className="eco-platform-note">This project is available in source rather than as a maintained public deployment. You can <a href="mailto:keenosmith@kailor.co.za">contact me</a> for a walkthrough.</p>
              </div>
            </div>
          </div>
        </header>

        <section className="eco-section" aria-labelledby="eco-overview">
          <span className="eco-section-label">Overview</span>
          <div className="eco-section-copy">
            <h2 id="eco-overview">Customer cases, model recommendations and operator decisions.</h2>
            <div className="eco-two-columns">
              <p>The workspace has case lists and details, Prompt Studio, Evaluations and Operations. Operators can create cases, inspect classifications, edit proposed responses, approve a draft and resolve a case.</p>
              <p>The API and worker are independent Node processes. PostgreSQL holds the case timeline, exact prompt versions, review records and delivery state; RabbitMQ carries processing work between services.</p>
            </div>
            <div className="eco-overview-actions">
              <a className="eco-button eco-brief" href={briefUrl} target="_blank" rel="noopener noreferrer">Technical brief</a>
            </div>
          </div>
        </section>

        <section className="eco-section" aria-labelledby="eco-processing">
          <span className="eco-section-label">Processing</span>
          <div className="eco-section-copy">
            <h2 id="eco-processing">How a customer case is processed.</h2>
            <p className="eco-intro">The API accepts the case without waiting for model inference. The worker completes the recommendation asynchronously, and the operator remains responsible for the outcome.</p>
            <div className="eco-three">
              {flow.map((item) => (
                <div key={item.heading}>
                  <span className="eco-small-label">{item.label}</span>
                  <h3>{item.heading}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="eco-section" aria-labelledby="eco-architecture">
          <span className="eco-section-label">Architecture</span>
          <div className="eco-section-copy">
            <h2 id="eco-architecture">The application separates requests, processing and evidence.</h2>
            <div className="eco-three">
              {architecture.map((item) => (
                <div key={item.heading}>
                  <span className="eco-small-label">{item.label}</span>
                  <h3>{item.heading}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
            <div className="eco-code" aria-label="System processing path"><span>Case intake</span><span aria-hidden="true">→</span><span>PostgreSQL outbox</span><span aria-hidden="true">→</span><span>RabbitMQ</span><span aria-hidden="true">→</span><span>Node worker</span><span aria-hidden="true">→</span><span>Review</span></div>
          </div>
        </section>

        <section className="eco-section" aria-labelledby="eco-prompts">
          <span className="eco-section-label">Prompt management</span>
          <div className="eco-section-copy">
            <h2 id="eco-prompts">Classification and response drafts have separate version histories.</h2>
            <div className="eco-two-columns">
              <p>Jobs reference the exact classification and response prompt versions captured when they were created. Operators can draft, evaluate and compare versions, with an audit trail for activation.</p>
              <p>A real-provider quality gate requires measured accuracy and schema compliance. Demo-provider evaluations cannot satisfy that gate; an operator must record an explicit override reason to activate a version.</p>
            </div>
            <div className="eco-decisions">
              {practices.map(({ heading, body }) => (
                <div key={heading}><h3>{heading}</h3><p>{body}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="eco-section" aria-labelledby="eco-evaluation">
          <span className="eco-section-label">Verification</span>
          <div className="eco-section-copy">
            <h2 id="eco-evaluation">Checks run against the application and its real local dependencies.</h2>
            <div className="eco-metrics">
              <div><strong>17</strong><span>Backend unit and adapter tests passed</span></div>
              <div><strong>6</strong><span>Frontend workflow tests passed</span></div>
              <div><strong>9</strong><span>PostgreSQL and RabbitMQ integration tests passed</span></div>
            </div>
            <div className="eco-two-columns eco-after-metrics">
              <p>A browser walkthrough verified case creation, asynchronous processing, edited approval, resolution and persistence after refresh. Prompt activation with an audited demo override was also exercised.</p>
              <p>Evaluations use 36 labelled synthetic examples and report category/priority accuracy, precision, recall, macro-F1, schema compliance and latency. Demo scores verify the workflow, not production model accuracy.</p>
            </div>
            <p className="eco-caveat">Live external-model calls, actual Azure Service Bus connectivity, hosted GitHub Actions execution and production deployment were not verified.</p>
          </div>
        </section>

        <section className="eco-section eco-technology" aria-labelledby="eco-technology">
          <span className="eco-section-label">Technologies</span>
          <div className="eco-section-copy">
            <h2 id="eco-technology">How I built the application.</h2>
            <div className="eco-tech-grid">
              {techSummary.map(({ heading, body, tags }) => (
                <div className="eco-tech-group" key={heading}>
                  <h3>{heading}</h3>
                  <p>{body}</p>
                  <div className="eco-tech-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              ))}
            </div>
            <button className="eco-button eco-tech-trigger" type="button" onClick={() => setShowStack(true)}><Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />Tech stack</button>
          </div>
        </section>

        <section className="eco-closing" aria-labelledby="eco-closing-title">
          <div>
            <p className="eco-eyebrow">Architecture and implementation</p>
            <h2 id="eco-closing-title">Event-driven case processing with human review.</h2>
            <p>The platform uses a PostgreSQL transactional outbox and an independently running worker to process cases without holding open API requests. Prompt versions, evaluation results, delivery attempts and operator changes remain traceable. RabbitMQ and the local application workflow were verified; real-provider quality, Azure connectivity and production operator identity still require separate validation.</p>
          </div>
        </section>
      </article>
      <footer ref={footerRef} className="eco-footer">
        <Link className="eco-footer-back" to="/">Back to portfolio</Link>
        <button type="button" className="eco-footer-top" onClick={scrollToTop} aria-label="Back to top"><ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" /></button>
      </footer>
      {showTop && !footerVisible && <button className="eco-floating-top" type="button" onClick={scrollToTop} aria-label="Back to top"><ArrowUp size={17} strokeWidth={1.7} aria-hidden="true" /></button>}
      {showStack && <TechStackModal close={closeStack} />}
    </main>
  );
}
