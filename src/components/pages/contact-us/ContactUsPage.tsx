"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
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
  text: string;
  cta: string;
  href: string;
  external?: boolean;
  /** Red accent for the emergency option. */
  urgent?: boolean;
}

const HELP_OPTIONS: HelpOption[] = [
  {
    icon: CalendarCheck,
    title: "Book a service",
    text: "Choose your car brand and the service you need — our team confirms your appointment on WhatsApp.",
    cta: "Fill the booking form",
    href: "#appointment",
  },
  {
    icon: Truck,
    title: "Roadside emergency",
    text: "Breakdown, flat tyre or dead battery? Our roadside team arrives within 30–45 minutes.",
    cta: "Get roadside help",
    href: waLink(SITE_CONTACT.whatsappRoadside, "Hi Ritz Auto Care, I need roadside assistance."),
    external: true,
    urgent: true,
  },
  {
    icon: Package,
    title: "Spare parts",
    text: "Looking for a part for your car? Tell us the model and the part and we will source it for you.",
    cta: "Auto spare parts",
    href: "/service/auto-spare-parts-trading/",
  },
  {
    icon: Briefcase,
    title: "Join our team",
    text: "Skilled technician or service advisor? We are always happy to hear from people who love cars.",
    cta: "View careers",
    href: "/careers/",
  },
];

export default function ContactUsPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(SITE_CONTACT.mapQuery)}&output=embed`;

  return (
    <PageShell>
      {/* ================= HERO ================= */}
      <PageHero
        breadcrumbs={[{ label: "Contact Us" }]}
        eyebrow="Get in touch"
        title="Contact Us"
        description="Call, WhatsApp, email or visit our workshop in Dubai Investment Park — we are here to help with every part of your car's care."
        aside={<ContactWorldMap />}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={`tel:${SITE_CONTACT.phone}`}
            className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-white px-6 text-sm font-semibold text-[#082F59] transition-colors hover:bg-[#DCE8F2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Phone size={17} />
            Call {SITE_CONTACT.phone}
          </a>
          <a
            href={waLink(SITE_CONTACT.whatsapp, "Hi Ritz Auto Care, I have a question.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <MessageCircle size={17} />
            Chat on WhatsApp
          </a>
        </div>

        <ul className="mt-7 flex flex-col gap-2.5 text-[14px] text-[#DCE8F2]/80 sm:flex-row sm:flex-wrap sm:gap-x-6">
          <li className="flex items-center gap-2">
            <Clock3 size={15} className="text-[#7cc0f5]" />
            We respond within 7 minutes
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
              eyebrow="How can we help?"
              icon={MessageCircle}
              title="Tell us what you need,"
              highlight="we'll take it from there."
              description="Pick the option that fits — each one takes you straight to the right team."
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
      <FaqSection items={GENERAL_FAQS} eyebrow="Before you visit" title="Questions we hear often" />

      {/* ================= VISIT US ================= */}
      <section className="w-full bg-white py-12 sm:py-24">
        <div className="site-container grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={REVEAL_VIEWPORT}
            className="relative isolate flex flex-col overflow-hidden rounded-3xl bg-linear-to-br from-[#061E3B] via-[#082F59] to-[#0B477D] p-7 text-white sm:p-10"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-radial from-[#1766AE]/45 to-transparent to-70%" />

            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#4B9DE0]/40 bg-[#4B9DE0]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7cc0f5]">
              <MapPin size={14} />
              Visit our workshop
            </span>
            <TextReveal className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">
              Find us in <span className="block text-[#4B9DE0]">Dubai Investment Park.</span>
            </TextReveal>

            <p className="mt-5 text-[14px] leading-relaxed text-[#DCE8F2]/85">{SITE_CONTACT.address}</p>
            <p className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg bg-white/[0.07] px-3 py-2 text-[13px] text-[#DCE8F2]/90 ring-1 ring-white/10">
              <Landmark size={15} className="text-[#7cc0f5]" />
              Landmark: near AIKO Mall, DIP 1
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={SITE_CONTACT.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[#082F59] transition-colors hover:bg-[#DCE8F2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Navigation size={16} />
                Get directions
              </a>
              <CopyAddressButton />
            </div>

            <div className="mt-auto pt-10">
              <div className="border-t border-white/10 pt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">Follow us</p>
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
                          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white transition-colors hover:bg-white hover:text-[#082F59]"
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
            className="relative min-h-[380px] overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-100 shadow-[0_20px_40px_-24px_rgba(8,47,89,0.25)]"
          >
            <iframe
              title="Ritz Auto Care location on Google Maps"
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
  const Icon = o.icon;
  const accent = o.urgent
    ? { icon: "bg-red-50 text-[#E10600] group-hover:bg-[#E10600] group-hover:text-white", cta: "text-[#E10600]", line: "from-[#E10600] to-[#FF6B5E]" }
    : { icon: "bg-[#EAF4FC] text-[#0872BB] group-hover:bg-[#0872BB] group-hover:text-white", cta: "text-[#0872BB]", line: "from-[#0872BB] to-[#3FA9F5]" };
  const cls = `group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white p-6 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(8,47,89,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB] ${
    o.urgent ? "border-red-200 hover:border-red-300" : "border-slate-200/80 hover:border-[#0872BB]/30"
  }`;
  const body = (
    <>
      {o.urgent && (
        <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#E10600]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E10600]" />
          Urgent
        </span>
      )}
      <span className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 ${accent.icon}`}>
        <Icon size={22} strokeWidth={1.8} />
      </span>
      <h3 className="mt-5 text-[17px] font-semibold text-[#082F59]">{o.title}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{o.text}</p>
      <span className={`mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold ${accent.cta}`}>
        {o.cta}
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
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_CONTACT.address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy the address:", SITE_CONTACT.address);
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
      {copied ? "Address copied" : "Copy address"}
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
