import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { getLocale } from "next-intl/server";

const intlMiddleware = createMiddleware(routing);

const protectedPaths = ["/profile"];

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const locale = await getLocale();

  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(`/${locale}${path}`),
  );

  if (!isProtected) {
    return intlMiddleware(req);
  }

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!accessToken) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            cookie: `refreshToken=${refreshToken}`,
          },
        },
      );

      if (!refreshRes.ok) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      const data = await refreshRes.json();
      const newAccessToken = data.accessToken;

      if (!newAccessToken) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      const res = intlMiddleware(req);

      res.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 15,
        path: "/",
      });

      return res;
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return intlMiddleware(req);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
