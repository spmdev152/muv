/**
 * Copy aprobada de `/sedes/el-canaveral`.
 *
 * Fuente: `docs/contenidos/sede-el-canaveral.md` (versión 2). Ese documento
 * manda sobre el código: no editar nada de aquí sin actualizarlo antes.
 *
 * Esta página defiende «fisioterapia El Cañaveral» y tiene prohibido repetir el
 * discurso genérico de marca, que ya hace la home. Hoy ese primer puesto lo
 * ostenta la portada del sitio actual: esta página no se escribe para ganarlo,
 * se escribe para heredarlo sin soltarlo por el camino.
 *
 * Encabezados reservados a esta página: «Fisioterapia en El Cañaveral»,
 * «Cómo llegar a nuestra clínica de El Cañaveral» y «Nuestro equipo de
 * fisioterapeutas en El Cañaveral». No los puede usar ninguna otra.
 */

import type { SedeContent } from "@/content/sede-types";

export const elCanaveral: SedeContent = {
  meta: {
    /** 57 caracteres. */
    title: "Fisioterapia en El Cañaveral, Madrid: suelo pélvico | MUV",
    /** 152 caracteres. */
    description:
      "Clínica de fisioterapia en El Cañaveral (Vicálvaro, Madrid): valoramos antes de tratar. Suelo pélvico, embarazo, pediatría y Pilates. Centro registrado.",
  },

  hero: {
    title:
      "Fisioterapia en El Cañaveral, Madrid: valoración, tratamiento y ejercicio terapéutico",
    lede: "En MUV El Cañaveral tratamos el dolor y la lesión musculoesquelética y deportiva, y además reunimos las áreas que no están en nuestra otra clínica: suelo pélvico, embarazo, postparto, fisioterapia pediátrica, Pilates terapéutico y diatermia. Empezamos siempre por una valoración: primero entendemos de dónde viene la molestia y después decidimos el tratamiento.",
    // Franja de garantías. La columna del horario va sin hora de cierre: el
    // perfil de Google de esta clínica publica 21:00 y la web publica 22:00.
    // PENDIENTE MUV: la hora de cierre.
    strip: [
      {
        label: "Centro sanitario registrado",
        value:
          "Inscrito en el registro de centros sanitarios de la Comunidad de Madrid con el número CS 17623.",
      },
      {
        label: "Horario de mañana y tarde",
        value: "De lunes a viernes y también los sábados por la mañana.",
      },
      { label: "Cita online", value: "Reserve día y hora sin llamar." },
    ],
    address: "C. Victoria Kent, Local 8 · 28052 Madrid (El Cañaveral, distrito de Vicálvaro)",
    // PENDIENTE MUV: zona de atención. La que había —El Cañaveral, Vicálvaro y
    // el este de Madrid— se dedujo mirando un mapa. Aquí importa más que en
    // Tres Cantos porque el barrio linda con Coslada y San Fernando de Henares.
    // PENDIENTE MUV: el teléfono. Cuatro fuentes públicas dicen 634 47 85 44 y
    // `locations.ts` dice otro. No se publica ninguno.
    imageAlt:
      "Sala de tratamiento de la clínica de fisioterapia MUV en El Cañaveral",
  },

  treats: {
    eyebrow: "Motivos de consulta",
    title:
      "Suelo pélvico, embarazo, bebés y dolor de espalda: lo que tratamos en El Cañaveral",
    lede: "Casi nadie llega a un fisioterapeuta sabiendo qué técnica necesita: llega sabiendo qué le pasa. Así que empiece por ahí. Estos son los motivos de consulta que tratamos en esta clínica y lo que suele haber detrás de cada uno.",
    items: [
      {
        title: "Suelo pélvico: escapes de orina, dolor y pesadez",
        paragraphs: [
          {
            lead: "Escapes al toser, al reír o al correr",
            text: ", urgencia para llegar al baño, sensación de peso en la zona genital, dolor en las relaciones y molestias que aparecen o cambian con la menopausia.",
          },
          {
            text: "El suelo pélvico es un grupo de músculos, y como cualquier otro puede estar débil, pero también demasiado tenso: no todos los casos se tratan con el mismo ejercicio, y hacer el equivocado puede empeorar el síntoma. Por eso se valora antes de pautar nada.",
          },
        ],
      },
      {
        title: "Embarazo: dolor lumbar, ciática y pubalgia",
        paragraphs: [
          {
            lead: "Dolor lumbar que aparece a partir del segundo trimestre",
            text: ", dolor en el pubis al andar o al darse la vuelta en la cama, ciática, molestias en las costillas y preparación del suelo pélvico para el parto.",
          },
          {
            text: "El embarazo cambia el peso, el punto de equilibrio y la elasticidad de los tejidos en pocos meses. La mayoría de esas molestias tienen tratamiento y no hay que esperar a que pasen solas.",
          },
        ],
      },
      {
        title: "Postparto: diástasis, cicatriz y recuperación",
        paragraphs: [
          {
            lead: "Separación de los abdominales",
            text: " que no se cierra, cicatriz de cesárea tirante, adherida o dormida, escapes que empezaron después del parto, dolor en el periné y ganas de volver a la actividad física sin saber por dónde.",
          },
          {
            text: "La recuperación postparto no es ponerse a hacer abdominales: es revisar primero el suelo pélvico y la pared abdominal, y a partir de ahí decidir qué ejercicio toca y en qué orden.",
          },
        ],
      },
      {
        title: "Bebés y niños: cólico, tortícolis y cabeza plana",
        paragraphs: [
          {
            lead: "Cólico del lactante",
            text: " y llanto con las digestiones, tortícolis congénita —el bebé gira siempre hacia el mismo lado—, cabeza plana por apoyo mantenido, mocos y bronquiolitis de repetición, y retrasos en el gateo o en la marcha.",
          },
          {
            text: "Se trabaja con el bebé y con quien lo cuida: buena parte del tratamiento son pautas de postura, porteo y juego para hacer en casa entre sesión y sesión.",
          },
        ],
      },
      {
        title: "Dolor de espalda, cuello y hombro",
        href: "/dolencias-y-lesiones/dolor-espalda",
        paragraphs: [
          {
            lead: "Dolor lumbar",
            text: " al levantarse de la silla o al final del día, dolor cervical que sube hasta la cabeza o se acompaña de mareo, dolor de hombro al levantar el brazo o que despierta por la noche, contracturas y molestias que bajan por la pierna o el brazo.",
          },
        ],
      },
      {
        title: "Lesión deportiva y recuperación tras una operación",
        paragraphs: [
          {
            text: "Tendinopatías, esguinces, sobrecargas de entrenamiento, roturas de fibras y vuelta a la actividad después de una cirugía, con el informe del hospital.",
          },
        ],
      },
    ],
    closing: {
      text: "Si lo que le pasa no aparece aquí, escríbanos y le decimos si es un caso para nosotros: si en la valoración encontramos algo que no corresponde tratar en fisioterapia, se lo diremos y le indicaremos a quién acudir.",
    },
  },

  services: {
    eyebrow: "Tratamientos",
    title: "Servicios de fisioterapia en nuestra clínica de El Cañaveral",
    items: [
      { label: "Fisioterapia", href: "/servicios/fisioterapia", text: "Valoración y tratamiento manual e instrumental para recuperar el movimiento." },
      { label: "Fisioterapia deportiva", href: "/servicios/fisioterapia-deportiva", text: "Recuperación y readaptación al gesto deportivo, del aficionado al federado." },
      { label: "Suelo pélvico", href: "/servicios/suelo-pelvico", text: "Valoración y tratamiento de escapes, dolor y pesadez, en cualquier etapa de la vida." },
      { label: "Fisioterapia en el embarazo", href: "/servicios/fisioterapia-embarazo", text: "Tratamiento de las molestias del embarazo y preparación del suelo pélvico." },
      { label: "Postparto", href: "/servicios/postparto", text: "Revisión de suelo pélvico y pared abdominal, y vuelta progresiva al ejercicio." },
      { label: "Fisioterapia pediátrica", href: "/servicios/fisioterapia-pediatrica", text: "Tratamiento de bebés y niños, con pautas para casa entre sesión y sesión." },
      { label: "Pilates terapéutico", href: "/servicios/pilates-terapeutico", text: "Ejercicio con máquinas dirigido por un fisioterapeuta y adaptado a cada caso." },
      { label: "Entrenamiento terapéutico individual", href: "/servicios/entrenamiento-terapeutico/individual", text: "Ejercicio pautado y supervisado por un fisioterapeuta, con progresión medida." },
      { label: "Neuromodulación", href: "/servicios/neuromodulacion", text: "Tecnología ecoguiada para modular el sistema nervioso en el dolor persistente." },
      { label: "Diatermia", href: "/servicios/diatermia", text: "Aplicación de calor profundo para preparar el tejido antes de trabajarlo." },
      // ATM es una dolencia, no un servicio: no existe `/servicios/atm`.
      { label: "ATM", href: "/dolencias-y-lesiones/atm", text: "Tratamiento de la articulación temporomandibular y de la tensión asociada." },
    ],
    note: {
      before:
        "El entrenamiento terapéutico en grupo y el tratamiento de cicatrices se realizan en nuestra clínica de ",
      linkLabel: "Tres Cantos",
      href: "/sedes/tres-cantos",
      after: ". Si necesita alguno, dígalo al pedir cita y le orientamos.",
    },
    cta: { label: "Ver todos los servicios", href: "/servicios" },
  },

  firstVisit: {
    eyebrow: "Su primera sesión",
    title: "Cómo es la primera sesión de fisioterapia en MUV El Cañaveral",
    steps: [
      { title: "Antes.", text: "Traiga ropa cómoda: la valoración incluye ver cómo se mueve. Si tiene informes o pruebas de imagen relacionadas, tráigalos." },
      { title: "Durante.", text: "Hablamos de qué le pasa y desde cuándo, exploramos la zona y el movimiento completo, y le explicamos qué hemos encontrado." },
      { title: "Al salir.", text: "Se lleva un plan con objetivos concretos y pautas para hacer en casa. Lo revisamos según evolucione." },
    ],
  },

  team: {
    eyebrow: "Quién le atiende",
    title: "Nuestro equipo de fisioterapeutas en El Cañaveral",
    lede: "Quien le atiende en esta clínica es siempre un fisioterapeuta colegiado.",
    // PENDIENTE MUV: nombre, foto, número de colegiado y áreas de trabajo de
    // cada fisioterapeuta, y en particular quién lleva suelo pélvico y
    // pediatría, que es la mitad diferencial de esta clínica. Las fichas del
    // equipo no se maquetan: los seis `.mdx` de `content/professionals/` llevan
    // `Col. nº 0000` y no coinciden con quienes Doctoralia muestra atendiendo.
    accreditation: [
      {
        label: "Centro sanitario registrado",
        value:
          "CS 17623, en el registro de centros sanitarios de la Comunidad de Madrid.",
      },
      {
        label: "Responsable sanitario",
        value: "Álvaro Ortega Rienda, colegiado nº 12868, desde el 25 de enero de 2021.",
      },
      // PENDIENTE MUV: confirmar los idiomas. Español, inglés e italiano están
      // declarados en la ficha de Doctoralia de esta clínica, y el italiano no
      // lo ofrece nadie más en el barrio.
    ],
  },

  facilities: {
    eyebrow: "La clínica",
    title: "Instalaciones y equipamiento de la clínica de El Cañaveral",
    text: "La clínica tiene boxes individuales de tratamiento, una sala de Pilates con máquinas y una zona de entrenamiento funcional, que es lo que permite pasar del tratamiento en camilla al trabajo de carga sin cambiar de sitio ni esperar. Trabajamos con camillas Gymna Pro, electroterapia, polea inercial, equipos de neuromodulación ecoguiada y ecógrafo.",
    // PENDIENTE MUV: emparejamiento foto ↔ ALT. Estos textos vienen del
    // documento, pero no describen la foto que les toca en el repositorio.
    // Se publican a la espera de aclararlo con el cliente; al corregirlo solo
    // hay que reordenar esta lista.
    galleryAlt: [
      "Fachada de la clínica MUV en la calle Victoria Kent, El Cañaveral",
      "Recepción de la clínica de fisioterapia MUV El Cañaveral",
      "Box individual de tratamiento con camilla Gymna Pro",
      "Sala de Pilates terapéutico con máquinas",
      "Zona de entrenamiento funcional de la clínica de El Cañaveral",
      "Equipo de neuromodulación ecoguiada de MUV El Cañaveral",
    ],
  },

  reviews: {
    eyebrow: "Valoraciones",
    title: "Opiniones sobre la clínica de El Cañaveral",
    // Se citan como texto, nombrando la plataforma. Nunca `aggregateRating`.
    text: "Esta clínica acumula más de 1.600 valoraciones en Doctoralia y más de 300 en Google, con una media de 5 sobre 5 en las dos plataformas. Las de Doctoralia proceden de citas verificadas por la propia plataforma.",
    // PENDIENTE MUV: dos o tres testimonios reales anonimizados de esta
    // clínica. El documento de arranque los aprueba anonimizados. No se inventan.
  },

  directions: {
    eyebrow: "Dónde estamos",
    title: "Cómo llegar a nuestra clínica de fisioterapia de El Cañaveral",
    facts: [
      {
        label: "Dirección",
        value:
          "C. Victoria Kent, Local 8 · 28052 Madrid — barrio de El Cañaveral, distrito de Vicálvaro.",
      },
      {
        label: "En metro o Cercanías",
        value:
          "El barrio no tiene estación propia. Las más cercanas son Barrio del Puerto y Coslada Central (línea 7) y la estación de Cercanías de Coslada, todas a unos 2,5 km, y Puerta de Arganda (línea 9) a 2,7 km. Desde ellas se enlaza en autobús.",
      },
      // PENDIENTE MUV: confirmar con el Consorcio las líneas de autobús antes
      // de publicarlas. Los datos son de OpenStreetMap: parada Mario Moreno
      // Cantinflas – Victoria Kent, a unos 60 m, con las líneas 159, 290 y N6.
      // PENDIENTE MUV: dónde aparcar. Es el dato más importante de este módulo
      // y no lo publica ninguna de las cinco clínicas del barrio.
      // PENDIENTE MUV: accesibilidad — entrada a pie de calle o con escalón,
      // ascensor y aseo adaptado.
    ],
    hoursHeading: "Horario de la clínica: mañanas, tardes y sábados",
    // PENDIENTE MUV: la hora de cierre. El perfil de Google de esta clínica
    // publica que cierra a las 21:00 y la web publica las 22:00. Hasta que se
    // decida cuál es la buena no se publica el horario ni se declara
    // `openingHoursSpecification` — ver `locations.ts`.
    hoursText: undefined,
    bookingNote:
      "Puede consultar los huecos disponibles y reservar desde la agenda en línea.",
    mapAlt:
      "Ubicación de la clínica de fisioterapia MUV en El Cañaveral, Vicálvaro",
  },

  faqSection: {
    eyebrow: "Dudas habituales",
    title: "Preguntas frecuentes sobre nuestra clínica de El Cañaveral",
  },
  // El documento define cinco; se publican las tres que tienen respuesta.
  // PENDIENTE MUV: «¿Dónde se puede aparcar cerca de la clínica?» — una línea.
  // Cero de cinco webs del barrio lo responden.
  // PENDIENTE MUV: «¿Atienden a domicilio en El Cañaveral?» — sí o no.
  faqs: [
    {
      question:
        "¿Hay que valorar el suelo pélvico antes de empezar a hacer ejercicios?",
      answer:
        "Sí. El suelo pélvico puede estar débil o demasiado tenso, y el ejercicio que ayuda en un caso puede empeorar el otro. Por eso se valora primero y se pauta después.",
    },
    {
      question: "¿Desde qué edad se puede tratar a un bebé?",
      answer:
        "Desde las primeras semanas. Los motivos más habituales a esa edad —cólico, tortícolis, cabeza plana— se trabajan con técnicas suaves y con pautas para casa.",
    },
    {
      question: "¿Se puede recibir tratamiento durante el embarazo?",
      answer:
        "Sí, y en cualquier trimestre. Adaptamos la postura de trabajo y las técnicas a la etapa del embarazo.",
    },
  ],

  cta: {
    title: "Pida cita en nuestra clínica de fisioterapia de El Cañaveral",
    description:
      "Reserve su primera valoración en la clínica de El Cañaveral. Si prefiere consultarnos antes, escríbanos y le decimos si su caso es para nosotros.",
  },
};
