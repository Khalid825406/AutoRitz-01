"use client";

import { motion } from "motion/react";
import { Phone } from "lucide-react";

import { CONTACT } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Floating "Call Advisor" button (bottom-right, every page): the waving Ritz advisor
 * stands above a "Call Advisor" pill and a red call button. Tapping anywhere dials the toll-free number.
 */
export default function CallAdvisor() {
  return (
    <motion.a
      href={`tel:${CONTACT.phone}`}
      aria-label={`Call an advisor on ${CONTACT.phone}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 1.2 }}
      className="group fixed right-3 z-[9990] flex flex-col items-end focus-visible:outline-none sm:right-6"
      style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      {/* waving advisor (animated, transparent) */}
      {/* eslint-disable-next-line @next/next/no-img-element -- animated WebP must not be re-encoded by next/image */}
      <img
        src="/images/advisor/advisor.webp"
        alt=""
        width={240}
        height={240}
        loading="eager"
        decoding="async"
        className="pointer-events-none -mb-3 mr-[-6px] h-auto w-[84px] drop-shadow-[0_10px_14px_rgba(8,47,89,0.25)] transition-transform duration-300 group-hover:-translate-y-1 sm:-mb-4 sm:mr-[-10px] sm:w-[112px]"
      />

      <span className="relative flex items-center">
        {/* label pill — tucked under the button like a speech bubble */}
        <span className="-mr-4 rounded-full bg-white py-2 pl-4 pr-7 text-[15px] font-medium text-[#1f2937] shadow-[0_6px_20px_rgba(15,23,42,0.18)] ring-1 ring-black/5 transition-colors group-hover:text-[#E10600] sm:py-2.5 sm:pl-5 sm:pr-8 sm:text-[17px]">
          Call Advisor
        </span>

        {/* red call button with a soft pulse */}
        <span className="relative flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16">
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-[#FF1A1A]"
            animate={{ scale: [1, 1.45], opacity: [0.45, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <span className="relative flex h-full w-full items-center justify-center rounded-full bg-[#FF0000] text-white shadow-[0_10px_24px_-6px_rgba(255,0,0,0.55)] ring-4 ring-white transition-transform duration-300 group-hover:scale-105 group-focus-visible:ring-[#0872BB]">
            <Phone size={26} fill="currentColor" strokeWidth={0} className="sm:size-[30px]" />
          </span>
        </span>
      </span>
    </motion.a>
  );
}
