import ProjectNavigation from "../shared/ProjectNavigation.jsx";
import useProjectPage from "../shared/useProjectPage.js";
import ProjectModal from "../shared/ProjectModal.jsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUp, BookOpen, Compass, Globe2, Layers3, MessageCircle } from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import LaunchCountdown from "../../../shared/LaunchCountdown.jsx";
import { companyLaunchLabel } from "../../../../data/companyLaunch.js";
import "./KailorKai.css";

const repositories = {
  kailor: "https://github.com/keenosmith-del/kailor",
  kai: "https://github.com/keenosmith-del/kai",
};

// Deliberately unset while neither public website has a confirmed working URL.
// Add verified public destinations here after deployment; buttons enable automatically.
// The registered kailor.co.za domain is not itself evidence that an app is live.
const websites = {
  kailor: "",
  kai: "",
};

const pdfUrl = "/documents/kailor-kai-engineering-brief.pdf";

const stackGroups = [
  {
    heading: "kailor · client experience",
    skills: [
      "React",
      "TypeScript",
      "Vite",
      "React Router",
      "CSS",
      "Lucide",
      "Fetch API",
    ],
  },
  {
    heading: "kailor · consulting and intelligence",
    skills: [
      "Node.js",
      "Express",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Cloudflare AI (opt-in)",
      "RAG-inspired case retrieval",
      "Evidence policy",
      "Report snapshots",
      "PDF export",
    ],
    note: "Cloudflare calls are bounded and opt-in. Remote answer quality is not established by the local test suite.",
  },
  {
    heading: "kai · reading and publishing",
    skills: [
      "React",
      "JavaScript",
      "Vite",
      "React Router",
      "Tiptap",
      "Fetch API",
      "Lucide",
      "WebP image processing",
    ],
  },
  {
    heading: "kai · API and data",
    skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "SQL migrations",
      "Full-text search",
      "Keyset pagination",
      "Cookie sessions",
      "GitHub OAuth + PKCE (implemented)",
      "SMTP / local outbox",
    ],
    note: "OAuth callback behaviour is integration-tested using controlled provider responses; live provider consent was not tested.",
  },
  {
    heading: "Development, testing and deployment boundary",
    skills: [
      "Docker Compose",
      "Vitest",
      "Playwright",
      "Node test runner",
      "TypeScript checks",
      "Responsive browser testing",
    ],
    note: "Both repositories document local full-stack verification. No verified live public deployments for the two products were found.",
  },
];

const kailorStages = [
  {
    title: "Understand before recommending",
    body: "Adaptive discovery and a conversational alternative gather the situation, goals, operating constraints and what the user has already tried. Unknown answers stay unknown.",
  },
  {
    title: "Ground the interpretation",
    body: "Confirmed evidence, attributed requirements and revision-aware project memory inform a consulting assessment. An industry label alone cannot justify a product recommendation.",
  },
  {
    title: "Compare credible paths",
    body: "The system distinguishes improving a manual process, evaluating an established tool and commissioning custom software; it keeps assumptions and deferred requirements explicit.",
  },
  {
    title: "Keep decisions connected",
    body: "Analysis, a live solution canvas, sources and project Chat share context. Reports are immutable snapshots; later corrections create updated assessments rather than rewriting history.",
  },
];

const kaiCapabilities = [
  [
    "Editorial creation",
    "Tiptap-based briefs and stories, rich content, images, private drafts, preview and revision-checked publication changes.",
  ],
  [
    "Reading and discovery",
    "Search across text and metadata; latest, following and ranked feeds with topic/author follows and paginated results.",
  ],
  [
    "Reader participation",
    "Likes, saved reading, threaded discussion, reader profiles, notifications and personal settings are persisted in PostgreSQL.",
  ],
  [
    "Editorial control",
    "Administrative moderation, reports, topic management and publication access enforced through role-checked backend routes.",
  ],
];

function SourceButton({ href, label }) {
  return (
    <a
      className="kk-button kk-button-source"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={githubSvg} alt="" aria-hidden="true" />
      {label}
    </a>
  );
}

