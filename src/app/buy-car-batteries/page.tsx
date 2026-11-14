import type { Metadata } from "next";

import BuyCarBatteriesPage from "@/components/pages/buy-car-batteries/BuyCarBatteriesPage";

export const metadata: Metadata = {
  title: "Buy Car Batteries - Ritz Auto Care Car Garage Dubai, UAE",
  description:
    "Trusted supplier of all types of car batteries in Dubai — Bosch, Energizer, Fiamm, Powertech, Varta, Amaron, ACDelco and more. Order on WhatsApp.",
  alternates: { canonical: "/buy-car-batteries/" },
};

export default function Page() {
  return <BuyCarBatteriesPage />;
}
