# Aistim Skill

Koleksi skill untuk AI — dimuat otomatis oleh agent yang kompatibel (format `SKILL.md`).

## Daftar Skill

| Skill | Deskripsi |
|-------|-----------|
| [unpack-web](unpack-skill/SKILL.md) | Bongkar struktur website: HTML, JS bundle, endpoint API, flow data. Contoh output lihat [contoh-laporan.md](unpack-skill/examples/contoh-laporan.md) |
| [skill-token](skill-token/SKILL.md) | Panduan menghemat token dan energi saat bekerja dengan Claude: prompt, pemilihan model, pembacaan file, dan tool |
| [vscode-model-setup](vscode-model-setup/SKILL.md) | Panduan memakai model Claude dan OpenAI di VS Code Copilot Chat dengan BYOK serta memahami harness Codex |
| [ai-program-builder](ai-program-builder/SKILL.md) | Panduan terstruktur membuat program/aplikasi dengan bantuan AI: analisis kebutuhan, prompt RACE, evaluasi kode, debugging, sampai penyerahan |

## Cara pakai

Salin folder skill ke direktori skills agent-mu, atau minta AI memuat `SKILL.md`-nya langsung.
Trigger dengan prompt seperti: *"bedah situs example.com"* / *"unpack web X"*.

## Struktur

```
unpack-skill/
├── SKILL.md                  # definisi skill unpack-web
├── examples/
│   └── contoh-laporan.md     # contoh output laporan analisis
└── tools/
    └── unpack_web.py         # script otomatis langkah 1–3

skill-token/
└── SKILL.md                  # panduan hemat token dan energi

vscode-model-setup/
└── SKILL.md                  # panduan model Claude/OpenAI di VS Code

ai-program-builder/
└── SKILL.md                  # panduan membuat program dengan bantuan AI
```
