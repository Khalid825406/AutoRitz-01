"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";

import { submitAppointment } from "@/lib/appointments";
import BookingJourneyModal from "./BookingJourneyModal";
import { WHATSAPP_LINK, connectHref, type JourneyRequest } from "./connect-link";

interface BookingJourneyApi {
  /**
   * Starts the booking journey in a NEW TAB (/connect/): the animation plays there and WhatsApp then
   * opens in that same tab, so the website stays open in the visitor's original tab.
   * Must be called from a click handler (browsers only allow new tabs straight after a click).
   */
  startJourney: (request: JourneyRequest) => void;
}

const BookingJourneyContext = createContext<BookingJourneyApi | null>(null);

export function useBookingJourney() {
  const ctx = useContext(BookingJourneyContext);
  if (!ctx) throw new Error("useBookingJourney must be used inside <BookingJourneyProvider>");
  return ctx;
}

/**
 * Site-wide booking journey.
 *  - Every WhatsApp link (wa.me) on the site opens the journey in a new tab instead of jumping straight to
 *    WhatsApp. Ctrl/⌘/middle-click still open WhatsApp directly; links marked `data-direct-whatsapp` are left alone.
 *  - The appointment form calls `startJourney({ whatsappUrl, appointment })`; the new tab sends the booking.
 *  - If the browser refuses the new tab, the journey plays in this page instead (fallback).
 */
export default function BookingJourneyProvider({ children }: { children: ReactNode }) {
  const [fallback, setFallback] = useState<(JourneyRequest & { id: number }) | null>(null);

  const startJourney = useCallback((request: JourneyRequest) => {
    // Opened synchronously inside the click, so pop-up blockers allow it.
    const tab = window.open(connectHref(request), "_blank");
    if (!tab) setFallback({ ...request, id: Date.now() });
  }, []);
  const close = useCallback(() => setFallback(null), []);

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
  const appointment = fallback?.appointment;
  // stable function — the popup sends the booking once per journey
  const fallbackSubmit = useMemo(() => (appointment ? () => submitAppointment(appointment) : undefined), [appointment]);

  return (
    <BookingJourneyContext.Provider value={api}>
      {children}
      <AnimatePresence>
        {fallback && (
          <BookingJourneyModal
            key={fallback.id}
            whatsappUrl={fallback.whatsappUrl}
            submit={fallbackSubmit}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </BookingJourneyContext.Provider>
  );
}
