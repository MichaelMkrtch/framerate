import { createFileRoute } from "@tanstack/react-router";

import Header from "@web/components/Header";

export const Route = createFileRoute("/explore")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header title="Explore" />
      <main className="animate-fade-in pb-14">
        <div>Explore</div>
      </main>
    </>
  );
}
