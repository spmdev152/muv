/**
 * Copy aprobada de la home.
 *
 * Fuente: `docs/contenidos/home.md` (versión 8, 14 de agosto de 2026).
 * Ese documento manda sobre el código: no editar nada de aquí sin actualizarlo
 * antes. Los módulos se numeran igual que en el documento.
 *
 * Convenciones que aplican a todo el fichero (README de `docs/contenidos`):
 * trato de usted, voz «En MUV…», al lector no se le llama «paciente» ni
 * «cliente», no se publican precios y no se escribe copy que no esté en el
 * documento.
 *
 * Lo pendiente de MUV se marca con `PENDIENTE MUV:` y NO se maqueta, no se
 * rellena con algo parecido y no se inventa.
 */

/** Metadatos de la página. */
export const meta = {
  /** 60 caracteres. Se publica literal, sin la plantilla «· MUV» del layout. */
  title: "Clínica MUV | Fisioterapia y ejercicio terapéutico en Madrid",
  /** 149 caracteres. */
  description:
    "Clínica de fisioterapia, fisioterapia deportiva y ejercicio terapéutico en El Cañaveral y Tres Cantos. Centro sanitario registrado. Pida cita en MUV.",
} as const;

/**
 * Módulo 1 · HomeHero
 *
 * El H1 va partido en dos para la animación del hero, pero es una sola frase:
 * «Valoramos antes de tratar. Fisioterapia y ejercicio terapéutico en Madrid.»
 * La marca sale del H1 a propósito: ya está en el logo, en el title, en el
 * `name` del schema y en tres H2.
 */
export const hero = {
  // Una sola frase, partida solo para poner en itálica la entidad destacada.
  // Concatenados los tres fragmentos dan el H1 literal del documento.
  h1: {
    before: "Valoramos antes de tratar. ",
    accent: "Fisioterapia y ejercicio terapéutico",
    after: " en Madrid.",
  },
  lede: "Combinamos fisioterapia, terapia manual y ejercicio terapéutico según lo que necesita cada caso, siempre a partir de una valoración clínica. Dos clínicas en El Cañaveral y Tres Cantos.",
  secondaryCta: { label: "Ver nuestros servicios", href: "/servicios" },
  // La figura del hero no lleva texto alternativo: es un fotograma decorativo
  // de la columna 3D, no aporta nada que no digan ya el H1 y el lede. La foto
  // de consulta sigue en uso como imagen OpenGraph de la home (`page.tsx`).
} as const;

/**
 * Módulo 2 · Franja de confianza
 *
 * Tira compacta sin titular. Es el único bloque que aporta señales E-E-A-T en
 * toda la home.
 *
 * PENDIENTE MUV (1/3): años de recorrido. El documento retiró «Más de 5 años
 * atendiendo en la Comunidad de Madrid» por no tener fuente. La cuarta columna
 * no se renderiza hasta que MUV dé la cifra.
 *
 * PENDIENTE MUV (2/3): número de registro sanitario de Tres Cantos. El
 * CS 17623 sí está confirmado y se publica; cuando llegue el segundo, entra en
 * la misma columna.
 */
export type TrustItem = {
  label: string;
  value: string;
  href?: string;
  /** Dominio externo: se abre en pestaña nueva. */
  external?: boolean;
};

export const trust: TrustItem[] = [
  {
    label: "Centro sanitario registrado",
    value: "CS 17623",
    // Registro de centros, servicios y establecimientos sanitarios de la
    // Comunidad de Madrid — el de RD 1277/2003, donde se comprueba que un
    // centro está autorizado. Es un buscador, no la ficha directa de MUV.
    // PENDIENTE MUV: la URL de su propia ficha en el registro, si la tienen.
    href: "https://www.comunidad.madrid/servicios/salud/registro-centros-servicios-establecimientos-sanitarios",
    external: true,
  },
  {
    label: "Equipo colegiado",
    // El documento lo escribe en minúscula; se sube a mayúscula para igualar
    // a las otras dos columnas de la franja, que empiezan por «CS» y por «El».
    value: "Fisioterapeutas con número de colegiado público",
    href: "/profesionales",
  },
  {
    label: "Dos clínicas",
    value: "El Cañaveral y Tres Cantos",
    href: "/sedes",
  },
];

