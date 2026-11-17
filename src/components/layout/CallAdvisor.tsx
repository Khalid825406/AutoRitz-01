"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Phone } from "lucide-react";

import { WhatsAppGlyph } from "@/components/booking-journey/illustrations";
import { CONTACT, SITE_CONTACT, waLink } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Shared size of both round buttons, so they line up in one column. */
const ROUND = "h-14 w-14 sm:h-16 sm:w-16";

/**
 * Floating contact buttons (bottom-right, every page), stacked:
 *  - green WhatsApp button on top — opens the booking journey popup, then WhatsApp chat
 *  - "Call Advisor" pill + round button with the waving Ritz advisor inside — dials the toll-free number
 */
export default function CallAdvisor() {
  // the /connect/ tab only shows the booking journey
  if (usePathname()?.startsWith("/connect")) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 1.2 }}
      // Safe-area offset lives in a class, not an inline style: some browser extensions rewrite inline
      // env(safe-area-inset-*) values before React loads, which caused a hydration-mismatch warning.
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 z-[9990] flex flex-col items-end gap-3 sm:right-6"
    >
      {/* WhatsApp */}
      <a
        href={waLink(SITE_CONTACT.whatsapp, "Hi Ritz Auto Care, I'd like to speak with a service advisor.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with an advisor on WhatsApp"
        className={`${ROUND} flex shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_-6px_rgba(37,211,102,0.6)] ring-4 ring-white transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-[#0872BB]`}
      >
        <WhatsAppGlyph className="h-7 w-7 sm:h-8 sm:w-8" />
      </a>

      {/* Call advisor */}
      <a
        href={`tel:${CONTACT.phone}`}
        aria-label={`Call an advisor on ${CONTACT.phone}`}
        className="group relative flex items-center focus-visible:outline-none"
      >
        {/* label pill — tucked under the button like a speech bubble */}
        <span className="-mr-4 rounded-full bg-white py-2 pl-4 pr-7 text-[15px] font-medium text-[#1f2937] shadow-[0_6px_20px_rgba(15,23,42,0.18)] ring-1 ring-black/5 transition-colors group-hover:text-[#E10600] sm:py-2.5 sm:pl-5 sm:pr-8 sm:text-[17px]">
          Call Advisor
        </span>

        {/* round button with the waving advisor inside + soft red pulse */}
        <span className={`relative flex ${ROUND} shrink-0 items-center justify-center`}>
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-[#FF1A1A]"
            animate={{ scale: [1, 1.45], opacity: [0.45, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <span className="relative h-full w-full overflow-hidden rounded-full bg-linear-to-b from-[#EAF4FC] to-[#bcdcf7] shadow-[0_10px_24px_-6px_rgba(255,0,0,0.55)] ring-4 ring-[#FF0000] transition-transform duration-300 group-hover:scale-105 group-focus-visible:ring-[#0872BB]">
            {/* eslint-disable-next-line @next/next/no-img-element -- animated WebP must not be re-encoded by next/image */}
            <img
              src="/images/advisor/advisor.webp"
              alt=""
              width={240}
              height={240}
              loading="eager"
              decoding="async"
              className="absolute left-1/2 top-[6%] w-[118%] max-w-none -translate-x-1/2 select-none"
              draggable={false}
            />
          </span>
          {/* small phone badge so it still reads as "call" */}
          <span className="absolute -bottom-0.5 -left-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#FF0000] text-white ring-2 ring-white sm:h-7 sm:w-7">
            <Phone size={13} fill="currentColor" strokeWidth={0} className="sm:size-[15px]" />
          </span>
        </span>
      </a>
    </motion.div>
  );
}
