import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/(user)/$username/collections/$slug/edit",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello /(user)/$username/collections/$slug/edit!</div>;
}
