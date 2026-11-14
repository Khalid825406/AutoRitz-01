"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { CalendarCheck, Clock3, Mail, MessageCircle, Phone, Send } from "lucide-react";

import { SITE_CONTACT, waLink } from "@/config/site";
import { BRAND_PAGES } from "@/data/pages/brands";
import { APPOINTMENT_SERVICES } from "@/data/pages/appointment";

const EASE = [0.22, 1, 0.36, 1] as const;

const field =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-[15px] text-[#082F59] outline-hidden transition placeholder:text-slate-400 focus:border-[#0872BB] focus:ring-4 focus:ring-[#0872BB]/10";

/**
 * "Set An Appointment Today" form (from the original site).
 * There is no booking backend yet, so submitting opens WhatsApp with the details filled in.
 */
export default function AppointmentSection({
  defaultService = "",
  defaultBrand = "",
}: {
  defaultService?: string;
  defaultBrand?: string;
}) {
  const [form, setForm] = useState({ name: "", phone: "", brand: defaultBrand, service: defaultService, message: "" });
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setError("Please enter your name.");
    if (form.phone.replace(/\D/g, "").length < 8) return setError("Please enter a valid phone number.");
    setError("");
    const text = [
      "Hi Ritz Auto Care, I'd like to book an appointment.",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      form.brand && `Car brand: ${form.brand}`,
      form.service && `Service: ${form.service}`,
      form.message.trim() && `Message: ${form.message.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(SITE_CONTACT.whatsapp, text), "_blank", "noopener");
  };

  const contacts = [
    { icon: MessageCircle, label: "WhatsApp", value: `+${SITE_CONTACT.whatsapp}`, href: waLink(SITE_CONTACT.whatsapp) },
    { icon: Phone, label: "Toll free", value: SITE_CONTACT.phone, href: `tel:${SITE_CONTACT.phone}` },
    { icon: Mail, label: "Email", value: SITE_CONTACT.email, href: `mailto:${SITE_CONTACT.email}` },
  ];

  return (
    <section id="appointment" className="w-full scroll-mt-32 bg-white py-20 sm:py-24">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid overflow-hidden rounded-3xl border border-slate-200/80 shadow-[0_30px_60px_-30px_rgba(8,47,89,0.3)] lg:grid-cols-[0.85fr_1.15fr]"
        >
          {/* left: info */}
          <div className="relative isolate overflow-hidden bg-[#082F59] p-8 text-white sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -bottom-24 -left-24 -z-10 h-80 w-80 rounded-full bg-[#1766AE]/40 blur-3xl" />
            <span className="inline-flex items-center gap-2 rounded-full border border-[#4B9DE0]/40 bg-[#4B9DE0]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7cc0f5]">
              <CalendarCheck size={14} />
              Get a service now!
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
              Set An Appointment <span className="block text-[#4B9DE0]">Today</span>
            </h2>
            <p className="mt-4 flex items-center gap-2 text-[15px] text-[#DCE8F2]/85">
              <Clock3 size={16} className="text-[#4B9DE0]" />
              We respond within 7 minutes
            </p>

            <ul className="mt-10 space-y-3">
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:bg-white/[0.08]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1766AE]/40 text-[#7cc0f5] transition-colors group-hover:bg-[#1766AE] group-hover:text-white">
                      <Icon size={19} />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-[0.14em] text-white/55">{label}</span>
                      <span className="block text-[15px] font-semibold">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* right: form */}
          <form onSubmit={submit} noValidate className="grid gap-4 bg-white p-8 sm:grid-cols-2 sm:p-10 lg:p-12">
            <label className="sm:col-span-1">
              <span className="mb-1.5 block text-[13px] font-semibold text-[#082F59]">Name</span>
              <input className={field} value={form.name} onChange={set("name")} placeholder="Your full name" autoComplete="name" />
            </label>
            <label className="sm:col-span-1">
              <span className="mb-1.5 block text-[13px] font-semibold text-[#082F59]">Phone Number</span>
              <input
                className={field}
                value={form.phone}
                onChange={set("phone")}
                placeholder="+971 5X XXX XXXX"
                inputMode="tel"
                autoComplete="tel"
              />
            </label>
            <label>
              <span className="mb-1.5 block text-[13px] font-semibold text-[#082F59]">Select Brand</span>
              <select className={field} value={form.brand} onChange={set("brand")}>
                <option value="">Select brand</option>
                {BRAND_PAGES.map((b) => (
                  <option key={b.slug}>{b.name}</option>
                ))}
                <option>Other</option>
              </select>
            </label>
            <label>
              <span className="mb-1.5 block text-[13px] font-semibold text-[#082F59]">Select Service</span>
              <select className={field} value={form.service} onChange={set("service")}>
                <option value="">Select service</option>
                {APPOINTMENT_SERVICES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="sm:col-span-2">
              <span className="mb-1.5 block text-[13px] font-semibold text-[#082F59]">Message</span>
              <textarea
                className={`${field} h-28 resize-none py-3`}
                value={form.message}
                onChange={set("message")}
                placeholder="Tell us about your car or the problem"
                maxLength={1000}
              />
            </label>

            {error && (
              <p role="alert" className="text-sm font-medium text-red-600 sm:col-span-2">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">Sends your request to our team on WhatsApp.</p>
              <button
                type="submit"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#082F59] to-[#1766AE] px-7 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(23,102,174,0.6)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]"
              >
                Book an Appointment
                <Send size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
