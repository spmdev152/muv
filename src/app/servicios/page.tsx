import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { getCollection } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Servicios de fisioterapia",
  description:
    "Descubre todos los servicios de MUV: fisioterapia, fisioterapia deportiva, suelo pélvico, pilates terapéutico, neuromodulación y mucho más en Madrid.",
  path: "/servicios",
});

export default function ServiciosPage() {
  const services = getCollection("services");

  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Tratamientos pensados para cada necesidad"
        description="Un equipo especializado y tecnología de vanguardia al servicio de tu recuperación y tu bienestar."
        crumbs={[{ label: "Servicios", href: "/servicios" }]}
      />

      <section className="pb-20 md:pb-28">
        <Container size="wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((doc, i) => (
              <Reveal key={doc.slug} delay={(i % 3) * 0.06}>
                <ServiceCard
                  href={`/servicios/${doc.slug}`}
                  title={doc.frontmatter.title}
                  excerpt={doc.frontmatter.excerpt ?? doc.frontmatter.description}
                  image={doc.frontmatter.image}
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
