"use client";

import { useEffect, useRef } from "react";
import { animate, useReducedMotion } from "motion/react";

import { useRevealed } from "./useRevealed";

/**
 * Counts the number inside `value` up from 0 when it scrolls into view ("80+" → 0…80+, "4.5" → 0.0…4.5).
 * Text without a number ("Free") is shown unchanged. The real value is in the HTML from the start, so it
 * is correct for search engines and without JavaScript.
 */
export default function CountUp({
  value,
  duration = 1.4,
  className = "",
}: {
  value: string | number;
  duration?: number;
  className?: string;
}) {
  const text = String(value);
  const ref = useRef<HTMLSpanElement>(null);
  const revealed = useRevealed(ref, 0.95);
  const reduce = useReducedMotion();
  const done = useRef(false);
  const controls = useRef<ReturnType<typeof animate> | null>(null);

  // Runs once, when the number first comes into view. Re-renders don't interrupt it (only unmounting does),
  // and if the run is ever cut short the real value is put back.
  useEffect(() => {
    const el = ref.current;
    const match = text.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
    if (!el || !match || !revealed || reduce || done.current) return;
    done.current = true;
    const [, prefix, num, suffix] = match;
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    controls.current = animate(0, parseFloat(num), {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        el.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      },
      onComplete: () => {
        el.textContent = text;
      },
    });
  }, [revealed, reduce, text, duration]);

  useEffect(
    () => () => {
      controls.current?.stop();
    },
    [],
  );

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {text}
    </span>
  );
}
