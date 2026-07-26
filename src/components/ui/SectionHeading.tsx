import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Tag = "h2",
}: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
          <span
            className={cn("rule-gold mb-6 block", align === "center" && "mx-auto")}
          />
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <Tag
          className={cn(
            Tag === "h1"
              ? "text-4xl sm:text-5xl lg:text-6xl"
              : "text-3xl sm:text-4xl",
          )}
        >
          {title}
        </Tag>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
