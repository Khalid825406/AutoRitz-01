/**
 * Content of https://ritzautocare.ae/roadside-support/ (original site).
 * Long passages were only partially readable from the source; those are marked "summarised".
 */
import type { Faq } from "@/components/page/FaqSection";

export const HIGHLIGHTS = [
  {
    title: "Pick-Up & Drop-Off",
    text: "We collect your vehicle from your location and return it safely after professional roadside assistance or repair.",
  },
  {
    title: "All Emirates in UAE",
    text: "Reliable roadside assistance available across all Emirates with fast response and trusted service whenever needed.",
  },
  {
    title: "30–45 Minute Arrival",
    text: "Our experienced roadside team arrives within 30–45 minutes to get you back on the road quickly.",
  },
];

/** "Expert Roadside Assistance" cards — each "Book Now" opens WhatsApp. */
export const ROADSIDE_SERVICES = [
  "Car Towing",
  "Jump Start",
  "Fuel Delivery",
  "Tyre Change",
  "Car Lockout",
  "Off-Road Recovery",
] as const;

export { WHY_US } from "./common";

/** FAQ — answers summarised from the original where the full text was not readable. */
export const FAQS: Faq[] = [
  {
    q: "Why choose Ritz Auto Care?",
    a: "Ritz Auto Care combines experienced technicians, advanced equipment, genuine parts and exceptional customer service to keep your vehicle in top condition.",
  },
  {
    q: "Do you provide warranty on repairs?",
    a: "Yes. We stand behind the quality of our workmanship and parts. Warranty coverage varies depending on the service or component.",
  },
  {
    q: "How long does a routine car service take?",
    a: "Most routine maintenance services are completed on the same day. For major repairs we give you an estimated time after inspection.",
  },
  {
    q: "Can I service my vehicle without an appointment?",
    a: "Walk-ins are welcome, subject to workshop availability. We recommend booking in advance to avoid waiting.",
  },
  {
    q: "What services does Ritz Auto Care offer?",
    a: "We provide complete automotive solutions, including periodic maintenance, repairs, diagnostics and roadside assistance.",
  },
];
