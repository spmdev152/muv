"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { BookingButton } from "@/components/BookingButton";
import { ArrowRight } from "@/components/ui/icons";

// The 3D scene is client-only (WebGL). Fallback: soft background while loading.
const SpineCanvas = dynamic(() => import("@/components/three/SpineCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 animate-pulse rounded-[2rem] bg-olive-100/40" />
  ),
});

/**
 * Editorial, typographic, asymmetric hero:
 * a leading serif headline with an italic accent, a framed figure with an
 * offset double gold border, a single primary CTA + text link, and a bottom
 * masthead with the two locations. No blobs or floating cards.
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
    <section className="relative overflow-hidden bg-cream pb-12 pt-32 md:pb-16 md:pt-40">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
          {/* Typographic column */}
          <div className="lg:col-span-7">
            <motion.div {...rise(0)} className="mb-7 flex items-center gap-4">
              <span className="h-px w-12 bg-gold-500" />
              <span className="eyebrow">Clínica de fisioterapia · Madrid</span>
            </motion.div>

            <h1 className="text-5xl leading-[1.03] tracking-[-0.02em] sm:text-6xl lg:text-7xl">
              <motion.span {...rise(0.06)} className="block">
                Cuidamos de tu
              </motion.span>
              <motion.span
                {...rise(0.14)}
                className="block italic text-olive-500"
              >
                movimiento
              </motion.span>
              <motion.span {...rise(0.22)} className="block">
                para que recuperes tu vida
              </motion.span>
            </h1>

            <motion.p
              {...rise(0.32)}
              className="mt-8 max-w-md text-lg leading-relaxed text-ink-soft"
            >
              Tratamientos personalizados con tecnología de vanguardia y un
              equipo especialista. Eficaces, eficientes y, sobre todo,
              empáticos.
            </motion.p>

            <motion.div
              {...rise(0.4)}
              className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <BookingButton size="lg" />
              <Link
                href="/sobre-nosotros/metodologia"
                className="group inline-flex items-center gap-2 text-sm font-medium text-olive-700 transition-colors hover:text-gold-700"
              >
                Conoce nuestro método
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
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

        {/* Bottom masthead with the locations */}
        <motion.div
          {...rise(0.52)}
          className="mt-16 flex flex-col gap-3 border-t border-olive-900/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between md:mt-20"
        >
          <p className="text-ink-soft">
            Fisioterapia avanzada, Pilates y entrenamiento funcional · Dos
            sedes en Madrid
          </p>
          <div className="flex items-center gap-4 text-olive-700">
            <Link
              href="/sedes/el-canaveral"
              className="font-medium transition-colors hover:text-gold-700"
            >
              El Cañaveral
            </Link>
            <span className="text-olive-900/25">·</span>
            <Link
              href="/sedes/tres-cantos"
              className="font-medium transition-colors hover:text-gold-700"
            >
              Tres Cantos
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