/** Módulo 3 · Pilares */
export const pillars = {
  eyebrow: "Nuestra forma de trabajar",
  title: "Una clínica de fisioterapia eficaz, eficiente y empática",
  items: [
    {
      title: "Eficaces",
      text: "Buscamos el origen del problema con una valoración fisioterápica rigurosa y tratamientos respaldados por la evidencia disponible.",
    },
    {
      title: "Eficientes",
      text: "Elegimos las técnicas y la tecnología que tienen sentido en cada fase, no todas las que tenemos.",
    },
    {
      title: "Empáticos",
      text: "Le explicamos qué observamos y por qué proponemos cada abordaje. Entender el propio proceso forma parte del tratamiento.",
    },
  ],
} as const;

/**
 * Módulo 4 · Servicios destacados
 *
 * Criterio de selección del documento: los cuatro priorizados por MUV en la
 * oleada 2 (fisioterapia, deportiva, suelo pélvico y entrenamiento
 * terapéutico) más neuromodulación y Pilates, los dos diferenciadores de
 * equipamiento.
 *
 * `title` viene del documento, no del frontmatter: manda la copy aprobada.
 * La imagen sí se resuelve del `.mdx` para no duplicar rutas.
 *
 * `availability` se escribe literal a propósito. El README documenta que
 * `priorityServices` de `locations.ts` declara servicios que Tres Cantos no
 * presta, así que derivarla hoy publicaría un catálogo falso. La tabla buena
 * (13 servicios × 2 clínicas) llega con `docs/contenidos/sedes.md`.
 */
export const services = {
  eyebrow: "Servicios",
  title: "Servicios de fisioterapia y ejercicio terapéutico",
  description:
    "Trabajamos la fisioterapia musculoesquelética y deportiva, el ejercicio pautado y las técnicas específicas que cada proceso requiere.",
  cta: { label: "Ver todos los servicios", href: "/servicios" },
  items: [
    {
      slug: "fisioterapia",
      title: "Fisioterapia",
      text: "Valoración y tratamiento manual e instrumental para recuperar el movimiento.",
      availability: "Ambas sedes",
      imageAlt: "Valoración fisioterápica de la movilidad del hombro en camilla",
    },
    {
      slug: "fisioterapia-deportiva",
      title: "Fisioterapia deportiva",
      text: "Recuperación y readaptación al gesto deportivo, del aficionado al federado.",
      availability: "Ambas sedes",
      imageAlt:
        "Readaptación al gesto deportivo en la sala de entrenamiento de MUV",
    },
    {
      slug: "entrenamiento-terapeutico",
      title: "Entrenamiento terapéutico",
      text: "Ejercicio pautado y supervisado por fisioterapeutas, individual o en grupo.",
      availability: "Ambas sedes · grupal solo en Tres Cantos",
      imageAlt:
        "Sesión de ejercicio terapéutico supervisada por un fisioterapeuta",
    },
    {
      slug: "neuromodulacion",
      title: "Neuromodulación",
      text: "Tecnología ecoguiada para modular el sistema nervioso en el dolor persistente.",
      availability: "Ambas sedes",
      imageAlt: "Aplicación de neuromodulación ecoguiada en la clínica",
    },
    {
      slug: "suelo-pelvico",
      title: "Suelo pélvico",
      text: "Prevención y tratamiento de las disfunciones del suelo pélvico.",
      availability: "Solo El Cañaveral",
      imageAlt: "Consulta de fisioterapia de suelo pélvico en MUV El Cañaveral",
    },
    {
      slug: "pilates-terapeutico",
      title: "Pilates terapéutico",
      text: "Control, estabilidad y conciencia corporal con enfoque clínico.",
      availability: "Solo El Cañaveral",
      imageAlt:
        "Ejercicio de Pilates terapéutico con máquina en MUV El Cañaveral",
    },
  ],
} as const;

/**
 * Módulo 5 · Dolencias y lesiones
 *
 * Son las cuatro que existen en `content/conditions/`, en el orden del
 * documento, que no es el `order` del frontmatter. El título de la cuarta es
 * «ATM» y no «ATM (articulación temporomandibular)»: manda el documento.
 */
