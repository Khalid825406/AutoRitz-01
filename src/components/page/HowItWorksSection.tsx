"use client";

import { motion } from "motion/react";
import { CalendarCheck, Car, ClipboardCheck, KeyRound, ThumbsUp, Wrench } from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";
import { HOW_IT_WORKS } from "@/data/pages/common";

const EASE = [0.22, 1, 0.36, 1] as const;
const ICONS = [CalendarCheck, KeyRound, ClipboardCheck, ThumbsUp, Wrench, Car];

/** "HOW IT WORKS — Easy Steps to Make Your Car Shine" (6 steps, from the original service pages). */
export default function HowItWorksSection() {
  return (
    <section className="w-full bg-[#F7FAFD] py-20 sm:py-24">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionHeading eyebrow="How it works" icon={CalendarCheck} title="Easy Steps to Make" highlight="Your Car Shine." />
        </motion.div>

        <ol className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HOW_IT_WORKS.map((s, i) => {
            const Icon = ICONS[i];
            return (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: EASE, delay: (i % 3) * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#0872BB]/30 hover:shadow-[0_20px_40px_-18px_rgba(8,47,89,0.25)]"
              >
                <span className="pointer-events-none absolute right-6 top-5 text-5xl font-bold leading-none text-slate-100 tabular-nums transition-colors group-hover:text-[#EAF4FC]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-[#1766AE] to-[#082F59] text-white shadow-[0_10px_20px_-8px_rgba(23,102,174,0.6)]">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <p className="relative mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0872BB]">Step {i + 1}</p>
                <h3 className="relative mt-1.5 text-lg font-semibold text-[#082F59]">{s.title}</h3>
                <p className="relative mt-2 text-[15px] leading-relaxed text-slate-600">{s.text}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
