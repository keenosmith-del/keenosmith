import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Layers3 } from "lucide-react";
import ProjectNavigation from "../shared/ProjectNavigation.jsx";
import ProjectModal from "../shared/ProjectModal.jsx";
import useProjectPage from "../shared/useProjectPage.js";
import githubSvg from "../../../../assets/svgs/header/github.svg";
import "./MicrosoftAssessFlow.css";

const repository = "https://github.com/keenosmith-del/ms-assessflow";
const revision = "1ba858faee6841a2bb61b2132844b44614524055";
const executiveSummary = "/documents/ms-assessflow-executive-summary.pdf";
const source = path => `${repository}/blob/${revision}/${path}`;

const technologyGroups = [
  { heading: "Frontend", skills: ["React", "JavaScript", "Vite", "React Router", "CSS", "Native Fetch"] },
  { heading: "Backend", skills: ["Python", "FastAPI", "Pydantic", "REST APIs", "HTTPX"] },
  { heading: "Persistence", skills: ["PostgreSQL", "SQLAlchemy", "Alembic", "Transactional state", "Idempotency", "Optimistic concurrency"] },
  { heading: "AI and Microsoft", note: "Implemented adapters and source contracts. Live tenant inference, service activation and native Copilot publication remain pending. Search uses keyword retrieval, without vectors or embeddings.", skills: ["Microsoft Foundry", "Azure OpenAI", "Azure AI Language", "Azure AI Search", "Structured Responses", "Policy citations", "Copilot Studio source contracts"] },
  { heading: "Identity and security", note: "Entra/MSAL and restricted Graph /me adapters are locally contract-tested; real tenant authentication and profile reads remain unverified.", skills: ["Microsoft Entra ID", "MSAL", "JWT / JWKS", "OAuth / PKCE", "RBAC", "Microsoft Graph /me", "HMAC callbacks", "Replay protection"] },
  { heading: "Cloud and delivery", note: "Bicep compiles and CI is verified. Azure resources, protected release environment, OIDC activation and actual staging execution remain external prerequisites.", skills: ["Azure Bicep", "Docker", "Docker Compose", "GitHub Actions", "OIDC release preparation", "Pytest", "Vitest", "Playwright", "Power Automate contracts"] },
];

const lifecycle = [
  { name: "Employee request", detail: "Capture the application, supported entitlement and business justification. Identity comes from the authenticated caller; an idempotency key binds retries to the same submission.", state: "Submitted" },
  { name: "Policy and eligibility checks", detail: "Use permitted policy versions, application entitlement rules and the requester’s department. Missing, expired or conflicting evidence remains visible.", state: "Under assessment" },
  { name: "Advisory assessment", detail: "Redact sensitive text, assess the permitted evidence and validate the result. A recommendation never changes a user’s permissions.", state: "Advisory output" },
  { name: "Clarification or approval queue", detail: "Missing information returns the same request to its owner. Otherwise, the request enters the human queue, including cases that need manual policy review.", state: "Awaiting information / Pending approval" },
  { name: "Human decision", detail: "The assigned approver, or an authorised administrator, records a reasoned approval or rejection. Self-approval and a second conflicting decision are rejected.", state: "Approved / Rejected" },
  { name: "Manual fulfilment", detail: "Approval creates a service task. An operator performs the real work and records a completion reference; the application does not write directory permissions.", state: "Provisioning pending → Fulfilled" },
  { name: "Recorded audit history", detail: "The request, assessment, cited policy versions, decisions, fulfilment evidence and transitions remain connected in a persisted history.", state: "Persisted history" },
];

const assessmentSteps = [
  ["Redact sensitive text", "Local regex in demo mode or the configured Language PII adapter in Azure mode. Provider failure stops analysis; it does not silently send unredacted text onward."],
  ["Retrieve permitted evidence", "Resolve policy chunks through department ACLs and canonical current versions. Search hits are rechecked against the database rather than trusted as authoritative."],
  ["Check entitlement and eligibility", "Validate the application’s supported access levels, business justification, evidence expiry and implemented departmental rules."],
  ["Run the selected assessment mode", "Local deterministic simulation is explicit. Configured Azure mode calls Foundry Responses and fails closed on provider errors instead of substituting demo success."],
  ["Validate the response structure", "Pydantic defines the advisory output contract. Malformed responses and refusals are handled as provider failures, not presented as successful assessments."],
  ["Verify exact policy citations", "Check version ID, chunk index and non-empty quoted text against the supplied evidence. A plausible citation to another version does not qualify."],
  ["Apply deterministic safety rules", "Missing justification, unavailable evidence, unsupported entitlement or instruction-like content can override the recommendation to manual review."],
  ["Preserve the result for review", "Persist the assessment, evidence, provider and invocation metadata with the request. Only a human decision can move an approval forward."],
];

