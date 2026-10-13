# JunkJournalKit

A starter app for building printable junk-journal kits like a curated DIY paper craft product site. This repo includes:

- Express API for generating a print-ready PDF kit
- Vite + React frontend for a simple kit builder demo
- Original naming and design choices that avoid trademarked names/logos

## Quick start

1. Install dependencies:
   npm install
   npm --prefix client install
2. Run the app:
   npm run dev
3. Open the frontend at http://localhost:5173
4. Click "Generate PDF" to download a sample junk-journal kit PDF from the API.

## Production build

npm run build

## Notes

- The sample kit generator is intentionally lightweight and designed to be extended.
- Replace the sample template and PDF generation logic with your own asset library, upload flows, editing features, and print-ready export logic.
- Use only original assets, public-domain assets, or assets the user has rights to use.

## App structure

- `server.js` — Express API that generates a PDF from layout JSON
- `client/` — React frontend with a demo kit builder UI
