"use client";

import { motion } from "motion/react";
import { MapPin } from "lucide-react";

const EASE = [0.215, 0.61, 0.355, 1] as const;

export default function HeroTypography() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
      aria-hidden
    >
      {/* where we are — first thing visitors read: a clean eyebrow line (no pill, no blinking dot) */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="mb-[2.4vw] flex items-center gap-3 px-4 sm:gap-4 xl:mb-7"
      >
        <span className="hidden h-px w-10 bg-white/40 sm:block lg:w-16" />
        <span className="inline-flex items-center gap-2 whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/85 sm:gap-2.5 sm:text-[13px] sm:tracking-[0.3em] rtl:tracking-normal">
          <MapPin size={14} strokeWidth={2.25} className="shrink-0 text-[#4B9DE0]" />
          Car Service & Repair Centre
          <span className="h-1 w-1 shrink-0 rounded-full bg-[#4B9DE0]" />
          <span className="font-bold text-white">Dubai</span>
        </span>
        <span className="hidden h-px w-10 bg-white/40 sm:block lg:w-16" />
      </motion.p>
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.25 }}
        className="notranslate hero-text hero-title text-[19vw] sm:text-[20vw] lg:text-[21vw] xl:text-[15rem]"
      >
        Ritz Auto
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 60, y: 15 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
        className="notranslate hero-sub hero-text -mt-[1.2vw] text-[10vw] sm:text-[9.5vw] lg:text-[8.5vw] xl:text-[8rem]"
      >
        Care LLC
      </motion.div>
      <h1 className="sr-only">Ritz Auto Care LLC — Car Service, Repair & Maintenance in Dubai</h1>
    </div>
  );
}
