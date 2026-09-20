import {
    ArrowLeft,
    ArrowUp,
} from 'lucide-react';

import './AWS.css';

import { useEffect, useState } from 'react';

function AWS() {
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
        <main className="aws-project">

            {/* Back to portfolio */}

            <a
                className="aws-project-back"
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

            <section className="aws-project-hero">

                <div className="aws-project-hero-grid">

                    <div className="aws-project-hero-main">

                        <div className="aws-project-meta">
                            <span>Cloud Engineering</span>
                            <span>Agentic AI</span>
                            <span>Serverless Architecture</span>
                            <span>AWS</span>
                        </div>

                        <h1>
                            AWS
                            <br />
                            Cloud &amp;
                            <br />
                            AI Systems
                        </h1>

                    </div>

                    <div className="aws-project-hero-side">

                        <span className="aws-project-kicker">
                            Primary platform
                        </span>

                        <h2>
                            AWS Console
                            <br />
                            + Bedrock
                            <br />
                            AgentCore
                        </h2>

                        <p>
                            A collection of cloud-native systems implementing
                            event-driven architecture, serverless processing,
                            multi-agent orchestration, streaming data pipelines,
                            security automation, and automated deployment
                            workflows across AWS services.
                        </p>

                    </div>

                </div>

            </section>


            {/* Platform context */}

            <section className="aws-project-platform">

                <div className="aws-project-platform-intro">

                    <span className="aws-project-section-label">
                        Platform architecture
                    </span>

                    <h2>
                        Local development connected
                        to cloud implementation.
                    </h2>

                </div>

                <div className="aws-project-platform-content">

                    <p>
                        Each system is developed locally, maintained through
                        Git-based source control, implemented against AWS
                        services, and documented as a deployable cloud
                        architecture rather than as an isolated application
                        prototype.
                    </p>

                    <div className="aws-project-platform-pills">
                        <span>AWS Console</span>
                        <span>AWS Skill Builder</span>
                        <span>AWS Builder Center</span>
                        <span>AWS Cloud Quest</span>
                        <span>Simulator Labs</span>
                        <span>Git</span>
                        <span>Docker</span>
                        <span>Cloud Architecture</span>
                    </div>

                </div>

            </section>


            {/* Project one introduction */}

            <section className="aws-project-project-one">

                <div className="aws-project-project-one-copy">

                    <span className="aws-project-project-type">
                        Cloud Security Incident Response
                    </span>

                    <h2>
                        Autonomous Cloud Security
                        Incident Response Platform
                    </h2>

                    <p>
                        An event-driven security investigation system that
                        processes CloudTrail activity, routes security events,
                        maintains structured incident state, and invokes
                        bounded AI investigation and response workflows.
                    </p>

                    <div className="aws-project-pill-list">
                        <span>IAM least privilege</span>
                        <span>CloudTrail</span>
                        <span>EventBridge</span>
                        <span>SQS</span>
                        <span>Lambda</span>
                        <span>Step Functions</span>
                        <span>Bedrock</span>
                        <span>AgentCore</span>
                    </div>

                </div>

                <div className="aws-project-project-one-media">

                    <div className="aws-project-video-placeholder">
                        <span>Project demonstration</span>
                    </div>

                </div>

            </section>


            {/* Project one architecture */}

            <section className="aws-project-code-section">

                <div className="aws-project-code-heading">

                    <span className="aws-project-section-label">
                        Event processing
                    </span>

                    <h2>
                        Step Functions as the
                        orchestration backbone.
                    </h2>

                    <p>
                        Security events move through deterministic AWS
                        infrastructure before AI services are introduced.
                        This separates event detection, workflow state,
                        security controls, and probabilistic reasoning.
                    </p>

                </div>

                <div className="aws-project-code-block">

                    <div className="aws-project-code-top">
                        <span>incident-response-flow</span>
                        <span>aws</span>
                    </div>

                    <pre>
                        <code>{`CloudTrail
    ↓
EventBridge
    ↓
SQS
    ↓
Lambda
    ↓
Step Functions
    ↓
Bedrock / AgentCore
    ↓
DynamoDB
    ↓
CloudWatch`}</code>
                    </pre>

                </div>

            </section>


            {/* Project one technical detail */}

            <section className="aws-project-detail aws-project-detail-dark">

                <div className="aws-project-detail-media">

                    <div className="aws-project-video-placeholder">
                        <span>Security workflow demonstration</span>
                    </div>

                </div>

                <div className="aws-project-detail-copy">

                    <span className="aws-project-section-label">
                        Security automation
                    </span>

                    <h2>
                        Deterministic controls
                        around agent actions.
                    </h2>

                    <p>
                        The system separates deterministic security controls
                        from AI-assisted investigation. Agents can retrieve
                        evidence, correlate events, assess risk, and propose
                        remediation, while destructive operations remain
                        bounded by explicit permissions and approval controls.
                    </p>

                    <div className="aws-project-pill-list">
                        <span>Bounded permissions</span>
                        <span>Human approval</span>
                        <span>Structured incident state</span>
                        <span>Audit logging</span>
                        <span>Idempotency</span>
                        <span>Dead-letter queues</span>
                        <span>Retry policies</span>
                        <span>Failure recovery</span>
                    </div>

                </div>

            </section>


            {/* Project one stack */}

            <section className="aws-project-stack">

                <div className="aws-project-stack-header">

                    <span className="aws-project-section-label">
                        AWS service layer
                    </span>

                    <h2>
                        Security, compute,
                        messaging and AI.
                    </h2>

                </div>

                <div className="aws-project-stack-grid">

                    <div>
                        <span>Security</span>
                        <p>
                            IAM, KMS, Secrets Manager,
                            CloudTrail
                        </p>
                    </div>

                    <div>
                        <span>Integration</span>
                        <p>
                            EventBridge, SQS,
                            SNS
                        </p>
                    </div>

                    <div>
                        <span>Compute</span>
                        <p>
                            Lambda,
                            Step Functions
                        </p>
                    </div>

                    <div>
                        <span>AI</span>
                        <p>
                            Bedrock,
                            AgentCore
                        </p>
                    </div>

                    <div>
                        <span>Data</span>
                        <p>
                            S3,
                            DynamoDB
                        </p>
                    </div>

                    <div>
                        <span>Observability</span>
                        <p>
                            CloudWatch,
                            CloudWatch Logs
                        </p>
                    </div>

                </div>

            </section>


            {/* Project two */}

            <section className="aws-project-project-two">

                <div className="aws-project-project-two-media">

                    <div className="aws-project-video-placeholder">
                        <span>Streaming pipeline demonstration</span>
                    </div>

                </div>

                <div className="aws-project-project-two-copy">

                    <span className="aws-project-project-type">
                        Data Engineering + AI Investigation
                    </span>

                    <h2>
                        Intelligent Data Pipeline
                        &amp; Anomaly Investigation System
                    </h2>

                    <p>
                        A streaming data architecture that ingests event
                        streams, performs serverless transformation,
                        persists raw and structured data, and invokes
                        AI-assisted investigation when statistical or
                        behavioural anomalies are detected.
                    </p>

                    <div className="aws-project-pill-list">
                        <span>Kinesis</span>
                        <span>Lambda</span>
                        <span>S3</span>
                        <span>DynamoDB</span>
                        <span>EventBridge</span>
                        <span>Step Functions</span>
                        <span>Athena</span>
                        <span>Bedrock</span>
                    </div>

                </div>

            </section>


            {/* Project two architecture */}

            <section className="aws-project-pipeline">

                <div className="aws-project-pipeline-header">

                    <span className="aws-project-section-label">
                        Streaming architecture
                    </span>

                    <h2>
                        From real-time ingestion
                        to analytical investigation.
                    </h2>

                </div>

                <div className="aws-project-pipeline-code">

                    <div className="aws-project-code-top">
                        <span>stream-processing-flow</span>
                        <span>aws</span>
                    </div>

                    <pre>
                        <code>{`Kinesis Data Streams
        ↓
Lambda
        ↓
EventBridge
        ↓
SQS
        ↓
Step Functions
        ↓
Bedrock / AgentCore
        ↓
S3 + DynamoDB
        ↓
Athena`}</code>
                    </pre>

                </div>

            </section>


            {/* Project two technical section */}

            <section className="aws-project-detail aws-project-detail-light aws-project-detail-two">

                <div className="aws-project-detail-copy">

                    <span className="aws-project-section-label">
                        Anomaly investigation
                    </span>

                    <h2>
                        Statistical detection
                        followed by AI reasoning.
                    </h2>

                    <p>
                        The pipeline distinguishes anomaly detection from
                        root-cause analysis. Streaming and statistical
                        processing identifies deviations from established
                        baselines, while downstream agent workflows correlate
                        events and construct structured investigation results.
                    </p>

                    <div className="aws-project-pill-list">
                        <span>Real-time streaming</span>
                        <span>Time-series analysis</span>
                        <span>Statistical baselines</span>
                        <span>Event correlation</span>
                        <span>RAG</span>
                        <span>Root-cause analysis</span>
                        <span>Stateful workflows</span>
                        <span>Failure recovery</span>
                    </div>

                </div>

                <div className="aws-project-detail-media">

                    <div className="aws-project-video-placeholder">
                        <span>Anomaly investigation demonstration</span>
                    </div>

                </div>

            </section>


            {/* Project three */}

            <section className="aws-project-project-three">

                <div className="aws-project-project-three-header">

                    <span className="aws-project-project-type">
                        DevOps + SRE + Automated Recovery
                    </span>

                    <h2>
                        Distributed Developer
                        Deployment &amp;
                        Reliability Platform
                    </h2>

                    <p>
                        A containerised deployment platform implementing
                        automated builds, image management, deployment
                        orchestration, health monitoring, failure detection,
                        and rollback workflows with AI-assisted reliability
                        analysis.
                    </p>

                </div>

                <div className="aws-project-project-three-media">

                    <div className="aws-project-video-placeholder">
                        <span>Deployment platform demonstration</span>
                    </div>

                </div>

            </section>


            {/* Project three architecture */}

            <section className="aws-project-deployment">

                <div className="aws-project-deployment-code">

                    <div className="aws-project-code-top">
                        <span>deployment-lifecycle</span>
                        <span>aws</span>
                    </div>

                    <pre>
                        <code>{`GitHub
   ↓
CI / CD
   ↓
CodeBuild
   ↓
ECR
   ↓
ECS / Fargate
   ↓
CloudWatch
   ↓
EventBridge
   ↓
Step Functions
   ↓
Bedrock / AgentCore
   ↓
Rollback`}</code>
                    </pre>

                </div>

                <div className="aws-project-deployment-copy">

                    <span className="aws-project-section-label">
                        Deployment orchestration
                    </span>

                    <h2>
                        Deployment telemetry
                        becomes operational state.
                    </h2>

                    <p>
                        Deployment events, application metrics, logs, and
                        health signals are processed as operational data.
                        Deterministic deployment guardrails establish whether
                        a release can continue, while AI-assisted analysis
                        supports diagnosis when failures occur.
                    </p>

                </div>

            </section>


            {/* Project three technical */}

            <section className="aws-project-devops">

                <div className="aws-project-devops-copy">

                    <span className="aws-project-section-label">
                        Reliability engineering
                    </span>

                    <h2>
                        Failure detection,
                        diagnosis and recovery.
                    </h2>

                    <p>
                        The platform evaluates deployment health using
                        observable signals including error rates, latency,
                        logs, and application metrics. Failed deployments can
                        trigger bounded recovery workflows, including rollback,
                        with release state and deployment actions recorded for
                        traceability.
                    </p>

                    <div className="aws-project-pill-list">
                        <span>Docker</span>
                        <span>ECS / Fargate</span>
                        <span>ECR</span>
                        <span>CodeBuild</span>
                        <span>CodePipeline</span>
                        <span>CloudWatch</span>
                        <span>Rollback</span>
                        <span>Health checks</span>
                        <span>Deployment telemetry</span>
                        <span>Release traceability</span>
                    </div>

                </div>

                <div className="aws-project-devops-media">

                    <div className="aws-project-video-placeholder">
                        <span>Reliability workflow demonstration</span>
                    </div>

                </div>

            </section>


            {/* Overall technical stack */}

            <section className="aws-project-technology">

                <div className="aws-project-technology-heading">

                    <span className="aws-project-section-label">
                        Technology surface
                    </span>

                    <h2>
                        AWS services used across
                        the three systems.
                    </h2>

                </div>

                <div className="aws-project-technology-groups">

                    <div className="aws-project-technology-group">
                        <span>AI &amp; Agents</span>

                        <div>
                            <span>Amazon Bedrock</span>
                            <span>Bedrock AgentCore</span>
                            <span>Agent Tool Calling</span>
                            <span>Multi-Agent Orchestration</span>
                            <span>RAG</span>
                        </div>
                    </div>

                    <div className="aws-project-technology-group">
                        <span>Compute</span>

                        <div>
                            <span>Lambda</span>
                            <span>ECS</span>
                            <span>Fargate</span>
                            <span>Step Functions</span>
                        </div>
                    </div>

                    <div className="aws-project-technology-group">
                        <span>Events &amp; Messaging</span>

                        <div>
                            <span>EventBridge</span>
                            <span>SQS</span>
                            <span>SNS</span>
                            <span>Kinesis</span>
                        </div>
                    </div>

                    <div className="aws-project-technology-group">
                        <span>Data</span>

                        <div>
                            <span>S3</span>
                            <span>DynamoDB</span>
                            <span>Athena</span>
                            <span>Glue</span>
                            <span>Data Partitioning</span>
                        </div>
                    </div>

                    <div className="aws-project-technology-group">
                        <span>Security</span>

                        <div>
                            <span>IAM</span>
                            <span>KMS</span>
                            <span>Secrets Manager</span>
                            <span>CloudTrail</span>
                            <span>Least Privilege</span>
                        </div>
                    </div>

                    <div className="aws-project-technology-group">
                        <span>DevOps &amp; Observability</span>

                        <div>
                            <span>Docker</span>
                            <span>ECR</span>
                            <span>CodeBuild</span>
                            <span>CodePipeline</span>
                            <span>CloudWatch</span>
                            <span>CloudWatch Logs</span>
                        </div>
                    </div>

                </div>

            </section>


            {/* Closing */}

            <section className="aws-project-closing">

                <div className="aws-project-closing-inner">

                    <span className="aws-project-section-label">
                        Cloud engineering
                    </span>

                    <h2>
                        Event-driven systems,
                        intelligent workflows,
                        automated recovery.
                    </h2>

                    <p>
                        Three AWS implementations covering cloud security,
                        streaming data engineering, distributed deployment,
                        agentic AI, serverless infrastructure, and
                        production-oriented reliability patterns.
                    </p>

                    <a
                        className="aws-project-closing-button"
                        href="/"
                    >
                        Back to Portfolio
                    </a>

                </div>

            </section>


            {/* Back to top */}

            {showBackToTop && (
                <button
                    className="aws-project-top"
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

export default AWS;