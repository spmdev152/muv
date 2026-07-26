import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { locations } from "@/lib/locations";
import { getCollection } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const staticRoutes = [
    "",
    "/servicios",
    "/dolencias-y-lesiones",
    "/sedes",
    "/profesionales",
    "/blog",
    "/contacto",
    "/sobre-nosotros",
    "/sobre-nosotros/metodologia",
    "/politica-editorial",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  // Locations + their contact page (high priority for local SEO).
  for (const location of locations) {
    entries.push(
      { url: `${base}/sedes/${location.slug}`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${base}/sedes/${location.slug}/contacto`, changeFrequency: "yearly", priority: 0.5 },
    );
  }

  // Dynamic content (services includes nested routes).
  const collections = [
    { name: "services" as const, prefix: "/servicios" },
    { name: "conditions" as const, prefix: "/dolencias-y-lesiones" },
    { name: "professionals" as const, prefix: "/profesionales" },
    { name: "blog" as const, prefix: "/blog" },
  ];

  const nestedServices = [
    "entrenamiento-terapeutico/individual",
    "entrenamiento-terapeutico/grupal",
  ];

  for (const { name, prefix } of collections) {
    for (const doc of getCollection(name)) {
      entries.push({
        url: `${base}${prefix}/${doc.slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }
  for (const slug of nestedServices) {
    entries.push({
      url: `${base}/servicios/${slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
