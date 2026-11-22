"use client";

import { useEffect, useSyncExternalStore } from "react";

import { getSiteLang, guardDomAgainstTranslation, restoreSiteLang, subscribeSiteLang } from "@/lib/google-translate";

/** Mounted once in the root layout: keeps Arabic on across pages and protects React from Google's DOM edits. */
export default function GoogleTranslate() {
  useEffect(() => {
    guardDomAgainstTranslation();
    restoreSiteLang();
  }, []);
  return null;
}

/** Current site language for the EN | AR buttons ("en" while rendering on the server). */
export function useSiteLang() {
  return useSyncExternalStore(subscribeSiteLang, getSiteLang, () => "en" as const);
}
