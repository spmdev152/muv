import { BookingButton } from "@/components/BookingButton";
import { Whatsapp, Clock } from "@/components/ui/icons";
import { hoursLine, locations, whatsappUrl } from "@/lib/locations";

/**
 * Sidebar card with a booking CTA and, per location, its phone number and
 * opening hours. A location without a confirmed phone shows only its hours
 * (#33): the two clinics no longer share a timetable.
 */
export function BookingAside() {
  return (
    <aside className="lg:sticky lg:top-28">
      <div className="rounded-3xl border border-olive-900/10 bg-white p-7">
        <p className="eyebrow">Pida su cita</p>
        <h3 className="mt-3 font-display text-2xl text-olive-700">
          ¿Hablamos de su caso?
        </h3>
        <p className="mt-2 text-sm text-ink-soft">
          Reserve una valoración inicial en la sede que prefiera.
        </p>

        <ul className="mt-5 space-y-3">
          {locations.map((location) => {
            const whatsapp = whatsappUrl(location);
            return (
              <li
                key={location.slug}
                className="rounded-2xl bg-olive-50 px-4 py-3 text-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-olive-700">
                    {location.shortName}
                  </span>
                  {whatsapp && (
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-ink-soft transition-colors hover:text-olive-700"
                    >
                      <Whatsapp className="h-4 w-4" />
                      {location.phone}
                    </a>
                  )}
                </div>
                <p className="mt-1 flex items-start gap-2 text-xs text-ink-soft">
                  <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  {hoursLine(location)}
                </p>
              </li>
            );
          })}
        </ul>

        <BookingButton className="mt-5 w-full" size="lg" />
      </div>
    </aside>
  );
}
