"use client";

import { useLang } from "@/i18n/LangProvider";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Building2, Check, ChevronDown, ChevronRight, MapPin, Palmtree, Plane, Waves } from "lucide-react";

import { REGION_AR, REGIONS, type ServiceArea } from "@/data/service-areas";

import { REVEAL_VIEWPORT } from "@/components/motion/viewport";
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

/** Areas shown per region before "Show more". */
const PREVIEW_COUNT = 6;

const REGION_META: Record<string, { icon: typeof MapPin; blurb: string; blurbAr: string }> = {
  "Central Dubai": {
    icon: Building2,
    blurb: "Downtown, Business Bay, DIFC, Bur Dubai and the city's core neighbourhoods.",
    blurbAr: "وسط المدينة، الخليج التجاري، مركز دبي المالي العالمي، بر دبي والأحياء الرئيسية في المدينة.",
  },
  "Marina & Al Barsha": {
    icon: Waves,
    blurb: "Dubai Marina, JLT, Palm Jumeirah, Al Barsha and the new coastal communities.",
    blurbAr: "دبي مارينا، أبراج بحيرات جميرا، نخلة جميرا، البرشاء والمجتمعات الساحلية الجديدة.",
  },
  "Dubailand & South": {
    icon: Palmtree,
    blurb: "Villa communities and new developments from Dubai Hills to Dubai South.",
    blurbAr: "مجمعات الفلل والمشاريع الجديدة من دبي هيلز إلى دبي الجنوب.",
  },
  "Deira & East Dubai": {
    icon: Plane,
    blurb: "Deira, Al Qusais, Mirdif and the neighbourhoods around the airport.",
    blurbAr: "ديرة، القصيص، مردف والأحياء المحيطة بالمطار.",
  },
};

