"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
  /** Position in the visible list — used to stagger the entrance animation. */
  index?: number;
  onBook: (service?: string) => void;
  /** Forwarded so AnimatePresence (popLayout) can measure the card. */
  ref?: React.Ref<HTMLElement>;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ServiceCard({ service, index = 0, onBook, ref }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease: EASE, delay: (index % 3) * 0.06 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(8,47,89,0.04)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#0872BB]/30 hover:shadow-[0_24px_48px_-12px_rgba(8,47,89,0.18)]"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#082F59]/70 via-[#082F59]/10 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#082F59] shadow-xs">
          {service.category}
        </span>
        <span className="absolute bottom-3 right-4 text-4xl font-bold leading-none text-white/25 tabular-nums">
          {service.id}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF4FC] text-[#0872BB] transition-colors duration-300 group-hover:bg-[#0872BB] group-hover:text-white">
            <Icon size={22} strokeWidth={1.8} />
          </span>
          <h3 className="text-lg font-semibold leading-snug tracking-tight text-[#082F59]">
            {service.title}
          </h3>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{service.description}</p>

        <ul className="mt-5 space-y-2.5">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0872BB]/10 text-[#0872BB]">
                <Check size={12} strokeWidth={3} />
              </span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={() => onBook(service.title)}
            className="group/btn flex w-full items-center justify-between border-t border-slate-100 pt-5 text-sm font-semibold text-[#0872BB] transition-colors hover:text-[#082F59] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0872BB]"
          >
            Book this service
            <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Accent line */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-linear-to-r from-[#0872BB] to-[#3FA9F5] transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
  );
}
