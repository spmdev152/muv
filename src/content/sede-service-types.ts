/**
 * Contrato de contenido de las páginas de servicio por sede,
 * `/sedes/<sede>/<servicio>` (#29).
 *
 * Cada página sale de su PDF de maquetación de la fase 2
 * (`docs/contenidos/MUV-WEB-<SEDE>-*.pdf`, issues #39–#46). Los ocho comparten
 * la misma estructura de diez módulos: hero con «Lo esencial», seis módulos de
 * contenido, «cuándo consultar antes con su médico», preguntas frecuentes y
 * «dónde estamos». La plantilla es común y solo cambia el contenido.
 *
 * Lo que el PDF marca en rojo (dato pendiente de MUV) no está aquí: no se
 * publica, ni se rellena con algo parecido.
 */

/**
 * Texto con tres marcas mínimas, las mismas que trae el PDF: `**negrita**`,
 * `*cursiva*` y `[enlace](/ruta)`. Lo pinta `RichText`.
 */
export type Rich = string;

export type ServiceBlock =
  | { type: "p"; text: Rich }
  | { type: "list"; items: Rich[] }
  /** Tabla real, no imagen: así lo piden las notas de maquetación. */
  | { type: "table"; head: [string, string]; rows: [Rich, Rich][] };

/** Un H3 con su contenido. */
export type ServiceSubsection = {
  title: string;
  blocks: ServiceBlock[];
};

/** Uno de los módulos 2 a 8: un H2 con entradilla y, si los hay, sus H3. */
export type ServiceSection = {
  /** Ancla del módulo, para enlazarlo desde las páginas hermanas. */
  id: string;
  eyebrow?: string;
  title: string;
  intro: ServiceBlock[];
  subsections: ServiceSubsection[];
};

export type SedeServiceContent = {
  /** Slug de la sede en `locations.ts`. */
  location: string;
  /** Segmento final de la ruta. */
  slug: string;
  /** Nombre del servicio en el menú y en las migas: el título de su documento. */
  label: string;
  /** PDF del que sale el texto, para quien tenga que actualizarlo. */
  source: string;
  /** `title` y meta definitivos de la ficha: se publican con `rawTitle`. */
  meta: { title: string; description: string };
  /** Módulo 1. */
  hero: {
    title: string;
    lede: Rich;
    /** La caja «Lo esencial»: 3–4 viñetas bajo el titular. */
    essentials: Rich[];
  };
  /** Módulos 2 a 8. */
  sections: ServiceSection[];
  /** Módulo 9: las 8 preguntas, todas con respuesta publicada (`FAQPage`). */
  faq: {
    id: string;
    eyebrow: string;
    title: string;
    items: { question: string; answer: Rich }[];
  };
  /** Módulo 10. La dirección es idéntica a la de la página de sede (NAP). */
  contact: {
    id: string;
    title: string;
    details: Rich[];
    directions: Rich;
    /** Texto del botón de cita, que abre el selector de sede. */
    cta: string;
  };
  /** «Fuentes», al pie y en letra pequeña, con enlace a PubMed. */
  sources: Rich[];
};
