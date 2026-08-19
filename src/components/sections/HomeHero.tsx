import Image from "next/image";
/*
  Import estático y no una ruta de `public/`: así la URL lleva el hash del
  contenido (`/_next/static/media/hero-spine.<hash>.webp`) y al regenerar el
  fotograma cambia sola. Con la ruta fija, navegadores y CDN se quedaban
  sirviendo el póster viejo durante horas —el archivo cambia, la URL no— y no
  había forma de invalidarlo salvo a mano.
*/
import heroSpine from "@/assets/hero-spine.webp";
import { Container } from "@/components/ui/Container";
import { BookingButton } from "@/components/BookingButton";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { HeroFigure } from "@/components/sections/HeroFigure";
import { hero } from "@/content/home";

/**
 * Módulo 1 · Hero editorial, tipográfico y asimétrico: titular con acento en
 * itálica, figura a la derecha y los dos botones de la copy aprobada.
 *
 * El texto sale de `src/content/home.ts`. El eyebrow y la franja inferior con
 * las dos sedes que había aquí se retiraron: no figuraban en
 * `docs/contenidos/home.md` y la regla 2 del README no admite copy sin fuente.
 * Las señales de confianza las cubre ahora `TrustStrip` (módulo 2).
 *
 * Es un componente de servidor. Antes era cliente y animaba la entrada con
 * `motion` desde `opacity: 0`, así que el titular y el lede no se pintaban
 * hasta que el bundle hidrataba: el LCP de móvil era el lede a 5,7 s. Ahora la
 * entrada es CSS (`.rise`), el H1 y el póster viajan en el HTML inicial y lo
 * único que queda en cliente es `HeroFigure` (el 3D) y `BookingButton`.
 */
export function HomeHero() {
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
              <span className="rise block">
                {hero.h1.before}
                <span className="italic text-olive-500">{hero.h1.accent}</span>
                {hero.h1.after}
              </span>
            </h1>

            <p className="rise rise-2 mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
              {hero.lede}
            </p>

            <div className="rise rise-3 mt-9 flex flex-wrap items-center gap-4">
              <BookingButton size="lg" />
              <Button href={hero.secondaryCta.href} variant="outline" size="lg">
                {hero.secondaryCta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/*
            Figura: fotograma de la columna en el HTML inicial y la escena 3D
            encima como mejora progresiva.
          */}
          <div className="lg:col-span-5">
            <HeroFigure
              poster={
                <Image
                  // Un fotograma de la propia escena, en la pose de perfil con
                  // la que arranca (`scripts/render-spine-poster.mjs`). Antes
                  // aquí había una foto de consulta y el relevo se leía como un
                  // salto: aparecía una imagen y la sustituía otra distinta.
                  // Siendo la misma figura, el cambio es imperceptible: la
                  // columna estática se pone a girar. Y es además lo único que
                  // ven móvil, tablet y las máquinas sin GPU.
                  src={heroSpine}
                  // Decorativa: una figura abstracta de marca que no añade nada
                  // al H1 ni al lede. El `<canvas>` que la releva también sale
                  // del árbol de accesibilidad, así que la figura no anuncia
                  // una cosa distinta según el dispositivo.
                  alt=""
                  fill
                  // Next 16 sustituyó `priority` por estas tres: `preload`
                  // inserta el `<link>` en el head, y las otras dos marcan la
                  // petición como urgente en lugar de diferida.
                  preload
                  loading="eager"
                  fetchPriority="high"
                  // El LCP de la home. `sizes` describe la caja real: 100vw
                  // menos el gutter hasta sm, el ancho tope del contenedor
                  // hasta lg y 5/12 de `max-w-7xl` a partir de ahí.
                  sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) 24rem, 42vw"
                  className="rounded-[2rem] object-cover"
                />
              }
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
