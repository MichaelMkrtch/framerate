import { createFileRoute } from "@tanstack/react-router";

import Header from "@web/components/Header";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header title="Profile" />
      <main className="animate-fade-in pb-14">
        <div>Profile</div>
      </main>
    </>
  );
}
