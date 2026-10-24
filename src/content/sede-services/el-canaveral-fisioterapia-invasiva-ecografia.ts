/**
 * `/sedes/el-canaveral/fisioterapia-invasiva-ecografia`
 * Fisioterapia invasiva y ecografía.
 *
 * Fuente: `docs/contenidos/MUV-WEB-EL-CANAVERAL-INVASIVA-ECOGRAFIA.pdf` (#43), texto
 * literal. Lo que el PDF marca en rojo no está aquí.
 *
 * El teléfono no aparece en «Dónde estamos»: está en rojo hasta que MUV lo
 * confirme (#33). Tampoco la hora de cierre (#35).
 */

import type { SedeServiceContent } from "@/content/sede-service-types";

export const elCanaveralInvasivaEcografia: SedeServiceContent = {
  location: "el-canaveral",
  slug: "fisioterapia-invasiva-ecografia",
  label: "Fisioterapia invasiva y ecografía",
  source: "docs/contenidos/MUV-WEB-EL-CANAVERAL-INVASIVA-ECOGRAFIA.pdf",
  meta: {
    title: "Punción seca y ecografía en El Cañaveral, Madrid | MUV",
    description:
      "Punción seca y neuromodulación guiadas con ecografía en El Cañaveral, Madrid. Vemos el tejido antes de tratar. Pida cita en MUV.",
  },
  hero: {
    title: "Fisioterapia invasiva y ecografía en El Cañaveral, Madrid",
    lede:
      "Ver antes de tratar. En MUV El Cañaveral trabajamos con las técnicas más actuales de fisioterapia invasiva, siempre guiadas con ecografía: la ecografía nos deja ver el tejido que duele y la aguja mientras la colocamos.",
    essentials: [
      "Diagnóstico con ecografía: vemos el tejido en tiempo real.",
      "Punción seca y neuromodulación percutánea, siempre guiadas con ecografía.",
      "Para tendinopatías, contracturas y puntos gatillo, y lesiones musculares.",
      "La ecografía acompaña a la exploración; las pruebas complementarias las indica su médico.",
    ],
  },
  sections: [
    {
      id: "diagnostico-con-ecografia",
      eyebrow: "Primero, ver",
      title: "Diagnóstico fisioterapéutico con ecografía musculoesquelética",
      intro: [
        {
          type: "p",
          text:
            "La ecografía musculoesquelética muestra en tiempo real músculos, tendones, ligamentos y el líquido de las articulaciones. Nos ayuda a afinar el diagnóstico fisioterapéutico y a decidir qué técnica usar y dónde.",
        },
      ],
      subsections: [
        {
          title: "Qué se ve",
          blocks: [
            {
              type: "p",
              text:
                "El estado de un tendón, las fibras de un músculo, un ligamento o el líquido de una articulación. Y, cuando hace falta una técnica con aguja, la posición de la aguja.",
            },
          ],
        },
        {
          title: "Cuándo es útil",
          blocks: [
            {
              type: "p",
              text:
                "Cuando un dolor no cede con el tratamiento habitual. Cuando se sospecha una lesión de tendón o de fibras. Y antes de una técnica con aguja, para colocarla con precisión.",
            },
          ],
        },
        {
          title: "Qué no hace",
          blocks: [
            {
              type: "p",
              text:
                "No es una resonancia y no la reemplaza. Ve lo que está cerca de la piel y se mueve; para lo demás, su médico indicará la prueba adecuada. Si hace falta otra, se lo diremos.",
            },
          ],
        },
      ],
    },
    {
      id: "tecnicas",
      title:
        "Punción seca y neuromodulación percutánea guiadas con ecografía en El Cañaveral",
      intro: [
        {
          type: "p",
          text:
            "Son técnicas con aguja fina. La ecografía permite ver la zona y la aguja durante todo el proceso. Ninguna sustituye al ejercicio: lo facilitan.",
        },
      ],
      subsections: [
        {
          title: "Punción seca",
          blocks: [
            {
              type: "p",
              text:
                "Se introduce una aguja delgada en un punto contracturado del músculo, sin inyectar fármacos, para soltar la tensión y calmar el dolor. En el dolor cervical con puntos gatillo, una revisión de 2020 halló evidencia entre baja y moderada de alivio a corto plazo.",
            },
          ],
        },
        {
          title: "Neuromodulación percutánea ecoguiada",
          blocks: [
            {
              type: "p",
              text:
                "Con la aguja cerca de un nervio y a la vista en la pantalla, se aplica una corriente muy suave. Se busca modular la señal del dolor. Es una técnica reciente y hay pocos estudios: por eso se considera un complemento y no un tratamiento único.",
            },
          ],
        },
        {
          title: "¿Cuál es para mí?",
          blocks: [
            {
              type: "table",
              head: ["Si tiene…", "Se plantea…"],
              rows: [
                [
                  "Una contractura persistente o un punto muy doloroso en el músculo",
                  "Punción seca",
                ],
                [
                  "Un dolor persistente que no cede con el tratamiento habitual",
                  "Se valora, con ecografía, si la neuromodulación puede complementarlo",
                ],
                [
                  "Un dolor que no sabe a qué se debe",
                  "Valoración con ecografía, antes de decidir",
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: "que-dolores-y-lesiones",
      title:
        "Dolores y lesiones en los que la ecografía y la aguja pueden ayudar",
      intro: [],
      subsections: [
        {
          title: "Tendinopatías",
          blocks: [
            {
              type: "p",
              text:
                "Dolor en un tendón al cargarlo. La ecografía permite ver el tendón y decidir cómo tratarlo.",
            },
          ],
        },
        {
          title: "Contracturas y puntos gatillo",
          blocks: [
            {
              type: "p",
              text:
                "Nudos dolorosos en un músculo, a menudo con dolor referido a otra zona.",
            },
          ],
        },
        {
          title: "Lesiones musculares",
          blocks: [
            {
              type: "p",
              text:
                "Sobrecargas y roturas de fibras, que la ecografía ayuda a localizar y valorar.",
            },
          ],
        },
      ],
    },
    {
      id: "seguridad",
      title: "Punción seca y neuromodulación: riesgos y contraindicaciones",
      intro: [],
      subsections: [
        {
          title: "Qué se siente",
          blocks: [
            {
              type: "p",
              text:
                "Un pinchazo breve y, a veces, una sensación de presión o de contracción en el músculo. Si le molesta demasiado, se puede parar.",
            },
          ],
        },
        {
          title: "Qué puede pasar después",
          blocks: [
            {
              type: "p",
              text:
                "En el punto de la aguja puede salir una gota de sangre o un moratón, y la zona puede quedar sensible. Es lo más habitual. En un estudio con unos 20.500 tratamientos de punción seca, declarados por los propios fisioterapeutas, el 37 % tuvo algún efecto leve. Los graves fueron alrededor de uno por cada mil.",
            },
          ],
        },
        {
          title: "Cuándo no conviene: avise antes",
          blocks: [
            { type: "p", text: "Dígalo antes de empezar si:" },
            {
              type: "list",
              items: [
                "Está embarazada.",
                "Toma anticoagulantes.",
                "Tiene una infección en la zona.",
                "Tiene una enfermedad que afecte a las defensas o a la cicatrización.",
              ],
            },
            {
              type: "p",
              text: "En esos casos se valora si la técnica es adecuada.",
            },
          ],
        },
        {
          title: "Quién debe aplicarla",
          blocks: [
            {
              type: "p",
              text:
                "Un fisioterapeuta con formación específica en estas técnicas y con su consentimiento.",
            },
          ],
        },
      ],
    },
    {
      id: "quien-le-atiende",
      title: "Quién realiza la ecografía y las técnicas con aguja",
      intro: [
        {
          type: "p",
          text:
            "MUV El Cañaveral es un **centro sanitario registrado** en la Comunidad de Madrid con el número **CS 17623**. Su responsable sanitario es **Álvaro Ortega Rienda**, colegiado nº 12868.",
        },
      ],
      subsections: [],
    },
    {
      id: "consejos-y-mitos",
      eyebrow: "Mientras tanto",
      title: "Tres consejos y tres mitos sobre la punción seca y la ecografía",
      intro: [],
      subsections: [
        {
          title: "Avise de su medicación y de sus alergias",
          blocks: [
            {
              type: "p",
              text:
                "Es lo primero que conviene decir antes de cualquier técnica con aguja.",
            },
          ],
        },
        {
          title: "Mantenga el movimiento que le pautan",
          blocks: [
            {
              type: "p",
              text:
                "La técnica abre la puerta al ejercicio, que es lo que consolida la mejoría. Si quiere hacerlo acompañado, en MUV El Cañaveral hay [entrenamiento funcional guiado](/sedes/el-canaveral/entrenamiento-funcional) y [pilates](/sedes/el-canaveral/pilates).",
            },
          ],
        },
        {
          title: "Cuente cómo se ha sentido",
          blocks: [
            {
              type: "p",
              text:
                "Un dolor que aumenta o una molestia que no se va se comunica al fisioterapeuta, no se aguanta.",
            },
          ],
        },
        {
          title: "Mito: «La punción seca es acupuntura»",
          blocks: [
            {
              type: "p",
              text:
                "No exactamente. Las dos usan agujas, pero con criterios distintos: la punción seca se dirige a puntos dolorosos del músculo, a partir de la anatomía y la exploración.",
            },
          ],
        },
        {
          title: "Mito: «Duele muchísimo»",
          blocks: [
            {
              type: "p",
              text:
                "Suele ser un pinchazo breve, y la ecografía no duele. Si algo le asusta, dígalo antes de empezar.",
            },
          ],
        },
        {
          title: "Mito: «La ecografía lo ve todo»",
          blocks: [
            {
              type: "p",
              text:
                "Muestra el tejido, no el dolor. Hay que leerla junto con la exploración y con sus síntomas.",
            },
          ],
        },
      ],
    },
    {
      id: "cuando-consultar-antes-con-su-medico",
      title: "Señales de alarma: cuándo ver antes a su médico",
      intro: [
        { type: "p", text: "Estas señales piden ver antes a su médico:" },
        {
          type: "list",
          items: [
            "Fiebre, o enrojecimiento y calor en la zona que duele.",
            "Dolor nocturno intenso que no mejora al moverse.",
            "Falta de fuerza o adormecimiento.",
            "Hinchazón rápida tras un golpe.",
          ],
        },
      ],
      subsections: [],
    },
  ],
  faq: {
    id: "preguntas-frecuentes",
    eyebrow: "Dudas habituales",
    title: "Preguntas frecuentes sobre fisioterapia invasiva y ecografía",
    items: [
      {
        question: "¿Qué es la fisioterapia invasiva?",
        answer:
          "Son las técnicas con aguja que realiza el fisioterapeuta, como la punción seca o la neuromodulación percutánea. «Invasiva» significa que la aguja atraviesa la piel; no significa cirugía.",
      },
      {
        question: "¿Qué es la fisioterapia ecoguiada?",
        answer:
          "Es la que usa la ecografía para ver el tejido y la aguja mientras se aplica la técnica. Así se coloca con precisión.",
      },
      {
        question: "¿Duelen estas técnicas?",
        answer:
          "La ecografía no duele. Con la aguja puede notar un pinchazo breve y una sensación de presión.",
      },
      {
        question: "¿Qué ocurre tras una punción seca?",
        answer:
          "Lo más habitual es una zona sensible y, a veces, un moratón diminuto. Los efectos graves son muy poco frecuentes.",
      },
      {
        question: "¿Cuántas sesiones de punción seca se necesitan?",
        answer:
          "Depende de qué le pasa y de cómo responda. Tras la valoración se concreta el plan.",
      },
      {
        question: "¿Quién puede hacer una punción seca?",
        answer:
          "Un fisioterapeuta con formación específica. Pregunte siempre por la formación de quien la aplica.",
      },
      {
        question: "¿Qué riesgos tiene la punción seca?",
        answer:
          "Los efectos más habituales son leves: sangrado en el punto de la aguja, moratón o dolor durante la técnica. En un estudio con unos 20.500 tratamientos, declarados por fisioterapeutas, el 37 % tuvo algún efecto leve. Los graves fueron alrededor de uno por cada mil. Por eso conviene avisar antes de un embarazo, de los anticoagulantes o de una infección.",
      },
      {
        question: "¿Cuánto dura el efecto de la punción seca?",
        answer:
          "Depende de cada persona y del problema. En el dolor cervical con puntos gatillo, una revisión de 2020 halló evidencia entre baja y moderada de alivio a corto plazo.",
      },
    ],
  },
  contact: {
    id: "donde-estamos",
    title: "Dónde estamos y cuándo abrimos",
    details: [
      "**MUV El Cañaveral** · C. Victoria Kent, Local 8 · 28052 Madrid *(El Cañaveral, distrito de Vicálvaro)*",
      "**Horario:** atendemos de lunes a viernes, por la mañana y por la tarde, y los sábados por la mañana. Para el horario exacto, llame a la clínica o pida cita.",
    ],
    directions:
      "Hay una parada de autobús muy cerca de la puerta. Los detalles están en la página de [MUV El Cañaveral](/sedes/el-canaveral#como-llegar).",
    cta: "Pedir cita para una valoración con ecografía",
  },
  sources: [
    "1. Smith M et al. *A proposed framework for point of care musculoskeletal ultrasound and ultrasound image-guided interventions by physiotherapists.* Ultrasound J 2023. [PMID 36939971](https://pubmed.ncbi.nlm.nih.gov/36939971/).",
    "2. Navarro-Santana MJ et al. *Effectiveness of dry needling for myofascial trigger points associated with neck pain symptoms.* J Clin Med 2020. [PMID 33066556](https://pubmed.ncbi.nlm.nih.gov/33066556/).",
    "3. Boyce D et al. *Adverse events associated with therapeutic dry needling.* Int J Sports Phys Ther 2020. [PMID 32089962](https://pubmed.ncbi.nlm.nih.gov/32089962/).",
  ],
};
