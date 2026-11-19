import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/format";
import { isLegalComplete, legal } from "@/lib/legal";
import { buildMetadata } from "@/lib/seo";

/**
 * Metadata of a legal page. While MUV's legal data is incomplete the page is
 * `noindex`, so a text with "Pendiente" markers never reaches Google (#60).
 */
export function legalMetadata(args: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    ...buildMetadata(args),
    robots: isLegalComplete()
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

/** Visible marker for a fact MUV has not supplied yet. */
export function Pending({ label }: { label: string }) {
  return (
    <mark className="rounded-md bg-gold-400/25 px-1.5 py-0.5 text-olive-900">
      [Pendiente: {label}]
    </mark>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="py-8">
      <h2 className="text-2xl text-olive-800">{title}</h2>
      <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink-soft [&_a]:font-medium [&_a]:text-olive-700 [&_a]:underline [&_a]:decoration-gold-400 [&_a]:underline-offset-4 [&_li]:relative [&_li]:pl-6 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-3 [&_li]:before:h-1.5 [&_li]:before:w-1.5 [&_li]:before:rounded-full [&_li]:before:bg-gold-500 [&_strong]:font-semibold [&_strong]:text-olive-800 [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}

/** Layout shared by the legal notice, privacy and cookie policies. */
export function LegalDocument({
  title,
  description,
  path,
  children,
}: {
  title: string;
  description: string;
  path: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        size="narrow"
        eyebrow="Información legal"
        title={title}
        description={description}
        crumbs={[{ label: title, href: path }]}
      />

      <section className="pb-20 md:pb-28">
        <Container size="narrow">
          <p className="text-sm text-ink-soft">
            Última actualización: {formatDate(legal.updated)}
          </p>
          <div className="divide-y divide-olive-900/10">{children}</div>
        </Container>
      </section>
    </>
  );
}
