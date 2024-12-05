import { useMutation, useQuery } from "@tanstack/react-query";
import useAuthStore from "../../../stores/useAuthStore";

import { notifications } from "@mantine/notifications";
import { UpdateUserRequest, UpdateUserResponse } from "../shared/types";
import localStorageService from "../../auth/api/services/localStorage.service";
import userService from "./services/user.service";
import { UserAvatar } from "../../avatars/shared/types";

export function useUpdateUserDetails() {
  const { updateUserDetails } = useAuthStore();

  return useMutation({
    mutationFn: async (
      request: UpdateUserRequest
    ): Promise<UpdateUserResponse> => {
      return await userService.updateUserDetails(request);
    },
    onSuccess: (data) => {
      updateUserDetails(data);

      localStorageService.updateItem("questbound", data);

      notifications.show({
        title: "Update Success",
        message: "User details updated.",
        color: "green",
        position: "top-right",
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Update Failed",
        message: "User details update failed.",
        color: "red",
        position: "top-right",
      });
      throw error;
    },
  });
}

export function useUpdateUserAvatar() {
  const { updateUserAvatar } = useAuthStore();

  return useMutation({
    mutationFn: async (id: number): Promise<UserAvatar> => {
      return await userService.updateUserAvatar(id);
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
    queryFn: () => userService.getUnlockedAvatars(),
  });
};
