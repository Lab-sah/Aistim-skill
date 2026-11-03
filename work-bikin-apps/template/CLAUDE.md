# Aturan untuk AI di proyek ini

## Tujuan
Aplikasi catatan kecil sebagai contoh. Pengguna: [isi]. URL produksi: [isi setelah deploy].

## Perintah
- Cek struktur, keamanan, dan versi: `npm run cek`
- Tes di browser: `npm run tes` (atau buka `index.html?test=1`)
- Bangun config publik: `npm run build:config`

## Aturan wajib
1. Jalankan `npm run cek` dan `npm run tes` sebelum setiap commit. Jika ada yang gagal, perbaiki dulu.
2. Jangan menaruh API key, token, password, atau URL webhook rahasia di kode. Gunakan environment variable dan secret CI.
3. Jangan commit `.env`. Hanya `.env.example`.
4. Jangan pakai `innerHTML` dengan data dari pengguna. Pakai `textContent`.
5. Jangan menambah `<script>` inline atau atribut `onclick=`. Tambahkan berkas `.js` dan daftarkan di `index.html`.
6. Setiap kenaikan versi: ubah `version.json` dan `package.json`, tambah entri di `CHANGELOG.md`, lalu `npm run build:config`.
7. Ubah skema data hanya dengan menaikkan `SKEMA_VERSI` dan menambah migrasi di `src/js/db.js`.

## Gaya kode
- Nama fungsi dan variabel dalam bahasa Indonesia.
- Satu berkas satu tanggung jawab. Modul diletakkan di `App.<nama>`.
- Perubahan kecil per commit, pesan commit menjelaskan alasan.
