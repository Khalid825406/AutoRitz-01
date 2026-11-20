"use client";

import { useLang } from "@/i18n/LangProvider";
import { useEffect, useRef } from "react";
import { animate, motion, type AnimationPlaybackControls } from "motion/react";
import { ArrowUpRight, Star } from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";
import CountUp from "@/components/motion/CountUp";
import { REVIEW_SUMMARY, testimonials, type Testimonial } from "@/data/testimonials";

import { REVEAL_VIEWPORT } from "@/components/motion/viewport";
const EASE = [0.22, 1, 0.36, 1] as const;

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  const { t } = useLang();
  return (
    <span className="flex items-center gap-0.5" aria-label={t(`${value} out of 5 stars`, `${value} من 5 نجوم`)}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, value - i)); // 0, partial, or 1
        return (
          <span key={i} className="relative inline-flex" style={{ width: size, height: size }}>
            <Star size={size} className="absolute inset-0 fill-slate-200 text-slate-200" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star size={size} className="fill-amber-400 text-amber-400" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

/** Google "G" mark. */
function GoogleG({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

/** One review — the whole card opens the Google reviews page in a new tab. */
function ReviewCard({ t, hidden }: { t: Testimonial; hidden: boolean }) {
  const { url } = REVIEW_SUMMARY;
  const { t: tr } = useLang();
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={hidden ? -1 : undefined}
      aria-label={tr(`Read ${t.name}'s review on Google`, `اقرأ تقييم ${t.name} على Google`)}
      className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(14, 17, 22,0.04)] transition-[box-shadow,border-color,translate] duration-300 hover:-translate-y-0.5 hover:border-[#0563B4]/30 hover:shadow-[0_20px_40px_-16px_rgba(14, 17, 22,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0563B4] sm:p-5"
    >
      <div className="flex items-center justify-between gap-3">
        <Stars value={t.rating} />
        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <GoogleG />
          {tr("Google Review", "تقييم Google")}
        </span>
      </div>
      {/* long reviews are trimmed to 4 lines — the full text is on Google */}
      <blockquote dir="ltr" className="mt-3 text-start line-clamp-3 flex-1 text-[13px] leading-relaxed text-slate-700 sm:text-[14px]">
        &ldquo;{t.text}&rdquo;
      </blockquote>
      <div className="mt-4 flex items-center gap-2.5 border-t border-slate-100 pt-3">
        {t.photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- small avatar, already optimised webp
          <img src={t.photo} alt="" width={44} height={44} loading="lazy" className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-[#EAF4FC]" />
        ) : (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF4FC] text-[13px] font-bold text-[#0563B4]">
            {t.name.charAt(0).toUpperCase()}
          </span>
        )}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-semibold text-[#0E1116]">{t.name}</span>
          <span className="block text-xs text-slate-500">{tr("Customer review", "تقييم عميل")}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-[#0563B4]">
          <span className="max-sm:text-[11px]">{tr("Read on Google", "اقرأه على Google")}</span>
          <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}

const MARQUEE_SECONDS = 70;

/**
 * Infinite marquee row, animated with Framer Motion. The list is rendered twice so the loop is seamless.
 * direction "left": cards enter from the right; "right": cards enter from the left. Pauses on hover.
 */
function MarqueeRow({ items, direction }: { items: Testimonial[]; direction: "left" | "right" }) {
  const track = useRef<HTMLDivElement>(null);
  const controls = useRef<AnimationPlaybackControls | null>(null);

  // Repeat short lists so one copy is always wider than the widest screen.
  const row = Array.from({ length: Math.max(2, Math.ceil(10 / items.length)) }, () => items).flat();

  useEffect(() => {
    if (!track.current) return;
    // Track holds two identical copies, so moving by -50% lands exactly on the start of copy #2.
    const x = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];
    controls.current = animate(track.current, { x }, { duration: MARQUEE_SECONDS, ease: "linear", repeat: Infinity });
    return () => controls.current?.stop();
  }, [direction]);

  return (
    <div
      dir="ltr"
      className="flex overflow-hidden"
      onMouseEnter={() => controls.current?.pause()}
      onMouseLeave={() => controls.current?.play()}
    >
      <div ref={track} className="flex w-max shrink-0">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-stretch gap-4 pr-4">
            {row.map((t, i) => (
              <li key={`${copy}-${i}`} className="w-[270px] shrink-0 sm:w-[340px]">
                <ReviewCard t={t} hidden={copy === 1} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { t } = useLang();
  const { rating, count, url } = REVIEW_SUMMARY;

  const summary = (
    <>
      <Stars value={rating} size={18} />
      <span className="text-base font-bold text-[#0E1116]">
        <CountUp value={rating.toFixed(1)} />/5
      </span>
      <span className="h-5 w-px bg-slate-200" />
      <span className="text-sm text-slate-600">{t("Based on", "بناءً على")} <CountUp value={count} /> {t("Google reviews", "تقييم على Google")}</span>
    </>
  );

  return (
      <section
        id="testimonials"
        className="w-full scroll-mt-32 overflow-hidden bg-linear-to-b from-[#EEF5FB] to-[#F7FAFD] py-12 sm:py-24 lg:py-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.7, ease: EASE }}
          className="site-container flex flex-col items-center"
        >
          <SectionHeading
            eyebrow={t("Customer testimonials", "آراء العملاء")}
            icon={Star}
            title={t("Trusted by Car Owners", "موثوق من مالكي السيارات")}
            highlight={t("Loved by Customers.", "ومحبوب من العملاء.")}
            description={t("Discover what our customers say about their experience with Ritz Auto Care and our automotive services.", "اكتشف ما يقوله عملاؤنا عن تجربتهم مع ريتز أوتو كير وخدماتنا.")}
          />
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-3 shadow-xs transition hover:border-[#0563B4]/40"
            >
              {summary}
            </a>
          ) : (
            <div className="mt-8 flex items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-3 shadow-xs">
              {summary}
            </div>
          )}
        </motion.div>

        <div className="mt-10 sm:mt-14 flex flex-col gap-6">
          <MarqueeRow items={testimonials.slice(0, Math.ceil(testimonials.length / 2))} direction="left" />
          <MarqueeRow items={testimonials.slice(Math.ceil(testimonials.length / 2))} direction="right" />
        </div>
      </section>
  );
}
