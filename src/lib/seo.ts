import type { Metadata } from "next";
import { site } from "@/lib/site";
import { locations, type Location } from "@/lib/locations";

/** Builds consistent Metadata with canonical + Open Graph + Twitter. */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  rawTitle,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  /**
   * Publishes this exact string as the <title>, skipping the brand suffix.
   * Used by pages whose approved copy fixes the SEO title to the character.
   */
  rawTitle?: string;
}): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  const fullTitle =
    rawTitle ??
    (path === "/" ? `${site.name} · ${site.tagline}` : `${title} · ${site.name}`);

  return {
    // Con `rawTitle` el título se publica tal cual, saltándose la plantilla
    // `%s · MUV` del layout raíz: si no, el sufijo se añadiría por segunda vez
    // y los títulos aprobados se pasarían de los caracteres contados.
    title: rawTitle ? { absolute: rawTitle } : fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/**
 * Global organization / site (injected in the root layout).
 *
 * `sameAs` is what tells Google that this site, the two Doctoralia listings and
 * the Google Business profiles are one and the same business. Only the
 * Doctoralia listings have a URL with a source in the repo today.
 *
 * PENDIENTE MUV: perfil de Google Business y redes sociales, para completarlo.
 *
 * Nunca se declaran aquí las valoraciones de Doctoralia como `aggregateRating`:
 * son opiniones recogidas en otra plataforma y marcarlas como propias expone el
 * dominio a una acción manual que tumbaría los resultados enriquecidos de todo
 * el sitio.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: site.legalName,
    url: site.url,
    logo: `${site.url}/brand/icon-verde.png`,
    email: site.email,
    description: site.description,
    medicalSpecialty: "Physiotherapy",
    sameAs: locations.map((location) => location.bookingUrl),
  };
}

function postalAddress(location: Location) {
  return {
    "@type": "PostalAddress",
    streetAddress: location.street,
    postalCode: location.postalCode,
    addressLocality: location.city,
    addressRegion: location.region,
    addressCountry: location.country,
  };
}

function geoCoordinates(location: Location) {
  return {
    "@type": "GeoCoordinates",
    latitude: location.geo.lat,
    longitude: location.geo.lng,
  };
}

/**
 * `MedicalClinic` de una sede — la pieza principal del SEO local.
 *
 * Se declara una sola vez por clínica, en su propia página.
 *
 * Tres campos se omiten a propósito mientras MUV no facilite el dato, porque un
 * schema que contradice a Google Business resta en vez de sumar:
 *
 * - `telephone`: el número de `locations.ts` no coincide con ninguna de las
 *   cuatro fuentes que MUV publica.
 * - `openingHoursSpecification`: sale de `location.openingHours`, que en El
 *   Cañaveral va sin definir hasta que se resuelva si cierra a las 21:00 o a
 *   las 22:00.
 * - `areaServed`: la zona de atención se dedujo de un mapa y se retiró.
 *
 * Nunca se declara `aggregateRating` con las opiniones de Doctoralia ni de
 * Google: están recogidas en otra plataforma.
 */
export function clinicJsonLd(
  location: Location,
  services: readonly { label: string; href: string }[] = [],
) {
  const manager = location.healthManager;

  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "Physiotherapy"],
    "@id": `${site.url}/sedes/${location.slug}#clinic`,
    name: location.name,
    url: `${site.url}/sedes/${location.slug}`,
    email: location.email,
    // Solo la portada. Las seis fotos de la galería no entran hasta que el
    // equipo confirme qué muestra cada una: una de las de Tres Cantos es de
    // fisioterapia pediátrica, que esa sede no presta, y declararla como imagen
    // de la clínica es la misma señal falsa que publicarla en la página.
    image: `${site.url}${location.heroImage}`,
    priceRange: "€€",
    medicalSpecialty: "Physiotherapy",
    address: postalAddress(location),
    geo: geoCoordinates(location),
    openingHoursSpecification: location.openingHours,
    // Vincula esta clínica con su ficha de Doctoralia: es lo que le dice a
    // Google que son el mismo negocio.
    sameAs: [location.bookingUrl],
    availableService: services.length
      ? services.map((s) => ({
          "@type": "MedicalProcedure",
          name: s.label,
          url: `${site.url}${s.href}`,
        }))
      : undefined,
    // El responsable sanitario con su número de colegiado es la señal E-E-A-T
    // más fuerte de la página.
    employee: manager
      ? {
          "@type": "Person",
          name: manager.name,
          jobTitle: "Responsable sanitario",
          identifier: manager.collegiateNumber,
        }
      : undefined,
  };
}

/**
 * `ItemList` de las dos clínicas para `/sedes`.
 *
 * Es el marcado propio de una página índice de ubicaciones. Cada elemento
 * apunta con `@id` al `MedicalClinic` completo de su página de sede, para que
 * Google trate las dos declaraciones como la misma entidad y no como dos.
 */
export function clinicListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: locations.map((location, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": ["MedicalClinic", "Physiotherapy"],
        "@id": `${site.url}/sedes/${location.slug}#clinic`,
        name: location.name,
        url: `${site.url}/sedes/${location.slug}`,
        address: postalAddress(location),
        geo: geoCoordinates(location),
      },
    })),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name,
    description,
    url: `${site.url}${path}`,
    provider: {
      "@type": "MedicalOrganization",
      name: site.legalName,
      url: site.url,
    },
  };
}

export function personJsonLd({
  name,
  role,
  description,
  image,
  path,
}: {
  name: string;
  role?: string;
  description: string;
  image?: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: role,
    description,
    image: image ? `${site.url}${image}` : undefined,
    url: `${site.url}${path}`,
    worksFor: { "@type": "MedicalOrganization", name: site.legalName },
  };
}

export function articleJsonLd({
  title,
  description,
  date,
  author,
  image,
  path,
}: {
  title: string;
  description: string;
  date?: string;
  author?: string;
  image?: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: date,
    image: image ? `${site.url}${image}` : undefined,
    author: { "@type": "Person", name: author ?? site.legalName },
    publisher: { "@type": "Organization", name: site.legalName },
    mainEntityOfPage: `${site.url}${path}`,
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
