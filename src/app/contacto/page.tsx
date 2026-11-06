import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { MapPin, Whatsapp, Mail, Clock } from "@/components/ui/icons";
import { BookingButton } from "@/components/BookingButton";
import { hoursLine, locations, whatsappUrl } from "@/lib/locations";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  description:
    "Contacte con MUV. Pida su cita en El Cañaveral o Tres Cantos, llámenos o escríbanos. Estaremos encantados de ayudarle.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Hablemos"
        description="¿Tiene dudas o quiere pedir cita? Escríbanos por WhatsApp o reserve online en la sede que prefiera."
        crumbs={[{ label: "Contacto", href: "/contacto" }]}
      />

      <section className="pb-20 md:pb-28">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_24rem]">
            <div>
              <h2 className="text-2xl text-olive-800">Envíenos un mensaje</h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <Reveal>
              <div className="space-y-6">
                {locations.map((location) => {
                  const whatsapp = whatsappUrl(location);
                  return (
                    <div
                      key={location.slug}
                      className="rounded-3xl border border-olive-900/10 bg-white p-7"
                    >
                      <h3 className="font-display text-xl text-olive-700">
                        {location.shortName}
                      </h3>
                      <ul className="mt-4 space-y-3 text-sm text-ink-soft">
                        <li className="flex items-start gap-2">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                          {location.street}, {location.postalCode} {location.city}
                        </li>
                        {/* Sin teléfono confirmado, sin línea (#33). */}
                        {whatsapp && (
                          <li className="flex items-center gap-2">
                            <Whatsapp className="h-4 w-4 shrink-0 text-gold-600" />
                            <a
                              href={whatsapp}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-olive-700"
                            >
                              {location.phone}
                            </a>
                          </li>
                        )}
                        <li className="flex items-center gap-2">
                          <Mail className="h-4 w-4 shrink-0 text-gold-600" />
                          <a href={`mailto:${location.email}`} className="hover:text-olive-700">
                            {location.email}
                          </a>
                        </li>
                        {/* El mismo horario que el pie, de `locations.ts`. */}
                        <li className="flex items-start gap-2">
                          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                          {hoursLine(location)}
                        </li>
                      </ul>
                      <BookingButton size="sm" variant="outline" className="mt-5" />
                    </div>
                  );
                })}
                <p className="px-1 text-sm text-ink-soft">
                  También puede escribirnos a{" "}
                  <a
                    href={`mailto:${site.email}`}
                    className="font-medium text-olive-700 underline decoration-gold-400 underline-offset-4"
                  >
                    {site.email}
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
