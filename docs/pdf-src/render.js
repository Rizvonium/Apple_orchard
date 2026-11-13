// Render the PDFs: node docs/pdf-src/render.js [demo|report|all]
const { chromium } = require('playwright');
const path = require('path');
const which = process.argv[2] || 'all';
const jobs = { demo: ['demo.html', '../Baghbaan-Demo-App.pdf', { width: '297mm', height: '210mm' }],
               report: ['report.html', '../Baghbaan-Research-and-Integration-Plan.pdf', { format: 'A4' }] };
(async () => {
  const b = await chromium.launch();
  for (const [k, [src, out, size]] of Object.entries(jobs)) {
    if (which !== 'all' && which !== k) continue;
    const p = await b.newPage();
    const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
    await p.goto('file://' + path.join(__dirname, src));
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
    await p.pdf({ path: path.join(__dirname, out), printBackground: true, preferCSSPageSize: true, ...size });
    console.log(k, '->', out, errs.length ? 'ERRORS: ' + errs.join(' | ') : 'ok');
  }
  await b.close();
})();
