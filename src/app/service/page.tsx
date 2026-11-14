import type { Metadata } from "next";

import ServicesIndexPage from "@/components/pages/services/ServicesIndexPage";

export const metadata: Metadata = {
  title: "Services - Ritz Auto Care Car Garage Dubai, UAE",
  description:
    "Complete auto care solutions under one roof — battery, tyres, oil change, AC repair, engine rebuild, brakes, detailing, denting & painting, towing and more in Dubai.",
  alternates: { canonical: "/service/" },
};

export default function Page() {
  return <ServicesIndexPage />;
}
