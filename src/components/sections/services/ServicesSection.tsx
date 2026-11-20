"use client";

import { useLang } from "@/i18n/LangProvider";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, BadgeCheck, Check, Clock3, ShieldCheck } from "lucide-react";

import { StickyScroll, type StickyScrollItem } from "@/components/ui/sticky-scroll-reveal";
import { services } from "@/data/services";

import TextReveal from "@/components/motion/TextReveal";
import { REVEAL_VIEWPORT } from "@/components/motion/viewport";
interface ServicesSectionProps {
  onBook: (service?: string) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const TRUST = [
  { icon: BadgeCheck, label: "Certified technicians", labelAr: "فنيون معتمدون" },
  { icon: ShieldCheck, label: "Quality parts", labelAr: "قطع غيار عالية الجودة" },
  { icon: Clock3, label: "Roadside support", labelAr: "مساعدة على الطريق" },
];

export default function ServicesSection({ onBook }: ServicesSectionProps) {
  const { t, lang } = useLang();
  const items: StickyScrollItem[] = services.map((s) => {
    const Icon = s.icon;
    return {
      title: t(s.title, s.ar.title),
      eyebrow: (
        <p className="inline-flex items-center gap-2 rounded-full bg-[#EAF4FC] py-1 pl-1 pr-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0563B4]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#0563B4] shadow-xs">
            <Icon size={15} strokeWidth={2} />
          </span>
          {t(s.category, s.ar.category)}
        </p>
      ),
      description: t(s.description, s.ar.description),
      footer: (
        <>
          <ul className="mt-3.5 flex flex-wrap gap-1.5 lg:mt-5 lg:gap-2">
            {(lang === "ar" ? s.ar.features : s.features).map((f) => (
              <li
                key={f}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[12px] font-medium text-[#0E1116] lg:px-3 lg:py-1.5 lg:text-[13px]"
              >
                <Check size={13} strokeWidth={3} className="text-[#0563B4]" />
                {f}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => onBook(s.title)}
            className="group mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-[#0E1116] px-5 text-sm lg:mt-7 lg:h-11 lg:px-6 font-semibold text-white transition-colors hover:bg-[#0563B4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0563B4]"
          >
            {t("Book this service", "احجز هذه الخدمة")}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </>
      ),
      content: (
        <>
          <Image src={s.image} alt={t(s.title, s.ar.title)} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-[#07090C]/95 via-[#07090C]/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-white">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25">
              <Icon size={22} strokeWidth={1.8} />
            </span>
            {/* title + text are already shown next to the photo on mobile — show them on the card only on desktop */}
            <p className="mt-4 text-[28px] font-bold leading-tight max-lg:hidden">{t(s.title, s.ar.title)}</p>
            <p className="mt-2 max-w-md text-[14px] text-white/80 max-lg:hidden">{t(s.description, s.ar.description)}</p>
          </div>
        </>
      ),
    };
  });

  return (
      <section id="services" className="relative w-full scroll-mt-32 overflow-clip bg-[#F7FAFD] py-12 sm:py-24 lg:py-28">
        {/* subtle background accent */}
        <div className="pointer-events-none absolute -top-40 right-[-10%] h-[480px] w-[480px] rounded-full bg-radial from-[#0563B4]/[0.06] to-transparent to-70%" />

        <div className="site-container relative">
          {/* ============ HEADER ============ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
            className="grid gap-8 sm:gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end"
          >
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0563B4]">
                <span className="h-px w-8 bg-[#0563B4]" />
                {t("Our services", "خدماتنا")}
              </p>
              <TextReveal className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-[#0E1116] sm:text-4xl lg:text-5xl">
                {t("Everything your car needs,", "كل ما تحتاجه سيارتك،")} <span className="text-[#0563B4]">{t("under one roof", "تحت سقف واحد")}</span>
              </TextReveal>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
                {t("From routine maintenance to emergency roadside support, our certified technicians keep your vehicle safe, reliable and ready for Dubai's roads.", "من الصيانة الدورية إلى المساعدة الطارئة على الطريق، يحافظ فنيونا المعتمدون على سيارتك آمنة وموثوقة وجاهزة لطرق دبي.")}
              </p>
            </div>

            <div className="flex flex-col gap-5 lg:items-end">
              <ul className="flex flex-wrap gap-x-6 gap-y-3 lg:justify-end">
                {TRUST.map(({ icon: Icon, label, labelAr }) => (
                  <li key={label} className="flex items-center gap-2 text-sm font-medium text-[#0E1116]">
                    <Icon size={18} className="text-[#0563B4]" />
                    {t(label, labelAr)}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onBook()}
                className="group inline-flex h-12 w-fit items-center gap-2.5 rounded-full bg-[#0563B4] px-7 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(5, 99, 180,0.6)] transition-colors duration-300 hover:bg-[#0E1116] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0563B4]"
              >
                {t("Get a free quote", "احصل على عرض سعر مجاني")}
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>

          {/* ============ STICKY SCROLL ============ */}
          <StickyScroll content={items} className="mt-8 sm:mt-10 lg:mt-14" />

          {/* ============ BOTTOM CTA ============ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={REVEAL_VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-10 sm:mt-14 flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl bg-linear-to-r from-[#0E1116] to-[#1B2029] px-6 py-8 text-white sm:flex-row sm:items-center sm:px-10"
          >
            <div>
              <p className="text-xl font-semibold">{t("Not sure which service you need?", "لست متأكداً من الخدمة التي تحتاجها؟")}</p>
              <p className="mt-1.5 text-[14px] text-[#D9DEE5]">
                {t("Book a free vehicle inspection and we will recommend what your car actually needs.", "احجز فحصاً مجانياً لسيارتك وسنوصي بما تحتاجه سيارتك فعلاً.")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onBook("Free Inspection")}
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-[#0E1116] transition-colors duration-300 hover:bg-[#D9DEE5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t("Book a free inspection", "احجز فحصاً مجانياً")}
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>
  );
}
