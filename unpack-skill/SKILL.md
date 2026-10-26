---
name: unpack-web
description: Bongkar (unpack) struktur website — menganalisis HTML, JS bundle, endpoint API, dan flow aplikasi web. Dipakai saat user minta menganalisis/memahami/membedah suatu situs, mencari API endpoint tersembunyi, atau mempersiapkan pembuatan userscript/extension.
---

# Unpack Web

Skill untuk membongkar dan memetakan struktur sebuah website secara sistematis: dari HTML mentah, JavaScript bundle (termasuk yang minified/obfuscated), jaringan request API, sampai alur data aplikasi.

## Kapan dipakai

- User minta "bedah/analisis/unpack situs X"
- Mencari endpoint API tersembunyi yang dipakai halaman web
- Mempersiapkan pembuatan userscript (misal untuk Aistim.sdk)
- Debugging atau R&D terhadap aplikasi web pihak ketiga

## Alur kerja

### 1. Ambil halaman utama
- Fetch HTML halaman target, catat:
  - `<script src="...">` eksternal → daftar JS bundle
  - Inline script & konfigurasi window yang di-inject server (misal `window.__DATA`, `__NEXT_DATA__`, `__NUXT__`)
  - Meta, canonical, version string, nama framework (Next/Nuxt/React/Vue/Angular)

### 2. Bongkar JS bundle
- Download bundle utama, lalu:
  - **Beautify** kode minified (misal pakai prettier/js-beautify)
  - Cari pola penting: `fetch(`, `axios`, `XMLHttpRequest`, `/api/`, `graphql`, base URL, API key publik
  - Identifikasi state management & router → peta halaman/route yang ada
- Kalau ter-obfuscasi (eval, string array, _0x...), catat teknik obfuscation-nya; jangan buang waktu deobfuscation penuh kecuali diminta

### 3. Petakan endpoint API
- Dari bundle + HTML, kumpulkan daftar endpoint:
  - Method (GET/POST/...), path, query params wajib
  - Header khusus (auth token, signature, custom header)
  - Format payload & response
- Susun dalam tabel: `Endpoint | Method | Auth | Fungsi`

### 4. Analisis flow data
- Rekonstruksi alur: halaman → trigger → request → response → render
- Catat mekanisme auth: cookie, bearer, API key di localStorage, fingerprint, dll
- Catat proteksi: rate limit, CORS, captcha, signature request

### 5. Lapor hasil
Sampaikan dalam format:
```
## Profil Situs
- Framework, stack, CDN
## Endpoint API
(tabel)
## Flow utama
(langkah-langkah)
## Catatan proteksi & risiko
## Saran next step (misal: siap untuk userscript, bagian X butuh browser devtools)
```

## Aturan

- **Hanya situs yang user minta** — jangan scraping liar
- Hormati `robots.txt` dan ToS; tandai clearly kalau suatu langkah berisiko melanggar
- Jangan eksekusi request authenticated ke situs pihak ketiga pakai kredensial user tanpa izin eksplisit
- Kalau target butuh browser (render client-side, anti-bot), sarankan pendekatan DevTools / headless browser dan minta user ambil data dari sana

## Tools

### Python (otomatis) — `tools/unpack_web.py`

Script jadi untuk langkah 1–3. Install & jalankan:

```bash
pip install requests beautifulsoup4 jsbeautifier
python tools/unpack_web.py https://contoh.com --out laporan.md
```

Outputnya berupa kerangka laporan Markdown: framework, daftar bundle, tabel endpoint, mekanisme auth. Tinggal dilengkapi analisis manual (langkah 4–5).

### Manual / tambahan

- `curl` / `fetch` untuk HTML & asset statis
- Prettier / js-beautify untuk unminify (sudah terintegrasi di script)
- DevTools browser untuk network log kalau fetch mentah tidak cukup
- Untuk WASM atau bundle yang berat, catat keterbatasan dan minta file dari user