/** Two-pane directory: pick a region on the left, see every area in it on the right. */
export default function AreaDirectory({ areas, selected, onSelect, searching, onBook }: AreaDirectoryProps) {
  const { t } = useLang();
  const groups = REGIONS.map((region) => ({ region, items: areas.filter((a) => a.region === region) })).filter(
    (g) => g.items.length > 0,
  );
  const [picked, setPicked] = useState<string>(REGIONS[0]);
  /** Region whose full list is open ("Show more"); switching region collapses it again. */
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);

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
  const meta = REGION_META[active.region] ?? { icon: MapPin, blurb: "", blurbAr: "" };
  const areasWord = (n: number) => (n === 1 ? t("area", "منطقة") : t("areas", "مناطق"));
  const ActiveIcon = meta.icon;

  // First 6 areas, the rest behind "Show more". While searching, or when the chosen area (e.g. from a
  // map pin) is further down the list, every area is shown so nothing is hidden from the visitor.
  const selectedIndex = active.items.findIndex((a) => a.name === selected);
  const showAll =
    searching || expandedRegion === active.region || selectedIndex >= PREVIEW_COUNT || active.items.length <= PREVIEW_COUNT;
  const visibleItems = showAll ? active.items : active.items.slice(0, PREVIEW_COUNT);
  const hiddenCount = active.items.length - PREVIEW_COUNT;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.6, ease: EASE }}
      className="mt-8 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_24px_60px_-28px_rgba(14, 17, 22,0.25)] lg:grid lg:grid-cols-[300px_minmax(0,1fr)]"
    >
      {/* ============ REGION LIST ============ */}
      <nav aria-label={t("Regions", "المناطق")} className="border-b border-slate-200/80 bg-[#F7FAFD] p-3 lg:border-b-0 lg:border-r lg:p-5">
        <p className="px-1 pb-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 lg:px-3 lg:pb-3">
          {searching ? t("Matches by region", "النتائج حسب المنطقة") : t("Browse by region", "تصفح حسب المنطقة")}
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
                  className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-start transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0563B4] ${
                    isActive ? "text-[#0E1116]" : "text-slate-600 hover:bg-white/70 hover:text-[#0E1116]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="area-region-active"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      className="absolute inset-0 rounded-xl bg-white shadow-[0_8px_20px_-10px_rgba(14, 17, 22,0.35)] ring-1 ring-slate-200/80"
                    />
                  )}
                  <span
                    className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      isActive
                        ? "bg-linear-to-br from-[#0B6FC2] to-[#0E1116] text-white"
                        : "bg-white text-[#0563B4] ring-1 ring-slate-200"
                    }`}
                  >
                    <Icon size={17} />
                  </span>
                  <span className="relative min-w-0 flex-1">
                    <span className="block whitespace-nowrap text-[14px] font-semibold">{t(region, REGION_AR[region])}</span>
                    <span className="block text-xs text-slate-500">
                      {items.length} {areasWord(items.length)}
                    </span>
                  </span>
                  <ChevronRight
                    size={16}
                    className={`relative hidden shrink-0 transition-transform lg:block ${
                      isActive ? "translate-x-0.5 text-[#0563B4]" : "text-slate-300"
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
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF4FC] text-[#0563B4]">
                  <ActiveIcon size={22} />
                </span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-[#0E1116] sm:text-2xl">{t(active.region, REGION_AR[active.region])}</h3>
                  <p className="mt-1 max-w-md text-[14px] leading-relaxed text-slate-600">
                    {searching
                      ? t(`${active.items.length} matching ${areasWord(active.items.length)} in this region.`, `${active.items.length} ${areasWord(active.items.length)} مطابقة في هذه المنطقة.`)
                      : t(meta.blurb, meta.blurbAr)}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {t(`${active.items.length} ${areasWord(active.items.length)} covered`, `${active.items.length} ${areasWord(active.items.length)} مغطاة`)}
                </span>
                {onBook && (
                  <button
                    type="button"
                    onClick={() => onBook(`Service in ${active.region}`)}
                    className="group inline-flex items-center gap-1.5 rounded-full bg-[#0563B4] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0E1116] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0563B4]"
                  >
                    {t("Book here", "احجز هنا")}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                )}
              </div>
            </div>

            {/* areas grid */}
            <ul className="mt-6 grid grid-cols-2 gap-x-2 gap-y-1 sm:gap-x-6 xl:grid-cols-3">
              {visibleItems.map((a, i) => {
                const isSel = a.name === selected;
                return (
                  <motion.li
                    key={a.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: EASE, delay: Math.min((i % PREVIEW_COUNT) * 0.02, 0.3) }}
                  >
                    <button
                      type="button"
                      onClick={() => onSelect(a.name)}
                      aria-pressed={isSel}
                      className={`group flex h-full w-full items-center gap-2 rounded-lg border-b border-dashed px-1.5 py-2.5 text-start text-[13px] leading-snug transition-colors sm:gap-3 sm:px-2 sm:text-[14px] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0563B4] ${
                        isSel
                          ? "border-transparent bg-[#0E1116] font-semibold text-white"
                          : "border-slate-200 text-slate-700 hover:border-transparent hover:bg-[#F2F8FD] hover:text-[#0563B4]"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors ${
                          isSel
                            ? "bg-white text-[#0E1116]"
                            : "bg-[#EAF4FC] text-[#0563B4] group-hover:bg-[#0563B4] group-hover:text-white"
                        }`}
                      >
                        <Check size={11} strokeWidth={3} />
                      </span>
                      {/* two columns on phones: long names wrap instead of being cut off */}
                      <span className="min-w-0 flex-1 sm:truncate">{a.name}</span>
                      <MapPin
                        size={14}
                        aria-hidden
                        className={`shrink-0 transition-opacity ${isSel ? "opacity-100" : "opacity-0 group-hover:opacity-100 max-sm:hidden"}`}
                      />
                    </button>
                  </motion.li>
                );
              })}
            </ul>

            {/* show more / less (not while searching — matches are always shown in full) */}
            {!searching && hiddenCount > 0 && selectedIndex < PREVIEW_COUNT && (
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => setExpandedRegion(expandedRegion === active.region ? null : active.region)}
                  aria-expanded={expandedRegion === active.region}
                  className="group inline-flex h-11 items-center gap-2 rounded-full border border-[#0563B4]/25 bg-[#EAF4FC] px-5 text-[13px] font-semibold text-[#0563B4] transition-colors hover:bg-[#0563B4] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0563B4] sm:text-sm"
                >
                  {expandedRegion === active.region ? t("Show less", "عرض أقل") : t(`Show ${hiddenCount} more ${areasWord(hiddenCount)}`, `عرض ${hiddenCount} ${areasWord(hiddenCount)} إضافية`)}
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${expandedRegion === active.region ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            )}

            <p className="mt-6 flex items-center gap-2 text-xs text-slate-500">
              <MapPin size={13} className="text-[#0563B4]" />
              {t("Tap an area to see it on the map.", "اضغط على منطقة لرؤيتها على الخريطة.")}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
