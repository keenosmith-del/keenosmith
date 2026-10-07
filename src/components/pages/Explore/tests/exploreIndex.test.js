// Run with: node src/components/pages/Explore/tests/exploreIndex.test.js
import assert from 'node:assert/strict';
import { createServer } from 'vite';
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
 const { projectIndex, skillIndex, credentialIndex, matchesQuery, relatedSkills, relatedCredentials } = await server.ssrLoadModule('/src/components/pages/Explore/utils/exploreIndex.js');
 const { composeProjects } = await server.ssrLoadModule('/src/components/pages/Explore/utils/explorePresentation.js');
 // Every full or filtered tail is a rectangular, fully occupied puzzle.
 for (let count = 1; count <= 37; count++) {
  const groups = composeProjects(projectIndex.slice(0, count));
  assert.equal(groups.flatMap(g => g.items).length, count);
  for (const group of groups) {
   const rows = [...group.areas.matchAll(/"([^"]+)"/g)].map(m => m[1].split(' '));
   assert.ok(rows.every(row => row.length === group.columns));
   assert.ok(rows.flat().every(area => group.items.some(i => i.area === area)));
   for (const item of group.items) {
    const cells = rows.flatMap((row, y) => row.map((area, x) => ({ area, x, y }))).filter(cell => cell.area === item.area);
    const xs = cells.map(cell => cell.x), ys = cells.map(cell => cell.y);
    assert.equal(cells.length, (Math.max(...xs) - Math.min(...xs) + 1) * (Math.max(...ys) - Math.min(...ys) + 1));
   }
  }
 }
 const { evidence } = await server.ssrLoadModule('/src/assistant/retrieve.js');
 assert.equal(new Set(projectIndex.map(p => p.id)).size, projectIndex.length);
 assert.equal(new Set(skillIndex.map(s => s.id)).size, skillIndex.length);
 assert.ok(projectIndex.filter(p => matchesQuery(p, 'Azure')).some(p => p.id === 'microsoft'));
 assert.ok(projectIndex.filter(p => matchesQuery(p, 'banking')).some(p => p.id === 'banking-risk'));
 assert.ok(projectIndex.filter(p => matchesQuery(p, 'AI agents')).length);
 assert.ok(projectIndex.filter(p => matchesQuery(p, 'kubernetes')).some(p => p.id === 'distributed-reliability'));
 const google = skillIndex.filter(s => matchesQuery(s, 'Google'));
 assert.ok(google.some(s => s.name === 'BigQuery'));
 assert.ok(google.some(s => s.name === 'Vertex AI'));
 assert.ok(!google.some(s => s.name === 'Microsoft Foundry'));
 const react = skillIndex.find(s => s.id === 'react');
 assert.ok(react.projects.some(p => p.id === 'ai-assistant'));
 assert.ok(relatedSkills(react).some(s => s.name === 'TypeScript'));
 assert.ok(relatedCredentials(skillIndex.find(s => s.name === 'Azure')).length);
 // A broader skill must not count as direct evidence for a specific tool.
 assert.ok(evidence('React Router').band < evidence('React').band);
 for (const s of skillIndex) assert.ok(s.assessment.detail.startsWith(`${s.projects.length} implemented project`), `Evidence count differs for ${s.name}`);
 assert.equal(credentialIndex.filter(c => matchesQuery(c, 'Microsoft')).length, 4);
 assert.equal(credentialIndex.filter(c => c.type === 'Education').length, 2);
 assert.ok(credentialIndex.find(c => c.id === 'education-0').status.includes('not confirmed'));
 assert.ok(projectIndex.every(p => p.route?.startsWith('/projects/') || p.route?.startsWith('/explore/projects/')));
 assert.equal(projectIndex.find(p => p.id === 'banking-risk').route, '/projects/aws');
 assert.equal(projectIndex.find(p => p.id === 'vertex-ai-retail').route, '/projects/gcp');
 assert.ok(!projectIndex.some(p => matchesQuery(p, 'zzznomatchzzz')));
 console.log(JSON.stringify({ projects: projectIndex.length, builtProjects: projectIndex.filter(p => p.demonstrated).length, skills: skillIndex.length, credentials: credentialIndex.length, googleSkills: google.length, types: [...new Set(credentialIndex.map(c => c.type))], result: 'All Explore index assertions passed' }, null, 2));
} finally { await server.close(); }
