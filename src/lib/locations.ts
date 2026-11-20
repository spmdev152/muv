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
  /**
   * Teléfono, tal cual se publica («614 13 14 05»). Es también la línea de
   * WhatsApp. Sin definir = MUV no lo ha confirmado: ninguna página lo muestra,
   * ni como número ni como enlace `wa.me`, y el `MedicalClinic` no declara
   * `telephone`. Es el único punto que hay que rellenar cuando llegue.
   */
  phone?: string;
  email: string;
  /** Booking via Doctoralia. Also feeds `sameAs` in the schema. */
  bookingUrl: string;
  geo: { lat: number; lng: number };
  mapEmbed: string;
  /** Horario por días, tal cual lo confirmó MUV. */
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
  /**
   * Los cuatro servicios que la sede desarrolla en página propia (slugs bajo
   * /sedes/<sede>/, #29). El contenido está en `src/content/sede-services/`.
   */
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
    // Con el barrio, como la ficha de Google (#58).
    street: "C. Victoria Kent, Local 8, Vicálvaro",
    postalCode: "28052",
    city: "Madrid",
    region: "Comunidad de Madrid",
    country: "ES",
    // Confirmado por MUV el 16/11/2026 (#58): es el que ya publicaban Google,
    // Doctoralia, Instagram y la web actual. El 603 30 30 10 era el erróneo.
    phone: "634 47 85 44",
    email: "info@clinicamuv.com",
    // La ficha real es `muv-canaveral`; `clinica-muv-el-canaveral` da 404.
    bookingUrl: "https://www.doctoralia.es/clinicas/muv-canaveral",
    // La de la ficha de Google Business (#22, #58).
    geo: { lat: 40.4012311, lng: -3.5626399 },
    // Apunta a la ficha de Google, no a una búsqueda por dirección (#49).
    mapEmbed:
      "https://www.google.com/maps?q=MUV+Ca%C3%B1averal+fisioterapia+y+Pilates&ll=40.4012311,-3.5626399&z=17&output=embed",
    // Confirmado por MUV el 16/11/2026 (#35, #58).
    hours: [
      { days: "Lunes a viernes", time: "9:00–21:00" },
      { days: "Sábado", time: "9:00–14:00" },
      { days: "Domingo", time: "Cerrado" },
    ],
    openingHours: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: WEEKDAYS, opens: "09:00", closes: "21:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "14:00" },
    ],
    healthRegistry: "CS 17623",
    healthManager: {
      name: "Álvaro Ortega Rienda",
      collegiateNumber: "12868",
      since: "2021-01-25",
    },
    // PENDIENTE MUV: zona de atención. La que había se dedujo de un mapa.
    priorityServices: [
      "fisioterapia-invasiva-ecografia",
      "suelo-pelvico",
      "pilates",
      "entrenamiento-funcional",
    ],
    heroImage: "/img/sede-canaveral.webp",
    gallery: [
      "/img/canaveral-01.webp",
      "/img/canaveral-02.webp",
      "/img/canaveral-03.webp",
      "/img/service-fisioterapia.webp",
      "/img/canaveral-05.webp",
      "/img/canaveral-06.webp",
    ],
  },
  {
    slug: "tres-cantos",
    name: "MUV Tres Cantos",
    shortName: "Tres Cantos",
    area: "Tres Cantos",
    // Tal cual la escribe el perfil de Google Business (comprobado el
    // 14/10/2026): «Loc 5», no «Local 5».
    street: "Av. de Madrid, 19, Loc 5",
    postalCode: "28760",
    city: "Tres Cantos",
    region: "Comunidad de Madrid",
    country: "ES",
    // Confirmado por MUV el 14/10/2026: es el que ya publicaban la web actual,
    // Doctoralia e Instagram. El anterior (658 59 76 02) era el erróneo.
    phone: "614 13 14 05",
    email: "info@clinicamuv.com",
    bookingUrl: "https://www.doctoralia.es/clinicas/clinica-muv-tres-cantos",
    // La de la ficha de Google Business (#22, #58).
    geo: { lat: 40.6222552, lng: -3.7228582 },
    // Apunta a la ficha de Google, no a una búsqueda por dirección (#49).
    mapEmbed:
      "https://www.google.com/maps?q=Cl%C3%ADnica+MUV+Fisioterapia+Deportiva+en+Tres+Cantos&ll=40.6222552,-3.7228582&z=17&output=embed",
    // Confirmado por MUV el 16/11/2026 (#58): de 10:00 a 22:00 sin cierre a
    // mediodía. Sustituye al del 14/10/2026 (10:00–14:00 · 16:00–21:00).
    hours: [
      { days: "Lunes a viernes", time: "10:00–22:00" },
      { days: "Sábado", time: "9:00–14:00" },
      { days: "Domingo", time: "Cerrado" },
    ],
    // Con el sábado dentro: es lo que permite que Google lo muestre en el
    // resultado.
    openingHours: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: WEEKDAYS, opens: "10:00", closes: "22:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "09:00", closes: "14:00" },
    ],
    healthRegistry: "CS 21018",
    // PENDIENTE MUV: responsable sanitario de esta clínica. En El Cañaveral ya
    // está.
    // PENDIENTE MUV: zona de atención.
    priorityServices: [
      "fisioterapia-deportiva",
      "fisioterapia-rodilla",
      "fisioterapia-espalda",
      "entrenamiento-funcional",
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

/** Doctoralia facility slug, the last segment of `bookingUrl` (#73). */
export function doctoraliaFacility(location: Location): string {
  return location.bookingUrl.split("/").filter(Boolean).pop() ?? "";
}

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

/** El teléfono en formato internacional, para `tel:` y para el schema. */
export function phoneIntl(location: Location): string | undefined {
  return location.phone && `+34 ${location.phone}`;
}

export function phoneHref(location: Location): string | undefined {
  return location.phone && `tel:+34${location.phone.replace(/\s/g, "")}`;
}

/** Enlace de WhatsApp: los teléfonos de las sedes son líneas de WhatsApp. */
export function whatsappUrl(location: Location): string | undefined {
  return location.phone && `https://wa.me/34${location.phone.replace(/\s/g, "")}`;
}

/** El horario en una línea, sin el domingo cerrado. */
export function hoursLine(location: Location): string {
  return location.hours
    .filter((h) => h.time !== "Cerrado")
    .map((h) => `${h.days} ${h.time}`)
    .join(" · ");
}

/**
 * La dirección completa en una línea, tal cual la publica la ficha de Google
 * (#58). Es la única forma de escribirla: ninguna página la copia a mano.
 */
export function fullAddress(location: Location): string {
  const region = location.city === "Madrid" ? "" : ", Madrid";
  return `${location.street}, ${location.postalCode} ${location.city}${region}`;
}

/** `fullAddress` de una sede por su slug, para los textos de `src/content/`. */
export function addressOf(slug: string): string {
  const location = getLocation(slug);
  if (!location) throw new Error(`Sede desconocida: ${slug}`);
  return fullAddress(location);
}
