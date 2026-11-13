"use client";

import { motion, type Variants } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Car,
  Check,
  ClipboardCheck,
  Droplets,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";

interface BenefitsSectionProps {
  onBook: (service?: string) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const BENEFITS = [
  { icon: Truck, title: "Free Pick-up & Drop-off", text: "Convenient vehicle collection and delivery from your home or office." },
  { icon: ShieldCheck, title: "Free General Inspection", text: "A detailed multi-point check to help identify potential vehicle issues." },
  { icon: Droplets, title: "Free Exterior Car Wash", text: "A fresh, clean finish with every service booking." },
];

const JOURNEY = [
  { icon: Truck, title: "We collect your car", text: "From your home or workplace" },
  { icon: ClipboardCheck, title: "We inspect your vehicle", text: "General health check included" },
  { icon: Droplets, title: "We clean your car", text: "Complimentary exterior wash" },
  { icon: Car, title: "We deliver it back", text: "Right to your doorstep" },
];

export default function BenefitsSection({ onBook }: BenefitsSectionProps) {
  return (
      <section id="benefits" className="w-full scroll-mt-32 bg-[#F7FAFD] py-20 sm:py-24 lg:py-28">
        <div className="site-container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <SectionHeading
              eyebrow="Exclusive benefits"
              icon={Sparkles}
              title="More care."
              highlight="Zero extra cost."
              description="Every booking comes with complimentary services designed to make your car maintenance effortless."
            />
          </motion.div>

          {/* ============ BENEFIT CARDS ============ */}
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {BENEFITS.map(({ icon: Icon, title, text }, i) => (
              <motion.li
                key={title}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-[0_1px_2px_rgba(8,47,89,0.04)] transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#0872BB]/30 hover:shadow-[0_24px_48px_-12px_rgba(8,47,89,0.18)]"
              >
                <span className="pointer-events-none absolute right-6 top-5 text-5xl font-bold leading-none text-slate-100 tabular-nums transition-colors group-hover:text-[#EAF4FC]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#1766AE] to-[#082F59] text-white shadow-[0_10px_20px_-6px_rgba(23,102,174,0.6)]">
                  <Icon size={24} strokeWidth={1.8} />
                </span>
                <span className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-[#0872BB]/20 bg-[#EAF4FC] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0872BB]">
                  <Check size={12} strokeWidth={3} />
                  Complimentary
                </span>
                <h3 className="mt-4 text-lg font-semibold text-[#082F59]">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{text}</p>
                <span className="mt-6 block h-[2px] w-8 bg-[#0872BB] transition-all duration-500 group-hover:w-16" />
              </motion.li>
            ))}
          </motion.ul>

          {/* ============ PACKAGE PANEL ============ */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="relative isolate mt-8 overflow-hidden rounded-3xl bg-linear-to-br from-[#0b1424] via-[#0d1b30] to-[#0B2F55] p-6 shadow-[0_30px_60px_-20px_rgba(8,47,89,0.55)] sm:p-10 lg:p-12"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[#1766AE]/30 blur-3xl" />

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4B9DE0]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[#7cc0f5]">
                    <Award size={18} />
                  </span>
                  Ritz Auto Care · Your benefits package
                </p>
                <h3 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
                  How We Care <span className="text-[#4B9DE0]">For Your Car</span>
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#DCE8F2]/80">
                  Added care with your service booking. Premium care, every time. Your convenience is our priority.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onBook()}
                  className="group inline-flex h-12 items-center gap-2 rounded-xl bg-linear-to-r from-[#1766AE] to-[#2f8fe0] px-6 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(47,143,224,0.7)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Phone size={16} />
                  Book Your Service
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="#services"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 px-6 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Explore Services
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            {/* journey */}
            <ol className="relative mt-12 grid grid-cols-2 gap-y-10 md:grid-cols-4">
              <span
                aria-hidden
                className="absolute left-[12.5%] right-[12.5%] top-7 hidden border-t border-dashed border-white/20 md:block"
              />
              {JOURNEY.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className="relative flex flex-col items-center px-2 text-center">
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-[#1766AE] to-[#0B477D] text-white shadow-[0_0_0_6px_rgba(23,102,174,0.15)]">
                    <Icon size={22} strokeWidth={1.8} />
                    <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#082F59]">
                      {i + 1}
                    </span>
                  </span>
                  <p className="mt-5 text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1 text-xs text-[#DCE8F2]/70">{text}</p>
                  <p className="mt-3 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4B9DE0]">
                    <Check size={12} strokeWidth={3} />
                    Included
                  </p>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>
  );
}
