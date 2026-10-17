import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUp, Layers3 } from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./AIEntity.css";

const repositoryUrl = "https://github.com/keenosmith-del/ai-entity";
const briefUrl = "/documents/ai-entity-technical-brief.pdf";

const heroTechnologies = ["React", "Node.js", "MongoDB", "Groq", "RAG", "ONNX"];
const technologyGroups = [
  { heading: "Frontend", skills: ["React 19", "JavaScript", "Vite", "CSS", "Fetch API", "React Markdown", "remark-gfm", "Lucide React"] },
  { heading: "Backend", skills: ["Node.js", "Express 5", "REST APIs", "SSE", "Groq SDK", "Multer"] },
  { heading: "Retrieval and embeddings", skills: ["Hugging Face Transformers.js", "ONNX", "all-MiniLM-L6-v2", "Mean pooling", "Normalized embeddings", "Cosine similarity", "Chunk overlap"] },
  { heading: "Documents and persistence", skills: ["MongoDB", "Mongoose", "PDF Parse", "Mammoth", "TXT", "Markdown", "DOCX"] },
  { heading: "Current integration", note: "Backend inference is pinned to openai/gpt-oss-20b through Groq. The frontend's model selector is not wired to this endpoint.", skills: ["Groq inference", "Conversation CRUD", "Knowledge CRUD", "Memory CRUD", "Local ONNX embeddings"] },
];

const retrievalSteps = [
  { title: "Read the document", detail: "Extract text from TXT, Markdown, text-based PDF or DOCX uploads. The upload handler limits files to 10 MB and rejects empty text." },
  { title: "Split and embed", detail: "Split text into overlapping chunks, then generate normalized vectors with the local all-MiniLM-L6-v2 ONNX model." },
  { title: "Search related content", detail: "Embed the question, calculate cosine similarity against stored chunks and return the closest matches in score order." },
  { title: "Construct the request", detail: "Insert retrieved passages into a system message alongside enabled personality, memory and recent conversation context." },
];

