import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { locations } from "@/lib/locations";
import { getCollection } from "@/lib/content";
import { sedeServicePath, sedeServices } from "@/content/sede-services";

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

  // Páginas de sede: máxima prioridad después de la home, porque son las que
  // compiten por «fisioterapia <municipio>». Su antigua ruta `/contacto`
  // redirige aquí y ya no se lista.
  for (const location of locations) {
    entries.push({
      url: `${base}/sedes/${location.slug}`,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  // Páginas de servicio por sede (#29): entre la sede (0.9) y `/servicios`
  // (0.7), porque son las que compiten por «<servicio> <municipio>».
  for (const services of Object.values(sedeServices)) {
    for (const service of services) {
      entries.push({
        url: `${base}${sedeServicePath(service)}`,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
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
