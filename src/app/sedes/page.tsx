import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { LocationCard } from "@/components/cards/LocationCard";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { locations } from "@/lib/locations";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Nuestras sedes en Madrid",
  description:
    "MUV cuenta con dos clínicas de fisioterapia en Madrid: El Cañaveral (Vicálvaro) y Tres Cantos. Encuentra la más cercana y pide tu cita.",
  path: "/sedes",
});

export default function SedesPage() {
  return (
    <>
      <PageHero
        eyebrow="Sedes"
        title="Encuéntranos en Madrid"
        description="Dos clínicas con el mismo compromiso: cuidar de tu movimiento con cercanía y rigor."
        crumbs={[{ label: "Sedes", href: "/sedes" }]}
      />

      <section className="pb-20 md:pb-28">
        <Container size="wide">
          <div className="grid gap-8 md:grid-cols-2">
            {locations.map((location, i) => (
              <Reveal key={location.slug} delay={i * 0.1}>
                <LocationCard location={location} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
