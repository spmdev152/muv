# -*- coding: utf-8 -*-
"""Contador v2. Corrige cuatro fallos del v1:
   1. no contaba los H3 del modulo 2 (van como **H3 · texto**)
   2. no contaba las preguntas frecuentes (van como **¿...?**)
   3. contaba la tabla de preguntas descartadas, que es justificacion
   4. contaba instrucciones de maquetacion como si fueran copy
Cuenta: encabezados, entradillas, cuerpo, lineas de tarjeta, franjas,
fichas de contacto, preguntas y respuestas. Excluye lo pendiente."""
import re, sys

RED   = re.compile(r'<span style="color:#c0392b">.*?</span>', re.S)
PEND  = re.compile(r'`?\[PENDIENTE[^\]]*\]`?', re.S)
HEADL = re.compile(r'^\*\*H[123]\*\*\s*$')
H3TXT = re.compile(r'^\*\*H3 · (.+?)\*\*\s*$')
FAQ   = re.compile(r'^\*\*(¿.+\?)\*\*\s*$')
LABEL = re.compile(r'^\*\*[^*]+\*\*\s*(\*\([^)]*\)\*)?\s*$')
NOTA  = re.compile(r'\*\([^)]*\)\*')

# instrucciones de maquetacion escritas como si fueran parrafo
INSTRUC = re.compile(r'^(Las (once|siete|seis|dos|tres) (tarjetas|fotos)|Ver los textos alternativos)')
# cabeceras de tabla que delatan una tabla de justificacion
JUSTIF = re.compile(r'Por qué|descartada|Frase retirada|Fuente\b|Semilla|Encabezado|Riesgo detectado|Afirmación', re.I)


def publicable(path, verbose=False):
    txt = open(path, encoding="utf-8").read()
    words, trace = [], []
    for mod in re.split(r'^## ', txt, flags=re.M):
        if not re.match(r'M[oó]dulo \d', mod):
            continue
        cut = re.search(r'^### ', mod, flags=re.M)
        body = mod[:cut.start()] if cut else mod

        # trocear en tablas y no-tablas para poder descartar tablas de justificacion
        chunks, buf, intable = [], [], False
        for line in body.split("\n"):
            if line.strip().startswith("|"):
                if not intable:
                    chunks.append(("txt", buf)); buf = []; intable = True
                buf.append(line)
            else:
                if intable:
                    chunks.append(("tab", buf)); buf = []; intable = False
                buf.append(line)
        chunks.append(("tab" if intable else "txt", buf))

        for kind, lines in chunks:
            if kind == "tab":
                rows = [l.strip() for l in lines if l.strip() and not re.match(r'^\|[\s:|-]+\|$', l.strip())]
                if not rows:
                    continue
                if JUSTIF.search(rows[0]):        # tabla de justificacion -> fuera entera
                    continue
                head = [c.strip() for c in rows[0].strip("|").split("|")]
                # la cabecera de tabla es andamiaje del documento, nunca copy
                cuerpo = rows[1:] if any(c for c in head) else rows   # cabecera vacia = franja
                for r in cuerpo:
                    words += _tok(r.replace("|", " "))
                continue
            for l in lines:
                l = l.strip()
                if not l or l.startswith("---"):
                    continue
                m = H3TXT.match(l)
                if m:
                    words += _tok(m.group(1)); continue
                m = FAQ.match(l)
                if m:
                    words += _tok(m.group(1)); continue
                if l.startswith("*") and not l.startswith("**"):
                    continue                       # nota en cursiva
                if HEADL.match(l):
                    continue
                if l.startswith("**Eyebrow:**"):
                    words += _tok(l.replace("**Eyebrow:**", "")); continue
                if LABEL.match(l):
                    continue
                body_l = re.sub(r'^>\s*', '', l)
                if INSTRUC.match(re.sub(r'[*_`]', '', body_l).strip()):
                    continue                       # instruccion de maquetacion
                words += _tok(body_l)
    return words


def _tok(l):
    l = RED.sub(" ", l)
    l = PEND.sub(" ", l)
    l = NOTA.sub(" ", l)
    l = re.sub(r'`[^`]*`', ' ', l)
    l = re.sub(r'<[^>]+>', ' ', l)
    l = re.sub(r'[*_>#|]', ' ', l)
    l = re.sub(r'\s+', ' ', l).strip()
    return [w for w in l.split(" ") if re.search(r'[0-9A-Za-zÁÉÍÓÚÜÑáéíóúüñ]', w)]


if __name__ == "__main__":
    for p in sys.argv[1:]:
        print("%-26s %5d palabras publicables" % (p.split("/")[-1], len(publicable(p))))
