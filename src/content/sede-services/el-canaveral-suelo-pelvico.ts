/**
 * `/sedes/el-canaveral/suelo-pelvico`
 * Fisioterapia de suelo pélvico.
 *
 * Fuente: `docs/contenidos/MUV-WEB-EL-CANAVERAL-SUELO-PELVICO.pdf` (#44), texto
 * literal. Lo que el PDF marca en rojo no está aquí.
 *
 * El teléfono no aparece en «Dónde estamos»: está en rojo hasta que MUV lo
 * confirme (#33). Tampoco la hora de cierre (#35).
 */

import type { SedeServiceContent } from "@/content/sede-service-types";

export const elCanaveralSueloPelvico: SedeServiceContent = {
  location: "el-canaveral",
  slug: "suelo-pelvico",
  label: "Fisioterapia de suelo pélvico",
  source: "docs/contenidos/MUV-WEB-EL-CANAVERAL-SUELO-PELVICO.pdf",
  meta: {
    title: "Fisioterapia de suelo pélvico en El Cañaveral, Madrid | MUV",
    description:
      "Suelo pélvico, embarazo y postparto en El Cañaveral (Madrid): diatermia y seguimiento con fisioterapeutas especializados. Pida cita en MUV.",
  },
  hero: {
    title: "Fisioterapia de suelo pélvico en El Cañaveral, Madrid",
    lede:
      "Pérdidas de orina, sensación de peso, dolor, un embarazo o un parto reciente: el suelo pélvico se puede tratar y entrenar. En MUV El Cañaveral, fisioterapeutas especializados le acompañan desde el embarazo hasta la recuperación tras el parto. Trabajan con ejercicio y, cuando la valoración lo indica, con diatermia y otras tecnologías.",
    essentials: [
      "Todas las disfunciones del suelo pélvico en la mujer.",
      "Seguimiento durante el embarazo y el postparto, con recuperación a través del entrenamiento funcional.",
      "Diatermia y otras tecnologías, junto al ejercicio.",
      "Valoramos antes de tratar.",
    ],
  },
  sections: [
    {
      id: "que-tratamos",
      eyebrow: "Motivos de consulta",
      title: "Disfunciones del suelo pélvico que tratamos en El Cañaveral",
      intro: [
        { type: "p", text: "Son problemas frecuentes y tienen tratamiento." },
      ],
      subsections: [
        {
          title: "Incontinencia urinaria",
          blocks: [
            {
              type: "p",
              text:
                "Pérdidas de orina al toser, reír, saltar o correr, o con ganas muy urgentes. Una revisión Cochrane concluye que el entrenamiento del suelo pélvico puede curar o mejorar la incontinencia de esfuerzo, la que aparece con esos esfuerzos. Para la de urgencia y la mixta hay menos pruebas.",
            },
          ],
        },
        {
          title: "Pesadez y prolapso",
          blocks: [
            {
              type: "p",
              text:
                "Sensación de peso o de bulto en la vagina, sobre todo al final del día o tras un esfuerzo. El prolapso es un descenso de los órganos pélvicos. El entrenamiento del suelo pélvico suele formar parte del tratamiento.",
            },
          ],
        },
        {
          title: "Dolor pélvico y dolor en las relaciones",
          blocks: [
            {
              type: "p",
              text:
                "Dolor en la pelvis, al sentarse o durante las relaciones. A veces la musculatura está demasiado tensa, y entonces aprender a relajarla es parte del tratamiento.",
            },
          ],
        },
        {
          title: "Diástasis abdominal",
          blocks: [
            {
              type: "p",
              text:
                "Separación de los músculos rectos del abdomen, frecuente tras el embarazo. Una revisión de 2025 asocia el ejercicio abdominal con una menor distancia entre los rectos, aunque con certeza baja.",
            },
          ],
        },
        {
          title: "Estreñimiento y pérdidas de gases o de heces",
          blocks: [
            {
              type: "p",
              text: "También son disfunciones del suelo pélvico y se tratan.",
            },
          ],
        },
      ],
    },
    {
      id: "embarazo-y-postparto",
      title: "Embarazo y postparto: cuándo empezar",
      intro: [
        {
          type: "p",
          text:
            "No hace falta esperar a tener un problema. Estas son las etapas que describen las guías clínicas, sin fechas rígidas: cada embarazo y cada parto son distintos.",
        },
      ],
      subsections: [
        {
          title: "Durante el embarazo",
          blocks: [
            {
              type: "p",
              text:
                "En un embarazo sin complicaciones, la actividad física es segura y deseable, según el Colegio Americano de Obstetras y Ginecólogos. En MUV hacemos seguimiento durante el embarazo: tratamiento de las molestias y preparación del suelo pélvico.",
            },
          ],
        },
        {
          title: "Tras el parto: etapa por etapa",
          blocks: [
            {
              type: "p",
              text:
                "Son orientaciones, no plazos obligatorios. Su médico o su matrona tienen la última palabra, sobre todo tras una cesárea o un parto con complicaciones.",
            },
            {
              type: "table",
              head: ["Cuándo", "Qué dicen las guías"],
              rows: [
                [
                  "Primeros días",
                  "El entrenamiento del suelo pélvico puede empezar en el postparto inmediato. El resto del ejercicio se retoma de forma gradual en cuanto es médicamente seguro; algunas mujeres vuelven a la actividad en pocos días.",
                ],
                [
                  "De 2 a 6 semanas",
                  "Progresión gradual: caminar, entrenar el suelo pélvico y ejercicio abdominal suave.",
                ],
                [
                  "Hacia las 6-8 semanas",
                  "Se suele ofrecer una revisión postparto y, si hay síntomas del suelo pélvico, una valoración y la derivación a fisioterapia.",
                ],
                [
                  "De los 3 meses al año",
                  "Seguir entrenando el suelo pélvico: una revisión de 2025 con 65 estudios concluye, con certeza moderada, que reduce la probabilidad de incontinencia urinaria. La OMS recomienda al menos 150 minutos de actividad aeróbica moderada a la semana y ejercicios de fuerza variados.",
                ],
              ],
            },
            {
              type: "p",
              text:
                "Si hay pérdidas de orina, dolor o sensación de peso, no hace falta esperar a la revisión: consúltelo antes.",
            },
          ],
        },
        {
          title: "La vuelta al ejercicio",
          blocks: [
            {
              type: "p",
              text:
                "La recuperación continúa con entrenamiento funcional: fuerza, control del tronco y retorno progresivo al ejercicio. Lo contamos en [entrenamiento funcional en El Cañaveral](/sedes/el-canaveral/entrenamiento-funcional).",
            },
          ],
        },
      ],
    },
    {
      id: "tecnologia",
      title: "Diatermia y otras tecnologías, junto al ejercicio",
      intro: [
        {
          type: "p",
          text:
            "En general, el ejercicio es el centro del tratamiento del suelo pélvico. La tecnología lo acompaña cuando la valoración indica que puede ayudar.",
        },
      ],
      subsections: [
        {
          title: "Diatermia",
          blocks: [
            {
              type: "p",
              text:
                "Corrientes de radiofrecuencia que calientan los tejidos desde dentro, para aliviar el dolor y la tensión muscular. La evidencia en suelo pélvico es todavía escasa. Un ensayo aleatorizado de 2026 incluyó a 44 mujeres con dolor pélvico crónico y musculatura muy tensa, con aplicación intravaginal. Añadir diatermia al tratamiento habitual redujo el dolor más que un tratamiento simulado, sin efectos adversos.",
            },
          ],
        },
        {
          title: "Contraindicaciones de la diatermia",
          blocks: [
            {
              type: "p",
              text:
                "En general, no se aplica en estos casos, entre otros: embarazo, marcapasos u otros dispositivos electrónicos implantados, tumor maligno, infección activa y trombosis. Se descartan en la valoración.",
            },
          ],
        },
        {
          title: "Electroterapia",
          blocks: [
            {
              type: "p",
              text:
                "Corrientes eléctricas suaves que activan o relajan la musculatura, según lo que necesite cada caso.",
            },
          ],
        },
        {
          title: "Ejercicio del suelo pélvico",
          blocks: [
            {
              type: "p",
              text:
                "Para la incontinencia de esfuerzo, la revisión Cochrane encuentra pruebas de calidad alta: el entrenamiento del suelo pélvico cura o mejora los síntomas. Aprender a contraer bien, y también a relajar, es lo más importante.",
            },
          ],
        },
      ],
    },
    {
      id: "como-es-una-sesion",
      title: "Cómo es la primera sesión de suelo pélvico",
      intro: [
        {
          type: "p",
          text:
            "En general, una primera sesión empieza con una conversación sobre lo que le pasa, desde cuándo y cómo le afecta. Después vienen una exploración y una explicación clara de lo encontrado y de lo que se puede hacer. Toda exploración requiere su consentimiento y puede interrumpirse cuando usted lo diga.",
        },
      ],
      subsections: [],
    },
    {
      id: "quien-le-atiende",
      title: "Quién le atiende",
      intro: [
        {
          type: "p",
          text:
            "La clínica está inscrita como **centro sanitario** en el registro de la Comunidad de Madrid (**CS 17623**). Su responsable sanitario es **Álvaro Ortega Rienda**, colegiado nº 12868.",
        },
      ],
      subsections: [],
    },
    {
      id: "consejos-y-mitos",
      eyebrow: "Mientras tanto",
      title: "Tres consejos para su suelo pélvico y tres mitos",
      intro: [],
      subsections: [
        {
          title: "Compruebe que contrae bien",
          blocks: [
            {
              type: "p",
              text:
                "Conviene que una fisioterapeuta compruebe cómo contrae el suelo pélvico: no basta con apretar, hay que apretar lo correcto.",
            },
          ],
        },
        {
          title: "Cuide el esfuerzo al evacuar",
          blocks: [
            {
              type: "p",
              text:
                "Evite hacer fuerza al ir al baño. Si el estreñimiento es habitual, consúltelo con su médico.",
            },
          ],
        },
        {
          title: "Muévase",
          blocks: [
            {
              type: "p",
              text:
                "Si no hay contraindicación, la OMS recomienda a las mujeres embarazadas y en postparto al menos 150 minutos semanales de actividad aeróbica moderada. Añade ejercicios de fuerza variados.",
            },
          ],
        },
        {
          title:
            "Mito: «Perder orina tras el parto es normal y no tiene remedio»",
          blocks: [
            {
              type: "p",
              text:
                "Es frecuente, pero no hay que aceptarlo: el entrenamiento del suelo pélvico mejora los síntomas, también en el postparto.",
            },
          ],
        },
        {
          title: "Mito: «Solo les pasa a las mujeres mayores»",
          blocks: [
            {
              type: "p",
              text:
                "Puede aparecer a cualquier edad, también en mujeres jóvenes y tras un parto reciente.",
            },
          ],
        },
        {
          title: "Mito: «Los ejercicios de Kegel valen para todo»",
          blocks: [
            {
              type: "p",
              text:
                "No siempre. Si la musculatura está demasiado tensa, primero hay que aprender a relajarla.",
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
            "Estas señales piden ver antes a su médico o a su matrona, o ir a urgencias:",
        },
        {
          type: "list",
          items: [
            "Sangrado abundante o con coágulos grandes tras el parto.",
            "Fiebre, o supuración o apertura de una cicatriz.",
            "Dolor intenso e inexplicable en la pelvis o el abdomen.",
            "Dolor, hinchazón o calor en una pierna.",
            "Imposibilidad de orinar.",
            "Pérdida de control del intestino o de la vejiga con debilidad en las piernas.",
            "Durante el embarazo: contracciones regulares, pérdida de líquido o sangrado.",
          ],
        },
      ],
      subsections: [],
    },
  ],
  faq: {
    id: "preguntas-frecuentes",
    eyebrow: "Dudas habituales",
    title: "Preguntas frecuentes sobre fisioterapia de suelo pélvico",
    items: [
      {
        question: "¿Qué hace un fisioterapeuta de suelo pélvico?",
        answer:
          "Valora la musculatura del suelo pélvico y de la zona que lo rodea. Trata las disfunciones con ejercicio, técnicas manuales y tecnología, y enseña a contraer y a relajar bien.",
      },
      {
        question: "¿Cuántas sesiones hacen falta?",
        answer:
          "Depende del motivo de consulta, de cuánto tiempo lleva y de su evolución. Con la valoración se fija el plan.",
      },
      {
        question: "¿Cuándo ir a la fisioterapeuta después del parto?",
        answer:
          "El entrenamiento del suelo pélvico puede empezar en los primeros días, si su médico o su matrona no indican otra cosa. La revisión postparto suele ofrecerse hacia las 6-8 semanas. Si hay pérdidas, dolor o sensación de peso, no hace falta esperar a ella.",
      },
      {
        question: "¿Perder orina al hacer deporte es normal?",
        answer:
          "Es frecuente, pero tiene tratamiento. El entrenamiento del suelo pélvico puede curar o mejorar la incontinencia de esfuerzo, la que aparece al toser, reír, saltar o correr.",
      },
      {
        question: "¿Para qué sirve la diatermia en el suelo pélvico?",
        answer:
          "Para aliviar el dolor y la tensión muscular. Un ensayo pequeño de 2026, con aplicación intravaginal, la encontró útil en el dolor pélvico crónico con tensión del suelo pélvico. Hacen falta más estudios.",
      },
      {
        question: "¿La diatermia tiene contraindicaciones?",
        answer:
          "Sí. Entre otras, el embarazo, los marcapasos y otros dispositivos implantados, un tumor maligno, una infección activa y una trombosis. Se descartan en la valoración.",
      },
      {
        question: "¿Hay que esperar 40 días después del parto?",
        answer:
          "No. Las guías no piden esperar 40 días para empezar a moverse ni para entrenar el suelo pélvico: hablan de empezar de forma gradual en cuanto sea seguro. Lo que sí suele ofrecerse es una revisión postparto hacia las 6-8 semanas. Su médico o su matrona le dirán qué le conviene en su caso.",
      },
      {
        question: "¿Se puede entrenar el suelo pélvico durante el embarazo?",
        answer:
          "Sí. Se puede empezar durante el embarazo, y en MUV hacemos seguimiento durante esa etapa.",
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
      "Hay una parada de autobús muy cerca de la puerta. El recorrido completo, en la página de [MUV El Cañaveral](/sedes/el-canaveral#como-llegar).",
    cta: "Pedir cita para una valoración",
  },
  sources: [
    "1. Dumoulin C et al. *Pelvic floor muscle training versus no treatment, or inactive control treatments, for urinary incontinence in women.* Cochrane Database Syst Rev 2018. [PMID 30288727](https://pubmed.ncbi.nlm.nih.gov/30288727/).",
    "2. Beamish NF et al. *Impact of postpartum exercise on pelvic floor disorders and diastasis recti abdominis: a systematic review and meta-analysis.* Br J Sports Med 2025. [PMID 39694630](https://pubmed.ncbi.nlm.nih.gov/39694630/).",
    "3. ACOG. *Physical Activity and Exercise During Pregnancy and the Postpartum Period, Committee Opinion 804.* Obstet Gynecol 2020. [PMID 32217980](https://pubmed.ncbi.nlm.nih.gov/32217980/).",
    "4. García MM et al. *Efficacy of capacitive and resistive electric transfer (CRET) in the management of primary chronic pelvic pain syndrome in women: a randomized placebo-controlled trial.* Eur J Obstet Gynecol Reprod Biol 2026. [PMID 42275942](https://pubmed.ncbi.nlm.nih.gov/42275942/).",
    "5. Bull FC et al. *World Health Organization 2020 guidelines on physical activity and sedentary behaviour.* Br J Sports Med 2020. [PMID 33239350](https://pubmed.ncbi.nlm.nih.gov/33239350/).",
    "6. Lupowitz LG, Ramus L, Delacour F. *TECAR Therapy: A Clinical Commentary on its Evolution, Application, and Future in Rehabilitation.* Int J Sports Phys Ther 2025. [PMID 40182911](https://pubmed.ncbi.nlm.nih.gov/40182911/).",
    "7. NICE. *Postnatal care (NG194).*",
  ],
};
