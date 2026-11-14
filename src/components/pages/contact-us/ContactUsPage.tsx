"use client";

import { motion, type Variants } from "motion/react";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";

import { Facebook, Instagram, TikTok, Youtube } from "@/components/icons/social";
import PageShell from "@/components/layout/PageShell";
import AppointmentSection from "@/components/page/AppointmentSection";
import PageHero from "@/components/page/PageHero";
import { SITE_CONTACT, SOCIAL_LINKS, waLink } from "@/config/site";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const SOCIAL_ICONS = { Facebook, Instagram, TikTok, YouTube: Youtube } as const;

const CARDS = [
  {
    icon: Phone,
    title: "Call Us Now",
    value: `Toll Free : ${SITE_CONTACT.phone}`,
    href: `tel:${SITE_CONTACT.phone}`,
    external: false,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Us",
    value: `+${SITE_CONTACT.whatsapp}`,
    href: waLink(SITE_CONTACT.whatsapp, "Hi Ritz Auto Care, I have a question."),
    external: true,
  },
  {
    icon: Mail,
    title: "Email Us",
    value: SITE_CONTACT.email,
    href: `mailto:${SITE_CONTACT.email}`,
    external: false,
  },
  {
    icon: MapPin,
    title: "Reach Us",
    value: SITE_CONTACT.address,
    href: SITE_CONTACT.mapUrl,
    external: true,
  },
];

export default function ContactUsPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(SITE_CONTACT.mapQuery)}&output=embed`;

  return (
    <PageShell>
      <PageHero
        breadcrumbs={[{ label: "Contact Us" }]}
        eyebrow="Get in touch"
        title="Contact Us"
        description="Call, WhatsApp, email or visit our workshop in Dubai Investment Park — or book an appointment below."
      />

      {/* ================= CONTACT CARDS ================= */}
      <section className="w-full bg-white pt-16 sm:pt-20">
        <div className="site-container">
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CARDS.map(({ icon: Icon, title, value, href, external }) => (
              <motion.li key={title} variants={fadeUp}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#0872BB]/30 hover:shadow-[0_20px_40px_-18px_rgba(8,47,89,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-[#1766AE] to-[#082F59] text-white">
                    <Icon size={22} />
                  </span>
                  <span className="mt-5 flex items-center justify-between text-[17px] font-semibold text-[#082F59]">
                    {title}
                    <ArrowUpRight
                      size={18}
                      className="text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0872BB]"
                    />
                  </span>
                  <span className="mt-2 text-[14px] leading-relaxed text-slate-600">{value}</span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <AppointmentSection />

      {/* ================= MAP ================= */}
      <section className="w-full bg-[#F7FAFD] py-20 sm:py-24">
        <div className="site-container grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col justify-between rounded-3xl bg-linear-to-br from-[#061E3B] via-[#082F59] to-[#0B477D] p-8 text-white sm:p-10"
          >
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#4B9DE0]/40 bg-[#4B9DE0]/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7cc0f5]">
                <MapPin size={14} />
                Our workshop
              </span>
              <h2 className="mt-5 text-3xl font-bold leading-[1.1] tracking-tight">
                Visit Ritz Auto Care <span className="block text-[#4B9DE0]">in Dubai.</span>
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-[#DCE8F2]/85">{SITE_CONTACT.address}</p>
              <a
                href={SITE_CONTACT.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[#082F59] transition-colors hover:bg-[#DCE8F2]"
              >
                <Navigation size={16} />
                Get Directions
              </a>
            </div>

            <div className="mt-10 border-t border-white/10 pt-6">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="min-h-[380px] overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_40px_-24px_rgba(8,47,89,0.25)]"
          >
            <iframe
              title="Ritz Auto Care location on Google Maps"
              src={mapSrc}
              className="h-full min-h-[380px] w-full"
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
