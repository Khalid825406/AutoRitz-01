import type { Metadata } from "next";

import VehicleInspectionPage from "@/components/pages/complimentary-vehicle-inspection/VehicleInspectionPage";

export const metadata: Metadata = {
  title: "Complimentary Vehicle Inspection - Ritz Auto Care Car Garage Dubai, UAE",
  description:
    "Free car inspection & computer check in Dubai for every brand and model — lighting, power windows, sunroof and ECU/sensor diagnostics. AI-powered vehicle inspection by Ritz Auto Care LLC.",
  alternates: { canonical: "/complimentary-vehicle-inspection/" },
};

export default function Page() {
  return <VehicleInspectionPage />;
}
