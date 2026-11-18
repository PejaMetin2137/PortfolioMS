# mikolajsuchodolski.dev

Personal CV website of Mikolaj Suchodolski — live at **https://mikolajsuchodolski.dev**.

## How it works

- **Single source of truth:** all CV content lives in [`src/data/cv.json`](src/data/cv.json).
  Both the website and the PDF CV are generated from that one file.
- **React + TypeScript + Vite:** the site (`index.html` → `src/components/Site.tsx`) and an
  A4 print layout (`print.html` → `src/components/PrintCV.tsx`). TypeScript types in
  `src/types.ts` catch mistakes in the data at build time.
- **PDF generation:** `scripts/generate-pdf.mjs` opens the print page in headless Chromium
  (Playwright) and saves it as a PDF. The build fails if the CV no longer fits on one page.
- **CI/CD:** on every push to `main`, GitHub Actions ([`deploy.yml`](.github/workflows/deploy.yml))
  type-checks, builds the site, generates the PDF and deploys everything to GitHub Pages.

## Run locally

```bash
npm install                        # install dependencies
npm run dev                        # dev server at http://localhost:5173 (print layout: /print.html)
npx playwright install chromium    # one-time, needed for the PDF
npm run build:all                  # build site + PDF into dist/
```

## Update the CV

Edit `src/data/cv.json`, commit and push — the site and the PDF update automatically.
