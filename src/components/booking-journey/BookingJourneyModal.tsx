"use client";

import { useLang } from "@/i18n/LangProvider";
import { useCallback, useEffect, useEffectEvent, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Car, Check, Loader2, Phone, RotateCcw, Sparkles, Truck, X } from "lucide-react";

import BrandLogo from "@/components/layout/BrandLogo";
import { SITE_CONTACT } from "@/config/site";
import { Sparkle } from "./illustrations";

/* ------------------------------------------------------------------ */
/* Timeline (~8 s, unhurried so every clip can be seen)                */
/*  stage 0 (advisor) shows for ADVISOR_MS; stages 1–4 each play their  */
/*  2 s clip and move on as it ends; then WhatsApp opens in this tab.   */
/* ------------------------------------------------------------------ */
const ADVISOR_MS = 900;
/** Move to the next stage this many seconds before the clip ends (so the cut feels continuous). */
const NEAR_END_S = 0.2;
/** Safety net: if a clip can't load/play (slow network, data saver), move on after this long anyway. */
const MAX_STAGE_MS = 3000;

const EASE = [0.22, 1, 0.36, 1] as const;

type Stage = 0 | 1 | 2 | 3 | 4;
type View = Stage | "error";

/**
 * Ritz Auto Care's own clips on Cloudinary for the four car stages. Cloudinary cuts the best 2 s of
 * every 5 s clip (so_/eo_ = start/end second), sizes it to 960 px, strips the audio and picks the quality
 * (q_auto). Each clip loops if its stage is held (e.g. while a booking confirms).
 *   1 first  — blue car driving with speed trails
 *   2 second — the car on a flatbed tow truck, city skyline behind
 *   3 third  — the car being washed, water splashing
 *   4 forth  — the car driving back on the road
 */
const CLOUDINARY_VIDEO = "https://res.cloudinary.com/dc1l3bsrr/video/upload";
const clip = (id: string, start: number, end: number) => ({
  id,
  src: `${CLOUDINARY_VIDEO}/so_${start},eo_${end},q_auto,w_960,ac_none/${id}.mp4`,
  poster: `${CLOUDINARY_VIDEO}/so_${start},q_auto,w_960/${id}.jpg`,
});
const CLIPS: Partial<Record<View, ReturnType<typeof clip>>> = {
  1: clip("first_d5ajyf", 0, 2),
  2: clip("second_xcno7r", 1.4, 3.4), // truck carrying the car through the middle of the frame
  3: clip("third_wgq9ms", 0.5, 2.5),
  4: clip("forth_ssftbh", 0.8, 2.8), // car already on screen
};

const COPY: Record<View, { title: string; titleAr: string; text: string; textAr: string }> = {
  0: { title: "Connecting to Advisor...", titleAr: "جارٍ الاتصال بالمستشار...", text: "Please wait while we connect you with our service advisor.", textAr: "يرجى الانتظار بينما نوصلك بمستشار الخدمة." },
  1: { title: "Processing Your Request...", titleAr: "جارٍ معالجة طلبك...", text: "We're checking your details and preparing for service.", textAr: "نراجع بياناتك ونستعد لتقديم الخدمة." },
  2: { title: "Service In Progress...", titleAr: "الخدمة قيد التنفيذ...", text: "Your car is on the way and will be picked up shortly.", textAr: "نحن في الطريق وسيتم استلام سيارتك قريباً." },
  3: { title: "Service Completed!", titleAr: "اكتملت الخدمة!", text: "Your car is ready, cleaned and on the way back.", textAr: "سيارتك جاهزة ونظيفة وفي طريق العودة." },
  4: { title: "On the Way Back!", titleAr: "في طريق العودة!", text: "We are returning your car now. Thank you for choosing us!", textAr: "نعيد سيارتك إليك الآن. شكراً لاختيارك لنا!" },
  error: { title: "We couldn't send your request", titleAr: "تعذر إرسال طلبك", text: "", textAr: "" },
};

const STEPS = [
  { icon: Truck, title: "Free Towing", titleAr: "سحب مجاني", text: "From your location", textAr: "من موقعك" },
  { icon: Car, title: "Free Pickup", titleAr: "استلام مجاني", text: "We collect your car", textAr: "نستلم سيارتك" },
  { icon: Sparkles, title: "Free Service & Wash", titleAr: "صيانة وغسيل مجاني", text: "Complete care & cleaning", textAr: "عناية وتنظيف كامل" },
  { icon: RotateCcw, title: "Free Return", titleAr: "إعادة مجانية", text: "We bring it back", textAr: "نعيدها إليك" },
] as const;

/** Top progress bar position for each view. */
const PROGRESS: Record<View, number> = { 0: 0.1, 1: 0.3, 2: 0.5, 3: 0.7, 4: 0.9, error: 1 };

