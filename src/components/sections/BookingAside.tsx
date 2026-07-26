import { BookingButton } from "@/components/BookingButton";
import { Whatsapp, Clock } from "@/components/ui/icons";
import { locations } from "@/lib/locations";

/** Sidebar card with a booking CTA and the phone numbers of both locations. */
export function BookingAside() {
  return (
    <aside className="lg:sticky lg:top-28">
      <div className="rounded-3xl border border-olive-900/10 bg-white p-7">
        <p className="eyebrow">Pide tu cita</p>
        <h3 className="mt-3 font-display text-2xl text-olive-700">
          ¿Hablamos de tu caso?
        </h3>
        <p className="mt-2 text-sm text-ink-soft">
          Reserva una valoración inicial en la sede que prefieras.
        </p>

        <div className="mt-5 space-y-3">
          {locations.map((location) => (
            <a
              key={location.slug}
              href={location.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl bg-olive-50 px-4 py-3 text-sm transition-colors hover:bg-olive-100"
            >
              <span className="font-medium text-olive-700">
                {location.shortName}
              </span>
              <span className="flex items-center gap-2 text-ink-soft">
                <Whatsapp className="h-4 w-4" />
                {location.phone}
              </span>
            </a>
          ))}
        </div>

        <BookingButton className="mt-5 w-full" size="lg" />

        <p className="mt-5 flex items-center gap-2 text-xs text-ink-soft">
          <Clock className="h-4 w-4" />
          Lun–Vie 10–14 · 16–22 · Sáb 10–14
        </p>
      </div>
    </aside>
  );
}
