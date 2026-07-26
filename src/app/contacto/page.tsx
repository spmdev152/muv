import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { MapPin, Whatsapp, Mail, Clock } from "@/components/ui/icons";
import { BookingButton } from "@/components/BookingButton";
import { locations } from "@/lib/locations";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  description:
    "Contacta con MUV. Pide tu cita en El Cañaveral o Tres Cantos, llámanos o escríbenos. Estaremos encantados de ayudarte.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Hablemos"
        description="¿Tienes dudas o quieres pedir cita? Escríbenos por WhatsApp o reserva online en la sede que prefieras."
        crumbs={[{ label: "Contacto", href: "/contacto" }]}
      />

      <section className="pb-20 md:pb-28">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-[1fr_24rem]">
            <div>
              <h2 className="text-2xl text-olive-800">Envíanos un mensaje</h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <Reveal>
              <div className="space-y-6">
                {locations.map((location) => (
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
                      <li className="flex items-center gap-2">
                        <Clock className="h-4 w-4 shrink-0 text-gold-600" />
                        L–V 10–14 · 16–22 · Sáb 10–14
                      </li>
                    </ul>
                    <BookingButton size="sm" variant="outline" className="mt-5" />
                  </div>
                ))}
                <p className="px-1 text-sm text-ink-soft">
                  También puedes escribirnos a{" "}
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
