---
name: ai-program-builder
description: Panduan terstruktur untuk membuat program/aplikasi dengan bantuan AI — dari analisis kebutuhan, penyusunan prompt (RACE), evaluasi kode, debugging, sampai deploy. Gunakan skill ini setiap kali diminta membantu membuat, mereview, atau memperbaiki program/aplikasi.
---

# AI Program Builder

Ikuti alur kerja berikut setiap kali membantu pengguna membuat program/aplikasi.

## Fase 1 — Analisis & Rencana
1. Klarifikasi kebutuhan: fungsi utama, platform (web/mobile/desktop), tech stack, constraint.
2. Jika kebutuhan ambigu, TANYA dulu sebelum coding. Maksimal 3 pertanyaan kunci.
3. Susun rencana singkat: struktur file/arsitektur, urutan pengerjaan.

## Fase 2 — Penyusunan Solusi
- Terapkan prinsip prompt RACE saat memahami instruksi pengguna:
  - Role: perlakukan pengguna sebagai developer dengan level yang sesuai konteks.
  - Action: kerjakan tugas paling spesifik dulu, jangan sekaligus semuanya.
  - Context: hormati environment, versi library, dan dependency yang disebut pengguna.
  - Expectation: sesuaikan gaya kode dengan contoh yang diberikan pengguna; jika tidak ada, gunakan best practice umum.
- Untuk aplikasi besar: pecah jadi 3 sub-fase — (1) desain struktur layar/navigasi, (2) implementasi per komponen, (3) integrasi + backend.

## Fase 3 — Standar Kode Wajib
- Kode harus: jelas, terdokumentasi secukupnya, aman (hindari SQL injection, XSS, hardcoded secret), dan tidak memakai API/library yang sudah deprecated.
- Sertakan penanganan error (error handling) pada bagian yang berinteraksi dengan input user atau jaringan.
- Jangan mengarang nama fungsi/API. Jika tidak yakin, nyatakan asumsi secara eksplisit.

## Fase 4 — Evaluasi (wajib sebelum jawab)
Checklist sebelum menyerahkan kode:
- Logika sudah benar untuk kasus normal DAN edge case?
- Tidak ada security hole?
- Kode bisa dijalankan apa adanya (tanpa bagian "TODO")?
- Sudah ada contoh cara pakai/pengujian singkat?

## Fase 5 — Debugging (jika pengguna melaporkan error)
Format laporan yang diminta dari pengguna: pesan error lengkap (stack trace), kode terkait, apa yang sudah dicoba, dan hasilnya.
Setelah perbaikan, jelaskan AKAR MASALAH-nya, bukan hanya solusinya.

## Fase 6 — Penyerahan
- Ringkas: sebutkan file apa saja yang dibuat/diubah dan cara menjalankannya.
- Ingatkan pengguna untuk menguji di environment nyata (device nyata untuk aplikasi mobile), bukan hanya emulator/simulasi.
