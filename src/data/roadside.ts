import { BatteryCharging, CircleDot, Fuel, Zap, type LucideIcon } from "lucide-react";

export interface RoadsideService {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  /** Put the photo in /public/images/roadside/. A branded placeholder shows until it exists. */
  image: string;
  icon: LucideIcon;
}

export const roadsideServices: RoadsideService[] = [
  {
    id: "01",
    title: "Car Battery Change",
    titleAr: "تغيير بطارية السيارة",
    description: "Fast replacement with testing and professional installation.",
    descriptionAr: "استبدال سريع مع الفحص والتركيب الاحترافي.",
    image: "/images/roadside/battery.webp",
    icon: BatteryCharging,
  },
  {
    id: "02",
    title: "Jump Start",
    titleAr: "تشغيل السيارة بالكابلات",
    description: "Emergency jump-start assistance to get you moving quickly.",
    descriptionAr: "مساعدة طارئة لتشغيل سيارتك لتعود إلى الطريق بسرعة.",
    image: "/images/roadside/jump-start.webp",
    icon: Zap,
  },
  {
    id: "03",
    title: "Flat Tyre Change",
    titleAr: "تغيير الإطار المثقوب",
    description: "Quick tyre replacement and roadside puncture assistance.",
    descriptionAr: "استبدال سريع للإطار ومساعدة في إصلاح الثقب على الطريق.",
    image: "/images/roadside/flat-tyre.webp",
    icon: CircleDot,
  },
  {
    id: "04",
    title: "Fuel Delivery",
    titleAr: "توصيل الوقود",
    description: "On-demand fuel delivery whenever you're stranded.",
    descriptionAr: "توصيل الوقود عند الطلب كلما تعطلت سيارتك.",
    image: "/images/roadside/fuel-delivery.webp",
    icon: Fuel,
  },
];
