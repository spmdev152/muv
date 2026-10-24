#!/usr/bin/env node
/**
 * Comprobación de enlaces internos, anclas, sitemap, JSON-LD y redirecciones
 * (#31 y #51). Se ejecuta contra el build servido con `next start`:
 *
 *   npm run build && npm start            # en otra terminal
 *   node scripts/check-links.mjs [http://localhost:3000]
 *
 * Parte del sitemap y rastrea todos los enlaces internos que encuentra. Falla
 * (código 1) si:
 *
 * 1. algún `href` empieza por `/servicios/` o `/dolencias-y-lesiones`;
 * 2. algún `href` con `#` apunta a un `id` que no existe en su destino;
 * 3. algún enlace interno no da 200 (301, 308, 404…) o lleva barra final;
 * 4. alguna entrada del sitemap no da 200, no es su propio canonical o lleva `#`;
 * 5. alguna `url`, `@id` o `item` de JSON-LD apunta a una URL retirada, que no
 *    da 200 o a un ancla que no existe;
 * 6. alguna página retirada no devuelve 301 a su destino.
 *
 * Sin dependencias: solo `fetch` de Node 18+.
 */

const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
/** Dominio con el que el sitio escribe sus URL absolutas (`site.url`). */
const SITE = "https://clinicamuv.com";
const RETIRED = /^\/(servicios\/|dolencias-y-lesiones(\/|$|#|\?))/;

/** Tabla de #31: origen → destino (con ancla si la tabla la lleva). */
const REDIRECTS = [
  ["/servicios/fisioterapia", "/servicios#fisioterapia"],
  ["/servicios/fisioterapia-deportiva", "/sedes/tres-cantos/fisioterapia-deportiva"],
  ["/servicios/entrenamiento-terapeutico", "/servicios#entrenamiento-funcional"],
  ["/servicios/entrenamiento-terapeutico/individual", "/servicios#entrenamiento-funcional"],
  ["/servicios/entrenamiento-terapeutico/grupal", "/servicios#entrenamiento-funcional"],
  ["/servicios/neuromodulacion", "/servicios#neuromodulacion"],
  ["/servicios/diatermia", "/servicios#diatermia"],
  ["/servicios/pilates-terapeutico", "/sedes/el-canaveral/pilates"],
  ["/servicios/suelo-pelvico", "/sedes/el-canaveral/suelo-pelvico"],
  ["/servicios/fisioterapia-embarazo", "/sedes/el-canaveral/suelo-pelvico#embarazo-y-postparto"],
  ["/servicios/postparto", "/sedes/el-canaveral/suelo-pelvico#embarazo-y-postparto"],
  ["/servicios/fisioterapia-pediatrica", "/servicios#fisioterapia-pediatrica"],
  ["/servicios/tratamiento-cicatrices", "/servicios#tratamiento-cicatrices"],
  ["/dolencias-y-lesiones", "/servicios"],
  ["/dolencias-y-lesiones/dolor-espalda", "/sedes/tres-cantos/fisioterapia-espalda"],
  ["/dolencias-y-lesiones/lesion-rodilla", "/sedes/tres-cantos/fisioterapia-rodilla"],
  ["/dolencias-y-lesiones/lesion-hombro", "/sedes/tres-cantos"],
  ["/dolencias-y-lesiones/atm", "/servicios#atm"],
];

const errors = [];
const fail = (msg) => errors.push(msg);

/** path → { status, location, html, ids } */
const cache = new Map();

async function get(path) {
  if (cache.has(path)) return cache.get(path);
  const res = await fetch(BASE + path, { redirect: "manual" });
  const html = res.status === 200 ? await res.text() : "";
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const page = { status: res.status, location: res.headers.get("location"), html, ids };
  cache.set(path, page);
  return page;
}

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');

/** `href` de los `<a>` del HTML servido (no del payload RSC). */
function anchors(html) {
  return [...html.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)].map((m) => decode(m[1]));
}

function jsonLd(html) {
  return [
    ...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
  ].map((m) => JSON.parse(m[1]));
}

/** Todas las `url`, `@id`, `item` y `mainEntityOfPage` de un JSON-LD. */
function ldUrls(node, out = []) {
  if (Array.isArray(node)) node.forEach((n) => ldUrls(n, out));
  else if (node && typeof node === "object") {
    for (const [key, value] of Object.entries(node)) {
      if (["url", "@id", "item", "mainEntityOfPage"].includes(key) && typeof value === "string") {
        out.push({ key, value });
      } else ldUrls(value, out);
    }
  }
  return out;
}

/** Ruta interna de un enlace, o `null` si es externo. */
function internal(href, from) {
  if (href.startsWith("#")) return from + href;
  if (href.startsWith(SITE)) return href.slice(SITE.length) || "/";
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  return null;
}

/** Comprueba un destino interno: 200, sin barra final y con su ancla. */
async function checkTarget(target, where, { checkHash = true } = {}) {
  const [pathAndQuery, hash] = target.split("#");
  const path = pathAndQuery.split("?")[0] || "/";
  if (RETIRED.test(target)) fail(`${where}: enlaza a una URL retirada ${target}`);
  if (path !== "/" && path.endsWith("/")) fail(`${where}: barra final en ${target}`);
  const page = await get(path);
  if (page.status !== 200) {
    fail(`${where}: ${target} devuelve ${page.status}${page.location ? ` → ${page.location}` : ""}`);
    return page;
  }
  if (checkHash && hash && !page.ids.has(hash)) fail(`${where}: no existe id="${hash}" en ${path}`);
  return page;
}

const stats = { pages: 0, links: 0, hashLinks: 0, ld: 0, sitemap: 0 };

// 4 · Sitemap
const sitemapXml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const sitemap = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
stats.sitemap = sitemap.length;
for (const loc of sitemap) {
  if (loc.includes("#")) fail(`sitemap: ${loc} lleva #`);
  const path = internal(loc, "/");
  if (!path) {
    fail(`sitemap: ${loc} no es del sitio`);
    continue;
  }
  if (RETIRED.test(path)) fail(`sitemap: URL retirada ${loc}`);
  const page = await checkTarget(path, "sitemap");
  if (page.status !== 200) continue;
  const canonical = page.html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (canonical !== loc) fail(`sitemap: ${loc} tiene canonical ${canonical}`);
}

// 1–3 y 5 · Rastreo desde el sitemap
const queue = sitemap.map((loc) => internal(loc, "/"));
const seen = new Set(queue);
while (queue.length) {
  const from = queue.shift();
  const page = await get(from);
  if (page.status !== 200) continue;
  stats.pages++;
  for (const href of anchors(page.html)) {
    const target = internal(href, from);
    if (!target) continue;
    stats.links++;
    if (target.includes("#")) stats.hashLinks++;
    await checkTarget(target, `${from} → href="${href}"`);
    const path = target.split("#")[0].split("?")[0] || "/";
    if (!seen.has(path) && (await get(path)).status === 200) {
      seen.add(path);
      queue.push(path);
    }
  }
  for (const data of jsonLd(page.html)) {
    for (const { key, value } of ldUrls(data)) {
      const target = internal(value, from);
      if (!target) continue;
      stats.ld++;
      // El ancla de un `@id` («#clinic») identifica una entidad, no un `id`.
      await checkTarget(target, `${from} → JSON-LD ${key} ${value}`, {
        checkHash: key !== "@id",
      });
    }
  }
}

// 6 · Redirecciones
const redirectLines = [];
for (const [source, destination] of REDIRECTS) {
  const res = await fetch(BASE + source, { redirect: "manual" });
  const location = (res.headers.get("location") ?? "").replace(BASE, "");
  const okLocation =
    location === destination || location === destination.split("#")[0];
  if (res.status !== 301 || !okLocation) {
    fail(`redirección ${source}: ${res.status} → ${location} (se espera 301 → ${destination})`);
  }
  redirectLines.push(`  ${res.status} ${source} → ${location}`);
  await checkTarget(location, `destino de ${source}`);
}

console.log(`Base: ${BASE}`);
console.log(
  `Sitemap: ${stats.sitemap} URL · Páginas rastreadas: ${stats.pages} · ` +
    `Enlaces internos: ${stats.links} (${stats.hashLinks} con #) · URL en JSON-LD: ${stats.ld}`,
);
console.log(`Redirecciones (${REDIRECTS.length}):`);
console.log(redirectLines.join("\n"));
if (errors.length) {
  console.log(`\n✗ ${errors.length} errores:`);
  for (const e of [...new Set(errors)]) console.log(`  - ${e}`);
  process.exit(1);
}
console.log("\n✓ Sin errores: cero enlaces a URL retiradas, anclas resueltas, sitemap y JSON-LD limpios, 301 correctas.");
