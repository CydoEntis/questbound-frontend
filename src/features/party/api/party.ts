import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import partyService from "./services/party.service";
import { useMemo } from "react";
import { QueryParams } from "../../../shared/types";
import { NewParty, PartyData, UpdateParty } from "../shared/party.types";
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newParty: PartyData): Promise<NewParty> => {
      return await partyService.createParty(newParty);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["parties", "list"],
      });

      queryClient.invalidateQueries({
        queryKey: ["parties", "recent"],
      });

      notifications.show({
        title: "Success",
        message: "Party Created Successfully!",
        color: "green",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Party Creation Failed",
        message: "Party could not be created.",
        color: "red",
        position: "top-right",
      });
    },
  });
}

export type UpdatePartyPayload = {
  partyId: number;
  updatedParty: UpdateParty;
};

export function useUpdateParty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      partyId,
      updatedParty,
    }: UpdatePartyPayload): Promise<NewParty> => {
      // Correct the destructuring and call the service with the correct parameters
      return await partyService.updateParty(partyId, updatedParty);
    },
    onSuccess: () => {
      // Invalidate relevant queries to ensure updated data
      queryClient.invalidateQueries({
        queryKey: ["parties", "list"],
      });

      queryClient.invalidateQueries({
        queryKey: ["parties", "recent"],
      });

      // Show success notification
      notifications.show({
        title: "Success",
        message: "Party Updated Successfully!",
        color: "green",
        position: "top-right",
      });
    },
    onError: () => {
      // Show error notification
      notifications.show({
        title: "Party Update Failed",
        message: "Party could not be updated.",
        color: "red",
        position: "top-right",
      });
    },
  });
}

export function useDeleteParty() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (partyId: number): Promise<number> => {
      return await partyService.deleteParty(partyId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["parties", "list"],
      });

      queryClient.invalidateQueries({
        queryKey: ["parties", "recent"],
      });

      notifications.show({
        title: "Success",
        message: "Party Deleted Successfully!",
        color: "green",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Party Deletion Failed",
        message: "Party could not be deleted.",
        color: "red",
        position: "top-right",
      });
    },
  });
}
