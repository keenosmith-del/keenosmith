// The accents are the exact existing featured-project backgrounds.
// Charcoal anchors each composition; neighbouring slots alternate light and warm surfaces.
const projectColors = ['charcoal', 'neutral', 'pink', 'surface', 'yellow', 'charcoal', 'orange'];
export const projectTone = index => projectColors[index % projectColors.length];
export function skillPresentation(skill, index) {
 const major = skill.assessment.band === 4 && skill.projects.length >= 8;
 const tone = major ? 'charcoal' : ['charcoal', 'charcoal', 'surface', 'charcoal', 'charcoal', 'surface'][index % 6];
 return { tone, major, compact: skill.assessment.band < 2 };
}
export const credentialTone = (credential, index) => index % 6 === 4 ? 'charcoal' : 'surface';

// Every template is a complete rectangle: no empty cells, text-driven heights or masonry.
const templates = {
 1: ['a a a'],
 2: ['a b'],
 3: ['a a b', 'c c b'],
 4: ['a a b', 'c d b'],
 5: ['a a b', 'c d b', 'e e e'],
 6: ['a a b', 'c d b', 'e f f'],
 7: ['a a b', 'c d b', 'c e f', 'g g f'],
};
export function composeProjects(projects) {
 const groups = [];
 for (let start = 0; start < projects.length; start += 7) {
  const items = projects.slice(start, start + 7);
  const rows = templates[items.length];
  const mirrored = groups.length % 2 === 1;
  const areas = rows.map(row => mirrored ? row.split(' ').reverse().join(' ') : row);
  groups.push({ key: items.map(p => p.id).join(':'), areas: areas.map(row => `"${row}"`).join(' '), rows: rows.length, columns: rows[0].split(' ').length, items: items.map((project, index) => {
   const area = String.fromCharCode(97 + index);
   const occurrences = rows.map(row => row.split(' ').filter(cell => cell === area).length);
   const width = Math.max(...occurrences), height = occurrences.filter(Boolean).length;
   const shape = width > 1 ? (index === 0 ? 'feature' : 'wide') : height > 1 ? 'tall' : 'standard';
   return { project, area, shape };
  }) });
 }
 return groups;
}
