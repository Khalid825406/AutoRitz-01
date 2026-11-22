/**
 * Ritz Auto Care logo: emblem (public/images/logo-emblem.webp) + "RITZ AUTO / CARE LLC" wordmark on two
 * lines in the logo blue, with the optional "PREMIUM CAR PREMIUM CARE" tagline in silver.
 */
export default function BrandLogo({
  size = "md",
  tone = "light",
  showTagline = false,
  stackOnPhone = false,
  className = "",
}: {
  /** Header use: slightly smaller emblem + name on narrow phones (< 400 px), where the header is tight. */
  stackOnPhone?: boolean;
  size?: "sm" | "md" | "lg";
  /** "light" = on white backgrounds; "dark" = on charcoal (footer, menus). */
  tone?: "light" | "dark";
  showTagline?: boolean;
  className?: string;
}) {
  const s = {
    sm: { emblem: "h-11", name: "text-[18px]", tag: "text-[7.5px]" },
    md: { emblem: "h-12 sm:h-14", name: "text-[19px] sm:text-[24px]", tag: "text-[7.5px] sm:text-[9px]" },
    lg: { emblem: "h-16", name: "text-[28px]", tag: "text-[10px]" },
  }[size];

  return (
    <span className={`notranslate inline-flex items-center gap-2 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- small, pre-optimised webp */}
      <img src="/images/logo-emblem.webp" alt="" width={350} height={256} className={`${s.emblem} ${stackOnPhone ? "max-[399px]:h-9 max-[359px]:h-8" : ""} w-auto shrink-0 select-none`} draggable={false} />
      <span className="flex flex-col leading-none">
        <span
          className={`brand-wordmark whitespace-nowrap ${s.name} ${stackOnPhone ? "max-[399px]:text-[15px] max-[359px]:text-[14px]" : ""} ${tone === "dark" ? "brand-wordmark-dark text-white" : "text-[#0563B4]"}`}
        >
          {/* always two lines, everywhere: "RITZ AUTO" over "CARE LLC" */}
          RITZ AUTO
          <br />
          CARE LLC
        </span>
        {showTagline && (
          <span className={`brand-tagline ${tone === "dark" ? "brand-tagline-dark" : ""} ${stackOnPhone ? "max-sm:hidden" : ""} mt-[0.35em] whitespace-nowrap font-black tracking-[0.06em] ${s.tag}`}>
            PREMIUM CAR PREMIUM CARE
          </span>
        )}
      </span>
    </span>
  );
}
