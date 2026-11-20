"use client";

import { useLang } from "@/i18n/LangProvider";
import { Suspense, useState } from "react";
import Link from "@/i18n/Link";
import { useSearchParams } from "next/navigation";
import { motion, type Variants } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  CalendarCheck,
  Check,
  Clock3,
  Copy,
  Landmark,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Package,
  Phone,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { Facebook, Instagram, TikTok, Youtube } from "@/components/icons/social";
import PageShell from "@/components/layout/PageShell";
import AppointmentSection from "@/components/page/AppointmentSection";
import FaqSection from "@/components/page/FaqSection";
import PageHero from "@/components/page/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE_CONTACT, SOCIAL_LINKS, waLink } from "@/config/site";
import { matchAppointmentService } from "@/data/pages/appointment";
import { GENERAL_FAQS } from "@/data/pages/common";
import ContactWorldMap from "./ContactWorldMap";

import TextReveal from "@/components/motion/TextReveal";
import { REVEAL_VIEWPORT } from "@/components/motion/viewport";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const SOCIAL_ICONS = { Facebook, Instagram, TikTok, YouTube: Youtube } as const;

/* ------------------------------------------------------------------ */
/* "How can we help?" — one card per reason for getting in touch.      */
/* ------------------------------------------------------------------ */
interface HelpOption {
  icon: LucideIcon;
  title: string;
  titleAr: string;
  text: string;
  textAr: string;
  cta: string;
  ctaAr: string;
  href: string;
  external?: boolean;
  /** Red accent for the emergency option. */
  urgent?: boolean;
}

const HELP_OPTIONS: HelpOption[] = [
  {
    icon: CalendarCheck,
    title: "Book a service",
    titleAr: "احجز خدمة",
    text: "Choose your car brand and the service you need — our team confirms your appointment on WhatsApp.",
    textAr: "اختر علامة سيارتك والخدمة التي تحتاجها، وسيؤكد فريقنا موعدك عبر واتساب.",
    cta: "Fill the booking form",
    ctaAr: "املأ نموذج الحجز",
    href: "#appointment",
  },
  {
    icon: Truck,
    title: "Roadside emergency",
    titleAr: "طوارئ الطريق",
    text: "Breakdown, flat tyre or dead battery? Our roadside team arrives within 30–45 minutes.",
    textAr: "عطل، إطار مثقوب أو بطارية فارغة؟ يصل فريقنا خلال 30–45 دقيقة.",
    cta: "Get roadside help",
    ctaAr: "اطلب المساعدة على الطريق",
    href: waLink(SITE_CONTACT.whatsappRoadside, "Hi Ritz Auto Care, I need roadside assistance."),
    external: true,
    urgent: true,
  },
  {
    icon: Package,
    title: "Spare parts",
    titleAr: "قطع الغيار",
    text: "Looking for a part for your car? Tell us the model and the part and we will source it for you.",
    textAr: "تبحث عن قطعة لسيارتك؟ أخبرنا بالطراز والقطعة وسنوفرها لك.",
    cta: "Auto spare parts",
    ctaAr: "قطع غيار السيارات",
    href: "/service/auto-spare-parts-trading/",
  },
  {
    icon: Briefcase,
    title: "Join our team",
    titleAr: "انضم إلى فريقنا",
    text: "Skilled technician or service advisor? We are always happy to hear from people who love cars.",
    textAr: "فني ماهر أو مستشار خدمة؟ يسعدنا دائماً التواصل مع محبي السيارات.",
    cta: "View careers",
    ctaAr: "عرض الوظائف",
    href: "/careers/",
  },
];

