"use client";

import { useId, useRef } from "react";
import { motion } from "motion/react";

import projection from "@/data/world-map-projection.json";

import { useRevealed } from "@/components/motion/useRevealed";

/*
 * Aceternity UI "World Map" — dotted world map with animated arcs between points.
 *
 * Changes from the original:
 *  - The dotted map is pre-built by `node scripts/generate-world-map.mjs` (public/images/world-map-dots.svg)
 *    instead of running dotted-map (~1 s, ~600 KB) in the browser on every render.
 *  - Points use dotted-map's own Mercator projection (src/data/world-map-projection.json), so the
 *    dots and arcs line up with the countries.
 *  - Colours are props (no next-themes); arcs draw when the map scrolls into view (useRevealed on the wrapper).
 */

interface MapPoint {
  lat: number;
  lng: number;
  label?: string;
}

interface MapProps {
  dots?: Array<{ start: MapPoint; end: MapPoint }>;
  lineColor?: string;
  /** Colour/opacity of the map dots, e.g. "rgba(255,255,255,0.25)". */
  dotColor?: string;
  className?: string;
}

const { width: W, height: H, x0, kx, y0, ky } = projection;

const projectPoint = (lat: number, lng: number) => ({
  x: x0 + kx * lng,
  y: y0 - ky * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)),
});

const createCurvedPath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 12; // arc height (original: 50 on an 800-wide map)
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
};

export default function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
  dotColor = "rgba(255,255,255,0.25)",
  className = "",
}: MapProps) {
  const gradientId = `path-gradient-${useId().replace(/:/g, "")}`;
  // Drive the arcs from the wrapper: IntersectionObserver does not fire reliably for SVG <path>s.
  const wrapRef = useRef<HTMLDivElement>(null);
  const revealed = useRevealed(wrapRef);

  return (
    <div ref={wrapRef} className={`relative w-full font-sans ${className}`} style={{ aspectRatio: `${W} / ${H}` }}>
      {/* dots, tinted with a CSS mask so one static SVG works on any background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none"
        style={{
          backgroundColor: dotColor,
          WebkitMaskImage: "url(/images/world-map-dots.svg), linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)",
          maskImage: "url(/images/world-map-dots.svg), linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskSize: "100% 100%, 100% 100%",
          maskSize: "100% 100%, 100% 100%",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      />

      <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full select-none" aria-hidden>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const start = projectPoint(dot.start.lat, dot.start.lng);
          const end = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <motion.path
              key={`path-${i}`}
              d={createCurvedPath(start, end)}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: revealed ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.5 * i, ease: "easeOut" }}
            />
          );
        })}

        {dots.map((dot, i) =>
          [dot.start, dot.end].map((p, j) => {
            const { x, y } = projectPoint(p.lat, p.lng);
            return (
              <g key={`point-${i}-${j}`}>
                <circle cx={x} cy={y} r="0.55" fill={lineColor} />
                <circle cx={x} cy={y} r="0.55" fill={lineColor} opacity="0.5">
                  <animate attributeName="r" from="0.55" to="2.2" dur="1.5s" begin="0s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
                </circle>
              </g>
            );
          }),
        )}
      </svg>
    </div>
  );
}
