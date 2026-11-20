/**
 * Ritz Auto Care logo: emblem (public/images/logo-emblem.webp) + "RITZ AUTO CARE LLC" wordmark in the
 * logo blue, with the "PREMIUM CAR PREMIUM CARE" tagline in brushed silver.
 */
export default function BrandLogo({
  size = "md",
  tone = "light",
  showTagline = false,
  stackOnPhone = false,
  className = "",
}: {
  /**
   * Header use: name on two lines ("RITZ AUTO / CARE LLC") where space is tight — phones (no tagline) and
   * 1024–1439 px, where the header also shows phone, email and search. One line on tablets and ≥1440 px.
   */
  stackOnPhone?: boolean;
  size?: "sm" | "md" | "lg";
  /** "light" = on white backgrounds; "dark" = on charcoal (footer, menus). */
  tone?: "light" | "dark";
  showTagline?: boolean;
  className?: string;
}) {
  const s = {
    sm: { emblem: "h-9", name: "text-[15px]", tag: "text-[7.5px]" },
    md: { emblem: "h-11 sm:h-12", name: "text-[17px] sm:text-[20px]", tag: "text-[7.5px] sm:text-[9px]" },
    lg: { emblem: "h-14", name: "text-[24px]", tag: "text-[10px]" },
  }[size];

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- small, pre-optimised webp */}
      <img src="/images/logo-emblem.webp" alt="" width={350} height={256} className={`${s.emblem} ${stackOnPhone ? "max-[359px]:h-8" : ""} w-auto shrink-0 select-none`} draggable={false} />
      <span className="flex flex-col leading-none">
        <span
          className={`brand-wordmark whitespace-nowrap ${s.name} ${stackOnPhone ? "max-[359px]:text-[14px]" : ""} ${tone === "dark" ? "text-white" : "text-[#0563B4]"}`}
        >
          {stackOnPhone ? (
            <>
              RITZ AUTO<span className="max-sm:hidden lg:max-[1439px]:hidden"> </span>
              <br className="sm:hidden lg:inline min-[1440px]:hidden" />
              CARE LLC
            </>
          ) : (
            "RITZ AUTO CARE LLC"
          )}
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
