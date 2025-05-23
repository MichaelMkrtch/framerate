import type { QueryClient } from "@tanstack/react-query";

import * as React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { DefaultCatchBoundary } from "@web/components/DefaultCatchBoundary";
import Navbar from "@web/components/Navbar";
import { NotFound } from "@web/components/NotFound";
import appCss from "@web/styles/app.css?url";
import { seo } from "@web/utils/seo";

import manropeFontURL from "/src/assets/fonts/manrope-variable.woff2";
import { Toaster } from "sonner";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "apple-mobile-web-app-title",
        content: "FrameRate",
      },
      ...seo({
        title: "FrameRate",
        description: `FrameRate is the ultimate social platform for movie and TV enthusiasts. Share your reviews, create and discover lists, and effortlessly track everything you've watched!`,
      }),
    ],
    links: [
      {
        rel: "preload",
        href: manropeFontURL,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "stylesheet", href: appCss },
      // {
      //   rel: "apple-touch-icon",
      //   sizes: "180x180",
      //   href: "/apple-touch-icon.png",
      // },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body
        className={`${pathname === "/" ? "bg-marketing" : "bg-background"} font-manrope dark antialiased`}
      >
        <div className="mx-auto size-full max-w-md md:max-w-2xl lg:max-w-6xl xl:max-w-[1200px]">
          {children}
          <Navbar />
          <Toaster
            toastOptions={{
              classNames: {
                toast:
                  "bg-background border-white/10 text-foreground drop-shadow-md",
              },
            }}
          />
          <TanStackRouterDevtools position="bottom-right" />
          <ReactQueryDevtools buttonPosition="bottom-left" />
          <Scripts />
        </div>
      </body>
    </html>
  );
}
