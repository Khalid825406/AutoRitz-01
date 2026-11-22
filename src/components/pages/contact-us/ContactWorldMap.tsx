"use client";

import { motion } from "motion/react";
import { MapPin } from "lucide-react";

import { SITE_CONTACT } from "@/config/site";

/*
 * The map is a static SVG (public/images/contact/world-map.svg) drawn with an equirectangular
 * projection cropped to latitudes 80°N … 58°S. The pin uses the same maths, so it sits on Dubai.
 */
const MAP_TOP = 80;
const MAP_BOTTOM = -58;
const DUBAI = { lat: 25.2, lng: 55.27 };
const PIN_X = ((DUBAI.lng + 180) / 360) * 100; // % from the left
const PIN_Y = ((MAP_TOP - DUBAI.lat) / (MAP_TOP - MAP_BOTTOM)) * 100; // % from the top

const EASE = [0.22, 1, 0.36, 1] as const;

/** World map with a glowing "We are here" pin on our Dubai workshop (contact page hero, right side). */
export default function ContactWorldMap() {
  return (
    <a
      href={SITE_CONTACT.mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Ritz Auto Care is in Dubai, UAE — open our location in Google Maps"
      // top padding = room for the beam + "We are here" label, which rise above the pin
      className="group relative block w-full rounded-2xl pt-16 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7cc0f5] sm:pt-20"
    >
      {/* map + pin share one box so the percentages line up at every width */}
      <div dir="ltr" className="relative aspect-[1000/383] w-full">
        {/* eslint-disable-next-line @next/next/no-img-element -- static decorative SVG */}
        <img
          src="/images/contact/world-map.svg"
          alt=""
          width={1000}
          height={383}
          className="absolute inset-0 h-full w-full select-none"
          draggable={false}
        />

        <div className="absolute" style={{ left: `${PIN_X}%`, top: `${PIN_Y}%` }}>
          {/* pulsing ground glow */}
          <motion.span
            aria-hidden
            className="absolute left-0 top-0 h-10 w-16 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#2f8fe0]/35"
            animate={{ scale: [0.6, 1.4], opacity: [0.9, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
          <span
            aria-hidden
            className="absolute left-0 top-0 h-5 w-9 -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#2f8fe0]/40 ring-1 ring-[#7cc0f5]/50"
          />
          <span aria-hidden className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9fd3ff] shadow-[0_0_12px_3px_rgba(124,192,245,0.9)]" />

          {/* light beam */}
          <motion.span
            aria-hidden
            className="absolute bottom-0 left-0 h-16 w-px -translate-x-1/2 origin-bottom bg-[#7cc0f5]/60 sm:h-24"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
          />

          {/* label */}
          <motion.span
            // phones: shift the label left so it never runs off the right edge (Dubai sits at ~65% of the map)
            className="absolute bottom-16 left-0 flex -translate-x-[72%] flex-col items-center sm:bottom-24 sm:-translate-x-1/2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 1.3 }}
          >
            <span className="relative whitespace-nowrap rounded-xl border border-white/15 bg-[#151A22]/95 px-3.5 py-2 text-center shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-colors group-hover:border-[#7cc0f5]/60">
              <span className="flex items-center gap-1.5 text-[13px] font-semibold text-white sm:text-sm">
                <MapPin size={14} className="text-[#7cc0f5]" />
                We are here
              </span>
              <span className="mt-0.5 block text-[11px] text-[#D9DEE5]/70">Dubai Investment Park, UAE</span>
              {/* blue underline glow, like the reference */}
              <span aria-hidden className="absolute inset-x-4 -bottom-px h-px bg-[#7cc0f5]/70" />
            </span>
          </motion.span>
        </div>
      </div>
    </a>
  );
}
