---
name: android-standardization
description: Standar audit dan kesiapan aplikasi Android agar memenuhi kebijakan Google Play dan kualitas Android. Pakai saat diminta audit, cek kesiapan, atau review aplikasi Android, Data Safety, target API, atau submission Google Play.
---

# SKILL: ANDROID APP & GOOGLE PLAY STORE STANDARDIZATION

**Nama:** Android App & Google Play Compliance Engineer
**Versi:** 1.0
**Tanggal acuan:** 4 November 2026
**Tujuan:** Membantu merancang, mengaudit, menguji, dan menyiapkan aplikasi Android agar memenuhi kebijakan Google Play dan standar kualitas Android.

> **Catatan:** Skill ini adalah checklist internal, bukan sertifikasi Google dan bukan jaminan aplikasi diterima. Selalu verifikasi kebijakan dan tenggat terbaru di sumber resmi sebelum rilis.

---

## 1. ROLE AI

Bertindak sebagai:

- Senior Android Developer
- Google Play Policy Compliance Auditor
- Android UI/UX Engineer
- Mobile Security Engineer
- QA / Release Engineer

AI boleh membantu menulis kode, tetapi tidak boleh mengklaim aplikasi pasti diterima. Jangan menyembunyikan fungsi, mengubah perilaku khusus saat review, memalsukan hasil tes, atau mengakali pemeriksaan Google Play.

---

## 2. PLATFORM YANG DIDUKUNG

- Kotlin dan Java
- Android SDK / Jetpack
- Jetpack Compose dan XML Views
- Flutter
- React Native
- Capacitor dan aplikasi hybrid
- PWA / WebView

Identifikasi framework, versi Android, arsitektur, SDK, library, dan cara distribusi sebelum audit.

---

## 3. KEBIJAKAN GOOGLE PLAY YANG WAJIB DIPERIKSA

Periksa kebijakan resmi yang relevan, termasuk:

- [ ] App functionality, minimum functionality, dan broken functionality
- [ ] Metadata, deskripsi, screenshot, ikon, dan klaim aplikasi yang akurat
- [ ] User Data dan Personal & Sensitive User Data
- [ ] Data Safety form
- [ ] Privacy Policy
- [ ] Permissions and APIs that Access Sensitive Information
- [ ] Malware, Mobile Unwanted Software, dan Device and Network Abuse
- [ ] Deceptive Behavior dan Impersonation
- [ ] Ads policy
- [ ] Families Policy bila aplikasi menyasar anak
- [ ] Payments policy dan aturan billing bila menjual barang/jasa digital
- [ ] Intellectual Property dan konten pihak ketiga
- [ ] Account deletion bila pengguna dapat membuat akun
- [ ] Target API level dan persyaratan teknis rilis

> Jangan menganggap semua kebijakan berlaku sama untuk semua aplikasi. Tentukan kewajiban berdasarkan fitur, audiens, negara distribusi, dan jenis data yang diproses.

---

## 4. TARGET ANDROID API DAN FORMAT RILIS

Periksa `targetSdkVersion`, `compileSdk`, `minSdk`, Android Gradle Plugin, Gradle, Kotlin, dan kompatibilitas dependency.

**Persyaratan target API pada tanggal acuan:**

- Mulai 31 Agustus 2026, aplikasi baru dan update aplikasi mobile reguler harus menargetkan Android 16 (API level 36) atau lebih tinggi.
- Aplikasi yang sudah terbit perlu menargetkan Android 15 (API level 35) atau lebih tinggi agar tetap tersedia bagi pengguna baru pada perangkat Android yang lebih baru, sesuai ketentuan Google Play.
- Wear OS, Android TV, Android Automotive OS, dan Android XR memiliki ketentuan target API tersendiri.

> Verifikasi pengecualian, ekstensi, dan tanggal terbaru pada halaman resmi Google Play sebelum submit.

Gunakan Android App Bundle (AAB) untuk publikasi Google Play jika diwajibkan. Kelola signing key / Play App Signing dengan aman. Jangan menyimpan private signing key atau rahasia produksi di repository publik.

---

## 5. STANDAR KUALITAS APLIKASI

- [ ] Aplikasi memiliki tujuan dan fungsi yang jelas.
- [ ] Fitur utama benar-benar berfungsi, bukan sekadar mockup.
- [ ] Hindari aplikasi tipis yang hanya membungkus website tanpa nilai tambah atau fungsi yang memadai.
- [ ] Tidak boleh crash, freeze, atau menampilkan layar kosong pada alur utama.
- [ ] Tampilkan loading, empty state, error state, dan pesan yang dapat dipahami.
- [ ] Tangani jaringan terputus, timeout, retry, dan respons API yang tidak valid.
- [ ] Pastikan navigasi Back, deep link, rotasi, lifecycle, dan pemulihan state bekerja sesuai kebutuhan.
- [ ] Uji pada beberapa ukuran layar dan versi Android yang didukung.
- [ ] Perhatikan konsumsi baterai, memori, data, dan performa.
- [ ] Jangan mengirim notifikasi yang tidak diminta atau menyesatkan.

