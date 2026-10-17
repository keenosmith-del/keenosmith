import ProjectNavigation from "../shared/ProjectNavigation.jsx";
import useProjectPage from "../shared/useProjectPage.js";
import ProjectModal from "../shared/ProjectModal.jsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUp, Layers3, ShieldCheck, FileText, GitBranch, Database } from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./DeepSeekWorkforce.css";

const repository =
  "https://github.com/keenosmith-del/deepseek-ai-workforce-planning";
const technicalBrief = "/documents/deepseek-workforce-technical-brief.pdf";

const featuredTechnologies = [
  "DeepSeek-R1",
  "Ollama",
  "ASP.NET Core 10",
  "PostgreSQL",
  "pgvector",
  "FastAPI",
];

const technologyGroups = [
  {
    heading: "Frontend",
    skills: ["React", "TypeScript", "Vite", "CSS", "Fetch API", "nginx"],
  },
  {
    heading: "Backend and identity",
    skills: [
      "C#",
      ".NET 10",
      "ASP.NET Core",
      "Entity Framework Core",
      "JWT",
      "Role-based access",
      "PBKDF2-SHA256",
      "Optimistic concurrency",
    ],
  },
  {
    heading: "AI and document intelligence",
    note: "Models are executed locally; DeepSeek selects evidence, not a hiring outcome.",
    skills: [
      "DeepSeek-R1 Distill 1.5B",
      "Ollama",
      "Python",
      "FastAPI",
      "Pydantic",
      "pypdf",
      "python-docx",
      "Schema-constrained JSON",
      "Evidence validation",
    ],
  },
  {
    heading: "Embeddings and retrieval",
    note: "Semantic similarity describes skill-taxonomy text, never a candidate score.",
    skills: [
      "nomic-embed-text",
      "768-dimensional embeddings",
      "PostgreSQL",
      "pgvector",
      "Cosine similarity",
      "HNSW index",
      "Taxonomy aliases",
    ],
  },
  {
    heading: "Persistence and operations",
    skills: [
      "PostgreSQL",
      "EF Core migrations",
      "Durable processing jobs",
      "Advisory locks",
      "Docker Compose",
      "Private volumes",
      "Health checks",
    ],
  },
  {
    heading: "Infrastructure and delivery",
    note: "OpenTofu validated against a Docker provider; no deployment apply or public hosting verified.",
    skills: [
      "OpenTofu",
      "Docker",
      "GitHub Actions (configured)",
      "Python tests",
      "Integration smoke tests",
    ],
  },
];

const workflow = [
  {
    label: "Capture",
    sub: "Private PDF/DOCX upload; retain exact source sections and original file.",
  },
  {
    label: "Extract",
    sub: "Conservative skills and experience facts begin as Unverified.",
  },
  {
    label: "Review",
    sub: "Recruiter confirms, corrects or rejects claims with recorded reasons.",
  },
  {
    label: "Explain",
    sub: "DeepSeek maps checked evidence to vacancy requirements; never ranks people.",
  },
];

function TechStackModal({ onClose }) {
  return <ProjectModal onClose={onClose} groups={technologyGroups} />;
}

