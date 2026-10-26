import { taxonomy } from "../../../../assistant/taxonomy.js";
import { extractRequirements } from "./requirementModel.js";
import {
  candidateEvidence,
  candidateProfile,
  candidateProjects,
  evidenceFingerprint,
} from "./candidateEvidence.js";

export const MODEL_REVISION = "contextual-2.1.0";
export const alignmentLabel = (score) =>
  score >= 75
    ? "Implementation supported"
    : score >= 60
      ? "Documented support"
      : score >= 30
        ? "Partial support"
        : score > 0
          ? "Limited evidence"
          : "Needs review";
const aliases = {
  Gemini: "Google Gemini",
  "Claude API": "Anthropic",
  "Multi-agent orchestration": "Agent orchestration",
  "Agentic AI": "Agent orchestration",
  "API Integration": "Third-party integration",
  "AI Evaluation": "AI evaluation and safety",
  Observability: "Monitoring and observability",
};
const canonical = (s) => aliases[s] || s;
const transferable = {
  "Fine-tuning": ["Fine-tuning data preparation"],
  "Azure OpenAI": ["OpenAI", "LLM Integration"],
  OpenAI: ["Azure OpenAI", "LLM Integration"],
  "Vector databases": ["pgvector", "Vector Search"],
  ".NET 8": [".NET", "C#"],
  ".NET Core": [".NET", "C#"],
  ".NET Framework": [".NET", "C#"],
  "GCP IAM": ["IAM"],
  "AWS IAM": ["IAM"],
};
const verificationTypes = [
  "experience",
  "education",
  "qualification",
  "certification",
];
const directStatus = new Set([
  "built",
  "deployed",
  "maintained",
  "prototyped",
  "candidate-declared",
]);
const unique = (values) => [...new Set(values)];
const technicalContext =
  /software|engineering|full[- ]stack|technical|development|ai|ml|related/i;

function evaluateTenure(row, profile, records, asOf) {
  void asOf;
  const d = row.duration,
    text = row.sourcePhrase;
  const scope = d.scope;
  let supported = false,
    detail = "",
    supporting = [];
  const excludedContext =
    /\b(?:paid|employment|employed|production|commercial|regulated)\b/i.test(
      text,
    );
  if (d.technologies.length) {
    const declarations = records.filter(
      (e) =>
        e.capability === "Python duration" &&
        d.technologies.every((t) => t === "Python"),
    );
    const declaration = declarations[0];
    supported =
      !!declaration &&
      !excludedContext &&
      (d.years < declaration.duration.years ||
        (d.years === declaration.duration.years &&
          (!d.strict || declaration.duration.strict)));
    if (d.upperYears) supported = false; // A lower-bound declaration cannot prove an upper-bound duration.
    if (d.bound === "maximum") supported = false;
    supporting = declarations;
    detail = declaration
      ? `${declaration.fact} ${excludedContext ? "The requested professional/production context is not established." : ""}`
      : "No dated technology-specific duration supports this threshold.";
  } else if (technicalContext.test(scope) && !excludedContext) {
    const career = profile.experience.find((e) => e.startYear);
    if (!career)
      return {
        score: null,
        status: "Needs review",
        detail: "No dated experience record establishes this threshold.",
        supportingRecords: [],
        verified: false,
      };
    const years = profile.overallExperience.years;
    supported = d.bound === 'maximum' ? years <= d.years : d.strict ? years > d.years : years >= d.years;
    if (d.upperYears) supported = supported && years <= d.upperYears;
    detail = `Recorded overall relevant experience: ${profile.overallExperience.label}. Requested ${d.bound === 'maximum' ? 'maximum' : 'minimum'}: ${d.years} years${d.upperYears ? `, upper bound ${d.upperYears}` : ''}. ${supported ? 'The recorded baseline supports this threshold.' : d.bound === 'maximum' ? 'Level mismatch: the recorded baseline exceeds this upper limit.' : 'The requested threshold is higher than the recorded baseline.'} Technology-specific and leadership durations are assessed separately.`;
    supporting = [
      {
        id: "career-baseline",
        fact: detail,
        source: career.source,
        provenance: "candidate declaration",
        context: career.context,
        dates: `${career.startYear} to present`,
        limitations: career.limitations,
      },
    ];
  } else
    detail =
      "The requested duration and context are not verified by dated evidence. Independent engineering, founder work, consulting, training and employment are assessed separately; overlapping roles are not added.";
  return {
    score: null,
    status: supported
      ? "Candidate-declared support"
      : d.bound === "maximum" && technicalContext.test(scope)
        ? "Level compatibility needs review"
        : "Needs review",
    detail,
    supportingRecords: supporting,
    verified: supported,
    limitations:
      d.bound === "maximum"
        ? "An upper bound is a level constraint, not a capability score."
        : null,
  };
}

