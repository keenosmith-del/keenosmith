import { projectEvidenceById } from './projectEvidence.js';
// Legacy presentation selection, with current facts and explicit routes.
const selected = ['microsoft', 'banking-risk', 'vertex-ai-retail', 'ollama', 'claude', 'hugging-face', 'distributed-reliability', 'n8n', 'deepseek', 'telecom-billing', 'field-service', 'fleet-operations'];
export const projectConcepts = selected.map(id => {
  const project = projectEvidenceById.get(id);
  return { ...project, id: project.displayId, planned: false, section: 'projects' };
});
