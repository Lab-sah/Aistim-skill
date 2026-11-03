/* TAMPILAN: teks pengguna selalu lewat textContent, tidak pernah innerHTML. */
window.App = window.App || {};

App.ui = (() => {
  function el(tag, props = {}, ...anak) {
    const n = document.createElement(tag);
    Object.assign(n, props);
    anak.forEach(a => n.append(a));
    return n;
  }

  function segarkanCatatan() {
    const data = App.db.baca();
    document.getElementById('daftar-catatan').replaceChildren(...data.catatan.map(c =>
      el('li', {},
        el('span', { textContent: c.teks }),
        el('button', {
          className: 'hapus',
          textContent: 'Hapus',
          onclick: () => { App.db.hapusCatatan(c.id); segarkanCatatan(); }
        })
      )));
    document.getElementById('kosong').hidden = data.catatan.length > 0;
  }

  function segarkanLog() {
    const log = App.monitoring.bacaLog();
    document.getElementById('daftar-log').replaceChildren(...log.map(l =>
      el('li', { className: 'blok' },
        el('div', { className: 'muted', textContent: new Date(l.waktu).toLocaleString('id-ID') }),
        el('div', { textContent: l.pesan }),
        el('pre', { textContent: l.detail }))));
    document.getElementById('log-kosong').hidden = log.length > 0;
  }

  function pindahTab(nama) {
    for (const s of ['catatan', 'log', 'tes']) {
      const bagian = document.getElementById('tab-' + s);
      if (bagian) bagian.hidden = s !== nama;
    }
    document.querySelectorAll('nav a').forEach(a =>
      a.classList.toggle('aktif', a.dataset.tab === nama));
    if (nama === 'log') segarkanLog();
  }

  function tampilkanHasilTes(hasil) {
    const daftar = document.getElementById('daftar-tes');
    daftar.replaceChildren(...hasil.detail.map(d =>
      el('li', {},
        el('span', { textContent: d.nama, className: d.ok ? 'lulus' : 'gagal' }),
        el('span', { className: 'muted', textContent: d.ok ? 'lulus' : d.pesan }))));
    daftar.append(el('li', { textContent: `Total: ${hasil.lulus} lulus, ${hasil.gagal} gagal` }));
  }

  return { el, segarkanCatatan, segarkanLog, pindahTab, tampilkanHasilTes };
})();
