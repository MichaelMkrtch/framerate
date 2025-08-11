import { createFileRoute } from '@tanstack/react-router';

import Header from '@/components/header';

export const Route = createFileRoute('/explore')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header title="Explore" />
      <main className="animate-fade-in pb-14">
        <div className="text-center text-xl font-medium">
          This page is coming soon!
        </div>
      </main>
    </>
  );
}
