import type { NextConfig } from "next";

/** Origen → destino, con la tabla de #31. */
const RETIRED: [string, string][] = [
  ["/servicios/fisioterapia", "/servicios#fisioterapia"],
  ["/servicios/fisioterapia-deportiva", "/sedes/tres-cantos/fisioterapia-deportiva"],
  ["/servicios/entrenamiento-terapeutico", "/servicios#entrenamiento-funcional"],
  ["/servicios/entrenamiento-terapeutico/individual", "/servicios#entrenamiento-funcional"],
  ["/servicios/entrenamiento-terapeutico/grupal", "/servicios#entrenamiento-funcional"],
  ["/servicios/neuromodulacion", "/servicios#neuromodulacion"],
  ["/servicios/diatermia", "/servicios#diatermia"],
  ["/servicios/pilates-terapeutico", "/sedes/el-canaveral/pilates"],
  ["/servicios/suelo-pelvico", "/sedes/el-canaveral/suelo-pelvico"],
  ["/servicios/fisioterapia-embarazo", "/sedes/el-canaveral/suelo-pelvico#embarazo-y-postparto"],
  ["/servicios/postparto", "/sedes/el-canaveral/suelo-pelvico#embarazo-y-postparto"],
  ["/servicios/fisioterapia-pediatrica", "/servicios#fisioterapia-pediatrica"],
  ["/servicios/tratamiento-cicatrices", "/servicios#tratamiento-cicatrices"],
  ["/dolencias-y-lesiones", "/servicios"],
  ["/dolencias-y-lesiones/dolor-espalda", "/sedes/tres-cantos/fisioterapia-espalda"],
  ["/dolencias-y-lesiones/lesion-rodilla", "/sedes/tres-cantos/fisioterapia-rodilla"],
  ["/dolencias-y-lesiones/lesion-hombro", "/sedes/tres-cantos"],
  ["/dolencias-y-lesiones/atm", "/servicios#atm"],
];

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  async redirects() {
    return [
      {
        // `/sedes/<sede>/contacto` publicaba la misma dirección, horario y mapa
        // que el módulo «Cómo llegar» de la página de sede, y declaraba el
        // mismo `MedicalClinic` con idéntico `@id`. Con `/contacto` eran tres
        // páginas compitiendo por la misma intención. Se retira y su señal
        // local se concentra en una sola URL.
        source: "/sedes/:sede/contacto",
        destination: "/sedes/:sede#como-llegar",
        permanent: true,
      },
      // Páginas provisionales retiradas (#31, #51). Competían con las ocho
      // páginas `/sedes/<sede>/<servicio>` por las mismas búsquedas. Las 301
      // son solo una red de seguridad para quien llega de fuera: ningún enlace
      // interno, ninguna entrada del sitemap y ningún JSON-LD apunta a ellas.
      // `statusCode` y no `permanent`, que daría 308: el issue pide 301.
      ...RETIRED.map(([source, destination]) => ({
        source,
        destination,
        statusCode: 301 as const,
      })),
    ];
  },
};

export default nextConfig;
