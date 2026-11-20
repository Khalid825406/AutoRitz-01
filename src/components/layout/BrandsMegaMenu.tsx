"use client";

import { useLang } from "@/i18n/LangProvider";
import Link from "@/i18n/Link";
import { ArrowRight, ChevronRight } from "lucide-react";

import { BRAND_COUNT, BRAND_MENU } from "@/data/pages/brand-menu";

/** Fixed columns of the menu (American sits right next to German). */
const COLUMNS = [
  ["German", "British"],
  ["American"],
  ["Italian", "French", "Swedish"],
  ["Japanese", "Korean"],
  ["Chinese"],
];
const MENU_COLUMNS = COLUMNS.map((col) =>
  col
    .map((n) => BRAND_MENU.find((g) => g.nationality === n))
    .filter((g) => !!g),
);

/** Desktop "Brands" dropdown: all brands we service, grouped by home country (German, Japanese, Chinese…). */
export default function BrandsMegaMenu({
  onNavigate,
  focusRing,
}: {
  onNavigate: () => void;
  focusRing: string;
}) {
  const { t } = useLang();
  return (
    <div className="overflow-hidden rounded-b-2xl bg-[#0563B4] shadow-[0_24px_50px_-12px_rgba(14, 17, 22,0.45)]">
      <div className="flex items-center justify-between gap-6 border-b border-white/15 px-8 py-4">
        <p className="text-[15px] font-semibold text-white">
          {t("Brands we service", "العلامات التي نخدمها")}
          <span className="ml-2 font-normal text-white/65">
            {t(`${BRAND_COUNT} brands from ${BRAND_MENU.length} countries`, `${BRAND_COUNT} علامة من ${BRAND_MENU.length} دول`)}
          </span>
        </p>
        <Link
          href="/brands/"
          onClick={onNavigate}
          className={`group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-[#0E1116] transition-colors hover:bg-[#DCEEFD] ${focusRing}`}
        >
          {t("View all brands", "عرض جميع العلامات")}
          <ArrowRight
            size={15}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <div className="columns-5 grid grid-cols-5 gap-8 px-8 pb-4 pt-6">
        {MENU_COLUMNS.map((column, ci) => (
          <div key={ci}>
            {column.map((group) => (
              <div key={group.label} className="mb-6">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#BFE0FB]">
                  {t(group.label, group.labelAr)}
                </p>
                <ul>
                  {group.brands.map((b) => (
                    <li key={b.name}>
                      <Link
                        href={b.href}
                        onClick={onNavigate}
                        className={`group flex items-center gap-2 rounded py-1 text-[14px] text-white transition-colors hover:text-[#BFE0FB] ${focusRing}`}
                      >
                        <ChevronRight
                          size={14}
                          strokeWidth={2.5}
                          aria-hidden
                          className="-ml-0.5 shrink-0 text-[#BFE0FB]/70 transition-[translate,color] duration-200 group-hover:translate-x-0.5 group-hover:text-white"
                        />
                        {b.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
