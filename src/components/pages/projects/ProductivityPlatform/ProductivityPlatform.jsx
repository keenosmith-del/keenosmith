import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUp, Layers3 } from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./ProductivityPlatform.css";

const sourceRepository =
  "https://github.com/keenosmith-del/personal-productivity-desktop";
const technicalBrief = "/documents/productivity-platform-technical-brief.pdf";

const heroTechnologies = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "JWT",
  "Mongoose",
];

const technologyGroups = [
  {
    heading: "Frontend",
    skills: [
      "React 19",
      "Vite 8",
      "JavaScript",
      "React Router",
      "Context API",
      "Fetch API",
      "Framer Motion",
      "Lucide React",
      "Recharts",
      "Tailwind CSS",
      "CSS",
    ],
  },
  {
    heading: "Backend",
    skills: [
      "Node.js",
      "Express 5",
      "REST APIs",
      "Express middleware",
      "bcryptjs",
      "jsonwebtoken",
      "Multer",
    ],
  },
  {
    heading: "Data and persistence",
    skills: [
      "MongoDB",
      "Mongoose",
      "Schema models",
      "User-scoped queries",
      "CRUD",
      "Document references",
    ],
  },
  {
    heading: "Workspace functionality",
    skills: [
      "Tasks",
      "Projects",
      "Goals",
      "Notes",
      "Folders",
      "Reminders",
      "Calendar",
      "Alarms",
      "Notifications",
      "Global search",
    ],
  },
  {
    heading: "Development",
    note: "Repository tools and dependencies; deployment and automated test execution are not evidenced.",
    skills: ["npm", "Vite", "ESLint", "Git", "GitHub"],
  },
];

const workspaceSections = [
  {
    number: "01",
    name: "Tasks and projects",
    description:
      "Task and project records can be created, edited, completed and removed. The dashboard draws the same records as their individual pages.",
  },
  {
    number: "02",
    name: "Notes and folders",
    description:
      "Notes have dedicated CRUD routes, folder membership and archive actions. A user can organise notes without leaving the wider workspace.",
  },
  {
    number: "03",
    name: "Goals and planning",
    description:
      "Goals, reminders and due dates contribute to the dashboard and calendar. Calendar events are assembled from existing application records.",
  },
  {
    number: "04",
    name: "Alarms and notifications",
    description:
      "Alarm checks run in the browser while the app is open. Backend mutations create notification records that the frontend can display.",
  },
];

