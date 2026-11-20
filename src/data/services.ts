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
  /** Arabic text (Arabic site). */
  ar: { category: string; title: string; description: string; features: string[] };
  image: string;
  icon: LucideIcon;
}

// Real Ritz Auto Care photos (from ritzautocare.ae), stored in /public/images/services/.
export const services: Service[] = [
  {
    id: "01",
    group: "Repair & Maintenance",
    category: "Repair",
    title: "Expert Car Repairs",
    description: "Engine, brake, suspension and electrical repairs by certified technicians.",
    features: ["Computer diagnostics", "Genuine & OEM parts", "Transparent pricing"],
    ar: {"category":"إصلاح","title":"إصلاح السيارات على يد خبراء","description":"إصلاح المحرك والفرامل ونظام التعليق والكهرباء على يد فنيين معتمدين.","features":["تشخيص بالكمبيوتر","قطع غيار أصلية ومعتمدة","أسعار شفافة"]},
    image: "/images/services/expert-car-repairs.webp",
    icon: Wrench,
  },
  {
    id: "02",
    group: "Roadside & Plans",
    category: "Roadside",
    title: "Roadside Assistance",
    description: "Fast help anywhere in Dubai when you are stuck — day or night.",
    features: ["Jump starts & towing", "Flat tyre change", "Quick response"],
    ar: {"category":"على الطريق","title":"المساعدة على الطريق","description":"مساعدة سريعة في أي مكان في دبي عندما تتعطل سيارتك — ليلاً أو نهاراً.","features":["تشغيل البطارية والسحب","تغيير الإطار المثقوب","استجابة سريعة"]},
    image: "/images/services/roadside-assistance.webp",
    icon: Truck,
  },
  {
    id: "03",
    group: "Tyres & Battery",
    category: "Battery",
    title: "Battery Services",
    description: "Testing, replacement and on-site fitting with the right battery for your car.",
    features: ["Battery health check", "On-site replacement", "Top brands in stock"],
    ar: {"category":"البطارية","title":"خدمات البطارية","description":"فحص واستبدال وتركيب في الموقع بالبطارية المناسبة لسيارتك.","features":["فحص صحة البطارية","استبدال في الموقع","أفضل العلامات متوفرة"]},
    image: "/images/services/battery-services.webp",
    icon: BatteryCharging,
  },
  {
    id: "04",
    group: "Tyres & Battery",
    category: "Tyres",
    title: "Tyre & Wheel Care",
    description: "Better grip, balanced handling and safer journeys on every road.",
    features: ["Supply & fitting", "Wheel balancing", "Alignment check"],
    ar: {"category":"الإطارات","title":"العناية بالإطارات والعجلات","description":"ثبات أفضل وتحكم متوازن ورحلات أكثر أماناً على كل طريق.","features":["توريد وتركيب","موازنة العجلات","فحص الضبط"]},
    image: "/images/services/tyre-wheel-care.webp",
    icon: CircleGauge,
  },
  {
    id: "05",
    group: "Repair & Maintenance",
    category: "Maintenance",
    title: "Periodic Maintenance",
    description: "Scheduled servicing that keeps your car reliable and protects its value.",
    features: ["Oil & filter change", "Fluid top-ups", "Multi-point check"],
    ar: {"category":"الصيانة","title":"الصيانة الدورية","description":"صيانة مجدولة تحافظ على موثوقية سيارتك وقيمتها.","features":["تغيير الزيت والفلتر","تعبئة السوائل","فحص متعدد النقاط"]},
    image: "/images/services/periodic-maintenance.webp",
    icon: Settings2,
  },
  {
    id: "06",
    group: "Roadside & Plans",
    category: "Service Contract",
    title: "Service Contracts",
    description: "Fixed-price maintenance plans built around your vehicle and mileage.",
    features: ["Predictable costs", "Priority booking", "Service reminders"],
    ar: {"category":"عقد الصيانة","title":"عقود الصيانة","description":"خطط صيانة بسعر ثابت مصممة حسب سيارتك وعدد الكيلومترات.","features":["تكاليف متوقعة","أولوية في الحجز","تذكير بمواعيد الصيانة"]},
    image: "/images/services/service-contracts.webp",
    icon: FileText,
  },
  {
    id: "07",
    group: "Repair & Maintenance",
    category: "AC Service",
    title: "Car AC Services",
    description: "Stay cool in UAE summers with complete AC diagnosis and repair.",
    features: ["Gas refill", "Compressor repair", "Cabin filter change"],
    ar: {"category":"خدمة المكيف","title":"خدمات مكيف السيارة","description":"ابقَ منتعشاً في صيف الإمارات مع تشخيص وإصلاح كامل للمكيف.","features":["تعبئة الغاز","إصلاح الضاغط","تغيير فلتر المقصورة"]},
    image: "/images/services/car-ac-services.webp",
    icon: Snowflake,
  },
  {
    id: "08",
    group: "Repair & Maintenance",
    category: "Inspection",
    title: "Vehicle Inspection",
    description: "A detailed health report before you buy, sell or travel.",
    features: ["Detailed checklist", "Written report", "Pre-purchase checks"],
    ar: {"category":"الفحص","title":"فحص السيارة","description":"تقرير مفصل عن حالة السيارة قبل الشراء أو البيع أو السفر.","features":["قائمة فحص مفصلة","تقرير مكتوب","فحص ما قبل الشراء"]},
    image: "/images/services/vehicle-inspection.webp",
    icon: ClipboardCheck,
  },
  {
    id: "09",
    group: "Detailing",
    category: "Detailing",
    title: "Premium Car Detailing",
    description: "Restore the shine inside and out with professional-grade products.",
    features: ["Paint correction", "Ceramic coating", "Interior deep clean"],
    ar: {"category":"التنظيف","title":"تنظيف وتلميع فاخر للسيارة","description":"استعد لمعان سيارتك من الداخل والخارج بمنتجات احترافية.","features":["تصحيح الطلاء","طلاء سيراميك","تنظيف داخلي عميق"]},
    image: "/images/services/car-detailing.webp",
    icon: Sparkles,
  },
];
