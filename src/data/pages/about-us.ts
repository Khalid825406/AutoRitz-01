/**
 * Content of https://ritzautocare.ae/about-us/ (original site).
 * Paragraphs were only partially readable from the source and are summarised; headings and labels are as written.
 */

const IMG = "/images/pages/about-us";

export const ABOUT = {
  images: [`${IMG}/intro-1.webp`, `${IMG}/intro-2.webp`] as [string, string],
  eyebrow: "Who We Are ?",
  heading: "Professional Car Repair & Maintenance Center",
  text: "Ritz Auto Care LLC delivers expert car repair and maintenance using advanced diagnostics and modern equipment. From routine servicing to complex repairs, we focus on quality workmanship and complete customer satisfaction.",
  points: [
    "Over 150,000 Cars Repaired",
    "100% Satisfaction",
    "Flexible & Affordable Prices",
    "Certified & Award Winning",
    "Trusted Company",
    "Convenient Location",
  ],
  callLabel: "Call Us Anytime!",
};

export const CEO = {
  name: "Vaseem Khan",
  role: "CEO, RITZ Auto Care",
  heading: "Vaseem Khan - CEO (Message), RITZ Auto Care",
  image: `${IMG}/ceo-vaseem-khan.webp`,
  message: [
    "With more than 20 years in the automotive service industry, I have grown from working as a mechanic to leading Ritz Auto Care as its CEO.",
    "Our team is built on transparent service, modern technology, continuous staff training and complete customer satisfaction — guided by honesty, quality and innovation in everything we do.",
  ],
};

export const EXPERT_CARE = {
  heading: "Expert Care for",
  highlight: "German, American, European & Japanese Cars.",
  text: "From routine servicing to advanced repairs, we deliver dealership-quality care for all major brands.",
};
