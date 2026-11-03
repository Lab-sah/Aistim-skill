/* Konfigurasi PUBLIK aplikasi.
 * File ini dibuat ulang saat deploy oleh scripts/buat-config.mjs dari environment variable.
 * Jangan taruh kunci rahasia di sini. Kunci rahasia hanya di server atau secret CI.
 */
window.APP_CONFIG = {
  namaApp: 'Aplikasi Contoh',
  versi: '1.0.0',
  webhookErrorUrl: ''
};
