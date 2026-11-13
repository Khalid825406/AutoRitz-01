"use client";

import { useEffect, useRef } from "react";
import { animate, motion, type AnimationPlaybackControls } from "motion/react";
import { MessageCircle, Star } from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";
import { REVIEW_SUMMARY, testimonials, type Testimonial } from "@/data/testimonials";

const EASE = [0.22, 1, 0.36, 1] as const;

function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${value} out of 5 stars`}>
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

function ReviewCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(8,47,89,0.04)] transition-[box-shadow,border-color] duration-300 hover:border-[#0872BB]/30 hover:shadow-[0_20px_40px_-16px_rgba(8,47,89,0.2)] sm:p-7">
      <div className="flex items-center justify-between">
        <Stars value={t.rating} />
        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Google Review
        </span>
      </div>
      <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-slate-700">&ldquo;{t.text}&rdquo;</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF4FC] text-sm font-bold text-[#0872BB]">
          {t.name.charAt(0).toUpperCase()}
        </span>
        <span className="flex-1">
          <span className="block text-[15px] font-semibold text-[#082F59]">{t.name}</span>
          <span className="block text-xs text-slate-500">Customer Review</span>
        </span>
        <MessageCircle size={20} className="text-[#0872BB]" />
      </figcaption>
    </figure>
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
      className="flex overflow-hidden"
      onMouseEnter={() => controls.current?.pause()}
      onMouseLeave={() => controls.current?.play()}
    >
      <div ref={track} className="flex w-max shrink-0">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-stretch gap-6 pr-6">
            {row.map((t, i) => (
              <li key={`${copy}-${i}`} className="w-[300px] shrink-0 sm:w-[410px]">
                <ReviewCard t={t} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { rating, count, url } = REVIEW_SUMMARY;

  const summary = (
    <>
      <Stars value={rating} size={18} />
      <span className="text-base font-bold text-[#082F59]">{rating}/5</span>
      <span className="h-5 w-px bg-slate-200" />
      <span className="text-sm text-slate-600">Based on {count} Google reviews</span>
    </>
  );

  return (
      <section
        id="testimonials"
        className="w-full scroll-mt-32 overflow-hidden bg-linear-to-b from-[#EEF5FB] to-[#F7FAFD] py-20 sm:py-24 lg:py-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="site-container flex flex-col items-center"
        >
          <SectionHeading
            eyebrow="Customer testimonials"
            icon={Star}
            title="Trusted by Car Owners"
            highlight="Loved by Customers."
            description="Discover what our customers say about their experience with Ritz Auto Care and our automotive services."
          />
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-3 shadow-xs transition hover:border-[#0872BB]/40"
            >
              {summary}
            </a>
          ) : (
            <div className="mt-8 flex items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-3 shadow-xs">
              {summary}
            </div>
          )}
        </motion.div>

        <div className="mt-14 flex flex-col gap-6">
          <MarqueeRow items={testimonials} direction="left" />
          <MarqueeRow items={[...testimonials.slice(1), testimonials[0]]} direction="right" />
        </div>
      </section>
  );
}
