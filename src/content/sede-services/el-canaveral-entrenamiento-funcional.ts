/**
 * `/sedes/el-canaveral/entrenamiento-funcional`
 * Entrenamiento funcional guiado.
 *
 * Fuente: `docs/contenidos/MUV-WEB-EL-CANAVERAL-FUNCIONAL.pdf` (#46), texto
 * literal. Lo que el PDF marca en rojo no está aquí.
 *
 * El teléfono no aparece en «Dónde estamos»: está en rojo hasta que MUV lo
 * confirme (#33). Tampoco la hora de cierre (#35).
 */

import type { SedeServiceContent } from "@/content/sede-service-types";

export const elCanaveralFuncional: SedeServiceContent = {
  location: "el-canaveral",
  slug: "entrenamiento-funcional",
  label: "Entrenamiento funcional guiado",
  source: "docs/contenidos/MUV-WEB-EL-CANAVERAL-FUNCIONAL.pdf",
  meta: {
    title: "Entrenamiento funcional en El Cañaveral, Madrid | MUV",
    description:
      "Entrenamiento funcional guiado, personal o en grupo, en El Cañaveral (Vicálvaro, Madrid): fuerza y prevención de lesiones. Consulte horarios en MUV.",
  },
  hero: {
    title: "Entrenamiento funcional guiado en El Cañaveral, Madrid",
    lede:
      "Entrenar para prevenir, antes de que aparezca la lesión. En MUV El Cañaveral, en Vicálvaro (Madrid), el entrenamiento funcional es guiado y puede ser personal o en grupo. Su objetivo es prevenir lesiones.",
    essentials: [
      "Entrenamiento guiado, personal o en grupo.",
      "Fuerza, movimiento y prevención de lesiones.",
      "Dentro de una clínica de fisioterapia, en la sala pensada para pilates y entrenamiento funcional.",
      "Para saber horarios y plazas, llame a la clínica o pida cita.",
    ],
  },
  sections: [
    {
      id: "quien-se-beneficia",
      eyebrow: "¿Es para usted?",
      title: "Para quién es el entrenamiento funcional en El Cañaveral",
      intro: [],
      subsections: [
        {
          title: "Si quiere prevenir lesiones",
          blocks: [
            {
              type: "p",
              text:
                "Más vale fortalecer antes que reparar después. Es lo que pretende el entrenamiento preventivo.",
            },
          ],
        },
        {
          title: "Si su trabajo carga su cuerpo",
          blocks: [
            {
              type: "p",
              text:
                "De pie muchas horas, levantando peso o sentado delante de una pantalla: cada oficio castiga unas zonas, y se compensa con fuerza y movilidad.",
            },
          ],
        },
        {
          title: "Si acaba de ser madre",
          blocks: [
            {
              type: "p",
              text:
                "Después del parto, el ejercicio funcional ayuda a recuperar fuerza y control de forma progresiva. Antes, consulte con su médico o su matrona. Si nota pérdidas de orina o dolor pélvico, empiece por la [fisioterapia de suelo pélvico en El Cañaveral](/sedes/el-canaveral/suelo-pelvico).",
            },
          ],
        },
        {
          title: "Si quiere mantener lo que ha conseguido",
          blocks: [
            {
              type: "p",
              text:
                "Tras un periodo de dolor o de lesión, seguir entrenando es lo que sostiene la mejoría. Si prefiere un trabajo centrado en el control y la respiración, también hay [pilates en El Cañaveral](/sedes/el-canaveral/pilates).",
            },
          ],
        },
      ],
    },
    {
      id: "personal-o-en-grupo",
      title: "Entrenamiento personal o en grupo: cómo elegir",
      intro: [],
      subsections: [
        {
          title: "Entrenamiento personal",
          blocks: [
            {
              type: "p",
              text:
                "Atención individual y un ritmo a su medida. Es una buena opción si arrastra una lesión, tiene un objetivo concreto o necesita que alguien corrija cada detalle.",
            },
          ],
        },
        {
          title: "Entrenamiento en grupo",
          blocks: [
            {
              type: "p",
              text:
                "Compañía, constancia y un ritmo compartido. Es una buena opción si le motiva entrenar con otras personas.",
            },
          ],
        },
        {
          title: "Si duda",
          blocks: [
            {
              type: "p",
              text:
                "Cuéntenos su objetivo y su punto de partida al llamar a la clínica o al pedir cita.",
            },
          ],
        },
      ],
    },
    {
      id: "que-se-trabaja",
      title: "Qué se trabaja en el entrenamiento funcional",
      intro: [
        {
          type: "p",
          text:
            "En general, «funcional» quiere decir útil: entrenar lo que luego se necesita para vivir, trabajar y hacer deporte. Estos son los cuatro ejes habituales de este tipo de entrenamiento.",
        },
      ],
      subsections: [
        {
          title: "Fuerza",
          blocks: [
            {
              type: "p",
              text:
                "Sentadillas, levantamientos, empujes y tracciones, con una carga que la persona tolere.",
            },
          ],
        },
        {
          title: "Movilidad y control",
          blocks: [
            {
              type: "p",
              text:
                "Moverse con amplitud y saber dónde está cada parte de su cuerpo mientras se mueve.",
            },
          ],
        },
        {
          title: "Equilibrio y coordinación",
          blocks: [
            {
              type: "p",
              text:
                "Apoyos sobre una pierna, giros y cambios de dirección, que ayudan a evitar caídas y esguinces.",
            },
          ],
        },
        {
          title: "Resistencia",
          blocks: [
            { type: "p", text: "Aguantar el esfuerzo sin perder la técnica." },
          ],
        },
      ],
    },
    {
      id: "como-ayuda-a-prevenir-lesiones",
      title: "Cómo ayuda el entrenamiento funcional a prevenir lesiones",
      intro: [],
      subsections: [
        {
          title: "La fuerza protege",
          blocks: [
            {
              type: "p",
              text:
                "Una revisión de 2018 reunió seis ensayos con 7.738 participantes de 12 a 40 años. Asoció más entrenamiento de fuerza con menos lesiones deportivas, tanto agudas como por sobrecarga.",
            },
          ],
        },
        {
          title: "Lo que recomienda la OMS",
          blocks: [
            {
              type: "p",
              text:
                "Según la OMS, los adultos deberían fortalecer todos los grandes grupos musculares al menos dos días por semana. Para el embarazo y el postparto hay pautas propias.",
            },
          ],
        },
      ],
    },
    {
      id: "quien-lo-guia",
      title: "Quién guía los entrenamientos",
      intro: [
        {
          type: "p",
          text:
            "Se entrena en un centro con el número **CS 17623** del registro sanitario de la Comunidad de Madrid.",
        },
      ],
      subsections: [],
    },
    {
      id: "consejos-y-mitos",
      eyebrow: "Mientras tanto",
      title: "Tres consejos para entrenar y tres mitos",
      intro: [],
      subsections: [
        {
          title: "Primero la técnica, luego el peso",
          blocks: [
            {
              type: "p",
              text:
                "Una buena ejecución con poca carga vale más que una mala con mucha.",
            },
          ],
        },
        {
          title: "Avance de forma gradual",
          blocks: [
            {
              type: "p",
              text:
                "Empiece con una exigencia que le resulte cómoda y súbala poco a poco, cuando la técnica sea buena.",
            },
          ],
        },
        {
          title: "Combine fuerza y actividad aeróbica",
          blocks: [
            {
              type: "p",
              text:
                "La OMS recomienda ambas: actividad aeróbica moderada o intensa, además de la fuerza.",
            },
          ],
        },
        {
          title: "Mito: «El funcional es solo para deportistas»",
          blocks: [
            {
              type: "p",
              text:
                "No. Entrena movimientos de la vida diaria y sirve a cualquier persona activa.",
            },
          ],
        },
        {
          title: "Mito: «Con caminar o hacer cardio basta»",
          blocks: [
            {
              type: "p",
              text:
                "La OMS recomienda sumar a la actividad aeróbica al menos dos días de fortalecimiento muscular.",
            },
          ],
        },
        {
          title: "Mito: «Después del parto hay que quedarse quieta»",
          blocks: [
            {
              type: "p",
              text:
                "No en un postparto sin complicaciones: el movimiento es recomendable y la vuelta se hace de forma progresiva. Hable antes con su médico o su matrona.",
            },
          ],
        },
      ],
    },
    {
      id: "antes-de-empezar",
      title: "Antes de entrenar: cuándo hablar con su médico",
      intro: [
        {
          type: "p",
          text:
            "Si tiene una enfermedad del corazón o la tensión alta sin controlar, hable antes con su médico. Haga lo mismo si está embarazada o dio a luz hace poco. Durante el entrenamiento, deténgase y avise ante:",
        },
        {
          type: "list",
          items: [
            "Opresión o dolor en el pecho.",
            "Mareo, o una falta de aire que no es la del esfuerzo.",
            "Un dolor que crece y modifica su forma de moverse.",
          ],
        },
      ],
      subsections: [],
    },
  ],
  faq: {
    id: "preguntas-frecuentes",
    eyebrow: "Dudas habituales",
    title: "Preguntas frecuentes sobre el entrenamiento funcional",
    items: [
      {
        question: "¿Qué es el entrenamiento funcional?",
        answer:
          "Es un entrenamiento de fuerza y movimiento basado en gestos útiles de la vida diaria y del deporte.",
      },
      {
        question: "¿Es mejor el entrenamiento personal o el de grupo?",
        answer:
          "Depende de usted: el personal ofrece atención individual; el de grupo, compañía y constancia.",
      },
      {
        question: "¿Con qué frecuencia debo entrenar?",
        answer:
          "La OMS aconseja fuerza al menos dos días por semana. Lo demás lo marca su meta y cómo se encuentre.",
      },
      {
        question: "¿Sirve para prevenir lesiones?",
        answer:
          "Más entrenamiento de fuerza se asocia a menos lesiones deportivas, según una revisión de ensayos.",
      },
      {
        question: "¿Puedo entrenar tras el parto?",
        answer:
          "Sí, cuando su médico o su matrona lo permitan y subiendo la carga poco a poco. Si nota pérdidas de orina o dolor pélvico, empiece por la [valoración del suelo pélvico](/sedes/el-canaveral/suelo-pelvico).",
      },
      {
        question: "¿Necesito experiencia previa?",
        answer:
          "En general, el entrenamiento funcional puede empezarse sin experiencia previa. Cuéntenos su nivel y su objetivo al pedir cita.",
      },
      {
        question: "¿Dónde se entrena?",
        answer:
          "En la sala de pilates y entrenamiento funcional de la clínica, en MUV El Cañaveral.",
      },
      {
        question: "¿Cuáles son los horarios y las plazas?",
        answer: "Pregúntelo por teléfono o al pedir cita, y se lo concretamos.",
      },
    ],
  },
  contact: {
    id: "donde-estamos",
    title: "Dónde estamos y cuándo abrimos",
    details: [
      "**MUV El Cañaveral** · C. Victoria Kent, Local 8 · 28052 Madrid *(El Cañaveral, distrito de Vicálvaro)*",
      "**Horario:** atendemos de lunes a viernes, por la mañana y por la tarde, y los sábados por la mañana. Para las horas de entrenamiento, llame a la clínica o pida cita.",
    ],
    directions:
      "Hay una parada de autobús muy cerca de la puerta. Cómo llegar, paso a paso, en [MUV El Cañaveral](/sedes/el-canaveral#como-llegar).",
    cta: "Pedir cita para empezar a entrenar",
  },
  sources: [
    "1. Bull FC et al. *World Health Organization 2020 guidelines on physical activity and sedentary behaviour.* Br J Sports Med 2020. [PMID 33239350](https://pubmed.ncbi.nlm.nih.gov/33239350/).",
    "2. Lauersen JB et al. *Strength training as superior, dose-dependent and safe prevention of acute and overuse sports injuries.* Br J Sports Med 2018. [PMID 30131332](https://pubmed.ncbi.nlm.nih.gov/30131332/).",
  ],
};
