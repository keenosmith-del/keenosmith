import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    ArrowUp,
} from 'lucide-react';

import { useEffect, useState } from 'react';

import './Certifications.css';

// microsoft
import microsoftCert1 from '../../../assets/certifications/microsoft/cert1.png';
import microsoftBadge1 from '../../../assets/certifications/microsoft/badge1.png';

import microsoftCert2 from '../../../assets/certifications/microsoft/cert2.png';
import microsoftCert3 from '../../../assets/certifications/microsoft/cert3.png';
import microsoftCert4 from '../../../assets/certifications/microsoft/cert4.png';

// aws
import awsCert1 from '../../../assets/certifications/aws/cert1.png';
import badge1 from '../../../assets/certifications/aws/badge1.png';

import awsCert2 from '../../../assets/certifications/aws/cert2.png';
import badge2 from '../../../assets/certifications/aws/badge2.png';

import awsCert3 from '../../../assets/certifications/aws/cert3.png';

import awsCert4 from '../../../assets/certifications/aws/cert4.png';
import badge4 from '../../../assets/certifications/aws/badge4.png';

import awsCert5 from '../../../assets/certifications/aws/cert5.png';
import badge5 from '../../../assets/certifications/aws/badge5.png';

import awsCert6 from '../../../assets/certifications/aws/cert6.png';
import badge6 from '../../../assets/certifications/aws/badge6.png';

import awsCert7 from '../../../assets/certifications/aws/cert7.png';
import badge7 from '../../../assets/certifications/aws/badge7.png';

import awsCert8 from '../../../assets/certifications/aws/cert8.png';
import badge8 from '../../../assets/certifications/aws/badge8.png';

import awsCert9 from '../../../assets/certifications/aws/cert9.png';
import badge9 from '../../../assets/certifications/aws/badge9.png';

// hyperion-dev stellenbosch
import hdStellenboschCert1 from '../../../assets/certifications/hyperiondev-stellenbosch/cert1.png';
import hdStellenboschCert2 from '../../../assets/certifications/hyperiondev-stellenbosch/cert2.png';

// n8n
import n8nCert1 from '../../../assets/certifications/n8n/cert1.png';
import n8nBadge1 from '../../../assets/certifications/n8n/badge1.png';

import n8nCert2 from '../../../assets/certifications/n8n/cert2.png';
import n8nBadge2 from '../../../assets/certifications/n8n/badge2.png';

import n8nCert3 from '../../../assets/certifications/n8n/cert3.png';

import n8nCert4 from '../../../assets/certifications/n8n/cert4.png';
import n8nBadge4 from '../../../assets/certifications/n8n/badge4.png';

// google
import googleCloudCert1 from '../../../assets/certifications/google/cert1.png';

// wethinkcode
import wtcCert1 from '../../../assets/certifications/wethinkcode/cert1.png';

// aws ai/ml scholars
import aiMLCert1 from '../../../assets/certifications/ai-ml-scholars/cert1.png';
import aiMLbadge1_1 from '../../../assets/certifications/ai-ml-scholars/badge1-1.png';
import aiMLbadge1_2 from '../../../assets/certifications/ai-ml-scholars/badge1-2.png';

import aiMLCert2 from '../../../assets/certifications/ai-ml-scholars/cert2.png';
import aiMLbadge2 from '../../../assets/certifications/ai-ml-scholars/badge2.png';


// =========================================================
// CERTIFICATION DATA
// =========================================================

