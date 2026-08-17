# -*- coding: utf-8 -*-
"""Markdown -> HTML con CSS de impresion -> PDF con Chrome headless.
Reproduce el diseno de los PDF de MUV ya entregados."""
import html as H
import re
import subprocess
import sys
import os

CSS = """
@page { size: A4; margin: 14mm 12mm 16mm 12mm; }
* { box-sizing: border-box; }
body {
  font-family: -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 10.2pt; line-height: 1.55; color: #2b3038; margin: 0;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.hero { background: #47543a; color: #fff; border-radius: 10px; padding: 22px 26px 24px; margin: 0 0 22px; }
.hero .eyebrow { font-size: 7.6pt; letter-spacing: .18em; text-transform: uppercase; color: #c8d3b6; margin: 0 0 8px; }
.hero h1 { font-size: 21pt; line-height: 1.2; margin: 0 0 12px; font-weight: 700; letter-spacing: -.01em; }
.hero p { margin: 0 0 8px; font-size: 9.4pt; line-height: 1.6; color: #e7edda; }
.hero p:last-child { margin-bottom: 0; }
.hero strong { color: #fff; }
.hero code { background: rgba(255,255,255,.16); color: #f0f4e6; }

h2 { font-size: 14pt; margin: 26px 0 10px; padding-bottom: 6px; border-bottom: 2px solid #47543a;
     color: #313a24; font-weight: 700; page-break-after: avoid; letter-spacing: -.01em; }
h3 { font-size: 11.2pt; margin: 18px 0 7px; color: #47543a; font-weight: 700; page-break-after: avoid; }
p { margin: 0 0 9px; }
ul, ol { margin: 0 0 11px; padding-left: 20px; }
li { margin: 0 0 4px; }
hr { border: 0; border-top: 1px solid #dfe3d8; margin: 20px 0; }
strong { color: #1e232b; font-weight: 700; }
code { font-family: "SF Mono", "DejaVu Sans Mono", Menlo, Consolas, monospace;
       font-size: 8.8pt; background: #eef1e7; color: #3c4a2c; padding: 1px 5px; border-radius: 3px; }
a { color: #47543a; }
h1.parte { font-size: 17pt; margin: 30px 0 14px; padding: 10px 0 10px;
           border-top: 3px solid #47543a; border-bottom: 1px solid #47543a;
           color: #313a24; font-weight: 700; letter-spacing: -.01em;
           page-break-after: avoid; text-align: center; }
body.web h1.parte { border-color: #2f3b46; color: #23303a; }

/* nota editorial en cursiva */
.nota { border-left: 3px solid #cfd8c2; background: #fafbf7; padding: 8px 12px; margin: 0 0 9px;
        font-style: italic; color: #4c545f; font-size: 9.4pt; }
.nota strong { color: #2b3038; }
.nota em { font-style: normal; }

/* citas de copy publicable */
blockquote { border-left: 3px solid #47543a; background: #f4f6ef; margin: 0 0 10px;
             padding: 9px 14px; border-radius: 0 4px 4px 0; }
blockquote p { margin: 0 0 6px; }
blockquote p:last-child { margin-bottom: 0; }

/* caja de title / meta */
.seobox { background: #f7f1e2; border-left: 4px solid #c8a24a; border-radius: 0 6px 6px 0;
          padding: 12px 16px; margin: 14px 0 16px; }
.seobox .lbl { font-size: 8pt; letter-spacing: .12em; text-transform: uppercase;
               color: #7a6428; font-weight: 700; margin: 0 0 4px; }
.seobox .val { font-family: "SF Mono", "DejaVu Sans Mono", Menlo, Consolas, monospace;
               font-size: 9pt; color: #33301f; margin: 0 0 12px; word-break: break-word; }
.seobox .val:last-child { margin-bottom: 0; }

/* aviso */
.aviso { background: #fdf0f1; border-left: 4px solid #a8302f; border-radius: 0 6px 6px 0;
         padding: 10px 14px; margin: 14px 0; color: #7d2422; font-size: 9.6pt; }
.aviso strong { color: #7d2422; }

table { width: 100%; border-collapse: collapse; margin: 0 0 14px; font-size: 9pt;
        page-break-inside: auto; }
thead { display: table-header-group; }
tr { page-break-inside: avoid; }
th { background: #47543a; color: #fff; text-align: left; padding: 7px 9px; font-weight: 600;
     font-size: 8.6pt; letter-spacing: .01em; }
td { padding: 6px 9px; border-bottom: 1px solid #e4e8dc; vertical-align: top; }
tbody tr:nth-child(even) td { background: #f7f9f3; }
td code, th code { font-size: 8.2pt; }

.pend { color: #a8302f; font-weight: 600; }
.pend code { color: #a8302f; background: #fdeaea; }
/* variante para maquetacion: el rojo tiene que saltar a la vista */
body.web .pend { color: #a8302f; font-weight: 700; background: #fdeaea;
                 padding: 1px 5px; border-radius: 3px; box-decoration-break: clone; }
body.web .hero { background: #2f3b46; }
body.web .hero .eyebrow { color: #b6c6d3; }
body.web h2 { border-bottom-color: #2f3b46; color: #23303a; }
body.web h3 { color: #2f3b46; }
body.web th { background: #2f3b46; }
body.web blockquote { border-left-color: #2f3b46; background: #f2f5f7; }
body.web td:has(.pend), body.web li:has(.pend) { background: #fff6f6; }
"""

