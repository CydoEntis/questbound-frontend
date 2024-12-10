import { useQuery } from "@tanstack/react-query";
import { QueryParams } from "../../../shared/types/types";
import partiesService from "./services/party.service";
import { useMemo } from "react";

export const useGetParties = (queryParams: QueryParams) => {
  const memoizedQueryParams = useMemo(() => queryParams, [queryParams]);


  return useQuery({
    queryKey: ["parties", "list", memoizedQueryParams],
    queryFn: () => partiesService.getAllParties(queryParams),
  });
};

export const useGetPartyDetails = (id: number) => {
  return useQuery({
    queryKey: ["parties", "detail", id],
    queryFn: () => partiesService.getPartyById(id),
  });
};

export const useGetRecentParties = () => {
  return useQuery({
    queryKey: ["parties", "recent"],
    queryFn: () => partiesService.getRecentParties(),
  });
};

// export const useContactsCount = () =>
// 	useContacts(1, (data) => data.totalContacts);

// export const useContactDetails = (contactId: string | undefined) =>
// 	useQuery({
// 		queryKey: ["contacts", contactId],
// 		queryFn: () => client.getContact(contactId!),
// 		enabled: !!contactId,
// 	});
