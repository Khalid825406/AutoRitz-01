"use client";

import { motion, type Variants } from "motion/react";
import {
  ArrowUpRight,
  BatteryCharging,
  CircleDot,
  Clock3,
  Fuel,
  KeyRound,
  MapPinned,
  Mountain,
  Phone,
  Truck,
  type LucideIcon,
} from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import AppointmentSection from "@/components/page/AppointmentSection";
import FaqSection from "@/components/page/FaqSection";
import PageHero from "@/components/page/PageHero";
import WhyChooseSection from "@/components/page/WhyChooseSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE_CONTACT, waLink } from "@/config/site";
import { QUALITY_IMAGES } from "@/data/pages/common";
import { FAQS, HIGHLIGHTS, ROADSIDE_SERVICES, WHY_US } from "@/data/pages/roadside-support";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const HIGHLIGHT_ICONS: LucideIcon[] = [Truck, MapPinned, Clock3];
const SERVICE_ICONS: Record<(typeof ROADSIDE_SERVICES)[number], LucideIcon> = {
  "Car Towing": Truck,
  "Jump Start": BatteryCharging,
  "Fuel Delivery": Fuel,
  "Tyre Change": CircleDot,
  "Car Lockout": KeyRound,
  "Off-Road Recovery": Mountain,
};

export default function RoadsideSupportPage() {
  return (
    <PageShell>
      {/* ================= HERO ================= */}
      <PageHero
        breadcrumbs={[{ label: "Roadside Support" }]}
        eyebrow="Ritz Auto Care"
        title="Roadside Support"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`tel:${SITE_CONTACT.phone}`}
            className="group inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[#082F59] transition-colors hover:bg-[#DCE8F2]"
          >
            <Phone size={16} />
            Call {SITE_CONTACT.phone}
          </a>
          <a
            href={waLink(SITE_CONTACT.whatsappRoadside, "Hi Ritz Auto Care, I need roadside assistance.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            WhatsApp Us
            <ArrowUpRight size={16} />
          </a>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {HIGHLIGHTS.map((h, i) => {
            const Icon = HIGHLIGHT_ICONS[i];
            return (
              <li key={h.title} className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1766AE]/40 text-[#7cc0f5]">
                  <Icon size={20} />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-white">{h.title}</h2>
                <p className="mt-2 text-[14px] leading-relaxed text-[#DCE8F2]/75">{h.text}</p>
              </li>
            );
          })}
        </ul>
      </PageHero>

      {/* ================= EXPERT ROADSIDE ASSISTANCE ================= */}
      <section className="w-full bg-white py-20 sm:py-24">
        <div className="site-container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
            <SectionHeading
              eyebrow="What we offer"
              icon={Truck}
              title="Expert Roadside"
              highlight="Assistance."
              description="Pick a service and book it instantly on WhatsApp."
            />
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {ROADSIDE_SERVICES.map((name, i) => {
              const Icon = SERVICE_ICONS[name];
              return (
                <motion.li
                  key={name}
                  variants={fadeUp}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#0872BB]/30 hover:shadow-[0_24px_48px_-16px_rgba(8,47,89,0.25)]"
                >
                  <span className="pointer-events-none absolute right-6 top-5 text-5xl font-bold leading-none text-slate-100 tabular-nums transition-colors group-hover:text-[#EAF4FC]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EAF4FC] text-[#0872BB] transition-colors duration-300 group-hover:bg-[#0872BB] group-hover:text-white">
                    <Icon size={26} strokeWidth={1.8} />
                  </span>
                  <h3 className="relative mt-6 text-xl font-semibold text-[#082F59]">{name}</h3>
                  <a
                    href={waLink(SITE_CONTACT.whatsappRoadside, `Hi Ritz Auto Care, I need ${name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0872BB] transition-colors hover:text-[#082F59]"
                  >
                    Book Now
                    <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-linear-to-r from-[#0872BB] to-[#3FA9F5] transition-transform duration-500 group-hover:scale-x-100" />
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </section>

      <WhyChooseSection
        items={WHY_US}
        images={QUALITY_IMAGES}
      />

      <FaqSection items={FAQS} />

      <AppointmentSection />
    </PageShell>
  );
}
