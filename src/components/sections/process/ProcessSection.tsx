"use client";

import { useLang } from "@/i18n/LangProvider";
import { motion, type Variants } from "motion/react";
import { ArrowUpRight, CalendarCheck, ClipboardCheck, KeyRound, Phone, ShieldCheck, ThumbsUp } from "lucide-react";

import { CONTACT } from "@/config/site";

import TextReveal from "@/components/motion/TextReveal";
import { REVEAL_VIEWPORT } from "@/components/motion/viewport";
interface ProcessSectionProps {
  onBook: (service?: string) => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const STEPS = [
  { icon: CalendarCheck, title: "Book a service", titleAr: "احجز خدمة", text: "Call us for booking and free inspection.", textAr: "اتصل بنا للحجز والفحص المجاني." },
  { icon: KeyRound, title: "Free pick-up", titleAr: "استلام مجاني", text: "We collect your car from home, office or mall.", textAr: "نستلم سيارتك من المنزل أو المكتب أو المول." },
  { icon: ClipboardCheck, title: "Free inspection", titleAr: "فحص مجاني", text: "We check your concerns plus a general health check.", textAr: "نفحص ملاحظاتك بالإضافة إلى فحص عام لحالة السيارة." },
  { icon: ThumbsUp, title: "Job approval", titleAr: "الموافقة على العمل", text: "You get a fair estimate and approve the work.", textAr: "تحصل على تقدير عادل للتكلفة وتوافق على العمل." },
];

export default function ProcessSection({ onBook }: ProcessSectionProps) {
  const { t } = useLang();
  return (
      <section id="how-it-works" className="w-full scroll-mt-32 bg-white py-12 sm:py-24 lg:py-28">
        <div className="site-container grid gap-10 sm:gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          {/* ================= LEFT ================= */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={REVEAL_VIEWPORT}
            className="lg:sticky lg:top-32"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0563B4] shadow-xs">
              <CalendarCheck size={14} />
              {t("Simple service process", "خطوات خدمة بسيطة")}
            </span>
            <TextReveal className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-[#0E1116] sm:text-4xl lg:text-5xl">
              {t("Four Easy Steps to", "أربع خطوات سهلة")}
              <span className="block text-[#0563B4]">{t("Better Car Care.", "لعناية أفضل بسيارتك.")}</span>
            </TextReveal>
            <p className="mt-5 max-w-md text-[14px] leading-relaxed text-slate-600">
              {t("Enjoy a simple and hassle-free car servicing experience anywhere in Dubai. From booking to delivery, we make every step smooth, transparent and convenient.", "استمتع بتجربة صيانة سهلة وخالية من المتاعب في أي مكان في دبي. من الحجز حتى التسليم، نجعل كل خطوة سلسة وشفافة ومريحة.")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onBook()}
                className="group inline-flex h-12 items-center gap-2 rounded-xl bg-linear-to-r from-[#0E1116] to-[#0B6FC2] px-6 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(23,102,174,0.6)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0563B4]"
              >
                {t("Book Your Service", "احجز خدمتك")}
                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
              <a
                href={`tel:${CONTACT.phone}`}
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-[#0E1116] transition hover:border-[#0563B4] hover:text-[#0563B4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0563B4]"
              >
                <Phone size={16} />
                {t("Call Us", "اتصل بنا")}
              </a>
            </div>

            <div className="mt-8 flex max-w-md items-center gap-4 rounded-2xl bg-linear-to-r from-[#07090C] to-[#1B2029] p-5 text-white shadow-[0_20px_40px_-16px_rgba(14, 17, 22,0.5)]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-[#7cc0f5]">
                <ShieldCheck size={20} />
              </span>
              <p className="text-sm leading-relaxed text-[#D9DEE5]">
                {t("Simple booking. Professional service.", "حجز سهل. خدمة احترافية.")}{" "}
                <span className="font-semibold text-white">{t("Complete peace of mind.", "راحة بال تامة.")}</span>
              </p>
            </div>
          </motion.div>

          {/* ================= TIMELINE ================= */}
          <ol className="relative">
            {/* vertical line */}
            <span
              aria-hidden
              className="absolute bottom-10 left-6 top-10 w-px bg-linear-to-b from-[#0563B4] via-[#0563B4]/40 to-transparent sm:left-7"
            />
            {STEPS.map(({ icon: Icon, title, titleAr, text, textAr }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={REVEAL_VIEWPORT}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="relative flex gap-5 pb-6 last:pb-0 sm:gap-8"
              >
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#0B6FC2] to-[#0E1116] text-white shadow-[0_10px_20px_-6px_rgba(23,102,174,0.6)] ring-4 ring-white sm:h-14 sm:w-14">
                  <Icon size={22} strokeWidth={1.8} />
                </span>

                <div className="group relative flex-1 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(14, 17, 22,0.04)] transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#0563B4]/30 hover:shadow-[0_20px_40px_-16px_rgba(14, 17, 22,0.18)]">
                  <span className="pointer-events-none absolute right-5 top-3 text-5xl font-bold leading-none text-slate-100 tabular-nums transition-colors group-hover:text-[#EAF4FC]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0563B4]">{t("Step", "الخطوة")} {i + 1}</p>
                  <h3 className="mt-2 text-lg font-semibold text-[#0E1116]">{t(title, titleAr)}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">{t(text, textAr)}</p>
                  <span className="mt-4 block h-[2px] w-8 bg-[#0563B4] transition-all duration-500 group-hover:w-16" />
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
  );
}
