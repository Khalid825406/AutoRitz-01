"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Hero car clip: front view of a luxury car on a dark podium (light on → headlights → car). Plays once and
 * stays on its last frame. Files are web encodes of public/videos/Luxury_car_front_view.mp4 (no audio):
 *   car-front.mp4 (1920 px, ~1.2 MB) and car-front-mobile.mp4 (960 px, ~0.3 MB).
 * Posters: car-front-start.webp (first frame, matches the start) and car-front-end.webp (finished reveal,
 * shown instead of the video when the visitor prefers reduced motion).
 */
const SRC_DESKTOP = "/videos/car-front.mp4";
const SRC_MOBILE = "/videos/car-front-mobile.mp4";
const POSTER_START = "/images/home/car-front-start.webp";
const POSTER_END = "/images/home/car-front-end.webp";

/** Phones get the lighter file; "" while rendering on the server (no download until the browser decides). */
const PHONE_QUERY = "(max-width: 767px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(PHONE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const pickSrc = () => (window.matchMedia(PHONE_QUERY).matches ? SRC_MOBILE : SRC_DESKTOP);

export default function HeroRevealVideo({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const src = useSyncExternalStore(subscribe, pickSrc, () => "");

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    v.muted = true;
    v.play().catch(() => {}); // autoplay refused (e.g. data saver): the poster stays
  }, [src]);

  return (
    <div aria-hidden className={`pointer-events-none select-none overflow-hidden ${className}`}>
      {reduce ? (
        // eslint-disable-next-line @next/next/no-img-element -- full-bleed decorative still, pre-optimised webp
        <img src={POSTER_END} alt="" className="h-full w-full object-cover" />
      ) : (
        <video
          ref={ref}
          src={src || undefined}
          poster={POSTER_START}
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
