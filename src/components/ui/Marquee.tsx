"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, type AnimationPlaybackControls } from "motion/react";

interface MarqueeProps {
  children: ReactNode;
  /** "left": content moves to the left (enters from the right). "right": the opposite. */
  direction?: "left" | "right";
  /** Seconds for one full loop — higher is slower. */
  duration?: number;
  /** Space in px between items (also used between the two copies so the loop is seamless). */
  gap?: number;
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Infinite horizontal marquee driven by Framer Motion.
 * Children are rendered twice; moving the track by half its width loops seamlessly.
 */
export default function Marquee({
  children,
  direction = "left",
  duration = 40,
  gap = 24,
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const track = useRef<HTMLDivElement>(null);
  const controls = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    if (!track.current) return;
    const x = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];
    controls.current = animate(track.current, { x }, { duration, ease: "linear", repeat: Infinity });
    return () => controls.current?.stop();
  }, [direction, duration]);

  return (
    <div
      className={`flex overflow-hidden ${className}`}
      onMouseEnter={pauseOnHover ? () => controls.current?.pause() : undefined}
      onMouseLeave={pauseOnHover ? () => controls.current?.play() : undefined}
    >
      <div ref={track} className="flex w-max shrink-0">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
            style={{ gap, paddingRight: gap }}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