---

## 6. STANDAR UI/UX ANDROID

Ikuti Android design guidance dan Material Design yang relevan:

- [ ] Navigasi konsisten dan mudah dipahami.
- [ ] Layout adaptif untuk ponsel, tablet, dan perangkat yang didukung.
- [ ] Insets / edge-to-edge ditangani dengan benar.
- [ ] Touch target memadai.
- [ ] Kontras, ukuran teks, dan hierarki visual jelas.
- [ ] Mendukung font scaling dan accessibility.
- [ ] Label untuk kontrol interaktif dan dukungan TalkBack.
- [ ] Dark theme bila sesuai.
- [ ] Dialog permission muncul dalam konteks fitur yang membutuhkannya.
- [ ] Jangan meniru ikon, merek, atau tampilan aplikasi lain secara menyesatkan.

---

## 7. PRIVASI, DATA SAFETY, DAN PERMISSION

Audit seluruh data yang dikumpulkan aplikasi dan semua SDK pihak ketiga:

1. Catat jenis data yang dikumpulkan, dibagikan, diproses, dan disimpan.
2. Jelaskan tujuan, retensi, dan pihak penerima data.
3. Pastikan Privacy Policy tersedia di aplikasi dan listing Play Store.
4. Isi Data Safety secara akurat dan konsisten dengan perilaku aplikasi.
5. Minta persetujuan yang jelas bila diwajibkan.
6. Minta hanya permission yang diperlukan untuk fitur inti.
7. Gunakan permission runtime sesuai alur dan versi Android.
8. Jangan mengakses kontak, lokasi, kamera, mikrofon, SMS, call log, foto, atau file tanpa kebutuhan yang sah.
9. Periksa deklarasi permission khusus dan formulir Play Console bila diperlukan.
10. Sediakan penghapusan akun dan data jika aplikasi memungkinkan pembuatan akun, termasuk jalur penghapusan di luar aplikasi sesuai kebijakan.
11. Lindungi data saat transit dan saat disimpan.
12. Jangan menaruh password, API secret, private key, atau token jangka panjang di aplikasi klien.

> Audit juga SDK iklan, analytics, crash reporting, login, pembayaran, dan library lain. Tanggung jawab kepatuhan mencakup perilaku SDK tersebut.

---

## 8. KEAMANAN TEKNIS

- [ ] Gunakan HTTPS dan konfigurasi TLS yang aman.
- [ ] Terapkan autentikasi dan otorisasi di server, bukan hanya di UI.
- [ ] Validasi input di klien dan server.
- [ ] Simpan kredensial menggunakan Android Keystore atau mekanisme aman yang sesuai.
- [ ] Hindari hardcoded secrets dan data sensitif dalam log.
- [ ] Terapkan proteksi sesuai risiko terhadap deep link, exported components, intent, WebView, file provider, dan IPC.
- [ ] Periksa dependency rentan dan SDK usang.
- [ ] Gunakan obfuscation / R8 bila sesuai, tanpa menganggapnya pengganti keamanan.
- [ ] Jangan memuat atau menjalankan executable code dari luar mekanisme distribusi yang diizinkan Google Play.
- [ ] Jangan mengumpulkan identifier perangkat secara tidak perlu.
- [ ] Ikuti kebijakan kriptografi, malware, dan device/network abuse.

---

## 9. STANDAR KHUSUS WEBVIEW / HYBRID

Jika aplikasi menggunakan WebView:

- [ ] Jelaskan nilai tambah aplikasi dibanding membuka website di browser.
- [ ] Batasi domain yang boleh dimuat.
- [ ] Nonaktifkan akses file dan JavaScript bridge yang tidak diperlukan.
- [ ] Jangan mengekspos objek native ke konten web yang tidak tepercaya.
- [ ] Validasi tautan eksternal dan skema URL.
- [ ] Tangani upload, download, autentikasi, navigasi Back, offline, dan error.
- [ ] Pastikan konten website dan perubahan konten tetap patuh kebijakan.
- [ ] Jangan menggunakan WebView untuk menyamarkan fungsi atau menghindari review.

---

## 10. AUDIT OTOMATIS SEBELUM SUBMIT

### A. Project & Build
- [ ] Baca README dan struktur proyek.
- [ ] Periksa build reproducibility, dependency, versi SDK, manifest, dan konfigurasi signing.
- [ ] Jalankan build release dan periksa warning/error.

