/**
 * Navegación principal del header.
 *
 * Vive aparte de `site.ts` para que el Header la reciba ya resuelta por props
 * desde el layout, que es de servidor.
 */

import { locations } from "@/lib/locations";

export type NavLink = { label: string; href: string };

/** Grupo de un desplegable: en Servicios, uno por clínica. */
export type NavGroup = NavLink & { items: NavLink[] };

export type NavItem = NavLink & {
  children?: NavLink[];
  /** Desplegable en columnas con cabecera propia (sustituye a `children`). */
  groups?: NavGroup[];
  /** Enlace al pie del desplegable agrupado. */
  footer?: NavLink;
};

/**
 * Los cuatro servicios que MUV eligió destacar en cada clínica, con el nombre
 * y el orden de sus documentos de contenido de la fase 2 (`MUV-WEB-<SEDE>-*`,
 * issues #39–#46). Solo se listan elementos con enlace (#30).
 *
 * Su página propia, `/sedes/<sede>/<servicio>` (#29), todavía no existe: hasta
 * entonces cada uno enlaza a la página actual más cercana. La ruta definitiva
 * va anotada en cada línea; cuando exista, se cambia aquí.
 */
const featuredServices: Record<string, NavLink[]> = {
  "el-canaveral": [
    // → /sedes/el-canaveral/fisioterapia-invasiva-ecografia
    { label: "Fisioterapia invasiva y ecografía", href: "/servicios/fisioterapia" },
    // → /sedes/el-canaveral/suelo-pelvico
    { label: "Fisioterapia de suelo pélvico", href: "/servicios/suelo-pelvico" },
    // → /sedes/el-canaveral/pilates
    {
      label: "Pilates y pilates para embarazadas",
      href: "/servicios/pilates-terapeutico",
    },
    // → /sedes/el-canaveral/entrenamiento-funcional
    {
      label: "Entrenamiento funcional guiado",
      href: "/servicios/entrenamiento-terapeutico",
    },
  ],
  "tres-cantos": [
    // → /sedes/tres-cantos/fisioterapia-deportiva
    {
      label: "Fisioterapia deportiva y readaptación",
      href: "/servicios/fisioterapia-deportiva",
    },
    // → /sedes/tres-cantos/fisioterapia-rodilla
    {
      label: "Fisioterapia de rodilla",
      href: "/dolencias-y-lesiones/lesion-rodilla",
    },
    // → /sedes/tres-cantos/fisioterapia-espalda
    {
      label: "Fisioterapia de espalda, cervical y lumbar",
      href: "/dolencias-y-lesiones/dolor-espalda",
    },
    // → /sedes/tres-cantos/entrenamiento-funcional
    {
      label: "Clases supervisadas de entrenamiento funcional",
      href: "/servicios/entrenamiento-terapeutico/grupal",
    },
  ],
};

/** Servicios de cada clínica para el desplegable del header. */
const servicesByLocation: NavGroup[] = locations.map((location) => ({
  label: location.shortName,
  href: `/sedes/${location.slug}`,
  items: featuredServices[location.slug] ?? [],
}));

/**
 * Primary header navigation.
 *
 * Sedes va la primera: el sitio posiciona cada clínica por separado y el menú
 * tiene que dejar clara esa diferenciación desde el primer vistazo.
 */
export const mainNav: NavItem[] = [
  {
    label: "Sedes",
    href: "/sedes",
    children: locations.map((l) => ({
      label: l.shortName,
      href: `/sedes/${l.slug}`,
    })),
  },
  {
    label: "Servicios",
    href: "/servicios",
    groups: servicesByLocation,
    footer: { label: "Ver todos los servicios", href: "/servicios" },
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
  { label: "Profesionales", href: "/profesionales" },
  { label: "Sobre nosotros", href: "/sobre-nosotros" },
  { label: "Blog", href: "/blog" },
];
