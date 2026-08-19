import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Mdx } from "@/components/mdx/Mdx";
import { BookingAside } from "@/components/sections/BookingAside";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDoc, getSlugs } from "@/lib/content";
import { getLocation } from "@/lib/locations";
import { buildMetadata, personJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return getSlugs("professionals").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc("professionals", slug);
  if (!doc) return {};
  return buildMetadata({
    title: `${doc.frontmatter.title} · ${doc.frontmatter.role ?? "Fisioterapeuta"}`,
    description: doc.frontmatter.description,
    path: `/profesionales/${slug}`,
    image: doc.frontmatter.image,
  });
}

export default async function ProfesionalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc("professionals", slug);
  if (!doc) notFound();

  const { frontmatter, content } = doc;
  const professionalLocations = (frontmatter.locations ?? [])
    .map(getLocation)
    .filter((s) => s !== undefined);

  return (
    <>
      <JsonLd
        data={personJsonLd({
          name: frontmatter.title,
          role: frontmatter.role,
          description: frontmatter.description,
          image: frontmatter.image,
          path: `/profesionales/${slug}`,
        })}
      />

      <section className="pt-28 md:pt-32">
        <Container size="wide" className="pb-16 md:pb-24">
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: "Profesionales", href: "/profesionales" },
                { label: frontmatter.title, href: `/profesionales/${slug}` },
              ]}
            />
          </div>

          <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
            <div>
              <div className="grid gap-8 sm:grid-cols-[16rem_1fr] sm:items-end">
                {frontmatter.image && (
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lg shadow-olive-900/15">
                    <Image
                      src={frontmatter.image}
                      alt={frontmatter.title}
                      fill
                      loading="eager"
                      fetchPriority="high"
                      sizes="(max-width: 640px) 100vw, 16rem"
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="eyebrow mb-3">{frontmatter.role}</p>
                  <h1 className="text-4xl sm:text-5xl">{frontmatter.title}</h1>
                  {frontmatter.credentials && (
                    <p className="mt-4 text-sm text-ink-soft">
                      {frontmatter.credentials}
                    </p>
                  )}
                  {professionalLocations.length > 0 && (
                    <p className="mt-3 text-sm text-ink-soft">
                      Atiende en{" "}
                      {professionalLocations.map((s, i) => (
                        <span key={s!.slug}>
                          <Link
                            href={`/sedes/${s!.slug}`}
                            className="font-medium text-olive-700 underline decoration-gold-400 underline-offset-4"
                          >
                            {s!.shortName}
                          </Link>
                          {i < professionalLocations.length - 1 ? " y " : ""}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </div>

              <article className="mt-12 max-w-2xl">
                <Mdx source={content} />
              </article>
            </div>
            <BookingAside />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
