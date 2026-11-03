// Membuat src/js/config.js dari environment variable (dipanggil saat build dan deploy).
// Hanya variabel PUBLIK yang boleh masuk ke sini. Jangan tambahkan kunci rahasia.
import { ROOT, baca, rel } from './lib.mjs';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const versi = JSON.parse(baca(join(ROOT, 'version.json'))).versi;
const namaApp = process.env.APP_NAME || 'Aplikasi Contoh';
const webhookErrorUrl = process.env.APP_WEBHOOK_ERROR_URL || '';

// Tolak kalau ada nilai yang terlihat seperti rahasia
if (/secret|password|service[_-]?role/i.test(process.env.APP_PUBLIC_NOTE || '')) {
  throw new Error('APP_PUBLIC_NOTE tampak berisi rahasia; periksa variabel environment');
}
if (webhookErrorUrl && !/^https:\/\//.test(webhookErrorUrl)) {
  throw new Error('APP_WEBHOOK_ERROR_URL harus https://');
}

const isi = `/* Dibuat otomatis oleh scripts/buat-config.mjs. Jangan diedit manual. */
window.APP_CONFIG = {
  namaApp: ${JSON.stringify(namaApp)},
  versi: ${JSON.stringify(versi)},
  webhookErrorUrl: ${JSON.stringify(webhookErrorUrl)}
};
`;

writeFileSync(join(ROOT, 'src/js/config.js'), isi);
console.log(`config.js dibuat: ${rel(join(ROOT, 'src/js/config.js'))} (versi ${versi})`);
