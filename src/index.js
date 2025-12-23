// script.js
const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");

const createHeaderPdf = require("./createHeader");
const mergePdfs = require("./mergePdfs");

const SECTIONS_DIR = path.join(__dirname, "Sections");
const OUTPUT_DIR = path.join(__dirname, "output");
const TEMP_DIR = path.join(__dirname, "temp");

fse.ensureDirSync(OUTPUT_DIR);
fse.ensureDirSync(TEMP_DIR);

(async () => {
  const sections = fs
    .readdirSync(SECTIONS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  for (const section of sections) {
    console.log(section.name)
    const sectionPath = path.join(SECTIONS_DIR, section.name);

    const pdfFiles = fs
      .readdirSync(sectionPath)
      .filter((f) => f.endsWith(".pdf"))
      .map((f) => path.join(sectionPath, f))
      .sort();

    if (!pdfFiles.length) continue;

    console.log(`Processing ${section.name}`);

    const headerPdf = path.join(TEMP_DIR, `${section.name}.header.pdf`);
    const outputPdf = path.join(OUTPUT_DIR, `${section.name}.pdf`);

    await createHeaderPdf(section.name, headerPdf);
    await mergePdfs([headerPdf, ...pdfFiles], outputPdf);
  }
})();