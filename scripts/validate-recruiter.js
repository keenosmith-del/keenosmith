import assert from "node:assert/strict";
import { build } from "esbuild";
import { roles } from "./fixtures/recruiter/roles.js";
await build({
  entryPoints: [
    "src/components/pages/RecruiterView/utils/recruiterScoring.js",
    "src/components/pages/RecruiterView/utils/candidateEvidence.js",
  ],
  bundle: true,
  platform: "node",
  format: "esm",
  outdir: "/tmp/portfolio-recruiter-tests",
  loader: { ".png": "dataurl", ".webp": "dataurl" },
  outExtension: { ".js": ".mjs" },
});
const { assessRole, assessmentKey, isAssessmentCurrent } =
  await import("/tmp/portfolio-recruiter-tests/recruiterScoring.mjs");
const { candidateEvidence, candidateProfile } =
  await import("/tmp/portfolio-recruiter-tests/candidateEvidence.mjs");
const asOf = "2026-10-18";
const run = (description, options = {}) =>
  assessRole({ title: "Engineer", description }, { asOf, ...options });
const names = (r) =>
  r.rows.filter((x) => x.type === "technology").flatMap((x) => x.terms);
const row = (r, name) => r.rows.find((x) => x.name === name);
const results = roles.map((role) => assessRole(role, { asOf }));
for (const r of results) {
  assert.equal(
    r.score,
    r.diagnostics.denominator
      ? Math.round(r.diagnostics.numerator / r.diagnostics.denominator)
      : null,
    r.title,
  );
  assert.equal(
    r.rows.reduce((n, x) => n + x.contribution, 0),
    r.diagnostics.numerator,
  );
  assert.equal(
    r.rows.reduce((n, x) => n + x.weight, 0),
    r.diagnostics.denominator,
  );
  assert.equal(
    r.diagnostics.contributions.length,
    r.rows.filter((x) => x.weight).length,
  );
  assert.equal(new Set(r.rows.map((x) => x.id)).size, r.rows.length);
  assert(r.rows.every((x) => x.sourcePhrase && x.sources.length && x.section));
  assert(
    r.rows
      .filter((x) => ["Preferred", "Conditional"].includes(x.importance))
      .every((x) => x.weight === 0),
  );
  assert(
    !r.importantGaps.some((x) =>
      ["Preferred", "Conditional"].includes(x.importance),
    ),
  );
  assert(!r.rows.some((x) => x.name === "Required certification"));
  assert(r.projects.every((p) => p.matches.length));
  assert(!r.summary.includes("High coverage"));
}
const [a, b, c, d, e, f, g, h, i] = results;
assert.equal(a.rows.filter((x) => x.type === "experience").length, 3);
assert.equal(
  a.rows.find((x) => x.type === "experience" && /Python/.test(x.name)).status,
  "Candidate-declared support",
);
assert.equal(
  a.rows.find((x) => x.type === "experience" && /Azure/.test(x.name)).status,
  "Needs review",
);
assert(!names(a).includes("n8n"));
assert(a.manualReview.some((x) => /clinical workflows/.test(x.sourcePhrase)));
assert(row(b, "Fastify or Express.js or NestJS"));
assert(row(b, "AWS or Google Cloud or Azure"));
assert(row(b, "Docker") && row(b, "Jest or Vitest"));
assert.equal(row(b, "Next.js").importance, "Preferred");
assert(!b.rows.some((x) => /cover letter|CV length/i.test(x.name)));
assert(c.rows.some((x) => x.ambiguous && /React/.test(x.name)));
assert.equal(row(c, "Operational scale").score, 0);
assert.equal(row(c, "Measured outcomes").score, 0);
assert.equal(row(c, "Fine-tuning").importance, "Conditional");
assert.equal(d.rows.filter((x) => x.type === "qualification").length, 1);
assert.equal(
  d.rows.find((x) => x.type === "qualification").status,
  "Candidate-declared alternative support",
);
for (const name of ["Git", "CloudFormation", "API Gateway", "Lambda"])
  assert(names(d).includes(name), name);
assert(!names(d).includes("Go") && !names(d).includes("Express.js"));
assert.equal(row(d, "Lambda").importance, "Preferred");
assert.equal(row(d, "Stakeholder communication").score, 40);
assert(row(d, "AI-assisted development"));
assert(!row(d, "Production AI operations"));
assert(names(e).includes(".NET 8"));
assert(!names(e).includes(".NET"));
assert(row(e, "Docker") && row(e, "Kubernetes"));
assert.equal(row(e, "Technical leadership and mentoring").score, 30);
assert.equal(row(e, "Team AI coding standards").score, 0);
assert.equal(row(e, "Python").importance, "Preferred");
assert(names(f).includes("SQL Server") && !names(f).includes("SQL"));
assert(row(f, ".NET Core or .NET Framework"));
assert(f.qualifications.some((x) => x.type === "education" && !x.verified));
assert(!row(f, "Security"));
assert(g.rows.some((x) => x.type === "experience" && x.ambiguous));
assert(g.logistics.length);
assert(!row(g, "Make"));
assert(row(g, "n8n or Make or Zapier"));
for (const name of ["JSON", "Docker", "Git", "LangGraph", "CrewAI", "MCP"])
  assert(names(h).includes(name), name);
