import { NextResponse, type NextRequest } from "next/server";

/**
 * Removes the trailing slash with a 308, as Next does by default (#34).
 *
 * `next.config.ts` sets `skipTrailingSlashRedirect` so that the old WordPress
 * URLs, which all ended in a slash, reach their new page with one 301 instead
 * of a 308 followed by a 301. Paths without a redirect still need their slash
 * removed, and that is all this proxy does.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/" || !pathname.endsWith("/")) return NextResponse.next();

  const url = new URL(`${pathname.replace(/\/+$/, "")}${search}`, request.url);

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next/|api/).*/)"],
};
