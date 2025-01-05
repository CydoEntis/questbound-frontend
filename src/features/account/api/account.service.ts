import {
  DateRangeRequest,
  MonthlyQuestBreakdown,
  UpdateUserRequest,
  UpdateUserResponse,
  User,
  UserStatsResponse,
} from "../shared/account.types";
import apiClient from "../../../api/apiClient";
import endpoints from "../../../api/endpoints";

const updateUserDetails = async (
  request: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  const response = (await apiClient.put(`${endpoints.user}`, request)).data;
  if (!response.success) throw new Error();
  return response.data;
};

const getUserDetails = async (): Promise<User> => {
  const response = (await apiClient.get(`${endpoints.user}`)).data;
  if (!response.success) throw new Error();
  return response.data;
};

const getUserStats = async (): Promise<UserStatsResponse> => {
  const response = (await apiClient.get(`${endpoints.user}/stats`)).data;
  if (!response.success) throw new Error();
  return response.data;
};

const getQuestBreakdown = async (
  requestDto: DateRangeRequest
): Promise<MonthlyQuestBreakdown> => {
  const response = (
    await apiClient.get(`${endpoints.user}/quests`, { params: requestDto })
  ).data;
  if (!response.success) throw new Error();
  return response.data;
};

export default {
  updateUserDetails,
  getUserDetails,
  getUserStats,
  getQuestBreakdown,
};
