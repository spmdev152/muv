import type { NextConfig } from "next";

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
    ];
  },
};

export default nextConfig;
