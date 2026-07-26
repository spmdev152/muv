import { Quote } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";

export type Testimonial = { quote: string; author: string; detail: string };

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((t, i) => (
        <Reveal key={i} delay={i * 0.08} as="article">
          <figure className="flex h-full flex-col rounded-3xl border border-olive-900/10 bg-white p-8">
            <Quote className="h-7 w-7 text-gold-500" />
            <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-olive-800">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 border-t border-olive-900/10 pt-4">
              <p className="font-medium text-olive-700">{t.author}</p>
              <p className="text-sm text-ink-soft">{t.detail}</p>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
