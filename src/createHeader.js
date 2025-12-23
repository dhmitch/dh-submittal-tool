// createHeaderPdf.js
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");

async function createHeaderPdf(title, outputPath) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // US Letter

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontSize = 28;

  const textWidth = font.widthOfTextAtSize(title, fontSize);

  page.drawText(title, {
    x: (612 - textWidth) / 2,
    y: 792 / 2,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
}

module.exports = createHeaderPdf;