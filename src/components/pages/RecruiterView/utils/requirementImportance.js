import { contains } from '../../../../assistant/interpret.js';

const essential = /\b(required|requires?|must(?: have)?|essential|minimum|mandatory|non.negotiable)\b/i;
const preferred = /\b(nice to have|preferred|bonus|advantageous|optional|desirable)\b/i;
const synonyms = {
    'Google Cloud': ['GCP', 'Google Cloud'],
    'Node.js': ['Node.js', 'Nodejs'],
    'LLM Integration': ['LLM', 'LLMs', 'large language models'],
    'REST APIs': ['REST', 'RESTful'],
    'Agentic AI': ['agents', 'agentic'],
    'Frontend & UI': ['frontend', 'front end', 'UI', 'UX'],
    'Backend & APIs': ['backend', 'back end', 'full stack'],
    'AI & Machine Learning': ['AI', 'machine learning'],
    'Databases & Data': ['database', 'databases'],
};

// Importance is inferred from local clauses and explicit section headings.
// Ambiguous wording stays neutral; unrelated nearby requirements do not inherit emphasis.
export function requirementImportance(requirement, description) {
    let section = 'Standard';
    const occurrences = [];
    for (const line of description.split(/\n/)) {
        const heading = line.trim().replace(/^#+\s*/, '');
        const headingMatch = heading.match(/^(required(?: skills| qualifications| requirements)?|requirements|essential(?: skills)?|minimum(?: qualifications)?|must have|nice to have|preferred(?: skills| qualifications)?|bonus|optional|responsibilities|about (?:us|you|the role))\s*:?\s*$/i);
        if (headingMatch) {
            section = preferred.test(heading) ? 'Preferred' : essential.test(heading) || /^requirements/i.test(heading) ? 'Essential' : 'Standard';
            continue;
        }
        for (const clause of line.split(/;|(?<=[.!?])\s+|\bbut\b|\bwhile\b/i)) {
            const terms = [...requirement.terms, requirement.name, ...(synonyms[requirement.name] || [])];
            const contextual = requirement.type === 'education' ? /degree|computer science|education|university/i.test(clause)
                : requirement.type === 'certification' ? /certif/i.test(clause)
                : requirement.type === 'experience' ? clause.toLowerCase().includes(requirement.name.toLowerCase())
                : requirement.type === 'condition' ? requirement.pattern.test(clause)
                : false;
            if (!contextual && !terms.some(term => contains(clause, term))) continue;
            // Inline preferred wording applies from its marker onward, even after a required clause.
            const preferenceAt = clause.search(preferred);
            const firstTermAt = terms.reduce((index, term) => {
                const at = clause.toLowerCase().indexOf(term.toLowerCase());
                return at < 0 ? index : Math.min(index, at);
            }, Infinity);
            const importance = preferenceAt >= 0 && (preferenceAt < firstTermAt || !essential.test(clause)) ? 'Preferred'
                : essential.test(clause) ? 'Essential' : section;
            occurrences.push(importance);
        }
    }
    const importance = occurrences.includes('Essential') ? 'Essential' : occurrences.includes('Standard') ? 'Standard' : occurrences.length ? 'Preferred' : 'Standard';
    const repeated = occurrences.length >= 2 && importance !== 'Preferred';
    return { importance, importanceMultiplier: importance === 'Essential' ? 1.5 : importance === 'Preferred' ? 0.5 : repeated ? 1.2 : 1, importanceReason: importance === 'Essential' ? 'Required wording or section' : importance === 'Preferred' ? 'Preference wording or section' : repeated ? 'Repeated in role description' : 'Neutral weighting' };
}
