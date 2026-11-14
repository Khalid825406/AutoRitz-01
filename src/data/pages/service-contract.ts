/**
 * Content of https://ritzautocare.ae/service-contract/ (original site).
 * Each plan is offered for 4-, 6- and 8-cylinder vehicles with the same inclusions. No prices are listed.
 * The original shows the label "Standard Premium" above the plans; Basic = Standard, Signature = Premium is inferred.
 */

export const CYLINDERS = ["4-Cylinder", "6-Cylinder", "8-Cylinder"] as const;
export type Cylinder = (typeof CYLINDERS)[number];

export interface ContractPlan {
  id: "basic" | "signature";
  name: string;
  tier: string;
  coverage: string;
  features: string[];
}

export const CONTRACT_PLANS: ContractPlan[] = [
  {
    id: "basic",
    name: "Basic Contract",
    tier: "Standard",
    coverage: "Up to 50,000 km",
    features: [
      "Up to 50,000 km Coverage (No Annual Commitment)",
      "3 Scheduled Minor Services",
      "2 Comprehensive Major Services",
      "10% Off Genuine Spare Parts",
      "15% Off Labour Charges",
      "10% Off Onsite Services",
      "Unlimited Battery Boost Assistance",
      "24/7 Roadside Support",
      "Premium Quartz Oil & Standard Oil Filter",
    ],
  },
  {
    id: "signature",
    name: "Signature Contract",
    tier: "Premium",
    coverage: "Up to 70,000 km",
    features: [
      "Vehicle Coverage Up to 70,000 km (No Annual Commitment)",
      "Five Scheduled Minor Services (Every 10,000 km)",
      "Two Complete Major Services",
      "OEM Filters & Spark Plug Replacement",
      "15% Off Genuine Spare Parts",
      "20% Off Mobile Assistance Services",
      "30% Off Labour Charges",
      "Unlimited Battery Assistance",
      "24/7 Roadside Support",
      "Mobil 1 Premium Oil with Genuine Filter",
    ],
  },
];

/** Side-by-side comparison built from the two feature lists above. */
export const CONTRACT_COMPARISON: { label: string; basic: string; signature: string }[] = [
  { label: "Coverage (no annual commitment)", basic: "Up to 50,000 km", signature: "Up to 70,000 km" },
  { label: "Scheduled minor services", basic: "3", signature: "5 (every 10,000 km)" },
  { label: "Major services", basic: "2 comprehensive", signature: "2 complete" },
  { label: "Engine oil & filter", basic: "Premium Quartz oil & standard filter", signature: "Mobil 1 premium oil & genuine filter" },
  { label: "OEM filters & spark plug replacement", basic: "—", signature: "Included" },
  { label: "Genuine spare parts", basic: "10% off", signature: "15% off" },
  { label: "Labour charges", basic: "15% off", signature: "30% off" },
  { label: "Onsite / mobile assistance services", basic: "10% off", signature: "20% off" },
  { label: "Battery assistance", basic: "Unlimited", signature: "Unlimited" },
  { label: "24/7 roadside support", basic: "Included", signature: "Included" },
];
