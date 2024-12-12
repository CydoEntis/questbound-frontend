import { useMutation, useQuery } from "@tanstack/react-query";
import partyService from "./services/party.service";
import { useMemo } from "react";
import { QueryParams } from "../../../shared/types";
import { NewParty, PartyData } from "../shared/party.types";
import { notifications } from "@mantine/notifications";

export const useGetParties = (queryParams: QueryParams) => {
  const memoizedQueryParams = useMemo(() => queryParams, [queryParams]);

  return useQuery({
    queryKey: ["parties", "list", memoizedQueryParams],
    queryFn: () => partyService.getAllParties(queryParams),
  });
};

export const useGetPartyDetails = (
  id: number,
  { enabled }: { enabled: boolean }
) => {
  return useQuery({
    queryKey: ["parties", "detail", id],
    queryFn: () => partyService.getPartyById(id),
    enabled,
  });
};

export const useGetRecentParties = () => {
  return useQuery({
    queryKey: ["parties", "recent"],
    queryFn: () => partyService.getRecentParties(),
  });
};

export function useCreateParty() {
  return useMutation({
    mutationFn: async (newParty: PartyData): Promise<NewParty> => {
      return await partyService.createParty(newParty);
    },
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Party Created Successfully!",
        color: "green",
        position: "top-right",
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Login Failed",
        message: "Party could not be created.",
        color: "red",
        position: "top-right",
      });
      throw error;
    },
  });
}
