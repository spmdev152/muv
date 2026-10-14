"use client";

import { useId, useRef, useState, useSyncExternalStore } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tab = {
  /** También es el ancla: `/profesionales#tres-cantos` abre esa pestaña. */
  id: string;
  label: string;
  content: ReactNode;
};

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function readHash() {
  return window.location.hash.slice(1);
}

type Props = {
  tabs: Tab[];
  /** Nombre accesible de la lista de pestañas. */
  label: string;
  className?: string;
};

/**
 * Pestañas accesibles (patrón WAI-ARIA, activación automática).
 *
 * Todos los paneles se pintan en el HTML y los inactivos llevan `hidden`: el
 * contenido de cada pestaña es rastreable aunque no sea la que se ve.
 */
export function Tabs({ tabs, label, className }: Props) {
  // En el servidor no hay ancla: el HTML sale siempre con la primera pestaña y
  // la del ancla se aplica al hidratar, sin desajuste.
  const hash = useSyncExternalStore(subscribeToHash, readHash, () => "");
  const [picked, setPicked] = useState<string | null>(null);
  const active =
    picked ?? (tabs.some((t) => t.id === hash) ? hash : tabs[0]?.id);
  const baseId = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function select(index: number, focus = false) {
    const tab = tabs[index];
    setPicked(tab.id);
    window.history.replaceState(null, "", `#${tab.id}`);
    if (focus) buttons.current[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent, index: number) {
    const last = tabs.length - 1;
    const next =
      event.key === "ArrowRight" ? (index === last ? 0 : index + 1)
      : event.key === "ArrowLeft" ? (index === 0 ? last : index - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    select(next, true);
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        className="inline-flex flex-wrap gap-1 rounded-full border border-olive-900/10 bg-white p-1"
      >
        {tabs.map((tab, i) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                buttons.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400",
                selected
                  ? "bg-olive-800 text-cream"
                  : "text-olive-700 hover:bg-olive-900/5",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== active}
          className="mt-10"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