assert(row(h, "AI evaluation and safety"));
assert.equal(row(i, "Google Cloud").importance, "Essential");
assert.equal(row(i, "GitOps").importance, "Preferred");
assert(
  i.rows.some(
    (x) => x.type === "qualification" && x.importance === "Preferred",
  ),
);
assert(row(i, "Grafana or Prometheus or Datadog"));
// Regression semantics independent of candidate-favourable percentages.
const falsePositives = run(
  "Responsibilities: Express themselves clearly. Support Go-live activities. Make business processes easier. Team named Cloud, Data, and Code. Infected codebases are under attack from zombies.",
);
assert(
  !names(falsePositives).some((n) =>
    ["Express.js", "Go", "Make", "Cloud", "Code", "Data"].includes(n),
  ),
);
assert(!row(falsePositives, "Security"));
const mixed = run(
  "Minimum Requirements:\nReact, Azure and advantageous Python for application development.",
);
assert.equal(row(mixed, "React").importance, "Essential");
assert.equal(row(mixed, "Azure").importance, "Essential");
assert.equal(row(mixed, "Python").importance, "Preferred");
assert(!names(a).includes("Workflows"));
assert.equal(h.rows.filter((x) => x.name === "Tool calling").length, 1);
assert.equal(g.logistics[0].importance, "Essential");
const once = run("Requirements:\nReact\nDocker\nGit for software development");
const twice = run(
  "Requirements:\nReact\nDocker\nGit for software development\nReact\nDocker\nGit for software development",
);
assert.equal(once.diagnostics.denominator, twice.diagnostics.denominator);
assert.equal(once.score, twice.score);
const or = run(
  "Required skills: React or Next.js for building web applications.",
);
assert.equal(or.rows.filter((x) => x.type === "technology").length, 1);
assert.equal(
  row(or, "React or Next.js").score,
  row(run("Required skills: React for building web applications."), "React")
    .score,
);
const and = run(
  "Required skills: React and Next.js for building web applications.",
);
assert.equal(and.rows.filter((x) => x.type === "technology").length, 2);
assert(and.score < or.score);
assert.equal(
  run("Requirements: React. Preferred: SAP and Salesforce.").score,
  run("Requirements: React applications for browser based interfaces.").score,
);
assert(
  row(
    run("Required: Terraform and IaC using Terraform for infrastructure."),
    "Infrastructure as Code",
  )?.weight === 0 ||
    !row(
      run("Required: Terraform and IaC using Terraform for infrastructure."),
      "Infrastructure as Code",
    ),
);
const scarce = run(
  "Required skills: SAP and Salesforce implementation for enterprise systems.",
);
assert.equal(scarce.score, 0);
assert.equal(scarce.projects.length, 0);
const allRows = results.flatMap((x) => x.rows);
assert(
  allRows
    .filter((x) =>
      [
        "Operational scale",
        "Live-system migration",
        "Team AI coding standards",
      ].includes(x.name),
    )
    .every((x) => x.score === 0),
);
const pyPaid = run(
  "Requirements: 3 years paid Python employment experience in backend applications.",
);
assert(!pyPaid.qualifications[0].verified);
const tooLong = run(
  "Requirements: Minimum 8 years software engineering experience for application delivery.",
);
assert(!tooLong.qualifications[0].verified);
const career = run(
  "Requirements: Minimum 3 years software engineering experience in full-stack applications.",
);
assert(career.qualifications[0].verified);
const noAward = run(
  "Requirements: An awarded degree in computer science with no alternative qualification.",
);
assert(!noAward.qualifications[0].verified);
assert(!noAward.qualifications[0].verified);
assert(!JSON.stringify(noAward.education).includes("324/360"));
// Specificity: related tools never become exact requested operations.
for (const phrase of [
  "Required skills: GCP IAM and AWS IAM across cloud resources.",
  "Required skills: .NET 8 backend services with C# programming.",
  "Requirements: Vector databases operations, TDD and Agile/Scrum team experience.",
]) {
  const assessed = run(phrase);
  assert(
    !assessed.rows.some(
      (x) =>
        [
          "GCP IAM",
          "AWS IAM",
          ".NET 8",
          "Vector databases",
          "TDD",
          "Agile/Scrum",
        ].includes(x.name) &&
        x.relation === "Exact capability" &&
        x.score >= 60,
    ),
  );
}
const claude = run(
  "Requirements: Anthropic Claude API integration for document processing.",
);
assert(row(claude, "Anthropic").score >= 65);
assert(
  row(claude, "Anthropic").supportingRecords.some((e) =>
    e.limitations.includes("not verified live Claude"),
  ),
);
const staleClaude = run(
  "Requirements: Anthropic Claude API integration for document processing.",
  {
    records: candidateEvidence.map((e) =>
      e.capability === "Anthropic" ? { ...e, status: "planned" } : e,
    ),
  },
);
assert(row(staleClaude, "Anthropic").score < row(claude, "Anthropic").score);

