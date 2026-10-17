import ProjectNavigation from "../shared/ProjectNavigation.jsx";
import useProjectPage from "../shared/useProjectPage.js";
import ProjectModal from "../shared/ProjectModal.jsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Layers3 } from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./ManufacturingQC.css";

const repository = "https://github.com/keenosmith-del/intelligent-manufacturing-qc";
const technicalBrief = "/documents/intelligent-manufacturing-qc-technical-brief.pdf";
const heroTechnologies = ["Rust", "TensorFlow", "ONNX Runtime", "React", "Firestore", "MLOps"];

const technologies = [
  { heading: "Frontend", skills: ["React", "TypeScript", "Vite", "Tailwind CSS", "Fetch API", "React Router"] },
  { heading: "Inference and backend", skills: ["Rust", "Axum", "Tokio", "ONNX Runtime 1.23.2", "REST", "SHA-256"] },
  { heading: "Machine learning", skills: ["Python 3.12", "TensorFlow", "Keras", "tf2onnx", "ONNX opset 17", "NumPy", "scikit-learn"] },
  { heading: "Data and storage", skills: ["Firestore REST", "Firestore emulator", "Local object storage", "GCS adapter", "Structured audit records"] },
  { heading: "Testing and deployment", skills: ["Docker Compose", "Nginx", "Rust Clippy", "Ruff", "Vitest", "GitHub Actions definitions", "Cloud Run configuration"], note: "Local checks passed. GitHub-hosted CI and GCP deployment were not executed." },
];

const workflow = [
  { title: "Train and evaluate", detail: "Python prepares reproducible splits, trains the CNN, records held-out metrics and exports an ONNX package." },
  { title: "Validate and activate", detail: "The Rust service verifies a package, evaluates release gates and loads the selected model into a cached inference session." },
  { title: "Inspect and review", detail: "The API classifies an uploaded image and stores its probabilities and model version. An operator records a separate reviewed label." },
];

const architecture = [
  { label: "Offline model preparation", title: "TensorFlow and ONNX", body: "A grayscale 64 × 64 CNN is trained and independently evaluated. Export checks compare TensorFlow with executable ONNX output." },
  { label: "Online inspection", title: "Rust and ONNX Runtime", body: "An Axum API holds a cached ONNX session, checks image bounds and executes inference away from the async request executor." },
  { label: "Persisted records", title: "Firestore and objects", body: "Firestore stores inspection, review, model and release records. Image files and model packages live in local storage or a configured GCS adapter." },
];

const evaluation = [
  { name: "Synthetic smoke-a", accuracy: "1.000", f1: "1.000", note: "36 held-out procedural images" },
  { name: "Synthetic smoke-b", accuracy: "1.000", f1: "1.000", note: "36 held-out procedural images" },
  { name: "Synthetic smoke-v1", accuracy: "0.667", f1: "0.556", note: "Fails required class-recall gates" },
];

const decisions = [
  { title: "Prediction evidence is retained", text: "A review does not overwrite the original predicted label, probabilities or model version. The correction is stored independently with an audit event." },
  { title: "Activation is quality-gated", text: "Candidates must meet export and schema checks, class recall and macro-F1 thresholds. Regression comparisons require matching dataset and split hashes." },
  { title: "Model changes preserve in-flight requests", text: "A new validated session is prepared before release. Requests already running retain the model version they captured." },
  { title: "Monitoring does not invent ground truth", text: "Class mix, confidence, latency and reviewed-sample agreement use recorded inspections. PSI tracks a class-frequency shift, not actual manufacturing accuracy." },
];

const technologySummary = [
  { title: "Application", text: "React provides the inspection, human-review, model management and monitoring screens. The Rust API owns HTTP routing, upload validation and model inference.", tags: ["React", "TypeScript", "Rust", "Axum", "REST"] },
  { title: "Model development", text: "TensorFlow produces a six-class convolutional model. The offline pipeline includes reproducible splits, calibration analysis, ONNX export and parity verification.", tags: ["Python", "TensorFlow", "Keras", "ONNX", "Parity testing"] },
  { title: "Evidence and releases", text: "Firestore records inspections and decisions, while object storage holds binaries. Candidate validation, activation and rollback are exposed as distinct operator actions.", tags: ["Firestore", "Model registry", "Audit history", "Rollback"] },
  { title: "Local infrastructure", text: "Docker Compose connects the API, frontend and Firestore emulator. Cloud Run and GCS adapters are prepared but have not been deployed or cloud-tested.", tags: ["Docker Compose", "Nginx", "Cloud Run config", "GCS adapter"] },
];

