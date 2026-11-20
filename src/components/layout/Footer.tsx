
"use client";

import { useLang } from "@/i18n/LangProvider";
import Link from "@/i18n/Link";
import BrandLogo from "./BrandLogo";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

import { Facebook, Instagram, TikTok, Youtube } from "@/components/icons/social";
import { SITE_CONTACT, SOCIAL_LINKS, waLink } from "@/config/site";

import TextReveal from "@/components/motion/TextReveal";
import { REVEAL_VIEWPORT } from "@/components/motion/viewport";
/** Quick links — every entry is a page that exists (same set as the original footer). */
const quickLinks = [
  { name: "Home", nameAr: "الرئيسية", href: "/" },
  { name: "About Us", nameAr: "من نحن", href: "/about-us/" },
  { name: "Our Services", nameAr: "خدماتنا", href: "/service/" },
  { name: "Brands", nameAr: "العلامات التجارية", href: "/brands/" },
  { name: "Service Areas", nameAr: "مناطق الخدمة", href: "/service-areas/" },
  { name: "Our Work", nameAr: "أعمالنا", href: "/our-work-gallery/" },
  { name: "Customer Reviews", nameAr: "آراء العملاء", href: "/customer-reviews/" },
  { name: "Blog", nameAr: "المدونة", href: "/blog/" },
  { name: "Careers", nameAr: "الوظائف", href: "/careers/" },
  { name: "Contact Us", nameAr: "اتصل بنا", href: "/contact-us/" },
];

const services = [
  { name: "Roadside Support", nameAr: "المساعدة على الطريق", href: "/roadside-support/" },
  { name: "Car Battery Change", nameAr: "تغيير بطارية السيارة", href: "/service/car-battery-replacement/" },
  { name: "Buy Car Batteries", nameAr: "شراء بطاريات السيارات", href: "/buy-car-batteries/" },
  { name: "Buy Car Tires", nameAr: "شراء إطارات السيارات", href: "/buy-car-tires/" },
  { name: "Service Contract", nameAr: "عقد الصيانة", href: "/service-contract/" },
  { name: "Free Vehicle Inspection", nameAr: "فحص مجاني للسيارة", href: "/complimentary-vehicle-inspection/" },
  { name: "Auto Spare Parts", nameAr: "قطع غيار السيارات", href: "/service/auto-spare-parts-trading/" },
];

