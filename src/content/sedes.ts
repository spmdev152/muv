/**
 * Copy aprobada de `/sedes`.
 *
 * Fuente: `docs/contenidos/sedes.md` (versión 14). Ese documento manda sobre el
 * código: no editar nada de aquí sin actualizarlo antes.
 *
 * Qué defiende esta página, y qué tiene prohibido: defiende el conjunto de
 * clínicas y los datos prácticos; tiene prohibido el municipio formulado como
 * búsqueda, que se reserva a `/sedes/<sede>`. Los nombres de las clínicas van
 * como H3 porque son nombres propios de entidad, no consultas.
 *
 * Trato de usted, voz «En MUV…», sin precios. Lo pendiente de MUV se marca con
 * `PENDIENTE MUV:` y no se maqueta, no se rellena con algo parecido y no se
 * inventa.
 */

export const meta = {
  /** 57 caracteres. */
  title: "Nuestras clínicas de fisioterapia en Madrid | Clínica MUV",
  /** 144 caracteres. */
  description:
    "Dos clínicas de fisioterapia en Madrid: El Cañaveral y Tres Cantos. Consulte qué servicios se prestan en cada una, horarios y datos de contacto.",
} as const;

/** Módulo 1 · Hero */
export const hero = {
  title: "Clínicas de fisioterapia en Madrid: dos sedes, un mismo método",
  lede: "En MUV atendemos en El Cañaveral (Vicálvaro) y en Tres Cantos. Elija la clínica que elija, el proceso es el mismo: valoramos antes de tratar, fijamos objetivos concretos y revisamos el plan según evoluciona. Lo que cambia de una a otra es el espacio, el equipamiento y los tratamientos disponibles.",
  secondaryCta: { label: "Ver los servicios", href: "/servicios" },
  textLink: { label: "Cómo trabajamos", href: "/sobre-nosotros/metodologia" },
} as const;

/**
 * Módulo 2 · Las dos clínicas
 *
 * Las descripciones de una línea no repiten las de la home: allí describen la
 * cartera de servicios, aquí describen el espacio.
 *
 * PENDIENTE MUV: zona de atención de cada clínica. La que había —«El Cañaveral,
 * Vicálvaro y el este de Madrid» y «Tres Cantos, Soto de Viñuelas y Colmenar
 * Viejo»— se dedujo por proximidad en un mapa y no la facilitó MUV.
 *
 * PENDIENTE MUV: el teléfono de cada clínica. Cuatro fuentes públicas
 * contradicen a `locations.ts`, así que las fichas van sin teléfono.
 */
export const clinics = {
  eyebrow: "Dónde estamos",
  title: "Direcciones, horarios y contacto de cada clínica",
  cards: {
    "el-canaveral": {
      heading: "MUV El Cañaveral",
      address: "C. Victoria Kent, Local 8 · 28052 Madrid",
      hours:
        "Lunes a viernes, 10:00–14:00 y 16:00–22:00 · Sábados, 10:00–14:00",
      registry: "CS 17623",
      facilities:
        "Boxes individuales, sala de Pilates con máquinas y zona de entrenamiento funcional.",
      ctaLabel: "Ver la clínica de fisioterapia de El Cañaveral",
      imageAlt:
        "Fachada de la clínica MUV El Cañaveral en la calle Victoria Kent",
    },
    "tres-cantos": {
      heading: "MUV Tres Cantos",
      address: "Av. de Madrid, 19, Local 5 · 28760 Tres Cantos",
      hours:
        "Lunes a viernes, 10:00–14:00 y 16:00–22:00 · Sábados, 10:00–14:00",
      // PENDIENTE MUV: número de registro sanitario de Tres Cantos.
      registry: undefined,
      facilities:
        "Sala de tratamiento y zona de ejercicio para trabajo individual y en grupo reducido.",
      ctaLabel: "Ver la clínica de fisioterapia de Tres Cantos",
      imageAlt:
        "Recepción de la clínica MUV Tres Cantos en la avenida de Madrid",
    },
  },
} as const;

/**
 * Módulo 3 · Tabla de disponibilidad
 *
 * Es el único contenido de la página que ningún competidor puede replicar: en
 * Tres Cantos y en El Cañaveral no hay una sola clínica con dos sedes. Va como
 * texto rastreable, nunca como imagen.
 *
 * Cada nombre enlaza a su página. ATM es la única fila sin página de servicio
 * propia: es una dolencia, y enlaza a `/dolencias-y-lesiones/atm`.
 */
