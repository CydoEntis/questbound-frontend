import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/parties/$id")({
	component: PartyPage,
  loader
});

function PartyPage() {
	const { id } = Route.useParams();

	return <div>Hello "/party/" {id}</div>;
}