export const conditions = {
  eyebrow: "Dolencias y lesiones",
  title: "Dolencias y lesiones que tratamos",
  description:
    "Si no sabe qué servicio necesita, empiece por lo que le pasa. Valoramos el origen de la molestia y le proponemos el abordaje desde ahí.",
  cta: { label: "Ver todas las dolencias", href: "/dolencias-y-lesiones" },
  items: [
    {
      slug: "dolor-espalda",
      title: "Dolor de espalda",
      text: "Dolor lumbar, cervical o dorsal, reciente o de larga evolución.",
      imageAlt: "Exploración de la columna lumbar en consulta de fisioterapia",
    },
    {
      slug: "lesion-rodilla",
      title: "Lesión de rodilla",
      text: "Dolor y limitación de rodilla, con readaptación progresiva a su actividad.",
      imageAlt: "Valoración de la movilidad de la rodilla en camilla",
    },
    {
      slug: "lesion-hombro",
      title: "Lesión de hombro",
      text: "Dolor de hombro y pérdida de movilidad o de fuerza.",
      imageAlt: "Exploración del hombro por un fisioterapeuta de MUV",
    },
    {
      slug: "atm",
      title: "ATM",
      text: "Dolor mandibular, chasquidos y limitación al abrir la boca.",
      imageAlt:
        "Tratamiento de la articulación temporomandibular en consulta",
    },
  ],
} as const;

/** Módulo 6 · Metodología */
export const method = {
  eyebrow: "Metodología MUV",
  title: "Cómo trabajamos: de la valoración fisioterápica al alta",
  imageAlt: "Equipo de fisioterapeutas de Clínica MUV en consulta",
  cta: {
    label: "Conocer nuestra metodología",
    href: "/sobre-nosotros/metodologia",
  },
  steps: [
    {
      n: "01",
      title: "Valoración",
      text: "Exploramos el movimiento y la función, y fijamos un punto de partida medible.",
    },
    {
      n: "02",
      title: "Plan de tratamiento",
      text: "Objetivos concretos y las herramientas adecuadas para su caso, no un protocolo cerrado.",
    },
    {
      n: "03",
      title: "Tratamiento",
      text: "Terapia manual, técnicas específicas y ejercicio terapéutico, ajustados según evoluciona.",
    },
    {
      n: "04",
      title: "Alta y prevención",
      text: "Pautas para sostener lo conseguido y reducir el riesgo de recaída.",
    },
  ],
} as const;

/**
 * Módulo 7 · Sedes
 *
 * La dirección y el horario se copian tal cual: es NAP y tiene que coincidir
 * carácter a carácter con Google Business Profile y con Doctoralia.
 *
 * PENDIENTE MUV (3/3): los teléfonos no se publican aquí. El número del
 * repositorio y el de Doctoralia no coinciden en ninguna de las dos sedes.
 */
export const locationsSection = {
  eyebrow: "Sedes",
  title: "Nuestras clínicas de fisioterapia en El Cañaveral y Tres Cantos",
  description:
    "Cada clínica tiene su equipo y su cartera de servicios. En su página encontrará los tratamientos disponibles allí, quién le atiende y cómo llegar.",
  cards: {
    "el-canaveral": {
      blurb:
        "Nuestra cartera más amplia: fisioterapia general y deportiva, entrenamiento terapéutico, Pilates, diatermia, neuromodulación y las áreas de suelo pélvico, embarazo, postparto y pediatría.",
      address: "C. Victoria Kent, Local 8 · 28052 Madrid (Vicálvaro)",
      hours:
        "Lunes a viernes, 10:00–14:00 y 16:00–22:00 · Sábados, 10:00–14:00",
      ctaLabel: "Ver MUV El Cañaveral",
      imageAlt: "Interior de la clínica MUV El Cañaveral, en Vicálvaro",
    },
    "tres-cantos": {
      blurb:
        "Enfoque musculoesquelético y deportivo con progresión mediante ejercicio: fisioterapia general y deportiva, entrenamiento terapéutico individual y grupal, neuromodulación y tratamiento de cicatrices.",
      address: "Av. de Madrid, 19, Local 5 · 28760 Tres Cantos",
      hours:
        "Lunes a viernes, 10:00–14:00 y 16:00–22:00 · Sábados, 10:00–14:00",
      ctaLabel: "Ver MUV Tres Cantos",
      imageAlt: "Interior de la clínica MUV Tres Cantos",
    },
  },
} as const;

