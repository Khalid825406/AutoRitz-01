"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, BadgeCheck, Check, Clock3, ShieldCheck } from "lucide-react";

import { StickyScroll, type StickyScrollItem } from "@/components/ui/sticky-scroll-reveal";
import { services } from "@/data/services";

import TextReveal from "@/components/motion/TextReveal";
import { REVEAL_VIEWPORT } from "@/components/motion/viewport";
interface ServicesSectionProps {
  onBook: (service?: string) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const TRUST = [
  { icon: BadgeCheck, label: "Certified technicians" },
  { icon: ShieldCheck, label: "Quality parts" },
  { icon: Clock3, label: "Roadside support" },
];

export default function ServicesSection({ onBook }: ServicesSectionProps) {
  const items: StickyScrollItem[] = services.map((s) => {
    const Icon = s.icon;
    return {
      title: s.title,
      eyebrow: (
        <p className="inline-flex items-center gap-2 rounded-full bg-[#EAF4FC] py-1 pl-1 pr-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0563B4]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0563B4] shadow-xs">
            <Icon size={15} strokeWidth={2} />
          </span>
          {s.category}
        </p>
      ),
      description: s.description,
      footer: (
        <>
          <ul className="mt-3.5 flex flex-wrap gap-1.5 lg:mt-5 lg:gap-2">
            {s.features.map((f) => (
              <li
                key={f}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[12px] font-medium text-[#0E1116] lg:px-3 lg:py-1.5 lg:text-[13px]"
              >
                <Check size={13} strokeWidth={3} className="text-[#0563B4]" />
                {f}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => onBook(s.title)}
            className="group mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-[#0E1116] px-5 text-sm lg:mt-7 lg:h-11 lg:px-6 font-semibold text-white transition-colors hover:bg-[#0563B4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0563B4]"
          >
            Book this service
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </>
      ),
      content: (
        <>
          <Image src={s.image} alt={s.title} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
          <div className="absolute inset-0 bg-[#07090C]/55" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-white">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25">
              <Icon size={22} strokeWidth={1.8} />
            </span>
            {/* title + text are already shown next to the photo on mobile — show them on the card only on desktop */}
            <p className="mt-4 text-[28px] font-bold leading-tight max-lg:hidden">{s.title}</p>
            <p className="mt-2 max-w-md text-[14px] text-white/80 max-lg:hidden">{s.description}</p>
          </div>
        </>
      ),
    };
  });

  return (
      <section id="services" className="relative w-full scroll-mt-32 overflow-clip bg-[#F7FAFD] section-y">
        {/* subtle background accent */}

        <div className="site-container relative">
          {/* ============ HEADER ============ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
            className="grid gap-8 sm:gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end"
          >
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0563B4]">
                <span className="h-px w-8 bg-[#0563B4]" />
                Our services
              </p>
              <TextReveal className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-[#0E1116] sm:text-4xl lg:text-5xl">
                Everything your car needs, <span className="text-[#0563B4]">under one roof</span>
              </TextReveal>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
                From routine maintenance to emergency roadside support, our certified technicians keep your vehicle safe, reliable and ready for Dubai&apos;s roads.
              </p>
            </div>

            <div className="flex flex-col gap-5 lg:items-end">
              <ul className="flex flex-wrap gap-x-6 gap-y-3 lg:justify-end">
                {TRUST.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2 text-sm font-medium text-[#0E1116]">
                    <Icon size={18} className="text-[#0563B4]" />
                    {label}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onBook()}
                className="group inline-flex h-12 w-fit items-center gap-2.5 rounded-full bg-[#0563B4] px-7 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(5, 99, 180,0.6)] transition-colors duration-300 hover:bg-[#0E1116] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0563B4]"
              >
                Get a free quote
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* ============ STICKY SCROLL ============ */}
          <StickyScroll content={items} className="mt-8 sm:mt-10 lg:mt-14" />
        </div>
      </section>
  );
}