INLINE = [
    # el texto ya viene escapado globalmente: no volver a escapar aqui
    (re.compile(r'`([^`]+)`'), lambda m: "<code>%s</code>" % m.group(1)),
    (re.compile(r'\*\*\*(.+?)\*\*\*', re.S), r'<strong><em>\1</em></strong>'),
    (re.compile(r'__(.+?)__', re.S), r'<strong>\1</strong>'),
    (re.compile(r'\*\*(.+?)\*\*', re.S), r'<strong>\1</strong>'),
    (re.compile(r'(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])', re.S), r'<em>\1</em>'),
    (re.compile(r'\[([^\]]+)\]\(([^)]+)\)'), r'<a href="\2">\1</a>'),
]
EYEBROW = ["Clínica MUV · Contenidos SEO"]
SPAN_RED = re.compile(r'<span style="color:#c0392b">(.*?)</span>', re.S)


def inline(text):
    holes = []

    def stash(m):
        holes.append(m.group(1))
        return "\x00%d\x00" % (len(holes) - 1)

    text = SPAN_RED.sub(stash, text)
    text = H.escape(text, quote=False)
    for rx, rep in INLINE:
        text = rx.sub(rep, text)
    for i, h in enumerate(holes):
        text = text.replace("\x00%d\x00" % i, '<span class="pend">%s</span>' % inline_raw(h))
    return text


def inline_raw(text):
    text = H.escape(text, quote=False)
    for rx, rep in INLINE:
        text = rx.sub(rep, text)
    return text


