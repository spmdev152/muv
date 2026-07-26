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
};

/** Inner-page header. With an image → immersive dark version. */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  image,
  size = "wide",
}: Props) {
  if (image) {
    return (
      <header className="relative isolate overflow-hidden bg-olive-800 pt-28">
        <Image
          src={image}
          alt=""
          fill
          priority
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
            <h1 className="max-w-3xl text-4xl text-cream sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description && (
              <p className="mt-5 max-w-2xl text-lg text-cream/80">
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
          <h1 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {description}
            </p>
          )}
        </Reveal>
      </Container>
    </header>
  );
}
