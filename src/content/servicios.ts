/**
 * Copy aprobada de `/servicios`.
 *
 * Fuente: `docs/contenidos/MUV-WEB-SERVICIOS.pdf` (v1.1, 19/10/2026; rama
 * `docs/fase-2-pdf-maquetar`). Va tal cual: title, meta, H1, H2, H3, texto de
 * cada bloque, «Dónde se hace» y anclas (#31).
 *
 * Una sola página, sin pestañas: cada servicio sale una vez y su bloque dice en
 * qué clínica se hace (#48). En esta página no aparece ningún municipio; la
 * única excepción es «Dónde se hace», que nombra la clínica.
 *
 * Las anclas (`id`) son fijas y no cambian nunca: el menú, la home, `/sedes` y
 * las páginas de sede enlazan a ellas.
 */

export const meta = {
  title: "Todos los servicios de fisioterapia | Clínica MUV",
  description:
    "Qué es cada servicio de fisioterapia de MUV y en qué clínica se hace: deportiva, ATM, pediatría, cicatrices, neuromodulación, Pilates y más. Pida cita.",
} as const;

/** Módulo 1 · Hero */
export const hero = {
  eyebrow: "Servicios",
  title: "Todos los servicios de fisioterapia de MUV",
  lede: "Aquí tiene cada servicio de MUV explicado en pocas líneas, con la clínica en la que se presta. Los que tienen página propia le llevan a ella. Si no sabe cuál necesita, pida cita: valoramos antes de tratar y le orientamos desde ahí.",
  secondaryCta: { label: "Ver las dos clínicas", href: "/sedes" },
} as const;

/** Una página de servicio enlazada desde «Dónde se hace». */
type ServicePage = { label: string; href: string };

/** Una línea de «Dónde se hace»: la clínica y, detrás, sus páginas. */
type Where = { clinic: string; href: string; pages?: ServicePage[] };

export type ServiceBlock = {
  /** Ancla fija: `id` del H3. */
  id: string;
  title: string;
  /** Admite `[enlace](/ruta)`. */
  text: string;
  where: Where[];
};

export type ServiceModule = {
  eyebrow: string;
  title: string;
  blocks: ServiceBlock[];
};

const EL_CANAVERAL = { clinic: "MUV El Cañaveral", href: "/sedes/el-canaveral" };
const TRES_CANTOS = { clinic: "MUV Tres Cantos", href: "/sedes/tres-cantos" };

