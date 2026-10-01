import {
    ArrowLeft,
    ArrowRight,
    ArrowUp,
} from 'lucide-react';

import { useEffect, useState } from 'react';

import './Microsoft.css';

function MediaFeature({ type, title, description, variant = '' }) {
    const isVideo = type === 'video';

    return (
        <section className={`microsoft-media-feature ${variant}`}>
            <div className={`microsoft-media-frame ${isVideo ? 'microsoft-media-video' : 'microsoft-media-image'}`} role="img" aria-label={`${isVideo ? 'Video' : 'Screenshot'} placeholder: ${title}`}>
                {isVideo && <span className="microsoft-media-play" aria-hidden="true">▶</span>}
                <span className="microsoft-media-placeholder-label">
                    {isVideo ? 'Video placeholder' : 'Screenshot placeholder'}
                </span>
            </div>
            <div className="microsoft-media-copy">
                <span>{isVideo ? 'Video' : 'Interface screenshot'}</span>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </section>
    );
}

function Microsoft() {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowBackToTop(window.scrollY > 400);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <main className="microsoft-page">
            <a className="microsoft-back" href="/">
                <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />
                <span>Back to Portfolio</span>
            </a>

            <section className="microsoft-hero">
                <div className="microsoft-hero-inner">
                    <div className="microsoft-eyebrow">
                        <span>Microsoft Azure</span>
                        <span>Microsoft Foundry</span>
                        <span>Cloud DevOps</span>
                    </div>
                    <h1>
                        Microsoft Foundry
                        <br />
                        Azure AI Cloud
                        <br />
                        DevOps Platform
                    </h1>
                    <div className="microsoft-hero-bottom">
                        <p>
                            A locally developed, full-stack AI-powered software engineering and DevOps platform. It integrates Microsoft Foundry for AI analysis and Azure services for identity and cloud resource context.
                        </p>
                        <div className="microsoft-hero-stack">
                            <span>React + TypeScript</span>
                            <span>Node.js + Express</span>
                            <span>Python + FastAPI</span>
                            <span>Microsoft Foundry</span>
                            <span>GitHub REST API</span>
                            <span>MongoDB</span>
                            <span>Docker Compose</span>
                        </div>
                    </div>
                    <div className="microsoft-hero-actions">
                        <a className="microsoft-hero-button" href="#project-summary">
                            Project summary
                        </a>
                        <a className="microsoft-hero-button" href="#">
                            Executive summary
                        </a>
                    </div>
                </div>
            </section>

            <section className="microsoft-statement" id="project-summary">
                <div className="microsoft-statement-label">
                    <span></span>
                    <span>Project summary</span>
                </div>
                <div className="microsoft-statement-content">
                    <h2>
                        AI-assisted software
                        <br />
                        engineering and DevOps.
                    </h2>
                    <p>
                        The application connects a React console, an Express API, MongoDB incident records, and a separate Python agent runtime. Three specialist agents analyse a submitted problem, gather GitHub and Azure resource context when configured, and return a structured recommendation. The current implementation is read-only against external engineering systems: it does not commit code, create pull requests, run pipelines, or deploy changes.
                    </p>
                </div>
            </section>

            <MediaFeature
                type="image"
                variant="microsoft-media-feature-one"
                title="Incident investigation console"
                description="Screenshot placeholder for the project overview and incident investigation interface. The page presents saved incidents, severity and status, agent output, repository information, and platform connection status."
            />

            <section className="microsoft-project microsoft-project-one">
                <div className="microsoft-project-heading">
                    <div className="microsoft-project-kicker">
                        <span>Active implementation</span>
                    </div>
                    <h2>
                        Three sequential
                        <br />
                        agent stages.
                    </h2>
                    <p>
                        The FastAPI runtime invokes each specialist in order. Software engineering analysis frames the problem; incident investigation examines repository and cloud-resource evidence; engineering action turns the findings into one bounded recommendation with validation guidance.
                    </p>
                    <div className="microsoft-project-actions">
                        <a
                            href="https://github.com/keenosmith-del/microsoft-ai-powered-software-engineering-devops"
                            target="_blank"
                            rel="noreferrer"
                            className="microsoft-project-button microsoft-project-button-primary"
                        >
                            Source repository
                        </a>
                        <a href="#architecture" className="microsoft-project-button microsoft-project-button-secondary">
                            Runtime topology
                        </a>
                    </div>
                </div>

                <div className="microsoft-project-one-visual">
                    <div className="microsoft-video-shell microsoft-video-dark">
                        <div className="microsoft-video-top">
                            <span>API response</span>
                            <span>JSON</span>
                        </div>
                        <pre>{`{
  "success": true,
  "analysis": "...",
  "investigation": "...",
  "actions": "...",
  "incidentId": "<MongoDB ObjectId>"
}`}</pre>
                    </div>
                </div>

                <div className="microsoft-project-one-details">
                    <div className="microsoft-detail">
                        <span>Software Engineering Agent</span>
                        <p>Produces a structured technical analysis covering the problem, likely cause, implementation approach, risks, and validation. It is prompted not to invent system behaviour or infrastructure evidence.</p>
                        <div className="microsoft-pills"><span>Microsoft Foundry</span><span>OpenAI SDK</span><span>Prompt design</span></div>
                    </div>
                    <div className="microsoft-detail">
                        <span>Incident Investigation Agent</span>
                        <p>Builds repository context from metadata, branches, recent commits, and diffs. It separates confirmed facts and repository evidence from hypotheses, missing evidence, and confidence.</p>
                        <div className="microsoft-pills"><span>GitHub REST API</span><span>Commit diffs</span><span>Evidence analysis</span></div>
                    </div>
                    <div className="microsoft-detail">
                        <span>Engineering Action Agent</span>
                        <p>Uses the investigation to propose one concrete engineering action, identify files to inspect, describe validation, and state what remains unknown before higher-risk work.</p>
                        <div className="microsoft-pills"><span>Action proposal</span><span>Validation planning</span><span>Human review</span></div>
                    </div>
                </div>
            </section>

            <MediaFeature
                type="video"
                variant="microsoft-media-feature-two"
                title="Incident analysis walkthrough"
                description="Video placeholder for a walkthrough of incident submission, sequential agent execution, returned analysis, and the saved incident record."
            />

            <section className="microsoft-architecture" id="architecture">
                <div className="microsoft-architecture-inner">
                    <div className="microsoft-architecture-copy">
                        <span>Runtime topology</span>
                        <h2>
                            Application
                            <br />
                            components.
                        </h2>
                        <p>
                            The browser calls the Express API over REST/JSON. The API persists incident state and delegates analysis to FastAPI. The agent runtime uses the Foundry project endpoint and read-only GitHub and Azure resource tools.
                        </p>
                    </div>
                    <div className="microsoft-architecture-flow">
                        <pre>{`React + TypeScript + Vite
        │ REST / JSON
        ▼
┌─────────────────────────────┐
│ Express API · Node.js        │──────► MongoDB
└──────────────┬──────────────┘
               │ POST /analyse
               ▼
┌─────────────────────────────┐
│ FastAPI · Python runtime    │
└──────┬──────────────┬───────┘
       │              │
       ▼              ▼
 Microsoft Foundry   Evidence tools
                    ├─ GitHub REST API (read-only)
                    └─ Azure Resource Manager (read-only)
       │
       ▼
Analysis → Investigation → Action recommendation`}</pre>
                    </div>
                </div>
            </section>

            <MediaFeature
                type="image"
                variant="microsoft-media-feature-three"
                title="Agent execution and investigation results"
                description="Screenshot placeholder for the three agent stages and their structured outputs, including repository evidence, hypotheses, confidence, and the recommended action."
            />

            <MediaFeature
                type="video"
                variant="microsoft-media-feature-four"
                title="Repository and Azure evidence review"
                description="Video placeholder for the read-only evidence collection path: GitHub repository and commit inspection, Azure identity authentication, and Azure Resource Manager inventory."
            />

            <section className="microsoft-decision">
                <div className="microsoft-decision-copy">
                    <span>API contract</span>
                    <h2>
                        Incident request
                        <br />
                        and agent stages.
                    </h2>
                    <p>
                        The UI sends the problem description and severity to the Express API. The API creates an incident, calls the agent runtime, then stores analysis, investigation, action, and any runtime error against that record.
                    </p>
                </div>
                <div className="microsoft-decision-code">
                    <div className="microsoft-code-header">
                        <span>POST /api/analyse</span>
                        <span>request · JSON</span>
                    </div>
                    <pre>{`{
  "problem": "Deployment fails during startup",
  "severity": "High"
}

SoftwareEngineeringAgent.analyse(problem)
IncidentInvestigationAgent.investigate(problem)
EngineeringActionAgent.recommend(problem, investigation)`}</pre>
                </div>
            </section>

            <MediaFeature
                type="image"
                variant="microsoft-media-feature-five"
                title="Incident and action status"
                description="Screenshot placeholder for persisted incident details, severity, investigation status, and the linked engineering action review state. Resolution is guarded by the application’s status-transition rules."
            />

            <section className="microsoft-stack">
                <div className="microsoft-stack-heading">
                    <span>Technology stack</span>
                    <h2>
                        Frameworks, services
                        <br />
                        and engineering tools.
                    </h2>
                </div>
                <div className="microsoft-stack-groups">
                    <div className="microsoft-stack-group">
                        <span>Frontend</span>
                        <div><span>React 19</span><span>TypeScript</span><span>Vite</span><span>Lucide React</span><span>REST / JSON</span></div>
                    </div>
                    <div className="microsoft-stack-group">
                        <span>API and data</span>
                        <div><span>Node.js 22</span><span>Express 5</span><span>Mongoose</span><span>MongoDB</span></div>
                    </div>
                    <div className="microsoft-stack-group">
                        <span>Agent runtime</span>
                        <div><span>Python 3.12</span><span>FastAPI</span><span>Pydantic</span><span>Uvicorn</span><span>OpenAI SDK</span></div>
                    </div>
                    <div className="microsoft-stack-group">
                        <span>Azure and source control</span>
                        <div><span>Microsoft Foundry</span><span>Azure Identity</span><span>DefaultAzureCredential</span><span>Azure Resource Manager</span><span>GitHub REST API</span></div>
                    </div>
                    <div className="microsoft-stack-group">
                        <span>Development and runtime</span>
                        <div><span>Git</span><span>GitHub</span><span>Docker</span><span>Docker Compose</span><span>Health checks</span><span>Environment configuration</span></div>
                    </div>
                </div>
            </section>

            <section className="microsoft-security">
                <div className="microsoft-security-heading">
                    <span>Implementation status</span>
                    <h2>
                        Implemented
                        <br />
                        and planned scope.
                    </h2>
                </div>
                <div className="microsoft-security-content">
                    <p>
                        Implemented: incident analysis and persistence, GitHub repository and commit inspection, Azure resource inventory, Foundry-backed recommendations, guarded application workflow states, and local Docker orchestration. Azure AI Search/RAG, Azure Monitor or Application Insights telemetry, CI/CD execution, automated code changes, pull requests, and deployment actions are not implemented in the active runtime.
                    </p>
                    <div className="microsoft-security-services">
                        <span>Active: read-only evidence tools</span>
                        <span>Active: recommendation workflow</span>
                        <span>Planned: Azure AI Search / RAG</span>
                        <span>Planned: telemetry analysis</span>
                        <span>Planned: CI/CD integration</span>
                    </div>
                </div>
            </section>

            <section className="microsoft-closing">
                <div className="microsoft-closing-inner">
                    <span>Microsoft Azure · Microsoft Foundry · GitHub</span>
                    <h2>
                        Microsoft Foundry
                        <br />
                        Azure AI Cloud DevOps Platform
                    </h2>
                    <p>
                        Full-stack application development, agent orchestration, cloud identity, repository intelligence, incident workflow modeling, API integration, and containerized service operations.
                    </p>
                    <div className="microsoft-closing-actions">
                        <a href="https://github.com/keenosmith-del/microsoft-ai-powered-software-engineering-devops" target="_blank" rel="noreferrer" className="microsoft-closing-button">
                            Source repository
                        </a>
                        <button type="button" className="microsoft-closing-top" onClick={scrollToTop} aria-label="Back to top">
                            <ArrowUp size={16} strokeWidth={1.7} />
                        </button>
                    </div>
                </div>
            </section>

            {showBackToTop && (
                <button className="microsoft-top" type="button" onClick={scrollToTop} aria-label="Back to top">
                    <ArrowUp size={17} strokeWidth={1.7} />
                </button>
            )}
        </main>
    );
}

export default Microsoft;
