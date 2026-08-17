import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { StepList } from "@/components/sections/StepList";
import { FAQ, type QA } from "@/components/sections/FAQ";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { BookingButton } from "@/components/BookingButton";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowRight, MapPin, ShieldCheck } from "@/components/ui/icons";
import { locations, getLocation } from "@/lib/locations";
import { buildMetadata, clinicJsonLd, faqJsonLd } from "@/lib/seo";
import type { SedeContent } from "@/content/sede-types";
import { elCanaveral } from "@/content/sede-el-canaveral";
import { tresCantos } from "@/content/sede-tres-cantos";

/**
 * `/sedes/<sede>` — una plantilla para las dos clínicas.
 *
 * Copy aprobada en `docs/contenidos/sede-el-canaveral.md` (v2) y
 * `sede-tres-cantos.md` (v10). Son documentos gemelos: mismos diez módulos y
 * misma numeración, así que la maquetación es común y solo cambia el contenido.
 *
 * Cada página defiende «fisioterapia <municipio>» y tiene prohibido repetir el
 * discurso genérico de marca, que ya hace la home.
 */

const CONTENT: Record<string, SedeContent> = {
  "el-canaveral": elCanaveral,
  "tres-cantos": tresCantos,
};

export function generateStaticParams() {
  return locations.map((l) => ({ location: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location: slug } = await params;
  const content = CONTENT[slug];
  if (!content) return {};

  return buildMetadata({
    title: content.meta.title,
    rawTitle: content.meta.title,
    description: content.meta.description,
    path: `/sedes/${slug}`,
    image: getLocation(slug)?.heroImage,
  });
}

export default async function SedePage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const location = getLocation(slug);
  const content = CONTENT[slug];
  if (!location || !content) notFound();

  const faqItems: QA[] = content.faqs.map((faq) => ({ ...faq }));

  return (
    <>
      <JsonLd data={clinicJsonLd(location, content.services.items)} />
      {faqItems.length > 0 && <JsonLd data={faqJsonLd(faqItems)} />}

      {/* Módulo 1 · Hero */}
      <PageHero
        title={content.hero.title}
        // El H1 lleva dentro la entidad de búsqueda del municipio y pasa de 75
        // caracteres: a cuerpo completo caía en cuatro líneas.
        titleSize="compact"
        description={content.hero.lede}
        image={location.heroImage}
        crumbs={[
          { label: "Sedes", href: "/sedes" },
          { label: location.shortName, href: `/sedes/${slug}` },
        ]}
      />

      {/* Franja de garantías / disponibilidad */}
      <TrustStrip items={[...content.hero.strip]} />

      <section className="py-12 md:py-16">
        <Container size="wide">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <Reveal>
              <p className="flex items-start gap-2 text-ink-soft">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-600" />
                {content.hero.address}
              </p>
              {/* PENDIENTE MUV: el teléfono y la zona de atención. */}
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex flex-wrap items-center gap-4">
                <BookingButton size="lg" />
                <Button href="#como-llegar" variant="outline" size="lg">
                  Cómo llegar
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Módulo 2 · Qué tratamos */}
      <section className="bg-cream-dark/50 py-16 md:py-24">
        <Container size="wide">
          <SectionHeading
            eyebrow={content.treats.eyebrow}
            title={content.treats.title}
            description={content.treats.lede}
          />
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {content.treats.items.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 0.08}>
                <article className="h-full rounded-3xl border border-olive-900/10 bg-white p-7">
                  <h3 className="font-display text-xl text-olive-700">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="underline-offset-4 transition-colors hover:text-gold-700 hover:underline"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      item.title
                    )}
                  </h3>
                  {item.paragraphs.map((p, j) => (
                    <p key={j} className="mt-3 leading-relaxed text-ink-soft">
                      {p.lead && (
                        <strong className="font-semibold text-ink">
                          {p.lead}
                        </strong>
                      )}
                      {p.text}
                    </p>
                  ))}
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-3xl leading-relaxed text-ink-soft">
              {content.treats.closing.text}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Módulo 3 · Servicios de esta clínica */}
      <section className="py-16 md:py-24">
        <Container size="wide">
          <SectionHeading
            eyebrow={content.services.eyebrow}
            title={content.services.title}
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.services.items.map((service, i) => (
              <Reveal key={service.label} delay={(i % 3) * 0.06} as="li">
                <Link
                  href={service.href}
                  className="group flex h-full flex-col rounded-3xl border border-olive-900/10 bg-white p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-xl hover:shadow-olive-900/10"
                >
                  <h3 className="font-display text-lg text-olive-800">
                    {service.label}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                    {service.text}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold-700">
                    Saber más
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-3xl leading-relaxed text-ink-soft">
              {content.services.note.before}
              <Link
                href={content.services.note.href}
                className="text-olive-700 underline underline-offset-4 transition-colors hover:text-gold-700"
              >
                {content.services.note.linkLabel}
              </Link>
              {content.services.note.after}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Button
              href={content.services.cta.href}
              variant="ghost"
              className="mt-6"
            >
              {content.services.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* Módulo 4 · La primera visita */}
      <section className="bg-cream-dark/50 py-16 md:py-24">
        <Container size="wide">
          <SectionHeading
            eyebrow={content.firstVisit.eyebrow}
            title={content.firstVisit.title}
          />
          <div className="mt-12">
            <StepList steps={content.firstVisit.steps} />
          </div>
        </Container>
      </section>

      {/* Módulo 5 · Equipo y acreditación */}
      <section className="py-16 md:py-24">
        <Container size="wide">
          <SectionHeading
            eyebrow={content.team.eyebrow}
            title={content.team.title}
            description={content.team.lede}
          />
          {/*
            Las fichas del equipo esperan dato de MUV: nombre, foto, número de
            colegiado y áreas de cada fisioterapeuta. No se maquetan con los
            `.mdx` actuales, que llevan `Col. nº 0000`.
          */}
          {content.team.accreditation.length > 0 && (
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {content.team.accreditation.map((fact, i) => (
                <Reveal key={fact.label} delay={i * 0.08} as="li">
                  <div className="flex h-full gap-4 rounded-3xl border border-olive-900/10 bg-white p-6">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                    <div>
                      <h3 className="font-display text-base text-olive-700">
                        {fact.label}
                      </h3>
                      <p className="mt-1 leading-relaxed text-ink-soft">
                        {fact.value}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* Módulo 6 · Instalaciones */}
      <section className="bg-cream-dark/50 py-16 md:py-24">
        <Container size="wide">
          <SectionHeading
            eyebrow={content.facilities.eyebrow}
            title={content.facilities.title}
            description={content.facilities.text}
          />
          {/*
            PENDIENTE MUV: la galería. Las seis fotos de cada clínica están en
            el repositorio, pero los ALT aprobados no describen la foto que les
            toca —en El Cañaveral fallan cinco de seis— y en el juego no existe
            ninguna imagen de recepción, de box de tratamiento ni de zona de
            entrenamiento funcional. Además `tres-cantos-01` muestra
            fisioterapia pediátrica, que esa sede no presta, y dos fotos de
            El Cañaveral muestran punción ecoguiada, que no está en el catálogo
            aprobado.

            El bloque espera a que el equipo de contenidos confirme el
            emparejamiento foto ↔ ALT. `Gallery` ya está implementado y solo
            hay que volver a llamarlo con `location.gallery` y los ALT buenos.
          */}
        </Container>
      </section>

      {/* Módulo 7 · Opiniones */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <SectionHeading
            align="center"
            eyebrow={content.reviews.eyebrow}
            title={content.reviews.title}
            description={content.reviews.text}
            className="mx-auto"
          />
          {/*
            PENDIENTE MUV: dos o tres testimonios reales anonimizados de esta
            clínica. Las cifras se citan como texto, nombrando la plataforma;
            nunca como `aggregateRating`.
          */}
        </Container>
      </section>

      {/* Módulo 8 · Cómo llegar */}
      <section id="como-llegar" className="scroll-mt-28 bg-cream-dark/50 py-16 md:py-24">
        <Container size="wide">
          <SectionHeading
            eyebrow={content.directions.eyebrow}
            title={content.directions.title}
          />
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <dl className="space-y-5">
                {content.directions.facts.map((fact) => (
                  <Reveal key={fact.label}>
                    <dt className="font-display text-base text-olive-700">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 leading-relaxed text-ink-soft">
                      {fact.value}
                    </dd>
                  </Reveal>
                ))}
              </dl>

              <Reveal delay={0.1}>
                <h3 className="mt-10 font-display text-xl text-olive-700">
                  {content.directions.hoursHeading}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-soft">
                  {content.directions.hoursText
                    ? `${content.directions.hoursText} ${content.directions.bookingNote}`
                    : content.directions.bookingNote}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-3xl border border-olive-900/10 shadow-lg shadow-olive-900/10">
                <iframe
                  title={content.directions.mapAlt}
                  src={location.mapEmbed}
                  className="h-[26rem] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Módulo 9 · Preguntas frecuentes */}
      {faqItems.length > 0 && (
        <section className="py-16 md:py-24">
          <Container size="narrow">
            <SectionHeading
              align="center"
              eyebrow={content.faqSection.eyebrow}
              title={content.faqSection.title}
            />
            <div className="mt-12">
              <FAQ items={faqItems} />
            </div>
          </Container>
        </section>
      )}

      {/* Módulo 10 · CTA */}
      <CTASection
        title={content.cta.title}
        description={content.cta.description}
      />
    </>
  );
}
