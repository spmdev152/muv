/**
 * One-off import of the WordPress blog of clinicamuv.com into `content/blog`
 * (#63). Reads the public REST API, converts every post to MDX, rewrites the
 * links that pointed to the old site and saves each image as WebP in
 * `public/img/blog`. The output is committed; the site never calls WordPress.
 *
 * Usage: node scripts/import-wordpress.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import TurndownService from "turndown";

const SOURCE = "https://clinicamuv.com";
const API = `${SOURCE}/wp-json/wp/v2`;
const POSTS_DIR = path.join("content", "blog");
const IMAGES_DIR = path.join("public", "img", "blog");
const MAX_WIDTH = 1600;
const QUALITY = 80;

/**
 * Spectra (UAGB) and core blocks that only make sense on WordPress: table of
 * contents, Google Maps embeds, booking modals, buttons, promotional boxes and
 * spacers. Containers (`wp-block-uagb-container`) are kept: they wrap real
 * headings and paragraphs.
 */
const REMOVED_BLOCKS = [
  "wp-block-uagb-table-of-contents",
  "wp-block-uagb-google-map",
  "wp-block-uagb-modal",
  "wp-block-uagb-info-box",
  "wp-block-uagb-call-to-action",
  "wp-block-uagb-buttons",
  "wp-block-buttons",
  "wp-block-spacer",
];

const ENTITIES = {
  amp: "&",
  quot: '"',
  apos: "'",
  lt: "<",
  gt: ">",
  nbsp: " ",
  hellip: "…",
  ndash: "–",
  mdash: "—",
  laquo: "«",
  raquo: "»",
  lsquo: "‘",
  rsquo: "’",
  ldquo: "“",
  rdquo: "”",
  iexcl: "¡",
  iquest: "¿",
};

function decodeEntities(text) {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m);
}

function plain(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function countWords(text) {
  return text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function saveImage(url, name) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const img = sharp(Buffer.from(await res.arrayBuffer())).rotate();
  const { width = MAX_WIDTH } = await img.metadata();
  await img
    .resize({ width: Math.min(MAX_WIDTH, width) })
    .webp({ quality: QUALITY })
    .toFile(path.join(IMAGES_DIR, name));
  return `/img/blog/${name}`;
}

/**
 * Maps a link of the old site to its page on the new one. Google search links
 * (with tracking parameters) return `null` and keep only their text.
 */
function rewriteHref(href, postSlugs) {
  if (/^https?:\/\/(www\.)?google\.[a-z.]+\/search/.test(href)) return null;
  if (href.startsWith("#")) return href;

  const match = href.match(
    /^(?:https?:\/\/(?:www\.)?clinicamuv\.com)?(\/[^?#]*)?(?:[?#].*)?$/,
  );

  if (!match) return href;

  const slug = (match[1] ?? "").replace(/^\/+|\/+$/g, "");

  if (slug === "") return "/";
  if (slug === "tres-cantos") return "/sedes/tres-cantos";
  if (slug === "blog") return "/blog";
  if (postSlugs.has(slug)) return `/blog/${slug}`;

  return href;
}

/** Escapes what MDX would read as JSX or expressions. */
function escapeMdx(markdown) {
  return markdown.replace(/[{}]/g, (c) => `\\${c}`).replace(/</g, "&lt;");
}

function createTurndown(postSlugs, images) {
  const td = new TurndownService({
    headingStyle: "atx",
    bulletListMarker: "-",
    emDelimiter: "*",
    strongDelimiter: "**",
    br: "\\",
  });

  td.remove(["script", "style", "svg", "embed", "iframe", "button", "noscript"]);
  td.remove(
    (node) =>
      node.nodeType === 1 &&
      REMOVED_BLOCKS.some((block) => node.classList?.contains(block)),
  );

  td.addRule("link", {
    filter: (node) => node.nodeName === "A" && node.getAttribute("href"),
    replacement: (content, node) => {
      const text = content.trim();
      const href = rewriteHref(node.getAttribute("href"), postSlugs);

      if (!text) return "";

      return href ? `[${text}](${href})` : text;
    },
  });

  td.addRule("image", {
    filter: "img",
    replacement: (_, node) => {
      const src = node.getAttribute("src");

      if (!src) return "";

      const name = images.add(src, node.getAttribute("alt") ?? "");

      return `\n\n![${images.alt(name)}](${name})\n\n`;
    },
  });

  return td;
}

function frontmatter(data) {
  const lines = Object.entries(data)
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`);

  return `---\n${lines.join("\n")}\n---\n`;
}

const [posts, categories, users] = await Promise.all([
  getJson(`${API}/posts?per_page=100`),
  getJson(`${API}/categories?per_page=100`),
  getJson(`${API}/users?per_page=100`),
]);

const mediaIds = posts.map((post) => post.featured_media).filter(Boolean);
const media = await getJson(`${API}/media?per_page=100&include=${mediaIds.join(",")}`);
const mediaById = new Map(media.map((item) => [item.id, item]));
const categoryById = new Map(categories.map((c) => [c.id, decodeEntities(c.name)]));
const userById = new Map(users.map((u) => [u.id, u.name]));
const postSlugs = new Set(posts.map((post) => post.slug));

await mkdir(POSTS_DIR, { recursive: true });
await mkdir(IMAGES_DIR, { recursive: true });

const report = [];

for (const post of posts) {
  const pending = [];
  const alts = new Map();
  const images = {
    add(src, alt) {
      const name = `/img/blog/${post.slug}-${pending.length + 1}.webp`;

      pending.push({ src, file: path.basename(name) });
      alts.set(name, alt.trim() || plain(post.title.rendered));

      return name;
    },
    alt: (name) => alts.get(name),
  };

  const markdown = createTurndown(postSlugs, images)
    .turndown(post.content.rendered)
    .replace(/^#{1,6}\s*$/gm, "")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  for (const { src, file } of pending) {
    await saveImage(src, file);
  }

  const featured = mediaById.get(post.featured_media);
  const image = featured
    ? await saveImage(featured.source_url, `${post.slug}.webp`)
    : undefined;
  const title = plain(post.title.rendered);
  const seo = post.yoast_head_json ?? {};
  const seoTitle = seo.title
    ?.replace(/\s*[|·–-]\s*(Clínica\s+)?MUV\s*$/i, "")
    .trim();
  const excerpt = plain(post.excerpt.rendered)
    .replace(/\s*(\[…\]|…?\s*Leer más.*)$/i, "…")
    .replace(/([.!?])…$/, "$1")
    .replace(/[,;:]…$/, "…")
    .replace(/([^.…!?])$/, "$1…");

  const doc =
    frontmatter({
      title,
      seoTitle: seoTitle && seoTitle !== title ? seoTitle : undefined,
      description: seo.description ?? excerpt,
      excerpt,
      image,
      imageAlt: featured ? featured.alt_text?.trim() || title : undefined,
      date: post.date.slice(0, 10),
      updated: post.modified.slice(0, 10),
      author: userById.get(post.author),
      category: categoryById.get(post.categories[0]),
      source: post.link,
    }) +
    "\n" +
    escapeMdx(markdown) +
    "\n";

  await writeFile(path.join(POSTS_DIR, `${post.slug}.mdx`), doc);

  report.push({
    slug: post.slug.slice(0, 48),
    original: countWords(plain(post.content.rendered)),
    migrated: countWords(markdown.replace(/[#*_[\]()>-]/g, " ")),
    emptyAlt: featured && !featured.alt_text?.trim() ? "yes" : "",
  });
}

console.table(report);
