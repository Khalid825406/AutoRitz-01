"use client";

import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";

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
  "linear-gradient(135deg, #07090C 0%, #1B2029 100%)",
  "linear-gradient(135deg, #0E1116 0%, #0B6FC2 100%)",
  "linear-gradient(135deg, #151A22 0%, #0563B4 100%)",
  "linear-gradient(135deg, #07090C 0%, #12528F 100%)",
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
  // phones: progress through the stacked cards (used to shrink the cards that are already covered)
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stackProgress } = useScroll({ target: listRef, offset: ["start start", "end end"] });
  const rail = useSpring(scrollYProgress, { stiffness: 180, damping: 30 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const n = content.length;
    const idx = Math.min(n - 1, Math.max(0, Math.floor(latest * n)));
    setActive((cur) => (cur === idx ? cur : idx));
  });

  return (
    <div ref={ref} className={`relative grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 ${className}`}>
      {/* text column with progress rail */}
      <div ref={listRef} className="relative lg:pl-14">
        <div aria-hidden className="absolute bottom-[25vh] left-[19px] top-[25vh] hidden w-[2px] rounded-full bg-slate-200 lg:block">
          <motion.div style={{ scaleY: rail }} className="h-full w-full origin-top rounded-full bg-linear-to-b from-[#0563B4] to-[#3FA9F5]" />
        </div>

        {content.map((item, i) => {
          const isActive = i === active;
          const done = i < active;
          return (
            <StackCard key={item.title} index={i} total={content.length} progress={stackProgress}>
              {/* rail dot */}
              <span
                aria-hidden
                className={`absolute -left-14 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 text-xs font-bold tabular-nums transition-all duration-300 lg:flex ${
                  isActive
                    ? "scale-110 border-[#0563B4] bg-[#0563B4] text-white shadow-[0_0_0_6px_rgba(5, 99, 180,0.15)]"
                    : done
                      ? "border-[#0563B4] bg-white text-[#0563B4]"
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
                <h3 className="mt-2.5 text-2xl font-bold tracking-tight text-[#0E1116] sm:text-[28px] lg:mt-3">{item.title}</h3>
                <div className="mt-2 max-w-md text-[14px] leading-normal text-slate-600 lg:mt-3 lg:text-[15px] lg:leading-relaxed">{item.description}</div>
                {item.footer}
              </motion.div>

              {/* mobile: panel content inline, on top of the card */}
              <div
                className="relative order-first mb-4 aspect-[16/9] overflow-hidden rounded-2xl lg:hidden"
                style={{ background: backgrounds[i % backgrounds.length] }}
              >
                {item.content}
              </div>
            </StackCard>
          );
        })}
      </div>

      {/* sticky panel (desktop) */}
      <div className="hidden lg:block">
        <div className="sticky top-[max(10rem,calc(50vh-16rem))] py-10">
          <motion.div
            animate={{ background: backgrounds[active % backgrounds.length] }}
            transition={{ duration: 0.6 }}
            className="relative h-[32rem] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(14, 17, 22,0.55)] ring-1 ring-[#0E1116]/10"
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
            <div className="absolute right-6 top-6 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-bold tabular-nums text-[#0E1116] shadow-sm">
              {String(active + 1).padStart(2, "0")} <span className="text-slate-400">/ {String(content.length).padStart(2, "0")}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/**
 * One service. Desktop: a plain row next to the progress rail. Phones/tablets (< lg): a card that sticks
 * under the header while the next card slides up over it (a "card stack"); covered cards shrink a little.
 * On short screens (< 700 px tall) the cards don't stick, so every card's button stays reachable.
 */
function StackCard({
  index,
  total,
  progress,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  children: ReactNode;
}) {
  // shrink from 1 to ~0.94 for the first card, less for later ones, as the cards after it pile on
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - 1 - index) * 0.012]);
  return (
    <motion.div
      style={{ "--stack-scale": scale, "--stack-top": `${84 + index * 14}px` } as React.CSSProperties}
      className="relative flex flex-col justify-center py-3 lg:min-h-[50vh] lg:py-12 max-lg:mb-5 max-lg:origin-top max-lg:rounded-3xl max-lg:border max-lg:border-slate-200/80 max-lg:bg-white max-lg:p-4 max-lg:shadow-[0_-8px_30px_-12px_rgba(14,17,22,0.18),0_18px_40px_-24px_rgba(14,17,22,0.35)] max-lg:[scale:var(--stack-scale)] max-lg:[@media(min-height:700px)]:sticky max-lg:[@media(min-height:700px)]:top-[var(--stack-top)] sm:max-lg:p-6"
    >
      {children}
    </motion.div>
  );
}
