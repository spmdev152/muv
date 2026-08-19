import type { ReactNode } from "react";
import { Plus } from "@/components/ui/icons";

export type QA = {
  question: string;
  /** Plain text. This is what `faqJsonLd` publishes as the accepted answer. */
  answer: string;
  /**
   * Same answer with inline markup (a link, for instance). When present it
   * replaces `answer` on screen — the two must say the same thing, so that the
   * FAQPage schema never diverges from what the reader sees.
   */
  answerNode?: ReactNode;
};

/**
 * Acordeón de preguntas frecuentes.
 *
 * Sobre `<details>` y no sobre estado en React: el atributo `name` agrupa los
 * paneles y el navegador ya cierra el anterior al abrir uno, que era todo lo
 * que aportaba el `useState`. A cambio el componente deja de ser cliente (no
 * hidrata nada), el teclado y los lectores de pantalla funcionan con la
 * semántica nativa, y la página se queda sin la librería de animación que solo
 * servía para desplegar el alto. La animación la hace CSS donde exista
 * `::details-content`.
 *
 * Hoy ninguna página monta dos bloques a la vez, así que el grupo es único.
 */
export function FAQ({ items }: { items: QA[] }) {
  return (
    <div className="faq divide-y divide-olive-900/10 border-y border-olive-900/10">
      {items.map((item, i) => (
        <details key={item.question} name="faq" open={i === 0} className="group">
          <summary className="flex w-full items-center justify-between gap-6 py-5 text-left">
            <span className="font-display text-lg text-olive-800">
              {item.question}
            </span>
            <Plus className="h-5 w-5 shrink-0 text-gold-600 transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="pb-6 pr-10 text-ink-soft leading-relaxed">
            {item.answerNode ?? item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
