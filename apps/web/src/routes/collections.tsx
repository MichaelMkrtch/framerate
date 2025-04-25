import { createFileRoute } from "@tanstack/react-router";

import Header from "@web/components/Header";

export const Route = createFileRoute("/collections")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header title="Collections" />
      <main className="animate-fade-in pb-14">
        <div>Collections</div>
      </main>
    </>
  );
}
