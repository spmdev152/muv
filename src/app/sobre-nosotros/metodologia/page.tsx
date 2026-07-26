import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Metodología",
  description:
    "La metodología MUV: valoración, plan personalizado, tratamiento y prevención. Así trabajamos para tu recuperación.",
  path: "/sobre-nosotros/metodologia",
});

const steps = [
  {
    n: "01",
    title: "Valoración inicial",
    text: "Dedicamos tiempo a escuchar tu caso y a explorar en profundidad. Cuando es necesario, empleamos ecografía para afinar el diagnóstico funcional.",
  },
  {
    n: "02",
    title: "Plan de tratamiento personalizado",
    text: "Diseñamos un plan a tu medida, con objetivos claros y un calendario realista. Te explicamos cada paso para que entiendas tu proceso.",
  },
  {
    n: "03",
    title: "Tratamiento activo",
    text: "Combinamos terapia manual, técnicas instrumentales (neuromodulación, diatermia) y ejercicio terapéutico supervisado, ajustando según tu evolución.",
  },
  {
    n: "04",
    title: "Prevención y alta",
    text: "Te damos las herramientas para mantener los resultados y evitar recaídas. El alta llega cuando recuperas tu actividad con seguridad.",
  },
];

export default function MetodologiaPage() {
  return (
    <>
      <PageHero
        size="default"
        eyebrow="Metodología"
        title="Un método claro, de la primera visita al alta"
        description="Cada tratamiento sigue un proceso estructurado y transparente, pensado para conseguir resultados duraderos."
        crumbs={[
          { label: "Sobre nosotros", href: "/sobre-nosotros" },
          { label: "Metodología", href: "/sobre-nosotros/metodologia" },
        ]}
      />

      <section className="py-16 md:py-24">
        <Container size="default">
          <div className="space-y-px">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div className="grid gap-6 border-t border-olive-900/10 py-10 md:grid-cols-[8rem_1fr]">
                  <span className="font-display text-5xl text-gold-500">
                    {s.n}
                  </span>
                  <div>
                    <h2 className="text-2xl text-olive-800">{s.title}</h2>
                    <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">
                      {s.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
