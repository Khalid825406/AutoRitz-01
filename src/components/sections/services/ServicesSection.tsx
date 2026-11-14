"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, BadgeCheck, Check, Clock3, ShieldCheck } from "lucide-react";

import { StickyScroll, type StickyScrollItem } from "@/components/ui/sticky-scroll-reveal";
import { services } from "@/data/services";

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
        <p className="inline-flex items-center gap-2 rounded-full bg-[#EAF4FC] py-1 pl-1 pr-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0872BB]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0872BB] shadow-xs">
            <Icon size={15} strokeWidth={2} />
          </span>
          {s.category}
        </p>
      ),
      description: s.description,
      footer: (
        <>
          <ul className="mt-5 flex flex-wrap gap-2">
            {s.features.map((f) => (
              <li
                key={f}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[13px] font-medium text-[#082F59]"
              >
                <Check size={13} strokeWidth={3} className="text-[#0872BB]" />
                {f}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => onBook(s.title)}
            className="group mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-[#082F59] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0872BB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]"
          >
            Book this service
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </>
      ),
      content: (
        <>
          <Image src={s.image} alt={s.title} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-[#061E3B]/95 via-[#061E3B]/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-white">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25 backdrop-blur">
              <Icon size={22} strokeWidth={1.8} />
            </span>
            <p className="mt-4 text-[28px] font-bold leading-tight">{s.title}</p>
            <p className="mt-2 max-w-md text-[15px] text-white/80">{s.description}</p>
          </div>
        </>
      ),
    };
  });

  return (
      <section id="services" className="relative w-full scroll-mt-32 overflow-clip bg-[#F7FAFD] py-20 sm:py-24 lg:py-28">
        {/* subtle background accent */}
        <div className="pointer-events-none absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full bg-[#0872BB]/[0.06] blur-3xl" />

        <div className="site-container relative">
          {/* ============ HEADER ============ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end"
          >
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0872BB]">
                <span className="h-px w-8 bg-[#0872BB]" />
                Our services
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-[#082F59] sm:text-4xl lg:text-5xl">
                Everything your car needs, <span className="text-[#0872BB]">under one roof</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                From routine maintenance to emergency roadside support, our certified technicians keep your
                vehicle safe, reliable and ready for the road.
              </p>
            </div>

            <div className="flex flex-col gap-5 lg:items-end">
              <ul className="flex flex-wrap gap-x-6 gap-y-3 lg:justify-end">
                {TRUST.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2 text-sm font-medium text-[#082F59]">
                    <Icon size={18} className="text-[#0872BB]" />
                    {label}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onBook()}
                className="group inline-flex h-12 w-fit items-center gap-2.5 rounded-full bg-[#0872BB] px-7 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(8,114,187,0.6)] transition-colors duration-300 hover:bg-[#082F59] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]"
              >
                Get a free quote
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* ============ STICKY SCROLL ============ */}
          <StickyScroll content={items} className="mt-10 lg:mt-14" />

          {/* ============ BOTTOM CTA ============ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-14 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl bg-linear-to-r from-[#082F59] to-[#0B477D] px-6 py-8 text-white sm:flex-row sm:items-center sm:px-10"
          >
            <div>
              <p className="text-xl font-semibold">Not sure which service you need?</p>
              <p className="mt-1.5 text-[15px] text-[#DCE8F2]">
                Book a free vehicle inspection and we will recommend what your car actually needs.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onBook("Free Inspection")}
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-[#082F59] transition-colors duration-300 hover:bg-[#DCE8F2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book a free inspection
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>
  );
}
