import type { Metadata } from "next";

import ContactUsPage from "@/components/pages/contact-us/ContactUsPage";

export const metadata: Metadata = {
  title: "Contact Us - Ritz Auto Care Car Garage Dubai, UAE",
  description:
    "Contact Ritz Auto Care LLC — toll free 80079772, WhatsApp +971 567807979, info@ritzautocare.ae. Warehouse 35, Street 59, near AIKO Mall, Dubai Investment Park First, Dubai.",
  alternates: { canonical: "/contact-us/" },
};

export default function Page() {
  return <ContactUsPage />;
}
