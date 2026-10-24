/**
 * Navegación principal del header.
 *
 * Vive aparte de `site.ts` porque lee el contenido de las páginas de servicio:
 * solo la importa el layout, que es de servidor, y el Header la recibe ya
 * resuelta por props. Así ese contenido no viaja en el bundle de cliente.
 */

import { locations } from "@/lib/locations";
import { sedeServicePath, sedeServices } from "@/content/sede-services";

export type NavLink = {
  label: string;
  href: string;
  /** Nombre accesible cuando la etiqueta visible se repite en otro grupo. */
  ariaLabel?: string;
};

/**
 * Grupo de un desplegable: en Servicios, uno por clínica y «Más servicios».
 * Sin `href`, la cabecera no es un enlace.
 */
export type NavGroup = { label: string; href?: string; items: NavLink[] };

export type NavItem = NavLink & {
  children?: NavLink[];
  /** Desplegable en columnas con cabecera propia (sustituye a `children`). */
  groups?: NavGroup[];
  /** Enlace al pie del desplegable agrupado. */
  footer?: NavLink;
};

/**
 * Servicios de cada clínica para el desplegable del header y las columnas del
 * pie: sus cuatro páginas
 * `/sedes/<sede>/<servicio>` (#29), con el nombre y el orden de sus documentos
 * de la fase 2 (issues #39–#46). Solo se listan elementos con enlace (#30).
 *
 * Un servicio que tiene página en las dos clínicas (entrenamiento funcional)
 * lleva la sede al final de su nombre accesible, para que un lector de
 * pantalla y un buscador no vean dos enlaces equivalentes (#30, 6/10). El
 * nombre accesible empieza por la etiqueta visible; visualmente basta con el
 * grupo.
 */
export const servicesByLocation = locations.map((location) => ({
  label: location.shortName,
  href: `/sedes/${location.slug}`,
  items: (sedeServices[location.slug] ?? []).map((service): NavLink => {
    const repeated = Object.entries(sedeServices).some(
      ([slug, services]) =>
        slug !== location.slug &&
        services.some((other) => other.slug === service.slug),
    );
    return {
      label: service.label,
      href: sedeServicePath(service),
      ariaLabel: repeated
        ? `${service.label} en ${location.shortName}`
        : undefined,
    };
  }),
})) satisfies NavGroup[];

/**
 * Tercera columna del desplegable de Servicios (#30, reabierta el 15/10): el
 * resto del catálogo, sin página propia, a sus anclas fijas de `/servicios`.
 * «Embarazo y postparto» va directo al módulo de la página de suelo pélvico,
 * que lo desarrolla. La cabecera no es un enlace.
 */
const moreServices: NavGroup = {
  label: "Más servicios",
  items: [
    { label: "ATM", href: "/servicios#atm" },
    { label: "Fisioterapia pediátrica", href: "/servicios#fisioterapia-pediatrica" },
    { label: "Tratamiento de cicatrices", href: "/servicios#tratamiento-cicatrices" },
    { label: "Neuromodulación", href: "/servicios#neuromodulacion" },
    { label: "Diatermia", href: "/servicios#diatermia" },
    {
      label: "Embarazo y postparto",
      href: "/sedes/el-canaveral/suelo-pelvico#embarazo-y-postparto",
    },
  ],
};

/**
 * Primary header navigation.
 *
 * Sedes va la primera: el sitio posiciona cada clínica por separado y el menú
 * tiene que dejar clara esa diferenciación desde el primer vistazo.
 *
 * Sin «Dolencias y lesiones» (#30): los enlaces del menú están en todas las
 * páginas y se reservan para las que tienen que posicionar. La dolencia ya se
 * cubre dentro de las páginas de sede y de servicio.
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
    groups: [...servicesByLocation, moreServices],
    footer: { label: "Ver todos los servicios", href: "/servicios" },
  },
  { label: "Profesionales", href: "/profesionales" },
  { label: "Sobre nosotros", href: "/sobre-nosotros" },
  { label: "Blog", href: "/blog" },
];
