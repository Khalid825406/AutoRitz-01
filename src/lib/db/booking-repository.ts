// Data layer: swap this file's implementation to connect another backend.
import { getClient } from "./mongodb";
import type { BookingInput } from "@/lib/validation/booking";
import type { AppointmentInput } from "@/lib/validation/appointment";

export async function saveBooking(b: BookingInput): Promise<string> {
  const c = await getClient();
  const res = await c.db(process.env.MONGODB_DB || "ritz_auto_care").collection("bookings").insertOne({ ...b, status: "new", createdAt: new Date() });
  return res.insertedId.toString();
}

/** Quick appointment requests from the "Set An Appointment" form. */
export async function saveAppointment(a: AppointmentInput): Promise<string> {
  const c = await getClient();
  const res = await c
    .db(process.env.MONGODB_DB || "ritz_auto_care")
    .collection("appointments")
    .insertOne({ ...a, status: "new", createdAt: new Date() });
  return res.insertedId.toString();
}
