import puppeteer from 'puppeteer';
import assert from 'node:assert/strict';
import { projects } from '../server/catalogue.generated.js';
const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:5173';
const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage(); const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(base, { waitUntil: 'networkidle0' });
  await page.click('.portfolio-skills-helper');
  await page.waitForFunction(() => document.activeElement.id === 'assistant-input');
  assert.equal(await page.$eval('#portfolio-chat-title', (e) => e.textContent), 'Portfolio Assistant');
  assert((await page.$eval('.portfolio-chat-footer', (e) => e.textContent)).includes('kailor'));
  assert.equal(await page.$('.assistant-clear'), null);
  const original = await page.$$eval('.assistant-starters button', (es) => es.map((e) => e.textContent));
  assert.equal(original.length, 3);
  async function send(text) {
    const count = await page.$$('.assistant-message.user');
    await page.$eval('#assistant-input', (e, value) => {
      Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(e, value);
      e.dispatchEvent(new Event('input', { bubbles: true }));
    }, text);
    await page.focus('#assistant-input'); await page.keyboard.press('Enter');
    await page.waitForFunction((n) => document.querySelectorAll('.assistant-message.user').length === n + 1 && !document.querySelector('.assistant-pending'), {}, count.length);
    return page.$$eval('.assistant-prose', (es) => es.at(-1).textContent);
  }
  assert((await send('Hi')).includes('Hey there'));
  const controls = await page.$$eval('.portfolio-chat-header button', (buttons) => buttons.map((b) => ({ label: b.getAttribute('aria-label'), text: b.textContent.trim(), width: b.getBoundingClientRect().width })));
  assert.deepEqual(controls.map((b) => b.label), ['Start new chat', 'Close chat']);
  assert(controls.every((b) => !b.text && b.width <= 44));
  const gap = await page.$eval('.portfolio-chat-body', (body) => {
    const last = [...body.querySelectorAll('[data-message-id]')].at(-1);
    return last.querySelector('.assistant-followups').getBoundingClientRect().top - last.querySelector('.assistant-prose').getBoundingClientRect().bottom;
  });
  assert(gap >= 0 && gap <= 24, `Response/followup gap: ${gap}`);
  assert(await page.$('.assistant-clear'));
  assert((await send('Thanks')).includes("You're welcome"));
  await send('Does Keeno know Python?');
  await send('What about JavaScript?');
  assert((await send('Which projects demonstrate that?')).includes('JavaScript'));
  assert(await page.$('.assistant-card-actions a'));
  for (const selector of ['.assistant-card-actions a', '.assistant-suggestions button', '.hero-button', '.navigation-cv']) {
    const control = await page.$(selector);
    if (!control || !(await control.boundingBox())) continue;
    await control.evaluate((e) => e.focus());
    assert.equal(await control.evaluate((e) => getComputedStyle(e).textDecorationLine), 'none', selector);
    await control.hover();
    assert.equal(await control.evaluate((e) => getComputedStyle(e).textDecorationLine), 'none', `${selector} hover`);
  }
  await page.click('.assistant-clear');
  assert.equal((await page.$$('.assistant-message')).length, 1);
  assert.equal(await page.$('.assistant-clear'), null);
  assert.equal(await page.$eval('#assistant-input', (e) => e === document.activeElement), true);
  // Exercise every original suggestion, without relying on retrieval internals.
  for (const question of original) {
    const index = original.indexOf(question);
    await page.click(`.assistant-starters button:nth-child(${index + 1})`);
    await page.waitForFunction(() => document.querySelectorAll('.assistant-message').length === 3 && !document.querySelector('.assistant-pending'));
    assert(await page.$('.assistant-evidence section'));
    await page.click('.assistant-clear');
  }
  // Clear during slow provider work and verify the old reply never returns.
  await page.setRequestInterception(true);
  const intercept = (r) => {
    if (r.url().endsWith('/api/assistant')) {
      setTimeout(() => r.respond({ status: 503, contentType: 'application/json', body: '{}' }).catch(() => {}), 450);
    } else r.continue();
  };
  page.on('request', intercept);
  await page.type('#assistant-input', 'Explain his distributed systems');
  await page.keyboard.press('Enter');
  await page.waitForSelector('.assistant-pending');
  await page.click('.assistant-clear');
  await new Promise((r) => setTimeout(r, 650));
  assert.equal((await page.$$('.assistant-message')).length, 1);
  assert.match(await send('Does Keeno know React?'), /Keeno has implemented React/);
  assert(await page.$('.assistant-evidence section'));
  // Close/reopen retains a completed conversation and keyboard focus.
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => document.querySelector('.portfolio-chat-panel').hidden);
  await page.click('.portfolio-skills-helper');
  assert.equal((await page.$$('.assistant-message')).length, 3);
  await send('Can I paste a job description?');
  assert.equal(await page.$$eval('.assistant-card-actions a', (es) => es.at(-1).getAttribute('href')), '/recruiter-view');
  await page.screenshot({ path: '/tmp/assistant-intelligence-desktop.png' });
  for (const width of [320, 390, 768, 1366, 1920]) {
    await page.setViewport({ width, height: 900 });
    const bounds = await page.$eval('.portfolio-chat-panel', (e) => {
      const r = e.getBoundingClientRect(); const body = e.querySelector('.portfolio-chat-body');
      return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, overflow: body.scrollWidth > body.clientWidth, composer: e.querySelector('.assistant-composer').getBoundingClientRect().bottom };
    });
    assert(bounds.left >= 0 && bounds.right <= width && bounds.top >= 0 && bounds.bottom <= 900 && !bounds.overflow && bounds.composer < bounds.bottom, JSON.stringify({ width, bounds }));
    if (width === 390) await page.screenshot({ path: '/tmp/assistant-intelligence-mobile.png' });
  }
  page.off('request', intercept);
  await page.setRequestInterception(false);
  // Verify every catalogue destination renders a route instead of an empty outlet.
  for (const path of new Set(projects.map((p) => p.path))) {
    await page.goto(`${base}${path}`, { waitUntil: 'domcontentloaded' });
    assert(await page.$('main, .cv, .project-preview, .project-placeholder'), `Missing page: ${path}`);
  }
  await page.goto(`${base}/explore`, { waitUntil: 'domcontentloaded' });
  assert(await page.$('.explore-page'));
  await page.goto(`${base}/recruiter-view`, { waitUntil: 'domcontentloaded' });
  assert(await page.$('.recruiter-page'));
  assert.deepEqual(errors, []);
  console.log('Browser: original suggestions, context, Clear/cancellation, failure fallback, close/reopen, typing, five responsive widths, button decoration, every project route, Explore and Recruiter View passed.');
} finally { await browser.close(); }