export default function ContactUsPage() {
  const { t } = useLang();
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(SITE_CONTACT.mapQuery)}&output=embed`;

  return (
    <PageShell>
      {/* ================= HERO ================= */}
      <PageHero
        breadcrumbs={[{ label: t("Contact Us", "اتصل بنا") }]}
        eyebrow={t("Get in touch", "تواصل معنا")}
        title={t("Contact Us", "اتصل بنا")}
        description={t("Call, WhatsApp, email or visit our workshop in Dubai Investment Park — we are here to help with every part of your car's care.", "اتصل بنا أو راسلنا عبر واتساب أو البريد الإلكتروني أو زر ورشتنا في مجمع دبي للاستثمار — نحن هنا لمساعدتك في كل ما تحتاجه سيارتك.")}
        aside={<ContactWorldMap />}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={`tel:${SITE_CONTACT.phone}`}
            className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-white px-6 text-sm font-semibold text-[#0E1116] transition-colors hover:bg-[#D9DEE5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Phone size={17} />
            {t("Call", "اتصل")} <span dir="ltr">{SITE_CONTACT.phone}</span>
          </a>
          <a
            href={waLink(SITE_CONTACT.whatsapp, t("Hi Ritz Auto Care, I have a question.", "مرحباً ريتز أوتو كير، لدي سؤال."))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <MessageCircle size={17} />
            {t("Chat on WhatsApp", "تحدث معنا على واتساب")}
          </a>
        </div>

        <ul className="mt-7 flex flex-col gap-2.5 text-[14px] text-[#D9DEE5]/80 sm:flex-row sm:flex-wrap sm:gap-x-6">
          <li className="flex items-center gap-2">
            <Clock3 size={15} className="text-[#7cc0f5]" />
            {t("We respond within 7 minutes", "نرد خلال 7 دقائق")}
          </li>
          <li>
            <a href={`mailto:${SITE_CONTACT.email}`} className="flex items-center gap-2 transition-colors hover:text-white">
              <Mail size={15} className="text-[#7cc0f5]" />
              {SITE_CONTACT.email}
            </a>
          </li>
        </ul>
      </PageHero>

      {/* ================= HOW CAN WE HELP ================= */}
      <section className="w-full bg-[#F7FAFD] py-12 sm:py-24">
        <div className="site-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <SectionHeading
              eyebrow={t("How can we help?", "كيف يمكننا مساعدتك؟")}
              icon={MessageCircle}
              title={t("Tell us what you need,", "أخبرنا بما تحتاجه،")}
              highlight={t("we'll take it from there.", "وسنتولى الباقي.")}
              description={t("Pick the option that fits — each one takes you straight to the right team.", "اختر الخيار المناسب — كل خيار يوصلك مباشرة إلى الفريق المختص.")}
            />
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={REVEAL_VIEWPORT}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="mt-8 sm:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {HELP_OPTIONS.map((o) => (
              <motion.li key={o.title} variants={fadeUp}>
                <HelpCard option={o} />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ================= APPOINTMENT FORM ================= */}
      {/* "Book" buttons elsewhere link here with ?service=… — the static HTML shows the empty form. */}
      <Suspense fallback={<AppointmentSection />}>
        <AppointmentFromUrl />
      </Suspense>

      {/* ================= FAQ ================= */}
      <FaqSection items={GENERAL_FAQS} eyebrow={t("Before you visit", "قبل زيارتك")} title={t("Questions we hear often", "أسئلة نسمعها كثيراً")} />

      {/* ================= VISIT US ================= */}
      <section className="w-full bg-white py-12 sm:py-24">
        <div className="site-container grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={REVEAL_VIEWPORT}
            className="relative isolate flex flex-col overflow-hidden rounded-3xl bg-linear-to-br from-[#07090C] via-[#0E1116] to-[#1B2029] p-7 text-white sm:p-10"
          >
            <div className="pointer-events-none absolute -end-20 -top-20 -z-10 h-72 w-72 rounded-full bg-radial from-[#0B6FC2]/45 to-transparent to-70%" />

            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#4B9DE0]/40 bg-[#4B9DE0]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7cc0f5]">
              <MapPin size={14} />
              {t("Visit our workshop", "زر ورشتنا")}
            </span>
            <TextReveal className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
              {t("Find us in", "تجدنا في")} <span className="block text-[#4B9DE0]">{t("Dubai Investment Park.", "مجمع دبي للاستثمار.")}</span>
            </TextReveal>

            <p className="mt-5 text-[14px] leading-relaxed text-[#D9DEE5]/85">{t(SITE_CONTACT.address, SITE_CONTACT.addressAr)}</p>
            <p className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg bg-white/[0.07] px-3 py-2 text-[13px] text-[#D9DEE5]/90 ring-1 ring-white/10">
              <Landmark size={15} className="text-[#7cc0f5]" />
              {t("Landmark: near AIKO Mall, DIP 1", "معلم قريب: بالقرب من آيكو مول، مجمع دبي للاستثمار 1")}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={SITE_CONTACT.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[#0E1116] transition-colors hover:bg-[#D9DEE5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Navigation size={16} />
                {t("Get directions", "احصل على الاتجاهات")}
              </a>
              <CopyAddressButton />
            </div>

            <div className="mt-auto pt-10">
              <div className="border-t border-white/10 pt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">{t("Follow us", "تابعنا")}</p>
                <ul className="mt-4 flex gap-3">
                  {SOCIAL_LINKS.map((s) => {
                    const Icon = SOCIAL_ICONS[s.name];
                    return (
                      <li key={s.name}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.name}
                          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white transition-colors hover:bg-white hover:text-[#0E1116]"
                        >
                          <Icon size={18} />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative min-h-[380px] overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-100 shadow-[0_20px_40px_-24px_rgba(14, 17, 22,0.25)]"
          >
            <iframe
              title={t("Ritz Auto Care location on Google Maps", "موقع ريتز أوتو كير على خرائط Google")}
              src={mapSrc}
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>
    </PageShell>
  );
}

/** One "How can we help?" option. */
function HelpCard({ option: o }: { option: HelpOption }) {
  const { t } = useLang();
  const Icon = o.icon;
  const accent = o.urgent
    ? { icon: "bg-red-50 text-[#E10600] group-hover:bg-[#E10600] group-hover:text-white", cta: "text-[#E10600]", line: "from-[#E10600] to-[#FF6B5E]" }
    : { icon: "bg-[#EAF4FC] text-[#0563B4] group-hover:bg-[#0563B4] group-hover:text-white", cta: "text-[#0563B4]", line: "from-[#0563B4] to-[#3FA9F5]" };
  const cls = `group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(14, 17, 22,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0563B4] ${
    o.urgent ? "border-red-200 hover:border-red-300" : "border-slate-200/80 hover:border-[#0563B4]/30"
  }`;
  const body = (
    <>
      {o.urgent && (
        <span className="absolute end-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#E10600]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E10600]" />
          {t("Urgent", "عاجل")}
        </span>
      )}
      <span className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${accent.icon}`}>
        <Icon size={22} strokeWidth={1.8} />
      </span>
      <h3 className="mt-5 text-[17px] font-semibold text-[#0E1116]">{t(o.title, o.titleAr)}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{t(o.text, o.textAr)}</p>
      <span className={`mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold ${accent.cta}`}>
        {t(o.cta, o.ctaAr)}
        {o.external ? (
          <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        ) : (
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        )}
      </span>
      <span className={`pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-linear-to-r transition-transform duration-500 group-hover:scale-x-100 ${accent.line}`} />
    </>
  );

  if (o.external)
    return (
      <a href={o.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {body}
      </a>
    );
  if (o.href.startsWith("#"))
    return (
      <a href={o.href} className={cls}>
        {body}
      </a>
    );
  return (
    <Link href={o.href} className={cls}>
      {body}
    </Link>
  );
}

/** Copies the workshop address (handy for taxi / delivery apps). */
function CopyAddressButton() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(t(SITE_CONTACT.address, SITE_CONTACT.addressAr));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt(t("Copy the address:", "انسخ العنوان:"), t(SITE_CONTACT.address, SITE_CONTACT.addressAr));
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {copied ? <Check size={16} className="text-emerald-300" /> : <Copy size={16} />}
      {copied ? t("Address copied", "تم نسخ العنوان") : t("Copy address", "نسخ العنوان")}
    </button>
  );
}

/** Appointment form pre-filled with the service picked on another page (`/contact-us/?service=…#appointment`). */
function AppointmentFromUrl() {
  const requested = (useSearchParams().get("service") ?? "").trim().slice(0, 80);
  if (!requested) return <AppointmentSection />;
  const { option, exact } = matchAppointmentService(requested);
  return (
    <AppointmentSection
      key={requested}
      defaultService={option}
      defaultMessage={exact ? "" : `I'm interested in: ${requested}`}
    />
  );
}