const SOCIAL_ICONS = { Facebook, Instagram, TikTok, YouTube: Youtube } as const;

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative overflow-hidden bg-[#0A0C10] text-white">

      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-radial from-[#0B6FC2]/15 to-transparent to-70%" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-radial from-[#0B6FC2]/10 to-transparent to-70%" />

      {/* Top CTA */}
      <motion.div className="site-container relative pt-16 lg:pt-20" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={REVEAL_VIEWPORT} transition={{ duration: 0.7 }}>
        <div className="relative overflow-hidden rounded-2xl border border-[#8C95A1]/30 bg-linear-to-r from-[#151A22] via-[#1B2029] to-[#11151B] p-7 sm:p-10 lg:p-12">

          <div className="pointer-events-none absolute -right-10 -top-28 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-2 -top-20 h-56 w-56 rounded-full border border-white/10" />

          <div className="relative flex flex-col justify-between gap-7 md:flex-row md:items-center">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#70B7F4]">
                <span className="h-2 w-2 rounded-full bg-[#70B7F4]" />
                {t("Your Car Deserves The Best", "سيارتك تستحق الأفضل")}
              </span>

              <TextReveal className="max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {t("Ready to Give Your Car", "هل أنت مستعد لمنح سيارتك")}
                <span className="block text-[#70B7F4]">
                  {t("The Care It Deserves?", "العناية التي تستحقها؟")}
                </span>
              </TextReveal>

              <p className="mt-4 max-w-lg text-sm leading-7 text-[#BCC3CC]">
                {t("Experience professional automotive care with quality service, expert attention and reliable results.", "استمتع بعناية احترافية بسيارتك مع خدمة عالية الجودة واهتمام من الخبراء ونتائج موثوقة.")}
              </p>
            </div>

            <Link
              href="/contact-us/"
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#0B6FC2] px-7 py-4 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#2786D2] hover:shadow-[0_10px_35px_rgba(23,102,174,0.35)]"
            >
              {t("Book An Appointment", "احجز موعداً")}
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Main Footer */}
      <motion.div className="site-container relative pb-12 pt-16 lg:pt-20" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={REVEAL_VIEWPORT} transition={{ duration: 0.7 }}>

        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-y-12 border-b border-white/10 pb-14 sm:gap-x-10 lg:grid-cols-12 lg:gap-10">

          {/* BRAND */}
          <div className="col-span-2 lg:col-span-4">

            <Link href="/" className="inline-flex items-center">
              <BrandLogo size="lg" tone="dark" />
            </Link>

            <p className="mt-6 max-w-sm text-[13px] leading-7 text-[#A3ABB6]">
              {t("Ritz Auto Care LLC is committed to delivering dependable automotive solutions with professional service and attention to every detail.", "تلتزم ريتز أوتو كير ذ.م.م بتقديم حلول موثوقة للسيارات بخدمة احترافية واهتمام بكل التفاصيل.")}
            </p>

            <div className="mt-7 flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => {
                const Icon = SOCIAL_ICONS[s.name];
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#9EB5CA] transition-all duration-300 hover:border-[#0B6FC2] hover:bg-[#0B6FC2] hover:text-white"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="min-w-0 lg:col-span-2">
            <h3 className="mb-5 text-xs sm:mb-7 font-bold uppercase tracking-[0.16em] text-white">
              {t("Quick Links", "روابط سريعة")}
            </h3>

            <ul className="space-y-1.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 py-1.5 text-[13px] text-[#A3ABB6] transition-colors hover:text-[#70B7F4]"
                  >
                    <ChevronRight
                      size={13}
                      className="shrink-0 text-[#0B6FC2] transition-transform group-hover:translate-x-1"
                    />
                    {t(link.name, link.nameAr)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SERVICES */}
          <div className="min-w-0 lg:col-span-3">
            <h3 className="mb-5 text-xs sm:mb-7 font-bold uppercase tracking-[0.16em] text-white">
              {t("Our Services", "خدماتنا")}
            </h3>

            <ul className="space-y-1.5">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="group flex items-center gap-2 py-1.5 text-[13px] text-[#A3ABB6] transition-colors hover:text-[#70B7F4]"
                  >
                    <ChevronRight
                      size={13}
                      className="shrink-0 text-[#0B6FC2] transition-transform group-hover:translate-x-1"
                    />
                    {t(service.name, service.nameAr)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-span-2 lg:col-span-3">
            <h3 className="mb-7 text-xs font-bold uppercase tracking-[0.16em] text-white">
              {t("Get In Touch", "تواصل معنا")}
            </h3>

            <div className="space-y-6">

              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B6FC2]/15 text-[#70B7F4]">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#70B7F4]">
                    {t("Our Location", "موقعنا")}
                  </p>
                  <a
                    href={SITE_CONTACT.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] leading-6 text-[#A3ABB6] transition-colors hover:text-white"
                  >
                    {t(SITE_CONTACT.address, SITE_CONTACT.addressAr)}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B6FC2]/15 text-[#70B7F4]">
                  <Phone size={18} />
                </span>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#70B7F4]">
                    {t("Phone Number", "رقم الهاتف")}
                  </p>
                  <a
                    href={`tel:${SITE_CONTACT.phone}`}
                    className="text-[13px] text-[#A3ABB6] transition-colors hover:text-white"
                  >
                    {t("Toll Free", "الرقم المجاني")} <span dir="ltr">{SITE_CONTACT.phone}</span>
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B6FC2]/15 text-[#70B7F4]">
                  <Mail size={18} />
                </span>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#70B7F4]">
                    {t("Email Address", "البريد الإلكتروني")}
                  </p>
                  <a
                    href={`mailto:${SITE_CONTACT.email}`}
                    className="text-[13px] text-[#A3ABB6] transition-colors hover:text-white"
                  >
                    {SITE_CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0B6FC2]/15 text-[#70B7F4]">
                  <MessageCircle size={18} />
                </span>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#70B7F4]">
                    {t("WhatsApp", "واتساب")}
                  </p>
                  <a
                    href={waLink(SITE_CONTACT.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-[#A3ABB6] transition-colors hover:text-white"
                  >
                    +{SITE_CONTACT.whatsapp}
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* TRUST STRIP */}
        <div className="flex flex-col items-center justify-between gap-5 border-b border-white/10 py-7 sm:flex-row">
          <div className="flex items-center gap-3">
            <ShieldCheck size={22} className="text-[#70B7F4]" />
            <div>
              <p className="text-xs font-bold text-white">
                {t("Professional Automotive Care", "عناية احترافية بالسيارات")}
              </p>
              <p className="mt-1 text-[10px] text-[#8197AC]">
                {t("Quality, Reliability & Customer Satisfaction", "الجودة والموثوقية ورضا العملاء")}
              </p>
            </div>
          </div>

          <Link
            href="/service/"
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#70B7F4] transition-colors hover:text-white"
          >
            {t("Explore Our Services", "اكتشف خدماتنا")}
            <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* COPYRIGHT */}
        <div className="flex flex-col items-center justify-between gap-4 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] text-[#8C95A1]">
            © {new Date().getFullYear()} {t("Ritz Auto Care LLC. All Rights Reserved.", "ريتز أوتو كير ذ.م.م. جميع الحقوق محفوظة.")}
          </p>

          <div className="flex items-center gap-5 text-[11px] text-[#8C95A1]">
            <Link href="/contact-us/" className="transition-colors hover:text-white">
              {t("Contact Us", "اتصل بنا")}
            </Link>
            <Link href="/careers/" className="transition-colors hover:text-white">
              {t("Careers", "الوظائف")}
            </Link>
          </div>
        </div>

      </motion.div>
    </footer>
  );
}
