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

- `src/app/**` — rutas (home, servicios, sedes, profesionales, blog, contacto, etc.). `/servicios/<servicio>` y `/dolencias-y-lesiones/*` se retiraron con 301 (`next.config.ts`, #31)
- `src/components/**` — sistema de diseño (layout, cards, sections, ui, motion, seo, mdx)
- `src/lib/site.ts` — marca, URL base y navegación
- `src/lib/sedes.ts` — **datos reales de las dos sedes** (dirección, teléfono, horario, Doctoralia, geo)
- `src/lib/seo.ts` — `buildMetadata` + constructores JSON-LD
- `content/**` — contenido MDX (profesionales, blog; de `services` y `conditions` solo se usan las imágenes de la home)
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

## Formulario de empleo

`/contacto#trabaje-con-nosotros` recibe candidaturas: clínica, puesto y CV (PDF o Word, hasta 5 MB).
Una server action (`src/app/contacto/actions.ts`) las envía por email con `nodemailer`; el CV va
adjunto y no se guarda en el servidor.

| Variable | Uso |
|---|---|
| `SMTP_URL` | Servidor SMTP como URL, p. ej. `smtps://info%40clinicamuv.com:<contraseña>@mail.clinicamuv.com:465` |
| `EMAIL_FROM` | Remitente; tiene que ser el buzón con el que se autentica `SMTP_URL`. Por defecto `Web MUV <info@clinicamuv.com>` |
| `CAREERS_EMAIL` | Destino de las candidaturas. Por defecto `info@clinicamuv.com` |
| `MAIL_OUTBOX` | Carpeta donde se guardan los emails como `.eml` cuando no hay `SMTP_URL` (también con `npm run start`) |

Sin `SMTP_URL`, `npm run dev` guarda cada email en `.mail/`; en producción el formulario avisa de que
no está disponible y remite a `info@clinicamuv.com`. Las variables van en `.env.local` en local y como
variables de entorno de ejecución en el servidor; nunca en el repositorio.

## Pendiente / próximas fases

Copy y SEO definitivos, integración de CMS headless (opcional), analítica y consentimiento de
cookies.
