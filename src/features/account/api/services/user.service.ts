import apiClient from "../../../../lib/api/apiClient";
import endpoints from "../../../../lib/api/endpoints";
import { UserAvatar } from "../../../avatars/shared/types";
import { UpdateUserRequest, UpdateUserResponse } from "../../shared/types";

const updateUserDetails = async (
  request: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  const response = (await apiClient.put(`${endpoints.user}`, request)).data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

const updateUserAvatar = async (id: number): Promise<UserAvatar> => {
  const response = (
    await apiClient.put(`${endpoints.user}/avatar`, { avatarId: id })
  ).data;
  if (!response.isSuccess) throw new Error();

  console.log(response.result);

  return response.result;
};

const getUnlockedAvatars = async (): Promise<UserAvatar[]> => {
  const response = (await apiClient.get(`${endpoints.user}/unlocked-avatars`))
    .data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

export default {
  updateUserDetails,
  updateUserAvatar,
  getUnlockedAvatars,
};
