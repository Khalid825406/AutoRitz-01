"use client";

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
import { useBookService } from "@/lib/hooks/useBookService";

/**
 * Every "Book" / "Free quote" button on the homepage opens the appointment form on the
 * Contact page, with the chosen service (if any) already filled in.
 */
export default function HomePage() {
  const book = useBookService();

  return (
    <main>
      <Header onBook={() => book()} />
      <Hero onBook={book} />
      <ServicesSection onBook={book} />
      <RoadsideSection onBook={book} />
      <ProcessSection onBook={book} />
      <BenefitsSection onBook={book} />
      <BrandsSection />
      <ServiceAreas onBook={book} />
      <AboutSection onBook={book} />
      <WorkGallery />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
