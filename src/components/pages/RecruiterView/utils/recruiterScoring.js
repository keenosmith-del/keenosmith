import { canonicalProjects, credentials, education, experience, skillRegistry } from '../../../../assistant/knowledge.js';
import { interpret, contains, normalize } from '../../../../assistant/interpret.js';
import { retrieve, evidence } from '../../../../assistant/retrieve.js';
import { requirementImportance } from './requirementImportance.js';
import { taxonomy } from '../../../../assistant/taxonomy.js';

export const alignmentLabel = score => score >= 80 ? 'Strong alignment' : score >= 65 ? 'Good alignment' : score >= 40 ? 'Partial alignment' : score > 0 ? 'Limited evidence' : 'No verified evidence';
const unsupported = ['Salesforce', 'SAP', 'Rust', 'Ruby', 'Rails', 'PHP', 'Swift', 'Scala', 'Snowflake', 'Databricks', 'Hadoop', 'Tableau', 'Power BI'];
const aliases = { 'LLM Integration': /\bllms?\b|large language models?/i, 'Vector Search': /vector (search|retrieval|databases?)/i, 'Node.js': /node\.?js/i, 'REST APIs': /rest(?:ful)? apis?/i, 'Agentic AI': /\bagents?\b/i };

export function assessRole({ title = '', description = '', company = '' }) {
 if (!description.trim() || description.trim().length < 35) throw new Error('Paste a fuller role description with responsibilities and required technologies (at least 35 characters).');
 if (description.length > 16000) throw new Error('Please shorten the description to 16,000 characters.');
 const raw = `${title}\n${description}`, text = normalize(raw), query = interpret(raw);
 const names = new Set(query.entities);
 for (const [name, pattern] of Object.entries(aliases)) if (pattern.test(raw)) names.add(name);
 if (names.has('REST APIs')) names.delete('REST');
 for (const name of unsupported) if (contains(raw, name)) names.add(name);
 const requirements = [...names].map(name => ({ name, type: 'technology', terms: [name] }));
 // Broad domains are assessed as domains, never expanded into invented explicit requirements.
 for (const group of taxonomy.filter(g => !['google','microsoft','aws','languages'].includes(g.id))) {
  if (group.aliases.some(a => contains(text, a)) && !requirements.some(r => normalize(r.name) === normalize(group.label))) {
   requirements.push({ name: group.label, type: 'domain', terms: group.skills, group: group.id });
  }
 }
 if (/\b(degree|computer science|university|education)\b/i.test(raw)) requirements.push({ name: 'Formal education / degree', type: 'education', terms: [] });
 for (const match of raw.matchAll(/\b\d+\s*\+?\s*(?:to\s*\d+\s*)?years?[^.\n;,]*/gi)) requirements.push({ name: match[0].trim(), type: 'experience', terms: [] });
 if (/\b(certified|certification|certifications)\b/i.test(raw)) requirements.push({ name: 'Required certification', type: 'certification', terms: [] });
 const conditions = [
  ['Security clearance', /security clearance|cleared personnel/i],
  ['Professional licence', /professional licen[cs]e|licen[cs]ed engineer/i],
  ['Work authorisation', /work authori[sz]ation|right to work|work permit|citizenship/i],
  ['Location / onsite requirement', /must (?:be based|reside|relocate)|mandatory on.?site|required on.?site/i],
 ];
 for (const [name, pattern] of conditions) if (pattern.test(raw)) requirements.push({ name, pattern, type: 'condition', terms: [] });
 if (!requirements.length) throw new Error('No assessable requirements recognised. Add specific technologies, engineering domains or education requirements.');
 const rows = [...new Map(requirements.map(r => [r.name, r])).values()].map(requirement => {
  const importance = requirementImportance(requirement, description);
  const r = { ...requirement, ...importance, weight: (requirement.type === 'technology' ? 2 : 1) * importance.importanceMultiplier };
  if (['education','experience','certification','condition'].includes(r.type)) return { ...r, score: r.type === 'education' ? 20 : 0, projects: [], credentials: [], evidenceStrength: r.type === 'education' ? 'Education / training context' : 'Unverified requirement', label: alignmentLabel(r.type === 'education' ? 20 : 0), detail: r.type === 'education' ? 'Computer science coursework and structured training are recorded; an awarded degree is not confirmed.' : r.type === 'experience' ? 'Professional engineering tenure at this threshold is not verified. Independent project work is separate from employment.' : r.type === 'condition' ? 'This condition is not verified by the portfolio. Confirm it directly before making a role-fit decision.' : 'A specific completed certification must be checked against the credential records; courses and badges do not establish this requirement.' };
  const exact = canonicalProjects.filter(p => p.demonstrated && p.implementedTechnologies.some(t => r.terms.some(term => contains(t, term) || contains(term, t))));
  const learning = credentials.filter(c => {
   const credentialText = `${c.name} ${c.description} ${c.issuer} ${c.group}`;
   if (r.group === 'cloud') return /cloud|azure|\baws\b|amazon web services|\bgcp\b/i.test(credentialText);
   if (r.group === 'ai') return /\bai\b|artificial intelligence|machine learning|generative/i.test(credentialText);
   return r.terms.some(t => contains(`${c.name} ${c.description}`, t));
  });
  const listed = r.terms.some(t => evidence(t).band > 0);
  const relatedGroups = r.type === 'technology' ? skillRegistry.find(s => s.name === r.name)?.categories || [] : [];
  const related = exact.length ? [] : canonicalProjects.filter(p => p.demonstrated && p.categories.some(c => relatedGroups.includes(c)));
  // Related capabilities cannot establish tool-specific implementation.
  const base = exact.length ? 65 + Math.min(15, (exact.length - 1) * 5) : learning.length ? 25 : listed ? 15 : related.length ? 10 : 0;
  const source = exact.some(p => p.evidence.some(e => ['source-code','repository-config'].includes(e.type) && e.strength === 'direct'));
  const score = Math.min(r.type === 'domain' ? 75 : 100, base + (source ? 10 : 0) + (exact.length && learning.length ? 5 : 0));
  return { ...r, score, evidenceStrength: exact.length ? source ? 'Repository-supported implementation' : 'Direct project implementation' : learning.length ? 'Credential / training evidence' : listed ? 'Portfolio-listed capability' : related.length ? 'Related capability only' : 'No verified evidence', label: alignmentLabel(score), projects: exact, credentials: learning, detail: exact.length ? `${exact.length} built project${exact.length === 1 ? '' : 's'} · ${source ? 'Source/configuration evidence' : 'Documented implementation'}${learning.length ? ' · Supporting training' : ''}` : learning.length ? 'Training evidence; direct implementation not established' : listed ? 'Listed capability; direct implementation not established' : related.length ? 'Related domain only; this technology is unverified' : 'No verified portfolio evidence found' };
 });
 const ranked = retrieve({ ...query, intent: 'skills' });
 const projectScores = canonicalProjects.filter(p => p.demonstrated).map(p => ({ ...p, matches: rows.filter(r => r.projects.some(x => x.id === p.id)).map(r => r.name), demonstratedMatches: rows.filter(r => r.projects.some(x => x.id === p.id)).flatMap(r => r.type === 'technology' ? [r.name] : p.implementedTechnologies.filter(t => r.terms.includes(t))), rank: rows.reduce((n,r) => n + (r.projects.some(x => x.id === p.id) ? r.weight * r.score : 0), 0) })).filter(p => p.rank > 0).sort((a,b) => b.rank - a.rank || ranked.projects.findIndex(p => p.id === a.id) - ranked.projects.findIndex(p => p.id === b.id));
 const vendors = query.expansion.groups.filter(g => ['google', 'microsoft', 'aws'].includes(g));
 const supportingCredentials = [...new Map(rows.flatMap(r => r.credentials).map(c => [c.id,c])).values()].map(c => {
  const matches = rows.filter(r => r.credentials.some(record => record.id === c.id));
  const explicit = matches.filter(r => r.type === 'technology');
  const vendorMatch = !vendors.length || c.ecosystems.some(v => vendors.includes(v));
  return { ...c, matches: (explicit.length ? explicit : matches).map(r => r.name), relevanceRank: explicit.length * 4 + matches.length, relevant: vendorMatch || explicit.some(r => !['AI', 'LLM Integration', 'Python', 'SQL'].includes(r.name)) };
 }).filter(c => c.relevant).sort((a,b) => b.relevanceRank - a.relevanceRank);
 // Category bars aggregate only recognised technology requirements, never extra inferred stack requirements.
 const categoryAlignment = taxonomy.filter(g => !['google','microsoft','aws','languages'].includes(g.id)).map(group => {
  const matches = rows.filter(r => r.type === 'technology' && r.terms.some(t => group.skills.includes(t)));
  const explicitDomain = rows.find(r => r.group === group.id);
  const score = matches.length ? Math.round(matches.reduce((sum,r) => sum + r.score*r.weight, 0) / matches.reduce((sum,r) => sum+r.weight,0)) : explicitDomain?.score;
  return { name: group.label, score, label: alignmentLabel(score || 0), matches: matches.map(r => r.name) };
 }).filter(g => g.score !== undefined);
 const importantGaps = rows.filter(r => r.importance === 'Essential' && (r.score < 40 || ['experience','education','certification','condition'].includes(r.type)));
 const coverageRows = rows.filter(r => r.type !== 'domain');
 const directCount = coverageRows.filter(r => r.projects.length > 0).length;
 const directCoverage = coverageRows.length ? directCount / coverageRows.length : 0;
 const evidenceCoverage = coverageRows.length >= 6 && directCoverage >= .7 ? 'High' : coverageRows.length >= 3 && directCoverage >= .4 ? 'Moderate' : 'Limited';
 const coverageNote = `${directCount} of ${coverageRows.length} recognised technology/context requirements have direct project evidence. Broad domains and unrecognised criteria are not counted.`;
 const strong = rows.filter(r => r.score >= 65), partial = rows.filter(r => r.score > 0 && r.score < 65), gaps = rows.filter(r => r.score === 0);
 return { title, company, rows, strong, partial, gaps, importantGaps, categoryAlignment, evidenceCoverage, coverageNote, categoryCount: taxonomy.length, matched: rows.filter(r => r.score >= 40).length, score: Math.round(rows.reduce((n,r) => n + r.score * r.weight, 0) / rows.reduce((n,r) => n + r.weight, 0)), projects: projectScores, credentials: supportingCredentials, education, experience, expansion: query.expansion, summary: `${strong.length ? `Direct implementation evidence supports ${strong.filter(r => r.type === 'technology').map(r => r.name).join(', ') || strong.map(r => r.name).join(', ')}.` : 'Recognised requirements have limited direct implementation support.'}${partial.length ? ` Partial or limited evidence remains for ${partial.map(r => r.name).slice(0,4).join(', ')}.` : ''}${gaps.length ? ` No verified evidence was found for ${gaps.map(r => r.name).slice(0,4).join(', ')}.` : ''}${importantGaps.length ? ' Essential requirements need particular review.' : ''}` };
}
