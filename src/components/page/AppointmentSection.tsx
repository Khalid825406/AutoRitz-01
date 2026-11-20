"use client";

import { useLang } from "@/i18n/LangProvider";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { CalendarCheck, Clock3, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

import { useBookingJourney } from "@/components/booking-journey/BookingJourneyProvider";
import { SITE_CONTACT, waLink } from "@/config/site";
import { BRAND_PAGES } from "@/data/pages/brands";
import { APPOINTMENT_SERVICES, APPOINTMENT_SERVICES_AR } from "@/data/pages/appointment";

import TextReveal from "@/components/motion/TextReveal";
import { REVEAL_VIEWPORT } from "@/components/motion/viewport";
const EASE = [0.22, 1, 0.36, 1] as const;

const field =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-[15px] text-[#0E1116] outline-hidden transition placeholder:text-slate-400 focus:border-[#0563B4] focus:ring-4 focus:ring-[#0563B4]/10";

/**
 * "Set An Appointment Today" form (from the original site).
 * There is no booking backend yet, so submitting opens WhatsApp with the details filled in.
 */
export default function AppointmentSection({
  defaultService = "",
  defaultBrand = "",
  defaultMessage = "",
}: {
  defaultService?: string;
  defaultBrand?: string;
  /** Pre-filled message, e.g. the service a visitor picked on the homepage. */
  defaultMessage?: string;
}) {
  const { t } = useLang();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    brand: defaultBrand,
    service: defaultService,
    message: defaultMessage,
  });
  const [error, setError] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  // Arriving from a "Book" button (/contact-us/?service=…#appointment): bring the form into view.
  // Runs after layout settles so the jump lands on the form, not where the previous page was scrolled.
  useEffect(() => {
    if (window.location.hash !== "#appointment") return;
    const t = window.setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: "instant", block: "start" }), 120);
    return () => window.clearTimeout(t);
  }, []);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const { startJourney } = useBookingJourney();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setError(t("Please enter your name.", "يرجى إدخال اسمك."));
    if (form.phone.replace(/\D/g, "").length < 8) return setError(t("Please enter a valid phone number.", "يرجى إدخال رقم هاتف صحيح."));
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
    // Animated booking journey in a new tab: it sends the request to /api/appointments while it plays, then
    // opens WhatsApp with all the details filled in (or shows an error + "Try again").
    const request = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      brand: form.brand,
      service: form.service,
      message: form.message.trim(),
      source: window.location.pathname,
    };
    startJourney({ whatsappUrl: waLink(SITE_CONTACT.whatsapp, text), appointment: request });
  };

  const contacts = [
    { icon: MessageCircle, label: t("WhatsApp", "واتساب"), value: `+${SITE_CONTACT.whatsapp}`, href: waLink(SITE_CONTACT.whatsapp), ltr: true },
    { icon: Phone, label: t("Toll free", "الرقم المجاني"), value: SITE_CONTACT.phone, href: `tel:${SITE_CONTACT.phone}`, ltr: true },
    { icon: Mail, label: t("Email", "البريد الإلكتروني"), value: SITE_CONTACT.email, href: `mailto:${SITE_CONTACT.email}`, ltr: true },
    // workshop address — opens Google Maps
    { icon: MapPin, label: t("Our workshop", "ورشتنا"), value: t(SITE_CONTACT.address, SITE_CONTACT.addressAr), href: SITE_CONTACT.mapUrl, ltr: false },
  ];

  return (
    <section ref={sectionRef} id="appointment" className="w-full scroll-mt-32 bg-white py-12 sm:py-24">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid overflow-hidden rounded-3xl border border-slate-200/80 shadow-[0_30px_60px_-30px_rgba(14, 17, 22,0.3)] lg:grid-cols-[0.85fr_1.15fr]"
        >
          {/* left: info */}
          <div className="relative isolate overflow-hidden bg-[#0E1116] p-8 text-white sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -bottom-24 -start-24 -z-10 h-80 w-80 rounded-full bg-radial from-[#0B6FC2]/40 to-transparent to-70%" />
            <span className="inline-flex items-center gap-2 rounded-full border border-[#4B9DE0]/40 bg-[#4B9DE0]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7cc0f5]">
              <CalendarCheck size={14} />
              {t("Get a service now!", "احصل على الخدمة الآن!")}
            </span>
            <TextReveal className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
              {t("Set An Appointment", "احجز موعدك")} <span className="block text-[#4B9DE0]">{t("Today", "اليوم")}</span>
            </TextReveal>
            <p className="mt-4 flex items-center gap-2 text-[14px] text-[#D9DEE5]/85">
              <Clock3 size={16} className="text-[#4B9DE0]" />
              {t("We respond within 7 minutes", "نرد خلال 7 دقائق")}
            </p>

            <ul className="mt-8 sm:mt-10 space-y-3">
              {contacts.map(({ icon: Icon, label, value, href, ltr }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:bg-white/[0.08]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B6FC2]/40 text-[#7cc0f5] transition-colors group-hover:bg-[#0B6FC2] group-hover:text-white">
                      <Icon size={19} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-[0.14em] text-white/55">{label}</span>
                      <span dir={ltr ? "ltr" : undefined} className="block text-start text-[15px] font-semibold leading-snug">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* right: form */}
          <form onSubmit={submit} noValidate className="grid content-center gap-4 bg-white p-8 sm:grid-cols-2 sm:p-10 lg:p-12">
            <label className="sm:col-span-1">
              <span className="mb-1.5 block text-[13px] font-semibold text-[#0E1116]">{t("Name", "الاسم")}</span>
              <input className={field} value={form.name} onChange={set("name")} placeholder={t("Your full name", "اسمك الكامل")} autoComplete="name" />
            </label>
            <label className="sm:col-span-1">
              <span className="mb-1.5 block text-[13px] font-semibold text-[#0E1116]">{t("Phone Number", "رقم الهاتف")}</span>
              <input
                className={field}
                value={form.phone}
                onChange={set("phone")}
                placeholder="+971 5X XXX XXXX"
                dir="ltr"
                inputMode="tel"
                autoComplete="tel"
              />
            </label>
            <label>
              <span className="mb-1.5 block text-[13px] font-semibold text-[#0E1116]">{t("Select Brand", "اختر العلامة التجارية")}</span>
              <select className={field} value={form.brand} onChange={set("brand")}>
                <option value="">{t("Select brand", "اختر العلامة")}</option>
                {BRAND_PAGES.map((b) => (
                  <option key={b.slug}>{b.name}</option>
                ))}
                <option value="Other">{t("Other", "أخرى")}</option>
              </select>
            </label>
            <label>
              <span className="mb-1.5 block text-[13px] font-semibold text-[#0E1116]">{t("Select Service", "اختر الخدمة")}</span>
              <select className={field} value={form.service} onChange={set("service")}>
                <option value="">{t("Select service", "اختر الخدمة")}</option>
                {APPOINTMENT_SERVICES.map((s) => (
                  <option key={s} value={s}>{t(s, APPOINTMENT_SERVICES_AR[s])}</option>
                ))}
              </select>
            </label>
            <label className="sm:col-span-2">
              <span className="mb-1.5 block text-[13px] font-semibold text-[#0E1116]">{t("Message", "الرسالة")}</span>
              <textarea
                className={`${field} h-28 resize-none py-3`}
                value={form.message}
                onChange={set("message")}
                placeholder={t("Tell us about your car or the problem", "أخبرنا عن سيارتك أو المشكلة")}
                maxLength={1000}
              />
            </label>

            {error && (
              <p role="alert" className="text-sm font-medium text-red-600 sm:col-span-2">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">{t("Sends your request to our team on WhatsApp.", "يرسل طلبك إلى فريقنا عبر واتساب.")}</p>
              <button
                type="submit"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#0E1116] to-[#0B6FC2] px-7 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(23,102,174,0.6)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0563B4]"
              >
                {t("Book an Appointment", "احجز موعداً")}
                <Send size={16} className="transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
