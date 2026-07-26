/**
 * Processes the real clinic photos:
 *  - Converts HEIC -> JPEG (heic-convert, wasm, no system dependencies)
 *  - Resizes and exports to optimized WebP with sharp
 *  - Generates sequential names clinic-NN.webp in /public/img
 *
 * Usage: first unzip docs/web-images.zip into .tmp-img/, then:
 *   node scripts/process-images.mjs .tmp-img
 */
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import heicConvert from "heic-convert";

const SRC = process.argv[2] || ".tmp-img";
const OUT = path.join("public", "img");
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function toJpegBuffer(file, buf) {
  if (/\.heic$/i.test(file)) {
    return heicConvert({ buffer: buf, format: "JPEG", quality: 0.92 });
  }
  return buf; // sharp reads JPG/PNG directly
}

const files = (await readdir(SRC))
  .filter((f) => /\.(heic|jpe?g|png)$/i.test(f))
  .sort();

await mkdir(OUT, { recursive: true });
const manifest = [];

let i = 0;
for (const file of files) {
  i += 1;
  const name = `clinic-${String(i).padStart(2, "0")}.webp`;
  try {
    const raw = await readFile(path.join(SRC, file));
    const jpeg = await toJpegBuffer(file, raw);
    const img = sharp(jpeg).rotate();
    const meta = await img.metadata();
    await img
      .resize({ width: Math.min(MAX_WIDTH, meta.width || MAX_WIDTH) })
      .webp({ quality: QUALITY })
      .toFile(path.join(OUT, name));
    manifest.push({ source: file, output: `/img/${name}` });
    console.log(`✓ ${file} -> ${name}`);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
  }
}

await writeFile(
  path.join(OUT, "manifest.json"),
  JSON.stringify(manifest, null, 2),
);
console.log(`\nDone: ${manifest.length}/${files.length} images processed.`);
