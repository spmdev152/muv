import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { getCollection } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Dolencias y lesiones",
  description:
    "Tratamos las dolencias y lesiones más frecuentes: ATM, dolor de espalda, lesión de rodilla y lesión de hombro. Descubre cómo podemos ayudarte en MUV.",
  path: "/dolencias-y-lesiones",
});

export default function DolenciasPage() {
  const conditions = getCollection("conditions");

  return (
    <>
      <PageHero
        eyebrow="Dolencias y lesiones"
        title="¿Qué te ocurre? Te ayudamos a resolverlo"
        description="Identificamos el origen de tu dolor para tratarlo de forma eficaz y prevenir recaídas."
        crumbs={[{ label: "Dolencias y lesiones", href: "/dolencias-y-lesiones" }]}
      />

      <section className="pb-20 md:pb-28">
        <Container size="wide">
          <div className="grid gap-6 sm:grid-cols-2">
            {conditions.map((doc, i) => (
              <Reveal key={doc.slug} delay={(i % 2) * 0.08}>
                <ServiceCard
                  href={`/dolencias-y-lesiones/${doc.slug}`}
                  title={doc.frontmatter.title}
                  excerpt={doc.frontmatter.excerpt ?? doc.frontmatter.description}
                  image={doc.frontmatter.image}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 37rem"
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
