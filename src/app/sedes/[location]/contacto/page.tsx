import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { MapPin, Whatsapp, Mail, Clock } from "@/components/ui/icons";
import { BookingButton } from "@/components/BookingButton";
import { locations, getLocation } from "@/lib/locations";
import { buildMetadata, clinicJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

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
    title: `Contacto · ${location.shortName}`,
    description: `Contacta con MUV ${location.shortName} en ${location.street}, ${location.city}. WhatsApp ${location.phone}.`,
    path: `/sedes/${slug}/contacto`,
  });
}

export default async function LocationContactPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  return (
    <>
      <JsonLd data={clinicJsonLd(location)} />

      <PageHero
        eyebrow={`Contacto · ${location.area}`}
        title={`Contacta con ${location.shortName}`}
        description="Pide tu cita, resuelve tus dudas o ven a conocernos."
        crumbs={[
          { label: "Sedes", href: "/sedes" },
          { label: location.shortName, href: `/sedes/${slug}` },
          { label: "Contacto", href: `/sedes/${slug}/contacto` },
        ]}
      />

      <section className="pb-20 md:pb-28">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_24rem]">
            <div>
              <h2 className="text-2xl text-olive-800">Escríbenos</h2>
              <div className="mt-8">
                <ContactForm to={location.email} />
              </div>
            </div>

            <Reveal>
              <div className="space-y-6">
                <div className="rounded-3xl border border-olive-900/10 bg-white p-7">
                  <h3 className="font-display text-xl text-olive-700">
                    {location.name}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-ink-soft">
                    <li className="flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      {location.street}, {location.postalCode} {location.city}
                    </li>
                    <li className="flex items-center gap-2">
                      <Whatsapp className="h-4 w-4 shrink-0 text-gold-600" />
                      <a
                        href={location.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-olive-700"
                      >
                        {location.phone}
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <Mail className="h-4 w-4 shrink-0 text-gold-600" />
                      <a href={`mailto:${location.email}`} className="hover:text-olive-700">
                        {location.email}
                      </a>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                      <span>
                        {location.hours.map((h) => (
                          <span key={h.days} className="block">
                            {h.days}: {h.time}
                          </span>
                        ))}
                      </span>
                    </li>
                  </ul>
                  <BookingButton size="sm" className="mt-5" />
                </div>
                <div className="overflow-hidden rounded-3xl border border-olive-900/10">
                  <iframe
                    title={`Mapa de ${location.name}`}
                    src={location.mapEmbed}
                    className="h-64 w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
