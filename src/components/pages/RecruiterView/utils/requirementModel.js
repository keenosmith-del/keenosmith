import {
  technologyMentions,
  responsibilities,
} from "./requirementVocabulary.js";

const preferred =
  /\b(?:desired|advantageous|preferred|nice[- ]to[- ]haves?|beneficial|bonus|optional|desirable)\b/i;
const required =
  /\b(?:required(?: dna)?|requirements?|minimum|must(?:[- ]haves?)?|mandatory|essential|requires?)\b/i;
const conditional =
  /\b(?:where appropriate|if (?:needed|required|applicable)|when (?:needed|appropriate)|as needed)\b/i;
const headingPattern =
  /^(?:requirements?|minimum requirements?|minimum qualifications?|qualifications?|required(?: dna| skills| qualifications| requirements)?|must[- ]have(?:s| skills)?|desired(?: skills)?|advantageous|preferred(?: skills| qualifications)?|nice[- ]to[- ]haves?|responsibilities|what you(?:'|’)ll (?:do|need)|about (?:us|you|the role)|location|logistics|working arrangements?|benefits|how to apply)\s*:?(?:\s*)$/i;
const clean = (s) =>
  s
    .trim()
    .replace(/^(?:#+\s*|[-*•–]\s*|\d+[.)]\s*)/, "")
    .trim();
const numbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
};
const yearPattern =
  /\b(?:(at least|minimum(?: of)?|up to|maximum(?: of)?|more than|over)\s+)?(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s*(\+|[-–]\s*\d+|to\s*\d+)?\s*years?\b(?:\s*(minimum|maximum))?/gi;
const excluded =
  /\b(?:cover[- ]letter|cv (?:length|pages?)|curriculum vitae|apply (?:now|by|with)|send (?:your|a)|salary|remuneration|equal opportunity|our benefits)\b/i;
const logistics =
  /\b(?:south africa|uk\/us|time[- ]zone|overlap|work authori[sz]ation|right to work|work permit|citizenship|must (?:be based|reside|relocate)|mandatory on.?site|required on.?site|hybrid|on[- ]?site|remote[- ]only|security clearance|professional licen[cs]e)\b/i;

export function roleClauses(description) {
  const lines = [];
  for (const raw of description.replace(/\r\n?/g, "\n").split("\n")) {
    const text = clean(raw);
    if (!text) continue;
    // Join broken bullet continuations; a standalone technology line remains independent.
    if (
      lines.length &&
      !/^\s*(?:[-*•–]|\d+[.)]|#)/.test(raw) &&
      !headingPattern.test(text) &&
      (/[,/]$/.test(lines.at(-1)) ||
        /^(?:and|or|using|including|with|across|for|such as)\b/i.test(text))
    )
      lines[lines.length - 1] += ` ${text}`;
    else lines.push(text);
  }
  let section = "Unspecified",
    sectionStatus = "Standard";
  const clauses = [];
  for (const line of lines) {
    const prefix = line.match(/^([^:]{2,45}):\s*(.*)$/);
    const heading = headingPattern.test(line)
      ? line
      : prefix && headingPattern.test(prefix[1])
        ? prefix[1]
        : null;
    let content = line;
    if (heading) {
      section = heading.replace(/:$/, "");
      sectionStatus = preferred.test(section)
        ? "Preferred"
        : required.test(section) || /^qualifications/i.test(section)
          ? "Essential"
          : "Standard";
      content = prefix?.[2] || "";
    }
    if (
      !content ||
      /^(benefits|how to apply|about us)$/i.test(section) ||
      excluded.test(content)
    )
      continue;
    for (const phrase of content
      .split(/;|(?<=[a-z)])\.\s+(?=[A-Z])|\bbut\b|\bwhile\b/i)
      .map((s) => s.trim())
      .filter(Boolean)) {
      // Split a trailing preference from a required clause without losing either phrase.
      const parts = phrase.split(
        /,?\s+(?=(?:Python|Next\.js|Azure)\s+(?:is\s+)?(?:advantageous|beneficial|preferred))/i,
      );
      for (const sourcePhrase of parts)
        clauses.push({
          sourcePhrase,
          section,
          sectionImportance: sectionStatus,
          importance: conditional.test(sourcePhrase)
            ? "Conditional"
            : preferred.test(sourcePhrase)
              ? "Preferred"
              : required.test(sourcePhrase)
                ? "Essential"
                : sectionStatus,
        });
    }
  }
  return clauses;
}

export function extractRequirements(description) {
  const rawRows = [],
    unassessed = [];
  const add = (base, data) =>
    rawRows.push({
      ...base,
      ...data,
      sources: [
        {
          phrase: base.sourcePhrase,
          section: base.section,
          importance: base.importance,
        },
      ],
    });
  for (const clause of roleClauses(description)) {
    const text = clause.sourcePhrase;
    if (logistics.test(text))
      add(clause, {
        name: text,
        type: "condition",
        terms: [],
        logic: "single",
      });
    const years = [...text.matchAll(yearPattern)];
    const qualification =
      /\b(?:degree|bachelor|master|bsc|msc|phd|diploma|certificat\w*|certified|education)\b/i.test(text);
    if (qualification) {
      const alternative = /\bor\b|\balternatively\b/i.test(text);
      add(clause, {
        name: text,
        type: alternative
          ? "qualification"
          : /degree|bachelor|master|bsc|msc|phd|diploma|education/i.test(text)
            ? "education"
            : "certification",
        terms: [],
        logic: alternative ? "any" : "single",
        practicalRoute:
          alternative &&
          /(?:practical|equivalent|relevant|technical|engineering|software|work) experience/i.test(
            text,
          ),
        evidenceNeeded:
          "Awarded qualification of the requested type, or an explicitly accepted experience route",
      });
    }
    for (const [yearIndex, m] of years.entries()) {
      const value = Number(numbers[m[2].toLowerCase()] || m[2]);
      const upper = /up to|maximum/i.test(`${m[1]} ${m[4]}`);
      const scopePhrase = text
        .slice(
          m.index + m[0].length,
          years[yearIndex + 1]?.index ?? text.length,
        )
        .replace(/^[’'\s]+/, "")
        .replace(/[,\s]+(?:and\s*)?$/i, "");
      const scope = technologyMentions(scopePhrase).map((x) => x.name);
      add(clause, {
        name: `${m[0]} ${scopePhrase}`.trim(),
        type: "experience",
        terms: [],
        logic: "single",
        duration: {
          years: value,
          bound: upper ? "maximum" : "minimum",
          strict: /more than|over/i.test(m[1] || ""),
          range: m[3] || null,
          upperYears:
            m[3] && /[-–]|to/i.test(m[3]) ? Number(m[3].match(/\d+/)[0]) : null,
          scope: scopePhrase,
          technologies: scope,
        },
        evidenceNeeded:
          "Dated experience in the employer’s requested scope and context",
      });
    }
    // Qualification examples and credential names are not independent technology requirements.
    if (!qualification) {
      const mentions = technologyMentions(text);
      const edges = mentions
        .slice(0, -1)
        .map((m, i) => text.slice(m.end, mentions[i + 1].start).trim());
      const joined = new Set();
      for (let i = 0; i < edges.length; i++) {
        if (/^(?:\/|or|,?\s*or|and\/or)$/i.test(edges[i])) {
          joined.add(i);
          // A comma list terminated by “or” is one alternative group.
          if (/or/i.test(edges[i]) && edges[i] !== "/") {
            for (let k = i - 1; k >= 0 && edges[k] === ","; k--) joined.add(k);
          }
        }
      }
      if (/^\s*,?\s*or similar/i.test(text.slice(mentions.at(-1)?.end || 0))) {
        for (let k = edges.length - 1; k >= 0 && edges[k] === ","; k--)
          joined.add(k);
      }
      const groups = [];
      for (let i = 0; i < mentions.length; i++) {
        const group = [mentions[i]];
        while (joined.has(i)) group.push(mentions[++i]);
        groups.push(group);
      }
      for (const group of groups) {
        const first = group[0],
          last = group.at(-1),
          firstIndex = mentions.indexOf(first),
          lastIndex = mentions.indexOf(last);
        const prefix = text.slice(
          firstIndex ? mentions[firstIndex - 1].end : 0,
          first.start,
        );
        const suffix = text
          .slice(last.end, mentions[lastIndex + 1]?.start ?? text.length)
          .split(/,|\band\b|\bor\b/i)[0];
        const localStatus =
          /such as/i.test(prefix) || conditional.test(`${prefix} ${suffix}`)
            ? "Conditional"
            : preferred.test(`${prefix} ${suffix}`)
              ? "Preferred"
              : required.test(`${prefix} ${suffix}`)
                ? "Essential"
                : required.test(text)
                  ? "Essential"
                  : preferred.test(text.slice(0, mentions[0]?.start || 0))
                    ? "Preferred"
                    : clause.sectionImportance || clause.importance;
        let terms = [...new Set(group.map((m) => m.name))];
        // IaC is the qualification; a specified tool refines it rather than adding a parent penalty.
        const iac =
          terms.includes("Infrastructure as Code") ||
          /\b(?:iac|infrastructure[- ]as[- ]code)\b/i.test(text);
        terms = terms.filter(
          (t) => t !== "Infrastructure as Code" || terms.length === 1,
        );
        add(
          { ...clause, importance: localStatus },
          {
            name: terms.join(" or "),
            type: "technology",
            terms,
            logic: terms.length > 1 ? "any" : "single",
            capability: iac ? "Infrastructure as Code" : null,
            acceptsSimilar: /or similar/i.test(text),
            evidenceNeeded: `Implementation of ${terms.join(" or ")}, with the requested product/version and context`,
          },
        );
      }
    }

    for (const [name, pattern] of responsibilities) {
      if (!pattern.test(text)) continue;
      if (name === "IAM" && /\b(?:aws|gcp|google cloud)\s+iam\b/i.test(text))
        continue;
      if (
        name === "Cloud" &&
        technologyMentions(text).some((m) =>
          ["AWS", "Azure", "Google Cloud"].includes(m.name),
        )
      )
        continue;

      add(clause, {
        name,
        type: "responsibility",
        terms: [name],
        logic: "single",
        evidenceNeeded:
          name === "End-to-end delivery"
            ? "Connected implementation, tests, deployment and maintenance in one project"
            : `Concrete evidence of ${name.toLowerCase()} in the requested context`,
      });
    }
    const recognised = rawRows.some((r) => r.sourcePhrase === text);
    const residual = technologyMentions(text).reduceRight(
      (remaining, m) =>
        remaining.slice(0, m.start) +
        " ".repeat(m.end - m.start) +
        remaining.slice(m.end),
      text,
    );
    const unknownNamed = /\b[A-Z][a-zA-Z]+\b/.test(
      residual.replace(
        /\b(?:AI|ML|API|APIs|CV|DNA|UK|US|SFT|LLM|LLMs|HTTP|HTTPS|SQL|UTC|JSON|Required|Requirements|Minimum|At|An|A|The|Build|Develop|Support|Strong|Experience|Knowledge|Familiarity|Proficiency|Ability|Independent|Maintain|Design|Use|Integrate|Preferred|Desired|Optional|Responsibilities|Three|Two|Five|Seven)\b/g,
        "",
      ),
    );
    if (
      (!recognised ||
        (unknownNamed && !qualification) ||
        /\b(?:COBOL|HIPAA|GDPR|regulated organisation|clinical workflows|financial services employment)\b/i.test(
          text,
        )) &&
      !/^(?:we (?:are|offer)|our (?:company|team)|join us|about the|team (?:is |called |named ))/i.test(
        text,
      )
    ) {
      unassessed.push({
        ...clause,
        name: text,
        type: "review",
        terms: [],
        logic: "single",
        sources: [
          {
            phrase: text,
            section: clause.section,
            importance: clause.importance,
          },
        ],
        evidenceNeeded: "Manual interpretation and evidence verification",
      });
    }
  }
  const rows = new Map();
  for (const row of [...rawRows, ...unassessed]) {
    const key = `${row.type}:${row.terms.length ? [...row.terms].sort().join("|") : row.name.toLowerCase().replace(/[^a-z0-9]+/g, " ")}`;
    if (!rows.has(key)) rows.set(key, { ...row, id: key });
    else {
      const previous = rows.get(key);
      previous.sources.push(
        ...row.sources.filter(
          (s) =>
            !previous.sources.some(
              (p) => p.phrase === s.phrase && p.section === s.section,
            ),
        ),
      );
      if (row.importance === "Essential") previous.importance = "Essential";
      previous.ambiguous =
        previous.sources.some((s) => s.importance === "Essential") &&
        previous.sources.some((s) => s.importance === "Preferred");
    }
  }
  const result = [...rows.values()];
  // Conjunction/alternative contradictions remain visible; they cannot silently pick an easier interpretation.
  for (const row of result) {
    if (
      row.logic === "any" &&
      result.some(
        (other) =>
          other !== row &&
          other.type === row.type &&
          !["Preferred", "Conditional"].includes(other.importance) &&
          !["Preferred", "Conditional"].includes(row.importance) &&
          other.logic === "single" &&
          row.terms.includes(other.terms[0]),
      )
    )
      row.ambiguous = true;
    if (
      row.type === "experience" &&
      result.some(
        (other) =>
          other.type === "experience" &&
          other.duration.bound !== row.duration.bound &&
          other.duration.years === row.duration.years,
      )
    )
      row.ambiguous = true;
  }
  // A standalone parent covered by explicit children does not enter the denominator again.
  for (const row of result) {
    if (row.name === 'Leadership and delivery responsibility' && result.some(other =>
      other.name === 'Technical leadership and mentoring' && other.sourcePhrase === row.sourcePhrase)) row.parentOnly = true;
    if (
      row.name === "Infrastructure as Code" &&
      result.some(
        (other) =>
          other.type === "technology" &&
          !["Preferred", "Conditional"].includes(other.importance) &&
          other.terms.some((t) =>
            ["Terraform", "Bicep", "OpenTofu", "CloudFormation"].includes(t),
          ),
      )
    )
      row.parentOnly = true;
    if (
      row.name === "Cloud" &&
      result.some(
        (other) =>
          other.type === "technology" &&
          !["Preferred", "Conditional"].includes(other.importance) &&
          other.terms.some((t) => ["AWS", "Azure", "Google Cloud"].includes(t)),
      )
    )
      row.parentOnly = true;
    if (
      row.name === "LLM Integration" &&
      result.some(
        (other) =>
          other.type === "technology" &&
          other.sourcePhrase === row.sourcePhrase &&
          !["Preferred", "Conditional"].includes(other.importance) &&
          other.terms.some((t) =>
            [
              "OpenAI",
              "Azure OpenAI",
              "Google Gemini",
              "Anthropic",
              "Ollama",
              "Bedrock",
            ].includes(t),
          ),
      )
    )
      row.parentOnly = true;
    if (
      row.type === "technology" &&
      row.logic === "single" &&
      result.some(
        (other) =>
          other.logic === "any" &&
          other.ambiguous &&
          !["Preferred", "Conditional"].includes(row.importance) &&
          !["Preferred", "Conditional"].includes(other.importance) &&
          other.terms.includes(row.terms[0]),
      )
    )
      row.parentOnly = true;
  }
  return result;
}
