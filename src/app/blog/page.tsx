import type { Metadata } from "next";

import BlogIndexPage from "@/components/pages/blog/BlogIndexPage";

export const metadata: Metadata = {
  title: "Blog - Ritz Auto Care Car Garage Dubai, UAE",
  description:
    "Car care tips from Ritz Auto Care in Dubai — battery warning signs, flat tyres, oil changes, AC repair, engine rebuilds and coolant leaks.",
  alternates: { canonical: "/blog/" },
};

export default function Page() {
  return <BlogIndexPage />;
}
