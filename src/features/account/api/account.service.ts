import { UpdateUserRequest, UpdateUserResponse } from "../shared/account.types";
import apiClient from "../../../api/apiClient";
import endpoints from "../../../api/endpoints";

const updateUserDetails = async (
  request: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  const response = (await apiClient.put(`${endpoints.user}`, request)).data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

export default {
  updateUserDetails,
};
