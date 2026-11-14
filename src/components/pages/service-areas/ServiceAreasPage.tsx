"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, MapPin, MessageCircle, Phone, Search, Truck, X } from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import AppointmentSection from "@/components/page/AppointmentSection";
import PageHero from "@/components/page/PageHero";
import { SITE_CONTACT, waLink } from "@/config/site";
import { PAGE_AREAS, SERVICE_AREAS_PAGE } from "@/data/pages/service-areas-page";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ServiceAreasPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? PAGE_AREAS.filter((a) => a.toLowerCase().includes(q)) : PAGE_AREAS;
  }, [query]);

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ label: "Service Areas" }]}
        eyebrow="Pick-up & delivery"
        title="Service Areas"
        description={SERVICE_AREAS_PAGE.text}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={waLink(SITE_CONTACT.whatsapp, "Hi Ritz Auto Care, do you cover my area?")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[#082F59] transition-colors hover:bg-[#DCE8F2]"
          >
            <MessageCircle size={16} />
            Check my area on WhatsApp
          </a>
          <a
            href={`tel:${SITE_CONTACT.phone}`}
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone size={16} />
            Toll-Free {SITE_CONTACT.phone}
          </a>
        </div>
      </PageHero>

      <section className="w-full bg-white py-20 sm:py-24">
        <div className="site-container">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0872BB] shadow-xs">
                <MapPin size={14} />
                {PAGE_AREAS.length} areas
              </span>
              <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight text-[#082F59] sm:text-4xl lg:text-5xl">
                We Serve <span className="text-[#0872BB]">Across Dubai.</span>
              </h2>
            </motion.div>

            {/* search */}
            <div className="w-full lg:max-w-sm">
              <label htmlFor="area-page-search" className="sr-only">
                Search your area
              </label>
              <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 shadow-xs transition focus-within:border-[#0872BB] focus-within:ring-4 focus-within:ring-[#0872BB]/10">
                <Search size={18} className="shrink-0 text-[#0872BB]" />
                <input
                  id="area-page-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search your area, e.g. Mudon"
                  autoComplete="off"
                  className="w-full min-w-0 bg-transparent text-[15px] text-[#082F59] outline-hidden placeholder:text-slate-400"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
              <p className="mt-2 text-xs text-slate-500" aria-live="polite">
                Showing {list.length} of {PAGE_AREAS.length} areas
              </p>
            </div>
          </div>

          {/* areas */}
          {list.length > 0 ? (
            <motion.ul layout className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              <AnimatePresence initial={false}>
                {list.map((a, i) => {
                  const active = a === selected;
                  return (
                    <motion.li
                      key={a}
                      layout
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1, transition: { duration: 0.3, ease: EASE, delay: Math.min(i * 0.01, 0.3) } }}
                      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.15 } }}
                    >
                      <button
                        type="button"
                        onClick={() => setSelected(active ? null : a)}
                        aria-pressed={active}
                        className={`group flex h-full min-h-[64px] w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB] ${
                          active
                            ? "border-[#082F59] bg-[#082F59] text-white shadow-[0_12px_24px_-12px_rgba(8,47,89,0.6)]"
                            : "border-slate-200/80 bg-white text-[#082F59] hover:border-[#0872BB]/40 hover:bg-[#F2F8FD]"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                            active ? "bg-white/15 text-white" : "bg-[#EAF4FC] text-[#0872BB] group-hover:bg-[#0872BB] group-hover:text-white"
                          }`}
                        >
                          {active ? <Check size={15} /> : <MapPin size={15} />}
                        </span>
                        <span className="text-[14px] font-medium leading-tight">{a}</span>
                      </button>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center" role="status">
              <p className="text-base font-semibold text-[#082F59]">No area matches &ldquo;{query}&rdquo;</p>
              <p className="mt-1 text-[14px] text-slate-600">We may still reach you — call us and we will confirm your location.</p>
              <a
                href={`tel:${SITE_CONTACT.phone}`}
                className="mt-4 inline-flex h-11 items-center gap-2 rounded-xl bg-[#0872BB] px-5 text-sm font-semibold text-white hover:bg-[#082F59]"
              >
                <Phone size={16} />
                Call {SITE_CONTACT.phone}
              </a>
            </div>
          )}

          {/* selected area bar */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="sticky bottom-4 z-30 mx-auto mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 pl-5 shadow-[0_20px_50px_rgba(8,47,89,0.22)] sm:flex-row sm:items-center sm:justify-between"
              >
                <p className="flex items-center gap-3 text-[14px] text-slate-600">
                  <Truck size={20} className="shrink-0 text-[#0872BB]" />
                  <span>
                    <span className="block font-semibold text-[#082F59]">We serve {selected}</span>
                    Free pick-up & drop-off from your location.
                  </span>
                </p>
                <a
                  href={waLink(SITE_CONTACT.whatsapp, `Hi Ritz Auto Care, I'd like to book a service in ${selected}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0872BB] px-5 text-sm font-semibold text-white hover:bg-[#082F59]"
                >
                  <MessageCircle size={16} />
                  Book in {selected}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <AppointmentSection />
    </PageShell>
  );
}