const engineeringNotes = [
  { title: "RAG without a vector database", detail: "Embeddings are stored in MongoDB document chunks. Retrieval loads embedded documents and scores chunks in application code. This is a sensible small-scale implementation, not an indexed high-volume vector search system." },
  { title: "Streaming and the interface", detail: "Express relays Groq tokens as server-sent events. The frontend reads the full response before revealing it character by character. The visual typing effect is not live token-by-token rendering." },
  { title: "Conversation and settings", detail: "MongoDB models store conversation messages, context flags, personality, memories and model settings. The browser restores saved conversations and lets users edit the settings shown in the interface." },
  { title: "Scope and access", detail: "Routes for conversation, memory and knowledge management have no authentication middleware. The application is suitable as an applied-AI prototype, not a public multi-user knowledge store in its present form." },
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
      className="ae-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="ae-modal" role="dialog" aria-modal="true" aria-label="Project technology stack">
        <button ref={closeRef} className="ae-modal-close" type="button" onClick={onClose} aria-label="Close tech stack">
          <span aria-hidden="true">×</span>
        </button>
        <div className="ae-modal-groups">
          {technologyGroups.map((group) => (
            <div className="ae-modal-group" key={group.heading}>
              <span className="ae-modal-category">{group.heading}</span>
              {group.note && <p className="ae-modal-note">{group.note}</p>}
              <div className="ae-modal-pills">
                {group.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Section({ label, children, className = "" }) {
  return (
    <section className={`ae-section ${className}`}>
      <div className="ae-section-label">{label}</div>
      <div className="ae-section-content">{children}</div>
    </section>
  );
}

export default function AIEntity() {
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
    if (!footerRef.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main className="ae-project">
      <Link className="ae-back" to="/">
        <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />
        <span>Back to portfolio</span>
      </Link>

      <article>
        <header className="ae-hero">
          <div className="ae-hero-inner">
            <div className="ae-hero-topline">
              <div className="ae-pills" aria-label="Technologies used">
                {heroTechnologies.map((technology) => <span key={technology}>{technology}</span>)}
              </div>
              <span className="ae-hero-context">Full-stack / Applied AI engineering</span>
            </div>
            <h1>AI Entity</h1>
            <div className="ae-hero-bottom">
              <div>
                <p className="ae-hero-description">
                  I built a conversational AI application with document retrieval, saved conversations and configurable context. The React interface connects to an Express API for inference, MongoDB persistence and semantic search over uploaded documents.
                </p>
                <p className="ae-hero-note">An applied-AI prototype with working backend services; not a hosted multi-user product.</p>
              </div>
              <div className="ae-hero-side">
                <div className="ae-hero-actions">
                  <a href={repositoryUrl} target="_blank" rel="noopener noreferrer" className="ae-button ae-source">
                    <img src={githubSvg} alt="" aria-hidden="true" />Source
                  </a>
                  <button type="button" className="ae-button ae-disabled" disabled>Visit platform</button>
                </div>
                <p className="ae-platform-note">
                  Not every project needs another live deployment to maintain. The code is available, and you can <a href="mailto:keenosmith@kailor.co.za">contact me</a> for a walkthrough.
                </p>
              </div>
            </div>
          </div>
        </header>

        <Section label="Project overview">
          <h2>Conversation, memory and documents in one interface.</h2>
          <div className="ae-columns ae-summary-copy">
            <p>
              The interface allows users to maintain separate conversations and adjust the tone, response style, formality and amount of recent conversation context included with a request.
            </p>
            <p>
              Knowledge documents can be uploaded, edited and searched. A semantic retrieval step adds relevant passages to the model request rather than sending an entire document collection for every question.
            </p>
          </div>
          <div className="ae-brief-wrap">
            <a className="ae-button ae-brief" href={briefUrl} target="_blank" rel="noopener noreferrer">Technical brief</a>
          </div>
        </Section>

        <Section label="System architecture">
          <h2>Separating the interface, data and inference.</h2>
          <p className="ae-lead">
            The application uses three cooperating parts. React maintains the interaction state, Express exposes separate REST controllers, and MongoDB stores conversations, memories and document chunks. Groq handles model inference; the local ONNX model handles embeddings.
          </p>
          <div className="ae-architecture">
            <div>
              <span className="ae-small-label">Interface</span>
              <h3>React and Vite</h3>
              <p>Conversation views, document management, controls for personality and context, and formatted AI responses.</p>
            </div>
            <div>
              <span className="ae-small-label">Application API</span>
              <h3>Node.js and Express</h3>
              <p>REST endpoints for persistent resources, document parsing, semantic search and SSE model output.</p>
            </div>
            <div>
              <span className="ae-small-label">Data and inference</span>
              <h3>MongoDB, ONNX and Groq</h3>
              <p>Stored conversation records and vectors, local embedding generation and external language-model responses.</p>
            </div>
          </div>
        </Section>

        <Section label="Knowledge retrieval">
          <h2>From an uploaded document to relevant context.</h2>
          <p className="ae-lead">
            The retrieval path is implemented in the repository, with separate services for text extraction, chunking, embeddings and similarity scoring.
          </p>
          <div className="ae-steps">
            {retrievalSteps.map((item) => (
              <div className="ae-step" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="ae-note">
            Retrieval uses 1,000-character chunks with 150-character overlap by default. A query normally requests the five most similar passages. The system does not have a dedicated vector index or citation-validation layer.
          </p>
        </Section>

        <Section label="Conversation lifecycle">
          <h2>Context is assembled before inference.</h2>
          <div className="ae-lifecycle">
            <div>
              <span className="ae-small-label">Request construction</span>
              <h3>Instructions and recent messages</h3>
              <p>
                The frontend builds system messages for enabled personality settings, saved memory and retrieved knowledge. It then adds the latest conversation messages and the current user prompt.
              </p>
            </div>
            <div>
              <span className="ae-small-label">Response handling</span>
              <h3>Groq completion and saved result</h3>
              <p>
                The backend requests a streamed completion from <code>openai/gpt-oss-20b</code>. The frontend buffers that completion, displays a typing effect and persists the updated conversation.
              </p>
            </div>
          </div>
        </Section>

        <Section label="Engineering decisions">
          <h2>What is implemented, and what still needs work.</h2>
          <div className="ae-decisions">
            {engineeringNotes.map((item) => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="ae-note">
            The backend fixes the model to <code>openai/gpt-oss-20b</code> even though model selection exists in the UI. No committed automated test suite or CI workflow was found during this source review.
          </p>
        </Section>

        <Section label="Technology" className="ae-technology">
          <h2>The application stack.</h2>
          <p className="ae-lead">
            React and Express make up the application layer. MongoDB stores application data and chunk vectors. Hugging Face Transformers.js runs the local embedding model, while Groq serves the generation endpoint.
          </p>
          <div className="ae-tech-grid">
            <div>
              <h3>Frontend and API</h3>
              <p>React state and document views, Express controllers, persistence endpoints and streamed model responses.</p>
              <div className="ae-tech-tags"><span>React</span><span>Vite</span><span>Express</span><span>Groq</span><span>SSE</span></div>
            </div>
            <div>
              <h3>Knowledge and persistence</h3>
              <p>MongoDB records, file parsing, local semantic embeddings and cosine-similarity retrieval.</p>
              <div className="ae-tech-tags"><span>MongoDB</span><span>Mongoose</span><span>ONNX</span><span>Transformers.js</span><span>PDF</span><span>DOCX</span></div>
            </div>
          </div>
          <button type="button" className="ae-button ae-tech-trigger" onClick={() => setShowStack(true)}>
            <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />
            Tech stack
          </button>
        </Section>

        <section className="ae-closing">
          <div>
            <p className="ae-eyebrow">Architecture and implementation</p>
            <h2>Retrieval, context and conversation persistence.</h2>
            <p>
              AI Entity combines document parsing, locally generated embeddings, semantic retrieval and a Groq language-model endpoint in a React and Express application. Conversation and knowledge records persist in MongoDB. The source demonstrates the main workflow, while authentication, backend model selection and broader verification remain incomplete.
            </p>
          </div>
        </section>
      </article>

      <footer ref={footerRef} className="ae-footer">
        <Link to="/" className="ae-footer-back">Back to portfolio</Link>
        <button className="ae-footer-top" type="button" onClick={scrollToTop} aria-label="Back to top">
          <ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </footer>

      {showTop && !footerVisible && (
        <button type="button" className="ae-floating-top" onClick={scrollToTop} aria-label="Back to top">
          <ArrowUp size={17} strokeWidth={1.7} aria-hidden="true" />
        </button>
      )}
      {showStack && <TechStackModal onClose={closeStack} />}
    </main>
  );
}
