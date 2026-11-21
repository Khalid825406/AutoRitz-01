"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

/**
 * Served from Cloudinary (CDN, auto quality, 960px wide — each clip only fills half the screen — H.264 MP4) — much lighter than the original files.
 * Poster = first frame, shown until the video starts.
 */
const CLOUDINARY = "https://res.cloudinary.com/dc1l3bsrr/video/upload";
const cld = (id: string) => ({
  // eco quality at 1280 px: the clip fills the whole hero behind a dark tint, so this looks sharp
  // while staying far lighter than the 1080p original
  src: `${CLOUDINARY}/q_auto:eco,w_1280/${id}.mp4`,
  poster: `${CLOUDINARY}/so_0,q_auto:eco,w_1280/${id}.jpg`,
});

// One full-width clip: mechanic repairing a luxury car.
// Earlier clips (to switch back): "left-side_ynv11p" + "right-side_m8sjtq" (left/right pair),
// "Detailer_polishing_luxury_car_paint_cf21faf6_1080p_gwr_video_mvp_jij5mo".
const VIDEO = cld("Mechanic_repairing_luxury_car_en__48186cb1_1080p_gwr_video_mvp_trbskf");

/**
 * One overlay tints the clip and darkens the middle a little more, so the white hero text stays
 * readable while the footage still shows across the whole width (no solid band hiding it).
 * Plain alpha blending only — no mask-image / mix-blend-mode, which force the GPU to
 * re-composite every video frame and made playback stutter on weaker laptops.
 */
const CENTER_FADE =
  "linear-gradient(to right, rgba(14, 17, 22,0.45) 0%, rgba(14, 17, 22,0.6) 30%, rgba(14, 17, 22,0.7) 50%, rgba(14, 17, 22,0.6) 70%, rgba(14, 17, 22,0.45) 100%)";

/** Autoplaying, muted, looping clip with no controls — purely decorative. Pauses while off-screen. */
function BackgroundVideo({ src, poster }: { src: string; poster: string }) {
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
      className="absolute inset-0"
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

/** One full-width background clip behind the hero text and car, under a dark tint. */
export default function HeroBackgroundVideos() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
      <BackgroundVideo {...VIDEO} />
      <div className="absolute inset-0" style={{ background: CENTER_FADE }} />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[#07090C]/70 to-transparent" />
    </div>
  );
}
