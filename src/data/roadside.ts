import { BatteryCharging, CircleDot, Fuel, Zap, type LucideIcon } from "lucide-react";

export interface RoadsideService {
  id: string;
  title: string;
  description: string;
  /** Put the photo in /public/images/roadside/. A branded placeholder shows until it exists. */
  image: string;
  icon: LucideIcon;
}

export const roadsideServices: RoadsideService[] = [
  {
    id: "01",
    title: "Car Battery Change",
    description: "Fast replacement with testing and professional installation.",
    image: "/images/roadside/battery.webp",
    icon: BatteryCharging,
  },
  {
    id: "02",
    title: "Jump Start",
    description: "Emergency jump-start assistance to get you moving quickly.",
    image: "/images/roadside/jump-start.webp",
    icon: Zap,
  },
  {
    id: "03",
    title: "Flat Tyre Change",
    description: "Quick tyre replacement and roadside puncture assistance.",
    image: "/images/roadside/flat-tyre.webp",
    icon: CircleDot,
  },
  {
    id: "04",
    title: "Fuel Delivery",
    description: "On-demand fuel delivery whenever you're stranded.",
    image: "/images/roadside/fuel-delivery.webp",
    icon: Fuel,
  },
];
