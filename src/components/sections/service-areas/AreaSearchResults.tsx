"use client";

import { motion } from "motion/react";
import { Check, ChevronRight, MapPin, Phone } from "lucide-react";

import type { ServiceArea } from "@/data/service-areas";

interface AreaSearchResultsProps {
  query: string;
  results: ServiceArea[];
  selected: string | null;
  onSelect: (name: string) => void;
  phone: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** Wraps the part of `text` that matches `query` in a highlight. */
function Highlight({ text, query }: { text: string; query: string }) {
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (!query || i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-sm bg-[#3FA9F5]/30 px-0.5 text-inherit">{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  );
}

/** Live results shown right under the search box (replaces "Popular areas" while typing). */
export default function AreaSearchResults({ query, results, selected, onSelect, phone }: AreaSearchResultsProps) {
  const q = query.trim();

  if (results.length === 0) {
    return (
      <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-5 text-center" role="status">
        <p className="text-[15px] font-semibold text-white">No area matches &ldquo;{q}&rdquo;</p>
        <p className="mt-1 text-[13px] text-white/65">We may still reach you — call us to confirm your location.</p>
        <a
          href={`tel:${phone}`}
          className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-white px-5 text-[13px] font-semibold text-[#082F59] transition-colors hover:bg-[#DCE8F2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Phone size={15} />
          Call {phone}
        </a>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="text-[13px] font-medium text-white/60" role="status" aria-live="polite">
        {results.length} {results.length === 1 ? "area matches" : "areas match"} &ldquo;{q}&rdquo; — we cover{" "}
        {results.length === 1 ? "it" : "them all"}
      </p>
      <ul className="mt-3 max-h-[232px] space-y-1.5 overflow-y-auto pr-1 [scrollbar-color:rgba(255,255,255,0.25)_transparent] [scrollbar-width:thin]">
        {results.map((a, i) => {
          const active = a.name === selected;
          return (
            <motion.li
              key={a.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: EASE, delay: Math.min(i * 0.03, 0.25) }}
            >
              <button
                type="button"
                onClick={() => onSelect(a.name)}
                aria-pressed={active}
                className={`group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white ${
                  active ? "bg-white text-[#082F59]" : "bg-white/[0.07] text-white hover:bg-white/15"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    active ? "bg-[#0872BB] text-white" : "bg-white/10 text-[#7cc0f5]"
                  }`}
                >
                  {active ? <Check size={15} /> : <MapPin size={15} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold">
                    <Highlight text={a.name} query={q} />
                  </span>
                  <span className={`block text-xs ${active ? "text-slate-500" : "text-white/55"}`}>{a.region}</span>
                </span>
                <span
                  className={`hidden items-center gap-1 text-xs font-semibold sm:flex ${
                    active ? "text-[#0872BB]" : "text-white/50 group-hover:text-white"
                  }`}
                >
                  {active ? "On map" : "Show on map"}
                  <ChevronRight size={14} />
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
