import { createFileRoute } from "@tanstack/react-router";
import { QueryParams } from "../../../shared/types/types";
import PartiesPage from "../../../pages/parties/PartiesPage";
import partiesService from "../../../features/parties-a/api/services/parties.service";

export const Route = createFileRoute("/_authenticated/parties/")({
  component: PartiesPage,
  validateSearch: (params: Record<string, unknown>): QueryParams => {
    return {
      searchTerm: params.query as string | undefined,
      sortDirection: params.sortDirection as string | undefined,
      sortField: params.sortField as string | undefined,
      dateFilterField: params.dateFilterField as string | undefined,
      pageNumber: params.pageNumber as number | undefined,
      startDate: params.startDate as string | undefined,
      endDate: params.endDate as string | undefined,
    };
  },
  loader: async () => {
    return await partiesService.getAllParties();
  },
});
