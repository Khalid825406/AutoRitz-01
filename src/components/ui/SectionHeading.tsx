import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import TextReveal from "@/components/motion/TextReveal";
interface SectionHeadingProps {
  eyebrow: string;
  icon?: LucideIcon;
  title: ReactNode;
  /** Second line, shown in brand blue. */
  highlight?: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

/** Shared section header: pill eyebrow + two-tone heading + description. */
export default function SectionHeading({
  eyebrow,
  icon: Icon,
  title,
  highlight,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0563B4] shadow-xs">
        {Icon && <Icon size={14} />}
        {eyebrow}
      </span>
      <TextReveal className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-[#0E1116] sm:text-4xl lg:text-5xl">
        {title}
        {highlight && <span className="block text-[#0563B4]">{highlight}</span>}
      </TextReveal>
      {description && (
        <p className={`mt-5 text-[14px] leading-relaxed text-slate-600 sm:text-[15px] ${center ? "mx-auto max-w-xl" : "max-w-xl"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
