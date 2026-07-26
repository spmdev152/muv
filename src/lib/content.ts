import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

// Collection keys map to folders under /content (kept separate from the
// Spanish URL route segments).
export type Collection =
  | "services"
  | "conditions"
  | "professionals"
  | "blog";

export type Frontmatter = {
  title: string;
  description: string;
  excerpt?: string;
  image?: string;
  order?: number;
  featured?: boolean;
  // Nested services (e.g. entrenamiento-terapeutico/individual)
  parent?: string;
  // Blog
  date?: string;
  author?: string;
  // Professionals
  role?: string;
  locations?: string[];
  credentials?: string;
  // Embedded FAQs
  faqs?: { question: string; answer: string }[];
};

export type Doc = {
  slug: string;
  collection: Collection;
  frontmatter: Frontmatter;
  content: string;
};

function readCollectionDir(collection: Collection): string[] {
  const dir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getDoc(collection: Collection, slug: string): Doc | null {
  const file = path.join(CONTENT_DIR, collection, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    collection,
    frontmatter: data as Frontmatter,
    content,
  };
}

export function getCollection(collection: Collection): Doc[] {
  return readCollectionDir(collection)
    .map((slug) => getDoc(collection, slug))
    .filter((d): d is Doc => d !== null)
    .sort((a, b) => {
      // Blog by date desc; the rest by order asc, then title.
      if (collection === "blog") {
        return (b.frontmatter.date ?? "").localeCompare(
          a.frontmatter.date ?? "",
        );
      }
      const oa = a.frontmatter.order ?? 99;
      const ob = b.frontmatter.order ?? 99;
      if (oa !== ob) return oa - ob;
      return a.frontmatter.title.localeCompare(b.frontmatter.title);
    });
}

export function getSlugs(collection: Collection): string[] {
  return readCollectionDir(collection);
}

export function getFeatured(collection: Collection, limit = 6): Doc[] {
  const all = getCollection(collection);
  const featured = all.filter((d) => d.frontmatter.featured);
  return (featured.length ? featured : all).slice(0, limit);
}
