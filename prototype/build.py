#!/usr/bin/env python3
"""Build the Baghbaan prototype.

Outputs
  prototype/index.html           standalone demo (open in any browser; fonts from Google Fonts)
  prototype/dist/artifact.html   same page without the document skeleton (for hosting as a claude.ai artifact)
"""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "src"
JS_ORDER = ["art.js", "data.js", "screens.js", "main.js"]

def build():
    css = (SRC / "app.css").read_text(encoding="utf-8")
    js = "\n".join((SRC / f).read_text(encoding="utf-8") for f in JS_ORDER)
    page = (SRC / "page.html").read_text(encoding="utf-8")
    assert "</script>" not in js, "inline JS must not contain a closing script tag"
    body = page.replace("/*APP_CSS*/", css).replace("/*APP_JS*/", js)
    (ROOT / "dist").mkdir(exist_ok=True)
    (ROOT / "dist" / "artifact.html").write_text(body, encoding="utf-8")
    head = ('<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n')
    (ROOT / "index.html").write_text(head + body + "\n</html>\n", encoding="utf-8")
    print("built", ROOT / "index.html", "and", ROOT / "dist" / "artifact.html")

if __name__ == "__main__":
    build()
