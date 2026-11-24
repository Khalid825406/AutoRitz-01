"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Sparkles, Truck, Wrench, type LucideIcon } from "lucide-react";

import HeroRevealVideo from "./HeroRevealVideo";

interface HeroProps {
  onBook?: (service?: string) => void;
}

const EASE = [0.215, 0.61, 0.355, 1] as const;

/** Right-hand list: icons joined by a dotted line, one item open (auto-advances; click to pick). */
const FEATURES: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Wrench,
    title: "Expert Repairs",
    text: "Engine, brakes, AC, suspension and electrical work by certified technicians, using genuine and OEM parts.",
  },
  {
    icon: Truck,
    title: "Roadside Help",
    text: "Jump starts, flat tyres, fuel delivery and towing anywhere in Dubai — day or night.",
  },
  {
    icon: Sparkles,
    title: "Detailing & Body",
    text: "Polishing, ceramic protection, denting and painting to bring back the showroom finish.",
  },
];

const FEATURE_MS = 5000;

/**
 * Homepage hero, dark showroom layout:
 * - left: large light headline, short line, one white pill button
 * - centre: the car video (front view on a dark podium) at full width behind everything
 * - right: an info card joined to the car by a thin diagonal line, and an icon list joined by a dotted line
 * Solid colours only. Phones/tablets: one column — text, full-width car video, info. Desktop (lg+): the video
 * fills the whole hero behind both columns.
 */
export default function Hero({ onBook }: HeroProps) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setInterval(() => setActive((i) => (i + 1) % FEATURES.length), FEATURE_MS);
    return () => window.clearInterval(t);
  }, [reduce, paused]);

  return (
    // no fade on the whole section: an invisible (opacity 0) hero delays the first meaningful paint
    <section id="home" className="relative isolate overflow-hidden bg-black lg:min-h-[100svh]">
      <div className="site-container flex flex-col gap-8 pb-12 pt-36 sm:pt-40 lg:static lg:min-h-[100svh] lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:pb-12 lg:pt-40">
        {/* ---------- LEFT: headline + button ---------- */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="relative z-20 lg:w-[19vw] lg:min-w-[250px] lg:max-w-[460px]"
        >
          <h1 className="font-display text-[38px] font-bold leading-[1.08] tracking-tight text-white sm:text-[48px] lg:text-[clamp(32px,2.8vw,56px)]">
            Elevate Your Drive to Extraordinary Care
          </h1>
          <p className="mt-4 max-w-[340px] text-[15px] leading-relaxed text-white/70 sm:text-[17px] lg:mt-5 lg:text-[clamp(14px,1vw,17px)]">
            Crafting power, performance and peace of mind for every car in Dubai.
          </p>
          <button
            type="button"
            onClick={() => onBook?.()}
            className="mt-7 inline-flex h-12 min-w-[190px] items-center justify-center rounded-full bg-white px-8 text-[14px] font-medium text-[#0E1116] transition-colors hover:bg-[#D9DEE5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Book a service
          </button>
        </motion.div>

        {/* ---------- CENTRE: car video — full width (phones: 16:9 strip under the text; desktop: the whole hero) ---------- */}
        <div className="relative -mx-[5.6%] aspect-video lg:absolute lg:inset-0 lg:z-10 lg:mx-0 lg:aspect-auto">
          {/* the car (the clip has its own studio light and dark podium) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="absolute inset-0"
          >
            <HeroRevealVideo className="absolute inset-0" />
          </motion.div>
        </div>

        {/* ---------- RIGHT: info card + service list ---------- */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          className="relative z-20 flex flex-col gap-8 max-lg:mx-auto max-lg:w-full max-lg:max-w-md lg:w-[19vw] lg:min-w-[250px] lg:max-w-[380px]"
        >
          <InfoCard />
          <FeatureList active={active} onPick={setActive} onHover={setPaused} />
        </motion.div>
      </div>
    </section>
  );
}

/** Info card, joined to the car by a thin diagonal line on desktop. */
function InfoCard() {
  return (
    <div className="relative rounded-[24px] bg-[#16181C] p-5 xl:p-6">
      <svg
        aria-hidden
        className="pointer-events-none absolute end-full top-[46%] hidden h-[56px] w-[4vw] max-w-[72px] overflow-visible lg:block rtl:-scale-x-100"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="100" y1="0" x2="0" y2="100" stroke="rgba(255,255,255,0.45)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <h3 className="font-display text-[20px] font-semibold leading-none text-white xl:text-[22px]">Free Inspection</h3>
      <p className="mt-3 text-[14px] leading-relaxed text-white/65">
        Every booking includes a multi-point health check, free pick-up &amp; drop-off and an exterior wash at no
        extra cost.
      </p>
      <Link
        href="/complimentary-vehicle-inspection/"
        className="mt-5 inline-flex h-10 min-w-[140px] items-center justify-center rounded-full border border-white/70 px-6 text-[13px] font-semibold text-white transition-colors hover:bg-white hover:text-[#0E1116]"
      >
        View more
      </Link>
    </div>
  );
}

function FeatureList({
  active,
  onPick,
  onHover,
}: {
  active: number;
  onPick: (i: number) => void;
  onHover: (paused: boolean) => void;
}) {
  const feature = FEATURES[active];
  return (
    <div className="flex gap-4" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}>
      <ol className="relative flex shrink-0 flex-col items-center gap-5" aria-label="Our services">
        <span aria-hidden className="absolute inset-y-6 left-1/2 w-0 -translate-x-1/2 border-l border-dashed border-white/35" />
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          const on = i === active;
          return (
            <li key={f.title} className="relative">
              <button
                type="button"
                onClick={() => onPick(i)}
                aria-pressed={on}
                aria-label={f.title}
                className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  on ? "bg-white text-[#0E1116]" : "bg-[#4A4E55] text-white/85 hover:bg-[#5A5F67]"
                }`}
              >
                <Icon size={20} strokeWidth={1.75} />
              </button>
            </li>
          );
        })}
      </ol>

      <div className="min-h-[170px] flex-1 pt-1" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <h3 className="font-display text-[20px] font-semibold leading-[1.1] text-white xl:text-[22px]">{feature.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-white/65">{feature.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
