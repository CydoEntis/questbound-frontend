import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../../stores/useAuthStore";

import { notifications } from "@mantine/notifications";
import { UpdateUserRequest, UpdateUserResponse } from "../shared/types";
import userServices from "./services/user.services";
import localStorageService from "../../auth/api/services/localStorage.service";

export function useUpdateUserDetails() {
  const { updateUserDetails } = useAuthStore();

  return useMutation({
    mutationFn: async (
      request: UpdateUserRequest
    ): Promise<UpdateUserResponse> => {
      return await userServices.updateUserDetails(request);
    },
    onSuccess: (data) => {
      console.log(data);

      updateUserDetails(data);

      localStorageService.updateItem("questbound", data);

      notifications.show({
        title: "Success",
        message: "User details updated.",
        color: "green",
        position: "top-right",
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Login Failed",
        message: "User details update failed.",
        color: "red",
        position: "top-right",
      });
      throw error;
    },
  });
}
