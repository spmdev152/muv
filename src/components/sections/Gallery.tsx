import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { getImageSize } from "@/lib/image-size";

type Props = {
  images: string[];
  /** Un ALT por imagen, y distinto: seis iguales valdrían lo que una. */
  alts: readonly string[];
};

/**
 * Galería de las fotos de una clínica.
 *
 * En columnas y no en cuadrícula, y sin `object-cover`: las fotos de las dos
 * sedes mezclan apaisadas de 1920×1282 con verticales de 1920×3540, y cualquier
 * proporción común dejaría fuera media foto. Aquí cada una ocupa la suya, que
 * se lee de la cabecera del fichero al compilar.
 */
export function Gallery({ images, alts }: Props) {
  const items = images
    .map((src, i) => ({ src, alt: alts[i], size: getImageSize(src) }))
    .filter((item) => item.size !== null);

  if (items.length === 0) return null;

  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
      {items.map((item, i) => (
        <Reveal key={item.src} delay={(i % 3) * 0.06} className="break-inside-avoid">
          <Image
            src={item.src}
            alt={item.alt ?? ""}
            width={item.size!.width}
            height={item.size!.height}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="h-auto w-full rounded-3xl object-contain"
          />
        </Reveal>
      ))}
    </div>
  );
}
