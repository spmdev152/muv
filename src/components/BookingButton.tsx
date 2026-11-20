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
   * Clinic of the page. On pages that belong to a single clinic the modal
   * opens straight on its calendar: no picker, no other clinic.
   */
  locationSlug?: string | undefined;
};

/** Booking CTA: opens the booking modal with the Doctoralia calendar (#73). */
export function BookingButton({
  label = "Pedir cita",
  variant = "primary",
  size = "md",
  className,
  locationSlug,
}: Props) {
  const [open, setOpen] = useState(false);

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
      <BookingModal
        open={open}
        onClose={() => setOpen(false)}
        locationSlug={locationSlug}
      />
    </>
  );
}
