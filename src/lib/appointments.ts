import type { AppointmentInput } from "@/lib/validation/appointment";

/** Sends the appointment to POST /api/appointments; throws an Error with a visitor-friendly message on failure. */
export async function submitAppointment(input: AppointmentInput): Promise<void> {
  const ctrl = new AbortController();
  const timer = window.setTimeout(() => ctrl.abort(), 12_000);
  try {
    const res = await fetch("/api/appointments/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
      signal: ctrl.signal,
    });
    const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) throw new Error(data.error || "We couldn't send your request. Please try again.");
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      throw new Error("The request took too long. Please check your connection and try again.");
    if (err instanceof TypeError) throw new Error("You seem to be offline. Please check your internet connection and try again.");
    throw err;
  } finally {
    window.clearTimeout(timer);
  }
}