def convert(md):
    lines = md.split("\n")
    out = []
    i = 0
    title = ""
    hero_paras = []
    seen_h1 = False

    # ---- cabecera ----
    while i < len(lines):
        l = lines[i].rstrip()
        if l.startswith("# "):
            title = l[2:].strip()
            seen_h1 = True
            i += 1
            continue
        if seen_h1 and (l.startswith("*") and not l.startswith("**")) and l.endswith("*"):
            hero_paras.append(inline(l))
            i += 1
            continue
        if seen_h1 and not l.strip():
            i += 1
            if hero_paras:
                break
            continue
        break

    out.append('<div class="hero"><p class="eyebrow">%s</p>' % EYEBROW[0])
    out.append("<h1>%s</h1>" % inline(title))
    for p in hero_paras:
        out.append("<p>%s</p>" % p)
    out.append("</div>")

    def flush_table(buf):
        if len(buf) < 2:
            return
        cells = [[c.strip() for c in r.strip().strip("|").split("|")] for r in buf]
        head, body = cells[0], cells[2:]
        if not any(c.strip() for c in head):          # cabecera vacia: tira de tarjetas
            out.append("<table><tbody>")
        else:
            out.append("<table><thead><tr>%s</tr></thead><tbody>" %
                       "".join("<th>%s</th>" % inline(c) for c in head))
        for row in body:
            out.append("<tr>%s</tr>" % "".join("<td>%s</td>" % inline(c) for c in row))
        out.append("</tbody></table>")

    tbuf, lbuf, ltype = [], [], None

    def flush_list():
        nonlocal lbuf, ltype
        if lbuf:
            out.append("<%s>%s</%s>" % (ltype, "".join("<li>%s</li>" % x for x in lbuf), ltype))
        lbuf, ltype = [], None

    while i < len(lines):
        l = lines[i].rstrip()
        s = l.strip()

        if s.startswith("|"):
            tbuf.append(s)
            i += 1
            continue
        if tbuf:
            flush_list()
            flush_table(tbuf)
            tbuf = []

        if not s:
            flush_list()
            i += 1
            continue
        if s.startswith("---"):
            flush_list()
            out.append("<hr>")
            i += 1
            continue
        if s.startswith("### "):
            flush_list()
            out.append("<h3>%s</h3>" % inline(s[4:]))
            i += 1
            continue
        if s.startswith("## "):
            flush_list()
            out.append("<h2>%s</h2>" % inline(s[3:]))
            i += 1
            continue
        if s.startswith("# "):
            flush_list()
            out.append('<h1 class="parte">%s</h1>' % inline(s[2:]))
            i += 1
            continue

        # caja SEO: **Title SEO** (N caracteres) + linea de codigo
        m = re.match(r'^\*\*(Title SEO|Meta description)\*\*\s*\((.+?)\)\s*$', s, re.I)
        if m:
            flush_list()
            box = ['<div class="seobox">']
            while i < len(lines):
                mm = re.match(r'^\*\*(Title SEO|Meta description)\*\*\s*\((.+?)\)\s*$',
                              lines[i].strip(), re.I)
                if not mm:
                    break
                box.append('<p class="lbl">%s (%s)</p>' % (mm.group(1), mm.group(2)))
                i += 1
                val = lines[i].strip() if i < len(lines) else ""
                box.append('<p class="val">%s</p>' % H.escape(val.strip("`")))
                i += 1
                while i < len(lines) and not lines[i].strip():
                    i += 1
            box.append("</div>")
            out.append("".join(box))
            continue

        if s.startswith("> **Convención de este documento:**"):
            flush_list()
            out.append('<div class="aviso">%s</div>' % inline(s[2:]))
            i += 1
            continue

        if s.startswith("> "):
            flush_list()
            buf = []
            while i < len(lines) and lines[i].strip().startswith(">"):
                buf.append(lines[i].strip().lstrip(">").strip())
                i += 1
            out.append("<blockquote>%s</blockquote>" %
                       "".join("<p>%s</p>" % inline(b) for b in buf if b))
            continue

        m = re.match(r'^(\d+)\.\s+(.*)$', s)
        if m:
            if ltype != "ol":
                flush_list()
                ltype = "ol"
            lbuf.append(inline(m.group(2)))
            i += 1
            continue
        if s.startswith("- ") or s.startswith("* ") and not s.startswith("**"):
            if ltype != "ul":
                flush_list()
                ltype = "ul"
            lbuf.append(inline(s[2:]))
            i += 1
            continue

        flush_list()
        # nota editorial: parrafo entero en cursiva
        if s.startswith("*") and not s.startswith("**") and s.endswith("*"):
            out.append('<div class="nota">%s</div>' % inline(s))
        else:
            out.append("<p>%s</p>" % inline(s))
        i += 1

    if tbuf:
        flush_table(tbuf)
    flush_list()
    return title, "\n".join(out)


def build(md_path, pdf_path, variant=""):
    md = open(md_path, encoding="utf-8").read()
    title, body = convert(md)
    doc = ("<!doctype html><html lang=\"es\"><head><meta charset=\"utf-8\">"
           "<title>%s</title><style>%s</style></head><body class=\"%s\">%s</body></html>"
           % (H.escape(title), CSS, variant, body))
    tmp = pdf_path.replace(".pdf", ".html")
    open(tmp, "w", encoding="utf-8").write(doc)
    subprocess.run([
        "google-chrome", "--headless=new", "--disable-gpu", "--no-sandbox",
        "--no-pdf-header-footer", "--print-to-pdf=" + pdf_path,
        "file://" + os.path.abspath(tmp),
    ], check=True, capture_output=True)
    os.remove(tmp)
    print("OK  %-42s %8.1f KB" % (pdf_path.split("/")[-1], os.path.getsize(pdf_path) / 1024))


if __name__ == "__main__":
    variant = sys.argv[3] if len(sys.argv) > 3 else ""
    if variant == "web":
        EYEBROW[0] = "Clínica MUV · Para maquetar"
    build(sys.argv[1], sys.argv[2], variant)
