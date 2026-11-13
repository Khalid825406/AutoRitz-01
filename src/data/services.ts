import {
  Wrench,
  Truck,
  BatteryCharging,
  CircleGauge,
  Settings2,
  FileText,
  Snowflake,
  ClipboardCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/** Top-level groups shown as tabs in the Services section. */
export const SERVICE_GROUPS = [
  "Repair & Maintenance",
  "Tyres & Battery",
  "Roadside & Plans",
  "Detailing",
] as const;

export type ServiceGroup = (typeof SERVICE_GROUPS)[number];

export interface Service {
  id: string;
  group: ServiceGroup;
  category: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  icon: LucideIcon;
}

// Replace image URLs with your own workshop photos (put them in /public) for best results.
export const services: Service[] = [
  {
    id: "01",
    group: "Repair & Maintenance",
    category: "Repair",
    title: "Expert Car Repairs",
    description: "Engine, brake, suspension and electrical repairs by certified technicians.",
    features: ["Computer diagnostics", "Genuine & OEM parts", "Transparent pricing"],
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1000&q=80",
    icon: Wrench,
  },
  {
    id: "02",
    group: "Roadside & Plans",
    category: "Roadside",
    title: "Roadside Assistance",
    description: "Fast help across the UAE when you are stuck — day or night.",
    features: ["Jump starts & towing", "Flat tyre change", "Quick response"],
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1000&q=80",
    icon: Truck,
  },
  {
    id: "03",
    group: "Tyres & Battery",
    category: "Battery",
    title: "Battery Services",
    description: "Testing, replacement and on-site fitting with the right battery for your car.",
    features: ["Battery health check", "On-site replacement", "Top brands in stock"],
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80",
    icon: BatteryCharging,
  },
  {
    id: "04",
    group: "Tyres & Battery",
    category: "Tyres",
    title: "Tyre & Wheel Care",
    description: "Better grip, balanced handling and safer journeys on every road.",
    features: ["Supply & fitting", "Wheel balancing", "Alignment check"],
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=80",
    icon: CircleGauge,
  },
  {
    id: "05",
    group: "Repair & Maintenance",
    category: "Maintenance",
    title: "Periodic Maintenance",
    description: "Scheduled servicing that keeps your car reliable and protects its value.",
    features: ["Oil & filter change", "Fluid top-ups", "Multi-point check"],
    image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=1000&q=80",
    icon: Settings2,
  },
  {
    id: "06",
    group: "Roadside & Plans",
    category: "Service Contract",
    title: "Service Contracts",
    description: "Fixed-price maintenance plans built around your vehicle and mileage.",
    features: ["Predictable costs", "Priority booking", "Service reminders"],
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=80",
    icon: FileText,
  },
  {
    id: "07",
    group: "Repair & Maintenance",
    category: "AC Service",
    title: "Car AC Services",
    description: "Stay cool in UAE summers with complete AC diagnosis and repair.",
    features: ["Gas refill", "Compressor repair", "Cabin filter change"],
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1000&q=80",
    icon: Snowflake,
  },
  {
    id: "08",
    group: "Repair & Maintenance",
    category: "Inspection",
    title: "Vehicle Inspection",
    description: "A detailed health report before you buy, sell or travel.",
    features: ["Detailed checklist", "Written report", "Pre-purchase checks"],
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80",
    icon: ClipboardCheck,
  },
  {
    id: "09",
    group: "Detailing",
    category: "Detailing",
    title: "Premium Car Detailing",
    description: "Restore the shine inside and out with professional-grade products.",
    features: ["Paint correction", "Ceramic coating", "Interior deep clean"],
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1000&q=80",
    icon: Sparkles,
  },
];
