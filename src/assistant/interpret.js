import { skills, projects, exactToolRecords } from "./knowledge.js";
import { expandQuery } from "./taxonomy.js";
export const normalize = (s) =>
  s
    .toLowerCase()
    .replace(/react\.?js\b/g, "react")
    .replace(/nodejs\b/g, "node.js")
    .replace(/frontends?\b/g, "frontend")
    .replace(/backends?\b/g, "backend")
    .replace(/[^a-z0-9+#.]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
const aliases = {
  React: ["reactjs", "react.js", "raect"],
  JavaScript: ["js", "ecmascript"],
  Python: ["py"],
  Azure: ["microsoft azure"],
  "Distributed Systems": ["distributed architecture", "distributed computing"],
  "Node.js": ["node", "nodejs"],
  "Express.js": ["express"],
  "Google Cloud": ["gcp"],
  "Agentic AI": ["agents", "agent", "multi agent"],
  "LLM Integration": [
    "ai powered",
    "artificial intelligence",
    "ai applications",
  ],
  "REST APIs": ["rest", "restful"],
  "Microsoft Foundry": ["foundry"],
  "Google Gemini": ["gemini"],
  "Hugging Face": ["huggingface"],
  TypeScript: ["typescript", "typscript"],
};
export const contains = (text, term) =>
  ` ${normalize(text)} `.includes(` ${normalize(term)} `);
export function interpret(raw, context = {}) {
  const text = normalize(raw.slice(0, 16000));
  let entities = skills.filter((s) =>
    [s, ...(aliases[s] || [])].some((a) => contains(text, a)),
  );
  // One-edit tolerance only for long technology tokens, never short acronyms.
  if (!entities.length)
    for (const token of text.split(" "))
      if (token.length >= 5) {
        const match = skills.find(
          (s) =>
            !s.includes(" ") &&
            normalize(s).length >= 5 &&
            oneEdit(token, normalize(s)),
        );
        if (match) entities.push(match);
      }
  for (const [name, record] of Object.entries(exactToolRecords))
    if ([name, ...(record.aliases || [])].some(a => contains(text, a))) entities.push(name);
  let expansion = expandQuery(text, skills);
  // An exact tool question does not expand into every skill in its domain.
  if (entities.length && !/\b(platforms|technologies|skills|ecosystem|systems|applications|engineering|agents|databases|cloud|infrastructure|automation|security|observability|testing)\b/.test(text) && !['Azure', 'AWS', 'Google Cloud', 'Microsoft Foundry'].some(s => entities.includes(s))) expansion = {groups: [], terms: []};
  const specificMatch = /(?:experience with|work(?:ed|s)? with|(?:know|use|used|using|build|deploy|design|demonstrate)\s+)\s*(.+?)(?:\?|$)/i.exec(raw);
  const unmatchedTool = !/\b(it|that|those|them)\b/.test(text) && !entities.length && !expansion.groups.length && specificMatch ? specificMatch[1].replace(/[?.!]+$/, '').trim() : null;
  const duration = /how long|duration/.test(text) || /how (?:much|many)|years? (?:of|with)/.test(text) && /experience|years|worked|using/.test(text);
  const followupDetail = /production|deployed|deployment|live usage/.test(text) ? 'production' : /built or planned|completed|was that built|is (?:it|that) built/.test(text) ? 'status' : /personally|contribut|what did he implement/.test(text) ? 'contribution' : null;
  const refersBack = /^(which ones|which is|what has he built with them|explain further|explain the architecture|how does this compare|show relevant projects)/.test(text);
  if (refersBack && !entities.length && !expansion.groups.length && context.groups?.length)
    expansion = expandQuery(context.groups.join(" "), skills);
  let projectIds = projects
    .filter(
      (p) =>
        contains(text, p.id.replaceAll("-", " ")) || contains(text, p.title),
    )
    .map((p) => p.id);
  if (/^(explain further|explain the architecture|tell me more|how does this compare)/.test(text) && !projectIds.length)
    projectIds = context.projectIds || [];
  if (followupDetail && !projectIds.length && !entities.length) { projectIds = context.projectIds || []; entities = context.entities || []; }
  const followup =
    /^(which|what about|what has he built with|show|tell me more|explain|how does|would that|and |those)/.test(text);
  if (
    !entities.length &&
    followup &&
    !/backend|frontend|cloud|certif|education/.test(text)
  )
    entities = unmatchedTool ? [] : context.entities || [];
  const role =
    /\b(role|position|job|suitable|suitability|fit|requirements|responsibilities|candidate|hiring)\b/.test(
      text,
    );
  let intent = role
    ? "role"
    : /certif|credential|licen[sc]|badge/.test(text)
      ? "credentials"
      : /education|qualification|degree|studied|university/.test(text)
        ? "education"
        : /experience|background|career|employment|who is|about keeno/.test(
              text,
            )
          ? "experience"
          : /project|built|build|application|tell me more/.test(text) ||
              projectIds.length
            ? "projects"
            : entities.length ||
                expansion.groups.length ||
                /skill|frontend|backend|full stack|cloud|\bui\b|\bux\b|technolog|\bai\b/.test(
                  text,
                )
              ? "skills"
              : "unknown";
  const domains = [];
  if (/frontend|react developer|\bui\b|\bux\b/.test(text))
    domains.push("Frontend & UI");
  if (/backend|full stack/.test(text)) domains.push("Backend & APIs");
  if (/full stack/.test(text))
    domains.push("Frontend & UI", "Databases & Data");
  if (/\bai\b|machine learning|agents/.test(text))
    domains.push("AI & Machine Learning");
  if (/cloud|devops/.test(text)) domains.push("Cloud, DevOps & Infrastructure");
  if (!entities.length && intent === "projects" && followup)
    entities = unmatchedTool ? [] : context.entities || [];
  if (refersBack && intent === "unknown" && context.intent) intent = context.intent;
  if ((expansion.groups.length || entities.length) && ["experience", "unknown"].includes(intent))
    intent = "skills";
  return {
    duration, followupDetail, unmatchedTool,
    expansion,
    text,
    entities: [...new Set(entities)],
    projectIds,
    intent,
    domains: [...new Set(domains)],
    more: /other|more|those/.test(text),
    comparison: /compar|versus|\bvs\b/.test(text),
    long: raw.length > 500,
  };
}
function oneEdit(a, b) {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0,
    j = 0,
    n = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
    } else {
      if (++n > 1) return false;
      if (a.length >= b.length) i++;
      if (b.length >= a.length) j++;
    }
  }
  return n + (i < a.length || j < b.length ? 1 : 0) <= 1;
}
