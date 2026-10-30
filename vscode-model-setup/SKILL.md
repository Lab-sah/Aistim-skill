---
name: vscode-model-setup
description: Panduan menambahkan model Anthropic Claude dan OpenAI ke VS Code Copilot Chat dengan BYOK, serta membedakan model dari agent harness Codex/Claude.
---

# VS Code Copilot Chat: Claude dan OpenAI

Gunakan panduan ini saat model Claude atau OpenAI tidak muncul di pemilih model Copilot Chat, atau saat VS Code meminta upgrade.

## Model dan harness itu berbeda

- **Claude** adalah keluarga model dari Anthropic. Model Claude dapat dipakai di Copilot Chat melalui model yang disediakan paket Copilot, atau dengan Anthropic API key (BYOK).
- **Codex** adalah agent harness OpenAI, bukan nama model yang bisa ditambahkan ke pemilih model Copilot Chat. Untuk model OpenAI di Copilot Chat, tambahkan provider OpenAI dan pilih model yang didukung provider tersebut. Akses API OpenAI menggunakan kredensial dan tagihan API OpenAI.
- Jika ingin menjalankan Codex sebagai agent, gunakan target/harness Codex dan ikuti autentikasi Codex. Ini terpisah dari pemilih model Copilot Chat.

## Mengaktifkan BYOK di Copilot Chat

1. Di VS Code, buka **Settings** dan aktifkan `chat.agentHost.byokModels.enabled`.
2. Buka Chat, pilih **Manage Language Models** dari pemilih model.
3. Pilih **Add Models**, lalu pilih provider **Anthropic** atau **OpenAI**.
4. Masukkan API key melalui prompt VS Code. Jangan simpan API key di repo atau file yang dibagikan.
5. Di Language Models editor, pastikan model ditampilkan (ikon mata/visibility aktif).
6. Kembali ke Copilot Chat dan pilih modelnya. Jika belum terlihat, jalankan **Developer: Reload Window**.

VS Code menyimpan konfigurasi provider di `chatLanguageModels.json`. Gunakan Language Models editor untuk membuat konfigurasi karena daftar model, identitas provider, dan propertinya bergantung pada versi VS Code dan provider. Entri provider saja tanpa model yang tersedia tidak menjamin model akan muncul.

## Jika muncul pesan upgrade

- Pastikan model yang dipilih memang model BYOK, bukan model yang dirutekan melalui paket Copilot.
- Periksa bahwa API key valid dan akun provider memiliki akses serta billing/kuota aktif. Pemakaian API dapat ditagih terpisah oleh Anthropic atau OpenAI.
- Untuk Copilot Business atau Enterprise, administrator dapat membatasi BYOK melalui kebijakan organisasi.
- BYOK berlaku untuk chat dan tugas utilitas tertentu; beberapa fitur Copilot seperti inline suggestions dan semantic search tetap memerlukan akses Copilot.

## Referensi

- [AI language models in VS Code](https://code.visualstudio.com/docs/agent-customization/language-models)
- [Understand agent harnesses](https://code.visualstudio.com/docs/agents/concepts/agent-harnesses)
- [Choose an agent harness](https://code.visualstudio.com/docs/agents/run/agent-harnesses)
