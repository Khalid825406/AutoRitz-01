/** "Set An Appointment" form (AppointmentSection) — shared by the browser and POST /api/appointments. */
export interface AppointmentInput {
  name: string;
  phone: string;
  brand: string;
  service: string;
  message: string;
  /** Page the request came from, e.g. "/contact-us/". */
  source: string;
}

export type AppointmentErrors = Partial<Record<keyof AppointmentInput, string>>;

const MAX: Record<keyof AppointmentInput, number> = {
  name: 80,
  phone: 30,
  brand: 60,
  service: 80,
  message: 1000,
  source: 200,
};

/** Trims every field and caps its length (anything unexpected becomes an empty string). */
export function normalizeAppointment(raw: Partial<Record<keyof AppointmentInput, unknown>>): AppointmentInput {
  const pick = (k: keyof AppointmentInput) => String(raw[k] ?? "").trim().slice(0, MAX[k]);
  return {
    name: pick("name"),
    phone: pick("phone"),
    brand: pick("brand"),
    service: pick("service"),
    message: pick("message"),
    source: pick("source"),
  };
}

export function validateAppointment(a: AppointmentInput): AppointmentErrors {
  const e: AppointmentErrors = {};
  if (a.name.length < 2) e.name = "Please enter your name.";
  const digits = a.phone.replace(/\D/g, "");
  if (!/^\+?[0-9\s\-()]+$/.test(a.phone) || digits.length < 8 || digits.length > 15)
    e.phone = "Please enter a valid phone number.";
  return e;
}
