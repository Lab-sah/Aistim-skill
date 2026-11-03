'use strict';
// Enkripsi ulang token GitHub (secret AUTH_TOKEN) ke auth.bin dengan public key admin.
// Hanya butuh PUBLIC key: private key tidak pernah ada di workflow.
// Tiap enkripsi memakai kunci ephemeral + nonce baru, jadi isi auth.bin selalu berbeda
// walau tokennya sama. Format: ephemeralPub(33) || nonce(12) || ciphertext || tag(16), ditulis sebagai base64.
//
// Env: AUTH_TOKEN (wajib), AUTH_PUBLIC (opsional, menimpa admin di akun.json), AKUN_FILE, AUTH_FILE.
const fs = require('node:fs');
const S = require('./secp256k1.js');

const gagal = (m) => { console.error('GAGAL: ' + m); process.exit(1); };

(async () => {
  const token = (process.env.AUTH_TOKEN || '').trim();
  if (!token) gagal('secret AUTH_TOKEN kosong atau belum dibuat');
  if (/\s/.test(token) || token.length < 20) gagal('AUTH_TOKEN tidak terlihat seperti token GitHub');

  let pub = (process.env.AUTH_PUBLIC || '').trim().replace(/^0x/i, '').toLowerCase();
  if (!pub) {
    const d = JSON.parse(fs.readFileSync(process.env.AKUN_FILE || 'akun.json', 'utf8'));
    const admin = (d.akun || []).find((a) => a.role === 'admin');
    if (!admin) gagal('tidak ada admin di akun.json');
    pub = String(admin.pub).toLowerCase();
  }
  if (!/^0[23][0-9a-f]{64}$/.test(pub)) gagal('public key harus 66 hex (diawali 02/03)');
  try { S.Point.fromHex(pub); } catch { gagal('public key bukan titik kurva yang sah'); }

  const out = await S.encrypt(pub, token);
  if (out.length !== 33 + 12 + token.length + 16) gagal('ukuran hasil enkripsi tidak sesuai');

  // tulis tanpa baris baru di akhir
  fs.writeFileSync(process.env.AUTH_FILE || 'auth.bin', Buffer.from(out).toString('base64'));
  console.log(`auth.bin diperbarui: ${out.length} byte, untuk public key ${pub.slice(0, 10)}…${pub.slice(-6)}`);
})().catch((e) => gagal(e.message));
