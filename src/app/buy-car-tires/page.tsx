import type { Metadata } from "next";

import BuyCarTiresPage from "@/components/pages/buy-car-tires/BuyCarTiresPage";

export const metadata: Metadata = {
  title: "Buy Car Tires - Ritz Auto Care Car Garage Dubai, UAE",
  description:
    "Trusted supplier of all types of car tires in Dubai — Bridgestone, Michelin, Pirelli, Dunlop, Yokohama, Continental, Hankook, Nexen and more. Order on WhatsApp.",
  alternates: { canonical: "/buy-car-tires/" },
};

export default function Page() {
  return <BuyCarTiresPage />;
}
