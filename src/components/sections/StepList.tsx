import { Reveal } from "@/components/motion/Reveal";

type Props = {
  steps: readonly { title: string; text: string }[];
  /** Numera los pasos. Sin numerar cuando el propio rótulo ya ordena. */
  numbered?: boolean;
};

/**
 * Lista de pasos de un proceso.
 *
 * La usa «La primera visita» de las dos páginas de sede, cuyos tres rótulos
 * —Antes, Durante, Al salir— ya llevan el orden dentro, así que por defecto no
 * se numeran: añadir «01 · Antes» sería decir dos veces lo mismo.
 */
export function StepList({ steps, numbered = false }: Props) {
  return (
    <ol className="grid gap-6 md:grid-cols-3">
      {steps.map((step, i) => (
        <Reveal key={step.title} delay={i * 0.08} as="li">
          <div className="h-full rounded-3xl border border-olive-900/10 bg-white p-7">
            {numbered && (
              <span className="mb-3 block font-display text-2xl text-gold-600">
                {String(i + 1).padStart(2, "0")}
              </span>
            )}
            <h3 className="font-display text-lg text-olive-700">{step.title}</h3>
            <p className="mt-2 leading-relaxed text-ink-soft">{step.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
