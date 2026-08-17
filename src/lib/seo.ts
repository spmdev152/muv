import type { Metadata } from "next";
import { site } from "@/lib/site";
import { locations, type Location, openingHoursSpec } from "@/lib/locations";

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
    title: fullTitle,
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

/** Per-location MedicalClinic — key piece of local SEO. */
export function clinicJsonLd(location: Location) {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "Physiotherapy"],
    "@id": `${site.url}/sedes/${location.slug}#clinic`,
    name: location.name,
    url: `${site.url}/sedes/${location.slug}`,
    telephone: `+34${location.phoneHref.replace("+34", "")}`,
    email: location.email,
    image: `${site.url}${location.heroImage}`,
    priceRange: "€€",
    medicalSpecialty: "Physiotherapy",
    address: {
      "@type": "PostalAddress",
      streetAddress: location.street,
      postalCode: location.postalCode,
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.geo.lat,
      longitude: location.geo.lng,
    },
    openingHoursSpecification: openingHoursSpec,
    areaServed: location.area,
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
