---
name: skill-token
description: Panduan menghemat token dan energi saat bekerja dengan Claude: prompt, pemilihan model, pembacaan file, dan tool. Pakai saat diminta hemat token atau biaya.
---

# Skill Token: Hemat Token dan Energi

Skill ini dipakai saat user minta hemat token, hemat biaya, atau tanya cara membuat sesi Claude lebih efisien. Prinsipnya: kurangi yang masuk ke konteks, dan pakai sumber daya sesuai besar tugas.

## Prinsip utama

- Biaya terutama ditentukan oleh **berapa banyak isi yang masuk ke konteks**, bukan oleh tool-nya sendiri.
- Setiap giliran mengirim ulang riwayat chat, jadi chat yang panjang makin mahal.
- Output panjang juga memakan token. Minta jawaban yang ringkas bila itu cukup.

## 1. Susun prompt yang spesifik

- Sebut nama repo, path file, fungsi, atau baris yang relevan.
- Sebut hasil yang diinginkan: "cukup diff", "jawab 3 poin", "hanya fungsi X".
- Hindari instruksi kabur seperti "cek semuanya" yang memicu pembacaan luas.
- Gabungkan beberapa permintaan kecil dalam satu pesan.

## 2. Pilih model sesuai tugas

- **Haiku**: tugas ringan seperti rename, format, pertanyaan singkat, edit kecil.
- **Sonnet**: pekerjaan harian dan coding umum.
- **Opus / tier lebih tinggi**: analisis kompleks, arsitektur, debugging sulit.
- Ganti model di tengah sesi bila tugas berubah.

## 3. Kelola panjang chat

- Mulai chat baru untuk topik baru.
- Untuk sesi panjang, minta ringkasan status lalu lanjutkan di chat baru dengan ringkasan itu.
- Jangan menempel ulang file besar yang sudah ada di konteks.

## 4. Hemat saat membaca file dan repo

- Baca file spesifik dengan path lengkap, bukan membuka folder lalu membaca semuanya.
- Untuk bagian tertentu, pakai pencarian (grep atau search_code) lalu baca barisnya saja.
- Untuk metadata atau daftar, pakai `gh` di Bash dengan `head` atau `jq` untuk memangkas output.
- Hindari file besar seperti bundle JS, file hasil build, atau data mentah. Ambil potongan yang dibutuhkan.
- Edit dengan Edit tool pada bagian yang berubah, jangan tulis ulang seluruh file.

## 5. Hemat saat memakai tool dan riset

- Subagent dan riset mendalam memulai konteks dari nol dan memakan banyak token. Pakai hanya bila benar-benar perlu.
- Web search mode `standard` cukup untuk sebagian besar pencarian. `extended` hanya untuk hasil tipis atau topik yang sangat baru.
- Matikan connector atau MCP server yang tidak dipakai, karena setiap tool aktif menambah beban konteks.

## 6. Simpan instruksi berulang di satu tempat

- Taruh aturan proyek di CLAUDE.md atau preferensi di memori, supaya tidak perlu diulang di setiap chat.
- Jangan menyalin instruksi panjang yang sama ke banyak pesan.

## Cara menjawab user

- Jelaskan saran yang relevan dengan kebiasaan user, bukan daftar umum semuanya.
- Jika ada perkiraan hemat, sebut sebagai perkiraan. Jangan mengklaim angka pasti kalau tidak terukur.
- Tawarkan satu langkah berikutnya yang konkret, misalnya memangkas file atau mengganti model untuk tugas tertentu.
