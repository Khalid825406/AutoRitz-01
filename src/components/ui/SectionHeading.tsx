import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

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
      <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0872BB] shadow-xs">
        {Icon && <Icon size={14} />}
        {eyebrow}
      </span>
      <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight text-[#082F59] sm:text-4xl lg:text-5xl">
        {title}
        {highlight && <span className="block text-[#0872BB]">{highlight}</span>}
      </h2>
      {description && (
        <p className={`mt-5 text-[15px] leading-relaxed text-slate-600 sm:text-base ${center ? "mx-auto max-w-xl" : "max-w-xl"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
