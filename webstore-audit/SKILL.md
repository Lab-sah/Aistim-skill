---
name: webstore-audit
description: Audit and standardize a Chrome extension against Chrome Web Store policy and Manifest V3 requirements. Use when asked to check, audit, prepare, or standardize an extension before publishing.
---

# Webstore Audit

Gunakan skill ini untuk mengaudit folder extension Chrome (atau Edge) sebelum dipublikasikan ke Chrome Web Store, lalu merapikannya agar sesuai standar.

## Prinsip kerja

1. **Audit dulu, ubah belakangan.** Jangan mengedit file sebelum laporan audit ditampilkan dan pengguna menyetujui perbaikannya. Pengecualian: perbaikan kecil yang jelas (misalnya menghapus file sampah) boleh langsung dilakukan jika pengguna memintanya.
2. **Verifikasi aturan terbaru.** Kebijakan Chrome Web Store berubah. Sebelum memberi kesimpulan tentang pengumpulan data, cek halaman kebijakan resmi (developer.chrome.com/docs/webstore/program-policies) bila tersedia. Sebutkan dengan jelas jika ada poin yang belum diverifikasi.
3. **Jangan menyimpulkan niat jahat dari satu baris kode.** Laporkan temuan dengan tingkat keparahan, lalu biarkan developer menjelaskan.

## Langkah 1: Inventaris

- Cari `manifest.json` di root folder. Jika tidak ada, hentikan audit dan laporkan.
- Daftar semua file: `js`, `html`, `css`, gambar, dan konfigurasi.
- Catat ukuran file JavaScript. Kode yang sudah di-minify atau ter-bundle bukan pelanggaran, tapi harus dicatat sebagai peringatan karena pengecekan reviewer jadi lebih sulit.

## Langkah 2: Audit manifest

Periksa setiap poin berikut dan beri status PASS, WARN, atau FAIL.

| Cek | Standar |
|---|---|
| `manifest_version` | Harus `3`. |
| `name` | Ada, maksimal 75 karakter, tidak mengandung kata "Chrome" atau "Google" sebagai merek. |
| `version` | Ada, format angka dengan titik (contoh `1.0.0`). Harus lebih tinggi dari versi sebelumnya jika ini update. |
| `description` | Ada, maksimal 132 karakter, menjelaskan fungsi utama. |
| `icons` | Tersedia 16, 32, 48, dan 128 piksel. |
| `action.default_icon` | Ada jika extension punya toolbar button. |
| `permissions` | Setiap izin harus dipakai di kode. Izin yang tidak terpakai = FAIL. Cek juga izin yang lebih luas dari kebutuhan (misalnya `<all_urls>` padahal hanya satu situs). |
| `host_permissions` | Sesempit mungkin. Cocokkan dengan `content_scripts.matches`. |
| `background` | MV3 hanya boleh `service_worker`. Jika memakai `background.scripts` atau `background.page`, FAIL. |
| `content_security_policy` | Tidak boleh mengizinkan `unsafe-eval` atau sumber remote. |
| `web_accessible_resources` | Seminimal mungkin. Jangan membuka file sensitif. |
| `content_scripts` | Cek urutan file di `js` jika ada ketergantungan antar file. |

## Langkah 3: Audit kode (kebijakan dan keamanan)

Cari pola berikut dengan Grep, lalu catat lokasi file dan nomor baris.

**FAIL (pelanggaran kebijakan MV3 atau Web Store):**
- Eksekusi kode dari luar: `eval(`, `new Function(`, `setTimeout("`, `setInterval("`, atau `<script src="http`.
- Import script dari server atau CDN saat runtime (`importScripts(` dengan URL http, atau `import(` dengan URL remote).
- Kode yang mengunduh lalu menjalankan script baru.
- Tindakan yang menyembunyikan perilaku dari pengguna atau reviewer, misalnya kode yang hanya aktif setelah tanggal tertentu tanpa alasan jelas.

