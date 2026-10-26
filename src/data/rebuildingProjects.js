import { projectEvidenceById } from './projectEvidence.js';
// Preserve the existing showcase selection; these implementations now have
// working custom pages, independently of historical rebuilding labels.
export const rebuildingProjects = ['productivity-platform', 'music-api', 'enterprise-workspace', 'ai-assistant', 'manufacturing-qc', 'customer-operations'].map(id => {
  const project = projectEvidenceById.get(id);
  return { ...project, id: project.displayId, name: project.title, route: project.path, skills: project.implementedTechnologies.slice(0, 4), domain: project.categories.slice(0, 3).join(' / '), planned: false, showCoverBackground: true };
});
