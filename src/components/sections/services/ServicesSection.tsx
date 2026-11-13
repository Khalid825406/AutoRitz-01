"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, BadgeCheck, Clock3, ShieldCheck } from "lucide-react";

import { SERVICE_GROUPS, services, type ServiceGroup } from "@/data/services";
import ServiceCard from "./ServiceCard";

interface ServicesSectionProps {
  onBook: (service?: string) => void;
}

type Tab = "All" | ServiceGroup;

const TABS: Tab[] = ["All", ...SERVICE_GROUPS];
const EASE = [0.22, 1, 0.36, 1] as const;

const TRUST = [
  { icon: BadgeCheck, label: "Certified technicians" },
  { icon: ShieldCheck, label: "Quality parts" },
  { icon: Clock3, label: "Roadside support" },
];

export default function ServicesSection({ onBook }: ServicesSectionProps) {
  const [tab, setTab] = useState<Tab>("All");

  const visible = useMemo(
    () => (tab === "All" ? services : services.filter((s) => s.group === tab)),
    [tab],
  );

  const countFor = (t: Tab) => (t === "All" ? services.length : services.filter((s) => s.group === t).length);

  return (
      <section id="services" className="relative w-full scroll-mt-32 overflow-hidden bg-[#F7FAFD] py-20 sm:py-24 lg:py-28">
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

          {/* ============ TABS ============ */}
          <div className="mt-12 border-b border-slate-200">
            <div
              role="tablist"
              aria-label="Service categories"
              className="-mb-px flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {TABS.map((t) => {
                const active = t === tab;
                return (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t)}
                    className={`relative flex shrink-0 items-center gap-2 whitespace-nowrap px-4 py-3.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0872BB] ${
                      active ? "text-[#082F59]" : "text-slate-500 hover:text-[#082F59]"
                    }`}
                  >
                    {t === "All" ? "All services" : t}
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] tabular-nums ${
                        active ? "bg-[#0872BB] text-white" : "bg-slate-200/70 text-slate-600"
                      }`}
                    >
                      {countFor(t)}
                    </span>
                    {active && (
                      <motion.span
                        layoutId="services-tab-underline"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                        className="absolute inset-x-0 bottom-0 h-[2px] bg-[#0872BB]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ============ GRID ============ */}
          <motion.div layout className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} onBook={onBook} />
              ))}
            </AnimatePresence>
          </motion.div>

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
