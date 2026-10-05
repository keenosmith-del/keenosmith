import puppeteer from 'puppeteer';
import assert from 'node:assert/strict';
const browser = await puppeteer.launch({ headless: true });
try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.setViewport({ width: 1440, height: 1000 });
    await page.goto('http://127.0.0.1:5173', { waitUntil: 'domcontentloaded' });
    await page.click('.portfolio-skills-helper');
    await page.waitForFunction(() => document.activeElement.id === 'assistant-input');
    assert.equal(await page.$eval('#portfolio-chat-title', e => e.textContent), "Keeno's Assistant");
    assert.equal(await page.$eval('.portfolio-chat-footer', e => e.textContent), 'Powered by my own Hybrid Intelligence system · KAILOR');
    assert.equal(await page.$eval('.assistant-footer-secondary', e => e.textContent), 'Built and designed by Keeno Smith © September 2026');
    assert(await page.$('.assistant-footer-zap'));
    await page.hover('.portfolio-chat-header button');
    assert.equal(await page.$eval('.portfolio-chat-header button', e => getComputedStyle(e).backgroundColor), 'rgba(0, 0, 0, 0)');
    assert(await page.$eval('.assistant-composer button', e => e.getBoundingClientRect().width <= 36));
    assert(await page.$eval('#assistant-input', e => e.getBoundingClientRect().height < 40));
    assert(await page.$eval('.portfolio-chat-header img', e => e.src.includes('/src/assets/images/mascot/mascot.png') && e.naturalWidth > 0));
    await page.screenshot({ path: '/tmp/assistant-v2-welcome.png' });
    await page.type('#assistant-input', 'Does Keeno know React?');
    await page.keyboard.press('Enter');
    await page.waitForSelector('.assistant-activity');
    // Closing and reopening while the response is pending retains a single reply.
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => document.querySelector('.portfolio-chat-panel').hidden);
    assert(await page.$eval('.portfolio-skills-helper', e => e === document.activeElement));
    await page.click('.portfolio-skills-helper');
    await page.waitForSelector('.assistant-complete');
    await page.click('.assistant-complete');
    await page.waitForSelector('.assistant-card');
    assert.equal((await page.$$('.assistant-message')).length, 3);
    assert(await page.$eval('.assistant-bar i', e => e.style.width === '100%'));
    await page.$eval('.portfolio-chat-body', e => { const card=e.querySelector('.assistant-evidence-section'); e.scrollTop += card.getBoundingClientRect().top-e.getBoundingClientRect().top; });
    await new Promise(resolve => setTimeout(resolve, 220));
    await page.screenshot({path:'/tmp/assistant-v2-projects.png'});
    await page.type('#assistant-input', 'Which other projects?');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => document.querySelectorAll('.assistant-message').length === 5 && !document.querySelector('.assistant-pending'));
    assert((await page.$$eval('.assistant-card h4', els => els.map(e => e.textContent))).includes('Enterprise Workspace'));
    const expand = await page.$('.assistant-expand');
    await expand.click();
    assert.equal(await expand.evaluate(e => e.getAttribute('aria-expanded')), 'true');
    await expand.click();
    assert.equal(await expand.evaluate(e => e.getAttribute('aria-expanded')), 'false');
    // Reader-controlled scrolling survives another typing tick.
    await page.type('#assistant-input', 'Would Keeno fit a Full-Stack AI Engineer role?');
    await page.keyboard.press('Enter');
    await page.waitForSelector('.assistant-pending');
    await page.$eval('.portfolio-chat-body', e => { e.scrollTop = 0; e.dispatchEvent(new Event('scroll')); });
    await page.waitForSelector('.assistant-jump');
    await page.waitForFunction(() => !document.querySelector('.assistant-pending'));
    assert(await page.$eval('.portfolio-chat-body', e => e.scrollTop < 100));
    await page.click('.assistant-jump');
    await page.waitForSelector('.assistant-followups');
    // The composer preserves Shift+Enter and expands for multiple lines.
    await page.type('#assistant-input', 'First line');
    await page.keyboard.down('Shift'); await page.keyboard.press('Enter'); await page.keyboard.up('Shift');
    await page.type('#assistant-input', 'Second line');
    assert((await page.$eval('#assistant-input', e => e.value)).includes('\n'));
    // Reduced motion, credential wording, long inputs, section presentation.
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    async function ask(question) {
        await page.$eval('#assistant-input', (el, value) => {
            const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set;
            setter.call(el, value); el.dispatchEvent(new Event('input', { bubbles: true }));
        }, question);
        await page.focus('#assistant-input');
        await page.keyboard.press('Enter');
        await page.waitForFunction(() => !document.querySelector('.assistant-pending') && document.querySelectorAll('.assistant-message.user').length > 0);
    }
    await ask('What certifications does Keeno have?');
    await page.waitForSelector('.assistant-credential');
    assert((await page.$$eval('.assistant-credential a', es => es.map(e => e.textContent))).some(t => t.startsWith('View issuer profile')));
    assert(!(await page.content()).includes('Verify certification'));
    await ask('What education does he have?');
    await page.waitForSelector('.assistant-education-record a');
    assert.equal(await page.$eval('.assistant-education-record a', e => e.getAttribute('href')), '/cv');
    const jd = 'Job description: Full-Stack AI Engineer\n\nRequirements: React, Node.js, Python, PostgreSQL, Docker, Rust.\nResponsibilities: build APIs, support AI applications and cloud delivery.\n\n' + 'Collaborate with engineering teams and review deployment practices. '.repeat(12);
    await page.$eval('#assistant-input', (el, value) => {
        Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(el, value); el.dispatchEvent(new Event('input', { bubbles: true }));
    }, jd);
    await page.waitForFunction(() => document.querySelector('#assistant-input').clientHeight >= 120);
    assert(await page.$eval('#assistant-input', e => e.clientHeight <= 134 && e.scrollHeight > e.clientHeight));
    await page.focus('#assistant-input');await page.keyboard.press('Enter');
    await page.waitForFunction(() => !document.querySelector('.assistant-pending') && [...document.querySelectorAll('.assistant-text-section h3')].some(e => e.textContent === 'Recognised requirements'));
    assert((await page.$$eval('.assistant-prose', es => es.at(-1).textContent)).includes('Rust'));
    for (const [width, height] of [[320,640],[390,844],[768,1024],[1366,768],[1920,1080]]) {
        await page.setViewport({ width, height });
        const bounds = await page.$eval('.portfolio-chat-panel', e => {
            const r = e.getBoundingClientRect(), body = e.querySelector('.portfolio-chat-body');
            return { left:r.left, right:r.right, top:r.top, bottom:r.bottom, overflow:body.scrollWidth>body.clientWidth, composer:e.querySelector('.assistant-composer').getBoundingClientRect().bottom };
        });
        assert(bounds.left >= 0 && bounds.right <= width && bounds.top >= 0 && bounds.bottom <= height, JSON.stringify({width,bounds}));
        if(width>700)assert(await page.evaluate(()=>document.querySelector('.portfolio-chat-panel').getBoundingClientRect().top>=document.querySelector('.site-header').getBoundingClientRect().bottom+10), `Panel overlaps header at ${width}`);
        assert(!bounds.overflow, `Conversation overflow at ${width}`);
        assert(bounds.composer < bounds.bottom);
        if (width === 390 || width === 1366) {
            await page.$eval('.portfolio-chat-body', e => { const messages=e.querySelectorAll('.assistant-message.assistant'); const last=messages[messages.length-1];e.scrollTop+=last.getBoundingClientRect().top-e.getBoundingClientRect().top; });
            await page.screenshot({ path: `/tmp/assistant-v2-${width}.png` });
        }
    }
    // Simulate the viewport metrics delivered when a mobile keyboard opens.
    await page.setViewport({ width:390, height:844 });
    await page.evaluate(() => { document.documentElement.style.setProperty('--assistant-keyboard-offset','340px'); document.documentElement.style.setProperty('--assistant-viewport-height','504px'); });
    assert(await page.$eval('.portfolio-chat-panel', e => e.getBoundingClientRect().top >= 0 && e.querySelector('.assistant-composer').getBoundingClientRect().bottom < 504));
    await page.evaluate(() => { document.documentElement.style.removeProperty('--assistant-keyboard-offset');document.documentElement.style.removeProperty('--assistant-viewport-height'); });
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => document.querySelector('.portfolio-chat-panel').hidden);
    await page.evaluate(() => window.scrollTo({ top:900, behavior:'instant' }));
    await page.waitForSelector('.portfolio-back-top');await page.click('.portfolio-back-top');
    await page.waitForFunction(() => window.scrollY === 0);
    await page.click('.portfolio-skills-helper');
    await page.$eval('.portfolio-chat-body', e => { e.scrollTop=0; });
    await page.click('.assistant-card-actions a');
    await page.waitForFunction(() => location.pathname.startsWith('/projects/'));
    assert.equal(errors.length, 0, errors.join('\n'));
    console.log('Browser checks passed: mascot, attribution, welcome, typing, rapid submit, close/reopen, focus, follow-up, evidence, expand/collapse, scroll control, credentials, long job description, five viewport sizes, simulated keyboard, reduced motion, back-to-top and navigation. No page errors.');
} finally { await browser.close(); }
