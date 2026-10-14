import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RichText, plainText } from "@/components/ui/RichText";
import { PageHero } from "@/components/sections/PageHero";
import { FAQ, type QA } from "@/components/sections/FAQ";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { BookingButton } from "@/components/BookingButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowRight, MapPin } from "@/components/ui/icons";
import { getLocation } from "@/lib/locations";
import { buildMetadata, faqJsonLd, sedeServiceJsonLd } from "@/lib/seo";
import { cn } from "@/lib/cn";
import type { ServiceBlock } from "@/content/sede-service-types";
import {
  getSedeService,
  sedeServicePath,
  sedeServices,
} from "@/content/sede-services";

/**
 * `/sedes/<sede>/<servicio>` — una plantilla para las ocho páginas de servicio
 * por sede (#29).
 *
 * El texto sale literal de los PDF de maquetación de la fase 2
 * (`docs/contenidos/MUV-WEB-<SEDE>-*.pdf`). Los ocho documentos tienen los
 * mismos diez módulos, así que la maquetación es común y solo cambia el
 * contenido. Encabezados: 1 H1 y 9 H2 (módulos 2 a 10); los H3 son los de cada
 * documento y no llevan municipio.
 */

// Solo existen las ocho rutas declaradas: cualquier otra es un 404.
export const dynamicParams = false;

