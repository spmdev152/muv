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

  // Contenido dinámico. Las colecciones `services` y `conditions` ya no tienen
  // página: `/servicios/<servicio>` y `/dolencias-y-lesiones/<dolencia>` se
  // retiraron con una 301 y no se listan (#31).
  const collections = [
    { name: "professionals" as const, prefix: "/profesionales" },
    { name: "blog" as const, prefix: "/blog" },
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

  return entries;
}
