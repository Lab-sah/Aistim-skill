/* START: menyambungkan form, tab, dan monitoring. */
(() => {
  App.monitoring.pasang();

  document.getElementById('form-catatan').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('input-catatan');
    try {
      App.db.tambahCatatan(input.value);
      input.value = '';
      App.ui.segarkanCatatan();
    } catch (err) {
      App.monitoring.catatError('Gagal menambah catatan', err.message);
    }
  });

  document.getElementById('bersihkan-log').addEventListener('click', () => {
    localStorage.removeItem(App.monitoring.KUNCI);
    App.ui.segarkanLog();
  });

  document.querySelectorAll('nav a').forEach(a =>
    a.addEventListener('click', (e) => {
      e.preventDefault();
      App.ui.pindahTab(a.dataset.tab);
    }));

  document.title = (window.APP_CONFIG && window.APP_CONFIG.namaApp) || document.title;

  if (new URLSearchParams(location.search).has('test')) {
    App.tes.jalankan();
  } else {
    App.ui.segarkanCatatan();
    App.ui.pindahTab('catatan');
  }
})();
