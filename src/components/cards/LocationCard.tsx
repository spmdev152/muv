import Link from "next/link";
import Image from "next/image";
import type { Location } from "@/lib/locations";
import { ArrowRight, Clock, MapPin, Whatsapp } from "@/components/ui/icons";

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
  showPhone = true,
}: Props) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-olive-800 text-cream">
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={location.heroImage}
          alt={imageAlt ?? `Sede MUV ${location.shortName}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-olive-900 via-olive-900/30 to-transparent" />
        <h3 className="absolute bottom-5 left-6 font-display text-3xl text-cream">
          {location.shortName}
        </h3>
      </div>
      <div className="p-7">
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
        <Link
          href={`/sedes/${location.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold-400"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
