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
  const session = await verifySession(request);

  if (pathname === "/") {
    if (session) {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    return NextResponse.next();
  }

  if (pathname === "/home") {
    if (session) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/", "/home"],
// };

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
