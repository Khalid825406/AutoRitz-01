import type { Metadata } from "next";

import SparePartsPage from "@/components/pages/services/SparePartsPage";

export const metadata: Metadata = {
  title: "Auto Spare Parts & Components Trading - Ritz Auto Care Car Garage Dubai, UAE",
  description:
    "Genuine OEM and aftermarket auto spare parts in Dubai — engine, brake, suspension, electrical, AC, transmission, body parts, filters and fluids for all makes and models.",
  alternates: { canonical: "/service/auto-spare-parts-trading/" },
};

export default function Page() {
  return <SparePartsPage />;
}
