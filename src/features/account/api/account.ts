import { notifications } from "@mantine/notifications";

import { useMutation } from "@tanstack/react-query";
import accountService from "./account.service";
import localStorageService from "../../../api/services/localStorage.service";
import useAuthStore from "../../../stores/useAuthStore";
import { UpdateUserRequest, UpdateUserResponse } from "../shared/account.types";

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
