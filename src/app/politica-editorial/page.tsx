import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Política editorial",
  description:
    "Política editorial de MUV: cómo elaboramos y revisamos los contenidos de salud que publicamos, con rigor y transparencia.",
  path: "/politica-editorial",
});

const sections = [
  {
    title: "Compromiso con el rigor",
    text: "Todos los contenidos de salud de este sitio se elaboran a partir de la evidencia científica disponible y de la experiencia clínica de nuestro equipo de fisioterapeutas colegiados.",
  },
  {
    title: "Revisión profesional",
    text: "Cada artículo es revisado por un profesional sanitario antes de su publicación. Indicamos, cuando procede, la fecha de última actualización.",
  },
  {
    title: "Carácter informativo",
    text: "La información publicada tiene una finalidad divulgativa y no sustituye en ningún caso la valoración, el diagnóstico o el tratamiento de un profesional sanitario.",
  },
  {
    title: "Independencia",
    text: "Nuestros contenidos no están condicionados por intereses comerciales. Cuando exista cualquier relación relevante, se hará constar de forma transparente.",
  },
  {
    title: "Actualización y correcciones",
    text: "Revisamos periódicamente los contenidos para mantenerlos actualizados. Si detectas un error, puedes escribirnos y lo corregiremos a la mayor brevedad.",
  },
];

export default function PoliticaEditorialPage() {
  return (
    <>
      <PageHero
        size="narrow"
        eyebrow="Transparencia"
        title="Política editorial"
        description="Así elaboramos, revisamos y mantenemos los contenidos de salud que publicamos."
        crumbs={[{ label: "Política editorial", href: "/politica-editorial" }]}
      />

      <section className="pb-20 md:pb-28">
        <Container size="narrow">
          <div className="divide-y divide-olive-900/10">
            {sections.map((s) => (
              <div key={s.title} className="py-8">
                <h2 className="text-2xl text-olive-800">{s.title}</h2>
                <p className="mt-3 text-lg leading-relaxed text-ink-soft">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
