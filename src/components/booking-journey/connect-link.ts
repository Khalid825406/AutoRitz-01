import { normalizeAppointment, type AppointmentInput } from "@/lib/validation/appointment";

/** Only WhatsApp chat links may be opened by the /connect/ page (it must never become an open redirect). */
export const WHATSAPP_LINK = /^https:\/\/(wa\.me|api\.whatsapp\.com)\//i;

export interface JourneyRequest {
  /** wa.me link (with the prefilled message) opened at the end of the journey. */
  whatsappUrl: string;
  /** Appointment form data — sent to /api/appointments while the journey plays. */
  appointment?: AppointmentInput;
}

/** URL of the /connect/ page, which plays the journey in its own tab and then opens WhatsApp there. */
export function connectHref({ whatsappUrl, appointment }: JourneyRequest): string {
  const q = new URLSearchParams({ to: whatsappUrl });
  if (appointment) q.set("booking", JSON.stringify(appointment));
  return `/connect/?${q.toString()}`;
}

/** Reads and validates the /connect/ query string; returns null when the link is not a WhatsApp chat. */
export function parseConnectParams(params: URLSearchParams): JourneyRequest | null {
  const whatsappUrl = params.get("to") ?? "";
  if (!WHATSAPP_LINK.test(whatsappUrl)) return null;
  let appointment: AppointmentInput | undefined;
  const raw = params.get("booking");
  if (raw) {
    try {
      appointment = normalizeAppointment(JSON.parse(raw));
    } catch {
      appointment = undefined;
    }
  }
  return { whatsappUrl, appointment };
}