function WebsiteButton({ href, label }) {
  if (!href) {
    return (
      <button
        className="kk-button kk-button-unavailable"
        type="button"
        disabled
        title="Public website has not been confirmed as launched"
      >
        <Globe2 size={14} strokeWidth={1.7} aria-hidden="true" />
        {label}
      </button>
    );
  }
  return (
    <a
      className="kk-button kk-button-website"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Globe2 size={14} strokeWidth={1.7} aria-hidden="true" />
      {label}
    </a>
  );
}

function StackModal({ onClose }) {
  return <ProjectModal onClose={onClose} groups={stackGroups} />;
}

export default function KailorKai() {
  const pageRef = useProjectPage();
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
    if (!footerRef.current || typeof IntersectionObserver === "undefined")
      return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={pageRef} className="project-case-study kk-project">
      <ProjectNavigation className="kk-back" />

      <article>
        <header className="kk-hero">
          <div className="kk-hero-inner">
            <div className="kk-hero-meta">
              <div className="kk-pills" aria-label="Product focus">
                <span>Cloudflare</span>
                <span>Software engineering</span>
                <span>Artificial intelligence</span>
                <span>Publishing</span>
              </div>
              <time dateTime="2026-02">February 2026</time>
            </div>
            <div className="kk-hero-grid">
              <div className="kk-hero-copy">
                <h1>AI Consultancy <span>&amp; Knowledge Publishing</span></h1>
                <p className="kk-hero-description">
                  I run kailor, a technology consultancy that helps businesses
                  identify useful AI opportunities, improve processes and develop
                  tailored software. Alongside it, I run kai, an AI publication
                  and knowledge hub covering emerging technologies, tools and
                  practical applications. Together, they connect business advice,
                  software engineering and AI education.
                </p>
                <div className="kk-hero-actions">
                  <a className="kk-button kk-button-main" href="#kailor">
                    Explore kailor{" "}
                  </a>
                  <a className="kk-button kk-button-light" href="#kai">
                    Explore kai{" "}
                  </a>
                </div>
              </div>
            </div>
            <div className="kk-launch">
              <div className="kk-launch-countdown">
                <LaunchCountdown variant="editorial" />
              </div>
              <div className="kk-launch-copy">
                <span className="kk-eyebrow">Launch target</span>
                <p>
                  {companyLaunchLabel} is the date currently shown on my
                  portfolio. The product repositories are available now; public
                  website launches are not yet verified.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section
          className="kk-intro kk-editorial-section"
          aria-labelledby="kk-intro-title"
        >
          <div className="kk-side-label">The relationship</div>
          <div className="kk-section-content">
            <h2 id="kk-intro-title">
              Useful technology starts with understanding. Useful knowledge
              deserves a place to grow.
            </h2>
            <div className="kk-intro-columns">
              <p>
                <strong>kailor</strong> addresses a decision problem. Before
                recommending a website, automation or AI system, it works to
                understand a business or idea and compare practical courses of
                action.
              </p>
              <p>
                <strong>kai</strong> addresses a publishing problem. It gives
                authors and readers a structured way to share technical ideas,
                discover publications, follow topics and hold conversations
                around them.
              </p>
            </div>
            <a
              className="kk-summary-link"
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download engineering brief

            </a>
          </div>
        </section>

        <section
          id="kailor"
          className="kk-product-section kk-kailor-section"
          aria-labelledby="kk-kailor-title"
        >
          <div className="kk-product-inner">
            <div className="kk-product-label">
              <span>k ᐧ ai ᐧ lor</span>
              <span>Technology consultancy</span>
            </div>
            <div className="kk-product-heading">
              <h2 id="kk-kailor-title">
                Better questions before better solutions.
              </h2>
              <p>
                kailor is an evidence-led consulting workspace for people
                starting a business, improving existing operations or
                investigating a specific technology problem. Discovery and
                conversation feed a common project, not competing forms of
                knowledge.
              </p>
            </div>
            <div className="kk-step-grid">
              {kailorStages.map((stage) => (
                <div className="kk-step" key={stage.title || stage.label}>

                  <h3>{stage.title}</h3>
                  <p>{stage.body}</p>
                </div>
              ))}
            </div>
            <div className="kk-product-detail">
              <div>
                <span className="kk-eyebrow">The engineering decision</span>
                <h3>Keep the evidence separate from the recommendation.</h3>
              </div>
              <p>
                kailor uses project ownership, confirmation-aware evidence and
                attributed requirements to keep proposed work grounded. A live
                Canvas can refine directions and decisions; a saved report
                remains a dated, immutable assessment. Cloudflare AI is optional
                and constrained by privacy, usage and fallback rules rather than
                allowed to rewrite confirmed facts.
              </p>
            </div>
            <div className="kk-product-links">
              <SourceButton href={repositories.kailor} label="kailor source" />
              <WebsiteButton href={websites.kailor} label="Visit kailor" />
            </div>
            {!websites.kailor && (
              <p className="kk-link-note">
                Public website link pending verified deployment. The application
                currently runs as a local project.
              </p>
            )}
          </div>
        </section>

        <section
          id="kai"
          className="kk-product-section kk-kai-section"
          aria-labelledby="kk-kai-title"
        >
          <div className="kk-product-inner">
            <div className="kk-product-label">
              <span>k݀ ᐧ ai</span>
              <span>Independent publishing platform</span>
            </div>
            <div className="kk-product-heading">
              <h2 id="kk-kai-title">A publication built for participation.</h2>
              <p>
                kai is an independently engineered AI publication and social
                reading platform, with its own accounts, editorial lifecycle,
                reading feeds, search and reader interaction. It is not the
                knowledge panel inside kailor; it is a separate product with its
                own data model and deployment requirements.
              </p>
            </div>
            <div
              className="kk-publishing-band"
              aria-label="Publishing lifecycle"
            >
              <div>
                <BookOpen size={20} strokeWidth={1.45} />
                <span>Compose</span>
                <small>Rich draft and preview</small>
              </div>
              <ArrowRight
                className="kk-publishing-arrow"
                size={17}
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div>
                <Compass size={20} strokeWidth={1.45} />
                <span>Discover</span>
                <small>Search, topics and feeds</small>
              </div>
              <ArrowRight
                className="kk-publishing-arrow"
                size={17}
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div>
                <MessageCircle size={20} strokeWidth={1.45} />
                <span>Discuss</span>
                <small>Readers and notifications</small>
              </div>
            </div>
            <div className="kk-kai-grid">
              {kaiCapabilities.map(([heading, body]) => (
                <div key={heading}>
                  <h3>{heading}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
            <div className="kk-product-detail">
              <div>
                <span className="kk-eyebrow">The engineering decision</span>
                <h3>Make authorship durable and reading genuinely public.</h3>
              </div>
              <p>
                Guest reading is public while authoring and private libraries
                require a server-verified session. Stored Tiptap content is
                normalised through an allowlist instead of rendering arbitrary
                HTML. Publication revisions avoid silent overwrites; PostgreSQL
                search and keyset pagination keep reader journeys connected to
                real content rather than synthetic engagement.
              </p>
            </div>
            <div className="kk-product-links">
              <SourceButton href={repositories.kai} label="kai source" />
              <WebsiteButton href={websites.kai} label="Visit kai" />
            </div>
            {!websites.kai && (
              <p className="kk-link-note">
                Public website link pending verified deployment. kai's local
                application uses a separate frontend and API.
              </p>
            )}
          </div>
        </section>

        <section
          className="kk-editorial-section kk-architecture"
          aria-labelledby="kk-architecture-title"
        >
          <div className="kk-side-label">Architecture</div>
          <div className="kk-section-content">
            <h2 id="kk-architecture-title">
              A shared product language. Independent systems.
            </h2>
            <p className="kk-section-intro">
              The two repositories deliberately avoid coupling their data or
              authentication. Each uses its own React client, Express API and
              PostgreSQL state; kailor adds Prisma and an assessment engine,
              while kai adds a full publishing and editorial domain.
            </p>
            <p className="kk-architecture-note">
              A consistent visual identity does not imply a shared identity
              provider, customer database, cross-product account, live
              commercial consultancy marketplace or deployed integration between
              the products.
            </p>
          </div>
        </section>

        <section
          className="kk-editorial-section kk-verification"
          aria-labelledby="kk-verification-title"
        >
          <div className="kk-side-label">Engineering evidence</div>
          <div className="kk-section-content">
            <h2 id="kk-verification-title">
              Working software, with the limits documented.
            </h2>
            <div className="kk-verification-grid">
              <div>
                <span>kailor</span>
                <strong>315 + 28</strong>
                <p>
                  Backend and frontend unit tests in the latest
                  consulting-intelligence report; 162 PostgreSQL integration
                  tests, typecheck/build and scenario/browser checks.
                </p>
              </div>
              <div>
                <span>kai</span>
                <strong>15</strong>
                <p>
                  Database-backed backend integration tests, frontend build/lint
                  and hands-on desktop, mobile and tablet browser journeys in
                  the publishing iteration report.
                </p>
              </div>
            </div>
            <p className="kk-evidence-note">
              These are repository-recorded checks, not tests newly executed by
              this portfolio page. Neither project's public hosted service, live
              kailor GitHub OAuth, nor live kai GitHub consent flow is
              independently established here. A consulting handoff/marketplace
              and invoicing are future work, not shipped capabilities.
            </p>
          </div>
        </section>

        <section
          className="kk-editorial-section kk-technology"
          aria-labelledby="kk-technology-title"
        >
          <div className="kk-side-label">Implementation</div>
          <div className="kk-section-content">
            <h2 id="kk-technology-title">
              Different domains. Deliberate engineering boundaries.
            </h2>
            <div className="kk-technology-grid">
              <div>
                <h3>Product interfaces</h3>
                <p>
                  React clients share compact, rounded, light-surface styling.
                  kailor uses TypeScript; kai uses JavaScript and a rich
                  publishing editor.
                </p>
                <div className="kk-tags">
                  <span>React</span>
                  <span>TypeScript</span>
                  <span>Tiptap</span>
                  <span>Vite</span>
                </div>
              </div>
              <div>
                <h3>Services and persistence</h3>
                <p>
                  Both products use Node/Express with PostgreSQL. kailor uses
                  Prisma and versioned reporting; kai uses tracked SQL
                  migrations and content revisions.
                </p>
                <div className="kk-tags">
                  <span>Node.js</span>
                  <span>Express</span>
                  <span>Prisma</span>
                  <span>PostgreSQL</span>
                </div>
              </div>
              <div>
                <h3>AI and consulting intelligence</h3>
                <p>
                  kailor distinguishes attributed evidence, deterministic
                  consulting logic, report snapshots and privacy-gated optional
                  model inference.
                </p>
                <div className="kk-tags">
                  <span>Cloudflare Workers AI</span>
                  <span>Requirements</span>
                  <span>Evidence policy</span>
                  <span>PDF</span>
                </div>
              </div>
              <div>
                <h3>Publishing and trust</h3>
                <p>
                  kai implements full-text discovery, cookie session controls,
                  explicit GitHub identity linking and user/content moderation
                  boundaries.
                </p>
                <div className="kk-tags">
                  <span>Full-text search</span>
                  <span>PKCE</span>
                  <span>SQL</span>
                  <span>Access control</span>
                </div>
              </div>
            </div>
            <button
              className="kk-button kk-tech-trigger"
              type="button"
              onClick={() => setShowStack(true)}
            >
              <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />
              Tech stack
            </button>
          </div>
        </section>

        <section className="kk-closing">
          <div>
            <h2>From the first question to the next idea worth sharing.</h2>
            <p>
              One product explores what should be built. The other provides a
              place for ideas and applied knowledge to be published. Both are
              part of the same ongoing engineering practice.
            </p>
            <div className="kk-closing-actions">
            </div>
          </div>
        </section>
      </article>

      <footer className="kk-footer" ref={footerRef}>
        <Link className="kk-footer-back" to="/">
          Back to portfolio
        </Link>
        <button
          className="kk-footer-top"
          type="button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </footer>

      {showTop && !footerVisible && (
        <button
          type="button"
          className="kk-floating-top"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUp size={17} strokeWidth={1.7} aria-hidden="true" />
        </button>
      )}
      {showStack && <StackModal onClose={closeStack} />}
    </main>
  );
}