/**
 * Módulo 8 · Testimonios — NO SE RENDERIZA.
 *
 * PENDIENTE MUV: tres testimonios reales anonimizados. En el bloque 1 del
 * documento de arranque MUV los marcó como «sí, anonimizados». No se inventan.
 * El módulo entero espera al dato, así que no hay sección en `page.tsx`.
 *
 * Aviso del documento: los testimonios del boceto anterior atribuían embarazo y
 * postparto a Tres Cantos, sede donde no se prestan. No reutilizarlos.
 *
 * Cuando lleguen: eyebrow «Opiniones», H2 «Opiniones sobre Clínica MUV».
 */
export const testimonials = {
  eyebrow: "Opiniones",
  title: "Opiniones sobre Clínica MUV",
} as const;

/**
 * Módulo 9 · Preguntas frecuentes
 *
 * Se marcan con `FAQPage`, y el schema lleva exactamente las mismas preguntas
 * que se ven en la página: nunca una pregunta sin respuesta publicada.
 *
 * PENDIENTE MUV: «¿Cuánto dura la primera sesión de fisioterapia?». Es una de
 * las preguntas más repetidas del sector —4 de 4 clínicas del estudio y 3 de 3
 * competidores directos la responden—, así que hay que contestarla, pero con el
 * dato real. La cifra que había escrita («unos 50 minutos») se dedujo y no
 * procede de ninguna fuente de MUV. Entra como segunda pregunta.
 *
 * Otro pendiente, de la quinta: si MUV trabaja con mutuas o seguros médicos.
 * Si la respuesta es sí, entra como séptima pregunta.
 */
export const faqs = [
  {
    question: "¿Necesito una derivación médica para ir al fisioterapeuta?",
    answer:
      "No. Puede pedir cita directamente y empezaremos por una valoración fisioterápica completa. Si detectamos que su caso requiere otra valoración sanitaria, se lo indicaremos.",
  },
  {
    question: "¿Qué diferencia hay entre fisioterapia y ejercicio terapéutico?",
    answer:
      "La fisioterapia abarca la valoración y el tratamiento manual e instrumental. El ejercicio terapéutico es ejercicio pautado y supervisado para recuperar fuerza, movilidad y tolerancia a la carga. En la mayoría de procesos se combinan.",
  },
  {
    // Seguía «tras la valoración inicial le daremos un rango orientativo y lo
    // revisaremos según evolucione». Retirado: compromete un entregable
    // concreto de la primera sesión que MUV no ha confirmado.
    question: "¿Cuántas sesiones de fisioterapia voy a necesitar?",
    answer:
      "Depende del caso, del tiempo de evolución y del objetivo. No cerramos un número antes de explorar.",
  },
  {
    question: "¿Están todos los servicios en las dos clínicas?",
    answer:
      "No. Cada sede tiene su propia cartera y cada servicio indica dónde se presta. Puede compararlas en la página de sedes.",
  },
  {
    question: "¿Abren los sábados?",
    answer:
      "Sí. Las dos clínicas abren de lunes a viernes de 10:00 a 14:00 y de 16:00 a 22:00, y los sábados de 10:00 a 14:00.",
  },
] as const;

export const faqSection = {
  eyebrow: "Preguntas frecuentes",
  title: "Preguntas frecuentes sobre fisioterapia en MUV",
} as const;

/**
 * Módulo 10 · Blog
 *
 * Las tres últimas entradas son contenido dinámico y no requieren copy fija.
 * «lo firma un fisioterapeuta de MUV» enlaza con `/politica-editorial`: es
 * señal E-E-A-T directa en un sitio YMYL.
 */
export const blog = {
  eyebrow: "Blog",
  title: "Divulgación de fisioterapia escrita por nuestro equipo",
  description: {
    before:
      "Explicamos lesiones, tratamientos y dudas frecuentes con criterio clínico y sin atajos. Todo lo que publicamos ",
    link: "lo firma un fisioterapeuta de MUV",
    href: "/politica-editorial",
    after: ".",
  },
  cta: { label: "Ver todas las entradas", href: "/blog" },
} as const;

/**
 * Módulo 11 · CTASection
 *
 * `CTASection` recibe siempre `title` y `description` desde la página: dejar
 * los valores por defecto lo convierte en contenido duplicado de todo el sitio.
 */
export const cta = {
  title: "Pida cita en El Cañaveral o en Tres Cantos",
  description:
    "Reserve una primera valoración y definiremos con usted un plan de tratamiento adaptado a su caso.",
} as const;
