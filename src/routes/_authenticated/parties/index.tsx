import { createFileRoute } from "@tanstack/react-router";
import { QueryParams } from "../../../shared/types/types";
import PartiesPage from "../../../pages/parties/PartiesPage";
import partiesService from "../../../features/party/api/services/party.service";

export const Route = createFileRoute("/_authenticated/parties/")({
  component: PartiesPage,
  validateSearch: (params: Record<string, string | number>): QueryParams => {
    return {
      searchTerm: params.searchTerm as string | undefined,
      orderDirection: params.orderDirection as string | undefined,
      sortField: params.sortField as string | undefined,
      dateFilterField: params.dateFilterField as string | undefined,
      pageNumber: params.pageNumber as number,
      startDate: params.startDate as string | undefined,
      endDate: params.endDate as string | undefined,
    };
  },

  loader: async () => {
    return await partiesService.getAllParties();
  },
});
