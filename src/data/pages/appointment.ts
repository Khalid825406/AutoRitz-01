/** Service options of the "Set An Appointment Today" form on ritzautocare.ae. */
export const APPOINTMENT_SERVICES = [
  "Oil Change",
  "Oil Filter Replacement",
  "Brake Repair",
  "Brake Pad Replacement",
  "AC Repair",
  "Battery Replacement",
  "Gearbox Repair",
  "Transmission Service",
  "Engine Repair",
  "Engine Diagnostics",
  "Wheel Alignment",
  "Wheel Balancing",
  "Suspension Repair",
  "Tyre Replacement",
  "Coolant Replacement",
  "Spark Plug Replacement",
  "Air Filter Replacement",
  "Fuel Filter Replacement",
  "Car Inspection",
  "Computer Diagnostics",
  "Timing Belt Replacement",
  "Steering Repair",
  "Electrical Repair",
  "AC Gas Refill",
  "Major Service",
  "Minor Service",
  "Other Service",
] as const;

type AppointmentService = (typeof APPOINTMENT_SERVICES)[number];

/** Arabic names of the form options — search keywords only (the page itself is translated by Google). */
export const APPOINTMENT_SERVICES_AR: Record<AppointmentService, string> = {
  "Oil Change": "تغيير الزيت",
  "Oil Filter Replacement": "تغيير فلتر الزيت",
  "Brake Repair": "إصلاح الفرامل",
  "Brake Pad Replacement": "تغيير فحمات الفرامل",
  "AC Repair": "إصلاح المكيف",
  "Battery Replacement": "تغيير البطارية",
  "Gearbox Repair": "إصلاح علبة التروس",
  "Transmission Service": "صيانة ناقل الحركة",
  "Engine Repair": "إصلاح المحرك",
  "Engine Diagnostics": "تشخيص المحرك",
  "Wheel Alignment": "ضبط زوايا العجلات",
  "Wheel Balancing": "موازنة العجلات",
  "Suspension Repair": "إصلاح نظام التعليق",
  "Tyre Replacement": "تغيير الإطارات",
  "Coolant Replacement": "تغيير سائل التبريد",
  "Spark Plug Replacement": "تغيير شمعات الإشعال",
  "Air Filter Replacement": "تغيير فلتر الهواء",
  "Fuel Filter Replacement": "تغيير فلتر الوقود",
  "Car Inspection": "فحص السيارة",
  "Computer Diagnostics": "الفحص بالكمبيوتر",
  "Timing Belt Replacement": "تغيير سير التوقيت",
  "Steering Repair": "إصلاح التوجيه",
  "Electrical Repair": "إصلاح الكهرباء",
  "AC Gas Refill": "تعبئة غاز المكيف",
  "Major Service": "صيانة شاملة",
  "Minor Service": "صيانة بسيطة",
  "Other Service": "خدمة أخرى",
};

/** Homepage service names → closest option of the appointment form. */
const SERVICE_ALIASES: Record<string, AppointmentService> = {
  "battery services": "Battery Replacement",
  "car battery change": "Battery Replacement",
  "car ac services": "AC Repair",
  "tyre & wheel care": "Tyre Replacement",
  "vehicle inspection": "Car Inspection",
  "free inspection": "Car Inspection",
  "free vehicle inspection": "Car Inspection",
  "periodic maintenance": "Major Service",
};

/**
 * Picks the form option for a service requested from another page.
 * Returns the option (or "Other Service" when there is no close match) plus whether
 * the original name should also go in the message box so nothing is lost.
 */
export function matchAppointmentService(requested: string): { option: AppointmentService; exact: boolean } {
  const key = requested.trim().toLowerCase();
  const direct = APPOINTMENT_SERVICES.find((s) => s.toLowerCase() === key);
  if (direct) return { option: direct, exact: true };
  const alias = SERVICE_ALIASES[key];
  if (alias) return { option: alias, exact: false };
  return { option: "Other Service", exact: false };
}
