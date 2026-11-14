import type { Metadata } from "next";

import ServiceAreasPage from "@/components/pages/service-areas/ServiceAreasPage";

export const metadata: Metadata = {
  title: "Service Areas - Ritz Auto Care Car Garage Dubai, UAE",
  description:
    "We serve across Dubai — Dubai Marina, Al Barsha, Business Bay, Palm Jumeirah, JVC, Mirdif, Dubai Hills, Dubai Investment Park and 40+ more areas with free pick-up & delivery.",
  alternates: { canonical: "/service-areas/" },
};

export default function Page() {
  return <ServiceAreasPage />;
}
