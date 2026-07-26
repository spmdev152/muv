import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { locations } from "@/lib/locations";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { MapPin, Whatsapp, Mail, Clock } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-olive-800 text-cream/80">
      <div className="grain" aria-hidden="true" />
      <Container size="wide" className="relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* Brand + locations */}
          <div>
            <Logo className="text-cream" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              {site.tagline}. Fisioterapia avanzada, Pilates y entrenamiento
              funcional con un trato cercano en Madrid.
            </p>

            <div className="mt-8 space-y-6">
              {locations.map((location) => (
                <div key={location.slug} className="text-sm">
                  <p className="font-display text-lg text-gold-400">
                    {location.shortName}
                  </p>
                  <p className="mt-1 flex items-start gap-2 text-cream/60">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      {location.street}, {location.postalCode} {location.city}
                    </span>
                  </p>
                  <a
                    href={location.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex items-center gap-2 text-cream/60 transition-colors hover:text-gold-400"
                  >
                    <Whatsapp className="h-4 w-4 shrink-0" />
                    {location.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation columns */}
          {Object.entries(footerNav).map(([heading, links]) => (
            <nav key={heading} aria-label={heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-cream">
                {heading}
              </h3>
              <ul className="mt-5 space-y-3 text-sm">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-cream/60 transition-colors hover:text-gold-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/10 pt-8 text-xs text-cream/50 md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Lun–Vie 10:00–14:00 · 16:00–22:00 · Sáb 10:00–14:00
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 hover:text-gold-400"
            >
              <Mail className="h-4 w-4" />
              {site.email}
            </a>
            <span className="hidden md:inline">·</span>
            <Link href="/politica-editorial" className="hover:text-gold-400">
              Política editorial
            </Link>
          </div>
        </div>

        <p className="mt-8 text-xs text-cream/40">
          © {2026} {site.legalName}. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
