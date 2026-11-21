"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CarFront, CornerDownLeft, FileText, Phone, Search, SearchX, Wrench, X } from "lucide-react";

import { SITE_CONTACT } from "@/config/site";
import { useLang } from "@/i18n/LangProvider";
import { useLocalizedRouter } from "@/i18n/useLocalizedRouter";
import { BRAND_COUNT } from "@/data/pages/brand-menu";
import { SERVICE_MENU } from "@/data/pages/service-menu";
import { POPULAR_BRANDS, POPULAR_SEARCHES, normalize, searchSite, type SearchItem } from "@/lib/search/site-search";

const SERVICE_COUNT = SERVICE_MENU.length;

type Variant = "header" | "overlay";

interface SiteSearchProps {
  /** "header": compact pill with a dropdown panel. "overlay": large field with results below it (mobile full screen). */
  variant?: Variant;
  autoFocus?: boolean;
  /** Called after the visitor picks a result (e.g. to close the mobile overlay). */
  onDone?: () => void;
  className?: string;
}

const GROUPS: { kind: SearchItem["kind"]; en: string; ar: string; icon: typeof Wrench }[] = [
  { kind: "brand", en: "Car brands", ar: "علامات السيارات", icon: CarFront },
  { kind: "service", en: "Services", ar: "الخدمات", icon: Wrench },
  { kind: "page", en: "Pages", ar: "الصفحات", icon: FileText },
];

/** Header search: live results for services, car brands (and their models) and pages, in English and Arabic. */
export default function SiteSearch({ variant = "header", autoFocus, onDone, className = "" }: SiteSearchProps) {
  const { t, lang } = useLang();
  const router = useLocalizedRouter();
  const listId = useId();
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(variant === "overlay");
  const [active, setActive] = useState(-1);

  const q = query.trim();
  const results = useMemo(() => searchSite(q, 12), [q]);
  // Results in display order (grouped), so arrow keys move the way the eye reads.
  const ordered = useMemo(
    () => GROUPS.flatMap((g) => results.filter((r) => r.kind === g.kind)),
    [results],
  );

  // The header panel closes when the visitor clicks elsewhere.
  useEffect(() => {
    if (variant !== "header" || !open) return;
    const onDown = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [variant, open]);

  useEffect(() => {
    if (autoFocus) input.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  const go = (href: string) => {
    setOpen(variant === "overlay");
    setQuery("");
    setActive(-1);
    input.current?.blur();
    onDone?.();
    router.push(href);
  };

  /** Enter with nothing highlighted: best result, or the services page filtered to the words typed. */
  const submit = () => {
    if (!q) return;
    const pick = ordered[active] ?? ordered[0];
    go(pick ? pick.href : `/service/?q=${encodeURIComponent(q)}#all-services`);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (!ordered.length) return;
      e.preventDefault();
      setOpen(true);
      const step = e.key === "ArrowDown" ? 1 : -1;
      // cycles through the results and back to "nothing highlighted" (-1)
      setActive((i) => {
        const next = i + step;
        if (next >= ordered.length) return -1;
        if (next < -1) return ordered.length - 1;
        return next;
      });
    } else if (e.key === "Escape") {
      e.stopPropagation();
      if (q) setQuery("");
      else if (variant === "header") {
        setOpen(false);
        input.current?.blur();
      } else onDone?.();
    }
  };

  const showPanel = open;
  const activeId = active >= 0 && ordered[active] ? `${listId}-${active}` : undefined;
  const isHeader = variant === "header";

  const panel = (
    <Panel
      variant={variant}
      query={q}
      ordered={ordered}
      active={active}
      listId={listId}
      onHover={setActive}
      onPick={go}
      onSubmit={submit}
    />
  );

  return (
    <div ref={box} className={`relative ${className}`}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className={
          isHeader
            ? "flex h-10 w-full items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 transition-colors focus-within:border-[#0563B4] focus-within:bg-white"
            : "flex h-13 w-full items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition-colors focus-within:border-[#0563B4] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#0563B4]/10"
        }
      >
        <Search size={isHeader ? 17 : 20} className="shrink-0 text-[#0563B4]" aria-hidden />
        <input
          ref={input}
          type="search"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeId}
          aria-label={t("Search cars, brands and services", "ابحث عن السيارات والعلامات والخدمات")}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(-1);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={
            isHeader
              ? t("Search cars & services", "ابحث عن سيارة أو خدمة")
              : t("Search a car brand, model or service…", "ابحث عن علامة أو موديل أو خدمة…")
          }
          autoComplete="off"
          enterKeyHint="search"
          className={`w-full min-w-0 bg-transparent text-[#0E1116] outline-hidden placeholder:text-slate-400 [&::-webkit-search-cancel-button]:hidden ${
            isHeader ? "text-[13px]" : "text-[16px]" /* 16px stops iOS zooming in */
          }`}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              input.current?.focus();
            }}
            aria-label={t("Clear search", "مسح البحث")}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200/70 text-slate-600 transition-colors hover:bg-slate-300"
          >
            <X size={13} />
          </button>
        )}
      </form>

      {isHeader ? (
        <AnimatePresence>
          {showPanel && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.16 }}
              className="absolute end-0 top-[calc(100%+10px)] z-50 w-[min(440px,calc(100vw-2rem))] origin-top overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_60px_-20px_rgba(14,17,22,0.35)]"
            >
              <div className="max-h-[min(70vh,520px)] overflow-y-auto overscroll-contain p-2">{panel}</div>
              <p className="hidden items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/80 px-4 py-2 text-[11px] text-slate-500 sm:flex">
                <span>{t("↑ ↓ to move · Enter to open · Esc to close", "↑ ↓ للتنقل · Enter للفتح · Esc للإغلاق")}</span>
                <CornerDownLeft size={13} />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <div className="mt-3">{panel}</div>
      )}
      <span className="sr-only" aria-live="polite">
        {q ? (lang === "ar" ? `${ordered.length} نتيجة` : `${ordered.length} results`) : ""}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Results panel                                                       */