function assessCapability(term, row, records, profile) {
  const versioned = term.match(/^(.+?) (\d+(?:\.\d+)*)$/);
  const matches = records.filter(
    (e) =>
      canonical(e.capability) === canonical(term) ||
      (versioned && e.capability === versioned[1] && e.platform === term),
  );
  const confirmedGaps = matches.filter((e) => e.status === "confirmed-gap");
  const conflicts = matches.filter(
    (e) => e.provenance === "conflicting evidence",
  );
  const built = matches.filter(
    (e) =>
      directStatus.has(e.status) && e.provenance !== "conflicting evidence",
  );
  const inspected = built.filter(
    (e) => e.provenance === "inspected source/configuration",
  );
  const documented = built.filter(
    (e) => e.provenance === "documented implementation",
  );
  const declarations = built.filter(
    (e) => e.provenance === "candidate declaration",
  );
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const training = profile.credentials.filter((c) =>
    new RegExp(`(?<![a-z0-9])${escaped}(?![a-z0-9])`, "i").test(
      `${c.name} ${c.description}`,
    ),
  );
  let score = inspected.length
    ? 80
    : documented.length
      ? 65
      : declarations.length
        ? 40
        : training.length
          ? 25
          : profile.listed.includes(term)
            ? 15
            : 0;
  let relation = "exact";
  const related =
    score < 30
      ? records.filter(
          (e) =>
            (transferable[term] || (versioned ? [versioned[1]] : [])).includes(
              e.capability,
            ) && directStatus.has(e.status),
        )
      : [];
  if (related.length) {
    score = 30;
    relation = "transferable";
  }
  let detail = inspected.length
    ? "Capability-specific source/configuration inspected."
    : documented.length
      ? "Implementation documented; remote source was not re-inspected in this iteration."
      : declarations.length
        ? "Professional scope declared in the current CV; independent verification remains open."
        : related.length
          ? "Related implementation offers transferable support; the requested product/version or operational scope is unverified."
          : training.length
            ? "Training only; implementation is not established."
            : score
              ? "Listed capability; implementation is not established."
              : "No supporting implementation record found. Missing evidence is not a confirmed inability.";
  if (conflicts.length) {
    score = 0;
    detail =
      "Conflicting current and historical evidence. Built credit withheld pending current-source review.";
  }
  if (term === "Fine-tuning" && related.length && !built.length) {
    score = 30;
    relation = "transferable";
    detail =
      "CV records SFT example preparation and RLHF feedback, not execution or deployment of fine-tuned models.";
  }
  if (
    term === "End-to-end delivery" &&
    documented.length &&
    !inspected.length
  ) {
    score = 65;
    detail =
      "Connected EventOps implementation, tests, public assessment deployment and subsequent maintenance are documented for the same project. This does not establish enterprise production ownership.";
  }
  if (confirmedGaps.length) {
    score = 0;
    detail = "Candidate evidence explicitly records this capability gap.";
  }
  const requiresLiveCloud = /\b(?:production|live|deployed)\b/i.test(row.sourcePhrase) && /azure|tenant|cloud|aws|gcp|openai|foundry/i.test(row.sourcePhrase) && /Azure|AWS|Google Cloud|Vertex AI|Foundry|Entra|Microsoft Graph|Cloud Run|OIDC|Bicep/.test(term);
  if (requiresLiveCloud && built.length && !built.some(record => record.deploymentVerified === true)) {
    score = Math.min(score, 30);
    relation = 'transferable';
    detail = 'Implementation or provider-adapter evidence supports transferable engineering; live cloud deployment and tenant operation are not verified for this requirement.';
  }
  const support = confirmedGaps.length
    ? confirmedGaps
    : conflicts.length
      ? conflicts
      : related.length
        ? related
        : built;
  return {
    term,
    score,
    relation,
    detail,
    evidenceStatus: confirmedGaps.length
      ? "Confirmed gap"
      : conflicts.length
        ? "Conflicting evidence"
        : score === 0
          ? "Missing evidence"
          : relation === "transferable"
            ? "Transferable support"
            : "Supporting evidence",
    supportingRecords: support,
    credentials: training,
    confidence: inspected.length
      ? "Source inspected"
      : documented.length
        ? "Documented"
        : declarations.length
          ? "Declared"
          : related.length
            ? "Transferable"
            : "Limited",
  };
}

