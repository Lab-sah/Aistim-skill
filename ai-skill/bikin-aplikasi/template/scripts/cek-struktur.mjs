// Cek framework dan struktur proyek.
// Jalankan: npm run cek:struktur
import { ROOT, baca, ada, semuaBerkas, rel, laporan } from './lib.mjs';
import { join } from 'node:path';

const r = laporan('Struktur & framework');

// 1. Deteksi framework dari package.json dan berkas khas
const pkg = ada('package.json') ? JSON.parse(baca(join(ROOT, 'package.json'))) : null;
const deps = { ...(pkg?.dependencies || {}), ...(pkg?.devDependencies || {}) };
let framework = 'vanilla (HTML + JS + CSS)';
if (deps.react) framework = 'React';
else if (deps.vue) framework = 'Vue';
else if (deps.svelte) framework = 'Svelte';
console.log(`Framework terdeteksi: ${framework}`);

// 2. Struktur wajib per framework
const wajibVanilla = ['index.html', 'src/css/style.css', 'src/js/config.js', 'src/js/db.js',
  'src/js/monitoring.js', 'src/js/ui.js', 'src/js/tes.js', 'src/js/app.js',
  'package.json', 'CLAUDE.md', 'CHANGELOG.md', 'version.json', '.gitignore', '.env.example'];
const wajibReact = ['index.html', 'src/main.jsx', 'src/App.jsx', 'package.json', 'CLAUDE.md',
  'CHANGELOG.md', 'version.json', '.gitignore', '.env.example'];
const wajibVue = ['index.html', 'src/main.js', 'src/App.vue', 'package.json', 'CLAUDE.md',
  'CHANGELOG.md', 'version.json', '.gitignore', '.env.example'];
const wajib = framework.startsWith('React') ? wajibReact
  : framework.startsWith('Vue') ? wajibVue
  : framework.startsWith('Svelte') ? [] : wajibVanilla;
for (const f of wajib) if (!ada(f)) r.galat(`berkas wajib tidak ada: ${f}`);
if (framework.startsWith('Svelte')) r.peringatan('pemeriksaan struktur untuk Svelte belum dibuat; cek manual');

// 3. Halaman utama harus memuat script dan CSS dari berkas lokal
if (ada('index.html')) {
  const html = baca(join(ROOT, 'index.html'));

  if (/<script(?![^>]*\bsrc=)[^>]*>\s*\S/i.test(html)) {
    r.galat('index.html punya <script> inline; pindahkan ke berkas .js (CSP melarangnya)');
  }
  if (/\son[a-z]+\s*=\s*["']/i.test(html)) {
    r.galat('index.html punya atribut event inline (onclick=...); pakai addEventListener');
  }
  for (const m of html.matchAll(/<(script|link)[^>]+(?:src|href)=["']([^"']+)["']/gi)) {
    const url = m[2];
    if (/^https?:\/\//.test(url) || url.startsWith('//')) {
      if (!/@\d+\.\d+\.\d+/.test(url)) r.galat(`CDN tanpa versi pasti: ${url}`);
      else r.peringatan(`memuat dari CDN: ${url} (pastikan CSP mengizinkan)`);
    } else if (!ada(url)) {
      r.galat(`berkas dirujuk di index.html tidak ada: ${url}`);
    }
  }
  if (!/Content-Security-Policy/i.test(html)) r.galat('index.html belum punya meta Content-Security-Policy');

  // Setiap berkas src/js harus dimuat, supaya tidak ada modul yatim
  const dimuat = new Set([...html.matchAll(/src=["']([^"']+\.js)["']/g)].map(m => m[1]));
  for (const f of semuaBerkas(join(ROOT, 'src/js'))) {
    const nama = rel(f);
    if (!dimuat.has(nama)) r.peringatan(`${nama} tidak dimuat oleh index.html`);
  }
}

// 4. Tidak ada berkas hasil build atau sampah di repo
for (const f of semuaBerkas()) {
  const nama = rel(f);
  if (/\.(log|tmp|bak)$/.test(nama) || nama.endsWith('.DS_Store')) r.peringatan(`berkas sampah: ${nama}`);
}

r.selesai();
