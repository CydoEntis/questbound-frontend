import apiClient from "../../../api/apiClient";
import endpoints from "../../../api/endpoints";
import { LockedAvatar, UserAvatar } from "../shared/avatar.types";

const getUnlockedAvatars = async (): Promise<UserAvatar[]> => {
  const response = (await apiClient.get(`${endpoints.avatars}/unlocked`)).data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

const getLockedAvatars = async (): Promise<LockedAvatar[]> => {
  const response = (await apiClient.get(`${endpoints.avatars}/locked`)).data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};
// TODO: Refactor needs a different Type maybe UnlockableAvatar?
const getAllUnlockableAvatars = async (): Promise<LockedAvatar[]> => {
  const response = (await apiClient.get(`${endpoints.avatars}/unlockable`))
    .data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

const updateAvatar = async (id: number): Promise<UserAvatar> => {
  const response = (
    await apiClient.put(`${endpoints.avatars}`, { avatarId: id })
  ).data;
  if (!response.isSuccess) throw new Error();

  console.log(response.result);

  return response.result;
};

export default {
  getUnlockedAvatars,
  getLockedAvatars,
  getAllUnlockableAvatars,
  updateAvatar,
};
