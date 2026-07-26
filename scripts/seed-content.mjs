/**
 * Generates the initial MDX content (placeholder copy consistent with the
 * physiotherapy sector) for services, conditions, professionals and blog.
 * The SEO team will replace this copy later on.
 *
 * User-facing strings (titles, body copy) stay in Spanish on purpose; only the
 * code/identifiers and comments are in English.
 *
 *   node scripts/seed-content.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join("content");

const body = (intro, points, closing) => `
${intro}

## Cómo trabajamos

En MUV partimos siempre de una valoración inicial completa. Escuchamos tu caso,
exploramos en profundidad y diseñamos un plan de tratamiento a tu medida, con
objetivos claros y revisables sesión a sesión.

## Qué incluye

${points.map((p) => `- ${p}`).join("\n")}

## A quién va dirigido

Este abordaje está indicado tanto si buscas resolver una molestia concreta como
si quieres prevenir recaídas y mejorar tu calidad de vida a largo plazo. Nuestro
equipo combina técnica manual, tecnología de vanguardia y educación del paciente.

> Eficaces, eficientes y, sobre todo, empáticos: así entendemos la fisioterapia.

## El acompañamiento MUV

${closing}
`;

const faqBlock = (faqs) =>
  faqs.map((f) => `  - question: "${f.q}"\n    answer: "${f.a}"`).join("\n");

const services = [
  {
    slug: "fisioterapia",
    title: "Fisioterapia",
    order: 1,
    featured: true,
    image: "/img/service-fisioterapia.webp",
    description:
      "Fisioterapia avanzada con técnicas invasivas y ecografía para resolver el origen del dolor.",
    excerpt:
      "Valoración minuciosa y tratamiento manual e instrumental para recuperar tu movimiento.",
    intro:
      "La fisioterapia es el corazón de MUV. Tratamos el dolor y la disfunción del movimiento yendo a la raíz del problema, no solo a los síntomas.",
    points: [
      "Valoración funcional y ecográfica",
      "Terapia manual y técnicas invasivas ecoguiadas",
      "Ejercicio terapéutico pautado",
      "Plan de prevención de recaídas",
    ],
    closing:
      "Te acompañamos durante todo el proceso, ajustando el tratamiento a tu evolución hasta que recuperes tu actividad sin limitaciones.",
    faqs: [
      { q: "¿Cuánto dura una sesión?", a: "La primera valoración dura unos 50 minutos; las sesiones de tratamiento, entre 30 y 45 minutos." },
      { q: "¿Necesito derivación médica?", a: "No es imprescindible. Puedes pedir cita directamente y nuestro equipo realizará la valoración inicial." },
    ],
  },
  {
    slug: "fisioterapia-deportiva",
    title: "Fisioterapia deportiva",
    order: 2,
    featured: true,
    image: "/img/service-fisioterapia-deportiva.webp",
    description:
      "Tratamiento y readaptación de lesiones deportivas para volver a competir con seguridad.",
    excerpt:
      "Recuperación y readaptación al gesto deportivo, del aficionado al deportista de alto nivel.",
    intro:
      "Acompañamos a deportistas de todos los niveles en la recuperación de sus lesiones y en el retorno seguro a la práctica deportiva.",
    points: [
      "Diagnóstico funcional del gesto deportivo",
      "Readaptación progresiva con criterios de alta objetivos",
      "Prevención de lesiones y trabajo de fuerza",
      "Coordinación con tu entrenador o club",
    ],
    closing:
      "Diseñamos un retorno a la actividad por fases para que vuelvas más fuerte y con menor riesgo de recaída.",
    faqs: [
      { q: "¿Tratáis a deportistas amateur?", a: "Sí. Adaptamos el plan a tu nivel y tus objetivos, seas aficionado o profesional." },
    ],
  },
  {
    slug: "entrenamiento-terapeutico",
    title: "Entrenamiento terapéutico",
    order: 3,
    featured: true,
    image: "/img/service-entrenamiento-terapeutico.webp",
    description:
      "Ejercicio terapéutico supervisado, individual o en grupos reducidos, para tu recuperación.",
    excerpt:
      "El movimiento como medicina: ejercicio pautado y supervisado por fisioterapeutas.",
    intro:
      "El ejercicio terapéutico es una de las herramientas más potentes de la fisioterapia. Lo pautamos y supervisamos para que sea seguro y eficaz.",
    points: [
      "Programas individualizados",
      "Sesiones individuales o en grupos reducidos",
      "Progresión de cargas controlada",
      "Reeducación postural y del movimiento",
    ],
    closing:
      "Puedes elegir entre sesiones individuales o en grupo reducido, siempre con la supervisión de un fisioterapeuta.",
    faqs: [],
  },
  {
    slug: "pilates-terapeutico",
    title: "Pilates terapéutico",
    order: 4,
    image: "/img/service-pilates-terapeutico.webp",
    description:
      "Pilates adaptado con enfoque clínico para mejorar el control postural y la estabilidad.",
    excerpt:
      "Control, estabilidad y conciencia corporal con un enfoque clínico y personalizado.",
    intro:
      "Nuestro Pilates terapéutico parte de la valoración del fisioterapeuta para trabajar el control motor, la estabilidad y la movilidad.",
    points: [
      "Grupos reducidos y atención personalizada",
      "Trabajo de core y control postural",
      "Adaptado a embarazo y postparto",
      "Material específico (reformer, fitball, bandas)",
    ],
    closing:
      "Una práctica consciente que complementa tu tratamiento y previene futuras molestias.",
    faqs: [],
  },
  {
    slug: "neuromodulacion",
    title: "Neuromodulación",
    order: 5,
    image: "/img/service-neuromodulacion.webp",
    description:
      "Neuromodulación percutánea ecoguiada para tratar el dolor de origen neuromuscular.",
    excerpt:
      "Tecnología ecoguiada para modular el sistema nervioso y aliviar el dolor persistente.",
    intro:
      "La neuromodulación percutánea actúa sobre el nervio para normalizar la función muscular y reducir el dolor, siempre guiada por ecografía.",
    points: [
      "Aplicación ecoguiada y precisa",
      "Indicada en dolor neuromuscular persistente",
      "Combinada con ejercicio terapéutico",
      "Realizada por fisioterapeutas especializados",
    ],
    closing:
      "Una técnica de precisión que integramos dentro de un plan de tratamiento global.",
    faqs: [],
  },
  {
    slug: "diatermia",
    title: "Diatermia",
    order: 6,
    image: "/img/service-diatermia.webp",
    description:
      "Diatermia (tecarterapia) para acelerar la recuperación de tejidos y aliviar el dolor.",
    excerpt:
      "Tecnología de radiofrecuencia que activa la regeneración de los tejidos.",
    intro:
      "La diatermia genera calor profundo en los tejidos, favoreciendo la circulación y acelerando los procesos de recuperación.",
    points: [
      "Alivio del dolor agudo y crónico",
      "Aceleración de la recuperación tisular",
      "Indolora y bien tolerada",
      "Complemento de la terapia manual",
    ],
    closing:
      "La utilizamos como apoyo dentro del tratamiento para potenciar tus resultados.",
    faqs: [],
  },
  {
    slug: "suelo-pelvico",
    title: "Suelo pélvico",
    order: 7,
    featured: true,
    image: "/img/clinic-25.webp",
    description:
      "Fisioterapia de suelo pélvico para incontinencia, dolor y salud de la mujer.",
    excerpt:
      "Salud íntima y bienestar: prevención y tratamiento de las disfunciones del suelo pélvico.",
    intro:
      "La fisioterapia de suelo pélvico aborda la incontinencia, el dolor pélvico y las disfunciones asociadas al embarazo, el postparto o la menopausia.",
    points: [
      "Valoración funcional respetuosa",
      "Tratamiento de incontinencia y prolapsos",
      "Preparación al parto y recuperación postparto",
      "Abordaje del dolor pélvico",
    ],
    closing:
      "Un espacio de confianza para cuidar una parte fundamental de tu salud.",
    faqs: [
      { q: "¿Es necesario tener síntomas para acudir?", a: "No. La valoración preventiva es muy recomendable, especialmente durante el embarazo y tras el parto." },
    ],
  },
  {
    slug: "fisioterapia-embarazo",
    title: "Fisioterapia en el embarazo",
    order: 8,
    image: "/img/clinic-16.webp",
    description:
      "Acompañamiento fisioterápico durante el embarazo para vivirlo con menos molestias.",
    excerpt:
      "Cuidamos de ti durante el embarazo para que llegues al parto en las mejores condiciones.",
    intro:
      "Durante el embarazo, la fisioterapia ayuda a controlar las molestias propias de cada trimestre y a preparar el cuerpo para el parto.",
    points: [
      "Alivio de dolor lumbar y pélvico",
      "Preparación al parto",
      "Ejercicio adaptado a cada trimestre",
      "Cuidado del suelo pélvico",
    ],
    closing:
      "Te acompañamos en cada etapa para que disfrutes de un embarazo más cómodo y activo.",
    faqs: [],
  },
  {
    slug: "postparto",
    title: "Postparto",
    order: 9,
    image: "/img/clinic-11.webp",
    description:
      "Recuperación postparto integral: suelo pélvico, abdomen y vuelta a la actividad.",
    excerpt:
      "Recupera tu cuerpo tras el parto con un plan progresivo y respetuoso.",
    intro:
      "La recuperación postparto va mucho más allá del suelo pélvico: trabajamos abdomen, postura y vuelta progresiva a la actividad.",
    points: [
      "Valoración de suelo pélvico y abdomen",
      "Tratamiento de la diástasis abdominal",
      "Reincorporación al ejercicio",
      "Consejos para el día a día con el bebé",
    ],
    closing:
      "Un acompañamiento cercano para que recuperes la confianza en tu cuerpo.",
    faqs: [],
  },
  {
    slug: "tratamiento-cicatrices",
    title: "Tratamiento de cicatrices",
    order: 10,
    image: "/img/clinic-13.webp",
    description:
      "Tratamiento de cicatrices (cesárea, cirugías) para mejorar movilidad y sensibilidad.",
    excerpt:
      "Devolvemos elasticidad y sensibilidad a las cicatrices que limitan tu movimiento.",
    intro:
      "Las cicatrices pueden generar adherencias y limitar el movimiento. La fisioterapia ayuda a recuperar su elasticidad y a reducir molestias.",
    points: [
      "Liberación de adherencias",
      "Mejora de la movilidad y la sensibilidad",
      "Tratamiento de cicatriz de cesárea",
      "Técnicas manuales e instrumentales",
    ],
    closing:
      "Un trabajo delicado que mejora tanto la función como el aspecto de la cicatriz.",
    faqs: [],
  },
  {
    slug: "fisioterapia-pediatrica",
    title: "Fisioterapia pediátrica",
    order: 11,
    image: "/img/clinic-09.webp",
    description:
      "Fisioterapia pediátrica: cólicos, plagiocefalia y desarrollo motor del bebé.",
    excerpt:
      "Cuidamos del desarrollo de los más pequeños con un trato cálido y especializado.",
    intro:
      "La fisioterapia pediátrica acompaña el desarrollo del bebé y trata afecciones frecuentes como los cólicos o la plagiocefalia.",
    points: [
      "Tratamiento de cólicos del lactante",
      "Abordaje de la plagiocefalia",
      "Estimulación del desarrollo motor",
      "Asesoramiento a las familias",
    ],
    closing:
      "Un entorno seguro y cálido pensado para los más pequeños y sus familias.",
    faqs: [],
  },
];

// Children of entrenamiento-terapeutico
const trainingChildren = [
  {
    slug: "entrenamiento-terapeutico/individual",
    title: "Entrenamiento terapéutico individual",
    parent: "entrenamiento-terapeutico",
    image: "/img/service-entrenamiento-terapeutico.webp",
    description:
      "Sesiones individuales de ejercicio terapéutico totalmente personalizadas.",
    excerpt: "Atención exclusiva de un fisioterapeuta en cada sesión.",
    intro:
      "En las sesiones individuales cuentas con la atención exclusiva de tu fisioterapeuta, que ajusta cada ejercicio a tu evolución.",
    points: [
      "Atención 100% personalizada",
      "Progresión adaptada a tus objetivos",
      "Ideal en fases iniciales de recuperación",
      "Máximo control de la técnica",
    ],
    closing: "La opción más recomendable cuando necesitas una supervisión estrecha.",
    faqs: [],
  },
  {
    slug: "entrenamiento-terapeutico/grupal",
    title: "Entrenamiento terapéutico grupal",
    parent: "entrenamiento-terapeutico",
    image: "/img/service-entrenamiento-terapeutico.webp",
    description:
      "Entrenamiento terapéutico en grupos reducidos supervisado por fisioterapeutas.",
    excerpt: "La motivación del grupo con la seguridad de la supervisión clínica.",
    intro:
      "En grupos reducidos disfrutas de la motivación de entrenar acompañado, sin renunciar a la supervisión de un fisioterapeuta.",
    points: [
      "Grupos reducidos (máx. 6 personas)",
      "Programa adaptado a cada participante",
      "Mejor relación calidad-precio",
      "Continuidad tras el alta",
    ],
    closing: "Perfecto para mantener los logros conseguidos y seguir progresando.",
    faqs: [],
  },
];

const conditions = [
  {
    slug: "atm",
    title: "ATM (articulación temporomandibular)",
    order: 1,
    image: "/img/condition-atm.webp",
    description:
      "Tratamiento de los trastornos de la ATM: bruxismo, migrañas y vértigos.",
    excerpt:
      "Aliviamos el dolor mandibular y sus síntomas asociados con un abordaje específico.",
    intro:
      "Los trastornos de la articulación temporomandibular pueden causar dolor mandibular, dolores de cabeza, bruxismo e incluso vértigos.",
    points: [
      "Valoración de la articulación y la musculatura masticatoria",
      "Terapia manual intra y extraoral",
      "Pautas para el bruxismo",
      "Coordinación con odontología si es necesario",
    ],
    closing:
      "Un abordaje integral para reducir el dolor y recuperar la función de la mandíbula.",
    faqs: [],
  },
  {
    slug: "dolor-espalda",
    title: "Dolor de espalda",
    order: 2,
    image: "/img/condition-dolor-espalda.webp",
    description:
      "Tratamiento del dolor de espalda cervical, dorsal y lumbar desde su origen.",
    excerpt:
      "Identificamos la causa de tu dolor de espalda para resolverlo y prevenir recaídas.",
    intro:
      "El dolor de espalda es uno de los motivos de consulta más frecuentes. Buscamos su origen para tratarlo de forma duradera.",
    points: [
      "Valoración postural y funcional",
      "Terapia manual y ejercicio terapéutico",
      "Educación en higiene postural",
      "Prevención de recaídas",
    ],
    closing:
      "Combinamos tratamiento y educación para que tu espalda recupere su función.",
    faqs: [
      { q: "¿El reposo es bueno para el dolor de espalda?", a: "En la mayoría de los casos, el movimiento controlado es más beneficioso que el reposo prolongado." },
    ],
  },
  {
    slug: "lesion-rodilla",
    title: "Lesión de rodilla",
    order: 3,
    image: "/img/condition-lesion-rodilla.webp",
    description:
      "Recuperación de lesiones de rodilla: ligamentos, meniscos y tendinopatías.",
    excerpt:
      "Te acompañamos en la recuperación de tu rodilla hasta el retorno a tu actividad.",
    intro:
      "Tratamos las lesiones de rodilla más frecuentes, desde tendinopatías hasta el postoperatorio de ligamentos o meniscos.",
    points: [
      "Valoración y diagnóstico funcional",
      "Readaptación progresiva",
      "Trabajo de fuerza y propiocepción",
      "Criterios de alta objetivos",
    ],
    closing:
      "Un plan por fases para que vuelvas a tu día a día y a tu deporte con seguridad.",
    faqs: [],
  },
  {
    slug: "lesion-hombro",
    title: "Lesión de hombro",
    order: 4,
    image: "/img/condition-lesion-hombro.webp",
    description:
      "Tratamiento de lesiones de hombro: manguito rotador, tendinopatías e inestabilidad.",
    excerpt:
      "Recuperamos la movilidad y la fuerza de tu hombro con un plan a tu medida.",
    intro:
      "El hombro es una articulación compleja. Tratamos tendinopatías, lesiones del manguito rotador e inestabilidades.",
    points: [
      "Valoración de la movilidad y la fuerza",
      "Terapia manual y ejercicio terapéutico",
      "Recuperación postquirúrgica",
      "Prevención de recaídas",
    ],
    closing:
      "Devolvemos a tu hombro la movilidad y la fuerza que necesitas en tu día a día.",
    faqs: [],
  },
];

// Real team members. First names/roles come from the source photos; surnames
// are placeholders pending confirmation from the client.
const professionals = [
  {
    slug: "alvaro-sanz",
    title: "Álvaro Sanz",
    order: 1,
    role: "CEO y fisioterapeuta",
    image: "/img/team-ceo.webp",
    locations: ["el-canaveral", "tres-cantos"],
    credentials: "Col. nº 0000 · Fundador de MUV",
    description:
      "Fundador y CEO de MUV, fisioterapeuta al frente del proyecto en El Cañaveral y Tres Cantos.",
    excerpt: "Fundador de MUV y fisioterapeuta.",
    intro:
      "Álvaro es el fundador de MUV. Lidera el proyecto con una idea clara: una fisioterapia eficaz, eficiente y, sobre todo, empática, con la persona en el centro.",
    points: [
      "Dirección clínica del proyecto MUV",
      "Fisioterapia avanzada y ejercicio terapéutico",
      "Formación continua del equipo",
    ],
    closing:
      "Su visión marca la forma de cuidar de MUV en ambas sedes: rigor, cercanía y trabajo en equipo.",
    faqs: [],
  },
  {
    slug: "jose-delgado",
    title: "José Delgado",
    order: 2,
    role: "Director MUV Tres Cantos · Fisioterapeuta",
    image: "/img/team-jose.webp",
    locations: ["tres-cantos"],
    credentials: "Col. nº 0000 · Director de la sede de Tres Cantos",
    description:
      "Fisioterapeuta y director de la sede de MUV en Tres Cantos.",
    excerpt: "Director de la sede de Tres Cantos.",
    intro:
      "José dirige la sede de Tres Cantos, donde coordina al equipo y acompaña a los pacientes con un trato cercano y un enfoque basado en la evidencia.",
    points: [
      "Dirección de la sede de Tres Cantos",
      "Fisioterapia y terapia manual",
      "Coordinación del equipo asistencial",
    ],
    closing:
      "Vela por que cada paciente de Tres Cantos reciba una atención personalizada de principio a fin.",
    faqs: [],
  },
  {
    slug: "lucia-fernandez",
    title: "Lucía Fernández",
    order: 3,
    role: "Fisioterapeuta · Suelo pélvico",
    image: "/img/team-lucia.webp",
    locations: ["el-canaveral", "tres-cantos"],
    credentials: "Col. nº 0000 · Máster en Fisioterapia Obstétrica y Uroginecológica",
    description:
      "Fisioterapeuta especialista en suelo pélvico y salud de la mujer en MUV.",
    excerpt: "Especialista en suelo pélvico y salud de la mujer.",
    intro:
      "Lucía es fisioterapeuta especializada en suelo pélvico, embarazo y postparto. Su trato cercano y su enfoque respetuoso son su seña de identidad.",
    points: [
      "Suelo pélvico y uroginecología",
      "Preparación al parto y postparto",
      "Tratamiento del dolor pélvico",
    ],
    closing:
      "Acompaña a cada paciente con cercanía y rigor en todas las etapas de su salud.",
    faqs: [],
  },
  {
    slug: "gonzalo-herrera",
    title: "Gonzalo Herrera",
    order: 4,
    role: "Fisioterapeuta · Técnicas invasivas y ecografía",
    image: "/img/team-gonzalo.webp",
    locations: ["el-canaveral"],
    credentials: "Col. nº 0000 · Experto en ecografía y punción seca",
    description:
      "Fisioterapeuta especialista en fisioterapia invasiva ecoguiada y punción seca.",
    excerpt: "Especialista en fisioterapia invasiva y ecografía.",
    intro:
      "Gonzalo está especializado en fisioterapia invasiva ecoguiada. Utiliza la ecografía para tratar con precisión el origen del dolor neuromuscular.",
    points: [
      "Técnicas invasivas ecoguiadas",
      "Punción seca y neuromodulación",
      "Diagnóstico ecográfico",
    ],
    closing:
      "Combina precisión técnica y ejercicio terapéutico para resultados duraderos.",
    faqs: [],
  },
  {
    slug: "nuria-romero",
    title: "Nuria Romero",
    order: 5,
    role: "Fisioterapeuta",
    image: "/img/team-nuria.webp",
    locations: ["tres-cantos"],
    credentials: "Col. nº 0000 · Fisioterapia y ejercicio terapéutico",
    description:
      "Fisioterapeuta especialista en terapia manual y ejercicio terapéutico en MUV Tres Cantos.",
    excerpt: "Fisioterapia y ejercicio terapéutico.",
    intro:
      "Nuria combina la terapia manual con el ejercicio terapéutico para acompañar a cada paciente hacia una recuperación completa y duradera.",
    points: [
      "Terapia manual",
      "Ejercicio terapéutico pautado",
      "Prevención de recaídas",
    ],
    closing:
      "Su cercanía y su rigor hacen que cada paciente se sienta acompañado en todo el proceso.",
    faqs: [],
  },
  {
    slug: "david-vallejo",
    title: "David Vallejo",
    order: 6,
    role: "Fisioterapeuta · Deportiva",
    image: "/img/team-vallejo.webp",
    locations: ["el-canaveral"],
    credentials: "Col. nº 0000 · Máster en Fisioterapia Deportiva",
    description:
      "Fisioterapeuta especialista en fisioterapia deportiva y readaptación de lesiones.",
    excerpt: "Especialista en fisioterapia deportiva y readaptación.",
    intro:
      "David acompaña a deportistas en la recuperación de sus lesiones y en el retorno seguro a la competición, combinando técnica manual y trabajo de fuerza.",
    points: [
      "Lesiones deportivas y readaptación",
      "Ecografía y técnicas invasivas",
      "Trabajo de fuerza y prevención",
    ],
    closing:
      "Su objetivo es que cada deportista vuelva más fuerte y con menos riesgo de recaída.",
    faqs: [],
  },
];

const blog = [
  {
    slug: "5-senales-acudir-fisioterapeuta",
    title: "5 señales de que deberías acudir al fisioterapeuta",
    order: 1,
    date: "2026-05-20",
    author: "Equipo MUV",
    image: "/img/clinic-22.webp",
    description:
      "Aprende a identificar las señales que indican que es momento de consultar con un fisioterapeuta.",
    excerpt:
      "El dolor no siempre desaparece solo. Te contamos cuándo conviene pedir cita.",
    intro:
      "Muchas molestias se cronifican por no consultar a tiempo. Estas son cinco señales que no deberías ignorar.",
    points: [
      "Dolor que dura más de dos semanas",
      "Molestias que reaparecen con frecuencia",
      "Pérdida de movilidad o fuerza",
      "Dolor que afecta a tu descanso",
      "Limitación en tu actividad diaria o deportiva",
    ],
    closing:
      "Ante cualquiera de estas señales, una valoración a tiempo puede ahorrarte semanas de molestias.",
    faqs: [],
  },
  {
    slug: "ejercicio-terapeutico-por-que-funciona",
    title: "Ejercicio terapéutico: por qué el movimiento es medicina",
    order: 2,
    date: "2026-04-12",
    author: "Equipo MUV",
    image: "/img/clinic-24.webp",
    description:
      "Descubre por qué el ejercicio terapéutico es una de las herramientas más eficaces en fisioterapia.",
    excerpt:
      "El movimiento bien pautado es uno de los tratamientos más potentes que existen.",
    intro:
      "El ejercicio terapéutico no es ir al gimnasio: es movimiento pautado y supervisado con un objetivo clínico.",
    points: [
      "Fortalece los tejidos lesionados",
      "Reduce el dolor a medio y largo plazo",
      "Previene recaídas",
      "Mejora tu confianza y autonomía",
    ],
    closing:
      "Por eso integramos el ejercicio terapéutico en la mayoría de nuestros tratamientos.",
    faqs: [],
  },
  {
    slug: "suelo-pelvico-mitos",
    title: "Suelo pélvico: 4 mitos que conviene desterrar",
    order: 3,
    date: "2026-03-03",
    author: "Equipo MUV",
    image: "/img/clinic-25.webp",
    description:
      "Desmontamos los mitos más frecuentes sobre la salud del suelo pélvico.",
    excerpt:
      "La incontinencia no es normal ni inevitable. Aclaramos las dudas más comunes.",
    intro:
      "Alrededor del suelo pélvico circulan muchos mitos. Aclaramos los más frecuentes para que cuides tu salud con información veraz.",
    points: [
      "“Las pérdidas de orina son normales tras el parto”",
      "“Los ejercicios de Kegel sirven para todo”",
      "“El suelo pélvico solo importa en la mujer”",
      "“Si no tengo síntomas, no necesito revisión”",
    ],
    closing:
      "Una valoración profesional es la mejor forma de cuidar tu suelo pélvico.",
    faqs: [],
  },
];

function frontmatter(item, collection) {
  const fm = ["---", `title: "${item.title}"`, `description: "${item.description}"`];
  if (item.excerpt) fm.push(`excerpt: "${item.excerpt}"`);
  if (item.image) fm.push(`image: "${item.image}"`);
  if (typeof item.order === "number") fm.push(`order: ${item.order}`);
  if (item.featured) fm.push(`featured: true`);
  if (item.parent) fm.push(`parent: "${item.parent}"`);
  if (item.date) fm.push(`date: "${item.date}"`);
  if (item.author) fm.push(`author: "${item.author}"`);
  if (item.role) fm.push(`role: "${item.role}"`);
  if (item.credentials) fm.push(`credentials: "${item.credentials}"`);
  if (item.locations)
    fm.push(`locations: [${item.locations.map((s) => `"${s}"`).join(", ")}]`);
  if (item.faqs && item.faqs.length) {
    fm.push("faqs:");
    fm.push(faqBlock(item.faqs));
  }
  fm.push("---");
  return fm.join("\n");
}

async function writeDocs(collection, items) {
  for (const item of items) {
    const file = path.join(ROOT, collection, `${item.slug}.mdx`);
    await mkdir(path.dirname(file), { recursive: true });
    const md = `${frontmatter(item, collection)}\n${body(
      item.intro,
      item.points,
      item.closing,
    )}`;
    await writeFile(file, md);
    console.log(`✓ ${collection}/${item.slug}.mdx`);
  }
}

await writeDocs("services", [...services, ...trainingChildren]);
await writeDocs("conditions", conditions);
await writeDocs("professionals", professionals);
await writeDocs("blog", blog);
console.log("\nMDX content generated.");
