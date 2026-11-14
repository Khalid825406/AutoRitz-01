"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { ArrowUpRight, Camera, Check, MessageCircle, Phone } from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import AppointmentSection from "@/components/page/AppointmentSection";
import FaqSection from "@/components/page/FaqSection";
import HowItWorksSection from "@/components/page/HowItWorksSection";
import PageHero from "@/components/page/PageHero";
import TrustedBrandsSection from "@/components/page/TrustedBrandsSection";
import WhyChooseSection from "@/components/page/WhyChooseSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { SITE_CONTACT, waLink } from "@/config/site";
import { QUALITY_IMAGES, WHY_US } from "@/data/pages/common";
import type { ServiceDetail } from "@/data/pages/services";
import { DEFAULT_SERVICE_ICON, SERVICE_ICONS } from "./serviceIcons";

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

interface ServiceDetailPageProps {
  slug: string;
  title: string;
  detail: ServiceDetail;
}

/** Template for every /service/<slug>/ page (structure taken from the original service pages). */
export default function ServiceDetailPage({ slug, title, detail }: ServiceDetailPageProps) {
  const Icon = SERVICE_ICONS[slug] ?? DEFAULT_SERVICE_ICON;
  const { process, features, faqs } = detail;

  return (
    <PageShell>
      {/* ================= HERO ================= */}
      <PageHero
        breadcrumbs={[{ label: "Services", href: "/service/" }, { label: title }]}
        eyebrow="Our services"
        title={title}
        description="Get a Free Pick up & Drop off, Car Wash & 360 Degree Inspection"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={waLink(SITE_CONTACT.whatsapp, `Hi Ritz Auto Care, I'd like to book: ${title}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[#082F59] transition-colors hover:bg-[#DCE8F2]"
          >
            <MessageCircle size={16} />
            Book on WhatsApp
          </a>
          <a
            href={`tel:${SITE_CONTACT.phone}`}
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Phone size={16} />
            Toll-Free {SITE_CONTACT.phone}
          </a>
        </div>
      </PageHero>

      {/* ================= PROCESS ================= */}
      <section className="w-full bg-white py-20 sm:py-24">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#1766AE] to-[#082F59] text-white shadow-[0_10px_20px_-8px_rgba(23,102,174,0.6)]">
                <Icon size={26} />
              </span>
              <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-[#082F59] sm:text-4xl">{process.title}</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">{process.intro}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-[0_30px_60px_-28px_rgba(8,47,89,0.45)]"
            >
              <Image src={process.image} alt={process.title} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
            </motion.div>
          </div>

          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
            className="mt-14 grid gap-5 md:grid-cols-3"
          >
            {process.steps.map((st, i) => (
              <motion.li
                key={st.title}
                variants={fadeUp}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(8,47,89,0.3)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-linear-to-br from-[#0B477D] to-[#061E3B]">
                  {st.image ? (
                    <Image
                      src={st.image}
                      alt={st.title}
                      fill
                      sizes="(min-width: 768px) 30vw, 90vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center text-white/30">
                      <Check size={64} strokeWidth={1.4} />
                    </span>
                  )}
                  <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-[#082F59] shadow-md">
                    {i + 1}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#082F59]">{st.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{st.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="w-full bg-[#F7FAFD] py-20 sm:py-24">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_60px_-28px_rgba(8,47,89,0.45)]"
          >
            <Image src={features.image} alt={features.title} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
          </motion.div>

          <div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
              <SectionHeading align="left" eyebrow="What you get" icon={Check} title={features.title} description={features.intro} />
            </motion.div>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >
              {features.items.map((f) => (
                <motion.li key={f.title} variants={fadeUp} className="flex gap-3 rounded-2xl border border-slate-200/80 bg-white p-5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0872BB] text-white">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-[#082F59]">{f.title}</span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-slate-600">{f.text}</span>
                  </span>
                </motion.li>
              ))}
            </motion.ul>
            <a
              href="https://www.instagram.com/ritzautocare/"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-[#082F59] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0872BB]"
            >
              <Camera size={16} />
              Check Our Instagram Portfolio
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>

      <HowItWorksSection />
      <WhyChooseSection items={WHY_US} images={QUALITY_IMAGES} />
      <TrustedBrandsSection />
      <FaqSection items={faqs} />
      <AppointmentSection defaultService={detail.appointmentService} />
    </PageShell>
  );
}
