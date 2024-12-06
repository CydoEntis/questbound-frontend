import { notifications } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";
import localStorageService from "../../../api/services/localStorage.service";
import useAuthStore from "../../../stores/useAuthStore";
import avatarService from "./avatar.service";
import { UserAvatar } from "../shared/avatar.types";

export function useUpdateAvatar() {
  const { updateUserAvatar } = useAuthStore();

  return useMutation({
    mutationFn: async (id: number): Promise<UserAvatar> => {
      return await avatarService.updateAvatar(id);
    },
    onSuccess: (data) => {
      updateUserAvatar(data);

      localStorageService.updateItem("questbound", data);

      notifications.show({
        title: "Update Success",
        message: "Avatar updated.",
        color: "green",
        position: "top-right",
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Update Failed",
        message: "Avatar update failed.",
        color: "red",
        position: "top-right",
      });
      throw error;
    },
  });
}

export const useGetUnlockedAvatars = () => {
  return useQuery({
    queryKey: ["avatars", "unlocked"],
    queryFn: () => avatarService.getUnlockedAvatars(),
  });
};

export const useGetLockedAvatars = () => {
  return useQuery({
    queryKey: ["avatars", "locked"],
    queryFn: () => avatarService.getLockedAvatars(),
  });
};

export const useGetUnlockableAvatars = () => {
  return useQuery({
    queryKey: ["avatars", "unlockable"],
    queryFn: () => avatarService.getAllUnlockableAvatars(),
  });
};
