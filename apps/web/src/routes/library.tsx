import { createFileRoute } from "@tanstack/react-router";

import Header from "@web/components/Header";

export const Route = createFileRoute("/library")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header title="Library" />
      <main className="animate-fade-in pb-14">
        <div>Library</div>
      </main>
    </>
  );
}
