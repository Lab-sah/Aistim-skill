/* MONITORING: catat error, kirim ke webhook, dan kabari HP. */
window.App = window.App || {};

App.monitoring = (() => {
  const KUNCI = 'app_log';
  const MAKS = 100;

  function bacaLog() {
    try {
      return JSON.parse(localStorage.getItem(KUNCI)) || [];
    } catch {
      return [];
    }
  }

  function catatError(pesan, detail = '') {
    const log = bacaLog();
    log.unshift({
      waktu: new Date().toISOString(),
      pesan: String(pesan).slice(0, 500),
      detail: String(detail).slice(0, 2000)
    });
    try {
      localStorage.setItem(KUNCI, JSON.stringify(log.slice(0, MAKS)));
    } catch {
      // penyimpanan penuh: tetap lanjut
    }
    kirimWebhook(pesan, detail);
    notifikasiHp(pesan);
    if (App.ui && App.ui.segarkanLog) App.ui.segarkanLog();
  }

  function kirimWebhook(pesan, detail) {
    const url = (window.APP_CONFIG || {}).webhookErrorUrl;
    if (!url) return;
    // Hanya https. Monitoring tidak boleh membuat aplikasi rusak, jadi error jaringan diabaikan.
    if (!/^https:\/\//.test(url)) return;
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: `⚠️ ${pesan}\n${detail}`.slice(0, 1900) })
    }).catch(() => {});
  }

  async function notifikasiHp(pesan) {
    if (!('Notification' in window)) return;
    try {
      if (Notification.permission === 'default') await Notification.requestPermission();
      if (Notification.permission === 'granted') {
        new Notification('Error di aplikasi', { body: String(pesan).slice(0, 120) });
      }
    } catch {
      // browser menolak notifikasi: abaikan
    }
  }

  function pasang() {
    window.addEventListener('error', (e) => catatError(e.message, `${e.filename}:${e.lineno}`));
    window.addEventListener('unhandledrejection', (e) =>
      catatError(e.reason?.message || 'Promise ditolak', e.reason?.stack || ''));
  }

  return { KUNCI, bacaLog, catatError, pasang };
})();
