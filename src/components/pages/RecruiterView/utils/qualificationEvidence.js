// Credential matching is separate from technical alignment. The accepted CV
// does not establish every award, credential level or professional certification.
const source = 'src/components/pages/CV/data/common.json';
const computerScience = /\b(?:computer science|computing)\b/i;
const specificDegree = /\b(?:bsc|bachelor(?:'s)?|degree)\b/i;
const unsupportedLevel = /\b(?:master(?:'s)?|msc|phd|doctorate|honours|honors|mba|diploma|associate degree)\b/i;
const strictAward = /\b(?:awarded|conferred|conferral|graduated|accredited|recognised|recognized)\b/i;
const professionalContext = /\b(?:commercial|paid|production|enterprise|regulated|management|leadership|medical|clinical|finance|banking)\b/i;

export function evaluateQualification(row, profile) {
  const text = row.sourcePhrase;
  const education = profile.education;
  const records = education.records || [];
  const result = (verified, status, detail, record) => ({
    verified, status, detail,
    supportingRecords: record ? [{ id: 'qualification-record', fact: record.wording, source: record.source || source, provenance: 'candidate declaration', limitations: 'Accepted CV and candidate declaration; no independent award verification or conferral date.' }] : [],
  });
  // A broad mention of education, or an unspecified degree/field, stays reviewable.
  // A completed BSc CS declaration cannot satisfy higher or unrelated disciplines.
  const degree = records.find(r => r.kind === 'degree' && r.discipline === 'Computer Science');
  const degreeClause = text.split(/\bor\b/i)[0];
  const requestedDiscipline = computerScience.test(degreeClause);
  const unrelatedDiscipline = /\b(?:in|of)\s+(?:law|medicine|nursing|business|accounting|finance|mechanical|electrical|civil|data science|mathematics|physics)\b/i.test(degreeClause);
  const hasDegreeRoute = row.type !== 'certification' && specificDegree.test(degreeClause) && requestedDiscipline && !unrelatedDiscipline && !unsupportedLevel.test(degreeClause);
  if (hasDegreeRoute && degree?.completion === 'candidate-declared complete' && !strictAward.test(degreeClause)) {
    return result(true, 'Candidate-declared support', 'The accepted BSc Computer Science record and candidate completion instruction support this field and level. Award/conferral is not independently established.', degree);
  }
  // Only exact completed credential identifiers can establish a named route.
  const requestedCodes = text.match(/\b[A-Z]{2,5}-\d{2,4}\b/gi) || [];
  if (row.type === 'certification' && requestedCodes.length === 1) {
    const credential = records.find(r => r.kind === 'professional certification' && r.identifier === requestedCodes[0].toUpperCase() && r.completion === 'completed');
    if (credential && !/\b(?:verified|valid|active|current|awarded)\b/i.test(text)) return result(true, 'Candidate-declared support', `The accepted CV explicitly records ${credential.identifier} as completed. This is candidate-declared completion; current issuer verification remains separate.`, credential);
  }
  if (row.practicalRoute) {
    const practicalClause = text.split(/\bor\b|\balternatively\b/i).filter(t => /experience/i.test(t)).join(' ');
    const scoped = /\b(?:software|engineering|full[- ]stack|technical)\b/i.test(practicalClause);
    const years = practicalClause.match(/(?:(more than|over)\s+)?(\d+)\s*\+?\s*years?/i);
    const minimumSupported = !years || (years[1] ? profile.overallExperience.years > Number(years[2]) : profile.overallExperience.years >= Number(years[2]));
    if (scoped && minimumSupported && !professionalContext.test(practicalClause) && !/\b(?:cloud|azure|aws|python|c#|\.net|java|security|hardware)\b/i.test(practicalClause)) {
      return result(true, 'Candidate-declared alternative support', `The advert explicitly accepts software/technical engineering experience. The recorded ${profile.overallExperience.label} overall baseline supports this route; overlapping roles are not summed. No technology-specific or enterprise tenure is inferred.`, { wording: profile.overallExperience.label, source: profile.overallExperience.source });
    }
    return result(false, 'Needs review', 'An experience alternative is stated, but its field, duration or commercial/production context is not established by the overall career baseline. Review that route separately from the qualification.', degree);
  }
  return result(false, 'Needs review', `The exact requested credential, discipline, level and award status are not established by a general education completion flag. ${strictAward.test(text) ? 'The accepted records do not explicitly establish conferral/award or recognition for this request. ' : ''}Courses and Applied Skills are not interchangeable with professional certifications. Accepted education: ${education.wording.join('; ')}`, degree);
}
