import fs from "node:fs";
import path from "node:path";

export type ImageSize = { width: number; height: number };

/**
 * Lee el tamaño real de un `.webp` de `public/` en tiempo de compilación.
 *
 * Hace falta porque las galerías de las clínicas mezclan orientaciones: en El
 * Cañaveral conviven una foto apaisada de 1920×1282 y dos verticales de
 * 1920×3540. Imponerles una proporción común recortaría la mitad de las
 * segundas, así que la cuadrícula respeta la de cada una y necesita conocerla.
 *
 * Se parsea la cabecera en vez de tirar de una librería: son treinta bytes y
 * evita meter un decodificador de imagen en el render del servidor.
 */
export function getImageSize(publicPath: string): ImageSize | null {
  const file = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  if (!fs.existsSync(file)) return null;

  // Con la cabecera basta: el mayor de los tres formatos usa 30 bytes.
  const fd = fs.openSync(file, "r");
  const buf = Buffer.alloc(32);
  try {
    fs.readSync(fd, buf, 0, 32, 0);
  } finally {
    fs.closeSync(fd);
  }

  if (buf.toString("ascii", 0, 4) !== "RIFF") return null;
  if (buf.toString("ascii", 8, 12) !== "WEBP") return null;

  const format = buf.toString("ascii", 12, 16);

  // VP8X: lienzo extendido, ancho y alto en 24 bits menos uno.
  if (format === "VP8X") {
    return {
      width: (buf[24] | (buf[25] << 8) | (buf[26] << 16)) + 1,
      height: (buf[27] | (buf[28] << 8) | (buf[29] << 16)) + 1,
    };
  }

  // VP8 con pérdida: tras el código de sincronismo, 14 bits por dimensión.
  if (format === "VP8 ") {
    return {
      width: buf.readUInt16LE(26) & 0x3fff,
      height: buf.readUInt16LE(28) & 0x3fff,
    };
  }

  // VP8L sin pérdida: 14 bits de ancho y 14 de alto, empaquetados, menos uno.
  if (format === "VP8L" && buf[20] === 0x2f) {
    const bits = buf.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }

  return null;
}
