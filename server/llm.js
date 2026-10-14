// Small OpenAI-compatible boundary; the browser never imports this module.
export async function complete(messages, env = process.env, fetcher = fetch) {
  if (!env.ASSISTANT_LLM_API_KEY || !env.ASSISTANT_LLM_BASE_URL || !env.ASSISTANT_LLM_MODEL) return null;
  const base = new URL(env.ASSISTANT_LLM_BASE_URL);
  if (base.protocol !== 'https:' && !(env.NODE_ENV !== 'production' && ['localhost', '127.0.0.1'].includes(base.hostname))) throw new Error('Invalid provider URL');
  const response = await fetcher(`${base.href.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST', signal: AbortSignal.timeout(10000), headers: { Authorization: `Bearer ${env.ASSISTANT_LLM_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: env.ASSISTANT_LLM_MODEL, messages, max_tokens: 450, temperature: 0.2, response_format: { type: 'json_object' } }),
  });
  if (!response.ok) throw new Error('Provider unavailable');
  const raw = await readLimited(response, 24000);
  return JSON.parse(raw).choices?.[0]?.message?.content || null;
}
export async function readLimited(response, limit) {
  const reader = response.body.getReader();
  const chunks = []; let size = 0;
  try {
    while (true) { const { done, value } = await reader.read(); if (done) break;
      size += value.byteLength; if (size > limit) throw new Error('Response too large'); chunks.push(value); }
  } finally { await reader.cancel(); }
  return new TextDecoder().decode(Buffer.concat(chunks));
}
