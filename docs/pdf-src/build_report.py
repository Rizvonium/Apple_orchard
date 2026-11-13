#!/usr/bin/env python3
"""Build docs/pdf-src/report.html from report.md + research appendices (then render with render.js report)."""
import pathlib, re, markdown
HERE = pathlib.Path(__file__).resolve().parent
RES = HERE.parent / "research"
APPX = [("A", "UX, connectivity, data collection and services marketplace", "A-ux-data-collection-services.md"),
        ("B", "Market, logistics, weather, schemes and labour", "B-market-logistics-schemes.md"),
        ("C", "Technology, apps, competitors, datasets and regulations", "C-technology-datasets-regulations.md")]

def demote(md):
    out, fence = [], False
    for line in md.splitlines():
        if line.startswith("```"): fence = not fence
        if not fence and re.match(r"^#{1,5} ", line): line = "#" + line
        out.append(line)
    return "\n".join(out)

def conv(md):
    return markdown.markdown(md, extensions=["tables", "attr_list", "md_in_html", "sane_lists"])

main = (HERE / "report.md").read_text(encoding="utf-8")
html = conv(main)
for k, title, f in APPX:
    body = demote((RES / f).read_text(encoding="utf-8"))
    body = re.sub(r"^## .*\n", "", body, count=1, flags=re.M)  # drop the note's own title
    html += f'<section class="appx"><h1>Appendix {k} · {title}</h1><p class="appx-note">Desk research notes, November 2026. Tags: [V] read at source; [S] from a search summary; UNVERIFIED = lead only.</p>{conv(body)}</section>'
html = html.replace("<table>", '<div class="tw"><table>').replace("</table>", "</table></div>")
css = (HERE / "report.css").read_text(encoding="utf-8")
page = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Baghbaan — Research and Integration Plan</title>
<link rel="stylesheet" href="fonts/fonts.css"><style>{css}</style></head><body>
<header class="cover"><div class="logo">BAGHBAAN</div><p class="kick">Research &amp; integration plan · November 2026</p></header>
<main>{html}</main></body></html>"""
(HERE / "report.html").write_text(page, encoding="utf-8")
print("report.html", len(page))
