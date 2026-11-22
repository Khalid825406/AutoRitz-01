"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HelpCircle, Plus } from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";

import { REVEAL_VIEWPORT } from "@/components/motion/viewport";
export interface Faq {
  q: string;
  a: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** Accordion FAQ — one answer open at a time. */
export default function FaqSection({ items, eyebrow, title }: {
  items: Faq[];
  eyebrow?: string;
  title?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="w-full bg-[#F7FAFD] section-y">
      <div className="site-container grid gap-8 sm:gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.7, ease: EASE }}
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <SectionHeading align="left" eyebrow={eyebrow ?? "FAQ's"} icon={HelpCircle} title={title ?? "Frequently Asked Questions"} />
        </motion.div>

        <ul className="flex flex-col gap-3">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={f.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
                className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
                  isOpen ? "border-[#0563B4]/30 shadow-[0_16px_36px_-18px_rgba(14, 17, 22,0.3)]" : "border-slate-200/80"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0563B4]"
                >
                  <span className="text-[16px] font-semibold text-[#0E1116]">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      isOpen ? "bg-[#0563B4] text-white" : "bg-[#EAF4FC] text-[#0563B4]"
                    }`}
                  >
                    <Plus size={16} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <p className="px-6 pb-6 text-[14px] leading-relaxed text-slate-600">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
