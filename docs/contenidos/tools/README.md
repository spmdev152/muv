# Cómo se generan los PDF

Los PDF **no se escriben a mano**: se generan de los cuatro documentos aprobados
(`home.md`, `sedes.md`, `sede-tres-cantos.md`, `sede-el-canaveral.md`), que son
la fuente de la verdad.

```bash
cd docs/contenidos && ./tools/construir.sh
```

Eso produce los ocho PDF, recuenta las palabras publicables y comprueba las
prohibiciones del documento de arranque.

## Qué hace cada pieza

| Script | Qué hace |
|---|---|
| `gen_web.py` | Extrae del documento **solo lo que va a la web** → `web/<pagina>.md` |
| `gen_resumen.py` | Copia los módulos literales y sustituye las justificaciones largas por los bloques de `resumen_datos.py` → `resumen/<pagina>.md` |
| `resumen_datos.py` | **El único archivo que se edita a mano** de esta carpeta: el texto condensado de cada página |
| `md2pdf.py` | Markdown → HTML con CSS de impresión → PDF con Chrome headless. Con el argumento `web` usa la identidad visual del documento de maquetación |
| `contar2.py` | Cuenta las palabras publicables: encabezados, cuerpo, tarjetas, preguntas y respuestas. Excluye justificaciones, instrucciones y todo lo pendiente |
| `prohibiciones.py` | Comprueba, **solo sobre el texto publicable**, las cuatro prohibiciones del documento de arranque más el tuteo y los importes |

## Requisitos

Solo `python3` y `google-chrome`. No hay dependencias que instalar: en esta
máquina no están disponibles pandoc, LibreOffice, weasyprint ni wkhtmltopdf, y
por eso el pipeline es Chrome en modo headless.

## Cuidado con el contador

La versión anterior tenía cuatro fallos que inflaban la cifra: se dejaba fuera
los H3 del módulo de dolencias y las preguntas frecuentes —los dos van escritos
como `**texto**` y casaban con el patrón de etiqueta de bloque— y a cambio
contaba las tablas de justificación y las instrucciones de maquetación. Los dos
errores casi se compensaban, y por eso tardaron en verse. Si se toca
`contar2.py`, comprobar que sigue recogiendo `**H3 · …**` y `**¿…?**`.
