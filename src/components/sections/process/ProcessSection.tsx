"use client";

import { motion, type Variants } from "motion/react";
import { ArrowUpRight, CalendarCheck, ClipboardCheck, KeyRound, Phone, ShieldCheck, ThumbsUp } from "lucide-react";

import { CONTACT } from "@/config/site";

interface ProcessSectionProps {
  onBook: (service?: string) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const STEPS = [
  { icon: CalendarCheck, title: "Book a service", text: "Call us for booking and free inspection." },
  { icon: KeyRound, title: "Free pick-up", text: "We collect your car from home, office or mall." },
  { icon: ClipboardCheck, title: "Free inspection", text: "We check your concerns plus a general health check." },
  { icon: ThumbsUp, title: "Job approval", text: "You get a fair estimate and approve the work." },
];

export default function ProcessSection({ onBook }: ProcessSectionProps) {
  return (
      <section id="how-it-works" className="w-full scroll-mt-32 bg-white py-20 sm:py-24 lg:py-28">
        <div className="site-container grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          {/* ================= LEFT ================= */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:sticky lg:top-32"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0872BB] shadow-xs">
              <CalendarCheck size={14} />
              Simple service process
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-[#082F59] sm:text-4xl lg:text-5xl">
              Four Easy Steps to
              <span className="block text-[#0872BB]">Better Car Care.</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-slate-600">
              Enjoy a simple and hassle-free car servicing experience. From booking to delivery, we make every step
              smooth, transparent and convenient.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onBook()}
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-linear-to-r from-[#082F59] to-[#1766AE] px-6 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(23,102,174,0.6)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]"
              >
                Book Your Service
                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
              <a
                href={`tel:${CONTACT.phone}`}
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-[#082F59] transition hover:border-[#0872BB] hover:text-[#0872BB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]"
              >
                <Phone size={16} />
                Call Us
              </a>
            </div>

            <div className="mt-8 flex max-w-md items-center gap-4 rounded-2xl bg-linear-to-r from-[#061E3B] to-[#0B477D] p-5 text-white shadow-[0_20px_40px_-16px_rgba(8,47,89,0.5)]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[#7cc0f5]">
                <ShieldCheck size={20} />
              </span>
              <p className="text-sm leading-relaxed text-[#DCE8F2]">
                Simple booking. Professional service.{" "}
                <span className="font-semibold text-white">Complete peace of mind.</span>
              </p>
            </div>
          </motion.div>

          {/* ================= TIMELINE ================= */}
          <ol className="relative">
            {/* vertical line */}
            <span
              aria-hidden
              className="absolute bottom-10 left-6 top-10 w-px bg-linear-to-b from-[#0872BB] via-[#0872BB]/40 to-transparent sm:left-7"
            />
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="relative flex gap-5 pb-6 last:pb-0 sm:gap-8"
              >
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#1766AE] to-[#082F59] text-white shadow-[0_10px_20px_-6px_rgba(23,102,174,0.6)] ring-4 ring-white sm:h-14 sm:w-14">
                  <Icon size={22} strokeWidth={1.8} />
                </span>

                <div className="group relative flex-1 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(8,47,89,0.04)] transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#0872BB]/30 hover:shadow-[0_20px_40px_-16px_rgba(8,47,89,0.18)]">
                  <span className="pointer-events-none absolute right-5 top-3 text-5xl font-bold leading-none text-slate-100 tabular-nums transition-colors group-hover:text-[#EAF4FC]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0872BB]">Step {i + 1}</p>
                  <h3 className="mt-2 text-lg font-semibold text-[#082F59]">{title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">{text}</p>
                  <span className="mt-4 block h-[2px] w-8 bg-[#0872BB] transition-all duration-500 group-hover:w-16" />
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
  );
}
