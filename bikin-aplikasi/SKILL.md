---
name: bikin-aplikasi
description: Membuat aplikasi web kecil yang siap online dengan 7 bagian wajib: aturan untuk AI, struktur multi-file yang rapi, database yang awet, API key di luar kode, deploy satu link, monitoring error dengan notifikasi HP, dan tes otomatis. Termasuk pemeriksaan framework/struktur, keamanan, dan versioning. Pakai saat diminta membuat aplikasi baru dari nol atau merapikan prototipe agar siap dipakai.
---

# Bikin Aplikasi (7 bagian wajib)

Aplikasi dianggap siap hanya jika ketujuh bagian ini ada dan `npm run cek` serta `npm run tes` hijau.
Template lengkapnya ada di folder `template/` pada skill ini. Salin seluruh isinya ke proyek baru,
lalu isi bagian yang ditandai `[isi]`.

## 1. Aturan untuk AI dulu (CLAUDE.md)

Sebelum menulis kode, pastikan `CLAUDE.md` ada dan sudah dibaca. Isinya:

- Tujuan aplikasi dan pengguna.
- Perintah cek, tes, dan build.
- Larangan: API key atau password di kode, commit `.env`, `innerHTML` dengan data pengguna, `<script>` inline.
- Aturan versi: setiap rilis menaikkan `version.json`, `package.json`, dan `CHANGELOG.md`.

## 2. Struktur multi-file (bukan satu file)

Kode dipisah per tanggung jawab. Halaman utama hanya merakit:

```
index.html              shell halaman, CSP, urutan script
src/css/style.css       gaya
src/js/config.js        konfigurasi publik (dibuat dari env saat build)
src/js/db.js            database + migrasi skema
src/js/monitoring.js    catat error, webhook, notifikasi HP
src/js/ui.js            render (textContent saja)
src/js/tes.js           tes otomatis (?test=1)
src/js/app.js           wiring event
scripts/                cek struktur, keamanan, versi, build config, tes browser
.github/workflows/      cek lalu deploy ke GitHub Pages
```

Aturan:
- Tidak ada build step untuk aplikasi. Berkas dimuat langsung oleh browser lewat `<script src>`.
- Jika aplikasi tumbuh (banyak halaman, state kompleks), pakai framework (React atau Vue). `cek-struktur` otomatis mengenali `package.json` dengan React atau Vue dan memeriksa struktur yang sesuai.

## 3. Database yang awet

- Untuk prototipe: localStorage dengan kunci `db_aplikasi` dan `SKEMA_VERSI`.
- Setiap perubahan struktur menaikkan `SKEMA_VERSI` dan menambah fungsi migrasi. Jangan menghapus data lama tanpa konfirmasi.
- Untuk data bersama antar pengguna, pakai backend (Supabase, Firebase, atau server sendiri). Aturan API key di bagian 4 tetap berlaku.

## 4. API key di luar kode

- Kunci tidak pernah ditulis di kode atau repo. `cek-keamanan` memindai pola umum (kunci AWS, Stripe, private key, webhook Discord/Slack, token Telegram, dan `apiKey = "..."`).
- Nilai publik (nama aplikasi, URL webhook) masuk lewat environment variable. `scripts/buat-config.mjs` menulis `src/js/config.js` dari variabel itu saat build.
- Kunci rahasia hanya di server atau secret CI (GitHub Secrets). Di `.env.example` hanya nama variabel tanpa nilai.
- `.gitignore` wajib mengabaikan `.env` dan `config.local.js`.

## 5. Deploy satu link

- `.github/workflows/deploy.yml`: setiap push ke `main` menjalankan `npm run cek`, lalu tes browser, lalu deploy ke GitHub Pages. Deploy tidak jalan jika cek gagal.
- Variabel: `APP_NAME` di Repository variables, `APP_WEBHOOK_ERROR_URL` di Secrets.
- Aktifkan GitHub Pages dengan sumber "GitHub Actions" di pengaturan repo.

## 6. Monitoring: catat error dan kabari HP

- `monitoring.js` menangkap `window.onerror` dan `unhandledrejection`, menyimpan 100 error terakhir, lalu menampilkannya di tab Log.
- Jika `APP_WEBHOOK_ERROR_URL` terisi (https), error dikirim ke webhook. Kegagalan kirim diabaikan agar aplikasi tidak ikut rusak.
- Notifikasi HP lewat Notification API. Di HP, pasang aplikasi sebagai PWA agar notifikasi tetap bisa tampil.

## 7. Tes otomatis

- Di browser: buka `index.html?test=1`. Hasil tampil di halaman dan `window.__TEST_HASIL` untuk CI.
- Dari terminal: `npm run tes` (butuh `npm i -D playwright` sekali saja).
- Tes wajib mencakup: fungsi inti, migrasi, dan monitoring error.

## 8. Pemeriksaan framework, struktur, keamanan, dan versi

Jalankan `npm run cek` sebelum setiap commit. Perintah ini menjalankan tiga pemeriksaan:

| Pemeriksaan | Skrip | Memeriksa |
|---|---|---|
| Framework dan struktur | `cek-struktur.mjs` | framework terdeteksi (vanilla, React, Vue); berkas wajib ada; tidak ada `<script>` inline atau `onclick=`; semua `src/js` dimuat; CDN wajib versi pasti; CSP ada |
| Keamanan | `cek-keamanan.mjs` | pola rahasia di kode; `.env` dan `config.local.js` diabaikan Git; `eval`, `new Function`, `document.write`; CSP tanpa `unsafe-inline`; dependensi dikunci versinya |
| Versioning | `cek-versi.mjs` | `version.json` semver; sama dengan `package.json` dan `config.js`; ada entri di `CHANGELOG.md`. Dengan `--tag`, tag `v<versi>` belum dipakai |

Galat (GALAT) menghentikan proses. Peringatan (PERINGATAN) harus dibaca dan diputuskan.

### Rilis

1. Naikkan `version.json` dan `package.json` (sama).
2. Tambah entri `## [versi]` di `CHANGELOG.md`.
3. `npm run build:config`, lalu `npm run cek:versi -- --tag`, `npm run cek`, dan `npm run tes`.
4. Commit lalu push ke `main`. Workflow deploy berjalan otomatis.

## Checklist akhir

- [ ] `CLAUDE.md` ada dan sudah dibaca
- [ ] Struktur multi-file sesuai tabel di bagian 2
- [ ] Data tersimpan dengan `SKEMA_VERSI` dan migrasi
- [ ] Tidak ada rahasia di repo; `.env` diabaikan Git
- [ ] `npm run cek` hijau
- [ ] `npm run tes` atau `index.html?test=1` semua lulus
- [ ] Versi dan CHANGELOG sinkron
- [ ] Deploy berjalan dan link dicatat di `CLAUDE.md`
