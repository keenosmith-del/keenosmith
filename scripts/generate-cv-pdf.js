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


/* =========================================================
   PDF-ONLY STYLING
   Keep the normal CV browser design untouched.
   ========================================================= */

await page.addStyleTag({
    content: `
        html,
        body {
            margin: 0 !important;
            padding: 0 !important;
            width: 1100px !important;
            min-width: 1100px !important;
            background: #faf9f6 !important;
        }

        .cv {
            width: 1100px !important;
            min-height: 0 !important;

            margin: 0 !important;
            padding: 0 !important;

            background: #faf9f6 !important;
        }

        .cv-page {
            width: 1100px !important;
            max-width: none !important;

            margin: 0 !important;

            border-radius: 0 !important;

            box-shadow: none !important;

            overflow: visible !important;
        }

        /* =========================================
           PDF-ONLY HORIZONTAL POSITIONING
        ========================================= */

        .cv-education-item,
        .cv-certification-item,
        .cv-experience-item,
        .cv-project-item {
            margin-left: 420px !important;
        }

        .cv-skills-content {
            margin-left: 450px !important;
        }

        .cv-page-controls {
            display: none !important;
        }
    `,
});


/* =========================================================
   PDF-SPECIFIC VISUAL ADJUSTMENTS
   ========================================================= */

await page.evaluate(() => {

    document.querySelectorAll(".cv-intro-divider").forEach((element) => {
        element.style.background = "rgba(58, 58, 60, 0.12)";
    });

    document.querySelectorAll(".cv-section").forEach((section) => {
        section.style.borderTopColor = "rgba(58, 58, 60, 0.12)";
    });

});


/* =========================================================
   FIND CV
   ========================================================= */

const cvPage = await page.$(".cv-page");

if (!cvPage) {
    throw new Error("Could not find .cv-page");
}


/* =========================================================
   CALCULATE ACTUAL CONTENT HEIGHT
   ========================================================= */

const cvHeight = await page.evaluate(() => {

    const cv = document.querySelector(".cv-page");

    if (!cv) {
        throw new Error("Could not find .cv-page");
    }

    const cvRect = cv.getBoundingClientRect();

    let top = cvRect.top;
    let bottom = cvRect.bottom;

    /*
     * Account for all descendants.
     *
     * This is important because the CV uses:
     * - relative positioning
     * - negative margins
     * - absolutely positioned elements
     * - shifted content
     */

    cv.querySelectorAll("*").forEach((element) => {

        const rect = element.getBoundingClientRect();

        if (rect.top < top) {
            top = rect.top;
        }

        if (rect.bottom > bottom) {
            bottom = rect.bottom;
        }
    });

    return Math.ceil(bottom - top);
});


if (!cvHeight || cvHeight <= 0) {
    throw new Error("Could not determine CV height");
}


/* =========================================================
   SET CV HEIGHT
   ========================================================= */

await page.evaluate((height) => {

    const cv = document.querySelector(".cv-page");

    if (!cv) {
        throw new Error("Could not find .cv-page");
    }

    cv.style.minHeight = `${height}px`;

}, cvHeight);


/* =========================================================
   FINAL PDF HEIGHT
   ========================================================= */

/*
 * Small safety buffer prevents the final line of content
 * from being clipped by PDF rendering.
 */

const pdfHeight = cvHeight + 20;


/* =========================================================
   GENERATE PDF
   ========================================================= */

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
console.log(`PDF dimensions: 1100px × ${pdfHeight}px`);