import type { Metadata } from "next";

import RoadsideSupportPage from "@/components/pages/roadside-support/RoadsideSupportPage";

export const metadata: Metadata = {
  title: "Roadside Support in Dubai & UAE | Ritz Auto Care LLC",
  description:
    "Roadside assistance across all Emirates in the UAE — car towing, jump start, fuel delivery, tyre change, car lockout and off-road recovery. Arrival within 30–45 minutes.",
  alternates: { canonical: "/roadside-support/" },
};

export default function Page() {
  return <RoadsideSupportPage />;
}
