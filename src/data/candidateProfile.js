import commonCV from '../components/pages/CV/data/common.json';

// Candidate instructions override older inferred summaries. CV wording is retained;
// assessment completion does not invent an award date or conferral claim.
export const candidateFacts = {
  revision: '2026-10-18.2',
  identity: ['Full-Stack Software Engineer', 'AI Engineer', 'Cloud Engineer'],
  overallExperience: { years: 6, label: '6+ years', source: 'Candidate instruction, 2026-10-18' },
  technologyDuration: { Python: { years: 3, strict: true, label: 'more than three years', source: 'Candidate instruction, 2026-10-18' } },
  education: { assessmentComplete: true, wording: commonCV.education.map(e => `${e.label}: ${e.text}`), source: 'Current CV wording; degree requirement complete under candidate instruction, 2026-10-18' },
  professionalExperience: commonCV.experience,
};
export const educationSummary = commonCV.education.map(e => `${e.label}: ${e.text}.`);
export const experienceSummary = [
  `${candidateFacts.identity.join(', ')} with ${candidateFacts.overallExperience.label} of overall relevant experience across independent engineering, founder work, consulting, professional roles and hands-on project delivery. Overlapping roles are not added together.`,
  ...commonCV.experience.map(e => `${e.title}, ${e.employer} (${e.dates}): ${[...e.paragraphs, ...e.bullets, ...(e.clientWork?.entries.map(c => c.text) || [])].join(' ')}`),
];
// Scoped to the actual responsibilities in commonCV, not inferred from job titles.
export const professionalSkillRecords = [
  { skills: ['Python', 'JavaScript', 'TypeScript', 'AI Evaluation', 'Code Review', 'Testing', 'Documentation'], roleIndex: 0 },
  { skills: ['Stakeholder Communication', 'Solution Architecture', 'API Integration', 'Workflow Design', 'Context engineering'], roleIndex: 1 },
  { skills: ['React', 'JavaScript', 'Node.js', 'REST APIs', 'Testing', 'API Integration'], roleIndex: 2 },
  { skills: ['Requirements Analysis', 'API Integration', 'Troubleshooting', 'Operational Delivery', 'Stakeholder Communication'], roleIndex: 3 },
  { skills: ['Documentation', 'Technical Communication', 'Quality Assurance'], roleIndex: 4 },
].map(r => ({ ...r, type: 'professional', source: 'Current CV', role: commonCV.experience[r.roleIndex], description: commonCV.experience[r.roleIndex].bullets.join(' ') }));
