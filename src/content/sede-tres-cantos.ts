/**
 * Copy aprobada de `/sedes/tres-cantos`.
 *
 * Fuente: `docs/contenidos/sede-tres-cantos.md` (versión 10, cerrada). Ese
 * documento manda sobre el código: no editar nada de aquí sin actualizarlo.
 *
 * Esta página defiende «fisioterapia Tres Cantos» y tiene prohibido repetir el
 * discurso genérico de marca. Su argumento es el horario: es lo que sostiene el
 * title, la meta description y la entradilla.
 *
 * Once frases se retiraron del documento por no tener fuente —cómo funciona el
 * grupo, si se puede elegir profesional, la zona de atención, los superlativos
 * clínicos—. No vuelven a entrar aquí por la puerta de atrás.
 */

import type { SedeContent } from "@/content/sede-types";

export const tresCantos: SedeContent = {
  meta: {
    /** 58 caracteres. */
    title: "Fisioterapia en Tres Cantos hasta las 22 h y sábados | MUV",
    /** 149 caracteres. */
    description:
      "Clínica de fisioterapia en Tres Cantos: valoramos antes de tratar. Abrimos hasta las 22:00 de lunes a viernes y los sábados por la mañana. Pida cita.",
  },

  hero: {
    title:
      "Fisioterapia en Tres Cantos: valoración, tratamiento y ejercicio terapéutico",
    lede: "En MUV Tres Cantos tratamos el dolor y la lesión musculoesquelética y deportiva, y acompañamos la recuperación con ejercicio pautado por fisioterapeutas. Empezamos siempre por una valoración: primero entendemos de dónde viene la molestia y después decidimos el tratamiento. Atendemos hasta las diez de la noche de lunes a viernes y los sábados por la mañana, para que tratarse no dependa de pedir permiso en el trabajo.",
    strip: [
      {
        label: "Hasta las 22:00",
        value: "De lunes a viernes, con la última sesión al salir de trabajar.",
      },
      {
        label: "Sábados por la mañana",
        value: "De 10:00 a 14:00, para lo que no cabe entre semana.",
      },
      { label: "Cita online", value: "Reserve día y hora sin llamar." },
    ],
    address: "Av. de Madrid, 19, Local 5 · 28760 Tres Cantos",
    // PENDIENTE MUV: zona de atención. La que había —Tres Cantos, Soto de
    // Viñuelas y Colmenar Viejo— estaba deducida por proximidad en un mapa.
    // PENDIENTE MUV: el teléfono. La web actual, Doctoralia e Instagram
    // publican 614 13 14 05 y `locations.ts` dice otro. No se publica ninguno.
    imageAlt:
      "Sala de tratamiento de la clínica de fisioterapia MUV en Tres Cantos",
  },

  treats: {
    eyebrow: "Motivos de consulta",
    title: "Dolor de espalda, rodilla, hombro y ATM: lo que tratamos en Tres Cantos",
    lede: "Casi nadie llega a un fisioterapeuta sabiendo qué técnica necesita: llega sabiendo qué le duele. Así que empiece por ahí. Estos son los motivos de consulta que tratamos en esta clínica y lo que suele haber detrás de cada uno.",
    items: [
      {
        title: "Dolor de espalda: lumbar, cervical y dorsal",
        href: "/dolencias-y-lesiones/dolor-espalda",
        paragraphs: [
          {
            lead: "Dolor lumbar",
            text: " que aparece al levantarse de la silla o al final del día, dolor cervical que sube hasta la cabeza o se acompaña de mareo, dolor dorsal entre los omóplatos, contracturas y molestias que bajan por la pierna o el brazo.",
          },
          {
            text: "Muy a menudo el origen no está donde duele, sino en cómo pasa el día: una jornada entera delante de una pantalla carga la zona lumbar y el cuello tanto como un mal gesto, solo que despacio y sin que se note hasta que ya duele. Cuéntenos también cómo es su jornada, no solo dónde le duele.",
          },
        ],
      },
      {
        title: "Dolor de rodilla",
        href: "/dolencias-y-lesiones/lesion-rodilla",
        paragraphs: [
          {
            lead: "Dolor al subir y bajar escaleras",
            text: ", al flexionar, al correr —por fuera o por dentro de la rodilla—, molestias que siguen en reposo, tendinopatía rotuliana, problemas de menisco o de ligamento y recuperación tras una operación.",
          },
          {
            text: "La readaptación va por fases: que deje de doler, que la rodilla aguante carga y que vuelva a lo que hacía. Eso último tiene nombre concreto —volver a correr, a la bici, al pádel o simplemente a subir a casa sin ir pensando en la rodilla— y es lo que fijamos como objetivo desde la primera sesión.",
          },
        ],
      },
      {
        title: "Dolor de hombro",
        href: "/dolencias-y-lesiones/lesion-hombro",
        paragraphs: [
          {
            lead: "Dolor al levantar el brazo",
            text: ", dolor que despierta por la noche al apoyarse de ese lado, tendinitis del supraespinoso, pinzamiento, hombro que se va quedando rígido y pérdida de fuerza para gestos cotidianos como alcanzar un estante o abrocharse.",
          },
          {
            text: "El tratamiento no termina cuando deja de doler: recuperar la fuerza y el control del movimiento es lo que sostiene el resultado, y por eso el plan incluye ejercicio y no solo camilla.",
          },
        ],
      },
      {
        title: "ATM, bruxismo y dolor mandibular",
        href: "/dolencias-y-lesiones/atm",
        paragraphs: [
          {
            lead: "Dolor al masticar",
            text: ", chasquidos al abrir la boca, limitación para abrirla del todo, dolor que se confunde con el de oído y dolor de cabeza al despertar por apretar los dientes de noche.",
          },
          {
            text: "La articulación temporomandibular y la musculatura cervical están relacionadas, y es habitual que el dolor de una venga acompañado del de la otra. Aunque le parezcan dos asuntos distintos, en la valoración se miran juntos.",
          },
        ],
      },
    ],
    closing: {
      text: "También tratamos tendinopatías, esguinces, sobrecargas de entrenamiento y recuperación posquirúrgica con informe del hospital. Si lo que le pasa no aparece aquí, escríbanos y le decimos si es un caso para nosotros: si en la valoración encontramos algo que no corresponde tratar en fisioterapia, se lo diremos y le indicaremos a quién acudir.",
    },
  },

  services: {
    eyebrow: "Tratamientos",
    title: "Servicios de fisioterapia en nuestra clínica de Tres Cantos",
    items: [
      { label: "Fisioterapia", href: "/servicios/fisioterapia", text: "Valoración y tratamiento manual e instrumental para recuperar el movimiento." },
      { label: "Fisioterapia deportiva", href: "/servicios/fisioterapia-deportiva", text: "Recuperación y readaptación al gesto deportivo, del aficionado al federado." },
      { label: "Entrenamiento terapéutico individual", href: "/servicios/entrenamiento-terapeutico/individual", text: "Ejercicio pautado y supervisado por un fisioterapeuta, con progresión medida." },
      { label: "Entrenamiento terapéutico en grupo", href: "/servicios/entrenamiento-terapeutico/grupal", text: "El mismo trabajo, compartiendo sala y dirigido también por un fisioterapeuta." },
      { label: "Neuromodulación", href: "/servicios/neuromodulacion", text: "Tecnología ecoguiada para modular el sistema nervioso en el dolor persistente." },
      // ATM es una dolencia, no un servicio: no existe `/servicios/atm`.
      { label: "ATM", href: "/dolencias-y-lesiones/atm", text: "Tratamiento de la articulación temporomandibular y de la tensión asociada." },
      { label: "Tratamiento de cicatrices", href: "/servicios/tratamiento-cicatrices", text: "Trabajo sobre la cicatriz y el tejido de alrededor tras una cirugía o una herida." },
    ],
    // El único enlace que sale de esta página hacia la otra sede. No debe
    // multiplicarse: cada enlace de más reparte hacia la sede que ya lidera la
    // autoridad que esta necesita.
    note: {
      before:
        "El suelo pélvico, la fisioterapia en el embarazo, el postparto, la fisioterapia pediátrica, el Pilates terapéutico y la diatermia se realizan en nuestra clínica de ",
      linkLabel: "El Cañaveral",
      href: "/sedes/el-canaveral",
      after: ". Si necesita alguno, dígalo al pedir cita y le orientamos.",
    },
    cta: { label: "Ver todos los servicios", href: "/servicios" },
  },

  firstVisit: {
    eyebrow: "Su primera sesión",
    title: "Cómo es la primera sesión de fisioterapia en MUV Tres Cantos",
    steps: [
      { title: "Antes.", text: "Traiga ropa cómoda: la valoración incluye ver cómo se mueve. Si tiene informes o pruebas de imagen relacionadas, tráigalos." },
      { title: "Durante.", text: "Hablamos de qué le pasa y desde cuándo, exploramos la zona y el movimiento completo, y le explicamos qué hemos encontrado." },
      { title: "Al salir.", text: "Se lleva un plan con objetivos concretos y pautas para hacer en casa. Lo revisamos según evolucione." },
    ],
  },

  team: {
    eyebrow: "Quién le atiende",
    title: "Nuestro equipo de fisioterapeutas en Tres Cantos",
    lede: "Quien le atiende en esta clínica es siempre un fisioterapeuta colegiado.",
    // PENDIENTE MUV: nombre, foto, número de colegiado y áreas de cada
    // fisioterapeuta. Cinco competidores del municipio publican los suyos: es
    // lo normal, no un extra. Sin número de colegiado el bloque pierde la mitad
    // de su valor, así que las fichas no se maquetan.
    // PENDIENTE MUV: número de registro sanitario de esta clínica. Tres
    // competidores del municipio publican el suyo, dos de ellos los que mejor
    // contenido tienen.
    // PENDIENTE MUV: nombre del responsable sanitario. Es un dato del propio
    // registro y en El Cañaveral ya lo tenemos.
    // PENDIENTE MUV: confirmar el inglés, declarado en su ficha de Doctoralia.
    accreditation: [],
  },

  facilities: {
    eyebrow: "La clínica",
    title: "Instalaciones y equipamiento de la clínica de Tres Cantos",
    text: "La clínica tiene sala de tratamiento y una zona de ejercicio propia, que es lo que permite pasar del tratamiento en camilla al trabajo de carga sin cambiar de sitio ni esperar. Trabajamos con camillas Gymna Pro y con equipos de neuromodulación ecoguiada.",
    // PENDIENTE MUV: el ecógrafo. La ficha de Doctoralia lo declara como
    // equipamiento, pero hay que decidir dos cosas distintas: si se nombra
    // como equipamiento y si se ofrece la ecografía como servicio, que NO está
    // en el catálogo aprobado. Hasta entonces no se nombra.
    // PENDIENTE MUV: emparejamiento foto ↔ ALT. Estos textos vienen del
    // documento, pero no describen la foto que les toca en el repositorio.
    // Se publican a la espera de aclararlo con el cliente; al corregirlo solo
    // hay que reordenar esta lista.
    galleryAlt: [
      "Fachada de la clínica MUV en la avenida de Madrid, 19, Tres Cantos",
      "Recepción de la clínica de fisioterapia MUV Tres Cantos",
      "Camilla Gymna Pro en la sala de tratamiento de MUV Tres Cantos",
      "Zona de entrenamiento terapéutico con material de ejercicio",
      "Sesión de ejercicio terapéutico supervisada por un fisioterapeuta",
      "Equipo de neuromodulación ecoguiada de la clínica de Tres Cantos",
    ],
  },

  reviews: {
    eyebrow: "Valoraciones",
    title: "Opiniones sobre la clínica de Tres Cantos",
    // Se citan como texto, nombrando la plataforma. Nunca `aggregateRating`.
    text: "Esta clínica acumula 158 valoraciones en Doctoralia con una media de 5 sobre 5, todas de citas verificadas por la plataforma.",
    // PENDIENTE MUV: dos o tres testimonios reales anonimizados de esta clínica.
  },

  directions: {
    eyebrow: "Dónde estamos",
    title: "Cómo llegar a nuestra clínica de fisioterapia de Tres Cantos",
    facts: [
      {
        label: "Dirección",
        value: "Av. de Madrid, 19, Local 5 · 28760 Tres Cantos, Madrid",
      },
      { label: "En coche", value: "Salida de la M-607." },
      {
        label: "En autobús",
        value:
          "Líneas interurbanas 712, 713, 716 y 717 desde Plaza de Castilla, y los autobuses urbanos de Tres Cantos.",
      },
      {
        label: "En tren",
        value:
          "Estación de Tres Cantos, línea C-4 de Cercanías (Chamartín, Sol y Atocha en directo), a unos 3 km de la clínica.",
      },
      // PENDIENTE MUV: dónde aparcar. Es el dato más importante de este módulo,
      // porque a esta clínica se viene en coche, y no lo publica ninguno de los
      // trece dominios auditados.
      // PENDIENTE MUV: qué línea urbana y en qué parada bajarse, y con qué
      // autobús se enlaza desde la estación de Cercanías.
      // PENDIENTE MUV: accesibilidad — entrada a pie de calle o con escalón,
      // ascensor y aseo adaptado.
    ],
    hoursHeading:
      "Horario de la clínica: tardes hasta las 22:00 y sábados por la mañana",
    hoursText:
      "Abrimos de lunes a viernes de 10:00 a 14:00 y de 16:00 a 22:00, y los sábados de 10:00 a 14:00.",
    bookingNote:
      "Puede consultar los huecos disponibles y reservar desde la agenda en línea.",
    mapAlt: "Ubicación de la clínica de fisioterapia MUV en Tres Cantos",
  },

  faqSection: {
    eyebrow: "Dudas habituales",
    title: "Preguntas frecuentes sobre nuestra clínica de Tres Cantos",
  },
  // El documento define cinco; se publican las dos que tienen respuesta.
  // PENDIENTE MUV: «¿Dónde se puede aparcar cerca de la clínica?» — una línea.
  // Cero de trece webs de la competencia lo responden.
  // PENDIENTE MUV: «¿Se puede recibir tratamiento en inglés?» — confirmar.
  // PENDIENTE MUV: «¿Atienden a domicilio en Tres Cantos?» — sí o no.
  faqs: [
    {
      question:
        "¿En qué se diferencia el entrenamiento terapéutico en grupo de una clase colectiva?",
      answer:
        "En que el ejercicio va pautado y lo supervisa un fisioterapeuta, no un monitor. No es una tabla común: parte de lo que necesita cada caso.",
    },
    {
      question:
        "¿Pueden tratarme después de una operación, con el informe del hospital?",
      answer:
        "Sí. Traiga el informe y las indicaciones del cirujano si las tiene, y en la valoración fijamos en qué fase está y qué se puede empezar a trabajar.",
    },
  ],

  cta: {
    title: "Pida cita en nuestra clínica de fisioterapia de Tres Cantos",
    description:
      "Reserve su primera valoración en la clínica de Tres Cantos. Si prefiere consultarnos antes, escríbanos y le decimos si su caso es para nosotros.",
  },
};
