import Link from "next/link";
import Image from "next/image";
import type { Location } from "@/lib/locations";
import { ArrowRight, MapPin, Whatsapp } from "@/components/ui/icons";

export function LocationCard({ location }: { location: Location }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-olive-800 text-cream">
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={location.heroImage}
          alt={`Sede MUV ${location.shortName}`}
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
        <p className="flex items-start gap-2 text-sm text-cream/70">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
          {location.street}, {location.postalCode} {location.city}
        </p>
        <a
          href={location.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-gold-400"
        >
          <Whatsapp className="h-4 w-4 shrink-0 text-gold-400" />
          {location.phone}
        </a>
        <Link
          href={`/sedes/${location.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold-400"
        >
          Ver sede y servicios
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
