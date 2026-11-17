import { NextResponse } from "next/server";

import { isDbConfigured } from "@/lib/db/mongodb";
import { saveAppointment } from "@/lib/db/booking-repository";
import { normalizeAppointment, validateAppointment } from "@/lib/validation/appointment";

export const runtime = "nodejs";

/**
 * Appointment request from the "Set An Appointment" form.
 *  - 201 { ok, stored: true, id }  saved in MongoDB
 *  - 202 { ok, stored: false }      accepted; no database configured (MONGODB_URI) — the visitor's
 *                                   WhatsApp message carries the request to the team
 *  - 400 / 422 / 500 { error }      the booking popup shows the message with a "Try again" button
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const data = normalizeAppointment(body as Record<string, unknown>);
  const errors = validateAppointment(data);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: Object.values(errors)[0], errors }, { status: 422 });
  }

  if (!isDbConfigured()) return NextResponse.json({ ok: true, stored: false }, { status: 202 });

  try {
    const id = await saveAppointment(data);
    return NextResponse.json({ ok: true, stored: true, id }, { status: 201 });
  } catch (err) {
    console.error("Appointment save failed:", err);
    return NextResponse.json({ error: "We couldn't save your request right now. Please try again." }, { status: 500 });
  }
}
