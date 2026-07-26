/**
 * Inserta un bloque JSON-LD. Server component.
 * El contenido es de confianza (lo generamos nosotros), no entrada de usuario.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
