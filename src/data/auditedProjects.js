// Compatibility exports; current facts have one authoritative source.
export { reviewedProjects as auditedProjects } from './projectEvidence.js';
export const auditOverrides = {};
export const exactToolRecords = {
  Lambda: { aliases: ['aws lambda'], status: 'candidate-declared experience', projectIds: ['cv-2'], description: 'Keeno records Lambda experience in AWS event processing and incident-response workflows. The cloud-security architecture describes Lambda consumers and remediation with EventBridge, SQS and Step Functions. The implementation source remains unresolved; this is candidate-declared experience, not a source-inspected Lambda implementation or a production claim.' },
};
