/**
 * Global MUV site configuration.
 * Centralizes brand, base URL and navigation for reuse across SEO and layout.
 */

export const site = {
  name: "MUV",
  legalName: "Clínica MUV",
  tagline: "Fisioterapia eficaz, eficiente y empática",
  // Meta description aprobada de la home (`docs/contenidos/home.md`, v8). Sirve
  // además de descripción por defecto del sitio y del `Organization`. La
  // anterior tuteaba, y el trato de usted alcanza también a la configuración.
  description:
    "Clínica de fisioterapia, fisioterapia deportiva y ejercicio terapéutico en El Cañaveral y Tres Cantos. Centro sanitario registrado. Pida cita en MUV.",
  // Replaced by the real domain in production.
  url: "https://clinicamuv.com",
  email: "info@clinicamuv.com",
  locale: "es_ES",
  ogImage: "/opengraph-image",
} as const;

/**
 * Columnas fijas del pie. Los servicios van aparte, una columna por sede, y
 * salen de `servicesByLocation` (`nav.ts`), la misma fuente que el header.
 */
export const footerNav = {
  Clínica: [
    { label: "Sobre nosotros", href: "/sobre-nosotros" },
    { label: "Metodología", href: "/sobre-nosotros/metodologia" },
    { label: "Profesionales", href: "/profesionales" },
    { label: "Política editorial", href: "/politica-editorial" },
    { label: "Blog", href: "/blog" },
    { label: "Trabaje con nosotros", href: "/contacto#trabaje-con-nosotros" },
  ],
  Sedes: [
    { label: "El Cañaveral", href: "/sedes/el-canaveral" },
    { label: "Tres Cantos", href: "/sedes/tres-cantos" },
    { label: "Contacto", href: "/contacto" },
  ],
};
