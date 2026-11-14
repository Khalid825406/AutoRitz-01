"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Building2, Check, ChevronRight, MapPin, Palmtree, Plane, Waves } from "lucide-react";

import { REGIONS, type ServiceArea } from "@/data/service-areas";

interface AreaDirectoryProps {
  /** Areas currently visible (already filtered by tab / search). */
  areas: ServiceArea[];
  selected: string | null;
  onSelect: (name: string) => void;
  /** True while the visitor is searching — changes the panel wording. */
  searching: boolean;
  onBook?: (service?: string) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const REGION_META: Record<string, { icon: typeof MapPin; blurb: string }> = {
  "Central Dubai": {
    icon: Building2,
    blurb: "Downtown, Business Bay, DIFC, Bur Dubai and the city's core neighbourhoods.",
  },
  "Marina & Al Barsha": {
    icon: Waves,
    blurb: "Dubai Marina, JLT, Palm Jumeirah, Al Barsha and the new coastal communities.",
  },
  "Dubailand & South": {
    icon: Palmtree,
    blurb: "Villa communities and new developments from Dubai Hills to Dubai South.",
  },
  "Deira & East Dubai": {
    icon: Plane,
    blurb: "Deira, Al Qusais, Mirdif and the neighbourhoods around the airport.",
  },
};

/** Two-pane directory: pick a region on the left, see every area in it on the right. */
export default function AreaDirectory({ areas, selected, onSelect, searching, onBook }: AreaDirectoryProps) {
  const groups = REGIONS.map((region) => ({ region, items: areas.filter((a) => a.region === region) })).filter(
    (g) => g.items.length > 0,
  );
  const [picked, setPicked] = useState<string>(REGIONS[0]);

  // When an area is chosen elsewhere (map pin, popular chip), jump to its region.
  const [prevSelected, setPrevSelected] = useState(selected);
  if (selected !== prevSelected) {
    setPrevSelected(selected);
    const region = areas.find((a) => a.name === selected)?.region;
    if (region) setPicked(region);
  }

  if (groups.length === 0) return null;

  // Fall back to the first region that still has matches (e.g. after a search or tab change).
  const active = groups.find((g) => g.region === picked) ?? groups[0];
  const meta = REGION_META[active.region] ?? { icon: MapPin, blurb: "" };
  const ActiveIcon = meta.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="mt-8 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_24px_60px_-28px_rgba(8,47,89,0.25)] lg:grid lg:grid-cols-[300px_minmax(0,1fr)]"
    >
      {/* ============ REGION LIST ============ */}
      <nav aria-label="Regions" className="border-b border-slate-200/80 bg-[#F7FAFD] p-3 lg:border-b-0 lg:border-r lg:p-5">
        <p className="hidden px-3 pb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 lg:block">
          {searching ? "Matches by region" : "Browse by region"}
        </p>
        <ul className="flex gap-2 overflow-x-auto [scrollbar-width:none] lg:flex-col lg:gap-1 [&::-webkit-scrollbar]:hidden">
          {groups.map(({ region, items }) => {
            const isActive = region === active.region;
            const Icon = REGION_META[region]?.icon ?? MapPin;
            return (
              <li key={region} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setPicked(region)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB] ${
                    isActive ? "text-[#082F59]" : "text-slate-600 hover:bg-white/70 hover:text-[#082F59]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="area-region-active"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      className="absolute inset-0 rounded-xl bg-white shadow-[0_8px_20px_-10px_rgba(8,47,89,0.35)] ring-1 ring-slate-200/80"
                    />
                  )}
                  <span
                    className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      isActive
                        ? "bg-linear-to-br from-[#1766AE] to-[#082F59] text-white"
                        : "bg-white text-[#0872BB] ring-1 ring-slate-200"
                    }`}
                  >
                    <Icon size={17} />
                  </span>
                  <span className="relative min-w-0 flex-1">
                    <span className="block whitespace-nowrap text-[14px] font-semibold">{region}</span>
                    <span className="block text-xs text-slate-500">
                      {items.length} {items.length === 1 ? "area" : "areas"}
                    </span>
                  </span>
                  <ChevronRight
                    size={16}
                    className={`relative hidden shrink-0 transition-transform lg:block ${
                      isActive ? "translate-x-0.5 text-[#0872BB]" : "text-slate-300"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ============ AREAS PANEL ============ */}
      <div className="p-5 sm:p-7 lg:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.region}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {/* header */}
            <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF4FC] text-[#0872BB]">
                  <ActiveIcon size={22} />
                </span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-[#082F59] sm:text-2xl">{active.region}</h3>
                  <p className="mt-1 max-w-md text-[14px] leading-relaxed text-slate-600">
                    {searching
                      ? `${active.items.length} matching ${active.items.length === 1 ? "area" : "areas"} in this region.`
                      : meta.blurb}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {active.items.length} {active.items.length === 1 ? "area" : "areas"} covered
                </span>
                {onBook && (
                  <button
                    type="button"
                    onClick={() => onBook(`Service in ${active.region}`)}
                    className="group hidden items-center gap-1.5 rounded-full bg-[#0872BB] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#082F59] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB] sm:inline-flex"
                  >
                    Book here
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                )}
              </div>
            </div>

            {/* areas grid */}
            <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2 xl:grid-cols-3">
              {active.items.map((a, i) => {
                const isSel = a.name === selected;
                return (
                  <motion.li
                    key={a.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: EASE, delay: Math.min(i * 0.015, 0.3) }}
                  >
                    <button
                      type="button"
                      onClick={() => onSelect(a.name)}
                      aria-pressed={isSel}
                      className={`group flex w-full items-center gap-3 rounded-lg border-b border-dashed px-2 py-2.5 text-left text-[14px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0872BB] ${
                        isSel
                          ? "border-transparent bg-[#082F59] font-semibold text-white"
                          : "border-slate-200 text-slate-700 hover:border-transparent hover:bg-[#F2F8FD] hover:text-[#0872BB]"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors ${
                          isSel
                            ? "bg-white text-[#082F59]"
                            : "bg-[#EAF4FC] text-[#0872BB] group-hover:bg-[#0872BB] group-hover:text-white"
                        }`}
                      >
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span className="min-w-0 flex-1 truncate">{a.name}</span>
                      <MapPin
                        size={14}
                        aria-hidden
                        className={`shrink-0 transition-opacity ${isSel ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                      />
                    </button>
                  </motion.li>
                );
              })}
            </ul>

            <p className="mt-6 flex items-center gap-2 text-xs text-slate-500">
              <MapPin size={13} className="text-[#0872BB]" />
              Tap an area to see it on the map.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
