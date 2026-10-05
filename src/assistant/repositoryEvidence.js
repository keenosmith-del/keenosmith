// Curated source audit, 5 October 2026. Runtime never fetches repositories.
export const repositoryEvidence = [
  {
    "id": "ai-assistant",
    "repository": "https://github.com/keenosmith-del/ai-entity",
    "technologies": [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "RAG",
      "Embeddings",
      "Vector Search",
      "JavaScript"
    ],
    "description": "",
    "evidence": [
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/ai-entity/blob/50ceaf6/backend/src/server.js",
        "strength": "direct",
        "revision": "50ceaf6",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/ai-entity/blob/50ceaf6/backend/src/config/db.js",
        "strength": "direct",
        "revision": "50ceaf6",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/ai-entity/blob/50ceaf6/backend/src/utils/cosineSimilarity.js",
        "strength": "direct",
        "revision": "50ceaf6",
        "inspectedOn": "2026-10-05"
      }
    ]
  },
  {
    "id": "productivity-platform",
    "repository": "https://github.com/keenosmith-del/personal-productivity-desktop",
    "technologies": [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "bcrypt",
      "Tailwind CSS",
      "Framer Motion"
    ],
    "description": "",
    "evidence": [
      {
        "type": "configuration",
        "source": "https://github.com/keenosmith-del/personal-productivity-desktop/blob/cc3ab00/backend/package.json",
        "strength": "supporting",
        "revision": "cc3ab00",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "configuration",
        "source": "https://github.com/keenosmith-del/personal-productivity-desktop/blob/cc3ab00/frontend/package.json",
        "strength": "supporting",
        "revision": "cc3ab00",
        "inspectedOn": "2026-10-05"
      }
    ]
  },
  {
    "id": "music-api",
    "repository": "https://github.com/keenosmith-del/music-api",
    "technologies": [
      "API Integration",
      "REST APIs"
    ],
    "description": "",
    "evidence": [
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/music-api/blob/4ef9fd9/backend/services/providers/spotifyService.js",
        "strength": "direct",
        "revision": "4ef9fd9",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/music-api/blob/4ef9fd9/backend/services/providers/deezerService.js",
        "strength": "direct",
        "revision": "4ef9fd9",
        "inspectedOn": "2026-10-05"
      }
    ]
  },
  {
    "id": "enterprise-workspace",
    "repository": "https://github.com/keenosmith-del/enterprise-workspace",
    "technologies": [
      "Prisma",
      "PostgreSQL",
      "SQL"
    ],
    "description": "",
    "evidence": [
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/enterprise-workspace/blob/3f7be4d/server/prisma.config.ts",
        "strength": "direct",
        "revision": "3f7be4d",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/enterprise-workspace/blob/3f7be4d/server/seed.js",
        "strength": "direct",
        "revision": "3f7be4d",
        "inspectedOn": "2026-10-05"
      }
    ]
  },
  {
    "id": "microsoft",
    "repository": "https://github.com/keenosmith-del/microsoft-ai-powered-software-engineering-devops",
    "technologies": [
      "Azure",
      "Microsoft Foundry",
      "Agentic AI",
      "Multi-agent orchestration",
      "Tool calling",
      "Python",
      "FastAPI",
      "TypeScript",
      "Azure Monitor",
      "Managed Identity",
      "RAG",
      "Embeddings",
      "Ollama"
    ],
    "description": "Sequential specialist agents, durable investigations, GitHub/Azure evidence, telemetry queries and cited knowledge retrieval are implemented. External remediation is recorded manually; automated deployment and code changes remain outside the active runtime.",
    "evidence": [
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/microsoft-ai-powered-software-engineering-devops/blob/0b75c8a/agent-runtime/main.py",
        "strength": "direct",
        "revision": "0b75c8a",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/microsoft-ai-powered-software-engineering-devops/blob/0b75c8a/agent-runtime/agents/foundry_client.py",
        "strength": "direct",
        "revision": "0b75c8a",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/microsoft-ai-powered-software-engineering-devops/blob/0b75c8a/agent-runtime/tools/azure_tool.py",
        "strength": "direct",
        "revision": "0b75c8a",
        "inspectedOn": "2026-10-05"
      }
    ]
  },
  {
    "id": "banking-risk",
    "repository": "https://github.com/keenosmith-del/aws-ai-banking-and-payment-risk",
    "technologies": [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "AWS",
      "Bedrock",
      "SageMaker",
      "S3",
      "SQS",
      "EventBridge",
      "Secrets Manager",
      "Terraform",
      "Infrastructure as Code"
    ],
    "description": "Built local banking decision platform with persisted review workflows and optional AWS SDK adapters. Cloud adapters and infrastructure definitions are implemented; live AWS deployment is not verified. Earlier portfolio scope including DynamoDB and Kinesis remains planned scope.",
    "evidence": [
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/aws-ai-banking-and-payment-risk/blob/5a264ba/apps/api/src/aws-providers.ts",
        "strength": "direct",
        "revision": "5a264ba",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "configuration",
        "source": "https://github.com/keenosmith-del/aws-ai-banking-and-payment-risk/blob/5a264ba/infrastructure/events/main.tf",
        "strength": "supporting",
        "revision": "5a264ba",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "configuration",
        "source": "https://github.com/keenosmith-del/aws-ai-banking-and-payment-risk/blob/5a264ba/apps/api/package.json",
        "strength": "supporting",
        "revision": "5a264ba",
        "inspectedOn": "2026-10-05"
      }
    ]
  },
  {
    "id": "vertex-ai-retail",
    "repository": "https://github.com/keenosmith-del/gcp-ai-retail-and-supply-chain",
    "technologies": [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "DuckDB",
      "Google Cloud",
      "Vertex AI",
      "BigQuery",
      "Pub/Sub",
      "Cloud Storage",
      "Google Gemini",
      "Cloud Run",
      "Cloud SQL",
      "Secret Manager",
      "Artifact Registry",
      "Cloud Build",
      "Cloud Monitoring",
      "Cloud Logging",
      "IAM",
      "Terraform",
      "Infrastructure as Code",
      "AI Evaluation"
    ],
    "description": "Built local forecasting, inventory planning and approval system with PostgreSQL-backed operational calculations. BigQuery, Pub/Sub, Cloud Storage, Vertex AI and Gemini providers plus Google Cloud Terraform definitions are implemented; live cloud deployment is not verified.",
    "evidence": [
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/gcp-ai-retail-and-supply-chain/blob/a6e1c2a/apps/api/retail/providers/analytics.py",
        "strength": "direct",
        "revision": "a6e1c2a",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/gcp-ai-retail-and-supply-chain/blob/a6e1c2a/apps/api/retail/providers/events.py",
        "strength": "direct",
        "revision": "a6e1c2a",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/gcp-ai-retail-and-supply-chain/blob/a6e1c2a/apps/api/retail/providers/explanations.py",
        "strength": "direct",
        "revision": "a6e1c2a",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/gcp-ai-retail-and-supply-chain/blob/a6e1c2a/apps/api/retail/services/forecasting.py",
        "strength": "direct",
        "revision": "a6e1c2a",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "configuration",
        "source": "https://github.com/keenosmith-del/gcp-ai-retail-and-supply-chain/blob/a6e1c2a/infrastructure/main.tf",
        "strength": "supporting",
        "revision": "a6e1c2a",
        "inspectedOn": "2026-10-05"
      }
    ]
  },
  {
    "id": "ollama",
    "repository": "https://github.com/keenosmith-del/ollama-private-business-intelligence",
    "technologies": [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Ollama",
      "Qwen",
      "RAG",
      "Embeddings",
      "Vector Search",
      "Local inference",
      "Authentication"
    ],
    "description": "Integrated local BI demonstrator with parameterised SQL analytics, document extraction, local embeddings and grounded Ollama generation.",
    "evidence": [
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/ollama-private-business-intelligence/blob/189b77d/ai-runtime/app/main.py",
        "strength": "direct",
        "revision": "189b77d",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/ollama-private-business-intelligence/blob/189b77d/ai-runtime/app/analytics.py",
        "strength": "direct",
        "revision": "189b77d",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/ollama-private-business-intelligence/blob/189b77d/backend/src/app.ts",
        "strength": "direct",
        "revision": "189b77d",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/ollama-private-business-intelligence/blob/189b77d/backend/src/security.ts",
        "strength": "direct",
        "revision": "189b77d",
        "inspectedOn": "2026-10-05"
      }
    ]
  },
  {
    "id": "claude",
    "repository": "https://github.com/keenosmith-del/claude-powered-legal-procurement-intelligence",
    "technologies": [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Anthropic",
      "Claude API",
      "Structured outputs",
      "Document processing",
      "AI Evaluation"
    ],
    "description": "Built procurement workspace with document extraction, supplier comparison, official Anthropic SDK integration, structured analysis and human review. Live Claude inference depends on credentials and is not verified by this source audit.",
    "evidence": [
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/claude-powered-legal-procurement-intelligence/blob/7ad4b67/backend/src/app.ts",
        "strength": "direct",
        "revision": "7ad4b67",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/claude-powered-legal-procurement-intelligence/blob/7ad4b67/backend/src/analysis.ts",
        "strength": "direct",
        "revision": "7ad4b67",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/claude-powered-legal-procurement-intelligence/blob/7ad4b67/backend/src/documents.ts",
        "strength": "direct",
        "revision": "7ad4b67",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/claude-powered-legal-procurement-intelligence/blob/7ad4b67/backend/src/migrate.ts",
        "strength": "direct",
        "revision": "7ad4b67",
        "inspectedOn": "2026-10-05"
      }
    ]
  },
  {
    "id": "hugging-face",
    "repository": "https://github.com/keenosmith-del/hugging-face-ai-insurance-claims",
    "technologies": [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Hugging Face",
      "Transformers",
      "PyTorch",
      "OpenCV",
      "OCR",
      "NER",
      "Embeddings",
      "Computer vision",
      "NLP",
      "Authentication"
    ],
    "description": "Built multimodal claims prototype with OCR, named entities, image/model pipelines, semantic embeddings and persisted human reviews. General models support evidence review, not automated claim approval.",
    "evidence": [
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/hugging-face-ai-insurance-claims/blob/0ea4cc3/ai-service/app/pipelines/ner.py",
        "strength": "direct",
        "revision": "0ea4cc3",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/hugging-face-ai-insurance-claims/blob/0ea4cc3/ai-service/app/pipelines/image_analysis.py",
        "strength": "direct",
        "revision": "0ea4cc3",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/hugging-face-ai-insurance-claims/blob/0ea4cc3/ai-service/app/pipelines/ocr.py",
        "strength": "direct",
        "revision": "0ea4cc3",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/hugging-face-ai-insurance-claims/blob/0ea4cc3/ai-service/app/pipelines/embeddings.py",
        "strength": "direct",
        "revision": "0ea4cc3",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/hugging-face-ai-insurance-claims/blob/0ea4cc3/server/src/app.ts",
        "strength": "direct",
        "revision": "0ea4cc3",
        "inspectedOn": "2026-10-05"
      }
    ]
  },
  {
    "id": "distributed-reliability",
    "repository": "https://github.com/keenosmith-del/sre-chaos-engineering",
    "technologies": [
      "React",
      "TypeScript",
      "Go",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "Docker",
      "Kubernetes",
      "k6",
      "Toxiproxy",
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
      "Jaeger",
      "Observability",
      "Distributed Systems",
      "Event-driven Architecture"
    ],
    "description": "Built local distributed commerce and reliability control plane with durable sagas, transactional outbox, bounded chaos tests, real metrics and isolated database restore. Kubernetes manifests are present; runner parity and live cluster operation are not verified.",
    "evidence": [
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/sre-chaos-engineering/blob/dec5fc7/services/ordering/service.go",
        "strength": "direct",
        "revision": "dec5fc7",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "configuration",
        "source": "https://github.com/keenosmith-del/sre-chaos-engineering/blob/dec5fc7/go.mod",
        "strength": "supporting",
        "revision": "dec5fc7",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "configuration",
        "source": "https://github.com/keenosmith-del/sre-chaos-engineering/blob/dec5fc7/deploy/kubernetes/platform.json",
        "strength": "supporting",
        "revision": "dec5fc7",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/sre-chaos-engineering/blob/dec5fc7/scripts/recovery.py",
        "strength": "direct",
        "revision": "dec5fc7",
        "inspectedOn": "2026-10-05"
      }
    ]
  },
  {
    "id": "n8n",
    "repository": "https://github.com/keenosmith-del/n8n-workflow-integration-opsflow",
    "technologies": [
      "React",
      "TypeScript",
      "NestJS",
      "n8n",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "RabbitMQ",
      "Webhooks",
      "OpenAPI",
      "JSON Schema",
      "OpenTelemetry",
      "OpenTofu",
      "Infrastructure as Code",
      "Automation",
      "Authentication"
    ],
    "description": "Built workflow operations console with NestJS, persisted approvals, encrypted integration credentials, real n8n workflow definitions, queue processing and local OpenTofu infrastructure.",
    "evidence": [
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/n8n-workflow-integration-opsflow/blob/031af48/apps/api/src/main.ts",
        "strength": "direct",
        "revision": "031af48",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/n8n-workflow-integration-opsflow/blob/031af48/apps/api/src/operations.ts",
        "strength": "direct",
        "revision": "031af48",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "configuration",
        "source": "https://github.com/keenosmith-del/n8n-workflow-integration-opsflow/blob/031af48/workflows/procurement-collect-v1.json",
        "strength": "supporting",
        "revision": "031af48",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "configuration",
        "source": "https://github.com/keenosmith-del/n8n-workflow-integration-opsflow/blob/031af48/infra/tofu/main.tf",
        "strength": "supporting",
        "revision": "031af48",
        "inspectedOn": "2026-10-05"
      }
    ]
  },
  {
    "id": "deepseek",
    "repository": "https://github.com/keenosmith-del/deepseek-ai-workforce-planning",
    "technologies": [
      "React",
      "TypeScript",
      "C#",
      "ASP.NET Core",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Ollama",
      "DeepSeek",
      "Embeddings",
      "Vector Search",
      "Local inference",
      "JWT",
      "RBAC",
      "OpenTofu",
      "Infrastructure as Code"
    ],
    "description": "Built local workforce demonstrator with authoritative ASP.NET APIs, private document processing, pgvector taxonomy retrieval and Ollama-hosted DeepSeek reasoning; human reviewers own decisions.",
    "evidence": [
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/deepseek-ai-workforce-planning/blob/4a2f03b/backend/Program.cs",
        "strength": "direct",
        "revision": "4a2f03b",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/deepseek-ai-workforce-planning/blob/4a2f03b/backend/Application/Services.cs",
        "strength": "direct",
        "revision": "4a2f03b",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/deepseek-ai-workforce-planning/blob/4a2f03b/ai/app.py",
        "strength": "direct",
        "revision": "4a2f03b",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "configuration",
        "source": "https://github.com/keenosmith-del/deepseek-ai-workforce-planning/blob/4a2f03b/infra/main.tf",
        "strength": "supporting",
        "revision": "4a2f03b",
        "inspectedOn": "2026-10-05"
      }
    ]
  },
  {
    "id": "telecom-billing",
    "repository": "https://github.com/keenosmith-del/telecomms-billing-management",
    "technologies": [
      "Angular",
      "TypeScript",
      "Java",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "Kafka",
      "Redis",
      "JWT",
      "Event-driven Architecture"
    ],
    "description": "Built Angular/Java billing demonstrator with authenticated portals, usage ingestion, Kafka outbox processing, subscriptions and auditable invoice calculations.",
    "evidence": [
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/telecomms-billing-management/blob/3985c0f/backend/src/main/java/com/telecom/Application.java",
        "strength": "direct",
        "revision": "3985c0f",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/telecomms-billing-management/blob/3985c0f/backend/src/main/java/com/telecom/security/SecurityConfig.java",
        "strength": "direct",
        "revision": "3985c0f",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/telecomms-billing-management/blob/3985c0f/backend/src/main/java/com/telecom/metering/KafkaConfig.java",
        "strength": "direct",
        "revision": "3985c0f",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "configuration",
        "source": "https://github.com/keenosmith-del/telecomms-billing-management/blob/3985c0f/backend/pom.xml",
        "strength": "supporting",
        "revision": "3985c0f",
        "inspectedOn": "2026-10-05"
      }
    ]
  },
  {
    "id": "field-service",
    "repository": "https://github.com/keenosmith-del/field-service-and-asset-maintenance",
    "technologies": [
      "Angular",
      "C#",
      "ASP.NET Core",
      ".NET MAUI",
      "XAML",
      "MVVM",
      "PostgreSQL",
      "SQLite",
      "JWT",
      "Authentication"
    ],
    "description": "Built dispatch and maintenance journey with Angular supervision, ASP.NET APIs and MAUI technician source implementing a durable offline SQLite outbox. Native device execution is not verified by this audit.",
    "evidence": [
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/field-service-and-asset-maintenance/blob/7d875eb/api/FieldService.Api/Program.cs",
        "strength": "direct",
        "revision": "7d875eb",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/field-service-and-asset-maintenance/blob/7d875eb/api/FieldService.Api/Auth.cs",
        "strength": "direct",
        "revision": "7d875eb",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/field-service-and-asset-maintenance/blob/7d875eb/mobile/FieldService.Mobile.Core/OfflineStore.cs",
        "strength": "direct",
        "revision": "7d875eb",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/field-service-and-asset-maintenance/blob/7d875eb/mobile/FieldService.Mobile/JobViewModel.cs",
        "strength": "direct",
        "revision": "7d875eb",
        "inspectedOn": "2026-10-05"
      }
    ]
  },
  {
    "id": "fleet-operations",
    "repository": "https://github.com/keenosmith-del/real-time-logistics-and-fleet-ops",
    "technologies": [
      "React",
      "TypeScript",
      "Go",
      "PostgreSQL",
      "TimescaleDB",
      "Redis",
      "Kafka",
      "Redpanda",
      "WebSockets",
      "Prometheus",
      "Grafana",
      "Observability",
      "Event-driven Architecture"
    ],
    "description": "Built fleet dispatcher with Go APIs, live WebSockets, Redpanda consumers, TimescaleDB history, Redis positions and pipeline metrics.",
    "evidence": [
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/real-time-logistics-and-fleet-ops/blob/a961610/backend/internal/platform/stream.go",
        "strength": "direct",
        "revision": "a961610",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/real-time-logistics-and-fleet-ops/blob/a961610/backend/internal/platform/metrics.go",
        "strength": "direct",
        "revision": "a961610",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "source-code",
        "source": "https://github.com/keenosmith-del/real-time-logistics-and-fleet-ops/blob/a961610/backend/internal/platform/models.go",
        "strength": "direct",
        "revision": "a961610",
        "inspectedOn": "2026-10-05"
      },
      {
        "type": "configuration",
        "source": "https://github.com/keenosmith-del/real-time-logistics-and-fleet-ops/blob/a961610/backend/go.mod",
        "strength": "supporting",
        "revision": "a961610",
        "inspectedOn": "2026-10-05"
      }
    ]
  }
];
