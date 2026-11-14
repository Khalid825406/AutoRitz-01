import type { Metadata } from "next";

import CustomerReviewsPage from "@/components/pages/customer-reviews/CustomerReviewsPage";

export const metadata: Metadata = {
  title: "Customer Reviews - Ritz Auto Care Car Garage Dubai, UAE",
  description: "What our customers say — experiences shared by customers of Ritz Auto Care, car repair and service in Dubai.",
  alternates: { canonical: "/customer-reviews/" },
};

export default function Page() {
  return <CustomerReviewsPage />;
}