function assessRequirement(row, records, profile, asOf) {
  const base = {
    ...row,
    projects: [],
    credentials: [],
    supportingRecords: [],
    score: null,
    verified: false,
  };
  if (row.type === "experience")
    return { ...base, ...evaluateTenure(row, profile, records, asOf) };
  if (["education", "qualification", "certification"].includes(row.type)) {
    const practical = row.practicalRoute && profile.experience.length > 0;
    const complete = row.type === "education" && profile.education.assessmentComplete;
    return {
      ...base,
      status: complete ? "Complete" : practical
        ? "Candidate-declared alternative support"
        : "Needs review",
      verified: complete || practical,
      detail: complete ? "Degree/education requirement complete under the instructed candidate profile. Current CV education wording is retained without adding conferral details." : practical
        ? "The advert accepts practical experience. The recorded 6+ years across independent engineering, founder work, consulting and professional delivery provide the practical-experience route."
        : row.type === "education"
          ? profile.education.wording.join("; ")
          : "Check the exact named qualification and completion status. Portfolio courses, labs, badges and Applied Skills do not automatically establish a professional certification.",
      supportingRecords: practical
        ? [
            {
              id: "qualification-route",
              fact: profile.experience[0].limitations,
              source: profile.experience[0].source,
              provenance: "candidate declaration",
            },
          ]
        : [
            {
              id: "education-status",
              fact: profile.education.source,
              source: "src/components/pages/CV/data/common.json",
              provenance: "candidate declaration",
            },
          ],
    };
  }
  if (row.type === "condition" || row.type === "review")
    return {
      ...base,
      status: "Needs review",
      detail:
        row.type === "condition"
          ? `Candidate location: ${profile.logistics?.location || "not recorded"} (CV declaration). Working-hours overlap, authorisation, clearance and other conditions remain unverified. These checks are separate from technical alignment.`
          : "Material wording retained for manual interpretation. No automatic capability score is assigned.",
    };
  const assessments = row.terms.map((term) =>
    assessCapability(term, row, records, profile),
  );
  if (
    row.acceptsSimilar &&
    !assessments.some((a) => a.score >= 60) &&
    row.capability === "Infrastructure as Code"
  )
    assessments.push(
      assessCapability("Infrastructure as Code", row, records, profile),
    );
  assessments.sort((a, b) => b.score - a.score);
  const selected =
    row.logic === "any" && !row.ambiguous ? [assessments[0]] : assessments;
  const score = selected.length
    ? selected.reduce((n, a) => n + a.score, 0) / selected.length
    : 0;
  const supportingRecords = unique(
    selected.flatMap((a) => a.supportingRecords),
  );
  const projectIds = unique(
    supportingRecords
      .filter((e) => directStatus.has(e.status) && e.projectId)
      .map((e) => e.projectId),
  );
  return {
    ...base,
    score,
    status:
      selected.some((a) =>
        ["Confirmed gap", "Conflicting evidence", "Missing evidence"].includes(
          a.evidenceStatus,
        ),
      ) && score === 0
        ? selected[0].evidenceStatus
        : alignmentLabel(score),
    label: alignmentLabel(score),
    detail: selected
      .map((a) => `${row.logic === "any" ? `${a.term}: ` : ""}${a.detail}`)
      .join(" "),
    supportingRecords,
    projects: candidateProjects.filter((p) => projectIds.includes(p.id)),
    credentials: unique(selected.flatMap((a) => a.credentials)),
    alternatives: assessments,
    relation: selected.some((a) => a.relation === "transferable")
      ? "Transferable"
      : "Exact capability",
    confidence: selected.map((a) => a.confidence).join(" / "),
  };
}

