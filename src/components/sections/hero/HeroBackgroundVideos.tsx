"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

/**
 * Served from Cloudinary (CDN, auto quality, 960px wide — each clip only fills half the screen — H.264 MP4) — much lighter than the original files.
 * Poster = first frame, shown until the video starts.
 */
const CLOUDINARY = "https://res.cloudinary.com/dc1l3bsrr/video/upload";
const cld = (id: string) => ({
  src: `${CLOUDINARY}/q_auto,w_960/${id}.mp4`,
  poster: `${CLOUDINARY}/so_0,q_auto,w_960/${id}.jpg`,
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
  "linear-gradient(to right, rgba(8,47,89,0.35) 0%, rgba(8,47,89,0.42) 16%, rgba(10,62,110,0.72) 30%, rgba(11,66,116,0.95) 40%, #0B4274 46%, #0B4274 54%, rgba(11,66,116,0.95) 60%, rgba(10,62,110,0.72) 70%, rgba(8,47,89,0.42) 84%, rgba(8,47,89,0.35) 100%)";

/** Autoplaying, muted, looping clip with no controls — purely decorative. Pauses while off-screen. */
function BackgroundVideo({ src, poster, side }: { src: string; poster: string; side: "left" | "right" }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    const play = () => v.play().catch(() => {});
    play();
    // stop decoding while the hero is scrolled away — frees the GPU for the rest of the page
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : v.pause()), { threshold: 0 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`absolute inset-y-0 w-[60%] sm:w-1/2 ${side === "left" ? "left-0" : "right-0"}`}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
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
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-[#061E3B]/70 to-transparent" />
    </div>
  );
}
