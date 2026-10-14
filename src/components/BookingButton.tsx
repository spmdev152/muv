"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/icons";
import { BookingModal } from "@/components/BookingModal";

type Props = {
  label?: string;
  variant?: "primary" | "cream" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  /**
   * Doctoralia de una sede concreta. En las páginas que pertenecen a una sola
   * clínica el botón reserva directamente en ella: ni selector ni la otra sede.
   */
  bookingUrl?: string;
};

/** Booking CTA: opens the location-picker modal (each one books on its own Doctoralia). */
export function BookingButton({
  label = "Pedir cita",
  variant = "primary",
  size = "md",
  className,
  bookingUrl,
}: Props) {
  const [open, setOpen] = useState(false);

  if (bookingUrl) {
    return (
      <Button
        href={bookingUrl}
        external
        variant={variant}
        size={size}
        className={className}
      >
        <Calendar className="h-[18px] w-[18px]" />
        {label}
      </Button>
    );
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setOpen(true)}
      >
        <Calendar className="h-[18px] w-[18px]" />
        {label}
      </Button>
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
