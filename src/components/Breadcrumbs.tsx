import Link from "next/link";
import { cn } from "@/lib/cn";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export type Crumb = { label: string; href: string };

type Tone = "dark" | "light";

const tones: Record<
  Tone,
  { base: string; link: string; current: string; sep: string }
> = {
  // On light (cream) backgrounds.
  dark: {
    base: "text-ink-soft",
    link: "hover:text-gold-700",
    current: "text-olive-700",
    sep: "text-olive-900/30",
  },
  // On dark image heroes.
  light: {
    base: "text-cream/70",
    link: "hover:text-gold-300",
    current: "text-cream",
    // `/60` es el mínimo que cumple 4,5:1 sobre los héroes oscuros.
    sep: "text-cream/60",
  },
};

/** Migas de pan + BreadcrumbList JSON-LD para SEO. */
export function Breadcrumbs({
  items,
  tone = "dark",
}: {
  items: Crumb[];
  tone?: Tone;
}) {
  const trail = [{ label: "Inicio", href: "/" }, ...items];
  const t = tones[tone];

  return (
    <>
      <nav aria-label="Migas de pan" className={cn("text-sm", t.base)}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {trail.map((crumb, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-2">
                {last ? (
                  <span className={t.current}>{crumb.label}</span>
                ) : (
                  <Link
                    href={crumb.href}
                    className={cn("transition-colors", t.link)}
                  >
                    {crumb.label}
                  </Link>
                )}
                {!last && <span className={t.sep}>/</span>}
              </li>
            );
          })}
        </ol>
      </nav>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((crumb, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: crumb.label,
            item: `${site.url}${crumb.href === "/" ? "" : crumb.href}`,
          })),
        }}
      />
    </>
  );
}
