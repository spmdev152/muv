"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type As = "div" | "section" | "li" | "article" | "span";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds to stagger reveals. */
  delay?: number;
  y?: number;
  as?: As;
};

const MAP = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  article: motion.article,
  span: motion.span,
} as const;

/**
 * Reveals its content with a soft offset as it enters the viewport.
 * Respects prefers-reduced-motion (instant appearance, no movement).
 */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: Props) {
  const reduce = useReducedMotion();
  // Cast to a concrete component: prevents the union type from inferring children as never.
  const MotionTag = MAP[as] as typeof motion.div;

  if (reduce) {
    return <MotionTag className={cn(className)}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
