import type { Metadata } from "next";

import CareersPage from "@/components/pages/careers/CareersPage";

export const metadata: Metadata = {
  title: "Careers - Ritz Auto Care Car Garage Dubai, UAE",
  description:
    "Drive your career forward with Ritz Auto Care LLC in Dubai — we're hiring experienced technicians and newcomers in denting & painting, auto electric, maintenance, towing and mobile repair.",
  alternates: { canonical: "/careers/" },
};

export default function Page() {
  return <CareersPage />;
}
