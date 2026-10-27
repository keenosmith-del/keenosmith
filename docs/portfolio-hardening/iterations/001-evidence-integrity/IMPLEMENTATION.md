# Implementation

Status: implementation verified; full visual/CV and optional-provider prose review pending integrated verification.

Inspected requirement parser/vocabulary/scorer, candidateProfile/candidateEvidence, canonical Assistant knowledge/retrieve/specificAnswer, current CV JSON/README, reviewedProjectFacts/projectEvidence and historical test suites.

Added qualificationEvidence.js: exact field/level, candidate-declared completion, explicit award review, named completed professional credential route and context/years-bounded practical alternative. No degree award date invented. Completion flag retained as historical candidate instruction but no longer grants arbitrary qualifications. Added structured accepted BSc and AI-103/AI-500 status references without changing CV wording.

Leadership records share accepted kailor/Firstdaes responsibilities with the Assistant. Dedicated delivery-leadership evidence receives declaration support; combined technical leadership/mentoring receives transferable support and states missing mentoring/staff-management scope. Hybrid/onsite conditions enter separate review. Overall 6+ baseline and Python duration stay separate; roles are not summed.

Added 11 constructed role fixtures and adversarial credential cases. Existing assertions that required an automatic award pass were corrected. Model contextual-2.2.0; candidate facts 2026-10-27.1; project source revision unchanged. No scoring weights changed. See evidence/role-comparison.json for 20 fixed fixtures before/after.

Count audit: 25 reviewed records, 22 gallery entries, 16 AI-flagged records. Conservative policy excludes kailor-ai/kailor-insider and groups EventOps v1/v2: 13 implementation families. Public 15+ remains pending owner review, explicitly frozen in policy and regression. Hidden Claude implementation can count; hosted status is not inferred. Businesses remain separate.

CV/PDF reconciliation: three accepted 2026 PDF hashes preserved; all four JSON files unchanged. Existing selected AI projects retained. CrewAI/AssessFlow are relevant alternatives, but replacing accepted selections is an editorial career-content decision, deferred to owner. No regeneration required. Browser text/download tests remain required for final verification.

Files modified: candidateProfile, aiInventory, recruiter candidateEvidence/scorer/parser/vocabulary, Assistant knowledge/specificAnswer, server prompt, historical recruiter/refresh assertions and browser model label. New: qualification evaluator, projectCountPolicy, hardening role fixtures/evidence regression. Current CV files, project-page reference styles and Recruiter presentation unchanged.
