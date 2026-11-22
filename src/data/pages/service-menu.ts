import { SERVICES } from "./services";

/** Arabic service names — search keywords only, so Arabic visitors can search in Arabic (the page itself is translated by Google). */
export const SERVICE_TITLES_AR: Record<string, string> = {
  "car-battery-replacement": "تغيير بطارية السيارة",
  "jump-start": "تشغيل السيارة بالكابلات",
  "flat-tyre-change": "تغيير الإطار المثقوب",
  "fuel-delivery-service": "توصيل الوقود",
  "car-oil-change": "تغيير زيت السيارة",
  "car-ac-repair-service": "إصلاح مكيف السيارة",
  "car-ac-gas-refilling": "تعبئة غاز مكيف السيارة",
  "engine-rebuild": "إعادة بناء المحرك",
  "brake-pad-change": "تغيير فحمات الفرامل",
  "gear-oil-change": "تغيير زيت ناقل الحركة",
  "car-polishing-detailing": "تلميع وتنظيف السيارة",
  "car-electric-repair": "إصلاح كهرباء السيارة",
  "new-tyres-change": "تغيير الإطارات الجديدة",
  "suspension-repair": "إصلاح نظام التعليق",
  "steering-box-repair": "إصلاح علبة التوجيه",
  "fuel-system-repair": "إصلاح نظام الوقود",
  "wheel-alignment-wheel-balancing": "ضبط وموازنة العجلات",
  "car-electronic-equipment-programing": "برمجة الأجهزة الإلكترونية للسيارة",
  "transporting-towing-vehicles": "نقل وسحب المركبات",
  "car-denting-painting": "السمكرة والدهان",
  "car-upholstery": "تنجيد السيارات",
  "auto-glass": "زجاج السيارات"
};

export interface ServiceMenuItem {
  title: string;
  titleAr: string;
  slug: string;
  /** Service's own page, or the /service/ grid at its card when it has no page yet. */
  href: string;
}

/** Header "Services" menu: all 22 services, same order as ritzautocare.ae. */
export const SERVICE_MENU: ServiceMenuItem[] = SERVICES.map((s) => ({
  title: s.title,
  titleAr: SERVICE_TITLES_AR[s.slug] ?? s.title,
  slug: s.slug,
  href: s.detail ? `/service/${s.slug}/` : `/service/#service-${s.slug}`,
}));

/** Pages linked at the side of the menu. */
export const SERVICE_MENU_EXTRAS = [
  { label: "All services", labelAr: "جميع الخدمات", href: "/service/", description: "Complete auto care under one roof", descriptionAr: "عناية متكاملة بالسيارة تحت سقف واحد" },
  { label: "Auto Spare Parts", labelAr: "قطع غيار السيارات", href: "/service/auto-spare-parts-trading/", description: "OEM & aftermarket parts trading", descriptionAr: "تجارة قطع الغيار الأصلية والبديلة" },
  { label: "Roadside Support", labelAr: "المساعدة على الطريق", href: "/roadside-support/", description: "Towing, jump start, fuel delivery", descriptionAr: "سحب، تشغيل البطارية، توصيل الوقود" },
];
