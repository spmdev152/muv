# MUV — Web de la clínica de fisioterapia

Rediseño de la web de [Clínica MUV](https://clinicamuv.com) con Next.js (App Router),
enfocado en una estética elegante y minimalista y en el **SEO local de las dos sedes**
(El Cañaveral y Tres Cantos).

## Stack

- **Next.js 16** (App Router, TypeScript, SSR/SSG) · **React 19**
- **Tailwind CSS v4** (tokens de diseño en `src/app/globals.css` con `@theme`)
- **Motion** (Framer Motion) para micro-animaciones — respeta `prefers-reduced-motion`
- **MDX** para contenido editorial (`next-mdx-remote`, `gray-matter`)
- Tipografías: **Fraunces** (display) + **Hanken Grotesk** (cuerpo) vía `next/font`

## Comandos

```bash
npm run dev      # desarrollo
npm run build    # build de producción (prerenderiza todas las rutas)
npm run start    # servir el build
node scripts/process-images.mjs <dir>   # HEIC/JPG -> WebP en /public/img
node scripts/seed-content.mjs            # regenerar el MDX de ejemplo
node scripts/shot.mjs <url> <prefijo>    # capturas por secciones (QA visual)
```

## Estructura

- `src/app/**` — rutas (home, servicios, dolencias-y-lesiones, sedes, profesionales, blog, contacto, etc.)
- `src/components/**` — sistema de diseño (layout, cards, sections, ui, motion, seo, mdx)
- `src/lib/site.ts` — marca, URL base y navegación
- `src/lib/sedes.ts` — **datos reales de las dos sedes** (dirección, teléfono, horario, Doctoralia, geo)
- `src/lib/seo.ts` — `buildMetadata` + constructores JSON-LD
- `content/**` — contenido MDX (servicios, dolencias, profesionales, blog)
- `public/img/**` — fotos reales de la clínica (convertidas a WebP)

## Contenido (para el equipo de SEO)

Cada pieza es un archivo `.mdx` en `content/<colección>/` con frontmatter
(`title`, `description`, `excerpt`, `image`, `order`, `featured`, `faqs`, …) seguido del cuerpo
en Markdown. Editar o añadir archivos crea/actualiza páginas automáticamente; el `sitemap.xml`
y los metadatos se generan a partir de ellos.

> **Nota:** los textos actuales son de ejemplo (placeholder) y deben sustituirse por el copy definitivo.

## SEO

- Metadata dinámica por ruta con canonical, Open Graph y Twitter Card.
- JSON-LD: `MedicalOrganization`, `MedicalClinic` por sede (con `address`/`geo`/`openingHours`),
  `MedicalProcedure`, `FAQPage`, `Person`, `BlogPosting`, `BreadcrumbList`.
- `sitemap.xml`, `robots.txt` y `opengraph-image` generados automáticamente.
- La URL base se define en `src/lib/site.ts` (`site.url`) — actualizar al dominio final.

## Pendiente / próximas fases

Copy y SEO definitivos, integración de CMS headless (opcional), analítica y consentimiento de
cookies, y backend real del formulario de contacto (ahora compone un `mailto`).
