"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { MapPin, ArrowRight, Whatsapp, X } from "@/components/ui/icons";
import { locations } from "@/lib/locations";

type Props = {
  open: boolean;
  onClose: () => void;
};

/**
 * Booking modal: picks the location and sends the visitor to its Doctoralia
 * (each location has its own), with WhatsApp as a secondary path.
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
export function BookingModal({ open, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();

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
      onClose={onClose}
      // Un clic en el `::backdrop` tiene como target el propio `<dialog>`.
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
      className="modal w-full max-w-lg rounded-[2rem] border-0 bg-cream p-7 shadow-2xl shadow-olive-900/40 outline-none sm:p-9"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-olive-50 hover:text-olive-700"
      >
        <X className="h-5 w-5" />
      </button>

      <span className="rule-gold block" />
      <p className="eyebrow mt-5">Pedir cita</p>
      <h2 id={titleId} className="mt-2 text-2xl text-olive-800 sm:text-3xl">
        ¿En qué sede prefiere su cita?
      </h2>
      <p className="mt-2 text-sm text-ink-soft">
        Reserve online en Doctoralia o escríbanos por WhatsApp.
      </p>

      <div className="mt-6 space-y-4">
        {locations.map((location, i) => (
          <div
            key={location.slug}
            className={`rise${i > 0 ? " rise-2" : ""} rounded-2xl border border-olive-900/10 bg-white p-5`}
          >
            <h3 className="font-display text-lg text-olive-700">
              {location.shortName}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-soft">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-600" />
              {location.street}, {location.postalCode} {location.city}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Button href={location.bookingUrl} external size="sm">
                Reservar en Doctoralia
                <ArrowRight className="h-4 w-4" />
              </Button>
              <a
                href={location.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-olive-700 transition-colors hover:text-gold-700"
              >
                <Whatsapp className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </dialog>
  );
}
