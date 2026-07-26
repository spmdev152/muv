/**
 * Processes the real clinic statics (organized by URL/section) into optimized
 * WebP files with semantic names under /public/img.
 *
 *  - Converts HEIC/HEIF -> JPEG (heic-convert, wasm, no system deps)
 *  - Reads JPG/JPEG/PNG directly with sharp
 *  - Resizes to a max width and exports WebP
 *  - DNG (camera raw) sources are skipped; the JPG exports are used instead
 *
 * Usage (point at the unzipped archive root):
 *   node scripts/process-statics.mjs "/path/to/Proyecto Push2-MUV"
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import heicConvert from "heic-convert";

const SRC = process.argv[2];
if (!SRC) {
  console.error('Pass the unzipped archive root, e.g. "Proyecto Push2-MUV".');
  process.exit(1);
}

const OUT = path.join("public", "img");
const MAX_WIDTH = 1920;
const QUALITY = 82;

/**
 * Explicit mapping from a source file (relative to the archive root) to the
 * semantic output name served from /public/img. This keeps each URL wired to
 * the real photo that belongs to it.
 */
const MAP = [
  // Conditions (Dolencias y lesiones)
  { src: "Dolencias y lesiones/ATM.jpg", out: "condition-atm.webp" },
  { src: "Dolencias y lesiones/Dolorespalda.jpg", out: "condition-dolor-espalda.webp" },
  { src: "Dolencias y lesiones/Lesionhombro.jpg", out: "condition-lesion-hombro.webp" },
  { src: "Dolencias y lesiones/Lesionrodilla.jpg", out: "condition-lesion-rodilla.webp" },

  // Services (only the ones with a real photo available)
  { src: "Servicios/Fiisioterapia.heif", out: "service-fisioterapia.webp" },
  { src: "Servicios/Fisiodeportiva.jpeg", out: "service-fisioterapia-deportiva.webp" },
  { src: "Servicios/entrenamiento.heif", out: "service-entrenamiento-terapeutico.webp" },
  { src: "Servicios/Pilates.heif", out: "service-pilates-terapeutico.webp" },
  { src: "Servicios/Neuromodulacion.jpeg", out: "service-neuromodulacion.webp" },
  { src: "Servicios/Diatermia.heic", out: "service-diatermia.webp" },

  // Professionals (real team)
  { src: "profesionales/CEOMUV.heic", out: "team-ceo.webp" },
  { src: "profesionales/JosedirectorMUV3cantos.JPG", out: "team-jose.webp" },
  { src: "profesionales/LuciaSuelopelvico.HEIC", out: "team-lucia.webp" },
  { src: "profesionales/Gonzalofisioinvasiva.heic", out: "team-gonzalo.webp" },
  { src: "profesionales/VallejoFisiodepor.heic", out: "team-vallejo.webp" },
  { src: "profesionales/Nuria.jpg", out: "team-nuria.webp" },

  // About (Sobre nosotros)
  { src: "Sobre nosotros/IMG_5038.heif", out: "about.webp" },
  { src: "Sobre nosotros/IMG_0127.heif", out: "hero-home.webp" },

  // El Cañaveral location: hero + gallery
  { src: "MUV Cañaveral/DSCF5107_Original.jpg", out: "sede-canaveral.webp" },
  { src: "MUV Cañaveral/DSC_1451_Original.jpg", out: "canaveral-01.webp" },
  { src: "MUV Cañaveral/DSC_1458_Original.jpg", out: "canaveral-02.webp" },
  { src: "MUV Cañaveral/DSC_1510_Original.jpg", out: "canaveral-03.webp" },
  { src: "MUV Cañaveral/DSC_1555_Original.jpg", out: "canaveral-04.webp" },
  { src: "MUV Cañaveral/DSC_1560_Original.jpg", out: "canaveral-05.webp" },
  { src: "MUV Cañaveral/DSC_1569_Original.jpg", out: "canaveral-06.webp" },

  // Tres Cantos location: hero + gallery
  { src: "MUV Tres Cantos /DSC04552.jpg", out: "sede-tres-cantos.webp" },
  { src: "MUV Tres Cantos /DSC04516.jpg", out: "tres-cantos-01.webp" },
  { src: "MUV Tres Cantos /DSC04559.jpg", out: "tres-cantos-02.webp" },
  { src: "MUV Tres Cantos /DSC04572.jpg", out: "tres-cantos-03.webp" },
  { src: "MUV Tres Cantos /DSC04591.jpg", out: "tres-cantos-04.webp" },
  { src: "MUV Tres Cantos /DSC04615.jpg", out: "tres-cantos-05.webp" },
  { src: "MUV Tres Cantos /DSC04643.jpg", out: "tres-cantos-06.webp" },
];

/** Decodes a source buffer to a sharp-readable buffer (handles HEIC/HEIF). */
async function toReadableBuffer(file, buf) {
  if (/\.(heic|heif)$/i.test(file)) {
    return heicConvert({ buffer: buf, format: "JPEG", quality: 0.92 });
  }
  return buf; // sharp reads JPG/JPEG/PNG directly
}

await mkdir(OUT, { recursive: true });
const manifest = [];

let ok = 0;
for (const { src, out } of MAP) {
  try {
    const raw = await readFile(path.join(SRC, src));
    const decoded = await toReadableBuffer(src, raw);
    const img = sharp(decoded).rotate();
    const meta = await img.metadata();
    await img
      .resize({ width: Math.min(MAX_WIDTH, meta.width || MAX_WIDTH) })
      .webp({ quality: QUALITY })
      .toFile(path.join(OUT, out));
    manifest.push({ source: src, output: `/img/${out}` });
    ok += 1;
    console.log(`✓ ${out}`);
  } catch (err) {
    console.error(`✗ ${out} (from ${src}): ${err.message}`);
  }
}

await writeFile(
  path.join(OUT, "statics-manifest.json"),
  JSON.stringify(manifest, null, 2),
);
console.log(`\nDone: ${ok}/${MAP.length} images processed.`);
