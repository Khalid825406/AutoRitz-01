"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

import { SERVICE_MENU, SERVICE_MENU_EXTRAS } from "@/data/pages/service-menu";

/** Desktop "Services" dropdown: every service we offer + quick links to the main service pages. */
export default function ServicesMegaMenu({ onNavigate, focusRing }: { onNavigate: () => void; focusRing: string }) {
  return (
    <div className="overflow-hidden rounded-b-2xl bg-[#0563B4] shadow-[0_24px_50px_-12px_rgba(14,17,22,0.45)]">
      <div className="flex items-center justify-between gap-6 border-b border-white/15 px-8 py-4">
        <p className="text-[15px] font-semibold text-white">
          Our services
          <span className="ml-2 font-normal text-white/65">{`${SERVICE_MENU.length} car services in Dubai`}</span>
        </p>
        <Link
          href="/service/"
          onClick={onNavigate}
          className={`group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#0E1116] transition-colors hover:bg-[#DCEEFD] ${focusRing}`}
        >
          View all services
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_260px] gap-8 px-8 pb-6 pt-5">
        {/* all services, two columns read top-to-bottom like the original site */}
        <ul className="columns-2 gap-8">
          {SERVICE_MENU.map((s) => (
            <li key={s.slug} className="break-inside-avoid">
              <Link
                href={s.href}
                onClick={onNavigate}
                className={`group flex items-center gap-2 rounded py-1.5 text-[14px] text-white transition-colors hover:text-[#BFE0FB] ${focusRing}`}
              >
                <ChevronRight
                  size={14}
                  strokeWidth={2.5}
                  aria-hidden
                  className="-ml-0.5 shrink-0 text-[#BFE0FB]/70 transition-[translate,color] duration-200 group-hover:translate-x-0.5 group-hover:text-white"
                />
                {s.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* quick links */}
        <ul className="space-y-2 border-l border-white/15 pl-8">
          {SERVICE_MENU_EXTRAS.map((x) => (
            <li key={x.href}>
              <Link
                href={x.href}
                onClick={onNavigate}
                className={`group block rounded-xl bg-white/[0.07] px-4 py-3 ring-1 ring-white/10 transition-colors hover:bg-white/[0.14] ${focusRing}`}
              >
                <span className="flex items-center justify-between text-[14px] font-semibold text-white">
                  {x.label}
                  <ArrowRight size={14} className="text-[#BFE0FB] transition-transform group-hover:translate-x-0.5" />
                </span>
                <span className="mt-0.5 block text-[12px] text-white/65">{x.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
