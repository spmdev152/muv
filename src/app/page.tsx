import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { HomeHero } from "@/components/sections/HomeHero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { LocationCard } from "@/components/cards/LocationCard";
import { PostCard } from "@/components/cards/PostCard";
import { FAQ, type QA } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowRight } from "@/components/ui/icons";
import { getCollection, getDoc } from "@/lib/content";
import { locations } from "@/lib/locations";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import {
  blog,
  conditions,
  cta,
  faqSection,
  faqs,
  locationsSection,
  meta,
  method,
  pillars,
  services,
  trust,
} from "@/content/home";

/**
 * Home · `/`
 *
 * Copy aprobada en `docs/contenidos/home.md` (v8). Los comentarios `Módulo N`
 * se corresponden uno a uno con los del documento.
 *
 * El módulo 8 (testimonios) no se renderiza: depende de tres testimonios reales
 * anonimizados que MUV todavía no ha facilitado, y no se inventan.
 */

export const metadata = buildMetadata({
  title: meta.title,
  rawTitle: meta.title,
  description: meta.description,
  path: "/",
  image: "/img/hero-home.webp",
});

/** La quinta respuesta lleva un enlace; el schema publica el texto plano. */
const faqItems: QA[] = faqs.map((faq) =>
  faq.question === "¿Están todos los servicios en las dos clínicas?"
    ? {
        ...faq,
        answerNode: (
          <>
            No. Cada sede tiene su propia cartera y cada servicio indica dónde se
            presta. Puede compararlas en la{" "}
            <Link
              href="/sedes"
              className="text-olive-700 underline underline-offset-4 transition-colors hover:text-gold-700"
            >
              página de sedes
            </Link>
            .
          </>
        ),
      }
    : { ...faq },
);

export default function HomePage() {
  const posts = getCollection("blog").slice(0, 3);

  return (
    <>
      <JsonLd data={faqJsonLd(faqItems)} />

      {/* Módulo 1 · HomeHero */}
      <HomeHero />

      {/* Módulo 2 · Franja de confianza */}
      <TrustStrip items={trust} />

      {/* Módulo 3 · Pilares */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow={pillars.eyebrow}
            title={pillars.title}
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {pillars.items.map((pillar, i) => (
              // `h-full` en los dos: la rejilla estira el elemento, pero la
              // tarjeta de dentro se quedaba a la altura de su texto y la de
              // «Eficientes», más corta, salía más baja que las otras dos.
              <Reveal key={pillar.title} delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col rounded-3xl border border-olive-900/10 bg-white p-8 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-olive-50 font-display text-xl text-olive-600">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-2xl text-olive-700">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-ink-soft leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Módulo 4 · Servicios destacados */}
      <section className="bg-cream-dark/50 py-20 md:py-28">
        <Container size="wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={services.eyebrow}
              title={services.title}
              description={services.description}
            />
            <Reveal>
              <Button href={services.cta.href} variant="ghost">
                {services.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.items.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.08}>
                <ServiceCard
                  href={`/servicios/${service.slug}`}
                  title={service.title}
                  excerpt={service.text}
                  availability={service.availability}
                  image={
                    getDoc("services", service.slug)?.frontmatter.image
                  }
                  imageAlt={service.imageAlt}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Módulo 5 · Dolencias y lesiones */}
      <section className="py-20 md:py-28">
        <Container size="wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow={conditions.eyebrow}
              title={conditions.title}
              description={conditions.description}
            />
            <Reveal>
              <Button href={conditions.cta.href} variant="ghost">
                {conditions.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {conditions.items.map((condition, i) => (
              <Reveal key={condition.slug} delay={(i % 4) * 0.08}>
                <ServiceCard
                  href={`/dolencias-y-lesiones/${condition.slug}`}
                  title={condition.title}
                  excerpt={condition.text}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 25vw, 19rem"
                  image={
                    getDoc("conditions", condition.slug)?.frontmatter.image
                  }
                  imageAlt={condition.imageAlt}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Módulo 6 · Metodología */}
      <section className="bg-cream-dark/50 py-20 md:py-28">
        <Container size="wide">
          {/*
            `about.webp` es vertical (1920x2560). En un contenedor apaisado se
            perdía casi la mitad de la foto y quedaba mucho más baja que la
            columna de texto. En lg la imagen ocupa el alto de la fila, así que
            las dos columnas acaban a la misma altura y el recorte es mínimo.
          */}
          <div className="grid gap-14 lg:grid-cols-2 lg:items-stretch">
            <Reveal className="lg:h-full">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl shadow-olive-900/15 sm:aspect-[4/3] lg:aspect-auto lg:h-full">
                <Image
                  src="/img/about.webp"
                  alt={method.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 37rem"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeading eyebrow={method.eyebrow} title={method.title} />
              <div className="mt-10 space-y-8">
                {method.steps.map((step, i) => (
                  <Reveal key={step.n} delay={i * 0.08}>
                    <div className="flex gap-5">
                      <span className="font-display text-2xl text-gold-600">
                        {step.n}
                      </span>
                      <div>
                        <h3 className="text-xl text-olive-700">{step.title}</h3>
                        <p className="mt-2 leading-relaxed text-ink-soft">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.3}>
                <Button
                  href={method.cta.href}
                  variant="outline"
                  className="mt-10"
                >
                  {method.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Módulo 7 · Sedes */}
      <section className="py-20 md:py-28">
        <Container size="wide">
          <SectionHeading
            align="center"
            eyebrow={locationsSection.eyebrow}
            title={locationsSection.title}
            description={locationsSection.description}
          />
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {locations.map((location, i) => {
              const card =
                locationsSection.cards[
                  location.slug as keyof typeof locationsSection.cards
                ];
              return (
                <Reveal key={location.slug} delay={i * 0.1}>
                  <LocationCard
                    location={location}
                    blurb={card?.blurb}
                    address={card?.address}
                    hours={card?.hours}
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

      {/*
        Módulo 8 · Testimonios — PENDIENTE MUV.
        Espera a tres testimonios reales anonimizados. No se inventan, así que
        el módulo no se maqueta. Ver `src/content/home.ts`.
      */}

      {/* Módulo 9 · Preguntas frecuentes */}
      <section className="bg-cream-dark/50 py-20 md:py-28">
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

      {/* Módulo 10 · Blog */}
      {posts.length > 0 && (
        <section className="py-20 md:py-28">
          <Container size="wide">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow={blog.eyebrow}
                title={blog.title}
                description={
                  <>
                    {blog.description.before}
                    <Link
                      href={blog.description.href}
                      className="text-olive-700 underline underline-offset-4 transition-colors hover:text-gold-700"
                    >
                      {blog.description.link}
                    </Link>
                    {blog.description.after}
                  </>
                }
              />
              <Reveal>
                <Button href={blog.cta.href} variant="ghost">
                  {blog.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Reveal>
            </div>
            <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 0.08} as="article">
                  <PostCard
                    href={`/blog/${post.slug}`}
                    title={post.frontmatter.title}
                    date={post.frontmatter.date}
                    image={post.frontmatter.image}
                  />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Módulo 11 · CTASection */}
      <CTASection title={cta.title} description={cta.description} />
    </>
  );
}
