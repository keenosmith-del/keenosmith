import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import puppeteer from 'puppeteer';

const base = process.env.PORTFOLIO_TEST_URL || 'http://127.0.0.1:4178';
const output = '/tmp/project-style-correction/after';
const pages = [
  { id: 'banking-risk', prefix: 'aws-banking', reference: true },
  { id: 'microsoft-devops', prefix: 'mdo', reference: true },
  { id: 'crewai-revenueops', prefix: 'revenueops' },
  { id: 'ms-assessflow', prefix: 'assessflow' },
];
const controlProperties = ['display', 'alignItems', 'justifyContent', 'minHeight', 'height', 'padding', 'gap', 'borderRadius', 'borderWidth', 'backgroundColor', 'color', 'opacity', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'boxShadow', 'backdropFilter', 'transitionDuration', 'transitionProperty'];
const floatingProperties = [...controlProperties, 'position', 'zIndex', 'right', 'bottom', 'width'];
const backProperties = [...controlProperties, 'position', 'zIndex', 'top', 'left'];
const textProperties = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color'];
const results = [], errors = [];
await fs.mkdir(output, { recursive: true });
const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  page.on('pageerror', error => errors.push(error.message));
  const styles = (selector, properties) => page.$eval(selector, (element, keys) => Object.fromEntries(keys.map(key => [key, getComputedStyle(element)[key]])), properties);
  const settleFade = selector => page.waitForFunction(sel => {
    const target = document.querySelector(sel).closest('[data-scroll-fade]');
    if (!target) return true;
    const rect = target.getBoundingClientRect();
    const range = Math.min(innerHeight * .22, 240);
    const expected = Math.max(0, Math.min(1, (innerHeight - rect.top) / range, rect.bottom / range));
    return Math.abs(Number(getComputedStyle(target).opacity) - expected) < .003;
  }, {}, selector);
  const scroll = async selector => {
    await page.$eval(selector, element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await settleFade(selector);
  };
  const capture = async (selector, path) => (await page.$(selector)).screenshot({ path });
  const hoverStyles = async (selector, properties) => {
    await scroll(selector); await page.hover(selector);
    await page.waitForFunction(sel => getComputedStyle(document.querySelector(sel)).transform === 'matrix(1, 0, 0, 1, 0, -2)', {}, selector);
    // Wait for color and background transitions, not just transform completion.
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 200)));
    const value = await styles(selector, [...properties, 'transform']);
    await page.mouse.move(0, 0);
    return value;
  };
  for (const width of [1440, 768, 390]) {
    await page.setViewport({ width, height: 900 });
    const snapshots = {};
    for (const project of pages) {
      const { id, prefix } = project;
      await page.goto(`${base}/projects/${id}`, { waitUntil: 'networkidle0' });
      await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('.project-hero-content')).opacity) > .999);
      await page.mouse.move(0, 0);
      const snapshot = {};
      snapshot.back = await styles(`.${prefix}-back`, backProperties);
      snapshot.hero = await styles(`.${prefix}-hero`, ['minHeight', 'padding', 'alignItems']);
      snapshot.title = await styles('h1', textProperties);
      snapshot.pill = await styles(`.${prefix}-pill-list span`, [...textProperties, 'padding', 'borderRadius', 'backgroundColor']);
      snapshot.description = await styles(`.${prefix}-hero-description`, [...textProperties, 'maxWidth']);
      snapshot.source = await styles(`.${prefix}-hero-actions a`, controlProperties);
      snapshot.disabled = await styles(`.${prefix}-hero-actions button`, controlProperties);
      snapshot.note = await styles(`.${prefix}-platform-note`, [...textProperties, 'maxWidth', 'margin']);
      snapshot.section = await styles(`.${prefix}-section`, ['width', 'padding', 'gridTemplateColumns', 'gap']);
      snapshot.heading = await styles(`.${prefix}-section h2`, textProperties);
      snapshot.copy = await styles(`.${prefix}-section p`, textProperties);
      snapshot.label = await styles(`.${prefix}-section-label`, textProperties);
      assert(!await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), `${id}: overflow at ${width}`);
      assert.deepEqual(await page.$$eval(`.${prefix}-hero-actions :is(a,button)`, elements => elements.map(e => e.textContent.trim())), ['Source', 'Visit platform']);
      assert(await page.$eval(`.${prefix}-hero-actions button`, e => e.disabled && !e.hasAttribute('href')));
      if (!project.reference) {
        assert.equal(await page.$eval(`.${prefix}-hero-actions a`, e => e.href), `https://github.com/keenosmith-del/${id}`);
        assert.equal(await page.$eval(`.${prefix}-platform-note a`, e => e.getAttribute('href')), 'mailto:keenosmith@kailor.co.za');
        assert.equal(await page.$eval(`.${prefix}-summary-action a`, e => e.getAttribute('href')), `/documents/${id}-executive-summary.pdf`);
        const backgrounds = await page.$$eval('article :is(section,div,li,figure,table,tr,td,th,dl,dd)', elements => elements.filter(e => {
          const rect = e.getBoundingClientRect();
          return rect.width > 150 && rect.height > 60 && !['rgba(0, 0, 0, 0)', 'rgb(250, 249, 246)'].includes(getComputedStyle(e).backgroundColor);
        }).map(e => ({ className: e.className, background: getComputedStyle(e).backgroundColor })));
        assert.deepEqual(backgrounds, [], `${id}: no filled technical containers`);
      }
      await page.screenshot({ path: `${output}/${id}-${width}-hero.png` });
      await capture(`.${prefix}-back`, `${output}/${id}-${width}-back.png`);
      await capture(`.${prefix}-hero-actions`, `${output}/${id}-${width}-actions.png`);
      snapshot.backHover = await hoverStyles(`.${prefix}-back`, [...backProperties]);
      snapshot.sourceHover = await hoverStyles(`.${prefix}-hero-actions a`, controlProperties);
      await scroll(`.${prefix}-summary-action a`); await page.mouse.move(0, 0);
      snapshot.summary = await styles(`.${prefix}-summary-action a`, controlProperties);
      await page.screenshot({ path: `${output}/${id}-${width}-summary.png` });
      await capture(`.${prefix}-summary-action a`, `${output}/${id}-${width}-summary-control.png`);
      snapshot.summaryHover = await hoverStyles(`.${prefix}-summary-action a`, controlProperties);
      await scroll(`.${prefix}-tech-trigger`); await page.mouse.move(0, 0);
      snapshot.technology = await styles(`.${prefix}-tech-trigger`, [...controlProperties, 'marginTop']);
      snapshot.techPill = await styles(`.${prefix}-tech-tags span`, [...textProperties, 'padding', 'backgroundColor', 'borderRadius']);
      await page.screenshot({ path: `${output}/${id}-${width}-technology.png` });
      await capture(`.${prefix}-tech-trigger`, `${output}/${id}-${width}-technology-control.png`);
      snapshot.technologyHover = await hoverStyles(`.${prefix}-tech-trigger`, controlProperties);
      await page.click(`.${prefix}-tech-trigger`); await page.waitForSelector('[role="dialog"]');
      await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('.project-modal')).opacity) > .999);
      snapshot.modal = await styles('.project-modal', ['width', 'padding', 'borderRadius', 'backgroundColor', 'boxShadow', 'maxHeight']);
      snapshot.modalClose = await styles('.project-modal-close', controlProperties);
      assert(await page.$eval('[role="dialog"]', e => e.contains(document.activeElement)));
      await page.screenshot({ path: `${output}/${id}-${width}-modal.png` });
      await page.keyboard.press('Escape');
      assert.equal(await page.$('[role="dialog"]'), null);
      assert(await page.$eval(`.${prefix}-tech-trigger`, e => e === document.activeElement));
      // A mid-page position must show the floating control, clear of the footer.
      await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }));
      await page.waitForSelector(`.${prefix}-floating-top`); await page.mouse.move(0, 0);
      snapshot.floating = await styles(`.${prefix}-floating-top`, floatingProperties);
      await capture(`.${prefix}-floating-top`, `${output}/${id}-${width}-floating.png`);
      snapshot.floatingHover = await hoverStyles(`.${prefix}-floating-top`, floatingProperties);
      if (!project.reference) {
        await page.click(`.${prefix}-floating-top`); await page.waitForFunction(() => scrollY < 2);
        await page.waitForSelector(`.${prefix}-floating-top`, { hidden: true });
      }
      await page.$eval('main > footer', e => e.scrollIntoView({ block: 'end', behavior: 'instant' }));
      await page.waitForFunction(p => !document.querySelector(`.${p}-floating-top`), {}, prefix);
      await settleFade('main > footer');
      await page.mouse.move(0, 0);
      snapshot.footer = await styles(`.${prefix}-footer`, ['display', 'alignItems', 'justifyContent', 'gap', 'padding']);
      snapshot.footerBack = await styles(`.${prefix}-footer-back`, controlProperties);
      snapshot.footerTop = await styles(`.${prefix}-footer-top`, [...controlProperties, 'width']);
      const geometry = await page.$eval('main > footer', e => {
        const [link, button] = [...e.children].map(node => node.getBoundingClientRect());
        return { center: (link.left + button.right) / 2, gap: button.left - link.right, linkHeight: link.height, buttonWidth: button.width, buttonHeight: button.height };
      });
      assert(Math.abs(geometry.center - width / 2) < 1 && Math.abs(geometry.gap - 7) < 1, `${id}: footer pair must be centered with 7px gap`);
      assert.equal(geometry.linkHeight, 40); assert.equal(geometry.buttonWidth, 40); assert.equal(geometry.buttonHeight, 40);
      await page.screenshot({ path: `${output}/${id}-${width}-footer.png` });
      await capture(`.${prefix}-footer-back`, `${output}/${id}-${width}-footer-back.png`);
      await capture(`.${prefix}-footer-top`, `${output}/${id}-${width}-footer-top.png`);
      snapshot.footerBackHover = await hoverStyles(`.${prefix}-footer-back`, controlProperties);
      snapshot.footerTopHover = await hoverStyles(`.${prefix}-footer-top`, [...controlProperties, 'width']);
      if (!project.reference) {
        await page.click(`.${prefix}-footer-top`); await page.waitForFunction(() => scrollY < 2);
      }
      snapshots[id] = snapshot;
    }
    // MicrosoftDevOps supplies the exact common-control declarations. AWS is
    // independently captured as the second visual authority; its summary is equivalent.
    const reference = snapshots['microsoft-devops'];
    for (const id of ['crewai-revenueops', 'ms-assessflow']) {
      for (const [component, expected] of Object.entries(reference)) {
        const actual = snapshots[id][component];
        const differences = Object.keys(expected).filter(key => actual[key] !== expected[key]);
        assert.deepEqual(differences, [], `${id} ${width} ${component}: ${JSON.stringify(differences.map(key => ({ key, expected: expected[key], actual: actual[key] })))}`);
      }
    }
    results.push({ width, snapshots, commonControls: 'exact MicrosoftDevOps match', footerPair: 'centered, adjacent 40px controls', floating: '38px reference style, threshold/footer hiding verified' });
  }
  for (const project of pages.filter(p => !p.reference)) {
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.goto(`${base}/projects/${project.id}`, { waitUntil: 'networkidle0' });
    assert.equal(await page.$eval('.project-hero-content', e => getComputedStyle(e).opacity), '1');
    await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }));
    await page.waitForSelector(`.${project.prefix}-floating-top`);
    await page.click(`.${project.prefix}-floating-top`);
    assert(await page.evaluate(() => scrollY < 2));
  }
  let protectedFiles = 0;
  try {
    const hashes = JSON.parse(await fs.readFile('/tmp/project-style-correction/protected-files.json', 'utf8'));
    for (const [path, expected] of Object.entries(hashes)) assert.equal(createHash('sha256').update(await fs.readFile(path)).digest('hex'), expected, `Protected file changed: ${path}`);
    protectedFiles = Object.keys(hashes).length;
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  const reportPage = await browser.newPage();
  let html = '<!doctype html><meta charset="utf-8"><title>Project style comparison</title><style>body{margin:20px;background:#faf9f6;color:#151517;font:14px Arial}h1{font-size:24px}h2{font-size:18px;margin:30px 0 14px}.board{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}figure{margin:0}figcaption{padding:9px 0}img{display:block;width:100%;height:auto}.controls{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}.controls img{width:auto;max-width:100%}</style><h1>AWS / Microsoft DevOps / CrewAI / AssessFlow</h1>';
  for (const width of [1440, 768, 390]) {
    for (const kind of ['hero', 'summary', 'technology', 'modal', 'footer']) {
      const boardWidth = width === 390 ? 1560 : width === 768 ? 1536 : 1440;
      let board = `<h2>${kind} · ${width}px</h2><div class="board" style="grid-template-columns:repeat(${width === 390 ? 4 : 2},minmax(0,1fr))">`;
      for (const project of pages) {
        const data = (await fs.readFile(`${output}/${project.id}-${width}-${kind}.png`)).toString('base64');
        board += `<figure><figcaption>${project.id}</figcaption><img src="data:image/png;base64,${data}"></figure>`;
      }
      board += '</div>'; html += board;
      await reportPage.setViewport({ width: boardWidth, height: 1000 });
      await reportPage.setContent(`<style>body{margin:0;font:14px Arial;background:#faf9f6}.board{display:grid;gap:16px}figure{margin:0}figcaption{padding:9px 0}img{display:block;width:100%;height:auto}</style>${board}`);
      await reportPage.screenshot({ path: `${output}/comparison-${kind}-${width}.png`, fullPage: true });
    }
    let controls = `<h2>Controls · ${width}px</h2><div class="controls">`;
    for (const project of pages) {
      controls += `<div><h3>${project.id}</h3>`;
      for (const kind of ['back', 'actions', 'summary-control', 'technology-control', 'floating', 'footer-back', 'footer-top']) {
        const data = (await fs.readFile(`${output}/${project.id}-${width}-${kind}.png`)).toString('base64');
        controls += `<figure><figcaption>${kind}</figcaption><img src="data:image/png;base64,${data}"></figure>`;
      }
      controls += '</div>';
    }
    controls += '</div>'; html += controls;
    await reportPage.setViewport({ width: 1200, height: 900 });
    await reportPage.setContent(`<style>body{font:12px Arial;background:#faf9f6}.controls{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}figure{margin:12px 0}figcaption{padding:6px 0}img{max-width:100%}</style>${controls}`);
    await reportPage.screenshot({ path: `${output}/comparison-controls-${width}.png`, fullPage: true });
  }
  await fs.writeFile(`${output}/comparison.html`, html);
  assert.deepEqual(errors, []);
  await fs.writeFile(`${output}/results.json`, JSON.stringify({ results, protectedFiles, errors }, null, 2));
  console.log(`PASS: 4 rendered pages at 3 sizes; both corrected pages exactly match reference control/hero/section/modal styles, normal and hover states; centered footer and floating behavior; reduced motion; ${protectedFiles} protected source/document hashes unchanged. Comparison boards saved.`);
} finally { await browser.close(); }
