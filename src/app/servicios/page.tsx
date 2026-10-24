import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { BookingButton } from "@/components/BookingButton";
import { CTASection } from "@/components/sections/CTASection";
import { RichText } from "@/components/ui/RichText";
import { ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { buildMetadata } from "@/lib/seo";
import { cta, hero, index, meta, modules } from "@/content/servicios";

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  rawTitle: meta.title,
  description: meta.description,
  path: "/servicios",
});

/**
 * `/servicios` — el catálogo completo en una sola página (#31).
 *
 * Copy aprobada en `src/content/servicios.ts`. Sin pestañas: cada servicio sale
 * una vez, con un bloque cuyo H3 lleva el ancla fija del servicio y reserva el
 * alto de la cabecera fija (`scroll-mt-28`) para que el salto no tape el
 * título. El menú, la home, `/sedes` y las páginas de sede enlazan a esas
 * anclas.
 *
 * Datos estructurados: solo el `BreadcrumbList` de las migas. Sin `FAQPage`,
 * sin `MedicalProcedure` y sin repetir el `Service` de las ocho páginas.
 */
export default function ServiciosPage() {
  return (
    <>
      {/* Módulo 1 · Hero */}
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.lede}
        crumbs={[{ label: "Servicios", href: "/servicios" }]}
      />

      <section className="pb-12 md:pb-16">
        <Container size="wide">
          <Reveal>
            <nav aria-label="Índice de servicios">
              <ul className="flex flex-wrap gap-2">
                {index.map((entry) => (
                  <li key={entry.id}>
                    <Link
                      href={`#${entry.id}`}
                      className="inline-block rounded-full border border-olive-900/10 bg-white px-4 py-2 text-sm text-olive-700 transition-colors hover:border-olive-500/40 hover:text-gold-700"
                    >
                      {entry.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BookingButton size="lg" />
              <Button href={hero.secondaryCta.href} variant="outline" size="lg">
                {hero.secondaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Módulos 2 a 6 */}
      {modules.map((module, n) => (
        <section
          key={module.title}
          className={cn("py-16 md:py-24", n % 2 === 0 && "bg-cream-dark/50")}
        >
          <Container size="wide">
            <SectionHeading eyebrow={module.eyebrow} title={module.title} />
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {module.blocks.map((block, i) => (
                <Reveal key={block.id} delay={(i % 2) * 0.08}>
                  <article className="flex h-full flex-col rounded-3xl border border-olive-900/10 bg-white p-7">
                    <h3
                      id={block.id}
                      className="scroll-mt-28 font-display text-xl text-olive-700"
                    >
                      {block.title}
                    </h3>
                    <p className="mt-3 flex-1 leading-relaxed text-ink-soft">
                      <RichText text={block.text} />
                    </p>
                    <div className="mt-6 border-t border-olive-900/10 pt-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-700">
                        Dónde se hace
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
                        {block.where.map((where) => (
                          <li key={where.href}>
                            <Link
                              href={where.href}
                              className="font-medium text-olive-700 underline-offset-4 transition-colors hover:text-gold-700 hover:underline"
                            >
                              {where.clinic}
                            </Link>
                            {where.pages?.map((page, j) => (
                              <span key={page.href}>
                                {j === 0 ? " — " : " · "}
                                <Link
                                  href={page.href}
                                  className="text-olive-700 underline underline-offset-4 transition-colors hover:text-gold-700"
                                >
                                  {page.label}
                                </Link>
                              </span>
                            ))}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ))}

      {/* Módulo 7 · CTA */}
      <CTASection
        eyebrow={cta.eyebrow}
        title={cta.title}
        description={cta.description}
        secondary={cta.secondary}
      />
    </>
  );
}