// Los dos segmentos salen de aquí: el `generateStaticParams` de la sede está en
// su `page`, no en un layout, así que no los hereda.
export function generateStaticParams() {
  return Object.values(sedeServices)
    .flat()
    .map((s) => ({ location: s.location, service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string; service: string }>;
}): Promise<Metadata> {
  const { location, service } = await params;
  const content = getSedeService(location, service);
  if (!content) return {};

  return buildMetadata({
    title: content.meta.title,
    rawTitle: content.meta.title,
    description: content.meta.description,
    path: sedeServicePath(content),
    image: getLocation(location)?.heroImage,
  });
}

function Blocks({ blocks }: { blocks: ServiceBlock[] }) {
  return blocks.map((block, i) => {
    if (block.type === "p") {
      return (
        <p key={i} className="mt-3 leading-relaxed text-ink-soft first:mt-0">
          <RichText text={block.text} />
        </p>
      );
    }
    if (block.type === "list") {
      return (
        <ul
          key={i}
          className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-ink-soft marker:text-gold-600 first:mt-0"
        >
          {block.items.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div
        key={i}
        className="mt-4 overflow-x-auto rounded-2xl border border-olive-900/10 first:mt-0"
      >
        <table className="w-full text-left text-sm">
          <thead className="bg-olive-50 text-olive-800">
            <tr>
              {block.head.map((cell) => (
                <th key={cell} scope="col" className="px-4 py-3 font-semibold">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-olive-900/10">
            {block.rows.map(([first, second]) => (
              <tr key={first} className="align-top">
                <th
                  scope="row"
                  className="px-4 py-3 font-medium text-olive-800"
                >
                  <RichText text={first} />
                </th>
                <td className="px-4 py-3 leading-relaxed text-ink-soft">
                  <RichText text={second} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  });
}

export default async function SedeServicePage({
  params,
}: {
  params: Promise<{ location: string; service: string }>;
}) {
  const { location: locationSlug, service } = await params;
  const location = getLocation(locationSlug);
  const content = getSedeService(locationSlug, service);
  if (!location || !content) notFound();

  const path = sedeServicePath(content);
  // El schema publica la respuesta en texto plano; en pantalla, con su enlace.
  const faqItems: QA[] = content.faq.items.map((item) => ({
    question: item.question,
    answer: plainText(item.answer),
    answerNode: <RichText text={item.answer} />,
  }));

  return (
    <>
      <JsonLd
        data={sedeServiceJsonLd({
          name: content.label,
          description: content.meta.description,
          path,
          location,
        })}
      />
      <JsonLd data={faqJsonLd(faqItems)} />

      {/* Módulo 1 · Hero */}
      <PageHero
        title={content.hero.title}
        titleSize="compact"
        description={plainText(content.hero.lede)}
        image={location.heroImage}
        crumbs={[
          { label: "Sedes", href: "/sedes" },
          { label: location.shortName, href: `/sedes/${location.slug}` },
          { label: content.label, href: path },
        ]}
      />

      {/* «Lo esencial» y botones del hero */}
      <section className="py-12 md:py-16">
        <Container size="wide">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <Reveal>
              <div className="rounded-3xl border border-olive-900/10 bg-white p-7">
                <p className="eyebrow mb-4">Lo esencial</p>
                <ul className="list-disc space-y-2 pl-5 leading-relaxed text-ink-soft marker:text-gold-600">
                  {content.hero.essentials.map((item) => (
                    <li key={item}>
                      <RichText text={item} />
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex flex-wrap items-center gap-4">
                <BookingButton size="lg" bookingUrl={location.bookingUrl} />
                <Button
                  href={`#${content.contact.id}`}
                  variant="outline"
                  size="lg"
                >
                  Dónde estamos
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Módulos 2 a 8 */}
      {content.sections.map((section, n) => {
        const hasTable = (blocks: ServiceBlock[]) =>
          blocks.some((b) => b.type === "table");
        return (
          <section
            key={section.id}
            id={section.id}
            className={cn(
              "scroll-mt-28 py-16 md:py-24",
              n % 2 === 0 && "bg-cream-dark/50",
            )}
          >
            <Container size="wide">
              <SectionHeading eyebrow={section.eyebrow} title={section.title} />
              {section.intro.length > 0 && (
                <Reveal delay={0.1}>
                  <div className="mt-5 max-w-3xl text-lg">
                    <Blocks blocks={section.intro} />
                  </div>
                </Reveal>
              )}
              {section.subsections.length > 0 && (
                <div className="mt-12 grid gap-8 md:grid-cols-2">
                  {section.subsections.map((sub, i) => (
                    <Reveal
                      key={sub.title}
                      delay={(i % 2) * 0.08}
                      className={cn(hasTable(sub.blocks) && "md:col-span-2")}
                    >
                      <article className="h-full rounded-3xl border border-olive-900/10 bg-white p-7">
                        <h3 className="font-display text-xl text-olive-700">
                          {sub.title}
                        </h3>
                        <div className="mt-3">
                          <Blocks blocks={sub.blocks} />
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              )}
            </Container>
          </section>
        );
      })}

      {/* Módulo 9 · Preguntas frecuentes */}
      <section id={content.faq.id} className="scroll-mt-28 py-16 md:py-24">
        <Container size="narrow">
          <SectionHeading
            align="center"
            eyebrow={content.faq.eyebrow}
            title={content.faq.title}
          />
          <div className="mt-12">
            <FAQ items={faqItems} />
          </div>
        </Container>
      </section>

      {/* Módulo 10 · Dónde estamos y cuándo abrimos */}
      <section
        id={content.contact.id}
        className="scroll-mt-28 bg-cream-dark/50 py-16 md:py-24"
      >
        <Container size="wide">
          <SectionHeading title={content.contact.title} />
          <Reveal delay={0.1}>
            <div className="mt-10 max-w-3xl space-y-3 leading-relaxed text-ink-soft">
              {content.contact.details.map((line, i) => (
                <p key={line} className="flex items-start gap-2">
                  {i === 0 && (
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-600" />
                  )}
                  <span>
                    <RichText text={line} />
                  </span>
                </p>
              ))}
              <p>
                <RichText text={content.contact.directions} />
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <BookingButton
              label={content.contact.cta}
              bookingUrl={location.bookingUrl}
              size="lg"
              className="mt-8"
            />
          </Reveal>
        </Container>
      </section>

      {/* Fuentes: al pie y en letra pequeña */}
      <section className="py-10">
        <Container size="wide">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
            Fuentes
          </p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-xs leading-relaxed text-ink-soft">
            {content.sources.map((source) => (
              <li key={source}>
                <RichText text={source.replace(/^\d+\.\s*/, "")} />
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
