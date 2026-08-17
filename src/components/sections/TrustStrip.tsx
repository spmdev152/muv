import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export type TrustItem = {
  label: string;
  value: string;
  href?: string;
  /** Dominio externo: se abre en pestaña nueva. */
  external?: boolean;
};

type Props = {
  items: TrustItem[];
  className?: string;
};

/**
 * Tira compacta de datos, sin titular.
 *
 * La usan la franja de confianza de la home (módulo 2) y las franjas de
 * garantías y de disponibilidad de las dos páginas de sede (módulo 1). En todas
 * es la misma forma: un rótulo, una línea y a veces un enlace.
 *
 * El número de columnas sale de los datos, no de una constante: cuando un dato
 * está pendiente de MUV, su columna sencillamente no se pasa.
 */
export function TrustStrip({ items, className }: Props) {
  if (items.length === 0) return null;

  return (
    <section
      className={cn("border-y border-olive-900/10 bg-cream py-7", className)}
    >
      <Container size="wide">
        <ul
          className={cn(
            "grid gap-6",
            items.length === 2 && "sm:grid-cols-2",
            items.length >= 3 && "sm:grid-cols-3",
          )}
        >
          {items.map((item, i) => {
            const body = (
              <>
                <span className="block font-display text-base text-olive-700">
                  {item.label}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-soft">
                  {item.value}
                </span>
              </>
            );

            const linkClass =
              "group block transition-colors hover:text-gold-700";

            return (
              <Reveal key={item.label} delay={i * 0.08} as="li">
                {!item.href ? (
                  body
                ) : item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {body}
                  </a>
                ) : (
                  <Link href={item.href} className={linkClass}>
                    {body}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
