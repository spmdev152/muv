/**
 * `/sedes/tres-cantos/fisioterapia-rodilla`
 * Fisioterapia de rodilla.
 *
 * Fuente: `docs/contenidos/MUV-WEB-TRES-CANTOS-RODILLA.pdf` (#40), texto
 * literal. Lo que el PDF marca en rojo no está aquí.
 *
 * El H3 «Artrosis y dolor persistente de rodilla» del módulo 2 no está: el PDF
 * lo deja sin publicar hasta que el fisioterapeuta confirme que atiende
 * artrosis de rodilla.
 */

import type { SedeServiceContent } from "@/content/sede-service-types";

export const tresCantosRodilla: SedeServiceContent = {
  location: "tres-cantos",
  slug: "fisioterapia-rodilla",
  label: "Fisioterapia de rodilla",
  source: "docs/contenidos/MUV-WEB-TRES-CANTOS-RODILLA.pdf",
  meta: {
    title: "Fisioterapia de rodilla en Tres Cantos: menisco y LCA | MUV",
    description:
      "Menisco, LCA, rótula y tendinitis rotuliana: fisioterapia y rehabilitación de rodilla en Tres Cantos, con o sin operación. Pida cita en MUV.",
  },
  hero: {
    title: "Fisioterapia de rodilla y lesiones de rodilla en Tres Cantos",
    lede:
      "¿Le duele la rodilla al subir escaleras, al correr o al levantarse de la silla? En MUV Tres Cantos hacemos fisioterapia de rodilla: valoramos su caso, le explicamos qué le pasa y trabajamos con usted hasta que vuelve a confiar en ella. Primero el dolor, después la fuerza y, si es lo que busca, el deporte.",
    essentials: [
      "Tratamos dolor femoropatelar, tendinopatías, meniscos, ligamentos —incluido el LCA— y la recuperación tras una operación.",
      "El ejercicio y la fuerza son el centro. Las demás técnicas lo complementan.",
      "Utilizamos ecografía y, como complemento, neuromodulación ecoguiada, cuando la valoración lo indica.",
      "Una sola persona, fisioterapeuta colegiado, le acompaña durante todo el proceso.",
    ],
  },
  sections: [
    {
      id: "que-tratamos",
      eyebrow: "Motivos de consulta",
      title: "Lesiones y dolores de rodilla que tratamos en Tres Cantos",
      intro: [
        {
          type: "p",
          text:
            "Casi nadie llega sabiendo cómo se llama su lesión: llega sabiendo dónde le duele y cuándo.",
        },
      ],
      subsections: [
        {
          title:
            "Dolor delante de la rodilla: síndrome femoropatelar y condromalacia",
          blocks: [
            {
              type: "p",
              text:
                "Dolor alrededor o detrás de la rótula al subir escaleras, ponerse en cuclillas, correr o tras un rato sentado. Es muy frecuente, también sin hacer deporte. El consenso internacional de 2018 recomienda empezar por ejercicio de cadera y de rodilla.",
            },
          ],
        },
        {
          title: "Tendinitis o tendinopatía rotuliana y del cuádriceps",
          blocks: [
            {
              type: "p",
              text:
                "Dolor justo debajo o encima de la rótula al saltar, correr o hacer sentadillas. El tendón se irrita cuando la carga supera lo que tolera, y mejora enseñándole a tolerar más, poco a poco.",
            },
          ],
        },
        {
          title: "Menisco",
          blocks: [
            {
              type: "p",
              text:
                "Los meniscos amortiguan la rodilla. Pueden lesionarse por un giro brusco o por desgaste. Provocan dolor en el interior o el exterior de la rodilla, chasquidos y, a veces, bloqueos. No todas las roturas necesitan operación: lo explicamos más abajo.",
            },
          ],
        },
        {
          title: "Ligamentos y rotura del ligamento cruzado anterior (LCA)",
          blocks: [
            {
              type: "p",
              text:
                "El ligamento cruzado anterior se rompe sobre todo en giros y frenadas. Si hay rotura, la decisión de operar la toma usted con su traumatólogo. Lo que depende de la rehabilitación es cómo se recupera la fuerza y cuándo se vuelve al deporte.",
            },
          ],
        },
        {
          title: "Rehabilitación tras una operación de rodilla",
          blocks: [
            {
              type: "p",
              text:
                "Tras una artroscopia, una cirugía de menisco o una reconstrucción del LCA, la rodilla debe volver a moverse, cargar y confiar. Si le han operado, traiga el informe y las indicaciones de su cirujano: la rehabilitación parte de ahí.",
            },
          ],
        },
      ],
    },
    {
      id: "como-trabajamos",
      title:
        "Rehabilitación de rodilla: de la valoración a la vuelta a la actividad",
      intro: [],
      subsections: [
        {
          title: "1. Valoramos",
          blocks: [
            {
              type: "p",
              text:
                "Hablamos de qué le pasa y qué movimientos le duelen. Exploramos la rodilla, la cadera, el tobillo y la fuerza de las piernas, porque el origen no siempre está donde duele. Cuando está indicado, miramos el tendón o la articulación con ecografía.",
            },
          ],
        },
        {
          title: "2. Calmamos el dolor",
          blocks: [
            {
              type: "p",
              text:
                "El objetivo es que la rodilla pueda moverse y cargar. Aquí entran las técnicas guiadas con ecografía, siempre como apoyo del ejercicio.",
            },
          ],
        },
        {
          title: "3. Recuperamos fuerza y control",
          blocks: [
            {
              type: "p",
              text:
                "Es la fase central: cuádriceps, isquiotibiales, glúteo y gemelo, y control del movimiento al aterrizar, girar y frenar. También hay clases de [entrenamiento funcional supervisado en Tres Cantos](/sedes/tres-cantos/entrenamiento-funcional).",
            },
          ],
        },
        {
          title: "4. Volvemos a la actividad",
          blocks: [
            {
              type: "p",
              text:
                "Primero a la vida diaria y, si es su objetivo, al deporte. La vuelta se decide por criterios —dolor controlado, movilidad completa, fuerza y capacidad de soportar la carga— y no solo por una fecha.",
            },
          ],
        },
      ],
    },
    {
      id: "tecnicas",
      title: "Técnicas de fisioterapia que utilizamos para la rodilla",
      intro: [
        {
          type: "p",
          text:
            "En la rodilla, el ejercicio es el centro del plan. El resto se suma solo si la valoración lo justifica. Cada técnica se explica entera en la página de [fisioterapia deportiva y readaptación](/sedes/tres-cantos/fisioterapia-deportiva#tecnicas).",
        },
      ],
      subsections: [
        {
          title: "Ejercicio terapéutico y fuerza",
          blocks: [
            {
              type: "p",
              text:
                "Es la base que recomiendan el consenso sobre el dolor femoropatelar y la guía NICE de artrosis. Se parte de una carga que usted tolere y se sube de forma progresiva.",
            },
          ],
        },
        {
          title: "Ecografía musculoesquelética",
          blocks: [
            {
              type: "p",
              text:
                "Enseña al momento el estado del tendón y del líquido de la articulación, y ayuda a colocar con precisión otras técnicas. Complementa las pruebas de su médico; no las reemplaza.",
            },
          ],
        },
        {
          title: "Neuromodulación percutánea ecoguiada",
          blocks: [
            {
              type: "p",
              text:
                "En la rodilla se utiliza como complemento del ejercicio, cuando la valoración lo indica. Es una técnica reciente y la investigación todavía es limitada.",
            },
          ],
        },
      ],
    },
    {
      id: "operacion-o-ejercicio",
      title:
        "¿Operación o ejercicio? Lo que dice la investigación sobre el menisco",
      intro: [],
      subsections: [
        {
          title: "Menisco: una comparación entre cirugía y ejercicio",
          blocks: [
            {
              type: "p",
              text:
                "Un ensayo clínico noruego, publicado en el *BMJ* en 2016, comparó dos opciones en 140 adultos de unos cincuenta años. Todos tenían una rotura de menisco por desgaste y no tenían artrosis evidente. A unos les asignó doce semanas de ejercicio supervisado y a otros, una artroscopia. A los dos años no había diferencias relevantes en la función de la rodilla. El grupo de ejercicio ganó fuerza en el muslo antes, y casi una de cada cinco personas de ese grupo acabó operándose.",
            },
            {
              type: "p",
              text:
                "No significa que nadie deba operarse. Hay roturas en las que la cirugía puede ser lo mejor, sobre todo las de un giro brusco o las que bloquean la rodilla. La decisión es de su traumatólogo.",
            },
          ],
        },
        {
          title: "LCA: por qué se vuelve por criterios y no por fechas",
          blocks: [
            {
              type: "p",
              text:
                "Un estudio de seguimiento siguió a 106 personas que practicaban deportes con giros. Hubo menos nuevas lesiones de rodilla en quienes retrasaban la vuelta hasta los nueve meses desde la operación. Lo mismo ocurrió en quienes volvían con la fuerza del cuádriceps más simétrica entre las dos piernas.",
            },
          ],
        },
      ],
    },
    {
      id: "quien-le-atiende",
      title: "Quién le atiende",
      intro: [
        {
          type: "p",
          text:
            "MUV Tres Cantos es un **centro sanitario** inscrito en la Comunidad de Madrid (**CS 21018**). Su fisioterapeuta es **José Luis González Coronado**, colegiado nº 15502 y responsable de la clínica. Él valora su rodilla, la trata y trabaja con usted en la rehabilitación.",
        },
      ],
      subsections: [],
    },
    {
      id: "consejos-y-mitos",
      eyebrow: "Mientras tanto",
      title: "Tres consejos para su rodilla y tres mitos",
      intro: [],
      subsections: [
        {
          title: "Muévase, pero dosifique",
          blocks: [
            {
              type: "p",
              text:
                "El reposo prolongado rara vez ayuda. Mueva la rodilla con una carga que tolere y súbala poco a poco.",
            },
          ],
        },
        {
          title: "Fortalezca muslos y caderas",
          blocks: [
            {
              type: "p",
              text:
                "Los músculos que sostienen la rodilla son el punto de partida de casi todos los planes.",
            },
          ],
        },
        {
          title: "Avise si el dolor va a más",
          blocks: [
            {
              type: "p",
              text:
                "Una molestia leve que desaparece en un día suele ser tolerable. Si crece, le cambia la forma de andar o persiste, consúltenos antes de seguir.",
            },
          ],
        },
        {
          title: "Mito: «Con una rotura de menisco hay que operarse siempre»",
          blocks: [
            {
              type: "p",
              text:
                "No siempre: en roturas por desgaste, el ejercicio supervisado dio resultados muy parecidos a la cirugía a los dos años.",
            },
          ],
        },
        {
          title: "Mito: «El reposo cura el tendón»",
          blocks: [
            {
              type: "p",
              text:
                "No. En la tendinopatía rotuliana, la estrategia conservadora más estudiada son los programas de carga progresiva, no el reposo.",
            },
          ],
        },
        {
          title: "Mito: «Una rodillera lo arregla»",
          blocks: [
            {
              type: "p",
              text:
                "El consenso internacional de 2018 recomienda el ejercicio como base y reconoce incertidumbre sobre los vendajes y las rodilleras.",
            },
          ],
        },
      ],
    },
    {
      id: "cuando-consultar-antes-con-su-medico",
      title: "Cuándo conviene consultar antes con su médico",
      intro: [
        {
          type: "p",
          text:
            "Estas señales no son habituales, pero piden otra puerta de entrada: su médico o urgencias.",
        },
        {
          type: "list",
          items: [
            "Hinchazón intensa en pocas horas tras un golpe o un giro.",
            "Rodilla bloqueada, que no se estira del todo o que falla al apoyar.",
            "Imposibilidad de apoyar la pierna.",
            "Enrojecimiento y calor en la rodilla, con fiebre.",
            "Dolor nocturno o en reposo que no mejora cambiando de postura.",
            "Pantorrilla dolorida, hinchada o caliente.",
          ],
        },
      ],
      subsections: [],
    },
  ],
  faq: {
    id: "preguntas-frecuentes",
    eyebrow: "Dudas habituales",
    title: "Preguntas frecuentes sobre la fisioterapia de rodilla",
    items: [
      {
        question:
          "¿Qué tipo de fisioterapia se recomienda para el dolor de rodilla?",
        answer:
          "Depende de la causa, pero casi siempre el centro es el ejercicio: fuerza de muslos y caderas, control del movimiento y carga progresiva, con otras técnicas de apoyo.",
      },
      {
        question: "¿Cuántas sesiones necesito?",
        answer:
          "Depende de qué le pasa, desde cuándo y de su actividad. Tras la valoración se concreta un plan.",
      },
      {
        question: "¿Qué ejercicios debo evitar con una rotura de menisco?",
        answer:
          "Depende del tipo de rotura. Hasta que la valoremos, evite lo que le provoque dolor intenso, bloqueo o fallos. Por ejemplo, girar sobre la pierna apoyada o ponerse en cuclillas profundas.",
      },
      {
        question: "¿Cómo se rehabilita el síndrome femoropatelar?",
        answer:
          "Con ejercicio: una combinación de cadera y rodilla, con una carga que sube poco a poco. Suele llevar semanas, no días.",
      },
      {
        question: "¿Cuánto dura la rehabilitación del LCA?",
        answer:
          "Depende de si ha habido operación y de cada persona. Se trabaja por criterios, no por fechas, porque volver demasiado pronto se asocia a más nuevas lesiones.",
      },
      {
        question: "¿Es bueno caminar con una tendinitis rotuliana?",
        answer:
          "Moverse suele ayudar más que parar del todo. Conviene dosificar los saltos, las sentadillas profundas y las bajadas. Si el dolor aumenta, consúltenos.",
      },
      {
        question: "¿Necesito una resonancia para empezar?",
        answer:
          "No para empezar la valoración. Si ya tiene pruebas de imagen o informes, tráigalos. La ecografía complementa la exploración y no sustituye a las pruebas que indique su médico.",
      },
      {
        question: "¿Cuándo empiezo la rehabilitación si me han operado?",
        answer:
          "Depende de la operación, y lo marca su cirujano. Traiga el informe y sus indicaciones a la primera cita: la rehabilitación parte de ahí.",
      },
    ],
  },
  contact: {
    id: "donde-estamos",
    title: "Dónde estamos y cuándo abrimos",
    details: [
      "**MUV Tres Cantos** · Av. de Madrid, 19, Loc 5 · 28760 Tres Cantos",
      "**Horario:** de lunes a viernes, de 10:00 a 14:00 y de 16:00 a 21:00; los sábados, de 9:00 a 14:00. Los domingos cerramos.",
      "**Teléfono:** 614 13 14 05",
    ],
    directions:
      "Encontrará cómo llegar, el aparcamiento y la accesibilidad en la página de [MUV Tres Cantos](/sedes/tres-cantos#como-llegar).",
    cta: "Pedir cita para valorar su rodilla",
  },
  sources: [
    "1. Collins NJ et al. *2018 Consensus statement on exercise therapy and physical interventions to treat patellofemoral pain.* Br J Sports Med 2018. [PMID 29925502](https://pubmed.ncbi.nlm.nih.gov/29925502/).",
    "2. Kise NJ et al. *Exercise therapy versus arthroscopic partial meniscectomy for degenerative meniscal tear in middle aged patients.* BMJ 2016. [PMID 27440192](https://pubmed.ncbi.nlm.nih.gov/27440192/).",
    "3. Logerstedt DS et al. *Knee Pain and Mobility Impairments: Meniscal and Articular Cartilage Lesions, Revision 2018.* JOSPT 2018. [PMID 29385940](https://pubmed.ncbi.nlm.nih.gov/29385940/).",
    "4. Malliaras P et al. *Achilles and patellar tendinopathy loading programmes.* Sports Med 2013. [PMID 23494258](https://pubmed.ncbi.nlm.nih.gov/23494258/).",
    "5. Grindem H et al. *Simple decision rules can reduce reinjury risk after ACL reconstruction.* Br J Sports Med 2016. [PMID 27162233](https://pubmed.ncbi.nlm.nih.gov/27162233/).",
    "6. NICE. *Osteoarthritis in over 16s: diagnosis and management (NG226).*",
  ],
};
