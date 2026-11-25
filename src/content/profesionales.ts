/**
 * Approved copy of `/profesionales` (#28, approved on 5/11/2026).
 *
 * The page lists only the two professionals MUV has confirmed, each with their
 * collegiate number. Full profiles (photo, training, areas of work) wait for
 * MUV's data (#16): an unconfirmed fact is not published, approximated or
 * invented.
 */

export const meta = {
  title: "Fisioterapeutas responsables de las clínicas",
  description:
    "Los fisioterapeutas responsables de MUV Tres Cantos y MUV El Cañaveral, con su número de colegiado.",
} as const;

export const hero = {
  title: "Los responsables de cada clínica",
  lede: "Los fisioterapeutas al frente de MUV Tres Cantos y MUV El Cañaveral, con su número de colegiado.",
} as const;

/** One card per clinic; `location` is the clinic's slug in `locations`. */
export const cards = [
  {
    location: "tres-cantos",
    name: "José Luis González Coronado",
    role: "Fisioterapeuta y responsable de la clínica",
    collegiate: "Colegiado nº 15502",
  },
  {
    location: "el-canaveral",
    name: "Álvaro Ortega Rienda",
    role: "Responsable sanitario",
    collegiate: "Colegiado nº 12868",
  },
] as const;
