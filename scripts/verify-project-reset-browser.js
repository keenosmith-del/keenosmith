import puppeteer from 'puppeteer';
import assert from 'node:assert/strict';
const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:5173';
const covers = [
  ['productivity-platform', 'Authenticated MERN Platform', 'mern-project.png', '#d5d7d4'],
  ['music-api', 'Music API-Driven Web App', 'music-api-project.png', '#e4ceb5'],
  ['enterprise-workspace', 'Enterprise Workspace', 'enterprise-workspace-project.png', '#d5d7d4'],
  ['ai-assistant', 'Retrieval-Augmented AI Model', 'ai-model-project.png', '#d3a6a3'],
  ['intelligence-manufacturing-llmops', 'Intelligent Manufacturing Quality Control', 'intelligence-manufacturing-project.png', '#a8a9aa'],
  ['enterprise-ai-mlops', 'Enterprise AI Customer Operations', 'enterprise-ai-mlops.png', '#3a3a3c'],
];
const rgb = (hex) => `rgb(${[1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(', ')})`;
const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage(); const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const width of [1440, 390]) {
    await page.setViewport({ width, height: 900 });
    await page.goto(`${base}/explore`, { waitUntil: 'networkidle0' });
    assert.equal((await page.$$('.explore-project')).length, 22);
    assert(!(await page.$eval('main', (el) => el.textContent)).includes('UX/UI'));
    for (const [id, name, file, color] of covers) {
      const tile = `.explore-project[data-explore-id="${id}"]`;
      assert.equal(await page.$eval(`${tile} h2`, (e) => e.textContent), name);
      assert.equal(await page.$eval(tile, (e) => getComputedStyle(e).backgroundColor), rgb(color));
      assert((await page.$eval(`${tile} img`, (e) => e.src)).includes(file.replace('.png', '')));
      assert.equal(await page.$eval(tile, (e) => e.getAttribute('href')), `/projects/${id}`);
    }
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Explore overflow at ${width}`);
    await page.$eval('[data-explore-id="productivity-platform"]', (e) => e.scrollIntoView({ behavior: "instant", block: "center" }));
    await page.screenshot({ path: `/tmp/portfolio-project-reset-${width}.png` });
    for (const [id] of covers) {
      await page.goto(`${base}/projects/${id}`, { waitUntil: 'networkidle0' });
      assert(await page.$('main.project-case-study h1'), `${id} must retain its custom page`);
      assert(await page.$('[data-project-back]'));
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${id} overflow at ${width}`);
      if (id === 'enterprise-ai-mlops') await page.screenshot({ path: `/tmp/portfolio-mlops-placeholder-${width}.png` });
    }
    await page.goto(`${base}/explore?tab=credentials`, { waitUntil: 'networkidle0' });
    assert.equal((await page.$$('.credential-tile')).length, 26);
    assert.equal(await page.$('.credential-artwork'), null);
    assert.equal(await page.$('img[src*="lemur"]'), null);
    await page.click('.credential-toggle');
    assert.equal(await page.$eval('.credential-toggle', (e) => e.getAttribute('aria-expanded')), 'true');
    await page.goto(base, { waitUntil: 'networkidle0' });
    await page.click('.portfolio-skills-helper');
    await page.type('#assistant-input', 'Hi'); await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelectorAll('.assistant-message').length === 3 && !document.querySelector('.assistant-pending'));
    const gap = await page.$eval('.portfolio-chat-header', (e) => {
      const reset = e.querySelector('.assistant-clear').getBoundingClientRect();
      const close = e.querySelector('[aria-label="Close chat"]').getBoundingClientRect();
      return close.left - reset.right;
    });
    assert(gap >= 0 && gap <= 4, `Header icon gap: ${gap}`);
    await page.click('.assistant-clear'); assert.equal(await page.$('.assistant-clear'), null);
  }
  assert.deepEqual(errors, []);
  console.log('Project reset browser checks passed: six covers/colours/routes, 22 engineering tiles, retained custom pages, credential cards without decorative artwork, responsive layouts and compact new-chat/close controls.');
} finally { await browser.close(); }
