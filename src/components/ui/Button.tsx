import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "cream" | "outline" | "outlineLight" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-olive-500 text-cream hover:bg-olive-700 hover:shadow-lg hover:shadow-olive-900/15 hover:-translate-y-0.5",
  // Solid light CTA for dark (olive) backgrounds.
  cream:
    "bg-cream text-olive-800 hover:bg-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-olive-900/25",
  outline:
    "border border-olive-500/40 text-olive-700 hover:border-olive-500 hover:bg-olive-500 hover:text-cream",
  // For use on dark (olive) backgrounds. Cream border and text stay legible.
  outlineLight:
    "border border-cream/70 text-cream hover:bg-cream hover:text-olive-700 hover:border-cream",
  ghost: "text-olive-700 hover:text-gold-700",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  external,
  ...props
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
