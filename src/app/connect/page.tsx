import type { Metadata } from "next";
import { Suspense } from "react";

import ConnectJourney from "@/components/booking-journey/ConnectJourney";

export const metadata: Metadata = {
  title: "Connecting you to WhatsApp · Ritz Auto Care",
  robots: { index: false, follow: false },
};

/** Opened in a new tab by every WhatsApp button: plays the booking journey, then opens WhatsApp here. */
export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-svh bg-[#061E3B]" />}>
      <ConnectJourney />
    </Suspense>
  );
}
