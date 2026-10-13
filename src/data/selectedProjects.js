import { canonicalProjects } from '../assistant/knowledge.js';

// Concise showcase copy; routes and project identities come from the shared catalogue.
export const selectedProjects = [
    ['claude', 'Claude-operated AI Procurement', ['Claude', 'Structured outputs'], 'Structured document review for procurement, contracts and human-reviewed decisions.'],
    ['distributed-reliability', 'Chaos Engineering & Disaster Recovery', ['Go', 'OpenTelemetry', 'Toxiproxy'], 'Explore failure injection, recovery workflows and observability across distributed services.'],
    ['deepseek', 'HR Workforce Planning', ['C# / .NET', 'Ollama', 'pgvector'], 'Plan workforce needs with local inference, semantic retrieval and role-based access.'],
    ['telecom-billing', 'Telecommunications Billing & Subscriptions', ['Java', 'Spring Boot', 'Kafka'], 'Connect subscriptions, billing and event-driven workflows in a secure enterprise application.'],
    ['field-service', 'Field Service & Asset Management', ['C#', '.NET MAUI', 'SQLite'], 'Coordinate field jobs, assets and offline mobile work with a .NET-backed application.'],
    ['fleet-operations', 'Real-time Logistics', ['Go', 'Redpanda', 'WebSockets'], 'Track fleet activity and operational events with streaming data and live updates.'],
].map(([id, title, skills, description]) => {
    const record = canonicalProjects.find(project => project.id === id);
    return { id, title, skills, description, name: record.title,
        route: record.routes.find(route => route.startsWith('/projects/')),
        repositoryUrl: record.repositoryUrl, showCoverBackground: true };
});
