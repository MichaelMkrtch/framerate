import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/films/$id/$title")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/films/$filmId/$title"!</div>;
}
