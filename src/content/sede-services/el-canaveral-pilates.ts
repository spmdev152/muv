/**
 * `/sedes/el-canaveral/pilates`
 * Pilates y pilates para embarazadas.
 *
 * Fuente: `docs/contenidos/MUV-WEB-EL-CANAVERAL-PILATES.pdf` (#45), texto
 * literal. Lo que el PDF marca en rojo no está aquí.
 *
 * El teléfono no aparece en «Dónde estamos»: está en rojo hasta que MUV lo
 * confirme (#33). Tampoco la hora de cierre (#35).
 */

import type { SedeServiceContent } from "@/content/sede-service-types";

export const elCanaveralPilates: SedeServiceContent = {
  location: "el-canaveral",
  slug: "pilates",
  label: "Pilates y pilates para embarazadas",
  source: "docs/contenidos/MUV-WEB-EL-CANAVERAL-PILATES.pdf",
  meta: {
    title: "Pilates y pilates embarazadas en El Cañaveral, Madrid | MUV",
    description:
      "Pilates terapéutico y pilates para embarazadas en El Cañaveral (Vicálvaro, Madrid), en una clínica de fisioterapia. Consulte clases y plazas en MUV.",
  },
  hero: {
    title: "Pilates y pilates para embarazadas en El Cañaveral, Madrid",
    lede:
      "Pilates en una clínica de fisioterapia: movimiento con técnica para trabajar la espalda y el centro del cuerpo. Si está embarazada, con las precauciones que su etapa necesita. En MUV El Cañaveral, en Vicálvaro (Madrid), hay clases de pilates y de pilates para embarazadas.",
    essentials: [
      "Clases de pilates terapéutico y de pilates para embarazadas.",
      "Embarazo: las guías consideran la actividad física segura y recomendable si no hay complicaciones.",
      "Una sala de pilates y entrenamiento funcional dentro de una clínica sanitaria.",
      "Horarios y plazas: llame a la clínica o pida cita.",
    ],
  },
  sections: [
    {
      id: "para-quien",
      eyebrow: "¿Es para usted?",
      title: "Para quién está indicado el pilates en El Cañaveral",
      intro: [],
      subsections: [
        {
          title: "Si le duele la espalda",
          blocks: [
            {
              type: "p",
              text:
                "El pilates trabaja el abdomen, la zona lumbar y las caderas con control y respiración. Es una forma amable de fortalecer lo que sostiene la espalda.",
            },
          ],
        },
        {
          title: "Si pasa muchas horas sentada o sentado",
          blocks: [
            {
              type: "p",
              text:
                "Rigidez, hombros cargados, lumbar cansada. El pilates trabaja la movilidad y el control de la postura.",
            },
          ],
        },
        {
          title: "Si está embarazada",
          blocks: [
            {
              type: "p",
              text:
                "Hay clases de pilates para embarazadas. Se detalla más abajo.",
            },
          ],
        },
        {
          title: "Si quiere empezar a moverse con control",
          blocks: [
            {
              type: "p",
              text:
                "En general, el pilates no exige experiencia previa ni ser flexible. Los niveles de las clases, al pedir cita. En MUV El Cañaveral también hay [entrenamiento funcional guiado](/sedes/el-canaveral/entrenamiento-funcional).",
            },
          ],
        },
      ],
    },
    {
      id: "que-es",
      title: "Qué es el pilates terapéutico y qué lo distingue",
      intro: [
        {
          type: "p",
          text:
            "Pilates es un método de ejercicio que une movimiento, respiración y control del centro del cuerpo. En general, «terapéutico» quiere decir que los ejercicios se adaptan a cada persona y a lo que le duele.",
        },
      ],
      subsections: [
        {
          title: "Respiración y control",
          blocks: [
            {
              type: "p",
              text:
                "Cada ejercicio se coordina con la respiración. Moverse despacio y con precisión es más exigente de lo que parece.",
            },
          ],
        },
        {
          title: "El centro del cuerpo",
          blocks: [
            {
              type: "p",
              text:
                "El abdomen, la zona lumbar, el suelo pélvico y las caderas trabajan juntos para estabilizar el tronco.",
            },
          ],
        },
        {
          title: "Adaptable a cada persona",
          blocks: [
            {
              type: "p",
              text:
                "Los mismos ejercicios pueden hacerse más fáciles o más difíciles según la persona, una lesión o el embarazo.",
            },
          ],
        },
      ],
    },
    {
      id: "pilates-para-embarazadas",
      title: "Pilates para embarazadas: desde cuándo y con qué precauciones",
      intro: [],
      subsections: [
        {
          title: "Qué dicen las guías",
          blocks: [
            {
              type: "p",
              text:
                "En un embarazo sin complicaciones, la actividad física es segura y deseable, según el Colegio Americano de Obstetras y Ginecólogos. La Organización Mundial de la Salud también tiene recomendaciones específicas para el embarazo y el postparto.",
            },
          ],
        },
        {
          title: "Qué dice la investigación sobre el pilates",
          blocks: [
            {
              type: "p",
              text:
                "Una revisión de 2025 reunió 11 estudios con 538 embarazadas. Asoció el pilates con un parto más corto y con menos dolor durante el parto. Cada uno de esos resultados se apoya en solo dos estudios. La calidad de los estudios es desigual: en ocho de los once no estaba claro el riesgo de sesgo.",
            },
          ],
        },
        {
          title: "Cuándo empezar",
          blocks: [
            {
              type: "p",
              text:
                "No hay una semana válida para todas: depende de cómo vaya su embarazo. Consúltelo con su matrona o su obstetra y cuéntenos sus indicaciones.",
            },
          ],
        },
        {
          title: "Qué suele adaptarse",
          blocks: [
            {
              type: "p",
              text:
                "En general, en el pilates para embarazadas se ajustan la intensidad, las posturas y el trabajo abdominal a cada trimestre.",
            },
          ],
        },
      ],
    },
    {
      id: "como-son-las-clases",
      title: "Cómo son las clases de pilates",
      intro: [
        {
          type: "p",
          text:
            "**Dónde:** en la sala de pilates y entrenamiento funcional de la clínica.",
        },
        {
          type: "p",
          text:
            "**Horarios y plazas:** llame a la clínica o pida cita y le informamos.",
        },
      ],
      subsections: [],
    },
    {
      id: "quien-las-imparte",
      title: "Quién imparte las clases",
      intro: [
        {
          type: "p",
          text:
            "Las clases se dan en una clínica inscrita como **centro sanitario** en la Comunidad de Madrid (**CS 17623**).",
        },
      ],
      subsections: [],
    },
    {
      id: "consejos-y-mitos",
      eyebrow: "Mientras tanto",
      title: "Tres consejos y tres mitos sobre el pilates",
      intro: [],
      subsections: [
        {
          title: "Avise antes de empezar",
          blocks: [
            {
              type: "p",
              text:
                "Cuente cualquier lesión, dolor o embarazo antes de la primera clase.",
            },
          ],
        },
        {
          title: "Respire y vaya despacio",
          blocks: [
            {
              type: "p",
              text:
                "En pilates, la calidad del movimiento importa más que la cantidad.",
            },
          ],
        },
        {
          title: "Muévase con regularidad",
          blocks: [
            {
              type: "p",
              text:
                "La OMS recomienda actividad física regular, también durante el embarazo y el postparto, si no hay contraindicación.",
            },
          ],
        },
        {
          title: "Mito: «Hay que ser flexible para empezar»",
          blocks: [
            {
              type: "p",
              text:
                "No. La flexibilidad es algo que el pilates trabaja, no un requisito.",
            },
          ],
        },
        {
          title: "Mito: «Es solo para mujeres»",
          blocks: [
            {
              type: "p",
              text: "No. Lo practican personas de cualquier género y edad.",
            },
          ],
        },
        {
          title: "Mito: «Embarazada hay que dejar el ejercicio»",
          blocks: [
            {
              type: "p",
              text:
                "No en un embarazo sin complicaciones: las guías lo consideran seguro y recomendable.",
            },
          ],
        },
      ],
    },
    {
      id: "antes-de-empezar",
      title: "Pilates en el embarazo: cuándo parar y consultar con su matrona",
      intro: [
        {
          type: "p",
          text:
            "Si está embarazada, hable antes con su matrona o su obstetra. Y pare y avise si durante el ejercicio nota:",
        },
        {
          type: "list",
          items: [
            "Sangrado vaginal o pérdida de líquido.",
            "Dolor abdominal o contracciones dolorosas y regulares.",
            "Mareo, dolor de cabeza o falta de aire antes de esforzarse.",
            "Dolor en el pecho.",
            "Dolor o hinchazón en una pantorrilla.",
            "Debilidad muscular que le afecte al equilibrio.",
          ],
        },
      ],
      subsections: [],
    },
  ],
  faq: {
    id: "preguntas-frecuentes",
    eyebrow: "Dudas habituales",
    title: "Preguntas frecuentes sobre pilates",
    items: [
      {
        question: "¿Qué es el pilates terapéutico?",
        answer:
          "En general, es el pilates con los ejercicios adaptados a cada persona y a su salud. Por ejemplo, con una lesión, con dolor o durante el embarazo.",
      },
      {
        question: "¿Cuántas clases a la semana conviene hacer?",
        answer:
          "Depende de su objetivo y de su condición física. Pregúntelo al pedir cita.",
      },
      {
        question: "¿Puedo hacer pilates si estoy embarazada?",
        answer:
          "En un embarazo sin complicaciones, sí: las guías consideran segura y recomendable la actividad física. Consúltelo antes con su matrona o su obstetra.",
      },
      {
        question: "¿Cuándo empezar pilates en el embarazo?",
        answer:
          "Depende de cada embarazo. Su matrona o su obstetra le dirá cuándo es el momento en su caso.",
      },
      {
        question: "¿Qué ejercicios no se pueden hacer durante el embarazo?",
        answer:
          "Los que le provoquen dolor, mareo o falta de aire, y los que supongan riesgo de caída o de golpe en el abdomen. El resto puede adaptarse a cada etapa.",
      },
      {
        question: "¿Es mejor el pilates o el yoga para una embarazada?",
        answer:
          "Los dos pueden valer si se adaptan al embarazo. Lo mejor es el que le resulte cómodo y pueda mantener, con el visto bueno de su matrona.",
      },
      {
        question: "¿Sirve el pilates después del parto?",
        answer:
          "En general, sí, cuando su médico o su matrona lo autoricen y de forma progresiva. Si hay pérdidas de orina o dolor, antes conviene una [valoración del suelo pélvico](/sedes/el-canaveral/suelo-pelvico).",
      },
      {
        question: "¿Cuáles son los horarios de las clases?",
        answer:
          "Llame a la clínica o pida cita y le informamos de las clases y de las plazas disponibles.",
      },
    ],
  },
  contact: {
    id: "donde-estamos",
    title: "Dónde estamos y cuándo abrimos",
    details: [
      "**MUV El Cañaveral** · C. Victoria Kent, Local 8 · 28052 Madrid *(El Cañaveral, distrito de Vicálvaro)*",
      "**Horario:** atendemos de lunes a viernes, por la mañana y por la tarde, y los sábados por la mañana. Las horas de cada clase, llamando a la clínica o pidiendo cita.",
    ],
    directions:
      "Hay una parada de autobús muy cerca de la puerta. Todo el recorrido, en la página de [MUV El Cañaveral](/sedes/el-canaveral#como-llegar).",
    cta: "Pedir cita para empezar pilates",
  },
  sources: [
    "1. ACOG. *Physical Activity and Exercise During Pregnancy and the Postpartum Period, Committee Opinion 804.* Obstet Gynecol 2020. [PMID 32217980](https://pubmed.ncbi.nlm.nih.gov/32217980/).",
    "2. Li Y et al. *Pilates exercise in pregnancy: a systematic review and meta-analysis.* BMC Sports Sci Med Rehabil 2025. [PMID 39905474](https://pubmed.ncbi.nlm.nih.gov/39905474/).",
    "3. Bull FC et al. *World Health Organization 2020 guidelines on physical activity and sedentary behaviour.* Br J Sports Med 2020. [PMID 33239350](https://pubmed.ncbi.nlm.nih.gov/33239350/).",
  ],
};