/* ------------------------------------------------------------------ */

function Panel({
  variant,
  query,
  ordered,
  active,
  listId,
  onHover,
  onPick,
  onSubmit,
}: {
  variant: Variant;
  query: string;
  ordered: SearchItem[];
  active: number;
  listId: string;
  onHover: (i: number) => void;
  onPick: (href: string) => void;
  onSubmit: () => void;
}) {
  const { t } = useLang();

  // Nothing typed yet: popular brands + services.
  if (!query)
    return (
      <div id={listId} role="listbox" aria-label={t("Popular searches", "عمليات البحث الشائعة")} className="p-2">
        <GroupTitle>{t("Popular car brands", "علامات شائعة")}</GroupTitle>
        <div className={`mt-2 grid grid-cols-3 gap-2 ${variant === "overlay" ? "sm:grid-cols-6" : ""}`}>
          {POPULAR_BRANDS.map((b) => (
            <button
              key={b.href}
              type="button"
              onClick={() => onPick(b.href)}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-2 py-2.5 text-[12px] font-semibold text-[#0E1116] transition-colors hover:border-[#0563B4]/40 hover:bg-[#F2F8FD]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- small brand logo */}
              {b.logo && <img src={b.logo} alt="" width={36} height={36} decoding="async" className="h-8 w-8 object-contain" />}
              <span className="truncate">{b.title}</span>
            </button>
          ))}
        </div>
        <GroupTitle className="mt-4">{t("Popular services", "خدمات شائعة")}</GroupTitle>
        <div className="mt-2 flex flex-wrap gap-2">
          {POPULAR_SEARCHES.map((s) => (
            <button
              key={s.href}
              type="button"
              onClick={() => onPick(s.href)}
              className="rounded-full bg-[#EAF4FC] px-3.5 py-2 text-[13px] font-semibold text-[#0563B4] transition-colors hover:bg-[#0563B4] hover:text-white"
            >
              {t(s.title, s.titleAr)}
            </button>
          ))}
        </div>
        {/* full lists, for visitors who'd rather browse than type */}
        <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={() => onPick("/service/")}
            className="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-start text-[13px] font-semibold text-[#0E1116] transition-colors hover:bg-[#F2F8FD] hover:text-[#0563B4]"
          >
            <span className="flex items-center gap-2">
              <Wrench size={15} className="text-[#0563B4]" />
              {t(`All ${SERVICE_COUNT} services`, `جميع الخدمات (${SERVICE_COUNT})`)}
            </span>
            <ArrowRight size={14} />
          </button>
          <button
            type="button"
            onClick={() => onPick("/brands/")}
            className="flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-start text-[13px] font-semibold text-[#0E1116] transition-colors hover:bg-[#F2F8FD] hover:text-[#0563B4]"
          >
            <span className="flex items-center gap-2">
              <CarFront size={15} className="text-[#0563B4]" />
              {t(`All ${BRAND_COUNT} brands`, `جميع العلامات (${BRAND_COUNT})`)}
            </span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    );

  if (ordered.length === 0)
    return (
      <div id={listId} role="listbox" className="flex flex-col items-center px-4 py-8 text-center">
        <SearchX size={30} className="text-[#0563B4]" />
        <p className="mt-3 text-[14px] font-semibold text-[#0E1116]">
          {t("No results for", "لا توجد نتائج لـ")} “{query}”
        </p>
        <p className="mt-1 max-w-xs text-[13px] text-slate-500">
          {t("We service every make and model — ask our team.", "نخدم جميع العلامات والموديلات — اسأل فريقنا.")}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <a
            href={`tel:${SITE_CONTACT.phone}`}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[#0563B4] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#0E1116]"
          >
            <Phone size={14} />
            <span dir="ltr">{SITE_CONTACT.phone}</span>
          </a>
          <button
            type="button"
            onClick={() => onPick("/service/")}
            className="inline-flex h-10 items-center rounded-full border border-slate-200 px-4 text-[13px] font-semibold text-[#0E1116] transition-colors hover:border-[#0563B4] hover:text-[#0563B4]"
          >
            {t("All services", "جميع الخدمات")}
          </button>
        </div>
      </div>
    );

  return (
    <div id={listId} role="listbox" aria-label={t("Search results", "نتائج البحث")}>
      {GROUPS.map((g) => {
        const items = ordered.filter((r) => r.kind === g.kind);
        if (!items.length) return null;
        return (
          <div key={g.kind} className="py-1">
            <GroupTitle className="px-3 pt-2">{t(g.en, g.ar)}</GroupTitle>
            <ul className="mt-1">
              {items.map((item) => {
                const i = ordered.indexOf(item);
                return (
                  <li key={item.href + item.title}>
                    <ResultRow
                      id={`${listId}-${i}`}
                      item={item}
                      query={query}
                      active={i === active}
                      icon={g.icon}
                      onHover={() => onHover(i)}
                      onPick={() => onPick(item.href)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
      <button
        type="button"
        onClick={onSubmit}
        className="mt-1 flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-start text-[13px] font-semibold text-[#0563B4] transition-colors hover:bg-[#F2F8FD]"
      >
        <span>
          {t("Open best match for", "افتح أفضل نتيجة لـ")} “{query}”
        </span>
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

function ResultRow({
  id,
  item,
  query,
  active,
  icon: Icon,
  onHover,
  onPick,
}: {
  id: string;
  item: SearchItem;
  query: string;
  active: boolean;
  icon: typeof Wrench;
  onHover: () => void;
  onPick: () => void;
}) {
  const { t } = useLang();
  const title = t(item.title, item.titleAr);
  return (
    <button
      id={id}
      type="button"
      role="option"
      aria-selected={active}
      onMouseEnter={onHover}
      onClick={onPick}
      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-colors ${
        active ? "bg-[#EAF4FC]" : "hover:bg-slate-50"
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg ${
          item.logo ? "bg-white ring-1 ring-slate-200" : active ? "bg-[#0563B4] text-white" : "bg-[#EAF4FC] text-[#0563B4]"
        }`}
      >
        {item.logo ? (
          // eslint-disable-next-line @next/next/no-img-element -- small brand logo
          <img src={item.logo} alt="" width={32} height={32} decoding="async" className="h-7 w-7 object-contain" />
        ) : (
          <Icon size={18} />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold text-[#0E1116]">
          <Highlight text={title} query={query} />
        </span>
        <span className="block truncate text-[12px] text-slate-500">{t(item.sub, item.subAr)}</span>
      </span>
      <ArrowRight
        size={15}
        className={`shrink-0 transition-all ${active ? "translate-x-0 text-[#0563B4] opacity-100" : "-translate-x-1 opacity-0 group-hover:opacity-60"}`}
      />
    </button>
  );
}

/** Bold-blue the part of `text` that matches what was typed. */
function Highlight({ text, query }: { text: string; query: string }) {
  const q = normalize(query);
  const i = q ? text.toLowerCase().indexOf(q) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-transparent text-[#0563B4]">{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

function GroupTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 rtl:tracking-normal ${className}`}>{children}</p>;
}
