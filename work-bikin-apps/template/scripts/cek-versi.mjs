// Cek versioning: semver, sinkron di semua tempat, dan CHANGELOG terisi.
// Jalankan: npm run cek:versi
// Opsi --tag: pastikan tag git v<versi> belum ada (dipakai saat rilis).
import { ROOT, baca, ada, laporan } from './lib.mjs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const r = laporan('Versioning');
const SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-[0-9A-Za-z.-]+)?$/;

if (!ada('version.json')) {
  r.galat('version.json tidak ada');
  r.selesai();
  process.exit();
}
const versi = JSON.parse(baca(join(ROOT, 'version.json'))).versi;
if (!SEMVER.test(versi)) r.galat(`versi "${versi}" bukan semver (MAJOR.MINOR.PATCH)`);

// Versi di package.json harus sama
if (ada('package.json')) {
  const pkg = JSON.parse(baca(join(ROOT, 'package.json')));
  if (pkg.version !== versi) r.galat(`package.json version (${pkg.version}) tidak sama dengan version.json (${versi})`);
}

// Versi di config.js (dibuat dari version.json saat deploy) harus sama
if (ada('src/js/config.js')) {
  const m = baca(join(ROOT, 'src/js/config.js')).match(/versi:\s*'([^']+)'/);
  if (!m) r.galat('src/js/config.js tidak punya field versi');
  else if (m[1] !== versi) r.galat(`src/js/config.js versi ${m[1]} tidak sama dengan ${versi}. Jalankan npm run build:config`);
}

// CHANGELOG harus punya entri untuk versi ini
if (!ada('CHANGELOG.md')) {
  r.galat('CHANGELOG.md tidak ada');
} else if (!baca(join(ROOT, 'CHANGELOG.md')).includes(`## [${versi}]`)) {
  r.galat(`CHANGELOG.md belum punya entri "## [${versi}]"`);
}

// Mode rilis: tag belum dipakai
if (process.argv.includes('--tag')) {
  try {
    const tags = execSync('git tag --list', { cwd: ROOT, encoding: 'utf8' }).split('\n');
    if (tags.includes(`v${versi}`)) r.galat(`tag v${versi} sudah ada. Naikkan versi dulu.`);
  } catch {
    r.peringatan('git tidak tersedia; cek tag dilewati');
  }
}

r.selesai();
