import { build } from 'esbuild';
await build({ entryPoints: ['server/catalogue-entry.js'], bundle: true, platform: 'node', format: 'esm',
  outfile: 'server/catalogue.generated.js', loader: { '.png': 'empty', '.webp': 'empty' } });