**WARN (perlu dijelaskan di listing atau privacy policy):**
- Pengiriman data ke server: `fetch(`, `XMLHttpRequest`, `navigator.sendBeacon`, `WebSocket`. Catat domain tujuannya.
- Pengumpulan data pengguna: `chrome.history`, `chrome.cookies`, `chrome.webRequest`, `chrome.tabs` dengan `url`, `document.cookie`, isian form, atau input keyboard.
- Penyimpanan data: `chrome.storage`, `localStorage`, `indexedDB`. Catat data apa yang disimpan.
- Skrip analitik atau pihak ketiga.
- Kode yang di-minify atau di-obfuscate. Laporkan saja, jangan langsung dianggap pelanggaran.

**Aturan privacy:**
- Jika ada pengiriman data keluar perangkat, extension wajib punya privacy policy dan pengungkapan di dashboard. Tandai FAIL jika tidak ada file atau tautan privacy policy di folder atau README.
- Data yang dikumpulkan harus hanya yang dibutuhkan untuk single purpose. Data di luar itu = FAIL.
- Pengumpulan riwayat browsing hanya boleh untuk fitur yang dijelaskan jelas di listing dan UI. Di luar itu = FAIL.

## Langkah 4: Standardisasi struktur folder

Rekomendasi struktur:

```
manifest.json
background.js (atau service-worker.js)
content/        (content scripts)
popup/          (popup.html, popup.js, popup.css)
options/        (halaman pengaturan, jika ada)
assets/icons/   (icon-16.png, icon-32.png, icon-48.png, icon-128.png)
lib/            (library pihak ketiga, dengan versi tercatat)
```

Cek dan laporkan:
- Tidak ada `node_modules/`, `.git/`, `.DS_Store`, `*.zip`, `*.map`, file `.env`, atau file kunci API di dalam folder yang akan dipaket.
- Nama file huruf kecil dengan tanda hubung, tanpa spasi.
- Path di manifest sesuai dengan file yang benar-benar ada (cek file yang hilang).
- Tidak ada kredensial atau token di dalam kode.

## Langkah 5: Cek aset listing

Cek keberadaan dan ukuran (verifikasi terhadap dashboard developer karena ukuran bisa berubah):
- Ikon toko 128×128.
- Screenshot minimal satu, 1280×800 atau 640×400.
- Tile promo kecil 440×280 (opsional).
- Teks single purpose yang jelas.
- Tautan privacy policy, jika ada pengumpulan data.

## Langkah 6: Laporan

Tampilkan laporan dengan urutan:

1. **Ringkasan:** jumlah PASS, WARN, dan FAIL, serta satu kalimat kesimpulan.
2. **FAIL:** daftar lengkap, dengan file, baris, dan perbaikan yang disarankan.
3. **WARN:** daftar yang perlu dijelaskan developer.
4. **Daftar perbaikan:** urutkan dari yang paling penting. Tanyakan mana yang mau langsung diterapkan.
5. **Yang belum diverifikasi:** poin yang bergantung pada dashboard atau kebijakan yang mungkin berubah.

Jangan menulis ulang laporan panjang dengan kalimat pembuka. Langsung ke temuan.

## Langkah 7: Standardisasi (hanya setelah persetujuan)

- Terapkan perbaikan yang disetujui, satu kelompok per langkah.
- Setelah mengubah manifest, validasi ulang JSON dan pastikan semua path di manifest ada.
- Jika ini update, naikkan `version` di manifest.
- Buat ZIP dengan `manifest.json` di root ZIP, bukan di dalam sub-folder. Kecualikan file yang tercantum di Langkah 4.
- Jalankan audit ulang dan tampilkan hasil perbandingan sebelum dan sesudah.

## Batasan

- Skill ini tidak menjamin persetujuan review Chrome Web Store.
- Jangan menghapus fitur atau kode tanpa persetujuan eksplisit.
- Jangan menambahkan permission baru tanpa alasan yang disetujui pengguna.
