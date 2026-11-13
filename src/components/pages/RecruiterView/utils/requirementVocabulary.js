import { aliasesForSkill } from "../../../../data/skillNames.js";
import { skillRegistry } from "../../../../assistant/knowledge.js";

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const word = (s) => new RegExp(`(?<![a-z0-9])${escape(s)}(?![a-z0-9])`, "ig");
// Explicit products win over generic families through longest-span matching.
const overrides = {
  "Express.js":
    /\bexpress(?:\.js)?\b(?!\s+(?:themselves|yourself|ideas|clearly|our|their))/gi,
  Go: /\b(?:golang|Go)(?![- ]live)\b/g,
  Make: /\bMake(?:\.com|\s+(?:automation|platform|workflows?))\b|(?<=n8n\/)Make\b|\bMake(?=\s*[,/]|\s+or\s+Zapier)/g,
  "Google Cloud": /\b(?:google cloud(?: platform)?|gcp)\b/gi,
  "Google Gemini": /\b(?:google\s+)?gemini\b/gi,
  Anthropic: /\b(?:anthropic(?:\s+claude)?|claude(?:\s+api)?)\b/gi,
  "Node.js": /\bnode(?:\.js|js|\s*\.\s*js)?\b/gi,
  "Next.js": /\bnext(?:\.js|js)\b/gi,
  "REST APIs": /\brest(?:ful)?(?:\s+apis?)?\b/gi,
  "LLM Integration": /\b(?:llms?|large language models?|llm integration)\b/gi,
  "Agent orchestration":
    /\b(?:agent(?:ic)? orchestration|multi[- ]agent(?: orchestration)?|agent frameworks?|agentic ai|agents)\b/gi,
  "Infrastructure as Code": /\b(?:infrastructure[- ]as[- ]code|iac)\b/gi,
  "CI/CD":
    /\b(?:ci\s*\/\s*cd|continuous integration(?:\s+and\s+(?:continuous\s+)?delivery)?|continuous deployment)\b/gi,
  Git: /\bgit\b/gi,
  JSON: /\bjson\b/gi,
  "SQL Server": /\b(?:microsoft\s+)?sql server\b/gi,
  ".NET 8": /\.net\s*8(?:\.0)?\b/gi,
  ".NET Core": /\.net\s+core\b/gi,
  ".NET Framework": /\.net\s+framework\b/gi,
  ".NET MAUI": /\.net\s+maui\b/gi,
  "AWS IAM": /\baws\s+iam\b/gi,
  "GCP IAM": /\b(?:gcp|google cloud)\s+iam\b/gi,
  "Azure OpenAI": /\bazure\s+openai\b/gi,
  "Agile/Scrum": /\b(?:agile(?:\s*\/\s*scrum)?|scrum)\b/gi,
  TDD: /\b(?:tdd|test[- ]driven development)\b/gi,
  Containers: /\bcontainers?\b/gi,
  Networking:
    /\b(?:networking|network (?:design|architecture|engineering))\b/gi,
  "Vector Search": /\bvector (?:search|retrieval)\b/gi,
  "Vector databases": /\bvector[- ]databases?\b/gi,
  Testing: /\b(?:testing|automated tests?|unit tests?|integration tests?)\b/gi,
};
const extra = [
  "Fastify",
  "Next.js",
  "CloudFormation",
  "API Gateway",
  "LangGraph",
  "CrewAI",
  "MCP",
  "GitOps",
  "Bicep",
  "Jest",
  "Vitest",
  "Datadog",
  "CKA",
  "CKAD",
  "Salesforce",
  "SAP",
  "Rust",
  "Ruby",
  "Rails",
  "PHP",
  "Swift",
  "Scala",
  "Snowflake",
  "Databricks",
  "Hadoop",
  "Tableau",
  "Power BI",
  "Kubernetes",
  "OpenAPI",
  "GitHub",
  "HTML",
  "CSS",
  "Terraform",
  "n8n",
  "Zapier",
];
const excluded = new Set([
  "AI",
  "Cloud",
  "Code",
  "Data",
  "Security",
  "Automation",
  "Workflow",
  "Workflows",
  "Tool calling",
  "Workflow orchestration",
  "REST",
  "Claude API",
  "Gemini",
  "Multi-agent orchestration",
  "Agentic AI",
  "IAM",
  "AI Evaluation",
  "Observability",
  "API Integration",
  "System Design",
  "Prompt Engineering",
  "Context Engineering",
  "Async Programming",
]);
export const technologyVocabulary = [
  ...new Set([
    ...skillRegistry.map((s) => s.name),
    ...extra,
    ...Object.keys(overrides),
  ]),
]
  .filter(
    (n) => ![...excluded].some((e) => e.toLowerCase() === n.toLowerCase()),
  )
  .map((name) => ({ name, pattern: overrides[name] || new RegExp([name, ...aliasesForSkill(name)].map(value => word(value).source).join('|'), 'ig') }));

