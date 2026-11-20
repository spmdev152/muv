"use client";

import { useEffect, useId, useRef, useState } from "react";
import { DoctoraliaWidget } from "@/components/booking/DoctoraliaWidget";
import { Button } from "@/components/ui/Button";
import {
  MapPin,
  ArrowRight,
  Calendar,
  Whatsapp,
  X,
} from "@/components/ui/icons";
import {
  doctoraliaFacility,
  fullAddress,
  getLocation,
  locations,
  whatsappUrl,
} from "@/lib/locations";
import { cn } from "@/lib/cn";

type Props = {
  open: boolean;
  onClose: () => void;
  /**
   * Slug of the clinic whose calendar opens straight away, on pages that
   * belong to a single clinic. Without it the visitor picks the clinic first.
   */
  locationSlug?: string;
};

/**
 * Booking modal in two steps (#73): pick the clinic, then book in its
 * Doctoralia calendar without leaving the site. WhatsApp stays as a secondary
 * path where the phone number is confirmed (#33). The calendar is third-party
 * content, so it only loads once the visitor asks for it.
 *
 * Sobre `<dialog>` + `showModal()`. El navegador aporta la capa superior (no
 * hace falta portal ni z-index contra el header), el `aria-modal`, el foco
 * contenido dentro del panel —que la versión anterior no tenía: se podía
 * tabular al fondo de la página—, el cierre con Escape y el `::backdrop`. Lo
 * que queda en JS es abrir, cerrar y bloquear el scroll; la entrada y la salida
 * son CSS (`.modal` en `globals.css`), sin librería de animación.
 *
 * No se monta hasta la primera apertura: hay tres o cuatro `BookingButton` por
 * página y su marcado no tiene por qué viajar repetido en el HTML inicial.
 */
export function BookingModal({ open, onClose, locationSlug }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [selected, setSelected] = useState<string | undefined>(locationSlug);
  const location = selected ? getLocation(selected) : undefined;

  function handleClose() {
    setSelected(locationSlug);
    onClose();
  }

  // Ajuste de estado durante el render, el patrón que recomienda React en vez
  // de un efecto que solo llama a setState.
  const [mounted, setMounted] = useState(false);
  if (open && !mounted) setMounted(true);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open, mounted]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!mounted) return null;

  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      // El evento `close` cubre Escape y el botón de cerrar, así que el estado
      // del padre se sincroniza por un único camino.
      onClose={handleClose}
      // Un clic en el `::backdrop` tiene como target el propio `<dialog>`.
      onClick={(event) => {
        if (event.target === dialog.current) handleClose();
      }}
      className={cn(
        "modal w-full rounded-[2rem] border-0 bg-cream p-7 shadow-2xl shadow-olive-900/40 outline-none sm:p-9",
        location ? "max-w-3xl" : "max-w-lg",
      )}
    >
      <button
        type="button"
        onClick={handleClose}
        aria-label="Cerrar"
        className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-olive-50 hover:text-olive-700"
      >
        <X className="h-5 w-5" />
      </button>

      <span className="rule-gold block" />
      <p className="eyebrow mt-5">Pedir cita</p>

      {location ? (
        <>
          <h2 id={titleId} className="mt-2 text-2xl text-olive-800 sm:text-3xl">
            Reserve en {location.name}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-soft">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-600" />
            {fullAddress(location)}
          </p>
          {!locationSlug && (
            <button
              type="button"
              onClick={() => setSelected(undefined)}
              className="mt-3 text-sm font-medium text-olive-700 underline decoration-gold-400 underline-offset-4 hover:text-gold-700"
            >
              ← Cambiar de clínica
            </button>
          )}
          <div className="mt-5 overflow-hidden rounded-2xl bg-white p-2 sm:p-3">
            <DoctoraliaWidget
              key={location.slug}
              facility={doctoraliaFacility(location)}
              name={location.name}
              bookingUrl={location.bookingUrl}
            />
          </div>
        </>
      ) : (
        <>
          <h2 id={titleId} className="mt-2 text-2xl text-olive-800 sm:text-3xl">
            ¿En qué sede prefiere su cita?
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Elija la clínica y reserve día y hora sin salir de la web, o
            escríbanos por WhatsApp.
          </p>

          <div className="mt-6 space-y-4">
            {locations.map((item, i) => {
              const whatsapp = whatsappUrl(item);

              return (
                <div
                  key={item.slug}
                  className={`rise${i > 0 ? " rise-2" : ""} rounded-2xl border border-olive-900/10 bg-white p-5`}
                >
                  <h3 className="font-display text-lg text-olive-700">
                    {item.shortName}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-soft">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-600" />
                    {fullAddress(item)}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <Button size="sm" onClick={() => setSelected(item.slug)}>
                      <Calendar className="h-4 w-4" />
                      Ver horarios y reservar
                    </Button>
                    {whatsapp && (
                      <a
                        href={whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-olive-700 transition-colors hover:text-gold-700"
                      >
                        <Whatsapp className="h-4 w-4" />
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-5 text-xs text-ink-soft">
            El calendario es de Doctoralia y puede instalar cookies. Si lo
            prefiere,{" "}
            {locations.map((item, i) => (
              <span key={item.slug}>
                {i > 0 && " o "}
                <a
                  href={item.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:text-olive-700"
                >
                  abra {item.shortName} en Doctoralia
                  <ArrowRight className="h-3 w-3" />
                </a>
              </span>
            ))}
            .
          </p>
        </>
      )}
    </dialog>
  );
}
