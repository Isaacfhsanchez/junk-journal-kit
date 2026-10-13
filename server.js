const express = require('express');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const axios = require('axios');
const sharp = require('sharp');

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

async function fetchImageBuffer(src) {
  if (!src) return null;

  if (src.startsWith('data:')) {
    const matches = src.match(/^data:.+;base64,(.*)$/);
    if (!matches) return null;
    return Buffer.from(matches[1], 'base64');
  }

  const res = await axios.get(src, { responseType: 'arraybuffer' });
  return Buffer.from(res.data);
}

app.get('/health', (req, res) => {
  res.json({ ok: true, message: 'JunkJournalKit API is running' });
});

app.post('/generate', async (req, res) => {
  try {
    const { pages } = req.body;

    if (!pages || !Array.isArray(pages) || pages.length === 0) {
      return res.status(400).json({ error: 'pages required' });
    }

    const doc = new PDFDocument({ autoFirstPage: false });
    const buffers = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=junk-journal-kit.pdf');
      res.send(pdfBuffer);
    });

    for (const page of pages) {
      const widthInches = page.size?.widthInches || 8.5;
      const heightInches = page.size?.heightInches || 11;
      const width = widthInches * 72;
      const height = heightInches * 72;

      doc.addPage({ size: [width, height] });

      if (!page.elements) continue;

      for (const element of page.elements) {
        if (element.type === 'image' && element.src) {
          try {
            const imageBuffer = await fetchImageBuffer(element.src);
            if (!imageBuffer) continue;

            const targetWidth = (element.widthInches || element.width || 2) * 72;
            const targetHeight = (element.heightInches || element.height || 2) * 72;

            const processed = await sharp(imageBuffer)
              .resize(Math.round(targetWidth), Math.round(targetHeight), { fit: 'cover' })
              .png()
              .toBuffer();

            const x = (element.xInches || element.x || 0.5) * 72;
            const y = (element.yInches || element.y || 0.5) * 72;

            doc.image(processed, x, y, { width: targetWidth, height: targetHeight });
          } catch (error) {
            console.warn('Image render failed:', error.message);
          }
        }

        if (element.type === 'text' && element.text) {
          const x = (element.xInches || element.x || 0.5) * 72;
          const y = (element.yInches || element.y || 0.5) * 72;
          const fontSize = element.fontSize || 16;
          const widthText = (element.widthInches || element.width || 4) * 72;

          doc
            .fontSize(fontSize)
            .fillColor(element.color || '#111111')
            .text(element.text, x, y, { width: widthText, align: element.align || 'left' });
        }
      }
    }

    doc.end();
  } catch (error) {
    console.error('PDF generation failed:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`JunkJournalKit API listening on http://localhost:${PORT}`);
});
