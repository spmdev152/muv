import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { HomeHero } from "@/components/sections/HomeHero";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { LocationCard } from "@/components/cards/LocationCard";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { ArrowRight } from "@/components/ui/icons";
import { getFeatured } from "@/lib/content";
import { locations } from "@/lib/locations";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: site.name,
  description: site.description,
  path: "/",
  image: "/img/hero-home.webp",
});

const pillars = [
  {
    title: "Eficaces",
    text: "Vamos al origen del problema con un diagnóstico riguroso y tratamientos basados en la evidencia.",
  },
  {
    title: "Eficientes",
    text: "Tecnología de vanguardia y técnicas precisas para que tu recuperación sea lo más rápida posible.",
  },
  {
    title: "Empáticos",
    text: "Un trato cercano y humano. Te escuchamos y te acompañamos en cada paso del proceso.",
  },
];

const method = [
  { n: "01", title: "Valoración", text: "Escuchamos tu caso y exploramos en profundidad, con ecografía cuando es necesario." },
  { n: "02", title: "Plan personalizado", text: "Diseñamos un tratamiento a tu medida, con objetivos claros y revisables." },
  { n: "03", title: "Tratamiento", text: "Combinamos terapia manual, tecnología y ejercicio terapéutico supervisado." },
  { n: "04", title: "Prevención", text: "Te damos herramientas para evitar recaídas y mantener tus logros." },
];

const testimonials = [
  { quote: "Llegué con un dolor de hombro que arrastraba meses. En pocas semanas volví a entrenar sin molestias.", author: "Javier M.", detail: "Paciente · El Cañaveral" },
  { quote: "El trato durante mi embarazo y el postparto fue excepcional. Me sentí cuidada en todo momento.", author: "Lucía R.", detail: "Paciente · Tres Cantos" },
  { quote: "Profesionales de verdad. Te explican todo y notas que les importa tu recuperación.", author: "Andrés P.", detail: "Paciente · El Cañaveral" },
];

const faqs = [
  { question: "¿Necesito una derivación médica para pedir cita?", answer: "No es necesaria. Puedes solicitar cita directamente y nuestro equipo realizará una valoración inicial completa." },
  { question: "¿Cuánto dura la primera sesión?", answer: "La valoración inicial dura aproximadamente 50 minutos, tiempo suficiente para explorar tu caso y diseñar un plan de tratamiento." },
  { question: "¿Tenéis cita los sábados?", answer: "Sí, ambas sedes abren los sábados de 10:00 a 14:00, además del horario de lunes a viernes." },
  { question: "¿Cómo reservo una cita?", answer: "Puedes reservar online a través de Doctoralia en la sede que prefieras, o escribiéndonos por WhatsApp." },
];

export default function HomePage() {
  const featured = getFeatured("services", 6);

  return (
    <>
      <HomeHero />

      {/* Pillars */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Nuestra forma de cuidarte"
            title="Una fisioterapia que pone a la persona en el centro"
          />
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="rounded-3xl border border-olive-900/10 bg-white p-8 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-olive-50 font-display text-xl text-olive-600">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-2xl text-olive-700">{p.title}</h3>
                  <p className="mt-3 text-ink-soft leading-relaxed">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured services */}
      <section className="bg-cream-dark/50 py-20 md:py-28">
        <Container size="wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Servicios"
              title="Especialistas en cada etapa de tu recuperación"
              description="Desde la fisioterapia avanzada, el Pilates y el entrenamiento funcional hasta la salud de la mujer y la pediatría, contamos con un equipo especializado para cada necesidad."
            />
            <Reveal>
              <Button href="/servicios" variant="ghost">
                Ver todos los servicios
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((doc, i) => (
              <Reveal key={doc.slug} delay={(i % 3) * 0.08}>
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

      {/* Methodology */}
      <section className="py-20 md:py-28">
        <Container size="wide">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-xl shadow-olive-900/15">
                <Image
                  src="/img/about.webp"
                  alt="Equipo de MUV trabajando en la clínica"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeading
                eyebrow="Metodología MUV"
                title="Un método claro, de la primera visita al alta"
              />
              <div className="mt-10 space-y-8">
                {method.map((m, i) => (
                  <Reveal key={m.n} delay={i * 0.08}>
                    <div className="flex gap-5">
                      <span className="font-display text-2xl text-gold-600">
                        {m.n}
                      </span>
                      <div>
                        <h3 className="text-xl text-olive-700">{m.title}</h3>
                        <p className="mt-1 text-ink-soft">{m.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.3}>
                <Button href="/sobre-nosotros/metodologia" variant="outline" className="mt-10">
                  Conoce nuestra metodología
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Locations */}
      <section className="bg-cream-dark/50 py-20 md:py-28">
        <Container size="wide">
          <SectionHeading
            align="center"
            eyebrow="Sedes"
            title="Dos clínicas, la misma forma de cuidarte"
            description="Encuéntranos en El Cañaveral (Vicálvaro) y en Tres Cantos."
          />
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {locations.map((location, i) => (
              <Reveal key={location.slug} delay={i * 0.1}>
                <LocationCard location={location} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28">
        <Container size="wide">
          <SectionHeading
            align="center"
            eyebrow="Testimonios"
            title="Lo que dicen nuestros pacientes"
          />
          <div className="mt-14">
            <Testimonials items={testimonials} />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="pb-20 md:pb-28">
        <Container size="narrow">
          <SectionHeading
            align="center"
            eyebrow="Preguntas frecuentes"
            title="Resolvemos tus dudas"
          />
          <div className="mt-12">
            <FAQ items={faqs} />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
