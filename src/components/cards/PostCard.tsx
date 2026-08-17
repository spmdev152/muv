import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@/components/ui/icons";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  title: string;
  date?: string;
  image?: string;
  imageAlt?: string;
  className?: string;
};

/**
 * Tarjeta de entrada del blog: imagen, fecha y título.
 *
 * Sin extracto a propósito — el módulo 10 de `docs/contenidos/home.md` pide
 * «tarjeta con título y fecha», y los `excerpt` del blog siguen siendo copy
 * de ejemplo pendiente de la oleada 4.
 */
export function PostCard({
  href,
  title,
  date,
  image,
  imageAlt,
  className,
}: Props) {
  return (
    <Link href={href} className={cn("group block", className)}>
      {image && (
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
        </div>
      )}
      {date && (
        <p className="mt-5 text-xs uppercase tracking-[0.18em] text-gold-700">
          {formatDate(date)}
        </p>
      )}
      <h3 className="mt-2 text-xl text-olive-800 transition-colors group-hover:text-gold-700">
        {title}
      </h3>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-olive-600">
        Leer artículo
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
