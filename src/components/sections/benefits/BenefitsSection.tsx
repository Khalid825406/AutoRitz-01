"use client";

import { useLang } from "@/i18n/LangProvider";
import { motion, type Variants } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Car,
  Check,
  ClipboardCheck,
  Droplets,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";

import { REVEAL_VIEWPORT } from "@/components/motion/viewport";
interface BenefitsSectionProps {
  onBook: (service?: string) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const BENEFITS = [
  { icon: Truck, title: "Free Pick-up & Drop-off", titleAr: "استلام وتوصيل مجاني", text: "Convenient vehicle collection and delivery from your home or office.", textAr: "استلام وتوصيل مريح للسيارة من منزلك أو مكتبك." },
  { icon: ShieldCheck, title: "Free General Inspection", titleAr: "فحص عام مجاني", text: "A detailed multi-point check to help identify potential vehicle issues.", textAr: "فحص مفصل متعدد النقاط لاكتشاف أي مشاكل محتملة في السيارة." },
  { icon: Droplets, title: "Free Exterior Car Wash", titleAr: "غسيل خارجي مجاني", text: "A fresh, clean finish with every service booking.", textAr: "لمسة نظافة ولمعان مع كل حجز صيانة." },
];

const JOURNEY = [
  { icon: Truck, title: "We collect your car", titleAr: "نستلم سيارتك", text: "From your home or workplace", textAr: "من منزلك أو مكان عملك" },
  { icon: ClipboardCheck, title: "We inspect your vehicle", titleAr: "نفحص سيارتك", text: "General health check included", textAr: "يشمل فحصاً عاماً للحالة" },
  { icon: Droplets, title: "We clean your car", titleAr: "ننظف سيارتك", text: "Complimentary exterior wash", textAr: "غسيل خارجي مجاني" },
  { icon: Car, title: "We deliver it back", titleAr: "نعيدها إليك", text: "Right to your doorstep", textAr: "حتى باب منزلك" },
];

export default function BenefitsSection({ onBook }: BenefitsSectionProps) {
  const { t } = useLang();
  return (
      <section id="benefits" className="w-full scroll-mt-32 bg-[#F7FAFD] py-12 sm:py-24 lg:py-28">
        <div className="site-container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={REVEAL_VIEWPORT}>
            <SectionHeading
              eyebrow={t("Exclusive benefits", "مزايا حصرية")}
              icon={Sparkles}
              title={t("More care.", "عناية أكثر.")}
              highlight={t("Zero extra cost.", "بدون تكلفة إضافية.")}
              description={t("Every booking in Dubai comes with complimentary services designed to make your car maintenance effortless.", "كل حجز في دبي يشمل خدمات مجانية تجعل صيانة سيارتك سهلة.")}
            />
          </motion.div>

          {/* ============ BENEFIT CARDS ============ */}
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={REVEAL_VIEWPORT}
            className="mt-10 sm:mt-14 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3"
          >
            {BENEFITS.map(({ icon: Icon, title, titleAr, text, textAr }, i) => (
              <motion.li
                key={title}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(14, 17, 22,0.04)] sm:p-7 transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#0563B4]/30 hover:shadow-[0_24px_48px_-12px_rgba(14, 17, 22,0.18)]"
              >
                <span className="pointer-events-none absolute right-5 top-4 text-4xl font-bold leading-none text-slate-100 tabular-nums sm:right-6 sm:top-5 sm:text-5xl transition-colors group-hover:text-[#EAF4FC]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-[#0B6FC2] to-[#0E1116] sm:h-14 sm:w-14 text-white shadow-[0_10px_20px_-6px_rgba(23,102,174,0.6)]">
                  <Icon size={24} strokeWidth={1.8} />
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#0563B4]/20 sm:mt-6 bg-[#EAF4FC] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#0563B4]">
                  <Check size={12} strokeWidth={3} />
                  {t("Complimentary", "مجاناً")}
                </span>
                <h3 className="mt-3 text-base font-semibold text-[#0E1116] sm:mt-4 sm:text-lg">{t(title, titleAr)}</h3>
                <p className="mt-1.5 text-[14px] leading-normal text-slate-600 sm:mt-2 sm:leading-relaxed">{t(text, textAr)}</p>
                <span className="mt-4 block h-[2px] w-8 bg-[#0563B4] sm:mt-6 transition-all duration-500 group-hover:w-16" />
              </motion.li>
            ))}
          </motion.ul>

          {/* ============ PACKAGE PANEL ============ */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={REVEAL_VIEWPORT}
            className="relative isolate mt-6 overflow-hidden rounded-3xl sm:mt-8 bg-linear-to-br from-[#0B0E13] via-[#12161D] to-[#151A22] p-6 shadow-[0_30px_60px_-20px_rgba(14, 17, 22,0.55)] sm:p-10 lg:p-12"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-radial from-[#0B6FC2]/30 to-transparent to-70%" />

            <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4B9DE0]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[#7cc0f5]">
                    <Award size={18} />
                  </span>
                  {t("Ritz Auto Care · Your benefits package", "ريتز أوتو كير · باقة مزاياك")}
                </p>
                <h3 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
                  {t("How We Care", "كيف نعتني")} <span className="text-[#4B9DE0]">{t("For Your Car", "بسيارتك")}</span>
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#D9DEE5]/80">
                  {t("Added care with your service booking. Premium care, every time. Your convenience is our priority.", "عناية إضافية مع كل حجز. عناية فاخرة في كل مرة. راحتك أولويتنا.")}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onBook()}
                  className="group inline-flex h-12 items-center gap-2 rounded-xl bg-linear-to-r from-[#0B6FC2] to-[#2f8fe0] px-6 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(47,143,224,0.7)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Phone size={16} />
                  {t("Book Your Service", "احجز خدمتك")}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="#services"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 px-6 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {t("Explore Services", "استكشف الخدمات")}
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            {/* journey */}
            <ol className="relative mt-8 sm:mt-12 grid grid-cols-2 gap-y-8 sm:gap-y-10 md:grid-cols-4">
              <span
                aria-hidden
                className="absolute left-[12.5%] right-[12.5%] top-7 hidden border-t border-dashed border-white/20 md:block"
              />
              {JOURNEY.map(({ icon: Icon, title, titleAr, text, textAr }, i) => (
                <li key={title} className="relative flex flex-col items-center px-2 text-center">
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-[#0B6FC2] to-[#1B2029] text-white shadow-[0_0_0_6px_rgba(23,102,174,0.15)]">
                    <Icon size={22} strokeWidth={1.8} />
                    <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#0E1116]">
                      {i + 1}
                    </span>
                  </span>
                  <p className="mt-3.5 text-sm font-semibold text-white sm:mt-5">{t(title, titleAr)}</p>
                  <p className="mt-1 text-xs text-[#D9DEE5]/70">{t(text, textAr)}</p>
                  <p className="mt-2 flex items-center gap-1 text-[10px] sm:mt-3 font-semibold uppercase tracking-[0.14em] text-[#4B9DE0]">
                    <Check size={12} strokeWidth={3} />
                    {t("Included", "مشمول")}
                  </p>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>
  );
}
