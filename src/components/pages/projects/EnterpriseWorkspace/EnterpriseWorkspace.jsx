import ProjectNavigation from "../shared/ProjectNavigation.jsx";
import useProjectPage from "../shared/useProjectPage.js";
import ProjectModal from "../shared/ProjectModal.jsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Layers3 } from "lucide-react";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./EnterpriseWorkspace.css";

const repository = "https://github.com/keenosmith-del/enterprise-workspace";
const brief = "/documents/enterprise-workspace-technical-brief.pdf";
const heroTechnologies = ["PostgreSQL", "Prisma", "React", "Express", "SQL", "Vite"];

const technologyGroups = [
  { heading: "Frontend", skills: ["React", "JavaScript", "Vite", "CSS", "Lucide React", "Axios"] },
  { heading: "Workspace interface", skills: ["react-rnd", "dnd-kit", "Local Storage", "Session Storage", "Reusable table components"] },
  { heading: "Backend", skills: ["Node.js", "Express", "REST APIs", "JavaScript", "Schema validation helpers"] },
  { heading: "Database", skills: ["PostgreSQL", "Prisma ORM", "Prisma migrations", "Relational modelling", "Foreign keys", "SQL DDL", "information_schema"] },
  { heading: "Development status", note: "The repository contains a local demonstration. No automated test suite or secure multi-user authentication is documented.", skills: ["Local prototype", "Source inspected"] },
];

function TechStackModal({ onClose }) {
  return <ProjectModal onClose={onClose} groups={technologyGroups} />;
}

function Section({ label, children, className = "" }) {
  return (
    <section className={`ew-section ${className}`}>
      <div className="ew-section-label">{label}</div>
      <div className="ew-section-content">{children}</div>
    </section>
  );
}

const schemaEntities = [
  {
    name: "Category",
    detail: "Groups products by a defined category.",
    fields: ["id · primary key", "name · unique", "products · relation"],
  },
  {
    name: "Product",
    detail: "References a category and a supplier.",
    fields: ["id · primary key", "sku · unique", "price · decimal", "categoryId · foreign key", "supplierId · foreign key"],
  },
  {
    name: "Supplier",
    detail: "Stores supplier contact data for products.",
    fields: ["id · primary key", "email · unique", "products · relation"],
  },
];

const workflowItems = [
  {
    title: "Define the table",
    description: "Choose column names, types, nullability, uniqueness and key relationships. The API validates column definitions before building DDL.",
  },
  {
    title: "Apply the schema",
    description: "The backend executes PostgreSQL schema changes and stores WorkspaceTable and WorkspaceColumn metadata to describe editable tables.",
  },
  {
    title: "Work with records",
    description: "Workspace views fetch physical records through REST endpoints. The same interface supports adding, editing and deleting records.",
  },
];

