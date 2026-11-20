import { NextResponse, type NextRequest } from "next/server";

/**
 * Arabic site: /ar/... serves the same pages as /... with the language set to Arabic.
 * The page reads the language from the `x-lang` request header (see src/app/layout.tsx).
 *
 * No `config.matcher` on purpose: with a matcher the Next 16 dev server answered every page that was not
 * compiled yet with an empty 200 response. Only /ar URLs are touched; everything else passes straight through.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname !== "/ar" && !pathname.startsWith("/ar/")) return;

  const url = request.nextUrl.clone();
  url.pathname = pathname.slice(3) || "/";
  const headers = new Headers(request.headers);
  headers.set("x-lang", "ar");
  return NextResponse.rewrite(url, { request: { headers } });
}
