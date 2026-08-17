#!/usr/bin/env bash
# Regenera los ocho PDF a partir de los cuatro documentos aprobados.
# Uso:  cd docs/contenidos && ./tools/construir.sh
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p web resumen

declare -A PDF=(
  [home]="HOME-v8"
  [sedes]="SEDES-v14"
  [sede-tres-cantos]="SEDE-TRES-CANTOS-v10"
  [sede-el-canaveral]="SEDE-EL-CANAVERAL-v2"
)
declare -A WEB=(
  [home]="HOME"
  [sedes]="SEDES"
  [sede-tres-cantos]="TRES-CANTOS"
  [sede-el-canaveral]="EL-CANAVERAL"
)

for p in home sedes sede-tres-cantos sede-el-canaveral; do
  python3 tools/gen_web.py     "$p.md" "web/$p.md"
  python3 tools/gen_resumen.py "$p.md" "resumen/$p.md" "$p"
  python3 tools/md2pdf.py "resumen/$p.md" "MUV-${PDF[$p]}.pdf"
  python3 tools/md2pdf.py "web/$p.md"     "MUV-WEB-${WEB[$p]}.pdf" web
done

echo
echo "── recuento de palabras publicables ──"
python3 tools/contar2.py home.md sedes.md sede-tres-cantos.md sede-el-canaveral.md
echo
echo "── prohibiciones del documento de arranque ──"
python3 tools/prohibiciones.py home.md sedes.md sede-tres-cantos.md sede-el-canaveral.md