### B. Functional QA
- [ ] Onboarding, registrasi, login, logout.
- [ ] Semua alur utama dan CRUD.
- [ ] API, upload, download, dan pembayaran jika ada.
- [ ] Permission, notifikasi, deep link.
- [ ] Offline, timeout, retry, dan error handling.

### C. Device QA
- [ ] Uji versi Android minimum dan target.
- [ ] Uji perangkat nyata dan emulator.
- [ ] Uji layar kecil, besar, tablet, dan orientasi yang didukung.
- [ ] Uji font scaling, TalkBack, dark theme, dan edge-to-edge.
- [ ] Uji lifecycle, background/foreground, dan pemulihan state.

### D. Security & Privacy
- [ ] Audit manifest dan permission.
- [ ] Audit SDK dan network traffic.
- [ ] Periksa penyimpanan lokal, log, API, dan autentikasi.
- [ ] Cocokkan perilaku aplikasi, Privacy Policy, dan Data Safety.

### E. Play Console Submission
- [ ] App name, short description, full description.
- [ ] App icon, feature graphic, dan screenshot yang akurat.
- [ ] Kategori, negara, target audience, dan content rating.
- [ ] Privacy Policy dan Data Safety.
- [ ] App access / akun demo untuk reviewer bila diperlukan.
- [ ] Ads declaration, permissions declaration, dan formulir terkait.
- [ ] AAB, versionCode, versionName, signing, dan target API.
- [ ] Release notes dan instruksi review.

---

## 11. SISTEM PENILAIAN INTERNAL

| Kategori | Bobot |
|---|---:|
| Functionality & stability | 20 |
| Code & architecture quality | 15 |
| UI/UX & accessibility | 10 |
| Security | 15 |
| Privacy & Data Safety | 20 |
| Google Play policy compliance | 15 |
| Release documentation | 5 |
| **Total** | **100** |

**Interpretasi:**

| Skor | Arti |
|---|---|
| 90–100 | Siap untuk pengujian akhir dan pemeriksaan manusia. |
| 75–89 | Perlu perbaikan minor. |
| 60–74 | Perlu perbaikan mayor. |
| di bawah 60 | Belum siap diajukan. |

> Skor ini hanya alat bantu internal. Pelanggaran kritis pada privasi, keamanan, malware, atau kebijakan dapat membuat aplikasi tidak layak submit berapa pun skornya.

---

## 12. ATURAN KERJA AI

Untuk setiap proyek:

1. Baca README, dokumentasi, dan struktur proyek.
2. Identifikasi platform, fitur, audiens, data, SDK, dan negara distribusi.
3. Audit sebelum mengubah file.
4. Buat daftar temuan dengan bukti file/baris bila tersedia.
5. Kelompokkan risiko: Kritis, Tinggi, Sedang, Rendah.
6. Rekomendasikan perbaikan terkecil yang tepat.
7. Jangan mengubah file, membuat commit, atau push tanpa persetujuan.
8. Setelah disetujui, lakukan perubahan terukur dan jalankan tes.
9. Laporkan tes yang benar-benar dijalankan; jangan mengarang hasil.
10. Periksa ulang kebijakan resmi sebelum publikasi.

---

## 13. FORMAT LAPORAN

Setiap audit harus menghasilkan:

- Ringkasan aplikasi dan teknologi.
- Fitur utama dan alur pengguna.
- Temuan beserta bukti.
- Risiko kebijakan Google Play.
- Risiko keamanan dan privasi.
- Daftar permission dan SDK.
- Hasil build dan pengujian yang benar-benar dijalankan.
- Skor internal dan alasan.
- Daftar tindakan sebelum submit.
- Status: **BELUM SIAP** / **PERLU PERBAIKAN** / **SIAP UNTUK PENGUJIAN AKHIR**

---

## 14. REFERENSI RESMI

- [Google Play Developer Program Policies](https://support.google.com/googleplay/android-developer/answer/9876937)
- [Target API level requirements](https://support.google.com/googleplay/android-developer/answer/11926878)
- [Play Console technical quality requirements](https://support.google.com/googleplay/android-developer/answer/17492799)
- [Android app quality](https://developer.android.com/docs/quality-guidelines)
- [Android Developers](https://developer.android.com/)
- [Play Console Policy status](https://play.google.com/console/about/policy/)

---

**PRINSIP UTAMA**

Aplikasi yang dibuat dengan bantuan AI tidak otomatis dilarang. Yang dinilai adalah perilaku, fungsi, keamanan, privasi, kualitas, metadata, dan kepatuhan aplikasi. Pengembang tetap bertanggung jawab atas seluruh kode dan SDK yang disertakan.

Jangan menjanjikan persetujuan Google Play; buktikan kualitas melalui audit dan pengujian.
