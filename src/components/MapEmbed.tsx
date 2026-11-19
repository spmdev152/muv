"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin } from "@/components/ui/icons";

type Props = {
  /** Google Maps embed URL (`location.mapEmbed`). */
  src: string;
  title: string;
  address: string;
};

/**
 * Google Maps loads only after a click (#60): until then no request goes to
 * Google and no third-party cookie is set, so the site needs no cookie banner.
 * "Abrir en Google Maps" opens the same place in a new tab instead.
 */
export function MapEmbed({ src, title, address }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const placeUrl = src.replace(/&output=embed$/, "");

  if (isLoaded) {
    return (
      <iframe
        title={title}
        src={src}
        className="h-[26rem] w-full"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="flex h-[26rem] w-full flex-col items-center justify-center gap-5 bg-olive-50 px-8 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-gold-600 shadow-sm">
        <MapPin className="h-6 w-6" aria-hidden="true" />
      </span>
      <p className="max-w-xs font-medium text-olive-800">{address}</p>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
        <button
          type="button"
          onClick={() => setIsLoaded(true)}
          className="rounded-full bg-olive-500 px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-olive-700"
        >
          Cargar el mapa
        </button>
        <a
          href={placeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-olive-700 underline decoration-gold-400 underline-offset-4 hover:text-gold-700"
        >
          Abrir en Google Maps
        </a>
      </div>
      <p className="max-w-sm text-xs text-ink-soft">
        Al cargar el mapa, Google puede instalar cookies. Más información en la{" "}
        <Link
          href="/politica-de-cookies"
          className="underline underline-offset-2"
        >
          política de cookies
        </Link>
        .
      </p>
    </div>
  );
}
