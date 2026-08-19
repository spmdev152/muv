import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Mdx } from "@/components/mdx/Mdx";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDoc, getSlugs } from "@/lib/content";
import { buildMetadata, articleJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return getSlugs("blog").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc("blog", slug);
  if (!doc) return {};
  return buildMetadata({
    title: doc.frontmatter.title,
    description: doc.frontmatter.description,
    path: `/blog/${slug}`,
    image: doc.frontmatter.image,
    type: "article",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getDoc("blog", slug);
  if (!doc) notFound();

  const { frontmatter, content } = doc;

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: frontmatter.title,
          description: frontmatter.description,
          date: frontmatter.date,
          author: frontmatter.author,
          image: frontmatter.image,
          path: `/blog/${slug}`,
        })}
      />

      <article className="pt-28 md:pt-32">
        <Container size="narrow" className="pb-10">
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: "Blog", href: "/blog" },
                { label: frontmatter.title, href: `/blog/${slug}` },
              ]}
            />
          </div>
          <p className="text-xs uppercase tracking-[0.18em] text-gold-700">
            {formatDate(frontmatter.date)}
            {frontmatter.author ? ` · ${frontmatter.author}` : ""}
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl">{frontmatter.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {frontmatter.description}
          </p>
        </Container>

        {frontmatter.image && (
          <Container size="default" className="pb-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] shadow-xl shadow-olive-900/15">
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                fill
                preload
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 72rem"
                className="object-cover"
              />
            </div>
          </Container>
        )}

        <Container size="narrow" className="pb-20 md:pb-28">
          <Mdx source={content} />
        </Container>
      </article>

      <CTASection />
    </>
  );
}
