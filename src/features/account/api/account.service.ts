import {
  ChangePasswordRequest,
  LockedAvatar,
  UpdateUserRequest,
  UpdateUserResponse,
  UserAvatar,
} from "../shared/account.types";
import apiClient from "../../../api/apiClient";
import endpoints from "../../../api/endpoints";

const updateUserDetails = async (
  request: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  const response = (await apiClient.put(`${endpoints.user}`, request)).data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

const updateUserAvatar = async (id: number): Promise<UserAvatar> => {
  const response = (
    await apiClient.put(`${endpoints.user}/avatars`, { avatarId: id })
  ).data;
  if (!response.isSuccess) throw new Error();

  console.log(response.result);

  return response.result;
};

const changePassword = async (
  request: ChangePasswordRequest
): Promise<void> => {
  const response = (
    await apiClient.post(`${endpoints.auth}/change-password`, request)
  ).data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

const getUnlockedAvatars = async (): Promise<UserAvatar[]> => {
  const response = (await apiClient.get(`${endpoints.user}/avatars/unlocked`))
    .data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

const getLockedAvatars = async (): Promise<LockedAvatar[]> => {
  const response = (await apiClient.get(`${endpoints.user}/avatars/locked`))
    .data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};
// TODO: Refactor needs a different Type maybe UnlockableAvatar?
const getAllAvatars = async (): Promise<LockedAvatar[]> => {
  const response = (await apiClient.get(`${endpoints.user}/avatars/locked`))
    .data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

export default {
  updateUserDetails,
  updateUserAvatar,
  changePassword,
  getUnlockedAvatars,
  getLockedAvatars,
};
