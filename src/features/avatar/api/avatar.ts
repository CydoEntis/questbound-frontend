import { notifications } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";
import localStorageService from "../../../api/services/localStorage.service";
import useAuthStore from "../../../stores/useAuthStore";
import avatarService from "./avatar.service";
import { UserAvatar } from "../shared/avatar.types";
import { useQueryClient } from "@tanstack/react-query";
import useUserStore from "../../../stores/useUserStore";
export function useUpdateAvatar() {
  const { updateUserAvatar } = useUserStore();

  return useMutation({
    mutationFn: async (id: number): Promise<UserAvatar> => {
      return await avatarService.updateAvatar(id);
    },
    onSuccess: (data) => {
      localStorageService.updateItem("questbound", data);

      updateUserAvatar(data);

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

export const useGetUnUnlockableAvatars = () => {
  return useQuery({
    queryKey: ["avatars", "unlocked"],
    queryFn: () => avatarService.getUnUnlockableAvatars(),
  });
};

export const useGetLockedAvatars = () => {
  return useQuery({
    queryKey: ["avatars", "locked"],
    queryFn: () => avatarService.getUnlockableAvatars(),
  });
};

export const useGetUnlockableAvatars = () => {
  return useQuery({
    queryKey: ["avatars", "unlockable"],
    queryFn: () => avatarService.getAllUnlockableAvatars(),
  });
};

export function useUnlockAvatar() {
  const { updateUserAvatar } = useUserStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<UserAvatar> => {
      return await avatarService.unlockAvatar(id);
    },
    onSuccess: (data) => {
      // updateUserAvatar(data);
      queryClient.invalidateQueries({
        queryKey: ["avatars", "unlockable"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      notifications.show({
        title: "Unlock Successful",
        message: "Avatar updated.",
        color: "green",
        position: "top-right",
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Unlocked Failed",
        message: "Avatar unlock failed.",
        color: "red",
        position: "top-right",
      });
      throw error;
    },
  });
}
