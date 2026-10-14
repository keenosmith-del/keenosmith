import puppeteer from 'puppeteer';
import assert from 'node:assert/strict';
const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:5173';
const covers = [
  ['productivity-platform', 'MERN', 'mern-project.png', '#d5d7d4'],
  ['music-api', 'Music API', 'music-api-project.png', '#d3a6a3'],
  ['enterprise-workspace', 'Enterprise Workspace', 'enterprise-workspace-project.png', '#97b2c4'],
  ['ai-assistant', 'Retrieval Augmented AI Model', 'ai-model-project.png', '#e4ceb5'],
  ['intelligence-manufacturing-llmops', 'Intelligence Manufacturing LLMOps', 'intelligence-manufacturing-project.png', '#fff7ed'],
  ['enterprise-ai-mlops', 'Enterprise AI MLOps', 'enterprise-ai-mlops.png', '#78b8be'],
];
const rgb = (hex) => `rgb(${[1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(', ')})`;
const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage(); const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  for (const width of [1440, 390]) {
    await page.setViewport({ width, height: 900 });
    await page.goto(`${base}/explore`, { waitUntil: 'networkidle0' });
    assert.equal((await page.$$('.explore-project')).length, 19);
    assert(!(await page.$eval('main', (el) => el.textContent)).includes('UX/UI'));
    for (const [id, name, file, color] of covers) {
      const tile = `.explore-project[data-explore-id="${id}"]`;
      assert.equal(await page.$eval(`${tile} h2`, (e) => e.textContent), name);
      assert.equal(await page.$eval(tile, (e) => getComputedStyle(e).backgroundColor), rgb(color));
      assert((await page.$eval(`${tile} img`, (e) => e.src)).endsWith(file));
      assert.equal(await page.$eval(`${tile} a`, (e) => e.getAttribute('href')), `/projects/${id}`);
    }
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Explore overflow at ${width}`);
    await page.$eval('[data-explore-id="productivity-platform"]', (e) => e.scrollIntoView());
    await page.screenshot({ path: `/tmp/portfolio-project-reset-${width}.png` });
    for (const [id, name, file, color] of covers) {
      await page.goto(`${base}/projects/${id}`, { waitUntil: 'networkidle0' });
      assert.equal(await page.$eval('.project-placeholder h1', (e) => e.textContent), name);
      assert.equal(await page.$eval('.project-placeholder-content p', (e) => e.textContent), 'Project page coming soon.');
      assert((await page.$eval('.project-placeholder-visual img', (e) => e.src)).endsWith(file));
      assert.equal(await page.$eval('.project-placeholder-visual', (e) => getComputedStyle(e).backgroundColor), rgb(color));
      assert.equal(await page.$('video, .ai-project, .music-project, .enterprise-project, .productivity-project'), null);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${id} overflow at ${width}`);
      if (id === 'enterprise-ai-mlops') await page.screenshot({ path: `/tmp/portfolio-mlops-placeholder-${width}.png` });
    }
    await page.goto(`${base}/explore?tab=credentials`, { waitUntil: 'networkidle0' });
    assert.equal((await page.$$('.credential-tile')).length, 25);
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
  console.log('Project reset browser checks passed: six covers/colours/routes, 19 engineering tiles, placeholders without old media, credential cards without decorative artwork, responsive layouts and compact new-chat/close controls.');
} finally { await browser.close(); }
