"use client";

import { useCallback, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { submitAppointment } from "@/lib/appointments";
import BookingJourneyModal from "./BookingJourneyModal";
import { parseConnectParams } from "./connect-link";

/** The /connect/ tab: booking journey over a navy page, then WhatsApp opens in this same tab. */
export default function ConnectJourney() {
  const params = useSearchParams();
  const request = useMemo(() => parseConnectParams(new URLSearchParams(params.toString())), [params]);
  const appointment = request?.appointment;
  const submit = useMemo(() => (appointment ? () => submitAppointment(appointment) : undefined), [appointment]);

  // Closing the popup closes this tab (it was opened by the site); if the browser won't, go to the homepage.
  const close = useCallback(() => {
    window.close();
    window.setTimeout(() => window.location.replace("/"), 200);
  }, []);

  if (!request) {
    return (
      <main className="flex min-h-svh flex-col items-center justify-center gap-4 bg-[#061E3B] px-6 text-center text-white">
        <p className="text-lg font-semibold">This link is not valid.</p>
        <Link href="/" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#082F59]">
          Go to Ritz Auto Care
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-svh bg-linear-to-b from-[#0B4274] to-[#061E3B]">
      <BookingJourneyModal whatsappUrl={request.whatsappUrl} submit={submit} closeAfterRedirect={false} onClose={close} />
    </main>
  );
}
