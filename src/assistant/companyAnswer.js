import { projects } from './knowledge.js';
import { companyLaunchLabel } from '../data/companyLaunch.js';

// Current company identity answers stay grounded in reviewed records, including
// legacy-name enquiries. Do not reinterpret unrelated hiring/skills assessments.
export function companyAnswer(q) {
  if (!/\b(kailor|kai)\b/.test(q.text) || q.intent === 'role') return null;
  const insider = /\binsider\b|\bkai\b/.test(q.text);
  const relationship = /relationship|connect|history|began|begin|origin|first|evol|both|difference/.test(q.text);
  const launch = /launch|live|public|available|deployed|production/.test(q.text);
  const architecture = /architect|stack|engineer|technical|implement|auth|database/.test(q.text);
  const selected = projects.filter(p => p.id === (insider ? 'kailor-insider' : 'kailor-ai') || relationship && ['kailor-ai', 'kailor-insider'].includes(p.id));
  let text = relationship
    ? 'Keeno founded and operated kailor insider in 2024 as an independent technology and AI publishing initiative. Researching and explaining technology helped shape kailor, established in 2025 as a technology consultancy and engineering company. Today, kailor insider communicates, publishes and connects ideas across technology, software engineering, applied innovation and technology in business. kailor evaluates, engineers and delivers technology through consultancy, software engineering, AI and automation, and cloud infrastructure. They share a history and identity, with independent authentication, databases, deployment lifecycles and editorial or consultancy workflows.'
    : insider
      ? selected[0].description
      : 'kailor is Keeno’s founder-led technology consultancy and engineering company, established in 2025. Its four disciplines are technology consultancy, software engineering, AI and automation, and cloud infrastructure. Work starts with business needs and can recommend process improvements, established tools, integrations or custom systems. The consulting application supports independent project workspaces, discovery, source evidence, analysis, solution canvases, immutable reports and multi-solution consultancy requests. Human-led scoping, engineering and delivery remain part of the wider business. kailor insider’s publishing work began in 2024 and helped establish the thinking behind kailor.';
  if (architecture) text += '\n\n' + (insider
    ? 'The current publication runs React Router SSR in a Cloudflare Worker with TypeScript, PostgreSQL, forward SQL migrations and Tiptap. Private media has R2 and PostgreSQL adapters. It no longer uses the earlier separate Express publishing API. Owner-only access, closed registration and scoped recipient grants are distinct from an open public reading service.'
    : 'The local consulting app uses React, TypeScript and Vite with Express, shared Zod contracts, Prisma and PostgreSQL. Ownership and transaction-bound revisions protect project context; current canvases evolve independently of immutable reports. Optional Cloudflare inference is budgeted, validated and cannot directly confirm facts. Multi-selection and consultancy intake exist; commissioning, billing and implementation tracking remain developing workflows.');
  if (launch || architecture) text += '\n\n' + (insider
    ? selected.find(p => p.id === 'kailor-insider').deployment
    : `The kailor company website is live. The upcoming app target is ${companyLaunchLabel} in Africa/Johannesburg, a separate milestone. The static public website excludes the private application runtime; public app deployment and client outcomes are not established here.`);
  return { text, projects: selected, credentials: [], indicators: [] };
}
