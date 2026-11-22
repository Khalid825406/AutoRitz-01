"use client";

/**
 * English ⇄ Arabic through the Google Translate website widget.
 *
 * - Google's script (translate.google.com/translate_a/element.js) is loaded only when a visitor picks
 *   Arabic, or arrives with Arabic already chosen — English visitors never download it.
 * - The choice lives in Google's own `googtrans` cookie ("/en/ar"), so it carries over to every page.
 * - Arabic switches the page to right-to-left; Google's top bar and hover highlights are hidden in CSS
 *   (see "Google Translate" in globals.css).
 */

export type SiteLang = "en" | "ar";

const SCRIPT_ID = "google-translate-script";
const CONTAINER_ID = "google_translate_element";
const LANG_EVENT = "site-lang-change";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages: string; autoDisplay: boolean },
          elementId: string,
        ) => unknown;
      };
    };
  }
}

/* ------------------------------------------------------------------ */
/* Current language (from the googtrans cookie)                        */
/* ------------------------------------------------------------------ */

export function getSiteLang(): SiteLang {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  return m && decodeURIComponent(m[1]).endsWith("/ar") ? "ar" : "en";
}

export function subscribeSiteLang(onChange: () => void) {
  window.addEventListener(LANG_EVENT, onChange);
  return () => window.removeEventListener(LANG_EVENT, onChange);
}

/** Cookie on this host and on the parent domain (Google sets/reads both). */
function writeCookie(value: string | null) {
  const host = window.location.hostname;
  const domains = ["", host, `.${host.replace(/^www\./, "")}`];
  for (const d of domains) {
    const domain = d ? `; domain=${d}` : "";
    document.cookie =
      value === null
        ? `googtrans=; path=/${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
        : `googtrans=${value}; path=/${domain}; max-age=31536000`;
  }
}

/** <html lang/dir> follow the chosen language so Arabic reads right-to-left. */
export function applyDirection(lang: SiteLang) {
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";
}

/* ------------------------------------------------------------------ */
/* Loading Google's widget                                             */
/* ------------------------------------------------------------------ */

let loading: Promise<HTMLSelectElement> | null = null;

/** Loads Google's script once and resolves with its (hidden) language <select>. */
function loadWidget(): Promise<HTMLSelectElement> {
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    let box = document.getElementById(CONTAINER_ID);
    if (!box) {
      box = document.createElement("div");
      box.id = CONTAINER_ID;
      box.setAttribute("aria-hidden", "true");
      box.className = "google-translate-host";
      document.body.appendChild(box);
    }

    const waitForSelect = () => {
      const started = Date.now();
      const tick = () => {
        const select = document.querySelector<HTMLSelectElement>(`#${CONTAINER_ID} select.goog-te-combo`);
        if (select && select.options.length > 1) resolve(select);
        else if (Date.now() - started > 15000) reject(new Error("Google Translate did not load"));
        else window.setTimeout(tick, 100);
      };
      tick();
    };

    window.googleTranslateElementInit = () => {
      new window.google!.translate!.TranslateElement(
        { pageLanguage: "en", includedLanguages: "en,ar", autoDisplay: false },
        CONTAINER_ID,
      );
      waitForSelect();
    };

    if (!document.getElementById(SCRIPT_ID)) {
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      s.async = true;
      s.onerror = () => {
        loading = null;
        reject(new Error("Google Translate could not be reached"));
      };
      document.head.appendChild(s);
    }
  });
  return loading;
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

/** Switch the whole site to English or Arabic. */
export async function setSiteLang(lang: SiteLang) {
  if (lang === getSiteLang()) return;

  if (lang === "en") {
    // Google's "show original" is unreliable from code — clear the choice and reload the clean English page.
    writeCookie(null);
    window.location.reload();
    return;
  }

  writeCookie("/en/ar");
  applyDirection("ar");
  window.dispatchEvent(new Event(LANG_EVENT));
  try {
    const select = await loadWidget();
    select.value = "ar";
    select.dispatchEvent(new Event("change"));
  } catch {
    // Google unreachable (offline, blocked): undo so the site doesn't sit right-to-left in English.
    writeCookie(null);
    applyDirection("en");
    window.dispatchEvent(new Event(LANG_EVENT));
  }
}

/** On page load: if Arabic was chosen earlier, translate this page too. */
export function restoreSiteLang() {
  if (getSiteLang() !== "ar") return;
  applyDirection("ar");
  loadWidget().catch(() => applyDirection("en"));
}

/**
 * Google Translate swaps page text for its own <font> tags, which can make React crash with
 * "Failed to execute 'removeChild' / 'insertBefore' on 'Node'" when it later updates that text.
 * This well-known guard (facebook/react#11538) makes those two DOM calls tolerate it.
 */
export function guardDomAgainstTranslation() {
  const w = window as unknown as { __gtGuard?: boolean };
  if (w.__gtGuard || typeof Node !== "function" || !Node.prototype) return;
  w.__gtGuard = true;

  const removeChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return removeChild.call(this, child) as T;
  };

  const insertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(this: Node, newNode: T, ref: Node | null): T {
    if (ref && ref.parentNode !== this) return newNode;
    return insertBefore.call(this, newNode, ref) as T;
  };
}
