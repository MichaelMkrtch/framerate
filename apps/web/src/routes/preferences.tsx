import { createFileRoute } from "@tanstack/react-router";

import Header from "@web/components/Header";

export const Route = createFileRoute("/preferences")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header title="Preferences" />
      <main className="animate-fade-in pb-14">
        <div>Preferences</div>
      </main>
    </>
  );
}
