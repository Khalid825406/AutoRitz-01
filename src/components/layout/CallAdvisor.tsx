"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Phone } from "lucide-react";

import { WhatsAppGlyph } from "@/components/booking-journey/illustrations";
import { CONTACT, SITE_CONTACT, waLink } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/** How long the "ringing" feedback plays after a tap (the dialer opens immediately). */
const RINGING_MS = 1600;

/** Shared size of both round buttons, so they line up in one column. */
const ROUND = "h-14 w-14 sm:h-16 sm:w-16";

/**
 * Floating contact buttons (bottom-right, every page), stacked:
 *  - green WhatsApp button on top — opens the booking journey popup, then WhatsApp chat
 *  - "Call Advisor" pill + round button with the waving Ritz advisor inside — dials the toll-free number
 */
export default function CallAdvisor() {
  // "Calling…" feedback: a click starts it, the tel: link still opens the dialer straight away.
  const [ringId, setRingId] = useState(0);
  const ringing = ringId > 0;
  useEffect(() => {
    if (!ringId) return;
    const t = window.setTimeout(() => setRingId(0), RINGING_MS);
    return () => window.clearTimeout(t);
  }, [ringId]);

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
        onClick={() => setRingId(Date.now())}
        className="group relative flex items-center focus-visible:outline-none"
      >
        {/* label pill — tucked under the button like a speech bubble; shows "Calling…" while ringing */}
        <span
          className={`-mr-4 grid min-w-[8.5rem] rounded-full bg-white py-2 pl-4 pr-7 text-[15px] font-medium shadow-[0_6px_20px_rgba(15,23,42,0.18)] ring-1 ring-black/5 transition-colors sm:min-w-[9.75rem] sm:py-2.5 sm:pl-5 sm:pr-8 sm:text-[17px] ${
            ringing ? "text-[#E10600]" : "text-[#1f2937] group-hover:text-[#E10600]"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={ringing ? "calling" : "idle"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center"
            >
              {ringing ? (
                <>
                  Calling
                  <span className="ml-0.5 inline-flex" aria-hidden>
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                      >
                        .
                      </motion.span>
                    ))}
                  </span>
                </>
              ) : (
                "Call Advisor"
              )}
            </motion.span>
          </AnimatePresence>
        </span>

        {/* round button with the waving advisor inside + soft red pulse */}
        <span className={`relative flex ${ROUND} shrink-0 items-center justify-center`}>
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full bg-[#FF1A1A]"
            animate={{ scale: [1, 1.45], opacity: [0.45, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <span
            className="relative h-full w-full overflow-hidden rounded-full bg-linear-to-b from-[#EAF4FC] to-[#bcdcf7] shadow-[0_10px_24px_-6px_rgba(255,0,0,0.55)] ring-4 ring-[#FF0000] transition-transform duration-300 group-hover:scale-105 group-focus-visible:ring-[#0872BB]">
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
          {/* the badge leaves on click (its copy flies away below) and pops back afterwards */}
          <motion.span
            key={`badge-${ringId}`}
            initial={false}
            animate={ringing ? { scale: [0, 0, 1.25, 1] } : { scale: 1 }}
            transition={ringing ? { duration: 1.3, times: [0, 0.62, 0.85, 1] } : { duration: 0.2 }}
            className="absolute -right-0.5 -top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#FF0000] text-white ring-2 ring-white sm:h-7 sm:w-7"
          >
            <Phone size={13} fill="currentColor" strokeWidth={0} className="sm:size-[15px]" />
          </motion.span>

          {/* click: the phone icon flies off towards the dialer, leaving a short dotted trail — first left
              over the "Call Advisor" pill, then up, so it never crosses the WhatsApp button above */}
          {ringing && (
            <>
              {[0.12, 0.08, 0.04].map((delay, i) => (
                <motion.span
                  key={`trail-${ringId}-${i}`}
                  aria-hidden
                  className="pointer-events-none absolute -right-0.5 -top-0.5 z-10 h-2 w-2 translate-x-2 translate-y-2 rounded-full bg-[#FF1A1A] sm:h-2.5 sm:w-2.5"
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{ x: [0, -78, -175], y: [0, -22, -125], opacity: [0, 0.7 - i * 0.18, 0] }}
                  transition={{ duration: 0.95, delay: delay + 0.05, ease: [0.3, 0, 0.4, 1], times: [0, 0.45, 1] }}
                />
              ))}
              <motion.span
                key={`fly-${ringId}`}
                aria-hidden
                className="pointer-events-none absolute -right-0.5 -top-0.5 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-[#FF0000] text-white shadow-[0_8px_18px_-4px_rgba(255,0,0,0.6)] ring-2 ring-white sm:h-7 sm:w-7"
                initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
                animate={{ x: [0, -78, -175], y: [0, -22, -125], scale: [1, 1.45, 0.55], rotate: [0, -22, 14], opacity: [1, 1, 0] }}
                transition={{ duration: 0.95, ease: [0.3, 0, 0.4, 1], times: [0, 0.45, 1] }}
              >
                <Phone size={13} fill="currentColor" strokeWidth={0} className="sm:size-[15px]" />
              </motion.span>
            </>
          )}
        </span>
      </a>
    </motion.div>
  );
}
