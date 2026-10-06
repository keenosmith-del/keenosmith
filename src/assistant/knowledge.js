import { additionalProjects, cvSkillEvidence, repositoryDocumentationEvidence } from './supplementalEvidence.js';
import { repositoryEvidence } from './repositoryEvidence.js';
import { relationships, taxonomy } from './taxonomy.js';
import { cvProjects } from '../data/cvProjects.js';
import { featuredProjects } from '../data/featuredProjects.js';
import { projectConcepts } from '../data/projectConcepts.js';
import { skillGroups } from '../data/skillGroups.js';
import { certificationGroups } from '../data/credentials.js';

const scopeKey=s=>s.toLowerCase().replace(/[^a-z0-9+#.]+/g,' ').trim().replace(/\s+/g,' ');
const scopeContains=(text,term)=>` ${scopeKey(text)} `.includes(` ${scopeKey(term)} `);

const implemented = [
 ['ai-assistant', 'Retrieval-Augmented AI Model', 'A modular React, Node.js, Express and MongoDB SaaS application with streamed LLM inference, ONNX semantic embeddings, vector similarity retrieval, configurable conversation context and document ingestion using Multer, PDF Parse and Mammoth.', ['React','Node.js','Express.js','MongoDB','RAG','Embeddings','ONNX','Groq','JavaScript','LLM Integration'], 'https://github.com/keenosmith-del/ai-entity'],
 ['productivity-platform', 'Authenticated MERN Platform', 'Authenticated resource management with JWT Bearer tokens, REST APIs, interconnected MongoDB models and persistent client-server state.', ['React','Node.js','Express.js','MongoDB','JWT','REST APIs','JavaScript','Authentication'], 'https://github.com/keenosmith-del/personal-productivity-desktop'],
 ['music-api', 'Music API-Driven Web App', 'React interface and Node.js/Express APIs integrate external music services, MongoDB persistence and browser audio playback.', ['React','Node.js','Express.js','MongoDB','REST APIs','JavaScript','API Integration'], 'https://github.com/keenosmith-del/music-api'],
 ['enterprise-workspace', 'Enterprise Workspace', 'Database application engineering with runtime schema operations and table creation, documented in the CV and dedicated project page.', ['React','Node.js','PostgreSQL','SQL','JavaScript'], 'https://github.com/keenosmith-del/enterprise-workspace'],
 ['microsoft', 'AI-Powered Software Engineering & DevOps Operations Platform', 'Implemented incident analysis and persistence, GitHub repository and commit inspection, Azure resource inventory, Foundry-backed recommendations, guarded workflow states and local Docker orchestration. Azure AI Search/RAG, telemetry analysis, CI/CD execution, automated code changes, pull requests and deployment actions are planned, not implemented in the active runtime.', ['Azure','Microsoft Foundry','Foundry Agent Service','React','Node.js','MongoDB','Docker','Agentic AI'], 'https://github.com/keenosmith-del/microsoft-ai-powered-software-engineering-devops'],
];
const existingProjects = [
 ...cvProjects,
 ...additionalProjects,
 ...implemented.map(([id,title,description,technologies,repository]) => ({id,title:featuredProjects.find(p=>p.id===id)?.title||title,description,technologies,repository,path:`/projects/${id}`,status:'Implemented portfolio project',demonstrated:true})),
 ...projectConcepts.map(p=>({...p,status:'Planned · Not built yet',demonstrated:false})),
 ...[['aws','AWS Banking Platform','Payment risk decisions, ML, Lambda, API Gateway and Kinesis are described on the AWS case study. Deployment and completion are not independently verified.',['AWS','Python','SageMaker','Bedrock','Lambda','Kinesis']],['gcp','Google Cloud Engineering','Cloud, AI and Kubernetes learning and applied work. Completion of a deployed retail platform is not verified.',['Google Cloud','Vertex AI','Kubernetes']],['rabbitmq','RabbitMQ: Event-driven Applications','Coordinating events and background work; the case study is being prepared.',['RabbitMQ']],['kinesis','Kinesis: Real-time Payment Streaming','Streaming payment events; the case study is being prepared.',['Kinesis']],['opentofu','OpenTofu: Infrastructure as Code','Infrastructure provisioning; the case study is being prepared.',['OpenTofu']],['duckdb','DuckDB: Data Analytics','Placeholder for data querying and analytics.',['DuckDB']],['go-dotnet','Go & .NET: Backend Services','Placeholder for backend services.',['Go','.NET']],['openai','OpenAI: AI Application Development','Placeholder for model integration.',['OpenAI']],['jwt-redpanda','JWT + RedPanda: Secure Event-driven Services','Placeholder for authentication and streaming.',['JWT','Redpanda']],['company-websites','Kailor & Kai: Website Engineering','Company websites in development.',['React']],['kailor-ai','Kailor: AI Business Assessment','Planned AI business assessment.',['AI']]].map(([id,title,description,technologies])=>({id,title,description,technologies,path:`/projects/${id}`,status:'Learning / scope not verified',demonstrated:false}))
];
// Preserve legacy records and provenance. Duplicate scopes share a canonical ID,
// so they remain searchable without inflating project/evidence counts.
const canonicalAliases = {'microsoft-devops':'microsoft', aws:'banking-risk', gcp:'vertex-ai-retail'};
export const projects = existingProjects.map(p => {
 const canonicalId=canonicalAliases[p.id] || p.id;
 const extra=repositoryEvidence.find(r=>r.id===canonicalId);
 const cvScope=p.id.startsWith('cv-')?taxonomy.flatMap(t=>t.skills).filter(t=>scopeContains(p.description,t)):[];
 const technologies=[...new Set([...p.technologies,...cvScope,...extra?.technologies || []])];
 const built=p.demonstrated || !!extra;
 const original=existingProjects.find(r=>r.id===canonicalId)||p;
 const publication=extra && !original.demonstrated ? 'not-yet-published' : original.demonstrated ? 'published' : 'partially-published';
 return {...p, canonicalId, name:p.title, aliases:Object.entries(canonicalAliases).filter(([,id])=>id===canonicalId).map(([id])=>id),
  technologies, implementedTechnologies:[...new Set([...(p.demonstrated?p.technologies:[]),...extra?.technologies||[]])],
  description:extra?.description || p.description,
  buildStatus:built?'built':p.planned?'planned':'in-progress',
  portfolioPublicationStatus:publication, verificationStatus:extra?'verified':p.demonstrated?'strongly-supported':'needs-review',
  demonstrated:built, planned:!built && !!p.planned,
  status:extra?(publication==='not-yet-published'?'Built · Portfolio page coming soon':'Built · Source inspected'):p.status,
  repository:extra?.repository || p.repository, repositoryUrl:extra?.repository || p.repository || null,
  routes:[p.path], demoUrl:null, ...relationships(technologies),
  evidence:[{type:'existing-assistant',source:p.path,strength:p.demonstrated?'direct':'supporting',description:p.description,status:p.status,technologies:p.technologies},...p.evidence||[],...repositoryDocumentationEvidence.filter(r=>r.id===p.id),...extra?.evidence || []]};
});
export const credentials = certificationGroups.flatMap(g=>g.certifications.map(c=>({...c,group:g.name,credentialTypes:c.id==='microsoft-defender-xdr'?['Applied Skills',...(c.badges.length?['Badge']:[])]:[g.id==='google-cloud'?'Lab / training':g.id==='hyperion-stellenbosch'?'Education / bootcamp':['aws-ai/ml','wethinkcode'].includes(g.id)||['agent-architect','cybersecurity'].includes(c.id)?'Programme':'Course / technical credential',...(c.badges.length?['Badge']:[])],category:c.id==='microsoft-defender-xdr'?'Applied Skills':g.id==='hyperion-stellenbosch'||g.id==='aws-ai/ml'||g.id==='wethinkcode'||['agent-architect','cybersecurity'].includes(c.id)?'Programme / training':'Technical learning credential',evidence:[{type:'portfolio-credential',source:'src/data/credentials.js',strength:'supporting'}], ...relationships([c.name,...taxonomy.flatMap(t=>t.skills).filter(t=>scopeContains(`${c.name} ${c.description}`,t))]),status:'Listed with certificate in portfolio',path:'/certifications',verification:c.issuer.includes('AWS')||g.id==='aws'?'https://www.credly.com/users/keeno-smith':g.id==='google-cloud'?'https://www.skills.google/public_profiles/105079cb-27bf-46a4-9c48-9ce8fc594527':null})));
export const education = [
 'Generative AI — Stellenbosch University, June–August 2026; training programme.',
 'Full-Stack Software Engineering & Web Development — HyperionDev, January–June 2026; training programme.',
 'BSc Computer Science studies — University of South Africa, 2017–2022; coursework completed. An awarded degree is not confirmed.',
 'National Senior Certificate — Greenside High School, 2010–2015.',
];
export const experience = [
 'Software Engineering & Application Development — 2022–present, project-based independent engineering across frontend, backend, APIs, databases and AI integration. The source gives a start year, not a precise start date.',
 'Technical & Digital Operations Lead / Co-Founder — Firstdaes Entertainment, January 2020–June 2026; digital products, customer experience, business systems, workflows and operational delivery.',
 'Contract Specialist / Technical Content & Documentation — 3Play Media, February 2021–September 2025; technical material quality assurance and documentation. This is not described as a software engineering employment role.',
];
export const skills = [...new Set([...skillGroups.flatMap(g=>g.skills),...projects.flatMap(p=>p.technologies),...cvSkillEvidence.flatMap(r=>r.technologies)])];
export const skillRegistry = skills.map(name=>({id:name.toLowerCase().replace(/\+/g,' plus ').replace(/#/g,' sharp ').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),name,...relationships([name]),
 evidence:[...cvSkillEvidence.filter(r=>r.technologies.includes(name)).map(r=>({type:'cv-listing',source:r.source,strength:'supporting'})),...skillGroups.filter(g=>g.skills.includes(name)).map(g=>({type:'portfolio-skill',source:g.title,strength:'supporting'})),
 ...projects.filter(p=>p.technologies.includes(name)).map(p=>({type:'project',source:p.id,strength:p.implementedTechnologies.includes(name)?'direct':'supporting',buildStatus:p.buildStatus})),
 ...credentials.filter(c=>scopeContains(`${c.name} ${c.description}`,name)).map(c=>({type:'training',source:c.id,strength:'supporting'}))]}));
export const canonicalProjects=projects.filter(p=>p.id===p.canonicalId).map(p=>({...p,routes:[...new Set(projects.filter(r=>r.canonicalId===p.id).flatMap(r=>r.routes))],evidence:[...new Map(projects.filter(r=>r.canonicalId===p.id).flatMap(r=>r.evidence).map(e=>[`${e.type}:${e.source}`,e])).values()]}));
export const registry = {projects:canonicalProjects,skills:skillRegistry,credentials,education};
export { skillGroups };
