import { createFileRoute } from "@tanstack/react-router";
import partiesService from "../../features/party/api/services/parties.service";

export const Route = createFileRoute("/parties/")({
	component: PartiesPage,
	loader: async () => {
		return await partiesService.getAllParties();
	},
});

function PartiesPage() {
	return <div>Hello "/parties/"!</div>;
}
