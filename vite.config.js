import fs from 'node:fs/promises'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import assistant from './server/assistant.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Server-only env values are never assigned to Vite's client define object.
  const env = loadEnv(mode, process.cwd(), 'ASSISTANT_');
  Object.assign(process.env, env);
  return {
  plugins: [react(), {
    name: 'portfolio-assistant-api',
    configureServer(server) { attachAssistant(server); },
    configurePreviewServer(server) {
      attachAssistant(server);
      server.middlewares.use(async (req, res, next) => {
        if (!['GET','HEAD'].includes(req.method)) return next();
        let pathname;
        try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
        catch { res.statusCode=400; res.end('Invalid path'); return; }
        if (pathname === '/') return next();
        const root=path.resolve('dist');
        const candidate=path.resolve(root, '.'+pathname+(path.extname(pathname)?'':'.html'));
        if (!candidate.startsWith(root+path.sep)) { res.statusCode=404; res.end('Not found'); return; }
        try {
          const content=await fs.readFile(candidate);
          if (!candidate.endsWith('.html')) return next();
          res.setHeader('Content-Type','text/html; charset=utf-8');
          res.end(req.method === 'HEAD' ? undefined : content);
        } catch (error) {
          if(error.code!=='ENOENT'&&error.code!=='EISDIR')return next(error);
          res.statusCode=404;res.setHeader('Content-Type','text/html; charset=utf-8');
          res.end(req.method==='HEAD'?undefined:await fs.readFile(path.join(root,'404.html')));
        }
      });
    },
  }],
  build: {
    cssMinify: 'esbuild',
  },
  };
})

function attachAssistant(server) {
  server.middlewares.use('/api/assistant', (req, res) => {
    res.status = (code) => { res.statusCode = code; return res; };
    res.json = (body) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(body)); };
    return assistant(req, res);
  });
}
