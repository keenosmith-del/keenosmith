// Explicit aliases, never substring inference from a broader framework or vendor.
export const skillAliases = {
  'Express.js': ['Express', 'expressjs'],
  'Google Gemini': ['Gemini', 'Google GenAI'],
  'Microsoft Foundry': ['Foundry', 'Azure Foundry', 'Azure AI Foundry'],
  PostgreSQL: ['Postgres', 'Postgre SQL'],
  'CI/CD': ['Continuous Integration / Continuous Delivery', 'Continuous integration', 'Continuous delivery'],
  Bicep: ['Azure Bicep'],
  'Docker Compose': ['Compose'],
  'Deployment Automation': ['Deployment automation'],
  'Async Programming': ['Asynchronous Programming'],
  'Workflow automation': ['Workflow Automation'],
};
const canonicalNames = new Map(Object.entries(skillAliases).flatMap(([name, aliases]) => [name, ...aliases].map(alias => [alias.toLowerCase(), name])));
export const canonicalSkill = name => canonicalNames.get(name.toLowerCase()) || name;
export const normalizeSkills = names => [...new Set(names.map(canonicalSkill))];
export const aliasesForSkill = name => skillAliases[canonicalSkill(name)] || [];
