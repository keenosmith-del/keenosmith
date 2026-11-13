import puppeteer from "puppeteer";
import assert from "node:assert/strict";
import { roles } from "./fixtures/recruiter/roles.js";
const browser = await puppeteer.launch({ headless: true });
const base = process.env.PORTFOLIO_TEST_URL || "http://127.0.0.1:5173";
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(base, { waitUntil: "networkidle0" });
  await page.click('a[href="/recruiter-view"]');
  await page.waitForSelector(".recruiter-input");
  assert.equal(await page.$eval("h1", (e) => e.textContent), "Recruiter View");
  assert.equal(
    (
      await page.$$(
        ".site-header,.portfolio-skills-helper,.portfolio-chat-panel",
      )
    ).length,
    0,
  );
  assert.equal((await page.$$(".recruiter-system-metadata")).length, 1);
  assert(
    await page.$eval(
      "#recruiter-title",
      (e) => getComputedStyle(e).borderTopWidth === "0px",
    ),
  );
  await page.focus("#recruiter-title");
  assert(
    await page.$eval(
      "#recruiter-title",
      (e) => getComputedStyle(e).boxShadow !== "none",
    ),
  );
  await page.hover('.recruiter-actions button[type="submit"]');
  await new Promise((resolve) => setTimeout(resolve, 200));
  assert(
    await page.$eval(
      '.recruiter-actions button[type="submit"]',
      (e) => getComputedStyle(e).transform !== "none",
    ),
  );
  const assess = async (description) => {
    await page.$eval(
      "#recruiter-description",
      (e, v) => {
        const setter = Object.getOwnPropertyDescriptor(
          HTMLTextAreaElement.prototype,
          "value",
        ).set;
        setter.call(e, v);
        e.dispatchEvent(new Event("input", { bubbles: true }));
      },
      description,
    );
    await page.click('.recruiter-actions button[type="submit"]');
    await page.waitForSelector(".recruiter-result");
  };
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "/tmp/recruiter-desktop-empty.png",
    fullPage: true,
  });
  await page.click(".recruiter-starters button");
  assert.equal(
    await page.$eval(".recruiter-starters button", (e) =>
      e.getAttribute("aria-pressed"),
    ),
    "true",
  );
  const started = Date.now();
  await page.click('.recruiter-actions button[type="submit"]');
  await page.waitForSelector(".recruiter-processing");
  assert(
    await page.$eval(
      '.recruiter-actions button[type="submit"]',
      (e) => e.disabled,
    ),
  );
  await page.evaluate(() =>
    window.scrollTo(
      0,
      document.querySelector(".recruiter-workspace").offsetTop - 45,
    ),
  );
  await page.screenshot({ path: "/tmp/recruiter-processing.png" });
  await page.waitForSelector(".recruiter-result");
  assert(Date.now() - started >= 1200);
  assert(await page.$(".recruiter-requirements-summary"));
  assert(await page.$(".recruiter-category-alignment"));
  assert(await page.$(".recruiter-coverage"));
  await page.click('.recruiter-actions button[type="submit"]');
  await page.waitForSelector(".recruiter-processing");
  await page.click(".recruiter-reset");
  await new Promise((resolve) => setTimeout(resolve, 1600));
  assert(!(await page.$(".recruiter-result")));
  await assess(
    "Requirements: React, Node.js, REST APIs, SQL and cloud engineering. Build full-stack applications.",
  );
  assert(
    (await page.$eval(".recruiter-result", (e) => e.textContent)).includes(
      "React",
    ),
  );
  assert(
    await page.$eval(
      ".recruiter-workspace",
      (e) => getComputedStyle(e).gridTemplateColumns.split(" ").length === 2,
    ),
  );
  await page.screenshot({
    path: "/tmp/recruiter-desktop-result.png",
    fullPage: true,
  });
  await page.evaluate(() =>
    window.scrollTo(
      0,
      document.querySelector(".recruiter-workspace").offsetTop - 45,
    ),
  );
  await page.screenshot({ path: "/tmp/recruiter-desktop-assessment.png" });
  await page.click(".recruiter-view-switch button:nth-child(2)");
  assert(await page.$(".recruiter-requirement"));
  await page.click(".recruiter-requirement .recruiter-links details summary");
  const link = await page.$('.recruiter-requirement a[href^="/projects/"]');
  assert(link);
  await link.click();
  await page.waitForFunction(
    () => !location.pathname.includes("recruiter-view"),
  );
  await page.goBack();
  await page.waitForSelector(".recruiter-input");
  await assess(
    "Google Cloud role requires GCP, Vertex AI, BigQuery, Cloud Run and Pub/Sub for data systems.",
  );
  assert(
    (await page.$eval(".recruiter-result", (e) => e.textContent)).includes(
      "Google Cloud Intelligent Retail & Supply Chain",
    ),
  );
  await page.click(".recruiter-training > summary");
  const credential = await page.$(
    '.recruiter-evidence a[href="/certifications"]',
  );
  assert(credential);
  await credential.click();
  await page.waitForFunction(() => location.pathname === "/explore" && new URLSearchParams(location.search).get("tab") === "credentials");
  await page.goBack();
  await page.waitForSelector(".recruiter-input");
  await assess(
    "Google Cloud role requires GCP, Vertex AI, BigQuery, Cloud Run and Pub/Sub for data systems.",
  );
  for (const width of [900, 390, 320]) {
    await page.setViewport({ width, height: 900 });
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Overflow at ${width}`,
    );
    assert(
      await page.$eval(
        ".recruiter-workspace",
        (e) => getComputedStyle(e).gridTemplateColumns.split(" ").length === 1,
      ),
    );
    await page.screenshot({
      path: `/tmp/recruiter-${width}-result.png`,
      fullPage: true,
    });
    await page.evaluate(() =>
      window.scrollTo(
        0,
        document.querySelector(".recruiter-output").offsetTop - 45,
      ),
    );
    await page.screenshot({ path: `/tmp/recruiter-${width}-assessment.png` });
    await page.click(".recruiter-view-switch button:nth-child(2)");
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Detail overflow at ${width}`,
    );
    await page.screenshot({
      path: `/tmp/recruiter-${width}-detailed.png`,
      fullPage: true,
    });
    await page.click(".recruiter-view-switch button:first-child");
  }
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  assert(
    await page.$eval(
      ".recruiter-workspace",
      (e) => getComputedStyle(e).animationName === "none",
    ),
  );
  const reducedStart = Date.now();
  await assess(
    "We require Salesforce and SAP implementation for enterprise business systems.",
  );
  assert(Date.now() - reducedStart < 1100);
  assert.equal(
    await page.$eval(".recruiter-score>strong", (e) => e.textContent),
    "0%",
  );
  assert(await page.$(".recruiter-important-gaps"));
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForSelector(".recruiter-top");
  await page.click(".recruiter-top");
  await page.waitForFunction(() => scrollY === 0);
  assert(
    !(await page.$eval(".recruiter-result", (e) => e.textContent)).includes(
      "Vertex AI",
    ),
  );
  // Verify representative strong stack support and a weak senior platform fit.
  await assess(roles.find((r) => r.id === "B").description);
  let resultText = await page.$eval(".recruiter-result", (e) => e.textContent);
  assert(resultText.includes("Fastify or Express.js or NestJS"));
  assert(resultText.includes("Core technical and delivery alignment"));
  assert(resultText.includes("Model contextual-2.2.3"));
  await page.screenshot({
    path: "/tmp/recruiter-strong-fit.png",
    fullPage: true,
  });
  await assess(roles.find((r) => r.id === "I").description);
  resultText = await page.$eval(".recruiter-result", (e) => e.textContent);
  assert(resultText.includes("Cloud foundations and landing zones"));
  assert(resultText.includes("Needs review"));
  assert(!resultText.includes("High coverage"));
  await page.click(".recruiter-view-switch button:nth-child(2)");
  await page.click(".recruiter-requirement details summary");
  assert(
    (await page.$eval(".recruiter-result", (e) => e.textContent)).includes(
      "Employer wording and evidence needed",
    ),
  );
  await page.screenshot({
    path: "/tmp/recruiter-weak-fit-details.png",
    fullPage: true,
  });
  await page.click(".recruiter-reset");
  assert(!(await page.$(".recruiter-result")));
  assert.equal(await page.$eval("#recruiter-description", (e) => e.value), "");
  await page.click('.recruiter-actions button[type="submit"]');
  await page.waitForFunction(() =>
    document.querySelector(".recruiter-error").textContent.includes("fuller"),
  );
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(base, { waitUntil: "networkidle0" });
  await page.click(".portfolio-skills-helper");
  await page.waitForSelector("#assistant-input");
  await page.type(
    "#assistant-input",
    "Would Keeno fit a role requiring React, Node.js and REST APIs?",
  );
  await page.keyboard.press("Enter");
  await page.waitForSelector(
    '.assistant-card-actions a[href="/recruiter-view"]',
  );
  await page.click('.assistant-card-actions a[href="/recruiter-view"]');
  await page.waitForSelector("#recruiter-description");
  assert(
    (await page.$eval("#recruiter-description", (e) => e.value)).includes(
      "React",
    ),
  );
  assert.equal(
    (
      await page.$$(
        ".site-header,.portfolio-skills-helper,.portfolio-chat-panel",
      )
    ).length,
    0,
  );
  await page.click(".recruiter-back");
  await page.waitForSelector(".site-header");
  assert(await page.$(".portfolio-skills-helper"));
  assert.deepEqual(errors, []);
  console.log(
    "Standalone structure, metadata, controls, analysis delay/cancel, importance UI, coverage, back/top, credential navigation; Browser: header route, project navigation, detailed view, desktop/tablet/mobile (320–1440px), reduced motion, reassessment, clear, validation and Assistant handoff passed.",
  );
} finally {
  await browser.close();
}
