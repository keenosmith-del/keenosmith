import {
    ArrowLeft,
    ArrowUp,
} from 'lucide-react';

import './GCP.css';

import { useEffect, useState } from 'react';


function GCP() {

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

        <main className="gcp-project">


            {/* Back to portfolio */}

            <a
                className="gcp-project-back"
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

            <section className="gcp-project-hero">

                <div className="gcp-project-hero-inner">

                    <div className="gcp-project-meta">

                        <span>Google Cloud</span>
                        <span>Agentic AI</span>
                        <span>Cloud Engineering</span>
                        <span>Distributed Systems</span>

                    </div>


                    <h1>

                        Cloud-native
                        <br />
                        AI systems
                        <br />
                        on Google Cloud.

                    </h1>


                    <div className="gcp-project-hero-bottom">

                        <p>
                            Three multi-agent systems implemented around
                            Google Cloud infrastructure, covering software
                            supply-chain security, distributed event processing,
                            geospatial intelligence, data governance, and
                            controlled AI-assisted decision workflows.
                        </p>


                        <div className="gcp-project-hero-stack">

                            <span>Google Cloud</span>
                            <span>Vertex AI</span>
                            <span>Google ADK</span>
                            <span>Cloud Run</span>
                            <span>BigQuery</span>

                        </div>

                    </div>

                </div>

            </section>



            {/* Platform strip */}

            <section className="gcp-project-platform">

                <div className="gcp-project-platform-copy">

                    <span className="gcp-project-label">
                        Primary platform
                    </span>

                    <h2>
                        Google Cloud infrastructure
                        as the execution layer.
                    </h2>

                </div>


                <div className="gcp-project-platform-data">

                    <div>
                        <span>Development</span>
                        <p>Python / Google ADK</p>
                    </div>

                    <div>
                        <span>AI platform</span>
                        <p>Vertex AI / Gemini</p>
                    </div>

                    <div>
                        <span>Runtime</span>
                        <p>Cloud Run</p>
                    </div>

                    <div>
                        <span>Data</span>
                        <p>BigQuery / Firestore / Storage</p>
                    </div>

                </div>

            </section>



            {/* Project one */}

            <section className="gcp-project-supply-chain">

                <div className="gcp-project-supply-chain-heading">

                    <span className="gcp-project-label">
                        Software supply-chain security
                    </span>

                    <h2>
                        AI-assisted dependency
                        and repository analysis.
                    </h2>

                    <p>
                        A multi-agent software supply-chain security
                        platform that analyses repositories, dependency
                        relationships, vulnerabilities, licensing constraints,
                        architecture and container artefacts before producing
                        structured security findings.
                    </p>

                </div>


                <div className="gcp-project-supply-chain-code">

                    <div className="gcp-project-code-header">

                        <span>Execution architecture</span>

                    </div>

                    <pre>
{`GitHub
   ↓
Cloud Build
   ↓
Artifact Registry
   ↓
Cloud Run
   ↓
Google ADK
   ↓
Vertex AI / Gemini
   ↓
Specialised Agents
   ├── Dependency Agent
   ├── Security Agent
   ├── License Agent
   └── Architecture Agent
   ↓
Firestore / BigQuery`}
                    </pre>

                </div>


                <div className="gcp-project-supply-chain-video">

                    <div className="gcp-project-video-placeholder">

                        <span>
                            Project video
                        </span>

                    </div>

                </div>


                <div className="gcp-project-supply-chain-details">

                    <div>

                        <span className="gcp-project-detail-title">
                            Analysis
                        </span>

                        <p>
                            Repository contents are parsed into structured
                            software components and dependency relationships.
                            The system evaluates direct and transitive
                            dependencies, known vulnerabilities, package
                            metadata, licence constraints and architectural
                            relationships.
                        </p>

                    </div>


                    <div>

                        <span className="gcp-project-detail-title">
                            Decision model
                        </span>

                        <p>
                            Deterministic security checks establish the
                            underlying evidence while specialised agents
                            perform contextual analysis. Findings are represented
                            using structured severity, confidence, affected
                            component and remediation fields.
                        </p>

                    </div>

                </div>


                <div className="gcp-project-pills">

                    <span>Python</span>
                    <span>Google ADK</span>
                    <span>Vertex AI</span>
                    <span>Cloud Run</span>
                    <span>Cloud Build</span>
                    <span>Artifact Registry</span>
                    <span>Terraform</span>
                    <span>Docker</span>
                    <span>Firestore</span>
                    <span>BigQuery</span>
                    <span>IAM</span>
                    <span>Cloud KMS</span>

                </div>

            </section>



            {/* Project two */}

            <section className="gcp-project-streaming">

                <div className="gcp-project-streaming-top">

                    <div>

                        <span className="gcp-project-label">
                            Distributed event processing
                        </span>

                        <h2>
                            Streaming data as the
                            primary system boundary.
                        </h2>

                    </div>


                    <p>
                        A distributed event intelligence system that ingests
                        synthetic sensor streams, processes events through
                        asynchronous workers, correlates multiple event sources,
                        and exposes aggregated intelligence through an API.
                        AI reasoning is introduced after deterministic event
                        processing rather than acting as the primary ingestion
                        mechanism.
                    </p>

                </div>


                <div className="gcp-project-streaming-architecture">

                    <div className="gcp-project-architecture-intro">

                        <span>
                            Event processing pipeline
                        </span>

                        <p>
                            The architecture separates ingestion, processing,
                            persistence, analytical querying and AI reasoning
                            into independently scalable stages.
                        </p>

                    </div>


                    <pre>
{`Synthetic Sensors
      ↓
   Pub/Sub
      ↓
  Cloud Run
      ↓
 ┌────┼────┐
 ↓    ↓    ↓
Traffic Weather Incident
 │    │    │
 └────┼────┘
      ↓
  BigQuery
      ↓
 BigQuery GIS
      ↓
  ADK / Agent
      ↓
Intelligence API`}
                    </pre>

                </div>


                <div className="gcp-project-streaming-feature">

                    <div className="gcp-project-streaming-video">

                        <div className="gcp-project-video-placeholder">

                            <span>
                                Project video
                            </span>

                        </div>

                    </div>


                    <div className="gcp-project-streaming-copy">

                        <span className="gcp-project-label">
                            Event correlation
                        </span>

                        <h3>
                            Deterministic processing
                            before AI reasoning.
                        </h3>

                        <p>
                            Incoming events are validated, normalised and
                            correlated using structured event models before
                            being persisted for analytical processing.
                            Temporal relationships and spatial relationships
                            can then be evaluated against other event sources.
                        </p>

                        <div className="gcp-project-pills">

                            <span>Pub/Sub</span>
                            <span>Cloud Run</span>
                            <span>BigQuery</span>
                            <span>BigQuery GIS</span>
                            <span>Event correlation</span>
                            <span>Async processing</span>

                        </div>

                    </div>

                </div>


                <div className="gcp-project-streaming-analysis">

                    <span className="gcp-project-label">
                        Distributed systems
                    </span>

                    <h3>
                        Independent event producers,
                        scalable workers and analytical storage.
                    </h3>

                    <div className="gcp-project-streaming-analysis-grid">

                        <p>
                            Pub/Sub provides the asynchronous communication
                            boundary between event producers and processing
                            services, allowing workers to scale independently
                            from ingestion.
                        </p>

                        <p>
                            BigQuery provides the analytical layer while
                            BigQuery GIS enables spatial queries and relationships
                            across geographic event data. The agent layer consumes
                            the resulting structured intelligence.
                        </p>

                    </div>

                </div>

            </section>



            {/* Project three */}

            <section className="gcp-project-governance">

                <div className="gcp-project-governance-intro">

                    <span className="gcp-project-label">
                        Enterprise data governance
                    </span>

                    <h2>
                        Data classification,
                        policy evaluation and
                        controlled remediation.
                    </h2>

                </div>


                <div className="gcp-project-governance-main">

                    <div className="gcp-project-governance-video">

                        <div className="gcp-project-video-placeholder">

                            <span>
                                Project video
                            </span>

                        </div>

                    </div>


                    <div className="gcp-project-governance-copy">

                        <p>
                            The platform evaluates enterprise data assets
                            against governance, security and compliance
                            requirements. Data discovery and classification
                            are combined with deterministic policy checks
                            and agent-based reasoning to produce structured
                            governance findings.
                        </p>

                        <div className="gcp-project-pills">

                            <span>BigQuery</span>
                            <span>Cloud Storage</span>
                            <span>Dataplex</span>
                            <span>Sensitive Data Protection</span>
                            <span>Vertex AI</span>
                            <span>Google ADK</span>

                        </div>

                    </div>

                </div>


                <div className="gcp-project-governance-model">

                    <div className="gcp-project-governance-code">

                        <div className="gcp-project-code-header">

                            <span>Governance processing model</span>

                        </div>

                        <pre>
{`Cloud Storage
      │
      ▼
  BigQuery
      │
 ┌────┴─────────────┐
 ▼                  ▼
Dataplex       Sensitive Data
                Protection
 │                  │
 └────────┬─────────┘
          ▼
   Governance Agents
          │
          ▼
   Gemini / ADK
          │
          ▼
      Risk Engine
          │
          ▼
    Human Approval`}
                        </pre>

                    </div>


                    <div className="gcp-project-governance-text">

                        <span className="gcp-project-label">
                            Governance decisioning
                        </span>

                        <h3>
                            Evidence-backed policy
                            evaluation.
                        </h3>

                        <p>
                            Classification results and policy evaluations are
                            retained as structured findings. AI-generated
                            recommendations remain bounded by deterministic
                            controls and approval requirements before remediation
                            actions can be executed.
                        </p>

                    </div>

                </div>


                <div className="gcp-project-governance-details">

                    <div>

                        <span>
                            Data discovery
                        </span>

                        <p>
                            Data assets are identified across object storage
                            and analytical systems, with metadata and
                            classification information maintained as part of
                            the governance model.
                        </p>

                    </div>


                    <div>

                        <span>
                            Sensitive data
                        </span>

                        <p>
                            Sensitive Data Protection is used to identify
                            potentially sensitive information and provide
                            evidence for downstream governance decisions.
                        </p>

                    </div>


                    <div>

                        <span>
                            Policy evaluation
                        </span>

                        <p>
                            Deterministic controls establish whether an asset
                            satisfies defined governance requirements while
                            agents interpret the resulting evidence and produce
                            remediation recommendations.
                        </p>

                    </div>

                </div>


                <div className="gcp-project-pills">

                    <span>BigQuery</span>
                    <span>Cloud Storage</span>
                    <span>Dataplex</span>
                    <span>Sensitive Data Protection</span>
                    <span>IAM</span>
                    <span>Cloud KMS</span>
                    <span>Secret Manager</span>
                    <span>Cloud Audit Logs</span>
                    <span>Cloud Logging</span>
                    <span>Cloud Monitoring</span>

                </div>

            </section>



            {/* Technical stack */}

            <section className="gcp-project-stack">

                <div className="gcp-project-stack-heading">

                    <span className="gcp-project-label">
                        Google Cloud stack
                    </span>

                    <h2>
                        Services and technologies
                        across the three systems.
                    </h2>

                </div>


                <div className="gcp-project-stack-content">

                    <div className="gcp-project-stack-group">

                        <span>AI &amp; Agent Architecture</span>

                        <div className="gcp-project-pills">

                            <span>Vertex AI</span>
                            <span>Gemini</span>
                            <span>Google ADK</span>
                            <span>Agent Development Kit</span>
                            <span>Agent Tool Calling</span>
                            <span>Multi-Agent Orchestration</span>
                            <span>RAG</span>

                        </div>

                    </div>


                    <div className="gcp-project-stack-group">

                        <span>Compute &amp; Application</span>

                        <div className="gcp-project-pills">

                            <span>Cloud Run</span>
                            <span>Cloud Run Jobs</span>
                            <span>Cloud Functions</span>
                            <span>Docker</span>
                            <span>Python</span>
                            <span>REST APIs</span>

                        </div>

                    </div>


                    <div className="gcp-project-stack-group">

                        <span>Data &amp; Messaging</span>

                        <div className="gcp-project-pills">

                            <span>BigQuery</span>
                            <span>BigQuery GIS</span>
                            <span>Firestore</span>
                            <span>Cloud Storage</span>
                            <span>Pub/Sub</span>
                            <span>Event-Driven Architecture</span>

                        </div>

                    </div>


                    <div className="gcp-project-stack-group">

                        <span>DevSecOps &amp; Infrastructure</span>

                        <div className="gcp-project-pills">

                            <span>Cloud Build</span>
                            <span>Artifact Registry</span>
                            <span>Terraform</span>
                            <span>Containerisation</span>
                            <span>CI/CD</span>
                            <span>Supply-Chain Security</span>

                        </div>

                    </div>


                    <div className="gcp-project-stack-group">

                        <span>Security &amp; Governance</span>

                        <div className="gcp-project-pills">

                            <span>IAM</span>
                            <span>Cloud KMS</span>
                            <span>Secret Manager</span>
                            <span>Security Command Center</span>
                            <span>Software Delivery Shield</span>
                            <span>Sensitive Data Protection</span>

                        </div>

                    </div>


                    <div className="gcp-project-stack-group">

                        <span>Observability</span>

                        <div className="gcp-project-pills">

                            <span>Cloud Logging</span>
                            <span>Cloud Monitoring</span>
                            <span>Cloud Audit Logs</span>
                            <span>Metrics</span>
                            <span>Distributed Tracing</span>

                        </div>

                    </div>

                </div>

            </section>



            {/* Closing */}

            <section className="gcp-project-closing">

                <div className="gcp-project-closing-inner">

                    <span className="gcp-project-label">
                        Google Cloud engineering
                    </span>

                    <p>
                        Cloud-native systems combining
                        distributed processing, security,
                        governance and agentic AI.
                    </p>


                    <div className="gcp-project-closing-actions">

                        <a
                            className="gcp-project-closing-button"
                            href="/"
                        >
                            Back to Portfolio
                        </a>


                        <button
                            className="gcp-project-closing-top"
                            type="button"
                            onClick={scrollToTop}
                            aria-label="Back to top"
                        >

                            <ArrowUp
                                size={16}
                                strokeWidth={1.7}
                                aria-hidden="true"
                            />

                        </button>

                    </div>

                </div>

            </section>



            {/* Floating back to top */}

            {showBackToTop && (

                <button
                    className="gcp-project-top"
                    type="button"
                    onClick={scrollToTop}
                    aria-label="Back to top"
                >

                    <ArrowUp
                        size={17}
                        strokeWidth={1.7}
                        aria-hidden="true"
                    />

                </button>

            )}

        </main>

    );

}

export default GCP;