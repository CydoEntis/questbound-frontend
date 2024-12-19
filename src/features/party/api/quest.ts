import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NewQuest } from "../shared/quest.types";
import questService from "./services/quest.service";
import { notifications } from "@mantine/notifications";
import { useMemo } from "react";
import { QueryParams } from "../../../shared/types";

export function useCreateQuest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newQuest: NewQuest): Promise<void> => {
      return await questService.createQuest(newQuest);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["quests", "list"],
      });

      notifications.show({
        title: "Success",
        message: "Quest Created Successfully!",
        color: "green",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Quest Creation Failed",
        message: "Quest could not be created.",
        color: "red",
        position: "top-right",
      });
    },
  });
}


export const useGetPartyQuests = (partyId: number, queryParams: QueryParams) => {
  const memoizedQueryParams = useMemo(() => queryParams, [queryParams]);

  return useQuery({
    queryKey: ["quests", "list", memoizedQueryParams],
    queryFn: () => questService.getPartyQuests(partyId, queryParams),
  });
};