import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import githubSvg from "../../../../assets/svgs/header/github.svg";

import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Layers3,
  X,
} from "lucide-react";
import "./AWSBankingRisk.css";

const sourceRepository =
  "https://github.com/keenosmith-del/aws-ai-banking-and-payment-risk";
const executiveSummary = "/documents/aws-banking-risk-executive-summary.pdf";

const heroTechnologies = [
  "AWS",
  "Terraform",
  "EventBridge",
  "SQS",
  "TypeScript",
  "PostgreSQL",
];

// This distinction is intentional: considering a service does not mean deploying it.
const technologyGroups = [
  {
    heading: "Frontend",
    skills: ["React", "TypeScript", "Vite", "React Router", "Fetch API"],
  },
  {
    heading: "Backend",
    skills: [
      "Node.js",
      "Express",
      "TypeScript",
      "Python",
      "Zod",
      "Pino",
      "REST APIs",
    ],
  },
  {
    heading: "Database",
    skills: ["PostgreSQL", "Prisma", "SQL", "Transactions", "Idempotency"],
  },
  {
    heading: "Local infrastructure",
    skills: ["Docker", "Docker Compose"],
  },
  {
    heading: "AWS services",
    note: "Integration code prepared, not deployed or live-tested.",
    skills: [
      "Amazon SageMaker",
      "Amazon Bedrock",
      "Amazon EventBridge",
      "Amazon SQS",
      "Amazon S3",
      "Amazon Cognito",
    ],
  },
  {
    heading: "Cloud infrastructure and security",
    note: "Infrastructure definitions and configuration.",
    skills: ["Terraform", "AWS IAM", "AWS Secrets Manager", "AWS KMS"],
  },
  {
    heading: "Services considered",
    note: "Evaluated as architecture options, not implemented.",
    skills: ["Amazon Kinesis", "Amazon DynamoDB", "Amazon RDS for PostgreSQL"],
  },
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
      // The close button is the only focusable element in this dialog.
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
      className="aws-banking-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        className="aws-banking-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Project technology stack"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButton}
          className="aws-banking-modal-close"
          type="button"
          onClick={close}
          aria-label="Close tech stack"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="aws-banking-modal-groups">
          {technologyGroups.map((group) => (
            <div key={group.heading} className="aws-banking-modal-group">
              <span className="aws-banking-modal-category">
                {group.heading}
              </span>

              {group.note && (
                <p className="aws-banking-modal-note">{group.note}</p>
              )}

              <div className="aws-banking-modal-pills">
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

export default function AWSBankingRisk() {
  const [showTop, setShowTop] = useState(false);
  const [showStack, setShowStack] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef(null);
  const closeStack = useCallback(() => setShowStack(false), []);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 300);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
    <main className="aws-banking-project">
      <Link className="aws-banking-back" to="/">
        <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />
        <span>Back to portfolio</span>
      </Link>

      <article>
        <header className="aws-banking-hero">
          <div className="aws-banking-hero-inner">
            <div className="aws-banking-hero-topline">
              <div
                className="aws-banking-pill-list"
                aria-label="Technologies used"
              >
                {heroTechnologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
              <time dateTime="2026-10">Built March 2026</time>
            </div>

            <h1>AWS Banking <span>&amp; Payment Risk Platform</span></h1>

            <div className="aws-banking-hero-bottom">
              <div>
                <p className="aws-banking-hero-description">
                  I built a banking and payment-risk simulation to explore how
                  cloud services, behavioural analysis and financial controls
                  could work together. The architecture separates payment
                  processing from AWS-based messaging, model inference, identity
                  and audit storage, allowing each part of the system to evolve
                  independently.
                </p>
                <p className="aws-banking-hero-note">
                  A local-first AWS engineering project using synthetic data.
                </p>
              </div>
              <div className="aws-banking-hero-controls">
                <div className="aws-banking-hero-actions">
                  <a
                    className="aws-banking-button"
                    href={sourceRepository}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={githubSvg}
                      alt=""
                      className="aws-banking-github-icon"
                      aria-hidden="true"
                    />
                    Source
                  </a>

                  <button
                    className="aws-banking-button aws-banking-button-disabled"
                    type="button"
                    disabled
                  >
                    Visit platform
                  </button>
                </div>

                <p className="aws-banking-platform-note">
                  Maintaining this many live deployments would be a project of
                  its own. The source is available, or you can{" "}
                  <a href="mailto:keenosmith@kailor.co.za">contact me</a> for a
                  walkthrough.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section
          className="aws-banking-section aws-banking-summary"
          id="aws-banking-summary"
        >
          <div className="aws-banking-section-label">Project summary</div>
          <div className="aws-banking-section-copy">
            <h2>A risk score is not a payment decision.</h2>
            <div className="aws-banking-two-columns">
              <p>
                I wanted to understand the point at which a system moves from
                assessing suspicious activity to deciding what should actually
                happen to a payment. The two are related, but they are not the
                same responsibility.
              </p>
              <p>
                The application uses synthetic customer history to assess a
                transaction, then applies a separate policy. It can approve,
                request additional verification, hold for analyst review,
                decline or block. The original decision and final outcome remain
                available for investigation.
              </p>
            </div>

            <div className="aws-banking-summary-action">
              <a
                href={executiveSummary}
                target="_blank"
                rel="noopener noreferrer"
                className="aws-banking-button aws-banking-summary-button"
              >
                Executive summary
              </a>
            </div>
          </div>
        </section>

        <section className="aws-banking-section aws-banking-cloud">
          <div className="aws-banking-section-label">Cloud engineering</div>

          <div className="aws-banking-section-copy">
            <h2>
              Designing the AWS architecture around a reliable payment system.
            </h2>

            <p className="aws-banking-intro-copy">
              I approached the cloud architecture by first deciding which
              responsibilities should remain inside the application and which
              could be handled by AWS services.
            </p>

            <p className="aws-banking-intro-copy">
              The payment database remains authoritative. Cloud services are
              introduced through separate provider interfaces for asynchronous
              events, model inference, identity verification and audit storage.
              This lets me test the core workflow locally without requiring an
              active AWS environment.
            </p>

            <div className="aws-banking-decisions">
              <div>
                <h3>Amazon EventBridge and SQS</h3>
                <p>
                  I implemented an event-publishing boundary around a
                  transactional outbox. Payment changes and their outbox records
                  are committed together in PostgreSQL, while EventBridge and
                  SQS adapters support asynchronous delivery and consumption.
                </p>
                <p>
                  This separation matters because event retries must never cause
                  a payment to be debited twice. Terraform also defines queue
                  and dead-letter handling for the intended AWS environment.
                </p>
              </div>

              <div>
                <h3>Amazon SageMaker and Bedrock</h3>
                <p>
                  I separated model inference from the financial decision
                  engine. SageMaker integration provides a boundary for
                  model-based risk scoring, while Bedrock can be used to produce
                  readable explanations of risk evidence.
                </p>
                <p>
                  Neither service is allowed to override account restrictions,
                  balance checks or payment policy. I wanted AI to contribute
                  evidence without becoming the authority responsible for moving
                  money.
                </p>
              </div>

              <div>
                <h3>Amazon Cognito and S3</h3>
                <p>
                  Cognito integration supports token verification at the
                  authentication boundary. Application-level authorization
                  remains a separate responsibility, particularly when accessing
                  customer transactions and analyst review records.
                </p>
                <p>
                  S3 provides an adapter for encrypted audit exports. I kept
                  audit storage separate from the relational transaction history
                  so exported records cannot replace the authoritative payment
                  state.
                </p>
              </div>

              <div>
                <h3>Terraform and cloud security</h3>
                <p>
                  I used Terraform to describe the intended AWS event bus,
                  queues, dead-letter handling, audit bucket and scoped IAM
                  policies.
                </p>
                <p>
                  The repository also supports optional Secrets Manager
                  configuration and KMS encryption. PostgreSQL could be hosted
                  privately on Amazon RDS, although this has not been
                  provisioned.
                </p>
              </div>
            </div>

            <p className="aws-banking-intro-copy">
              These integrations and infrastructure definitions exist in the
              repository, but have not been deployed or live-tested in AWS. The
              locally verified workflow is deliberately independent of those
              external services.
            </p>
          </div>
        </section>

        <section className="aws-banking-section aws-banking-architecture">
          <div className="aws-banking-section-label">Architecture choices</div>
          <div className="aws-banking-section-copy">
            <h2>Where Kinesis and DynamoDB would fit.</h2>

            <p className="aws-banking-intro-copy">
              I also considered Amazon Kinesis for continuous high-volume
              transaction ingestion and DynamoDB for low-latency feature
              storage.
            </p>

            <p className="aws-banking-intro-copy">
              Both would make sense under different workload requirements. For
              this implementation, API-driven transaction processing and
              PostgreSQL were sufficient. I didn't want to introduce another
              streaming service or database without a measurable reason to do
              so.
            </p>
            <div className="aws-banking-architecture-grid">
              <div>
                <span>Considered</span>
                <h3>Amazon Kinesis</h3>
                <p>
                  Useful for sustained, high-volume transaction streams and
                  multiple consumers. Here, payments enter through the API;
                  there was no measured ingestion bottleneck to address.
                </p>
              </div>
              <div>
                <span>Considered</span>
                <h3>Amazon DynamoDB</h3>
                <p>
                  A possible low-latency read or feature store at greater scale.
                  The first version did not need another copy of its transaction
                  and behavioural data.
                </p>
              </div>
              <div>
                <span>Selected</span>
                <h3>PostgreSQL and an outbox</h3>
                <p>
                  I could keep transaction state, idempotency and audit records
                  inside one relational commit boundary, then publish events
                  asynchronously through prepared EventBridge and SQS adapters.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="aws-banking-section aws-banking-implementation">
          <div className="aws-banking-section-label">Engineering decisions</div>
          <div className="aws-banking-section-copy">
            <h2>Keeping responsibilities separate.</h2>
            <div className="aws-banking-decisions">
              <div>
                <h3>Explainable assessment</h3>
                <p>
                  The backend builds behavioural features from a 90-day
                  synthetic history. Versioned rules contribute named signals
                  alongside a reproducible local logistic heuristic. I don't
                  present that untrained heuristic as a calibrated fraud
                  probability.
                </p>
              </div>
              <div>
                <h3>Financial integrity</h3>
                <p>
                  PostgreSQL transactions, unique idempotency keys and balance
                  checks protect simulated debits. A successful challenge or
                  analyst approval still has to pass those controls.
                </p>
              </div>
              <div>
                <h3>Clear application boundaries</h3>
                <p>
                  TypeScript keeps the domain contracts explicit. Express and
                  Zod handle the API boundary, Prisma manages persistence, and
                  the React frontend displays results without deciding risk.
                </p>
              </div>
              <div>
                <h3>Honest AWS integration status</h3>
                <p>
                  The repository includes adapters for SageMaker, Bedrock,
                  EventBridge, SQS, S3 and Cognito, plus Terraform definitions.
                  These integrations have not been deployed or live-tested in
                  AWS.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="aws-banking-section aws-banking-technology">
          <div className="aws-banking-section-label">Technology</div>

          <div className="aws-banking-section-copy">
            <h2>A deliberately practical stack.</h2>

            <p className="aws-banking-technology-intro">
              React and TypeScript let me keep the interface and domain
              contracts predictable. PostgreSQL and Prisma were the more
              important choices: I needed reliable state changes and a readable
              transaction history before I needed additional distributed
              infrastructure.
            </p>

            <div className="aws-banking-technology-grid">
              <div className="aws-banking-technology-group">
                <h3>Frontend</h3>
                <p>
                  I used React for the interface and TypeScript for consistent
                  data contracts between the client and backend. The frontend
                  displays transaction information, risk assessments and
                  decisions without owning the financial decision logic.
                </p>
                <div className="aws-banking-tech-tags">
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>Vite</span>
                  <span>React Router</span>
                  <span>Fetch API</span>
                </div>
              </div>

              <div className="aws-banking-technology-group">
                <h3>Backend</h3>
                <p>
                  Node.js and Express handle transaction requests, risk
                  assessment and policy enforcement. Zod validates incoming
                  data, while application services keep payment rules and
                  integrations separate from HTTP handling.
                </p>
                <div className="aws-banking-tech-tags">
                  <span>Node.js</span>
                  <span>Express</span>
                  <span>TypeScript</span>
                  <span>Zod</span>
                  <span>REST APIs</span>
                  <span>Pino</span>
                </div>
              </div>

              <div className="aws-banking-technology-group">
                <h3>Database and persistence</h3>
                <p>
                  PostgreSQL provides transactional consistency for balances,
                  payments, idempotency and audit records. Prisma handles
                  database access and migrations, with Docker Compose supporting
                  the local development environment.
                </p>
                <div className="aws-banking-tech-tags">
                  <span>PostgreSQL</span>
                  <span>Prisma</span>
                  <span>SQL</span>
                  <span>Docker Compose</span>
                  <span>Transactions</span>
                </div>
              </div>

              <div className="aws-banking-technology-group">
                <h3>AWS and cloud engineering</h3>
                <p>
                  I prepared AWS integrations for asynchronous messaging, model
                  inference, identity verification and audit storage. Terraform
                  describes the supporting cloud infrastructure. These
                  integrations are included in the repository but have not been
                  deployed or live-tested in AWS.
                </p>
                <div className="aws-banking-tech-tags">
                  <span>Amazon EventBridge</span>
                  <span>Amazon SQS</span>
                  <span>Amazon SageMaker</span>
                  <span>Amazon Bedrock</span>
                  <span>Amazon S3</span>
                  <span>Amazon Cognito</span>
                  <span>Terraform</span>
                  <span>IAM</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="aws-banking-button aws-banking-tech-trigger"
              onClick={() => setShowStack(true)}
            >
              <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />
              Tech stack
            </button>
          </div>
        </section>

        <section className="aws-banking-closing">
          <div>
            <p className="aws-banking-eyebrow">
              Architecture and implementation
            </p>

            <h2>Payment integrity, risk assessment and AWS integration.</h2>

            <p>
              The platform separates behavioural risk assessment, policy
              enforcement, transaction processing and audit history into
              distinct application responsibilities. PostgreSQL provides
              transactional consistency, while AWS service adapters and
              Terraform definitions establish the architecture for asynchronous
              messaging, model inference, identity verification and audit
              storage. The core workflow is locally verified using synthetic
              data, with AWS integrations prepared but not deployed.
            </p>
          </div>
        </section>
      </article>

      <footer ref={footerRef} className="aws-banking-footer">
        <Link className="aws-banking-footer-back" to="/">
          Back to portfolio
        </Link>
        <button
          type="button"
          className="aws-banking-footer-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </footer>

      {showTop && !footerVisible && (
        <button
          className="aws-banking-floating-top"
          type="button"
          aria-label="Back to top"
          onClick={scrollToTop}
        >
          <ArrowUp size={17} strokeWidth={1.7} aria-hidden="true" />
        </button>
      )}
      {showStack && <TechStackModal close={closeStack} />}
    </main>
  );
}
