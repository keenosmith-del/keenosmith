import { projectConcepts } from './projectConcepts.js';
// row 1 imports
import aiAssistantCover from '../assets/projects/ai/1.png';
import productivityCover from '../assets/projects/productivity/1.png'
import musicCover from '../assets/projects/music/1.png';

export const featuredProjects = [
    {
        id: 'ai-assistant',
        title: 'Retrieval-Augmented AI Model',
        skill: 'RAG',
        description:
            'A full-stack SaaS platform implementing LLM inference, semantic embeddings, vector similarity retrieval, document processing and configurable context workflows.',
        image: aiAssistantCover,
    },
    {
        id: 'productivity-platform',

        title: 'Authenticated MERN Platform',

        skill: 'Full-Stack Architecture',

        description:
            'A full-stack web application implementing authenticated resource management, REST APIs, interconnected data modelling and persistent client-server state.',

        image: productivityCover,


    },

    {
        id: 'music-api',
        title: 'Music API-Driven Web App',
        skill: 'API & Full-Stack Engineering',
        description:
            'Full-stack React, Node.js, Express and MongoDB application implementing REST APIs, external service integration, data persistence and browser-based audio playback.',
        image: musicCover,
    },
    ...[
        ['microsoft-devops', 'Microsoft Azure AI', 'Azure AI Engineering', null, null],
        ['ollama', 'Ollama BI', 'Local AI Engineering', 'var(--surface)', 'centered'],
        ['claude', 'Claude-Operated AI Procurement', 'LLM Application Engineering', '#eb7e5d', 'centered'],
        ['hugging-face', 'Hugging Face AI Insurance Claims', 'AI Model Engineering', '#f4c13e', 'centered'],
        ['banking-risk', 'AWS Intelligent Banking & Payment Risk', 'AWS Cloud Engineering', null, null],
        ['vertex-ai-retail', 'Google Cloud Intelligent Retail & Supply Chain', 'Google Cloud Engineering', 'var(--surface)', 'centered'],
        ['distributed-reliability', 'Chaos Engineering & Disaster Recovery', 'SRE & Reliability Engineering', 'var(--charcoal)', 'centered'],
        ['deepseek', 'HR Workforce Planning', 'AI & Talent Intelligence', 'var(--surface)', 'centered'],
        ['telecom-billing', 'Telecommunications Billing & Subscriptions', 'Enterprise Billing Systems', '#ed899d', 'centered'],
        ['fleet-operations', 'Real-Time Logistics', 'Real-Time Streaming & Logistics', null, null],
        ['field-service', 'Field Service & Asset Maintenance', 'Mobile & Field Operations', null, null],
        ['n8n', 'n8n OpsFlow', 'Workflow & Integration Engineering', null, null],
    ].map(([id, title, skill, background, imageMode]) => ({
        id, title, skill, background, imageMode, image: null,
        description: projectConcepts.find(project => project.id === id).description,
    })),
];
