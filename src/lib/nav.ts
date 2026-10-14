/**
 * Navegación principal del header.
 *
 * Vive aparte de `site.ts` porque lee la copy de las sedes: solo la importa el
 * layout, que es de servidor, y el Header la recibe ya resuelta por props. Si
 * la importara el Header, las dos copias completas de sede viajarían en el
 * bundle de cliente de todas las páginas.
 */

import { locations } from "@/lib/locations";
import type { SedeContent } from "@/content/sede-types";
import { elCanaveral } from "@/content/sede-el-canaveral";
import { tresCantos } from "@/content/sede-tres-cantos";

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

const SEDE_CONTENT: Record<string, SedeContent> = {
  "el-canaveral": elCanaveral,
  "tres-cantos": tresCantos,
};

/**
 * Servicios de cada clínica para el desplegable del header.
 *
 * Son las tarjetas del módulo 3 de cada página de sede, la copy aprobada en
 * `docs/contenidos/sede-*.md`: el catálogo de esa clínica, con sus nombres y en
 * su orden, ni uno más. Los servicios compartidos aparecen en las dos columnas.
 * ATM entra porque el catálogo aprobado lo cuenta como servicio de las dos
 * sedes, y enlaza a su página de dolencia, que es la que existe.
 */
const servicesByLocation: NavGroup[] = locations.map((location) => ({
  label: location.shortName,
  href: `/sedes/${location.slug}`,
  items: (SEDE_CONTENT[location.slug]?.services.items ?? []).map(
    ({ label, href }) => ({ label, href }),
  ),
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
