import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import puppeteer from "puppeteer";

const base = process.env.PORTFOLIO_TEST_URL || "http://127.0.0.1:5173";
const dataPath = "src/components/pages/CV/data";
const common = JSON.parse(await fs.readFile(`${dataPath}/common.json`, "utf8"));
const versions = await Promise.all(["ai", "cloud", "full-stack"].map(async key => ({ ...common, ...JSON.parse(await fs.readFile(`${dataPath}/${key}.json`, "utf8")) })));
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const normalize = text => text.normalize("NFKC").replace(/\s+/g, "");
function documentText(version) {
  const labelled = entries => entries.map(entry => `${entry.label}: ${entry.text}`);
  const text = [version.name, version.headline, version.emphasis, version.location, `${version.phone} · ${version.email}`, ...version.profiles.map(profile => `${profile.label}: ${profile.text}`), "Professional Summary", ...version.summary, "Technical Skills", ...labelled(version.skills), "Experience"];
  for (const job of version.experience) {
    text.push(job.title, `${job.employer} | ${job.dates}`, ...job.paragraphs, ...job.bullets);
    if (job.clientWork) text.push(job.clientWork.heading, ...labelled(job.clientWork.entries));
  }
  text.push("Education", ...labelled(version.education), "Selected Projects", version.projectsIntro);
  for (const project of version.projects) text.push(project.title, project.technologies, project.description, `Repository: ${project.repository}`);
  text.push("Selected Credentials and Professional Development", ...labelled(version.credentials));
  return text.join("\n");
}
const output = await fs.mkdtemp(path.join(os.tmpdir(), "portfolio-cv-browser-"));
const downloads = path.join(output, "downloads");
await fs.mkdir(downloads);
const browser = await puppeteer.launch({ headless: true });
const errors = [];
try {
  const page = await browser.newPage();
  page.on("pageerror", error => errors.push(error.message));
  const session = await page.createCDPSession();
  await session.send("Page.setDownloadBehavior", { behavior: "allow", downloadPath: downloads });
  async function checkSelected(version) {
    await page.waitForFunction(key => document.querySelector(".cv-page")?.dataset.cvType === key, {}, version.key);
    assert.equal(await page.$eval("#cv-version", element => element.value), version.key);
    assert.equal(normalize(await page.$eval(".cv-page", element => element.innerText)), normalize(documentText(version)), `${version.key}: complete document must match its reviewed source data`);
    assert.equal(await page.$eval(".cv-download", element => element.getAttribute("href")), version.pdf);
    assert.equal(await page.$eval(".cv-download", element => element.download), version.downloadFilename);
    assert.equal(await page.$eval(".cv-download", element => element.getAttribute("aria-label")), `Download ${version.label} CV (PDF)`);
    assert.deepEqual(await page.$$eval(".cv-document-repository a", elements => elements.map(element => element.href)), version.projects.map(project => project.repository));
    assert.equal(await page.$$eval(".cv-download", elements => elements.length), 1);
    assert(!(await page.$eval(".cv-page-controls", element => element.textContent)).includes("ATS"));
  }
  for (const width of [1440, 390, 320]) {
    await page.setViewport({ width, height: 900 });
    for (const version of versions) {
      const source = await fs.readFile(`public${version.pdf}`);
      assert.equal(hash(source), version.sourceSha256, `${version.key}: original PDF changed; review the content before updating its hash`);
      await page.goto(`${base}/cv?type=${version.key}&source=test`, { waitUntil: "networkidle0" });
      await checkSelected(version);
      await page.reload({ waitUntil: "networkidle0" });
      await checkSelected(version);
      assert.equal(new URL(page.url()).searchParams.get("source"), "test");
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${version.key}: overflow at ${width}`);
      const layout = await page.evaluate(() => {
        const select = document.querySelector("#cv-version").getBoundingClientRect();
        const button = document.querySelector(".cv-download").getBoundingClientRect();
        return { stacked: button.top >= select.bottom, adjacent: button.left >= select.right };
      });
      assert(width < 421 ? layout.stacked : layout.adjacent, `Control layout at ${width}`);
      if (width !== 320) {
        await page.screenshot({ path: path.join(output, `${version.key}-${width}-top.png`) });
        await page.screenshot({ path: path.join(output, `${version.key}-${width}-full.png`), fullPage: true });
      }
      if (width === 1440) {
        await page.click(".cv-download");
        const destination = path.join(downloads, version.downloadFilename);
        let downloaded;
        for (let attempt = 0; attempt < 100; attempt++) {
          try { downloaded = await fs.readFile(destination); break; }
          catch (error) { if (error.code !== "ENOENT") throw error; await new Promise(resolve => setTimeout(resolve, 50)); }
        }
        assert(downloaded, `${version.key}: download did not complete`);
        assert.equal(hash(downloaded), hash(source), `${version.key}: downloaded file differs from the original PDF`);
      }
    }
  }
  await page.goto(`${base}/cv?type=full-stack&source=recruiter&keep=yes`, { waitUntil: "networkidle0" });
  for (const key of ["ai", "cloud", "full-stack"]) {
    await page.select("#cv-version", key);
    await checkSelected(versions.find(version => version.key === key));
    const params = new URL(page.url()).searchParams;
    assert.equal(params.get("type"), key);
    assert.equal(params.get("source"), "recruiter");
    assert.equal(params.get("keep"), "yes");
  }
  await page.goBack(); await checkSelected(versions[1]);
  await page.goBack(); await checkSelected(versions[0]);
  await page.goForward(); await checkSelected(versions[1]);
  for (const query of ["?source=direct", "?type=invalid&source=direct", "?type=__proto__&source=direct"]) {
    await page.goto(`${base}/cv${query}`, { waitUntil: "networkidle0" });
    await checkSelected(versions[2]);
    assert.equal(new URL(page.url()).searchParams.get("type"), "full-stack");
    assert.equal(new URL(page.url()).searchParams.get("source"), "direct");
  }
  await page.goto(`${base}/cv?type=ai`, { waitUntil: "networkidle0" });
  assert.equal(await page.$eval('label[for="cv-version"]', element => element.textContent), "CV version");
  await page.focus("#cv-version");
  // Native selects support platform keyboard type-ahead without a custom menu.
  await page.keyboard.press("c");
  await page.keyboard.press("Enter");
  await page.keyboard.press("Escape");
  await checkSelected(versions[1]);
  assert(await page.$eval("#cv-version", element => element === document.activeElement));
  await page.keyboard.press("Tab");
  assert(await page.$eval(".cv-download", element => element === document.activeElement));
  assert(await page.$eval("#cv-summary + div, #cv-summary", element => {
    const range = document.createRange(); range.selectNodeContents(element);
    const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
    return selection.toString().length > 0;
  }));
  assert.deepEqual(errors, []);
  console.log(`PASS: all three complete CVs at 1440px, 390px and 320px; original PDF download byte hashes; direct links, refresh, invalid/default state, preserved parameters, back/forward, native keyboard selector and selectable HTML. Screenshots: ${output}`);
} finally { await browser.close(); }