const certificationGroups = [

    {
        id: 'hyperion-stellenbosch',

        name: 'HyperionDev × Stellenbosch University',

        description:
            'Software engineering and generative AI programmes delivered through HyperionDev in partnership with Stellenbosch University.',

        certifications: [

            {
                id: 'hyperion-stellenbosch-cert-1',

                name: 'Generative AI',

                issuer: 'Stellenbosch University',

                date: '2026',

                description:
                    'Generative AI programme covering practical AI applications, core machine learning principles, collaboration with data science and AI teams, and the application of AI to real-world initiatives.',

                image: hdStellenboschCert1,

                icons: [],

                badges: [],

                tileIssuer: 'Stellenbosch University',
            },

            {
                id: 'hyperion-stellenbosch-cert-2',

                name: 'Full-Stack Software Engineering & Web Development',

                issuer: 'HyperionDev × Stellenbosch University',

                date: '2026',

                description:
                    'Full-stack software engineering programme covering front-end and back-end development, databases, application development, and the creation of dynamic, scalable web applications.',

                image: hdStellenboschCert2,

                icons: [],

                badges: [],

                tileIssuer: 'HyperionDev × Stellenbosch University',
            },

        ],
    },

    {
        id: 'microsoft',
        name: 'Microsoft',
        description:
            'Professional credentials spanning Azure AI, cloud security, data engineering and agentic AI development across the Microsoft ecosystem.',
        certifications: [

            {
                id: 'microsoft-defender-xdr',
                name: 'Microsoft Defender XDR Applied Skills',
                issuer: 'Microsoft',
                date: 'Sep 2026',
                description:
                    'Applied security credential demonstrating practical investigation and response workflows using Microsoft Defender XDR.',
                image: microsoftCert1,
                icons: [],
                badges: [
                    microsoftBadge1,
                ],
            },

            {
                id: 'agent-architect',
                name: 'Agent Architect',
                issuer: 'Microsoft',
                issuerDetail: 'Founderz × Microsoft',
                date: 'Mar 2026',
                description:
                    'Technical programme focused on designing AI agents, agentic workflows and modern AI application architectures.',
                image: microsoftCert2,
                icons: [],
                badges: [],
            },

            {
                id: 'cybersecurity',
                name: 'Cyber Threat & Security',
                issuer: 'Microsoft',
                issuerDetail: 'Founderz × Microsoft',
                date: '2026',
                description:
                    'Security-focused programme covering cyber threats, attack scenarios and practical approaches to identifying and responding to security risks.',
                image: microsoftCert3,
                icons: [],
                badges: [],
            },

            {
                id: 'data-engineering-azure',
                name: 'Data Engineering with Azure',
                issuer: 'Microsoft',
                date: '2026',
                description:
                    'Technical credential covering data engineering concepts and data workloads across Microsoft Azure services.',
                image: microsoftCert4,
                icons: [],
                badges: [],
            },

        ],
    },

    {
        id: 'aws',

        name: 'Amazon Web Services',

        description:
            'Cloud engineering, AI, databases, containers, networking and AWS service knowledge across the cloud ecosystem.',

        certifications: [

            {
                id: 'aws-cert-1',

                name: 'AWS Developer - Adding Asynchronous Processing',

                issuer: 'Amazon Web Services',

                date: '2026',

                description:
                    'Developer-focused training covering asynchronous application processing on AWS, including event-driven patterns and services used to decouple workloads and process tasks independently.',

                image: awsCert1,

                icons: [],

                badges: [badge1],
            },

            {
                id: 'aws-cert-2',

                name: 'Advanced PostgreSQL for Amazon Aurora and Amazon RDS',

                issuer: 'Amazon Web Services',

                date: '2026',

                description:
                    'Advanced PostgreSQL knowledge for Amazon Aurora and Amazon RDS, covering database design, advanced SQL and data types, maintenance, performance optimisation, replication, indexing and query optimisation.',

                image: awsCert2,

                icons: [],

                badges: [badge2],
            },

            {
                id: 'aws-cert-3',

                name: 'Generative AI Inference on Amazon SageMaker AI with G7e Instances',

                issuer: 'Amazon Web Services',

                date: '2026',

                description:
                    'Training focused on deploying and optimising generative AI inference workloads on Amazon SageMaker AI using G7e GPU instances, including large-model deployment, GPU acceleration, throughput, latency and inference cost optimisation.',

                image: awsCert3,

                icons: [],

                badges: [],
            },

            {
                id: 'aws-cert-4',

                name: 'AI Driven Development Lifecycle',

                issuer: 'Amazon Web Services',

                date: '2026',

                description:
                    'AWS methodology for AI-native software development, using AI-powered execution with human oversight across requirements, architecture, implementation, testing and operations.',

                image: awsCert4,

                icons: [],

                badges: [badge4],
            },

            {
                id: 'aws-cert-5',

                name: 'Amazon Braket',

                issuer: 'Amazon Web Services',

                date: '2026',

                description:
                    'Knowledge of quantum computing on AWS through Amazon Braket, including quantum computing concepts, quantum circuits, simulators, hardware and quantum application development.',

                image: awsCert5,

                icons: [],

                badges: [badge5],
            },

            {
                id: 'aws-cert-6',

                name: 'Amazon ECS',

                issuer: 'Amazon Web Services',

                date: '2026',

                description:
                    'Knowledge of Amazon Elastic Container Service and its role in running, managing and scaling containerised applications on AWS.',

                image: awsCert6,

                icons: [],

                badges: [badge6],
            },

            {
                id: 'aws-cert-7',

                name: 'Amazon EKS',

                issuer: 'Amazon Web Services',

                date: '2026',

                description:
                    'Knowledge of Amazon Elastic Kubernetes Service for running containerised workloads and microservices, including Kubernetes architecture, networking, security, observability and scaling on AWS.',

                image: awsCert7,

                icons: [],

                badges: [badge7],
            },

            {
                id: 'aws-cert-8',

                name: 'Amazon Serverless Knowledge Assessment',

                issuer: 'Amazon Web Services',

                date: '2026',

                description:
                    'Knowledge of AWS serverless application architecture with a focus on services such as AWS Lambda and Amazon API Gateway, including event-driven design and managed compute.',

                image: awsCert8,

                icons: [],

                badges: [badge8],
            },

            {
                id: 'aws-cert-9',

                name: 'Amazon Networking Core',

                issuer: 'Amazon Web Services',

                date: '2026',

                description:
                    'Core AWS networking knowledge covering Amazon VPC, AWS Cloud WAN and Amazon Route 53, alongside networking architecture, connectivity and secure cloud network design.',

                image: awsCert9,

                icons: [],

                badges: [badge9],
            },

        ],
    },

    {

        id: 'aws-ai/ml',

        name: 'AWS AI/ML Scholars Program',

        description:
            'AI and machine learning training through AWS Skill Builder and Udacity, covering generative AI, AI programming, machine learning and practical AWS AI technologies.',

        certifications: [

            {

                id: 'aws-ai/ml-programmer',

                name: 'AI Programmer',

                issuer: 'AWS × Udacity',

                date: '2026',

                description:
                    'AI programming pathway covering advanced Python, data analysis and visualisation, machine learning with PyTorch, and neural networks including transformers.',

                image: aiMLCert1,

                icons: [],

                badges: [
                    aiMLbadge1_1,
                    aiMLbadge1_2,
                ],

            },

            {

                id: 'aws-ai/ml-practitioner',

                name: 'AI Practitioner',

                issuer: 'AWS × Udacity',

                date: '2026',

                description:
                    'AI and generative AI training covering core AI concepts, machine learning, large language models, AWS AI services, agentic AI, responsible AI and practical AWS use cases.',

                image: aiMLCert2,

                icons: [],

                badges: [
                    aiMLbadge2,
                    aiMLbadge2,
                ],

            },

        ],

    },

    {
        id: 'google-cloud',

        name: 'Google Cloud',

        description:
            'Cloud infrastructure, Kubernetes and application delivery credentials across Google Cloud technologies.',

        certifications: [

            {
                id: 'google-cloud-cert-1',

                name: 'Kubernetes Operations & Delivery on Google Cloud',

                issuer: 'Google Cloud',

                date: '2026',

                description:
                    'Intermediate Google Cloud Kubernetes credential covering GKE cluster management, kubectl-based deployments, application monitoring and debugging, Managed Prometheus, logging and alerting, containerisation, scaling and continuous delivery practices.',

                image: googleCloudCert1,

                icons: [],

                badges: [],
            },

        ],
    },

    {
        id: 'n8n',

        name: 'n8n',

        description:
            'Workflow automation and AI orchestration credentials covering API integration, workflow engineering, intelligent automation, testing and production practices.',

        certifications: [

            {
                id: 'n8n-cert-1',

                name: 'AI Workflow Engineering & Production Practices',

                issuer: 'n8n Academy',

                date: '2026',

                description:
                    'Advanced n8n workflow development covering AI-powered workflows, AI agents, tools and memory, testing and debugging, error handling, modular workflow architecture, documentation, monitoring, version control and production readiness.',

                image: n8nCert1,

                icons: [],

                badges: [n8nBadge1],
            },

            {
                id: 'n8n-cert-2',

                name: 'API Integration & Connected Workflow Engineering',

                issuer: 'n8n Academy',

                date: '2026',

                description:
                    'Workflow integration engineering covering execution control, sub-workflows, API requests, webhooks, authentication, credentials, pagination, data transformation, error handling, custom JavaScript and Python, and persistent workflow data.',

                image: n8nCert2,

                icons: [],

                badges: [n8nBadge2],
            },

            {
                id: 'n8n-cert-3',

                name: 'Workflow Engineering & Data Transformation',

                issuer: 'n8n Academy',

                date: '2026',

                description:
                    'Core n8n workflow development covering the canvas, nodes and executions, triggers, scheduling, credentials, data structures, expressions, data transformation and building automated workflows from scratch.',

                image: n8nCert3,

                icons: [],

                badges: [],
            },

            {
                id: 'n8n-cert-4',

                name: 'n8n Workflow Automation Quickstart',

                issuer: 'n8n Academy',

                date: '2026',

                description:
                    'Practical introduction to n8n automation covering triggers, scheduling, HTTP requests, expressions, API credentials, data transformation, error handling and building an AI agent connected to real data.',

                image: n8nCert4,

                icons: [],

                badges: [n8nBadge4],
            },

        ],
    },

    {

        id: 'wethinkcode',

        name: 'WeThinkCode_',

        description:
            'Generative AI training for software developers, focused on applying AI tools across practical software engineering workflows.',

        certifications: [

            {

                id: 'wethinkcode-genai',

                name: 'GenAI for Software Developers',

                issuer: 'WeThinkCode_',

                date: '2026',

                description:
                    'Practical generative AI development covering AI-assisted code comprehension, documentation, testing, debugging, refactoring and software development workflows.',

                image: wtcCert1,

                icons: [],

                badges: [],

            },

        ],

    },

    /*
    {
        id: 'claude',
        name: 'Claude',
        description:
            'LLM application engineering and AI development using Claude and the Anthropic ecosystem.',
        certifications: [
            {
                id: 'claude-placeholder',
                name: 'Claude Certification',
                issuer: 'Anthropic',
                date: '2026',
                description:
                    'Claude engineering certification placeholder.',
                image: null,
                icons: [],
                badges: [],
            },
        ],
    },

    {
        id: 'oracle',
        name: 'Oracle',
        description:
            'Database, cloud and enterprise technology credentials from Oracle.',
        certifications: [
            {
                id: 'oracle-placeholder',
                name: 'Oracle Certification',
                issuer: 'Oracle',
                date: '2026',
                description:
                    'Oracle certification placeholder.',
                image: null,
                icons: [],
                badges: [],
            },
        ],
    },

    {
        id: 'ibm',
        name: 'IBM',
        description:
            'Professional credentials covering software engineering, artificial intelligence and cloud technologies.',
        certifications: [
            {
                id: 'ibm-placeholder',
                name: 'IBM Certification',
                issuer: 'IBM',
                date: '2026',
                description:
                    'IBM certification placeholder.',
                image: null,
                icons: [],
                badges: [],
            },
        ],
    },
    */
];


