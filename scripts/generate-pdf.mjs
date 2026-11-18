// Turns print.html (from the built site in dist/) into dist/CV_Mikolaj_Suchodolski.pdf.
// Run after `vite build`:  npm run pdf
import { preview } from "vite";
import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const cv = JSON.parse(readFileSync(new URL("../src/data/cv.json", import.meta.url), "utf8"));
const port = 4173;

const server = await preview({ preview: { port, strictPort: true, open: false } });
const browser = await chromium.launch();

try {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}/print.html`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  // Fail the build if the CV no longer fits on one A4 page (297 mm = ~1123 CSS px).
  const height = await page.evaluate(() => document.querySelector(".page").scrollHeight);
  if (height > 1124) {
    console.error(`CV is ${height}px tall, more than one A4 page. Shorten the text in src/data/cv.json.`);
    process.exitCode = 1;
  }

  const out = `dist/${cv.pdfFile}`;
  await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true, pageRanges: "1" });
  console.log(`PDF written: ${out} (page height ${height}px of 1123px)`);
} finally {
  await browser.close();
  server.httpServer.close();
}
