import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { trust } from "@/content/home";

/**
 * Módulo 2 · Franja de confianza.
 *
 * Tira compacta sin titular, justo debajo del hero. Es el único bloque que
 * aporta señales E-E-A-T en toda la home y ocupa una línea.
 *
 * El documento define cuatro columnas; se publican las tres que tienen dato.
 * La cuarta —años de recorrido— está pendiente de MUV y no se maqueta: ver
 * `src/content/home.ts`.
 */
export function TrustStrip() {
  return (
    <section className="border-y border-olive-900/10 bg-cream py-7">
      <Container size="wide">
        <ul className="grid gap-6 sm:grid-cols-3">
          {trust.map((item, i) => {
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
