import { Link } from 'react-router-dom';
import './Skills.css';

const skillsProjects = {
    'go-dotnet': { title: 'Go & .NET: Backend Services', description: 'A placeholder for a project using Go and .NET to build backend services.', section: 'microsoft' },
    openai: { title: 'OpenAI: AI Application Development', description: 'A placeholder for a project integrating OpenAI models into an application.', section: 'microsoft' },
    'jwt-redpanda': { title: 'JWT + RedPanda: Secure Event-driven Services', description: 'A placeholder for a project using JWT authentication and Redpanda event streaming.', section: 'microsoft' },
    'vertex-ai-retail': { title: 'Google Cloud / Vertex AI - Intelligent Retail & Supply Chain', description: 'Planned project exploring intelligent retail and supply chain workflows with Google Cloud and Vertex AI.', section: 'gcp', planned: true },
    duckdb: { title: 'DuckDB: Data Analytics', description: 'A placeholder for a project using DuckDB for data querying and analytics.', section: 'gcp' },
    'hugging-face': { title: 'Hugging Face: AI & Machine Learning', description: 'A placeholder for a project using Hugging Face models and tools.', section: 'gcp' },
    rabbitmq: { title: 'RabbitMQ: Event-driven Applications', description: 'A project using RabbitMQ to coordinate events and background work.', section: 'about' },
    kinesis: { title: 'Kinesis: Real-time Payment Streaming', description: 'A banking platform project using Amazon Kinesis for streaming payment events.', section: 'about' },
    opentofu: { title: 'OpenTofu: Infrastructure as Code', description: 'A project using OpenTofu to provision and manage infrastructure.', section: 'about' },
    claude: { title: 'Claude-powered AI Procurement & Contract Intelligence Platform', description: 'AI applied to procurement and contract intelligence.' },
    n8n: { title: 'n8n Enterprise Workflow & Integration OpsFlow Platform', description: 'Workflow orchestration and integration across business systems.' },
    ollama: { title: 'Ollama: Private Personal/Business Intelligence Platform', description: 'Local AI for personal and business information.' },
};

export default function SkillsProjectPreview({ project }) {
    const { title, description, section = 'skills', planned = false } = skillsProjects[project];
    return (
        <main className="skills-project-preview">
            <span>{planned ? 'Planned project · Not built yet' : 'Case study coming soon'}</span>
            <h1>{title}</h1>
            <p>{description} The full project page is being prepared.</p>
            <Link className="skills-button" to={`/#${section}`}>Back to portfolio</Link>
        </main>
    );
}
