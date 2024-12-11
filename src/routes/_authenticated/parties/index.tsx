import { createFileRoute } from "@tanstack/react-router";
import { QueryParams } from "../../../shared/types/types";
import PartiesPage from "../../../pages/parties/PartiesPage";
import partiesService from "../../../features/party/api/services/party.service";

export const Route = createFileRoute("/_authenticated/parties/")({
  component: PartiesPage,
  validateSearch: (params: Record<string, string | number>): QueryParams => {
    return {
      search: params.search as string | undefined,
      orderBy: params.orderBy as string | undefined,
      sortBy: params.sortBy as string | undefined,
      dateFilter: params.dateFilter as string | undefined,
      pageNumber: params.pageNumber as number,
      startDate: params.startDate as string | undefined,
      endDate: params.endDate as string | undefined,
    };
  },

  loader: async () => {
    return await partiesService.getAllParties();
  },
});
