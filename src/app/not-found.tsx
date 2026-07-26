import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 text-5xl sm:text-6xl">Página no encontrada</h1>
      <p className="mt-5 max-w-md text-lg text-ink-soft">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button href="/">Volver al inicio</Button>
        <Button href="/servicios" variant="outline">
          Ver servicios
        </Button>
      </div>
    </Container>
  );
}