const integrations = [
  { name: "Microsoft Foundry / Azure OpenAI", implementation: "The Microsoft project SDK supplies a structured Responses adapter. Redacted request text and permitted evidence enter a Pydantic advisory contract; the model receives no permission-granting tools.", boundary: "Adapter implemented. Live tenant inference unverified.", path: "backend/app/integrations/microsoft/providers.py" },
  { name: "Azure AI Language", implementation: "PII recognition returns typed categories and redacted text, with service logging disabled per request. Contract tests exercise errors and redaction; segmentation and missed entity types remain privacy limits.", boundary: "Locally tested boundary. Cloud activation pending.", path: "backend/app/integrations/microsoft/providers.py" },
  { name: "Azure AI Search", implementation: "Source-controlled index, chunk upload and keyword retrieval adapters use server-built department filters. Canonical version and ACL checks reject stale or inaccessible hits; a reindex command repairs drift.", boundary: "Keyword retrieval. No hybrid vectors or embeddings.", path: "backend/app/services/policies.py" },
  { name: "Microsoft Entra ID", implementation: "MSAL sign-in configuration and backend JWT verification check signature, issuer, audience, expiry, tenant and delegated scope. The object ID maps to an onboarded database user; token role labels do not grant application privileges.", boundary: "RSA/claim tests passed locally. Real tenant sign-in unverified.", path: "backend/app/security/auth.py" },
  { name: "Microsoft Graph", implementation: "A separately acquired delegated User.Read token permits only /me profile access. Returned identity must match the API caller. No group administration, broad directory access or permission-grant API is implemented.", boundary: "Restricted profile adapter. Live Graph read unverified.", path: "backend/app/integrations/microsoft/providers.py" },
  { name: "Copilot Studio", implementation: "Employee instructions, topic definitions, conversation scenarios and a restricted OAuth connector define four tools: create a request, read its status, supply missing information and search permitted policies.", boundary: "Source contracts. No published native agent or tenant solution.", path: "copilot/agent/instructions.md" },
  { name: "Power Automate", implementation: "Source-controlled workflow-start and callback contracts authenticate exact bytes, timestamp and responder identity. Event IDs protect against replay. A trustworthy tenant signing and responder-mapping boundary is still required.", boundary: "Contract-tested. No actual tenant flow execution.", path: "copilot/flows/approval-contract.json" },
  { name: "Bicep and Azure infrastructure", implementation: "Compilable infrastructure definitions describe the staging foundation. Release preparation targets existing resources and immutable images; compilation establishes syntax, not subscription deployability.", boundary: "Compilation verified. No provisioning or Azure deployment.", path: "infra/main.bicep" },
];

function EvidenceLink({ path, children }) {
  return <a className="assessflow-evidence-link" href={source(path)} target="_blank" rel="noopener noreferrer">{children}</a>;
}

function Section({ id, label, title, className, children }) {
  return (
    <section id={id} tabIndex={id === "about-project" || id === "tech-used" ? -1 : undefined} className={`assessflow-section ${className || ""}`} aria-labelledby={`${id}-heading`}>
      <div className="assessflow-section-label">{label}</div>
      <div className="assessflow-section-copy"><h2 id={`${id}-heading`}>{title}</h2>{children}</div>
    </section>
  );
}

