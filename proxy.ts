import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import {
  publicRoutes,
  prefixRoutes,
  DEFAULT_REDIRECT_ROUTES,
  authRoutes
} from "@/route";

const protectedRoutes = ["/profile", "/admin"];

export  function proxy(req: NextRequest) {
  const { nextUrl } = req;
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-pathname', req.nextUrl.pathname);
  console.log('PROXY.ts em execução. Pathname:', nextUrl.pathname);
  const sessionCookie = getSessionCookie(req);

  const res = NextResponse.next();

  const isLoggedIn = !!sessionCookie;
  const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isOnAuthRoute = authRoutes.includes(nextUrl.pathname)



  if (isOnProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isOnAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(`${DEFAULT_REDIRECT_ROUTES}`, req.url));
  }

  return res;
}

export const config = {
    matcher: [ "/register/email","/((?!.+\\.[\\w]+$|_next).*)","/(api|trpc)(.*)"], // apenas essas rotas exigem login
};