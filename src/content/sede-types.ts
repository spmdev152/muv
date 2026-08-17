/**
 * Forma común de las dos páginas de sede.
 *
 * `sede-el-canaveral.md` y `sede-tres-cantos.md` son documentos gemelos: mismos
 * diez módulos, misma numeración y mismos eyebrows. Por eso las dos páginas se
 * generan con una sola plantilla, `src/app/sedes/[location]/page.tsx`, y lo
 * único que cambia es el contenido.
 *
 * Un campo sin definir significa «pendiente de MUV»: ese bloque no se maqueta.
 */

/** Un párrafo con un arranque destacado opcional. */
export type Paragraph = { lead?: string; text: string };

export type SedeContent = {
  meta: { title: string; description: string };

  /** Módulo 1 · Hero */
  hero: {
    title: string;
    lede: string;
    /** Franja de tres columnas bajo el titular. */
    strip: { label: string; value: string }[];
    address: string;
    imageAlt: string;
  };

  /** Módulo 2 · Qué tratamos */
  treats: {
    eyebrow: string;
    title: string;
    lede: string;
    items: { title: string; href?: string; paragraphs: Paragraph[] }[];
    closing: Paragraph;
  };

  /** Módulo 3 · Servicios de esta clínica */
  services: {
    eyebrow: string;
    title: string;
    items: { label: string; href: string; text: string }[];
    /** Deriva a la otra sede los servicios que aquí no se prestan. */
    note: { before: string; linkLabel: string; href: string; after: string };
    cta: { label: string; href: string };
  };

  /** Módulo 4 · La primera visita */
  firstVisit: {
    eyebrow: string;
    title: string;
    steps: { title: string; text: string }[];
  };

  /** Módulo 5 · Equipo y acreditación */
  team: {
    eyebrow: string;
    title: string;
    lede: string;
    /** Las fichas del equipo esperan dato de MUV: no hay campo para ellas. */
    accreditation: { label: string; value: string }[];
  };

  /** Módulo 6 · Instalaciones */
  facilities: {
    eyebrow: string;
    title: string;
    text: string;
    /** Un ALT por foto, distinto: seis iguales valdrían lo que una. */
    galleryAlt: string[];
  };

  /** Módulo 7 · Opiniones */
  reviews: {
    eyebrow: string;
    title: string;
    text: string;
  };

  /** Módulo 8 · Cómo llegar */
  directions: {
    eyebrow: string;
    title: string;
    facts: { label: string; value: string }[];
    hoursHeading: string;
    /** Sin definir = la hora de cierre está en disputa y no se publica. */
    hoursText?: string;
    bookingNote: string;
    mapAlt: string;
  };

  /** Módulo 9 · Preguntas frecuentes */
  faqSection: { eyebrow: string; title: string };
  faqs: { question: string; answer: string }[];

  /** Módulo 10 · CTA */
  cta: { title: string; description: string };
};
