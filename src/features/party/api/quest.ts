import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NewQuest, QuestStepUpdate, UpdateQuest } from "../shared/quest.types";
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

export const useGetPartyQuests = (
  partyId: number,
  queryParams: QueryParams
) => {
  const memoizedQueryParams = useMemo(() => queryParams, [queryParams]);

  return useQuery({
    queryKey: ["quests", "list", memoizedQueryParams],
    queryFn: () => questService.getPartyQuests(partyId, queryParams),
  });
};

export const useGetQuestDetails = (questId: number) => {
  return useQuery({
    queryKey: ["quests", "detail", questId],
    queryFn: () => questService.getQuestDetails(questId),
  });
};

export function useUpdateStepStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (questStep: QuestStepUpdate): Promise<number> => {
      return await questService.updateStepStatus(questStep);
    },
    onSuccess: (questId) => {
      queryClient.invalidateQueries({
        queryKey: ["quests", "detail", questId],
      });

      queryClient.invalidateQueries({
        queryKey: ["quests", "list"],
      });
    },
  });
}

export function useCompleteQuest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (questId: number): Promise<number> => {
      return await questService.completeQuest(questId);
    },
    onSuccess: (questId) => {
      queryClient.invalidateQueries({
        queryKey: ["quests", "detail", questId],
      });

      queryClient.invalidateQueries({
        queryKey: ["quests", "list"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
}

export type UpdateQuestPayload = {
  questId: number;
  updateQuest: UpdateQuest;
};

export function useUpdateQuest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      questId,
      updateQuest,
    }: UpdateQuestPayload): Promise<number> => {
      return await questService.updateQuest(questId, updateQuest);
    },
    onSuccess: (questId) => {
      // Invalidate specific quest detail query
      queryClient.invalidateQueries({
        queryKey: ["quests", "detail", questId],
      });

      // Invalidate the quests list query
      queryClient.invalidateQueries({
        queryKey: ["quests", "list"],
      });
    },
  });
}

export function useDeleteQuest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (questId: number): Promise<number> => {
      return await questService.deleteQuest(questId);
    },
    onSuccess: (questId) => {
      queryClient.invalidateQueries({
        queryKey: ["quests", "detail", questId],
      });

      queryClient.invalidateQueries({
        queryKey: ["quests", "list"],
      });
    },
  });
}
