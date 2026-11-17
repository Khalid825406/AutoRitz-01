"use client";

import { motion } from "motion/react";

const EASE = [0.215, 0.61, 0.355, 1] as const;

/**
 * Animated Audi with blinking headlights (public/mobileresponsive.gif, re-encoded as an animated WebP:
 * same 4 frames and timing, 120 KB instead of 320 KB). Served through <picture> so screens of 768px and
 * up — where this hero is hidden — get a 1×1 placeholder instead of downloading it.
 * The car fills the middle ~63% of the 887×443 canvas; the rest is transparent.
 */
const CAR_SRC = "/images/hero-audi-mobile.webp";
const BLANK =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/** Dubai-style skyline (Burj Khalifa + towers) with a few lit windows — drawn in SVG so it costs nothing to load. */
function Skyline() {
  return (
    <svg
      viewBox="0 0 400 320"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-x-0 bottom-[26%] h-[58%] w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="hm-tower" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b5a99" stopOpacity="0.55" />
          <stop offset="1" stopColor="#0a2a4f" stopOpacity="0.95" />
        </linearGradient>
        <pattern
          id="hm-windows"
          width="8"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <rect
            x="2"
            y="3"
            width="2"
            height="3"
            fill="#7cc0f5"
            opacity="0.28"
          />
        </pattern>
      </defs>

      {/* far layer */}
      <g fill="#0d3563" opacity="0.55">
        <rect x="0" y="200" width="34" height="120" />
        <rect x="40" y="170" width="26" height="150" />
        <rect x="120" y="185" width="30" height="135" />
        <rect x="300" y="175" width="28" height="145" />
        <rect x="360" y="195" width="40" height="125" />
      </g>

      {/* Burj Khalifa */}
      <path
        d="M256 320V178h5v-46h5V96h4V58h3l3-52 3 52h3v38h4v36h5v46h5v142z"
        fill="url(#hm-tower)"
      />
      <path
        d="M256 320V178h5v-46h5V96h4V58h3l3-52 3 52h3v38h4v36h5v46h5v142z"
        fill="url(#hm-windows)"
      />

      {/* near layer */}
      <g fill="url(#hm-tower)">
        <rect x="10" y="225" width="40" height="95" />
        <path d="M66 320V196c10-14 22-20 34-20v144z" />
        <rect x="106" y="214" width="26" height="106" />
        <rect x="150" y="160" width="22" height="160" />
        <rect x="178" y="200" width="34" height="120" />
        <rect x="220" y="230" width="26" height="90" />
        <rect x="312" y="206" width="30" height="114" />
        <rect x="346" y="168" width="20" height="152" />
        <rect x="372" y="222" width="28" height="98" />
      </g>
      <g fill="url(#hm-windows)">
        <rect x="10" y="225" width="40" height="95" />
        <rect x="150" y="160" width="22" height="160" />
        <rect x="178" y="200" width="34" height="120" />
        <rect x="312" y="206" width="30" height="114" />
        <rect x="346" y="168" width="20" height="152" />
      </g>
    </svg>
  );
}

/**
 * Phone hero (< 768px): brand title over a Dubai skyline with the blue Audi in front.
 * Replaces the desktop background videos + 3D car, which are not even loaded on phones.
 */
export default function HeroMobile() {
  return (
    <div className="relative flex min-h-[92svh] flex-col overflow-hidden bg-linear-to-b from-[#0B4274] via-[#082F59] to-[#041528] pb-12 pt-[clamp(9rem,36vw,10.5rem)] md:hidden">
      {/* glows */}
      <div className="pointer-events-none absolute left-1/2 top-[18%] h-[60vw] w-[120vw] -translate-x-1/2 rounded-full bg-radial from-[#1766AE]/45 to-transparent to-70%" />
      <div className="pointer-events-none absolute -bottom-[10%] left-1/2 h-[70vw] w-[140vw] -translate-x-1/2 rounded-full bg-radial from-[#2f8fe0]/35 to-transparent to-70%" />

      <Skyline />
      {/* fade the skyline into the road */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-[#041528] via-[#041528]/85 to-transparent" />

      {/* title + car, kept together and centred in the hero's height (top padding clears the fixed header) */}
      <div className="relative z-10 my-auto">
        {/* title */}
        <div className="px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="text-[clamp(3rem,16vw,5.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight text-white drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
          >
            Ritz Auto
            <span className="mt-2 block text-[clamp(1.35rem,7vw,2.4rem)] font-semibold tracking-[0.08em] text-[#7cc0f5]">
              Care LLC
            </span>
          </motion.h1>
        </div>

        {/* car */}
        <motion.div
          initial={{ opacity: 0, y: 70, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.4 }}
          // canvas is wider than the car (transparent sides), so it is 130% wide to keep the car the same size
          className="relative left-1/2 z-10 mt-7 w-[130%] max-w-[700px] -translate-x-1/2"
        >
          {/* floor glow + shadow under the car (the car spans the middle ~63% of the canvas) */}
          <div className="pointer-events-none absolute inset-x-[24%] bottom-[2%] h-[12%] rounded-[50%] bg-black/55 blur-md" />
          <div className="pointer-events-none absolute inset-x-[21%] bottom-0 h-[9%] rounded-[50%] bg-[#2f8fe0]/30 blur-lg" />
          <picture>
            <source media="(min-width: 768px)" srcSet={BLANK} />
            {/* eslint-disable-next-line @next/next/no-img-element -- animated WebP must not be re-encoded by next/image */}
            <img
              src={CAR_SRC}
              alt="Blue Audi at Ritz Auto Care"
              width={887}
              height={443}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="relative h-auto w-full select-none"
              draggable={false}
            />
          </picture>
        </motion.div>
      </div>
    </div>
  );
}
