// Keep emphasis editorial and scoped to the current company content.
const terms = [
  'kailor insider', 'kailor', '2024', '2025',
  'technology consultancy', 'software engineering', 'AI and automation',
  'cloud infrastructure', 'independent publishing', 'editorial research',
  'independent workspace', 'confirmed facts', 'immutable snapshots',
  'immutable consultancy request', 'human-led consultancy',
  'owner-only', 'registration closed', 'not production-ready',
  'React Router', 'Cloudflare Worker', 'PostgreSQL', 'Prisma',
  'Tiptap', 'TOTP', 'independent authentication',
];
const pattern = new RegExp(String.raw`\b(${terms.join('|')})\b`, 'gi');

export default function CompanyEmphasis({ children }) {
  return String(children).split(pattern).map((part, index) =>
    index % 2 ? <strong key={index}>{part}</strong> : part,
  );
}
