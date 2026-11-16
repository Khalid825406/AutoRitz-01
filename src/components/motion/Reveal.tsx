"use client";

import { useRef, type ReactNode } from "react";
import { motion, type Variants } from "motion/react";

import { useRevealed } from "./useRevealed";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Variants for a list whose children use `revealItem` — they appear one after another. */
export const revealStagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

/** Fade + slide up, for cards and text blocks. */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Fade + slide up a block when it scrolls into view (once). */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 32,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const revealed = useRevealed(ref);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
