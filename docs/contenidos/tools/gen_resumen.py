# -*- coding: utf-8 -*-
"""Genera el markdown 'resumen' para el cliente.

Los modulos y los textos se copian LITERALES del documento aprobado; lo unico
que se sustituye son las justificaciones largas, por los bloques condensados
de resumen_datos.py. Asi la version corta no puede contradecir a la larga.
"""
import re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gen_web import secciones, limpiar_modulo, ficha, pendientes
from resumen_datos import RESUMEN

# secciones del documento largo que sí merecen sobrevivir, y en este orden
CONSERVAR = [
    ("Justificación SEO de cada encabezado", "Los encabezados, y por qué no se tocan"),
    ("Qué puede ganar esta página y qué no", None),
    ("Enlazado interno", None),
    ("Datos estructurados", None),
]


def tabla_sola(cuerpo, maxfilas=None):
    """Deja solo las tablas de una seccion, sin la prosa que las rodea."""
    out, dentro = [], False
    for l in cuerpo.split("\n"):
        s = l.strip()
        if s.startswith("|"):
            out.append(s); dentro = True
        elif dentro and not s:
            out.append(""); dentro = False
    txt = "\n".join(out).strip()
    return re.sub(r'\n{3,}', '\n\n', txt)


def construir(path, clave):
    txt = open(path, encoding="utf-8").read()
    cab = re.match(r'^# (.+)$', txt.split("\n")[0]).group(1)
    ver = re.search(r'versión (\d+)', cab)
    nombre = re.sub(r'\s*—\s*versión.*$', '', cab).strip()
    R = RESUMEN[clave]
    f = ficha(txt)
    secs = secciones(txt)
    pend = pendientes(txt)

    L = ["# %s — resumen%s" % (nombre, " (v%s)" % ver.group(1) if ver else ""), ""]
    L.append("*Versión corta del documento de trabajo. **Los textos y los módulos van íntegros**; "
             "lo que se ha resumido son las justificaciones. El documento completo, con toda la "
             "investigación y sus fuentes, está en el repositorio.*")
    L.append("")
    L.append("---")
    L.append("")
    L.append("## Lo esencial")
    L.append("")
    L.append(R["esencial"].strip())
    L.append("")
    L.append("### La ficha")
    L.append("")
    L.append("- **URL:** `%s`  ·  **Keyword principal:** %s" % (f.get("url", "—"), f.get("kw", "—")))
    L.append("- **Encabezados:** %s" % f.get("enc", "—"))
    L.append("- **Trato:** usted · **Voz:** «En MUV…» (nosotros) · **Precios:** no se publican")
    L.append("- **Al lector no se le llama «paciente» ni «cliente».**")
    L.append("")
    if f.get("title"):
        L.append("**Title SEO** (%s)" % f["title_n"]); L.append("`%s`" % f["title"]); L.append("")
    if f.get("meta"):
        L.append("**Meta description** (%s)" % f["meta_n"]); L.append("`%s`" % f["meta"]); L.append("")

    if R.get("avisos"):
        L.append("---"); L.append("")
        L.append("## Lo que hubo que corregir")
        L.append("")
        L.append(R["avisos"].strip())
        L.append("")

    L.append("---"); L.append("")
    L.append("# Los módulos")
    L.append("")
    L.append("> Lo marcado <span style=\"color:#c0392b\">**en rojo**</span> está pendiente de que MUV lo "
             "confirme. **No se publica tal cual.** Esta página tiene **%d datos pendientes**." % len(pend))
    L.append("")

    for t, b in secs:
        if not re.match(r'M[oó]dulo \d', t):
            continue
        cuerpo = limpiar_modulo(b)
        if not cuerpo:
            continue
        L.append("---"); L.append("")
        L.append("## %s" % t); L.append("")
        L.append(cuerpo); L.append("")
        n = int(re.search(r'M[oó]dulo (\d+)', t).group(1))
        porques = R.get("modulos", {}).get(n)
        if porques:
            L.append("**Por qué**")
            L.append("")
            for x in porques:
                L.append("- %s" % x)
            L.append("")

    L.append("---"); L.append("")
    L.append("# Anexos")
    L.append("")
    for nombre_sec, alias in CONSERVAR:
        for t, b in secs:
            if t.startswith(nombre_sec):
                cuerpo = tabla_sola(limpiar_modulo(b)) if "Justificación" in nombre_sec else limpiar_modulo(b)
                if cuerpo:
                    L.append("## %s" % (alias or t)); L.append("")
                    L.append(cuerpo); L.append("")
                break

    # pendientes, siempre al final y en una sola lista
    if pend:
        L.append("---"); L.append("")
        L.append("## Lo que falta de MUV para publicar")
        L.append("")
        L.append("| Módulo | Qué falta |")
        L.append("|---|---|")
        for mod, p in pend:
            L.append("| **%s** | <span style=\"color:#c0392b\">%s</span> |" % (mod, p))
        L.append("")

    return re.sub(r'\n{4,}', '\n\n\n', "\n".join(L))


if __name__ == "__main__":
    src, dst, clave = sys.argv[1], sys.argv[2], sys.argv[3]
    open(dst, "w", encoding="utf-8").write(construir(src, clave))
    print("OK  %-30s -> %s" % (os.path.basename(src), os.path.basename(dst)))
