import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { build } from 'esbuild';
import puppeteer from 'puppeteer';
import { companyLaunchDate, getLaunchRemaining } from '../src/data/companyLaunch.js';

const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:5173';
const output = process.env.COMPANY_QA_OUTPUT || '/tmp/portfolio-company-qa';
await fs.mkdir(output, { recursive: true });
const target = Date.parse('2026-11-06T00:00:00+02:00');
assert.equal(companyLaunchDate, '2026-11-06');
assert.equal(target - Date.parse('2026-10-27T00:00:00+02:00'), 10 * 86400000);
for (const [now, expected] of [[target - 1000, 1000], [target, 0], [target + 1000, 0], [target + 10 * 86400000, 0]]) assert.equal(getLaunchRemaining(now), expected);
await build({ stdin: { contents: `export { answer } from './src/assistant/engine.js'; export { conversationalAnswer, respond } from './src/assistant/conversation.js';`, resolveDir: process.cwd() }, bundle: true, platform: 'node', format: 'esm', outfile: `${output}/company-engine.mjs`, loader: { '.png': 'empty' } });
const { answer, conversationalAnswer, respond } = await import(`${output}/company-engine.mjs`);
for (const fn of [answer, conversationalAnswer]) {
  for (const query of ['What is kailor?', 'Tell me about kailor insider', 'How are kailor and kailor insider connected?', 'Tell me about kai', 'What is the kailor insider architecture?', 'Is kailor live?', 'Is kailor insider publicly available?']) {
    const result = fn(query);
    assert(result.specific, query);
    assert(!/\b(Kailor|KAILOR|Kai|kai)\b/.test(JSON.stringify(result.text)), query);
    assert(result.projects.length, query);
  }
  assert.match(fn('How are kailor and kailor insider connected?').text, /2024.*2025/s);
  assert.match(fn('What is kailor?').text, /consultancy.*software engineering.*AI and automation.*cloud infrastructure/s);
  const insider = fn('What is the kailor insider architecture?');
  assert.match(insider.text, /React Router SSR.*Cloudflare Worker/s);
  assert.match(insider.text, /owner-only|Owner-only/);
  assert.match(insider.text, /Not production-ready/);
  assert(!insider.projects.some(p => p.implementedTechnologies.includes('Express.js')));
  assert.match(fn('Is kailor live?').text, /6 November 2026/);
}
assert((await respond('What is kailor?', {}, [], { fetcher: () => { throw new Error('Company identity must remain authoritative'); } })).local);

