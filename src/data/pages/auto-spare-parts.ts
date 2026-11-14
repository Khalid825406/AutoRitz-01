/**
 * Content of https://ritzautocare.ae/service/auto-spare-parts-trading/ (original site).
 * Corrections vs the original:
 *  - the intro named "Imperial Zone Auto Care LLC" (another company) — corrected to Ritz Auto Care;
 *  - the "Free Call : 800 49321" number differs from Ritz's toll-free 80079772 — Ritz's number is used.
 */

const IMG = "/images/pages/services/auto-spare-parts-trading";

export const SPARE_PARTS = {
  title: "Auto Spare Parts & Components Trading",
  intro:
    "Ritz Auto Care LLC supplies auto spare parts and components for all makes and models in Dubai — both OEM and aftermarket — chosen to be genuine, durable and cost-effective.",
  heroImage: `${IMG}/hero.webp`,
  sideImage: `${IMG}/side.webp`,
  listHeading: "Our Auto Spare Parts & Trading Services Include",
  items: [
    { key: "oem", title: "Genuine OEM & Aftermarket Parts", text: "High-quality replacements for all vehicle brands." },
    { key: "engine", title: "Engine Components", text: "Pistons, camshafts, fuel injectors, and more." },
    { key: "brake", title: "Brake System Parts", text: "Brake pads, rotors, calipers and sensors." },
    { key: "suspension", title: "Suspension & Steering Parts", text: "Shock absorbers, struts, ball joints and tie rods." },
    { key: "electrical", title: "Electrical & Lighting Components", text: "Batteries, alternators, starters and LED headlights." },
    { key: "ac", title: "Air Conditioning & Cooling Parts", text: "AC compressors, condensers and radiators." },
    { key: "transmission", title: "Transmission & Clutch Parts", text: "Gearboxes, clutch kits and flywheels." },
    { key: "body", title: "Body & Exterior Parts", text: "Bumpers, fenders, mirrors and grills." },
    { key: "filters", title: "Filters & Fluids", text: "Oil filters, air filters, transmission fluids and coolants." },
  ],
} as const;
