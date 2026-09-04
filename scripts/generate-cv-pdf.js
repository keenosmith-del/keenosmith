// change current and run npm run cv:pdf
// must be running on local

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

/*
 * Calculate the actual rendered height of the CV.
 *
 * This is more reliable than boundingBox() because the CV uses
 * relative positioning, negative margins, and vertically shifted
 * content throughout the layout.
 */
const cvHeight = await page.evaluate(() => {
    const cv = document.querySelector(".cv-page");

    if (!cv) {
        throw new Error("Could not find .cv-page");
    }

    const cvRect = cv.getBoundingClientRect();

    let bottom = cvRect.bottom;

    cv.querySelectorAll("*").forEach((element) => {
        const rect = element.getBoundingClientRect();

        if (rect.bottom > bottom) {
            bottom = rect.bottom;
        }
    });

    return Math.ceil(bottom - cvRect.top);
});

if (!cvHeight || cvHeight <= 0) {
    throw new Error("Could not determine CV height");
}

/*
 * Add a small safety buffer so the final content is not clipped
 * at the very bottom of the PDF.
 */
const pdfHeight = cvHeight + 40;

await page.pdf({
    path: "Keeno-Smith-CV.pdf",
    width: "1100px",
    height: `${pdfHeight}px`,
    printBackground: true,
    margin: {
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
    },
});

await browser.close();

console.log("CV PDF generated successfully.");