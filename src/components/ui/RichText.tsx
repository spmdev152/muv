import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Pinta el texto de contenido con sus tres marcas: `**negrita**`, `*cursiva*`
 * y `[enlace](/ruta)`. Los enlaces externos (PubMed, en las fuentes) abren en
 * pestaña nueva.
 */
const TOKEN = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)]+)\)/g;

function render(text: string, linkClassName?: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    const [whole, strong, em, label, href] = match;
    const i = match.index;
    if (i > last) out.push(text.slice(last, i));
    if (strong !== undefined) {
      out.push(
        <strong key={i} className="font-semibold text-ink">
          {render(strong, linkClassName)}
        </strong>,
      );
    } else if (em !== undefined) {
      out.push(<em key={i}>{render(em, linkClassName)}</em>);
    } else if (/^https?:\/\//.test(href)) {
      out.push(
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
        >
          {label}
        </a>,
      );
    } else {
      out.push(
        <Link key={i} href={href} className={linkClassName}>
          {label}
        </Link>,
      );
    }
    last = i + whole.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** El mismo texto sin marcas: es lo que va al JSON-LD. */
export function plainText(text: string): string {
  return text.replace(TOKEN, (_, strong, em, label) => strong ?? em ?? label);
}

export function RichText({
  text,
  linkClassName,
}: {
  text: string;
  linkClassName?: string;
}) {
  return (
    <>
      {render(
        text,
        cn(
          "text-olive-700 underline underline-offset-4 transition-colors hover:text-gold-700",
          linkClassName,
        ),
      )}
    </>
  );
}
