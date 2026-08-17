/**
 * Real data for MUV's two clinic locations.
 * Source: clinicamuv.com. Key for local SEO (MedicalClinic JSON-LD).
 * Note: user-facing strings stay in Spanish (the site's locale).
 */

export type Location = {
  slug: string;
  name: string;
  shortName: string;
  area: string;
  street: string;
  postalCode: string;
  city: string;
  region: string;
  country: string;
  phone: string;
  phoneHref: string;
  /** Contact via WhatsApp (the phone numbers are WhatsApp lines). */
  whatsappUrl: string;
  email: string;
  /** Booking via Doctoralia. */
  bookingUrl: string;
  /** Approximate coordinates for geo schema and map. */
  geo: { lat: number; lng: number };
  mapEmbed: string;
  hours: { days: string; time: string }[];
  /** Priority local services (slugs under /servicios). */
  priorityServices: string[];
  heroImage: string;
  /** Interior photos of the location for the gallery section. */
  gallery: string[];
  blurb: string;
};

export const locations: Location[] = [
  {
    slug: "el-canaveral",
    name: "MUV El Cañaveral",
    shortName: "El Cañaveral",
    area: "Vicálvaro",
    street: "C. Victoria Kent, Local 8",
    postalCode: "28052",
    city: "Madrid",
    region: "Comunidad de Madrid",
    country: "ES",
    phone: "603 30 30 10",
    phoneHref: "+34603303010",
    whatsappUrl: "https://wa.me/34603303010",
    email: "info@clinicamuv.com",
    // La ficha real es `muv-canaveral`; `clinica-muv-el-canaveral` da 404.
    bookingUrl: "https://www.doctoralia.es/clinicas/muv-canaveral",
    geo: { lat: 40.4079, lng: -3.5709 },
    mapEmbed:
      "https://www.google.com/maps?q=C.+Victoria+Kent+8,+28052+Madrid&output=embed",
    hours: [
      { days: "Lunes a viernes", time: "10:00–14:00 · 16:00–22:00" },
      { days: "Sábado", time: "10:00–14:00" },
      { days: "Domingo", time: "Cerrado" },
    ],
    priorityServices: [
      "fisioterapia",
      "fisioterapia-deportiva",
      "suelo-pelvico",
      "pilates-terapeutico",
    ],
    heroImage: "/img/sede-canaveral.webp",
    gallery: [
      "/img/canaveral-01.webp",
      "/img/canaveral-02.webp",
      "/img/canaveral-03.webp",
      "/img/canaveral-04.webp",
      "/img/canaveral-05.webp",
      "/img/canaveral-06.webp",
    ],
    blurb:
      "Nuestra sede en El Cañaveral (Vicálvaro) combina fisioterapia avanzada, Pilates y entrenamiento funcional, con boxes individuales para un tratamiento totalmente personalizado.",
  },
  {
    slug: "tres-cantos",
    name: "MUV Tres Cantos",
    shortName: "Tres Cantos",
    area: "Tres Cantos",
    street: "Av. de Madrid, 19, Local 5",
    postalCode: "28760",
    city: "Tres Cantos",
    region: "Comunidad de Madrid",
    country: "ES",
    phone: "658 59 76 02",
    phoneHref: "+34658597602",
    whatsappUrl: "https://wa.me/34658597602",
    email: "info@clinicamuv.com",
    bookingUrl: "https://www.doctoralia.es/clinicas/clinica-muv-tres-cantos",
    geo: { lat: 40.6019, lng: -3.7088 },
    mapEmbed:
      "https://www.google.com/maps?q=Av.+de+Madrid+19,+28760+Tres+Cantos&output=embed",
    hours: [
      { days: "Lunes a viernes", time: "10:00–14:00 · 16:00–22:00" },
      { days: "Sábado", time: "10:00–14:00" },
      { days: "Domingo", time: "Cerrado" },
    ],
    priorityServices: [
      "fisioterapia",
      "neuromodulacion",
      "fisioterapia-embarazo",
      "fisioterapia-pediatrica",
    ],
    heroImage: "/img/sede-tres-cantos.webp",
    gallery: [
      "/img/tres-cantos-01.webp",
      "/img/tres-cantos-02.webp",
      "/img/tres-cantos-03.webp",
      "/img/tres-cantos-04.webp",
      "/img/tres-cantos-05.webp",
      "/img/tres-cantos-06.webp",
    ],
    blurb:
      "En Tres Cantos te esperamos con un equipo especializado en fisioterapia, neuromodulación y salud de la mujer, en un espacio diseñado para tu recuperación.",
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

/** Shared opening hours in schema.org format (openingHours). */
export const openingHoursSpec = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "10:00",
    closes: "14:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "16:00",
    closes: "22:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday"],
    opens: "10:00",
    closes: "14:00",
  },
];
