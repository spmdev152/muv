/**
 * Renderiza el póster del hero a partir de la propia escena 3D.
 *
 * El póster es lo que ve el visitante mientras la columna WebGL carga, y lo
 * único que ven móvil, tablet y cualquier máquina sin GPU (ver `HeroFigure`).
 * Si fuese otra imagen —una foto, por ejemplo— el relevo se leería como un
 * salto: aparece una cosa y la sustituye otra. Siendo el mismo fotograma con el
 * que la escena arranca, el cambio es imperceptible: la figura estática se pone
 * a girar.
 *
 * La captura se hace con `?poster=1`, que monta la escena aunque el rasterizador
 * sea software y la deja congelada en su pose de apertura mientras sigue
 * dibujando. Las dos cosas son necesarias: en headless no hay GPU, y un canvas
 * que deja de dibujar se captura en blanco.
 *
 * Se captura la región de la figura, no el `<canvas>` a pelo: así entra también
 * el halo radial que vive detrás y el póster encaja con lo que hay debajo.
 *
 * Requiere el sitio servido en producción (`bun run build && bun run start`):
 *   node scripts/render-spine-poster.mjs [url]
 *
 * El fotograma se guarda en `src/assets/` para que `HomeHero` lo importe: la URL
 * publicada lleva el hash del contenido, así que al regenerarlo se invalida por
 * sí sola en el navegador, en la caché de imágenes de Next y en cualquier CDN.
 */
import path from "node:path";
import { stat } from "node:fs/promises";
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const URL = process.argv[2] || "http://localhost:4321/";
// En `src/assets` y no en `public`: `HomeHero` lo importa, así la URL publicada
// lleva el hash del contenido y al regenerarlo se invalida sola en navegadores
// y CDN. Con una ruta fija de `public` seguían sirviendo el fotograma viejo.
const OUT = path.join("src", "assets", "hero-spine.webp");
const WIDTH = 1200; // 4:5 -> 1200x1500, de sobra para 2x en escritorio
const QUALITY = 80;

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome-stable",
  headless: "new",
  args: [
    "--no-sandbox",
    // Sin GPU, Chrome headless rasteriza WebGL con SwiftShader. Es lento
    // (segundos por frame), pero el resultado es idéntico al de una GPU.
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--hide-scrollbars",
  ],
});

const page = await browser.newPage();
// Ancho de escritorio (la escena solo se monta a partir de `lg`) y 3x para que
// la captura dé holgura sobre los 1200 px de salida.
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 3 });
await page.goto(new global.URL("?poster=1", URL).href, {
  waitUntil: "load",
  timeout: 60000,
});

// `data-spine="painted"`: la escena ha pintado su pose de apertura. Con
// `?poster=1` se queda ahí, así que no hay ninguna carrera contra el fundido.
await page.waitForFunction(
  () => document.querySelector(".settle")?.dataset.spine === "painted",
  { timeout: 180000, polling: 50 },
);

// El póster anterior sigue encima y se desvanece por CSS: se espera a que esté
// del todo transparente para que no tiña la captura.
await page.waitForFunction(
  () =>
    getComputedStyle(document.querySelector(".settle > div:nth-child(2)"))
      .opacity === "0",
  { timeout: 30000, polling: 50 },
);

// La animación `settle` escala la figura al entrar: medir la caja mientras corre
// daría un recorte más pequeño.
await page.waitForFunction(
  () =>
    document
      .querySelector(".settle")
      .getAnimations()
      .every((animation) => animation.playState === "finished"),
  { timeout: 20000, polling: 50 },
);

const figure = await page.$(".settle");
if (!figure) throw new Error("No se encontró la figura del hero (.settle)");
const box = await figure.boundingBox();
const shot = await page.screenshot({
  clip: {
    x: Math.round(box.x),
    y: Math.round(box.y),
    width: Math.round(box.width),
    height: Math.round(box.height),
  },
});

const state = await page.$eval(".settle", (el) => el.dataset.spine);
await browser.close();
if (state !== "painted") {
  throw new Error(
    `La escena dejó de estar congelada durante la captura (data-spine="${state}")`,
  );
}

// Una captura en blanco (canvas que ya no dibuja, escena sin montar) no tiene
// ni un píxel oscuro. Mejor fallar que publicar un póster vacío.
const { channels } = await sharp(shot).stats();
const darkest = Math.min(...channels.slice(0, 3).map((c) => c.min));
if (darkest > 180) {
  throw new Error(
    `La captura salió vacía: el píxel más oscuro es ${darkest}/255, no hay figura`,
  );
}

await sharp(shot)
  .resize({ width: WIDTH })
  .webp({ quality: QUALITY, effort: 6 })
  .toFile(OUT);

const { size } = await stat(OUT);
console.log(
  `✓ ${OUT} — ${Math.round(box.width)}x${Math.round(box.height)} css -> ${WIDTH}px, ${(size / 1024).toFixed(1)} KB`,
);
