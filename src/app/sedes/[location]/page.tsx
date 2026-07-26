import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { BookingButton } from "@/components/BookingButton";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { MapPin, Whatsapp, Mail, Clock, ArrowRight } from "@/components/ui/icons";
import { locations, getLocation } from "@/lib/locations";
import { getCollection, getDoc } from "@/lib/content";
import { buildMetadata, clinicJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return locations.map((l) => ({ location: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location: slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};
  return buildMetadata({
    title: `Fisioterapia en ${location.shortName}`,
    description: `${location.name}: clínica de fisioterapia en ${location.street}, ${location.city}. ${location.blurb}`,
    path: `/sedes/${slug}`,
    image: location.heroImage,
  });
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const services = location.priorityServices
    .map((s) => getDoc("services", s))
    .filter((d) => d !== null);

  // Professionals attending at this location.
  const team = getCollection("professionals").filter((p) =>
    p.frontmatter.locations?.includes(slug),
  );

  return (
    <>
      <JsonLd data={clinicJsonLd(location)} />

      <PageHero
        eyebrow={`Sede · ${location.area}`}
        title={`Fisioterapia en ${location.shortName}`}
        description={location.blurb}
        image={location.heroImage}
        crumbs={[
          { label: "Sedes", href: "/sedes" },
          { label: location.shortName, href: `/sedes/${slug}` },
        ]}
      />

      {/* Contact details + map */}
      <section className="py-16 md:py-20">
        <Container size="wide">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Cómo llegar"
                title={`Tu clínica en ${location.area}`}
              />
              <ul className="mt-8 space-y-5 text-ink-soft">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                  <span>
                    {location.street}
                    <br />
                    {location.postalCode} {location.city}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Whatsapp className="h-5 w-5 shrink-0 text-gold-600" />
                  <a
                    href={location.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-olive-700"
                  >
                    {location.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-gold-600" />
                  <a href={`mailto:${location.email}`} className="hover:text-olive-700">
                    {location.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                  <span>
                    {location.hours.map((h) => (
                      <span key={h.days} className="block">
                        <strong className="font-medium text-olive-800">
                          {h.days}:
                        </strong>{" "}
                        {h.time}
                      </span>
                    ))}
                  </span>
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <BookingButton size="lg" />
                <Button href={`/sedes/${slug}/contacto`} variant="outline" size="lg">
                  Contacto
                </Button>
              </div>
            </div>

            <Reveal>
              <div className="overflow-hidden rounded-3xl border border-olive-900/10 shadow-lg shadow-olive-900/10">
                <iframe
                  title={`Mapa de ${location.name}`}
                  src={location.mapEmbed}
                  className="h-[22rem] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Priority services */}
      <section className="bg-cream-dark/50 py-16 md:py-24">
        <Container size="wide">
          <SectionHeading
            eyebrow="Servicios destacados"
            title={`Tratamientos en ${location.shortName}`}
            description="Estos son algunos de los servicios más demandados en esta sede. Consulta el catálogo completo."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((doc, i) => (
              <Reveal key={doc!.slug} delay={(i % 4) * 0.06}>
                <ServiceCard
                  href={`/servicios/${doc!.slug}`}
                  title={doc!.frontmatter.title}
                  excerpt={doc!.frontmatter.excerpt ?? doc!.frontmatter.description}
                  image={doc!.frontmatter.image}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Button href="/servicios" variant="ghost">
              Ver todos los servicios
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </section>

      {/* Location gallery */}
      {location.gallery.length > 0 && (
        <section className="py-16 md:py-24">
          <Container size="wide">
            <SectionHeading
              eyebrow="El espacio"
              title={`Así es MUV ${location.shortName}`}
              description="Un entorno cuidado, equipado con la mejor tecnología y pensado para tu recuperación."
            />
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
              {location.gallery.map((src, i) => (
                <Reveal key={src} delay={(i % 3) * 0.06}>
                  <div
                    className={`relative overflow-hidden rounded-3xl ${
                      i === 0 ? "col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto md:h-full" : "aspect-square"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Instalaciones de MUV ${location.shortName}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Location team */}
      {team.length > 0 && (
        <section className="py-16 md:py-24">
          <Container size="wide">
            <SectionHeading
              eyebrow="Equipo"
              title={`Quién te atiende en ${location.shortName}`}
            />
            <div className="mt-10 flex flex-wrap gap-4">
              {team.map((p) => (
                <Link
                  key={p.slug}
                  href={`/profesionales/${p.slug}`}
                  className="group flex items-center gap-3 rounded-full border border-olive-900/10 bg-white py-2 pl-2 pr-5 transition-colors hover:border-olive-500/40"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-olive-500 font-display text-sm text-cream">
                    {p.frontmatter.title.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-olive-800">
                      {p.frontmatter.title}
                    </span>
                    <span className="block text-xs text-ink-soft">
                      {p.frontmatter.role}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection
        title={`Pide tu cita en ${location.shortName}`}
        description="Reserva online o escríbenos por WhatsApp. Te esperamos para empezar tu tratamiento."
      />
    </>
  );
}
