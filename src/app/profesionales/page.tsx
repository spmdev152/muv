import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { cards, hero, meta } from "@/content/profesionales";
import { getLocation } from "@/lib/locations";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: "/profesionales",
});

/**
 * A single page with the two professionals MUV has confirmed (#28). There are
 * no individual profile pages: `/profesionales/<slug>` redirects here.
 */
export default function ProfesionalesPage() {
  return (
    <>
      <PageHero
        eyebrow="Profesionales"
        title={hero.title}
        description={hero.lede}
        crumbs={[{ label: "Profesionales", href: "/profesionales" }]}
      />

      <section className="pb-20 md:pb-28">
        <Container size="wide">
          <ul className="grid gap-6 md:grid-cols-2">
            {cards.map((card, i) => {
              const location = getLocation(card.location);

              return (
                <Reveal key={card.name} delay={i * 0.08} as="li">
                  <div className="h-full rounded-3xl border border-olive-900/10 bg-white p-8">
                    {location && (
                      <p className="eyebrow mb-3">
                        <Link
                          href={`/sedes/${location.slug}`}
                          className="hover:underline"
                        >
                          {location.name}
                        </Link>
                      </p>
                    )}
                    <h2 className="font-display text-2xl text-olive-700">
                      {card.name}
                    </h2>
                    <p className="mt-2 text-ink-soft">{card.role}</p>
                    <p className="mt-1 text-sm text-gold-700">
                      {card.collegiate}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
