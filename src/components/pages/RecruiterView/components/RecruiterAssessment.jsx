import { useState } from "react";
import { Link } from "react-router-dom";

function RequirementGroup({ title, rows }) {
  if (!rows.length) return null;
  return (
    <section className="recruiter-section">
      <h3>{title}</h3>
      {rows.slice(0, 5).map((r) => (
        <div className="recruiter-match" key={r.id}>
          <div>
            <strong>{r.name}</strong>
            <small>
              {r.importance} · {r.detail}
            </small>
          </div>
          <span>{r.status}</span>
        </div>
      ))}
      {rows.length > 5 && (
        <p className="recruiter-muted">
          {rows.length - 5} more in the detailed breakdown.
        </p>
      )}
    </section>
  );
}
function SupportingRecord({ record: e }) {
  return (
    <li>
      <strong>{e.capability || e.context || "Supporting record"}</strong>
      <p>{e.fact}</p>
      <small>
        {e.provenance}
        {e.status && ` · ${e.status}`}
        {e.platform && ` · ${e.platform}`}
        {e.dates && ` · ${e.dates}`}
        <br />
        {e.inspectedOn
          ? `Inspected ${e.inspectedOn}`
          : e.reviewedOn
            ? `Reviewed ${e.reviewedOn}`
            : ""}
        {e.revision && ` · revision ${e.revision}`}
      </small>
      <p>{e.limitations}</p>
      {e.source?.startsWith("https://") ? (
        <a href={e.source} target="_blank" rel="noreferrer">
          Supporting source (new tab)
        </a>
      ) : (
        <small>{e.source}</small>
      )}
    </li>
  );
}
export default function RecruiterAssessment({ result: r }) {
  const [view, setView] = useState("overview");
  const technicalGaps = r.importantGaps.filter(
    (row) => row.score !== null && !row.ambiguous,
  );
  return (
    <div className="recruiter-result">
      {(r.title || r.company) && (
        <p className="recruiter-role-name">
          {r.title || "Role assessment"}
          {r.company && <small> · {r.company}</small>}
        </p>
      )}
      <small className="recruiter-session-note">
        Model {r.modelRevision} · Evidence {r.evidenceRevision} · Assessed{" "}
        {r.asOf}
      </small>
      <div className="recruiter-score">
        <strong>
          {r.score === null ? "—" : r.score}
          {r.score !== null && <span>%</span>}
        </strong>
        <h3>Core technical and delivery alignment</h3>
        <p>
          {r.score === null
            ? "No core technical/delivery requirements were scored."
            : "Weighted evidence support for the recognised core requirements."}{" "}
          Qualifications and review criteria below must be considered
          separately.
        </p>
        <details>
          <summary>Calculation and limits</summary>
          <p>
            Technologies and delivery responsibilities have equal base weight.
            Required wording weighs 1.5; ordinary requirements weigh 1.
            Alternatives count once. Preferred and conditional requirements,
            overlapping parents, tenure, qualifications, logistics and
            unassessed criteria are excluded from this percentage.
            Source-supported implementation scores 80, documented implementation
            65, declared professional scope 40, transferable support 30,
            training 25, listed capability 15 and missing/conflicting evidence
            0. Project count and extra training add no bonus. Evidence support
            is not proficiency or hiring probability.
          </p>
          <p>
            Weighted total {r.diagnostics.numerator.toFixed(2)} /{" "}
            {r.diagnostics.denominator.toFixed(2)} ={" "}
            {r.score === null ? "not applicable" : `${r.score}% (rounded)`}.
          </p>
        </details>
      </div>
      <div className="recruiter-coverage">
        <strong>{r.evidenceCoverage}</strong>
        <small>
          {r.coverageNote} Confidence and provenance vary by supporting record.
          Read the original advert alongside this assessment.
        </small>
      </div>
      <section className="recruiter-requirements-summary">
        <h3>Assessment interpretation</h3>
        <p>{r.summary}</p>
      </section>
      {!!technicalGaps.length && (
        <div className="recruiter-important-gaps">
          <RequirementGroup
            title="Material gaps and verification needs"
            rows={technicalGaps}
          />
        </div>
      )}
      <RequirementGroup
        title="Experience and qualification verification"
        rows={r.qualifications}
      />
      <RequirementGroup title="Logistical compatibility" rows={r.logistics} />
      <RequirementGroup
        title="Important criteria requiring review"
        rows={r.manualReview.filter((x) => x.type === "review" || x.ambiguous)}
      />
      <div
        className="recruiter-view-switch"
        role="group"
        aria-label="Assessment view"
      >
        {["overview", "detailed"].map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={view === v}
            onClick={() => setView(v)}
          >
            {v === "overview" ? "Overview" : "Detailed breakdown"}
          </button>
        ))}
      </div>
      {view === "overview" ? (
        <>
          <RequirementGroup
            title="Strongest role-relevant support"
            rows={r.strong}
          />
          <RequirementGroup
            title="Partial or limited support"
            rows={r.partial}
          />
          <RequirementGroup
            title="Missing or conflicting evidence"
            rows={r.gaps}
          />
          {!!r.categoryAlignment.length && (
            <details className="recruiter-section recruiter-category-alignment">
              <summary>Core requirements by category</summary>
              <p>
                These summaries use the same scored requirement rows. They add
                no requirements or score contributions.
              </p>
              {r.categoryAlignment.map((c) => (
                <details key={c.name}>
                  <summary>
                    {c.name} · {c.score}% evidence alignment
                  </summary>
                  <p>{c.matches.join(", ")}</p>
                </details>
              ))}
            </details>
          )}
          <section className="recruiter-section">
            <h3>Supporting projects</h3>
            {r.projects.length === 0 && (
              <p>
                No built project evidence supports the recognised requirements.
              </p>
            )}
            {r.projects.slice(0, 3).map((p) => (
              <article className="recruiter-evidence" key={p.id}>
                <h4>{p.title}</h4>
                <small>
                  {p.portfolioPublicationStatus === "not-yet-published"
                    ? "Built · Portfolio page coming soon"
                    : p.status}
                </small>
                <p className="recruiter-relevance">
                  Relevant support: {p.matches.slice(0, 5).join(", ")}.
                </p>
                <details>
                  <summary>Relevant evidence and limitations</summary>
                  <ul className="recruiter-provenance">
                    {p.evidence.map((e) => (
                      <SupportingRecord key={e.id} record={e} />
                    ))}
                  </ul>
                  <div className="recruiter-links">
                    {p.path && <Link to={p.path}>View project</Link>}
                    {p.repository && (
                      <a href={p.repository} target="_blank" rel="noreferrer">
                        Repository (new tab)
                      </a>
                    )}
                  </div>
                </details>
              </article>
            ))}
          </section>
        </>
      ) : (
        <section className="recruiter-section">
          <h3>Requirement-by-requirement analysis</h3>
          {r.rows.map((row) => (
            <article className="recruiter-requirement" key={row.id}>
              <div className="recruiter-match">
                <strong>{row.name}</strong>
                <span>{row.status}</span>
              </div>
              <small className="recruiter-requirement-meta">
                {row.importance} · {row.importanceReason}
                <br />
                {row.logic === "any"
                  ? "Any accepted alternative"
                  : row.logic === "all"
                    ? "All required"
                    : "Individual requirement"}
                {row.capability && ` · ${row.capability}`}
                {row.parentOnly &&
                  " · Included within another scored requirement"}
              </small>
              <p>{row.detail}</p>
              {row.ambiguous && (
                <p>
                  Needs review: conflicting importance,
                  alternatives/conjunctions or experience bounds appear in the
                  advert.
                </p>
              )}
              <details>
                <summary>Employer wording and evidence needed</summary>
                {row.sources.map((s, i) => (
                  <blockquote key={i}>
                    {s.phrase}
                    <small>
                      {s.section} · {s.importance}
                    </small>
                  </blockquote>
                ))}
                <p>{row.evidenceNeeded}</p>
              </details>
              <p className="recruiter-strongest-evidence">
                {row.relation || "Verification"} · {row.evidenceStrength}.{" "}
                {row.weight
                  ? `Score ${row.score}; weight ${row.weight}; contribution ${row.contribution.toFixed(2)} / ${r.diagnostics.denominator.toFixed(2)} total weight.`
                  : "Excluded from headline calculation."}
              </p>
              {!!row.supportingRecords.length && (
                <details>
                  <summary>
                    Supporting records and limitations (
                    {row.supportingRecords.length})
                  </summary>
                  <ul className="recruiter-provenance">
                    {row.supportingRecords.map((e, i) => (
                      <SupportingRecord key={e.id || i} record={e} />
                    ))}
                  </ul>
                </details>
              )}
              {!!row.alternatives?.length && row.logic === "any" && (
                <details>
                  <summary>Alternative assessment</summary>
                  {row.alternatives.map((a) => (
                    <p key={a.term}>
                      {a.term}: {a.score} evidence points · {a.detail}
                    </p>
                  ))}
                </details>
              )}
              <div className="recruiter-links">
                {row.projects.map((p) => (
                  <details key={p.id}>
                    <summary>{p.title}</summary>
                    <Link to={p.path || "/cv"}>View project</Link>
                  </details>
                ))}
              </div>
              {row.credentials.map((c) => (
                <p key={c.id}>
                  <Link to={c.path}>{c.name}</Link> ·{" "}
                  {c.credentialTypes.join(" / ")} · {c.status}
                </p>
              ))}
            </article>
          ))}
          <details>
            <summary>Calculation diagnostics</summary>
            <pre className="recruiter-diagnostics">
              {JSON.stringify(r.diagnostics, null, 2)}
            </pre>
          </details>
        </section>
      )}
      {!!r.credentials.length && (
        <details className="recruiter-section recruiter-training">
          <summary>Relevant training records</summary>
          <p>
            Credential types and completion status are preserved. Training does
            not verify implementation or a requested professional certification.
          </p>
          {r.credentials.slice(0, 4).map((c) => (
            <article className="recruiter-evidence" key={c.id}>
              <h4>{c.name}</h4>
              <small>
                {c.credentialTypes.join(" · ")} · {c.status}
              </small>
              <p>Relevant to {c.matches.join(", ")}</p>
              <Link to={c.path}>View credential record</Link>
            </article>
          ))}
        </details>
      )}
      {!!r.qualifications.length && (
        <section className="recruiter-section">
          <h3>Recorded education and professional context</h3>
          {r.education.map((e) => (
            <p key={e}>{e}</p>
          ))}
          {r.experience.map((e) => (
            <p key={e}>{e}</p>
          ))}
          <Link to="/cv">Review CV →</Link>
        </section>
      )}
      <p className="recruiter-limitations">
        Local assessment of recorded evidence. Complex or unrecognised requirements
        may need review; detailed sources distinguish implementation, professional
        work, education and candidate declarations.
      </p>
    </div>
  );
}
