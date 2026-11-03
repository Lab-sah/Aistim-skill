/* DATABASE: localStorage dengan versi skema dan migrasi. */
window.App = window.App || {};

App.db = (() => {
  const SKEMA_VERSI = 2;
  const KUNCI = 'db_aplikasi';

  // Migrasi: satu fungsi per kenaikan versi. Tambah entri baru jika skema berubah.
  const MIGRASI = {
    // v1 -> v2: catatan lama berupa string, sekarang objek { id, teks, dibuat }
    2: (data) => ({
      ...data,
      catatan: (data.catatan || []).map(c => typeof c === 'string'
        ? { id: crypto.randomUUID(), teks: c, dibuat: Date.now() }
        : c)
    }),
  };

  function baca() {
    let data = { versi: 1, catatan: [] };
    try {
      data = JSON.parse(localStorage.getItem(KUNCI)) || data;
    } catch {
      // data rusak: pakai default, jangan crash
    }
    for (let v = data.versi + 1; v <= SKEMA_VERSI; v++) {
      data = { ...MIGRASI[v](data), versi: v };
    }
    return data;
  }

  function simpan(data) {
    localStorage.setItem(KUNCI, JSON.stringify(data));
  }

  function tambahCatatan(teks) {
    const t = String(teks || '').trim();
    if (!t) throw new Error('Catatan kosong');
    const data = baca();
    data.catatan.unshift({ id: crypto.randomUUID(), teks: t, dibuat: Date.now() });
    simpan(data);
    return data.catatan[0];
  }

  function hapusCatatan(id) {
    const data = baca();
    data.catatan = data.catatan.filter(c => c.id !== id);
    simpan(data);
  }

  return { SKEMA_VERSI, KUNCI, baca, simpan, tambahCatatan, hapusCatatan };
})();
