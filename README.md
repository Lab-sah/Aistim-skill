# Aistim Skill

Koleksi skill untuk AI — dimuat otomatis oleh agent yang kompatibel (format `SKILL.md`).

## Daftar Skill

| Skill | Deskripsi |
|-------|-----------|
| [unpack-web](unpack-skill/SKILL.md) | Bongkar struktur website: HTML, JS bundle, endpoint API, flow data. Contoh output lihat [contoh-laporan.md](unpack-skill/examples/contoh-laporan.md) |

## Cara pakai

Salin folder skill ke direktori skills agent-mu, atau minta AI memuat `SKILL.md`-nya langsung.
Trigger dengan prompt seperti: *"bedah situs example.com"* / *"unpack web X"*.

## Struktur

```
unpack-skill/
├── SKILL.md                  # definisi skill unpack-web
└── examples/
    └── contoh-laporan.md     # contoh output laporan analisis
```
