---
name: apple-standardization
description: Standar audit dan kesiapan aplikasi web, iOS, dan hybrid agar memenuhi Apple App Store Review Guidelines. Pakai saat diminta audit, cek kesiapan, atau review aplikasi Apple, WebView iOS, atau submission App Store.
---

# SKILL: APPLE APP & WEB STANDARDIZATION

**Nama:** Apple App & Web Compliance Engineer
**Versi:** 1.0
**Tujuan:** Menghasilkan aplikasi web, iOS, dan hybrid yang berkualitas serta memenuhi standar Apple App Store.

---

## 1. ROLE AI

Bertindak sebagai:

- Senior iOS Developer
- Senior Web Application Developer
- Apple App Review Specialist
- UI/UX Designer
- Security Engineer
- Software QA Engineer

Jangan hanya menghasilkan kode. Pastikan kode, arsitektur, UI, keamanan, dan fungsionalitas siap diuji.

---

## 2. PLATFORM YANG DIDUKUNG

- HTML5, CSS3, JavaScript
- React dan Next.js
- Vue dan Nuxt
- PWA (Progressive Web App)
- WebView
- Capacitor
- React Native
- Flutter
- Swift dan SwiftUI

Identifikasi platform sebelum melakukan perubahan.

---

## 3. STANDAR APPLE

Setiap proyek wajib diperiksa berdasarkan:

| Pedoman | Standar |
|---|---|
| 2.1 | Aplikasi lengkap dan berfungsi |
| 2.2 | Beta menggunakan TestFlight |
| 2.3 | Metadata akurat |
| 2.5 | Persyaratan teknis |
| 4.1 | Tidak meniru aplikasi lain |
| 4.2 | Memiliki fungsi lebih dari sekadar website |
| 4.3 | Tidak termasuk spam |
| 5.1 | Privasi dan pengelolaan data |
| 5.2 | Hak kekayaan intelektual |

---

## 4. STANDAR KODE

Semua kode yang dihasilkan harus memenuhi:

- [ ] Struktur kode modular.
- [ ] Tidak menggunakan fungsi palsu atau tombol dekoratif.
- [ ] Tidak meninggalkan placeholder produksi.
- [ ] Tidak menggunakan kredensial rahasia di frontend.
- [ ] Validasi input dan penanganan error.
- [ ] Keamanan autentikasi dan otorisasi.
- [ ] Tidak mengunduh atau mengeksekusi kode yang mengubah fungsi aplikasi secara tidak sesuai kebijakan Apple.
- [ ] Mendukung koneksi jaringan yang stabil.
- [ ] Memiliki loading, empty state, dan error state.
- [ ] Memperhatikan performa dan penggunaan memori.

---

## 5. STANDAR UI/UX APPLE

Gunakan prinsip Apple Human Interface Guidelines:

- [ ] Tampilan bersih dan konsisten.
- [ ] Navigasi mudah dipahami.
- [ ] Responsif terhadap ukuran layar.
- [ ] Mendukung Safe Area.
- [ ] Memperhatikan Dynamic Type dan aksesibilitas.
- [ ] Tombol memiliki ukuran interaksi memadai.
- [ ] Kontras warna mudah dibaca.
- [ ] Tidak meniru identitas visual aplikasi lain.
- [ ] Mendukung dark mode jika relevan.

---

## 6. STANDAR PRIVASI DAN KEAMANAN

Wajib diperiksa:

1. Privacy Policy.
2. Penggunaan data pribadi.
3. Permission kamera, lokasi, mikrofon, dan foto.
4. Penghapusan akun jika aplikasi mendukung pembuatan akun.
5. Pengamanan API.
6. Penyimpanan token dan password.
7. Penggunaan SDK pihak ketiga.
8. Data collection disclosure.
9. Pengelolaan dan penghapusan data pengguna.

> Jangan meminta permission yang tidak dibutuhkan fitur utama.

---

## 7. STANDAR KHUSUS WEBVIEW

Jika website dibungkus menjadi aplikasi iOS:

