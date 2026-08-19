import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight } from "@/components/ui/icons";
import { getCollection } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = buildMetadata({
  title: "Blog de fisioterapia y salud",
  description:
    "Consejos, novedades y divulgación sobre fisioterapia, ejercicio terapéutico, suelo pélvico y salud del movimiento por el equipo de MUV.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getCollection("blog");

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Salud en movimiento"
        description="Divulgación rigurosa y consejos prácticos del equipo de MUV."
        crumbs={[{ label: "Blog", href: "/blog" }]}
      />

      <section className="pb-20 md:pb-28">
        <Container size="wide">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((doc, i) => (
              <Reveal key={doc.slug} delay={(i % 3) * 0.08} as="article">
                <Link href={`/blog/${doc.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                    {doc.frontmatter.image && (
                      <Image
                        src={doc.frontmatter.image}
                        alt={doc.frontmatter.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25rem"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <p className="mt-5 text-xs uppercase tracking-[0.18em] text-gold-700">
                    {formatDate(doc.frontmatter.date)}
                  </p>
                  <h2 className="mt-2 text-xl text-olive-800 transition-colors group-hover:text-gold-700">
                    {doc.frontmatter.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {doc.frontmatter.excerpt ?? doc.frontmatter.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-olive-600">
                    Leer artículo
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
