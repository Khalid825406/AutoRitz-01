"use client";

import { useCallback, useEffect, useEffectEvent, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, Car, Check, Loader2, Phone, RotateCcw, Sparkles, Truck, X } from "lucide-react";

import { SITE_CONTACT } from "@/config/site";
import { Sparkle } from "./illustrations";

/* ------------------------------------------------------------------ */
/* Timeline                                                            */
/*  stage 0 (advisor) shows for ADVISOR_MS; stages 1–4 each play their  */
/*  video and move on when it is about to end; stage 5 is WhatsApp.     */
/* ------------------------------------------------------------------ */
const ADVISOR_MS = 500;
/** Move to the next stage this many seconds before the clip ends (so the cut feels continuous). */
const NEAR_END_S = 0.25;
/** Safety net: if a clip can't load/play (slow network, data saver), move on after this long anyway. */
const MAX_STAGE_MS = 3000;

const EASE = [0.22, 1, 0.36, 1] as const;

type Stage = 0 | 1 | 2 | 3 | 4;
type View = Stage | "error";

/**
 * Ritz Auto Care's own clips on Cloudinary for the four car stages. Cloudinary cuts the best 2 s of
 * every 5 s clip (so_/eo_ = start/end second), sizes it to 960 px, strips the audio
 * and picks the quality (q_auto). The 2 s loop also covers a stage that is held while a booking confirms.
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
  2: clip("second_xcno7r", 1.4, 3.4), // truck already carrying the car through the frame
  3: clip("third_wgq9ms", 0.5, 2.5),
  4: clip("forth_ssftbh", 0.8, 2.8), // car already on screen
};

const COPY: Record<View, { title: string; text: string }> = {
  0: { title: "Connecting to Advisor...", text: "Please wait while we connect you with our service advisor." },
  1: { title: "Processing Your Request...", text: "We're checking your details and preparing for service." },
  2: { title: "Service In Progress...", text: "Your car is on the way and will be picked up shortly." },
  3: { title: "Service Completed!", text: "Your car is ready, cleaned and on the way back." },
  4: { title: "On the Way Back!", text: "We are returning your car now. Thank you for choosing us!" },
  error: { title: "We couldn't send your request", text: "" },
};

const STEPS = [
  { icon: Truck, title: "Free Towing", text: "From your location" },
  { icon: Car, title: "Free Pickup", text: "We collect your car" },
  { icon: Sparkles, title: "Free Service & Wash", text: "Complete care & cleaning" },
  { icon: RotateCcw, title: "Free Return", text: "We bring it back" },
] as const;

/** Top progress bar position for each view. */
const PROGRESS: Record<View, number> = { 0: 0.1, 1: 0.3, 2: 0.5, 3: 0.7, 4: 0.9, error: 1 };

/** How many of the 4 service steps are ticked in each view. */
const DONE_BY_VIEW: Record<View, number> = { 0: 0, 1: 0, 2: 2, 3: 3, 4: 4, error: 0 };

export interface JourneyOptions {
  /** wa.me link (with the prefilled message) opened by the final "Chat on WhatsApp" button. */
  whatsappUrl: string;
  /** Real booking request. The WhatsApp screen only appears after it resolves; a rejection shows the error + retry. */
  submit?: () => Promise<void>;
}

