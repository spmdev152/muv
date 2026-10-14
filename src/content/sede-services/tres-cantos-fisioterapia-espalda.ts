/**
 * `/sedes/tres-cantos/fisioterapia-espalda`
 * Fisioterapia de espalda, cervical y lumbar.
 *
 * Fuente: `docs/contenidos/MUV-WEB-TRES-CANTOS-ESPALDA.pdf` (#41), texto
 * literal. Lo que el PDF marca en rojo no está aquí.
 */

import type { SedeServiceContent } from "@/content/sede-service-types";

export const tresCantosEspalda: SedeServiceContent = {
  location: "tres-cantos",
  slug: "fisioterapia-espalda",
  label: "Fisioterapia de espalda, cervical y lumbar",
  source: "docs/contenidos/MUV-WEB-TRES-CANTOS-ESPALDA.pdf",
  meta: {
    title: "Fisioterapia de espalda y ciática en Tres Cantos | MUV",
    description:
      "Lumbalgia, ciática, hernia discal y cervicalgia: valoración y ejercicio para recuperar función. Fisioterapia de espalda en Tres Cantos. Pida cita en MUV.",
  },
  hero: {
    title: "Fisioterapia de espalda, cervical y lumbar en Tres Cantos",
    lede:
      "¿Le duele la espalda al levantarse, al final de la jornada o cada vez que vuelve a entrenar? En MUV Tres Cantos hacemos fisioterapia de espalda y cuello: valoramos su caso, calmamos el dolor y trabajamos con usted para recuperar el movimiento y la fuerza. El objetivo no es solo que duela menos hoy. Es que vuelva a hacer lo que hacía y que sea menos probable que el dolor reaparezca.",
    essentials: [
      "Dolor lumbar y cervical, ciática, hernias y protrusiones, y dolor de espalda que vuelve.",
      "Terapia manual, neuromodulación, ejercicio terapéutico, movilidad y fuerza. El ejercicio es el centro.",
      "Una hernia o una protrusión en una resonancia no siempre explica el dolor.",
      "Un único fisioterapeuta colegiado lleva su caso de principio a fin.",
    ],
  },
  sections: [
    {
      id: "que-tratamos",
      eyebrow: "Motivos de consulta",
      title: "Dolores de espalda y de cuello que tratamos en Tres Cantos",
      intro: [
        {
          type: "p",
          text:
            "Dolor que se levanta con usted, que empeora al final del día o que vuelve cada pocos meses.",
        },
      ],
      subsections: [
        {
          title: "Dolor lumbar, lumbalgia y lumbago",
          blocks: [
            {
              type: "p",
              text:
                "Dolor en la parte baja de la espalda, con o sin rigidez, al levantarse, agacharse, estar sentado o entrenar. Es muy común. Las guías recomiendan mantenerse activo y hacer ejercicio.",
            },
          ],
        },
        {
          title: "Ciática",
          blocks: [
            {
              type: "p",
              text:
                "Dolor que baja desde la zona lumbar o el glúteo por una pierna, a veces con hormigueo o debilidad. Es un síntoma, no una enfermedad: puede venir de causas distintas y por eso se valora cada caso.",
            },
          ],
        },
        {
          title: "Hernia discal y protrusión",
          blocks: [
            {
              type: "p",
              text:
                "El disco es un amortiguador entre vértebras: puede abombarse (protrusión) o salirse de su sitio (hernia). La protrusión se ve en las pruebas de imagen de muchas personas sin dolor, y por eso conviene interpretar los hallazgos con cuidado.",
            },
          ],
        },
        {
          title: "Dolor cervical, cervicalgia y tortícolis",
          blocks: [
            {
              type: "p",
              text:
                "Dolor y tensión en el cuello, a veces hasta los hombros o la cabeza. Empeoran con las horas de pantalla o de volante.",
            },
          ],
        },
        {
          title: "Dolor de espalda que vuelve",
          blocks: [
            {
              type: "p",
              text:
                "Episodios que mejoran y reaparecen. Aquí es donde más aporta la fisioterapia: tratar el episodio y preparar la espalda para el siguiente. Una revisión Cochrane de 2010 encontró evidencia moderada de que seguir con ejercicio después del episodio ayuda a prevenir las recurrencias.",
            },
          ],
        },
        {
          title: "Rigidez por muchas horas sentado",
          blocks: [
            {
              type: "p",
              text:
                "Espalda y cuello que se bloquean tras la jornada. Se trabaja con movilidad, fuerza y pausas activas.",
            },
          ],
        },
      ],
    },
    {
      id: "como-trabajamos",
      title: "Cuatro fases para recuperar la función de la espalda",
      intro: [],
      subsections: [
        {
          title: "Valoramos",
          blocks: [
            {
              type: "p",
              text:
                "Qué le pasa, desde cuándo y qué lo empeora o lo alivia. Exploramos la espalda y también la cadera y las piernas. Y buscamos las señales que exigirían ver antes a su médico.",
            },
          ],
        },
        {
          title: "Aliviamos",
          blocks: [
            {
              type: "p",
              text:
                "Reducimos el dolor para que pueda moverse. Se usan la terapia manual y la neuromodulación, cuando la valoración lo indica y siempre como apoyo del movimiento.",
            },
          ],
        },
        {
          title: "Movemos",
          blocks: [
            {
              type: "p",
              text:
                "Recuperamos la movilidad de la espalda, el cuello, la cadera y los hombros.",
            },
          ],
        },
        {
          title: "Fortalecemos",
          blocks: [
            {
              type: "p",
              text:
                "Fuerza de espalda, abdomen, glúteos y piernas. Es la fase que más pesa a medio plazo, porque es lo que mantiene la mejoría y reduce las recaídas. La clínica ofrece además clases de [entrenamiento funcional supervisado en Tres Cantos](/sedes/tres-cantos/entrenamiento-funcional).",
            },
          ],
        },
      ],
    },
    {
      id: "tecnicas",
      title:
        "Técnicas de fisioterapia que utilizamos para la espalda y el cuello",
      intro: [
        {
          type: "p",
          text:
            "Las guías de lumbalgia recomiendan el ejercicio y sitúan la terapia manual solo dentro de un programa que lo incluya. Así lo planteamos: el ejercicio es el centro y lo demás lo acompaña. Las demás técnicas de la clínica se explican en la página de [fisioterapia deportiva y readaptación](/sedes/tres-cantos/fisioterapia-deportiva#tecnicas).",
        },
      ],
      subsections: [
        {
          title: "Ejercicio terapéutico, movilidad y fuerza",
          blocks: [
            {
              type: "p",
              text:
                "Es la base. Una revisión Cochrane analiza el ejercicio en el dolor lumbar crónico. Las guías de cuello y de espalda lo sitúan en primer lugar. Se pauta a su nivel y se sube poco a poco.",
            },
          ],
        },
        {
          title: "Terapia manual",
          blocks: [
            {
              type: "p",
              text:
                "Masaje, movilizaciones y técnicas sobre músculos y articulaciones para aliviar el dolor y ganar movilidad. Sirve para facilitar el movimiento, no para sustituirlo.",
            },
          ],
        },
        {
          title: "Neuromodulación percutánea ecoguiada",
          blocks: [
            {
              type: "p",
              text:
                "Una aguja muy fina junto a un nervio, guiada con ecografía, para aliviar algunos dolores persistentes. Es una técnica reciente con investigación todavía limitada; se considera un complemento del ejercicio, no un tratamiento único.",
            },
          ],
        },
      ],
    },
    {
      id: "lo-que-dicen-las-pruebas-de-imagen",
      title:
        "Hernia, protrusión y resonancia: lo que dicen las pruebas de imagen",
      intro: [],
      subsections: [
        {
          title: "Un hallazgo en la resonancia no siempre explica el dolor",
          blocks: [
            {
              type: "p",
              text:
                "Una revisión de 33 estudios con más de tres mil personas sin dolor encontró cambios en los discos en muchas de ellas. A los 20 años, casi tres de cada diez tenían una protrusión discal y cerca de cuatro de cada diez, desgaste de los discos. Con los años, esos hallazgos son todavía más frecuentes. Muchos forman parte del envejecimiento normal y no se asocian al dolor.",
            },
          ],
        },
        {
          title: "Por qué no se pide una resonancia de entrada",
          blocks: [
            {
              type: "p",
              text:
                "La guía NICE recomienda no ofrecer pruebas de imagen de forma rutinaria en el dolor lumbar en atención no especializada. Si ya tiene una, tráigala: se interpreta junto con la exploración y con lo que usted siente.",
            },
          ],
        },
        {
          title: "Entonces, ¿una hernia importa?",
          blocks: [
            {
              type: "p",
              text:
                "Importa cuando coincide con lo que le pasa: dolor que baja por la pierna, debilidad o pérdida de sensibilidad. Una hernia en una imagen no significa que deba dejar de moverse ni que necesite operarse. La cirugía es una decisión de su médico.",
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
            "Le atendemos en un **centro sanitario registrado**, con el número **CS 21018** de la Comunidad de Madrid. **José Luis González Coronado**, fisioterapeuta colegiado nº 15502 y responsable de la clínica, lleva su caso de principio a fin.",
        },
      ],
      subsections: [],
    },
    {
      id: "consejos-y-mitos",
      eyebrow: "Mientras tanto",
      title: "Tres consejos para su espalda y tres mitos",
      intro: [],
      subsections: [
        {
          title: "Siga moviéndose",
          blocks: [
            {
              type: "p",
              text:
                "Mantenerse activo ayuda más que acostarse a esperar. Camine y haga las tareas que pueda con un dolor que usted tolere.",
            },
          ],
        },
        {
          title: "Cambie de postura a menudo",
          blocks: [
            {
              type: "p",
              text:
                "Si trabaja sentado, levántese y muévase cada cierto tiempo, aunque sean dos minutos.",
            },
          ],
        },
        {
          title: "Fortalezca poco a poco",
          blocks: [
            {
              type: "p",
              text:
                "El ejercicio es uno de los tratamientos con más respaldo en el dolor lumbar persistente. Empiece con poca carga y súbala de forma gradual.",
            },
          ],
        },
        {
          title: "Mito: «Con dolor de espalda hay que hacer reposo»",
          blocks: [
            {
              type: "p",
              text:
                "No. Una revisión Cochrane concluyó que mantenerse activo es igual o algo mejor que el reposo en cama en la lumbalgia aguda. En la ciática, la diferencia es escasa o nula.",
            },
          ],
        },
        {
          title: "Mito: «Con una hernia no se puede hacer ejercicio»",
          blocks: [
            {
              type: "p",
              text:
                "No necesariamente. Las protrusiones aparecen también en personas sin dolor, y las guías recomiendan ejercicio para el dolor lumbar. Cómo y cuánto, se pauta tras la valoración.",
            },
          ],
        },
        {
          title: "Mito: «Mi resonancia dice que la espalda está desgastada»",
          blocks: [
            {
              type: "p",
              text:
                "El desgaste que se ve en una imagen es frecuente, aumenta con la edad y suele formar parte del envejecimiento. No significa que su espalda esté rota.",
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
            "La gran mayoría de los dolores de espalda no son graves. Pero algunas señales piden ver antes a su médico o ir a urgencias:",
        },
        {
          type: "list",
          items: [
            "Pérdida de control de la vejiga o del intestino, o entumecimiento entre las piernas.",
            "Debilidad que empeora en una pierna o en un brazo.",
            "Fiebre con dolor de espalda.",
            "Dolor tras una caída o un golpe fuerte.",
            "Dolor constante por la noche que no mejora con la postura, sobre todo si hay antecedentes de cáncer o pérdida de peso inexplicada.",
            "Dolor de cuello con dolor u opresión en el pecho, falta de aire o sudor frío: llame al 112.",
          ],
        },
      ],
      subsections: [],
    },
  ],
  faq: {
    id: "preguntas-frecuentes",
    eyebrow: "Dudas habituales",
    title: "Preguntas frecuentes sobre la fisioterapia de espalda y cuello",
    items: [
      {
        question: "¿Es bueno ir al fisioterapeuta con una lumbalgia?",
        answer:
          "Sí. Las guías recomiendan ejercicio y mantenerse activo, y el fisioterapeuta le ayuda a pautarlo con seguridad según su caso.",
      },
      {
        question: "¿Qué ejercicios debo evitar con una lumbalgia?",
        answer:
          "Depende de la fase. Al principio, evite lo que le dispare el dolor, pero no se quede quieto: el reposo absoluto no ayuda. Con la valoración se ajusta qué sí y qué no.",
      },
      {
        question: "¿Cuántas sesiones hacen falta para una ciática?",
        answer:
          "Depende de cada caso: la ciática es un síntoma con causas y evoluciones distintas. Tras la valoración se concreta el plan.",
      },
      {
        question: "¿Es bueno caminar con ciática?",
        answer:
          "Suele ser una de las primeras pautas: caminar a un ritmo que no aumente el dolor. Si al caminar el dolor le baja más por la pierna, cuéntenoslo.",
      },
      {
        question: "¿Es bueno ir al fisioterapeuta con una hernia discal?",
        answer:
          "Sí. El ejercicio y la educación son la base del tratamiento, y no hace falta dejar de moverse. La cirugía se valora solo en casos concretos.",
      },
      {
        question: "¿Qué hace un fisioterapeuta en las cervicales?",
        answer:
          "Valora la movilidad y la fuerza del cuello, trata la tensión muscular con técnicas manuales y pauta ejercicios para mantener el resultado.",
      },
      {
        question:
          "¿Qué diferencia hay entre un médico rehabilitador y un fisioterapeuta?",
        answer:
          "El médico rehabilitador es un médico especialista: diagnostica, puede pedir pruebas y recetar. El fisioterapeuta valora y trata con técnicas físicas y ejercicio.",
      },
      {
        question: "¿Necesito una resonancia para empezar?",
        answer:
          "No. Las guías recomiendan no pedirla de forma rutinaria en el dolor lumbar. Si ya tiene una, tráigala.",
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
      "Todo sobre el acceso, el aparcamiento y la entrada está en la página de [MUV Tres Cantos](/sedes/tres-cantos#como-llegar).",
    cta: "Pedir cita para valorar su espalda",
  },
  sources: [
    "1. NICE. *Low back pain and sciatica in over 16s: assessment and management (NG59).* 2016, modificada en 2026.",
    "2. Foster NE et al. *Prevention and treatment of low back pain: evidence, challenges, and promising directions.* Lancet 2018. [PMID 29573872](https://pubmed.ncbi.nlm.nih.gov/29573872/).",
    "3. Hayden JA et al. *Exercise therapy for chronic low back pain.* Cochrane Database Syst Rev 2021. [PMID 34580864](https://pubmed.ncbi.nlm.nih.gov/34580864/).",
    "4. Dahm KT et al. *Advice to rest in bed versus advice to stay active for acute low-back pain and sciatica.* Cochrane Database Syst Rev 2010. [PMID 20556780](https://pubmed.ncbi.nlm.nih.gov/20556780/).",
    "5. Choi BK et al. *Exercises for prevention of recurrences of low-back pain.* Cochrane Database Syst Rev 2010. [PMID 20091596](https://pubmed.ncbi.nlm.nih.gov/20091596/).",
    "6. Brinjikji W et al. *Systematic literature review of imaging features of spinal degeneration in asymptomatic populations.* AJNR 2015. [PMID 25430861](https://pubmed.ncbi.nlm.nih.gov/25430861/).",
    "7. Blanpied PR et al. *Neck Pain: Revision 2017.* JOSPT 2017. [PMID 28666405](https://pubmed.ncbi.nlm.nih.gov/28666405/).",
  ],
};
