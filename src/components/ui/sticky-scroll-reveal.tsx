"use client";

import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";

export interface StickyScrollItem {
  title: string;
  description: ReactNode;
  /** Shown in the sticky panel while this item is active (and inline on mobile). */
  content: ReactNode;
  /** Optional small label above the title. */
  eyebrow?: ReactNode;
  /** Optional extra content under the description (lists, buttons…). */
  footer?: ReactNode;
}

interface StickyScrollProps {
  content: StickyScrollItem[];
  /** Background of the sticky panel per item (cycled). */
  backgrounds?: string[];
  className?: string;
}

const DEFAULT_BACKGROUNDS = [
  "linear-gradient(135deg, #061E3B 0%, #0B477D 100%)",
  "linear-gradient(135deg, #082F59 0%, #1766AE 100%)",
  "linear-gradient(135deg, #0B2F55 0%, #0872BB 100%)",
  "linear-gradient(135deg, #061E3B 0%, #12528F 100%)",
];

/**
 * Sticky scroll reveal (inspired by Aceternity UI) driven by the page scroll:
 * text items scroll on the left along a progress rail, the panel on the right stays put
 * and swaps its content for whichever item is in the middle of the screen.
 */
export function StickyScroll({ content, backgrounds = DEFAULT_BACKGROUNDS, className = "" }: StickyScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const rail = useSpring(scrollYProgress, { stiffness: 180, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const n = content.length;
    const idx = Math.min(n - 1, Math.max(0, Math.floor(latest * n)));
    setActive((cur) => (cur === idx ? cur : idx));
  });

  return (
    <div ref={ref} className={`relative grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 ${className}`}>
      {/* text column with progress rail */}
      <div className="relative lg:pl-14">
        <div aria-hidden className="absolute bottom-[25vh] left-[19px] top-[25vh] hidden w-[2px] rounded-full bg-slate-200 lg:block">
          <motion.div style={{ scaleY: rail }} className="h-full w-full origin-top rounded-full bg-linear-to-b from-[#0872BB] to-[#3FA9F5]" />
        </div>

        {content.map((item, i) => {
          const isActive = i === active;
          const done = i < active;
          return (
            <div key={item.title} className="relative flex flex-col justify-center py-10 lg:min-h-[50vh] lg:py-12">
              {/* rail dot */}
              <span
                aria-hidden
                className={`absolute -left-14 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 text-xs font-bold tabular-nums transition-all duration-300 lg:flex ${
                  isActive
                    ? "scale-110 border-[#0872BB] bg-[#0872BB] text-white shadow-[0_0_0_6px_rgba(8,114,187,0.15)]"
                    : done
                      ? "border-[#0872BB] bg-white text-[#0872BB]"
                      : "border-slate-200 bg-white text-slate-400"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <motion.div
                animate={{ opacity: isActive ? 1 : 0.35, x: isActive ? 0 : -6 }}
                transition={{ duration: 0.4 }}
                className="max-lg:!translate-x-0 max-lg:!opacity-100"
              >
                {item.eyebrow}
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#082F59] sm:text-[28px]">{item.title}</h3>
                <div className="mt-3 max-w-md text-[16px] leading-relaxed text-slate-600">{item.description}</div>
                {item.footer}
              </motion.div>

              {/* mobile: panel content inline */}
              <div
                className="relative mt-6 aspect-[16/11] overflow-hidden rounded-3xl lg:hidden"
                style={{ background: backgrounds[i % backgrounds.length] }}
              >
                {item.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* sticky panel (desktop) */}
      <div className="hidden lg:block">
        <div className="sticky top-[max(10rem,calc(50vh-16rem))] py-10">
          <motion.div
            animate={{ background: backgrounds[active % backgrounds.length] }}
            transition={{ duration: 0.6 }}
            className="relative h-[32rem] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(8,47,89,0.55)] ring-1 ring-[#082F59]/10"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {content[active]?.content}
              </motion.div>
            </AnimatePresence>

            {/* counter */}
            <div className="absolute right-6 top-6 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-bold tabular-nums text-[#082F59] shadow-sm backdrop-blur">
              {String(active + 1).padStart(2, "0")} <span className="text-slate-400">/ {String(content.length).padStart(2, "0")}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
