"use client";

import { motion, type Variants } from "motion/react";
import { Globe2, MapPin } from "lucide-react";

import TextReveal from "@/components/motion/TextReveal";
import { REVEAL_VIEWPORT } from "@/components/motion/viewport";
import WorldMap from "@/components/ui/world-map";
import { BRAND_ORIGINS, DUBAI_WORKSHOP } from "@/data/pages/brand-origins";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const ARCS = BRAND_ORIGINS.map((o) => ({ start: DUBAI_WORKSHOP, end: { lat: o.city.lat, lng: o.city.lng } }));
const TOTAL_BRANDS = BRAND_ORIGINS.reduce((n, o) => n + o.brands.length, 0);

/** /brands/ — world map with arcs from our Dubai workshop to the home country of every brand we service. */
export default function BrandOriginsMap() {
  return (
    <section className="w-full bg-white pb-12 sm:pb-24">
      <div className="site-container">
        <div className="relative isolate overflow-hidden rounded-3xl bg-[#082F59] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
          />
          <div className="pointer-events-none absolute -left-24 -top-24 -z-10 h-96 w-96 rounded-full bg-radial from-[#1766AE]/40 to-transparent to-70%" />

          {/* heading */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#4B9DE0]/40 bg-[#4B9DE0]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7cc0f5]">
              <Globe2 size={14} />
              Global brands, local experts
            </span>
            <TextReveal className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
              {`${TOTAL_BRANDS} brands from ${BRAND_ORIGINS.length} countries,`}
              <span className="block text-[#4B9DE0]">serviced in Dubai.</span>
            </TextReveal>
            <p className="mt-4 text-[14px] leading-relaxed text-[#DCE8F2]/80">
              From German engineering to Japanese reliability and American muscle — our technicians know the
              brands, the parts and the details that keep each of them running at its best.
            </p>
          </div>

          {/* map */}
          <div className="mx-auto mt-8 sm:mt-10 max-w-5xl">
            <WorldMap dots={ARCS} lineColor="#4B9DE0" dotColor="rgba(220,232,242,0.28)" />
            <p className="mt-2 flex items-center justify-center gap-2 text-[13px] text-[#DCE8F2]/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4B9DE0] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4B9DE0]" />
              </span>
              Our workshop · Dubai Investment Park, UAE
            </p>
          </div>

          {/* countries */}
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={REVEAL_VIEWPORT}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            className="mt-8 sm:mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {BRAND_ORIGINS.map((o) => (
              <motion.li
                key={o.country}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-[#4B9DE0]/40 hover:bg-white/[0.07]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2 font-semibold">
                    <MapPin size={15} className="shrink-0 text-[#7cc0f5]" />
                    <span className="truncate">{o.country}</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-[#1766AE]/40 px-2.5 py-0.5 text-xs font-semibold text-[#cfe6fb]">
                    {o.brands.length} {o.brands.length === 1 ? "brand" : "brands"}
                  </span>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-[#DCE8F2]/70">{o.brands.join(" · ")}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
