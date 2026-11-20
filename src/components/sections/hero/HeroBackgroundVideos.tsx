"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

/**
 * Served from Cloudinary (CDN, auto quality, 960px wide — each clip only fills half the screen — H.264 MP4) — much lighter than the original files.
 * Poster = first frame, shown until the video starts.
 */
const CLOUDINARY = "https://res.cloudinary.com/dc1l3bsrr/video/upload";
const cld = (id: string) => ({
  // eco quality at 720 px: each clip fills half the screen behind a blue tint, so this looks the same
  // while being ~45% lighter (3.1 MB → 1.7 MB for both)
  src: `${CLOUDINARY}/q_auto:eco,w_720/${id}.mp4`,
  poster: `${CLOUDINARY}/so_0,q_auto:eco,w_720/${id}.jpg`,
});

const VIDEOS = [
  { ...cld("left-side_ynv11p"), side: "left" as const },
  { ...cld("right-side_m8sjtq"), side: "right" as const },
];

/**
 * One overlay does the tint, the soft fade into the centre and the solid blue band.
 * Plain alpha blending only — no mask-image / mix-blend-mode, which force the GPU to
 * re-composite every video frame and made playback stutter on weaker laptops.
 */
const CENTER_FADE =
  "linear-gradient(to right, rgba(14, 17, 22,0.35) 0%, rgba(14, 17, 22,0.42) 16%, rgba(16, 20, 26,0.72) 30%, rgba(18, 22, 29,0.95) 40%, #12161D 46%, #12161D 54%, rgba(18, 22, 29,0.95) 60%, rgba(16, 20, 26,0.72) 70%, rgba(14, 17, 22,0.42) 84%, rgba(14, 17, 22,0.35) 100%)";

/** Autoplaying, muted, looping clip with no controls — purely decorative. Pauses while off-screen. */
function BackgroundVideo({ src, poster, side }: { src: string; poster: string; side: "left" | "right" }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    let started = false;
    let visible = true;
    const play = () => started && v.play().catch(() => {});

    // Load the clip only after the page itself has loaded (and the browser is idle): the poster shows
    // meanwhile, so text, header and the 3D car are not competing with ~1.7 MB of video.
    let idle = 0;
    const start = () => {
      const begin = () => {
        started = true;
        v.src = src;
        if (visible) play();
      };
      idle = typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(begin, { timeout: 2500 }) : window.setTimeout(begin, 600);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    // Stop decoding only when the hero is well off screen, and resume ~600px BEFORE it comes back, so
    // scrolling back to the top shows the clips already playing (no frozen frame / "reloading" look).
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) play();
        else v.pause();
      },
      { threshold: 0, rootMargin: "600px 0px 600px 0px" },
    );
    io.observe(v);
    return () => {
      io.disconnect();
      window.removeEventListener("load", start);
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
      window.clearTimeout(idle);
    };
  }, [src]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`absolute inset-y-0 w-[60%] sm:w-1/2 ${side === "left" ? "left-0" : "right-0"}`}
    >
      <video
        ref={ref}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        controls={false}
        tabIndex={-1}
        aria-hidden="true"
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}

/** Two background clips (left + right) behind the hero text and car, blended into the brand blue. */
export default function HeroBackgroundVideos() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
      {VIDEOS.map((v) => (
        <BackgroundVideo key={v.side} {...v} />
      ))}
      <div className="absolute inset-0" style={{ background: CENTER_FADE }} />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[#07090C]/70 to-transparent" />
    </div>
  );
}