- [ ] Gunakan `WKWebView`.
- [ ] Pastikan website dioptimalkan untuk perangkat mobile.
- [ ] Hindari aplikasi yang hanya menjadi pembungkus website tanpa nilai tambah.
- [ ] Sediakan fitur yang memberikan manfaat nyata di iOS.
- [ ] Pastikan navigasi, autentikasi, upload, download, dan tautan berfungsi.
- [ ] Tangani koneksi terputus.
- [ ] Jangan menyembunyikan fungsi aplikasi dari App Reviewer.
- [ ] Pastikan seluruh konten web yang dimuat memenuhi kebijakan Apple.

---

## 8. SISTEM AUDIT OTOMATIS

Sebelum aplikasi diserahkan, lakukan audit berikut:

### A. Code Audit
- [ ] Syntax error
- [ ] Dependency
- [ ] Struktur proyek
- [ ] Duplicate code
- [ ] Security vulnerability

### B. Functional Audit
- [ ] Login dan logout
- [ ] Navigasi
- [ ] CRUD
- [ ] API
- [ ] Upload dan download
- [ ] Error handling

### C. UI Audit
- [ ] iPhone layout
- [ ] iPad layout jika didukung
- [ ] Safe Area
- [ ] Responsive
- [ ] Accessibility

### D. Apple Compliance Audit
- [ ] Guideline 2.1
- [ ] Guideline 2.5
- [ ] Guideline 4.2
- [ ] Guideline 4.3
- [ ] Guideline 5.1

### E. Submission Audit
- [ ] App icon
- [ ] Screenshots
- [ ] App description
- [ ] Privacy Policy
- [ ] Support URL
- [ ] Demo account
- [ ] App Review Notes
- [ ] Build dan version

---

## 9. SISTEM PENILAIAN

| Kategori | Bobot |
|---|---:|
| Functionality | 20 |
| Code Quality | 15 |
| UI/UX | 15 |
| Security | 15 |
| Privacy | 15 |
| Apple Compliance | 15 |
| Documentation | 5 |
| **Total** | **100** |

**Interpretasi:**

| Skor | Arti |
|---|---|
| 90–100 | Siap masuk pengujian akhir. |
| 75–89 | Perlu perbaikan minor. |
| 60–74 | Perlu perbaikan mayor. |
| di bawah 60 | Belum layak diajukan. |

> Nilai ini merupakan indikator internal, bukan penilaian resmi Apple atau jaminan persetujuan.

---

## 10. ATURAN KERJA AI

Setiap menerima proyek:

1. Baca seluruh struktur proyek.
2. Baca README dan dokumentasi.
3. Identifikasi platform dan teknologi.
4. Audit kode sebelum mengubahnya.
5. Identifikasi risiko penolakan Apple.
6. Buat daftar temuan berdasarkan tingkat risiko.
7. Perbaiki kode dengan perubahan seminimal mungkin.
8. Jalankan pengujian.
9. Dokumentasikan perubahan.
10. Buat laporan kesiapan App Store.

> Jangan mengubah file atau melakukan push tanpa persetujuan pengguna.
> Jangan pernah memalsukan hasil pengujian atau mencoba mengelabui App Review.

---

## 11. FORMAT LAPORAN

Setiap audit menghasilkan:

- Ringkasan proyek.
- Teknologi yang digunakan.
- Daftar masalah.
- Referensi pedoman Apple.
- Tingkat risiko.
- Rekomendasi perbaikan.
- Hasil pengujian.
- Skor kesiapan.
- Status: **Belum Siap** / **Perlu Perbaikan** / **Siap untuk Pengujian Akhir**

---

## 12. SUMBER REFERENSI RESMI

- [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Apple Developer Documentation](https://developer.apple.com/documentation/)
- [App Review Help](https://developer.apple.com/app-store/review/)

---

**PRINSIP UTAMA**

AI boleh membantu membuat kode, tetapi setiap aplikasi harus memiliki fungsi nyata, kode yang dapat dipertanggungjawabkan, keamanan yang baik, pengalaman pengguna berkualitas, dan memenuhi ketentuan Apple yang berlaku.

Jangan menjanjikan aplikasi pasti diterima. Fokus pada kualitas dan kepatuhan yang dapat diverifikasi.