assert(
  row(
    run(
      "Requirements: Google Gemini integration for grounded document answers.",
    ),
    "Google Gemini",
  ).score >= 65,
);
for (const capability of [
  "Git",
  "GitHub",
  "GitHub Actions",
  "CI/CD",
  "HTML",
  "CSS",
  "API design",
  "Async programming",
  "Prompt engineering",
  "Context engineering",
  "Workflow orchestration",
]) {
  assert(
    candidateEvidence.some(
      (e) =>
        e.capability === capability &&
        [
          "inspected source/configuration",
          "documented implementation",
        ].includes(e.provenance),
    ),
    capability,
  );
}
const versioned = run(
  "Requirements: React 18 and Python 3.12 for web development.",
);
assert(names(versioned).includes("React 18"));
assert(row(versioned, "React 18").score < 60);
const optionalChild = run(
  "Requirements: LLM integration such as OpenAI for generated answers.",
);
assert(row(optionalChild, "LLM Integration").weight > 0);
const optionalIaC = run(
  "Requirements: Infrastructure as Code. Preferred: Terraform for provisioning.",
);
assert(row(optionalIaC, "Infrastructure as Code").weight > 0);
const examples = run(
  "Requirements: Observability with monitoring tools such as Grafana or Datadog.",
);
assert(!examples.importantGaps.some((x) => x.terms.includes("Datadog")));
assert.equal(row(examples, "Grafana or Datadog").importance, "Conditional");
const unknown = run(
  "Requirements: React, Elixir and custom COBOL migration services.",
);
assert(
  unknown.manualReview.some(
    (x) => x.type === "review" && /Elixir/.test(x.sourcePhrase),
  ),
);
const unknownPlain = run(
  "Requirements: React and Elixir integration for browser applications.",
);
assert(unknownPlain.manualReview.some((x) => /Elixir/.test(x.sourcePhrase)));
const input = {
  description: "Required: Swift implementation for dependable backend services.",
};
const baseline = assessRole(input, { asOf });
const added = {
  id: "new-swift",
  capability: "Swift",
  projectId: "portfolio",
  status: "built",
  fact: "Test-only inspected Swift implementation",
  provenance: "inspected source/configuration",
  source: "fixture.rs",
};
const enriched = [...candidateEvidence, added];
const improved = assessRole(input, { asOf, records: enriched });
assert(improved.score > baseline.score);
const downgraded = assessRole(input, {
  asOf,
  records: [...candidateEvidence, { ...added, status: "planned" }],
});
assert.equal(downgraded.score, baseline.score);
const confirmed = assessRole(input, {
  asOf,
  records: [...candidateEvidence, { ...added, status: "confirmed-gap" }],
});
assert.equal(row(confirmed, "Swift").status, "Confirmed gap");
const conflict = assessRole(input, {
  asOf,
  records: [
    ...candidateEvidence,
    { ...added, provenance: "conflicting evidence", status: "needs-review" },
  ],
});
assert.equal(row(conflict, "Swift").status, "Conflicting evidence");
assert.equal(row(baseline, "Swift").status, "Missing evidence");
assert.notEqual(baseline.evidenceRevision, improved.evidenceRevision);
assert.notEqual(
  assessmentKey(input, candidateEvidence, candidateProfile, asOf),
  assessmentKey(input, enriched, candidateProfile, asOf),
);
assert(
  isAssessmentCurrent(baseline, candidateEvidence, candidateProfile, asOf),
);
assert(!isAssessmentCurrent(baseline, enriched, candidateProfile, asOf));
assert(
  !isAssessmentCurrent(
    { ...baseline, modelRevision: "old" },
    candidateEvidence,
    candidateProfile,
    asOf,
  ),
);
assert(
  !isAssessmentCurrent(
    baseline,
    candidateEvidence,
    { ...candidateProfile, education: { awarded: true } },
    asOf,
  ),
);
assert.deepEqual(run(roles[0].description), run(roles[0].description));
assert.throws(() => run(""), /fuller/);
assert.throws(() => run("React ".repeat(3000)), /16,000/);
console.log(
  `Recruiter regression: ${roles.length} representative roles; contextual groups, importance, false positives, scope, provenance, tenure, qualification routes, review criteria, evidence mutations, revision invalidation and contribution reconciliation passed.`,
);
