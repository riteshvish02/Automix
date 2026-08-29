const fs = require('fs');
const PDFDocument = require('pdfkit');

const mdPath = './demo_script.md';
const outPath = './demo_script.pdf';

if (!fs.existsSync(mdPath)) {
  console.error('demo_script.md not found');
  process.exit(1);
}

const md = fs.readFileSync(mdPath, 'utf8');

const doc = new PDFDocument({ margin: 50 });
const stream = fs.createWriteStream(outPath);
doc.pipe(stream);

doc.fontSize(18).text('Demo Script — AI Assistant Project', { align: 'center' });
doc.moveDown();

doc.fontSize(12).text(md, { align: 'left' });

doc.end();

stream.on('finish', () => {
  console.log('PDF generated at', outPath);
});
