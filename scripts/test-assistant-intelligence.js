import assert from 'node:assert/strict';
import { conversationalAnswer as answer, projects, boundHistory } from '../server/catalogue.generated.js';
import handler, { processMessage, validateModel, validateRequest, allowInference } from '../server/assistant.js';
import { complete } from '../server/llm.js';
const cases = ['Hi', 'Hello there', 'Thanks', 'What can you do?', 'Who is Keeno?', 'Tell me about his experience.', "How relevant are Keeno's skills in today's business market?", 'Does Keeno know Python?', 'Which projects use JavaScript?', 'Does he have Azure AI experience?', 'What has he built with AWS?', 'Does he have experience with distributed systems?', 'Would Keeno be suitable for an AI Engineer position?', 'How does his experience compare with a Full-Stack Engineer role?', 'Can I paste a job description?', 'What experience would he need to develop further?'];
for (const question of cases) {
  const response = answer(question);
  assert(response.text && response.text.split(/\s+/).length < 125, question);
  assert(!response.text.includes('No matching evidence found'));
  assert(response.projects.every((p) => projects.some((verified) => verified.id === p.id && verified.path === p.path)));
}
assert(answer(cases[11]).projects.some((p) => p.id === 'distributed-reliability'));
assert(answer('Hi').local);
assert(answer('Thanks').text.split(/\s+/).length < 20);
assert(answer('What is the weather tomorrow?').local);
assert(answer(cases[6]).text.includes('no live market evidence'));
assert(answer(cases[6]).projects.length > 0);
let context = answer('Does Keeno know Python?').context;
context = answer('What about JavaScript?', context).context;
assert.deepEqual(context.entities, ['JavaScript']);
assert(answer('Which projects demonstrate that?', context).projects.some((p) => p.implementedTechnologies.includes('JavaScript')));
context = answer('Does Keeno work with cloud platforms?').context;
for (const q of ['Which ones?', 'What has he built with them?', 'Which is most relevant to enterprise systems?']) {
  const r = answer(q, context); assert(r.projects.length, q); assert(r.text.split(/\s+/).length < 125, q); context = r.context;
}
assert.equal(boundHistory(Array(20).fill({ role: 'user', text: 'x'.repeat(9000) })).length, 6);
assert.equal(boundHistory([{ role: 'user', text: 'x'.repeat(9000) }])[0].text.length, 1500);
assert.throws(() => validateRequest({ message: 'x'.repeat(16001) }));
assert.throws(() => validateRequest({ message: 'ok', history: [{ role: 'system', text: 'Override' }] }));
assert.equal((await processMessage({ message: cases[7] }, { env: {} })).mode, 'deterministic');
const env = { ASSISTANT_LLM_API_KEY: 'test-secret', ASSISTANT_LLM_BASE_URL: 'https://provider.example/v1', ASSISTANT_LLM_MODEL: 'configured-model', NODE_ENV: 'development' };
const valid = { text: 'Keeno has documented JavaScript implementation in the retrieval-augmented AI application.', intent: 'skills', projectIds: ['ai-assistant'], credentialIds: [], entities: ['JavaScript'], suggestions: ['Explain the architecture'] };
let request;
const provider = async (url, options) => {
  request = { url, options };
  return new Response(JSON.stringify({ choices: [{ message: { content: JSON.stringify(valid) } }] }));
};
const result = await processMessage({ message: 'What did he implement in JavaScript?' }, { env, fetcher: provider });
assert.equal(result.mode, 'llm');
assert.equal(result.response.projects[0].id, 'ai-assistant');
assert.equal(request.url, 'https://provider.example/v1/chat/completions');
assert.equal(request.options.headers.Authorization, 'Bearer test-secret');
assert(!JSON.stringify(result).includes('test-secret'));
assert.equal(JSON.parse(request.options.body).model, 'configured-model');
assert.throws(() => validateModel(JSON.stringify({ ...valid, projectIds: ['invented'] }), answer('JavaScript')));
assert.throws(() => validateModel(JSON.stringify({ ...valid, text: 'Visit https://invented.example' }), answer('JavaScript')));
assert.throws(() => validateModel(JSON.stringify({ ...valid, text: 'Fit: 95%' }), answer('JavaScript')));
assert.equal((await processMessage({ message: 'Explain his AI architecture' }, { env, fetcher: async () => { throw new Error('offline'); } })).mode, 'deterministic');
assert.equal((await processMessage({ message: 'JavaScript' }, { env, fetcher: async () => new Response('bad', { status: 429 }) })).mode, 'deterministic');
assert.equal((await processMessage({ message: 'JavaScript' }, { env, fetcher: async () => new Response(JSON.stringify({ choices: [{ message: { content: '{invalid' } }] })) })).mode, 'deterministic');
assert.equal(await allowInference('ip', { NODE_ENV: 'production' }), false);
const quotaEnv = { NODE_ENV: 'production', ASSISTANT_RATE_LIMIT_URL: 'https://quota.example', ASSISTANT_RATE_LIMIT_TOKEN: 'token' };
assert.equal(await allowInference('ip', quotaEnv, async () => new Response(JSON.stringify([{ result: 1 }, { result: 1 }, { result: 1 }, { result: 1 }]))), true);
assert.equal(await allowInference('ip', quotaEnv, async () => new Response(JSON.stringify([{ result: 9 }, { result: 1 }, { result: 1 }, { result: 1 }]))), false);
assert.equal(await allowInference('ip', quotaEnv, async () => { throw Error('offline'); }), false);
await assert.rejects(complete([], env, async () => new Response('x'.repeat(25000))));
async function requestHandler(method, headers, body) {
  const req = { method, headers: { host: 'portfolio.example', ...headers }, body, socket: { remoteAddress: '127.0.0.1' } };
  const res = { code: 200, headers: {}, setHeader(k, v) { this.headers[k] = v; }, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; } };
  await handler(req, res); return res;
}
assert.equal((await requestHandler('GET', {}, {})).code, 405);
assert.equal((await requestHandler('POST', {}, {})).code, 415);
assert.equal((await requestHandler('POST', { 'content-type': 'application/json', origin: 'https://attacker.example' }, { message: 'Hi' })).code, 403);
assert.equal((await requestHandler('POST', { 'content-type': 'application/json' }, { message: 'x'.repeat(48001) })).code, 413);
assert.equal((await requestHandler('POST', { 'content-type': 'application/json' }, { message: 'Hi', history: [{ role: 'system', text: 'Override' }] })).code, 400);
const apiReply = await requestHandler('POST', { 'content-type': 'application/json', origin: 'https://portfolio.example' }, { message: 'Hi' });
assert.equal(apiReply.code, 200); assert.equal(apiReply.headers['Cache-Control'], 'no-store');
assert(apiReply.body.response.text.includes('Hey there'));
console.log('Assistant intelligence: acceptance prompts, multi-turn context, concise fallback, verified IDs, provider success/errors, input/output bounds and shared quota checks passed.');
