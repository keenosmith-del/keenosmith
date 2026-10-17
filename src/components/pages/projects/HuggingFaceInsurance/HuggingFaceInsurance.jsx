import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUp, Layers3 } from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./HuggingFaceInsurance.css";

const repository =
  "https://github.com/keenosmith-del/hugging-face-ai-insurance-claims";
const technicalBrief = "/documents/hugging-face-insurance-technical-brief.pdf";

const heroTechnologies = [
  "Hugging Face",
  "PyTorch",
  "Transformers",
  "FastAPI",
  "Express",
  "MongoDB",
];

const stages = [
  {
    number: "01",
    title: "Collect evidence",
    description:
      "Create a claim and upload reports, policy documents, repair estimates and photographs. Originals remain available through authenticated downloads.",
  },
  {
    number: "02",
    title: "Run analysis",
    description:
      "Extract text from documents and images, execute the relevant Hugging Face models and retain pipeline failures alongside successful outputs.",
  },
  {
    number: "03",
    title: "Compare sources",
    description:
      "Compare explicitly labelled dates, registrations, policy references, names and locations. Present missing or inconsistent information for review.",
  },
  {
    number: "04",
    title: "Record a decision",
    description:
      "An assessor reviews the originals and findings, adds notes and records an outcome. Changes to evidence invalidate the current analysis.",
  },
];

const models = [
  {
    name: "Document classification",
    model: "valhalla/distilbart-mnli-12-1",
    description:
      "A general zero-shot classifier identifies likely document types. Explicit keyword overrides are labelled, with the raw model prediction retained.",
  },
  {
    name: "Named-entity recognition",
    model: "dslim/bert-base-NER",
    description:
      "Extracts general named entities. Separately labelled rules handle policy numbers, registrations and other claim-specific fields.",
  },
  {
    name: "Image object detection",
    model: "facebook/detr-resnet-50",
    description:
      "Returns COCO object labels, bounding boxes and model scores. A detected car does not establish damage or accident circumstances.",
  },
  {
    name: "Semantic embeddings",
    model: "sentence-transformers/all-MiniLM-L6-v2",
    description:
      "Produces document embeddings for cosine-similarity comparisons. Similarity is a retrieval cue, not proof that two accounts agree.",
  },
];

const comparisonStates = [
  {
    status: "MATCH",
    description: "Two or more source fields have the same normalised value.",
  },
  {
    status: "MISMATCH",
    description: "Comparable, explicitly labelled values differ.",
  },
  {
    status: "MISSING",
    description: "The relevant field was not found in the supplied sources.",
  },
  {
    status: "UNVERIFIABLE",
    description: "A value is ambiguous, invalid or lacks a second source.",
  },
];

