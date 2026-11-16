"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * True once the element's top has come within `threshold` of the viewport bottom — and stays true.
 *
 * Unlike a plain IntersectionObserver ("whileInView"), this also counts elements that were scrolled
 * past quickly or skipped over (e.g. jumping to /#services), so reveal content can never stay hidden.
 */
export function useRevealed(ref: RefObject<Element | null>, threshold = 0.9) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const check = () => {
      raf = 0;
      if (el.getBoundingClientRect().top <= window.innerHeight * threshold) setRevealed(true);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };

    const io = new IntersectionObserver(schedule, { threshold: [0, 0.1] });
    io.observe(el);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, revealed, threshold]);

  return revealed;
}