export function technologyMentions(text) {
  const matches = technologyVocabulary.flatMap(({ name, pattern }) =>
    [...text.matchAll(new RegExp(pattern.source, pattern.flags))].map((m) => ({
      name,
      start: m.index,
      end: m.index + m[0].length,
      phrase: m[0],
    })),
  );
  const selected = [];
  for (const m of matches.sort((a, b) => b.end - b.start - (a.end - a.start))) {
    if (!selected.some((s) => m.start < s.end && s.start < m.end))
      selected.push(m);
  }
  for (const mention of selected) {
    const suffix = text
      .slice(mention.end)
      .match(/^\s+v?(\d+(?:\.\d+)*)(?!\s*years?\b)/i);
    if (suffix && !/\d$/.test(mention.name)) {
      mention.baseName = mention.name;
      mention.name += ` ${suffix[1]}`;
      mention.end += suffix[0].length;
      mention.phrase = text.slice(mention.start, mention.end);
    }
  }
  // Words used as proper team names are not capability requests.
  return selected
    .filter(
      (m) =>
        !/\b(?:team|called|named)\s+[“"']?[^.!?]*$/i.test(
          text.slice(0, m.start),
        ) || !/^(Cloud|Data|Code)$/.test(m.name),
    )
    .sort((a, b) => a.start - b.start);
}

