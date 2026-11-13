"use client";

import { useCallback, useState } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/hero/Hero";
import ServicesSection from "@/components/sections/services/ServicesSection";
import RoadsideSection from "@/components/sections/roadside/RoadsideSection";
import ProcessSection from "@/components/sections/process/ProcessSection";
import BenefitsSection from "@/components/sections/benefits/BenefitsSection";
import BrandsSection from "@/components/sections/brands/BrandsSection";
import TestimonialsSection from "@/components/sections/testimonials/TestimonialsSection";
import ServiceAreas from "@/components/sections/service-areas/ServiceAreas";
import AboutSection from "@/components/sections/about/AboutSection";
import WorkGallery from "@/components/sections/work-gallery/WorkGallery";
// import BookingModal from "@/components/booking/BookingModal";

export default function HomePage() {
  const [, setOpen] = useState(false);
  const [, setService] = useState<string | undefined>();

  const book = useCallback((s?: string) => {
    setService(s);
    setOpen(true);
  }, []);

  return (
    <main>
      <Header onBook={() => book()} />
      <Hero onBook={book} />
      <ServicesSection onBook={book} />
      <RoadsideSection onBook={book} />
      <ProcessSection onBook={book} />
      <BenefitsSection onBook={book} />
      <BrandsSection onBook={book} />
      <ServiceAreas />
      <AboutSection />
      <WorkGallery />
      <TestimonialsSection />
      {/* Enable when bookings go live:
      <BookingModal open={open} initialService={service} onClose={() => setOpen(false)} /> */}
      <Footer />
    </main>
  );
}
