// Development-time receipt export. No network or credentials and no runtime scan.
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { build } from 'esbuild';
import { reviewedProjects, evidenceRevision } from '../src/data/projectEvidence.js';
import { qualifyingAIProjects, aiProjectTarget } from '../src/data/aiInventory.js';
import { canonicalSkill } from '../src/data/skillNames.js';
await build({ stdin: { contents: `export { skills, canonicalProjects } from './src/assistant/knowledge.js';`, resolveDir: process.cwd() }, bundle:true, platform:'node', format:'esm', outfile:'/tmp/portfolio-current-evidence-export.mjs', loader:{'.png':'empty','.webp':'empty'} });
const current = await import('/tmp/portfolio-current-evidence-export.mjs');
const baseline = '8bdabc9';
await build({ stdin: { contents: `export { skills } from './src/assistant/knowledge.js';`, resolveDir:process.cwd() }, bundle:true, platform:'node', format:'esm', outfile:'/tmp/portfolio-baseline-skills.mjs', plugins:[{
  name:'read-only-baseline', setup(builder) {
    builder.onResolve({filter:/^\./}, args => ({path:path.resolve(args.resolveDir,args.path),namespace:'baseline'}));
    builder.onLoad({filter:/.*/,namespace:'baseline'}, args => {
      if (/\.(png|jpe?g|svg|webp)$/.test(args.path)) return {contents:'export default "";',loader:'js'};
      const relative=path.relative(process.cwd(),args.path);
      return {contents:execFileSync('git',['show',`${baseline}:${relative}`],{encoding:'utf8'}),resolveDir:path.dirname(args.path),loader:args.path.endsWith('.json')?'json':'js'};
    });
  }
}] });
const previous = await import('/tmp/portfolio-baseline-skills.mjs');
const oldCanonical=new Set(previous.skills.map(canonicalSkill));
const nowCanonical=new Set(current.skills.map(canonicalSkill));
const snapshot={
  revision:evidenceRevision,baseline,
  counts:{canonicalRecords:current.canonicalProjects.length,reviewedImplementations:reviewedProjects.length,publicSkills:current.skills.length,displayedAIProjects:aiProjectTarget,qualifyingAIImplementations:qualifyingAIProjects.length},
  newSkills:[...nowCanonical].filter(name=>!oldCanonical.has(name)).sort(),
  historicalOnlySkills:[...oldCanonical].filter(name=>!nowCanonical.has(name)).sort(),
  aliasesReconciled:previous.skills.filter(name=>canonicalSkill(name)!==name).map(name=>({previous:name,canonical:canonicalSkill(name)})),
  aiInventory:qualifyingAIProjects.map(({id,repository,sourceCommit,deployment})=>({id,repository,sourceCommit,deployment})),
  projects:reviewedProjects.map(({id,title,repository,sourceCommit,localSourceCommit,path,categories,technologies,adapterTechnologies,configuredTechnologies,capabilities,sources,deployment,verificationScope})=>({id,title,repository,sourceCommit,localSourceCommit,path,categories,technologies,adapterTechnologies,configuredTechnologies,capabilities,sources,deployment,verificationScope})),
};
await fs.writeFile('docs/evidence/current-portfolio-capabilities.json',JSON.stringify(snapshot,null,2)+'\n');
console.log(JSON.stringify({counts:snapshot.counts,newSkills:snapshot.newSkills,aliases:snapshot.aliasesReconciled,historicalOnlySkills:snapshot.historicalOnlySkills},null,2));
