import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";
import { ArrowRight } from "@/components/ui/icons";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Sobre nosotros",
  description:
    "Conoce MUV: nuestra filosofía, nuestros valores y la forma en que entendemos la fisioterapia. Eficaces, eficientes y empáticos.",
  path: "/sobre-nosotros",
});

const values = [
  { title: "Rigor clínico", text: "Tratamientos basados en la evidencia y formación continua del equipo." },
  { title: "Trato humano", text: "Escuchamos y acompañamos. Cada persona y cada caso son únicos." },
  { title: "Tecnología", text: "Ecografía, neuromodulación y diatermia al servicio de tu recuperación." },
  { title: "Resultados", text: "Objetivos claros, revisables y orientados a tu vuelta a la actividad." },
];

export default function SobreNosotrosPage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre nosotros"
        title="Fisioterapia con propósito"
        description="Nacimos para ofrecer una fisioterapia diferente: rigurosa, cercana y centrada en cada persona."
        crumbs={[{ label: "Sobre nosotros", href: "/sobre-nosotros" }]}
      />

      <section className="py-16 md:py-24">
        <Container size="wide">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl shadow-olive-900/15">
                <Image
                  src="/img/about.webp"
                  alt="Interior de la clínica MUV"
                  fill
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 37rem"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="Nuestra historia"
                title="Un proyecto que pone a la persona en el centro"
              />
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
                <p>
                  En MUV creemos que la fisioterapia va mucho más allá de tratar
                  un síntoma. Nuestro objetivo es entender qué te ocurre, por
                  qué te ocurre y acompañarte hasta que recuperes tu calidad de
                  vida.
                </p>
                <p>
                  Combinamos un diagnóstico riguroso, tecnología de vanguardia y
                  un trato cercano. Eficaces, eficientes y, sobre todo,
                  empáticos: esa es nuestra forma de cuidarte en nuestras dos
                  sedes de Madrid.
                </p>
              </div>
              <Button href="/sobre-nosotros/metodologia" className="mt-8">
                Descubre nuestra metodología
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-cream-dark/50 py-16 md:py-24">
        <Container size="wide">
          <SectionHeading align="center" eyebrow="Valores" title="Lo que nos mueve" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 0.08}>
                <div className="h-full rounded-3xl border border-olive-900/10 bg-white p-7">
                  <span className="rule-gold mb-5 block" />
                  <h3 className="text-xl text-olive-700">{v.title}</h3>
                  <p className="mt-2 text-ink-soft">{v.text}</p>
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
