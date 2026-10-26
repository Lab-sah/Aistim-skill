#!/usr/bin/env python3
"""
unpack_web.py — Tool bantu skill unpack-web.
Bongkar struktur website: HTML, JS bundle, endpoint API, mekanisme auth.

Install dependensi:
  pip install requests beautifulsoup4 jsbeautifier

Jalankan:
  python unpack_web.py https://contoh.com
  python unpack_web.py https://contoh.com --max-js 5 --out laporan.md
"""

import re
import sys
import argparse
import requests
from urllib.parse import urljoin, urlparse

try:
    import jsbeautifier
except ImportError:
    jsbeautifier = None

UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
                    "(KHTML, like Gecko) Chrome/126.0 Safari/537.36"}

EP_PATTERNS = [
    r"""["'`]((?:https?://[^"'`\s]+)?/api/[^"'`\s]+)["'`]""",
    r"""["'`]((?:https?://[^"'`\s]+)?/v\d+/[^"'`\s]+)["'`]""",
    r"""fetch\(\s*["'`]([^"'`]+)["'`]""",
    r"""(?:axios\.(?:get|post|put|delete)|\.get|\.post)\(\s*["'`]([^"'`]+)["'`]""",
    r"""["'`]([^"'`\s]*graphql[^"'`\s]*)["'`]""",
]
AUTH_PATTERNS = [
    (r"localStorage\.(?:getItem|setItem)\(['\"](\w*(?:token|apikey|api_key|auth)\w*)['\"]", "localStorage"),
    (r"sessionStorage\.(?:getItem|setItem)\(['\"](\w*(?:token|apikey|api_key|auth)\w*)['\"]", "sessionStorage"),
    (r"headers\[["'](?:Authorization|X-API-Key|X-CSRF[^"']*)["']\]", "custom header"),
    (r"Cookie|document\.cookie", "cookie"),
]
FRAMEWORK_SIGNS = [
    ("__NEXT_DATA__", "Next.js"), ("__NUXT__", "Nuxt"), ("data-reactroot", "React (legacy)"),
    ("ng-version", "Angular"), ("__VUE__", "Vue"), ("wp-content", "WordPress"),
    ("data-sveltekit", "SvelteKit"), ("_next/static", "Next.js"), ("_nuxt/", "Nuxt"),
]


def fetch(url):
    r = requests.get(url, headers=UA, timeout=30)
    r.raise_for_status()
    return r


def detect_framework(html):
    return [name for sig, name in FRAMEWORK_SIGNS if sig in html]


def extract_scripts(html, base):
    from bs4 import BeautifulSoup
    soup = BeautifulSoup(html, "html.parser")
    srcs, inlines = [], []
    for s in soup.find_all("script"):
        if s.get("src"):
            srcs.append(urljoin(base, s["src"]))
        elif s.string and len(s.string.strip()) > 50:
            inlines.append(s.string)
    return srcs, inlines


def scan_js(js):
    eps = set()
    for pat in EP_PATTERNS:
        for m in re.findall(pat, js):
            eps.add(m)
    auth = []
    for pat, label in AUTH_PATTERNS:
        if re.search(pat, js, re.I):
            keys = re.findall(pat, js, re.I)[:5]
            auth.append((label, sorted(set(keys)) if keys and keys[0] else []))
    return sorted(eps), auth


def unpack(url, max_js=10, max_size=2_000_000):
    print(f"⏳ Fetch {url}", file=sys.stderr)
    host = urlparse(url).netloc
    html = fetch(url).text
    lines = [f"# Laporan Unpack: {host}", "", "## Profil Situs", ""]
    fw = detect_framework(html)
    lines.append(f"- **Framework (tebakan):** {', '.join(fw) if fw else 'tidak terdeteksi'}")
    server_data = re.findall(r"(window\.(?:__NEXT_DATA__|__NUXT__|__INITIAL_STATE__|__DATA__))", html)
    if server_data:
        lines.append(f"- **Data injeksi server:** {', '.join(set(server_data))}")
    lines.append("")

    srcs, inlines = extract_scripts(html, url)
    lines += ["## JS Bundle", "", f"Total script eksternal: {len(srcs)}", ""]
    all_eps, all_auth = set(), {}
    for i, src in enumerate(srcs[:max_js]):
        try:
            r = fetch(src)
            if len(r.content) > max_size:
                print(f"   ⏭ {src} (>2MB, skip)", file=sys.stderr)
                continue
            js = r.text
            if jsbeautifier:
                js = jsbeautifier.beautify(js)
            eps, auth = scan_js(js)
            all_eps.update(eps)
            for label, keys in auth:
                all_auth.setdefault(label, set()).update(keys)
            print(f"   ✅ [{i+1}/{min(len(srcs), max_js)}] {src} — {len(eps)} endpoint", file=sys.stderr)
        except Exception as e:
            print(f"   ❌ {src} — {e}", file=sys.stderr)
    for inl in inlines:
        eps, auth = scan_js(inl)
        all_eps.update(eps)
        for label, keys in auth:
            all_auth.setdefault(label, set()).update(keys)

    lines += ["## Endpoint API", ""]
    if all_eps:
        lines.append("| Endpoint | Catatan |"); lines.append("|---|---|")
        for e in sorted(all_eps):
            lines.append(f"| `{e}` | |")
    else:
        lines.append("_Tidak ada endpoint terdeteksi — kemungkinan perlu DevTools (client-side render/anti-bot)._")
    lines += ["", "## Mekanisme Auth", ""]
    if all_auth:
        for label, keys in sorted(all_auth.items()):
            k = ", ".join(f"`{x}`" for x in sorted(keys)) if keys else ""
            lines.append(f"- **{label}** {k}")
    else:
        lines.append("_Tidak terdeteksi._")
    lines += ["", "## Saran", "",
              "- Lengkapi kolom Catatan dengan memeriksa context pemakaian endpoint di bundle yang sudah di-beautify.",
              "- Kalau endpoint kosong & situs client-rendered → analisis via DevTools > Network."]
    return "\n".join(lines)


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description="Unpack struktur website")
    ap.add_argument("url")
    ap.add_argument("--max-js", type=int, default=10)
    ap.add_argument("--out", help="Simpan ke file (default: stdout)")
    args = ap.parse_args()
    report = unpack(args.url, args.max_js)
    if args.out:
        open(args.out, "w").write(report)
        print(f"\n💾 Laporan tersimpan: {args.out}", file=sys.stderr)
    else:
        print(report)