const browser = await puppeteer.launch({ headless: true });
const results = [];
const errors = [];
try {
  const page = await browser.newPage();
  page.on('pageerror', e => errors.push(e.message));
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewport({ width, height: 900 });
    await page.goto(base, { waitUntil: 'networkidle0' });
    await page.$eval('#kailor', e => e.scrollIntoView({ behavior: 'instant', block: 'start' }));
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.kailor-intro')).opacity > .95);
    const home = await page.evaluate(() => {
      const tile = document.querySelector('[data-company-id="kailor"]');
      const buttons = document.querySelector('.kailor-actions');
      return { background: getComputedStyle(tile).backgroundColor, intro: document.querySelector('.kailor-intro p').textContent.trim(), title: tile.querySelector('h3').textContent, tileText: tile.querySelector('p').textContent.trim(), href: buttons.querySelector('a').href, disabled: buttons.querySelector('button').disabled, disabledText: buttons.querySelector('button').textContent.trim(), overflow: document.documentElement.scrollWidth > innerWidth, timer: document.querySelector('.kailor-launch [role="timer"]').getAttribute('aria-label') };
    });
    assert.equal(home.background, 'rgb(246, 230, 218)');
    assert.equal(home.title, 'Technology consultancy & engineering');
    assert(home.intro.startsWith('kailor insider began as an independent publishing platform I founded'));
    assert(home.tileText.endsWith('or engineering something new.'));
    assert.equal(home.href, 'https://kailor.co.za/');
    assert(home.disabled && home.disabledText === 'Visit kailor insider');
    assert(!home.overflow, `Homepage overflow at ${width}`);
    assert.match(home.timer, /app launch on 6 November 2026/);
    await page.keyboard.press('Tab');
    await page.focus('[data-company-id="kailor"]');
    await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('.kailor-feature .cloud-tile-details')).opacity) > .95);
    const clipping = await page.$eval('[data-company-id="kailor"]', tile => {
      const rect = tile.getBoundingClientRect();
      const caption = tile.querySelector('.cloud-tile-caption').getBoundingClientRect();
      const pills = tile.querySelector('.kailor-project-pills').getBoundingClientRect();
      return caption.top < pills.bottom || caption.bottom > rect.bottom || rect.right > innerWidth;
    });
    assert(!clipping, `Tile caption, pills or focus expansion clipped at ${width}`);
    await page.screenshot({ path: `${output}/home-${width}.png` });
    await page.$eval('[data-company-id="kailor"]', e => e.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('.kailor-feature')).opacity) > .95 && document.querySelector('.kailor-feature img').naturalWidth > 0);
    await (await page.$('[data-company-id="kailor"]')).screenshot({ path: `${output}/tile-${width}.png` });
    await page.goto(`${base}/companies/kailor`, { waitUntil: 'networkidle0' });
    assert.equal(await page.$eval('h1', e => e.textContent), 'From publishing to practical engineering.');
    assert.equal(await page.$eval('.kk-hero-meta time', e => e.textContent), 'February 2022');
    await page.waitForFunction(() => Number(document.querySelector('.project-hero-content').style.getPropertyValue('--scroll-load-opacity')) >= 1);
    assert.equal(await page.title(), 'kailor and kailor insider | Keeno Smith');
    assert.equal(await page.$$eval('.kk-editorial-section', e => e.length), 7);
    assert(await page.$$eval('.kk-narrative strong', e => e.length > 10));
    assert(!/curiosity/i.test(await page.$eval('main', e => e.textContent)));
    assert(await page.$('#kailor'));
    assert(await page.$('#kailor-insider'));
    assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `Case study overflow at ${width}`);
    assert(!/\b(Kailor|KAILOR|Kai|kai)\b/.test(await page.$eval('main', e => e.innerText)));
    assert(await page.$('a[href="https://github.com/keenosmith-del/kailor-insider"]'));
    assert(await page.$('a[href="https://kailor.co.za"]'));
    assert(await page.$('.kk-product-links button[disabled]'));
    await page.screenshot({ path: `${output}/case-${width}.png` });
    await page.click('a[href="#kailor-insider"]');
    await page.waitForFunction(() => Math.abs(document.querySelector('#kailor-insider').getBoundingClientRect().top - 100) < 8);
    await page.screenshot({ path: `${output}/insider-${width}.png` });
    await page.$eval('.kk-tech-trigger', e => e.scrollIntoView({ behavior: 'instant', block: 'center' }));
    await page.click('.kk-tech-trigger');
    await page.waitForSelector('[role="dialog"]');
    assert.match(await page.$eval('[role="dialog"]', e => e.innerText), /Cloudflare Worker/);
    await page.keyboard.press('Escape');
    await page.waitForSelector('[role="dialog"]', { hidden: true });
    results.push({ width, home, modal: 'passed' });
  }
  for (const route of ['/companies/kai', '/companies/kailor-insider', '/explore/projects/kai', '/explore/projects/kailor-insider', '/projects/company-websites', '/projects/kailor-ai', '/explore/projects/kailor-ai']) {
    await page.goto(base + route, { waitUntil: 'networkidle0' });
    assert.equal(new URL(page.url()).pathname, '/companies/kailor');
    assert(await page.$('#kailor-insider'));
    if (page.url().includes('#kailor-insider')) await page.waitForFunction(() => Math.abs(document.getElementById('kailor-insider').getBoundingClientRect().top - 100) < 8);
  }
  const pdf = await page.goto(`${base}/documents/kailor-insider-engineering-brief.pdf`);
  assert.equal(pdf.status(), 200);
  assert.match(pdf.headers()['content-type'], /pdf/);
  const clockPage = await browser.newPage();
  await clockPage.evaluateOnNewDocument(value => { Date.now = () => value; }, target + 5000);
  await clockPage.goto(base, { waitUntil: 'networkidle0' });
  assert.match(await clockPage.$eval('.kailor-launch .company-launch-time', e => e.textContent), /^0d00h 00m 00s$/);
  assert.deepEqual(errors, []);
  await fs.writeFile(`${output}/results.json`, JSON.stringify({ results, errors, routes: 7, countdownBoundary: 'passed', assistantIdentity: 'passed', brief: 'HTTP 200 PDF' }, null, 2));
  console.log(`Company regression passed: ${results.length} viewports, 7 compatibility routes, focus/anchors/modal, fixed countdown boundary, PDF and grounded Assistant identities.`);
} finally { await browser.close(); }
