import {
    ArrowLeft,
    ArrowUp,
    ArrowRight,
} from 'lucide-react';

import { useEffect, useState } from 'react';

import './Microsoft.css';

function Microsoft() {

    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <main className="microsoft-page">

            {/* Back */}

            <a
                className="microsoft-back"
                href="/"
            >
                <ArrowLeft
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden="true"
                />

                <span>Back to Portfolio</span>
            </a>



            {/* Hero */}

            <section className="microsoft-hero">

                <div className="microsoft-hero-inner">

                    <div className="microsoft-eyebrow">
                        <span>Microsoft Azure</span>
                        <span>Microsoft Foundry</span>
                        <span>Multi-Agent Systems</span>
                    </div>

                    <h1>
                        Cloud systems
                        <br />
                        with
                        <br />
                        agentic AI.
                    </h1>

                    <div className="microsoft-hero-bottom">

                        <p>
                            A collection of multi-agent AI systems designed and
                            implemented with Microsoft Foundry and Azure-native
                            services. Each project combines agent orchestration,
                            cloud infrastructure, APIs, data services, security,
                            observability, and production-oriented deployment
                            architecture.
                        </p>

                        <div className="microsoft-hero-stack">

                            <span>Azure</span>
                            <span>Foundry Agent Service</span>
                            <span>Agent Framework</span>
                            <span>RAG</span>
                            <span>MCP</span>
                            <span>OpenAPI</span>

                        </div>

                    </div>

                    <a
                        className="microsoft-hero-button"
                        href="#projects"
                    >
                        Technical Executive Summary
                        <ArrowRight
                            size={16}
                            strokeWidth={1.7}
                            aria-hidden="true"
                        />
                    </a>

                </div>

            </section>



            {/* Architecture statement */}

            <section className="microsoft-statement">

                <div className="microsoft-statement-label">
                    <span></span>
                    <span>Engineering scope</span>
                </div>

                <div className="microsoft-statement-content">

                    <h2>
                        Local application,
                        <br />
                        source control,
                        <br />
                        cloud implementation,
                        <br />
                        documented architecture.
                    </h2>

                    <p>
                        The projects are developed locally and maintained through
                        Git-based repositories before being implemented against
                        Microsoft Azure services. The architecture is designed
                        around explicit service boundaries, asynchronous
                        processing, agent tools, identity, observability,
                        security controls, and deployment workflows.
                    </p>

                </div>

            </section>



            {/* Project One */}

            <section className="microsoft-project microsoft-project-one">

                <div className="microsoft-project-heading">

                    <div className="microsoft-project-kicker">
                        <span>Software engineering &amp; DevOps</span>
                    </div>

                    <h2>
                        AI-powered software
                        <br />
                        engineering &amp;
                        <br />
                        DevOps operations platform
                    </h2>

                    <p>
                        A multi-agent engineering platform combining software
                        analysis, DevOps workflows, incident diagnosis, root-cause
                        analysis, deployment automation, and controlled remediation.
                        The system uses specialised agents coordinated through
                        Microsoft Foundry Agent Service and Microsoft Agent Framework.
                    </p>

                    <div className="microsoft-project-actions">

                        <a
                            href="YOUR_GITHUB_REPO_URL"
                            target="_blank"
                            rel="noreferrer"
                            className="microsoft-project-button microsoft-project-button-primary"
                        >
                            GitHub Repo
                        </a>

                        <a
                            href="#technical-executive-summary"
                            className="microsoft-project-button microsoft-project-button-secondary"
                        >
                            Exec Summary
                        </a>

                    </div>

                </div>

                <div className="microsoft-project-one-visual">

                    <div className="microsoft-video-shell microsoft-video-dark">

                        <div className="microsoft-video-top">
                            <span>agent orchestration</span>
                            <span>preview</span>
                        </div>

                        <div className="microsoft-video-placeholder">
                            <span>Video placeholder</span>
                        </div>

                    </div>

                </div>

                <div className="microsoft-project-one-details">

                    <div className="microsoft-detail">

                        <span>Agent architecture</span>

                        <p>
                            Specialised agents handle code analysis, incident
                            diagnosis, deployment operations, validation, and
                            recovery workflows. A coordinating agent manages
                            execution order, tool access, approval boundaries,
                            and workflow state.
                        </p>

                        <div className="microsoft-pills">
                            <span>Foundry Agent Service</span>
                            <span>Agent Framework</span>
                            <span>Tool calling</span>
                            <span>MCP</span>
                        </div>

                    </div>

                    <div className="microsoft-detail">

                        <span>Cloud execution</span>

                        <p>
                            Azure Functions, Container Apps, Service Bus and
                            Logic Apps provide asynchronous execution paths for
                            engineering operations while Azure API Management
                            exposes controlled application interfaces.
                        </p>

                        <div className="microsoft-pills">
                            <span>Azure Functions</span>
                            <span>Container Apps</span>
                            <span>Service Bus</span>
                            <span>API Management</span>
                        </div>

                    </div>

                    <div className="microsoft-detail">

                        <span>Operational controls</span>

                        <p>
                            Deployment and remediation actions are bounded by
                            identity, RBAC, secrets management, approval gates,
                            retries, failure recovery, logging, and application
                            telemetry.
                        </p>

                        <div className="microsoft-pills">
                            <span>Entra ID</span>
                            <span>Managed Identity</span>
                            <span>Key Vault</span>
                            <span>RBAC</span>
                            <span>Application Insights</span>
                        </div>

                    </div>

                </div>

            </section>



            {/* Technical architecture strip */}

            <section className="microsoft-architecture">

                <div className="microsoft-architecture-inner">

                    <div className="microsoft-architecture-copy">

                        <span>Architecture</span>

                        <h2>
                            Agent decisions are
                            <br />
                            connected to cloud
                            <br />
                            execution.
                        </h2>

                        <p>
                            Agent output is treated as structured application
                            state rather than unrestricted text. Tool calls,
                            workflow transitions and remediation operations are
                            explicitly defined so that autonomous behaviour
                            remains bounded by the underlying application
                            architecture.
                        </p>

                    </div>

                    <div className="microsoft-architecture-flow">

                        <span>agent</span>
                        <span>→</span>
                        <span>tool</span>
                        <span>→</span>
                        <span>service</span>
                        <span>→</span>
                        <span>result</span>

                    </div>

                </div>

            </section>



            {/* Project Two */}

            <section className="microsoft-project microsoft-project-two">

                <div className="microsoft-project-two-visual">

                    <div className="microsoft-video-shell microsoft-video-light">

                        <div className="microsoft-video-top">
                            <span>security investigation</span>
                            <span>preview</span>
                        </div>

                        <div className="microsoft-video-placeholder">
                            <span>Video placeholder</span>
                        </div>

                    </div>

                </div>

                <div className="microsoft-project-two-heading">

                    <div className="microsoft-project-kicker">
                        <span>Cybersecurity &amp; SecOps</span>
                    </div>

                    <h2>
                        Autonomous cyber threat
                        <br />
                        investigation &amp;
                        <br />
                        response platform
                    </h2>

                    <p>
                        A miniature autonomous Security Operations workflow
                        designed to process simulated authentication, identity,
                        API, privilege, and resource-access telemetry through
                        specialised investigation agents.
                    </p>

                </div>

                <div className="microsoft-project-two-analysis">

                    <div className="microsoft-analysis-block">

                        <span>Investigation pipeline</span>

                        <p>
                            Security events enter a triage workflow before being
                            distributed to identity, threat, and evidence agents.
                            A correlation agent reconstructs the incident timeline
                            and produces structured findings for risk assessment.
                        </p>

                        <div className="microsoft-pills">
                            <span>Event processing</span>
                            <span>Threat triage</span>
                            <span>Evidence retrieval</span>
                            <span>Correlation</span>
                        </div>

                    </div>

                    <div className="microsoft-analysis-block">

                        <span>Security reasoning</span>

                        <p>
                            Deterministic security rules are combined with
                            probabilistic model reasoning. Findings include
                            severity, confidence, affected resources, evidence,
                            and recommended response actions.
                        </p>

                        <div className="microsoft-pills">
                            <span>Risk scoring</span>
                            <span>Confidence scoring</span>
                            <span>RAG</span>
                            <span>Hybrid search</span>
                        </div>

                    </div>

                    <div className="microsoft-analysis-block microsoft-analysis-dark">

                        <span>Controlled response</span>

                        <p>
                            Destructive actions are separated from investigation.
                            Response operations such as identity suspension,
                            credential rotation, or indicator blocking require
                            an explicit human approval step.
                        </p>

                        <div className="microsoft-pills">
                            <span>Human approval</span>
                            <span>Least privilege</span>
                            <span>RBAC</span>
                            <span>Audit logging</span>
                        </div>

                    </div>

                </div>

            </section>



            {/* Security data architecture */}

            <section className="microsoft-security">

                <div className="microsoft-security-heading">

                    <span>Security data architecture</span>

                    <h2>
                        Evidence retrieval
                        <br />
                        across distributed
                        <br />
                        security data.
                    </h2>

                </div>

                <div className="microsoft-security-content">

                    <p>
                        Security telemetry, identity records, incident state,
                        investigation evidence, and knowledge sources are
                        separated into distinct data paths. Azure AI Search
                        provides retrieval capabilities for security knowledge
                        while structured incident state is persisted independently.
                    </p>

                    <div className="microsoft-security-services">

                        <span>Azure AI Search</span>
                        <span>Cosmos DB</span>
                        <span>Azure Storage</span>
                        <span>Log Analytics</span>
                        <span>Microsoft Sentinel</span>

                    </div>

                </div>

            </section>



            {/* Project Three */}

            <section className="microsoft-project-three">

                <div className="microsoft-project-three-heading">

                    <div className="microsoft-project-kicker">
                        <span>Cloud architecture &amp; FinOps</span>
                    </div>

                    <h2>
                        AI-powered cloud
                        <br />
                        architect &amp; FinOps
                        <br />
                        optimization platform
                    </h2>

                    <p>
                        A multi-agent architecture assessment system that
                        evaluates cloud resources across cost, reliability,
                        security, performance, operational excellence, and
                        sustainability.
                    </p>

                </div>

                <div className="microsoft-project-three-visual">

                    <div className="microsoft-video-center">

                        <div className="microsoft-video-placeholder">
                            <span>Video placeholder</span>
                        </div>

                    </div>

                </div>

                <div className="microsoft-project-three-grid">

                    <div>

                        <span>Discovery</span>

                        <p>
                            Resource inventory and configuration data are
                            collected through Azure Resource Manager and
                            Azure Resource Graph before architectural analysis.
                        </p>

                    </div>

                    <div>

                        <span>Cost analysis</span>

                        <p>
                            Utilisation and cost data are evaluated against
                            capacity requirements to identify over-provisioning,
                            inefficient resource allocation, and potential savings.
                        </p>

                    </div>

                    <div>

                        <span>Architecture review</span>

                        <p>
                            Reliability, security, performance, governance,
                            and operational constraints are evaluated before
                            recommendations are generated.
                        </p>

                    </div>

                    <div>

                        <span>Decision output</span>

                        <p>
                            Findings are returned as structured engineering
                            decisions containing severity, cost impact,
                            confidence, reliability impact, security impact,
                            and recommended action.
                        </p>

                    </div>

                </div>

            </section>



            {/* Structured decision example */}

            <section className="microsoft-decision">

                <div className="microsoft-decision-copy">

                    <span>Decision modelling</span>

                    <h2>
                        AI reasoning
                        <br />
                        represented as
                        <br />
                        structured data.
                    </h2>

                    <p>
                        Recommendations are represented as structured objects
                        rather than unbounded natural-language responses. This
                        allows downstream application logic to validate,
                        compare, display, simulate, or approve architectural
                        changes.
                    </p>

                </div>

                <div className="microsoft-decision-code">

                    <div className="microsoft-code-header">
                        <span>finding</span>
                        <span>structured output</span>
                    </div>

                    <pre>
                        {`{
  "finding": "compute_overprovisioned",
  "resource": "production-api",
  "severity": "medium",
  "confidence": 0.94,
  "reliability_impact": "low",
  "security_impact": "none",
  "recommended_action": "resize"
}`}
                    </pre>

                </div>

            </section>



            {/* Shared technical stack */}

            <section className="microsoft-stack">

                <div className="microsoft-stack-heading">

                    <span>Technical stack</span>

                    <h2>
                        Microsoft Azure services
                        <br />
                        across the systems.
                    </h2>

                </div>

                <div className="microsoft-stack-groups">

                    <div className="microsoft-stack-group">
                        <span>AI &amp; agents</span>

                        <div>
                            <span>Microsoft Foundry</span>
                            <span>Foundry Agent Service</span>
                            <span>Agent Framework</span>
                            <span>Foundry Models</span>
                            <span>Azure AI Search</span>
                            <span>MCP</span>
                            <span>OpenAPI</span>
                        </div>
                    </div>

                    <div className="microsoft-stack-group">
                        <span>Compute &amp; integration</span>

                        <div>
                            <span>Azure Functions</span>
                            <span>Azure Container Apps</span>
                            <span>Azure Logic Apps</span>
                            <span>Service Bus</span>
                            <span>Event Grid</span>
                            <span>API Management</span>
                        </div>
                    </div>

                    <div className="microsoft-stack-group">
                        <span>Security &amp; identity</span>

                        <div>
                            <span>Microsoft Entra ID</span>
                            <span>Managed Identity</span>
                            <span>Azure RBAC</span>
                            <span>Key Vault</span>
                            <span>Azure Policy</span>
                            <span>Defender for Cloud</span>
                        </div>
                    </div>

                    <div className="microsoft-stack-group">
                        <span>Data &amp; observability</span>

                        <div>
                            <span>Cosmos DB</span>
                            <span>Azure Storage</span>
                            <span>Log Analytics</span>
                            <span>Azure Monitor</span>
                            <span>Application Insights</span>
                            <span>OpenTelemetry</span>
                        </div>
                    </div>

                    <div className="microsoft-stack-group">
                        <span>Development &amp; delivery</span>

                        <div>
                            <span>Git</span>
                            <span>GitHub</span>
                            <span>GitHub Actions</span>
                            <span>Azure DevOps</span>
                            <span>Docker</span>
                            <span>Azure Container Registry</span>
                        </div>
                    </div>

                </div>

            </section>



            {/* Closing */}

            <section className="microsoft-closing">

                <div className="microsoft-closing-inner">

                    <span>Microsoft Azure / Foundry</span>

                    <h2>
                        Three systems.
                        <br />
                        One cloud engineering
                        <br />
                        discipline.
                    </h2>

                    <p>
                        Multi-agent orchestration, cloud infrastructure,
                        security, distributed workflows, data retrieval,
                        observability, and controlled automation implemented
                        as working engineering systems.
                    </p>

                    <div className="microsoft-closing-actions">

                        <a
                            href="/"
                            className="microsoft-closing-button"
                        >
                            Back to Portfolio
                        </a>

                        <button
                            type="button"
                            className="microsoft-closing-top"
                            onClick={scrollToTop}
                            aria-label="Back to top"
                        >
                            <ArrowUp
                                size={16}
                                strokeWidth={1.7}
                            />
                        </button>

                    </div>

                </div>

            </section>



            {/* Floating back to top */}

            {showBackToTop && (
                <button
                    className="microsoft-top"
                    type="button"
                    onClick={scrollToTop}
                    aria-label="Back to top"
                >
                    <ArrowUp
                        size={17}
                        strokeWidth={1.7}
                    />
                </button>
            )}

        </main>
    );
}

export default Microsoft;
