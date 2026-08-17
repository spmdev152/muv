# -*- coding: utf-8 -*-
"""Genera el markdown 'para maquetar' a partir del documento cerrado.

Se genera, no se escribe a mano, para que no pueda desincronizarse del
documento aprobado. Deja SOLO lo que va a la web: modulos, encabezados,
texto, tarjetas, botones, ALT, enlazado y schema. Fuera todas las
justificaciones.
"""
import re, sys, os

PEND = re.compile(r'<span style="color:#c0392b">(.*?)</span>', re.S)


def secciones(txt):
    """Devuelve [(titulo, cuerpo)] de cada '## ' del documento."""
    out, cur, buf = [], None, []
    for line in txt.split("\n"):
        m = re.match(r'^## (.+)$', line)
        if m:
            if cur is not None:
                out.append((cur, "\n".join(buf)))
            cur, buf = m.group(1).strip(), []
        else:
            if cur is not None:
                buf.append(line)
    if cur is not None:
        out.append((cur, "\n".join(buf)))
    return out


def limpiar_modulo(body):
    """Quita las justificaciones: subsecciones ### y parrafos en cursiva."""
    cut = re.search(r'^### ', body, flags=re.M)
    if cut:
        body = body[:cut.start()]
    out = []
    for l in body.split("\n"):
        s = l.strip()
        if s.startswith("*") and not s.startswith("**"):
            continue                       # nota editorial
        if s.startswith("---"):
            continue
        out.append(l.rstrip())
    # colapsar lineas en blanco repetidas
    txt = "\n".join(out)
    return re.sub(r'\n{3,}', '\n\n', txt).strip()


def ficha(txt):
    """Extrae URL, title y meta de la cabecera del documento."""
    d = {}
    m = re.search(r'^- \*\*URL:\*\*\s*`(.+?)`', txt, flags=re.M)
    if m: d["url"] = m.group(1)
    m = re.search(r'^- \*\*Keyword principal:\*\*\s*(.+)$', txt, flags=re.M)
    if m: d["kw"] = m.group(1).strip()
    m = re.search(r'\*\*Title SEO\*\*\s*\((.+?)\)\s*\n`(.+?)`', txt)
    if m: d["title_n"], d["title"] = m.group(1), m.group(2)
    m = re.search(r'\*\*Meta description\*\*\s*\((.+?)\)\s*\n`(.+?)`', txt)
    if m: d["meta_n"], d["meta"] = m.group(1), m.group(2)
    m = re.search(r'^- \*\*Encabezados:\*\*\s*(.+?)\.', txt, flags=re.M)
    if m: d["enc"] = m.group(1).strip()
    return d


def pendientes(txt):
    """Lista de todo lo marcado en rojo, con el modulo en el que esta."""
    res, vistos, mod = [], set(), "—"
    for line in txt.split("\n"):
        m = re.match(r'^## (Módulo \d+[^\n]*)', line)
        if m:
            mod = re.sub(r'\s*\*\(.*?\)\*', '', m.group(1).split("·")[-1]).strip()
        if "Convención de este documento" in line:
            continue                       # la propia leyenda del rojo
        for p in PEND.findall(line):
            p = re.sub(r'`?\[PENDIENTE MUV:\s*', '', p)
            p = re.sub(r'\]`?$', '', p.strip())
            p = re.sub(r'\s+', ' ', re.sub(r'[*_`]', '', p)).strip()
            # que se entienda sin el documento largo delante
            p = re.sub(r'—?\s*ver la nota sobre teléfonos en las notas de producción, porque el repositorio dice otro número',
                       '— el que publican la web actual, Doctoralia, Google Business e Instagram. locations.ts dice otro. Confirmar con MUV antes de publicarlo', p)
            p = re.sub(r',?\s*ver (las )?notas de producción', ', ver la issue de datos pendientes', p)
            p = re.sub(r',?\s*ver la ficha del hero', '', p)
            if not p or len(p) < 6:
                continue
            clave = p.lower()[:70]
            if clave in vistos:
                continue
            vistos.add(clave)
            res.append((mod, p))
    return res


def construir(path):
    txt = open(path, encoding="utf-8").read()
    titulo = re.match(r'^# (.+)$', txt.split("\n")[0]).group(1)
    titulo = re.sub(r'\s*—\s*versión.*$', '', titulo).strip()
    f = ficha(txt)
    secs = secciones(txt)
    pend = pendientes(txt)

    L = ["# %s" % titulo, ""]
    L.append("*Este documento es **solo para maquetar**. Trae el texto exacto que va a la web, "
             "los encabezados que no se pueden cambiar y nada más. El porqué de cada decisión "
             "está en el PDF largo, que es el del cliente.*")
    L.append("")
    L.append("- **URL:** `%s`" % f.get("url", "—"))
    L.append("- **Encabezados:** %s" % f.get("enc", "—"))
    L.append("")
    if f.get("title"):
        L.append("**Title SEO** (%s)" % f["title_n"])
        L.append("`%s`" % f["title"])
        L.append("")
    if f.get("meta"):
        L.append("**Meta description** (%s)" % f["meta_n"])
        L.append("`%s`" % f["meta"])
        L.append("")

    L.append("> **Convención de este documento:** lo marcado <span style=\"color:#c0392b\">**en rojo**</span> "
             "es un dato que MUV todavía no ha facilitado. **No se maqueta, no se rellena con algo parecido "
             "y no se inventa.** Si un módulo depende de un dato rojo, ese módulo espera.")
    L.append("")

    if pend:
        L.append("---")
        L.append("")
        L.append("## ⚠ Esta página tiene %d datos pendientes" % len(pend))
        L.append("")
        L.append("| Módulo | Qué falta |")
        L.append("|---|---|")
        for mod, p in pend:
            L.append("| **%s** | <span style=\"color:#c0392b\">%s</span> |" % (mod, p))
        L.append("")
        L.append("**Todo lo de esta tabla aparece también en rojo dentro de su módulo.** "
                 "La lista completa, con a quién hay que preguntársela, está en la issue de datos pendientes.")
        L.append("")

    # modulos
    for t, b in secs:
        if not re.match(r'M[oó]dulo \d', t):
            continue
        cuerpo = limpiar_modulo(b)
        if not cuerpo:
            continue
        L.append("---")
        L.append("")
        L.append("## %s" % t)
        L.append("")
        L.append(cuerpo)
        L.append("")

    # anexos utiles para maquetar
    for nombre in ("Enlazado interno", "Textos alternativos de las imágenes", "Datos estructurados"):
        for t, b in secs:
            if t.startswith(nombre):
                cuerpo = limpiar_modulo(b)
                if cuerpo:
                    L.append("---")
                    L.append("")
                    L.append("## %s" % t)
                    L.append("")
                    L.append(cuerpo)
                    L.append("")
                break
    return "\n".join(L)


if __name__ == "__main__":
    src, dst = sys.argv[1], sys.argv[2]
    open(dst, "w", encoding="utf-8").write(construir(src))
    n = len(pendientes(open(src, encoding="utf-8").read()))
    print("OK  %-34s -> %-30s  %d pendientes" % (os.path.basename(src), os.path.basename(dst), n))
