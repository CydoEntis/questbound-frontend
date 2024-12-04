import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../../stores/useAuthStore";

import localStorageService from "./services/localStorage.service";
import { notifications } from "@mantine/notifications";
import { UpdateUserRequest, UpdateUserResponse } from "../shared/types";
import userServices from "./services/user.services";

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

      localStorageService.setItem("collabParty", collabParty);

      notifications.show({
        title: "Success",
        message: "Login successful!",
        color: "green",
        position: "top-right",
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Login Failed",
        message: "Something went wrong!",
        color: "red",
        position: "top-right",
      });
      throw error;
    },
  });
}
