/**
 * `/sedes/tres-cantos/entrenamiento-funcional`
 * Clases supervisadas de entrenamiento funcional.
 *
 * Fuente: `docs/contenidos/MUV-WEB-TRES-CANTOS-FUNCIONAL.pdf` (#42), texto
 * literal. Lo que el PDF marca en rojo no está aquí.
 */

import type { SedeServiceContent } from "@/content/sede-service-types";

export const tresCantosFuncional: SedeServiceContent = {
  location: "tres-cantos",
  slug: "entrenamiento-funcional",
  label: "Clases supervisadas de entrenamiento funcional",
  source: "docs/contenidos/MUV-WEB-TRES-CANTOS-FUNCIONAL.pdf",
  meta: {
    title: "Entrenamiento funcional en Tres Cantos | MUV",
    description:
      "Clases de entrenamiento funcional en Tres Cantos: grupos de hasta cinco personas, dirigidas por un fisioterapeuta colegiado. Pida cita en MUV.",
  },
  hero: {
    title: "Clases supervisadas de entrenamiento funcional en Tres Cantos",
    lede:
      "Fuerza y movimiento, con alguien que sabe cuándo apretar y cuándo frenar. En MUV Tres Cantos, el entrenamiento funcional se hace en clases de un máximo de cinco personas, impartidas por un fisioterapeuta colegiado.",
    essentials: [
      "Grupos de hasta cinco personas.",
      "Las imparte un fisioterapeuta colegiado.",
      "Entrenamiento funcional: ejercicio basado en movimientos de la vida diaria y del deporte.",
      "Días y horarios: llame a la clínica o pida cita.",
    ],
  },
  sections: [
    {
      id: "para-quien",
      eyebrow: "¿Es para usted?",
      title:
        "Para quién son las clases de entrenamiento funcional en Tres Cantos",
      intro: [],
      subsections: [
        {
          title: "Si ha terminado un tratamiento y no quiere volver atrás",
          blocks: [
            {
              type: "p",
              text:
                "Cuando el dolor se va, falta lo que evita que vuelva: fuerza, control y confianza. El ejercicio funcional trabaja justamente eso. Si todavía está en tratamiento, consulte nuestra [fisioterapia de rodilla](/sedes/tres-cantos/fisioterapia-rodilla), de [espalda](/sedes/tres-cantos/fisioterapia-espalda) o [deportiva](/sedes/tres-cantos/fisioterapia-deportiva) en Tres Cantos.",
            },
          ],
        },
        {
          title: "Si arrastra lesiones que se repiten",
          blocks: [
            {
              type: "p",
              text:
                "Las lesiones que se repiten a menudo señalan una zona débil o un movimiento mal repartido. El entrenamiento de fuerza es una de las formas de trabajarlo.",
            },
          ],
        },
        {
          title: "Si quiere empezar a entrenar con control",
          blocks: [
            {
              type: "p",
              text:
                "Si hace tiempo que no entrena o le da respeto empezar, un grupo pequeño y supervisado por un fisioterapeuta puede facilitarlo.",
            },
          ],
        },
        {
          title: "Si ya entrena y quiere prevenir lesiones",
          blocks: [
            {
              type: "p",
              text:
                "Una revisión de seis ensayos asocia más entrenamiento de fuerza con menos lesiones deportivas. Es una de las razones para incluir la fuerza en la rutina.",
            },
          ],
        },
      ],
    },
    {
      id: "como-son-las-clases",
      title: "Cómo son las clases supervisadas",
      intro: [
        {
          type: "p",
          text: "**Grupos reducidos:** un máximo de cinco personas por clase.",
        },
        {
          type: "p",
          text:
            "**Quién las imparte:** José Luis González Coronado, fisioterapeuta colegiado nº 15502 y responsable de la clínica.",
        },
        {
          type: "p",
          text:
            "**Días y horarios:** llame a la clínica o pida cita y le informamos de las clases y de las plazas libres.",
        },
      ],
      subsections: [],
    },
    {
      id: "que-se-trabaja",
      title: "Qué se trabaja en el entrenamiento funcional",
      intro: [
        {
          type: "p",
          text:
            "En general, «funcional» significa trabajar movimientos que usted usa a diario y en el deporte. Estos seis son la base de este tipo de entrenamiento.",
        },
      ],
      subsections: [
        {
          title: "Sentadilla",
          blocks: [
            {
              type: "p",
              text: "Sentarse y levantarse con control: piernas y glúteos.",
            },
          ],
        },
        {
          title: "Bisagra de cadera",
          blocks: [
            {
              type: "p",
              text:
                "Inclinarse con la espalda neutra, como al coger algo del suelo: glúteos, isquiotibiales y espalda.",
            },
          ],
        },
        {
          title: "Empuje y tracción",
          blocks: [
            { type: "p", text: "Empujar y tirar: hombros, pecho y espalda." },
          ],
        },
        {
          title: "Acarreo",
          blocks: [
            {
              type: "p",
              text:
                "Cargar peso y caminar con él: agarre, tronco y estabilidad.",
            },
          ],
        },
        {
          title: "Rotación y antirrotación",
          blocks: [
            {
              type: "p",
              text:
                "Girar el tronco y, sobre todo, resistirse a que lo giren: abdomen y control del centro.",
            },
          ],
        },
        {
          title: "Impulso y aterrizaje",
          blocks: [
            {
              type: "p",
              text:
                "Saltar, frenar y cambiar de dirección con control: la base de casi todos los deportes.",
            },
          ],
        },
      ],
    },
    {
      id: "en-que-se-diferencia",
      title: "¿En qué se diferencia de un gimnasio, del CrossFit o del HIIT?",
      intro: [],
      subsections: [
        {
          title: "Del gimnasio de sala",
          blocks: [
            {
              type: "p",
              text:
                "En una sala, cada persona suele decidir y vigilar sus propias cargas. Aquí el grupo es pequeño, de un máximo de cinco personas, y lo imparte un fisioterapeuta colegiado.",
            },
          ],
        },
        {
          title: "Del CrossFit",
          blocks: [
            {
              type: "p",
              text:
                "El CrossFit se orienta al rendimiento y a la competición. El entrenamiento funcional, en general, se orienta a moverse mejor en la vida diaria y en el deporte.",
            },
          ],
        },
        {
          title: "Del HIIT",
          blocks: [
            {
              type: "p",
              text:
                "El HIIT es un formato: intervalos de alta intensidad. El ejercicio funcional es un contenido —movimientos útiles— que puede hacerse con intensidad moderada o alta.",
            },
          ],
        },
      ],
    },
    {
      id: "quien-supervisa",
      title: "Quién supervisa las clases",
      intro: [
        {
          type: "p",
          text:
            "MUV Tres Cantos está inscrita como **centro sanitario** en la Comunidad de Madrid, con el número **CS 21018**. Las clases las imparte **José Luis González Coronado**, fisioterapeuta colegiado nº 15502. Es el mismo profesional que atiende en la clínica.",
        },
      ],
      subsections: [],
    },
    {
      id: "consejos-y-mitos",
      eyebrow: "Mientras tanto",
      title: "Tres consejos para entrenar la fuerza y tres mitos",
      intro: [],
      subsections: [
        {
          title: "Entrene la fuerza al menos dos días por semana",
          blocks: [
            {
              type: "p",
              text:
                "La OMS recomienda a los adultos fortalecer todos los grandes grupos musculares dos o más días a la semana, con intensidad moderada o alta.",
            },
          ],
        },
        {
          title: "Caliente y progrese",
          blocks: [
            {
              type: "p",
              text:
                "Empiece con movilidad y cargas ligeras, y suba la carga poco a poco, no de golpe.",
            },
          ],
        },
        {
          title: "Cuente lo que le duele",
          blocks: [
            {
              type: "p",
              text:
                "Avise de cualquier molestia, antes de empezar y durante la clase.",
            },
          ],
        },
        {
          title: "Mito: «Entrenar fuerza lesiona»",
          blocks: [
            {
              type: "p",
              text:
                "Al contrario: una revisión de seis ensayos, con casi ocho mil participantes, asocia más entrenamiento de fuerza con menos lesiones deportivas.",
            },
          ],
        },
        {
          title: "Mito: «Funcional es lo mismo que HIIT»",
          blocks: [
            {
              type: "p",
              text:
                "No. Funcional es qué se trabaja; el HIIT es cómo se organizan los intervalos.",
            },
          ],
        },
        {
          title: "Mito: «Si no puedo entrenar mucho, no vale la pena»",
          blocks: [
            {
              type: "p",
              text:
                "La OMS recuerda que cualquier cantidad de actividad física es mejor que ninguna.",
            },
          ],
        },
      ],
    },
    {
      id: "antes-de-empezar",
      title: "Antes de empezar: cuándo consultar con su médico",
      intro: [
        {
          type: "p",
          text:
            "Si tiene una enfermedad del corazón, hipertensión sin controlar o una lesión reciente, consulte antes con su médico. Y pare y avise si durante el ejercicio nota:",
        },
        {
          type: "list",
          items: [
            "Dolor u opresión en el pecho. Si no cede al parar, llame al 112.",
            "Mareo o falta de aire desproporcionada.",
            "Dolor que aumenta o que le cambia la forma de moverse.",
          ],
        },
      ],
      subsections: [],
    },
  ],
  faq: {
    id: "preguntas-frecuentes",
    eyebrow: "Dudas habituales",
    title: "Preguntas frecuentes sobre las clases de entrenamiento funcional",
    items: [
      {
        question: "¿Cuántas personas hay en cada clase?",
        answer:
          "Un máximo de cinco. Las clases las imparte un fisioterapeuta colegiado.",
      },
      {
        question: "¿Quién imparte las clases?",
        answer:
          "José Luis González Coronado, fisioterapeuta colegiado nº 15502 y responsable de la clínica.",
      },
      {
        question: "¿Cuáles son los días y los horarios?",
        answer:
          "Llame a la clínica o pida cita y le informamos de las clases y de las plazas disponibles.",
      },
      {
        question: "¿Qué se trabaja en el entrenamiento funcional?",
        answer:
          "Sentadilla, bisagra de cadera, empuje, tracción, acarreo, rotación y saltos o aterrizajes: los movimientos básicos de la vida diaria y del deporte.",
      },
      {
        question: "¿Cuántas veces por semana conviene entrenar?",
        answer:
          "La OMS recomienda trabajar la fuerza dos o más días a la semana. Cuántas clases le convienen depende de su objetivo y de su punto de partida: pregúntenoslo al pedir cita.",
      },
      {
        question: "¿Es lo mismo que el HIIT?",
        answer:
          "No. El HIIT es una forma de organizar los intervalos de alta intensidad. El ejercicio funcional es lo que se hace: movimientos útiles que pueden trabajarse con distinta intensidad.",
      },
      {
        question: "¿Puedo entrenar si me duele algo?",
        answer:
          "Cuéntenoslo antes de empezar y, si la lesión es reciente, consulte antes con su médico.",
      },
      {
        question: "¿Sirve para prevenir lesiones?",
        answer:
          "Una revisión de seis ensayos asocia más entrenamiento de fuerza con menos lesiones deportivas.",
      },
    ],
  },
  contact: {
    id: "donde-estamos",
    title: "Dónde estamos y cuándo abrimos",
    details: [
      "**MUV Tres Cantos** · Av. de Madrid, 19, Loc 5 · 28760 Tres Cantos",
      "**Horario:** de lunes a viernes, de 10:00 a 14:00 y de 16:00 a 21:00; los sábados, de 9:00 a 14:00. Los domingos cerramos. Las clases y las plazas se concretan llamando a la clínica o pidiendo cita.",
      "**Teléfono:** 614 13 14 05",
    ],
    directions:
      "El acceso, el aparcamiento y la entrada están en la página de [MUV Tres Cantos](/sedes/tres-cantos#como-llegar).",
    cta: "Pedir cita para empezar las clases",
  },
  sources: [
    "1. Bull FC et al. *World Health Organization 2020 guidelines on physical activity and sedentary behaviour.* Br J Sports Med 2020. [PMID 33239350](https://pubmed.ncbi.nlm.nih.gov/33239350/).",
    "2. Lauersen JB et al. *Strength training as superior, dose-dependent and safe prevention of acute and overuse sports injuries.* Br J Sports Med 2018. [PMID 30131332](https://pubmed.ncbi.nlm.nih.gov/30131332/).",
  ],
};
