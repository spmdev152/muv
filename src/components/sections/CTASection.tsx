import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { BookingButton } from "@/components/BookingButton";
import { Button } from "@/components/ui/Button";

type Props = {
  title?: string;
  description?: string;
};

export function CTASection({
  title = "Tu recuperación empieza con una primera cita",
  description = "Reserva una valoración inicial y diseñaremos contigo un plan de tratamiento personalizado.",
}: Props) {
  return (
    <section className="relative overflow-hidden bg-olive-500 py-20 md:py-28">
      <div className="grain" aria-hidden="true" />
      {/* Decorative organic shape */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-olive-400/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-gold-500/20 blur-3xl"
      />
      <Container className="relative text-center">
        <Reveal>
          <span className="rule-gold mx-auto mb-6 block" />
          <h2 className="mx-auto max-w-2xl text-3xl text-cream sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-cream/80">
            {description}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <BookingButton variant="cream" size="lg" />
            <Button href="/contacto" variant="outlineLight" size="lg">
              Contactar
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