export default function BookingJourneyModal({ whatsappUrl, submit, onClose }: JourneyOptions & { onClose: () => void }) {
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
        setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
        setSubmitState("error");
      },
    );
    return () => {
      alive = false;
    };
  }, [submit]);

  const retry = () => {
    if (!submit) return;
    setSubmitState("pending");
    setError("");
    submit().then(
      () => setSubmitState("ok"),
      (e: unknown) => {
        setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
        setSubmitState("error");
      },
    );
  };

  // The WhatsApp screen waits for the booking to succeed; until then the car stays "on the way back".
  // After the last car stage the visitor goes straight to WhatsApp (once the booking request succeeded).
  const view: View = !animDone ? stage : submitState === "error" ? "error" : 4;
  const waiting = animDone && submitState === "pending";
  const redirecting = animDone && submitState === "ok";

  // Open WhatsApp in this tab: a new tab opened seconds after the click would be stopped by pop-up
  // blockers, a same-tab redirect is not. On phones the WhatsApp app opens and the site stays behind it,
  // so the popup closes itself shortly afterwards.
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
      className="fixed inset-0 z-[10050] flex items-center justify-center bg-[#061E3B]/75 p-3 sm:p-6"
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
        className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-[580px] overflow-y-auto rounded-[28px] bg-white p-5 shadow-[0_40px_90px_-30px_rgba(6,30,59,0.65)] outline-none sm:p-7"
      >
        {/* header */}
        <div className="flex items-center justify-between gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Rits-Auto-Care-Logo-2-1536x448.webp" alt="Ritz Auto Care LLC" width={160} height={47} className="h-9 w-auto sm:h-10" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-[#082F59] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]"
          >
            <X size={18} />
          </button>
        </div>

        {/* overall progress */}
        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-slate-100" aria-hidden>
          <motion.div
            className={`h-full w-full origin-left rounded-full ${view === "error" ? "bg-red-400" : redirecting ? "bg-[#25D366]" : "bg-linear-to-r from-[#0872BB] to-[#4B9DE0]"}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: redirecting ? 1 : PROGRESS[view] + (waiting ? 0.04 : 0) }}
            transition={{ duration: 0.6, ease: EASE }}
          />
        </div>

        {/* scene */}
        <div className="relative mt-4 h-[200px] overflow-hidden rounded-2xl bg-[#0b1f36] sm:h-[250px]">
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
              <h2 id="journey-title" className={`text-xl font-bold tracking-tight sm:text-2xl ${view === "error" ? "text-red-600" : "text-[#082F59]"}`}>
                {copy.title}
              </h2>
              <p id="journey-text" className="mx-auto mt-1.5 max-w-sm text-[14px] leading-relaxed text-slate-600 sm:text-[15px]">
                {view === "error" ? error : copy.text}
              </p>
          </motion.div>
          {waiting && (
            <p className="mt-2 inline-flex items-center gap-2 text-[13px] font-medium text-[#0872BB]">
              <Loader2 size={14} className="animate-spin" />
              Confirming your booking…
            </p>
          )}
          {redirecting && (
            <p className="mt-2 flex flex-col items-center gap-1 text-[13px] font-medium text-[#16a34a]">
              <span className="inline-flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" />
                Opening WhatsApp…
              </span>
              {/* fallback in case the device doesn't switch to WhatsApp by itself */}
              <a href={whatsappUrl} data-direct-whatsapp className="text-xs font-semibold text-[#0872BB] underline underline-offset-2">
                Tap here if WhatsApp didn&apos;t open
              </a>
            </p>
          )}
        </div>

        {/* actions */}
        {view === "error" && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={retry}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#082F59] text-sm font-semibold text-white transition-colors hover:bg-[#0872BB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0872BB]"
            >
              <RotateCcw size={16} />
              Try again
            </button>
            <a
              href={`tel:${SITE_CONTACT.phone}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-semibold text-[#082F59] transition-colors hover:bg-slate-50"
            >
              <Phone size={16} />
              Call {SITE_CONTACT.phone}
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
  return <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-[#061E3B]/20 to-transparent" />;
}

function AdvisorScene() {
  return (
    <Center>
      <div className="relative">
        <motion.span
          className="absolute inset-0 rounded-full bg-[#4B9DE0]/25"
          animate={{ scale: [1, 1.25], opacity: [0.6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
        />
        <div className="relative h-28 w-28 overflow-hidden rounded-full bg-linear-to-b from-white to-[#DCEBFA] ring-4 ring-white shadow-[0_12px_30px_-10px_rgba(8,47,89,0.35)] sm:h-32 sm:w-32">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/advisor/advisor.webp" alt="Ritz Auto Care service advisor" className="h-full w-full object-cover object-top" />
        </div>
      </div>
      <div className="mt-4 flex gap-1.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-[#0872BB]"
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12 }}
          />
        ))}
      </div>
    </Center>
  );
}

const SERVICE_CHIPS = ["Free Towing", "Free Pickup", "Free Service & Wash", "Free Return"];

/** Stage 3: the four free services pop in over the towing footage. */
function ServiceChipsOverlay() {
  return (
    <>
      <VideoShade />
      <div className="absolute inset-x-3 top-3 flex flex-wrap justify-center gap-1.5">
        {SERVICE_CHIPS.map((c, i) => (
          <motion.span
            key={c}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.25 }}
            className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-[#0872BB] shadow-sm sm:text-[11px]"
          >
            {c}
          </motion.span>
        ))}
      </div>
    </>
  );
}

/** Stage 4: sparkles once the foam wash is done. */
function CleanOverlay() {
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
        className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#16a34a] px-3 py-1 text-[11px] font-semibold text-white shadow"
      >
        <Check size={13} strokeWidth={3} />
        Washed &amp; serviced
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
  return (
    <ol className={`mt-6 grid grid-cols-4 gap-1 border-t border-slate-100 pt-5 ${muted ? "opacity-50" : ""}`} aria-label="Service steps">
      {STEPS.map((s, i) => {
        const Icon = s.icon;
        const isDone = i < done;
        const isActive = i === done && !muted;
        return (
          <li key={s.title} className="relative flex flex-col items-center text-center">
            {/* connector to the next step */}
            {i < STEPS.length - 1 && (
              <span className="absolute left-[calc(50%+22px)] right-[calc(-50%+22px)] top-[19px] h-[2px] rounded-full bg-slate-200 sm:top-[21px]" aria-hidden>
                <motion.span
                  className="block h-full rounded-full bg-[#0872BB]"
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
                    ? "border-[#0872BB] bg-[#EAF4FC] text-[#0872BB]"
                    : "border-slate-200 bg-white text-slate-400"
              }`}
            >
              {isActive && (
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-[#0872BB]"
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
            <span className={`mt-2 text-[10.5px] font-semibold leading-tight sm:text-xs ${isDone ? "text-[#16a34a]" : "text-[#082F59]"}`}>
              {s.title}
            </span>
            <span className="mt-0.5 hidden text-[11px] leading-tight text-slate-500 sm:block">{s.text}</span>
            <span className="sr-only">{isDone ? " — completed" : ""}</span>
          </li>
        );
      })}
    </ol>
  );
}