function TechStackModal({ close }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "Tab") {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus?.();
    };
  }, [close]);
  return (
    <div
      className="productivity-modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="productivity-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Project technology stack"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          className="productivity-modal-close"
          ref={closeRef}
          type="button"
          aria-label="Close tech stack"
          onClick={close}
        >
          <span aria-hidden="true">×</span>
        </button>
        <div className="productivity-modal-groups">
          {technologyGroups.map((group) => (
            <div className="productivity-modal-group" key={group.heading}>
              <span className="productivity-modal-category">
                {group.heading}
              </span>
              {group.note && (
                <p className="productivity-modal-note">{group.note}</p>
              )}
              <div className="productivity-modal-pills">
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

export default function ProductivityPlatform() {
  const [showTop, setShowTop] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [showStack, setShowStack] = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const footerRef = useRef(null);
  const closeStack = useCallback(() => setShowStack(false), []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
    <main className="productivity-project">
      <Link className="productivity-back" to="/">
        <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />
        <span>Back to portfolio</span>
      </Link>

      <article>
        <header className="productivity-hero">
          <div className="productivity-hero-inner">
            <div className="productivity-hero-topline">
              <div
                className="productivity-pill-list"
                aria-label="Technologies used"
              >
                {heroTechnologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
              <span className="productivity-hero-type">
                Full-stack engineering
              </span>
            </div>
            <h1>
              Full-Stack <span>Productivity Platform</span>
            </h1>
            <div className="productivity-hero-bottom">
              <div>
                <p className="productivity-hero-description">
                  I built a MERN application that brings tasks, projects, goals,
                  notes and scheduling into one personal workspace. React
                  handles the views and account state, while an Express API
                  stores user-owned records in MongoDB. The dashboard and
                  calendar use those same records rather than maintaining
                  separate copies.
                </p>
                <p className="productivity-hero-note">
                  Source-inspected application. No public deployment or
                  automated acceptance record is provided in the repository.
                </p>
              </div>
              <div className="productivity-hero-controls">
                <div className="productivity-hero-actions">
                  <a
                    className="productivity-button"
                    href={sourceRepository}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="productivity-github-icon"
                      src={githubSvg}
                      alt=""
                      aria-hidden="true"
                    />
                    Source
                  </a>
                  <button
                    className="productivity-button productivity-button-disabled"
                    type="button"
                    disabled
                  >
                    Visit platform
                  </button>
                </div>
                <p className="productivity-platform-note">
                  I keep the source available instead of maintaining a live
                  deployment for every project. You're welcome to{" "}
                  <a href="mailto:keenosmith@kailor.co.za">contact me</a> for a
                  walkthrough.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section className="productivity-section productivity-summary">
          <div className="productivity-section-label">Project summary</div>
          <div className="productivity-section-copy">
            <h2>Several everyday tools, one account.</h2>
            <div className="productivity-two-columns">
              <p>
                The project started as a way to bring the information people use
                to plan their day into a single application. Each area has its
                own screens and API routes, but the dashboard provides a wider
                view of what is due, active or completed.
              </p>
              <p>
                The server stores each type of record with Mongoose. On the main
                task and project routes, requests are authenticated and reads
                and mutations are scoped to the signed-in user. Authentication
                is based on JWT bearer tokens and bcrypt password hashes.
              </p>
            </div>
            <div className="productivity-summary-action">
              <a
                className="productivity-button productivity-summary-button"
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
          className="productivity-process"
          aria-labelledby="productivity-process-title"
        >
          <div className="productivity-process-intro">
            <span className="productivity-section-label">
              Application structure
            </span>
            <h2 id="productivity-process-title">
              How a change reaches the workspace.
            </h2>
            <p>
              The application uses ordinary HTTP requests. The API determines
              which account owns a record and MongoDB stores the update.
            </p>
          </div>
          <div className="productivity-process-flow">
            <div>
              <span>React</span>
              <strong>View and edit</strong>
              <p>
                Forms and account context prepare a task, project or note
                request.
              </p>
            </div>
            <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" />
            <div>
              <span>Express</span>
              <strong>Check and handle</strong>
              <p>
                JWT middleware authenticates protected routes; handlers work
                with the models.
              </p>
            </div>
            <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" />
            <div>
              <span>MongoDB</span>
              <strong>Store and return</strong>
              <p>
                Mongoose persists records and returns data for the dashboard and
                detail views.
              </p>
            </div>
          </div>
        </section>

        <section className="productivity-section productivity-decisions-section">
          <div className="productivity-section-label">Implementation</div>
          <div className="productivity-section-copy">
            <h2>Keeping the different parts connected.</h2>
            <div className="productivity-decisions">
              <div>
                <h3>Dashboard and calendar</h3>
                <p>
                  The dashboard fetches projects, tasks, goals, reminders and
                  notes and combines them for overview widgets. The calendar
                  assembles dated records from several collections into a common
                  calendar view.
                </p>
              </div>
              <div>
                <h3>Notes and folders</h3>
                <p>
                  Notes support creation, editing, deletion, folder membership
                  and archive actions. The backend maintains references between
                  notes and folders so those views can stay organised.
                </p>
              </div>
              <div>
                <h3>Alarms and notifications</h3>
                <p>
                  Mutations can write notification documents. Frontend watchers
                  poll for notifications and evaluate alarms while the
                  application is open; they are not a server-side push or
                  background scheduling service.
                </p>
              </div>
              <div>
                <h3>Account data</h3>
                <p>
                  Passwords are hashed with bcrypt and protected routes verify
                  JWTs. Account settings and profile images are editable. The
                  current source needs further hardening before public use,
                  including access restrictions on the user-list endpoint and
                  safer session storage.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="productivity-section productivity-technology">
          <div className="productivity-section-label">Technology</div>
          <div className="productivity-section-copy">
            <h2>A React frontend and a Node.js API backed by MongoDB.</h2>
            <div className="productivity-technology-grid">
              <div className="productivity-technology-group">
                <h3>Frontend</h3>
                <p>
                  React 19 and Vite provide the application shell. React Router
                  handles authenticated pages, while Context manages the session
                  state. Separate screens cover daily work, planning, notes and
                  account settings.
                </p>
                <div className="productivity-tech-tags">
                  <span>React</span>
                  <span>Vite</span>
                  <span>React Router</span>
                  <span>Context API</span>
                  <span>Framer Motion</span>
                </div>
              </div>
              <div className="productivity-technology-group">
                <h3>Backend</h3>
                <p>
                  Express 5 exposes the account and workspace APIs. JWT
                  middleware protects the primary work routes, and the server
                  records task and project notifications alongside normal CRUD
                  operations.
                </p>
                <div className="productivity-tech-tags">
                  <span>Node.js</span>
                  <span>Express</span>
                  <span>REST APIs</span>
                  <span>JWT</span>
                  <span>bcryptjs</span>
                </div>
              </div>
              <div className="productivity-technology-group">
                <h3>Database</h3>
                <p>
                  MongoDB and Mongoose store users, tasks, goals, projects,
                  notes, folders, reminders and notification records. Data
                  models define the different types of workspace state.
                </p>
                <div className="productivity-tech-tags">
                  <span>MongoDB</span>
                  <span>Mongoose</span>
                  <span>Document models</span>
                </div>
              </div>
              <div className="productivity-technology-group">
                <h3>Scope and verification</h3>
                <p>
                  The repository contains the working application source and
                  setup dependencies. It does not include a committed automated
                  test suite, CI workflow or independently verifiable public
                  deployment; those claims are intentionally excluded.
                </p>
                <div className="productivity-tech-tags">
                  <span>Source inspection</span>
                  <span>Local application</span>
                  <span>Deployment work remaining</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="productivity-button productivity-tech-trigger"
              onClick={() => setShowStack(true)}
            >
              <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />
              Tech stack
            </button>
          </div>
        </section>
      </article>

      <footer ref={footerRef} className="productivity-footer">
        <Link className="productivity-footer-back" to="/">
          Back to portfolio
        </Link>
        <button
          type="button"
          className="productivity-footer-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </footer>
      {showTop && !footerVisible && (
        <button
          className="productivity-floating-top"
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={17} strokeWidth={1.7} aria-hidden="true" />
        </button>
      )}
      {showStack && <TechStackModal close={closeStack} />}
    </main>
  );
}
