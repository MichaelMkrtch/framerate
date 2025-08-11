import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useRouterState,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from 'sonner';

import { DefaultCatchBoundary } from '@/components/default-catch-boundary';
import Navbar from '@/components/navbar';
import appCss from '@/styles/app.css?url';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'FrameRate',
        description: `FrameRate is the ultimate social platform for movie and TV enthusiasts. Share your reviews, create and discover lists, and effortlessly track everything you've watched!`,
      },
    ],
    links: [
      {
        rel: 'preload',
        href: '/src/assets/fonts/manrope-variable.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body
        className={`${pathname === '/' ? 'bg-background-landing' : 'bg-background'} font-manrope dark antialiased`}
      >
        <div className="mx-auto size-full max-w-md md:max-w-2xl lg:max-w-6xl xl:max-w-[1200px]">
          {children}
          <Navbar />
          <Toaster
            toastOptions={{
              classNames: {
                toast:
                  'bg-background border-white/10 text-foreground drop-shadow-md',
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
