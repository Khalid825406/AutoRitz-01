"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Hero car clip. Plays once and stays on its last frame. Web encodes, no audio:
 * - desktop (≥ 1024 px): car-front.mp4 (1920 px, ~1.2 MB) — landscape, from public/videos/Luxury_car_front_view.mp4
 * - phones + tablets (< 1024 px, the stacked hero layout): car-mobile-portrait.mp4 (720×1280, ~0.4 MB) — portrait, from
 *   public/videos/Black_luxury_Mobile.mp4 (black car in the dark, headlights + smoke)
 * Each clip has a start poster (shown until it plays) and an end poster (shown instead of the video when the
 * visitor prefers reduced motion).
 */
const CLIPS = {
  desktop: {
    src: "/videos/car-front.mp4",
    posterStart: "/images/home/car-front-start.webp",
    posterEnd: "/images/home/car-front-end.webp",
  },
  phone: {
    src: "/videos/car-mobile-portrait.mp4",
    posterStart: "/images/home/car-mobile-start.webp",
    posterEnd: "/images/home/car-mobile-end.webp",
  },
} as const;

type Device = keyof typeof CLIPS;

/** "" while rendering on the server, so nothing downloads until the browser knows the screen size. */
const PHONE_QUERY = "(max-width: 1023px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(PHONE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const pickDevice = (): Device => (window.matchMedia(PHONE_QUERY).matches ? "phone" : "desktop");

export default function HeroRevealVideo({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const device = useSyncExternalStore<Device | "">(subscribe, pickDevice, () => "");
  const clip = device ? CLIPS[device] : null;

  useEffect(() => {
    const v = ref.current;
    if (!v || !clip) return;
    v.muted = true;
    v.play().catch(() => {}); // autoplay refused (e.g. data saver): the poster stays
  }, [clip]);

  return (
    <div aria-hidden className={`pointer-events-none select-none overflow-hidden ${className}`}>
      {!clip ? null : reduce ? (
        // eslint-disable-next-line @next/next/no-img-element -- full-bleed decorative still, pre-optimised webp
        <img src={clip.posterEnd} alt="" className="h-full w-full object-cover" />
      ) : (
        <video
          key={clip.src}
          ref={ref}
          src={clip.src}
          poster={clip.posterStart}
          muted
          playsInline
          autoPlay
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          controls={false}
          tabIndex={-1}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
