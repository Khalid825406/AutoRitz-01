import type { Metadata } from "next";

import AboutUsPage from "@/components/pages/about-us/AboutUsPage";

export const metadata: Metadata = {
  title: "About Us - Ritz Auto Care Car Garage Dubai, UAE",
  description:
    "Ritz Auto Care LLC — professional car repair & maintenance center in Dubai. Expert care for German, American, European & Japanese cars, led by CEO Vaseem Khan.",
  alternates: { canonical: "/about-us/" },
};

export default function Page() {
  return <AboutUsPage />;
}
