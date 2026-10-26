import { reviewedProjects } from './projectEvidence.js';

// A displayed lower bound, backed by distinct repository implementations.
// Provider adapters count as implemented AI code, not verified hosted inference.
export const aiProjectTarget = 15;
export const qualifyingAIProjects = reviewedProjects.filter(project => project.aiImplemented);
export const aiProjectCounterLabel = `${aiProjectTarget}+ AI projects`;
