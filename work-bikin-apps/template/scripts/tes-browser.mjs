// Menjalankan tes di browser: buka index.html?test=1 dan pastikan tidak ada yang gagal.
// Butuh Playwright: npm i -D playwright (sekali saja). Jalankan: npm run tes
import { ROOT } from './lib.mjs';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Playwright belum terpasang. Jalankan: npm i -D playwright && npx playwright install chromium');
  process.exit(1);
}

const url = pathToFileURL(join(ROOT, 'index.html')).href + '?test=1';
const browser = await chromium.launch();
const halaman = await browser.newPage();
const errorHalaman = [];
halaman.on('pageerror', (e) => errorHalaman.push(e.message));

await halaman.goto(url);
await halaman.waitForFunction(() => window.__TEST_HASIL, null, { timeout: 15000 });
const hasil = await halaman.evaluate(() => window.__TEST_HASIL);
await browser.close();

for (const d of hasil.detail) console.log(d.ok ? '  ok  ' : '  GAGAL', d.nama, d.ok ? '' : `- ${d.pesan}`);
console.log(`Tes: ${hasil.lulus} lulus, ${hasil.gagal} gagal`);
if (errorHalaman.length) console.log('Error halaman:', errorHalaman);

if (hasil.gagal > 0 || errorHalaman.length > 0) process.exitCode = 1;