/** Módulos 2 a 6, en el orden del documento. */
export const modules: ServiceModule[] = [
  {
    eyebrow: "Fisioterapia",
    title: "Fisioterapia y fisioterapia deportiva",
    blocks: [
      {
        id: "fisioterapia",
        title: "Fisioterapia",
        text: "La fisioterapia trata el dolor y la pérdida de movimiento de músculos, articulaciones, tendones y ligamentos. En MUV empieza siempre con una valoración, y el tratamiento combina terapia manual, ejercicio y, si hace falta, técnicas instrumentales.",
        where: [
          EL_CANAVERAL,
          {
            ...TRES_CANTOS,
            pages: [
              { label: "Fisioterapia de espalda, cervical y lumbar", href: "/sedes/tres-cantos/fisioterapia-espalda" },
              { label: "Fisioterapia de rodilla", href: "/sedes/tres-cantos/fisioterapia-rodilla" },
            ],
          },
        ],
      },
      {
        id: "fisioterapia-deportiva",
        title: "Fisioterapia deportiva",
        text: "Trata la lesión y acompaña al deportista hasta que puede entrenar o competir otra vez, sea cual sea su nivel. Cuándo volver lo marcan pruebas de fuerza y de control del movimiento, no solo que haya dejado de doler.",
        where: [
          EL_CANAVERAL,
          {
            ...TRES_CANTOS,
            pages: [
              { label: "Fisioterapia deportiva y readaptación", href: "/sedes/tres-cantos/fisioterapia-deportiva" },
            ],
          },
        ],
      },
    ],
  },
  {
    eyebrow: "Técnicas",
    title: "Fisioterapia invasiva, neuromodulación y diatermia",
    blocks: [
      {
        id: "fisioterapia-invasiva-ecografia",
        title: "Fisioterapia invasiva y ecografía",
        text: "La ecografía musculoesquelética permite ver el músculo o el tendón mientras se valora, y seguir la aguja en la pantalla durante el tratamiento. Así se guían las dos técnicas con aguja, punción seca y neuromodulación percutánea: quien trata ve en todo momento dónde está la punta.",
        where: [
          {
            ...EL_CANAVERAL,
            pages: [
              { label: "Fisioterapia invasiva y ecografía", href: "/sedes/el-canaveral/fisioterapia-invasiva-ecografia" },
            ],
          },
          {
            ...TRES_CANTOS,
            pages: [
              { label: "Fisioterapia deportiva y readaptación", href: "/sedes/tres-cantos/fisioterapia-deportiva#tecnicas" },
            ],
          },
        ],
      },
      {
        id: "neuromodulacion",
        title: "Neuromodulación",
        text: "La neuromodulación percutánea estimula un nervio con una corriente eléctrica suave, a través de una aguja fina que se coloca viendo el nervio en la ecografía. Se emplea para modular el dolor que se mantiene en el tiempo. Todavía hay pocos estudios sobre ella, así que en general se usa junto a otros tratamientos, nunca sola.",
        where: [
          {
            ...EL_CANAVERAL,
            pages: [
              { label: "Fisioterapia invasiva y ecografía", href: "/sedes/el-canaveral/fisioterapia-invasiva-ecografia#tecnicas" },
            ],
          },
          {
            ...TRES_CANTOS,
            pages: [
              { label: "Fisioterapia deportiva y readaptación", href: "/sedes/tres-cantos/fisioterapia-deportiva#tecnicas" },
            ],
          },
        ],
      },
      {
        id: "diatermia",
        title: "Diatermia",
        text: "La diatermia genera calor en el interior de los tejidos mediante corrientes de radiofrecuencia. En MUV forma parte del tratamiento de suelo pélvico, junto al ejercicio. Está contraindicada, entre otros casos, sobre el abdomen y la pelvis durante el embarazo y en personas con marcapasos u otros implantes electrónicos.",
        where: [
          {
            ...EL_CANAVERAL,
            pages: [
              { label: "Fisioterapia de suelo pélvico", href: "/sedes/el-canaveral/suelo-pelvico#tecnologia" },
            ],
          },
        ],
      },
    ],
  },
  {
    eyebrow: "Tratamientos específicos",
    title: "Fisioterapia de la ATM y tratamiento de cicatrices",
    blocks: [
      {
        id: "atm",
        title: "ATM (articulación temporomandibular)",
        text: "La ATM une la mandíbula con el cráneo y se mueve cada vez que habla, mastica o bosteza. La fisioterapia trata el dolor de mandíbula, los chasquidos, la dificultad para abrir la boca y la sobrecarga de apretar o rechinar los dientes. En general se trabaja con terapia manual y con ejercicios que luego puede hacer en casa.",
        where: [EL_CANAVERAL, TRES_CANTOS],
      },
      {
        id: "tratamiento-cicatrices",
        title: "Tratamiento de cicatrices",
        text: "Después de una operación o de una herida, la cicatriz puede quedar adherida, tirante, dolorosa o con la sensibilidad alterada, y limitar el movimiento de la zona. La fisioterapia busca devolverle elasticidad, y se empieza cuando la herida está completamente cerrada. La cicatriz de cesárea se trabaja dentro del [postparto](#postparto).",
        where: [TRES_CANTOS],
      },
    ],
  },
  {
    eyebrow: "Ejercicio terapéutico",
    title: "Entrenamiento terapéutico, funcional y Pilates",
    blocks: [
      {
        id: "entrenamiento-funcional",
        title: "Entrenamiento terapéutico y funcional",
        text: "Es ejercicio guiado para ganar fuerza, movilidad y control, prevenir lesiones y no perder lo conseguido después de un tratamiento. Puede hacerlo de forma individual o en grupo.",
        where: [
          {
            ...EL_CANAVERAL,
            pages: [
              { label: "Entrenamiento funcional guiado", href: "/sedes/el-canaveral/entrenamiento-funcional" },
            ],
          },
          {
            ...TRES_CANTOS,
            pages: [
              { label: "Clases supervisadas de entrenamiento funcional", href: "/sedes/tres-cantos/entrenamiento-funcional" },
            ],
          },
        ],
      },
      {
        id: "pilates",
        title: "Pilates terapéutico",
        text: "Pilates con enfoque terapéutico, para mejorar el control postural, la fuerza del tronco y la confianza al moverse. Incluye clases para embarazadas, adaptadas a cada etapa del embarazo.",
        where: [
          {
            ...EL_CANAVERAL,
            pages: [
              { label: "Pilates y pilates para embarazadas", href: "/sedes/el-canaveral/pilates" },
            ],
          },
        ],
      },
    ],
  },
  {
    eyebrow: "Suelo pélvico y pediatría",
    title: "Suelo pélvico, embarazo, postparto y fisioterapia pediátrica",
    blocks: [
      {
        id: "suelo-pelvico",
        title: "Suelo pélvico",
        text: "El suelo pélvico es el grupo de músculos que cierra la pelvis por abajo y sostiene la vejiga, el útero y el recto. Cuando se debilita o está demasiado tenso pueden aparecer pérdidas de orina, una sensación de bulto o de presión, o dolor, y todo ello tiene tratamiento. En MUV lo tratan fisioterapeutas especializados, con ejercicio específico y, cuando está indicado, con diatermia o electroterapia.",
        where: [
          {
            ...EL_CANAVERAL,
            pages: [
              { label: "Fisioterapia de suelo pélvico", href: "/sedes/el-canaveral/suelo-pelvico" },
            ],
          },
        ],
      },
      {
        id: "fisioterapia-embarazo",
        title: "Fisioterapia en el embarazo",
        text: "Durante el embarazo cambian el peso, la postura y la carga sobre la espalda y la pelvis, y son frecuentes el dolor lumbar y el dolor en el pubis. La fisioterapia puede aliviarlos y ayuda a llegar al parto con el suelo pélvico trabajado. Si el embarazo transcurre sin complicaciones, mantenerse activa es seguro y recomendable.",
        where: [
          {
            ...EL_CANAVERAL,
            pages: [
              { label: "Fisioterapia de suelo pélvico", href: "/sedes/el-canaveral/suelo-pelvico#embarazo-y-postparto" },
              { label: "Pilates y pilates para embarazadas", href: "/sedes/el-canaveral/pilates#pilates-para-embarazadas" },
            ],
          },
        ],
      },
      {
        id: "postparto",
        title: "Postparto",
        text: "Después del parto, la vuelta a la actividad conviene hacerla en orden: primero se comprueba cómo están el suelo pélvico y el abdomen, y después se avanza con entrenamiento funcional. Aquí entran los escapes de orina, la separación de los abdominales (diástasis) y la cicatriz de cesárea.",
        where: [
          {
            ...EL_CANAVERAL,
            pages: [
              { label: "Fisioterapia de suelo pélvico", href: "/sedes/el-canaveral/suelo-pelvico#embarazo-y-postparto" },
              { label: "Entrenamiento funcional guiado", href: "/sedes/el-canaveral/entrenamiento-funcional#quien-se-beneficia" },
            ],
          },
        ],
      },
      {
        id: "fisioterapia-pediatrica",
        title: "Fisioterapia pediátrica",
        text: "Atiende a bebés y niños: tortícolis, plagiocefalia o cabeza plana, retrasos en el desarrollo motor y problemas respiratorios, entre otros. La familia forma parte del tratamiento y se lleva indicaciones sencillas para practicar en casa. Si el bebé tiene fiebre o le cuesta respirar, la primera consulta es con su pediatra.",
        where: [EL_CANAVERAL],
      },
    ],
  },
];

