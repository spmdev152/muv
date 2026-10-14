/**
 * Navegación principal del header.
 *
 * Vive aparte de `site.ts` porque lee el contenido de las páginas de servicio:
 * solo la importa el layout, que es de servidor, y el Header la recibe ya
 * resuelta por props. Así ese contenido no viaja en el bundle de cliente.
 */

import { locations } from "@/lib/locations";
import { sedeServicePath, sedeServices } from "@/content/sede-services";

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
 * Servicios de cada clínica para el desplegable del header: sus cuatro páginas
 * `/sedes/<sede>/<servicio>` (#29), con el nombre y el orden de sus documentos
 * de la fase 2 (issues #39–#46). Solo se listan elementos con enlace (#30).
 */
const servicesByLocation: NavGroup[] = locations.map((location) => ({
  label: location.shortName,
  href: `/sedes/${location.slug}`,
  items: (sedeServices[location.slug] ?? []).map((service) => ({
    label: service.label,
    href: sedeServicePath(service),
  })),
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
