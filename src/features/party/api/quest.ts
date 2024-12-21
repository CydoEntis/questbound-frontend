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

export const useGetQuestDetails = (questId: number, enabled: boolean) => {
  return useQuery({
    queryKey: ["quests", "detail", questId],
    queryFn: () => questService.getQuestDetails(questId),
    enabled,
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

      notifications.show({
        title: "Success",
        message: "Quest Completed!",
        color: "green",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Quest Completion Failed",
        message: "Quest could not be completed.",
        color: "red",
        position: "top-right",
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
      queryClient.invalidateQueries({
        queryKey: ["quests", "detail", questId],
      });

      queryClient.invalidateQueries({
        queryKey: ["quests", "list"],
      });
      notifications.show({
        title: "Success",
        message: "Quest Updated Successfully!",
        color: "green",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Quest Update Failed",
        message: "Quest could not be updated.",
        color: "red",
        position: "top-right",
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
      notifications.show({
        title: "Success",
        message: "Quest Deleted Successfully!",
        color: "green",
        position: "top-right",
      });
    },
    onError: () => {
      notifications.show({
        title: "Quest Deletion Failed",
        message: "Quest could not be deleted.",
        color: "red",
        position: "top-right",
      });
    },
  });
}