/** How many of the 4 service steps are ticked in each view. */
const DONE_BY_VIEW: Record<View, number> = { 0: 0, 1: 0, 2: 2, 3: 3, 4: 4, error: 0 };

export interface JourneyOptions {
  /** wa.me link (with the prefilled message) opened in a new tab at the end of the journey. */
  whatsappUrl: string;
  /** Real booking request. WhatsApp only opens after it resolves; a rejection shows the error + retry. */
  submit?: () => Promise<void>;
}

export default function BookingJourneyModal({ whatsappUrl, submit, onClose }: JourneyOptions & { onClose: () => void }) {
  const { t } = useLang();
  const [stage, setStage] = useState<Stage>(0);
  const [animDone, setAnimDone] = useState(false);
  const [submitState, setSubmitState] = useState<"pending" | "ok" | "error">(submit ? "pending" : "ok");
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  // 1) the animated journey — each video stage hands over to the next one as its clip finishes
  const advance = useCallback((from: Stage) => {
    if (from >= 4) setAnimDone(true);
    else setStage((current) => (current === from ? ((from + 1) as Stage) : current));
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => advance(0), ADVISOR_MS);
    return () => window.clearTimeout(t);
  }, [advance]);

  useEffect(() => {
    if (stage === 0 || animDone) return;
    const t = window.setTimeout(() => advance(stage), MAX_STAGE_MS);
    return () => window.clearTimeout(t);
  }, [stage, animDone, advance]);

  // 2) the real booking request, sent in parallel with the animation
  useEffect(() => {
    if (!submit) return;
    let alive = true;
    submit().then(
      () => alive && setSubmitState("ok"),
      (e: unknown) => {
        if (!alive) return;
        setError(e instanceof Error ? e.message : t("Something went wrong. Please try again.", "حدث خطأ ما. يرجى المحاولة مرة أخرى."));
        setSubmitState("error");
      },
    );
    return () => {
      alive = false;
    };
  }, [submit, t]);

  const retry = () => {
    if (!submit) return;
    setSubmitState("pending");
    setError("");
    submit().then(
      () => setSubmitState("ok"),
      (e: unknown) => {
        setError(e instanceof Error ? e.message : t("Something went wrong. Please try again.", "حدث خطأ ما. يرجى المحاولة مرة أخرى."));
        setSubmitState("error");
      },
    );
  };

  // After the last car stage (and once the booking succeeded) WhatsApp opens in a new tab; until then the
  // car stays "on the way back".
  const view: View = !animDone ? stage : submitState === "error" ? "error" : 4;
  const waiting = animDone && submitState === "pending";
  const redirecting = animDone && submitState === "ok";

  // Open WhatsApp automatically in this tab — no click needed. (A new tab is not possible here: browsers
  // only let a page open one by itself within ~5 s of the click, and this journey takes ~8 s.)
  // On phones the WhatsApp app opens on top of the site, so the popup closes itself shortly afterwards.
  useEffect(() => {
    if (!redirecting) return;
    window.location.assign(whatsappUrl);
    const t = window.setTimeout(onClose, 1500);
    return () => window.clearTimeout(t);
  }, [redirecting, whatsappUrl, onClose]);

  // Esc to close, lock page scroll, focus the dialog (and give focus back afterwards).
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [onClose]);

  const copy = COPY[view];

  return (
    <motion.div
      data-booking-journey
      className="fixed inset-0 z-[10050] flex items-center justify-center bg-[#07090C]/75 p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="journey-title"
        aria-describedby="journey-text"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 28, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-[580px] overflow-y-auto rounded-[28px] bg-white p-5 shadow-[0_40px_90px_-30px_rgba(7, 9, 12,0.65)] outline-none sm:p-7"
      >
        {/* header */}
        <div className="flex items-center justify-between gap-4">
          <BrandLogo size="sm" />
          <button
            type="button"
            onClick={onClose}
            aria-label={t("Close", "إغلاق")}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-[#0E1116] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0563B4]"
          >
            <X size={18} />
          </button>
        </div>

        {/* overall progress */}
        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100" aria-hidden>
          <motion.div
            className={`h-full w-full origin-left rounded-full rtl:origin-right ${view === "error" ? "bg-red-400" : redirecting ? "bg-[#25D366]" : "bg-linear-to-r from-[#0563B4] to-[#4B9DE0]"}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: redirecting ? 1 : PROGRESS[view] + (waiting ? 0.04 : 0) }}
            transition={{ duration: 0.6, ease: EASE }}
          />
        </div>

        {/* scene */}
        <div className="relative mt-4 h-[200px] overflow-hidden rounded-2xl bg-[#0E1116] sm:h-[250px]">
          <VideoLayer view={view} onNearEnd={() => !animDone && stage !== 0 && advance(stage)} />
          {/* each stage swaps in instantly with a short fade — no overlapping exit layer, so the next
              vehicle starts driving right away and only one scene is ever animating */}
          <motion.div
            key={String(view)}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            <Scene view={view} />
          </motion.div>
        </div>

        {/* text */}
        <div className="mt-5 min-h-[76px] text-center" aria-live="polite">
          {/* new text replaces the old instantly (no exit wait) so it stays in step with the scene */}
          <motion.div key={String(view)} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <h2 id="journey-title" className={`text-xl font-bold tracking-tight sm:text-2xl ${view === "error" ? "text-red-600" : "text-[#0E1116]"}`}>
                {t(copy.title, copy.titleAr)}
              </h2>
              <p id="journey-text" className="mx-auto mt-1.5 max-w-sm text-[14px] leading-relaxed text-slate-600 sm:text-[14px]">
                {view === "error" ? error : t(copy.text, copy.textAr)}
              </p>
          </motion.div>
          {waiting && (
            <p className="mt-2 inline-flex items-center gap-2 text-[13px] font-medium text-[#0563B4]">
              <Loader2 size={14} className="animate-spin" />
              {t("Confirming your booking…", "جارٍ تأكيد حجزك…")}
            </p>
          )}
          {redirecting && (
            <p className="mt-2 inline-flex items-center gap-2 text-[13px] font-medium text-[#16a34a]">
              <Loader2 size={14} className="animate-spin" />
              {t("Opening WhatsApp…", "جارٍ فتح واتساب…")}
            </p>
          )}
        </div>

        {/* actions */}
        {view === "error" && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={retry}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0E1116] text-sm font-semibold text-white transition-colors hover:bg-[#0563B4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0563B4]"
            >
              <RotateCcw size={16} />
              {t("Try again", "حاول مرة أخرى")}
            </button>
            <a
              href={`tel:${SITE_CONTACT.phone}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-semibold text-[#0E1116] transition-colors hover:bg-slate-50"
            >
              <Phone size={16} />
              {t("Call", "اتصل")} <span dir="ltr">{SITE_CONTACT.phone}</span>
            </a>
          </div>
        )}

        {/* service steps */}
        <StepTracker done={DONE_BY_VIEW[view]} muted={view === "error"} />
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Scenes                                                              */
/* ------------------------------------------------------------------ */
function Scene({ view }: { view: View }) {
  switch (view) {
    case 0:
      return <AdvisorScene />;
    case 2:
      return <ServiceChipsOverlay />;
    case 3:
      return <CleanOverlay />;
    case "error":
      return <ErrorScene />;
    default:
      return <VideoShade />; // stages 1 and 4: the footage speaks for itself
  }
}

function Center({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-b from-[#EAF4FC] to-[#F7FAFD]">
      {children}
    </div>
  );
}

/**
 * All four clips stay mounted (preloaded as soon as the popup opens) so every stage switch is instant;
 * only the active clip plays, from its first frame. `onNearEnd` fires once, just before the active clip
 * finishes, so the journey moves on with the footage instead of a fixed timer.
 */
function VideoLayer({ view, onNearEnd }: { view: View; onNearEnd: () => void }) {
  const refs = useRef<Record<string, HTMLVideoElement | null>>({});
  const active = CLIPS[view]?.id;
  const nearEnd = useEffectEvent(onNearEnd);

  useEffect(() => {
    let current: HTMLVideoElement | null = null;
    for (const [name, video] of Object.entries(refs.current)) {
      if (!video) continue;
      if (name === active) {
        current = video;
        video.currentTime = 0;
        video.play().catch(() => {}); // autoplay can be refused (e.g. data saver) — the poster stays visible
      } else {
        video.pause();
      }
    }
    if (!current) return;

    // Watch playback every frame (timeupdate only fires ~4×/s — too coarse for a 0.25 s lead).
    const video = current;
    let raf = 0;
    let fired = false;
    const watch = () => {
      const d = video.duration;
      if (!fired && Number.isFinite(d) && d > 0 && video.currentTime >= d - NEAR_END_S) {
        fired = true;
        nearEnd();
        return;
      }
      raf = requestAnimationFrame(watch);
    };
    raf = requestAnimationFrame(watch);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <>
      {Object.values(CLIPS).map(({ id: name, src, poster }) => (
        <video
          key={name}
          ref={(el) => {
            refs.current[name] = el;
          }}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${name === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </>
  );
}

/** Soft bottom shade so the footage blends into the white card. */
function VideoShade() {
  return <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-[#07090C]/20 to-transparent" />;
}

function AdvisorScene() {
  const { t } = useLang();
  return (
    <Center>
      <div className="relative">
        <motion.span
          className="absolute inset-0 rounded-full bg-[#4B9DE0]/25"
          animate={{ scale: [1, 1.25], opacity: [0.6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
        />
        <div className="relative h-28 w-28 overflow-hidden rounded-full bg-linear-to-b from-white to-[#DCEBFA] ring-4 ring-white shadow-[0_12px_30px_-10px_rgba(14, 17, 22,0.35)] sm:h-32 sm:w-32">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/advisor/advisor.webp" alt={t("Ritz Auto Care service advisor", "مستشار خدمة ريتز أوتو كير")} className="h-full w-full object-cover object-top" />
        </div>
      </div>
      <div className="mt-4 flex gap-1.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-[#0563B4]"
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
          />
        ))}
      </div>
    </Center>
  );
}

const SERVICE_CHIPS = STEPS.map((s) => ({ en: s.title, ar: s.titleAr }));

/** Stage 3: the four free services pop in over the towing footage. */
function ServiceChipsOverlay() {
  const { t } = useLang();
  return (
    <>
      <VideoShade />
      <div className="absolute inset-x-3 top-3 flex flex-wrap justify-center gap-1.5">
        {SERVICE_CHIPS.map((c, i) => (
          <motion.span
            key={c.en}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.25 }}
            className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-[#0563B4] shadow-sm sm:text-[11px]"
          >
            {t(c)}
          </motion.span>
        ))}
      </div>
    </>
  );
}

/** Stage 4: sparkles once the foam wash is done. */
function CleanOverlay() {
  const { t } = useLang();
  return (
    <>
      <VideoShade />
      <Sparkle className="absolute left-[22%] top-[22%] h-6 w-6 text-white drop-shadow" delay={0.45} />
      <Sparkle className="absolute left-[58%] top-[14%] h-5 w-5 text-[#cfe6fb] drop-shadow" delay={0.6} />
      <Sparkle className="absolute left-[78%] top-[40%] h-4 w-4 text-white drop-shadow" delay={0.75} />
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="absolute bottom-3 start-3 inline-flex items-center gap-1.5 rounded-full bg-[#16a34a] px-3 py-1 text-[11px] font-semibold text-white shadow"
      >
        <Check size={13} strokeWidth={3} />
        {t("Washed & serviced", "تم الغسيل والصيانة")}
      </motion.span>
    </>
  );
}

function ErrorScene() {
  return (
    <Center>
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500 ring-8 ring-red-50/60">
        <AlertTriangle size={36} />
      </span>
    </Center>
  );
}

/* ------------------------------------------------------------------ */
/* Bottom service progress                                             */
/* ------------------------------------------------------------------ */
function StepTracker({ done, muted }: { done: number; muted: boolean }) {
  const { t } = useLang();
  return (
    <ol className={`mt-6 grid grid-cols-4 gap-1 border-t border-slate-100 pt-5 ${muted ? "opacity-50" : ""}`} aria-label={t("Service steps", "خطوات الخدمة")}>
      {STEPS.map((s, i) => {
        const Icon = s.icon;
        const isDone = i < done;
        const isActive = i === done && !muted;
        return (
          <li key={s.title} className="relative flex flex-col items-center text-center">
            {/* connector to the next step */}
            {i < STEPS.length - 1 && (
              <span className="absolute start-[calc(50%+22px)] end-[calc(-50%+22px)] top-[19px] h-[2px] rounded-full bg-slate-200 sm:top-[21px]" aria-hidden>
                <motion.span
                  className="block h-full rounded-full bg-[#0563B4]"
                  initial={false}
                  animate={{ width: isDone ? "100%" : "0%" }}
                  transition={{ duration: 0.35, delay: 0.1 * i }}
                />
              </span>
            )}
            <span
              className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-300 sm:h-11 sm:w-11 ${
                isDone
                  ? "border-[#16a34a] bg-[#16a34a] text-white"
                  : isActive
                    ? "border-[#0563B4] bg-[#EAF4FC] text-[#0563B4]"
                    : "border-slate-200 bg-white text-slate-400"
              }`}
            >
              {isActive && (
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-[#0563B4]"
                  animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  aria-hidden
                />
              )}
              <AnimatePresence mode="wait" initial={false}>
                {isDone ? (
                  <motion.span
                    key="done"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 22, delay: 0.12 * i }}
                  >
                    <Check size={18} strokeWidth={3} />
                  </motion.span>
                ) : (
                  <motion.span key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Icon size={17} />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            <span className={`mt-2 text-[10.5px] font-semibold leading-tight sm:text-xs ${isDone ? "text-[#16a34a]" : "text-[#0E1116]"}`}>
              {t(s.title, s.titleAr)}
            </span>
            <span className="mt-0.5 block text-[9.5px] leading-tight text-slate-500 sm:text-[11px]">{t(s.text, s.textAr)}</span>
            <span className="sr-only">{isDone ? t(" — completed", " — مكتمل") : ""}</span>
          </li>
        );
      })}
    </ol>
  );
}
