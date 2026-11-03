// Cek keamanan dasar: rahasia di kode, .gitignore, CSP, dan pola berbahaya.
// Jalankan: npm run cek:keamanan
import { ROOT, baca, ada, semuaBerkas, rel, laporan } from './lib.mjs';
import { join } from 'node:path';

const r = laporan('Keamanan');

// 1. Pola rahasia yang tidak boleh ada di kode
const POLA_RAHASIA = [
  [/AKIA[0-9A-Z]{16}/, 'kunci akses AWS'],
  [/sk_live_[0-9a-zA-Z]{16,}/, 'kunci Stripe live'],
  [/-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/, 'private key'],
  [/https:\/\/discord(app)?\.com\/api\/webhooks\/\d+\/[\w-]+/, 'webhook Discord'],
  [/https:\/\/hooks\.slack\.com\/services\/[\w/]+/, 'webhook Slack'],
  [/\b\d{8,10}:[A-Za-z0-9_-]{35}\b/, 'token bot Telegram'],
  [/(api[_-]?key|secret|token|password|passwd)\s*[:=]\s*["'][^"'\s]{12,}["']/i, 'rahasia ditulis langsung di kode'],
];

// Berkas yang boleh berisi contoh placeholder
const LEWATI = /\.(png|jpg|jpeg|gif|webp|ico|woff2?|ttf|pdf)$/i;

for (const f of semuaBerkas()) {
  const nama = rel(f);
  if (LEWATI.test(nama) || nama === 'scripts/cek-keamanan.mjs' || nama === 'scripts/lib.mjs') continue;
  const isi = baca(f);
  for (const [pola, jenis] of POLA_RAHASIA) {
    if (pola.test(isi)) r.galat(`${jenis} terdeteksi di ${nama}. Pindahkan ke environment variable dan cabut kuncinya.`);
  }
}

// 2. .env dan config lokal harus diabaikan Git
if (!ada('.gitignore')) {
  r.galat('.gitignore tidak ada');
} else {
  const gi = baca(join(ROOT, '.gitignore'));
  for (const pola of ['.env', 'config.local.js']) {
    if (!gi.split('\n').some(l => l.trim() === pola || l.trim() === `/${pola}`)) {
      r.galat(`.gitignore belum mengabaikan ${pola}`);
    }
  }
}

// 3. Tidak ada .env di repo (hanya .env.example)
if (ada('.env')) r.peringatan('file .env ada di folder proyek; pastikan tidak pernah di-commit');

// 4. Pola berbahaya di JavaScript
for (const f of semuaBerkas()) {
  const nama = rel(f);
  if (!/\.(js|mjs|jsx|ts|tsx|vue|svelte)$/.test(nama) || nama.startsWith('scripts/')) continue;
  const isi = baca(f);
  if (/\beval\s*\(|new Function\s*\(/.test(isi)) r.galat(`eval / new Function di ${nama}`);
  if (/document\.write\s*\(/.test(isi)) r.galat(`document.write di ${nama}`);
  if (/\.innerHTML\s*=\s*(?!['"`]\s*['"`]\s*;)/.test(isi)) {
    r.peringatan(`innerHTML dengan nilai dinamis di ${nama}; pastikan sudah di-escape atau pakai textContent`);
  }
}

// 5. Halaman harus punya CSP yang ketat
if (ada('index.html')) {
  const html = baca(join(ROOT, 'index.html'));
  const m = html.match(/Content-Security-Policy"\s+content="([^"]+)"/i);
  if (!m) {
    r.galat('index.html tanpa Content-Security-Policy');
  } else {
    const csp = m[1];
    if (/'unsafe-inline'|'unsafe-eval'/.test(csp)) r.galat('CSP memakai unsafe-inline atau unsafe-eval');
    if (!/object-src\s+'none'/.test(csp)) r.peringatan("CSP sebaiknya punya object-src 'none'");
  }
}

// 6. Dependensi: tanpa rentang versi liar
if (ada('package.json')) {
  const pkg = JSON.parse(baca(join(ROOT, 'package.json')));
  for (const [nama, v] of Object.entries({ ...pkg.dependencies, ...pkg.devDependencies })) {
    if (/^[\^~*]|latest|\*/.test(v)) r.peringatan(`dependensi ${nama}@${v} belum dikunci ke versi pasti`);
  }
}

r.selesai();
