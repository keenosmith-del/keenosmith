// Gallery-specific emphasis. Full technology/evidence lists remain in the shared
// project model; these selections identify what makes each implementation distinct.
export { galleryProjectIds } from '../../../../data/projectEvidence.js';
const tile = (topSkills, tileSkills, visibility) => ({ topSkills, tileSkills, visibility });
export const exploreProjectPresentation = {
  'crewai-revenueops': tile(['CrewAI'], ['Python', 'Pydantic', 'Ollama', 'SQLAlchemy'], 'title-pills'),
  'eventops-streamlit': tile(['Streamlit'], ['n8n', 'FastEmbed', 'Google Gemini', 'SQLite'], 'details'),
  'ms-assessflow': tile(['Microsoft Foundry'], ['FastAPI', 'JWT', 'Bicep', 'OIDC'], 'details'),
  microsoft: tile(['Microsoft Foundry', 'Azure OpenAI'], ['Python', 'FastAPI', 'MongoDB', 'GitHub APIs'], 'title-details'),
  'banking-risk': tile(['PostgreSQL', 'Zod'], ['Prisma', 'Terraform', 'EventBridge', 'Idempotency'], 'details'),
  'vertex-ai-retail': tile(['scikit-learn', 'OR-Tools'], ['FastAPI', 'DuckDB', 'BigQuery', 'Vertex AI'], 'title-details'),
  ollama: tile(['Ollama', 'pgvector'], ['Qwen', 'FastAPI', 'PostgreSQL', 'RAG'], 'details'),
  claude: tile(['Anthropic', 'Structured outputs'], ['Tool calling', 'PDF Parse', 'Mammoth', 'PostgreSQL'], 'details'),
  'hugging-face': tile(['Hugging Face', 'Transformers'], ['PyTorch', 'OCR', 'NER', 'OpenCV'], 'details'),
  'distributed-reliability': tile(['Go', 'OpenTelemetry'], ['Toxiproxy', 'k6', 'RabbitMQ', 'Prometheus'], 'title-details'),
  n8n: tile(['n8n', 'NestJS'], ['BullMQ', 'RabbitMQ', 'Prisma', 'Webhooks'], 'title-details'),
  deepseek: tile(['DeepSeek', 'ASP.NET Core'], ['Ollama', 'pgvector', 'EF Core', 'FastAPI'], 'title-details'),
  'telecom-billing': tile(['Java', 'Spring Boot'], ['Kafka', 'Spring Data JPA', 'Redis', 'Angular'], 'title-details'),
  'field-service': tile(['.NET MAUI', 'Angular'], ['SQLite', 'EF Core', 'MVVM', 'Idempotency'], 'details'),
  'fleet-operations': tile(['Go', 'Redpanda'], ['TimescaleDB', 'WebSockets', 'MapLibre GL', 'Redis'], 'title-details'),
  'productivity-platform': tile(['MongoDB', 'Mongoose'], ['React', 'Express.js', 'JWT', 'Tailwind CSS'], 'details'),
  'music-api': tile(['Node.js', 'REST APIs'], ['MongoDB', 'Axios', 'React Router', 'Framer Motion'], 'details'),
  'enterprise-workspace': tile(['SQL', 'Data Modelling'], ['Prisma', 'PostgreSQL', 'React Router', 'REST APIs'], 'details'),
  'ai-assistant': tile(['RAG', 'ONNX'], ['Groq', 'Embeddings', 'Vector Search', 'MongoDB'], 'details'),
  'manufacturing-qc': tile(['TensorFlow', 'ONNX Runtime'], ['Rust', 'Axum', 'Firestore', 'Computer vision'], 'details'),
  'customer-operations': tile(['RabbitMQ', 'LLMOps'], ['Prisma', 'Zod', 'AI Evaluation', 'Prompt Engineering'], 'details'),
  'eventops-intelligence': tile(['LangGraph', 'pgvector'], ['Google Gemini', 'FastAPI', 'RAG', 'PostgreSQL'], 'details'),
};
