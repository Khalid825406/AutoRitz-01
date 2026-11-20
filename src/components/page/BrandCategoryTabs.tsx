"use client";

import { motion } from "motion/react";

import { BRAND_COUNT, BRAND_MENU } from "@/data/pages/brand-menu";

export const ALL_BRANDS = "All";

/**
 * Brand category tabs (All brands · German · British · … · Chinese) with counts — shared by every brands
 * listing so the categories look and read the same everywhere.
 */
export default function BrandCategoryTabs({
  value,
  onChange,
  layoutId,
  className = "",
}: {
  value: string;
  onChange: (tab: string) => void;
  /** Unique per page section, for the sliding highlight. */
  layoutId: string;
  className?: string;
}) {
  const tabs = [{ key: ALL_BRANDS, count: BRAND_COUNT }, ...BRAND_MENU.map((g) => ({ key: g.nationality, count: g.brands.length }))];

  return (
    <div
      role="tablist"
      aria-label="Brands by country"
      className={`-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {tabs.map(({ key, count }) => {
        const active = value === key;
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(key)}
            className={`relative inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0563B4] ${
              active ? "text-white" : "bg-[#F2F7FC] text-[#0E1116] hover:bg-[#E3EFFA]"
            }`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
                className="absolute inset-0 rounded-full bg-[#0563B4]"
              />
            )}
            <span className="relative">{key === ALL_BRANDS ? "All brands" : key}</span>
            <span className={`relative text-[11px] font-bold ${active ? "text-white/75" : "text-[#0563B4]"}`}>{count}</span>
          </button>
        );
      })}
    </div>
  );
}

/** "GERMAN BRANDS 6 ────" heading above a group of logos. */
export function BrandGroupHeading({ label, count }: { label: string; count: number }) {
  return (
    <div className="mb-3 flex items-center gap-3 sm:mb-4">
      <h3 className="text-[13px] font-bold uppercase tracking-[0.16em] text-[#0E1116]">{label}</h3>
      <span className="rounded-full bg-[#EAF4FC] px-2 py-0.5 text-[11px] font-bold text-[#0563B4]">{count}</span>
      <span aria-hidden className="h-px flex-1 bg-slate-200" />
    </div>
  );
}