// Responsibilities have their own evidence and never inherit a generic project flag.
export const responsibilities = [
  [
    "End-to-end delivery",
    /\b(?:end[- ]to[- ]end|independent(?:ly)? (?:feature |software )?delivery|own(?:ership of)? (?:the )?(?:full |feature |project )?lifecycle)\b/i,
  ],
  [
    "Architecture and technical decisions",
    /\b(?:architect(?:ure|ural|ing)?|system design|technical decisions?|service boundaries)\b/i,
  ],
  [
    "Debugging and troubleshooting",
    /\b(?:debug(?:ging)?|troubleshoot(?:ing)?)\b/i,
  ],
  [
    "Code review and quality",
    /\b(?:code reviews?|code quality|maintainable code)\b/i,
  ],
  [
    "Third-party integration",
    /\b(?:third[- ]party integrat\w*|external (?:api|service) integrat\w*|integrat\w* (?:third[- ]party|external) (?:apis?|services?))\b/i,
  ],
  [
    "API design",
    /\b(?:api (?:design|contracts?)|design(?:ing)? (?:rest |restful )?apis?)\b/i,
  ],
  [
    "Async programming",
    /\b(?:async(?:hronous)? (?:programming|processing|jobs?|messaging)|async\/await)\b/i,
  ],
  [
    "Database design and optimisation",
    /\b(?:database (?:design|optimisation|optimization)|data modell?ing|design(?:ing)? (?:relational )?(?:databases?|schemas?))\b/i,
  ],
  ["Deployment", /\b(?:deploy(?:ment|ing)?|release management)\b/i],
  [
    "Monitoring and observability",
    /\b(?:observability|monitoring|telemetry)\b/i,
  ],
  ["Maintenance", /\b(?:maintain(?:ing)?|maintenance)\b/i],
  [
    "Legacy modernisation",
    /\b(?:legacy(?:[- ]system)?|technical[- ]debt|moderni[sz]ation|re[- ]platforming)\b/i,
  ],
  [
    "Production support and incidents",
    /\b(?:production support|incident (?:handling|response|management)|on[- ]call)\b/i,
  ],
  [
    "Live-system migration",
    /\b(?:live[- ](?:system|volume)|high[- ]volume|migration|migrat\w* (?:live|production))\b/i,
  ],
  [
    "Operational scale",
    /\b(?:thousands|millions|\d[\d,]*\s+(?:concurrent )?(?:users|transactions)|at scale|high[- ]traffic)\b/i,
  ],
  [
    'Leadership and delivery responsibility',
    /\b(?:leadership|led|co-founder|founder|delivery responsibility|operational leadership|lead(?:ing)? (?:digital|technical) (?:systems|delivery))\b/i,
  ],
  [
    "Technical leadership and mentoring",
    /\b(?:technical leadership|mentor(?:ing)?|lead(?:ing)? (?:a |the )?(?:engineering |technical )?team|enablement)\b/i,
  ],
  [
    "Customer advisory and consulting",
    /\b(?:customer[- ](?:facing|advisory)|consult(?:ing|ancy)|architecture guidance|advis(?:e|ory))\b/i,
  ],
  [
    "Cross-functional collaboration",
    /\b(?:cross[- ]functional|collaborat\w*|clinical (?:teams|collaboration))\b/i,
  ],
  [
    "Stakeholder communication",
    /\b(?:non[- ]technical|stakeholders?|communicat\w*|express themselves clearly)\b/i,
  ],
  [
    "Process discovery",
    /\b(?:process discovery|business problem|business requirements|process improvement|translat\w* (?:business|operational))\b/i,
  ],
  [
    "Documentation",
    /\b(?:documentation|document(?:ing)? (?:systems?|decisions?|apis?)|maintainability)\b/i,
  ],
  [
    "Measured outcomes",
    /\b(?:measur(?:ed|able) (?:outcomes?|impact)|business outcomes|cost savings)\b/i,
  ],
  [
    "Security",
    /\b(?:security (?:engineering|controls|requirements|practices)|secure (?:applications?|systems?|apis?)|cybersecurity)\b/i,
  ],
  ["Encryption at rest", /\bencrypt(?:ion|ed) (?:data )?at rest\b/i],
  [
    "Encryption in transit",
    /\b(?:encrypt(?:ion|ed) (?:data )?in transit|tls|https)\b/i,
  ],
  ["Prompt engineering", /\b(?:prompt engineering|prompts?|prompting)\b/i],
  ["Context engineering", /\bcontext (?:engineering|management|windows?)\b/i],
  ["Tool calling", /\btool (?:calling|use)\b/i],
  [
    "AI evaluation and safety",
    /\b(?:(?:ai|agent|model|llm|generation) (?:evaluation|reliability|safety|tests?)|evaluat\w* (?:ai|agents?|models?|llms?)|safety tests?)\b/i,
  ],
  ["Provider selection", /\b(?:model|provider)[- /](?:provider )?selection\b/i],
  [
    "Latency and cost optimisation",
    /\b(?:latency|cost optimi[sz]ation|token costs?)\b/i,
  ],
  ["Fine-tuning", /\bfine[- ]tun(?:e|ing)\b/i],
  [
    "Production AI operations",
    /\b(?:production (?:ai|llm)|(?:ai|agent|llm) production (?:operations?|monitoring))\b/i,
  ],
  [
    "Team AI coding standards",
    /\b(?:team[- ](?:wide )?ai|ai coding standards|team ai standards)\b/i,
  ],
  ["AI-assisted development", /\bai[- ]assisted (?:development|coding)\b/i],
  [
    "Cloud foundations and landing zones",
    /\b(?:cloud foundations?|landing zones?)\b/i,
  ],
  ["Cloud governance", /\b(?:governance|resource organi[sz]ation)\b/i],
  ["IAM", /\b(?:iam|identity and access management)\b/i],
  ["IaC lifecycle management", /\b(?:iac|infrastructure)[^.;]*\blifecycle\b/i],
  [
    "Kubernetes cluster operations",
    /\b(?:cluster operations?|operat\w* (?:kubernetes )?clusters?)\b/i,
  ],
  ["SRE", /\b(?:sre|site reliability engineering)\b/i],
  [
    "Data transformation and validation",
    /\bdata (?:transformation|validation|normalisation|normalization)\b/i,
  ],
  [
    "Cloud",
    /\bcloud (?:engineering|experience|providers?|platforms?|services?)\b/i,
  ],
];
