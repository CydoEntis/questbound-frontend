import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewQuest } from "../shared/quest.types";
import questService from "./services/quest.service";
import { notifications } from "@mantine/notifications";

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
