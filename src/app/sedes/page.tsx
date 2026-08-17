import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { LocationCard } from "@/components/cards/LocationCard";
import { AvailabilityTable } from "@/components/sections/AvailabilityTable";
import { FAQ, type QA } from "@/components/sections/FAQ";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ShieldCheck } from "@/components/ui/icons";
import { locations } from "@/lib/locations";
import { buildMetadata, clinicListJsonLd, faqJsonLd } from "@/lib/seo";
import {
  availability,
  backing,
  clinics,
  cta,
  faqSection,
  faqs,
  hero,
  meta,
} from "@/content/sedes";

/**
 * `/sedes` — hub de las dos clínicas.
 *
 * Copy aprobada en `docs/contenidos/sedes.md` (v14). Los comentarios `Módulo N`
 * se corresponden uno a uno con los del documento.
 *
 * Esta página recibe autoridad de la home y la reparte hacia las dos sedes y
 * hacia trece páginas de servicio, que salen de la tabla del módulo 3.
 */

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  rawTitle: meta.title,
  description: meta.description,
  path: "/sedes",
});

const faqItems: QA[] = faqs.map((faq) => ({ ...faq }));

export default function SedesPage() {
  return (
    <>
      <JsonLd data={clinicListJsonLd()} />
      <JsonLd data={faqJsonLd(faqItems)} />

      {/* Módulo 1 · Hero */}
      <PageHero
        title={hero.title}
        description={hero.lede}
        crumbs={[{ label: "Sedes", href: "/sedes" }]}
      />

      <section className="pb-16 md:pb-20">
        <Container size="wide">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href={hero.secondaryCta.href} variant="outline">
                {hero.secondaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Link
                href={hero.textLink.href}
                className="group inline-flex items-center gap-2 text-sm font-medium text-olive-700 transition-colors hover:text-gold-700"
              >
                {hero.textLink.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Módulo 2 · Las dos clínicas */}
      <section className="bg-cream-dark/50 py-16 md:py-24">
        <Container size="wide">
          <SectionHeading eyebrow={clinics.eyebrow} title={clinics.title} />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {locations.map((location, i) => {
              const card =
                clinics.cards[location.slug as keyof typeof clinics.cards];
              return (
                <Reveal key={location.slug} delay={i * 0.1}>
                  <LocationCard
                    location={location}
                    heading={card?.heading}
                    headingAs="h3"
                    address={card?.address}
                    hours={card?.hours}
                    registry={card?.registry}
                    facilities={card?.facilities}
                    ctaLabel={card?.ctaLabel}
                    imageAlt={card?.imageAlt}
                    // PENDIENTE MUV: qué teléfono es el correcto en cada sede.
                    showPhone={false}
                  />
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Módulo 3 · Tabla de disponibilidad */}
      <section className="py-16 md:py-24">
        <Container size="wide">
          <SectionHeading
            eyebrow={availability.eyebrow}
            title={availability.title}
          />
          <Reveal className="mt-12 block">
            <AvailabilityTable
              caption={availability.caption}
              columns={availability.columns}
              rows={availability.rows}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-3xl leading-relaxed text-ink-soft">
              {availability.note.before}
              <Link
                href="/sedes/el-canaveral"
                className="text-olive-700 underline underline-offset-4 transition-colors hover:text-gold-700"
              >
                {availability.note.linkCanaveral}
              </Link>
              {availability.note.middle}
              <Link
                href="/sedes/tres-cantos"
                className="text-olive-700 underline underline-offset-4 transition-colors hover:text-gold-700"
              >
                {availability.note.linkTresCantos}
              </Link>
              {availability.note.after}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Módulo 4 · El respaldo de las dos clínicas */}
      <section className="bg-cream-dark/50 py-16 md:py-24">
        <Container size="wide">
          <SectionHeading eyebrow={backing.eyebrow} title={backing.title} />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {backing.points.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.08} as="li">
                <div className="h-full rounded-3xl border border-olive-900/10 bg-white p-7">
                  <ShieldCheck className="h-6 w-6 text-gold-600" />
                  <h3 className="mt-4 font-display text-lg text-olive-700">
                    {point.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">
                    {point.text}
                  </p>
                  {"href" in point && point.href && (
                    <Link
                      href={point.href}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold-700"
                    >
                      Ver el equipo
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Módulo 5 · Preguntas frecuentes */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <SectionHeading
            align="center"
            eyebrow={faqSection.eyebrow}
            title={faqSection.title}
          />
          <div className="mt-12">
            <FAQ items={faqItems} />
          </div>
        </Container>
      </section>

      {/* Módulo 6 · CTA */}
      <CTASection title={cta.title} description={cta.description} />
    </>
  );
}
