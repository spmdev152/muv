import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { Tabs } from "@/components/ui/Tabs";
import { getDoc, type Doc } from "@/lib/content";
import { locations } from "@/lib/locations";
import { buildMetadata } from "@/lib/seo";
import { availability } from "@/content/sedes";

export const metadata: Metadata = buildMetadata({
  title: "Servicios de fisioterapia",
  description:
    "Descubre todos los servicios de MUV: fisioterapia, fisioterapia deportiva, suelo pélvico, pilates terapéutico, neuromodulación y mucho más en Madrid.",
  path: "/servicios",
});

/**
 * Índice del catálogo con una pestaña por clínica, como `/profesionales`.
 *
 * El reparto por sede es la tabla de disponibilidad aprobada de `/sedes`
 * (`availability`): cada pestaña lista las filas que esa clínica presta, en
 * su orden. La tarjeta toma imagen y extracto del `.mdx` de cada servicio.
 *
 * Provisional (#48): un servicio que prestan las dos sedes aparece en las dos
 * pestañas y enlaza a la misma página `/servicios/<slug>`. Cómo tratar esos
 * servicios compartidos se decide en #48; rutas, canonicals y redirecciones de
 * `/servicios/*` no cambian.
 */
export default function ServiciosPage() {
  const tabs = locations.map((location) => {
    const column = (availability.columns as readonly string[]).indexOf(
      location.shortName,
    );
    const rows = availability.rows.filter((row) => row.at[column]);
    return {
      id: location.slug,
      label: location.shortName,
      content: <ServiceGrid rows={rows} />,
    };
  });

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
          <Tabs tabs={tabs} label={availability.eyebrow} />
        </Container>
      </section>

      <CTASection />
    </>
  );
}

/** El `.mdx` de una fila: un servicio o, en el caso de ATM, una dolencia. */
function docFor(href: string): Doc | null {
  const [, section, ...slug] = href.split("/");
  return getDoc(
    section === "dolencias-y-lesiones" ? "conditions" : "services",
    slug.join("/"),
  );
}

function ServiceGrid({
  rows,
}: {
  rows: readonly (typeof availability.rows)[number][];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((row, i) => {
        const doc = docFor(row.href);
        return (
          <Reveal key={row.href} delay={(i % 3) * 0.06}>
            <ServiceCard
              href={row.href}
              title={row.label}
              excerpt={
                doc?.frontmatter.excerpt ?? doc?.frontmatter.description ?? ""
              }
              image={doc?.frontmatter.image}
              className="h-full"
            />
          </Reveal>
        );
      })}
    </div>
  );
}
