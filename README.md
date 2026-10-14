

## Portfolio Assistant

The existing KAILOR-powered Assistant now combines verified portfolio retrieval with optional server-side LLM reasoning. It works without credentials. See [Assistant setup and production configuration](src/assistant/README.md#conversational-reasoning-layer) and `.env.example` for local/Vercel configuration and shared usage limits.

Run `npm run dev` for the site and local Assistant API, `npm run test:assistant` for retrieval/conversation/provider tests, and `npm run lint` / `npm run build` for validation.
