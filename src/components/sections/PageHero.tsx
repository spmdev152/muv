import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  image?: string;
  /** Must match the page content's Container so they stay aligned. */
  size?: "default" | "narrow" | "wide";
  /**
   * `compact` baja el cuerpo del titular y lo deja correr más ancho. Es para
   * los H1 largos que llevan la entidad de búsqueda dentro —los de las páginas
   * de sede pasan de 75 caracteres— y que a tamaño completo caen en cuatro
   * líneas, apelotonando el arranque de la página.
   */
  titleSize?: "default" | "compact";
};

/** Inner-page header. With an image → immersive dark version. */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  image,
  size = "wide",
  titleSize = "default",
}: Props) {
  const titleClass =
    titleSize === "compact"
      ? "max-w-5xl text-balance text-3xl sm:text-4xl lg:text-[2.75rem]"
      : "max-w-4xl text-balance text-4xl sm:text-5xl lg:text-6xl";

  if (image) {
    return (
      <header className="relative isolate overflow-hidden bg-olive-800 pt-28">
        <Image
          src={image}
          alt=""
          fill
          // Fondo del hero: es el LCP de las páginas interiores. En Next 16
          // `priority` está deprecado en favor de estas tres.
          preload
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-olive-900 via-olive-900/60 to-olive-900/40" />
        <Container size={size} className="relative pb-16 pt-10 md:pb-20">
          {crumbs && (
            <div className="mb-6">
              <Breadcrumbs items={crumbs} tone="light" />
            </div>
          )}
          <Reveal>
            {eyebrow && (
              <p className="eyebrow mb-4 text-gold-400">{eyebrow}</p>
            )}
            <h1 className={`${titleClass} text-cream`}>{title}</h1>
            {description && (
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-cream/80">
                {description}
              </p>
            )}
          </Reveal>
        </Container>
      </header>
    );
  }

  return (
    <header className="relative overflow-hidden pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-20 h-[28rem] w-[28rem] rounded-full bg-olive-100/60 blur-3xl"
      />
      <Container size={size} className="relative pb-12 md:pb-16">
        {crumbs && (
          <div className="mb-6">
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        <Reveal>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <span className="rule-gold mb-6 block" />
          <h1 className={titleClass}>{title}</h1>
          {description && (
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft">
              {description}
            </p>
          )}
        </Reveal>
      </Container>
    </header>
  );
}