export function assessmentKey(
  input,
  records = candidateEvidence,
  profile = candidateProfile,
  asOf = new Date().toISOString().slice(0, 10),
) {
  return `${MODEL_REVISION}:${evidenceFingerprint(records, profile)}:${asOf}:${JSON.stringify(input)}`;
}
export function isAssessmentCurrent(
  result,
  records = candidateEvidence,
  profile = candidateProfile,
  asOf = new Date().toISOString().slice(0, 10),
) {
  return (
    result?.modelRevision === MODEL_REVISION &&
    result?.evidenceRevision === evidenceFingerprint(records, profile) &&
    result?.asOf === asOf
  );
}

export function assessRole(
  { title = "", description = "", company = "" },
  {
    records = candidateEvidence,
    profile = candidateProfile,
    asOf = new Date().toISOString().slice(0, 10),
  } = {},
) {
  if (description.trim().length < 35)
    throw new Error(
      "Paste a fuller role description with responsibilities and required technologies (at least 35 characters).",
    );
  if (description.length > 16000)
    throw new Error("Please shorten the description to 16,000 characters.");
  const requirements = extractRequirements(description);
  if (!requirements.length)
    throw new Error(
      "No assessable requirements recognised. Add specific responsibilities or qualifications.",
    );
  const rows = requirements
    .map((row) => {
      const assessed = assessRequirement(row, records, profile, asOf);
      const weight =
        assessed.score !== null &&
        !row.parentOnly &&
        !["Preferred", "Conditional"].includes(row.importance)
          ? row.importance === "Essential"
            ? 1.5
            : 1
          : 0;
      return {
        ...assessed,
        weight,
        contribution: (assessed.score || 0) * weight,
        label: assessed.status,
        evidenceStrength: assessed.confidence || assessed.status,
        importanceReason: row.ambiguous
          ? "Conflicting wording: review all source phrases"
          : `${row.importance} wording / section`,
        limitations: unique(
          assessed.supportingRecords.map((e) => e.limitations).filter(Boolean),
        ),
        sources: row.sources,
      };
    })
    .sort(
      (a, b) =>
        (b.importance === "Essential") - (a.importance === "Essential") ||
        b.weight - a.weight ||
        (b.score || 0) - (a.score || 0) ||
        a.name.localeCompare(b.name),
    );
  const scored = rows.filter((r) => r.weight > 0),
    numerator = scored.reduce((n, r) => n + r.contribution, 0),
    denominator = scored.reduce((n, r) => n + r.weight, 0);
  const importantGaps = rows.filter(
    (r) =>
      r.importance !== "Preferred" &&
      r.importance !== "Conditional" &&
      !r.parentOnly &&
      ((!r.verified && (r.score === null || r.score < 60)) || r.ambiguous),
  );
  const manualReview = rows.filter(
    (r) =>
      r.type === "review" || r.ambiguous || (r.score === null && !r.verified),
  );
  const strong = rows.filter((r) => r.score >= 60 && !r.parentOnly),
    partial = rows.filter((r) => r.score > 0 && r.score < 60 && !r.parentOnly),
    gaps = rows.filter((r) => r.score === 0 && !r.parentOnly);
  const projects = candidateProjects
    .map((p) => {
      const matches = rows.filter(
        (r) => !r.parentOnly && r.projects.some((x) => x.id === p.id),
      );
      return {
        ...p,
        matches: matches.map((r) => r.name),
        demonstratedMatches: matches.map((r) => r.name),
        rank: matches.reduce((n, r) => {
          const provenance = r.supportingRecords
            .filter((e) => e.projectId === p.id)
            .map((e) => e.provenance);
          const depth = provenance.includes("inspected source/configuration")
            ? 80
            : provenance.includes("documented implementation")
              ? 65
              : 40;
          return n + (r.weight || 0.25) * Math.min(r.score || 0, depth);
        }, 0),
        evidence: unique(
          matches.flatMap((r) =>
            r.supportingRecords.filter((e) => e.projectId === p.id),
          ),
        ).map((e) => ({
          ...e,
          type: e.provenance,
          description: e.fact,
          strength: "capability-specific",
        })),
      };
    })
    .filter((p) => p.rank > 0)
    .sort((a, b) => b.rank - a.rank);
  const training = unique(rows.flatMap((r) => r.credentials)).map((c) => ({
    ...c,
    matches: rows.filter((r) => r.credentials.includes(c)).map((r) => r.name),
  }));
  const categoryAlignment = taxonomy
    .filter((g) => !["google", "microsoft", "aws", "languages"].includes(g.id))
    .map((g) => {
      const matches = scored.filter((r) =>
        r.terms.some((t) => g.skills.includes(t)),
      );
      return {
        name: g.label,
        matches: matches.map((r) => r.name),
        score: matches.length
          ? Math.round(
              matches.reduce((n, r) => n + r.contribution, 0) /
                matches.reduce((n, r) => n + r.weight, 0),
            )
          : null,
      };
    })
    .filter((g) => g.score !== null);
  const direct = scored.filter((r) => r.projects.length > 0).length;
  const score = denominator ? Math.round(numerator / denominator) : null;
  return {
    title,
    company,
    rows,
    strong,
    partial,
    gaps,
    importantGaps,
    manualReview,
    categoryAlignment,
    score,
    matched: strong.length,
    evidenceCoverage: "Recognised requirements only",
    coverageNote: `${direct} of ${scored.length} scored core technical/delivery requirements have project records. Extraction completeness is not measured. ${manualReview.length} criteria need review.`,
    categoryCount: taxonomy.length,
    projects,
    credentials: training,
    qualifications: rows.filter((r) => verificationTypes.includes(r.type)),
    logistics: rows.filter((r) => r.type === "condition"),
    education: [
      ...profile.education.wording,
    ],
    experience: profile.cvExperience.map(
      (e) => `${e.title} · ${e.employer} · ${e.dates}`,
    ),
    modelRevision: MODEL_REVISION,
    evidenceRevision: evidenceFingerprint(records, profile),
    asOf,
    cacheKey: assessmentKey(
      { title, description, company },
      records,
      profile,
      asOf,
    ),
    diagnostics: {
      numerator,
      denominator,
      scoredRequirements: scored.length,
      contributions: scored.map((r) => ({
        id: r.id,
        name: r.name,
        score: r.score,
        weight: r.weight,
        contribution: r.contribution,
      })),
      excluded: rows
        .filter((r) => !r.weight)
        .map((r) => ({
          id: r.id,
          reason: r.parentOnly
            ? "Overlapping parent/group"
            : r.score === null
              ? "Separate verification/review"
              : r.importance,
        })),
    },
    summary: `${
      strong.length
        ? `Strongest relevant support: ${strong
            .slice(0, 4)
            .map((r) => r.name)
            .join(", ")}.`
        : "Direct implementation support is limited."
    } ${importantGaps.length} core criteria have evidence gaps, ambiguity or verification needs. ${manualReview.length ? "Read the review criteria before interpreting alignment." : "Only recognised requirements are assessed."}`,
  };
}
