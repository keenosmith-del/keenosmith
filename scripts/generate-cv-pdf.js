// change current and run npm run cv:pdf

import puppeteer from "puppeteer";
import fs from "fs";

const browser = await puppeteer.launch();

const page = await browser.newPage();

await page.setViewport({
    width: 1100,
    height: 900,
    deviceScaleFactor: 1,
});

await page.goto("http://localhost:5173/cv", {
    waitUntil: "networkidle0",
});

await page.emulateMediaType("screen");

await page.evaluate(async () => {
    await document.fonts.ready;
});

await page.evaluate(() => {
    document.querySelectorAll(".cv-page-controls").forEach((element) => {
        element.style.display = "none";
    });

    document.querySelectorAll(".cv-intro-divider").forEach((line) => {
        line.style.background = "rgba(58, 58, 60, 0.12)";
    });

    document.querySelectorAll(".cv-section").forEach((section) => {
        section.style.borderTopColor = "rgba(58, 58, 60, 0.12)";
    });
});

const cvPage = await page.$(".cv-page");

if (!cvPage) {
    throw new Error("Could not find .cv-page");
}

const box = await cvPage.boundingBox();

if (!box) {
    throw new Error("Could not determine CV dimensions");
}

await page.pdf({
    path: "Keeno-Smith-CV.pdf",
    width: `${box.width}px`,
    height: `${box.height}px`,
    printBackground: true,
    margin: {
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
    },
    pageRanges: "1",
});

await browser.close();

console.log("CV PDF generated successfully.");