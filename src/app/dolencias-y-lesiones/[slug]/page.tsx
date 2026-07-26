import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Mdx } from "@/components/mdx/Mdx";
import { BookingAside } from "@/components/sections/BookingAside";
import { FAQ } from "@/components/sections/FAQ";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDoc, getSlugs } from "@/lib/content";
import { buildMetadata, serviceJsonLd, faqJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return getSlugs("conditions").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc("conditions", slug);
  if (!doc) return {};
  return buildMetadata({
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    path: `/dolencias-y-lesiones/${slug}`,
    image: doc.frontmatter.image,
  });
}

export default async function DolenciaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc("conditions", slug);
  if (!doc) notFound();

  const { frontmatter, content } = doc;
  const faqs = frontmatter.faqs ?? [];

  return (
    <>
      <PageHero
        eyebrow="Dolencias y lesiones"
        title={frontmatter.title}
        description={frontmatter.description}
        image={frontmatter.image}
        crumbs={[
          { label: "Dolencias y lesiones", href: "/dolencias-y-lesiones" },
          { label: frontmatter.title, href: `/dolencias-y-lesiones/${slug}` },
        ]}
      />

      <JsonLd
        data={serviceJsonLd({
          name: frontmatter.title,
          description: frontmatter.description,
          path: `/dolencias-y-lesiones/${slug}`,
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
            <SectionHeading eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas" />
            <div className="mt-10">
              <FAQ items={faqs} />
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
