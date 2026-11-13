"use client";

import { motion } from "motion/react";

const EASE = [0.215, 0.61, 0.355, 1] as const;

export default function HeroTypography() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
      aria-hidden
    >
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.25 }}
        className="hero-text hero-title text-[27vw] sm:text-[24vw] lg:text-[21vw] xl:text-[15rem]"
      >
        Ritz Auto
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 60, y: 15 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
        className="hero-sub hero-text -mt-[1.2vw] text-[12vw] sm:text-[10vw] lg:text-[8.5vw] xl:text-[8rem]"
      >
        Care LLC
      </motion.div>
      <h1 className="sr-only">Ritz Auto Care LLC</h1>
    </div>
  );
}
