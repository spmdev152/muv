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
};

/** Booking CTA: opens the location-picker modal (each one books on its own Doctoralia). */
export function BookingButton({
  label = "Pedir cita",
  variant = "primary",
  size = "md",
  className,
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
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
