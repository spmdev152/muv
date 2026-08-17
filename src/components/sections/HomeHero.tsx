"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { BookingButton } from "@/components/BookingButton";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { hero } from "@/content/home";

// The 3D scene is client-only (WebGL). Fallback: soft background while loading.
const SpineCanvas = dynamic(() => import("@/components/three/SpineCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 animate-pulse rounded-[2rem] bg-olive-100/40" />
  ),
});

/**
 * Módulo 1 · Hero editorial, tipográfico y asimétrico: titular con acento en
 * itálica, figura 3D a la derecha y los dos botones de la copy aprobada.
 *
 * El texto sale de `src/content/home.ts`. El eyebrow y la franja inferior con
 * las dos sedes que había aquí se retiraron: no figuraban en
 * `docs/contenidos/home.md` y la regla 2 del README no admite copy sin fuente.
 * Las señales de confianza las cubre ahora `TrustStrip` (módulo 2).
 */
export function HomeHero() {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;
  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease },
  });

  return (
    // `min-h-svh` reserva el viewport inicial entero para el header y el hero:
    // la franja de confianza (módulo 2) queda siempre por debajo del pliegue.
    // svh y no dvh — es la medida más pequeña, así en móvil tampoco asoma
    // cuando el navegador oculta su propia barra.
    <section className="relative min-h-svh overflow-hidden bg-cream pb-12 pt-32 md:pb-16 md:pt-40">
      <Container size="wide">
        {/*
          `items-center` y no `items-end`: la franja inferior que alineaba por
          abajo con la figura ya no existe, y con el titular en tres líneas el
          bloque de texto quedaba 114 px por debajo del centro de la imagen.
        */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* Typographic column */}
          <div className="lg:col-span-7">
            {/*
              El titular fluye como una sola frase: un único bloque animado,
              porque `transform` no se aplica a elementos en línea y partirlo en
              varios spans obligaría a cortes de línea fijos. `text-balance`
              reparte las líneas en lugar de dejar una huérfana al final.
            */}
            <h1 className="text-[2rem] leading-[1.08] tracking-[-0.02em] text-balance sm:text-5xl lg:text-[3.25rem]">
              <motion.span {...rise(0.06)} className="block">
                {hero.h1.before}
                <span className="italic text-olive-500">{hero.h1.accent}</span>
                {hero.h1.after}
              </motion.span>
            </h1>

            <motion.p
              {...rise(0.2)}
              className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft"
            >
              {hero.lede}
            </motion.p>

            <motion.div
              {...rise(0.3)}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <BookingButton size="lg" />
              <Button href={hero.secondaryCta.href} variant="outline" size="lg">
                {hero.secondaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          {/* 3D stylized spine in brand greens: cantos apilados con textura de piedra */}
          <div className="lg:col-span-5">
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease }}
              className="relative mx-auto aspect-[4/5] w-full max-w-sm lg:max-w-none"
            >
              {/* Subtle radial halo that adds depth behind the figure */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(60%_55%_at_50%_42%,var(--color-olive-100)_0%,transparent_70%)]"
              />
              <SpineCanvas />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
