/**
 * Services from https://ritzautocare.ae/service/ (all 22, same order and slugs as the original).
 * A service gets its own page only once it has a `detail` — the others are listed but not linked yet.
 * Long passages from the original were summarised where the full text was not readable.
 */
import type { Faq } from "@/components/page/FaqSection";

export interface ServiceDetail {
  /** "Professional … Process" section */
  process: {
    title: string;
    intro: string;
    image: string;
    steps: { title: string; text: string; image?: string }[];
  };
  /** Feature block, e.g. "Premium Batteries We Use" */
  features: {
    title: string;
    intro: string;
    image: string;
    items: { title: string; text: string }[];
  };
  faqs: Faq[];
  /** Pre-selected option in the appointment form */
  appointmentService?: string;
  metaDescription: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  detail?: ServiceDetail;
}

const IMG = "/images/pages/services";

export const SERVICES: ServiceItem[] = [
  {
    slug: "car-battery-replacement",
    title: "Car Battery Change",
    detail: {
      metaDescription:
        "Fast, professional car battery replacement in Dubai — battery health diagnosis, premium battery installation and full charging-system check. Done in 20–30 minutes.",
      process: {
        title: "Professional Car Battery Replacement Process",
        intro:
          "Fast, reliable and professional battery replacement with premium batteries, advanced testing equipment and expert installation for all makes and models.",
        image: `${IMG}/car-battery-replacement/process.webp`,
        steps: [
          {
            title: "Battery Health Diagnosis",
            text: "We inspect the battery, charging system and alternator to find the real cause before replacing anything.",
            image: `${IMG}/car-battery-replacement/diagnosis.webp`,
          },
          {
            title: "Premium Battery Installation",
            text: "A high-quality battery is fitted to your vehicle's specification, secured properly, with terminal protection.",
            image: `${IMG}/car-battery-replacement/installation.webp`,
          },
          {
            title: "Final Performance Check",
            text: "A full charging-system test and engine start check before your car is handed back.",
          },
        ],
      },
      features: {
        title: "Premium Batteries We Use",
        intro: "We use batteries from trusted international brands, built for durability and reliability.",
        image: `${IMG}/car-battery-replacement/premium-batteries.webp`,
        items: [
          { title: "Battery Testing", text: "Advanced battery health and charging-performance testing." },
          { title: "Battery Replacement", text: "High-quality batteries from trusted brands." },
          { title: "Charging System Check", text: "Alternator and electrical system inspection." },
          { title: "Old Battery Disposal", text: "Eco-friendly disposal as part of our green initiative." },
        ],
      },
      faqs: [
        {
          q: "How do I know if my car battery needs replacing?",
          a: "Common signs are slow cranking, dim headlights, a battery warning on the dashboard, clicking when you start the car, or the car not starting at all. We run a battery health check before recommending a replacement.",
        },
        {
          q: "How long does a car battery replacement take?",
          a: "Most replacements are done in 20–30 minutes, depending on the vehicle. Installation, testing and the charging-system check are included.",
        },
        {
          q: "Do you provide emergency battery replacement anywhere in Dubai?",
          a: "Yes. We offer mobile battery replacement and roadside assistance across Dubai, done on-site.",
        },
        {
          q: "Which battery brands do you supply?",
          a: "Premium brands including Bosch, Energizer, Fiamm, Powertech, Varta, Eastman, Eveready, Volta and other leading brands.",
        },
        {
          q: "Do you test the charging system after installing a new battery?",
          a: "Yes. We test the alternator, battery voltage, charging performance and electrical connections before your car leaves.",
        },
      ],
      appointmentService: "Battery Replacement",
    },
  },
  { slug: "jump-start", title: "Jump Start" },
  { slug: "flat-tyre-change", title: "Flat Tyre Change" },
  { slug: "fuel-delivery-service", title: "Fuel Delivery" },
  { slug: "car-oil-change", title: "Car Oil Change" },
  { slug: "car-ac-repair-service", title: "Car AC Repair" },
  { slug: "car-ac-gas-refilling", title: "Car AC Gas Refilling" },
  { slug: "engine-rebuild", title: "Engine Rebuild" },
  { slug: "brake-pad-change", title: "Brake Pad Change" },
  { slug: "gear-oil-change", title: "Gear Oil Change" },
  { slug: "car-polishing-detailing", title: "Car Polishing & Detailing" },
  { slug: "car-electric-repair", title: "Car Electric Repair" },
  { slug: "new-tyres-change", title: "New Tyres Change" },
  { slug: "suspension-repair", title: "Suspension Repair" },
  { slug: "steering-box-repair", title: "Steering Box Repair" },
  { slug: "fuel-system-repair", title: "Fuel System Repair" },
  { slug: "wheel-alignment-wheel-balancing", title: "Wheel Alignment & Balancing" },
  { slug: "car-electronic-equipment-programing", title: "Car Electronic Equipment Programming" },
  { slug: "transporting-towing-vehicles", title: "Transporting & Towing Vehicles" },
  { slug: "car-denting-painting", title: "Denting & Painting" },
  { slug: "car-upholstery", title: "Car Upholstery" },
  { slug: "auto-glass", title: "Auto Glass" },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
