"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";

import BookingJourneyModal, { type JourneyOptions } from "./BookingJourneyModal";

interface BookingJourneyApi {
  /** Opens the animated booking popup; ends on a "Chat on WhatsApp" button for `whatsappUrl`. */
  startJourney: (options: JourneyOptions) => void;
}

const BookingJourneyContext = createContext<BookingJourneyApi | null>(null);

export function useBookingJourney() {
  const ctx = useContext(BookingJourneyContext);
  if (!ctx) throw new Error("useBookingJourney must be used inside <BookingJourneyProvider>");
  return ctx;
}

const WHATSAPP_LINK = /^https:\/\/(wa\.me|api\.whatsapp\.com)\//i;

/**
 * Site-wide booking journey.
 *  - Every WhatsApp link (wa.me) on the site plays the journey first instead of jumping straight to WhatsApp.
 *    Ctrl/⌘/middle-click still open it directly, and links marked `data-direct-whatsapp` are left alone.
 *  - Components can also open it with `useBookingJourney().startJourney(...)` (the appointment form does,
 *    passing the real booking request as `submit`).
 */
export default function BookingJourneyProvider({ children }: { children: ReactNode }) {
  const [journey, setJourney] = useState<(JourneyOptions & { id: number }) | null>(null);

  const startJourney = useCallback((options: JourneyOptions) => setJourney({ ...options, id: Date.now() }), []);
  const close = useCallback(() => setJourney(null), []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const href = link.getAttribute("href") ?? "";
      if (!WHATSAPP_LINK.test(href) || link.hasAttribute("data-direct-whatsapp")) return;
      e.preventDefault();
      startJourney({ whatsappUrl: href });
    };
    document.addEventListener("click", onClick, true); // capture: runs before the link navigates
    return () => document.removeEventListener("click", onClick, true);
  }, [startJourney]);

  const api = useMemo(() => ({ startJourney }), [startJourney]);

  return (
    <BookingJourneyContext.Provider value={api}>
      {children}
      <AnimatePresence>
        {journey && (
          <BookingJourneyModal key={journey.id} whatsappUrl={journey.whatsappUrl} submit={journey.submit} onClose={close} />
        )}
      </AnimatePresence>
    </BookingJourneyContext.Provider>
  );
}
