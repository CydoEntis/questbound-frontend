import apiClient from "../../../api/apiClient";
import endpoints from "../../../api/endpoints";
import { UnlockableAvatar, UserAvatar } from "../shared/avatar.types";

const getUnUnlockableAvatars = async (): Promise<UserAvatar[]> => {
  const response = (await apiClient.get(`${endpoints.avatars}/unlocked`)).data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

const getUnlockableAvatars = async (): Promise<UnlockableAvatar[]> => {
  const response = (await apiClient.get(`${endpoints.avatars}/locked`)).data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};
// TODO: Refactor needs a different Type maybe UnlockableAvatar?
const getAllUnlockableAvatars = async (): Promise<UnlockableAvatar[]> => {
  const response = (await apiClient.get(`${endpoints.avatars}/unlockable`))
    .data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

const updateAvatar = async (id: number): Promise<UserAvatar> => {
  const response = (
    await apiClient.put(`${endpoints.avatars}/active`, { avatarId: id })
  ).data;
  if (!response.isSuccess) throw new Error();

  console.log(response.result);

  return response.result;
};

const unlockAvatar = async (id: number): Promise<UserAvatar> => {
  const response = (
    await apiClient.post(`${endpoints.avatars}/unlock`, { avatarId: id })
  ).data;
  if (!response.isSuccess) throw new Error();

  console.log(response.result);

  return response.result;
};

export default {
  getUnUnlockableAvatars,
  getUnlockableAvatars,
  getAllUnlockableAvatars,
  updateAvatar,
  unlockAvatar,
};
