"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type As = "div" | "section" | "li" | "article" | "span";

type Props = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds to stagger reveals. */
  delay?: number;
  as?: As;
};

/**
 * Un único observador para toda la página. Cada `Reveal` montaba antes su
 * propio `whileInView` de `motion`, y una home tiene más de treinta: con un
 * observador compartido el coste de hidratación es el de añadir un atributo.
 */
let observer: IntersectionObserver | null = null;

function observe(el: Element) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.revealed = "true";
        observer?.unobserve(entry.target);
      }
    },
    {
      // Abajo, el `-80px` que traía el viewport de `motion`: el bloque no se
      // revela hasta que ha entrado de verdad en pantalla.
      //
      // Arriba, el margen se abre sin límite práctico para que «ya ha pasado»
      // cuente como intersección. Un observador solo avisa cuando el estado
      // cambia, así que con el root ajustado a la ventana un salto de scroll
      // (ancla, restauración al volver atrás, arrastre de la barra) pasaba de
      // «debajo» a «encima» sin ningún frame intermedio: no había aviso y esos
      // bloques se quedaban invisibles para siempre. Era también el
      // comportamiento del `whileInView` anterior.
      rootMargin: "100000px 0px -80px 0px",
    },
  );
  observer.observe(el);
}

/**
 * Reveals its content with a soft offset as it enters the viewport.
 *
 * La animación vive en CSS (`.reveal` en `globals.css`), así que respeta
 * `prefers-reduced-motion` por la regla global y no arrastra ninguna librería
 * de animación al bundle inicial.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: Props) {
  // Se estrecha a `div` solo para el tipado: los cinco tags admitidos son
  // HTMLElement y aquí únicamente se les pasa ref, clase y estilo.
  const Tag = as as "div";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    observe(el);
    return () => observer?.unobserve(el);
  }, []);

  const style = (
    delay ? { "--reveal-delay": `${delay}s` } : undefined
  ) as CSSProperties | undefined;

  return (
    <Tag ref={ref} className={cn("reveal", className)} style={style}>
      {children}
    </Tag>
  );
}
