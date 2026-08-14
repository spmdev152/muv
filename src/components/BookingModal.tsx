"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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
 * Rendered in a portal so no header/section stacking context can clip it.
 */
export function BookingModal({ open, onClose }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const ease = [0.22, 1, 0.36, 1] as const;

  // Escape to close + scroll lock + initial focus while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            onClick={onClose}
            aria-hidden="true"
            className="absolute inset-0 bg-olive-900/50 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            tabIndex={-1}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.45, ease }}
            className="relative w-full max-w-lg rounded-[2rem] bg-cream p-7 shadow-2xl shadow-olive-900/40 outline-none sm:p-9"
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
            <h2
              id="booking-modal-title"
              className="mt-2 text-2xl text-olive-800 sm:text-3xl"
            >
              ¿En qué sede prefiere su cita?
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Reserve online en Doctoralia o escríbanos por WhatsApp.
            </p>

            <div className="mt-6 space-y-4">
              {locations.map((location, i) => (
                <motion.div
                  key={location.slug}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12 + i * 0.08, ease }}
                  className="rounded-2xl border border-olive-900/10 bg-white p-5"
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
