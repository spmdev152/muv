/**
 * Las dos clínicas de MUV.
 *
 * Aquí viven los DATOS de cada sede, no la copy: los textos publicables están
 * en `src/content/`, uno por página, con su documento de origen anotado.
 *
 * La dirección, el teléfono y el horario son NAP: tienen que coincidir carácter
 * a carácter con Google Business Profile y con Doctoralia. No se reformatean,
 * no se abrevian y no se «limpian» aquí solos.
 */

/** Horario en formato schema.org. */
export type OpeningHours = {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string[];
  opens: string;
  closes: string;
};

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
  /** Booking via Doctoralia. Also feeds `sameAs` in the schema. */
  bookingUrl: string;
  geo: { lat: number; lng: number };
  mapEmbed: string;
  hours: { days: string; time: string }[];
  /**
   * Horario en formato schema.org, por sede y no compartido: son dos negocios
   * locales distintos. Si falta, la sede NO declara `openingHoursSpecification`.
   */
  openingHours?: OpeningHours[];
  /** Nº en el registro de centros sanitarios de la Comunidad de Madrid. */
  healthRegistry?: string;
  /** Responsable sanitario que consta en el registro. */
  healthManager?: { name: string; collegiateNumber: string; since: string };
  /** Municipios y barrios que atiende la clínica. */
  serviceArea?: string[];
  /** Servicios prioritarios de la sede (slugs bajo /servicios). */
  priorityServices: string[];
  heroImage: string;
  /** Fotos del interior de la clínica para la galería. */
  gallery: string[];
};

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

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
    // PENDIENTE MUV: cuatro fuentes públicas —web actual, Doctoralia, Google
    // Business e Instagram— publican 634 47 85 44, que no coincide con este.
    // Hasta que MUV confirme cuál es el bueno no se publica ninguno.
    phone: "603 30 30 10",
    phoneHref: "+34603303010",
    whatsappUrl: "https://wa.me/34603303010",
    email: "info@clinicamuv.com",
    // La ficha real es `muv-canaveral`; `clinica-muv-el-canaveral` da 404.
    bookingUrl: "https://www.doctoralia.es/clinicas/muv-canaveral",
    // Corregida el 17/08/2026. La anterior (40.4079, -3.5709) caía a 1,27 km,
    // en el polígono industrial. Esta es el eje de la calle Victoria Kent en
    // El Cañaveral, con barrio y CP correctos (OpenStreetMap).
    // PENDIENTE MUV: la coordenada del portal, que pueden dar desde su perfil
    // de Google Business.
    geo: { lat: 40.3996, lng: -3.5606 },
    mapEmbed:
      "https://www.google.com/maps?q=C.+Victoria+Kent+8,+28052+Madrid&output=embed",
    hours: [
      { days: "Lunes a viernes", time: "10:00–14:00 · 16:00–22:00" },
      { days: "Sábado", time: "10:00–14:00" },
      { days: "Domingo", time: "Cerrado" },
    ],
    // PENDIENTE MUV: la hora de cierre. La web dice 22:00 y el perfil de Google
    // de esta clínica dice 21:00. Mientras no se resuelva, esta sede NO declara
    // `openingHoursSpecification`: un schema que contradice al perfil de Google
    // es una señal local en contra. Por eso `openingHours` va sin definir.
    healthRegistry: "CS 17623",
    healthManager: {
      name: "Álvaro Ortega Rienda",
      collegiateNumber: "12868",
      since: "2021-01-25",
    },
    // PENDIENTE MUV: zona de atención. La que había se dedujo de un mapa.
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
    // PENDIENTE MUV: la web actual, Doctoralia e Instagram publican
    // 614 13 14 05, que no coincide con este. No se publica ninguno.
    phone: "658 59 76 02",
    phoneHref: "+34658597602",
    whatsappUrl: "https://wa.me/34658597602",
    email: "info@clinicamuv.com",
    bookingUrl: "https://www.doctoralia.es/clinicas/clinica-muv-tres-cantos",
    // Corregida el 17/08/2026. La anterior (40.6019, -3.7088) caía a 1,66 km,
    // junto a la estación de Cercanías. Esta es el eje de la Avenida de Madrid
    // (OpenStreetMap).
    // PENDIENTE MUV: la coordenada del portal.
    geo: { lat: 40.6142, lng: -3.72 },
    mapEmbed:
      "https://www.google.com/maps?q=Av.+de+Madrid+19,+28760+Tres+Cantos&output=embed",
    hours: [
      { days: "Lunes a viernes", time: "10:00–14:00 · 16:00–22:00" },
      { days: "Sábado", time: "10:00–14:00" },
      { days: "Domingo", time: "Cerrado" },
    ],
    // El horario de esta sede no está en disputa, así que sí se declara. Con el
    // sábado dentro: es lo que permite que Google lo muestre en el resultado.
    openingHours: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: WEEKDAYS, opens: "10:00", closes: "14:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: WEEKDAYS, opens: "16:00", closes: "22:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "10:00", closes: "14:00" },
    ],
    // PENDIENTE MUV: número de registro sanitario y responsable sanitario de
    // esta clínica. En El Cañaveral los dos datos ya están.
    // PENDIENTE MUV: zona de atención.
    // Corregido: antes incluía `fisioterapia-embarazo` y `fisioterapia-pediatrica`,
    // que según el catálogo aprobado solo se prestan en El Cañaveral.
    priorityServices: [
      "fisioterapia",
      "fisioterapia-deportiva",
      "neuromodulacion",
      "tratamiento-cicatrices",
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
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