function TechStackModal({ onClose }) {
  return <ProjectModal onClose={onClose} groups={technologies} />;
}

export default function ManufacturingQC() {
  const pageRef = useProjectPage();
  const [showTop, setShowTop] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [showStack, setShowStack] = useState(false);
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
    const observer = new IntersectionObserver(([entry]) => {
      setFooterVisible(entry.isIntersecting);
    }, { threshold: 0.15 });
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main ref={pageRef} className="project-case-study mq-project">
      <ProjectNavigation className="mq-back" />

      <article>
        <header className="mq-hero">
          <div className="mq-hero-inner">
            <div className="mq-hero-topline">
              <div className="mq-pills" aria-label="Technologies used">
                {heroTechnologies.map((item) => <span key={item}>{item}</span>)}
              </div>
              <time dateTime="2026-03">March 2026</time>
            </div>
            <h1>Intelligent Manufacturing <span>Quality Control</span></h1>
            <div className="mq-hero-bottom">
              <div>
                <p className="mq-hero-description">
                  I built a visual-inspection application that takes a trained TensorFlow model through ONNX export, Rust inference, human review and model release management. It classifies six known steel surface-defect patterns, with each prediction tied to the model and evidence used.
                </p>
                <p className="mq-hero-note">Locally verified on project-owned synthetic images. No industrial accuracy or automatic pass/fail decision is claimed.</p>
              </div>
              <div>
                <div className="mq-hero-actions">
                  <a className="mq-button mq-source" href={repository} target="_blank" rel="noopener noreferrer">
                    <img src={githubSvg} alt="" aria-hidden="true" /> Source
                  </a>
                  <button className="mq-button mq-disabled" type="button" disabled>Visit platform</button>
                </div>
                <p className="mq-platform-note">
                  I keep the implementation available in source rather than maintaining another public deployment. For a guided look, <a href="mailto:keenosmith@kailor.co.za">contact me</a>.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="mq-section" aria-labelledby="mq-overview">
          <span className="mq-section-label">Overview</span>
          <div className="mq-section-content">
            <h2 id="mq-overview">A complete local inspection workflow.</h2>
            <div className="mq-columns mq-summary">
              <p>The application includes Overview, Inspections, Review Queue, Model Lab and MLOps & Monitoring screens. Operators can submit an image, inspect a model prediction, record a correction and examine release history.</p>
              <p>Offline Python training is separate from online serving. Rust runs actual exported ONNX weights and keeps the active session cached. Firestore records predictions, reviews and releases for later inspection.</p>
            </div>
            <div className="mq-brief-wrap">
              <a className="mq-button mq-brief" href={technicalBrief} target="_blank" rel="noopener noreferrer">Technical brief</a>
            </div>
          </div>
        </section>

        <section className="mq-section" aria-labelledby="mq-architecture-title">
          <span className="mq-section-label">Architecture</span>
          <div className="mq-section-content">
            <h2 id="mq-architecture-title">Different responsibilities, separate runtimes.</h2>
            <p className="mq-lead">Training creates a versioned artifact. The Rust API loads an approved package and handles inspection requests. Firestore and object storage keep structured records separate from images and model binaries.</p>
            <div className="mq-three">
              {architecture.map((part) => (
                <div key={part.title}>
                  <span className="mq-small-label">{part.label}</span>
                  <h3>{part.title}</h3>
                  <p>{part.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mq-section" aria-labelledby="mq-flow-title">
          <span className="mq-section-label">Workflow</span>
          <div className="mq-section-content">
            <h2 id="mq-flow-title">From training to a reviewed inspection.</h2>
            <p className="mq-lead">The release process prevents a new model from becoming active solely because it was trained. Predictions and later reviews remain separately traceable.</p>
            <div className="mq-three mq-flow">
              {workflow.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mq-section" aria-labelledby="mq-model-title">
          <span className="mq-section-label">Model development</span>
          <div className="mq-section-content">
            <h2 id="mq-model-title">Six classes, one defined input contract.</h2>
            <p className="mq-lead">The CNN accepts 64 × 64 grayscale images and produces six probabilities. Dataset validation, content and pixel deduplication, stratified splits, held-out evaluation, export checks and independent ONNX re-evaluation are implemented.</p>
            <div className="mq-class-list" aria-label="Known defect classes">
              {['Crazing','Inclusion','Patches','Pitted surface','Rolled-in scale','Scratches'].map((label) => <span key={label}>{label}</span>)}
            </div>
            <div className="mq-evaluation">
              <div className="mq-evaluation-heading">
                <h3>Recorded smoke evaluations</h3>
                <span>Procedural data only</span>
              </div>
              <div className="mq-evaluation-header" aria-hidden="true"><span>Run</span><span>Accuracy</span><span>Macro-F1</span></div>
              {evaluation.map((run) => (
                <div className="mq-evaluation-row" key={run.name}>
                  <div><strong>{run.name}</strong><small>{run.note}</small></div>
                  <span>{run.accuracy}</span>
                  <span>{run.f1}</span>
                </div>
              ))}
              <p>The dataset contains 216 project-owned synthetic images; each run uses 36 held-out test images. These numbers verify software and export behaviour, not performance on real steel defects.</p>
            </div>
          </div>
        </section>

        <section className="mq-section" aria-labelledby="mq-decisions-title">
          <span className="mq-section-label">Engineering decisions</span>
          <div className="mq-section-content">
            <h2 id="mq-decisions-title">Preserving the evidence around each result.</h2>
            <div className="mq-decisions">
              {decisions.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mq-section" aria-labelledby="mq-testing-title">
          <span className="mq-section-label">Verification</span>
          <div className="mq-section-content">
            <h2 id="mq-testing-title">What the local tests established.</h2>
            <div className="mq-proof-grid">
              <div><strong>21</strong><span>passing unit and UI tests across Python, Rust and React</span></div>
              <div><strong>36</strong><span>samples in the independent full TensorFlow / ONNX parity recheck</span></div>
              <div><strong>4.77e−7</strong><span>maximum recorded probability difference in the independent parity check</span></div>
            </div>
            <p className="mq-lead">Local emulator-backed inspection, correction, validation, activation, rollback and snapshot flows passed. Rust and frontend production builds passed. A short repeated-fixture benchmark measured 87.22 ms end-to-end p95; it is not a sustained production load result.</p>
            <p className="mq-caveat">Still unverified: real NEU-CLS training and accuracy, GCP services and IAM, remotely executed GitHub Actions, multi-instance release coordination and browser-automated native file-chooser upload.</p>
          </div>
        </section>

        <section className="mq-section mq-technology" aria-labelledby="mq-tech-title">
          <span className="mq-section-label">Technology</span>
          <div className="mq-section-content">
            <h2 id="mq-tech-title">How the components fit together.</h2>
            <div className="mq-tech-grid">
              {technologySummary.map((group) => (
                <div className="mq-tech-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <p>{group.text}</p>
                  <div className="mq-tech-tags">{group.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              ))}
            </div>
            <button type="button" className="mq-button mq-tech-trigger" onClick={() => setShowStack(true)}>
              <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" /> Tech stack
            </button>
          </div>
        </section>

        <section className="mq-closing">
          <div>
            <p className="mq-eyebrow">Architecture and implementation</p>
            <h2>Model inference, review and release management.</h2>
            <p>Training, runtime inference and operator review are implemented as separate parts of the same local system. Every inspection retains its model version and original output; release gates and rollback control which weights the Rust service uses. Testing covers the synthetic-data workflow, while real industrial evaluation and cloud operation remain separate work.</p>
          </div>
        </section>
      </article>

      <footer className="mq-footer" ref={footerRef}>
        <Link className="mq-footer-back" to="/">Back to portfolio</Link>
        <button type="button" className="mq-footer-top" onClick={scrollTop} aria-label="Back to top"><ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" /></button>
      </footer>
      {showTop && !footerVisible && <button type="button" className="mq-floating-top" onClick={scrollTop} aria-label="Back to top"><ArrowUp size={17} strokeWidth={1.7} aria-hidden="true" /></button>}
      {showStack && <TechStackModal onClose={closeStack} />}
    </main>
  );
}
