import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type Props = {
  href: string;
  title: string;
  excerpt: string;
  image?: string;
  /** Descriptive ALT. Falls back to the title when the copy doesn't set one. */
  imageAlt?: string;
  /** Where the service is available, e.g. "Ambas sedes". */
  availability?: string;
  className?: string;
};

export function ServiceCard({
  href,
  title,
  excerpt,
  image,
  imageAlt,
  availability,
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-olive-900/10 bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-2xl hover:shadow-olive-900/10",
        className,
      )}
    >
      {image && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={imageAlt ?? title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-olive-900/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-xl text-olive-800">{title}</h3>
        {availability && (
          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-gold-700">
            {availability}
          </p>
        )}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
          {excerpt}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold-700">
          Saber más
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
