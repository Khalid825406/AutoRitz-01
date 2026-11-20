"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { useLang } from "./LangProvider";

/** useRouter() whose push/replace keep the visitor in their language. */
export function useLocalizedRouter() {
  const router = useRouter();
  const { href } = useLang();
  return useMemo(
    () => ({
      ...router,
      push: (path: string, opts?: Parameters<typeof router.push>[1]) => router.push(href(path), opts),
      replace: (path: string, opts?: Parameters<typeof router.replace>[1]) => router.replace(href(path), opts),
    }),
    [router, href],
  );
}
