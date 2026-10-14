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
    configureServer(server) {
      server.middlewares.use('/api/assistant', (req, res) => {
        res.status = (code) => { res.statusCode = code; return res; };
        res.json = (body) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(body)); };
        return assistant(req, res);
      });
    },
  }],
  build: {
    cssMinify: 'esbuild',
  },
  };
})
