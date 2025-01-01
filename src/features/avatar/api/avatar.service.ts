import apiClient from "../../../api/apiClient";
import endpoints from "../../../api/endpoints";
import { UnlockableAvatar, UserAvatar } from "../shared/avatar.types";

const getUnUnlockableAvatars = async (): Promise<UserAvatar[]> => {
  const response = (await apiClient.get(`${endpoints.avatars}/unlocked`)).data;
  if (!response.success) throw new Error();
  return response.data;
};

const getUnlockableAvatars = async (): Promise<UnlockableAvatar[]> => {
  const response = (await apiClient.get(`${endpoints.avatars}/locked`)).data;
  if (!response.success) throw new Error();
  return response.data;
};
const getAllUnlockableAvatars = async (): Promise<UnlockableAvatar[]> => {
  const response = (await apiClient.get(`${endpoints.avatars}/unlockable`))
    .data;
  if (!response.success) throw new Error();
  return response.data;
};

const updateAvatar = async (id: number): Promise<UserAvatar> => {
  const response = (
    await apiClient.put(`${endpoints.avatars}/active`, { avatarId: id })
  ).data;
  if (!response.success) throw new Error();

  return response.data;
};

const unlockAvatar = async (id: number): Promise<UserAvatar> => {
  const response = (
    await apiClient.post(`${endpoints.avatars}/unlock`, { avatarId: id })
  ).data;
  if (!response.success) throw new Error();

  return response.data;
};

export default {
  getUnUnlockableAvatars,
  getUnlockableAvatars,
  getAllUnlockableAvatars,
  updateAvatar,
  unlockAvatar,
};