// =========================================================
// CERTIFICATION TILE
// =========================================================

function CertificationTile({ certification }) {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <article
            className={`certification-tile ${isHovered ? 'is-hovered' : ''
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            <div className="certification-visual">

                {certification.image ? (
                    <img
                        src={certification.image}
                        alt=""
                        className="certification-image"
                    />
                ) : (
                    <div className="certification-visual-placeholder">
                        <span>Certificate preview</span>
                    </div>
                )}

            </div>

            <div className="certification-overlay" />

            <div className="certification-tile-content">

                <div className="certification-tile-top">

                    <div className="certification-issuer">

                        <span>
                            {certification.issuer}
                        </span>

                        {certification.issuerDetail && (
                            <small>
                                {certification.issuerDetail}
                            </small>
                        )}

                    </div>

                    {certification.icons?.length > 0 && (
                        <div className="certification-icons">

                            {certification.icons.map((icon, index) => (
                                <img
                                    key={`${certification.id}-icon-${index}`}
                                    src={icon}
                                    alt=""
                                />
                            ))}

                        </div>
                    )}

                </div>


                <div className="certification-tile-main">

                    <h3>
                        {certification.name}
                    </h3>

                    <span className="certification-date">
                        {certification.date}
                    </span>

                </div>

            </div>

        </article>
    );
}


// =========================================================
// CERTIFICATION DETAILS
// =========================================================

function CertificationDetails({ certification }) {

    return (
        <div className="certification-details">

            <div className="certification-detail-heading">

                <div>

                    <h3>
                        {certification.name}
                    </h3>

                    <span>
                        {certification.issuer}
                    </span>

                </div>


                {certification.badges?.length > 0 && (
                    <div className="certification-badges">

                        {certification.badges.map((badge, index) => (
                            <img
                                key={`${certification.id}-badge-${index}`}
                                src={badge}
                                alt=""
                            />
                        ))}

                    </div>
                )}

            </div>


            <div className="certification-detail-meta">

                <span>
                    {certification.date}
                </span>

            </div>


            <p>
                {certification.description}
            </p>

        </div>
    );
}


// =========================================================
// CERTIFICATION GROUP
// =========================================================

function CertificationGroup({ group }) {

    return (
        <section
            className="certification-group"
            id={`certifications-${group.id}`}
        >

            <div className="certification-group-heading">

                <h2>
                    {group.name}
                </h2>

                <p>
                    {group.description}
                </p>

            </div>


            <div className="certification-row">

                {group.certifications.map((certification) => (

                    <div
                        className="certification-item"
                        key={certification.id}
                    >

                        <CertificationTile
                            certification={certification}
                        />

                        <CertificationDetails
                            certification={certification}
                        />

                    </div>

                ))}

            </div>

        </section>
    );
}


// =========================================================
// PAGE
// =========================================================

function Certifications() {

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
        <main className="certifications-page">

            <Link
                className="certifications-back"
                to="/"
            >
                <ArrowLeft
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden="true"
                />

                <span>Back to Portfolio</span>
            </Link>

            {/* =================================================
                HERO
            ================================================= */}

            <section className="certifications-hero">

                <div className="certifications-hero-inner">


                    <h1>
                        Engineering
                        <br />
                        credentials.
                    </h1>


                    <div className="certifications-hero-bottom">

                        <p>
                            A curated collection of professional certifications,
                            programmes and technical credentials spanning
                            software engineering, artificial intelligence,
                            cloud infrastructure and developer tooling.
                        </p>

                    </div>


                    <a
                        className="certifications-wallet-button"
                        href="https://www.credly.com/users/keeno-smith"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Skills Wallet
                    </a>

                </div>

            </section>


            {/* =================================================
                CERTIFICATION COLLECTION
            ================================================= */}

            <section className="certifications-collection">

                <div className="certification-groups">

                    {certificationGroups.map((group) => (

                        <CertificationGroup
                            key={group.id}
                            group={group}
                        />

                    ))}

                </div>

            </section>


            {/* =================================================
                CLOSING
            ================================================= */}

            <section className="certifications-closing">

                <div className="certifications-closing-inner">

                    <h2>
                        Credentials that
                        <br />
                        support the engineering.
                    </h2>

                    <p>
                        A continuously evolving collection of technical
                        certifications and professional learning across
                        software, AI, cloud and infrastructure.
                    </p>

                    <div className="certifications-closing-actions">

                        <Link
                            to="/"
                            className="certifications-closing-button"
                        >
                            Back to Portfolio
                        </Link>

                        <button
                            type="button"
                            className="certifications-closing-top"
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

            {showBackToTop && (
                <button
                    className="certifications-top"
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

export default Certifications;