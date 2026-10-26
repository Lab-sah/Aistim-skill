# Contoh Laporan: unpack-web

> Contoh output skill setelah membongkar situs fiktif `toko-contoh.id`.
> Dipakai sebagai referensi format bagi AI yang menjalankan skill.

## Profil Situs
- **Framework:** Next.js 14 (App Router), React 18
- **Stack:** Tailwind CSS, deployed di Vercel
- **CDN/Asset:** Cloudflare, gambar via `cdn.toko-contoh.id`
- **Data server-side:** `__NEXT_DATA__` berisi props awal (user, cart, csrf token)

## Endpoint API

| Endpoint | Method | Auth | Fungsi |
|----------|--------|------|--------|
| `/api/v2/products` | GET | — | List produk, query: `q`, `page`, `sort` |
| `/api/v2/products/:id` | GET | — | Detail produk |
| `/api/v2/cart` | GET | Cookie session | Isi keranjang |
| `/api/v2/cart/add` | POST | Cookie + `X-CSRF` | Tambah item, body: `{sku, qty}` |
| `/api/v2/checkout` | POST | Cookie + `X-CSRF` | Buat order, response: `{orderId, payUrl}` |
| `/api/v1/search/suggest` | GET | — | Autocomplete (debounce 300ms di client) |

## Flow Utama (checkout)

1. Halaman `/p/[slug]` render server-side, data produk dari `__NEXT_DATA__`
2. Klik "Beli" → client POST `/api/v2/cart/add` dengan header `X-CSRF` (diambil dari cookie `csrf`, dikirim header oleh Next)
3. Response cart → update state React (Zustand), badge counter
4. `/checkout` → POST `/api/v2/checkout` → redirect ke `payUrl` (payment gateway)

## Catatan Proteksi & Risiko

- CSRF double-submit cookie — userscript harus baca cookie lalu kirim header
- Rate limit suggest API: ~10 req/detik (429 di atas itu)
- CORS ketat di endpoint `/api/v2/*` — tidak bisa dipanggil cross-origin dari browser lain
- Cookie `session` HttpOnly + Secure — tidak bisa diakses JS, hanya via request same-origin

## Saran Next Step

- ✅ Siap dibuat userscript: endpoint publik (`products`, `suggest`) aman dipanggil
- ⚠️ Endpoint cart/checkout butuh sesi login user — jalankan via `GM_xmlhttpRequest` (same-origin)
- 🔍 Bagian signature payment gateway belum terlihat (redirect ke pihak ketiga) — perlu DevTools saat pembayaran nyata bila perlu dianalisis
