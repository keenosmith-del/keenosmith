import { canonicalSkill, normalizeSkills } from "./skillNames.js";
import { auditedProjects, exactToolRecords } from './auditedProjects.js';
import { repositoryEvidence } from '../assistant/repositoryEvidence.js';
import { professionalSkillRecords } from './candidateProfile.js';
import { relationships } from '../assistant/taxonomy.js';
export const skillGroups = [
  {
    title: "Frontend & UI",
    skills: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Vite",
      "React Router",
      "Tailwind CSS",
      "Bootstrap",
      "Figma",
      "Responsive Design",
      "Component Architecture",
      "Web Animation",
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      "Node.js",
      "Express.js",
      "Fastify",
      "FastAPI",
      "REST APIs",
      "GraphQL",
      "Postman",
      "Axios",
      "API Integration",
      "Asynchronous Programming",
      "Middleware",
      "Server-side Architecture",
    ],
  },
  {
    title: "Databases & Data",
    skills: [
      "MongoDB",
      "Mongoose",
      "PostgreSQL",
      "MySQL",
      "Prisma",
      "Redis",
      "Elasticsearch",
      "Neo4j",
      "Data Modelling",
      "Query Design",
      "Vector Search",
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      "OpenAI",
      "Anthropic",
      "Google Gemini",
      "Hugging Face",
      "LangChain",
      "PyTorch",
      "TensorFlow",
      "RAG",
      "Embeddings",
      "NLP",
      "Prompt Engineering",
      "LLM Integration",
      "Agentic AI",
      "AI Evaluation",
    ],
  },
  {
    title: "Microsoft & Azure",
    skills: [
      "Microsoft Foundry",
      "Foundry Agent Service",
      "Microsoft Agent Framework",
      "Azure OpenAI",
      "Foundry Models",
      "Azure AI Search",
      "Azure Functions",
      "Azure Container Apps",
      "Azure Logic Apps",
      "Azure Service Bus",
      "Azure Storage",
      "Azure Key Vault",
      "Microsoft Entra ID",
      "Azure Monitor",
      "Application Insights",
      "Azure DevOps",
      "Azure API Management",
    ],
  },
  {
    title: "Google Cloud & AI",
    skills: [
      "Google Cloud",
      "Google Gemini",
      "Vertex AI",
      "Google AI APIs",
      "Firebase",
      "Cloud Functions",
      "Cloud Storage",
      "Google Cloud APIs",
    ],
  },
  {
    title: "Cloud, DevOps & Infrastructure",
    skills: [
      "AWS",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "CI/CD",
      "Terraform",
      "Cloudflare",
      "Nginx",
      "Render",
      "Vercel",
      "Containerisation",
      "Deployment Automation",
      "Infrastructure as Code",
    ],
  },
  {
    title: "Security & Authentication",
    skills: [
      "JWT",
      "Authentication",
      "Authorization",
      "RBAC",
      "bcrypt",
      "Protected Routes",
      "API Security",
      "Microsoft Entra ID",
      "Managed Identity",
      "Secrets Management",
      "OAuth",
      "Security Architecture",
    ],
  },
  {
    title: "Architecture & Engineering",
    skills: [
      "Software Architecture",
      "System Design",
      "RESTful Architecture",
      "Microservices",
      "Event-driven Architecture",
      "Serverless Architecture",
      "Distributed Systems",
      "Asynchronous Workflows",
      "Message Queues",
      "API Design",
      "Integration Patterns",
      "Error Handling",
      "Observability",
    ],
  },
  {
    title: "Languages & Core Engineering",
    skills: [
      "JavaScript",
      "Python",
      "C++",
      "SQL",
      "Object-oriented Programming",
      "Data Structures",
      "Algorithms",
      "Async Programming",
      "Git",
      "GitHub",
      "JSON",
    ],
  },
];

// Navigation and Explore share categorisation; new audited skills are added once.
skillGroups.push({ title: 'Testing & Evaluation', skills: ['Testing', 'Playwright', 'Vitest', 'AI Evaluation'] });
for (const group of skillGroups) group.skills = normalizeSkills(group.skills);
const categoryGroups = { testing: 'Testing & Evaluation', frontend: 'Frontend & UI', backend: 'Backend & APIs', databases: 'Databases & Data', ai: 'AI & Machine Learning', devops: 'Cloud, DevOps & Infrastructure', infrastructure: 'Cloud, DevOps & Infrastructure', security: 'Security & Authentication', architecture: 'Architecture & Engineering', languages: 'Languages & Core Engineering' };
for (const name of new Set([...auditedProjects.flatMap(p => p.technologies), ...repositoryEvidence.flatMap(p => p.technologies), ...professionalSkillRecords.flatMap(r => r.skills), ...Object.keys(exactToolRecords).filter(n => exactToolRecords[n].status === "candidate-declared experience")].map(canonicalSkill))) {
  if (skillGroups.some(g => g.skills.includes(name))) continue;
  const rel = relationships([name]);
  const category = rel.categories.find(c => categoryGroups[c]);
  const title = categoryGroups[category] || (rel.ecosystems.includes('google') ? 'Google Cloud & AI' : rel.ecosystems.includes('microsoft') ? 'Microsoft & Azure' : rel.ecosystems.includes('aws') ? 'Cloud, DevOps & Infrastructure' : 'Architecture & Engineering');
  skillGroups.find(g => g.title === title).skills.push(name);
}
