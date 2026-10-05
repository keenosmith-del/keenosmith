// Additional CV evidence stays supporting: architecture descriptions do not prove delivery.
export const cvSkillEvidence = [
 {source:'src/components/pages/CV/CV.jsx:923',technologies:['Compute Engine','Google Kubernetes Engine','Cloud Storage','Cloud Run','Cloud Functions','Cloud SQL','Firestore','BigQuery','Vertex AI','Google Gemini','Artifact Registry','Cloud Build','IAM']},
 {source:'src/components/pages/CV/CV.jsx:1242',technologies:['ADK','Cloud KMS','Dataplex','Gemini','Vertex AI','BigQuery','Cloud Run']},
 {source:'src/components/pages/CV/CV.jsx:1682',technologies:['Azure OpenAI','Bedrock','Bedrock AgentCore','SageMaker','Serverless Architecture','Containerisation','Event-driven Architecture']},
];
export const additionalProjects = [
 {id:'geospatial-intelligence',title:'Real-Time Geospatial Event Intelligence',repository:'https://github.com/keenosmith-del/gcp-real-time-geospatial-event-intelligence',revision:'77d951e',description:'Early-development repository documents geospatial ingestion, anomaly analysis and human-reviewed Google Cloud AI workflows. No implementation source was present in the inspected snapshot.',technologies:['Google Cloud','Google Gemini']},
 {id:'aws-data-pipeline',title:'Intelligent Data Pipeline & Anomaly Investigation',repository:'https://github.com/keenosmith-del/aws-intelligent-data-pipeline-anomaly-investigation',revision:'21f547f',description:'Early-development repository documents cloud data ingestion and explainable anomaly investigation goals. No implementation source was present in the inspected snapshot.',technologies:['AWS','Data Modelling']},
 {id:'azure-cyber-threat',title:'Autonomous Cyber Threat Investigation & Response',repository:'https://github.com/keenosmith-del/microsoft-autonomous-cyber-threat-investigation-response',revision:'3bb27f0',description:'Early-development repository documents security investigation and controlled response goals with Azure and Foundry. No implementation source was present in the inspected snapshot.',technologies:['Azure','Microsoft Foundry','Security Architecture']},
].map(p=>({...p,path:'/cv',status:'Early development · Implementation not confirmed',demonstrated:false,evidence:[{type:'repository-documentation',source:`${p.repository}/blob/${p.revision}/README.md`,strength:'supporting',inspectedOn:'2026-10-05'}]}));

export const repositoryDocumentationEvidence = [
 ['cv-1','microsoft-ai-cloud-architect-finops-optimization','9b7ae1e'],
 ['cv-2','aws-cloud-security-incident-response','99e8fb2'],
 ['cv-5','gcp-data-governance-compliance','54d27b0'],
].map(([id,repository,revision])=>({id,type:'repository-documentation',source:`https://github.com/keenosmith-del/${repository}/blob/${revision}/README.md`,strength:'supporting',inspectedOn:'2026-10-05',scope:'Early development; no implementation source in snapshot'}));
