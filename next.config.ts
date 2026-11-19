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

/**
 * Artículos del WordPress anterior de clinicamuv.com. Allí vivían en la raíz
 * (`/<slug>/`); aquí conservan el mismo slug bajo `/blog/`.
 */
const WORDPRESS_POSTS = [
  "10-beneficios-de-las-clases-de-pilates",
  "10-ejercicios-efectivos-para-aliviar-la-ciatica-en-casa",
  "7-claves-para-potenciar-tu-rendimiento-con-el-masaje-deportivo",
  "biofeedback-la-clave-para-equilibrar-tu-cuerpo-y-mente",
  "como-la-fisioterapia-traumatologica-te-ayuda-a-volver-a-moverte-sin-dolor",
  "el-secreto-para-fortalecer-tu-core-y-mejorar-tu-postura-son-los-hipopresivos",
  "estiramientos-hidratacion-y-sueno-lo-que-nadie-te-dice-sobre-la-recuperacion-muscular",
  "fisioterapia-pediatrica-el-apoyo-que-tu-peque-necesita",
  "frio-vs-calor-la-batalla-definitiva-para-tratar-lesiones",
  "las-lesiones-en-crossfit-mas-comunes",
  "lesiones-deportivas-tratamiento-y-prevencion-para-volver-al-juego",
  "los-masajes-pre-entreno-son-la-clave-para-activar-musculos-y-prevenir-lesiones",
  "puncion-seca-la-tecnica-que-alivia-el-dolor-muscular-y-mejora-la-movilidad",
  "que-es-la-fisioterapia-del-suelo-pelvico-y-por-que-es-tan-importante",
  "que-es-la-neuromodulacion-en-fisioterapia-y-para-que-sirve",
  "suelo-pelvico-en-madrid-fisioterapia-especializada-para-recuperar-el-control-y-bienestar",
  "tendinitis-de-hombro-tratamiento-fisioterapeutico-para-aliviar-el-dolor-y-recuperar-la-movilidad",
];

const nextConfig: NextConfig = {
  // Self-contained server for the Docker image (#61): `.next/standalone` holds
  // only the files and dependencies the app needs at runtime.
  output: "standalone",
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  experimental: {
    // The job application form sends a CV of up to 5 MB to a server action (#66); the
    // default limit is 1 MB. The margin covers the other fields and encoding.
    serverActions: { bodySizeLimit: "6mb" },
  },
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
      // URL del WordPress anterior, tomadas de su sitemap antes de apuntar el
      // dominio a este sitio. Son las que Google tiene indexadas: sin estas
      // 301 acabarían en un 404 y se perdería su posicionamiento. WordPress
      // las servía con barra final; Next la retira antes con un 308 propio.
      ...WORDPRESS_POSTS.map((slug) => ({
        source: `/${slug}`,
        destination: `/blog/${slug}`,
        statusCode: 301 as const,
      })),
      {
        source: "/tres-cantos",
        destination: "/sedes/tres-cantos",
        statusCode: 301 as const,
      },
      // Los archivos por categoría y la paginación del blog no tienen
      // equivalente: el blog nuevo es un único listado.
      {
        source: "/category/:slug*",
        destination: "/blog",
        statusCode: 301 as const,
      },
      {
        source: "/blog/page/:n(\\d+)",
        destination: "/blog",
        statusCode: 301 as const,
      },
    ];
  },
};

export default nextConfig;
