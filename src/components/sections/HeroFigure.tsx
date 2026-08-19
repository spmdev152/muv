"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// La escena 3D es solo cliente (WebGL) y pesa ~270 KB de JS. No se importa
// hasta que `canRender3d()` da el visto bueno, así que en móvil, con
// `prefers-reduced-motion` o sin GPU el chunk no llega a pedirse.
const SpineCanvas = dynamic(() => import("@/components/three/SpineCanvas"), {
  ssr: false,
});

/** Rasterizadores por software: WebGL existe, pero a 2 fps y bloqueando el hilo. */
const SOFTWARE_GL = /swiftshader|llvmpipe|softpipe|basic render|software/i;

/** A partir de `lg` la figura ocupa 5/12 del ancho; por debajo mide 384 px. */
const WIDE_VIEWPORT = "(min-width: 1024px)";

function canRender3d() {
  if (!window.matchMedia(WIDE_VIEWPORT).matches) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  if (connection?.saveData) return false;

  let gl: WebGLRenderingContext | null = null;
  try {
    const canvas = document.createElement("canvas");
    gl = (canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
  } catch {
    return false;
  }
  if (!gl) return false;

  // Chrome cae a SwiftShader cuando no hay GPU utilizable (máquinas virtuales,
  // navegadores headless, drivers en lista negra). La escena tiene sombras y
  // materiales físicos: en CPU cada frame pasa de 100 ms y se come el hilo
  // principal. Ahí es mejor quedarse con la foto.
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = info
    ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL))
    : "";
  gl.getExtension("WEBGL_lose_context")?.loseContext();

  return !SOFTWARE_GL.test(renderer);
}

/*
  `?poster=1` monta la escena aunque el rasterizador sea software y la deja
  congelada para siempre en su pose de apertura. Es como
  `scripts/render-spine-poster.mjs` genera `hero-spine.webp`, y la única forma
  de que el fotograma guardado y el primer frame en vivo coincidan al pixel: sin
  este modo la captura tendría que acertar dentro de la ventana de 700 ms del
  fundido, y congelar el bucle de render no sirve —el canvas se captura en
  blanco cuando deja de dibujar—. Sin el parámetro no hace nada.
*/
function posterMode() {
  return new URLSearchParams(window.location.search).has("poster");
}

/**
 * Decide si carga la columna 3D y coordina el relevo con el póster.
 *
 * `poster` llega renderizado desde el servidor: es el LCP de la home, viaja en
 * el HTML inicial con `preload` y `fetchPriority="high"`, así que se pide en el
 * primer round trip y no depende de que hidrate nada. La escena 3D es
 * mejora progresiva: se importa al primer hueco libre del hilo principal y,
 * cuando ha pintado su primer frame, el póster se desvanece por debajo.
 */
export function HeroFigure({ poster }: { poster: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [painted, setPainted] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (!posterMode() && !canRender3d()) return;

    // Después del LCP y de la hidratación, nunca compitiendo con ellos.
    if (typeof window.requestIdleCallback === "function") {
      const handle = window.requestIdleCallback(() => setMounted(true), {
        timeout: 2500,
      });
      return () => window.cancelIdleCallback(handle);
    }
    // Safari todavía no trae requestIdleCallback.
    const timer = window.setTimeout(() => setMounted(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  /*
    El relevo va en dos tiempos y este es el orden que lo hace invisible:

      1. `painted` — la escena ha pintado su pose de apertura, idéntica al
         fotograma del póster. El póster empieza a desvanecerse.
      2. `live` — el fundido ha terminado y solo entonces la columna se pone a
         girar.

    Si el movimiento arrancase en el paso 1, el fundido cruzaría dos poses
    distintas y se vería el salto. El respaldo por temporizador está porque un
    `transitionend` puede no llegar (la pestaña pasa a segundo plano a mitad del
    fundido, por ejemplo) y la columna no puede quedarse congelada por eso.
  */
  useEffect(() => {
    if (!painted || posterMode()) return;
    const timer = window.setTimeout(() => setLive(true), 1200);
    return () => window.clearTimeout(timer);
  }, [painted]);

  return (
    <div
      // Estados del relevo, y el asidero con el que
      // `scripts/render-spine-poster.mjs` captura la pose congelada.
      data-spine={!mounted ? "off" : live ? "live" : painted ? "painted" : "loading"}
      className="settle relative mx-auto aspect-[4/5] w-full max-w-sm lg:max-w-none"
    >
      {/* Subtle radial halo that adds depth behind the figure */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(60%_55%_at_50%_42%,var(--color-olive-100)_0%,transparent_70%)]"
      />
      <div
        // Cuando la escena ya pinta, el fotograma sobra: se apaga por debajo.
        // Los dos muestran la misma figura en la misma pose, así que el relevo
        // se ve como que la columna se pone en marcha, no como un cambio de
        // imagen. Es decorativo (`alt=""`) y el canvas también, así que no hay
        // nada que ocultar al árbol de accesibilidad.
        onTransitionEnd={() => {
          if (!posterMode()) setLive(true);
        }}
        className={cn(
          "absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          painted && "opacity-0",
        )}
      >
        {poster}
      </div>
      {mounted && (
        <SpineCanvas onPainted={() => setPainted(true)} animate={live} />
      )}
    </div>
  );
}
