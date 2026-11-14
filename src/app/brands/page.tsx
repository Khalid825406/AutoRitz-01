import type { Metadata } from "next";

import BrandsIndexPage from "@/components/pages/brands/BrandsIndexPage";

export const metadata: Metadata = {
  title: "Brands - Ritz Auto Care Car Garage Dubai, UAE",
  description:
    "We serve & repair all brands & models — Mercedes-Benz, BMW, Audi, Porsche, Land Rover, Lexus, Toyota, Nissan, Ferrari, Rolls-Royce and more in Dubai.",
  alternates: { canonical: "/brands/" },
};

export default function Page() {
  return <BrandsIndexPage />;
}
