"use client";

import { CircleDot } from "lucide-react";

import ProductShopPage from "@/components/page/ProductShopPage";
import { TIRE_BRANDS, TIRE_PRODUCTS } from "@/data/pages/buy-car-tires";

export default function BuyCarTiresPage() {
  return (
    <ProductShopPage
      title="Buy Car Tires"
      eyebrow="Car tires"
      subtitle="Trusted Supplier of All Types of Tires in Dubai"
      enquiry="Hi Ritz Auto Care, I'd like to buy car tires."
      section={{
        eyebrow: "Tires in stock",
        icon: CircleDot,
        title: "All Types of Tires",
        highlight: "in Dubai.",
        description: "Send us your tyre size on WhatsApp — we'll confirm availability and price.",
      }}
      products={TIRE_PRODUCTS}
      brandsLabel="Tire brands we supply"
      brands={TIRE_BRANDS}
      fitting={{
        title: "Need them fitted?",
        text: "We fit, balance and align your new tyres at our workshop.",
        href: "#appointment",
        label: "Book tyre fitting",
      }}
      defaultService="Tyre Replacement"
    />
  );
}
