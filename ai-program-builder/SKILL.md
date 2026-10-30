---
name: ai-program-builder
description: Panduan terstruktur untuk membuat program/aplikasi dengan bantuan AI — dari analisis kebutuhan, penyusunan prompt (RACE), evaluasi kode, debugging, sampai deploy. Gunakan skill ini setiap kali diminta membantu membuat, mereview, atau memperbaiki program/aplikasi.
---

# AI Program Builder

Ikuti alur kerja berikut setiap kali membantu pengguna membuat program/aplikasi.

## Fase 1 — Analisis & Rencana
1. Klarifikasi kebutuhan: fungsi utama, platform (web/mobile/desktop), tech stack, constraint.
2. Jika kebutuhan ambigu, TANYA dulu sebelum coding. Maksimal 3 pertanyaan kunci.
3. Jika spesifikasi pengguna sudah lengkap, lewati pertanyaan dan langsung susun rencana.
4. Susun rencana singkat: struktur file/arsitektur, urutan pengerjaan.

## Fase 2 — Penyusunan Solusi
- Gunakan prinsip RACE untuk menyusun instruksi kerja dan prompt yang kamu tulis, bukan untuk menafsirkan user:
  - Role: tentukan peran AI sebagai asisten developer yang menyesuaikan tingkat penjelasan dengan level pengguna.
  - Action: kerjakan tugas paling spesifik dulu, jangan sekaligus semuanya.
  - Context: hormati environment, versi library, dan dependency yang disebut pengguna.
  - Expectation: sesuaikan gaya kode dengan contoh yang diberikan pengguna; jika tidak ada, gunakan best practice umum.
- Untuk aplikasi besar: pecah jadi 3 sub-fase — (1) desain struktur layar/navigasi, (2) implementasi per komponen, (3) integrasi + backend.
- Setelah tiap sub-fase selesai, minta konfirmasi pengguna sebelum lanjut ke sub-fase berikutnya.

## Fase 3 — Standar Kode Wajib
- Kode harus: jelas, terdokumentasi secukupnya, aman (hindari SQL injection, XSS, hardcoded secret), dan tidak memakai API/library yang sudah deprecated.
- Sebutkan versi library dan runtime yang dipakai, lalu pastikan sesuai dengan yang disebut pengguna.
- Sertakan penanganan error (error handling) pada bagian yang berinteraksi dengan input user atau jaringan.
- Jangan mengarang nama fungsi/API. Jika tidak yakin, nyatakan asumsi secara eksplisit.

## Fase 4 — Evaluasi (wajib sebelum jawab)
Checklist sebelum menyerahkan kode:
- Logika sudah benar untuk kasus normal DAN edge case?
- Tidak ada security hole?
- Dependency dan versi sudah cocok dengan environment yang disebut pengguna?
- Kode bisa dijalankan apa adanya (tanpa bagian "TODO")?
- Sudah ada contoh cara pakai/pengujian singkat?

## Fase 5 — Debugging (jika pengguna melaporkan error)
1. Minta laporan yang lengkap: pesan error lengkap (stack trace), kode terkait, apa yang sudah dicoba, dan hasilnya.
2. Jika ada bagian yang kurang, minta bagian itu saja. Jangan menebak penyebabnya.
3. Reproduksi masalah dulu, lalu cari akar masalahnya sebelum mengubah kode.
4. Setelah perbaikan, jelaskan AKAR MASALAH-nya, bukan hanya solusinya, dan sebutkan cara memastikan masalahnya sudah hilang.

## Fase 6 — Penyerahan
- Ringkas: sebutkan file apa saja yang dibuat/diubah dan cara menjalankannya.
- Sebutkan asumsi yang dibuat dan bagian yang belum diuji, sesuai Fase 3.
- Ingatkan pengguna untuk menguji di environment nyata (device nyata untuk aplikasi mobile), bukan hanya emulator/simulasi.

## Fase 7 — Deploy
- Jangan deploy sebelum checklist Fase 4 lulus dan pengguna sudah menguji di environment nyata.
- Konfirmasi dulu target hosting dan cara deploy yang dipakai pengguna. Jangan mengasumsikan platform tertentu.
- Simpan secret (API key, password, token) di environment variable atau secret manager, jangan di kode atau di repo.
- Pastikan build production berjalan lokal sebelum dikirim ke hosting.
- Setelah deploy, cek halaman utama, fitur inti, dan log error di hosting.
- Sebutkan langkah rollback jika deploy bermasalah.
