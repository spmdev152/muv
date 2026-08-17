# -*- coding: utf-8 -*-
"""Comprueba las prohibiciones del documento de arranque SOLO sobre el texto publicable."""
import re, sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from contar2 import publicable

REGLAS = {
 "«paciente» o «cliente»":      r'paciente|cliente',
 "promesa de curación":          r'garantiz|curaci[oó]n|curamos|eliminamos|le curamos',
 "comparación directa":          r'mejor que|a diferencia de otras|los mejores|somos los [uú]nicos|nadie m[aá]s',
 "cifra de eficacia sin fuente": r'\d+\s?%|\+\s?\d{3,}',
 "diagnóstico médico":           r'diagn[oó]stic',
 "importe en euros":             r'\d+\s?€|€\s?\d|euros',
 "tuteo":                        r'\btu\b|\btus\b|\bte\b|\btienes\b|\bpuedes\b|\bven\b|\belige\b|\breserva\b(?! )',
}
for path in sys.argv[1:]:
    txt = " ".join(publicable(path))
    print("== %s (%d palabras publicables)" % (path.split("/")[-1], len(txt.split())))
    limpio = True
    for nombre, rx in REGLAS.items():
        hits = [m.group(0) for m in re.finditer(rx, txt, re.I)]
        if hits:
            limpio = False
            ctx = [txt[max(0,m.start()-55):m.end()+45] for m in list(re.finditer(rx, txt, re.I))[:3]]
            print("   ⚠ %-30s %d: %s" % (nombre, len(hits), hits[:6]))
            for c in ctx: print("        …%s…" % c)
    if limpio: print("   ✓ sin hallazgos")
    print()
