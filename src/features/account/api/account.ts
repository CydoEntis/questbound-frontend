import { notifications } from "@mantine/notifications";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import accountService from "./account.service";
import {
  DateRangeRequest,
  UpdateUserRequest,
  UpdateUserResponse,
} from "../shared/account.types";
import { ApiError } from "../../../api/errors/error.types";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => accountService.getUserDetails(),
    enabled: true,
  });
};

export function useUpdateUserDetails() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      request: UpdateUserRequest
    ): Promise<UpdateUserResponse> => {
      return await accountService.updateUserDetails(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });


      queryClient.invalidateQueries({
        queryKey: ["userStats"],
      });


      notifications.show({
        title: "Update Success",
        message: "User details updated.",
        color: "green",
        position: "top-right",
      });
    },
    onError: (error: ApiError) => {
      notifications.show({
        title: "Update Failed",
        message: error.error,
        color: "red",
        position: "top-right",
      });
      throw error;
    },
  });
}

export const useGetUserStats = () => {
  return useQuery({
    queryKey: ["userStats"],
    queryFn: () => accountService.getUserStats(),
    enabled: true,
  });
};

export const useGetQuestBreakdown = (requestDto: DateRangeRequest) => {
  return useQuery({
    queryKey: ["questBreakdown", requestDto],
    queryFn: () => accountService.getQuestBreakdown(requestDto),
    enabled: !!requestDto,
  });
};
