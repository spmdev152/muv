import Link from "next/link";
import Image from "next/image";
import type { Location } from "@/lib/locations";
import {
  ArrowRight,
  Clock,
  MapPin,
  ShieldCheck,
  Whatsapp,
} from "@/components/ui/icons";

type Props = {
  location: Location;
  /** Approved copy for the card. Omitted, the card shows no blurb. */
  blurb?: string;
  /** Descriptive ALT. Falls back to a generic one built from the short name. */
  imageAlt?: string;
  /** NAP address line, copied verbatim from the approved copy. */
  address?: string;
  /** NAP opening hours line, copied verbatim from the approved copy. */
  hours?: string;
  ctaLabel?: string;
  /** Nº de registro sanitario. Sin él, la línea no se pinta. */
  registry?: string;
  /** Una línea sobre el espacio de la clínica. */
  facilities?: string;
  /** El nombre de la clínica como encabezado, en vez del nombre corto. */
  heading?: string;
  /** Nivel del encabezado. `/sedes` usa H3 dentro de su H2 de sección. */
  headingAs?: "h2" | "h3";
  /**
   * The phone numbers in `locations.ts` disagree with the four sources MUV
   * publishes. Pages built from the approved copy pass `false` until the
   * client confirms which one is right.
   */
  showPhone?: boolean;
};

export function LocationCard({
  location,
  blurb,
  imageAlt,
  address,
  hours,
  ctaLabel = "Ver sede y servicios",
  registry,
  facilities,
  heading,
  headingAs: Heading = "h3",
  showPhone = true,
}: Props) {
  return (
    // `h-full flex flex-col`: en una fila de dos, la rejilla estira el
    // contenedor pero la tarjeta se quedaba a la altura de su texto, y las dos
    // clínicas no tienen el mismo número de líneas.
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-olive-800 text-cream">
      <div className="relative aspect-[3/2] shrink-0 overflow-hidden">
        <Image
          src={location.heroImage}
          alt={imageAlt ?? `Sede MUV ${location.shortName}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-olive-900 via-olive-900/30 to-transparent" />
        <Heading className="absolute bottom-5 left-6 font-display text-3xl text-cream">
          {heading ?? location.shortName}
        </Heading>
      </div>
      <div className="flex flex-1 flex-col p-7">
        {blurb && (
          <p className="mb-5 text-sm leading-relaxed text-cream/80">{blurb}</p>
        )}
        <p className="flex items-start gap-2 text-sm text-cream/70">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
          {address ?? (
            <>
              {location.street}, {location.postalCode} {location.city}
            </>
          )}
        </p>
        {hours && (
          <p className="mt-2 flex items-start gap-2 text-sm text-cream/70">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
            {hours}
          </p>
        )}
        {showPhone && (
          <a
            href={location.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-gold-400"
          >
            <Whatsapp className="h-4 w-4 shrink-0 text-gold-400" />
            {location.phone}
          </a>
        )}
        {registry && (
          <p className="mt-2 flex items-start gap-2 text-sm text-cream/70">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
            <span>
              Centro sanitario registrado{" "}
              <span className="text-cream/90">{registry}</span>
            </span>
          </p>
        )}
        {facilities && (
          <p className="mt-4 text-sm leading-relaxed text-cream/70">
            {facilities}
          </p>
        )}
        {/* `mt-auto` ancla el enlace abajo: con las tarjetas ya a la misma
            altura, deja los dos CTA alineados entre sí. */}
        <Link
          href={`/sedes/${location.slug}`}
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-medium text-gold-400"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
