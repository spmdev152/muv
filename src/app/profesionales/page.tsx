import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { ArrowRight } from "@/components/ui/icons";
import { getCollection } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Nuestro equipo de fisioterapeutas",
  description:
    "Conoce al equipo de fisioterapeutas de MUV: profesionales especializados en fisioterapia, suelo pélvico, deportiva y pediátrica en Madrid.",
  path: "/profesionales",
});

export default function ProfesionalesPage() {
  const team = getCollection("professionals");

  return (
    <>
      <PageHero
        eyebrow="Profesionales"
        title="Las personas que cuidan de ti"
        description="Un equipo especializado, en formación continua y comprometido con tu recuperación."
        crumbs={[{ label: "Profesionales", href: "/profesionales" }]}
      />

      <section className="pb-20 md:pb-28">
        <Container size="wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((doc, i) => (
              <Reveal key={doc.slug} delay={(i % 3) * 0.08}>
                <Link
                  href={`/profesionales/${doc.slug}`}
                  className="group block overflow-hidden rounded-3xl border border-olive-900/10 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-olive-900/10"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {doc.frontmatter.image && (
                      <Image
                        src={doc.frontmatter.image}
                        alt={doc.frontmatter.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-olive-900/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl text-olive-800">
                      {doc.frontmatter.title}
                    </h2>
                    <p className="mt-1 text-sm text-gold-700">
                      {doc.frontmatter.role}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-olive-600">
                      Ver perfil
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