export default function DeepSeekWorkforce() {
  const pageRef = useProjectPage();
  const [stackOpen, setStackOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef(null);
  const closeStack = useCallback(() => setStackOpen(false), []);

  useEffect(() => {
    const updateScroll = () => setShowTop(window.scrollY > 300);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
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
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main ref={pageRef} className="project-case-study deepseek-project">
      <ProjectNavigation className="deepseek-back" />
      <article>
        <header className="deepseek-hero">
          <div className="deepseek-hero-inner">
            <div className="deepseek-hero-topline">
              <div
                className="deepseek-pill-list"
                aria-label="Core technologies"
              >
                {featuredTechnologies.map((name) => (
                  <span key={name}>{name}</span>
                ))}
              </div>
              <time dateTime="2026-08" >August 2026</time>
            </div>
            <h1>AI Workforce Planning, Recruitment <span>&amp; Talent Intelligence Platform</span></h1>
            <div className="deepseek-hero-bottom">
              <div>
                <p className="deepseek-hero-description">
                  I built a local-first workforce intelligence platform that
                  turns private resumes, verified employee skills and job
                  requirements into evidence-led conversations. DeepSeek
                  explains what the records establish, what remains uncertain
                  and where a person needs to decide—without automating hiring
                  decisions.
                </p>
                <p className="deepseek-hero-note">
                  Verified with fictional identities, real local model inference
                  and PostgreSQL persistence.
                </p>
              </div>
              <div className="deepseek-hero-cta">
                <div className="deepseek-hero-actions">
                  <a
                    className="deepseek-button deepseek-button-dark"
                    href={repository}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={githubSvg}
                      alt=""
                      aria-hidden="true"
                      className="deepseek-github-icon"
                    />
                    Source
                  </a>
                  <button
                    className="deepseek-button deepseek-button-disabled"
                    type="button"
                    disabled
                  >
                    Visit platform
                  </button>
                </div>
                <p className="deepseek-platform-note">
                  Maintaining this many live deployments would be a project of
                  its own. The source is available, or you can{" "}
                  <a href="mailto:keenosmith@kailor.co.za">contact me</a> for a
                  walkthrough.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="deepseek-section" id="deepseek-overview">
          <span className="deepseek-section-label">Project summary</span>
          <div className="deepseek-section-content">
            <h2>
              Evidence is useful.
              <br />
              Automated judgment is not the goal.
            </h2>
            <div className="deepseek-two-columns">
              <p>
                Recruitment and workforce planning are too often reduced to
                keyword matching or opaque candidate scores. A resume may
                contain relevant evidence, but it can also be incomplete or
                ambiguous. An employment decision needs an accountable reviewer
                who can examine the original source, resolve uncertainty and
                record a rationale.
              </p>
              <p>
                I separated factual extraction, taxonomy retrieval, local model
                analysis, human corrections and decisions. The resulting
                workspace covers vacancies, applications, interviews, employee
                skill inventories and aggregated workforce development
                needs—each with explicitly scoped permissions.
              </p>
            </div>
            <div className="deepseek-summary-action">
              <a
                className="deepseek-button deepseek-button-cream"
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
          className="deepseek-flow"
          aria-labelledby="deepseek-flow-title"
        >
          <div className="deepseek-flow-inner">
            <span className="deepseek-kicker">The evidence journey</span>
            <h2 id="deepseek-flow-title">
              From a document to a defensible conversation.
            </h2>
            <p className="deepseek-flow-intro">
              A source-first pipeline. Every step preserves the difference
              between what someone wrote, what the system found and what a
              reviewer concluded.
            </p>
            <div className="deepseek-flow-cards">
              {workflow.map((step) => (
                <div key={step.label} className="deepseek-flow-card">
                  <h3>{step.label}</h3>
                  <p>{step.sub}</p>
                </div>
              ))}
            </div>
            <p className="deepseek-flow-caption">
              Resumes are limited to text-bearing PDF/DOCX. Scanned images are
              intentionally not passed off as successful text extraction.
            </p>
          </div>
        </section>

        <section className="deepseek-section" id="deepseek-intelligence">
          <span className="deepseek-section-label">
            Private AI architecture
          </span>
          <div className="deepseek-section-content">
            <h2>
              DeepSeek reasons over checked references - not private identities.
            </h2>
            <p className="deepseek-section-intro">
              The inference service runs DeepSeek-R1 Distill through a locally
              controlled Ollama runtime. Its task is deliberately narrow: select
              evidence for stated vacancy requirements and return
              schema-constrained JSON. An independent validator checks coverage,
              membership, omitted references and unsupported claims before any
              analysis is saved.
            </p>
            <div className="deepseek-architecture">
              <div className="deepseek-architecture-main">
                <span className="deepseek-kicker">System boundaries</span>
                <div
                  className="deepseek-architecture-chain"
                  aria-label="Application architecture"
                >
                  <div>
                    <strong>React</strong>
                    <span>Workspaces and role-based views</span>
                  </div>
                  <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
                  <div>
                    <strong>ASP.NET Core 10</strong>
                    <span>Authority, rules and jobs</span>
                  </div>
                  <ArrowRight size={16} strokeWidth={1.6} aria-hidden="true" />
                  <div>
                    <strong>FastAPI + Ollama</strong>
                    <span>Private parsing and inference</span>
                  </div>
                </div>
                <p>
                  nginx exposes a same-origin browser route. The API owns
                  permissions and persistent processing. The document service
                  and model ports remain private to Docker networking.
                </p>
              </div>
              <div className="deepseek-architecture-side">
                <Database size={23} strokeWidth={1.25} aria-hidden="true" />
                <span>Source of truth</span>
                <strong>PostgreSQL + pgvector</strong>
                <p>
                  Applications, reviews, analysis versions, audit events and
                  768-dimensional skill-taxonomy embeddings.
                </p>
              </div>
            </div>
            <div className="deepseek-three-columns">
              <article>
                <FileText size={20} strokeWidth={1.35} aria-hidden="true" />
                <h3>Conservative extraction</h3>
                <p>
                  pypdf and python-docx preserve page or paragraph excerpts.
                  Skills and explicit resume headings become traceable claims,
                  initially Unverified.
                </p>
              </article>
              <article>
                <GitBranch size={20} strokeWidth={1.35} aria-hidden="true" />
                <h3>Strict model contract</h3>
                <p>
                  DeepSeek returns constrained evidence selections. No
                  unvalidated model prose, suitability ranking or inferred
                  proficiency becomes a hiring assessment.
                </p>
              </article>
              <article>
                <ShieldCheck size={20} strokeWidth={1.35} aria-hidden="true" />
                <h3>Versioned review</h3>
                <p>
                  Corrections and vacancy changes stale prior analyses.
                  Optimistic concurrency rejects outdated edits, and human
                  decisions remain separate records.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section
          className="deepseek-decision"
          aria-labelledby="deepseek-decision-title"
        >
          <div className="deepseek-decision-inner">
            <span className="deepseek-kicker">
              Recruitment and workforce planning
            </span>
            <h2 id="deepseek-decision-title">
              One platform.
              <br />
              Different responsibilities.
            </h2>
            <div className="deepseek-role-grid">
              <article>
                <span>Candidate</span>
                <h3>Own the application.</h3>
                <p>
                  Apply, upload a resume, follow the status and view interview
                  time/location. Internal notes, model analysis and recruiter
                  rationales stay private.
                </p>
              </article>
              <article>
                <span>Recruiter</span>
                <h3>Inspect the evidence.</h3>
                <p>
                  Review extracted facts, correct mappings and proficiency,
                  schedule interviews and manually advance applications with a
                  rationale.
                </p>
              </article>
              <article>
                <span>HR administrator</span>
                <h3>Understand workforce coverage.</h3>
                <p>
                  Maintain departments, vacancies and skills; verify employee
                  self-reports and view aggregate development needs, not
                  individual performance scores.
                </p>
              </article>
              <article>
                <span>Employee</span>
                <h3>Describe and develop skills.</h3>
                <p>
                  Maintain self-reported skills, attach evidence and identify
                  development needs. HR verification remains a separate step.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="deepseek-section" id="deepseek-reliability">
          <span className="deepseek-section-label">Engineering and safety</span>
          <div className="deepseek-section-content">
            <h2>Private by architecture. Accountable by design.</h2>
            <div className="deepseek-two-columns deepseek-technical-columns">
              <div>
                <h3>Durable processing</h3>
                <p>
                  The .NET worker stores processing jobs in PostgreSQL,
                  serialises work through an advisory lock and retries failures
                  three times. Model outages remain visible as Failed; no
                  placeholder answer is substituted. Uploads and fact changes
                  increment evidence versions.
                </p>
              </div>
              <div>
                <h3>Security and erasure</h3>
                <p>
                  Server-enforced roles and ownership, time-limited JWTs, an
                  internal service key and private file storage protect records.
                  Resume uploads are validated and capped at 5 MiB. Documents
                  expire after 180 days, and explicit deletion cascades through
                  dependent evidence and analyses.
                </p>
              </div>
              <div>
                <h3>Semantic taxonomy</h3>
                <p>
                  nomic-embed-text generates 768-dimensional vectors stored
                  behind pgvector cosine search and an HNSW index. Retrieval
                  supports uncertain skill aliases; similarity never measures a
                  person's employability.
                </p>
              </div>
              <div>
                <h3>Deployment boundaries</h3>
                <p>
                  Docker Compose is the exercised environment. OpenTofu's Docker
                  configuration passed formatting and validation, but wasn't
                  applied. Organization SSO, production TLS, encrypted backups
                  and malware scanning remain deployment work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="deepseek-validation"
          aria-labelledby="deepseek-validation-title"
        >
          <div className="deepseek-validation-inner">
            <span className="deepseek-kicker">
              Repository-verified · August 2026
            </span>
            <h2 id="deepseek-validation-title">
              Real inference. Real boundaries.
            </h2>
            <div className="deepseek-validation-stats">
              <div>
                <strong>10</strong>
                <span>Python safety checks passed</span>
              </div>
              <div>
                <strong>768</strong>
                <span>Dimensions per skill embedding</span>
              </div>
              <div>
                <strong>3</strong>
                <span>Persisted processing attempts</span>
              </div>
            </div>
            <p>
              The real-model smoke journey passed using DeepSeek-R1 1.5B and
              nomic-embed-text. It exercised document evidence, pgvector
              retrieval, reviewer corrections, stale analysis versions,
              interviews, manual decisions, role isolation and erasure. The
              browser checks were limited, and no public production environment
              was verified.
            </p>
          </div>
        </section>

        <section
          className="deepseek-section deepseek-technology"
          id="deepseek-technology"
        >
          <span className="deepseek-section-label">Technology</span>
          <div className="deepseek-section-content">
            <h2>The tools are only useful when their roles are clear.</h2>
            <div className="deepseek-tech-grid">
              <div>
                <h3>Application and data</h3>
                <p>
                  React and ASP.NET Core deliver scoped experiences. EF Core and
                  PostgreSQL maintain authoritative recruitment and workforce
                  records.
                </p>
                <div className="deepseek-tags">
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>.NET 10</span>
                  <span>EF Core</span>
                  <span>PostgreSQL</span>
                </div>
              </div>
              <div>
                <h3>Private AI</h3>
                <p>
                  Ollama hosts DeepSeek-R1 Distill for constrained evidence
                  selection; FastAPI extracts and validates source-grounded
                  facts.
                </p>
                <div className="deepseek-tags">
                  <span>DeepSeek-R1</span>
                  <span>Ollama</span>
                  <span>FastAPI</span>
                  <span>Pydantic</span>
                </div>
              </div>
              <div>
                <h3>Search and uncertainty</h3>
                <p>
                  Taxonomy retrieval uses a separate embedding model and vector
                  index, strictly outside person scoring.
                </p>
                <div className="deepseek-tags">
                  <span>nomic-embed-text</span>
                  <span>pgvector</span>
                  <span>HNSW</span>
                </div>
              </div>
              <div>
                <h3>Delivery and verification</h3>
                <p>
                  Local containers, database migrations and repeatable tests
                  support a private demonstration. Provisioning plans are not
                  advertised as deployments.
                </p>
                <div className="deepseek-tags">
                  <span>Docker Compose</span>
                  <span>OpenTofu</span>
                  <span>GitHub Actions</span>
                </div>
              </div>
            </div>
            <button
              className="deepseek-button deepseek-tech-trigger"
              type="button"
              onClick={() => setStackOpen(true)}
            >
              <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />
              Tech stack
            </button>
          </div>
        </section>

        <section className="deepseek-closing">
          <div>
            <span className="deepseek-kicker">
              Engineering with accountability
            </span>
            <h2>
              The system can surface the evidence.
              <br />
              People make the decisions.
            </h2>
            <p>
              This was an exercise in keeping local intelligence useful,
              traceable and deliberately limited in a sensitive workflow.
            </p>
          </div>
        </section>
      </article>
      <footer ref={footerRef} className="deepseek-footer">
        <Link to="/" className="deepseek-footer-link">
          Back to portfolio
        </Link>
        <button
          type="button"
          className="deepseek-footer-top" aria-label="Back to top"
          onClick={scrollToTop}
        >
          <ArrowUp size={14} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </footer>
      {showTop && !footerVisible && (
        <button
          type="button"
          className="deepseek-floating-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={15} strokeWidth={1.7} aria-hidden="true" />
        </button>
      )}
      {stackOpen && <TechStackModal onClose={closeStack} />}
    </main>
  );
}
