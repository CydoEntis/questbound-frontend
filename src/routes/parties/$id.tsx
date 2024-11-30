import { createFileRoute } from "@tanstack/react-router";
import { useGetPartyDetails } from "../../features/party/api/parties";

export const Route = createFileRoute("/parties/$id")({
	component: PartyPage,
	// loader: async ({ params }) => await useGetPartyDetails(Number(params.id)),
});

function PartyPage() {
	const { id } = Route.useParams();
  // const party = Route.useLoaderData();
	return <div>Hello "/party/" {id}</div>;
}
