import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Mdx } from "@/components/mdx/Mdx";
import { BookingAside } from "@/components/sections/BookingAside";
import { FAQ } from "@/components/sections/FAQ";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowRight } from "@/components/ui/icons";
import { getCollection, getDoc } from "@/lib/content";
import { buildMetadata, serviceJsonLd, faqJsonLd } from "@/lib/seo";

const NESTED = [
  ["entrenamiento-terapeutico", "individual"],
  ["entrenamiento-terapeutico", "grupal"],
];

export function generateStaticParams() {
  const top = getCollection("services").map((d) => ({ slug: [d.slug] }));
  const nested = NESTED.map((slug) => ({ slug }));
  return [...top, ...nested];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc("services", slug.join("/"));
  if (!doc) return {};
  return buildMetadata({
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    path: `/servicios/${slug.join("/")}`,
    image: doc.frontmatter.image,
  });
}

export default async function ServicioPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = slug.join("/");
  const doc = getDoc("services", path);
  if (!doc) notFound();

  const { frontmatter, content } = doc;
  const faqs = frontmatter.faqs ?? [];

  // Related services (other catalog entries, max. 3).
  const related = getCollection("services")
    .filter((d) => d.slug !== doc.slug && !d.frontmatter.parent)
    .slice(0, 3);

  const crumbs = [
    { label: "Servicios", href: "/servicios" },
    ...(slug.length > 1
      ? [{ label: "Entrenamiento terapéutico", href: "/servicios/entrenamiento-terapeutico" }]
      : []),
    { label: frontmatter.title, href: `/servicios/${path}` },
  ];

  return (
    <>
      <PageHero
        eyebrow="Servicio"
        title={frontmatter.title}
        description={frontmatter.description}
        image={frontmatter.image}
        crumbs={crumbs}
      />

      <JsonLd
        data={serviceJsonLd({
          name: frontmatter.title,
          description: frontmatter.description,
          path: `/servicios/${path}`,
        })}
      />
      {faqs.length > 0 && <JsonLd data={faqJsonLd(faqs)} />}

      <section className="py-16 md:py-24">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
            <article className="max-w-2xl">
              <Mdx source={content} />
            </article>
            <BookingAside />
          </div>
        </Container>
      </section>

      {faqs.length > 0 && (
        <section className="pb-20 md:pb-24">
          <Container size="narrow">
            <SectionHeading
              eyebrow="Preguntas frecuentes"
              title="Sobre este servicio"
            />
            <div className="mt-10">
              <FAQ items={faqs} />
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-olive-900/10 py-16 md:py-20">
        <Container size="wide">
          <h2 className="text-2xl text-olive-800">Otros servicios</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {related.map((d) => (
              <Link
                key={d.slug}
                href={`/servicios/${d.slug}`}
                className="group flex items-center justify-between rounded-2xl border border-olive-900/10 bg-white p-5 transition-colors hover:border-olive-500/40"
              >
                <span className="font-medium text-olive-700">
                  {d.frontmatter.title}
                </span>
                <ArrowRight className="h-4 w-4 text-gold-600 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
