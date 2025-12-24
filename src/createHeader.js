// createHeaderPdf.js
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");

async function createHeaderPdf(sectionTitle, outputPath) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // US Letter size

  const [sectionNumber, ...sectionName] = sectionTitle.split(" ");

  const title = `Section ${sectionNumber}`;
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontSize = 36;

  const textWidth = font.widthOfTextAtSize(title, fontSize);

  page.drawText(title, {
    x: (612 - textWidth) / 2,
    y: 792 / 2,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  });


  const subTitle = sectionName.join(' ');
  const subTitleWidth = font.widthOfTextAtSize(subTitle, 16)

  page.drawText(subTitle, {
    x: (612-subTitleWidth)/2,
    y: (792 / 2) - 30,
    size: 16,
    font,
    color: rgb(0, 0, 0),
  })

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
}

module.exports = createHeaderPdf;