export default function MicrosoftAssessFlow() {
  const pageRef = useProjectPage();
  const footerRef = useRef(null);
  const [showStack, setShowStack] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
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
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });

  return (
    <main ref={pageRef} className="project-case-study assessflow-project">
      <ProjectNavigation className="assessflow-back" />
      <article>
        <header className="assessflow-hero">
          <div className="assessflow-hero-inner">
            <div className="assessflow-hero-topline">
              <div className="assessflow-pill-list" aria-label="Engineering scope">{["Microsoft Foundry", "Copilot Studio", "React", "FastAPI", "PostgreSQL"].map(item => <span key={item}>{item}</span>)}</div>
              <time dateTime="2026-10">October 2026</time>
            </div>
            <h1>Microsoft<span>AssessFlow</span></h1>
            <div className="assessflow-hero-bottom">
              <div>
                <p className="assessflow-hero-description">I built an access-governance application connecting employee requests, versioned policy evidence, advisory assessments, human approvals and recorded manual fulfilment. React and FastAPI provide the operational workflow, while source-controlled Microsoft adapters define separate identity, retrieval, inference and approval boundaries.</p>
                <p className="assessflow-hero-note">Locally implemented and verified. Microsoft cloud activation and public deployment remain pending.</p>
              </div>
              <div className="assessflow-hero-controls">
                <div className="assessflow-hero-actions">
                  <a className="assessflow-button assessflow-button-dark" href={repository} target="_blank" rel="noopener noreferrer"><img className="assessflow-github-icon" src={githubSvg} alt="" aria-hidden="true" />Source</a>
                  <button className="assessflow-button assessflow-button-disabled" type="button" disabled>Visit platform</button>
                </div>
                <p className="assessflow-platform-note">Maintaining this many live deployments would be a project of its own. The source is available, or you can <a href="mailto:keenosmith@kailor.co.za">contact me</a> for a walkthrough.</p>
              </div>
            </div>
          </div>
        </header>

        <Section id="about-project" className="assessflow-about" label="Project summary" title="A persistent request, approval and fulfilment workflow.">
          <div className="assessflow-two-columns"><p>Access requests depend on business justification, supported entitlements, current policy, manager review and service-team execution. I implemented those responsibilities in one internal application, retaining the request ID through clarification and the evidence behind each assessment.</p><p>AI output remains advisory. Backend rules own permissions and state transitions; an authorised human approves or rejects, and an operator records manual fulfilment. The application has no directory-permission writer.</p></div>
          <div className="assessflow-summary-action"><a className="assessflow-button assessflow-button-soft" href={executiveSummary} target="_blank" rel="noopener noreferrer">Executive summary</a></div>
        </Section>

        <Section id="assessflow-architecture" className="assessflow-architecture" label="Application architecture" title="Operational APIs, persisted state and assessment boundaries.">
          <p className="assessflow-section-intro">The React console and employee connector call different API surfaces. FastAPI independently enforces authentication, ownership, roles, valid transitions and audit records.</p>
          <figure className="assessflow-trust-map">
            <div className="assessflow-entry-points"><div><h3>React application</h3><p>The locally implemented console covers requests, approvals, policies, agent diagnostics, audit, administration and operational views.</p></div><div><h3>Copilot employee tools</h3><p>A separate restricted OAuth connector exposes create, status, clarification and permitted policy search. Native tenant publication remains pending.</p></div></div>
            <div className="assessflow-api-boundary"><h3>FastAPI application authority</h3><p>Typed contracts validate input; database roles, owner/manager relationships and lifecycle checks govern operations. Neither client can grant additional privileges.</p></div>
            <div className="assessflow-internal-boundaries"><div><h3>PostgreSQL persistence</h3><p>SQLAlchemy and Alembic manage requests, users, immutable policy versions, assessments, decisions, fulfilment tasks, evidence and workflow history.</p></div><div><h3>Assessment boundary</h3><p>Redaction, permitted retrieval, model/demo analysis, exact citations and deterministic validation produce a persisted advisory result for human review.</p></div></div>
            <figcaption>The React console is not a published Copilot Studio agent. Microsoft adapters exist in source; live tenant operation remains unverified.</figcaption>
          </figure>
          <EvidenceLink path="docs/architecture/system.md">System boundaries and data flow</EvidenceLink>
        </Section>

        <Section id="assessflow-lifecycle" className="assessflow-lifecycle" label="Request lifecycle" title="Submission, assessment, assigned approval and manual fulfilment.">
          <ol className="assessflow-lifecycle-stages">{lifecycle.map(stage => <li key={stage.name}><span className="assessflow-state-label">{stage.state}</span><h3>{stage.name}</h3><p>{stage.detail}</p></li>)}</ol>
          <div className="assessflow-lifecycle-branches"><div><h3>Clarification and review</h3><p>Missing information preserves the request ID and returns it to its owner. Unsupported or conflicting evidence requires human review rather than an invented approval.</p></div><div><h3>Terminal states</h3><p>Rejected, cancelled and fulfilled requests are terminal. An approved request creates a service task; an operator must record the actual completion reference.</p></div></div>
          <EvidenceLink path="docs/architecture/data-and-workflows.md">Request states and transition sequence</EvidenceLink>
        </Section>

        <Section id="assessflow-assessment" className="assessflow-assessment" label="Policy and AI assessment" title="Permitted evidence, schema validation and deterministic overrides.">
          <p className="assessflow-section-intro">UTF-8 policy documents have immutable versions, SHA-256 digests, expiry and overlapping chunks. Department ACLs govern retrieval; canonical version checks reject stale index hits. Evidence retains the version, chunk and exact quote.</p>
          <ol className="assessflow-assessment-steps">{assessmentSteps.map(([title, detail]) => <li key={title}><h3>{title}</h3><p>{detail}</p></li>)}</ol>
          <p className="assessflow-section-intro">Exact citations establish provenance, not semantic truth. The instruction-like phrase check is not comprehensive injection resistance. Local deterministic simulation and configured Microsoft inference are separate operating modes; Azure mode fails explicitly rather than silently returning demo success.</p>
          <EvidenceLink path="backend/app/agents/assessment.py">Assessment pipeline and overrides</EvidenceLink>
        </Section>

        <Section id="assessflow-microsoft" className="assessflow-microsoft" label="Integration boundaries" title="Microsoft adapter code and tenant-execution limits.">
          <p className="assessflow-section-intro">Local contract tests establish adapter behavior. They do not establish live connectivity, a published employee agent or a deployed Azure application.</p>
          <dl className="assessflow-integration-list">{integrations.map(integration => <div key={integration.name}><dt>{integration.name}</dt><dd><p>{integration.implementation}</p><span className="assessflow-integration-status">{integration.boundary}</span><EvidenceLink path={integration.path}>Inspect implementation</EvidenceLink></dd></div>)}</dl>
          <EvidenceLink path="docs/decisions/003-microsoft-contracts.md">Microsoft API decisions and verified scope</EvidenceLink>
        </Section>

        <Section id="assessflow-authority" className="assessflow-authority" label="Security and authorization" title="Backend permissions and human decision authority.">
          <div className="assessflow-permission-columns"><div><h3>Advisory capability</h3><p>The assessment can interpret a justification, explain permitted policy, cite evidence, identify missing information and recommend review.</p></div><div><h3>Restricted authority</h3><p>It cannot approve requests, grant access, alter roles, override application policy or mark fulfilment complete.</p></div></div>
          <div className="assessflow-control-notes"><div><h3>Identity and assigned roles</h3><p>Backend JWT authentication, ownership, departmental evidence access and RBAC apply independently of the interface. Assigned approver checks reject self-approval; database constraints prevent duplicate decisions and fulfilment tasks.</p></div><div><h3>Transactional state</h3><p>Payload fingerprints, idempotent submissions, revision checks and PostgreSQL locks protect updates. Invalid transitions fail and successful units of work commit request, decision and audit records together.</p></div><div><h3>Callbacks and fulfilment</h3><p>Signed callbacks check exact bytes, timestamps, replay IDs, expiry and approver identity. A service operator records manual completion; API audit history is append-only, not WORM storage.</p></div><div><h3>External trust and throughput</h3><p>Callbacks still depend on a trusted tenant signer authenticating the responder. Policy/model calls currently run inside database transactions; an outbox/worker is needed before larger-scale traffic. Neither boundary is claimed as production-verified.</p></div></div>
          <EvidenceLink path="backend/app/services/workflow.py">Role checks, unique decisions and transitions</EvidenceLink>
        </Section>

        <Section id="assessflow-application" className="assessflow-application" label="Full-stack implementation" title="Nine connected application areas backed by persisted records.">
          <div className="assessflow-two-columns"><p>React, Vite, React Router and native Fetch connect the operational console to typed FastAPI/Pydantic REST contracts. SQLAlchemy, Alembic and PostgreSQL implement durable workflows and versioned policy evidence.</p><p>Dashboard counts derive from scoped stored records. The Agent workspace shows structured provider responses, errors and invocation IDs, not a simulated Copilot conversation. Loading, empty and error states reflect actual results.</p></div>
          <ul className="assessflow-application-areas" aria-label="Nine connected application areas">{["Dashboard", "Requests", "Request details", "Approvals", "Policies", "Agent workspace", "Audit", "Integrations and settings", "Sign-in"].map(area => <li key={area}>{area}</li>)}</ul>
        </Section>

        <Section id="assessflow-verification" className="assessflow-verification" label="CI/CD and verification" title="Iteration 008 application and release-safety checks.">
          <p className="assessflow-section-intro">These are outcomes recorded in the reviewed application repository, not application tests newly executed by this portfolio page.</p>
          <dl className="assessflow-results"><div><dt>PostgreSQL-enabled backend suite</dt><dd>65<span>passed</span></dd></div><div><dt>Release-safety tests</dt><dd>33<span>passed</span></dd></div><div><dt>Frontend tests</dt><dd>6<span>passed</span></dd></div><div><dt>Playwright workflows</dt><dd>3<span>passed</span></dd></div><div><dt>Offline assessment scenarios</dt><dd>13/13<span>no live model execution</span></dd></div></dl>
          <div className="assessflow-two-columns"><p>PostgreSQL concurrency checks exercised duplicate submissions and decisions. Migration upgrade, seed, downgrade and upgrade paths were tested. Browser workflows covered persisted request → approval → fulfilment, navigation and mobile behavior.</p><p>Security, API/connector contracts, dependencies, container builds and Bicep compilation were checked. All four hosted CI jobs passed for the documented release-engineering commit. The offline scenarios are not an AI model-accuracy benchmark.</p></div>
          <div className="assessflow-evidence-links"><EvidenceLink path="docs/testing/results.md">Recorded test outcomes</EvidenceLink><a className="assessflow-evidence-link" href="https://github.com/keenosmith-del/ms-assessflow/actions/runs/40310628897" target="_blank" rel="noopener noreferrer">Successful release-engineering CI</a></div>
        </Section>

        <Section id="assessflow-delivery" className="assessflow-delivery" label="Release engineering" title="Verified CI and prepared Azure staging promotion.">
          <ol className="assessflow-release-progression"><li><span>Verified in hosted CI</span><h3>Push / PR verification</h3><p>PostgreSQL, backend and frontend tests, Playwright, security checks, container builds and Bicep compilation.</p></li><li><span>Prepared gate</span><h3>Exact successful source</h3><p>Manual dispatch requires the selected source SHA’s successful main-branch CI, rather than an unrelated green run.</p></li><li><span>External prerequisite</span><h3>Independent approval</h3><p>Protected GitHub Environment configuration and actual independent review are required before Azure OIDC identity is available.</p></li><li><span>Prepared, not executed</span><h3>Digest-based promotion</h3><p>Validate existing resources, capture recovery digests, promote immutable images, perform staging smoke and retain a reviewed rollback path.</p></li></ol>
          <div className="assessflow-release-limits"><h3>The staging workflow has not been executed.</h3><p>Azure resources, tenant identity and the protected environment remain external prerequisites. No OIDC login, image publication, resource promotion, live staging smoke or rollback was performed. Updates are sequential; reviewed recovery is required after partial failure and container rollback does not reverse database changes.</p></div>
          <EvidenceLink path="docs/deployment/staging-workflow.md">Release prerequisites and rollback boundaries</EvidenceLink>
        </Section>

        <Section id="tech-used" className="assessflow-technology" label="Technology" title="Typed services, policy evidence and Microsoft integration contracts.">
          <div className="assessflow-technology-groups">{technologyGroups.map(group => <div key={group.heading}><h3>{group.heading}</h3>{group.note && <p>{group.note}</p>}<div className="assessflow-tech-tags">{group.skills.map(skill => <span key={skill}>{skill}</span>)}</div></div>)}</div>
          <button className="assessflow-button assessflow-button-dark assessflow-tech-trigger" type="button" onClick={() => setShowStack(true)}><Layers3 size={15} strokeWidth={1.7} aria-hidden="true" />Tech stack</button>
          <div><EvidenceLink path="docs/HANDOVER.md">Implementation scope and remaining activation work</EvidenceLink></div>
        </Section>

        <section className="assessflow-closing"><div><p className="assessflow-eyebrow">Architecture and delivery</p><h2>Access governance, policy evidence and reviewed fulfilment.</h2><p>AssessFlow connects employee intake, advisory assessment, assigned approval and manual fulfilment through a persisted application workflow. Backend authorization and deterministic checks retain decision authority. The local application and hosted CI are verified in repository records; Microsoft tenant activation, native Copilot publication and Azure staging remain unexecuted.</p></div></section>
      </article>
      <footer ref={footerRef} className="assessflow-footer"><Link className="assessflow-footer-back" to="/">Back to portfolio</Link><button className="assessflow-footer-top" type="button" aria-label="Back to top" onClick={scrollToTop}><ArrowUp size={16} strokeWidth={1.7} aria-hidden="true" /></button></footer>
      {showTop && !footerVisible && <button className="assessflow-floating-top" type="button" aria-label="Back to top" onClick={scrollToTop}><ArrowUp size={17} strokeWidth={1.7} aria-hidden="true" /></button>}
      {showStack && <ProjectModal groups={technologyGroups} onClose={closeStack} />}
    </main>
  );
}
