"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";

import { useLang } from "./LangProvider";

/** next/link that keeps visitors in their language (adds /ar to internal links on the Arabic site). */
export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const { href: localize } = useLang();
  const to = typeof href === "string" ? localize(href) : href;
  return <NextLink href={to} {...props} />;
}
