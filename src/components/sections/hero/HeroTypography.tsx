"use client";

import { useLang } from "@/i18n/LangProvider";
import { motion } from "motion/react";
import { MapPin } from "lucide-react";

const EASE = [0.215, 0.61, 0.355, 1] as const;

export default function HeroTypography() {
  const { t } = useLang();
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
      aria-hidden
    >
      {/* where we are — first thing visitors read: two-part glass badge */}
      <motion.p
        initial={{ opacity: 0, y: -12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="mb-[2.4vw] inline-flex items-center rounded-full bg-linear-to-r from-white/35 via-white/10 to-white/35 p-px shadow-[0_14px_36px_-14px_rgba(0,0,0,0.75)] xl:mb-7"
      >
        <span className="inline-flex items-center gap-2.5 rounded-full bg-[#0E1116]/70 py-1 pl-1 pr-4 backdrop-blur-md sm:gap-3 sm:pr-5">
          {/* location segment */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-b from-[#0B6FC2] to-[#0563B4] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] sm:text-[12px]">
            <MapPin size={13} strokeWidth={2.5} className="shrink-0" />
            {t("Dubai", "دبي")}
          </span>
          {/* live dot + service line */}
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="whitespace-nowrap text-[13px] font-medium tracking-[0.01em] text-white/90 sm:text-[15px]">
            {t("Car Service & Repair Centre", "مركز صيانة وإصلاح السيارات")}
          </span>
        </span>
      </motion.p>
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.25 }}
        className="hero-text hero-title text-[19vw] sm:text-[20vw] lg:text-[21vw] xl:text-[15rem]"
      >
        Ritz Auto
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 60, y: 15 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
        className="hero-sub hero-text -mt-[1.2vw] text-[10vw] sm:text-[9.5vw] lg:text-[8.5vw] xl:text-[8rem]"
      >
        Care LLC
      </motion.div>
      <h1 className="sr-only">{t("Ritz Auto Care LLC — Car Service, Repair & Maintenance in Dubai", "ريتز أوتو كير ذ.م.م — صيانة وإصلاح السيارات في دبي")}</h1>
    </div>
  );
}
