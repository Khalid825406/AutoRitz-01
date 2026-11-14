import type { Metadata } from "next";

import ServiceContractPage from "@/components/pages/service-contract/ServiceContractPage";

export const metadata: Metadata = {
  title: "Service Contract - Ritz Auto Care Car Garage Dubai, UAE",
  description:
    "Basic and Signature service contracts for 4, 6 and 8-cylinder vehicles in Dubai — scheduled minor & major services, parts and labour discounts, 24/7 roadside support. No annual commitment.",
  alternates: { canonical: "/service-contract/" },
};

export default function Page() {
  return <ServiceContractPage />;
}
