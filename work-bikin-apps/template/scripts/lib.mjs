// Fungsi bersama untuk semua pemeriksaan. Tanpa dependensi luar.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = fileURLToPath(new URL('..', import.meta.url));

const ABAIKAN = new Set(['node_modules', '.git', 'dist', 'coverage']);

// Daftar semua berkas proyek (tanpa folder yang diabaikan)
export function semuaBerkas(dir = ROOT) {
  const hasil = [];
  for (const nama of readdirSync(dir)) {
    if (ABAIKAN.has(nama)) continue;
    const path = join(dir, nama);
    if (statSync(path).isDirectory()) hasil.push(...semuaBerkas(path));
    else hasil.push(path);
  }
  return hasil;
}

export const rel = (path) => relative(ROOT, path).split('\\').join('/');
export const baca = (path) => readFileSync(path, 'utf8');
export const ada = (path) => existsSync(join(ROOT, path));

// Hasil pemeriksaan: kumpulkan galat (wajib diperbaiki) dan peringatan (disarankan)
export function laporan(judul) {
  const galat = [];
  const peringatan = [];
  return {
    galat(pesan) { galat.push(pesan); },
    peringatan(pesan) { peringatan.push(pesan); },
    selesai() {
      console.log(`\n== ${judul} ==`);
      peringatan.forEach(p => console.log('  PERINGATAN:', p));
      galat.forEach(g => console.log('  GALAT:', g));
      console.log(`  ${galat.length} galat, ${peringatan.length} peringatan`);
      if (galat.length) process.exitCode = 1;
    }
  };
}
