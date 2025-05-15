import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(user)/$username/collections/$slug")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /(user)/$username/collections/$slug!</div>;
}
