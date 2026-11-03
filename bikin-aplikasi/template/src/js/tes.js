/* TES OTOMATIS: buka index.html?test=1. Hasil ada di window.__TEST_HASIL untuk CI. */
window.App = window.App || {};

App.tes = (() => {
  function jalankan() {
    const { db, monitoring } = App;
    const hasil = { lulus: 0, gagal: 0, detail: [] };

    const cek = (nama, fn) => {
      try {
        fn();
        hasil.lulus++;
        hasil.detail.push({ nama, ok: true });
      } catch (err) {
        hasil.gagal++;
        hasil.detail.push({ nama, ok: false, pesan: err.message });
      }
    };
    const pastikan = (syarat, pesan) => { if (!syarat) throw new Error(pesan); };

    // Simpan data pengguna, pakai data kosong untuk tes, lalu kembalikan
    const cadangan = {
      db: localStorage.getItem(db.KUNCI),
      log: localStorage.getItem(monitoring.KUNCI)
    };
    localStorage.removeItem(db.KUNCI);
    localStorage.removeItem(monitoring.KUNCI);

    cek('tambah catatan tersimpan', () => {
      db.tambahCatatan('tes satu');
      pastikan(db.baca().catatan.length === 1, 'catatan harus 1');
    });
    cek('catatan kosong ditolak', () => {
      let kena = false;
      try { db.tambahCatatan('   '); } catch { kena = true; }
      pastikan(kena, 'catatan kosong seharusnya ditolak');
    });
    cek('hapus catatan', () => {
      db.hapusCatatan(db.baca().catatan[0].id);
      pastikan(db.baca().catatan.length === 0, 'catatan harus 0 setelah hapus');
    });
    cek('migrasi v1 ke v2 mengubah string jadi objek', () => {
      localStorage.setItem(db.KUNCI, JSON.stringify({ versi: 1, catatan: ['lama'] }));
      const d = db.baca();
      pastikan(d.versi === db.SKEMA_VERSI, 'versi harus naik');
      pastikan(d.catatan[0].teks === 'lama' && d.catatan[0].id, 'string harus jadi objek');
    });
    cek('data rusak kembali ke default', () => {
      localStorage.setItem(db.KUNCI, '{rusak');
      pastikan(db.baca().catatan.length === 0, 'harus kosong');
    });
    cek('error tercatat ke log', () => {
      localStorage.removeItem(monitoring.KUNCI);
      monitoring.catatError('error uji', 'detail uji');
      pastikan(monitoring.bacaLog()[0]?.pesan === 'error uji', 'error harus masuk log');
    });
    cek('log dibatasi maksimal 100', () => {
      localStorage.removeItem(monitoring.KUNCI);
      for (let i = 0; i < 105; i++) monitoring.catatError('x' + i);
      pastikan(monitoring.bacaLog().length === 100, 'log harus 100');
    });

    // Kembalikan data pengguna
    cadangan.db === null ? localStorage.removeItem(db.KUNCI) : localStorage.setItem(db.KUNCI, cadangan.db);
    cadangan.log === null ? localStorage.removeItem(monitoring.KUNCI) : localStorage.setItem(monitoring.KUNCI, cadangan.log);

    window.__TEST_HASIL = hasil;
    console.table(hasil.detail);
    App.ui.tampilkanHasilTes(hasil);
    App.ui.pindahTab('tes');
    return hasil;
  }

  return { jalankan };
})();