export const availability = {
  eyebrow: "Servicios por clínica",
  title: "Servicios de fisioterapia disponibles en cada clínica",
  caption:
    "Disponibilidad de cada servicio de fisioterapia en las clínicas de MUV en El Cañaveral y en Tres Cantos.",
  columns: ["El Cañaveral", "Tres Cantos"],
  rows: [
    { label: "Fisioterapia", href: "/servicios/fisioterapia", at: [true, true] },
    { label: "Fisioterapia deportiva", href: "/servicios/fisioterapia-deportiva", at: [true, true] },
    { label: "Entrenamiento terapéutico individual", href: "/servicios/entrenamiento-terapeutico/individual", at: [true, true] },
    { label: "Entrenamiento terapéutico en grupo", href: "/servicios/entrenamiento-terapeutico/grupal", at: [false, true] },
    { label: "Neuromodulación", href: "/servicios/neuromodulacion", at: [true, true] },
    { label: "ATM", note: "articulación temporomandibular", href: "/dolencias-y-lesiones/atm", at: [true, true] },
    { label: "Pilates terapéutico", href: "/servicios/pilates-terapeutico", at: [true, false] },
    { label: "Diatermia", href: "/servicios/diatermia", at: [true, false] },
    { label: "Suelo pélvico", href: "/servicios/suelo-pelvico", at: [true, false] },
    { label: "Fisioterapia en el embarazo", href: "/servicios/fisioterapia-embarazo", at: [true, false] },
    { label: "Postparto", href: "/servicios/postparto", at: [true, false] },
    { label: "Fisioterapia pediátrica", href: "/servicios/fisioterapia-pediatrica", at: [true, false] },
    { label: "Tratamiento de cicatrices", href: "/servicios/tratamiento-cicatrices", at: [false, true] },
  ],
  note: {
    before: "Suelo pélvico, embarazo, postparto y pediatría se realizan en ",
    linkCanaveral: "El Cañaveral",
    middle: ". El entrenamiento en grupo y el tratamiento de cicatrices, en ",
    linkTresCantos: "Tres Cantos",
    after: ". Dígalo al pedir cita y le orientamos.",
  },
} as const;

/**
 * Módulo 4 · El respaldo de las dos clínicas
 *
 * Las opiniones se citan COMO TEXTO, nombrando la plataforma. Nunca como
 * `aggregateRating`: están recogidas en Doctoralia, no en la web de MUV, y
 * declararlas como propias expone el dominio a una acción manual.
 *
 * PENDIENTE MUV: número de registro de Tres Cantos. Cuando llegue, la frase
 * pasa a «Las dos clínicas están inscritas…, con los números X e Y».
 *
 * Del segundo punto se retiró «y el número de colegiado de cada profesional es
 * público en su ficha»: hoy esas fichas no llevan el número.
 */
export const backing = {
  eyebrow: "El mismo estándar",
  title: "Centro sanitario registrado y fisioterapeutas colegiados",
  points: [
    {
      title: "Centro sanitario registrado.",
      text: "MUV El Cañaveral está inscrita en el registro de centros sanitarios de la Comunidad de Madrid con el número CS 17623.",
    },
    {
      title: "Fisioterapeutas colegiados.",
      text: "Todo el equipo está colegiado.",
      href: "/profesionales",
    },
    {
      title: "Más de 1.800 opiniones verificadas.",
      text: "Entre las dos clínicas sumamos más de 1.800 valoraciones en Doctoralia, con una media de 5 sobre 5.",
    },
  ],
} as const;

/**
 * Módulo 5 · Preguntas frecuentes
 *
 * El documento define seis; se publican las tres que tienen respuesta.
 *
 * PENDIENTE MUV (1): «¿Qué ocurre si no puedo acudir a una cita?» — confirmar
 * el plazo de aviso y si hay penalización. Había una redacción propuesta, que
 * no se publica sin validar.
 *
 * PENDIENTE MUV (2): «¿Trabajan con seguros médicos o mutuas?» — sí o no, pero
 * con respuesta. Es bloqueante: el autocompletado de Google devuelve
 * «fisioterapia tres cantos adeslas / asisa / sanitas», o sea que es un
 * modificador de la keyword principal, y siete competidores la responden.
 *
 * PENDIENTE MUV (3): «¿Las clínicas son accesibles para personas con movilidad
 * reducida?» — acceso a pie de calle, escalones, ascensor y aseo adaptado.
 */
export const faqSection = {
  eyebrow: "Preguntas frecuentes",
  title: "Preguntas frecuentes sobre nuestras dos clínicas",
} as const;

export const faqs = [
  {
    question: "¿En qué se diferencian las dos clínicas?",
    answer:
      "MUV El Cañaveral reúne la cartera completa: incluye suelo pélvico, embarazo, postparto, pediatría, Pilates terapéutico y diatermia. MUV Tres Cantos se centra en lo musculoesquelético y deportivo, con entrenamiento terapéutico individual y en grupo. El detalle está en la tabla de esta página.",
  },
  {
    question: "¿Se puede pedir cita por internet en las dos clínicas?",
    answer:
      "Sí. Las dos tienen agenda en línea y puede reservar desde esta misma página. Si prefiere que le orientemos antes de elegir clínica, escríbanos.",
  },
  {
    question: "¿Qué debo llevar a la primera cita?",
    answer:
      "Ropa cómoda, porque la valoración incluye explorar cómo se mueve, y cualquier informe o prueba de imagen relacionada con su caso, si dispone de ellos.",
  },
] as const;

/** Módulo 6 · CTA */
export const cta = {
  title: "Pida cita en su clínica de fisioterapia MUV",
  description:
    "Reserve la primera valoración en la clínica que prefiera. Si tiene dudas sobre cuál le corresponde, escríbanos y se lo indicamos.",
} as const;