/**
 * Índice del hero: una fila de etiquetas que saltan a cada bloque. Las
 * etiquetas son las del documento, que no siempre coinciden con el H3 (en ATM
 * el índice no lleva el paréntesis).
 */
export const index: { label: string; id: string }[] = [
  { label: "Fisioterapia", id: "fisioterapia" },
  { label: "Fisioterapia deportiva", id: "fisioterapia-deportiva" },
  { label: "Fisioterapia invasiva y ecografía", id: "fisioterapia-invasiva-ecografia" },
  { label: "Neuromodulación", id: "neuromodulacion" },
  { label: "Diatermia", id: "diatermia" },
  { label: "ATM", id: "atm" },
  { label: "Tratamiento de cicatrices", id: "tratamiento-cicatrices" },
  { label: "Entrenamiento terapéutico y funcional", id: "entrenamiento-funcional" },
  { label: "Pilates terapéutico", id: "pilates" },
  { label: "Suelo pélvico", id: "suelo-pelvico" },
  { label: "Fisioterapia en el embarazo", id: "fisioterapia-embarazo" },
  { label: "Postparto", id: "postparto" },
  { label: "Fisioterapia pediátrica", id: "fisioterapia-pediatrica" },
];

/** Módulo 7 · CTA */
export const cta = {
  eyebrow: "Pida cita",
  title: "Pida una valoración de fisioterapia en MUV",
  description:
    "¿No sabe qué servicio necesita? Cuéntenos qué le pasa al pedir cita y elija la clínica que le quede más cerca.",
  secondary: { label: "Ver las dos clínicas", href: "/sedes" },
} as const;
