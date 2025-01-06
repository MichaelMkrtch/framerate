import type { auth } from "@/lib/auth";

import { NextRequest, NextResponse } from "next/server";

import { betterFetch } from "@better-fetch/fetch";

type Session = typeof auth.$Infer.Session;

async function verifySession(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        //get the cookie from the request
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  return session;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const session = await verifySession(request);
    if (session) {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    return NextResponse.next();
  }

  if (pathname === "/home") {
    const session = await verifySession(request);
    if (session) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