const techGroups = [
  {
    heading: "Frontend",
    skills: ["React", "TypeScript", "Vite", "Fetch API", "CSS"],
  },
  {
    heading: "Application and persistence",
    skills: [
      "Node.js",
      "Express",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "Bearer sessions",
      "scrypt",
      "Audit records",
    ],
  },
  {
    heading: "AI and model execution",
    skills: [
      "Python",
      "FastAPI",
      "Hugging Face Transformers",
      "PyTorch",
      "DistilBART MNLI",
      "BERT NER",
      "DETR",
      "Sentence Transformers",
      "MiniLM",
    ],
  },
  {
    heading: "Document and image processing",
    skills: [
      "OpenCV",
      "Tesseract",
      "PDFium",
      "OCR",
      "DOCX parsing",
      "Image bounding boxes",
      "SHA-256",
    ],
  },
  {
    heading: "Testing and local runtime",
    note: "Tested locally using synthetic claims; this is not a public or insurer-integrated deployment.",
    skills: [
      "Docker Compose",
      "Vitest",
      "Python tests",
      "Real-model verification",
      "Browser workflow tests",
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
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="hf-insurance-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="hf-insurance-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Hugging Face insurance claims technology stack"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="hf-insurance-modal-close"
          aria-label="Close tech stack"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="hf-insurance-modal-groups">
          {techGroups.map((group) => (
            <div className="hf-insurance-modal-group" key={group.heading}>
              <span className="hf-insurance-modal-category">
                {group.heading}
              </span>
              {group.note && (
                <p className="hf-insurance-modal-note">{group.note}</p>
              )}
              <div className="hf-insurance-modal-pills">
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

export default function HuggingFaceInsurance() {
  const [showStack, setShowStack] = useState(false);
  const [showTop, setShowTop] = useState(false);
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
    <main className="hf-insurance-project">
      <Link className="hf-insurance-back" to="/">
        <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />
        <span>Back to portfolio</span>
      </Link>

      <article>
        <header className="hf-insurance-hero">
          <div className="hf-insurance-hero-inner">
            <div className="hf-insurance-hero-topline">
              <div
                className="hf-insurance-pill-list"
                aria-label="Core technologies"
              >
                {heroTechnologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
              <time dateTime="2026-10">Built October 2026</time>
            </div>
            <h1>
              Hugging Face <span>AI Insurance Claims Platform</span>
            </h1>
            <div className="hf-insurance-hero-bottom">
              <div>
                <p className="hf-insurance-hero-description">
                  I built a local insurance-claims review application that
                  brings documents and photographs into one assessment. It uses
                  Hugging Face models for classification, named entities, image
                  objects and semantic similarity, alongside OCR and explicit
                  field-comparison rules. An assessor reviews the evidence and
                  records the outcome.
                </p>
                <p className="hf-insurance-hero-note">
                  A synthetic-data prototype. AI findings do not approve or
                  price claims.
                </p>
              </div>
              <div className="hf-insurance-hero-controls">
                <div className="hf-insurance-hero-actions">
                  <a
                    className="hf-insurance-button hf-insurance-button-dark"
                    href={repository}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={githubSvg}
                      className="hf-insurance-github-icon"
                      alt=""
                      aria-hidden="true"
                    />
                    Source
                  </a>
                  <button
                    className="hf-insurance-button hf-insurance-button-disabled"
                    disabled
                    type="button"
                  >
                    Visit platform
                  </button>
                </div>
                <p className="hf-insurance-deployment-note">
                  Running every project publicly would take its own maintenance
                  plan. The source is here, or{" "}
                  <a href="mailto:keenosmith@kailor.co.za">contact me</a> for a
                  walkthrough.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section
          className="hf-insurance-section"
          aria-labelledby="hf-insurance-summary-heading"
        >
          <div className="hf-insurance-section-label">Project summary</div>
          <div className="hf-insurance-section-copy">
            <h2 id="hf-insurance-summary-heading">
              One claim, several different kinds of evidence.
            </h2>
            <div className="hf-insurance-two-columns">
              <p>
                A claim may contain a policy, an accident report, a repair
                estimate and a photograph. They do not all use the same format,
                and even a successfully extracted detail still needs to be
                checked against its source.
              </p>
              <p>
                The application keeps originals, extraction results, comparisons
                and reviewer actions together. Changes to the claim or its
                evidence mark the current assessment stale without removing the
                earlier versions.
              </p>
            </div>
            <div className="hf-insurance-summary-action">
              <a
                className="hf-insurance-button hf-insurance-button-light"
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
          className="hf-insurance-section"
          aria-labelledby="hf-insurance-workflow-heading"
        >
          <div className="hf-insurance-section-label">Review workflow</div>
          <div className="hf-insurance-section-copy">
            <h2 id="hf-insurance-workflow-heading">
              From uploaded evidence to a human review.
            </h2>
            <p className="hf-insurance-intro-copy">
              Analysis is a step within the claim lifecycle, not the lifecycle
              itself. Processing can complete, partially fail or need to be
              rerun after evidence changes.
            </p>
            <div className="hf-insurance-steps">
              {stages.map((step) => (
                <div className="hf-insurance-step" key={step.number}>
                  <span className="hf-insurance-step-number"></span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="hf-insurance-section"
          aria-labelledby="hf-insurance-models-heading"
        >
          <div className="hf-insurance-section-label">
            Hugging Face and vision
          </div>
          <div className="hf-insurance-section-copy">
            <h2 id="hf-insurance-models-heading">
              Four models with different responsibilities.
            </h2>
            <p className="hf-insurance-intro-copy">
              The Python service runs real model inference. Each output is
              presented as a model observation, with its model identity
              retained. None of these general models was trained or calibrated
              to settle insurance claims.
            </p>
            <div className="hf-insurance-model-grid">
              {models.map((model) => (
                <div className="hf-insurance-model" key={model.name}>
                  <h3>{model.name}</h3>
                  <p>{model.description}</p>
                  <code>{model.model}</code>
                </div>
              ))}
            </div>
            <p className="hf-insurance-after-note">
              OCR is handled separately with PDFium, OpenCV and Tesseract.
              Selectable PDF text, scanned pages, DOCX content and supported
              image formats can all be processed, subject to file and page
              limits.
            </p>
          </div>
        </section>

        <section
          className="hf-insurance-section"
          aria-labelledby="hf-insurance-evidence-heading"
        >
          <div className="hf-insurance-section-label">Evidence comparison</div>
          <div className="hf-insurance-section-copy">
            <h2 id="hf-insurance-evidence-heading">
              Comparison states are not verdicts.
            </h2>
            <p className="hf-insurance-intro-copy">
              Rule-based comparisons look for explicitly labelled dates,
              registrations, policy references, names and locations. Each result
              points back to its sources. The four states describe what the
              supplied evidence supports, not whether a claim is genuine.
            </p>
            <div className="hf-insurance-status-list">
              {comparisonStates.map(({ status, description }) => (
                <div className="hf-insurance-status-row" key={status}>
                  <span className="hf-insurance-status">{status}</span>
                  <p>{description}</p>
                </div>
              ))}
            </div>
            <p className="hf-insurance-after-note">
              Currency values are stored with their source line, category and
              currency. The system compares labelled repair-estimate and invoice
              totals when possible, but does not add every amount together or
              calculate an insurer's payment.
            </p>
          </div>
        </section>

        <section
          className="hf-insurance-section"
          aria-labelledby="hf-insurance-architecture-heading"
        >
          <div className="hf-insurance-section-label">Architecture</div>
          <div className="hf-insurance-section-copy">
            <h2 id="hf-insurance-architecture-heading">
              Application state and inference stay separate.
            </h2>
            <p className="hf-insurance-intro-copy">
              Express handles accounts, claim mutations, protected evidence
              downloads and review history. FastAPI handles document extraction
              and inference. MongoDB stores claim state and audits; uploaded
              originals are held on the local filesystem in a confined claims
              directory.
            </p>
            <div
              className="hf-insurance-architecture"
              aria-label="React frontend communicates with Express API. Express persists claim data to MongoDB and calls FastAPI. FastAPI processes evidence and runs local models."
            >
              <div className="hf-insurance-architecture-node">
                <strong>React + TypeScript</strong>
                <small>Claim and review screens</small>
              </div>
              <span
                className="hf-insurance-architecture-connector"
                aria-hidden="true"
              >
                →
              </span>
              <div className="hf-insurance-architecture-node">
                <strong>Express + MongoDB</strong>
                <small>Sessions, evidence, history</small>
              </div>
              <span
                className="hf-insurance-architecture-connector"
                aria-hidden="true"
              >
                →
              </span>
              <div className="hf-insurance-architecture-node">
                <strong>FastAPI + models</strong>
                <small>OCR and inference</small>
              </div>
            </div>
            <div className="hf-insurance-two-columns hf-insurance-architecture-notes">
              <div>
                <h3>Evidence and sessions</h3>
                <p>
                  Uploads use file checks, UUID storage names and duplicate
                  hashes. Evidence downloads require the matching claim ID and
                  an authenticated session. Passwords use salted scrypt;
                  sessions expire and can be revoked.
                </p>
              </div>
              <div>
                <h3>Processing and review</h3>
                <p>
                  An atomic guard prevents duplicate analyses. Failures remain
                  visible and retryable. Saved assessments, human review notes
                  and mutation audits are distinct records; no model action
                  resolves a claim.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="hf-insurance-section"
          aria-labelledby="hf-insurance-verification-heading"
        >
          <div className="hf-insurance-section-label">Verification</div>
          <div className="hf-insurance-section-copy">
            <h2 id="hf-insurance-verification-heading">
              What I tested locally.
            </h2>
            <p className="hf-insurance-intro-copy">
              The 2 October 2026 completion audit records 15 backend tests, 5
              frontend tests and 12 Python tests. It also records real
              end-to-end model inference and a browser workflow using synthetic
              claims.
            </p>
            <div className="hf-insurance-verification-grid">
              <div>
                <strong>32</strong>
                <span>Automated tests passed</span>
              </div>
              <div>
                <strong>6</strong>
                <span>Pipeline stages in final live run</span>
              </div>
              <div>
                <strong>Real OCR</strong>
                <span>Scanned-report extraction verified</span>
              </div>
            </div>
            <div className="hf-insurance-verification-copy">
              <p>
                The final live run exercised document classification, OCR,
                entity recognition, embeddings and image detection through the
                actual application services, with persisted reviews and
                protected downloads. An image run detected a car in a labelled
                synthetic photograph; another schematic produced no detections,
                and that empty result was kept.
              </p>
              <p>
                The prototype was not evaluated against real insurance claims.
                Detection scores are uncalibrated, and the models cannot
                establish fraud, coverage, liability, damage severity or payout
                amounts. The project is local and single-instance, without
                production tenancy or insurer integrations.
              </p>
            </div>
          </div>
        </section>

        <section
          className="hf-insurance-section hf-insurance-technology"
          aria-labelledby="hf-insurance-technology-heading"
        >
          <div className="hf-insurance-section-label">Technology</div>
          <div className="hf-insurance-section-copy">
            <h2 id="hf-insurance-technology-heading">
              Technology used in the implementation.
            </h2>
            <p className="hf-insurance-intro-copy">
              The frontend is React and TypeScript. Node.js and Express own
              authenticated claim workflows and MongoDB persistence.
              Python/FastAPI runs Hugging Face Transformers and PyTorch models
              with OCR support from OpenCV, Tesseract and PDFium.
            </p>
            <div
              className="hf-insurance-tech-inline"
              aria-label="Selected technologies"
            >
              {[
                "React",
                "Express",
                "FastAPI",
                "Transformers",
                "PyTorch",
                "MongoDB",
                "OpenCV",
                "Tesseract",
                "Docker Compose",
              ].map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
            <button
              className="hf-insurance-button hf-insurance-tech-trigger"
              type="button"
              onClick={() => setShowStack(true)}
            >
              <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />
              Tech stack
            </button>
          </div>
        </section>
      </article>

      <footer ref={footerRef} className="hf-insurance-footer">
        <Link className="hf-insurance-footer-back" to="/">
          Back to portfolio
        </Link>
        <button
          type="button"
          className="hf-insurance-footer-top"
          aria-label="Back to top"
          onClick={scrollToTop}
        >
          <ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </footer>

      {showTop && !footerVisible && (
        <button
          type="button"
          className="hf-insurance-floating-top"
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
