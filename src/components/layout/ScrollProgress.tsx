"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin logo-blue bar along the top edge showing how far down the page the visitor is. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 32, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[10003] h-[3px] origin-left bg-linear-to-r from-[#0563B4] via-[#3FA9F5] to-[#C9CED4]"
    />
  );
}
