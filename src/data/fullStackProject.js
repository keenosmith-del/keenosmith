import { projectConcepts } from './projectConcepts.js';

const project = projectConcepts.find(item => item.id === 'n8n');

export const fullStackProject = {
    id: project.id,
    title: project.title,
    name: project.title,
    route: project.path,
    description: project.description,
    // Verified implementation metadata in assistant/repositoryEvidence.js.
    skills: ['n8n', 'NestJS', 'PostgreSQL', 'Webhooks'],
    showCoverBackground: true,
};
