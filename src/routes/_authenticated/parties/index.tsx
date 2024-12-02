import { createFileRoute } from "@tanstack/react-router";
import { QueryParams } from "../../../shared/types/types";
import partiesService from "../../../features/party/api/services/parties.service";
import PartiesPage from "../../../pages/parties/PartiesPage";

export const Route = createFileRoute("/_authenticated/parties/")({
	component: PartiesPage,
	validateSearch: (search: Record<string, unknown>): QueryParams => {
		return {
			searchTerm: search.query as string | undefined,
			sortDirection: search.sortDirection as string | undefined,
			sortField: search.sortField as string | undefined,
			dateFilterField: search.dateFilterField as string | undefined,
			pageNumber: search.pageNumber as number | undefined,
			startDate: search.startDate as string | undefined,
			endDate: search.endDate as string | undefined,
		};
	},
	loader: async () => {
		return await partiesService.getAllParties();
	},
});


