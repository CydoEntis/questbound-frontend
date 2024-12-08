import { UpdateUserRequest, UpdateUserResponse, User } from "../shared/account.types";
import apiClient from "../../../api/apiClient";
import endpoints from "../../../api/endpoints";

const updateUserDetails = async (
  request: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  const response = (await apiClient.put(`${endpoints.user}`, request)).data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

const getUserDetails = async (): Promise<User> => {
  const response = (await apiClient.get(`${endpoints.user}`)).data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

export default {
  updateUserDetails,
  getUserDetails
};