export default function EnterpriseWorkspace() {
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
    <main ref={pageRef} className="project-case-study ew-project">
      <ProjectNavigation className="ew-back" />

      <article>
        <header className="ew-hero">
          <div className="ew-hero-inner">
            <div className="ew-hero-topline">
              <div className="ew-pills" aria-label="Core technologies">
                {heroTechnologies.map((tech) => <span key={tech}>{tech}</span>)}
              </div>
              <time dateTime="2026-06">June 2026</time>
            </div>
            <h1>Enterprise<br />Workspace</h1>
            <div className="ew-hero-bottom">
              <div>
                <p className="ew-hero-description">
                  I built a relational data workspace to work with PostgreSQL tables without switching between a database console and a separate application. React provides the table and schema interfaces, while Express and Prisma handle records, relationships and database changes.
                </p>
                <p className="ew-hero-note">A local SQL workspace and database engineering project.</p>
              </div>
              <div className="ew-hero-side">
                <div className="ew-hero-actions">
                  <a href={repository} target="_blank" rel="noopener noreferrer" className="ew-button ew-source">
                    <img src={githubSvg} alt="" aria-hidden="true" />Source
                  </a>
                  <button className="ew-button ew-disabled" type="button" disabled>Visit platform</button>
                </div>
                <p className="ew-platform-note">
                  Keeping every portfolio project hosted would be quite a project itself. The source is available, or <a href="mailto:keenosmith@kailor.co.za">contact me</a> for a walkthrough.
                </p>
              </div>
            </div>
          </div>
        </header>

        <Section label="Project summary">
          <h2>One workspace for tables, records and SQL.</h2>
          <div className="ew-columns ew-summary-copy">
            <p>
              The application started with products, categories and suppliers. I used those relationships to build out a configurable workspace where users can create tables, choose columns and update data through a reusable interface.
            </p>
            <p>
              The application also exposes the live database schema, a relationship view, a SQL editor and a visual query builder. The schema views read PostgreSQL metadata rather than depending only on hard-coded frontend table definitions.
            </p>
          </div>
          <div className="ew-brief-wrap">
            <a className="ew-button ew-brief" href={brief} target="_blank" rel="noopener noreferrer">Technical brief</a>
          </div>
        </Section>

        <Section label="Application architecture">
          <h2>Keeping the editor separate from the database operations.</h2>
          <p className="ew-lead">
            The browser manages the workspace layout and editing state. Express provides endpoints for application tables, custom records, schema changes and SQL execution. PostgreSQL remains the source of the data and its relational constraints.
          </p>
          <div className="ew-architecture">
            <div>
              <span className="ew-small-label">Client</span>
              <h3>React and Vite</h3>
              <p>Workspace tables, dashboard, query editor, query builder, relationship diagrams and draggable layouts.</p>
            </div>
            <div>
              <span className="ew-small-label">Application API</span>
              <h3>Express and Prisma</h3>
              <p>CRUD controllers, schema inspection, column validation and dynamic SQL generation.</p>
            </div>
            <div>
              <span className="ew-small-label">Persistence</span>
              <h3>PostgreSQL</h3>
              <p>Physical tables, foreign keys, uniqueness, schema migrations and query results.</p>
            </div>
          </div>
        </Section>

        <Section label="Relational design">
          <h2>The core data model uses real database relationships.</h2>
          <p className="ew-lead">
            Products reference a category and a supplier. PostgreSQL enforces both references, and the Prisma schema specifies restricted deletion so referenced records are not silently removed.
          </p>
          <div className="ew-schema" aria-label="Product category and supplier schema summary">
            {schemaEntities.map((entity) => (
              <div className="ew-entity" key={entity.name}>
                <h3>{entity.name}</h3>
                <p>{entity.detail}</p>
                <ul>
                  {entity.fields.map((field) => <li key={field}>{field}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="ew-afterword">Custom workspace tables have separate metadata models for column types, defaults, key flags, positions and foreign-key references.</p>
        </Section>

        <Section label="Schema editing">
          <h2>Custom tables are created in PostgreSQL, not just drawn in React.</h2>
          <p className="ew-lead">
            The server builds SQL for table creation, column changes and foreign-key definitions. It validates supported data types and checks referenced tables and columns. Table and column metadata are then maintained alongside the physical schema.
          </p>
          <div className="ew-workflow">
            {workflowItems.map((item) => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section label="SQL and inspection">
          <h2>Query the data directly or assemble a SELECT statement.</h2>
          <div className="ew-columns ew-query-copy">
            <div>
              <h3>SQL console</h3>
              <p>Users can submit a SQL string and inspect returned columns, rows and row counts. The backend normalises dates, large integers and decimal values for JSON responses. Query history is saved in the browser.</p>
            </div>
            <div>
              <h3>Visual query builder</h3>
              <p>The interface selects tables and columns and assembles SELECT statements with a filter, sorting and an optional limit. The generated SQL can be copied into the query console.</p>
            </div>
          </div>
          <div className="ew-sql-example" aria-label="SQL query example">
            <div className="ew-sql-caption">Example relational query</div>
            <pre>{`SELECT p.name, p.sku, c.name AS category,
       s.name AS supplier
FROM "Product" p
JOIN "Category" c ON c.id = p."categoryId"
JOIN "Supplier" s ON s.id = p."supplierId";`}</pre>
          </div>
        </Section>

        <Section label="Engineering considerations">
          <h2>A useful local tool, with clear production boundaries.</h2>
          <div className="ew-decisions">
            <div>
              <h3>Access and query safety</h3>
              <p>The login screen uses fixed demonstration credentials and sessionStorage; it is not server-side authentication. The query endpoint calls Prisma's raw-unsafe query method on submitted SQL without a read-only restriction. It must not be exposed publicly as-is.</p>
            </div>
            <div>
              <h3>Schema and metadata consistency</h3>
              <p>Custom table definitions are represented in Prisma metadata while the records live in PostgreSQL tables created with DDL. Schema reads inspect information_schema; production work would need deeper tests for migration failure and metadata/physical-schema recovery.</p>
            </div>
            <div>
              <h3>Persistence scope</h3>
              <p>Records, physical table definitions and foreign-key constraints live in PostgreSQL. Workspace layout, query-builder state and query history use browser storage rather than an account-backed settings service.</p>
            </div>
            <div>
              <h3>Verification status</h3>
              <p>The repository includes Prisma migrations, schema and application code. I did not find a committed automated test suite or CI validation record, so this page describes inspected implementations rather than claiming verified production readiness.</p>
            </div>
          </div>
        </Section>

        <Section label="Technology" className="ew-tech-section">
          <h2>Technology used in the implementation.</h2>
          <div className="ew-tech-grid">
            {technologyGroups.slice(0, 4).map((group) => (
              <div className="ew-tech-group" key={group.heading}>
                <h3>{group.heading}</h3>
                <p>{group.heading === "Frontend" ? "React handles the multi-page workspace, schema views and record-editing forms." : group.heading === "Workspace interface" ? "Local browser state and layout libraries support the workspace arrangement and query tools." : group.heading === "Backend" ? "Express routes distinguish application records, dynamic tables and SQL requests." : "Prisma models relational entities and workspace metadata; PostgreSQL enforces keys and stores the physical data."}</p>
                <div className="ew-tech-tags">
                  {group.skills.slice(0, 5).map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </div>
            ))}
          </div>
          <button type="button" className="ew-button ew-tech-trigger" onClick={() => setShowStack(true)}>
            <Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />Tech stack
          </button>
        </Section>

        <section className="ew-closing">
          <div>
            <p className="ew-eyebrow">Architecture and implementation</p>
            <h2>Relational data modelling and an editable SQL workspace.</h2>
            <p>
              This project combines a React data workspace with an Express API and PostgreSQL database. It includes relational product records, configurable tables and columns, foreign-key relationships, schema inspection and SQL tooling. The implementation is suitable as a local engineering demonstration; authentication, unrestricted SQL execution and operational testing require further work before deployment to untrusted users.
            </p>
          </div>
        </section>
      </article>

      <footer ref={footerRef} className="ew-footer">
        <Link to="/" className="ew-footer-back">Back to portfolio</Link>
        <button className="ew-footer-top" onClick={scrollToTop} type="button" aria-label="Back to top">
          <ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" />
        </button>
      </footer>
      {showTop && !footerVisible && (
        <button className="ew-floating-top" type="button" onClick={scrollToTop} aria-label="Back to top">
          <ArrowUp size={17} strokeWidth={1.7} aria-hidden="true" />
        </button>
      )}
      {showStack && <TechStackModal onClose={closeStack} />}
    </main>
  );
}
