import { reviewedProjects } from './projectEvidence.js';

// Counts implementation families, including hidden source-reviewed work and
// provider adapters, never business ventures, plans or separately hosted copies.
export const projectCountPolicy = {
  revision: '2026-10-27.1',
  excludedIds: ['kailor-ai', 'kailor-insider'],
  implementationFamilies: { 'eventops-intelligence-v2': 'eventops-intelligence' },
  publicLowerBound: 15,
  claimStatus: 'owner-review-required',
  reviewReason: 'The prior 16-record set included two businesses and two EventOps versions. The conservative implementation-family count is below the published 15+ claim; preserve public wording pending owner review.',
};
export const countedAIProjects = [...new Map(reviewedProjects
  .filter(p => p.aiImplemented && !projectCountPolicy.excludedIds.includes(p.id))
  .map(p => [projectCountPolicy.implementationFamilies[p.id] || p.id, p])).values()];
