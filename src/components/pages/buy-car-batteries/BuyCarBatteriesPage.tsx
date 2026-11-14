"use client";

import { BatteryCharging } from "lucide-react";

import ProductShopPage from "@/components/page/ProductShopPage";
import { BATTERY_BRANDS, BATTERY_PRODUCTS } from "@/data/pages/buy-car-batteries";

export default function BuyCarBatteriesPage() {
  return (
    <ProductShopPage
      title="Buy Car Batteries"
      eyebrow="Car batteries"
      subtitle="Trusted Supplier of All Types of Batteries in Dubai"
      enquiry="Hi Ritz Auto Care, I'd like to buy a car battery."
      section={{
        eyebrow: "Batteries in stock",
        icon: BatteryCharging,
        title: "All Types of Batteries",
        highlight: "in Dubai.",
        description: "Ask us on WhatsApp for the right battery for your car — we'll confirm fitment and price.",
      }}
      products={BATTERY_PRODUCTS}
      brandsLabel="Battery brands we supply"
      brands={BATTERY_BRANDS}
      fitting={{
        title: "Need it fitted?",
        text: "Our technicians test, install and check your charging system.",
        href: "/service/car-battery-replacement/",
        label: "Car Battery Change service",
      }}
      defaultService="Battery Replacement"
    />
  );
}
