// Shared relationships drive query expansion and registry classification.
export const taxonomy = [
 {id:'google',label:'Google Cloud & AI',aliases:['google','gcp','google cloud','google ai'],skills:['Google Cloud','Compute Engine','Google Kubernetes Engine','Cloud KMS','Dataplex','Google Gemini','Vertex AI','BigQuery','BigQuery GIS','Cloud Run','Cloud Functions','Pub/Sub','Firestore','Workflows','Cloud Storage','Cloud SQL','IAM','Secret Manager','Cloud Logging','Cloud Monitoring','ADK','Firebase','Google AI APIs','Google Cloud APIs','Artifact Registry','Cloud Build']},
 {id:'microsoft',label:'Microsoft & Azure',aliases:['microsoft','azure','microsoft ai'],skills:['Azure','Microsoft Foundry','Foundry','Foundry Agent Service','Microsoft Agent Framework','Azure OpenAI','Foundry Models','Azure AI Search','Azure Functions','Durable Functions','Azure Container Apps','Azure Logic Apps','Azure Service Bus','Azure Storage','Azure Key Vault','Microsoft Entra ID','Azure Monitor','Application Insights','Azure DevOps','Azure API Management','Microsoft Defender XDR','Sentinel','.NET MAUI','ASP.NET Core']},
 {id:'aws',label:'AWS',aliases:['aws','amazon','amazon web services'],skills:['AWS','Lambda','S3','DynamoDB','EventBridge','Step Functions','SQS','SNS','Bedrock','SageMaker','IAM','KMS','CloudTrail','CloudWatch','ECS','EKS','CodePipeline','CodeBuild','OpenSearch','Athena','Glue','Kinesis','API Gateway','Secrets Manager']},
 {id:'ai',label:'AI & Machine Learning',aliases:['ai','artificial intelligence','machine learning','agentic','agents','agentic ai','google ai','microsoft ai'],skills:['RAG','Embeddings','Vector Search','Agentic AI','Multi-agent orchestration','Tool calling','Structured outputs','OCR','NER','VQA','AI Evaluation','LLM Integration','Prompt Engineering','Local inference','ONNX','Groq','Ollama','DeepSeek','Qwen','Llama','Mistral','OpenAI','Anthropic','Claude API','Hugging Face','Transformers','PyTorch','TensorFlow','OpenCV','NLP','Computer vision','Google Gemini','Vertex AI','Microsoft Foundry','Foundry Agent Service','Azure OpenAI','Bedrock','SageMaker','ADK']},
 {id:'frontend',label:'Frontend & UI',aliases:['frontend','front end','ui','ux','ui ux','ux ui'],skills:['React','Angular','JavaScript','TypeScript','HTML','CSS','Vite','React Router','Tailwind CSS','Bootstrap','Figma','Responsive Design','Component Architecture','Web Animation','Framer Motion','Accessibility','UI/UX']},
 {id:'backend',label:'Backend & APIs',aliases:['backend','back end','full stack','fullstack'],skills:['Node.js','Express.js','NestJS','Fastify','FastAPI','ASP.NET Core','Spring Boot','Java','Go','REST APIs','GraphQL','Postman','Axios','API Integration','Asynchronous Programming','Middleware','Server-side Architecture','JWT','Authentication','WebSockets','OpenAPI','Background workers']},
 {id:'databases',label:'Databases & Data',aliases:['database','databases','data stores'],skills:['MongoDB','Mongoose','PostgreSQL','MySQL','SQL','Prisma','Redis','Elasticsearch','Neo4j','Data Modelling','Query Design','Vector Search','pgvector','Firestore','DynamoDB','Cosmos DB','BigQuery','DuckDB','TimescaleDB','SQLite','SQLAlchemy']},
 {id:'devops',label:'DevOps',aliases:['devops','ci cd','deployment'],skills:['Docker','Docker Compose','GitHub Actions','CI/CD','Kubernetes','Terraform','OpenTofu','Nginx','Deployment Automation','Containerisation','Infrastructure as Code','Azure DevOps','Cloud Build']},
 {id:'infrastructure',label:'Infrastructure',aliases:['infrastructure','infrastructure as code','iac'],skills:['Infrastructure as Code','Terraform','OpenTofu','Docker','Kubernetes','Cloud Run','Cloud SQL','IAM','Containerisation']},
 {id:'security',label:'Security & Authentication',aliases:['security','cybersecurity','cyber security','authentication'],skills:['JWT','Authentication','Authorization','RBAC','bcrypt','Protected Routes','API Security','Microsoft Entra ID','Managed Identity','Secrets Management','OAuth','OAuth2','Security Architecture','Spring Security','Microsoft Defender XDR','CloudTrail','IAM','KMS']},
 {id:'languages',label:'Languages & Core Engineering',aliases:['language','languages','programming languages'],skills:['JavaScript','TypeScript','Python','C++','C#','Java','Go','SQL','XAML']},
 {id:'testing',label:'Testing',aliases:['testing','tests','quality assurance'],skills:['k6','Toxiproxy','AI Evaluation','Vitest','pytest','JUnit','Playwright','Testing']},
 {id:'observability',label:'Observability',aliases:['observability','monitoring','telemetry'],skills:['Observability','OpenTelemetry','Prometheus','Grafana','Jaeger','CloudWatch','Cloud Logging','Cloud Monitoring','Azure Monitor','Application Insights']},
 {id:'automation',label:'Automation',aliases:['automation','workflows','orchestration'],skills:['Automation','n8n','Webhooks','BullMQ','RabbitMQ','Asynchronous Workflows','Workflows','Step Functions','Event-driven Architecture','Deployment Automation']},
 {id:'data',label:'Data Engineering',aliases:['data engineering','analytics'],skills:['BigQuery','DuckDB','SQL','Kafka','Redpanda','TimescaleDB','Pub/Sub','Kinesis','Data Modelling','Event-driven Architecture']},
 {id:'cloud',label:'Cloud',aliases:['cloud','cloud engineering'],skills:[]},
];
taxonomy.find(t=>t.id==='cloud').skills = [...new Set(taxonomy.filter(t=>['google','microsoft','aws'].includes(t.id)).flatMap(t=>t.skills))];
const key = s=>s.toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
export function relationships(technologies) {
 const keys=new Set(technologies.map(key));
 const matches=taxonomy.filter(t=>t.skills.some(s=>keys.has(key(s)))).map(t=>t.id);
 const vendors=taxonomy.filter(t=>['google','microsoft','aws'].includes(t.id));
 const ecosystems=vendors.filter(t=>t.skills.some(s=>keys.has(key(s))&&vendors.filter(v=>v.skills.includes(s)).length===1)).map(t=>t.id);
 return {ecosystems,categories:matches.filter(id=>!['google','microsoft','aws'].includes(id))};
}
export function expandQuery(text, available) {
 const matches=taxonomy.filter(t=>t.aliases.some(a=>` ${text} `.includes(` ${key(a)} `)));
 const vendors=matches.filter(t=>['google','microsoft','aws'].includes(t.id));
 // Vendor + AI queries are intersections, not all vendors' AI technologies.
 let terms=[...new Set(matches.flatMap(t=>t.skills))].filter(s=>available.includes(s));
 if(vendors.length)terms=terms.filter(s=>vendors.some(v=>v.skills.includes(s)));
 if(vendors.length&&matches.some(t=>t.id==='ai'))terms=terms.filter(s=>vendors.some(v=>v.skills.includes(s))&&taxonomy.find(t=>t.id==='ai').skills.includes(s));
 return {groups:matches.map(t=>t.id),terms};
}
