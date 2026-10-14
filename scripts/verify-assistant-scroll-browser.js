import puppeteer from 'puppeteer';
import assert from 'node:assert/strict';
const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  const errors = []; page.on('pageerror', (e) => errors.push(e.message));
  const send = async (text) => {
    await page.$eval('#assistant-input', (el, value) => {
      Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(el, value);
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }, text);
    await page.focus('#assistant-input'); await page.keyboard.press('Enter');
  };
  const geometry = () => page.$eval('.portfolio-chat-body', (body) => {
    const user = [...body.querySelectorAll('.assistant-message.user')].at(-1).parentElement;
    let top = 0, node = user;
    while (node && node !== body) { top += node.offsetTop; node = node.offsetParent; }
    const padding = parseFloat(getComputedStyle(body).paddingTop);
    const max = body.scrollHeight - body.clientHeight;
    return { actual: body.scrollTop, expected: Math.min(max, Math.max(0, top - padding)),
      remaining: max - body.scrollTop, scrollable: max > 2,
      userTop: user.getBoundingClientRect().top - body.getBoundingClientRect().top,
      latest: !!document.querySelector('.assistant-jump'),
      spacer: [...body.querySelectorAll('[data-message-id]')].some((el) => el.style.minHeight),
      bottomGap: body.getBoundingClientRect().bottom - body.querySelector('.assistant-thread').getBoundingClientRect().bottom };
  });
  for (const width of [1440, 390]) {
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
    await page.setViewport({ width, height: 900 });
    await page.goto(process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:5173', { waitUntil: 'networkidle0' });
    await page.evaluate(() => window.scrollTo({ top: 650, behavior: 'instant' }));
    await page.click('.portfolio-skills-helper');
    await page.waitForFunction(() => document.activeElement.id === 'assistant-input');
    const pageY = await page.evaluate(() => scrollY);
    const started = Date.now();
    await send('Hi');
    await page.waitForSelector('.assistant-activity');
    await new Promise((r) => setTimeout(r, 450));
    assert.equal(await page.$('[data-response-started="true"]'), null, 'Thinking phase too short');
    await page.waitForSelector('[data-response-started="true"]');
    assert(Date.now() - started >= 700);
    await page.waitForFunction(() => !document.querySelector('.assistant-pending'));
    await new Promise((r) => setTimeout(r, 100));
    let g = await geometry();
    assert(Math.abs(g.actual - g.expected) < 3, JSON.stringify({ width, g }));
    assert(!g.spacer && g.bottomGap <= 26 && !g.latest, JSON.stringify({ width, g }));
    assert.equal(await page.evaluate(() => scrollY), pageY);
    await page.screenshot({ path: `/tmp/assistant-user-anchor-hi-${width}.png` });

    // A long reply keeps the user visible at the top; additional evidence may scroll below.
    await send('Does Keeno know React?');
    await page.waitForFunction(() => !document.querySelector('.assistant-pending'));
    await new Promise((r) => setTimeout(r, 100));
    g = await geometry();
    assert(Math.abs(g.actual - g.expected) < 3 && Math.abs(g.userTop - 16) < 5, JSON.stringify({ width, g }));
    assert(g.scrollable && g.remaining > 24 && g.latest && !g.spacer, JSON.stringify({ width, g }));
    await page.click('.assistant-jump');
    await page.waitForFunction(() => !document.querySelector('.assistant-jump'));
    assert((await geometry()).remaining < 3);
    await page.$eval('.portfolio-chat-body', (el) => { el.scrollTop = 0; });
    await page.waitForSelector('.assistant-jump');
    await page.click('.portfolio-chat-header button[aria-label="Close chat"]');
    await page.waitForFunction(() => document.querySelector('.portfolio-chat-panel').hidden);
    await page.click('.portfolio-skills-helper');
    assert.equal(await page.$eval('.portfolio-chat-body', (el) => el.scrollTop), 0);

    // User-controlled history scrolling is respected through typing and completion.
    await send('What certifications does Keeno have?');
    await page.waitForSelector('[data-response-started="true"]');
    await page.$eval('.portfolio-chat-body', (el) => { el.scrollTop = 0; });
    await page.waitForFunction(() => !document.querySelector('.assistant-pending'));
    assert.equal(await page.$eval('.portfolio-chat-body', (el) => el.scrollTop), 0);
    assert.equal(await page.evaluate(() => scrollY), pageY);

    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await send('Does Keeno know Python?');
    await page.waitForFunction(() => !document.querySelector('.assistant-pending'));
    await new Promise((r) => setTimeout(r, 100));
    g = await geometry();
    assert(Math.abs(g.actual - g.expected) < 3, JSON.stringify({ width, g }));
    await page.click('.assistant-clear');
    assert.equal(await page.$('.assistant-jump'), null);
  }
  assert.deepEqual(errors, []);
  console.log('User-message anchoring passed: desktop/mobile greeting, no reserved whitespace, minimum thinking time, real overflow/latest control, manual scrolling, close/reopen, reduced motion, Clear and unchanged page scroll.');
} finally { await browser.close(); }
