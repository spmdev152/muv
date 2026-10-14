/**
 * `/sedes/tres-cantos/fisioterapia-deportiva`
 * Fisioterapia deportiva y readaptación.
 *
 * Fuente: `docs/contenidos/MUV-WEB-TRES-CANTOS-DEPORTIVA.pdf` (#39), texto
 * literal. Lo que el PDF marca en rojo no está aquí.
 */

import type { SedeServiceContent } from "@/content/sede-service-types";

export const tresCantosDeportiva: SedeServiceContent = {
  location: "tres-cantos",
  slug: "fisioterapia-deportiva",
  label: "Fisioterapia deportiva y readaptación",
  source: "docs/contenidos/MUV-WEB-TRES-CANTOS-DEPORTIVA.pdf",
  meta: {
    title: "Fisioterapia deportiva en Tres Cantos: readaptación | MUV",
    description:
      "Fisioterapia deportiva en Tres Cantos: lesiones, tendinopatías y readaptación con ecografía. Vuelta al entrenamiento con criterios. Pida cita en MUV.",
  },
  hero: {
    title: "Fisioterapia deportiva y readaptación de lesiones en Tres Cantos",
    lede:
      "Una lesión no termina cuando se acaba el dolor: termina cuando vuelve a entrenar con confianza. En MUV Tres Cantos hacemos fisioterapia deportiva y readaptación: valoramos su lesión, la tratamos y trabajamos con usted hasta la vuelta al deporte. Combinamos ecografía musculoesquelética, técnicas invasivas guiadas, terapia manual y ejercicio.",
    essentials: [
      "Lesiones deportivas, de la valoración a la vuelta al entrenamiento.",
      "Ecografía, neuromodulación percutánea ecoguiada, EPTE, punción seca y electropunción, terapia manual, ejercicio terapéutico, fuerza y readaptación.",
      "El ejercicio es el pilar; el resto de técnicas lo acompañan.",
      "Le atiende un fisioterapeuta colegiado, el mismo de principio a fin.",
    ],
  },
  sections: [
    {
      id: "que-tratamos",
      eyebrow: "Motivos de consulta",
      title: "Lesiones deportivas que tratamos en Tres Cantos",
      intro: [
        {
          type: "p",
          text:
            "Tanto si corre como si juega al pádel, entrena con pesas o juega en equipo, las lesiones se repiten más de lo que parece.",
        },
      ],
      subsections: [
        {
          title: "Tendinopatías",
          blocks: [
            {
              type: "p",
              text:
                "Dolor localizado en un tendón —rotuliano, de Aquiles, del codo (epicondilitis), del hombro— que aparece al cargar y suele aliviarse al calentar. Surge cuando el entrenamiento le exige más de lo que está preparado para dar.",
            },
          ],
        },
        {
          title: "Lesiones musculares",
          blocks: [
            {
              type: "p",
              text:
                "Desde sobrecargas hasta roturas de fibras en isquiotibiales, gemelos, aductores o cuádriceps. Suelen aparecer al esprintar, frenar o estirar mucho el músculo.",
            },
          ],
        },
        {
          title: "Esguinces y lesiones de ligamento",
          blocks: [
            {
              type: "p",
              text:
                "Tobillo, rodilla, muñeca. Un giro o un apoyo mal colocado, con hinchazón y miedo a volver a pisar.",
            },
          ],
        },
        {
          title: "Dolor del corredor y sobrecarga por entrenamiento",
          blocks: [
            {
              type: "p",
              text:
                "Espinilla, planta del pie (fascitis plantar), cara externa de la rodilla (cintilla iliotibial) o cadera: dolores que crecen cuando el volumen de entrenamiento sube más deprisa de lo que el cuerpo puede asimilar.",
            },
          ],
        },
        {
          title: "Rodilla y espalda del deportista",
          blocks: [
            {
              type: "p",
              text:
                "Tienen su propia página: [fisioterapia de rodilla](/sedes/tres-cantos/fisioterapia-rodilla) y [fisioterapia de espalda, cervical y lumbar](/sedes/tres-cantos/fisioterapia-espalda).",
            },
          ],
        },
        {
          title: "Postoperatorio y vuelta a la actividad",
          blocks: [
            {
              type: "p",
              text:
                "Tras una operación, la zona debe recuperar movimiento, fuerza y confianza. Las indicaciones de su cirujano marcan el punto de partida: llévelas a la primera cita.",
            },
          ],
        },
      ],
    },
    {
      id: "como-trabajamos",
      title: "De la valoración a la vuelta al deporte: cuatro fases",
      intro: [
        {
          type: "p",
          text:
            "Valoramos antes de tratar. Y no se pasa de una fase a la siguiente por el calendario, sino porque el cuerpo está preparado.",
        },
      ],
      subsections: [
        {
          title: "Valoramos",
          blocks: [
            {
              type: "p",
              text:
                "Qué le pasó, cuándo y con qué carga de entrenamiento. Exploramos la zona lesionada y las que la rodean. Cuando está indicado, la vemos con ecografía.",
            },
          ],
        },
        {
          title: "Tratamos",
          blocks: [
            {
              type: "p",
              text:
                "Aliviamos el dolor y damos al tejido las condiciones para recuperarse, con las técnicas que hagan falta.",
            },
          ],
        },
        {
          title: "Readaptamos",
          blocks: [
            {
              type: "p",
              text:
                "Es la fase que más se olvida. Reconstruimos fuerza y capacidad de carga y reintroducimos los gestos de su deporte, de menos a más.",
            },
          ],
        },
        {
          title: "Volvemos con criterios",
          blocks: [
            {
              type: "p",
              text:
                "El momento de volver lo marcan las pruebas, no un número de semanas. Lo detallamos más abajo.",
            },
          ],
        },
      ],
    },
    {
      id: "tecnicas",
      title: "Técnicas de fisioterapia deportiva que utilizamos",
      intro: [
        {
          type: "p",
          text:
            "Ninguna técnica va sola: el ejercicio es el pilar y las demás lo acompañan cuando la valoración indica que pueden ayudar.",
        },
      ],
      subsections: [
        {
          title: "Ecografía musculoesquelética",
          blocks: [
            {
              type: "p",
              text:
                "Una sonda sobre la piel muestra en tiempo real el músculo, el tendón o el ligamento. Sirve para valorar la lesión y para guiar con precisión las técnicas con aguja. No duele y no sustituye a las pruebas que le indique su médico.",
            },
          ],
        },
        {
          title: "Neuromodulación percutánea ecoguiada",
          blocks: [
            {
              type: "p",
              text:
                "Una aguja muy fina, junto a un nervio y guiada con ecografía, transmite una corriente de baja intensidad. Se utiliza como apoyo en algunos dolores que no ceden con el tratamiento habitual. Es una técnica reciente y la investigación todavía es limitada: por eso se considera un complemento y no un tratamiento único.",
            },
          ],
        },
        {
          title: "Electrólisis percutánea (EPTE)",
          blocks: [
            {
              type: "p",
              text:
                "Una aguja guiada con ecografía aplica una corriente galvánica de baja intensidad sobre un tejido alterado, sobre todo un tendón. Una revisión de 2024 concluyó que parece reducir el dolor en las tendinopatías, con una certeza entre baja y moderada: hacen falta más estudios.",
            },
          ],
        },
        {
          title: "Punción seca y electropunción",
          blocks: [
            {
              type: "p",
              text:
                "Una aguja fina, sin inyectar nada, en un punto muy sensible del músculo para aliviar el dolor y la tensión. En la electropunción se añade una corriente suave. En el dolor cervical con puntos gatillo, una revisión de 2020 halló evidencia entre baja y moderada de alivio a corto plazo.",
            },
          ],
        },
        {
          title: "Terapia manual",
          blocks: [
            {
              type: "p",
              text:
                "Masaje, movilizaciones y técnicas sobre músculos y articulaciones para aliviar el dolor y ganar movilidad. En el dolor lumbar y en el dolor femoropatelar, las guías la sitúan como complemento del ejercicio, no como sustituto.",
            },
          ],
        },
        {
          title: "Ejercicio terapéutico, fuerza y readaptación",
          blocks: [
            {
              type: "p",
              text:
                "Es el pilar. Una revisión de seis ensayos asocia más entrenamiento de fuerza con menos lesiones deportivas: la fuerza no solo recupera, también protege. En la clínica también hay clases de [entrenamiento funcional supervisado en Tres Cantos](/sedes/tres-cantos/entrenamiento-funcional).",
            },
          ],
        },
      ],
    },
    {
      id: "cuando-puedo-volver-a-entrenar",
      title: "¿Cuándo puedo volver a entrenar? Criterios, no fechas",
      intro: [
        {
          type: "p",
          text:
            "Es la pregunta más repetida y la que peor se contesta con un número. El consenso internacional de 2016 recuerda que la vuelta al deporte es un proceso continuo, no un momento.",
        },
      ],
      subsections: [
        {
          title: "Cinco criterios",
          blocks: [
            {
              type: "list",
              items: [
                "El dolor es leve y no empeora a la mañana siguiente.",
                "La movilidad es completa.",
                "La fuerza es parecida en los dos lados.",
                "Puede saltar, correr o cambiar de dirección sin dolor.",
                "Confía en la zona lesionada.",
              ],
            },
          ],
        },
        {
          title: "Un ejemplo: la rodilla tras el LCA",
          blocks: [
            {
              type: "p",
              text:
                "La investigación sobre el ligamento cruzado anterior lo ilustra: volver pronto y con una fuerza muy distinta entre las dos piernas se asocia a más nuevas lesiones de rodilla. Lo explicamos en fisioterapia de rodilla.",
            },
          ],
        },
        {
          title: "Una señal para avanzar y una para frenar",
          blocks: [
            {
              type: "p",
              text:
                "**Avance** cuando la sesión no deja huella al día siguiente. **Frene** si el dolor crece, aparece hinchazón o cambia su forma de moverse.",
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
            "La clínica figura en el registro de centros sanitarios de la Comunidad de Madrid con el número **CS 21018**. **José Luis González Coronado**, fisioterapeuta colegiado nº 15502 y responsable de la clínica, le atiende de principio a fin.",
        },
      ],
      subsections: [],
    },
    {
      id: "consejos-y-mitos",
      eyebrow: "Mientras tanto",
      title: "Recuperarse y prevenir recaídas: tres consejos y tres mitos",
      intro: [],
      subsections: [
        {
          title: "Mueva lo que no duele",
          blocks: [
            {
              type: "p",
              text:
                "Salvo indicación médica, el reposo total no suele ayudar. Mantenga lo que pueda hacer sin dolor.",
            },
          ],
        },
        {
          title: "Suba la carga poco a poco",
          blocks: [
            {
              type: "p",
              text:
                "Los cambios bruscos de volumen, de intensidad o de superficie pueden provocar lesiones. Progrese de forma gradual.",
            },
          ],
        },
        {
          title: "Incluya fuerza en su semana",
          blocks: [
            {
              type: "p",
              text:
                "Entrenar la fuerza reduce el riesgo de lesión, y es la base de la readaptación.",
            },
          ],
        },
        {
          title: "Mito: «Si no duele, ya puedo volver»",
          blocks: [
            {
              type: "p",
              text:
                "No necesariamente. Que no haya dolor no significa que el tejido esté preparado para la carga: la vuelta se decide por criterios.",
            },
          ],
        },
        {
          title: "Mito: «Con reposo total se cura antes»",
          blocks: [
            {
              type: "p",
              text:
                "No. En un tendón con dolor, la estrategia conservadora más extendida es cargarlo de forma progresiva.",
            },
          ],
        },
        {
          title: "Mito: «Una ecografía lo dice todo»",
          blocks: [
            {
              type: "p",
              text:
                "La imagen enseña el tejido, no el dolor. Se interpreta siempre junto con la exploración y lo que usted siente.",
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
            "La mayoría de las lesiones deportivas se tratan bien con fisioterapia. En estos casos, vea antes a su médico o acuda a urgencias:",
        },
        {
          type: "list",
          items: [
            "Dolor intenso tras un golpe, con deformidad o imposibilidad de apoyar o mover la zona.",
            "Un chasquido súbito seguido de pérdida de fuerza o de función.",
            "Hinchazón rápida con calor y enrojecimiento, o con fiebre.",
            "Dolor, hinchazón o calor en una pantorrilla.",
            "Adormecimiento o pérdida de fuerza en una extremidad.",
            "Dolor intenso por la noche, aunque esté en reposo, que no varía con la postura.",
          ],
        },
      ],
      subsections: [],
    },
  ],
  faq: {
    id: "preguntas-frecuentes",
    eyebrow: "Dudas habituales",
    title: "Preguntas frecuentes sobre fisioterapia deportiva",
    items: [
      {
        question: "¿Qué incluye la fisioterapia deportiva?",
        answer:
          "La valoración de la lesión, el tratamiento del dolor y del tejido, y la readaptación: fuerza y gesto deportivo hasta la vuelta. Según el caso se añaden ecografía y técnicas guiadas.",
      },
      {
        question: "¿Cuántas sesiones necesito?",
        answer:
          "Depende de la lesión, de lo grave que sea y de su forma física de partida. Con la valoración hecha, se plantea el plan.",
      },
      {
        question: "¿Qué diferencia hay entre rehabilitación y readaptación?",
        answer:
          "La rehabilitación recupera la función de la zona lesionada. La readaptación va más allá: prepara el cuerpo para las exigencias de su deporte, como carga, velocidad, saltos y cambios de dirección.",
      },
      {
        question: "¿Puedo seguir entrenando mientras me tratan?",
        answer:
          "Casi siempre, con modificaciones: se mantiene lo que no duele y se ajusta la carga de lo que sí. Depende de la lesión.",
      },
      {
        question: "¿La ecografía sustituye a la resonancia?",
        answer:
          "No. Ayuda a valorar y a guiar el tratamiento, pero no sustituye a las pruebas que le indique su médico.",
      },
      {
        question: "¿Duelen las técnicas con aguja?",
        answer:
          "La ecografía no duele. Las técnicas con aguja pueden molestar unos segundos.",
      },
      {
        question: "¿Qué pasa después de una punción seca?",
        answer:
          "Es frecuente un pequeño sangrado o un moratón en el punto de la aguja, y a veces molestia en la zona. En un estudio con unos 20.500 tratamientos, declarados por los propios fisioterapeutas, el 37 % tuvo algún efecto leve. Los graves fueron alrededor de uno por cada mil. Si algo le preocupa, avísenos.",
      },
      {
        question: "¿Qué debo llevar a la primera cita?",
        answer:
          "Los informes o pruebas de imagen de la lesión, si los tiene, y las indicaciones de su médico o de su cirujano.",
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
      "Para llegar, aparcar o entrar sin barreras, consulte la página de [MUV Tres Cantos](/sedes/tres-cantos#como-llegar).",
    cta: "Pedir cita para valorar su lesión",
  },
  sources: [
    "1. Ardern CL et al. *2016 Consensus statement on return to sport from the First World Congress in Sports Physical Therapy, Bern.* Br J Sports Med 2016. [PMID 27226389](https://pubmed.ncbi.nlm.nih.gov/27226389/).",
    "2. Grindem H et al. *Simple decision rules can reduce reinjury risk after ACL reconstruction.* Br J Sports Med 2016. [PMID 27162233](https://pubmed.ncbi.nlm.nih.gov/27162233/).",
    "3. Malliaras P et al. *Achilles and patellar tendinopathy loading programmes.* Sports Med 2013. [PMID 23494258](https://pubmed.ncbi.nlm.nih.gov/23494258/).",
    "4. Ferreira MHL et al. *Effectiveness of percutaneous needle electrolysis to reduce pain in tendinopathies: a systematic review with meta-analysis.* J Sport Rehabil 2024. [PMID 38897578](https://pubmed.ncbi.nlm.nih.gov/38897578/).",
    "5. Navarro-Santana MJ et al. *Effectiveness of dry needling for myofascial trigger points associated with neck pain symptoms.* J Clin Med 2020. [PMID 33066556](https://pubmed.ncbi.nlm.nih.gov/33066556/).",
    "6. Boyce D et al. *Adverse events associated with therapeutic dry needling.* Int J Sports Phys Ther 2020. [PMID 32089962](https://pubmed.ncbi.nlm.nih.gov/32089962/).",
    "7. Lauersen JB et al. *Strength training as superior, dose-dependent and safe prevention of acute and overuse sports injuries.* Br J Sports Med 2018. [PMID 30131332](https://pubmed.ncbi.nlm.nih.gov/30131332/).",
    "8. Smith M et al. *A proposed framework for point of care musculoskeletal ultrasound and ultrasound image-guided interventions by physiotherapists.* Ultrasound J 2023. [PMID 36939971](https://pubmed.ncbi.nlm.nih.gov/36939971/).",
    "9. NICE. *Low back pain and sciatica in over 16s (NG59)*, sobre la terapia manual dentro de un programa con ejercicio.",
    "10. Collins NJ et al. *2018 Consensus statement on exercise therapy and physical interventions to treat patellofemoral pain.* Br J Sports Med 2018. [PMID 29925502](https://pubmed.ncbi.nlm.nih.gov/29925502/).",
  ],
};
