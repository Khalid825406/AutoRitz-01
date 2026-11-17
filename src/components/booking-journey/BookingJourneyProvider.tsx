"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";

import { submitAppointment } from "@/lib/appointments";
import type { AppointmentInput } from "@/lib/validation/appointment";
import BookingJourneyModal from "./BookingJourneyModal";

/** WhatsApp chat links that start the journey when clicked. */
const WHATSAPP_LINK = /^https:\/\/(wa\.me|api\.whatsapp\.com)\//i;

export interface JourneyRequest {
  /** wa.me link (with the prefilled message) opened in a new tab at the end of the journey. */
  whatsappUrl: string;
  /** Appointment form data — sent to /api/appointments while the journey plays. */
  appointment?: AppointmentInput;
}

interface BookingJourneyApi {
  /** Plays the booking journey on this page, then opens WhatsApp in a new tab. */
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
 *  - Every WhatsApp link (wa.me) on the site plays the journey popup first instead of jumping straight to
 *    WhatsApp. Ctrl/⌘/middle-click still open WhatsApp directly; links marked `data-direct-whatsapp` are left alone.
 *  - The appointment form calls `startJourney({ whatsappUrl, appointment })`; the booking is sent while it plays.
 */
export default function BookingJourneyProvider({ children }: { children: ReactNode }) {
  const [journey, setJourney] = useState<(JourneyRequest & { id: number }) | null>(null);

  const startJourney = useCallback((request: JourneyRequest) => setJourney({ ...request, id: Date.now() }), []);
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
  const appointment = journey?.appointment;
  // stable function — the popup sends the booking once per journey
  const submit = useMemo(() => (appointment ? () => submitAppointment(appointment) : undefined), [appointment]);

  return (
    <BookingJourneyContext.Provider value={api}>
      {children}
      <AnimatePresence>
        {journey && (
          <BookingJourneyModal key={journey.id} whatsappUrl={journey.whatsappUrl} submit={submit} onClose={close} />
        )}
      </AnimatePresence>
    </BookingJourneyContext.Provider>
  );
}
