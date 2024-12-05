import { notifications } from "@mantine/notifications";

import { useMutation, useQuery } from "@tanstack/react-query";
import accountService from "./account.service";
import localStorageService from "../../../api/services/localStorage.service";
import useAuthStore from "../../../stores/useAuthStore";
import {
  ChangePasswordRequest,
  UpdateUserRequest,
  UpdateUserResponse,
  UserAvatar,
} from "../shared/account.types";

export function useUpdateUserDetails() {
  const { updateUserDetails } = useAuthStore();

  return useMutation({
    mutationFn: async (
      request: UpdateUserRequest
    ): Promise<UpdateUserResponse> => {
      return await accountService.updateUserDetails(request);
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

export function useChangePassword() {
  return useMutation({
    mutationFn: async (request: ChangePasswordRequest): Promise<void> => {
      await accountService.changePassword(request);
    },
    onSuccess: (data) => {
      console.log(data);

      notifications.show({
        title: "Success",
        message: "Email has been sent.",
        color: "green",
        position: "top-right",
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Success",
        message: "Email has been sent.",
        color: "green",
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
      return await accountService.updateUserAvatar(id);
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
    queryFn: () => accountService.getUnlockedAvatars(),
  });
};

export default {
  useUpdateUserDetails,
  useChangePassword,
  useUpdateUserAvatar,
  useGetUnlockedAvatars,
};
