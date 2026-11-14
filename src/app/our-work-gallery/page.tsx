import type { Metadata } from "next";

import OurWorkGalleryPage from "@/components/pages/our-work-gallery/OurWorkGalleryPage";

export const metadata: Metadata = {
  title: "Our Work Gallery - Ritz Auto Care Car Garage Dubai, UAE",
  description:
    "Photos from the Ritz Auto Care workshop in Dubai — engine rebuilds, diagnostics, AC service, suspension and repairs on Mercedes, BMW, Audi, Range Rover, Lexus and more.",
  alternates: { canonical: "/our-work-gallery/" },
};

export default function Page() {
  return <OurWorkGalleryPage />;
}
