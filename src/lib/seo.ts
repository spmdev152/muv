import type { Metadata } from "next";
import { site } from "@/lib/site";
import { type Location, openingHoursSpec } from "@/lib/locations";

/** Builds consistent Metadata with canonical + Open Graph + Twitter. */
export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  const fullTitle =
    path === "/" ? `${site.name} · ${site.tagline}` : `${title} · ${site.name}`;

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

/** Global organization / site (injected in the root layout). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: site.legalName,
    url: site.url,
    email: site.email,
    description: site.description,
    medicalSpecialty: "Physiotherapy",
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
