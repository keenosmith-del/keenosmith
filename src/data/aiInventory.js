import { countedAIProjects, projectCountPolicy } from './projectCountPolicy.js';

// Public wording retained pending explicit owner review of the count discrepancy.
// Provider adapters count as implemented AI code, not verified hosted inference.
export const aiProjectTarget = projectCountPolicy.publicLowerBound;
export const qualifyingAIProjects = countedAIProjects;
export const aiProjectCounterLabel = `${aiProjectTarget}+ AI projects`;
