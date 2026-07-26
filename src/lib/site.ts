/**
 * Global MUV site configuration.
 * Centralizes brand, base URL and navigation for reuse across SEO and layout.
 */

export const site = {
  name: "MUV",
  legalName: "Clínica MUV",
  tagline: "Fisioterapia eficaz, eficiente y empática",
  description:
    "Clínica de fisioterapia avanzada, Pilates y entrenamiento funcional en Madrid con dos sedes, El Cañaveral y Tres Cantos. Tratamientos personalizados con tecnología de vanguardia y un equipo especialista en mejorar tu calidad de vida.",
  // Replaced by the real domain in production.
  url: "https://clinicamuv.com",
  email: "info@clinicamuv.com",
  locale: "es_ES",
  ogImage: "/opengraph-image",
} as const;

/** Primary header navigation. */
export const mainNav: {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}[] = [
  {
    label: "Servicios",
    href: "/servicios",
    children: [
      { label: "Fisioterapia", href: "/servicios/fisioterapia" },
      {
        label: "Fisioterapia deportiva",
        href: "/servicios/fisioterapia-deportiva",
      },
      {
        label: "Entrenamiento terapéutico",
        href: "/servicios/entrenamiento-terapeutico",
      },
      {
        label: "Pilates terapéutico",
        href: "/servicios/pilates-terapeutico",
      },
      { label: "Neuromodulación", href: "/servicios/neuromodulacion" },
      { label: "Diatermia", href: "/servicios/diatermia" },
      { label: "Suelo pélvico", href: "/servicios/suelo-pelvico" },
      {
        label: "Fisioterapia en el embarazo",
        href: "/servicios/fisioterapia-embarazo",
      },
      { label: "Postparto", href: "/servicios/postparto" },
      {
        label: "Tratamiento de cicatrices",
        href: "/servicios/tratamiento-cicatrices",
      },
      {
        label: "Fisioterapia pediátrica",
        href: "/servicios/fisioterapia-pediatrica",
      },
    ],
  },
  {
    label: "Dolencias y lesiones",
    href: "/dolencias-y-lesiones",
    children: [
      { label: "ATM", href: "/dolencias-y-lesiones/atm" },
      { label: "Dolor de espalda", href: "/dolencias-y-lesiones/dolor-espalda" },
      { label: "Lesión de rodilla", href: "/dolencias-y-lesiones/lesion-rodilla" },
      { label: "Lesión de hombro", href: "/dolencias-y-lesiones/lesion-hombro" },
    ],
  },
  {
    label: "Sedes",
    href: "/sedes",
    children: [
      { label: "El Cañaveral", href: "/sedes/el-canaveral" },
      { label: "Tres Cantos", href: "/sedes/tres-cantos" },
    ],
  },
  { label: "Profesionales", href: "/profesionales" },
  { label: "Sobre nosotros", href: "/sobre-nosotros" },
  { label: "Blog", href: "/blog" },
];

/**
 * Reports whether a route renders a header (PageHero) with a dark background
 * image. The Header uses this to show light text while in its top transparent
 * state (on scroll it switches to a cream background with dark text).
 * Keep it aligned with the pages that render <PageHero image=...>.
 */
export function hasDarkHero(pathname: string): boolean {
  // Service detail (including nested), condition detail and location pages.
  if (/^\/servicios\/.+/.test(pathname)) return true;
  if (/^\/dolencias-y-lesiones\/.+/.test(pathname)) return true;
  if (/^\/sedes\/[^/]+/.test(pathname)) return true; // /sedes/<location> and /sedes/<location>/contacto
  return false;
}

export const footerNav = {
  Clínica: [
    { label: "Sobre nosotros", href: "/sobre-nosotros" },
    { label: "Metodología", href: "/sobre-nosotros/metodologia" },
    { label: "Profesionales", href: "/profesionales" },
    { label: "Política editorial", href: "/politica-editorial" },
    { label: "Blog", href: "/blog" },
  ],
  Servicios: [
    { label: "Fisioterapia", href: "/servicios/fisioterapia" },
    { label: "Fisioterapia deportiva", href: "/servicios/fisioterapia-deportiva" },
    { label: "Suelo pélvico", href: "/servicios/suelo-pelvico" },
    { label: "Pilates terapéutico", href: "/servicios/pilates-terapeutico" },
    { label: "Ver todos", href: "/servicios" },
  ],
  Sedes: [
    { label: "El Cañaveral", href: "/sedes/el-canaveral" },
    { label: "Tres Cantos", href: "/sedes/tres-cantos" },
    { label: "Contacto", href: "/contacto" },
  ],
};
